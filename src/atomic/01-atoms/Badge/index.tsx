import { cn } from "@/utils/cn";

type BadgeProps = {
    text: string;
    variant?: "default" | "inverted";
    className?: string;
};

export function Badge({ text, variant = "default", className = "" }: BadgeProps) {
    // Base classes for both variants
    const baseClasses = "py-1 px-1.5 text-xs font-medium rounded-sm inline-flex items-center justify-center";

    // Variant-specific classes
    const variantClasses = variant === "default" ? "bg-primary text-secondary-500" : "bg-secondary-500 text-white"; // Updated inverted variant

    return <div className={cn(baseClasses, variantClasses, className, "py-")}>{text}</div>;
}
