import React from 'react';
// import { Card } from "../components/ui/StatCard"
// import { Select, select, option, div, input } from "../components/ui/select"

const Perform = () => {
    return (
        <div className="performance" id="performance">
            <div className="mx-auto max-w-7xl space-y-8 px-4">
                {/* Header */}
                <h1 className="text-4xl font-bold">Performance</h1>

                {/* Filters */}
                <div className="grid grid-cols-12 gap-4">

                    <select className="col-span-3 px-4 py-3 bg-white rounded-md border-2 border-white focus:border-blue-600">
                        <option value="30days" className='px-2 py-1'>Select period</option>
                        <option value="30days" className='px-2 py-1'>Last 30 Days</option>
                        <option value="7days" className='px-2 py-1'>Last 7 Days</option>
                        <option value="90days" className='px-2 py-1'>Last 90 Days</option>
                    </select>

                    <select className="col-span-3 px-4 py-3 bg-white rounded-md border-2 border-white focus:border-blue-600">
                        <option className='px-2 py-1' value="all-tips">All Tips</option>
                        <option className='px-2 py-1' value="premium">Premium Tips</option>
                        <option className='px-2 py-1' value="free">Free Tips</option>
                    </select>

                    <select className="col-span-3 px-4 py-3 bg-white rounded-md border-2 border-white focus:border-blue-600">
                        <option className='px-2 py-1' value="all-tracks">Select Tracks</option>
                        <option className='px-2 py-1' value="all-tracks">All Tracks</option>
                        <option className='px-2 py-1' value="domestic">Domestic</option>
                        <option className='px-2 py-1' value="international">International</option>
                    </select>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className=" bg-white rounded-md p-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                            <div className="flex justify-center items-center h-5 w-5 text-blue-600"><i className="bi bi-graph-up-arrow"></i></div>
                        </div>
                        <div className="mt-4">
                            <div className="text-3xl font-bold">62%</div>
                            <div className="mt-1 text-sm text-gray-600">Hit Rate</div>
                        </div>
                    </div>

                    <div className=" bg-white rounded-md p-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                            <div className="flex justify-center items-center h-5 w-5 text-green-600"><i className="bi bi-trophy"></i></div>
                        </div>
                        <div className="mt-4">
                            <div className="text-3xl font-bold">48</div>
                            <div className="mt-1 text-sm text-gray-600">Wins</div>
                        </div>
                    </div>

                    <div className=" bg-white rounded-md p-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                            <div className="flex justify-center items-center h-5 w-5 text-red-600"><i className="bi bi-x-circle"></i></div>
                        </div>
                        <div className="mt-4">
                            <div className="text-3xl font-bold">30</div>
                            <div className="mt-1 text-sm text-gray-600">Losses</div>
                        </div>
                    </div>

                    <div className=" bg-white rounded-md p-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                            <div className="flex justify-center items-center h-5 w-5 text-gray-600"><i className="bi bi-dash-circle"></i></div>
                        </div>
                        <div className="mt-4">
                            <div className="text-3xl font-bold">4</div>
                            <div className="mt-1 text-sm text-gray-600">Scratched</div>
                        </div>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Hit Rate Over Time */}
                    <div className=" bg-white rounded-md p-6">
                        <h2 className="text-lg font-semibold">Hit Rate Over Time</h2>
                        <div className="mt-8 flex items-end justify-between gap-2 h-64">
                            {[
                                { month: "Jan", value: 175, label: "Jan" },
                                { month: "Feb", value: 192, label: "Feb" },
                                { month: "Mar", value: 185, label: "Mar" },
                                { month: "Apr", value: 168, label: "Apr" },
                                { month: "May", value: 158, label: "May" },
                                { month: "Jun", value: 198, label: "Jun" },
                            ].map((item) => (
                                <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
                                    <div className="relative w-10 bg-blue-600 rounded-t-md" style={{ height: `${item.value}px` }}>
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs font-medium text-white">
                                            {item.label}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Win/Loss Distribution */}
                    <div className=" bg-white rounded-md p-6">
                        <h2 className="text-lg font-semibold">Win/Loss Distribution</h2>
                        <div className="mt-8 space-y-6">
                            {/* Progress Bar */}
                            <div className="h-8 w-full overflow-hidden rounded-full flex">
                                <div className="bg-green-500 h-full" style={{ width: "58.5%" }}></div>
                                <div className="bg-red-500 h-full" style={{ width: "36.6%" }}></div>
                                <div className="bg-gray-400 h-full" style={{ width: "4.9%" }}></div>
                            </div>

                            {/* Legend */}
                            <div className="flex flex-wrap gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-green-500" ></div>
                                    <div className="text-sm">
                                        <span className="font-medium">Wins</span>
                                        <span className="ml-1 text-gray-600">(48)</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-red-500" ></div>
                                    <div className="text-sm">
                                        <span className="font-medium">Losses</span>
                                        <span className="ml-1 text-gray-600">(30)</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-gray-400" ></div>
                                    <div className="text-sm">
                                        <span className="font-medium">Scratched</span>
                                        <span className="ml-1 text-gray-600">(4)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Perform;