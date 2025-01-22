export function getWinLossOrTie(homeGoals: number, visitorGoals: number, opponentSide: string) {
    if (homeGoals > visitorGoals) {
        return `${opponentSide === "home" ? "L" : "W"} ${homeGoals}-${visitorGoals}`;
    }
    if (homeGoals < visitorGoals) {
        return `${opponentSide === "home" ? "W" : "L"} ${visitorGoals}-${homeGoals}`;
    }
    if (homeGoals === visitorGoals) {
        return `T ${homeGoals}-${visitorGoals}`;
    }
}
