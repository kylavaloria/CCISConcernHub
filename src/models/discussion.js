import RTDatabase from "../services/rtdatabase";
import Message from "./message";

export default class Discussion {
    constructor(uid) {
        this.uid = uid;
    }

    async fetchMessages() {
        return await RTDatabase.getMessages(this.uid);
    }

    async sendMessage(message) {
        await RTDatabase.sendMessage(this.uid, message);
    }

    async sendSystemMessage(message) {
        const systemMessage = new Message({
            sender: {
                uid: "system-message",
                displayName: "",
                avatarUrl: "",
            },
            text: message,
            timestamp: new Date().toISOString(),
        })

        await RTDatabase.sendMessage(this.uid, systemMessage);
    }

    listenForNewMessages(listener) {
        RTDatabase.listenForNewMessages(this.uid, listener);
    }
}
