import { Period } from "@/types";
import { GoalieShifts } from "@/types/GoalieChange";
import { GameEvents, GoalEvent, GoalieChangeEvent, PenaltyEvent } from "@/types/PlayByPlay";
import { convertPeriodTimeToGameSeconds } from "./convertPeriodTimeToGameSeconds";

export function sortBySeconds(goalieShifts: GoalieShifts, events: GameEvents, periods: Period) {
    const formattedGoalieShifts = goalieShifts
        .filter((shift) => {
            const shiftTime = shift.documentChange.document.fields.on?.mapValue?.fields.time?.stringValue;
            const shiftPeriod = shift.documentChange.document.fields.on?.mapValue?.fields.period?.stringValue;

            // First filter the events to only goalieChange events
            const goalieChangeEvents = events.filter(
                (event): event is GoalieChangeEvent =>
                    event.documentChange.document.fields.type?.stringValue === "goalieChange",
            );

            // Then check if there's a matching event
            return !goalieChangeEvents.some(
                (event) =>
                    event.documentChange.document.fields.payload.mapValue.fields.time?.stringValue === shiftTime &&
                    event.documentChange.document.fields.payload.mapValue.fields.period?.stringValue === shiftPeriod,
            );
        })
        .map((shift) => {
            const time = shift.documentChange.document.fields.on?.mapValue?.fields.time?.stringValue;
            const period = Number(shift.documentChange.document.fields.on?.mapValue?.fields.period?.stringValue);
            const periodLength = periods[Number(period)];
            const computedTime = convertPeriodTimeToGameSeconds(time, period, periodLength);

            return {
                id: shift.documentChange.document.name.split("/")[
                    shift.documentChange.document.name.split("/").length - 1
                ],
                time: computedTime,
                event: "on",
                type: "goalieShift",
                period: shift.documentChange.document.fields.on.mapValue.fields.period.stringValue,
            };
        });

    // const formattedGoalieShifts = goalieShifts.map((shift) => ({
    //     id: shift.documentChange.document.name.split("/")[shift.documentChange.document.name.split("/").length - 1],
    //     time: shift.documentChange.document.fields.on.mapValue.fields.time.stringValue,
    //     event: "on",
    //     type: "goalieShift",
    //     period: shift.documentChange.document.fields.on.mapValue.fields.period.stringValue,
    // }));

    const formattedOffPenaltyEvents = events
        .filter((e): e is PenaltyEvent => e.documentChange.document.fields.type.stringValue === "penalty")
        .map((event) => {
            const offTime = event.documentChange.document.fields.payload.mapValue.fields.offTime?.stringValue || "";
            const period = Number(event.documentChange.document.fields.payload.mapValue.fields.period.stringValue);
            const periodLength = periods[Number(period)];
            const computedTime = convertPeriodTimeToGameSeconds(offTime, period, periodLength);
            return {
                id: event.documentChange.document.name.split("/")[
                    event.documentChange.document.name.split("/").length - 1
                ],
                time: computedTime,
                event: "off",
                type: "penalty",
                period: event.documentChange.document.fields.payload.mapValue.fields.period.stringValue,
            };
        });
    const formattedOnPenaltyEvents = events
        .filter((e): e is PenaltyEvent => e.documentChange.document.fields.type.stringValue === "penalty")
        .map((event) => {
            const onTime = event.documentChange.document.fields.payload.mapValue.fields.onTime?.stringValue || "";
            const period = Number(event.documentChange.document.fields.payload.mapValue.fields.period.stringValue);
            const periodLength = periods[Number(period)];
            const computedTime = convertPeriodTimeToGameSeconds(onTime, period, periodLength);
            return {
                id: event.documentChange.document.name.split("/")[
                    event.documentChange.document.name.split("/").length - 1
                ],
                time: computedTime,
                event: "on",
                type: "penalty",
                period: event.documentChange.document.fields.payload.mapValue.fields.period.stringValue,
            };
        });
    const formattedEvents = events
        .filter(
            (e): e is GoalEvent | GoalieChangeEvent => e.documentChange.document.fields.type.stringValue !== "penalty",
        )
        .map((event) => {
            const time = event.documentChange.document.fields.payload.mapValue.fields.time.stringValue;
            const period = Number(event.documentChange.document.fields.payload.mapValue.fields.period.stringValue);
            const periodLength = periods[Number(period)];
            const computedTime = convertPeriodTimeToGameSeconds(time, period, periodLength);
            return {
                id: event.documentChange.document.name.split("/")[
                    event.documentChange.document.name.split("/").length - 1
                ],
                time: computedTime,
                event: "event",
                type: event.documentChange.document.fields.type.stringValue,
                period: event.documentChange.document.fields.payload.mapValue.fields.period.stringValue,
            };
        });
    const combinedEvents = [
        ...formattedGoalieShifts,
        ...formattedOffPenaltyEvents,
        ...formattedOnPenaltyEvents,
        ...formattedEvents,
    ];
    return combinedEvents.sort((a, b) => a.time - b.time);
}
