import { cn } from "@/utils/cn";
import { Text } from "@/atomic/01-atoms";
import styled from "styled-components";
import { transformGame } from "@/utils/transformGame";
import { BoxscoreH2H, BoxscoreH2HData, BoxscoreSchemaOrganization } from "@/types/BoxscoreV2";
import { TeamIconLogo } from "../TeamIconLogo";

const StyledHeadToHead = styled.div.attrs({
    className: "head-to-head w-full",
})``;

interface HeadToHeadProps {
    h2hData: BoxscoreH2HData;
    season: BoxscoreSchemaOrganization;
}

export const HeadToHead = ({ h2hData, season }: HeadToHeadProps) => {
    const { games } = h2hData || {};
    const { id: seasonId } = season || {};
    if (!games.length) {
        return (
            <div className="w-full flex justify-center">
                <Text type="body.lg">No Games Found</Text>
            </div>
        );
    }
    return (
        <StyledHeadToHead>
            <div className="space-y-px flex flex-col gap-2">
                {games.slice(0, 3).map((match: BoxscoreH2H, index: number) => (
                    <MatchHeadToHead match={match} key={index} seasonId={seasonId} />
                ))}
            </div>
        </StyledHeadToHead>
    );
};

const VerticalDate = ({ date }: { date: string }) => {
    const [month, day] = date.split(" ") || [];
    const slicedMonth = month.slice(0, 3);
    return (
        <div className="flex flex-col items-center justify-center h-full w-full text-sm gap-1">
            <Text
                type="body.default"
                className="[writing-mode:vertical-lr] [text-orientation:upright] mt-1 uppercase !font-normal"
            >
                {slicedMonth}
            </Text>
            <Text
                type="body.default"
                className="[writing-mode:vertical-lr] [text-orientation:upright] mt-1 uppercase !font-normal"
            >
                {day}
            </Text>
        </div>
    );
};

const MatchHeadToHead = ({ match, seasonId }: { match: BoxscoreH2H; seasonId: number }) => {
    // transforms match data into a more usable format
    const { id } = match || {};

    const game = transformGame(match);

    const { date, games } = game || {};

    return (
        <div className="group hover:bg-[#37383d33] transition-colors duration-200 border-r-[3px] border-secondary-500 cursor-pointer relative">
            <div className="grid grid-cols-[40px_1fr_40px] items-center w-full">
                <div className={cn("bg-secondary-500", "text-white h-full flex items-center w-10 ")}>
                    <VerticalDate date={date} />
                </div>
                <div className="space-y-px ">
                    {games.map((gameData, gameIndex) => (
                        <MatchTeamsHeadToHead games={gameData} key={gameIndex} index={gameIndex} />
                    ))}
                </div>

                <div className="space-y-px ">
                    {games.map((gameData, gameIndex) => (
                        <ScoreHeadToHead games={gameData} key={gameIndex} index={gameIndex} />
                    ))}
                </div>
            </div>
            <a
                href={`https://gamesheetstats.com/seasons/${seasonId}/games/${id}`}
                className="absolute inset-0 z-[1] cursor-pointer"
                target={"_blank"}
                rel="noreferrer"
            />
        </div>
    );
};

type MatchTeamsHeadToHeadProps = {
    team: string;
    score: number;
    logo?: string;
};

const MatchTeamsHeadToHead = ({ games, index }: { games: MatchTeamsHeadToHeadProps; index: number }) => {
    const { team: title, logo: logo } = games || {};
    const team = index % 2 !== 0 ? "visitor" : "home";

    const backgroundColor = index % 2 !== 0 ? "bg-gray-100" : "";

    return (
        <div className={cn(backgroundColor, "flex items-center space-x-4 p-3 h-14", "group-hover:bg-transparent")}>
            <div className="h-12 w-12 flex items-center justify-center">
                <TeamIconLogo team={team} src={logo} alt={title} className="h-12 w-12" />
            </div>
            <Text type="body.lg" className="flex-1">
                {title}
            </Text>
        </div>
    );
};

const ScoreHeadToHead = ({ games, index }: { games: MatchTeamsHeadToHeadProps; index: number }) => {
    const { score } = games || {};
    const backgroundColor = index % 2 !== 0 ? "bg-gray-100" : "";

    return (
        <Text
            type="body.xl"
            className={cn(
                backgroundColor,
                "p-3 text-right h-14 flex justify-center items-center !font-medium",
                "group-hover:bg-transparent",
            )}
        >
            {score}
        </Text>
    );
};
