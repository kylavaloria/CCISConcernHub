import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export function AccountSettings({ user }) {
    const isStudent = user.role === 'student';

    return (
        <div className="min-h-screen flex flex-col">
            {/* Main Content */}
            <div className="flex-grow container mx-auto py-8">
                <h1 className="text-3xl font-semibold text-blue-700 mb-2">Account Settings</h1>
                <h2 className="text-lg mb-4">User Profile</h2>

                {/* User Profile Container */}
                <div>
                    {/* Display Username */}
                    <h1 className="text-4xl font-semibold text-gray-700 mb-4">{user.username}</h1>

                    <div className="bg-white p-6 shadow-md rounded-md mx-auto border">
                        <div className="flex gap-4">
                            {/* Display for Students */}
                            {isStudent && (
                                <>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700">Department</label>
                                        <p className="mt-1 text-gray-900">Department of Computer Science</p>
                                    </div>

                                    {/* Separator */}
                                    <div className="hidden md:block w-px bg-gray-400 mx-4"></div>

                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700">Student Number</label>
                                        <p className="mt-1 text-gray-900">2022-XXXXX-MN-X</p>
                                    </div>
                                </>
                            )}

                            {/* Display for Admins */}
                            {!isStudent && (
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700">Assigned Categories</label>
                                    <p className="mt-1 text-gray-900">{user.assignedCategories.join(', ')}</p>
                                </div>
                            )}

                            {/* Separator */}
                            <div className="hidden md:block w-px bg-gray-400 mx-4"></div>

                            {/* Email Address */}
                            <div className="flex-1 md:ml-4">
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <p className="mt-1 text-gray-900">{user.email}</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Edit Information Button */}
                <div className="mt-6">
                    <Link to="/edit-user-profile">
                        <button className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                            Edit Information
                        </button>
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default AccountSettings;
