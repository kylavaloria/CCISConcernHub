import RTDatabase from "../services/rtdatabase";

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
}
