import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export default class Storage {
    static async uploadFile(file, path) {
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
    }

//     static async uploadFile(file, path) {
//         return new Promise((resolve, reject) => {
//             const storageRef = ref(storage, path);
//             const uploadTask = uploadBytesResumable(storageRef, file);
//
//             uploadTask.on(
//                 "state_changed",
//                 (snapshot) => {
//                     // Progress function (optional)
//                 },
//                 (error) => {
//                     // Error function
//                     reject(error);
//                 },
//                 async () => {
//                     // Complete function
//                     const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//                     resolve(downloadURL);
//                 }
//             );
//         });
//     }
//
//     static async uploadFiles(files, path) {
//         const uploadPromises = files.map((file, index) => {
//             const filePath = `${path}/${file.name}`;
//             return this.uploadFile(file, filePath);
//         });
//
//         return Promise.all(uploadPromises);
//     }
}
