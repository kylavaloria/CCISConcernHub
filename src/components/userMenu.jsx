import React, { useState } from 'react';
import { FaCog, FaSignOutAlt } from 'react-icons/fa';
import { GoTriangleDown } from "react-icons/go";

export function UserMenu({ textWhite }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="relative">
            {/* Student Name Button with Icon */}
            <button 
                onClick={toggleDropdown}
                className={`flex items-center font-semibold hover:text-gray-900 ${textWhite ? 'text-white' : 'text-gray-700'}`}
            >
                John Doe {/* Replace with actual student's name */}
                <GoTriangleDown className="ml-2" /> {/* User icon */}
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                    <ul>
                        {/* Account Settings with Icon */}
                        <li>
                            <a 
                                href="/account-settings" 
                                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                <FaCog className="mr-2" /> {/* Settings icon */}
                                Account Settings
                            </a>
                        </li>
                        {/* Logout with Icon */}
                        <li>
                            <button 
                                onClick={() => alert('Logging out...')} 
                                className="w-full text-left flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                <FaSignOutAlt className="mr-2" /> {/* Logout icon */}
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default UserMenu;
