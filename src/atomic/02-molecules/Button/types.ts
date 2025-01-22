import { colors } from "@/constants/Colors/colors";
import { IconNames } from "@/atomic/01-atoms/Icon";
import { InputHTMLAttributes, PropsWithChildren } from "react";

export type ButtonTemplate = keyof typeof colors | "disabled" | "minimalist";
export type ButtonSize = "xxs" | "xs" | "sm" | "md" | "lg";
export type ButtonState = "default" | "hover" | "active";

export type ButtonProps = InputHTMLAttributes<HTMLButtonElement> &
    PropsWithChildren<{
        label?: string;
        icon?: IconNames;
        stretch?: boolean;
        template?: ButtonTemplate;
        $size?: ButtonSize;
        outline?: boolean;
        inverted?: boolean;
        color?: keyof typeof colors | string;
        iconPlacement?: "left" | "right" | "top" | "bottom";
    }>;

export type ColorMapColor = {
    [key in ButtonState]: {
        bg?: string;
        text?: string;
        shadow?: string;
        border?: string;
        cursor?: string;
    };
};

export interface StyledButtonProps extends InputHTMLAttributes<HTMLButtonElement> {
    $colors: ColorMapColor;
    $template?: ButtonTemplate;
    $color?: ButtonTemplate | string;
    $stretch?: boolean;
    $iconPlacement?: "left" | "right" | "top" | "bottom";
}
