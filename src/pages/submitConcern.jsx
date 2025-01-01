import { useState } from 'react';
import Footer from '../components/Footer';
import iconImage from '../assets/whats-next.png';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Concern from '../models/concern';
import Database from '../services/database';
import Storage from '../services/storage';

const selectOptions = {
    issueTypes: ["Concern", "Request", "Complaint"],
    categories: ["Enrollment", "Grades", "Laboratory", "Schedule", "Scholarship"],
};

const SelectDropdown = ({ id, name, value, onChange, options, defaultValue }) => (
    <select
        id={id}
        name={name}
        required
        className="border border-blue-300 rounded p-2 w-full"
        value={value}
        onChange={onChange}
    >
        <option value="">Select {defaultValue}</option>
        {options.map(option => (
            <option key={option} value={option}>{option}</option>
        ))}
    </select>
);

const SUBJECT_LIMIT = 50;
const DESCRIPTION_LIMIT = 500;

export function SubmitConcern({ userData }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        issueType: '',
        category: '',
        subject: '',
        description: '',
        attachments: [],
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleBackClick = () => {
        navigate('/landing-page');
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        let newValue = value;

        // Limit the number of characters for subject and description
        if (name === 'subject' && value.length > SUBJECT_LIMIT) {
            newValue = value.slice(0, SUBJECT_LIMIT);
        } else if (name === 'description' && value.length > DESCRIPTION_LIMIT) {
            newValue = value.slice(0, DESCRIPTION_LIMIT);
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? Array.from(files) : newValue,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newConcernId = Database.getNewConcernId();
            const newConcern = new Concern({
                ...formData,
                dateSubmitted: new Date(),
                creatorUid: userData.uid,
                attachmentLinks: [],
                id: newConcernId,
            });

            await Database.setConcern(newConcern, newConcernId);

            // Upload attachments to storage
            await Promise.all(formData.attachments.map(file => Storage.uploadFile(file, `concerns/${newConcern.id}/${file.name}`)));

            navigate('/my-concerns');
        } catch (error) {
            console.error('Error submitting concern:', error);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleModalAttach = () => {
        setFormData((prevData) => {
            const combinedFiles = [...prevData.attachments, ...uploadedFiles.map(file => file.file)];
    
            // Check if the combined files exceed the limit
            if (combinedFiles.length > 5) {
                // Display error message and return the previous state without updating
                setFormData((currentData) => ({
                    ...currentData,
                    errorMessage: "You can only upload a maximum of 5 files."
                }));
                return prevData; // Don't update if limit exceeded
            }
    
            return {
                ...prevData,
                attachments: combinedFiles,
                errorMessage: "", // Clear any previous error messages
            };
        });
    
        // Clear uploaded files in the modal and close it
        setUploadedFiles([]);
        setIsModalOpen(false);
    };
    
    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files || e.dataTransfer.files);
    
        // Check if the number of files exceeds the limit
        if (uploadedFiles.length + files.length > 5) {
            alert("You can only upload a maximum of 5 files.");
            return;
        }
    
        // Map files to an array of file objects
        const updatedFiles = files.map((file) => ({
            file,
            name: file.name,
            size: (file.size / (1024 * 1024)).toFixed(2) + "MB",
        }));
    
        // Update the state by combining previous files with new files, while ensuring no duplicates
        setUploadedFiles(prevFiles => {
            const allFiles = [...prevFiles, ...updatedFiles];
            const uniqueFiles = Array.from(new Set(allFiles.map(f => f.name)))
                .map(name => allFiles.find(f => f.name === name));
            return uniqueFiles;
        });
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
                            <SelectDropdown
                                id="issue-type"
                                name="issueType"
                                value={formData.issueType}
                                onChange={e => handleChange(e)}
                                options={selectOptions.issueTypes}
                                defaultValue="Type of Issue"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category" className="block mb-1">Category *</label>
                            <SelectDropdown
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={e => handleChange(e)}
                                options={selectOptions.categories}
                                defaultValue="Category"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject" className="block mb-1">Subject/Title *</label>
                            <input type="text" id="subject" name="subject" required className="border border-blue-300 rounded p-2 w-full" value={formData.subject} onChange={handleChange} />
                        </div>
                        <small>{SUBJECT_LIMIT - formData.subject.length}/{SUBJECT_LIMIT}</small>
                        <div className="form-group">
                            <label htmlFor="description" className="block mb-1">Description *</label>
                            <textarea id="description" name="description" required className="border border-blue-300 rounded p-2 w-full h-24" value={formData.description} onChange={handleChange} />
                        </div>
                        <small>{DESCRIPTION_LIMIT - formData.description.length}/{DESCRIPTION_LIMIT}</small>
                        <div className="form-group">
                            <label htmlFor="attachments" className="block mb-1">Attachments</label>
                            <input type="file" id="attachments" name="attachments" className="border border-blue-300 rounded p-2 w-full" onChange={handleChange} multiple />
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
