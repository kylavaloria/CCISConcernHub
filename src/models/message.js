export default class Message {
    constructor({ uid, text, sender, timestamp }) {
        this.uid = uid ? uid : crypto.randomUUID();
        this.text = text;
        this.sender = sender;
        this.timestamp = timestamp;
    }
}
