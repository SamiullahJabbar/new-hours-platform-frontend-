import React, { createContext, useState, useEffect } from 'react';
import { authAPI, userAPI } from '../api/client';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check if user is logged in on mount
    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('accessToken');
            const savedUser = localStorage.getItem('user');

            if (token && savedUser) {
                try {
                    setUser(JSON.parse(savedUser));
                    setIsAuthenticated(true);

                    // Optionally fetch fresh user data
                    const response = await userAPI.getProfile();
                    if (response.success) {
                        setUser(response.data.user);
                        localStorage.setItem('user', JSON.stringify(response.data.user));
                    }
                } catch (error) {
                    console.error('Failed to fetch user profile:', error);
                    // If token is invalid, clear everything
                    logout();
                }
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await authAPI.login(email, password);

            // Backend returns { access, refresh } tokens
            const { access, refresh } = response;

            // Store tokens
            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);

            // Fetch user profile to get username and other details
            try {
                const profileResponse = await authAPI.getProfile();
                const userData = profileResponse;

                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);
                setIsAuthenticated(true);

                return { success: true, user: userData };
            } catch (profileError) {
                console.error('Failed to fetch profile after login:', profileError);
                // Still consider login successful if tokens are stored
                setIsAuthenticated(true);
                return { success: true };
            }
        } catch (error) {
            const message = error.response?.data?.error || error.response?.data?.message || 'Login failed. Please try again.';
            return { success: false, message };
        }
    };

    const register = async (username, email, password, confirmPassword) => {
        try {
            const response = await authAPI.register(username, email, password, confirmPassword);

            // Backend returns { success, message } on successful registration
            if (response.success) {
                // After successful registration, log the user in
                return await login(email, password);
            }

            return { success: false, message: response.message || 'Registration failed' };
        } catch (error) {
            // Handle validation errors from backend
            const errorData = error.response?.data;
            let message = 'Registration failed. Please try again.';

            if (errorData) {
                // Backend returns validation errors as object with field names
                if (errorData.password) {
                    message = Array.isArray(errorData.password) ? errorData.password[0] : errorData.password;
                } else if (errorData.email) {
                    message = Array.isArray(errorData.email) ? errorData.email[0] : errorData.email;
                } else if (errorData.username) {
                    message = Array.isArray(errorData.username) ? errorData.username[0] : errorData.username;
                } else if (errorData.message) {
                    message = errorData.message;
                }
            }

            return { success: false, message };
        }
    };

    const logout = async () => {
        try {
            await authAPI.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear local storage and state
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');

            setUser(null);
            setIsAuthenticated(false);
        }
    };

    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const value = {
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        updateUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Protected Route Component
export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = React.useContext(AuthContext);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        window.location.href = '/login';
        return null;
    }

    return children;
};
