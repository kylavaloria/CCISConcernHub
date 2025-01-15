import { useState, useEffect } from "react";
import Footer from '../components/footer';
import ConcernList from '../components/concernList';
import WorkspaceStats from '../components/workspaceStats';
import { ConcernsFilter } from '../services/database';

export default function AdminWorkspace({ userData }) {
    const [concernsFilter, setConcernsFilter] = useState(null);

    useEffect(() => {
        if (userData) {
            const filter = new ConcernsFilter().categoryIn(userData.assignedCategories);
            setConcernsFilter(filter);
        }
    }, [userData]);

    return (
        <div>
            <main className="container mx-auto p-4">
                <h2 className="text-2xl font-semibold mt-2 text-blue-400">Concern Overview</h2>
                <WorkspaceStats concernsFilter={concernsFilter} />
                <h2 className="text-xl font-semibold mt-6 text-blue-400">Manage Concerns</h2>
                <ConcernList userData={userData} concernsFilter={concernsFilter} />
            </main>
            <Footer />
        </div>
    );
}
