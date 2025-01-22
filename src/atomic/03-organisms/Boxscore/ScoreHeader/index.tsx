import styled from "styled-components";
import { Text } from "@/atomic/01-atoms/Text";
import { colors } from "@/constants/Colors/colors";
import { TeamIconLogo } from "@/atomic/02-molecules/TeamIconLogo";
import { BoxscoreComputedData, BoxscoreGameScoreData, BoxscoreSchemaData } from "@/types/BoxscoreV2";

const StyledBoxscoreGameScore = styled.div.attrs({
    className: "boxscore-game-score w-full items-center flex flex-row justify-center gap-4",
    "data-testid": "boxscore-game-score",
})``;

type BoxscoreGameScoreProps = {
    gameScoreData: BoxscoreGameScoreData;
    computed: BoxscoreComputedData;
    data: BoxscoreSchemaData;
};

export function BoxscoreGameScore({ computed, data }: BoxscoreGameScoreProps) {
    const scoreColor = colors.secondary.hex;
    const { home, visitor } = data || {};
    const { scoreboard } = computed || {};
    const { total } = scoreboard || {};

    const { record, details, division } = home || {};
    const { title, logo } = details || {};

    const { record: vRecord, details: vDetails, division: vDivision } = visitor || {};
    const { title: visitorTitle, logo: visitorLogo } = vDetails || {};

    const { wins, losses, ties } = record || {};
    const homeRecord = `${wins}-${losses}-${ties}`;
    const { wins: visitorW, losses: visitorL, ties: visitorT } = vRecord || {};
    const visitorRecord = `${visitorW}-${visitorL}-${visitorT}`;

    const { home: finalScore, visitor: visitorFinalScore } = total || {};
    const { sog } = home || {};
    const { title: homeDivison } = division || {};
    const { sog: visitorSog } = visitor || {};
    const { title: visitorDivision } = vDivision || {};

    return (
        <StyledBoxscoreGameScore className="">
            <div className="w-full flex flex-col-reverse md:flex-row justify-center md:justify-center md:items-center items-end gap-4">
                <div className="items-end flex flex-col justify-center md:basis-[23rem] gap-2 md:gap-0">
                    <div className="md:flex flex-row gap-4 hidden">
                        <Text type="body.sm" color={colors.secondary.variations[300]} data-testid="visitor-division">
                            {visitorDivision}
                        </Text>
                        <Text type="body.sm" className="!uppercase !font-medium" data-testid="visitor-label">
                            Visitor
                        </Text>
                    </div>
                    <div className="flex justify-end md:[&>.text]:text-2xl">
                        <Text
                            type="body.xs"
                            className="!uppercase !text-right !font-medium"
                            data-testid="visitor-title"
                        >
                            {visitorTitle}
                        </Text>
                    </div>
                    <div className="md:[&>.text]:text-sm">
                        <Text type="body.xxs" className="!tracking-[.25rem] !font-medium" data-testid="visitor-record">
                            ({visitorRecord})
                        </Text>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-end">
                    {/* <Icon name="VisitorJerseyIcon" color={colors.secondary.hex} size="xxxl" /> */}
                    <TeamIconLogo
                        team={"visitor"}
                        src={visitorLogo}
                        alt={visitorTitle}
                        className="w-16 h-16 sm:w-32 sm:h-32"
                        data-testid="visitor-logo"
                    />
                </div>
            </div>
            <div className="p-4 flex flex-row justify-center items-center basis-[12.25rem]" data-testid="score-section">
                <div className="vScore flex flex-col justify-center items-center" data-testid="visitor-score">
                    <Text type="heading.4xl" color={scoreColor} className="!text-center">
                        {visitorFinalScore}
                    </Text>
                    <Text type="body.sm" className="!text-center !font-normal" data-testid="visitor-sog">
                        SOG: {visitorSog || "0"}
                    </Text>
                </div>
                <div className="p-4 flex justify-center items-center" data-testid="score-separator">
                    <Text type="heading.3xl" color={scoreColor} className="!text-center">
                        -
                    </Text>
                </div>
                <div className="hScore flex flex-col justify-center items-center" data-testid="home-score">
                    <Text type="heading.4xl" color={scoreColor} className="!text-center">
                        {finalScore}
                    </Text>
                    <Text type="body.sm" className="!text-center !font-normal" data-testid="home-sog">
                        SOG: {sog || "0"}
                    </Text>
                </div>
            </div>
            <div
                className="w-full flex flex-col items-start md:flex-row md:justify-center md:items-center gap-4"
                data-testid="home-section"
            >
                <div className="flex flex-col justify-center items-start" data-testid="home-logo-section">
                    <TeamIconLogo
                        team={"home"}
                        src={logo}
                        alt={title}
                        className="w-16 h-16 sm:w-32 sm:h-32"
                        data-testid="home-logo"
                    />
                </div>
                <div
                    className="items-start flex flex-col justify-center gap-2 md:gap-0 md:basis-[23rem]"
                    data-testid="home-details"
                >
                    <div className="md:flex flex-row gap-4 hidden">
                        <Text type="body.sm" className="!uppercase !font-medium" data-testid="home-label">
                            Home
                        </Text>
                        <Text type="body.sm" color={colors.secondary.variations[300]} data-testid="home-division">
                            {homeDivison}
                        </Text>
                    </div>
                    <div className="flex justify-start md:[&>.text]:text-2xl">
                        <Text type="body.xs" className="!uppercase !text-left !font-medium" data-testid="home-title">
                            {title}
                        </Text>
                    </div>
                    <div className="md:[&>.text]:text-sm">
                        <Text type="body.xxs" className="!tracking-[.25rem] !font-medium" data-testid="home-record">
                            ({homeRecord})
                        </Text>
                    </div>
                </div>
            </div>
        </StyledBoxscoreGameScore>
    );
}
