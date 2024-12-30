import { Timestamp } from "firebase/firestore";
import Database from "../services/database";

export default class Concern {
    constructor({ attachmentLinks, category, creatorUid, dateSubmitted, description, id, isResolved, isSpam, issueType, status, subject }) {
        this.attachmentLinks = attachmentLinks;
        this.category = category;
        this.creatorUid = creatorUid;
        this.dateSubmitted = dateSubmitted instanceof Timestamp ? dateSubmitted.toDate() : new Date(dateSubmitted);
        this.description = description;
        this.id = id;
        this.isResolved = isResolved;
        this.isSpam = isSpam;
        this.issueType = issueType;
        this.status = status;
        this.subject = subject;
    }

    async fetchCreator(userData) {
        if (userData?.uid === this.creatorUid) {
            return userData;
        }

        try {
            return await Database.getUser(this.creatorUid);
        } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
        }
    }
}
