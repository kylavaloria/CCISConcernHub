import { useState } from 'react';
import StatusBadge from './statusBadge';
import { FaPaperclip } from 'react-icons/fa';

const ConcernDetails = ({ concern, concernCreator, userData }) => {
    // Initialize state with the current concern status
    const [status, setStatus] = useState(concern.status);

    // Function to handle status change
    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    return (
        <div className="flex flex-col mx-14 gap-4">
            <h2 className="text-3xl font-semibold">{concern.subject}</h2>
            <div className="flex justify-start gap-8">
                <div className="text-gray-600 flex items-center gap-2">
                    Concern ID <strong>#{concern.id}</strong>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-gray-600">Status:</span>
                    {userData?.isAdmin() ? (
                        <select
                            value={status}
                            onChange={handleStatusChange}
                            className="border rounded p-1"
                        >
                            <option value="open">Open</option>
                            <option value="in-progress">In Progress</option>
                            <option value="on-hold">On Hold</option>
                            <option value="closed">Closed</option>
                        </select>
                    ) : (
                        <StatusBadge status={status} />
                    )}
                </div>
            </div>

            {/* Additional Info for Admins */}
            {userData?.isAdmin() && (
                <div className="text-gray-600 flex justify-start gap-8">
                    <div>
                        <div>Student Name </div>
                        <div className='text-lg font-semibold'>{concernCreator?.displayName}</div>
                    </div>
                </div>
            )}

            <div className="flex border p-4 rounded-md shadow">
                <div className="flex-1 border-gray-300 pl-4">
                    <p className='text-gray-400'>Date Submitted</p>
                    <div>{concern.dateSubmitted.toLocaleDateString()}</div>
                </div>
                <div className="flex-1 border-l-2 border-gray-300 pl-4">
                    <p className='text-gray-400'>Type of Issue</p>
                    <div>{concern.issueType}</div>
                </div>
                <div className="flex-1 border-l-2 border-gray-300 pl-4">
                    <p className='text-gray-400'>Category</p>
                    <div>{concern.category}</div>
                </div>
                <div className="flex-1 border-l-2 border-gray-300 pl-4">
                    <p className='text-gray-400'>Description</p>
                    <div>{concern.description}</div>
                </div>
            </div>

            {/* Attachments */}
            <div className="mb-6">
                <h3 className="text-gray-600 mb-2">Attachments</h3>
                {concern.attachmentLinks.length > 0 ? (
                    <div className="flex gap-4 flex-wrap">
                        {concern.attachmentLinks.map((attachment, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 p-2 border rounded-2xl bg-gray-50 shadow-sm"
                            >
                                <FaPaperclip className="text-gray-500" />
                                <a
                                    href={`/path/to/${attachment}`}
                                    className="text-gray-500 hover:underline"
                                    download
                                >
                                    {attachment}
                                </a>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No attachments available.</p>
                )}
            </div>

            {/* Mark as Resolved */}
            {userData?.isAdmin() && (
                <div className="mt-2 mb-10">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        Mark as Resolved
                    </button>
                </div>
            )}
        </div>
    );
};

export default ConcernDetails;
