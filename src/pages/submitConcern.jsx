import { useState } from 'react';
import Footer from '../components/Footer';
import iconImage from '../assets/whats-next.png';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Concern from '../models/concern';
import Database from '../services/database';

export function SubmitConcern({ userData }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        issueType: '',
        category: '',
        subject: '',
        description: '',
        attachment: null,
    });

    const handleBackClick = () => {
        navigate('/landing-page');
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newConcern = new Concern({
                ...formData,
                dateSubmitted: new Date(),
                creatorUid: userData.uid,
                attachmentLinks: [], // Handle file upload
            });

            await Database.setConcern(newConcern);

            navigate('/my-concerns');
        } catch (error) {
            console.error('Error submitting concern:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Main Content Area */}
            <div className="flex flex-row flex-grow bg-white bg-opacity-90 gap-32">
                {/* Left Side: Form */}
                <div className="w-full p-4 max-w-2xl mx-10">
                    <div className="flex items-center mb-4 cursor-pointer" onClick={handleBackClick}>
                        <FaArrowLeft className="mr-2 text-blue-400" />
                        <h2 className="text-2xl font-bold text-blue-400">Submit Concern</h2>
                    </div>
                    <p className="mb-2">Fill up the necessary details below:</p>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="issue-type" className="block mb-1">Type of Issue *</label>
                            <select id="issue-type" name="issueType" required className="border border-blue-300 rounded p-2 w-full" value={formData.issueType} onChange={handleChange}>
                                <option value="">Select Type of Issue</option>
                                <option value="academic">Concern</option>
                                <option value="administrative">Request</option>
                                <option value="financial">Complaint</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="category" className="block mb-1">Category *</label>
                            <select id="category" name="category" required className="border border-blue-300 rounded p-2 w-full" value={formData.category} onChange={handleChange}>
                                <option value="">Select Category</option>
                                <option value="feedback">Laboratory</option>
                                <option value="complaint">Schedule</option>
                                <option value="request">Enrollment</option>
                                <option value="scholarship">Scholarship</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject" className="block mb-1">Subject/Title *</label>
                            <input type="text" id="subject" name="subject" required className="border border-blue-300 rounded p-2 w-full" value={formData.subject} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" className="block mb-1">Description *</label>
                            <textarea id="description" name="description" required className="border border-blue-300 rounded p-2 w-full h-24" value={formData.description} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="attachment" className="block mb-1">Attachment</label>
                            <input type="file" id="attachment" name="attachment" className="border border-blue-300 rounded p-2 w-full" onChange={handleChange} />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600 transition duration-300">Submit</button>
                    </form>
                </div>

                {/* Right Side: Icon and Information */}
                <div className="hidden md:flex sm:w-1/3 flex-col items-center justify-center max-w-2xl">
                    <img src={iconImage} alt="Icon" className="w-32 h-32 mb-4" />
                    <h3 className="text-4xl font-semibold mb-2 text-gray-500">What&apos;s Next?</h3>
                    <p className="text-center text-gray-400">
                        Check My Concerns page for the progress of your concern. A representative from the department will respond to your queries through the Concerns page.
                    </p>
                </div>
            </div>

            {/* Footer Component */}
            <Footer />
        </div>
    );
}

export default SubmitConcern;
