import Database from "../services/database";

export default class Concern {
    constructor({ attachmentLinks, category, creatorDisplayName, creatorUid, dateSubmitted, description, id, isResolved, isSpam, issueType, status, subject }) {
        this.attachmentLinks = attachmentLinks;
        this.category = category;
        this.creatorDisplayName = creatorDisplayName;
        this.creatorUid = creatorUid;
        this.dateSubmitted = dateSubmitted.toDate();
        this.description = description;
        this.id = id;
        this.isResolved = isResolved;
        this.isSpam = isSpam;
        this.issueType = issueType;
        this.status = status;
        this.subject = subject;
    }

    static async findById(concernId) {
        const concernData = await Database.getConcernData(concernId);
        return concernData ? new Concern(concernData) : null;
    }
}
