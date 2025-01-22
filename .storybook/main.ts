import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
    features: {
        experimentalRSC: true,
    },
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "@storybook/addon-onboarding",
        "@storybook/addon-essentials",
        "@chromatic-com/storybook",
        "@storybook/addon-interactions",
    ],
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
    viteFinal: async (config) => {
        config.css = {
            postcss: {
                plugins: [require("tailwindcss"), require("autoprefixer")],
            },
        };
        return config;
    },

    docs: {},
};
export default config;
