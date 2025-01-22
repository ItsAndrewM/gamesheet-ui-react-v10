export type LiveGameData = {
    id: string;
    gameNumber: string;
    home: LiveGameTeam;
    visitor: LiveGameTeam;
    updatedAt: {
        seconds: number;
        nanoseconds: number;
    };
    scoring: {
        [key: string]: {
            visitor: number;
            home: number;
        };
    };
    periods: {
        [key: string]: number;
    };
    category: string;
    shots: {
        [key: string]: {
            home: number;
            visitor: number;
        };
    };
    gameType: {
        gamesPlayed: number;
        title: string;
        gamesTotal: number;
    };
    scheduledStartTime: {
        seconds: number;
        nanoseconds: number;
    };
    connected: boolean;
    location: string;
    status: string;
    events: LiveEventData[];
    shifts: LiveGoalieShiftEvent[];
    settings?: {
        [x: string]: any;
    };
};

export type LiveGameTeam = {
    division: {
        id: string;
        title: string;
    };
    goals: {
        [key: string]: LiveGameGoal;
    };
    record: string;
    title: string;
    logo: string;
    id: string;
    roster: {
        players: LiveTeamRosterPlayer[];
        coaches: LiveTeamRosterCoach[];
    };
};

export type LiveGameGoal = {
    period: string;
    time: string;
    scorer: LivePlayerData;
};

export type LivePlayerData = {
    id: string;
    firstName: string;
    lastName: string;
    addedAtGameTime: boolean;
    number?: string;
};

export type LiveEventData =
    | LiveShootutEvent
    | LiveGoalEvent
    | LivePenaltyEvent
    | LiveGoalieShiftEvent
    | LivePenaltyEndEvent;

export type LiveShootutEvent = {
    payload: LiveShootutEventData;
    type: "shootoutAttempt";
};

export type LiveGoalEvent = {
    payload: LiveGoalEventData;
    type: "goal";
};

export type LivePenaltyEvent = {
    payload: LivePenaltyEventData;
    type: "penalty";
};

export type LivePenaltyEndEvent = {
    payload: LivePenaltyEventData;
    type: "penaltyEnd";
};

export type LiveGoalieShiftEvent = {
    payload: LiveGoalieShift;
    type: "goalieShift";
};

type PenalizedPlayer = LivePlayerData & { type: "player" };
type PenalizedTeam = { id: string; type: "team" };
type PenalizedCoach = Pick<LivePlayerData, "id" | "firstName" | "lastName"> & { type: "coach" };
export type LivePenaltyEventData = {
    code: string;
    label: string;
    length: string;
    offTime: string;
    onTime: string;
    startTime: string;
    period: string;
    team: "home" | "visitor";
    servedByPlayer: LivePlayerData;
    penalized: PenalizedPlayer | PenalizedTeam | PenalizedCoach;
};

export type LiveGoalEventData = {
    scorer: LivePlayerData;
    goalie: LivePlayerData;
    assistA: LivePlayerData;
    assistB: LivePlayerData;
    period: string;
    time: string;
    team: "home" | "visitor";
};

export type LiveShootutEventData = {
    goalie: LivePlayerData;
    player: LivePlayerData;
    period: "shootout";
    time?: string;
    number: number;
    result: "goal" | "miss" | "save";
    team: "home" | "visitor";
};

export type GoalieShiftTime = {
    period: string;
    time: string;
};

export type LiveGoalieShift = {
    duration: number;
    team: "home" | "visitor";
    period: string;
    time: string;
    on: GoalieShiftTime;
    off: GoalieShiftTime | undefined;
    goalie: LivePlayerData;
};

export type LiveTeamRosterPlayer = {
    id: string;
    firstName: string;
    lastName: string;
    position: string;
    team: "home" | "visitor";
    addedAtGameTime: boolean;
    duty: string;
    number: string;
    stats: {
        assists: 0;
        points: 0;
        goals: 0;
        goalsAgainst: 0;
        goalsAgainstAvg: 0;
        penaltyMinutes: 0;
        saves: 0;
        shotsAgainst: 0;
        timeOnIce: 0;
    };
};

export type LiveTeamRosterCoach = {
    firstName: string;
    lastName: string;
    position: string;
    team: "home" | "visitor";
};
