import { BoxscoreData } from "@/types/BoxscoreV2";

export function generateBackUpViews(data: BoxscoreData) {
    return {
        schemas: {
            computed: generateComputed(data),
            data: generateData(data),
            events: generateEvents(data),
            id: "v2",
            meta: { lastUpdate: convertTimeToFirestoreTimestamp(data.endTime) },
            schema: "GameSchema",
            sport: data.sport,
            version: "v2",
        },
    };
}

function generateComputed(data: any) {
    const { home, visitor } = data || {};
    const { shifts, fppEarned } = home || {};
    const { visitorShifts, fppEarned: visitorFppEarned } = visitor || {};

    return {
        fppEarned: {
            home: fppEarned,
            visitor: visitorFppEarned,
        },
        goalies: {
            home: {
                externalId: shifts || "Unknown",
                firstName: shifts || "Unknown",
                id: shifts ? Number(data.home.shifts[0].id) : 0,
                jersey: shifts || "Unknown",
                lastName: shifts || "Unknown",
                position: shifts || "Unknown",
                status: shifts || "Unknown",
            },
            time: {
                clock: shifts || "Unknown",
                real: shifts || "Unknown",
            },
            visitor: {
                externalId: visitorShifts || "Unknown",
                firstName: visitorShifts || "Unknown",
                id: visitorShifts ? Number(data.visitor.shifts[0].id) : 0,
                jersey: visitorShifts || "Unknown",
                lastName: visitorShifts || "Unknown",
                position: visitorShifts || "Unknown",
                status: visitorShifts || "Unknown",
            },
        },
        hasOvertime: false,
        hasShootout: false,
        scoreboard: {
            "01": {
                home: data.home.scoreboard[0]["1"] || 0,
                visitor: data.visitor.scoreboard[0]["1"] || 0,
            },
            "02": {
                home: data.home.scoreboard[0]["2"] || 0,
                visitor: data.visitor.scoreboard[0]["2"] || 0,
            },
            "03": {
                home: data.home.scoreboard[0]["3"] || 0,
                visitor: data.visitor.scoreboard[0]["3"] || 0,
            },
            "04": {
                home: data.home.scoreboard[0].score || 0,
                visitor: data.visitor.scoreboard[0].score || 0,
            },
            so: {
                home: !data.home.shootoutAttempts ? 0 : data.home.shootoutAttempts,
                visitor: !data.visitor.shootoutAttempts ? 0 : data.home.shootoutAttempts,
            },
            total: {
                home: data.home.scoreboard[0].final || 0,
                visitor: data.visitor.scoreboard[0].final || 0,
            },
        },
        status: data.status,
    };
}

function generateData(data: any) {
    return {
        id: data.id,
        officials: {
            scorekeeper: {
                notes: {
                    general_notes: data.scorekeeper.notes.general_notes,
                    injury_notes: data.scorekeeper.notes.injury_notes,
                    timeout: data.scorekeeper.notes.timeout,
                },
                contact: {
                    name: data.scorekeeper.contact.name,
                    phone: data.scorekeeper.contact.phone,
                },
            },
            referees: data.referees,
        },
        organizations: [
            {
                id: data.season.id,
                title: data.season.title,
                type: "season",
                archived: data.season.archived,
            },
            {
                id: data.association.id,
                title: data.association.title,
                type: "association",
            },
            {
                id: data.league.id,
                title: data.league.title,
                type: "league",
            },
        ],
        home: {
            id: data.home.id,
            details: {
                title: data.home.title,
                logo: data.home.logo,
            },
            division: {
                id: data.home.division.id,
                title: data.home.division.title,
            },
            lineup: {
                coaches: [],
                players: [],
                signature: "",
                signedBy: "",
            },
            prototeam: {
                id: data.home.prototeam.id,
                classifications: data.home.prototeam.classifications,
            },
            record: {
                losses: data.home.record.losses,
                overtimeShootoutLosses: data.home.record.overtimeShootoutLosses,
                overtimeShootoutWins: data.home.record.overtimeShootoutWins,
                points: data.home.record.points,
                ties: data.home.record.ties,
                wins: data.home.record.wins,
            },
        },
        visitor: {
            id: data.visitor.id,
            details: {
                title: data.visitor.title,
                logo: data.visitor.logo,
            },
            division: {
                id: data.visitor.division.id,
                title: data.visitor.division.title,
            },
            lineup: {
                coaches: [],
                players: [],
                signature: "",
                signedBy: "",
            },
            prototeam: {
                id: data.visitor.prototeam.id,
                classifications: data.visitor.prototeam.classifications,
            },
            record: {
                losses: data.visitor.record.losses,
                overtimeShootoutLosses: data.visitor.record.overtimeShootoutLosses,
                overtimeShootoutWins: data.visitor.record.overtimeShootoutWins,
                points: data.visitor.record.points,
                ties: data.visitor.record.ties,
                wins: data.visitor.record.wins,
            },
        },
        game: {
            broadcaster: data.data.broadcaster,
            category: data.category,
            endtime: data.endtime,
            id: data.id,
            isValid: data.data.isValid,
            location: data.location,
            number: data.number,
            periods: data.periods,
            status: data.status,
            type: data.gameType,
            scheduledStartTime: data.scheduledStartTime,
            startTime: data.startTime,
        },
    };
}

function generateEvents(data: any) {
    return data.events.reduce(
        (acc: any, item: { id: any }) => ({
            ...acc,
            [item.id]: item,
        }),
        {},
    );
}

const convertTimeToFirestoreTimestamp = (isoTime: string) => {
    const date = new Date(isoTime);
    return {
        seconds: Math.floor(date.getTime() / 1000),
        nanoseconds: (date.getTime() % 1000) * 1000000,
    };
};
