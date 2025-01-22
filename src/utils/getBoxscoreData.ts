import { getGameById } from "@/lib/queries";
const GAME_ID = "1582277";

export async function getBoxscoreData() {
    try {
        const firestoreData = await getGameById(GAME_ID);
        if (!firestoreData) return null;
        return firestoreData;
    } catch (error) {
        console.error("Error fetching game:", error);
        return null;
    }
}
