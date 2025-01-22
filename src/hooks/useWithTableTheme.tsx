import { colors } from "@/constants/Colors/colors";

// Types
type TableState = "default" | "hover" | "selected" | "active";
type TableTemplate =
    | "primary"
    | "secondary"
    | "tertiary"
    | "danger"
    | "minimalist"
    | "liveBlue"
    | "light"
    | "ash"
    | "success"
    | "accent";

type TableThemeColor = {
    [key in TableTemplate]: {
        [key in TableState]: {
            bg: string;
            text: string;
            border?: string;
            headerBg?: string;
            headerText?: string;
            variations?: {
                [key: string]: string;
            };
        };
    };
};

interface TableThemeParams {
    template: TableTemplate;
    inverted?: boolean;
    customColors?: {
        hover?: {
            border?: string;
        };
        selected?: {
            bg?: string;
            text?: string;
        };
    };
}

// Color mapping
const TableColorMap: TableThemeColor = {
    primary: {
        default: {
            bg: colors.light.hex,
            text: colors.secondary.hex,
            headerBg: colors.light.hex,
            headerText: colors.secondary.hex,
        },
        hover: {
            bg: colors.light.hex,
            text: colors.secondary.hex,
            border: colors.primary.hex,
        },
        selected: {
            bg: colors.primary.variations[100],
            text: colors.secondary.hex,
            border: colors.primary.hex,
        },
        active: {
            bg: colors.primary.variations[200],
            text: colors.secondary.hex,
        },
    },
    secondary: {
        default: {
            bg: colors.light.hex,
            text: colors.secondary.hex,
            headerBg: colors.secondary.variations[100],
            headerText: colors.secondary.hex,
        },
        hover: {
            bg: colors.light.hex,
            text: colors.secondary.hex,
            border: colors.secondary.hex,
        },
        selected: {
            bg: colors.secondary.variations[100],
            text: colors.light.hex,
        },
        active: {
            bg: colors.secondary.variations[200],
            text: colors.light.hex,
        },
    },
    liveBlue: {
        default: {
            bg: colors.light.hex,
            text: colors.secondary.hex,
            headerBg: colors.light.hex,
            headerText: colors.liveBlue.hex,
        },
        hover: {
            bg: colors.light.hex,
            text: colors.secondary.hex,
            border: colors.liveBlue.hex,
        },
        selected: {
            bg: "#ecc93c",
            text: colors.secondary.hex,
        },
        active: {
            bg: colors.liveBlue.variations[200],
            text: colors.light.hex,
        },
    },
    minimalist: {
        default: {
            bg: colors.light.hex,
            text: colors.secondary.hex,
            headerBg: colors.light.hex,
            headerText: colors.secondary.hex,
        },
        hover: {
            bg: colors.light.hex,
            text: colors.secondary.hex,
            border: colors.secondary.variations[100],
        },
        selected: {
            bg: colors.secondary.variations[50],
            text: colors.secondary.hex,
        },
        active: {
            bg: colors.secondary.variations[100],
            text: colors.secondary.hex,
        },
    },
    tertiary: {
        default: {
            bg: colors.tertiary.hex,
            text: colors.light.hex,
            headerBg: colors.tertiary.hex,
            headerText: colors.light.hex,
        },
        hover: {
            bg: colors.tertiary.hex,
            text: colors.light.hex,
            border: colors.tertiary.variations[100],
        },
        selected: {
            bg: colors.tertiary.variations[50],
            text: colors.light.hex,
        },
        active: {
            bg: colors.tertiary.variations[100],
            text: colors.light.hex,
        },
    },
    danger: {
        default: {
            bg: colors.danger.hex,
            text: colors.light.hex,
            headerBg: colors.danger.hex,
            headerText: colors.light.hex,
        },
        hover: {
            bg: colors.danger.hex,
            text: colors.light.hex,
            border: colors.danger.variations[100],
        },
        selected: {
            bg: colors.danger.variations[50],
            text: colors.light.hex,
        },
        active: {
            bg: colors.danger.variations[100],
            text: colors.light.hex,
        },
    },
    light: {
        default: {
            bg: colors.light.hex,
            text: colors.secondary.hex,
            headerBg: colors.light.hex,
            headerText: colors.secondary.hex,
        },
        hover: {
            bg: colors.light.hex,
            text: colors.secondary.hex,
            border: colors.ash.variations[100],
        },
        selected: {
            bg: colors.ash.variations[50],
            text: colors.secondary.hex,
        },
        active: {
            bg: colors.ash.variations[100],
            text: colors.secondary.hex,
        },
    },
    ash: {
        default: {
            bg: colors.ash.hex,
            text: colors.secondary.hex,
            headerBg: colors.ash.hex,
            headerText: colors.secondary.hex,
        },
        hover: {
            bg: colors.ash.hex,
            text: colors.secondary.hex,
            border: colors.ash.variations[100],
        },
        selected: {
            bg: colors.ash.variations[50],
            text: colors.secondary.hex,
        },
        active: {
            bg: colors.ash.variations[100],
            text: colors.secondary.hex,
        },
    },
    success: {
        default: {
            bg: colors.success.hex,
            text: colors.light.hex,
            headerBg: colors.success.hex,
            headerText: colors.light.hex,
        },
        hover: {
            bg: colors.success.hex,
            text: colors.light.hex,
            border: colors.success.variations[100],
        },
        selected: {
            bg: colors.success.variations[50],
            text: colors.light.hex,
        },
        active: {
            bg: colors.success.variations[100],
            text: colors.light.hex,
        },
    },
    accent: {
        default: {
            bg: colors.accent.hex,
            text: colors.light.hex,
            headerBg: colors.accent.hex,
            headerText: colors.light.hex,
        },
        hover: {
            bg: colors.accent.hex,
            text: colors.light.hex,
            border: colors.accent.variations[100],
        },
        selected: {
            bg: colors.accent.variations[50],
            text: colors.light.hex,
        },
        active: {
            bg: colors.accent.variations[100],
            text: colors.light.hex,
        },
    },
};

function invertTableColorMap(colorMap: TableThemeColor): TableThemeColor {
    const invertedMap: TableThemeColor = {} as TableThemeColor;

    (Object.keys(colorMap) as TableTemplate[]).forEach((templateKey) => {
        invertedMap[templateKey] = {} as TableThemeColor[TableTemplate];

        (Object.keys(colorMap[templateKey]) as TableState[]).forEach((stateKey) => {
            invertedMap[templateKey][stateKey] = {
                bg: colorMap[templateKey][stateKey].text,
                text: colorMap[templateKey][stateKey].bg,
                ...(colorMap[templateKey][stateKey].headerBg && {
                    headerBg: colorMap[templateKey][stateKey].text,
                    headerText: colorMap[templateKey][stateKey].headerBg,
                }),
            };
        });
    });

    return invertedMap;
}

export function useWithTableTheme(params: TableThemeParams) {
    const { template, inverted = false, customColors } = params;
    const colorMap = inverted ? invertTableColorMap(TableColorMap) : TableColorMap;
    const templateColors = colorMap[template];

    return {
        theme: {
            // Base colors
            backgroundColor: templateColors.default.bg,
            cellTextColor: templateColors.default.text,
            headerBackgroundColor: colors.secondary.hex,
            headerTextColor: colors.light.hex,

            // Row states
            // rowHoverBackgroundColor: "transparent",
            rowHoverColor: "transparent",
            rowHoverBorderColor: templateColors.hover.border || templateColors.hover.bg,
            selectedRowBackgroundColor: customColors?.selected?.bg || templateColors.selected.bg,

            // Accent color (for other UI elements)
            accentColor: templateColors.default.headerText,

            // Other AG Grid parameters
            oddRowBackgroundColor: "#F9F9F9",
            foregroundColor: templateColors.default.text,
            // borderColor: customColors?.hover?.border || colors.hover.border,
            browserColorScheme: "light" as const,
            fontSize: ".7rem",
            headerFontSize: 16,

            chromeBackgroundColor: {
                ref: "foregroundColor",
                mix: 0.07,
                onto: "backgroundColor",
            },
        },
        colors: colorMap[template],
    };
}

export type { TableThemeParams, TableTemplate, TableState, TableThemeColor };
