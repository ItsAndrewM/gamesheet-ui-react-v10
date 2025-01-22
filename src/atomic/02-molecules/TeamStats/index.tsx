import { BoxscoreTeamStatsData } from "@/types/BoxscoreV2";
import { filterStats } from "@/utils/filterStats";
import { Text } from "@/atomic/01-atoms";
import styled from "styled-components";

type TeamStatsProps = {
    sport: string;
    teamStatsData: BoxscoreTeamStatsData;
};

export const TeamStats = ({ sport, teamStatsData }: TeamStatsProps) => {
    const transformedStats = filterStats(teamStatsData, sport);
    return (
        <div className="w-full">
            {transformedStats.map((stat, index) => {
                const { visitor, home, label, key } = stat || {};
                return (
                    <StatLine position={index} visitor={Number(visitor)} home={Number(home)} label={label} key={key} />
                );
            })}
        </div>
    );
};

const StyledStatLine = styled.div.attrs({
    className: "stat-line relative flex flex-col justify-center items-center p-2",
})``;

type StatLineProps = {
    label: string;
    visitor: number;
    home: number;
    position: number;
};

export const StatLine = ({ home, visitor, label, position }: StatLineProps) => {
    // Calculate the width of the yellow and gray bars
    const background = position % 2 !== 0 ? "bg-gray-100" : "";
    const yellowWidth = visitor || home ? `${(visitor / (visitor + home)) * 100}%` : "50%";
    const grayWidth = visitor || home ? `${(home / (visitor + home)) * 100}%` : "50%";

    const visitorVal = visitor.toFixed(1);
    const homeVal = home.toFixed(1);

    return (
        <StyledStatLine className={background}>
            <Text type="body.xs" className="!font-medium">
                {label}
            </Text>
            <div className="flex items-center gap-4 w-full">
                <div className="w-12 text-sm font-semibold">{visitorVal}</div>
                <div className="flex-1 h-2 bg-ash-100 rounded-full overflow-hidden relative">
                    <div
                        className="absolute left-0 h-full bg-primary-500"
                        style={{
                            width: yellowWidth,
                        }}
                    />
                    <div
                        className="absolute right-0 h-full bg-secondary-500"
                        style={{
                            width: grayWidth,
                        }}
                    />
                </div>
                <div className="w-12 text-sm font-semibold text-right">{homeVal}</div>
            </div>
        </StyledStatLine>
    );
};
