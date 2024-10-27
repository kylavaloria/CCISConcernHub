import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/background.jpg';

export function Portal() {
    const navigate = useNavigate();

    // Handlers for button clicks
    const handleStudentClick = () => {
        navigate('/my-concerns');
    };

    const handleAdminClick = () => {
        navigate('/admin-dashboard');
    };

    return (
        <div 
            className="min-h-screen flex flex-col" 
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="backdrop-blur-sm bg-blue-400 bg-opacity-30 flex-grow flex flex-col">
                <Header showNavbar={false} transparent={true} textWhite={true} />

                {/* Title Section */}
                <div className="text-center mt-8">
                    <h1 className="text-4xl font-bold text-white mb-2">CCIS Concern Hub</h1>
                    <p className="text-lg text-white">Your platform for raising concerns</p>
                </div>

                {/* Main Content Area */}
                <div className="flex-grow flex justify-center items-center">
                    <div className="bg-white bg-opacity-20 rounded-3xl p-8 w-80 shadow-3xl min-w-96">
                        <p className="text-4xl font-semibold mb-2 text-white">Welcome</p>
                        <p className="text-lg mb-6 text-white">Choose your destination</p>

                        {/* Buttons for Student and Admin */}
                        <div className="flex flex-col gap-4">
                            <button
                                className="px-6 py-2 bg-blue-400 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-300"
                                onClick={handleStudentClick}
                            >
                                Student
                            </button>
                            <button
                                className="px-6 py-2 bg-blue-400 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-300"
                                onClick={handleAdminClick}
                            >
                                Admin
                            </button>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );
}

export default Portal;


