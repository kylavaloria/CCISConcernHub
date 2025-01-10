import { rtdatabase } from './firebase.js';
import { ref, get, set } from 'firebase/database';
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
        const messageRef = ref(rtdatabase, `threads/${threadId}/${message.uid}`);
        await set(messageRef, {
            sender: {
                uid: message.sender.uid,
                displayName: message.sender.displayName,
                avatarUrl: message.sender.avatarUrl,
            },
            text: message.text,
            timestamp: message.timestamp,
        });
    }
}
