import React from 'react';

const ManageResult = () => {

    const results = [
        {
            id: 1,
            date: "2025-01-11",
            track: "Flemington",
            race: "R1",
            horse: "Thunder Bolt",
            result: "WIN",
            payout: "$4.20",
        },
        {
            id: 2,
            date: "2025-01-11",
            track: "Flemington",
            race: "R2",
            horse: "Golden Girl",
            result: "LOSE",
            payout: "0.0",
        },
        {
            id: 3,
            date: "2025-01-11",
            track: "Randwick",
            race: "R1",
            horse: "Fast Lane",
            result: "WIN",
            payout: "$2.10",
        },
        {
            id: 4,
            date: "2025-01-11",
            track: "Randwick",
            race: "R4",
            horse: "Lucky Star",
            result: "SCRATCHED",
            payout: "REFUND",
        },
    ];

    const badgeColor = (status) => {
        switch (status) {
            case "WIN":
                return "text-green-600";
            case "LOSE":
                return "text-red-500";
            case "SCRATCHED":
                return "text-orange-500";
            default:
                return "text-gray-500";
        }
    };

    return (
        <section className='manage-result p-5' id='manage-result'>

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
                    <p className="text-gray-500 mt-1">Manage Results</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                    System Operational
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center flex-wrap md:flex-nowrap md:justify-end gap-3 mb-5">

                <div className="flex items-center justify-between bg-white rounded-lg px-4 py-2 w-full md:w-1/5 shadow-sm border">
                    <input type="text" defaultValue="2025-01-12" className="block outline-none text-sm text-gray-600" />
                    <i className="bi bi-calendar inline-block mr-3 text-gray-400"></i>
                </div>

                <select className="block bg-white rounded-lg px-4 py-2 w-full md:w-1/5 shadow-sm border text-sm text-gray-600 outline-none">
                    <option className='px-2'>All Tracks</option>
                </select>

                <select className="block bg-white rounded-lg px-4 py-2 w-full md:w-1/5 shadow-sm border text-sm text-gray-600 outline-none">
                    <option className='px-2'>All Types</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="bg-blue-50 px-6 py-3">
                    <div className="grid grid-cols-7 text-sm font-medium text-gray-700">
                        <div>Date</div>
                        <div>Track</div>
                        <div>Race</div>
                        <div>Horse</div>
                        <div>Result</div>
                        <div>Payout</div>
                        <div className="text-center">Actions</div>
                    </div>
                </div>

                <div className="divide-y">
                    {results.map((item) => (
                        <div
                            key={item.id}
                            className="grid grid-cols-7 items-center px-6 py-4 text-sm text-gray-700 hover:bg-gray-50"
                        >
                            <div>{item.date}</div>
                            <div>{item.track}</div>
                            <div>{item.race}</div>
                            <div>{item.horse}</div>
                            <div className={`font-semibold ${badgeColor(item.result)}`}>
                                {item.result}
                            </div>
                            <div>{item.payout}</div>
                            <div className="text-center">
                                <button className="text-gray-500 hover:text-gray-800">
                                    <i className="bi bi-pencil-square text-lg"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    )
}

export default ManageResult;