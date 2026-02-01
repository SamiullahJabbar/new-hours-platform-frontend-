import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI, subscriptionAPI, authAPI } from '../api/client';

const Account = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [subscriptions, setSubscriptions] = useState([]);
    const [error, setError] = useState(null);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '' });
    
    // Updated States for Profile
    const [profileEmail, setProfileEmail] = useState('');
    const [profileUsername, setProfileUsername] = useState('');
    const [profilePassword, setProfilePassword] = useState(''); 
    
    const [actionLoading, setActionLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            setLoading(true);
            setError(null);

            const [profileRes, subscriptionsRes] = await Promise.all([
                userAPI.getProfile(),
                userAPI.getMySubscriptions()
            ]);

            setUser(profileRes);
            setSubscriptions(subscriptionsRes || []);
            
            // Set initial values for editing
            setProfileEmail(profileRes.email || '');
            setProfileUsername(profileRes.username || '');
        } catch (err) {
            console.error('Error fetching user data:', err);
            setError(err.response?.data?.message || err.response?.data?.detail || 'Failed to load user data');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            setActionLoading(true);
            setError(null);

            // Tyar kiya gaya data object
            const updateData = {
                email: profileEmail,
                username: profileUsername
            };

            // Agar password field bhari hai toh hi add karo
            if (profilePassword) {
                updateData.password = profilePassword;
            }

            // API Call: Yahan 'updateData' object ja raha hai
            await userAPI.updateProfile(updateData);
            
            setSuccessMessage('Profile updated successfully!');
            setShowProfileModal(false);
            setProfilePassword(''); // Clear password field
            fetchUserData(); // Refresh data
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            // Backend errors handle karna (e.g. Username already exists)
            const errorMsg = err.response?.data?.username?.[0] || 
                             err.response?.data?.email?.[0] || 
                             err.response?.data?.message || 
                             'Failed to update profile';
            setError(errorMsg);
        } finally {
            setActionLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            setActionLoading(true);
            await userAPI.changePassword(passwordData.currentPassword, passwordData.newPassword);
            setSuccessMessage('Password changed successfully!');
            setShowPasswordModal(false);
            setPasswordData({ currentPassword: '', newPassword: '' });
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to change password');
        } finally {
            setActionLoading(false);
        }
    };

    const handleCancelSubscription = async (subscriptionId) => {
        if (!window.confirm('Are you sure you want to cancel this subscription?')) return;

        try {
            setActionLoading(true);
            await subscriptionAPI.cancelSubscription(subscriptionId);
            setSuccessMessage('Subscription cancelled successfully!');
            fetchUserData();
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to cancel subscription');
        } finally {
            setActionLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await authAPI.logout();
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            navigate('/login');
        }
    };

    const getSubscriptionFeatures = (product) => {
        const features = {
            'WIN': ["Daily WIN tips", "Basic insights"],
            'QUINELLA': ["Daily WIN tips", "Daily QUINELLA tips", "Basic insights"],
            'PICK6': ["All WIN tips", "All QUINELLA tips", "All PICK 6 tips", "Performance analytics", "Full archive access"]
        };
        return features[product] || [];
    };

    if (loading) {
        return (
            <div className="flex-1 min-h-screen p-5 flex items-center justify-center">
                <div className="text-center">
                    <i className="bi bi-hourglass-split text-4xl text-gray-400 animate-spin"></i>
                    <p className="mt-4 text-gray-600">Loading account data...</p>
                </div>
            </div>
        );
    }

    const activeSubscription = subscriptions.find(sub => sub.status === 'ACTIVE' || sub.status === 'active');

    return (
        <div className="flex-1 min-h-screen p-5">
            <h1 className="text-4xl font-bold mb-6">Account</h1>

            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {successMessage}
                </div>
            )}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {/* User Info Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Username: <span className="font-bold text-black">{user?.username}</span></p>
                        <p className="text-sm text-gray-500 mb-1">Email</p>
                        <h2 className="text-xl font-bold mb-1">{user?.email}</h2>
                        <p className="text-sm text-gray-500">
                            Member since {new Date(user?.date_joined || user?.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <button
                        onClick={() => setShowProfileModal(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>

            {/* Current Plan Card */}
            {activeSubscription ? (
                <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Current Plan</p>
                            <h2 className="text-xl font-bold mb-1">{activeSubscription.plan?.name || activeSubscription.product}</h2>
                            <p className="text-sm text-gray-500">
                                {activeSubscription.status} - Expires: {activeSubscription.end_date || activeSubscription.endDate}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                            <span className="bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
                                {activeSubscription.status}
                            </span>
                            <button
                                onClick={() => handleCancelSubscription(activeSubscription.id)}
                                disabled={actionLoading}
                                className="text-sm text-red-600 hover:text-red-700 underline"
                            >
                                Cancel Subscription
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-2xl p-8 shadow-sm mb-6 text-center">
                    <p className="text-gray-500 mb-4">No active subscription</p>
                    <button
                        onClick={() => navigate('/price')}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                        View Plans
                    </button>
                </div>
            )}

            {/* Settings Sections */}
            <div onClick={() => setShowPasswordModal(true)} className="bg-white rounded-xl p-5 shadow-sm mb-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <i className="bi bi-key text-blue-600 text-lg"></i>
                </div>
                <div>
                    <p className="font-medium">Quick Password Change</p>
                    <p className="text-sm text-gray-500">Use this for old vs new password</p>
                </div>
            </div>

            <div onClick={handleLogout} className="bg-white rounded-xl p-5 shadow-sm flex items-center gap-4 cursor-pointer hover:bg-red-50 transition">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                    <i className="bi bi-box-arrow-right text-red-600 text-lg"></i>
                </div>
                <div>
                    <p className="font-medium text-red-600">Logout</p>
                    <p className="text-sm text-gray-500">Sign out of your account</p>
                </div>
            </div>

            {/* Profile Edit Modal (Updated with Username & Password) */}
            {showProfileModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
                        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
                        <form onSubmit={handleUpdateProfile}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Username</label>
                                <input
                                    type="text"
                                    value={profileUsername}
                                    onChange={(e) => setProfileUsername(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    value={profileEmail}
                                    onChange={(e) => setProfileEmail(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">Update Password (Optional)</label>
                                <input
                                    type="password"
                                    placeholder="Leave blank to keep current"
                                    value={profilePassword}
                                    onChange={(e) => setProfilePassword(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowProfileModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={actionLoading}
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {actionLoading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Account;