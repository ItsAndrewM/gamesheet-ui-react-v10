/* eslint-disable @typescript-eslint/no-explicit-any */
import { BoxscoreRoster } from "@/atomic/02-molecules";

type GameLineupsProps = {
    lineupData: any;
};

export function GameLineups({ lineupData }: GameLineupsProps) {
    return (
        <>
            <div className="flex justify-evenly gap-4 w-full" data-testid="game-lineups-container">
                <BoxscoreRoster rosterData={lineupData} data-testid="boxscore-roster" />
            </div>
        </>
    );
}
