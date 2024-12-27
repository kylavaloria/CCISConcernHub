import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "./firebase";

export default class Database {
    static async getUserData(uid) {
        const docRef = doc(firestore, "users", uid);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() : null;
    }

    static async setUserData(uid, userData) {
        const docRef = doc(firestore, "users", uid);
        await setDoc(docRef, userData);
    }
}
