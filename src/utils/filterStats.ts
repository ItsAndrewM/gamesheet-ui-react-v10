import { BoxscoreTeamStatsData, BoxscoreTeamStatsTeam } from "@/types/BoxscoreV2";
const statsLabels: Array<{ key: string; label: string }> = [
    { key: "rc/pg", label: "Red Cards Per Game" },
    { key: "yc/pg", label: "Yellow Cards Per Game" },
    { key: "ppg/gp", label: "Powerplay Goals Per Game" },
    { key: "pim/gp", label: "Penalty Minutes Per Game" },
    { key: "g/pg", label: "Goals Per Game" },
    { key: "ga/pg", label: "Goals Against Per Game" },
];

export function filterStats(teamStats: BoxscoreTeamStatsData, sport = "hockey") {
    const { home, visitor } = teamStats || {};
    if (!home || !visitor) return [];
    const statsArray = Object.keys(visitor as BoxscoreTeamStatsTeam).map((key: string) => {
        const visitorValue = visitor[key as keyof BoxscoreTeamStatsTeam];
        const homeValue = home[key as keyof BoxscoreTeamStatsTeam];
        return {
            key: key.replace("/", ""),
            visitor: visitorValue,
            home: homeValue,
            label: statsLabels.find((label) => label.key === key)?.label || "",
        };
    });
    return statsArray
        .filter((stat) => {
            const isSoccer = sport.toLowerCase() === "soccer";
            const normalizedKey = stat.key.replace(/[/-]/g, "");
            if ((normalizedKey === "ycpg" || normalizedKey === "rcpg") && !isSoccer) {
                return false;
            }
            if ((normalizedKey === "ppggp" || normalizedKey === "pimgp") && isSoccer) {
                return false;
            }
            return true;
        })
        .sort((a, b) => a.key.localeCompare(b.key));
}
