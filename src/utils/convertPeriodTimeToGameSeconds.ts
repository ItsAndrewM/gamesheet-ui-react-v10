export function convertPeriodTimeToGameSeconds(periodTime: string, period: number, periodLength: number = 20): number {
    const [minutes, seconds] = periodTime.split(":").map(Number);
    const timeInPeriodSeconds = periodLength * 60 - (minutes * 60 + seconds);
    const previousPeriodsSeconds = (period - 1) * (periodLength * 60);
    return previousPeriodsSeconds + timeInPeriodSeconds;
}
