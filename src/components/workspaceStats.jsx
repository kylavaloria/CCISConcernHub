import { useState, useEffect } from "react";
import Database from "../services/database";

export function WorkspaceStats({ concernsFilter }) {
    const [metrics, setMetrics] = useState(null);

    useEffect(() => {
        async function fetchMetrics() {
            if (concernsFilter) {
                setMetrics(await Database.aggregateConcernsByStatus(concernsFilter));
            }
        }

        fetchMetrics();
    }, [concernsFilter]);

    // Define status colors
    const statusColors = {
        "Open": "bg-orange-400",
        "In Progress": "bg-green-400",
        "On Hold": "bg-red-400",
        "Resolved": "bg-blue-400",
        "Unresolved": "bg-gray-300",
        "Total Concerns": "bg-gray-600",
    };

    return (
        <div className="rounded-lg p-4 mb-4">
            {/* Metrics Section */}
            <div className="flex justify-between bg-white p-4 rounded-lg shadow-md">
                {Object.keys(statusColors).map((status, index) => {
                    const count = metrics === null ? "--" : metrics[status];
                    return <div
                        key={status}
                        className={`flex items-center space-x-2 p-3 ${index !== 0 ? 'border-l-2 border-gray-300' : ''}`}>
                        <span
                            className={`inline-block w-10 h-10 rounded-full ${statusColors[status] || 'bg-gray-400'}`}
                        ></span>
                        <div>
                            <h3 className="text-sm font-semibold capitalize">{status.replace(/([A-Z])/g, ' $1')}</h3>
                            <p className="text-xl">{count}</p>
                        </div>
                    </div>;
                })}
            </div>
        </div>
    );
}

export default WorkspaceStats;
