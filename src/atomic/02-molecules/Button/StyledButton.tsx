import styled from "styled-components";
import { ButtonState, ColorMapColor, StyledButtonProps } from "./types";
import { colors } from "@/constants/Colors/colors";

const makeShadow = (state: ButtonState, x: number, y: number, glow: number, spread: number) => {
    return ({ $colors }: { $colors: ColorMapColor }) => {
        return $colors[state].shadow ? `${x}px ${y}px ${glow}px ${spread}px ${$colors[state].shadow}` : "none";
    };
};

const makeBackgroundColor = (state: ButtonState) => {
    return ({ $colors }: { $colors: ColorMapColor }) => {
        return $colors[state].bg ? $colors[state].bg : "transparent";
    };
};

const makeTextColor = (state: ButtonState) => {
    return ({ $colors, $color }: Pick<StyledButtonProps, "$color" | "$colors">) => {
        if ($color) {
            if (Object.keys(colors).includes($color)) {
                return colors[$color as keyof typeof colors].hex;
            }
            return $color;
        }

        return $colors[state].text ? $colors[state].text : "inherit";
    };
};

const makeBorder = (state: ButtonState, thickness: number) => {
    return ({ $colors }: { $colors: ColorMapColor }) => {
        return $colors[state].border ? `${thickness}px solid ${$colors[state].border}` : "none";
    };
};

const makeCursor = (state: ButtonState) => {
    return ({ $colors }: { $colors: ColorMapColor }) => {
        return $colors[state].cursor ? $colors[state].cursor : "pointer";
    };
};

const stretch = ({ $stretch }: StyledButtonProps) => ($stretch ? "100%" : "auto");
const padding = ({ $template }: StyledButtonProps) => ($template === "minimalist" ? "0" : "0.5rem 1rem");
const gap = ({ $iconPlacement }: StyledButtonProps) =>
    ["top", "bottom"].includes($iconPlacement as string) ? "0" : "0.25rem";
const flexDirection = ({ $iconPlacement }: StyledButtonProps) =>
    ["top", "bottom"].includes($iconPlacement as string) ? "column" : "row";
const order = ({ $iconPlacement }: StyledButtonProps) => (["top", "left"].includes($iconPlacement as string) ? 1 : 3);

export const StyledButton = styled.button.attrs({
    className: "button",
})<StyledButtonProps>`
    width: ${stretch};
    color: ${makeTextColor("default")};
    /* box-shadow: ${makeShadow("default", 0, 0, 10, 0)}; */
    background-color: ${makeBackgroundColor("default")};
    border: ${makeBorder("default", 1)};
    border-radius: 0.25rem;
    padding: ${padding};
    cursor: ${makeCursor("default")};

    display: flex;
    flex-direction: ${flexDirection};
    align-items: center;
    justify-content: center;
    gap: ${gap};
    white-space: nowrap;

    .icon {
        order: ${order};
    }

    .text {
        order: 2;
    }

    &:hover {
        background-color: ${makeBackgroundColor("hover")};
        /* box-shadow: ${makeShadow("hover", 0, 4, 4, 0)}; */
    }

    &:active:not(:disabled) {
        background-color: ${makeBackgroundColor("active")};
        margin-top: 1px;
        margin-bottom: -1px;
        box-shadow: none;
    }

    > * {
        display: block;
    }
`;
