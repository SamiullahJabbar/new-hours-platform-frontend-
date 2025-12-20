import React from 'react';

const Dashboard = () => {

    const stats = [
        {
            title: "Active Subscribers",
            value: "1,248",
            change: "+12% from last week",
            icon: "bi-people",
            color: "text-blue-500",
        },
        {
            title: "Plan Distribution",
            value: "Win:450",
            sub: "Quinella: 320 | Pick6: 478",
            icon: "bi-bullseye",
            color: "text-purple-500",
        },
        {
            title: "Today's Hit Rate",
            value: "68%",
            change: "+5% from last week",
            icon: "bi-graph-up-arrow",
            color: "text-green-500",
        },
    ];

    const tips = [
        { track: "Flemington", race: "R3", horse: "Thunder Bolt", type: "WIN" },
        { track: "Randwick", race: "R5", horse: "Golden Girl", type: "QUINELLA" },
        { track: "Eagle Farm", race: "R1", horse: "Fast Lane", type: "WIN" },
        { track: "Doomben", race: "R8", horse: "Lucky Star", type: "PICK6" },
        { track: "Caulfield", race: "R2", horse: "Midnight Run", type: "WIN" },
    ];

    const activities = [
        {
            text: "Tips uploaded for 03/12",
            time: "2 hours ago",
            color: "bg-green-500",
        },
        {
            text: "Results updated for 02/12",
            time: "5 hours ago",
            color: "bg-green-500",
        },
        {
            text: "3 errors detected in results import",
            time: "Yesterday",
            color: "bg-red-500",
        },
        {
            text: "New banner image updated",
            time: "Yesterday",
            color: "bg-blue-500",
        },
    ];

    return (
        <section className='admin-dashboard' id='admin-dashboard'>
            <div className="flex-1 p-6 min-h-screen">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
                    <div className="flex items-center gap-2 text-sm text-green-600">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        System Operational
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {stats.map((item, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-xl p-5 shadow flex justify-between items-center"
                        >
                            <div>
                                <p className="text-sm text-gray-500">{item.title}</p>
                                <h2 className="text-2xl font-bold">{item.value}</h2>
                                {item.sub && (
                                    <p className="text-xs text-gray-400 mt-1">{item.sub}</p>
                                )}
                                {item.change && (
                                    <p className="text-xs text-green-600 mt-1">
                                        {item.change}
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 ${item.color}`}
                            >
                                <i className={`bi ${item.icon} text-xl`}></i>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Upload Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {[
                        {
                            title: "Upload Tips",
                            desc: "Import daily racing tips via CSV/JSON",
                            icon: "bi-upload",
                            color: "text-blue-500",
                        },
                        {
                            title: "Upload Result",
                            desc: "Update race outcomes and grading",
                            icon: "bi-check-circle",
                            color: "text-purple-500",
                        },
                    ].map((card, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-xl p-5 shadow flex items-center justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className={`w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center ${card.color}`}
                                >
                                    <i className={`bi ${card.icon} text-2xl`}></i>
                                </div>
                                <div>
                                    <h3 className="font-semibold">{card.title}</h3>
                                    <p className="text-sm text-gray-500">{card.desc}</p>
                                </div>
                            </div>
                            <button className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
                                <i className="bi bi-arrow-right"></i>
                            </button>
                        </div>
                    ))}
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Tips Snapshot */}
                    <div className="bg-white rounded-xl p-5 shadow">
                        <div className="flex justify-between mb-4">
                            <h3 className="font-semibold">Today's Tips Snapshot</h3>
                            <button className="text-sm text-blue-500">View All</button>
                        </div>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-gray-400 border-b">
                                    <th className="text-left py-2">Track</th>
                                    <th>Race</th>
                                    <th>Horse</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tips.map((tip, i) => (
                                    <tr key={i} className="border-b last:border-0">
                                        <td className="py-2">{tip.track}</td>
                                        <td className="text-center">{tip.race}</td>
                                        <td className="text-center">{tip.horse}</td>
                                        <td className="text-center">
                                            <span className="px-2 py-1 text-xs rounded-full bg-gray-100">
                                                {tip.type}
                                            </span>
                                        </td>
                                        <td className="text-center text-orange-500 text-xs">
                                            <i className="bi bi-lightning-charge-fill mr-1"></i>
                                            Pending
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-xl p-5 shadow">
                        <h3 className="font-semibold mb-4">Recent Activity</h3>
                        <ul className="space-y-4">
                            {activities.map((act, i) => (
                                <li key={i} className="flex gap-3">
                                    <span
                                        className={`w-2.5 h-2.5 rounded-full mt-1 ${act.color}`}
                                    ></span>
                                    <div>
                                        <p className="text-sm">{act.text}</p>
                                        <p className="text-xs text-gray-400">{act.time}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Dashboard;