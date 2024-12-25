export default class User {
    static async findByUid(uid) {
        const userData = {
            displayName: "Test User",
            roles: ["admin", "student"],
            assignedCategories: ["laboratory"],
        };

        if (userData) {
            return new User(userData);
        } else {
            throw new Error('User not found in the database');
        }
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
