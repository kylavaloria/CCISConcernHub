import pupLogo from '../assets/pup-logo.png';
import ccisLogo from '../assets/ccis-logo.png';
import ClientUser from '../auth/clientUser';

export default function Header({ userData, isSolid }) {
    const showNavbar = !!userData;
    const textWhite = !isSolid;

    return (
        <header
            className={
                `py-4 px-0 w-full z-50 ` +
                `${!isSolid ? 'bg-transparent absolute' : 'bg-white border-b-4 border-gray-200'} `
            }
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

                            { userData.isAdmin() && <a
                                href="/admin-dashboard"
                                className={`${textWhite ? 'text-white' : 'text-gray-700'} hover:text-gray-900`}
                            >
                                Manage Concerns
                            </a>}
                            <div
                                onClick={() => {
                                    ClientUser.signOut();
                                }}
                                className={`${textWhite ? 'text-white' : 'text-gray-700'} hover:text-gray-900 cursor-pointer`}
                            >
                                Sign Out
                            </div>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}
