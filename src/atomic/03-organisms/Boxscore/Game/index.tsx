import { BoxscoreGameScore } from "@/atomic/03-organisms/Boxscore/ScoreHeader";
// import { GameLineups } from "@/atomic/03-organisms/Boxscore/LineupsTab";
import { ButtonGroup } from "@/atomic/02-molecules/ButtonGroup";
import { Button } from "@/atomic/02-molecules/Button";
import { TabView } from "@/atomic/02-molecules/TabView";
import { Tab } from "@/atomic/01-atoms/Tab";
import { GamePreview } from "../PreviewTab";
import { GamePlayByPlay } from "../PlayByPlayTab";
import { GameSummaryTable } from "@/types/Game";
import { BoxScoreGameStatusBar } from "@/atomic/02-molecules/BoxscoreGameStatusBar";
import { GameSummary } from "../SummaryTab";
import { BoxscoreData } from "@/types/BoxscoreV2";
import { generateGameSummary } from "@/utils/generateGameSummary";
import { generateBackUpViews } from "@/utils/generateBackUpViews";
import { transformRecentGames } from "@/utils/transformRecentGames";
import { PropsWithChildren, useMemo, useState } from "react";

const BoxscoreContainer = ({ children }: PropsWithChildren) => {
    return (
        <div
            data-testid="boxscore-container"
            className="boxscore flex flex-col gap-4 bg-white [&>.header]:flex [&>.header]:justify-center [&>.header]:items-center [&>.header]:w-full"
        >
            {children}
        </div>
    );
};

export type BoxscoreProps = {
    tab?: string;
    onSelectTab?: (tab: string) => void;
    // recentGames: GameSummaryRecentGame[];
    boxscoreData: BoxscoreData;
};

export type TeamLogoType = JSX.Element;

export function Boxscore({ onSelectTab = () => {}, tab = "preview", boxscoreData }: BoxscoreProps) {
    const [selectedTab, setSelectedTab] = useState(tab);
    const handleSelect = (tab: string) => () => {
        setSelectedTab(tab);
        onSelectTab(tab);
    };
    const { schemas, views, id, recentGames: recentGamesData } = boxscoreData || {};
    const { home: recentHomeGames, visitor: recentVisitorGames } = recentGamesData || {};
    const gameScoreData = views["stats-widget-game-details-header"];
    const teamStatsData = views["stats-widget-game-team-stats"];
    const h2hData = views["stats-widget-game-h2h-summary"];
    const leadersData = views["stats-widget-game-team-leaders"];
    // const gameTodayData = views["stats-widget-game-today-completed"];
    const { computed, data, sport } = schemas || {};

    const { status } = computed || {};

    console.log(id);

    const isLive = useMemo(() => status === "inProgress", [status]);

    // const idViews = views[id] ? views[id] : gameScoreData;

    const tables = generateGameSummary(schemas);
    const recentGamesForHome = transformRecentGames(recentHomeGames);
    const recentGamesForVisitor = transformRecentGames(recentVisitorGames);
    const recentGames = {
        home: recentGamesForHome,
        visitor: recentGamesForVisitor,
    };

    console.log("boxscoreData", boxscoreData);

    if (!schemas) {
        const { schemas: backupSchemas } = generateBackUpViews(boxscoreData);
        const { computed: backupComputed, data: backupData } = backupSchemas;
        return (
            <BoxscoreContainer>
                <BoxScoreGameStatusBar gameStatus={status} isLive={isLive} data-testid="game-status-bar" />
                <BoxscoreGameScore
                    data-testid="game-score"
                    gameScoreData={gameScoreData}
                    computed={backupComputed}
                    data={backupData}
                />

                <ButtonGroup behavior="toggle" selected={selectedTab} data-testid="tab-button-group">
                    <Button
                        label="Preview"
                        $size="sm"
                        onClick={handleSelect("preview")}
                        data-testid="tab-button-preview"
                    />
                    <Button
                        label="Lineups"
                        $size="sm"
                        onClick={handleSelect("lineups")}
                        data-testid="tab-button-lineups"
                    />
                    <Button
                        label="Play-by-Play"
                        $size="sm"
                        onClick={handleSelect("play-by-play")}
                        data-testid="tab-button-play-by-play"
                    />
                    <Button
                        label="Summary"
                        $size="sm"
                        onClick={handleSelect("summary")}
                        data-testid="tab-button-summary"
                    />
                </ButtonGroup>

                <TabView activeTab={selectedTab} data-testid="tab-view">
                    <Tab name="preview" data-testid="tab-preview">
                        <GamePreview
                            recentGames={recentGames}
                            teamStatsData={teamStatsData}
                            data={backupData}
                            h2hData={h2hData}
                            leadersData={leadersData}
                            sport={sport}
                        />
                    </Tab>
                    <Tab name="lineups" data-testid="tab-lineups">
                        {/* <GameLineups lineupData={idViews} /> */}
                    </Tab>
                    <Tab name="play-by-play" data-testid="tab-play-by-play">
                        <GamePlayByPlay gameSchemas={backupSchemas} />
                    </Tab>
                    <Tab name="summary" data-testid="tab-summary">
                        <GameSummary tables={tables as unknown as GameSummaryTable} />
                    </Tab>
                </TabView>
            </BoxscoreContainer>
        );
    }

    return (
        <BoxscoreContainer>
            <BoxScoreGameStatusBar gameStatus={status} isLive={isLive} data-testid="game-status-bar" />
            <BoxscoreGameScore data-testid="game-score" gameScoreData={gameScoreData} computed={computed} data={data} />

            <ButtonGroup behavior="toggle" selected={selectedTab} data-testid="tab-button-group">
                <Button label="Preview" $size="sm" onClick={handleSelect("preview")} data-testid="tab-button-preview" />
                <Button label="Lineups" $size="sm" onClick={handleSelect("lineups")} data-testid="tab-button-lineups" />
                <Button
                    label="Play-by-Play"
                    $size="sm"
                    onClick={handleSelect("play-by-play")}
                    data-testid="tab-button-play-by-play"
                />
                <Button label="Summary" $size="sm" onClick={handleSelect("summary")} data-testid="tab-button-summary" />
            </ButtonGroup>

            <TabView activeTab={selectedTab} data-testid="tab-view">
                <Tab name="preview" data-testid="tab-preview">
                    <GamePreview
                        recentGames={recentGames}
                        teamStatsData={teamStatsData}
                        data={data}
                        h2hData={h2hData}
                        leadersData={leadersData}
                        sport={sport}
                    />
                </Tab>
                <Tab name="lineups" data-testid="tab-lineups">
                    {/* <GameLineups lineupData={idViews} /> */}
                </Tab>
                <Tab name="play-by-play" data-testid="tab-play-by-play">
                    <GamePlayByPlay gameSchemas={schemas} />
                </Tab>
                <Tab name="summary" data-testid="tab-summary">
                    <GameSummary tables={tables as unknown as GameSummaryTable} />
                </Tab>
            </TabView>
        </BoxscoreContainer>
    );
}
