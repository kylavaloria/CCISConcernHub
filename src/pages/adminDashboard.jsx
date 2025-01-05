import { useEffect, useState, useRef, useCallback } from 'react';
import Footer from '../components/footer';
import ConcernList from '../components/concernList';
import DashboardStats from '../components/dashboardStats';
import Database, { Pagination } from '../services/database';

export function AdminDashboard({ userData }) {
    const [concerns, setConcerns] = useState([]);
    const pagination = useRef(new Pagination());

    const fetchUserConcerns = useCallback(async () => {
        if (userData) {
            const userConcerns = await Database.getUserConcerns(userData.uid, pagination.current);

            if (concerns.length === 0) {
                setConcerns(userConcerns);
            } else {
                setConcerns((prevConcerns) => [...prevConcerns, ...userConcerns]);
            }
        }
    }, [userData, concerns]);

    useEffect(() => {
        fetchUserConcerns();
    }, [fetchUserConcerns]);

    // Dummy metrics data
    const metricsData = {
        open: 5,
        inProgress: 3,
        onHold: 2,
        resolved: 10,
        unresolved: 1,
        totalConcerns: 21,
    };

    return (
        <div>
            <main className="container mx-auto p-4">
                <h2 className="text-2xl font-semibold mt-2 text-blue-400">Concern Overview</h2>
                <DashboardStats metrics={metricsData} />
                <h2 className="text-xl font-semibold mt-6 text-blue-400">Manage Concerns</h2>
                <ConcernList concerns={concerns} fetchUserConcerns={fetchUserConcerns} />
            </main>
            <Footer />
        </div>
    );
}

export default AdminDashboard;
