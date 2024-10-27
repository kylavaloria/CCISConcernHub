import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import ConcernDetails from '../components/concernDetails';
import DiscussionThread from '../components/discussionThread';

export function ViewConcern() {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/my-concerns');
    };

    // Sample concern details (replace with actual data)
    const concern = {
        id: 1,
        title: 'Need help with system access',
        status: 'Open',
        dateSubmitted: '2024-10-01',
        issueType: 'Request',
        category: 'IT Support',
        description: 'I am unable to access my PUP account and need assistance resetting the password.',
        attachments: ['screenshot.png', 'error_message.pdf'],
        studentName: 'Jane Doe',
        studentNumber: '20240001',
    };

    // Sample chat messages (replace with actual discussion data)
    const initialDiscussion = [
        { sender: 'Student', message: 'Can someone help with my issue?', timestamp: '2024-10-02 10:15 AM' },
        { sender: 'Admin', message: 'We are looking into it. Please hold on.', timestamp: '2024-10-02 11:00 AM' },
    ];

    const user = {
        id: 1,
        name: 'John Doe',
        isAdmin: true, // Change this to false to test as a student
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header showNavbar={true} border={true} />
            <main className="p-6 gap-4">
                <div className="flex items-center mb-4 cursor-pointer" onClick={handleBackClick}>
                    <FaArrowLeft className="mr-2 text-blue-400" />
                    <h1 className="text-3xl font-bold mb-4 text-blue-400">View Concern</h1>
                </div>

                {/* Concern Details Section */}
                <ConcernDetails concern={concern} user={user} />

                {/* Discussion Thread Section */}
                <DiscussionThread initialDiscussion={initialDiscussion} />
            </main>
            <Footer />
        </div>
    );
}

export default ViewConcern;

