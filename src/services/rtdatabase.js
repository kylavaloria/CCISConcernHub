import { rtdatabase } from './firebase.js';
import { ref, query, get, set, push, onChildAdded, limitToLast, off } from 'firebase/database';
import Message from '../models/message.js';

export default class RTDatabase {
    static async getMessages(threadId) {
        const threadRef = ref(rtdatabase, 'threads/' + threadId);
        const snapshot = await get(threadRef);

        if (snapshot.exists()) {
            const messages = Object.entries(snapshot.val())
                .map(([messageId, messageData]) => new Message({
                    uid: messageId,
                    ...messageData,
                })
            );

            return messages;
        }
    }

    static async sendMessage(threadId, message) {
        const threadRef = ref(rtdatabase, 'threads/' + threadId);
        const newMessageRef = push(threadRef);
        await set(newMessageRef, {
            sender: {
                uid: message.sender.uid,
                displayName: message.sender.displayName,
                avatarUrl: message.sender.avatarUrl,
            },
            text: message.text,
            timestamp: message.timestamp,
        });
    }

    static listenForNewMessages(threadId, listener) {
        const threadRef = query(
            ref(rtdatabase, 'threads/' + threadId),
            limitToLast(1),
        );

        // Avoid duplicate listeners
        off(threadRef);

        onChildAdded(threadRef, (data) => {
            const message = new Message({ uid: data.key, ...data.val() });
            listener(message);
        });
    }
}
