import { BoxscoreH2H } from "@/types/BoxscoreV2";

export const transformGame = (game: BoxscoreH2H) => {
    const date = new Date(game.date.Time.seconds * 1000);

    const { home, visitor } = game;
    const { title: visitorTitle, logo: visitorLogo, score: visitorScore } = visitor;
    const { title: homeTitle, logo: homeLogo, score: homeScore } = home;
    const formattedDate = `${date.toLocaleString("default", { month: "short" })} ${date.getDate()}`;

    return {
        date: formattedDate.toUpperCase(),
        games: [
            {
                team: visitorTitle,
                score: Number(visitorScore),
                logo: visitorLogo,
            },
            {
                team: homeTitle,
                score: Number(homeScore),
                logo: homeLogo,
            },
        ],
    };
};
