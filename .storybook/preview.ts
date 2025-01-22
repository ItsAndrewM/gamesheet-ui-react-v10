import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { getBoxscoreData } from "../src/utils/getBoxscoreData";

/* TODO: update import for your custom theme configurations */
import { lightTheme, darkTheme } from "../src/themes";

/* TODO: replace with your own global styles, or remove */
import FontStyles from "../src/fonts";
const GlobalStyles = FontStyles;

const preview: Preview = {
    loaders: [
        async () => ({
            boxscoreData: await await getBoxscoreData(),
        }),
    ],

    tags: ["globalStyles", "themes", "autodocs", "autodocs"],

    decorators: [
        withThemeFromJSXProvider({
            themes: {
                light: lightTheme,
                dark: darkTheme,
            },
            defaultTheme: "light",
            Provider: ThemeProvider,
            GlobalStyles,
        }),
    ],
};

export default preview;
