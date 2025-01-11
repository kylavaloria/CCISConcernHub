import { useEffect, useState, useRef } from 'react';
import Message from '../models/message';
import { formatDate } from '../utils';

export default function DiscussionThread({ userData, concern, status }) {
    const [discussion, setDiscussion] = useState({ messages: [] });
    const [newMessage, setNewMessage] = useState("");
    const textareaRef = useRef(null);

    useEffect(() => {
        async function fetchDiscussion() {
            if (!concern.hasDiscussion) return;
            await concern.discussion.fetchMessages();
            const messages = concern.discussion.getMessages();
            setDiscussion({ messages });
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
                sender: {
                    uid: userData.uid,
                    displayName: userData.displayName,
                    avatarUrl: userData.getAvatarUrl(),
                },
                text: newMessage,
                timestamp: new Date().toLocaleString(),
            });

            setDiscussion({
                ...discussion,
                messages: [...discussion.messages, newMsg],
            });
            setNewMessage("");

            if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
            }

            await concern.discussion.sendMessage(newMsg);
        }
    };

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    return (
        <div className="p-4 rounded-md mb-8 mx-14">
            <div className="border mb-10 "></div>
            <h3 className="text-xl font-semibold mt-2 mb-10">Discussion Thread</h3>
            <div className="max-h-80 overflow-y-auto mb-4">
                <div className="text-center text-xs text-gray-500 mt-4 mb-5">
                    <p>{formatDate(concern.getDateSubmitted())}</p>
                    <p>30 days of inactivity will automatically close the concern.</p>
                </div>

                {status === "In Progress" && (
                    <div className="text-center text-xs text-gray-500 mb-5">
                        <p>{formatDate(new Date())}</p>
                        <p>This concern is now marked as In Progress.</p>
                    </div>
                )}
                {status === "On Hold" && (
                    <div className="text-center text-xs text-gray-500 mb-5">
                        <p>{formatDate(new Date())}</p>
                        <p>This concern is now marked as On Hold.</p>
                    </div>
                )}
                {status === "Closed" && (
                    <div className="text-center text-xs text-gray-500 mb-5">
                        <p>This concern is now marked as Closed.</p>
                    </div>
                )}

                {discussion?.messages?.map((msg, index) => (
                    <div key={index} className="relative">
                        <div className="pr-3 pl-3 text-sm pt-3">
                            <p className="ml-1 text-gray-600 text-xs text-left pb-2">
                                <strong>{msg.sender.displayName}</strong>
                            </p>
                            <p className="ml-1 text-sm break-all overflow-hidden pb-3">
                                {msg.text}
                            </p>
                            <p className="absolute right-0 top-0 text-xs text-gray-500 text-right mr-4 pt-3">
                                {formatDate(msg.timestamp)}
                            </p>
                            <div className="border-gray-300 border-t-[0.5px]"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input for new message */}
            <div className="bg-gray-100 ml-3 flex flex-col border border-gray-300 rounded-md mt-8 overflow-hidden">
                <textarea
                    ref={textareaRef}
                    value={newMessage}
                    onChange={(e) => {
                        setNewMessage(e.target.value);
                        adjustHeight();
                    }}
                    placeholder="Type your message here..."
                    className="bg-gray-100 px-4 py-2 outline-none resize-none min-h-[40px] max-h-32 overflow-y-auto text-sm"
                    rows={1}
                />
                <div className="flex justify-end">
                    <button
                        onClick={handleSendMessage}
                        className="bg-blue-500 text-white text-sm px-4 py-1 m-2 rounded-xl hover:bg-blue-600"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};
