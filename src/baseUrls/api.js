// Base URL Configuration
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001';

// API Endpoints
export const API_ENDPOINTS = {
    // Authentication
    AUTH: {
        REGISTER: '/auth/register/',
        LOGIN: '/auth/login/',
        TOKEN: '/auth/token/',
        TOKEN_REFRESH: '/auth/token/refresh/',
        PROFILE: '/auth/profile/',
    },

    // Plans & Subscriptions
    PLANS: '/plans/',
    SUBSCRIPTIONS: '/subscriptions/',

    // Tips & Results
    TIPS: '/tips/',
    RESULTS: '/results/',

    // Performance
    PERFORMANCE: {
        SUMMARY: '/performance/summary/',
    },
};

// Token Management Utilities
export const TokenManager = {
    // Get access token
    getAccessToken: () => {
        return localStorage.getItem('accessToken');
    },

    // Get refresh token
    getRefreshToken: () => {
        return localStorage.getItem('refreshToken');
    },

    // Set tokens
    setTokens: (accessToken, refreshToken) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    },

    // Remove tokens
    removeTokens: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    },

    // Decode JWT token to extract user info
    decodeToken: (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    },

    // Get username from token
    getUsernameFromToken: () => {
        const token = TokenManager.getAccessToken();
        if (!token) return null;

        const decoded = TokenManager.decodeToken(token);
        return decoded?.username || decoded?.user?.username || null;
    },

    // Get user email from token
    getEmailFromToken: () => {
        const token = TokenManager.getAccessToken();
        if (!token) return null;

        const decoded = TokenManager.decodeToken(token);
        return decoded?.email || decoded?.user?.email || null;
    },

    // Check if token is expired
    isTokenExpired: (token) => {
        if (!token) return true;

        const decoded = TokenManager.decodeToken(token);
        if (!decoded || !decoded.exp) return true;

        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    },
};

export default {
    BASE_URL,
    API_ENDPOINTS,
    TokenManager,
};
