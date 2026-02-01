import axios from 'axios';
import { BASE_URL, API_ENDPOINTS, TokenManager } from '../baseUrls/api';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = TokenManager.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retried, try to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = TokenManager.getRefreshToken();
        if (refreshToken) {
          const response = await axios.post(
            `${BASE_URL}${API_ENDPOINTS.AUTH.TOKEN_REFRESH}`,
            { refresh: refreshToken }
          );

          const { access } = response.data;
          TokenManager.setTokens(access, refreshToken);

          originalRequest.headers.Authorization = `Bearer ${access}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login
        TokenManager.removeTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// ============ AUTHENTICATION APIs ============

export const authAPI = {
  // Register new user
  register: async (username, email, password, confirm_password) => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, {
      username,
      email,
      password,
      confirm_password
    });
    return response.data;
  },

  // Login user
  login: async (email, password) => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
    return response.data;
  },

  // Logout user (clear tokens client-side)
  logout: async () => {
    TokenManager.removeTokens();
    return { success: true };
  },

  // Get user profile
  getProfile: async () => {
    const response = await apiClient.get(API_ENDPOINTS.AUTH.PROFILE);
    return response.data;
  },

  // Update user profile
  updateProfile: async (username, email, password) => {
    const payload = { username, email };
    if (password) {
      payload.password = password;
    }
    const response = await apiClient.put(API_ENDPOINTS.AUTH.PROFILE, payload);
    return response.data;
  },

  // Refresh access token
  refreshToken: async (refreshToken) => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.TOKEN_REFRESH, { refresh: refreshToken });
    return response.data;
  },
};

// ============ USER APIs ============

export const userAPI = {
  // Get current user profile
  getProfile: async () => {
    const response = await apiClient.get(API_ENDPOINTS.AUTH.PROFILE);
    return response.data;
  },

  // Update user profile
 updateProfile: async ({ username, email, password }) => { // <--- Yahan { } lagao
    const payload = { username, email };
    if (password) {
      payload.password = password;
    }
    // Agar tumne Django mein PATCH allow kiya hai toh patch use karo, warna PUT
    const response = await apiClient.patch(API_ENDPOINTS.AUTH.PROFILE, payload);
    return response.data;
},

  // Get user's subscriptions
  getMySubscriptions: async () => {
    const response = await apiClient.get(API_ENDPOINTS.SUBSCRIPTIONS);
    return response.data;
  },
};

// ============ SUBSCRIPTION APIs ============

export const subscriptionAPI = {
  // Get available subscription plans
  getPlans: async () => {
    const response = await apiClient.get(API_ENDPOINTS.PLANS);
    return response.data;
  },

  // Create subscription
  createSubscription: async (plan_id) => {
    const response = await apiClient.post(API_ENDPOINTS.SUBSCRIPTIONS, { plan_id });
    return response.data;
  },

  // Get user's subscriptions
  getUserSubscriptions: async () => {
    const response = await apiClient.get(API_ENDPOINTS.SUBSCRIPTIONS);
    return response.data;
  },
};

// ============ TIPS APIs ============

export const tipsAPI = {
  // Get today's tips
  getTodayTips: async () => {
    const response = await apiClient.get(API_ENDPOINTS.TIPS);
    return response.data;
  },
};

// ============ RESULTS APIs ============

export const resultsAPI = {
  // Get results
  getResults: async () => {
    const response = await apiClient.get(API_ENDPOINTS.RESULTS);
    return response.data;
  },
};



// ============ PERFORMANCE APIs ============

export const performanceAPI = {
  // Get performance summary
  getSummary: async () => {
    const response = await apiClient.get("/performance-summary/"); // 👈 updated route
    return response.data;
  },
};



// Export the axios instance for custom requests if needed
export default apiClient;
