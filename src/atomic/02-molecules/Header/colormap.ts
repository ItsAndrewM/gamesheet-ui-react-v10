import { colors } from "@/constants/Colors/colors";

type ColorMapColor = {
    [key in keyof typeof colors]: {
        bg: string;
        text: string;
        divider: string;
    };
};

export const ColorMap: ColorMapColor = {
    primary: {
        bg: "transparent",
        text: colors.secondary.hex,
        divider: colors.primary.hex,
    },
    secondary: {
        bg: colors.secondary.hex,
        text: colors.ash.variations[50],
        divider: colors.primary.hex,
    },
    tertiary: {
        bg: colors.tertiary.hex,
        text: colors.secondary.hex,
        divider: colors.secondary.hex,
    },
    liveBlue: {
        bg: "transparent",
        text: colors.secondary.hex,
        divider: colors.liveBlue.hex,
    },
    danger: {
        bg: colors.danger.hex,
        text: colors.secondary.hex,
        divider: colors.secondary.hex,
    },
    success: {
        bg: colors.success.hex,
        text: colors.secondary.hex,
        divider: colors.secondary.hex,
    },
    light: {
        bg: colors.light.hex,
        text: colors.secondary.hex,
        divider: colors.secondary.hex,
    },
    ash: {
        bg: colors.ash.hex,
        text: colors.secondary.hex,
        divider: colors.secondary.hex,
    },
    accent: {
        bg: colors.accent.hex,
        text: colors.secondary.hex,
        divider: colors.secondary.hex,
    },
};

export const fnInverted = (): ColorMapColor => {
    const invertedMap = { ...ColorMap };
    (Object.keys(invertedMap) as Array<"primary" | "secondary">).forEach((templateKey) => {
        invertedMap[templateKey].bg = ColorMap[templateKey].text;
        invertedMap[templateKey].text = ColorMap[templateKey].bg;
    });
    return invertedMap;
};
