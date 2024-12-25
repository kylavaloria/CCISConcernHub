import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../services/firebase";

export default class User {
    static async findByUid(uid) {
        const docRef = doc(firestore, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return new User(docSnap.data());
        }

        return null;
    }

    static async new(uid, displayName) {
        const userData = {
            uid: uid,
            displayName: displayName,
            roles: ["student"],
            assignedCategories: null,
        };
        const docRef = doc(firestore, "users", uid);
        await setDoc(docRef, userData);
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
