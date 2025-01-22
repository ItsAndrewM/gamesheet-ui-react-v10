import { BoxscoreGameScoreData } from "@/types/BoxscoreV2";
import { BoxscoreLineup } from "../BoxscoreLineup";

export function BoxscoreRoster({ rosterData }: { rosterData: BoxscoreGameScoreData }) {
    const { home, visitor } = rosterData || {};

    return (
        <div className="flex flex-col lg:flex-row gap-4 w-full">
            <BoxscoreLineup team={home} isHomeTeam={true} />
            <BoxscoreLineup team={visitor} isHomeTeam={false} />
        </div>
    );
}
