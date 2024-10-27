import React from 'react';

const StatusBadge = ({ status }) => {
    const getStatusStyle = (status) => {
        switch (status.toLowerCase()) {
            case 'open':
                return 'bg-orange-400';
            case 'in progress':
                return 'bg-green-400';
            case 'on hold':
                return 'bg-red-400';
            case 'closed':
                return 'bg-blue-400';
            default:
                return 'bg-gray-400'; 
        }
    };

    const getCircleStyle = (status) => {
        switch (status.toLowerCase()) {
            case 'open':
                return 'bg-orange-300'; 
            case 'in progress':
                return 'bg-green-300';
            case 'on hold':
                return 'bg-red-300';
            case 'closed':
                return 'bg-blue-300';
            default:
                return 'bg-gray-300';
        }
    };

    return (
        <span className={`flex items-center max-w-fit text-white py-1 px-3 rounded-xl ${getStatusStyle(status)}`}>
            {/* Circle */}
            <div className={`w-3 h-3 rounded-full mr-2 ${getCircleStyle(status)}`}></div>
            {/* Status text */}
            {status}
        </span>
    );
};

export default StatusBadge;



