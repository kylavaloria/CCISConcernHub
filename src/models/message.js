export default class Message {
    constructor({ uid, text, sender, timestamp }) {
        this.uid = uid;
        this.text = text;
        this.sender = sender;
        this.timestamp = timestamp;

        console.log(this.uid);
        console.log(this.text);
        console.log(this.sender);
    }
}
