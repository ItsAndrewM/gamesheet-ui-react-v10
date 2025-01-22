export const convertTimeToMinutesSeconds = (
    clock: string,
    // periodLength?: number = 20,
): { minutes: number; seconds: number } => {
    const [hours, minutes, seconds] = clock.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes;
    const totalSeconds = totalMinutes * 60 + seconds;
    const hourInSeconds = 60 * 60;
    return { minutes: totalMinutes - 60, seconds: totalSeconds - hourInSeconds };
};

export const formatTimeFromMinutesSeconds = (minutes: number, seconds: number): string => {
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};
