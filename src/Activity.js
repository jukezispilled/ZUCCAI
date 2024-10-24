import React from 'react';

function Activity() {
    const activities = [
        { name: "zucc", time: "2 hours ago", activity: "acivated zucc protocol" },
        { name: "zachxbt", time: "3 hours ago", activity: "put someone in jail" },
        { name: "yenni", time: "5 hours ago", activity: "asked for the next 100x" },
        { name: "mitch", time: "8 hours ago", activity: "rinsed his copy traders" },
        { name: "ansem", time: "1 day ago", activity: "pumped and dumped a shitter" },
    ];

    return (
        <div className="bg-blue-50 p-6 rounded-lg w-full max-w-xs md:max-w-md mx-auto">
            {/* Header */}
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Activity Monitor</h2>

            {/* Activity List */}
            <div className="space-y-4">
                {activities.map((item, index) => (
                    <ActivityItem
                        key={index}
                        name={item.name}
                        time={item.time}
                        activity={item.activity}
                    />
                ))}
            </div>
        </div>
    );
}

// ActivityItem Component for individual activity entries
function ActivityItem({ name, time, activity }) {
    return (
        <div className="bg-white p-4 rounded flex items-start space-x-3">
            <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">{name}</p>
                <p className="text-sm text-gray-500">{time}</p>
                <p className="text-gray-800">{activity}</p>
            </div>
        </div>
    );
}

export default Activity;