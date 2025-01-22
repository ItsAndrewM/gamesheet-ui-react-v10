import { PlayerDisplayType } from "@/atomic";
import { cn } from "./cn";

export const getPlayerDisplayStyles = (type: PlayerDisplayType, index: number): string => {
    const baseStyles = "!text-left";

    const styleMap = {
        primary: "!font-light",
        secondary: "!text-[#36383dc0]",
        penalty: {
            1: "!text-[#36383dc0] !capitalize",
            2: "!font-medium pt-3",
            3: "!text-[#36383dc0]",
            4: "!font-medium",
        },
    };

    if (type.includes("goalie") && index === 0) {
        return cn(baseStyles, styleMap.penalty[4]);
    }

    if (type.includes("goalie") && index === 1) {
        return cn(baseStyles, styleMap.secondary, styleMap.penalty[4]);
    }

    if (index === 0 && !type.includes("goalie")) {
        return cn(baseStyles, styleMap.primary);
    }

    if (type === "goal") {
        return cn(baseStyles, styleMap.secondary);
    }

    if (type === "penalty") {
        return cn(baseStyles, styleMap.penalty[index as 1 | 2] || styleMap.secondary);
    }

    return cn(baseStyles, styleMap.secondary);
};
