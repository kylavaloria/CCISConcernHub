import { useEffect, useState } from 'react';
import Message from '../models/message';

export default function DiscussionThread({ userData, concern, status }) {
    const [discussion, setDiscussion] = useState({ messages: [] });
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        async function fetchDiscussion() {
            if (!concern.hasDiscussion) return;
            await concern.discussion.fetchMessages();
            const messages = concern.discussion.getMessages();
            setDiscussion({ messages: messages });
        }
        fetchDiscussion();
    }, [concern]);

    const handleSendMessage = async () => {
        if (!concern.hasDiscussion) {
            concern.setHasDiscussion(true);
            concern.saveToDatabase();
        }

        if (newMessage.trim()) {
            const newMsg = new Message({
                sender: userData.uid,
                text: newMessage,
                timestamp: new Date().toLocaleString(),
            });
            setDiscussion({
                ...discussion,
                messages: [...discussion.messages, newMsg],
            });
            await concern.discussion.sendMessage(newMsg);
            setNewMessage('');
        }
    };

    const formatDate = (date) => {
        const d = new Date(date);

        const datePart = d.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });

        const timePart = d.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });

        return `${datePart} at ${timePart}`;
    };


    return (
        <div className="border p-4 rounded-md  mb-6 mx-14 shadow">
            <h3 className="text-lg font-semibold mt-2 mb-4">Discussion Thread</h3>
        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>


            <div className="max-h-64 overflow-y-auto mb-4">

            {/* Initial Timestamp and Message */}
            <div className="text-center text-xs text-gray-500 mt-4 mb-5">
                <p>{formatDate(concern.getDateSubmitted())}</p>
                <p>30 days of inactivity will automatically close the concern.</p>
            </div>

            {/* Status-Specific Messages */}
            {status === 'In Progress' && (
                <div className="text-center text-xs text-gray-500 mb-5">
                    <p>{formatDate(new Date())}</p>
                    <p>This concern is now marked as In Progress.</p>
                </div>
            )}
            {status === 'On Hold' && (
                <div className="text-center text-xs text-gray-500 mb-5">
                    <p>{formatDate(new Date())}</p>
                    <p>This concern is now marked as On Hold.</p>
                </div>
            )}
            {status === 'Closed' && (
                <div className="text-center text-xs text-gray-500 mb-5">
                    <p>This concern is now marked as Closed.</p>
                </div>
            )}

            {discussion?.messages?.map((msg, index) => (
                <div key={index} className={`mb-3  ${msg.sender === 'Admin' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block pr-3 pl-3 p-2.5 rounded-md text-sm space-y-1 ${msg.sender === 'Admin' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                        <p className ="text-gray-600 text-xs text-left"><strong>{msg.sender}</strong></p>
                        <p>{msg.text}</p>
                        <p className="text-xs text-gray-500 text-left">{formatDate(msg.timestamp)}</p>
                    </div>
                </div>
            ))}
            </div>

            {/* Input for new message */}
            <div className="flex text-xs">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="flex-grow border border-gray-300 rounded-l-md px-4 py-2"
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
                >
                    Send
                </button>
            </div>
        </div>
    );
};
