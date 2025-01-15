import { collection, query, where, doc, getDocs, getDoc, setDoc, orderBy, startAfter, limit } from "firebase/firestore";
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
        const userData = user.toJSON();
        const docRef = doc(firestore, "users", userData.uid);
        await setDoc(docRef, userData);
    }

    static async getConcern(concernId) {
        const docRef = doc(firestore, "concerns", concernId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? new Concern(docSnap.data()) : null;
    }

    static async _getPaginatedConcerns(constraints, pagination) {
        if (pagination) {
            constraints.push(startAfter(pagination.lastDoc || new Date()));
            constraints.push(limit(pagination.size));
        }

        const querySnap = await getDocs(query(...constraints));
        const concerns = querySnap.docs.map(doc => {
            return new Concern(doc.data());
        });

        if (pagination) {
            pagination.updateFromSnapshot(querySnap);
        }

        return concerns;
    }

    static async getCategoryConcerns(categories, pagination = null) {
        const constraints = [
            collection(firestore, "concerns"),
            where("category", "in", categories),
            orderBy("dateSubmitted", "desc"),
        ];
        return await Database._getPaginatedConcerns(constraints, pagination);
    }

    static async getUserConcerns(uid, pagination = null) {
        const constraints = [
            collection(firestore, "concerns"),
            where("creatorUid", "==", uid),
            orderBy("dateSubmitted", "desc"),
        ];
        return await Database._getPaginatedConcerns(constraints, pagination);
    }

    static generateConcernUid() {
        const concernsCollectionRef = collection(firestore, "concerns");
        const docRef = doc(concernsCollectionRef);
        return docRef.id;
    }

    static async setConcern(concern) {
        const concernData = concern.toJSON();
        const docRef = doc(firestore, "concerns", concernData.uid);
        await setDoc(docRef, concernData);
    }
}

export class Pagination {
    constructor(size = 10) {
        this.size = size;
        this.lastDoc = null;
    }

    updateFromSnapshot(querySnapshot) {
        // Get the last visible document
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        if (lastVisible !== undefined) this.lastDoc = lastVisible;
    }
}
