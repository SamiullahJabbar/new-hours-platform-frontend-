import React from 'react';

const Members = () => {

    const stats = [
        {
            title: "Win Plan",
            users: 450,
            color: "text-blue-600",
            bg: "bg-blue-50",
            icon: "bi-people"
        },
        {
            title: "Quinella Plan",
            users: 320,
            color: "text-orange-500",
            bg: "bg-orange-50",
            icon: "bi-people"
        },
        {
            title: "Pick 6 Plan",
            users: 478,
            color: "text-purple-600",
            bg: "bg-purple-50",
            icon: "bi-people"
        }
    ]

    const members = [
        {
            email: "john.doe@example.com",
            plan: "WIN",
            planColor: "bg-blue-100 text-blue-600",
            date: "2024-12-01",
            status: "Active",
            statusColor: "text-green-600"
        },
        {
            email: "sarah.smith@example.com",
            plan: "PICK6",
            planColor: "bg-purple-100 text-purple-600",
            date: "2024-12-01",
            status: "Active",
            statusColor: "text-green-600"
        },
        {
            email: "mike.jones@example.com",
            plan: "QUINELLA",
            planColor: "bg-orange-100 text-orange-600",
            date: "2024-12-01",
            status: "Expired",
            statusColor: "text-red-500"
        },
        {
            email: "emma.wilson@example.com",
            plan: "WIN",
            planColor: "bg-blue-100 text-blue-600",
            date: "2024-12-01",
            status: "Active",
            statusColor: "text-green-600"
        },
        {
            email: "david.brown@example.com",
            plan: "PICK6",
            planColor: "bg-purple-100 text-purple-600",
            date: "2024-12-01",
            status: "Active",
            statusColor: "text-green-600"
        }
    ]

    return (
        <section className='members p-5' id='members'>

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
                    <p className="text-gray-500 mt-1">Members Statics</p>
                </div>
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                        <span>System Operational</span>
                    </div>
                    <button className='inline-block px-5 py-2 font-medium bg-white transition-colors hover:bg-gray-50 text-black rounded-md' type="button"><i className="bi bi-download"></i> Export CV</button>
                </div>
            </div>

            {/* Member Statistics */}
            <h2 className="text-lg font-semibold mb-4">Member Statistics</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((item, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm flex justify-between items-center">
                        <div>
                            <p className={`${item.color} font-medium`}>{item.title}</p>
                            <h3 className="text-3xl font-bold mt-2">{item.users}</h3>
                            <p className="text-sm text-gray-500">Users</p>
                        </div>

                        <div className={`${item.bg} p-3 rounded-lg`}>
                            <i className={`${item.icon} text-xl ${item.color}`}></i>
                        </div>
                    </div>
                ))}
            </div>

            {/* Member List */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold mb-4">Member List</h3>

                {/* Search */}
                <div className="relative mb-4">
                    <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input type="text" placeholder="Search by email..."
                        className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500" />
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-gray-500 border-b">
                                <th className="py-3">Email Address</th>
                                <th>Current Plan</th>
                                <th>Sign Up Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {members.map((member, index) => (
                                <tr key={index} className="border-b last:border-none">
                                    <td className="py-4">{member.email}</td>

                                    <td>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${member.planColor}`}>
                                            {member.plan}
                                        </span>
                                    </td>

                                    <td>{member.date}</td>

                                    <td className={member.statusColor}>{member.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </section>
    )
}

export default Members;