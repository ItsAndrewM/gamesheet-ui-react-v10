import styled from "styled-components";
import { ColorMap, fnInverted } from "./colormap";
import { colors } from "@/constants/Colors/colors";
import Text from "@/atomic/01-atoms/Text";
import { Divider } from "@/atomic/01-atoms/Divider";
import { Button } from "@/atomic/02-molecules/Button";
import { ComponentProps } from "react";

export type HeaderProps = {
    title: string;
    divider?: boolean;
    color?: string;
    type?: ComponentProps<typeof Text>["type"];
    template?: keyof typeof colors;
    size?: "xxs" | "xs" | "sm" | "md" | "lg";
    close?: boolean;
    inverted?: boolean;
    onClose?: () => void;
};

type StyledHeaderProps = Pick<HeaderProps, "size"> & {
    $bg: string;
};

const StyledHeader = styled.div.attrs({
    className: "header",
})<StyledHeaderProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${(props) => props.$bg};
    gap: 8px;
    border-radius: 4px;

    .text {
        padding: 8px;
        width: auto;
        max-width: 75%;
        text-align: center;
        white-space: nowrap;
        word-wrap: break-word;
        text-overflow: ellipsis;
        font-weight: 600;
    }

    .divider:first-child {
        /* margin-left: 16px; */
    }

    .divider:last-child {
        /* margin-right: 16px; */
    }

    .button {
        margin: 8px;
        padding: 0;
        background: transparent !important;
        box-shadow: none !important;
        border: none !important;
    }
`;

export const Header = ({
    title,
    close = false,
    divider = true,
    template = "primary",
    size,
    type,
    color,
    inverted = false,
    onClose = () => {},
}: HeaderProps) => {
    const colorMap = inverted ? fnInverted() : ColorMap;

    if (!type) {
        type = "heading.md";
    }

    return (
        <StyledHeader $bg={colorMap[template].bg} size={size}>
            {divider && <Divider color={color || colorMap[template].divider} />}
            <Text type={type} color={color || colorMap[template].text}>
                {title}
            </Text>
            {divider && <Divider color={color || colorMap[template].divider} />}
            {close && <Button icon="Close2Icon" onClick={onClose} $size={size} template={template} />}
        </StyledHeader>
    );
};
