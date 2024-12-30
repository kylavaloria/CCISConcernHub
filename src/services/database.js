import { collection, query, where, doc, getDocs, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "./firebase";
import User from "../models/user";
import Concern from "../models/concern";

export default class Database {
    static async getUser(uid) {
        const docRef = doc(firestore, "users", uid);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? new User(docSnap.data()) : null;
    }

    static async setUserData(uid, userData) {
        const docRef = doc(firestore, "users", uid);
        await setDoc(docRef, userData);
    }

    static async getConcern(concernId) {
        const docRef = doc(firestore, "concerns", concernId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? new Concern(docSnap.data()) : null;
    }

    static async getUserConcerns(uid) {
        const q = query(collection(firestore, "concerns"), where("creatorUid", "==", uid));
        const querySnap = await getDocs(q);
        const concerns = querySnap.docs.map(doc => {
            return new Concern(doc.data());
        });
        return concerns;
    }

    static async setConcern(concernData) {
        const concernsCollectionRef = collection(firestore, "concerns");
        const docRef = doc(concernsCollectionRef);
        const concernId = docRef.id;
        await setDoc(docRef, { ...concernData, id: concernId });
    }
}
