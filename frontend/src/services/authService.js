import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users'; // Fix API URL

// Remove duplicate interceptors and keep only one set
axios.interceptors.request.use(
    (config) => {
        // Add request logging
        console.log('Request:', config.url, config.data);

        // Add auth token if exists
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    },
);

axios.interceptors.response.use(
    (response) => {
        console.log('Response:', response.data);
        return response;
    },
    (error) => {
        console.error('Response Error:', error.response?.data || error.message);
        return Promise.reject(error);
    },
);

export const authService = {
    login: async (username, password) => {
        try {
            const response = await axios.post(`${API_URL}/login`, {
                username,
                password,
            });

            if (response.data) {
                return {
                    success: true,
                    data: response.data,
                };
            }

            return {
                success: false,
                message: 'Invalid response format',
            };
        } catch (error) {
            console.error('Login error details:', error.response?.data);
            return {
                success: false,
                message: error.response?.data?.message || 'Đăng nhập thất bại',
            };
        }
    },

    register: async (userData) => {
        try {
            const response = await axios.post(`${API_URL}/register`, userData);
            if (response.data.success) {
                return { success: true };
            }
            return {
                success: false,
                error: response.data.error || 'Đăng ký thất bại',
            };
        } catch (error) {
            return {
                success: false,
                error:
                    error.response?.data?.error ||
                    'Đăng ký thất bại. Vui lòng thử lại sau.',
            };
        }
    },

    logout: () => {
        localStorage.removeItem('token');
    },

    getProfile: async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await axios.get(`${API_URL}/users/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            console.error('Profile fetch error:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Could not fetch profile',
            };
        }
    },
};
