/* eslint-disable @typescript-eslint/no-explicit-any */
import { ButtonProps, ButtonTemplate } from "@/atomic/02-molecules/Button/types";
import { Children, cloneElement, ReactElement, PropsWithChildren, useState } from "react";
import styled from "styled-components";

// convert $layout to flex-direction
const getFlexDirection = ({ $layout }: Pick<StyledButtonGroupProps, "$layout">) =>
    ({ horizontal: "row", vertical: "column" }[$layout]);

type StyledButtonGroupProps = {
    $layout: "horizontal" | "vertical";
};
const StyledButtonGroup = styled.div.attrs({
    className: "button-group gs-button-group",
})<StyledButtonGroupProps>`
    display: flex;
    flex-direction: ${getFlexDirection};
    gap: 8px;
    justify-content: space-evenly;

    > .button {
        width: 100%;
    }
`;

type ButtonElement = ReactElement<ButtonProps>;
type ButtonGroupProps = PropsWithChildren<{
    behavior?: "buttons" | "toggle";
    layout?: "horizontal" | "vertical";
    activeTemplate?: ButtonTemplate;
    inactiveTemplate?: ButtonTemplate;
    selected?: number | string;
}>;

export function ButtonGroup({
    children,
    behavior = "buttons",
    layout = "horizontal",
    activeTemplate = "primary",
    inactiveTemplate = "secondary",
    selected = 0,
    ...props
}: ButtonGroupProps) {
    const buttons = Children.toArray(children) as ButtonElement[];
    const [activeButton, setActiveButton] = useState(
        buttons.findIndex((button) => button.props.label?.toLowerCase().replace(/\s/g, "-") === selected) || selected
    );

    return (
        <StyledButtonGroup $layout={layout} {...props}>
            {buttons.map((button, index) => {
                if (behavior != "toggle") {
                    return cloneElement(button);
                }

                const onClick = button.props.onClick;
                const props = {
                    ...button.props,
                    template: index === activeButton ? activeTemplate : inactiveTemplate,
                    onClick: (e: any) => {
                        setActiveButton(index);
                        onClick?.(e);
                    },
                };

                return cloneElement(button, props);

                return cloneElement(button);
            })}
        </StyledButtonGroup>
    );
}
