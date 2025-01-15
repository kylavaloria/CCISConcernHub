import Footer from '../components/footer';
import ConcernList from '../components/concernList';
import WorkspaceStats from '../components/workspaceStats';
import Database from '../services/database';

export default function AdminWorkspace({ userData }) {
    return (
        <div>
            <main className="container mx-auto p-4">
                <h2 className="text-2xl font-semibold mt-2 text-blue-400">Concern Overview</h2>
                <WorkspaceStats fetchConcernsMethod={Database.getCategoryConcerns} />
                <h2 className="text-xl font-semibold mt-6 text-blue-400">Manage Concerns</h2>
                <ConcernList userData={userData} fetchConcernsMethod={Database.getCategoryConcerns} />
            </main>
            <Footer />
        </div>
    );
}
