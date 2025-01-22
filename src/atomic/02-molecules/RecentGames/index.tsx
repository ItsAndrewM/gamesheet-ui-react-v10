import { Icon, Text } from "@/atomic/01-atoms";
import { colors } from "@/constants/Colors/colors";
import { GameSummaryRecentGame } from "@/types";
import { cn } from "@/utils/cn";
import { TeamIconLogo } from "../TeamIconLogo";
import { getWinLossOrTie } from "@/utils/getWinLossOrTie";

interface RecentGames {
    home: {
        teamId: string;
        games: RecentGame[];
    };
    visitor: {
        teamId: string;
        games: RecentGame[];
    };
}

interface RecentGame {
    date: string;
    opponent: string;
    score: string;
    isHome: boolean;
    logo?: string;
    title?: string;
}

type RecentGamesProps = {
    data: { home: GameSummaryRecentGame[]; visitor: GameSummaryRecentGame[] };
    homeTeamLogo: string;
    visitorTeamLogo: string;
    visitorTitle: string;
    homeTitle: string;
};

export const RecentGames = ({ data, homeTeamLogo, visitorTeamLogo, visitorTitle, homeTitle }: RecentGamesProps) => {
    const { visitor: visitorGames, home: homeGames } = data;

    return (
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8">
            <div>
                {/* Visitor Section */}
                <div className="flex items-center gap-2 mb-4">
                    <div className=" flex items-center justify-center w-16 h-16">
                        <TeamIconLogo team="visitor" src={visitorTeamLogo} alt={visitorTitle} />
                    </div>
                    <Text type="body.lg" className="!font-bold">
                        {visitorTitle}
                    </Text>
                </div>
                <div className="space-y-px">
                    {visitorGames.map((game, index) => (
                        <RecentGamesRow game={game} key={index} index={index} title={visitorTitle} />
                    ))}
                </div>
            </div>

            <div>
                {/* Home Section */}
                <div className="flex items-center gap-2 mb-4 justify-end md:flex-row flex-row-reverse">
                    <Text type="body.lg" className="!font-bold">
                        {homeTitle}
                    </Text>
                    <div className=" flex items-center justify-center w-16 h-16">
                        <TeamIconLogo team="home" src={homeTeamLogo} alt={homeTitle} />
                    </div>
                </div>
                <div className="space-y-px">
                    {homeGames.map((game, index) => (
                        <RecentGamesRow game={game} key={index} index={index} title={homeTitle} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const RecentGamesRow = ({ game, index, title }: { game: GameSummaryRecentGame; index: number; title: string }) => {
    const { game: gameData } = game || {};
    const { homeTeam, visitorTeam, finalScore, date } = gameData || {};
    const { name: homeTeamName } = homeTeam || {};
    const [month, day] = date ? date.split(",")[0].split(" ") : [];
    const opponent = homeTeamName === title ? { ...visitorTeam, side: "visitor" } : { ...homeTeam, side: "home" };

    const { name: opponentName, logo: opponentLogo } = opponent || {};

    const backgroundColor = index % 2 === 0 ? "bg-secondary-500" : "bg-secondary-600";

    const { homeGoals, visitorGoals } = finalScore || {};
    const score = getWinLossOrTie(homeGoals, visitorGoals, opponent.side);

    return (
        <a href="#" className="flex">
            <div className=" w-full grid grid-cols-5 justify-between hover:bg-[#37383d33]">
                <div className="flex justify-start w-full gap-2">
                    <div
                        className={cn(
                            backgroundColor,
                            "w-12 text-white text-xs py-2 px-3 text-center flex items-center justify-center gap-1 uppercase place-self-start",
                        )}
                    >
                        <Text
                            type="body.sm"
                            className="[writing-mode:vertical-lr] [text-orientation:upright] -mr-2 !font-normal"
                        >
                            {month}
                        </Text>
                        <Text
                            type="body.sm"
                            className="[writing-mode:vertical-lr] [text-orientation:upright] !font-normal"
                        >
                            {day}
                        </Text>
                    </div>
                    <div className="w-full flex justify-start items-center ">
                        {opponentLogo ? (
                            <TeamIconLogo team={undefined} src={opponentLogo} alt={opponentName} />
                        ) : (
                            <Icon name="HockeyJerseyIcon" color={colors.secondary.hex} size="lg" />
                        )}
                    </div>
                </div>
                <div className="w-full flex justify-center items-center col-span-3 place-items-center">
                    <Text type="body.lg" className="!uppercase w-full text-center">
                        {opponentName}
                    </Text>
                </div>
                <div className="w-full flex justify-end items-center">
                    <Text type="body.xl" className="text-right !font-medium">
                        {score}
                    </Text>
                </div>
            </div>
        </a>
    );
};
