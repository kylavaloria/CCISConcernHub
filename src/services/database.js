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

    static async setUser(user) {
        const docRef = doc(firestore, "users", uid);
        await setDoc(docRef, user.toJSON());
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

    static getNewConcernId() {
        const concernsCollectionRef = collection(firestore, "concerns");
        const docRef = doc(concernsCollectionRef);
        return docRef.id;
    }

    static async setConcern(concern) {
        const concernsCollectionRef = collection(firestore, "concerns");
        const docRef = doc(concernsCollectionRef);
        await setDoc(docRef, concern.toJSON());
    }
}
