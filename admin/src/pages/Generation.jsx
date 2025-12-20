import React from 'react';

const Generation = () => {

    const sections = [
        {
            id: "homepage-banner",
            title: "Homepage Banner",
            subtitle: "Update the main promotional banner on the user dashboard",
            type: "banner",
        },
        {
            id: "best-bet",
            title: "Best Bet of the Day",
            subtitle: "Highlighted tip shown prominently to all users",
            type: "bestbet",
        },
    ];

    return (
        <section className='banner-content p-5' id='banner-content'>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-xl font-semibold text-gray-900">Banner & Content</h1>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        System Operational
                    </div>

                    <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800">
                        Save All Changes
                    </button>
                </div>
            </div>

            {/* Sections */}
            <div className="space-y-8">
                {sections.map((section) => (
                    <div
                        key={section.id}
                        className="bg-white rounded-xl shadow-sm p-6"
                    >
                        <h2 className="text-lg font-semibold text-gray-900">
                            {section.title}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {section.subtitle}
                        </p>

                        {/* Homepage Banner */}
                        {section.type === "banner" && (
                            <div className="mt-6 space-y-4">
                                {/* Upload Box */}
                                <div className="border-2 border-dashed rounded-xl h-48 flex flex-col items-center justify-center text-gray-500">
                                    <i className="bi bi-cloud-upload text-3xl mb-2"></i>
                                    <p className="text-sm">
                                        <span className="font-medium text-gray-700">
                                            Click to upload
                                        </span>{" "}
                                        or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        JPG, PNG, WEBP files supported
                                    </p>
                                </div>

                                {/* Link */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Banner Link URL
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="https://..."
                                        className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                                    />
                                </div>

                                {/* Preview */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Preview
                                    </label>
                                    <div className="h-28 bg-gray-100 rounded-lg flex items-center justify-center text-sm text-gray-400">
                                        Banner Preview Area
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Best Bet */}
                        {section.type === "bestbet" && (
                            <div className="mt-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g., Saturday Special"
                                        className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        rows="3"
                                        placeholder="Why is this the best bet?"
                                        className="w-full border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gray-900"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Horse Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g., Thunder Bolt"
                                            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Track / Race
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g., Flemington R4"
                                            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Generation;