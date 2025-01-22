import { LiveEventData } from "./Live";

export type TableColumn = {
    key: string;
    sortDirection?: SortOrder;
    firstSort?: SortOrder.Asc | SortOrder.Desc;
    isFixed?: boolean;
    alignLeft?: boolean;
    isNotSortable?: boolean;
    label: string;
    labelTip?: string;
    data?: any[];
    subData?: any[];
    tooltips?: string[];
    customSort?: (a: any, b: any) => number;
    onHeaderClick?: (key: string, currentDirection: SortOrder, notSortable: boolean, firstSort: SortOrder) => any;
    mapData?: (
        label: any,
        row: {
            [key: string]: any;
        },
    ) => any;
    mapSubData?: (
        label: any,
        row: {
            [key: string]: any;
        },
    ) => any;
};

export enum SortOrder {
    Asc = "asc",
    Desc = "desc",
    None = "none",
}

export type BoxScoreDisplay = {
    gameNumber: string;
    gameType: string;
    date: string;
    location: string;
    gameStatus: string;
    home: BoxscoreTeam | null;
    homeDivision: string;
    visitor: BoxscoreTeam | null;
    visitorDivision: string;
    goalsByPeriod: GoalPeriod[];
    penaltiesByPeriod: PenaltyPeriod[];
    scoringColumns: TableColumn[];
    shotsColumns: TableColumn[];
    goaltendingVisitorColumns: TableColumn[];
    goaltendingHomeColumns: TableColumn[];
    shootOutHomeColumns?: TableColumn[];
    shootOutVisitorColumns?: TableColumn[];
    didHomeTeamShootFirst?: boolean;
    events?: LiveEventData[];
    lastUpdated?: string;
    periods?: { [x: string]: number };
    homeLabel?: string;
    visitorLabel?: string;
};

export type BoxscoreTeam = {
    id: number;
    title: string;
    division: string;
    record: string;
    logo: string;
    finalScore: string;
    sog: number;
    roster: Record<string, unknown>;
};

export type GoalPeriod = {
    period: string;
    periodEvents: GoalEvent[] | null;
    type: string;
};

export type PenaltyPeriod = {
    period: string;
    periodEvents: PenaltyEvent[] | null;
    type: string;
};

export type GoalEvent = {
    eventType: string;
    time: string;
    period: string;
    goalScorer: {
        title: string;
        number: string;
        id: string;
        trackingNumber: string;
        totalGoalCount: string;
    };
    assist1By?: {
        title: string;
        number: string;
        id: string;
        trackingNumber: string;
        totalGoalCount: string;
    };
    assist2By?: {
        title: string;
        number: string;
        id: string;
        trackingNumber: string;
        totalGoalCount: string;
    };
    team: {
        title: string;
        id: number | string;
        logo: string;
    };
    homeTeam: boolean;
    powerPlay: boolean;
    gameWinningGoal: boolean;
    en: boolean;
    shg: boolean;
};

export type PenaltyEvent = {
    eventType: string;
    time: string;
    period: string;
    major: boolean;
    homeTeam: boolean;
    committedBy: {
        type: string;
        title: string;
        number?: string;
        id: string | number;
    };
    penaltyType: {
        title: string;
        duration: string;
        class?: string;
    };
    team: {
        title: string;
        id: string | number;
        logo: string;
    };
};

export type GamePreviewHeadToHeadData = {
    fields: {
        games: {
            arrayValue: {
                values: GamePreviewHeadToHead[];
            };
        };
    };
};

export type GamePreviewHeadToHeadTeam = {
    mapValue: {
        fields: {
            title: { stringValue: string };
            score: { integerValue: string };
            logo: { stringValue: string };
        };
    };
};

export type GamePreviewHeadToHead = {
    mapValue: {
        fields: {
            id: { integerValue: string };
            date: {
                mapValue: {
                    fields: {
                        Time: {
                            timestampValue: string;
                        };
                    };
                };
            };
            home: GamePreviewHeadToHeadTeam;
            visitor: GamePreviewHeadToHeadTeam;
        };
    };
};

export type GamePreviewTeamStatsTeam = {
    mapValue: {
        fields: {
            "rc/pg": { stringValue: string };
            "yc/pg": { stringValue: string };
            "ppg/gp": { stringValue: string };
            "pim/gp": { stringValue: string };
            "g/pg": { stringValue: string };
            "ga/pg": { stringValue: string };
        };
    };
};

export type GamePreviewTeamStats = {
    fields: { visitor: GamePreviewTeamStatsTeam; home: GamePreviewTeamStatsTeam };
};

export type GamePlayByPlayData = {
    fields: {
        home: GamePlayByPlayTeam;
        visitor: GamePlayByPlayTeam;
        scheduled_game_id: {
            stringValue: string;
        };
        connected: {
            booleanValue: boolean;
        };
        settings: {
            mapValue: {
                fields: {
                    goalValue: {
                        integerValue: string;
                    };
                    assistValue: {
                        integerValue: string;
                    };
                };
            };
        };
        gameType: {
            mapValue: {
                fields: {
                    gamesTotal: {
                        integerValue: string;
                    };
                    title: {
                        stringValue: string;
                    };
                    gamesPlayed: {
                        integerValue: string;
                    };
                };
            };
        };
        category: {
            nullValue: null;
        };
        scheduledStartTime: {
            timestampValue: string;
        };
        status: {
            stringValue: string;
        };
        shots: {
            mapValue: {
                fields: {
                    [key: string]: GamePlayByPlayByPeriod;
                };
            };
        };
        updatedAt: {
            timestampValue: string;
        };
        location: {
            stringValue: string;
        };
        scoring: {
            mapValue: {
                fields: {
                    [key: string]: GamePlayByPlayByPeriod;
                };
            };
        };
        periods: {
            mapValue: {
                fields: {
                    "1": {
                        integerValue: string;
                    };
                    "2": {
                        integerValue: string;
                    };
                    "3": {
                        integerValue: string;
                    };
                    ot_1: {
                        integerValue: string;
                    };
                };
            };
        };
    };
};

export type GamePlayByPlayByPeriod = {
    mapValue: {
        fields: {
            visitor: {
                integerValue: string;
            };
            home: {
                integerValue: string;
            };
        };
    };
};

export type GamePlayByPlayGoals = {
    [key: string]: GamePlayByPlayGoal;
};

export type GamePlayByPlayGoal = {
    mapValue: {
        fields: {
            scorer: {
                mapValue: {
                    fields: {
                        id: {
                            stringValue: string;
                        };
                        lastName: {
                            stringValue: string;
                        };
                        firstName: {
                            stringValue: string;
                        };
                        addedAtGameTime: {
                            booleanValue: boolean;
                        };
                    };
                };
            };
            period: {
                stringValue: string;
            };
            time: {
                stringValue: string;
            };
        };
    };
};

export type GamePlayByPlayTeam = {
    mapValue: {
        fields: {
            id: {
                stringValue: string;
            };
            record?: {
                nullValue: null;
            };
            goals: {
                mapValue: {
                    fields: GamePlayByPlayGoals;
                };
            };
            division: {
                mapValue: {
                    fields: {
                        title: {
                            stringValue: string;
                        };
                        id: {
                            stringValue: string;
                        };
                    };
                };
            };
            title: {
                stringValue: string;
            };
        };
    };
};
