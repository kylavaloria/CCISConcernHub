import { useEffect, useState } from 'react';
import Footer from '../components/footer';
import ConcernList from '../components/concernList';
import Database, { Pagination } from '../services/database';
import LoadingSpinner from '../components/loading';

export function MyConcerns({ userData }) {
    const [concerns, setConcerns] = useState(undefined);
    const pagination = new Pagination();

    async function fetchUserConcerns() {
        if (userData) {
            const userConcerns = await Database.getUserConcerns(userData.uid, pagination);
            setConcerns(userConcerns);
        }
    }

    useEffect(() => {
        fetchUserConcerns();
    }, [userData]);

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-grow p-4 mx-14">
                <h2 className="text-3xl font-bold mb-8 text-blue-400">My Concerns</h2>
                {
                    concerns === undefined ? <LoadingSpinner /> :
                    <ConcernList concerns={concerns}/>
                }
            </div>
            <Footer />
        </div>
    );
}

export default MyConcerns;
