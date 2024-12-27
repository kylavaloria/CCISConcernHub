import Database from "../services/database";

export default class User {
    static async findByUid(uid) {
        const userData = await Database.getUserData(uid);
        return userData ? new User(userData) : null;
    }

    static async new(uid, displayName) {
        const userData = {
            uid: uid,
            displayName: displayName,
            roles: ["student"],
            assignedCategories: null,
        };
        await Database.setUserData(uid, userData);
        return new User(userData);
    }

    constructor({ uid, displayName, roles, assignedCategories = null }) {
        this.uid = uid;
        this.displayName = displayName;
        this.roles = roles;
        this.assignedCategories = assignedCategories;
    }

    getAvatarUrl() {
        return `https://api.dicebear.com/9.x/initials/svg?seed=${this.displayName}`;
    }

    isStudent() {
        return this.roles.includes('student');
    }

    isAdmin() {
        return this.roles.includes('admin');
    }
}
