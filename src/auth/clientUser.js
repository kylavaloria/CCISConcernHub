import { auth, provider } from '../auth/auth';
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import Database from '../services/database';

export default class ClientUser {
    static async signInWithMicrosoft() {
        const result = await signInWithPopup(auth, provider);
        return new ClientUser(result.user);
    }

    static onAuthStateChanged(listener) {
        onAuthStateChanged(auth, listener);
    }

    static async signOut() {
        await auth.signOut();
    }

    constructor(firebaseUser) {
        this.firebaseUser = firebaseUser
    }

    // Method to get corresponding User class from the database
    async getUserFromDatabase() {
        const uid = this.firebaseUser.uid;
        let user = await Database.getUser(uid);

        if (user === null) {
            user = await Database.setUserData(uid, this.firebaseUser);
        }

        return user;
    }
}
