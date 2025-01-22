import { Text } from "@/atomic/01-atoms/Text";
import styled from "styled-components";
import { addOrdinalSuffix } from "@/utils/addOrdinalSuffix";
import { cn } from "@/utils/cn";
import { determinePlayerDisplay } from "@/utils/determinePlayerDisplay";
import { getPlayerDisplayStyles } from "@/utils/getPlayerDisplayStyles";
import { TeamIconLogo } from "@/atomic/02-molecules/TeamIconLogo";
import { ArrayItem, EventWithTime, processGameEvents } from "@/utils/eventProcessor";
import { getLatestEvent } from "@/utils/getLatestEvent";
import { determineEventTypeText } from "@/utils/determineEventTypeText";
import { BoxscoreSchema } from "@/types/BoxscoreV2";
import { Icon } from "@/atomic/01-atoms";

const StyledGamePlayByPlay = styled.div.attrs({
    className: "game-play-by-play w-full h-full",
})``;

export type PlayerDisplayType = string;

export interface PlayerDisplayProps {
    player: string;
    index: number;
    type: PlayerDisplayType;
}

export function GamePlayByPlay({ gameSchemas }: { gameSchemas: BoxscoreSchema }) {
    const { events: gameEvents, data: schemaData, meta } = gameSchemas || {};
    const { home, visitor } = schemaData || {};
    const { details: homeDetails } = home || {};
    const { details: visitorDetails } = visitor || {};
    const { logo: homeLogo } = homeDetails || {};
    const { logo: visitorLogo } = visitorDetails || {};
    const { game } = schemaData || {};

    const { periods } = game || {};

    const { lastUpdate } = meta || {};

    const { seconds, nanoseconds } = lastUpdate || {};

    const milliseconds = seconds * 1000 + nanoseconds / 1_000_000 || 0;

    const lastUpdated = new Date(milliseconds).toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });

    const gameEventsValues = Object.values(gameEvents || {});

    const sortedGameEvents = processGameEvents(gameEventsValues, periods);
    const latestEvent = getLatestEvent(sortedGameEvents);

    return (
        <StyledGamePlayByPlay data-testid="game-play-by-play">
            <div className="w-full h-full flex flex-col justify-start items-center rounded-md bg-[#f4f5f5] p-4">
                <div className="uppercase w-full flex justify-between items-center">
                    <Text
                        type="body.sm"
                        className="!font-medium !text-secondary-500"
                        data-testid="live-game-feed-title"
                    >
                        Live Game Feed
                    </Text>
                    <Text type="body.xs" color={"#36383d80"} data-testid="last-updated">
                        Last Updated At {lastUpdated}
                    </Text>
                </div>
                {sortedGameEvents.reverse().map((playByPlayEvents: ArrayItem, index) => (
                    <PlayByPlaySection
                        key={index}
                        playByPlayEvents={playByPlayEvents}
                        homeLogo={homeLogo}
                        visitorLogo={visitorLogo}
                        data-testid={`play-by-play-section-${index}`}
                        latestEvent={latestEvent!}
                    />
                ))}
            </div>
        </StyledGamePlayByPlay>
    );
}

function PlayByPlayHeader({ period }: { period: string }) {
    const periodString = `${addOrdinalSuffix(Number(period))} PERIOD`;
    return (
        <div
            className="bg-secondary-500 w-full flex justify-start rounded px-4 py-2 uppercase mt-4"
            data-testid="play-by-play-header"
        >
            <Text type="body.sm" color="white" className="!font-medium">
                {periodString}
            </Text>
        </div>
    );
}

interface PlayByPlaySectionProps {
    playByPlayEvents: ArrayItem;
    homeLogo: string;
    visitorLogo: string;
    latestEvent: string;
}

function PlayByPlaySection({ playByPlayEvents, homeLogo, visitorLogo, latestEvent }: PlayByPlaySectionProps) {
    const { period, events } = playByPlayEvents || {};
    return (
        <div className="w-full flex flex-col justify-start items-center gap-4">
            <PlayByPlayHeader period={period} />
            {/* will fix this later */}
            {!events.length ? (
                <div className="w-full flex flex-col justify-start items-center gap-4">
                    <Text type="body.sm" className="!text-center">
                        No Events
                    </Text>
                </div>
            ) : (
                events
                    .reverse()
                    .map((event: EventWithTime, index: number) => (
                        <PlayByPlayEvent
                            key={index}
                            event={event}
                            homeLogo={homeLogo}
                            visitorLogo={visitorLogo}
                            data-testid={`play-by-play-event-${index}`}
                            latestEvent={latestEvent}
                            index={index}
                        />
                    ))
            )}
        </div>
    );
}

function PlayByPlayEvent({
    event,
    homeLogo,
    visitorLogo,
    latestEvent,
    index,
}: {
    event: EventWithTime;
    homeLogo: string;
    visitorLogo: string;
    latestEvent: string;
    index: number;
}) {
    const { time: clockTime, event: eventType, type, id } = event || {};
    const { minutes, seconds } = clockTime || {};
    const time = `${minutes}:${seconds}`;
    const team = !type.toLowerCase().includes("shift") ? event.for.team.vs : event.team && event.team?.vs;

    const teamLogo = team === "home" ? homeLogo : visitorLogo;

    const returnedFromPenalty =
        eventType === "on" && type.toLowerCase().includes("penalty") ? "bg-[#36383d26]" : "bg-white";

    const eventTypeText = determineEventTypeText(type);

    const playerDisplay = determinePlayerDisplay(event);

    const isLatestEvent = id === latestEvent && index === 0;

    if (eventType === "on" && type.toLowerCase().includes("penalty")) {
        return (
            <GamePlayByPlayPenaltyOn
                playerDisplay={playerDisplay}
                type={type}
                returnedFromPenalty={returnedFromPenalty}
                time={time}
                team={team}
                isLatestEvent={isLatestEvent}
            />
        );
    }

    return (
        <GamePlayByPlayRowContainer
            className={"p-6"}
            returnedFromPenalty={returnedFromPenalty}
            isLatestEvent={isLatestEvent}
            data-testid="play-by-play-event"
        >
            <div className="uppercase w-full">
                <TeamIconLogo team={team} src={teamLogo} alt={team} className="w-12 h-12" />{" "}
            </div>
            <div className="uppercase w-full flex justify-start items-center">
                <GamePlayByPlayEventBadge event={eventTypeText} />
            </div>
            <div className="uppercase w-full flex flex-col justify-center items-start">
                <Text type="body.xs" className="!text-left">
                    {time}
                </Text>
                <div className="flex justify-start items-center gap-1">
                    <Text type="body.sm" className="!font-medium !text-left">
                        {eventTypeText}
                    </Text>
                    {type === "goalieChange" || type === "goalieShift" ? (
                        <Icon name="GoalieChangeIcon" size="xs" className="h-4 w-4" />
                    ) : null}
                </div>
            </div>
            <div className="uppercase w-full flex flex-col justify-center items-start gap-1">
                <Text type="body.xs" className="!text-left !font-medium">
                    {team}
                </Text>
                {playerDisplay.map((player, index) => (
                    <GamePlayByPlayPlayerDisplay player={player} index={index} type={type} key={index} />
                ))}
            </div>
        </GamePlayByPlayRowContainer>
    );
}

export const GamePlayByPlayPlayerDisplay = ({ player, index, type }: PlayerDisplayProps) => {
    const textType = index === 0 && !type.includes("goalie") ? "body.sm" : "body.xs";
    const className = getPlayerDisplayStyles(type, index);

    return (
        <Text type={textType} className={className} data-testid={`player-display-${index}`}>
            {player}
        </Text>
    );
};

function GamePlayByPlayEventBadge({ event, className = "" }: { event: string; className?: string }) {
    return (
        <div className={`w-12 h-12 flex justify-center items-center ${className}`} data-testid={`event-badge-${event}`}>
            {(event === "goalie" || event === "goalieShift") && (
                <Icon name="GoalieMaskIcon" size="lg" className="w-12 h-12" />
            )}
            {event === "goal" && <img src={"/src/assets/goal-icon-active.gif"} alt="goal" className="w-12 h-12" />}
            {event === "penalty" && <Icon name="PenaltyIcon" size="lg" className="w-12 h-12" />}
        </div>
    );
}

type GamePlayByPlayPenaltyOnProps = {
    returnedFromPenalty: string;
    type: PlayerDisplayType;
    playerDisplay: string[];
    time: string;
    team: string;
    isLatestEvent: boolean;
};

function GamePlayByPlayPenaltyOn({
    playerDisplay,
    type,
    returnedFromPenalty,
    time,
    team,
    isLatestEvent,
}: GamePlayByPlayPenaltyOnProps) {
    const [penalizedPlayer, penality, servedBy, servedByPlayer] = playerDisplay || [];

    const gap = servedBy ? "gap-1" : "gap-0";

    return (
        <GamePlayByPlayRowContainer
            className={"px-4 py-3"}
            returnedFromPenalty={returnedFromPenalty}
            isLatestEvent={isLatestEvent}
        >
            <div className="uppercase w-full flex flex-col justify-center items-start col-span-1">
                <Text type="body.xs" className="!text-left">
                    {time}
                </Text>
                <Text type="body.sm" className="!font-medium !text-left">
                    Penalty End
                </Text>
            </div>
            <div className="uppercase w-full flex flex-col justify-center items-start gap-1 col-span-1">
                <Text type="body.xs" className="!text-left !font-medium">
                    {team}
                </Text>
                <GamePlayByPlayPlayerDisplay player={penalizedPlayer} index={0} type={type} />
            </div>
            <div className="w-full gap-1 col-span-2 grid grid-cols-3">
                <div className={cn(gap, "col-start-2 h-full flex flex-col justify-between items-start")}>
                    <Text type="body.xs" className="!text-left !font-light !text-[#36383dc0]">
                        {penality}
                    </Text>
                    <Text type="body.xs" className="!text-left !text-secondary-500 !uppercase !font-medium">
                        {servedBy}
                    </Text>
                    <Text type="body.xs" className="!text-left !font-light !text-[#36383dc0]">
                        {servedByPlayer}
                    </Text>
                </div>
            </div>
        </GamePlayByPlayRowContainer>
    );
}

type GamePlayByPlayRowProps = {
    children: React.ReactNode;
    returnedFromPenalty?: string;
    className?: string;
    isLatestEvent: boolean;
};

function GamePlayByPlayRowContainer({
    children,
    returnedFromPenalty,
    className,
    isLatestEvent,
}: GamePlayByPlayRowProps) {
    const isFirst = isLatestEvent
        ? "before:content-[''] before:w-1 before:absolute before:left-0 before:top-0 before:bottom-0 before:rounded-sm before:bg-liveBlue-500"
        : "";
    return (
        <div
            className={cn(
                returnedFromPenalty,
                isFirst,
                "relative w-full grid grid-cols-4 justify-between items-center rounded-[5px]",
                className
            )}
        >
            {children}
        </div>
    );
}
