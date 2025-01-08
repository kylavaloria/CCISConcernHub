import { rtdatabase } from './firebase.js';
import { ref, get } from 'firebase/database';
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
}
