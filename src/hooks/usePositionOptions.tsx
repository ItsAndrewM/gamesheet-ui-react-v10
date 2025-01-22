import { useEffect, useState } from "react";

export type PositionOptions = {
    key: string;
    title: string;
    abbr: string;
}[];

export interface Position {
    key: string;
    title: string;
    abbr: string;
    type: "position";
    sport: string[];
}

export const usePositionOptions = () => {
    const [positions, setPositions] = useState({ options: [] as Position[] });

    useEffect(() => {
        (async () => {
            const positionOptions = await fetch("https://lookups.gamesheet.io/api/lookups/positions")
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch positions");
                    }

                    return response.json();
                })
                .catch(() => [] as PositionOptions);

            setPositions({
                options: positionOptions,
            });
        })();
    }, []);

    return positions;
};
