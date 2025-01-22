import {
    BoxscoreSchema,
    BoxscoreSchemaEvent,
    BoxscoreSchemaEventPlayerShift,
    GameSummaryScoringTable,
    GameSummaryScoringTableScoresByPeriod,
    GameSummaryScoringTableTitle,
    GameSummaryShots,
    GameSummaryShotsByPeriod,
} from "@/types/BoxscoreV2";
import { addOrdinalSuffix } from "./addOrdinalSuffix";

export const DEFAULT_PERIODS = {
    "1": 20,
    "2": 20,
    "3": 20,
};

export function generateGameSummary(schemas: BoxscoreSchema) {
    if (!schemas) {
        const { scoring, goalieInfoHome, goalieInfoVisitor, goalsByPeriod, penaltiesByPeriod, shots } =
            calcEmptyTables();
        return {
            scoring,
            goalieInfoHome,
            goalieInfoVisitor,
            goalsByPeriod,
            penaltiesByPeriod,
            shots,
        };
    }

    const { computed, data, events } = schemas || {};

    const { game, home, visitor } = data || {};

    const { periods } = game || {};

    const { scoreboard } = computed || {};

    const { total } = scoreboard || {};

    // goalie info
    const goalieEvents = Object.values(events).filter((event) =>
        event.type.toLowerCase().includes("shift"),
    ) as BoxscoreSchemaEventPlayerShift[];
    const goalieEventHome = goalieEvents.filter((event) => event.team.vs === "home") as ShiftEvent[];
    const goalieEventVisitor = goalieEvents.filter((event) => event.team.vs === "visitor") as ShiftEvent[];
    const goalieInfoHome = transformToLegacyGoalieInfo(goalieEventHome, periods);
    const goalieInfoVisitor = transformToLegacyGoalieInfo(goalieEventVisitor, periods);

    // scoring table
    const scoresByPeriod: GameSummaryScoringTableScoresByPeriod[] = [];
    Object.keys(scoreboard).forEach((period) => {
        const periodAsNumber = period.match(/^[0-9]+$/) ? Number(period).toString() : period;
        // implicitly setting visitor on index 0 and home on index 1
        const scoreVals = [scoreboard[period].visitor, scoreboard[period].home];
        if (periods[periodAsNumber]) {
            scoresByPeriod.push({
                period: addOrdinalSuffix(Number(periodAsNumber)).toUpperCase(),
                data: scoreVals,
            });
        }
    });
    // set final to visitor to index 0 and home to index 1
    const final: string[] = [total.visitor.toString(), total.home.toString()];
    const title: GameSummaryScoringTableTitle[] = [
        { id: visitor.id, title: visitor.details.title },
        { id: home.id, title: home.details.title },
    ];

    // shots table
    const shotsByPeriod: GameSummaryShotsByPeriod[] = [];
    Object.keys(scoreboard).forEach((period) => {
        const periodAsNumber = period.match(/^[0-9]+$/) ? Number(period).toString() : period;
        // implicitly setting visitor on index 0 and home on index 1
        const shotsVals = ["0", "0"];
        if (periods[periodAsNumber]) {
            shotsByPeriod.push({
                period: addOrdinalSuffix(Number(periodAsNumber)).toUpperCase(),
                data: shotsVals,
            });
        }
    });

    // goals by period
    const goalEvents = Object.values(events).filter(
        (event): event is BoxscoreSchemaEvent => event.type.toLowerCase().includes("goal") && "for" in event,
    );
    const goalsByPeriod: PeriodData[] = [
        { period: "1ST PERIOD", periodEvents: [], type: "goals" },
        { period: "2ND PERIOD", periodEvents: [], type: "goals" },
        { period: "3RD PERIOD", periodEvents: [], type: "goals" },
    ];
    goalEvents.forEach((event) => {
        if (!("assist" in event.for && "scorer" in event.for && "team" in event.for)) return;
        const [period, minutes, seconds] = event.time.clock.split(":") || [];
        const periodAsNumber = period.match(/^[0-9]+$/) ? Number(period).toString() : period;
        const [assist1By, assist2By] = "assist" in event.for ? event.for.assist : [null, null];

        const scoreVals = {
            assist1By: assist1By
                ? {
                      id: assist1By.id,
                      title: `${assist1By.firstName} ${assist1By.lastName}`,
                      number: assist1By.jersey,
                      totalGoalCount: assist1By.totalGoalCount ? assist1By.totalGoalCount : "",
                      trackingNumber: assist1By.trackingNumber ? assist1By.trackingNumber : "",
                  }
                : null,
            assist2By: assist2By
                ? {
                      id: assist2By.id,
                      title: `${assist2By.firstName} ${assist2By.lastName}`,
                      number: assist2By.jersey,
                      totalGoalCount: assist2By.totalGoalCount ? assist2By.totalGoalCount : "",
                      trackingNumber: assist2By.trackingNumber ? assist2By.trackingNumber : "",
                  }
                : null,
            homeTeam: event.for.team.vs === "home",
            en: false,
            eventType: "goal",
            gameWinningGoal: false,
            shg: false,
            powerPlay: false,
            period: Number(period).toString(),
            goalScorer: {
                id: event.for.scorer.id,
                title: `${event.for.scorer.firstName} ${event.for.scorer.lastName}`,
                number: event.for.scorer.jersey,
                trackingNumber: event.for.scorer.trackingNumber ? event.for.scorer.trackingNumber : "",
                totalGoalCount: event.for.scorer.totalGoalCount ? event.for.scorer.totalGoalCount : "",
            },
            team: {
                id: event.for.team.id,
                title: event.for.team.details.title,
                logo: event.for.team.details.logo,
            },
            time: minutes + ":" + seconds,
        };
        const indexOfPeriod = goalsByPeriod.findIndex(
            (period) => period.period === addOrdinalSuffix(Number(periodAsNumber)).toUpperCase() + " PERIOD",
        );
        if (periods[periodAsNumber]) {
            goalsByPeriod[indexOfPeriod].periodEvents.push({
                ...scoreVals,
                eventType: "goal" as const,
            });
        }
    });

    // goals by period
    const penaltyEvents = Object.values(events).filter(
        (event): event is BoxscoreSchemaEvent => event.type.toLowerCase().includes("penalty") && "for" in event,
    );
    const penaltiesByPeriod: PeriodPenaltyData[] = [
        { period: "1ST PERIOD", periodEvents: [], type: "penalty" },
        { period: "2ND PERIOD", periodEvents: [], type: "penalty" },
        { period: "3RD PERIOD", periodEvents: [], type: "penalty" },
    ];
    penaltyEvents.forEach((event) => {
        if (!("penalty" in event && "player" in event.for && "team" in event.for)) return;
        const [period, minutes, seconds] = event.time.clock.split(":") || [];
        const periodAsNumber = period.match(/^[0-9]+$/) ? Number(period).toString() : period;

        const penaltyVals = {
            commitedBy: {
                id: event.for.player.id,
                title: `${event.for.player.firstName} ${event.for.player.lastName}`,
                number: event.for.player.jersey,
                type: event.for.player.position,
            },
            major: event.penalty?.penalty_class === "major",
            penaltyType: {
                title: event.penalty?.label,
                duration: event.penalty?.length,
                class: event.penalty?.penalty_class,
            },
            homeTeam: event.for.team.vs === "home",
            en: false,
            eventType: "goal",
            gameWinningGoal: false,
            shg: false,
            powerPlay: false,
            period: Number(period).toString(),
            team: {
                id: event.for.team.id,
                title: event.for.team.details.title,
                logo: event.for.team.details.logo,
            },
            servedBy: {
                id: "",
                title: `${event.for.player.firstName} ${event.for.player.lastName}`,
                number: event.for.player.jersey,
            },
            time: minutes + ":" + seconds,
        };
        const indexOfPeriod = goalsByPeriod.findIndex(
            (period) => period.period === addOrdinalSuffix(Number(periodAsNumber)).toUpperCase() + " PERIOD",
        );
        if (periods[periodAsNumber]) {
            penaltiesByPeriod[indexOfPeriod].periodEvents.push({
                ...penaltyVals,
                penaltyType: {
                    ...penaltyVals.penaltyType,
                    title: penaltyVals.penaltyType.title || "",
                    duration: penaltyVals.penaltyType.duration || "",
                    class: penaltyVals.penaltyType.class || "",
                },
                eventType: "penalty" as const,
            });
        }
    });

    const scoring: GameSummaryScoringTable = {
        final,
        scoresByPeriod,
        title,
    };
    const shots: GameSummaryShots = {
        final: ["0", "0"],
        shotsByPeriod,
        title,
    };

    const shootoutSummaryHome = {
        goalie: [],
        player: [],
        result: [],
        number: [],
        goalieId: [],
        playerId: [],
    };
    const shootoutSummaryVisitor = {
        goalie: [],
        player: [],
        result: [],
        number: [],
        goalieId: [],
        playerId: [],
    };
    return {
        scoring,
        goalieInfoHome,
        goalieInfoVisitor,
        goalsByPeriod,
        penaltiesByPeriod,
        shootoutSummaryHome,
        shootoutSummaryVisitor,
        shots,
    };
}

interface Player {
    id: string | number;
    title: string;
    number: string;
    totalGoalCount?: string;
    trackingNumber?: string;
}

interface Team {
    id: number;
    title: string;
    logo: string;
}

interface GoalEvent {
    assist1By: Player | null;
    assist2By: Player | null;
    homeTeam: boolean;
    en: boolean;
    eventType: "goal";
    gameWinningGoal: boolean;
    shg: boolean;
    powerPlay: boolean;
    period: string;
    goalScorer: Omit<Player, "totalGoalCount" | "trackingNumber">;
    team: Team;
    time: string;
}

interface PenaltyEvent {
    commitedBy: Omit<Player, "totalGoalCount" | "trackingNumber">;
    major: boolean;
    penaltyType: {
        title: string;
        duration: string;
        class?: string;
    };
    homeTeam: boolean;
    en: boolean;
    eventType: "penalty";
    gameWinningGoal: boolean;
    shg: boolean;
    powerPlay: boolean;
    period: string;
    servedBy: Omit<Player, "totalGoalCount" | "trackingNumber">;
    team: Team;
    time: string;
}

interface PeriodData {
    period: "1ST PERIOD" | "2ND PERIOD" | "3RD PERIOD";
    periodEvents: GoalEvent[];
    type: "goals";
}

interface PeriodPenaltyData {
    period: "1ST PERIOD" | "2ND PERIOD" | "3RD PERIOD";
    periodEvents: PenaltyEvent[];
    type: "penalty";
}

type ShiftEvent = {
    shift: "start" | "end";
    time: {
        clock: string;
        real: string;
    };
    type: string;
    id: string;
    team: {
        id: number;
        details: {
            title: string;
        };
    };
    player: {
        id: number;
        firstName: string;
        lastName: string;
        jersey: string;
    };
};

type LegacyGoalieInfo = {
    title: string[];
    id: string[];
    tois: string[];
    ons: Array<{ period: string; time: string }>;
    offs: Array<{ period: string; time: string }>;
};

const transformToLegacyGoalieInfo = (events: ShiftEvent[], periods: Record<string, number>): LegacyGoalieInfo => {
    // Group events by player

    if (events.length === 0) {
        const ons = [{ period: "1", time: "00:00" }];
        const offs = [{ period: "3", time: formatTimeForPeriod("01:00:00", periods) }];
        const toi = calculateTotalTimeOnIce(ons, offs, periods);

        return {
            title: ["# Unknown Unknown"],
            id: ["Unknown"],
            tois: [formatTOI(toi)],
            ons: [{ period: "1", time: "00:00" }],
            offs: [{ period: "3", time: formatTimeForPeriod("01:00:00", periods) }],
        };
    }
    const goalieShifts = events.reduce(
        (acc, event) => {
            const [period] = event.time.clock.split(":") || [];
            const playerId = event.player.id.toString();

            if (!acc[playerId]) {
                acc[playerId] = {
                    title: [],
                    id: [],
                    tois: [],
                    ons: [],
                    offs: [],
                };
            }

            // Add player info first time we see them
            if (acc[playerId].title.length === 0) {
                const title = `#${event.player.jersey} ${event.player.firstName} ${event.player.lastName}`;
                acc[playerId].title.push(title);
                acc[playerId].id.push(playerId);
            }

            // Add shift info
            if (event.shift === "start") {
                acc[playerId].ons.push({
                    period: Number(period).toString(),
                    time: formatTimeForPeriod(event.time.clock, periods),
                });
            } else {
                acc[playerId].offs.push({
                    period: getPeriodFromTime(event.time.clock),
                    time: formatTimeForPeriod(event.time.clock, periods),
                });
            }

            if (acc[playerId].offs.length === 0) {
                acc[playerId].offs.push({
                    period: getLargestPeriod(periods),
                    time: "00:00",
                });
            }

            // Calculate TOI
            if (acc[playerId].ons.length === acc[playerId].offs.length) {
                const toi = calculateTotalTimeOnIce(acc[playerId].ons, acc[playerId].offs, periods);
                acc[playerId].tois = [formatTOI(toi)];
            }

            return acc;
        },
        {} as Record<string, LegacyGoalieInfo>,
    );

    // Return the first goalie's info (assuming one goalie per team)
    return Object.values(goalieShifts)[0];
};

const getLargestPeriod = (periods: Record<string, number>): string => {
    const periodsArray = Object.keys(periods)
        .map((period) => Number(period))
        .filter((period) => typeof period === "number" && period > 0);
    return periodsArray.sort((a, b) => a - b)[periodsArray.length - 1].toString();
};

// Helper functions
const getPeriodFromTime = (clock: string): string => {
    const totalMinutes = parseInt(clock.split(":")[0]);
    return Math.ceil(totalMinutes / 20).toString();
};

const formatTimeForPeriod = (clock: string, periods: Record<string, number>): string => {
    const [period, minutes, seconds] = clock.split(":") || [];
    if (minutes === "00" && period === "01") {
        return periods[Number(period).toString()].toString() + ":00";
    }
    const periodMinutes = parseInt(minutes) % 20;
    return `${periodMinutes}:${seconds}`;
};

const calculateTotalTimeOnIce = (
    ons: Array<{ period: string; time: string }>,
    offs: Array<{ period: string; time: string }>,
    periods: Record<string, number>,
): number => {
    let totalSeconds = 0;

    if (ons.length === 1 && offs.length === 1 && ons[0].period === "1" && offs[0].period === "3") {
        // If there's only one shift, and it's on the first period, return the time difference
        let minutes = 0;
        Object.values(periods).forEach((period) => {
            if (Number(period) > 0) {
                minutes += Number(period);
            }
        });
        return minutes * 60;
    }

    for (let i = 0; i < ons.length; i++) {
        const onTime = convertToSeconds(ons[i].time);
        const offTime = convertToSeconds(offs[i].time);
        totalSeconds += onTime - offTime;
    }

    return totalSeconds;
};

const convertToSeconds = (time: string): number => {
    const [minutes, seconds] = time.split(":").map(Number) || [];
    return minutes * 60 + seconds;
};

const formatTOI = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

function calcEmptyTables() {
    const ons = [{ period: "1", time: "00:00" }];
    const offs = [{ period: "3", time: formatTimeForPeriod("01:00:00", DEFAULT_PERIODS) }];
    const toi = calculateTotalTimeOnIce(ons, offs, DEFAULT_PERIODS);

    const emptyGoalieInfo = {
        title: ["# Unknown Unknown"],
        id: ["Unknown"],
        tois: [formatTOI(toi)],
        ons: [{ period: "1", time: "00:00" }],
        offs: [{ period: "3", time: formatTimeForPeriod("01:00:00", DEFAULT_PERIODS) }],
    };
    const emptyGoalsByPeriod = [
        {
            period: "1ST PERIOD",
            periodEvents: [],
            type: "goals",
        },
        {
            period: "2ND PERIOD",
            periodEvents: [],
            type: "goals",
        },
        {
            period: "3RD PERIOD",
            periodEvents: [],
            type: "goals",
        },
    ];
    const emptyPenaltiesByPeriod = [
        {
            period: "1ST PERIOD",
            periodEvents: [],
            type: "penalty",
        },
        {
            period: "2ND PERIOD",
            periodEvents: [],
            type: "penalty",
        },
        {
            period: "3RD PERIOD",
            periodEvents: [],
            type: "penalty",
        },
    ];
    const emptyShots = {
        title: [
            {
                id: 0,
                title: "Visitor",
            },
            {
                id: 0,
                title: "Home",
            },
        ],
        final: ["0", "0"],
        shotsByPeriod: [
            {
                data: ["0", "0"],
                period: "1",
            },
            {
                data: ["0", "0"],
                period: "2",
            },
            {
                data: ["0", "0"],
                period: "3",
            },
        ],
    };
    const emptyScores = {
        title: [
            {
                id: 0,
                title: "Visitor",
            },
            {
                id: 0,
                title: "Home",
            },
        ],
        final: ["0", "0"],
        scoresByPeriod: [
            {
                data: ["0", "0"],
                period: "1",
            },
            {
                data: ["0", "0"],
                period: "2",
            },
            {
                data: ["0", "0"],
                period: "3",
            },
        ],
    };
    return {
        scoring: emptyScores,
        goalieInfoHome: emptyGoalieInfo,
        goalieInfoVisitor: emptyGoalieInfo,
        goalsByPeriod: emptyGoalsByPeriod,
        penaltiesByPeriod: emptyPenaltiesByPeriod,
        shots: emptyShots,
    };
}
