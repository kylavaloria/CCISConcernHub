import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConcernList from '../components/concernList';

export function MyConcerns() {
    const concerns = [
        { id: 1, issueType: 'Technical', category: 'Feedback', subject: 'Issue with Login', status: 'Open', dateSubmitted: '2024-10-24' },
        { id: 2, issueType: 'Academic', category: 'Complaint', subject: 'Grades Issue', status: 'In Progress', dateSubmitted: '2024-10-20' },
        { id: 3, issueType: 'Technical', category: 'Request', subject: 'Update Software', status: 'On Hold', dateSubmitted: '2024-10-18' },
        { id: 4, issueType: 'Academic', category: 'Complaint', subject: 'Missing Credits', status: 'Closed', dateSubmitted: '2024-10-15' },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-grow p-4 mx-14">
                <h2 className="text-3xl font-bold mb-8 text-blue-400">My Concerns</h2>
                <ConcernList concerns={concerns}/>
            </div>
            <Footer />
        </div>
    );
}

export default MyConcerns;
