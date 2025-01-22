type BoxscoreData = {
    ScheduledStartTime: FirestoreTimestamp;
    association: {
        id: number;
        title: string;
    };
    category: string;
    data: {
        homeLabel: string;
        visitorLabel: string;
        broadcaster: string;
        vendors: any;
        isValid: boolean;
    };
    endTime: string;
    gameType: string;
    hasOvertime: boolean;
    hasShootout: boolean;
    home: BoxscoreDataTeam;
    visitor: BoxscoreDataTeam;
    id: number;
    league: {
        title: string;
        id: number;
    };
    location: string;
    number: string;
    periods: [key: string, value: number];
    referees: BoxscoreDataRef[];
    scheduledEndTime: string;
    scheduledStartTime: string;
    scorekeeper: {
        contact: {
            name: string;
            phone: string;
        };
        notes: {
            general_notes: string;
            injury_notes: string;
            timeout: string;
        };
    };
    season: {
        id: number;
        title: string;
        archived: boolean;
    };
    sport: string;
    startTime: string;
    status: string;
    type: string;
    timeZoneName: string;
    events: any[];
    views: any;
    schemas: BoxscoreSchema;
    recentGames?: {
        home?: BoxscoreData[];
        visitor?: BoxscoreData[];
    };
};

type BoxscoreSchemaEvent = {
    time: {
        real: string;
        clock: string;
    };
    id: string;
    notes?: any[];
    penalty?: {
        off: {
            real: string;
            clock: string;
        };
        on: {
            real: string;
            clock: string;
        };
        start: {
            real: string;
            clock: string;
        };
        label: string;
        penalty_class: string;
        value: string;
        length: string;
        code: string;
    };
    against?: {
        team: BoxscoreSchemaEventTeam;
        goalie: BoxscoreSchemaEventPlayer;
    };
    for: BoxscoreSchemaEventPenalty | BoxscoreSchemaEventGoal;
    type: string;
};

type BoxscoreSchemaEventPenalty = {
    team: {
        id: number;
        vs: string;
        division: {
            id: number;
            title: string;
        };
        prototeam: {
            id: string;
            classifications: any;
        };
        details: {
            title: string;
            logo: string;
        };
        record: {
            ties: number;
            wins: number;
            overtimeShootoutWins: number;
            losses: number;
            overtimeShootoutLosses: number;
            points: number;
        };
    };
    player: BoxscoreSchemaEventPlayer;
};

type BoxscoreSchemaEventPlayer = {
    id: number;
    jersey: string;
    firstName: string;
    lastName: string;
    status: string;
    externalId: string;
    position: string;
};

type BoxscoreSchemaEventType =
    | BoxscoreSchemaEvent
    | BoxscoreSchemaEventRunningClock
    | BoxscoreSchemaEventIdOnly
    | BoxscoreSchemaEventPlayerShift;

type BoxscoreSchemaEvents = {
    [key: string]: BoxscoreSchemaEventType;
};

type BoxscoreSchemaEventIdOnly = {
    id: string;
    type: string;
};

type BoxscoreSchemaEventRunningClock = {
    id: string;
    action: string;
    time: {
        clock: string;
        real: string;
    };
    type: string;
};

type BoxscoreSchemaEventGoal = {
    assist: BoxscoreSchemaEventAssist[];
    scorer: BoxscoreSchemaEventScorer;
    team: BoxscoreSchemaEventTeam;
    time: {
        clock: string;
        real: string;
    };
    type: string;
    id: string;
};

type BoxscoreSchemaEventAssist = {
    jersey: string;
    status: string;
    lastName: string;
    externalId: string;
    id: number;
    firstName: string;
    position: string;
    trackingNumber?: string;
    totalGoalCount?: string;
};

type BoxscoreSchemaEventScorer = {
    jersey: string;
    status: string;
    lastName: string;
    externalId: string;
    id: number;
    firstName: string;
    position: string;
    trackingNumber?: string;
    totalGoalCount?: string;
};

type BoxscoreSchemaEventTeam = {
    vs: string;
    prototeam: {
        classifications: any;
        id: string;
    };
    division: {
        id: number;
        title: string;
    };
    id: number;
    details: {
        title: string;
        logo: string;
    };
    record: {
        ties: number;
        wins: number;
        overtimeShootoutWins: number;
        losses: number;
        overtimeShootoutLosses: number;
        points: number;
    };
};

type BoxscoreSchemaEventPlayerShift = {
    player: BoxscoreSchemaEventPlayer;
    team: BoxscoreSchemaEventTeam;
    type: string;
    time: {
        clock: string;
        real: string;
    };
    id: string;
    shift: string;
};

type BoxscoreSchema = {
    id: string;
    schema: string;
    data: BoxscoreSchemaData;
    version: string;
    events: BoxscoreSchemaEvents;
    sport: string;
    computed: BoxscoreComputedData;
    meta: {
        lastUpdate: FirestoreTimestamp;
    };
};

type BoxscoreDataRef = {
    email_address: string;
    id: string;
    position: string;
    signature: string;
};

type BoxscoreDataTeam = {
    division: {
        id: number;
        title: string;
    };
    fppEarned: boolean;
    goals: BoxscoreDataTeamGoal[];
    id: number;
    logo: string;
    prototeam: {
        classifications: any | null;
        id: string;
    };
    record: {
        diff: number;
        fairPlayPoints: number;
        gamesPlayed: number;
        goalsAgainst: number;
        goalsFor: number;
        losses: number;
        maxPoints: number;
        overtimeShootoutLosses: number;
        overtimeShootoutWins: number;
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
    scoreboard: [key: string, value: number][];
    shifts: BoxscoreDataTeamGoalie[];
    shootoutAttempts: any[];
    shots: any[];
    title: string;
};

type BoxscoreDataTeamGoalie = {
    goalie_id: string;
    period: string;
    time: string;
};

type BoxscoreDataTeamGoal = {
    clockTime: string;
    firstName: string;
    id: number;
    lastName: string;
    period: string;
};

type BoxscoreGameScoreData = {
    data: {
        homeLabel: string;
        visitorLabel: string;
    };
    date: {
        Time: FirestoreTimestamp;
    };
    gameNumber: string;
    gameStatus: string;
    gameType: string;
    hasOvertime: boolean;
    hasShootout: boolean;
    id: number;
    location: string;
    scheduledStartTime: string;
    season: {
        Archived: boolean;
        Id: number;
        Title: string;
    };
    home: BoxscoreGameScoreTeam;
    visitor: BoxscoreGameScoreTeam;
};

type BoxscoreGameScoreTeam = {
    division: {
        Title: string;
        Id: number;
    };
    finalScore: number;
    logo: string;
    id: number;
    title: string;
    sog: number;
    record: {
        gp: number;
        w: number;
        l: number;
        t: number;
        otl: number;
        otw: number;
        pts: number;
    };
    roster: BoxscoreGameScoreRoster;
};

type BoxscoreGameScoreRoster = {
    coaches: BoxscoreGameScoreCoach[];
    goalies: BoxscoreGameScorePlayer[];
    players: BoxscoreGameScorePlayer[];
};

type BoxscoreGameScoreCoach = {
    firstName: string;
    id: number;
    lastName: string;
    position: string;
    signature: string;
    status: string;
};

type BoxscoreGameScorePlayer = {
    a: number;
    added_at_game_time: boolean;
    affiliated: boolean;
    duty: string;
    firstName: string;
    g: number;
    ga: number;
    id: string;
    lastName: string;
    number: string;
    pim: number;
    position: string;
    pts: number;
    rc: number;
    sa: number;
    starting: boolean;
    status: string;
    svpct: number;
    toi: number;
    yc: number;
};

type BoxscoreTeamStatsData = {
    home: BoxscoreTeamStatsTeam;
    visitor: BoxscoreTeamStatsTeam;
    __collections__?: {};
};

type BoxscoreTeamStatsTeam = {
    "g/pg": string;
    "ga/pg": string;
    "ppg/gp": string;
    "pim/gp": string;
    "yc/pg": string;
    "rc/pg": string;
};

type BoxscoreSchemaData = {
    game: {
        broadcaster: string;
        category: string;
        endtime: string;
        id: number;
        isValid: boolean;
        location: string;
        number: string;
        periods: {
            [key: string]: number;
        };
        status: string;
        type: string;
    };
    home: BoxscoreSchemaTeam;
    id: number;
    officials: BoxscoreSchemaOfficial;
    organizations: BoxscoreSchemaOrganizations;
    visitor: BoxscoreSchemaTeam;
};

type BoxscoreSchemaTeam = {
    details: {
        logo: string;
        title: string;
    };
    division: {
        id: number;
        title: string;
    };
    id: number;
    lineup: {
        coaches: BoxscoreGameScoreCoach[];
        players: BoxscoreGameScorePlayer[];
        signature: string;
        signedBy: string;
    };
    prototeam: {
        classifications: null;
        id: string;
    };
    record: {
        losses: number;
        overtimeShootoutLosses: number;
        overtimeShootoutWins: number;
        points: number;
        ties: number;
        wins: number;
    };
    sog?: number | string;
};

type BoxscoreSchemaOrganization = {
    id: number;
    title: string;
    type: string;
};

type BoxscoreSchemaOrganizations = BoxscoreSchemaOrganization[];

type BoxscoreSchemaOfficial = {
    referees: BoxscoreSchemaOfficial[];
    scorekeeper: {
        contact: {
            name: string;
            phone: string;
        };
        notes: {
            general_notes: string;
            injury_notes: string;
            timeout: string;
        };
    };
};

type BoxscoreH2HData = {
    games: BoxscoreH2H[];
};

type FirestoreTimestamp = {
    seconds: number;
    nanoseconds: number;
};

type BoxscoreH2H = {
    date: {
        Time: FirestoreTimestamp;
    };
    home: {
        logo: string;
        score: number;
        title: string;
    };
    id: number;
    visitor: {
        logo: string;
        score: number;
        title: string;
    };
};

type BoxscoreLeadersData = {
    home: BoxscoreLeadersTeam;
    visitor: BoxscoreLeadersTeam;
    __collections__: {};
};

type BoxscoreLeadersTeam = {
    Assists: BoxscoreLeadersPlayer | null;
    Goals: BoxscoreLeadersPlayer | null;
    PenaltyMinutes: BoxscoreLeadersPlayer | null;
    Points: BoxscoreLeadersPlayer | null;
    RedCards: BoxscoreLeadersPlayer | null;
    YellowCards: BoxscoreLeadersPlayer | null;
};

type BoxscoreLeadersPlayer = {
    Avatar: string;
    FirstName: string;
    LastName: string;
    Id: number;
    Jersey: string;
    Stat: number;
    Team: string;
    Type: string;
};

// type BoxscoreGameTodayCompleted = {
//     connected: boolean;
//     gameNumber: string;
//     gameType: {
//         title: string;
//     };
//     home: BoxscoreGameTodayTeam;
//     visitor: BoxscoreGameTodayTeam;
//     location: string;
//     periods: {
//         [key: string]: number;
//     };
//     scheduledStartTime: {
//         __time__: string;
//     };
// };

// type BoxscoreGameTodayTeam = {};

type BoxscoreComputedData = {
    fppEarned: {
        home: boolean;
        visitor: boolean;
    };
    goalies: {
        home: BoxscoreComputedGoalie;
        time: {
            clock: string;
            real: string;
        };
        visitor: BoxscoreComputedGoalie;
    };
    hasOvertime: boolean;
    hasShootout: boolean;
    scoreboard: {
        [key: string]: {
            home: number;
            visitor: number;
        };
    };
    status: string;
};

type BoxscoreComputedGoalie = {
    externalId: string;
    firstName: string;
    id: number;
    jersey: string;
    lastName: string;
    position: string;
    status: string;
};

type GameSummaryScoringTable = {
    title: GameSummaryScoringTableTitle[];
    final: string[];
    scoresByPeriod: GameSummaryScoringTableScoresByPeriod[];
};

type GameSummaryScoringTableScoresByPeriod = {
    data: number[];
    period: string;
};

type GameSummaryScoringTableTitle = {
    id: number;
    title: string;
};

type GameSummaryShots = {
    title: GameSummaryScoringTableTitle[];
    final: string[];
    shotsByPeriod: GameSummaryShotsByPeriod[];
};

type GameSummaryShotsByPeriod = {
    data: string[];
    period: string;
};

export type {
    BoxscoreData,
    BoxscoreDataRef,
    BoxscoreDataTeam,
    BoxscoreDataTeamGoal,
    BoxscoreDataTeamGoalie,
    BoxscoreGameScoreData,
    BoxscoreGameScoreTeam,
    BoxscoreGameScoreCoach,
    BoxscoreGameScorePlayer,
    BoxscoreGameScoreRoster,
    BoxscoreTeamStatsData,
    BoxscoreTeamStatsTeam,
    BoxscoreSchema,
    BoxscoreSchemaData,
    BoxscoreSchemaTeam,
    BoxscoreSchemaOrganizations,
    BoxscoreSchemaOrganization,
    BoxscoreSchemaOfficial,
    BoxscoreSchemaEventType,
    BoxscoreSchemaEvent,
    BoxscoreSchemaEventRunningClock,
    BoxscoreSchemaEventIdOnly,
    BoxscoreSchemaEventPlayerShift,
    BoxscoreSchemaEvents,
    BoxscoreSchemaEventPenalty,
    BoxscoreSchemaEventGoal,
    BoxscoreSchemaEventAssist,
    BoxscoreSchemaEventScorer,
    BoxscoreSchemaEventTeam,
    BoxscoreH2HData,
    BoxscoreH2H,
    BoxscoreLeadersData,
    BoxscoreLeadersTeam,
    BoxscoreLeadersPlayer,
    BoxscoreComputedData,
    BoxscoreComputedGoalie,
    GameSummaryScoringTable,
    GameSummaryScoringTableScoresByPeriod,
    GameSummaryScoringTableTitle,
    GameSummaryShots,
    GameSummaryShotsByPeriod,
};
