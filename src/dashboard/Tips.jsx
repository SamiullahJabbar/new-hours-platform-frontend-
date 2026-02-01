import React, { useState, useEffect } from 'react';
import TipsCard from '../components/TipsCard';
import { tipsAPI } from '../api/client';
import { TokenManager } from '../baseUrls/api';

const Tips = () => {
    const [tips, setTips] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        fetchTodayTips();
        // Get username from token
        const usernameFromToken = TokenManager.getUsernameFromToken();
        setUsername(usernameFromToken || 'User');
    }, []);

    const fetchTodayTips = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await tipsAPI.getTodayTips();
            // Backend returns array of tips directly
            setTips(response || []);
        } catch (err) {
            console.error('Error fetching tips:', err);

            // Check if it's a subscription error (403)
            if (err.response?.status === 403) {
                setError('Content locked. Subscription required to view tips.');
            } else {
                setError(err.response?.data?.message || err.response?.data?.detail || 'Failed to load tips. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const changeDate = (days) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + days);
        setSelectedDate(newDate);
        // Note: You would need to update the API call to support date filtering
    };

    return (
        <section className="tips-component w-full" id="tips-component">
            <div className="container md:px-4">

                <div className="tips-title mb-3">
                    <h2 className="text-3xl font-bold">Today's Tips</h2>
                    {username && (
                        <p className="text-lg text-gray-600 mt-2">Welcome, <span className="font-semibold">{username}</span>!</p>
                    )}
                </div>

                <div className="tips-header flex flex-col md:flex-row items-center md:justify-between my-3 gap-y-3 md:gap-y-0">

                    <div className="left-h flex items-center md:justify-between md:w-2/5 gap-x-3 md:gap-x-0">
                        <i
                            className="bi text-3xl cursor-pointer text-gray-400 bi-chevron-left"
                            onClick={() => changeDate(-1)}
                        ></i>
                        <p className='text-lg font-medium'>{formatDate(selectedDate)}</p>
                        <i
                            className="bi text-3xl cursor-pointer text-gray-400 bi-chevron-right"
                            onClick={() => changeDate(1)}
                        ></i>
                    </div>

                </div>

                {loading ? (
                    <div className="text-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading tips...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                ) : tips.length === 0 ? (
                    <div className="text-center py-10 bg-gray-100 rounded-lg">
                        <p className="text-gray-600">No tips available for today.</p>
                    </div>
                ) : (
                    <div className="tips-body my-3">
                        <div className="container md:w-full mx-auto md:mx-0">
                            <div className="flex flex-wrap justify-around gap-3">
                                {tips.map((tip, index) => (
                                    <div key={tip.id || index} className="tips-item w-full md:w-[46%]">
                                        <TipsCard tip={tip} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </section>
    )
}

export default Tips;