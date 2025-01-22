import { Block, KnownBlock, SectionBlock, ContextBlock } from "@slack/types";
import { SummaryResults } from "playwright-slack-report/dist/src";

export default function generateCustomLayout(summaryResults: SummaryResults): Array<Block | KnownBlock> {
    const metaSections: SectionBlock[] = [];
    if (summaryResults.meta) {
        summaryResults.meta.forEach(({ key, value }) => {
            metaSections.push({
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `*${key}:* ${value}`,
                },
            });
        });
    }

    const testResultsSummary = [
        summaryResults.passed > 0 ? `✅ *${summaryResults.passed + (summaryResults.flaky || 0)}*` : "",
        summaryResults.failed > 0 ? `❌ *${summaryResults.failed}*` : "",
        summaryResults.skipped > 0 ? `⏩ *${summaryResults.skipped}*` : "",
    ]
        .filter(Boolean)
        .join(" | ");

    const allTestsSkipped =
        summaryResults.skipped === summaryResults.passed + summaryResults.failed + summaryResults.skipped;

    const totalTests = summaryResults.passed + summaryResults.failed + summaryResults.skipped;

    return [
        {
            type: "header",
            text: {
                type: "plain_text",
                text: summaryResults.failed === 0 && !allTestsSkipped ? "All Tests Passed! 🎉" : "Test Results Summary",
                emoji: true,
            },
        },
        {
            type: "section",
            text: {
                type: "mrkdwn",
                text: testResultsSummary,
            },
        },
        ...metaSections,
        {
            type: "context",
            elements: [
                {
                    type: "mrkdwn",
                    text: `*Total Tests:* ${totalTests} | *Passed:* ${summaryResults.passed} | *Failed:* ${summaryResults.failed} | *Flaky:* ${summaryResults.flaky ?? 0} | *Skipped:* ${summaryResults.skipped}`,
                },
            ],
        } as ContextBlock,
    ];
}
