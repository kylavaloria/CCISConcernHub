import {
    collection,
    query,
    getCountFromServer,
    where,
    doc,
    getDocs,
    getDoc,
    setDoc,
    orderBy,
    startAfter,
    limit
} from "firebase/firestore";
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

    static async getConcerns(filter, pagination = null) {
        if (pagination) {
            filter.constraints.push(startAfter(pagination.lastDoc || new Date()));
            filter.constraints.push(limit(pagination.size));
        }

        const querySnap = await getDocs(query(...filter.constraints));
        const concerns = querySnap.docs.map(doc => {
            return new Concern(doc.data());
        });

        if (pagination) {
            pagination.updateFromSnapshot(querySnap);
        }

        return concerns;
    }

    static async aggregateConcernsByStatus(filter) {
        async function getCount(constraints) {
            const consts = [...filter.constraints, ...constraints];
            const querySnap = await getCountFromServer(query(...consts));
            return querySnap.data().count;
        }

        const resolved = await getCount([where("isResolved", "==", true)]);
        const total = await getCount([]);
        const result = {
            "Open": await getCount([where("status", "==", "Open")]),
            "In Progress": await getCount([where("status", "==", "In Progress")]),
            "On Hold": await getCount([where("status", "==", "On Hold")]),
            "Resolved": resolved,
            "Unresolved": total - resolved,
            "Total": total,
        };

        return result;
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

    reset() {
        this.lastDoc = null;
    }
}

export class ConcernsFilter {
    constructor() {
        this.constraints = [
            collection(firestore, "concerns"),
            orderBy("dateSubmitted", "desc"),
        ];
    }

    copy() {
        const filter = new ConcernsFilter();
        filter.constraints = [...this.constraints];
        return filter;
    }

    categoryIn(categories) {
        this.constraints.push(where("category", "in", categories));
        return this;
    }

    creatorIs(userUid) {
        this.constraints.push(where("creatorUid", "==", userUid));
        return this;
    }

    issueTypeIn(issueTypes) {
        this.constraints.push(where("issueType", "in", issueTypes));
        return this;
    }

    statusIn(statuses) {
        this.constraints.push(where("status", "in", statuses));
        return this;
    }

    dateSubmittedRange(fromDate, toDate) {
        this.constraints.push(where("dateSubmitted", ">=", fromDate));
        this.constraints.push(where("dateSubmitted", "<=", toDate));
        return this;
    }
}
