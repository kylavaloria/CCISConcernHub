import React, { useState, useEffect } from 'react';

const DiscussionThread = ({ initialDiscussion, status, concernCreatedDate }) => {
    const [discussion, setDiscussion] = useState(initialDiscussion);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const newMsg = {
                sender: 'Student',
                message: newMessage,
                timestamp: new Date().toLocaleString(),
            };
            setDiscussion([...discussion, newMsg]);
            setNewMessage('');
        }
    };

    return (
        <div className="border p-4 rounded-md shadow mb-6 mx-14">
            <h3 className="text-lg font-semibold mb-4">Discussion Thread</h3>
            <div className="max-h-64 overflow-y-auto mb-4">
                {discussion.map((msg, index) => (
                    <div key={index} className={`mb-3 ${msg.sender === 'Admin' ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-block p-2 rounded-md ${msg.sender === 'Admin' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                            <p><strong>{msg.sender}:</strong> {msg.message}</p>
                            <p className="text-xs text-gray-500">{msg.timestamp}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input for new message */}
            <div className="flex">
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

export default DiscussionThread;
