export const combineAndSortByPeriod = (goalieShifts: any[], events: any[]) => {
    const combinedEvents = [
        ...events
            .filter((e) => e.documentChange.document.fields.type?.stringValue !== "penalty")
            .map((event) => ({
                ...event.documentChange.document,
                type: event.documentChange.document.fields.type?.stringValue,
                time: event.documentChange.document.fields.payload.mapValue.fields.time?.stringValue,
                period: event.documentChange.document.fields.payload.mapValue.fields.period?.stringValue,
                event: "event",
            })),
        ...events
            .filter((e) => e.documentChange.document.fields.type?.stringValue === "penalty")
            .map((event) => {
                const startPeriod = event.documentChange.document.fields.payload.mapValue.fields.period?.stringValue;
                return {
                    ...event.documentChange.document,
                    type: event.documentChange.document.fields.type?.stringValue,
                    time: event.documentChange.document.fields.payload.mapValue.fields.offTime?.stringValue,
                    period: startPeriod,
                    event: "off",
                };
            }),
        ...events
            .filter((e) => e.documentChange.document.fields.type?.stringValue === "penalty")
            .map((event) => {
                const { offTime, onTime } = event.documentChange.document.fields.payload.mapValue.fields;
                const offSeconds = timeToSeconds(offTime.stringValue);
                const onSeconds = timeToSeconds(onTime.stringValue);
                const startPeriod = event.documentChange.document.fields.payload.mapValue.fields.period?.stringValue;
                const period = offSeconds < onSeconds ? Number(startPeriod) + 1 : startPeriod;
                return {
                    ...event.documentChange.document,
                    type: event.documentChange.document.fields.type?.stringValue,
                    time: event.documentChange.document.fields.payload.mapValue.fields.onTime?.stringValue,
                    period: period,
                    event: "on",
                };
            }),
        ...goalieShifts
            .filter((shift) => {
                const shiftTime = shift.documentChange.document.fields.on?.mapValue?.fields.time?.stringValue;
                const shiftPeriod = shift.documentChange.document.fields.on?.mapValue?.fields.period?.stringValue;

                // Check if there's a matching goalieChange event
                return !events.some(
                    (event) =>
                        event.documentChange.document.fields.type?.stringValue === "goalieChange" &&
                        event.documentChange.document.fields.payload.mapValue.fields.time?.stringValue === shiftTime &&
                        event.documentChange.document.fields.payload.mapValue.fields.period?.stringValue ===
                            shiftPeriod,
                );
            })
            .map((shift) => {
                const { on } = shift.documentChange.document.fields;
                const { mapValue } = on || {};
                return {
                    ...shift.documentChange.document,
                    type: "goalieShift",
                    time: mapValue?.fields.time?.stringValue || "",
                    period: mapValue?.fields.period?.stringValue || "",
                    event: "on",
                };
            }),
    ];
    // Group by period
    const periodGroups = combinedEvents.reduce((acc, event) => {
        const period = event.period;
        if (!period) return acc;
        if (!acc[period]) {
            acc[period] = [];
        }
        acc[period].push(event);
        return acc;
    }, {});
    // Sort events within each period by time
    Object.keys(periodGroups).forEach((period) => {
        periodGroups[period].sort((a: { time: string }, b: { time: string }) => {
            // Convert time strings to numbers for comparison (MM:SS format)
            const timeToSeconds = (time: string) => {
                if (!time) return 0;
                const [minutes, seconds] = time.split(":").map(Number);
                return minutes * 60 + seconds;
            };

            return timeToSeconds(b.time) - timeToSeconds(a.time); // Descending order
        });
    });

    // Convert to array format and sort periods
    return Object.entries(periodGroups)
        .sort(([periodA], [periodB]) => Number(periodA) - Number(periodB))
        .map(([period, events]) => ({
            period,
            events,
        }))
        .reverse();
};

const timeToSeconds = (time: string) => {
    const [minutes, seconds] = time.split(":").map(Number);
    return minutes * 60 + seconds;
};
