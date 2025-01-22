import { normalize } from "@/constants/Typography/normalize";
import { ButtonProps, ButtonState } from "./types";
import { ColorMap, inverted as fnInverted } from "./colormap";
import { StyledButton } from "./StyledButton";
import Icon from "@/atomic/01-atoms/Icon";
import Text from "@/atomic/01-atoms/Text";
import { MouseEventHandler, useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
function overrideInputAttribute(input: () => void, override?: MouseEventHandler<HTMLButtonElement>): (e?: any) => void {
    return override
        ? (e: any) => {
              input();
              override(e);
          }
        : input;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export function Button({
    label,
    icon,
    iconPlacement = "left",
    stretch = false,
    $size = "md",
    template = "primary",
    inverted = false,
    color,
    onClick,
    disabled,
    children,
    ...i
}: ButtonProps) {
    const textsize = normalize(-2, $size);
    template = disabled ? "disabled" : template;
    const colors = (inverted ? fnInverted(ColorMap) : ColorMap)[template as keyof typeof ColorMap];
    const [btnState, setBtnState] = useState<ButtonState>("default");

    const onMouseLeave = overrideInputAttribute(() => setBtnState("default"), i.onMouseLeave);
    const onMouseEnter = overrideInputAttribute(() => setBtnState("hover"), i.onMouseEnter);
    const onMouseDown = overrideInputAttribute(() => setBtnState("active"), i.onMouseDown);
    const onMouseUp = overrideInputAttribute(() => setBtnState("hover"), i.onMouseUp);

    if (!children) {
        children = (
            <>
                {icon && <Icon name={icon} size={$size} color={color || colors[btnState].text} />}
                {label && (
                    <Text type={`heading.${textsize}`} color="inherit">
                        {label}
                    </Text>
                )}
            </>
        );
    }

    return (
        <StyledButton
            $colors={colors}
            $color={color}
            $template={template}
            $stretch={stretch}
            $iconPlacement={iconPlacement}
            disabled={disabled}
            {...i}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
        >
            {children}
        </StyledButton>
    );
}
