import { colors } from "../../../constants/Colors/colors";
import { ButtonState, ButtonTemplate } from "./types";

type ColorMapColor = {
    [key in ButtonTemplate]: {
        [key in ButtonState]: {
            bg: string;
            text: string;
            border?: string;
            shadow?: string;
            cursor?: string;
        };
    };
};

export const ColorMap: ColorMapColor = {
    primary: {
        default: {
            bg: colors.primary.hex,
            text: colors.secondary.hex,
            shadow: colors.secondary.variations[100],
        },
        hover: {
            bg: colors.primary.hex,
            text: colors.secondary.hex,
            shadow: colors.primary.variations[300],
        },
        active: {
            bg: colors.primary.variations[300],
            text: colors.secondary.hex,
        },
    },
    secondary: {
        default: {
            bg: colors.secondary.hex,
            text: colors.light.hex,
            shadow: colors.secondary.variations[100],
        },
        hover: {
            bg: colors.secondary.hex,
            text: colors.light.hex,
            shadow: colors.secondary.variations[400],
        },
        active: {
            bg: colors.secondary.hex,
            text: colors.secondary.variations[400],
        },
    },
    tertiary: {
        default: {
            bg: colors.tertiary.hex,
            text: colors.secondary.hex,
            shadow: colors.secondary.variations[100],
        },
        hover: {
            bg: colors.tertiary.hex,
            text: colors.secondary.hex,
            // shadow: colors.tertiary.variations[300],
        },
        active: {
            bg: colors.tertiary.hex,
            text: colors.secondary.hex,
        },
    },
    danger: {
        default: {
            bg: colors.danger.hex,
            text: colors.light.hex,
            shadow: colors.secondary.variations[100],
        },
        hover: {
            bg: colors.danger.hex,
            text: colors.light.hex,
            shadow: colors.secondary.variations[400],
        },
        active: {
            bg: colors.danger.variations[300],
            text: colors.light.hex,
        },
    },
    disabled: {
        default: {
            bg: colors.secondary.variations[100],
            text: colors.light.hex,
            shadow: colors.secondary.variations[100],
            cursor: "not-allowed",
        },
        hover: {
            bg: colors.secondary.variations[100],
            text: colors.light.hex,
            shadow: colors.secondary.variations[100],
        },
        active: {
            bg: colors.secondary.variations[100],
            text: colors.light.hex,
            shadow: colors.secondary.variations[100],
        },
    },
    minimalist: {
        default: {
            bg: "transparent",
            text: colors.secondary.hex,
        },
        hover: {
            bg: "transparent",
            text: colors.secondary.hex,
        },
        active: {
            bg: "transparent",
            text: colors.secondary.hex,
        },
    },
    liveBlue: {
        default: {
            bg: colors.liveBlue.hex,
            text: colors.light.hex,
            shadow: colors.secondary.variations[100],
        },
        hover: {
            bg: colors.liveBlue.hex,
            text: colors.secondary.hex,
            shadow: colors.secondary.variations[300],
        },
        active: {
            bg: colors.liveBlue.variations[300],
            text: colors.light.hex,
        },
    },
    light: {
        default: {
            bg: colors.light.hex,
            text: colors.secondary.hex,
            shadow: colors.secondary.variations[100],
        },
        hover: {
            bg: colors.light.hex,
            text: colors.secondary.hex,
            shadow: colors.secondary.variations[400],
        },
        active: {
            bg: colors.light.hex,
            text: colors.secondary.hex,
        },
    },
    ash: {
        default: {
            bg: colors.ash.hex,
            text: colors.secondary.hex,
            shadow: colors.secondary.variations[100],
        },
        hover: {
            bg: colors.ash.hex,
            text: colors.secondary.hex,
            shadow: colors.secondary.variations[400],
        },
        active: {
            bg: colors.ash.hex,
            text: colors.secondary.hex,
        },
    },
    success: {
        default: {
            bg: colors.success.hex,
            text: colors.light.hex,
            shadow: colors.secondary.variations[100],
        },
        hover: {
            bg: colors.success.hex,
            text: colors.light.hex,
            shadow: colors.secondary.variations[400],
        },
        active: {
            bg: colors.success.variations[300],
            text: colors.light.hex,
        },
    },
    accent: {
        default: {
            bg: colors.accent.hex,
            text: colors.secondary.hex,
            shadow: colors.secondary.variations[100],
        },
        hover: {
            bg: colors.accent.hex,
            text: colors.secondary.hex,
            shadow: colors.secondary.variations[400],
        },
        active: {
            bg: colors.accent.hex,
            text: colors.secondary.hex,
        },
    },
};

export function inverted(colorMap: ColorMapColor): ColorMapColor {
    const invertedMap: ColorMapColor = {} as ColorMapColor;

    (Object.keys(colorMap) as ButtonTemplate[]).forEach((templateKey) => {
        invertedMap[templateKey] = {} as ColorMapColor[ButtonTemplate];

        (Object.keys(colorMap[templateKey]) as ButtonState[]).forEach((stateKey) => {
            invertedMap[templateKey][stateKey] = {
                bg: colorMap[templateKey][stateKey].text,
                text: colorMap[templateKey][stateKey].bg,
            };
        });
    });

    return invertedMap;
}
