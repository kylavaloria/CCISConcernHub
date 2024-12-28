import { Timestamp } from "firebase/firestore";

export default class Concern {
    constructor({ attachmentLinks, category, creatorDisplayName, creatorUid, dateSubmitted, description, id, isResolved, isSpam, issueType, status, subject }) {
        this.attachmentLinks = attachmentLinks;
        this.category = category;
        this.creatorDisplayName = creatorDisplayName;
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
}
