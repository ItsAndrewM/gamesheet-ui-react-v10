import { Icon, Text } from "@/atomic/01-atoms";
import { colors } from "@/constants/Colors/colors";
import { BoxscoreLeadersData, BoxscoreLeadersPlayer, BoxscoreSchemaOrganization } from "@/types/BoxscoreV2";
import styled from "styled-components";

const StyledLeaders = styled.div.attrs({
    className: "leaders w-full",
})``;

type LeadersProps = {
    sport: string;
    leadersData: BoxscoreLeadersData;
    season: BoxscoreSchemaOrganization;
};

export function Leaders({ sport = "hockey", leadersData, season }: LeadersProps) {
    const { home, visitor } = leadersData || {};
    const {
        Points: homePoints,
        Goals: homeGoals,
        PenaltyMinutes: homePenaltyMinutes,
        Assists: homeAssists,
        RedCards: homeRedCards,
        YellowCards: homeYellowCards,
    } = home || {};
    const {
        Points: visitorPoints,
        Goals: visitorGoals,
        PenaltyMinutes: visitorPenaltyMinutes,
        Assists: visitorAssists,
        RedCards: visitorRedCards,
        YellowCards: visitorYellowCards,
    } = visitor || {};
    const { id: seasonId } = season || {};

    return (
        <StyledLeaders className="flex flex-col gap-2">
            <LeaderCard home={homeGoals!} visitor={visitorGoals} seasonId={seasonId} />
            <LeaderCard home={homeAssists!} visitor={visitorAssists!} seasonId={seasonId} />
            <LeaderCard home={homePoints!} visitor={visitorPoints!} seasonId={seasonId} />
            {sport.toLowerCase() !== "soccer" ? (
                <LeaderCard home={homePenaltyMinutes!} visitor={visitorPenaltyMinutes!} seasonId={seasonId} />
            ) : (
                <>
                    <LeaderCard home={homeYellowCards!} visitor={visitorYellowCards!} seasonId={seasonId} />
                    <LeaderCard home={homeRedCards!} visitor={visitorRedCards!} seasonId={seasonId} />
                </>
            )}
        </StyledLeaders>
    );
}

type LeaderCardProps = {
    home: BoxscoreLeadersPlayer | null;
    visitor: BoxscoreLeadersPlayer | null;
    seasonId: number;
};

function LeaderCard({ home, visitor, seasonId }: LeaderCardProps) {
    const sectionTitle = home?.Type?.toLowerCase() === "pim" ? "Penalty Minutes" : home?.Type;

    return (
        <div className="w-full flex flex-col justify-center items-center gap-2">
            <div className="bg-secondary-500 w-full flex justify-start rounded px-4 py-2 uppercase ">
                <Text type="body.sm" color="white" className="!font-medium">
                    {sectionTitle}
                </Text>
            </div>
            <div className="w-full">
                {/* visitor stats */}
                {visitor ? <LeaderRow player={visitor} seasonId={seasonId} /> : <LeaderEmptyRow />}
                {/* home stats */}
                {home ? <LeaderRow player={home} seasonId={seasonId} /> : <LeaderEmptyRow />}
            </div>
        </div>
    );
}

function LeaderPlayerImage({ avatarUrl, lastNameValue }: { avatarUrl: string; lastNameValue: string }) {
    return !avatarUrl ? (
        <div className="w-16 h-16 flex items-center justify-center bg-white">
            <Icon name="FallbackUserPhotoIcon" color={colors.primary.hex} size="xl" />
        </div>
    ) : (
        <img src={String(avatarUrl + "/256")} alt={lastNameValue} className="w-16 h-16 object-cover" />
    );
}

type LeaderRowProps = {
    player: BoxscoreLeadersPlayer;
    seasonId: number;
};

function LeaderRow({ player, seasonId }: LeaderRowProps) {
    const { Jersey, LastName, Team, FirstName, Avatar, Stat, Id } = player || {};

    return (
        <a
            href={`https://gamesheetstats.com/seasons/${seasonId}/players/${Id}`}
            className="flex flex-col justify-center items-center hover:bg-[#37383d33]  "
        >
            <div className="w-full grid grid-cols-4 justify-between place-items-center bg-[#37383d0d]">
                <div className="justify-self-start flex justify-center items-center">
                    <LeaderPlayerImage avatarUrl={Avatar!} lastNameValue={LastName!} />
                </div>
                <div className="w-full col-span-2">
                    <div className="flex flex-col w-full">
                        <div className="w-full flex justify-center items-center gap-2">
                            <Text type="body.lg" className="text-center">
                                #{Jersey}
                            </Text>
                            <Text type="body.lg" className="text-center">
                                {FirstName} {LastName}
                            </Text>
                        </div>
                        <Text type="body.sm" className="text-center opacity-45">
                            {Team}
                        </Text>
                    </div>
                </div>
                <div className="px-4 justify-self-end">
                    <Text type="heading.sm" className="text-center">
                        {Stat}
                    </Text>
                </div>
            </div>
        </a>
    );
}

function LeaderEmptyRow() {
    return (
        <div className="flex flex-col justify-center items-center hover:bg-[#37383d33]  ">
            <div className="w-full grid grid-cols-4 justify-between place-items-center bg-[#37383d0d]">
                <div className="justify-self-start flex justify-center items-center">
                    <div className="w-16 h-16 flex items-center justify-center bg-white">
                        <Icon name="FallbackUserPhotoIcon" color={colors.primary.hex} size="xl" />
                    </div>
                </div>
                <div className="w-full col-span-2">
                    <div className="flex flex-col w-full">
                        <div className="w-full flex justify-center items-center gap-2">
                            <Text type="body.lg" className="text-center">
                                TO BE DETERMINED
                            </Text>
                        </div>
                    </div>
                </div>
                <div className="px-4 justify-self-end">
                    <Text type="heading.sm" className="text-center">
                        -
                    </Text>
                </div>
            </div>
        </div>
    );
}
