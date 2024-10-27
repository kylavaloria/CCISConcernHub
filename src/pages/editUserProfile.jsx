import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export function EditUserProfile({ user }) {
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [department, setDepartment] = useState(user?.department || '');

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/account-settings');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic (e.g., API call to update user profile)
        console.log('Profile updated:', { firstName, middleName, lastName, department });
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <Header showNavbar={true} border={true} />

            {/* Main Content */}
            <div className="flex items-center mb-4 cursor-pointer ml-8 mt-4 mx-auto" onClick={handleBackClick}>
                <FaArrowLeft className="mr-2 text-blue-700" />
                <h1 className="text-3xl font-semibold text-blue-700">Account Settings</h1>
            </div>
            
            <h2 className="text-lg ml-16 mb-4">User Profile</h2>

            <div className="flex justify-start ml-20 my-4">
                <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                        <label htmlFor="first-name" className="block text-gray-700 text-xs">First Name *</label>
                        <input
                            type="text"
                            id="first-name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="border rounded w-full p-2 text-sm"
                            required
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="middle-name" className="block text-gray-700 text-xs">Middle Name *</label>
                        <input
                            type="text"
                            id="middle-name"
                            value={middleName}
                            onChange={(e) => setMiddleName(e.target.value)}
                            className="border rounded w-full p-2 text-sm"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="last-name" className="block text-gray-700 text-xs">Last Name *</label>
                        <input
                            type="text"
                            id="last-name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="border rounded w-full p-2 text-sm"
                            required
                        />
                    </div>
                    {user.role === 'student' && (
                        <div className="form-group mb-8">
                            <label htmlFor="department" className="block text-gray-700 text-xs">Department *</label>
                            <select
                                id="department"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                className="border rounded w-full p-2 text-xs"
                                required
                            >
                                <option value="">Select Department</option>
                                <option value="computer-science">Department of Computer Science</option>
                                <option value="information-technology">Department of Information Technology</option>
                            </select>
                        </div>
                    )}
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                        Save Changes
                    </button>
                </form>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default EditUserProfile;
