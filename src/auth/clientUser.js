import { auth, provider } from '../auth/auth';
import { signInWithPopup } from "firebase/auth";
import User from '../models/user';

class ClientUser {
    static async signInWithMicrosoft() {
        const result = await signInWithPopup(auth, provider);
        return new ClientUser(result.user);
    }

    constructor(firebaseUser) {
        this.firebaseUser = firebaseUser; // Stores Firebase authenticated user
    }

    // Method to get corresponding User class from the database
    async getUserFromDatabase() {
        const email = this.firebaseUser.email;
        const user = await User.findByEmail(email);
        console.log(user);
        return user;
    }
}

export default ClientUser;
