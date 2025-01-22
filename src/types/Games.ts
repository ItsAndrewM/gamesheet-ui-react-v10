export type Record = {
    diff: number;
    fairPlayPoints: number;
    gamesPlayed: number;
    goalsAgainst: number;
    goalsFor: number;
    losses: number;
    overtimeShootoutLosses: number;
    overtimeShootoutWins: number;
    penaltyMinutes: number;
    periodPoints: number;
    periodsWon: number;
    points: number;
    ppg: number;
    ppga: number;
    ppo: number;
    ppoa: number;
    quickestGoal: number;
    shg: number;
    shga: number;
    shutout: number;
    ties: number;
    wins: number;
};

export type Scoreboard = {
    final: number;
    scorers: null;
    shifts: null;
    shootoutAttempts: null;
    shots: null;
};

export type Team = {
    id: number;
    division: string;
    title: string;
    fppEarned: null;
    goals: null;
    logo: string | null;
    penalties: null;
    record?: Record;
    scoreboard: Scoreboard[];
    prototeam: {
        classifications: any;
        id: string;
    };
};

export type ScheduledStartTime = {
    Time: {
        seconds: number;
        nanoseconds: number;
    };
};

export type Season = {
    id: number;
    title: string;
    StartTime: null;
};

export type Visitor = Team;

export type Home = Team;

export type Game = {
    category: string;
    gameType: string;
    hasOvertime: boolean;
    hasShootout: boolean;
    scheduledStartTime: string;
    scheduledEndTime?: string;
    scheduledTimeGmt?: string;
    timeZoneName?: string;
    normalizedStartDateTime: Date;
    home: Home;
    id: string;
    location: string;
    number: string;
    periods: null;
    ScheduledStartTime: ScheduledStartTime;
    season: Season;
    startTime: null;
    status: string;
    visitor: Visitor;
    type: string;
    eventTitle?: string;
    scorekeeper?: {
        name?: string;
        phone?: string;
    };
};
