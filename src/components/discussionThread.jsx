import React, { useState, useEffect, useRef } from "react";
import Message from "../models/message";

const DiscussionThread = ({ initialDiscussion, status, concern, userData, concernCreatedDate }) => {
    const [discussion, setDiscussion] = useState(initialDiscussion || { messages: [] });
    const [newMessage, setNewMessage] = useState("");

    const textareaRef = useRef(null);

    useEffect(() => {
        async function fetchDiscussion() {
            if (concern && concern.hasDiscussion) {
                await concern.discussion.fetchMessages();
                const messages = concern.discussion.getMessages();
                setDiscussion({ messages });
            }
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
                sender: userData ? userData.uid : "Student",
                text: newMessage,
                timestamp: new Date().toLocaleString(),
            });

            setDiscussion((prevDiscussion) => ({
                ...prevDiscussion,
                messages: [...prevDiscussion.messages, newMsg],
            }));

            await concern.discussion.sendMessage(newMsg);
            setNewMessage("");

            if (textareaRef.current) {
                textareaRef.current.style.height = "auto"; // Reset height after sending
            }
        }
    };

    const formatDate = (date) => {
        const d = new Date(date);

        const datePart = d.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });

        const timePart = d.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });

        return `${datePart} at ${timePart}`;
    };

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto"; // Reset height to recalculate
            textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on content
        }
    };

    return (
        <div className="border p-4 rounded-md mb-6 mx-14 shadow">
            <h3 className="text-lg font-semibold mt-2 mb-4">Discussion Thread</h3>
            <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>

            <div className="max-h-80 overflow-y-auto mb-4">
                {/* Initial Timestamp and Message */}
                <div className="text-center text-xs text-gray-500 mt-4 mb-5">
                    <p>{formatDate(concernCreatedDate)}</p>
                    <p>30 days of inactivity will automatically close the concern.</p>
                </div>

                {/* Status-Specific Messages */}
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

                {/* Discussion Messages */}
                {discussion?.messages?.map((msg, index) => (
                    <div key={index} className={`mb-3 ${msg.sender === "Admin" ? "text-right" : "text-left"}`}>
                        <div
                            className={`inline-block pr-3 pl-3 p-2.5 rounded-md text-sm space-y-1 ${
                                msg.sender === "Admin" ? "bg-blue-100" : "bg-gray-100"
                            }`}
                        >
                            <p className="text-gray-600 text-xs text-left">
                                <strong>{msg.sender}</strong>
                            </p>
                            <p>{msg.text}</p>
                            <p className="text-xs text-gray-500 text-left">{formatDate(msg.timestamp)}</p>
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
                    placeholder="Send a reply..."
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

export default DiscussionThread;
