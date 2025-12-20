import React from 'react';

const Performance = () => {

    const hitRateData = [
        { date: "Jan 1", value: 125 },
        { date: "Jan 2", value: 70 },
        { date: "Jan 3", value: 150 },
        { date: "Jan 4", value: 135 },
        { date: "Jan 5", value: 160 },
        { date: "Jan 6", value: 185 },
        { date: "Jan 7", value: 145 },
    ]

    const profitabilityData = [
        {
            plan: "WIN",
            values: [1000, 1600, 1100, 2200],
        },
        {
            plan: "QUINELLA",
            values: [1100, 1650, 2200, 500],
        },
        {
            plan: "PICK6",
            values: [2200, 1600, 500, 2200],
        },
    ]

    const filters = [
        { label: "Date Range", value: "Last 7 Days" },
        { label: "Plan Type", value: "All Plans" },
        { label: "Track", value: "All Tracks" },
    ]

    return (
        <section className='performance p-5' id='performance'>

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                    <span>System Operational</span>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-3 justify-between items-center mb-6">

                <h2 className="text-lg font-medium">Performance Stats</h2>

                <div className='flex justify-end gap-2'>
                    {filters.map((item, index) => (
                        <div key={index} className="flex flex-col text-sm gap-2">
                            <span className="text-gray-500">{item.label}</span>
                            <button className="bg-white px-4 py-2 rounded-lg shadow-sm flex items-center gap-2">
                                {item.value}
                                <i className="bi bi-chevron-down"></i>
                            </button>
                        </div>
                    ))}
                </div>

            </div>

            {/* Hit Rate Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                <h3 className="font-semibold mb-4">Hit Rate Over Time (%)</h3>

                {/* Fake Chart */}
                <div className="relative h-56 border-b border-gray-200">
                    <div className="absolute inset-0 flex justify-between items-end">
                        {hitRateData.map((item, index) => (
                            <div key={index} className="flex flex-col items-center w-full">
                                <div
                                    style={{ height: `${item.value}px` }}
                                    className="w-2 rounded-full bg-blue-500"
                                ></div>
                                <span className="text-xs mt-2 text-gray-500">{item.date}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-4 flex justify-center items-center gap-2 text-blue-600 text-sm">
                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                    Hit Rate %
                </div>
            </div>

            {/* Profitability Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold mb-6">Plan Profitability ($)</h3>

                <div className="flex justify-between">
                    {profitabilityData.map((plan, index) => (
                        <div key={index} className="flex flex-col items-center w-full">
                            <div className="flex items-end gap-3 h-48">
                                {plan.values.map((value, i) => (
                                    <div
                                        key={i}
                                        style={{ height: `${value / 11}px` }}
                                        className="w-3 bg-purple-600 rounded-md"
                                    ></div>
                                ))}
                            </div>
                            <span className="mt-4 text-sm font-medium">{plan.plan}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex justify-center items-center gap-2 text-purple-600 text-sm">
                    <span className="w-3 h-3 bg-purple-600 rounded-sm"></span>
                    Profit
                </div>
            </div>

        </section>
    )
}

export default Performance;