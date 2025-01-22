import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

interface Team {
    id: string;
    name: string;
}

export interface Game {
    id: string;
    home?: Team;
    visitor?: Team;
    events?: any[];
    views?: any[];
    schemas?: { id: string; schema: any };
}

export const getGameById = async (gameId: string) => {
    const gameRef = doc(db, "games", gameId);

    try {
        const gameSnap = await getDoc(gameRef);

        if (!gameSnap.exists()) {
            return null;
        }
        const gameData = gameSnap.data();
        const schemasRef = collection(gameRef, "schemas");
        const gameSchemaRef = doc(schemasRef, "GameSchema");

        const versionsSnap = await getDocs(collection(gameSchemaRef, "versions"));
        const versions = versionsSnap.docs.map((doc) => ({
            id: doc.id,
            schema: doc.data().schema,
            ...doc.data(),
        }));
        const findGameSchema = versions.find((version) => version.schema === "GameSchema");

        const eventsSnap = await getDocs(collection(gameRef, "events"));
        const events = eventsSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        const viewsSnap = await getDocs(collection(gameRef, "views"));
        const views = viewsSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        const result = views.reduce((acc, item) => {
            const { id, ...rest } = item;
            return { ...acc, [id]: rest };
        }, {});

        const recentHomeGames = await getRecentGames(
            gameData.home.id,
            gameData.ScheduledStartTime.Time,
            gameData.season.id,
        );
        const recentVisitorGames = await getRecentGames(
            gameData.visitor.id,
            gameData.ScheduledStartTime.Time,
            gameData.season.id,
        );

        const recentGames = {
            home: recentHomeGames,
            visitor: recentVisitorGames,
        };

        return {
            ...gameData,
            schemas: findGameSchema,
            events,
            views: result,
            recentGames,
        };
    } catch (error) {
        console.error("Error fetching game:", error);
        throw error;
    }
};

export const getRecentGames = async (
    teamId: number,
    currentGameTime: { seconds: number; nanoseconds: number },
    seasonId: number,
) => {
    const gamesRef = collection(db, "games");

    // Query using the season-based index
    const gamesQuery = query(
        gamesRef,
        where("season.id", "==", seasonId),
        where("ScheduledStartTime.Time", "<", currentGameTime),
    );

    const querySnapshot = await getDocs(gamesQuery);

    // Filter for the team and sort
    const recentGames = await Promise.all(
        querySnapshot.docs
            .filter((doc) => {
                const data = doc.data();
                return data.home.id === teamId || data.visitor.id === teamId;
            })
            .sort((a, b) => {
                const timeA = a.data().ScheduledStartTime.Time.seconds;
                const timeB = b.data().ScheduledStartTime.Time.seconds;
                return timeB - timeA;
            })
            .slice(0, 5)
            .map(async (gameDoc) => {
                const game = {
                    id: gameDoc.id,
                    ...gameDoc.data(),
                } as Game;

                game.events = await getGameEvents(gameDoc.id);
                game.views = await getGameViews(gameDoc.id);
                game.schemas = await getGameSchemas(gameDoc.id);

                return game;
            }),
    );
    return recentGames;
};

export const getGameSchemas = async (gameId: string) => {
    const gameRef = doc(db, "games", gameId);
    const schemasRef = collection(gameRef, "schemas");
    const gameSchemaRef = doc(schemasRef, "GameSchema");

    const versionsSnap = await getDocs(collection(gameSchemaRef, "versions"));
    const versions = versionsSnap.docs.map((doc) => ({
        id: doc.id,
        schema: doc.data().schema,
        ...doc.data(),
    }));
    return versions.find((version) => version.schema === "GameSchema");
};

export const getGameEvents = async (gameId: string) => {
    const gameRef = doc(db, "games", gameId);
    const eventsSnap = await getDocs(collection(gameRef, "events"));
    const events = eventsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return events;
};

export const getGameViews = async (gameId: string) => {
    const gameRef = doc(db, "games", gameId);
    const viewsSnap = await getDocs(collection(gameRef, "views"));
    const views = viewsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return views;
};
