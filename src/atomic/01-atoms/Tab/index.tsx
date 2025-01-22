import { InputHTMLAttributes, PropsWithChildren } from "react";
import styled from "styled-components";

// Styled Tab Props
type StyledTabProps = {
    $active?: boolean;
} & InputHTMLAttributes<HTMLDivElement>;

// Styled Tab Container
const StyledTab = styled.div.attrs({
    role: "tab",
    className: "tab",
})<StyledTabProps>``;

// Tab Props
export type TabProps = PropsWithChildren<
    {
        name?: string;
        description?: string; // used in the wizard component
    } & InputHTMLAttributes<HTMLDivElement>
>;

// Tab Component
export function Tab({ children, name, ...divElementProperties }: TabProps) {
    return (
        <StyledTab className={name} {...divElementProperties}>
            {children}
        </StyledTab>
    );
}
