import React from 'react';

export function Footer() {
    return (
        <footer className="bg-[#364658] py-8 text-white">
            <div className="flex items-center mx-9 justify-between text-sm">
                {/* Description Column */}
                <div className="flex-1 pr-4 mb-4">
                    <h2 className="text-2xl font-bold mb-2">
                        CCIS Concern Hub 
                    </h2>
                    <p>is a web-based application and a student concern management
                        system dedicated to the College of Computer and Information Sciences (CCIS) at PUP-Manila.
                    </p>
                </div>

                {/* Separator */}
                <div className="border-2 border-white mx-20 h-24"></div>

                {/* Quick Links Column */}
                <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">Quick Links</h4>
                    <ul className="space-y-2">
                        <li>
                            <a href="https://www.facebook.com/groups/CCIS.PUP" target="_blank" rel="noopener noreferrer" className="text-white underline">
                                CCIS Official Announcement Group
                            </a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com/PUPCCISOfficial" target="_blank" rel="noopener noreferrer" className="text-white underline">
                                CCIS Official Facebook Page
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Disclaimer Column */}
                <div className="flex-1 pl-4">
                    <p className="text-white text-xs italic">
                        <strong>Disclaimer:</strong> This web application is not officially affiliated with the Polytechnic University of the Philippines.
                        Its content and functionalities are created to fulfill course requirements.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
