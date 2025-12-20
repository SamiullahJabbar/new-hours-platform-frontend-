import React from 'react';

const UploadResult = () => {

    const infoFields = [
        {
            label: "Race Date",
            value: "2025-01-12",
            icon: "bi-calendar",
            note: "Date auto-detected from file name if possible.",
        },
    ];

    const cards = [
        {
            id: 1,
            title: "Import Configuration",
            type: "import",
        },
        {
            id: 2,
            title: "Result Preview",
            subtitle: "Upload a file to see preview",
            type: "preview",
        },
    ];

    return (
        <section className='upload-result p-5' id='upload-result'>

            {/* Header */}
            <div className="flex justify-between items-center mb-6 px-2">
                <h1 className="text-2xl font-semibold">Upload Result</h1>
            </div>

            <div className="w-full flex flex-col lg:flex-row gap-6">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className="bg-white rounded-xl shadow-sm border w-full lg:w-1/2 p-6"
                    >
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {card.title}
                            </h3>
                            {card.subtitle && (
                                <p className="text-sm text-gray-500 mt-1">
                                    {card.subtitle}
                                </p>
                            )}
                        </div>

                        {/* Import Configuration Card */}
                        {card.type === "import" && (
                            <>
                                {/* Upload Box */}
                                <div className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center text-gray-500 hover:border-green-500 transition">
                                    <i className="bi bi-cloud-arrow-up text-4xl mb-3"></i>
                                    <p className="font-medium">
                                        Click to upload <span className="text-gray-400">or drag and drop</span>
                                    </p>
                                    <p className="text-xs mt-1">CSV, JSON files supported</p>
                                </div>

                                {/* Info Fields */}
                                <div className="mt-6 space-y-4">
                                    {infoFields.map((field, idx) => (
                                        <div key={idx}>
                                            <label className="text-sm text-gray-600 block mb-1">
                                                {field.label}
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={field.value}
                                                    readOnly
                                                    className="w-full border rounded-lg px-4 py-2 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                                />
                                                <i
                                                    className={`bi ${field.icon} absolute right-3 top-1/2 -translate-y-1/2 text-gray-400`}
                                                ></i>
                                            </div>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {field.note}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Button */}
                                <button className="mt-6 w-full bg-gray-400 text-white py-3 rounded-lg font-semibold cursor-not-allowed">
                                    Process &amp; Upload Tips
                                </button>
                            </>
                        )}

                        {/* File Preview Card */}
                        {card.type === "preview" && (
                            <div className="border rounded-xl h-[320px] flex items-center justify-center text-gray-400">
                                <div className="text-center">
                                    <i className="bi bi-file-earmark text-4xl mb-2"></i>
                                    <p>No file selected</p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default UploadResult;