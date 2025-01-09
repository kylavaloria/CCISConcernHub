import { Timestamp } from "firebase/firestore";
import Database from "../services/database";
import Storage from '../services/storage';
import Discussion from './discussion';

export default class Concern {
    constructor({ assignedAdmins, attachments, category, creatorUid, dateSubmitted, description, uid, isResolved = false, isSpam = false, issueType, status = 'Open', subject, hasDiscussion = false }) {
        this.assignedAdmins = assignedAdmins;
        this.attachments = attachments;
        this.category = category;
        this.creatorUid = creatorUid;
        this.dateSubmitted = dateSubmitted instanceof Timestamp ? dateSubmitted.toDate() : new Date(dateSubmitted);
        this.description = description;
        this.uid = uid || Database.generateConcernUid();
        this.isResolved = isResolved;
        this.isSpam = isSpam;
        this.issueType = issueType;
        this.status = status;
        this.subject = subject;
        this.hasDiscussion = hasDiscussion;
        this.discussion = new Discussion(this.uid);
    }

    async saveToDatabase() {
        await Database.setConcern(this);
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

    toJSON() {
        return {
            assignedAdmins: this.assignedAdmins,
            attachments: this.attachments,
            category: this.category,
            creatorUid: this.creatorUid,
            dateSubmitted: this.dateSubmitted,
            description: this.description,
            uid: this.uid,
            isResolved: this.isResolved,
            isSpam: this.isSpam,
            issueType: this.issueType,
            status: this.status,
            subject: this.subject,
            hasDiscussion: this.hasDiscussion,
        };
    }

    async _uploadFile(file) {
        const dlUrl = await Storage.uploadFile(file, `concerns/${this.uid}/${file.name}`);
        this.attachments.push({
            name: file.name,
            url: dlUrl,
        });
    }

    async uploadAttachments(files) {
        const promises = [];

        for (const file of files) {
            promises.push(this._uploadFile(file));
        }

        await Promise.all(promises);
    }

    updateStatus(newStatus) {
        this.status = newStatus;
    }

    isAdminAssigned(userData) {
        return this.assignedAdmins.find(admin => admin.uid === userData.uid);
    }

    assignAdmin(userData) {
        this.assignedAdmins.push({
            uid: userData.uid,
            name: userData.displayName,
        });
    }

    unassignAdmin(userData) {
        this.assignedAdmins = this.assignedAdmins.filter(
            admin => admin.uid !== userData.uid
        );
    }

    setIsResolved(isResolved) {
        this.isResolved = isResolved;
    }

    setIsSpam(isSpam) {
        this.isSpam = isSpam;
    }

    getDateSubmitted() {
        return this.dateSubmitted;
    }
}
