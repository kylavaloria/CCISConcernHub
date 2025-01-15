import Footer from '../components/footer';
import ConcernList from '../components/concernList';
import Database from '../services/database';

export default function MyConcerns({ userData }) {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-grow p-4 mx-14">
                <h2 className="text-3xl font-bold mb-8 text-blue-400">My Concerns</h2>
                <ConcernList userData={userData} fetchConcernsMethod={Database.getUserConcerns} />
            </div>
            <Footer />
        </div>
    );
}
