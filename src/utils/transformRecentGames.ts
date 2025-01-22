import { addOrdinalSuffix } from "./addOrdinalSuffix";
import { isNumber } from "./isNumber";

export function transformRecentGames(recentGames: any[] | undefined) {
    if (!recentGames) return [];

    return recentGames.map((recentGame) => {
        if (recentGame.schemas) {
            const { schemas } = recentGame || {};
            const { data, computed } = schemas || {};
            const { game } = data || {};
            const { home, visitor } = data || {};
            const { details: homeDetails, record: homeRecord, id: homeId, division: homeDivision } = home || {};
            const { title: homeDivisionTitle } = homeDivision || {};
            const { title: homeTitle, logo: homeLogo } = homeDetails || {};
            const {
                details: visitorDetails,
                record: visitorRecord,
                id: visitorId,
                division: visitorDivision,
            } = visitor || {};
            const { title: visitorDivisionTitle } = visitorDivision || {};
            const { title: visitorTitle, logo: visitorLogo } = visitorDetails || {};
            const { scoreboard } = computed || {};
            const { total } = scoreboard || {};
            const { type, scheduledStartTime, number, id, periods } = game || {};

            const longDate = new Date(scheduledStartTime).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
            });

            const shortDate = new Date(scheduledStartTime).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            });
            const time = new Date(scheduledStartTime).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            });

            const periodsArray = Object.keys(periods).map((period) => {
                return {
                    name: String(period),
                    length: recentGame.periods[period],
                };
            });
            const homeFormattedRecord = `(${homeRecord.wins} - ${homeRecord.losses} - ${homeRecord.ties})`;
            const visitorFormattedRecord = `(${visitorRecord.wins} - ${visitorRecord.losses} - ${visitorRecord.ties})`;
            const scoresByPeriod = Object.keys(periods).map((period) => {
                const score = scoreboard["0" + period];
                const per = isNumber(period);
                return {
                    title: per ? addOrdinalSuffix(Number(period)).toUpperCase() : period.toUpperCase(),
                    homeGoals: score ? score.home : 0,
                    visitorGoals: score ? score.visitor : 0,
                };
            });
            const finalHomeScore = total.home;
            const finalVisitorScore = total.visitor;
            return {
                date: longDate,
                game: {
                    date: shortDate,
                    time,
                    number,
                    type,
                    gameId: String(id),
                    periods: periodsArray,
                    homeTeam: {
                        id: String(homeId),
                        name: homeTitle,
                        logo: homeLogo,
                        division: homeDivisionTitle,
                        record: homeFormattedRecord,
                        recap: [],
                    },
                    visitorTeam: {
                        id: String(visitorId),
                        name: visitorTitle,
                        logo: visitorLogo,
                        division: visitorDivisionTitle,
                        record: visitorFormattedRecord,
                        recap: [],
                    },
                    scoresByPeriod,
                    finalScore: {
                        homeGoals: finalHomeScore ? finalHomeScore : 0,
                        visitorGoals: finalVisitorScore ? finalVisitorScore : 0,
                    },
                },
            };
        } else {
            const longDate = new Date(recentGame.scheduledStartTime).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
            });

            const shortDate = new Date(recentGame.scheduledStartTime).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            });
            const time = new Date(recentGame.scheduledStartTime).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            });

            const periods = Object.keys(recentGame.periods).map((period) => {
                return {
                    name: String(period),
                    length: recentGame.periods[period],
                };
            });
            const homeRecord = `(${recentGame.home.record.wins} - ${recentGame.home.record.losses} - ${recentGame.home.record.ties})`;
            const visitorRecord = `(${recentGame.visitor.record.wins} - ${recentGame.visitor.record.losses} - ${recentGame.visitor.record.ties})`;

            const scoresByPeriod = Object.keys(recentGame.periods).map((period) => {
                const findScoreOfPeriodHome = recentGame.home.scoreboard.find(
                    (score: { [key: string]: number }) => score[period],
                );
                const homeScore = !findScoreOfPeriodHome ? 0 : findScoreOfPeriodHome[period];
                const findScoreOfPeriodVisitor = recentGame.visitor.scoreboard.find(
                    (score: { [key: string]: number }) => score[period],
                );
                const visitorScore = !findScoreOfPeriodVisitor ? 0 : findScoreOfPeriodVisitor[period];
                const per = isNumber(period);
                return {
                    title: per ? addOrdinalSuffix(Number(period)).toUpperCase() : period.toUpperCase(),
                    homeGoals: homeScore,
                    visitorGoals: visitorScore,
                };
            });
            const finalHomeScore = recentGame.home.scoreboard.find((score: { [key: string]: number }) => score.final);
            const finalVisitorScore = recentGame.visitor.scoreboard.find(
                (score: { [key: string]: number }) => score.final,
            );
            return {
                date: longDate,
                game: {
                    date: shortDate,
                    time,
                    number: recentGame.number,
                    type: recentGame.type,
                    gameId: String(recentGame.id),
                    periods,
                    homeTeam: {
                        id: String(recentGame.home.id),
                        name: recentGame.home.title,
                        logo: recentGame.home.logo,
                        division: recentGame.home.division.title,
                        record: homeRecord,
                        recap: [],
                    },
                    visitorTeam: {
                        id: String(recentGame.visitor.id),
                        name: recentGame.visitor.title,
                        logo: recentGame.visitor.logo,
                        division: recentGame.visitor.division.title,
                        record: visitorRecord,
                        recap: [],
                    },
                    scoresByPeriod,
                    finalScore: {
                        homeGoals: finalHomeScore ? finalHomeScore.final : 0,
                        visitorGoals: finalVisitorScore ? finalVisitorScore.final : 0,
                    },
                },
            };
        }
    });
}
