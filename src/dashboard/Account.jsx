
import React from 'react';

const Account = () => {
    return (
        <div className="flex-1 min-h-screen p-5">
            <h1 className="text-4xl font-bold mb-6">Account</h1>

            {/* Current Plan Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Current Plan</p>
                        <h2 className="text-xl font-bold mb-1">PICK 6</h2>
                        <p className="text-sm text-gray-500">
                            Renewal on <span className="font-medium text-gray-700">Feb 28, 2025</span>
                        </p>
                    </div>

                    <span className="bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
                        Active
                    </span>
                </div>

                <div className="mt-6">
                    <p className="text-sm font-medium mb-3">Plan includes:</p>
                    <ul className="space-y-2 text-sm text-gray-600">
                        {[
                            "All WIN tips",
                            "All QUINELLA tips",
                            "All PICK 6 tips",
                            "Performance analytics",
                            "Full archive access",
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <i className="bi bi-check-circle-fill text-green-500"></i>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Manage Billing */}
            <div className="bg-white rounded-xl p-5 shadow-sm mb-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <i className="bi bi-credit-card text-blue-600 text-lg"></i>
                </div>
                <div>
                    <p className="font-medium">Manage Billing</p>
                    <p className="text-sm text-gray-500">
                        Update payment method, view invoices
                    </p>
                </div>
            </div>

            {/* Language */}
            <div className="bg-white rounded-xl p-5 shadow-sm mb-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                        <i className="bi bi-globe text-purple-600 text-lg"></i>
                    </div>
                    <div>
                        <p className="font-medium">Language</p>
                        <p className="text-sm text-gray-500">
                            Choose your preferred language
                        </p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm rounded-lg bg-gray-900 text-white">
                        EN
                    </button>
                    <button className="px-3 py-1 text-sm rounded-lg bg-gray-100 text-gray-700">
                        TR
                    </button>
                </div>
            </div>

            {/* Logout */}
            <div className="bg-white rounded-xl p-5 shadow-sm flex items-center gap-4 cursor-pointer hover:bg-red-50 transition">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                    <i className="bi bi-box-arrow-right text-red-600 text-lg"></i>
                </div>
                <div>
                    <p className="font-medium text-red-600">Logout</p>
                    <p className="text-sm text-gray-500">
                        Sign out of your account
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Account;