import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/background2.jpg';

export function LandingPage() {
    const navigate = useNavigate();

    const handleSubmitConcernsClick = () => {
        navigate('/submit-concern');
    };

    return (
        <div 
            className="min-h-screen flex flex-col" 
            style={{ 
                backgroundImage: `url(${backgroundImage})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center' }}
        >
            <div className="backdrop-blur-sm bg-blue-400 bg-opacity-30 flex-grow flex flex-col">
                <Header showNavbar={true} transparent={true} textWhite={true} />

                {/* Main Content Area */}
                <div className="flex-grow flex flex-col items-start justify-center text-center p-4 ml-20">
                    <h1 className="text-4xl font-bold mb-2 text-white">CCIS Concern Hub</h1>
                    <p className="text-lg text-white mb-6">Your platform for raising concerns</p>
                    <button
                        onClick={handleSubmitConcernsClick}
                        className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Submit Concern
                    </button>
                </div>
            </div>

            {/* Footer Component */}
            <Footer />
        </div>
    );
}

export default LandingPage;

