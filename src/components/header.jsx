import React from 'react';
import UserMenu from './userMenu';
import pupLogo from '../assets/pup-logo.png';
import ccisLogo from '../assets/ccis-logo.png';

export function Header({ showNavbar, transparent, textWhite, border }) {
    return (
        <header 
            className={`py-4 px-0 ${transparent ? 'bg-transparent' : 'bg-white'} ${border ? 'border-b-4 border-gray-200' : ''}`}
        >
            <div className="flex items-center mx-9 justify-between">
                {/* Logos and University Info */}
                <div className="flex items-center">
                    <img 
                        src={pupLogo} 
                        alt="PUP Logo" 
                        className="w-16 h-16 mr-3" 
                    />
                    <img 
                        src={ccisLogo}
                        alt="CCIS Logo" 
                        className="w-16 h-16 mr-4" 
                    />
                    <div className="text-left">
                        <div className={`text-sm ${textWhite ? 'text-white' : 'text-gray-700'}`}>
                            Polytechnic University of the Philippines
                        </div>
                        <div className={`text-sm ${textWhite ? 'text-white' : 'text-gray-700'}`}>
                            College of Computer and Information Sciences
                        </div>
                        <div className={`text-xl font-bold ${textWhite ? 'text-white' : 'text-gray-800'}`}>
                            CCIS Concern Hub
                        </div>
                    </div>
                </div>

                {/* Conditionally Render Navbar */}
                {showNavbar && (
                    <nav className="flex mr-8">
                        <div className="flex space-x-14">
                            <a 
                                href="/submit-concern" 
                                className={`${textWhite ? 'text-white' : 'text-gray-700'} hover:text-gray-900`}
                            >
                                Submit Concern
                            </a>
                            <a 
                                href="/my-concerns" 
                                className={`${textWhite ? 'text-white' : 'text-gray-700'} hover:text-gray-900`}
                            >
                                My Concerns
                            </a>
                            <div className={`${textWhite ? 'text-white' : 'text-gray-700'} font-semibold ml-6`}>
                                <UserMenu textWhite={textWhite} />
                             </div>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}

export default Header;
