import React, { useState, useEffect } from 'react';
import { resultsAPI } from '../api/client';

const Archive = () => {
    const [archiveData, setArchiveData] = useState([]);
    const [filters, setFilters] = useState({
        tipType: '',
        region: '',
        page: 1,
        limit: 20,
    });
    const [pagination, setPagination] = useState({
        page: 1,
        totalPages: 1,
        total: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchArchive();
    }, [filters]);

    const fetchArchive = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await resultsAPI.getResults();

            // Backend returns array of results directly
            setArchiveData(response || []);
        } catch (err) {
            setError('Failed to load archive. Please try again.');
            console.error('Error fetching archive:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (filterName, value) => {
        setFilters({
            ...filters,
            [filterName]: value,
            page: 1, // Reset to first page when filter changes
        });
    };

    const handlePageChange = (newPage) => {
        setFilters({
            ...filters,
            page: newPage,
        });
    };

    const calculateHitRate = (wins, total) => {
        if (total === 0) return 0;
        return ((wins / total) * 100).toFixed(1);
    };

    return (
        <div className="archive" id="archive">
            <div className="mx-auto max-w-7xl space-y-8 px-4">
                <h1 className="text-4xl font-bold">Archive</h1>

                <div className="grid grid-cols-12 gap-4">

                    <select
                        className="col-span-3 px-4 py-3 bg-white rounded-md border-2 border-white focus:border-blue-400"
                        value={filters.tipType}
                        onChange={(e) => handleFilterChange('tipType', e.target.value)}
                    >
                        <option value="">All Tips</option>
                        <option value="WIN">WIN Tips</option>
                        <option value="QUINELLA">QUINELLA Tips</option>
                        <option value="SIX">SIX Tips</option>
                    </select>

                    <select
                        className="col-span-3 px-4 py-3 bg-white rounded-md border-2 border-white focus:border-blue-400"
                        value={filters.region}
                        onChange={(e) => handleFilterChange('region', e.target.value)}
                    >
                        <option value="">All Tracks</option>
                        <option value="TR">Turkey</option>
                        <option value="INT">International</option>
                    </select>

                </div>

                {loading ? (
                    <div className="text-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading archive...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                ) : archiveData.length === 0 ? (
                    <div className="text-center py-10 bg-gray-100 rounded-lg">
                        <p className="text-gray-600">No archived tips found.</p>
                    </div>
                ) : (
                    <>
                        <div className="archive-history my-3 space-y-3">
                            {archiveData.map((item, index) => {
                                const gradingResult = item.grading_result ?
                                    (typeof item.grading_result === 'string' ? JSON.parse(item.grading_result) : item.grading_result)
                                    : null;

                                return (
                                    <div key={item.id || index} className="history flex justify-between items-center rounded-lg bg-white p-3 hover:shadow-md transition">

                                        <div className="history-left flex items-center w-full">
                                            <div className="icon flex justify-center items-center w-12 h-12 rounded-md bg-gray-200">
                                                <i className="bi text-xl bi-calendar"></i>
                                            </div>
                                            <div className="history-day ml-2">
                                                <h4 className='text-lg font-medium'>
                                                    {new Date(item.date).toLocaleDateString('en-US', {
                                                        weekday: 'short',
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </h4>
                                                <span className='text-gray-400 font-medium'>{item.track} - Race {item.race_no}</span>
                                            </div>
                                        </div>

                                        <div className="history-right flex items-center justify-end w-full">

                                            <div>
                                                <h4 className='text-lg font-medium'>
                                                    {gradingResult ? (
                                                        <span className={gradingResult.result === 'WIN' ? 'text-green-600' : 'text-red-600'}>
                                                            {gradingResult.result}
                                                        </span>
                                                    ) : (
                                                        'Pending'
                                                    )}
                                                </h4>
                                                <span className='text-gray-400 font-medium text-sm'>{item.tip_type}</span>
                                            </div>

                                            <i className="bi ml-4 text-2xl hidden md:inline-block text-gray-500 bi-chevron-right"></i>

                                        </div>

                                    </div>
                                );
                            })}
                        </div>

                        {/* Pagination */}
                        {pagination.totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-6">
                                <button
                                    onClick={() => handlePageChange(pagination.page - 1)}
                                    disabled={pagination.page === 1}
                                    className="px-4 py-2 bg-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                <span className="px-4 py-2">
                                    Page {pagination.page} of {pagination.totalPages}
                                </span>
                                <button
                                    onClick={() => handlePageChange(pagination.page + 1)}
                                    disabled={pagination.page === pagination.totalPages}
                                    className="px-4 py-2 bg-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}

            </div>
        </div>
    )
}

export default Archive;