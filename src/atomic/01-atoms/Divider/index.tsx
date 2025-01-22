import styled from "styled-components";
import { colors } from "@/constants/Colors/colors";
import { InputHTMLAttributes } from "react";

type StyledDividerProps = {
    $color: string;
    $thickness: "thin" | "default" | "thick";
} & InputHTMLAttributes<HTMLDivElement>;

const bgColor = ({ $color }: StyledDividerProps) => $color;

const thicknessMap = {
    thin: "0.125rem",
    default: "0.25rem",
    thick: "0.5rem",
};

const thickness = ({ $thickness }: StyledDividerProps) => thicknessMap[$thickness];

const StyledDivider = styled.div.attrs({
    className: "divider",
})<StyledDividerProps>`
    background-color: ${bgColor};
    height: ${thickness};
    width: 100%;
`;

type DividerProps = {
    color?: string;
    template?: keyof typeof colors;
    thickness?: "thin" | "default" | "thick";
} & InputHTMLAttributes<HTMLDivElement>;

export const Divider = ({ color, template = "primary", thickness = "default", ...inputProps }: DividerProps) => {
    color = color || colors[template].hex;

    return <StyledDivider $color={color} $thickness={thickness} {...inputProps} />;
};
