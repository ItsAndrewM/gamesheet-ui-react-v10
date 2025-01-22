import { Page, expect, test } from "@playwright/test";
import { readFileSync, existsSync, readdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

function toStorySlug(title: string): string {
    return title.toLowerCase().replace(/\s+/g, "-").replace(/\//g, "-").replace(/--+/g, "-");
}

function toKebabCase(str: string): string {
    return str
        .split("")
        .map((letter, idx) => {
            return letter.toUpperCase() === letter ? `${idx !== 0 ? "-" : ""}${letter.toLowerCase()}` : letter;
        })
        .join("");
}

function generateStoryId(metaTitle: string, storyName: string = "primary"): string {
    const slug = toStorySlug(metaTitle);
    const storySlug = toKebabCase(storyName);
    return `${slug}--${storySlug}`;
}

function extractMetaTitle(fileContent: string): string {
    const titleMatch = fileContent.match(/title:\s*["']([^"']+)["']/);
    return titleMatch ? titleMatch[1] : "";
}

// Status checking helper
function getStoryStatus(storyPath: string): boolean {
    try {
        const storyFile = readFileSync(storyPath, "utf-8");
        const tagsMatch = storyFile.match(/tags:\s*\[(.*?)\]/);
        if (tagsMatch) {
            const tagsString = tagsMatch[1];
            const hasStoryDraft = tagsString.includes("status:draft");
            const hasMetaFinal = tagsString.includes("status:final");
            if (hasStoryDraft) return false;
            return hasMetaFinal;
        }
        return false;
    } catch (error) {
        console.error("[DEBUG][getStoryStatus] Error reading story file:", storyPath, error);
        return false;
    }
}

function getStoryInfo(testFilePath: string, storyFileName: string) {
    let currentFilePath: string;
    try {
        currentFilePath = fileURLToPath(testFilePath);
    } catch (error) {
        console.error("[DEBUG][getStoryInfo] Error converting URL to path:", error);
        // Try alternate path resolution if URL conversion fails
        currentFilePath = testFilePath.replace("file://", "");
    }

    const currentDir = dirname(currentFilePath);

    // Try to find story file with case-insensitive search
    const files = readdirSync(currentDir);

    const storyFileNameLower = storyFileName.toLowerCase();
    const matchingFile = files.find((file) => file.toLowerCase() === storyFileNameLower);

    if (!matchingFile) {
        // Try looking in parent directories up to src/
        let searchDir = currentDir;
        let found = false;
        while (searchDir.includes("src") && !found) {
            try {
                const dirFiles = readdirSync(searchDir);
                const match = dirFiles.find((file) => file.toLowerCase() === storyFileNameLower);
                if (match) {
                    found = true;
                    storyFileName = match;
                    break;
                }
                searchDir = dirname(searchDir);
            } catch (error) {
                console.error("[DEBUG][getStoryInfo] Error searching directory:", error);
                break;
            }
        }
    } else {
        storyFileName = matchingFile;
    }

    const storyPath = join(currentDir, storyFileName);

    if (!existsSync(storyPath)) {
        console.error("[DEBUG][getStoryInfo] STORY FILE NOT FOUND at path:", storyPath);
        throw new Error(`Story file not found at ${storyPath}. Available files: ${files.join(", ")}`);
    }

    let storyContent: string;
    try {
        storyContent = readFileSync(storyPath, "utf-8");
    } catch (error) {
        console.error("[DEBUG][getStoryInfo] Error reading story file:", error);
        throw error;
    }

    const metaTitle = extractMetaTitle(storyContent);
    if (!metaTitle) {
        console.error("[DEBUG][getStoryInfo] Could not extract meta title from story content");
        throw new Error("Could not extract meta title from story content");
    }

    return { storyPath, metaTitle };
}

// Helper functions for storybook
async function waitForStorybookLoad(page: Page): Promise<void> {
    const timeout = 30000; // 30 seconds timeout
    try {
        await Promise.race([
            Promise.all([
                expect(page.locator(".sb-loader").first()).toBeHidden({ timeout }),
                expect(page.locator(".sb-previewBlock_body > .sb-loader")).toBeHidden({ timeout }),
                expect(page.locator(".sb-preparing-story")).toBeHidden({ timeout }),
                expect(page.locator(".sb-preparing-docs")).toBeHidden({ timeout }),
                expect(page.locator(".sb-show-main")).toBeVisible({ timeout }),
            ]),
            new Promise((_, reject) => setTimeout(() => reject(new Error("Storybook load timeout")), timeout)),
        ]);
    } catch (error) {
        console.error("[DEBUG][waitForStorybookLoad] Error waiting for Storybook:", error);
        throw error;
    }
}

async function navigateToStory(page: Page, storyId: string): Promise<void> {
    try {
        const url = `http://localhost:6006/iframe?id=${encodeURIComponent(storyId)}`;

        await page.goto(url, {
            waitUntil: "networkidle",
            timeout: 30000,
        });

        await waitForStorybookLoad(page);
    } catch (error) {
        console.error("[DEBUG][navigateToStory] Navigation failed:", error);
        throw error;
    }
}

export function snapshotNameFromKey(key: string): string {
    return `${key
        .replace(/([A-Z])/g, "-$1")
        .toLowerCase()
        .replace(/^-/, "")}.png`;
}

async function waitForInteractionsComplete(page: Page): Promise<void> {
    try {
        await page.evaluate(() => {
            return new Promise<void>((resolve) => {
                window.addEventListener("interactions-complete", () => resolve(), { once: true });
                // Add a timeout just in case the event never fires
                setTimeout(resolve, 5000);
            });
        });
    } catch (error) {
        console.error("[DEBUG][waitForInteractionsComplete] Error waiting for interactions:", error);
        // Don't throw - if this fails, we'll still try to take the screenshot
    }
}

interface DynamicElement {
    selector: string;
    placeholder: string;
}

export async function runStorybookTest(
    page: Page,
    storyId: string,
    snapshotName: string,
    dynamicElements?: DynamicElement[],
    shouldWaitForInteractions = true,
): Promise<void> {
    await navigateToStory(page, storyId);

    if (shouldWaitForInteractions) {
        await waitForInteractionsComplete(page);
    }

    if (dynamicElements?.length) {
        await page.evaluate((elements: DynamicElement[]) => {
            elements.forEach(({ selector, placeholder }) => {
                const element = document.querySelector(`[data-testid="${selector}"]`);
                if (element) {
                    element.innerHTML = `<strong>${placeholder}</strong>`;
                }
            });
        }, dynamicElements);
    }

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchSnapshot(snapshotName);
}

function getComponentName(metaTitle: string): string {
    // Get the last part of the title after the last slash or the whole title if no slash
    const parts = metaTitle.split("/");
    return parts[parts.length - 1].trim();
}

export function createVisualTests(
    testFilePath: string,
    storyFileName: string,
    storyNames: string[] = ["Primary"],
    dynamicElements?: DynamicElement[],
) {
    let storyInfo: { storyPath: string; metaTitle: string };

    try {
        storyInfo = getStoryInfo(testFilePath, storyFileName);
    } catch (error) {
        console.error("[DEBUG][createVisualTests] Failed to get story info:", error);
        test.describe(`Story File Not Found`, () => {
            test.skip();
        });
        return;
    }

    const componentName = getComponentName(storyInfo.metaTitle);

    const stories = Object.fromEntries(
        storyNames.map((storyName) => [storyName, generateStoryId(storyInfo.metaTitle, storyName)]),
    );

    test.describe(`${componentName} Visual Regression Tests`, () => {
        const hasFinalStatus = getStoryStatus(storyInfo.storyPath);

        if (!hasFinalStatus) {
            test.skip();
            return;
        }

        Object.entries(stories).forEach(([storyName, storyUri]) => {
            test(`${componentName} - "${storyName}" Story Matching Baseline Screenshot`, async ({ page }) => {
                test.setTimeout(60000);
                await runStorybookTest(page, storyUri, snapshotNameFromKey(storyName), dynamicElements, false);
            });
        });
    });
}
