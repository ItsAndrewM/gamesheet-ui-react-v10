export const DEFAULT_TEAM_LOGO = "/assets/Jersey.svg";
export const TEAM_LOGO_SIZE = 32;

export const useFormatBoxScoreGoalieTable = () => {
    return (data: any): { rowData: any[] } => {
        // Transform data into row format
        const rowData = data.numbers.map((number: string, index: number) => ({
            number,
            ...data.goalies[index],
            sv: data.svs[index],
            sa: data.sas[index],
            ga: data.gas[index],
            gaa: data.gaas[index],
        }));

        return { rowData };
    };
};
