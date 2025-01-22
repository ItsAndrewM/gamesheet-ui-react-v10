/* eslint-disable @typescript-eslint/no-explicit-any */
import useTranslatePosition from "@/hooks/useTranslatePosition";
import { useFormatBoxScoreRosterTable } from "@/hooks/useFormatBoxscoreRoster";
import { useFormatBoxScoreGoalieTable } from "@/hooks/useFormatBoxscoreGoalie";
import { Header } from "../Header";
import { GoalieLineupTable, PlayerLineupTable } from "../LineupTable";
import { BoxscoreGameScoreTeam } from "@/types/BoxscoreV2";
import { Text } from "@/atomic/01-atoms";

type BoxscoreLineupProps = {
    team: BoxscoreGameScoreTeam;
    isHomeTeam: boolean;
    isSoccer?: boolean;
};

export function BoxscoreLineup({ team, isHomeTeam, isSoccer = false }: BoxscoreLineupProps) {
    const translatePosition = useTranslatePosition();
    const formatBoxScoreRosterTable = useFormatBoxScoreRosterTable();
    const formatBoxScoreGoalieTableData = useFormatBoxScoreGoalieTable();

    const { id, roster, division } = team || {};

    if (!id) {
        return (
            <div className="w-full mt-6">
                <hr className="pt-8" />
                <div className="title-container w-full">
                    <Header title={isHomeTeam ? "Home Roster" : "Visitor Roster"} size="sm" />
                </div>
            </div>
        );
    }

    const { players: rosterPlayers, goalies: goalieRosterData, coaches: rosterCoaches } = roster || {};

    const players = (rosterPlayers || []).filter((player) => player.status === "playing") || [];

    const playerData = {
        numbers: players?.map((player: any) => player.number || ""),
        players: players?.map((player: any) => ({
            id: player?.id,
            title: !player?.firstName || !player.lastName ? "" : `${player.firstName} ${player.lastName}`,
        })),
        positions: players?.map((player: any) => (player.position ? translatePosition(player.position) : "D")),
        goals: players?.map((player: any) => player.g || 0),
        assists: players?.map((player: any) => player.a || 0),
        points: players?.map((player: any) => player.pts || 0),
        pims: players?.map((player: any) => player.pim || 0),
        yc: players?.map((player: any) => player.yc || 0),
        rc: players?.map((player: any) => player.rc || 0),
    };

    const goalies = goalieRosterData || [];
    const goalieData = {
        numbers: goalies?.map((goalie: any) => goalie.number || ""),
        goalies: goalies?.map((goalie: any) => ({
            id: goalie?.id,
            title: !goalie?.firstName || !goalie?.lastName ? "" : `${goalie.firstName} ${goalie.lastName}`,
        })),
        svs: goalies?.map((goalie: any) => {
            const goalieSA = goalie?.sa || 0;
            const goalieGA = goalie?.ga || 0;
            return `${goalieSA - goalieGA}/${goalieSA}`;
        }),
        sas: goalies?.map((goalie: any) => goalie.sa || 0),
        gas: goalies?.map((goalie: any) => goalie.ga || 0),
        gaas: goalies?.map((goalie: any) => (goalie.gaa ? Math.round(goalie.gaa * 100) / 100 : 0).toFixed(2)),
    };

    const { rowData: playerRows } = formatBoxScoreRosterTable(playerData, isSoccer);
    const { rowData: goalieRows } = formatBoxScoreGoalieTableData(goalieData);

    const coaches = (rosterCoaches || [])
        .map((coach: any) => {
            const setPositionName = (position: string) => {
                if (position === "manager") return "Manager";
                if (position === "head_coach") return "Head Coach";
                if (position === "assistant_coach") return "Assistant Coach";
                if (position === "trainer") return "Trainer";
                return "Coach";
            };
            return {
                title: `${coach?.firstName} ${coach?.lastName}`,
                position: setPositionName(coach?.position),
            };
        })
        .sort((a: any, b: any) => (a.position === "Head Coach" ? -1 : 1 > b.position ? -1 : 1));

    const { Title } = division || {};

    return (
        <div className="w-full mt-6 flex flex-col gap-4">
            <div className="title-container">
                <Header title={isHomeTeam ? "Home Roster" : "Visitor Roster"} size="sm" />
            </div>

            <PlayerLineupTable sport={Title} rows={playerRows} />

            <div className="my-4" />

            <GoalieLineupTable rows={goalieRows} />

            <div className="flex flex-col gap-1">
                {coaches.map((coach: any, index: number) => (
                    <Text key={index} type="body.xs">
                        {coach.position}: {coach.title}
                    </Text>
                ))}
            </div>
        </div>
    );
}
