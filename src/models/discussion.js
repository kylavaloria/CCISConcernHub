import RTDatabase from "../services/rtdatabase";
import Message from "./message";

export default class Discussion {
    constructor(uid) {
        this.uid = uid;
        this.messages = [];
    }

    async fetchMessages() {
        this.messages = await RTDatabase.getMessages(this.uid);
    }

    getMessages() {
        return this.messages;
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
}
