import type { BoxscoreSchemaEventType } from "@/types/BoxscoreV2";
import { DEFAULT_PERIODS } from "./generateGameSummary";

type PeriodConfig = Record<string, number>;

export interface EventWithTime {
    time: {
        clock: string;
        period: string;
        minutes: string;
        seconds: string;
        timeSeconds: number;
    };
    id: string;
    type: string;
    notes?: any[];
    penalty?: {
        off: { real: string; clock: string };
        on: { real: string; clock: string };
        code: string;
    };
    against?: any;
    for?: any;
    event?: string;
    team?: {
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
}

export type ArrayItem = {
    period: string;
    events: EventWithTime[];
};

export type SortedArray = ArrayItem[];

export function processGameEvents(events: BoxscoreSchemaEventType[], periodConfig: PeriodConfig): SortedArray {
    const filteredEvents = events.filter(
        (event) =>
            event.type !== "GameEvent.IdOnly" &&
            event.type !== "GameEvent.RunningClock" &&
            event.type !== "GameEvent.Referee",
    );

    if (!filteredEvents || filteredEvents.length === 0)
        return Object.keys(DEFAULT_PERIODS).map((period) => ({ period, events: [] }));

    const eventArray = filteredEvents
        .map((event): EventWithTime | undefined => {
            if ("time" in event && "clock" in event.time) {
                const { clock } = event.time || {};
                const [period, minutes, seconds] = clock.split(":") || [];

                const periodNum = Number(period).toString();
                if (event.type.toLowerCase().includes("shift")) {
                    const newMinutes = minutes === "00" ? "20" : minutes;

                    return {
                        ...event,
                        time: {
                            clock,
                            period: periodNum,
                            minutes: newMinutes,
                            seconds,
                            timeSeconds: Number(newMinutes) * 60 + Number(seconds),
                        },
                        event: event.type.toLowerCase().includes("penalty") ? "off" : "",
                    };
                }
                return {
                    ...event,
                    time: {
                        clock,
                        period: periodNum,
                        minutes,
                        seconds,
                        timeSeconds: Number(minutes) * 60 + Number(seconds),
                    },
                    event: event.type.toLowerCase().includes("penalty") ? "off" : "",
                } as EventWithTime;
            }
            return undefined;
        })
        .filter((event): event is EventWithTime => event !== undefined);

    const sortedEvents = addPenaltyOffAndOnTime(eventArray);

    const periodKeys = Object.keys(periodConfig);
    const periodGroups: SortedArray = periodKeys.map((period) => {
        return { period: period, events: [] };
    });

    sortedEvents.forEach((event) => {
        if (!event) return;
        const existingPeriod = periodGroups.find((period) => period.period === event.time.period);
        if (existingPeriod) {
            existingPeriod.events.push(event);
        } else {
            periodGroups.push({
                period: event.time.period,
                events: [event],
            });
        }
    });

    //remove overtime period if overtime is empty
    const filterEmptyOvertime = periodGroups.filter(
        (period) => !period.period.toLowerCase().includes("ot") || period.events.length > 0,
    );

    const sortedPeriods = filterEmptyOvertime.map((period) => ({
        period: period.period,
        events: [...period.events].sort((a, b) => a.time.timeSeconds - b.time.timeSeconds).reverse(),
    }));

    return sortedPeriods;
}

function addPenaltyOffAndOnTime(events: EventWithTime[]): EventWithTime[] {
    if (!events || events.length === 0) return [];

    const eventsWithoutPenalties = events.filter((event) => !event.type.toLowerCase().includes("penalty"));

    const penaltyEvents = events.filter((event) => event.type.toLowerCase().includes("penalty"));

    const newEvents = penaltyEvents.map((event) => {
        // Make sure penalty exists and has an 'on' time
        if (event.penalty?.on?.clock) {
            const { clock } = event.penalty.on || {};
            const [period, minutes, seconds] = clock.split(":") || [];
            const periodNum = Number(period).toString();

            return {
                ...event,
                time: {
                    clock,
                    period: periodNum,
                    minutes,
                    seconds,
                    timeSeconds: Number(minutes) * 60 + Number(seconds),
                },
                event: "on",
            };
        }
        return event;
    });

    return [...newEvents, ...penaltyEvents, ...eventsWithoutPenalties];
}
