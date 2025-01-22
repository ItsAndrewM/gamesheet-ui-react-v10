export const DEFAULT_TEAM_LOGO = "/assets/Jersey.svg";
export const TEAM_LOGO_SIZE = 32;

export const useFormatBoxScoreRosterTable = () => {
    return (data: any, isSoccer: boolean): { rowData: any[] } => {
        // Transform data into row format
        console.log(isSoccer);
        const rowData = data.numbers.map((number: any, index: number) => ({
            number: number === -1 ? "00" : number,
            ...data.players[index],
            position: data.positions[index],
            goals: data.goals[index] || 0,
            assist: data.assists[index] || 0,
            points: data.points?.[index] || 0,
            pims: data.pims?.[index] || 0,
            yc: data.yc?.[index] || 0,
            rc: data.rc?.[index] || 0,
        }));

        return { rowData };
    };
};
