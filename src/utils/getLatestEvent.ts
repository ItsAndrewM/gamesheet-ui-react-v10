import { SortedArray } from "./eventProcessor";

export function getLatestEvent(events: SortedArray): string | undefined {
    if (!events) return undefined;
    const lastPeriodWithEvents = events
        .slice()
        .reverse()
        .find((event) => event.events.length > 0);

    return lastPeriodWithEvents?.events[lastPeriodWithEvents.events.length - 1].id;
}
