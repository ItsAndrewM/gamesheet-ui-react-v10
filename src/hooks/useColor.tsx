import { colors } from "@/constants/Colors/colors";

type Colors = typeof colors;
type ColorKeys = keyof Colors;
type Variations<T extends ColorKeys> = keyof Colors[T]["variations"];

export function useColor<T extends ColorKeys>(
    theme: T,
    variation?: "50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | "950",
) {
    const palette = colors[theme];
    return (variation && (palette.variations[variation] as Variations<T>)) || palette.hex;
}
