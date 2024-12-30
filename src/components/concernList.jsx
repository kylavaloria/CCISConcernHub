import { useState } from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './statusBadge';

const filterOptions = {
    issueTypes: ["All", "Concern", "Request", "Complaint"],
    categories: ["All", "Scholarship", "Enrollment", "Website", "Grades", "Others"],
    statuses: ["All", "Open", "In Progress", "On Hold", "Closed"],
};

const FilterDropdown = ({ value, onChange, options }) => (
    <select
        value={value}
        onChange={onChange}
        className="bg-gray-100 border border-gray-200 rounded w-20"
    >
        {options.map(option => (
            <option key={option} value={option}>{option}</option>
        ))}
    </select>
);

const DatePicker = ({ value, onChange }) => (
    <input
        type="date"
        value={value}
        onChange={onChange}
        className="bg-gray-100 border border-gray-200 rounded w-20"
    />
);

export function ConcernList({ concerns }) {
    const [filters, setFilters] = useState({
        issueType: "All",
        category: "All",
        status: "Open",
        sortBy: "newest",
        startDate: "", // Added state for start date filter
        endDate: "", // Added state for end date filter
    });

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({ ...prev, [filterName]: value }));
    };

    // Filter and sort concerns
    const filteredConcerns = concerns
        .filter(concern => (filters.issueType === "All" || concern.issueType === filters.issueType))
        .filter(concern => (filters.category === "All" || concern.category === filters.category))
        .filter(concern => (filters.status === "All" || concern.status === filters.status))
        .filter(concern => {
            const dateSubmitted = new Date(concern.dateSubmitted);
            const isAfterStartDate = filters.startDate ? dateSubmitted >= new Date(filters.startDate) : true;
            const isBeforeEndDate = filters.endDate ? dateSubmitted <= new Date(filters.endDate) : true;
            return isAfterStartDate && isBeforeEndDate;
        })
        .sort((a, b) => (filters.sortBy === "newest" ? new Date(b.dateSubmitted) - new Date(a.dateSubmitted) : new Date(a.dateSubmitted) - new Date(b.dateSubmitted)));

    return (
        <div className="overflow-x-auto p-4">
            <div className="min-w-full">
                {/* Header with Filters Beside Each Column */}
                <div className="text-gray-600 text-sm flex border-b border-gray-300 pb-2 mb-2">
                    <div className="py-3 px-4 font-bold" style={{ width: '120px' }}>Concern ID</div>
                    <div className="flex-1 font-bold">
                        <div>Type of Issue</div>
                        <FilterDropdown
                            value={filters.issueType}
                            onChange={e => handleFilterChange('issueType', e.target.value)}
                            options={filterOptions.issueTypes}
                        />
                    </div>
                    <div className="flex-1 font-bold">
                        <div>Category</div>
                        <FilterDropdown
                            value={filters.category}
                            onChange={e => handleFilterChange('category', e.target.value)}
                            options={filterOptions.categories}
                        />
                    </div>
                    <div className="flex-1 font-bold">Subject/Title</div>
                    <div className="flex-1 font-bold">
                        <div>Status</div>
                        <FilterDropdown
                            value={filters.status}
                            onChange={e => handleFilterChange('status', e.target.value)}
                            options={filterOptions.statuses}
                        />
                    </div>
                    <div className="flex-1 font-bold">
                        <div>Date Submitted</div>
                        <div className="flex space-x-2">
                            <DatePicker
                                value={filters.startDate}
                                onChange={e => handleFilterChange('startDate', e.target.value)}
                            />
                            <span>to</span>
                            <DatePicker
                                value={filters.endDate}
                                onChange={e => handleFilterChange('endDate', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="py-3 px-2 font-bold" style={{ width: '80px' }}></div>
                </div>

                {/* Concerns List */}
                <div>
                    {filteredConcerns.length > 0 ? (
                        filteredConcerns.map(concern => (
                            <div key={concern.id} className="text-gray-700 border border-gray-300 mb-2 flex">
                                <div className="py-2 px-4" style={{ width: '100px' }}>{concern.id}</div>
                                <div className="py-2 px-4 flex-1">{concern.issueType}</div>
                                <div className="py-2 px-4 flex-1">{concern.category}</div>
                                <div className="py-2 px-4 flex-1">{concern.subject}</div>
                                <div className="py-2 px-4 flex-1">
                                    <StatusBadge status={concern.status} />
                                </div>
                                <div className="py-2 px-4 flex-1">{concern.dateSubmitted.toLocaleDateString()}</div>
                                <div className="py-2 px-2" style={{ width: '80px' }}>
                                    <Link to={`/view-concern/${concern.id}`} className="text-blue-500 hover:text-blue-700">View</Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-4">
                            No concerns available.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ConcernList;
