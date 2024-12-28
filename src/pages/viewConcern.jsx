import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import ConcernDetails from '../components/concernDetails';
import DiscussionThread from '../components/discussionThread';
import Database from '../services/database';

export function ViewConcern() {
    const navigate = useNavigate();
    const { concernId } = useParams();
    const [concern, setConcern] = useState(null);

    useEffect(() => {
        async function fetchConcern() {
            const fetchedConcern = await Database.getConcern(String(concernId));
            setConcern(fetchedConcern);
        }
        fetchConcern();
    }, [concernId]);

    const handleBackClick = () => {
        navigate('/my-concerns');
    };

    if (!concern) {
        return <div>Loading...</div>;
    }

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
            <main className="p-6 gap-4">
                <div className="flex items-center mb-4 cursor-pointer" onClick={handleBackClick}>
                    <FaArrowLeft className="mr-2 text-blue-400" />
                    <h1 className="text-3xl font-bold mb-4 text-blue-400">View Concerns</h1>
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
