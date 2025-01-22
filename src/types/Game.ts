// Reuse existing types
import { GoalEvent, PenaltyEvent } from "./Boxscore";
import { GameSummaryScoringTable, GameSummaryShots } from "./BoxscoreV2";
import type { Team, Game as BaseGame } from "./Games";

// Extended Team type to include specific game data
interface ExtendedTeam extends Omit<Team, "scoreboard"> {
    sog: number;
    finalScore: number;
    recap: {
        period: string;
        events: {
            id: string;
            playerName: string;
            timeStamp: string;
        }[];
    }[];
}

export type GameClockState = { label: string; period: Period; time: string; enabled: boolean } | undefined;

export type Period = {
    [periodNumber: string]: number;
};

// Specific game data interface
export interface GameData {
    periods: Period;
    gameId: string;
    liveId: string;
    gameNumber: string;
    gameType: string;
    date: string;
    location: string;
    gameStatus: string;
    isPlayerStatsPrivate: boolean;
    headToHead: {
        date: string;
        games: {
            team: string;
            score: number;
        }[];
    }[];
    recentGames: {
        visitor: {
            teamId: string;
            games: {
                date: string;
                opponent: string;
                score: string;
                isHome: boolean;
            }[];
        };
        home: {
            teamId: string;
            games: {
                date: string;
                opponent: string;
                score: string;
                isHome: boolean;
            }[];
        };
    };
    gameInfo: Pick<BaseGame, "id" | "type" | "location" | "status"> & {
        date: string;
        periods: {
            name: string;
            length: number;
        }[];
    };
    visitor: ExtendedTeam;
    home: ExtendedTeam;
    scoringSummary: {
        visitor: {
            period: string;
            goals: number;
            shots: number;
        }[];
        home: {
            period: string;
            goals: number;
            shots: number;
        }[];
    };
    playByPlay: {
        goalsByPeriod: {
            eventsByPeriod: {
                period: string;
                type: "goal";
                periodEvents: GoalEvent[];
            }[];
        };
        penaltiesByPeriod: {
            eventsByPeriod: {
                period: string;
                type: "penalty";
                periodEvents: PenaltyEvent[];
            }[];
        };
    };
    goaltending: {
        visitor: {
            name: string;
            number: string;
            periods: {
                saves: number;
                shotsAgainst: number;
            }[];
            totals: {
                saves: number;
                shotsAgainst: number;
                savePercentage: number;
            };
            time: {
                onIce: string;
                offIce: string;
                total: string;
            };
        }[];
        home: {
            name: string;
            number: string;
            periods: {
                saves: number;
                shotsAgainst: number;
            }[];
            totals: {
                saves: number;
                shotsAgainst: number;
                savePercentage: number;
            };
            time: {
                onIce: string;
                offIce: string;
                total: string;
            };
        }[];
    };
    teamStats: {
        gpg: {
            visitor: number;
            home: number;
            label: string;
        };
        gapg: {
            visitor: number;
            home: number;
            label: string;
        };
        ppgpg: {
            visitor: number;
            home: number;
            label: string;
        };
        pmpg: {
            visitor: number;
            home: number;
            label: string;
        };
        ycpg: {
            visitor: number;
            home: number;
            label: string;
        };
        rcpg: {
            visitor: number;
            home: number;
            label: string;
        };
    };
}

export type GameSummaryData = {
    gameId: string;
    gameNumber: string;
    gameType: string;
    date: string;
    location: string;
    gameStatus: string;
    isPlayerStatsPrivate: boolean;
    periods: Period;
    home: GameSummaryTeam;
    visitor: GameSummaryTeam;
    tables: GameSummaryTable;
};

type GameSummaryCoach = {
    firstName: string;
    lastName: string;
    position: string;
    id: string;
    signature: string;
    status: string;
};

type GameSummaryPlayer = {
    a: number | null;
    added_at_game_time: boolean;
    affiliated: boolean;
    duty: string;
    firstName: string;
    g: number | null;
    ga: number | null;
    id: string;
    lastName: string;
    number: string;
    pim: number | null;
    position: string;
    pts: number | null;
    rc: number;
    sa: number | null;
    season: {
        assists: number | null;
        goals: number | null;
    };
    starting: boolean;
    status: string;
    svpct: number | null;
    toi: number | null;
    yc: number;
};

interface GameSummaryGoalie extends GameSummaryPlayer {
    gaa: number;
}

type GameSummaryPenalty = {
    eventType: string;
    time: string;
    period: string;
    homeTeam: boolean;
    major: boolean;
    commitedBy: {
        type: string;
        title: string;
        id: string;
        number: string;
    };
    servedBy: {
        id: string;
        title: string;
        number: string;
    };
    penaltyType: {
        title: string;
        duration: string;
        class?: string;
    };
    team: {
        id: number;
        title: string;
        logo: string;
    };
};

type GameSummaryGoal = {
    eventType: string;
    time: string;
    period: string;
    homeTeam: boolean;
    powerPlay: boolean;
    gameWinningGoal: boolean;
    shg: boolean;
    en: boolean;
    goalScorer: Partial<GameSummaryPlayer>;
    assist1By?: Partial<GameSummaryPlayer>;
    assist2By?: Partial<GameSummaryPlayer>;
    team: {
        id: number;
        title: string;
        logo: string;
    };
};

type GameSummaryTeam = {
    id: number;
    title: string;
    division: string;
    record: string;
    logo: string;
    finalScore: string;
    sog: number;
    roster: {
        coaches: GameSummaryCoach[];
        players: GameSummaryPlayer[];
        goalies: GameSummaryGoalie[];
    };
    penalties: GameSummaryPenalty[];
    goals: GameSummaryGoal[];
};

export type GameSummaryTable = {
    scoring: GameSummaryScoringTable;
    goalsByPeriod: GameSummaryGoalsByPeriod[];
    penaltiesByPeriod: GameSummaryPenaltiesByPeriod[];
    shots: GameSummaryShots;
    goalieInfoVisitor: GameSummaryGoalieInfo;
    goalieInfoHome: GameSummaryGoalieInfo;
    shootoutSummaryVisitor: GameSummaryShootoutSummary;
    shootoutSummaryHome: GameSummaryShootoutSummary;
};

export type GameSummaryGoalsByPeriod = {
    period: string;
    periodEvents: GameSummaryGoalEvent[];
    type: string;
};

export type GameSummaryGoalEvent = {
    eventType: string;
    time: string;
    period: string;
    homeTeam: boolean;
    powerPlay: boolean;
    gameWinningGoal: boolean;
    shg: boolean;
    en: boolean;
    goalScorer: { id: string; title: string; number: string; trackingNumber: string; totalGoalCount: string };
    assist1By?: { id: string; title: string; number: string; trackingNumber: string; totalGoalCount: string };
    assist2By?: { id: string; title: string; number: string; trackingNumber: string; totalGoalCount: string };
    team: {
        id: number;
        title: string;
        logo: string;
    };
};

export type GameSummaryPenaltiesByPeriod = {
    period: string;
    periodEvents: GameSummaryPenaltyEvent[];
    type: string;
};

export type GameSummaryPenaltyEvent = {
    eventType: string;
    time: string;
    period: string;
    homeTeam: boolean;
    major: boolean;
    commitedBy: {
        type: string;
        title: string;
        id: string;
        number: string;
    };
    servedBy: {
        id: string;
        title: string;
        number: string;
    };
    penaltyType: {
        title: string;
        duration: string;
        class?: string;
    };
    team: {
        id: number;
        title: string;
        logo: string;
    };
};

export type GameSummaryGoalieInfo = {
    title: string[];
    id: string[];
    tois: string[];
    ons: GameSummaryGoalieInfoOn[];
    offs: GameSummaryGoalieInfoOff[];
};

type GameSummaryGoalieInfoOn = {
    period: string;
    time: string;
};

type GameSummaryGoalieInfoOff = {
    period: string;
    time: string;
};

type GameSummaryShootoutSummary = {
    playerId: string[];
    player: GameSummaryPlayer[];
    goalieId: string[];
    goalie: GameSummaryPlayer[];
    result: string[];
    number: string[];
};

export type GameSummaryRecentGame = {
    date: string;
    game: {
        number: string;
        type: string;
        time: string;
        date: string;
        gameId: string;
        periods: {
            name: string;
            length: number;
        }[];
        homeTeam: {
            id: string;
            name: string;
            logo: string;
            division: string;
            record: string;
            recap: {
                period: string;
                events: {
                    id: string;
                    playerName: string;
                    time: string;
                    period: string;
                }[];
            }[];
        };
        visitorTeam: {
            id: string;
            name: string;
            logo: string;
            division: string;
            record: string;
            recap: {
                period: string;
                events: {
                    id: string;
                    playerName: string;
                    time: string;
                    period: string;
                }[];
            }[];
        };
        scoresByPeriod: {
            title: string;
            homeGoals: string;
            visitorGoals: string;
        }[];
        finalScore: {
            homeGoals: number;
            visitorGoals: number;
        };
    };
};
