import styled from "styled-components";
import { Rules } from "@/constants/Typography/typography.ts";
import { HTMLAttributes, PropsWithChildren } from "react";

type TypographyProps = HTMLAttributes<HTMLSpanElement> & {
    $variant: keyof typeof Rules; // restricts to keys of Rules object
    color: string;
};

const StyledText = styled.span.attrs({
    className: "text",
})<TypographyProps>`
    color: ${(props) => props.color};
    font-family: ${(props) => Rules[props.$variant].font};
    font-size: ${(props) => Rules[props.$variant].size};
    line-height: ${(props) => Rules[props.$variant].lineHeight};
    font-weight: ${(props) => Rules[props.$variant].weight};
    letter-spacing: ${(props) => Rules[props.$variant].letterSpacing};
    text-transform: ${(props) => (Rules[props.$variant].uppercase ? "uppercase" : "inherit")};

    a {
        color: inherit;
    }
`;

export type TextProps = HTMLAttributes<HTMLSpanElement> &
    PropsWithChildren<{
        type?: keyof typeof Rules;
        color?: string;
    }>;

export function Text({ type = "body.default", children, color = "inherit", ...props }: TextProps) {
    return (
        <StyledText className="text" $variant={type} color={color} {...props}>
            {children}
        </StyledText>
    );
}

export default Text;
