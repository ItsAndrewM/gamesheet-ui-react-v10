/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text } from "@/atomic/01-atoms";
import { GameSummaryRecentGame } from "@/types/Game";
import styled from "styled-components";
import { BoxscoreH2HData, BoxscoreSchemaData, BoxscoreTeamStatsData } from "@/types/BoxscoreV2";
import { TeamIconLogo } from "@/atomic/02-molecules/TeamIconLogo";
import { Header, HeadToHead, Leaders, RecentGames, TeamStats } from "@/atomic/02-molecules";

const StyledGamePreview = styled.div.attrs({
    className: "game-preview grid md:grid-cols-2 gap-8 p-6",
    "data-testid": "game-preview",
})``;

export type GamePreviewProps = {
    recentGames: { home: GameSummaryRecentGame[]; visitor: GameSummaryRecentGame[] };
    teamStatsData: BoxscoreTeamStatsData;
    data: BoxscoreSchemaData;
    h2hData: BoxscoreH2HData;
    leadersData: any;
    sport: string;
};

export const GamePreview = ({ recentGames, teamStatsData, data, h2hData, leadersData, sport }: GamePreviewProps) => {
    const { home, visitor, organizations } = data || {};
    const { details: homeDetails } = home || {};
    const { details: visitorDetails } = visitor || {};
    const { title: homeTitle, logo: homeLogo } = homeDetails || {};
    const { title: visitorTitle, logo: visitorLogo } = visitorDetails || {};
    const season = !organizations ? null : organizations.find((org) => org.type === "season");
    return (
        <StyledGamePreview>
            {/* Team Stats */}
            <div className="w-full flex flex-col justify-start items-center" data-testid="team-stats-section">
                <div className="w-full">
                    <Header title="Team Stats" size="sm" data-testid="team-stats-header" />
                </div>
                <div className="hidden sm:flex items-center justify-between w-full" data-testid="team-logos">
                    <div className="flex items-center gap-2" data-testid="visitor-team">
                        <div className="w-16 h-16 flex items-center justify-center" data-testid="visitor-logo">
                            <TeamIconLogo team="visitor" src={visitorLogo} alt={visitorTitle} />
                        </div>
                        <Text type="body.lg" data-testid="visitor-title" className="!font-medium">
                            {visitorTitle}
                        </Text>
                    </div>
                    <div className="flex items-center justify-end gap-2 text-right" data-testid="home-team">
                        <Text type="body.lg" data-testid="home-title" className="!font-medium">
                            {homeTitle}
                        </Text>
                        <div className="w-16 h-16 flex items-center justify-center" data-testid="home-logo">
                            <TeamIconLogo team="home" src={homeLogo} alt={homeTitle} />
                        </div>
                    </div>
                </div>
                <TeamStats sport={sport} teamStatsData={teamStatsData} data-testid="team-stats-data" />
                {/* Head to Head */}

                <div className="w-full" data-testid="head-to-head-section">
                    <div className="w-full">
                        <Header title="Head to Head" size="sm" data-testid="head-to-head-header" />
                    </div>
                    <HeadToHead h2hData={h2hData} season={season!} data-testid="head-to-head-data" />
                </div>
            </div>
            {/* Leaders */}

            <div data-testid="leaders-section">
                <div className="w-full">
                    <Header title="Leaders" size="sm" data-testid="leaders-header" />
                </div>
                <Leaders sport={sport} data-testid="leaders-data" leadersData={leadersData} season={season!} />
            </div>

            {/* Recent Games */}
            <div className="md:col-span-2" data-testid="recent-games-section">
                <div className="w-full">
                    <Header title="Recent Games" size="sm" data-testid="recent-games-header" />
                </div>
                {!recentGames ? null : (
                    <RecentGames
                        data={recentGames}
                        homeTeamLogo={homeLogo}
                        visitorTeamLogo={visitorLogo}
                        visitorTitle={visitorTitle}
                        homeTitle={homeTitle}
                        data-testid="recent-games-data"
                    />
                )}
            </div>
        </StyledGamePreview>
    );
};
