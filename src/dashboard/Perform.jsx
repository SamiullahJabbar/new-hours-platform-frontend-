import React, { useState, useEffect } from 'react';
import { performanceAPI } from '../api/client';

const Perform = () => {
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState(null);
    const [dailyData, setDailyData] = useState([]);
    const [allRegionsData, setAllRegionsData] = useState([]); // Raw data store karne ke liye
    const [error, setError] = useState(null);

    // Filter states
    const [period, setPeriod] = useState('30');
    const [tipType, setTipType] = useState('');
    const [region, setRegion] = useState('');
    const [days, setDays] = useState(7);

    useEffect(() => {
        fetchPerformanceData();
    }, []);

    // Jab region ya filters change hon, summary recalculate karo
    useEffect(() => {
        if (allRegionsData.length > 0) {
            applyFilters();
        }
    }, [region, tipType, allRegionsData]);

    const fetchPerformanceData = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await performanceAPI.getSummary();

            // Agar backend array bhej raha hai [ {...} ]
            if (response && Array.isArray(response)) {
                setAllRegionsData(response);
                applyFilters(response);
            } 
            // Agar backend object bhej raha hai { performance: [...] }
            else if (response && response.performance) {
                setAllRegionsData(response.performance);
                applyFilters(response.performance);
            }
        } catch (err) {
            console.error('Error fetching performance data:', err);
            setError(err.response?.data?.message || err.response?.data?.detail || 'Failed to load performance data');
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = (data = allRegionsData) => {
        const filtered = data.filter(item => {
            const regionMatch = region === '' || item.region === region;
            // Agar backend tip_type bhej raha hai toh ye check kaam karega
            const typeMatch = tipType === '' || item.tip_type === tipType; 
            return regionMatch && typeMatch;
        });

        const aggregated = filtered.reduce((acc, regionData) => {
            acc.wins += regionData.wins || 0;
            acc.losses += regionData.losses || 0;
            acc.scratched += regionData.scratched || 0;
            acc.totalTips += (regionData.wins || 0) + (regionData.losses || 0) + (regionData.scratched || 0);
            return acc;
        }, { wins: 0, losses: 0, scratched: 0, totalTips: 0 });

        setSummary(aggregated);
    };

    const handlePeriodChange = (e) => setPeriod(e.target.value);
    const handleTipTypeChange = (e) => setTipType(e.target.value);
    const handleRegionChange = (e) => setRegion(e.target.value);

    const calculateHitRate = () => {
        if (!summary) return 0;
        const total = summary.totalTips || 0;
        const wins = summary.wins || 0;
        return total > 0 ? ((wins / total) * 100).toFixed(1) : 0;
    };

    const getChartHeight = (value, maxValue) => {
        const minHeight = 40;
        const maxHeight = 200;
        if (!maxValue || maxValue === 0) return minHeight;
        return Math.max(minHeight, (value / maxValue) * maxHeight);
    };

    if (loading) {
        return (
            <div className="performance flex items-center justify-center min-h-screen" id="performance">
                <div className="text-center">
                    <i className="bi bi-hourglass-split text-4xl text-gray-400 animate-spin"></i>
                    <p className="mt-4 text-gray-600">Loading performance data...</p>
                </div>
            </div>
        );
    }

    const maxDailyValue = dailyData.length > 0 ? Math.max(...dailyData.map(d => d.totalTips || 0)) : 1;
    const totalTips = summary?.totalTips || 0;
    const wins = summary?.wins || 0;
    const losses = summary?.losses || 0;
    const scratched = summary?.scratched || 0;

    return (
        <div className="performance" id="performance">
            <div className="mx-auto max-w-7xl space-y-8 px-4 py-8">
                <h1 className="text-4xl font-bold">Performance</h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <select className="px-4 py-3 bg-white rounded-md border shadow-sm" value={period} onChange={handlePeriodChange}>
                        <option value="7">Last 7 Days</option>
                        <option value="30">Last 30 Days</option>
                        <option value="90">Last 90 Days</option>
                    </select>

                    <select className="px-4 py-3 bg-white rounded-md border shadow-sm" value={tipType} onChange={handleTipTypeChange}>
                        <option value="">All Tips</option>
                        <option value="WIN">WIN Tips</option>
                        <option value="QUINELLA">QUINELLA Tips</option>
                        <option value="PICK6">PICK 6 Tips</option>
                    </select>

                    <select className="px-4 py-3 bg-white rounded-md border shadow-sm" value={region} onChange={handleRegionChange}>
                        <option value="">All Regions</option>
                        {/* Backend se aane wali unique regions */}
                        {[...new Set(allRegionsData.map(item => item.region))].map(r => (
                            <option key={r} value={r}>{r}</option>
                        ))}
                    </select>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-white rounded-md p-6 shadow-sm border">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                            <i className="bi bi-graph-up-arrow"></i>
                        </div>
                        <div className="mt-4">
                            <div className="text-3xl font-bold">{calculateHitRate()}%</div>
                            <div className="mt-1 text-sm text-gray-600">Hit Rate</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-md p-6 shadow-sm border">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                            <i className="bi bi-trophy"></i>
                        </div>
                        <div className="mt-4">
                            <div className="text-3xl font-bold">{wins}</div>
                            <div className="mt-1 text-sm text-gray-600">Wins</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-md p-6 shadow-sm border">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
                            <i className="bi bi-x-circle"></i>
                        </div>
                        <div className="mt-4">
                            <div className="text-3xl font-bold">{losses}</div>
                            <div className="mt-1 text-sm text-gray-600">Losses</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-md p-6 shadow-sm border">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                            <i className="bi bi-dash-circle"></i>
                        </div>
                        <div className="mt-4">
                            <div className="text-3xl font-bold">{scratched}</div>
                            <div className="mt-1 text-sm text-gray-600">Scratched</div>
                        </div>
                    </div>
                </div>

                {/* Charts Area */}
                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="bg-white rounded-md p-6 shadow-sm border">
                        <h2 className="text-lg font-semibold">Daily Performance</h2>
                        <div className="mt-8 h-64 flex items-center justify-center text-gray-500 italic">
                            {dailyData.length > 0 ? "Daily Chart Rendering..." : "No daily history data available"}
                        </div>
                    </div>

                    <div className="bg-white rounded-md p-6 shadow-sm border">
                        <h2 className="text-lg font-semibold">Win/Loss Distribution</h2>
                        <div className="mt-8 space-y-6">
                            <div className="h-8 w-full overflow-hidden rounded-full flex bg-gray-100">
                                <div className="bg-green-500 h-full transition-all" style={{ width: totalTips > 0 ? `${(wins / totalTips) * 100}%` : '0%' }}></div>
                                <div className="bg-red-500 h-full transition-all" style={{ width: totalTips > 0 ? `${(losses / totalTips) * 100}%` : '0%' }}></div>
                                <div className="bg-gray-400 h-full transition-all" style={{ width: totalTips > 0 ? `${(scratched / totalTips) * 100}%` : '0%' }}></div>
                            </div>
                            <div className="flex flex-wrap gap-6 text-sm">
                                <span className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-green-500"></div> Wins ({wins})</span>
                                <span className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-red-500"></div> Losses ({losses})</span>
                                <span className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-gray-400"></div> Scratched ({scratched})</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Perform;