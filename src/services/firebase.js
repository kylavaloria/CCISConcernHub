import firebaseConfig from "../../firebaseConfig";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const rtdatabase = getDatabase(app);
