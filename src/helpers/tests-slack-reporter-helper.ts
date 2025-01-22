import dotenv from "dotenv";
import { LogLevel } from "@slack/web-api";
import generateCustomLayout from "./tests-slack-layout-api.ts";
import fs from "fs";
import path from "path";

export const setupEnv = () => {
    const envDirectory = path.resolve("config", "environments"); // Path to the environments folder
    const nodeEnvFile = path.join(envDirectory, `.env.${process.env.NODE_ENV || ".env.dev"}`);

    // Load variables from .env.{NODE_ENV} if it exists
    if (fs.existsSync(nodeEnvFile)) {
        dotenv.config({ path: nodeEnvFile });
    }
};

export const setupDotEnv = () => {
    dotenv.config({ path: `.env` });
};

// Use built-in environment variables from Google Cloud Build
export const cloudBuildJobId = process.env.BUILD_ID; // Automatically available
export const cloudBuildProjectId = process.env.PROJECT_ID; // Automatically available
export const cloudBuildCommitSha = process.env.COMMIT_SHA || process.env.SHORT_SHA; // Automatically available
export const branchName = process.env._BRANCH || process.env.BRANCH_NAME; // Automatically available for _BRANCH substitution
export const repoName = process.env.REPO_NAME || "playwright-storybook-component-tests"; // Set explicitly if not in environment
export const triggerName = process.env.TRIGGER_NAME; // Available for _TRIGGER_NAME substitution

// URLs
const storageBucketUrl = `https://storage.cloud.google.com/gamesheet-test-artifacts/${cloudBuildJobId}`;
export const cloudBuildArtifactsUrl = `https://console.cloud.google.com/storage/browser/gamesheet-test-artifacts/${cloudBuildJobId}`;
export const reportResultsUrl = `${storageBucketUrl}/playwright-tests/playwright-report-storybook-component-tests/index.html`;

export const getSlackReporterConfig = (testSuite: string): [string, any][] => {
    return [
        [
            "./node_modules/playwright-slack-report/dist/src/SlackReporter.js",
            {
                channels: ["automated-qa-notifications"],
                sendResults: "always",
                layout: generateCustomLayout,
                maxNumberOfFailuresToShow: 4,
                meta: [
                    { key: "Build Trigger", value: triggerName },
                    { key: "Test Suite", value: testSuite },
                    { key: "Results", value: `<${reportResultsUrl}|View HTML Results>` },
                    { key: "Build Artifacts", value: `<${cloudBuildArtifactsUrl}|View in Cloud Storage >` },
                    { key: "Branch", value: branchName },
                ],
                slackOAuthToken: process.env.SLACK_BOT_USER_OAUTH_TOKEN,
                slackLogLevel: LogLevel.DEBUG,
                disableUnfurl: true,
                showInThread: true,
            },
        ],
    ];
};
