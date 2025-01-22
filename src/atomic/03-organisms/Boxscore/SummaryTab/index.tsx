import { Icon, Text, Badge } from "@/atomic/01-atoms";
import { colors } from "@/constants/Colors/colors";
import {
    GameSummaryGoalEvent,
    GameSummaryGoalieInfo,
    GameSummaryGoalsByPeriod,
    GameSummaryPenaltiesByPeriod,
    GameSummaryPenaltyEvent,
    GameSummaryTable as BoxscoreGameSummaryTable,
} from "@/types";
import { addOrdinalSuffix } from "@/utils/addOrdinalSuffix";
import { cn } from "@/utils/cn";
import styled from "styled-components";
import { TeamLogoType } from "../Game";
import { GameSummaryScoringTable, GameSummaryShots } from "@/types/BoxscoreV2";
import { TeamIconLogo } from "@/atomic/02-molecules/TeamIconLogo";
import { Header } from "@/atomic/02-molecules";

const StyledGameSummary = styled.div.attrs({
    className: "game-summary lg:grid lg:grid-cols-2 flex flex-col gap-8 p-6",
})``;

type GameSummaryGoalEventBadgeProps = {
    powerPlay: boolean;
    gameWinningGoal: boolean;
    shg: boolean;
    en: boolean;
};

type GameSummaryGoalByPeriodEventBadgeProps = {
    event: GameSummaryGoalEventBadgeProps;
    className?: string;
};

type GameSummaryGoaltendingRowProps = {
    name: string;
    on: {
        period: string;
        time: string;
    };
    off: {
        period: string;
        time: string;
    };
    tois: string;
    index: number;
};

type GameSummaryGoalsByPeriodGoalDataProps = {
    goalScorer: { id: string; title: string; number: string; trackingNumber: string; totalGoalCount: string };
    assist1By?: { id: string; title: string; number: string; trackingNumber: string; totalGoalCount: string };
    assist2By?: { id: string; title: string; number: string; trackingNumber: string; totalGoalCount: string };
    team: string;
};

type GameSummaryPenaltiesByPeriodPenaltyDataProps = {
    commitedBy: { id: string; number: string; title: string; type: string };
    servedBy: { id: string; number: string; title: string };
    penaltyType: { title: string; duration: string; class?: string };
    team: string;
};

export function GameSummary({ tables }: { tables: BoxscoreGameSummaryTable }) {
    const { scoring, shots, goalieInfoHome, goalieInfoVisitor, goalsByPeriod, penaltiesByPeriod } = tables || {};
    return (
        <StyledGameSummary data-testid="game-summary">
            <div className="w-full flex flex-col justify-center items-center" data-testid="scoring-summary">
                <div className="w-full">
                    <Header title="Scoring" size="sm" data-testid="header-scoring" />
                </div>
                <GameSummaryTable tableData={scoring} />
            </div>

            <div data-testid="shots-summary">
                <div className="w-full">
                    <Header title="Shots" size="sm" data-testid="header-shots" />
                </div>
                <GameSummaryTable tableData={shots} />
            </div>

            <div className="col-span-2" data-testid="goaltending-summary">
                <div className="w-full">
                    <Header title="Goaltending" size="sm" data-testid="header-goaltending" />
                </div>
                <div className="w-full grid grid-cols-2 gap-8">
                    <GameSummaryGoaltendingTable goalieInfo={goalieInfoVisitor} />
                    <GameSummaryGoaltendingTable goalieInfo={goalieInfoHome} />
                </div>
            </div>
            <div data-testid="goals-by-period-summary">
                <div className="w-full">
                    <Header title="Goals By Period" size="sm" data-testid="header-goals-by-period" />
                </div>
                <GameSummaryGoalByPeriod goalsByPeriod={goalsByPeriod} />
            </div>
            <div data-testid="penalties-by-period-summary">
                <div className="w-full">
                    <Header title="Penalties by Period" size="sm" data-testid="header-penalties-by-period" />
                </div>
                <GameSummaryPenaltiesByPeriodData penaltiesByPeriod={penaltiesByPeriod} />
            </div>
        </StyledGameSummary>
    );
}

function GameSummaryPeriodHeader() {
    return (
        <div className="w-full grid grid-cols-2 justify-between place-items-center" data-testid="period-header">
            <div className="place-self-start uppercase">
                <Text type="body.xs" className="!font-medium" data-testid="period-header-team">
                    Team
                </Text>
            </div>
            <div className="w-full grid grid-cols-4 justify-between place-items-center">
                <div className="place-self-end uppercase">
                    <Text type="body.xs" className="!font-medium" data-testid="period-header-1st">
                        1st
                    </Text>
                </div>
                <div className="place-self-end uppercase">
                    <Text type="body.xs" className="!font-medium" data-testid="period-header-2nd">
                        2nd
                    </Text>
                </div>
                <div className="place-self-end uppercase">
                    <Text type="body.xs" className="!font-medium" data-testid="period-header-3rd">
                        3rd
                    </Text>
                </div>
                <div className="place-self-end uppercase">
                    <Text type="body.xs" className="!font-medium" data-testid="period-header-total">
                        Total
                    </Text>
                </div>
            </div>
        </div>
    );
}

function GameSummaryTable({ tableData }: { tableData: GameSummaryScoringTable | GameSummaryShots }) {
    const { title, final, ...rest } = tableData || {};
    const [visitor, home] = title || [];
    const { title: visitorTitle } = visitor || {};
    const { title: homeTitle } = home || {};
    const [visitorFinal, homeFinal] = final || [];

    const data = "scoresByPeriod" in rest ? rest.scoresByPeriod : rest.shotsByPeriod;
    const dataCheck = !data ? [] : data;
    const [visitorStats, homeStats] = [0, 1].map((index) =>
        dataCheck.map((period: { data: string[] | number[] }) => period.data[index].toString())
    );

    return (
        <div className="w-full flex flex-col gap-2" data-testid="game-summary-table">
            <GameSummaryPeriodHeader />
            <GameSummaryTableRow title={visitorTitle} final={visitorFinal} rowData={visitorStats} index={0} />
            <GameSummaryTableRow title={homeTitle} final={homeFinal} rowData={homeStats} index={1} />
        </div>
    );
}

function GameSummaryTableRow({
    title,
    final,
    rowData,
    index,
}: {
    title: string;
    final: string;
    rowData: string[];
    index: number;
}) {
    const backgroundColor = index % 2 === 0 ? "bg-[#36383d0d]" : "";
    return (
        <div
            className={cn(backgroundColor, "w-full grid grid-cols-2 justify-between place-items-center, p-2")}
            data-testid={`table-row-${index}`}
        >
            <div className="place-self-start">
                <Text type="body.sm" data-testid={`table-row-title-${index}`}>
                    {title}
                </Text>
            </div>
            <div className="w-full grid grid-cols-4 justify-between place-items-center">
                {rowData.map((data, rowIndex) => (
                    <div
                        key={rowIndex}
                        className="place-self-end text-center"
                        data-testid={`row-data-${index}-${rowIndex}`}
                    >
                        <Text type="body.sm">{data}</Text>
                    </div>
                ))}
                <div className="place-self-end px-2">
                    <Text type="body.sm" data-testid={`final-${index}`}>
                        {final}
                    </Text>
                </div>
            </div>
        </div>
    );
}

function GameSummaryGoaltendingTable({ goalieInfo }: { goalieInfo: GameSummaryGoalieInfo }) {
    const { title } = goalieInfo || {};
    return (
        <div className="w-full flex flex-col gap-2" data-testid="goaltending-table">
            <GameSummaryGoaltendingHeader />
            {!title ? (
                <div className="text-center">No Goalies</div>
            ) : (
                title.map((goalie, index) => {
                    const { id, ons, offs, tois } = goalieInfo || {};

                    return (
                        <GameSummaryGoaltendingRow
                            name={goalie}
                            key={id[index]}
                            on={ons[index]}
                            off={offs[index]}
                            tois={tois[index]}
                            index={index}
                        />
                    );
                })
            )}
        </div>
    );
}

function GameSummaryGoaltendingHeader() {
    return (
        <div className="w-full grid grid-cols-2 justify-between place-items-center" data-testid="goaltending-header">
            <div className="place-self-start uppercase">
                <Text type="body.xs" className="!font-medium" data-testid="goaltending-header-goalie">
                    Goalie
                </Text>
            </div>
            <div className="w-full grid grid-cols-3 justify-between place-items-center">
                <div className="place-self-end uppercase">
                    <Text type="body.xs" className="!font-medium" data-testid="goaltending-header-min">
                        Min
                    </Text>
                </div>
                <div className="place-self-end uppercase">
                    <Text type="body.xs" className="!font-medium" data-testid="goaltending-header-on">
                        on
                    </Text>
                </div>
                <div className="place-self-end uppercase">
                    <Text type="body.xs" className="!font-medium" data-testid="goaltending-header-off">
                        off
                    </Text>
                </div>
            </div>
        </div>
    );
}

function GameSummaryGoaltendingRow({ name, on, off, tois, index }: GameSummaryGoaltendingRowProps) {
    const { period: onPeriod, time: onTime } = on || {};
    const { period: offPeriod, time: offTime } = off || {};

    // Add ordinal suffix to periods
    const onPeriodString = addOrdinalSuffix(Number(onPeriod));
    const offPeriodString = addOrdinalSuffix(Number(offPeriod));

    const periodColor = colors.ash.variations[700];

    const backgroundColor = index % 2 === 0 ? "bg-[#36383d0d]" : "";

    return (
        <div
            className={cn(backgroundColor, "w-full grid grid-cols-2 justify-between place-items-center, p-2")}
            data-testid={`goaltending-row-${index}`}
        >
            <div
                className="place-self-start uppercase h-full flex items-center"
                data-testid={`goaltending-name-${index}`}
            >
                <Text type="body.sm">{name}</Text>
            </div>
            <div className="w-full grid grid-cols-3 justify-between place-items-center">
                <div
                    className="place-self-end uppercase text-center h-full flex items-center"
                    data-testid={`goaltending-tois-${index}`}
                >
                    <Text type="body.sm">{tois}</Text>
                </div>
                <div
                    className="place-self-end uppercase flex flex-col gap-1 items-center h-full"
                    data-testid={`goaltending-on-${index}`}
                >
                    <Text type="body.sm">{onTime}</Text>
                    <Text type="body.sm" color={periodColor}>
                        {onPeriodString}
                    </Text>
                </div>
                <div
                    className="place-self-end uppercase flex flex-col gap-1 h-full items-center"
                    data-testid={`goaltending-off-${index}`}
                >
                    <Text type="body.sm">{offTime}</Text>
                    <Text type="body.sm" color={periodColor}>
                        {offPeriodString}
                    </Text>
                </div>
            </div>
        </div>
    );
}

function GameSummaryGoalByPeriod({ goalsByPeriod }: { goalsByPeriod: GameSummaryGoalsByPeriod[] }) {
    return (
        <>
            {!goalsByPeriod
                ? null
                : goalsByPeriod.map((periodGoals, index) => (
                      <GameSummaryGoalByPeriodSection
                          key={index}
                          periodGoals={periodGoals}
                          data-testid={`goal-by-period-section-${index}`}
                      />
                  ))}
        </>
    );
}

function GameSummaryGoalByPeriodSection({ periodGoals }: { periodGoals: GameSummaryGoalsByPeriod }) {
    const { period, periodEvents } = periodGoals || {};
    return (
        <div className="w-full flex flex-col justify-start items-center" data-testid={`goal-by-period-${period}`}>
            <div
                className="bg-secondary-500 w-full flex justify-start rounded px-4 py-2 uppercase "
                data-testid={`goal-period-header-${period}`}
            >
                <Text type="body.sm" color="white" className="!font-medium">
                    {period}
                </Text>
            </div>
            {!periodEvents.length ? (
                <div
                    className="py-4 w-full flex justify-center text-ash-700 text-center"
                    data-testid={`goal-period-no-goals-${period}`}
                >
                    <Text type="body.sm">No Goals</Text>
                </div>
            ) : (
                periodEvents.map((event, index) => <GameSummaryGoalByPeriodEvent key={index} goalEvent={event} />)
            )}
        </div>
    );
}

function GameSummaryGoalByPeriodEvent({ goalEvent }: { goalEvent: GameSummaryGoalEvent }) {
    const { goalScorer, team, homeTeam, time, powerPlay, gameWinningGoal, shg, en } = goalEvent || {};

    const event = { powerPlay, gameWinningGoal, shg, en };

    const { assist1By, assist2By } = goalEvent || {};
    const { logo, title } = team || {};

    const teamLogo: TeamLogoType = logo ? (
        <img src={logo + "/256"} alt={title} className="w-16 h-16" loading={"lazy"} decoding={"async"} />
    ) : homeTeam ? (
        <Icon name="HomeJerseyIcon" color={colors.secondary.hex} size="lg" />
    ) : (
        <Icon name="VisitorJerseyIcon" color={colors.secondary.hex} size="lg" />
    );
    return (
        <div className="w-full flex justify-start items-center p-4 gap-6" data-testid={`goal-event-${goalScorer.id}`}>
            <div className="uppercase" data-testid={`goal-event-time-${goalScorer.id}`}>
                <Text type="body.sm">{time}</Text>
                <GameSummaryGoalByPeriodEventBadge event={event} />
            </div>
            <div className="uppercase" data-testid={`goal-event-team-logo-${goalScorer.id}`}>
                {teamLogo}
            </div>
            <div className="uppercase">
                <GameSummaryGoalsByPeriodGoalData
                    goalScorer={goalScorer}
                    assist1By={assist1By}
                    assist2By={assist2By}
                    team={title}
                />
            </div>
        </div>
    );
}

function GameSummaryGoalsByPeriodGoalData({
    goalScorer,
    assist1By,
    assist2By,
    team,
}: GameSummaryGoalsByPeriodGoalDataProps) {
    const { title, number, totalGoalCount } = goalScorer || {};
    const { title: assist1Title, number: assist1Number, totalGoalCount: assist1Count } = assist1By || {};
    const { title: assist2Title, number: assist2Number, totalGoalCount: assist2Count } = assist2By || {};

    const goalScoreString = `#${number} ${title} (${totalGoalCount})`;
    const assist1String = assist1Title ? `#${assist1Number} ${assist1Title} (${assist1Count})` : null;
    const assist2String = assist2Title ? `#${assist2Number} ${assist2Title} (${assist2Count})` : null;

    const teamColor = colors.ash.variations[700];
    return (
        <div className="w-full flex flex-col justify-center items-start" data-testid={`goal-data-${goalScorer.id}`}>
            <div className="uppercase !font-bold" data-testid={`goal-data-title-${goalScorer.id}`}>
                <Text type="body.sm" className="!font-medium">
                    {goalScoreString}
                </Text>
            </div>

            <div
                className="uppercase flex justify-center gap-2 pb-1"
                data-testid={`goal-data-assists-${goalScorer.id}`}
            >
                {/* If there is a primary assist */}
                {assist1String ? (
                    <Text type="body.xs" data-testid={`assist1-${goalScorer.id}`}>
                        {assist1String}
                    </Text>
                ) : null}
                {/* If there is a secondary assist */}
                {assist2String ? (
                    <Text type="body.xs" data-testid={`assist2-${goalScorer.id}`}>
                        {assist2String}
                    </Text>
                ) : null}
            </div>
            <hr className="border-ash-700 w-full" data-testid={`goal-data-divider-${goalScorer.id}`} />
            <div className="uppercase" data-testid={`goal-data-team-${goalScorer.id}`}>
                <Text type="body.xs" color={teamColor}>
                    {team}
                </Text>
            </div>
        </div>
    );
}

export function GameSummaryGoalByPeriodEventBadge({ event, className = "" }: GameSummaryGoalByPeriodEventBadgeProps) {
    const { powerPlay, gameWinningGoal, shg, en } = event || {};
    return (
        <div className={`flex gap-1 ${className}`} data-testid="game-summary-goal-by-period-badge">
            {powerPlay && <Badge text="PP" data-testid="badge-power-play" />}
            {gameWinningGoal && <Badge text="GWG" variant="inverted" data-testid="badge-game-winning-goal" />}
            {shg && <Badge text="SH" data-testid="badge-shorthanded-goal" />}
            {en && <Badge text="EN" data-testid="badge-empty-net" />}
        </div>
    );
}

function GameSummaryPenaltiesByPeriodData({
    penaltiesByPeriod,
}: {
    penaltiesByPeriod: GameSummaryPenaltiesByPeriod[];
}) {
    return (
        <>
            {!penaltiesByPeriod
                ? null
                : penaltiesByPeriod.map((periodPenalties, index) => (
                      <GameSummaryPenaltiesByPeriodSection
                          key={index}
                          periodPenalties={periodPenalties}
                          data-testid={`penalties-by-period-section-${index}`}
                      />
                  ))}
        </>
    );
}

function GameSummaryPenaltiesByPeriodSection({ periodPenalties }: { periodPenalties: GameSummaryPenaltiesByPeriod }) {
    const { period, periodEvents } = periodPenalties || {};
    return (
        <div className="w-full flex flex-col justify-start items-center" data-testid="penalties-by-period-section">
            <div
                className="bg-secondary-500 w-full flex justify-start rounded px-4 py-2 uppercase"
                data-testid="penalties-period-header"
            >
                <Text type="body.sm" color="white" className="!font-medium" data-testid="penalties-period-text">
                    {period}
                </Text>
            </div>
            {!periodEvents.length ? (
                <div
                    className="py-4 w-full flex justify-center text-ash-700 text-center"
                    data-testid="no-penalties-message"
                >
                    <Text type="body.sm">No Penalties</Text>
                </div>
            ) : (
                periodEvents.map((event, index) => (
                    <GameSummaryPenaltiesByPeriodEvent
                        key={index}
                        penaltyEvent={event}
                        data-testid={`penalty-event-${index}`}
                    />
                ))
            )}
        </div>
    );
}

function GameSummaryPenaltiesByPeriodEvent({ penaltyEvent }: { penaltyEvent: GameSummaryPenaltyEvent }) {
    const { commitedBy, servedBy, penaltyType, team, homeTeam, time, major } = penaltyEvent || {};

    const event = { major };

    const { logo, title } = team || {};

    return (
        <div className="w-full flex justify-start items-center p-4 gap-6" data-testid="penalty-event">
            <div className="uppercase" data-testid="penalty-time">
                <Text type="body.sm">{time}</Text>
                <GameSummaryPenaltiesByPeriodEventBadge event={event} data-testid="penalty-event-badge" />
            </div>
            <div className="uppercase" data-testid="penalty-team-logo">
                <TeamIconLogo team={homeTeam ? "home" : "visitor"} src={logo} alt={title} />
            </div>
            <div className="uppercase" data-testid="penalty-details">
                <GameSummaryPenaltiesByPeriodPenaltyData
                    commitedBy={commitedBy}
                    servedBy={servedBy}
                    penaltyType={penaltyType}
                    team={title}
                />
            </div>
        </div>
    );
}

export function GameSummaryPenaltiesByPeriodEventBadge({
    event,
    className = "",
}: {
    event: { major: boolean };
    className?: string;
}) {
    const { major } = event || {};
    return (
        <div className={`flex gap-1 ${className}`} data-testid="penalty-event-badge">
            {major && <Badge text="major" data-testid="badge-major" />}
        </div>
    );
}

function GameSummaryPenaltiesByPeriodPenaltyData({
    commitedBy,
    servedBy,
    penaltyType,
    team,
}: GameSummaryPenaltiesByPeriodPenaltyDataProps) {
    const { title, number } = commitedBy || {};
    const { title: servedByTitle, number: servedByNumber } = servedBy || {};
    const { title: penaltyTitle, duration } = penaltyType || {};

    const commitedByString = `#${number !== servedByNumber ? servedByNumber : number} ${
        title !== servedByTitle ? servedByTitle : title
    }`;

    const penaltyString = `${penaltyTitle}, ${duration} min`;

    const teamColor = colors.ash.variations[700];
    return (
        <div className="w-full flex flex-col justify-center items-start" data-testid="penalty-data-container">
            <div className="uppercase !font-bold" data-testid="penalty-committed-by">
                <Text type="body.sm" className="!font-medium">
                    {commitedByString}
                </Text>
            </div>

            <div className="uppercase flex justify-center gap-2 pb-1" data-testid="penalty-details">
                <Text type="body.xs">{penaltyString}</Text>
            </div>
            <hr className="border-ash-700 w-full" data-testid="penalty-separator" />
            <div className="uppercase" data-testid="penalty-team">
                <Text type="body.xs" color={teamColor}>
                    {team}
                </Text>
            </div>
        </div>
    );
}
