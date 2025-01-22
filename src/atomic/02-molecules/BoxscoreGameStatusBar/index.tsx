import { Header } from "../Header";

export const BoxScoreGameStatusBar = ({ gameStatus, isLive }: { gameStatus: string; isLive: boolean }) => {
    return (
        <Header
            title={gameStatus ? gameStatus : ""}
            template={isLive ? "liveBlue" : "ash"}
            size="xxs"
            divider={false}
        />
    );
};
