import Footer from '../components/footer';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackArrow from '../components/backArrow';
import ConcernDetails from '../components/concernDetails';
import DiscussionThread from '../components/discussionThread';
import Database from '../services/database';
import LoadingSpinner from '../components/loading';

export function ViewConcern({ userData }) {
    const { concernId } = useParams();
    const [concern, setConcern] = useState(null);
    const [concernCreator, setConcernCreator] = useState(null);
    const [status, setStatus] = useState('');

    useEffect(() => {
        async function fetchConcern() {
            const fetchedConcern = await Database.getConcern(String(concernId));
            setConcern(fetchedConcern);
            setConcernCreator(await fetchedConcern.fetchCreator(userData));
            setStatus(fetchedConcern.status);
        }
        fetchConcern();
    }, [concernId, userData]);

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <main className="p-6 gap-4">
                <BackArrow label='Back'/>
                {
                    concern === null ? <LoadingSpinner /> : <>
                        <ConcernDetails
                            concern={concern}
                            concernCreator={concernCreator}
                            userData={userData}
                            status={status}
                            setStatus={setStatus}
                            onStatusChange={handleStatusChange}
                        />

                        <DiscussionThread
                            userData={userData}
                            concern={concern}
                            status={status}
                        />
                    </>
                }
            </main>
            <Footer />
        </div>
    );
}

export default ViewConcern;
