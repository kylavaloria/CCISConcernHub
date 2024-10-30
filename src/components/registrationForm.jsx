import React from 'react';

const RegistrationForm = () => {
    return (
        <form className="w-full">
            {/* First Name */}
            <div className="form-group mb-4">
                <label htmlFor="first-name" className="block text-xs font-medium text-gray-500">First Name *</label>
                <input 
                    type="text" 
                    id="first-name" 
                    name="first-name" 
                    required 
                    className="mt-1 block w-full border border-gray-300 
                    rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                />
            </div>

            {/* Middle Name and Last Name */}
            <div className="form-group mb-4 flex justify-between">
                <div className="flex-1 mr-2">
                    <label htmlFor="middle-name" className="block text-xs font-medium text-gray-500">Middle Name</label>
                    <input 
                        type="text" 
                        id="middle-name" 
                        name="middle-name" 
                        className="mt-1 block w-full border border-gray-300 
                        rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                    />
                </div>
                <div className="flex-1">
                    <label htmlFor="last-name" className="block text-xs font-medium text-gray-500">Last Name *</label>
                    <input 
                        type="text" 
                        id="last-name" 
                        name="last-name" 
                        required 
                        className="mt-1 block w-full border border-gray-300 
                        rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                    />
                </div>
            </div>

            {/* Student Number */}
            <div className="form-group mb-4">
                <label htmlFor="student-number" className="block text-xs font-medium text-gray-500">Student Number *</label>
                <input 
                    type="text" 
                    id="student-number" 
                    name="student-number" 
                    required 
                    className="mt-1 block w-full border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500" 
                />
            </div>

            {/* Department */}
            <div className="form-group mb-4">
                <label htmlFor="department" className="block text-xs font-medium text-gray-500">Department *</label>
                <select 
                    id="department" 
                    name="department" 
                    required 
                    className="mt-1 block w-full border border-gray-300 rounded-lg 
                    shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                >
                    <option value="">Select Department</option>
                    <option value="bscs">Bachelor of Science in Computer Science</option>
                    <option value="bsit">Bachelor of Science in Information Technology</option>
                </select>
            </div>

            {/* Submit Button */}
            <button 
                type="submit" 
                className="w-full mt-4 px-4 py-2 bg-blue-500 text-white font-semibold 
                rounded-lg hover:bg-blue-600 transition duration-300"
            >
                Submit
            </button>
        </form>
    );
};

export default RegistrationForm;

