import { colors } from "@/constants/Colors/colors";
import * as Icons from "@/constants/Icons/icons";

export type IconNames = keyof Omit<typeof Icons, "CustomIconProps">;
type IconProps = Icons.CustomIconProps & {
    name: IconNames;
};

export function Icon({ name, size = "md", variant = "filled", color = colors.primary.hex, className }: IconProps) {
    const Component = Icons[name];
    return <Component variant={variant} size={size} color={color} className={className} />;
}

export default Icon;
