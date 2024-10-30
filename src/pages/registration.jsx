import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RegistrationForm from '../components/registrationForm';
import backgroundImage from '../assets/background.jpg';

export function Registration() {
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

                {/* Registration Content Area */}
                <div className="flex-grow flex items-center justify-center">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-3xl mb-8">
                        <h2 className="text-3xl font-semibold text-blue-500 mb-2 ">Create an Account</h2>
                        <p className="text-md mb-6">Fill up the necessary details below:</p>
                        <RegistrationForm />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Registration;


