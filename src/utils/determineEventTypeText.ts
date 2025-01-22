export function determineEventTypeText(type: string): string {
    if (type.toLowerCase().includes("goal")) {
        return "goal";
    }
    if (type.toLowerCase().includes("shift")) {
        return "goalie";
    }
    if (type.toLowerCase().includes("penalty")) {
        return "penalty";
    }
    if (type.toLowerCase().includes("change")) {
        return "goalie";
    }
    return type;
}
