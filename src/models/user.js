export default class User {
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

    toPlainObject() {
        return {
            uid: this.uid,
            displayName: this.displayName,
            roles: this.roles,
            assignedCategories: this.assignedCategories,
        };
    }
}
