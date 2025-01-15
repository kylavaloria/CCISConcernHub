import { useState, useEffect } from "react";
import Footer from '../components/footer';
import ConcernList from '../components/concernList';
import { ConcernsFilter } from '../services/database';

export default function MyConcerns({ userData }) {
    const [concernsFilter, setConcernsFilter] = useState(null);

    useEffect(() => {
        if (userData) {
            const filter = new ConcernsFilter().creatorIs(userData.uid);
            setConcernsFilter(filter);
        }
    }, [userData]);

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-grow p-4 mx-14">
                <h2 className="text-3xl font-bold mb-8 text-blue-400">My Concerns</h2>
                <ConcernList userData={userData} concernsFilter={concernsFilter} />
            </div>
            <Footer />
        </div>
    );
}
