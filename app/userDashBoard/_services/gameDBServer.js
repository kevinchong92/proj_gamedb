import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";

export async function getGames(userId) {
    const gamesCol = collection(db, "users", userId, "games");
    const gamesSnapshot = await getDocs(gamesCol);
    const myGames = [];
    gamesSnapshot.forEach((doc) => {
        myGames.push({ id: doc.id, data: doc.data() });
    });
    return myGames;
}

export async function addGame(userId, game) {
    const gamesCol = collection(db, "users", userId, "games");
    try {
        const docRef = await addDoc(gamesCol, game);
        return docRef.id;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function deleteGame(userId, gameId) {
    const gameRef = doc(db, "users", userId, "games", gameId);
    await deleteDoc(gameRef);
}

export async function gameExists(userId, gameId) {
    const gamesCol = collection(db, "users", userId, "games");
    const q = query(gamesCol, where("id", "==", gameId));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
}