import { usePositionOptions } from "./usePositionOptions";

export default function useTranslatePosition() {
    const positionOptions = usePositionOptions();

    return (position: string) => {
        if (positionOptions.options.length > 0) {
            const option = positionOptions.options.find(
                (option: { key: string }) => option.key.toLowerCase() === position.toLowerCase(),
            );
            if (option) {
                return option.abbr.toUpperCase();
            }
        }

        // default positions as a fallback
        switch (position?.toLowerCase()) {
            case "forward":
                return "F";
            case "centre":
            case "center":
                return "C";
            case "defence":
            case "defense":
                return "D";
            case "left_wing":
                return "LW";
            case "right_wing":
                return "RW";
            case "transition":
                return "T";
            case "goalie":
                return "G";
            case "midfield":
                return "M";
            case "attack":
                return "A";
            default:
                return "-";
        }
    };
}
