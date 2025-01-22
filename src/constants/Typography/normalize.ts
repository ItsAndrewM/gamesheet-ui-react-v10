type Size = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export function normalize(offset: number = 0, size: Size) {
    const sizes: Size[] = ["xxs", "xs", "sm", "md", "lg", "xl", "xxl"];
    return sizes[sizes.indexOf(size) + offset];
}
