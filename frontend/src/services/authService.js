import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

// Add request interceptor for debugging
axios.interceptors.request.use((request) => {
    console.log('Starting Request:', request);
    return request;
});

// Add response interceptor for debugging
axios.interceptors.response.use(
    (response) => {
        console.log('Response:', response);
        return response;
    },
    (error) => {
        console.error('API Error:', error.response || error);
        return Promise.reject(error);
    },
);

// Add axios interceptor for auth headers
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
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

            if (response.data.success && response.data.token) {
                localStorage.setItem('token', response.data.token);
                if (response.data.user) {
                    localStorage.setItem(
                        'user',
                        JSON.stringify(response.data.user),
                    );
                }
                return { success: true };
            }

            return {
                success: false,
                error: 'Đăng nhập thất bại',
            };
        } catch (error) {
            return {
                success: false,
                error:
                    error.response?.data?.error ||
                    'Lỗi kết nối, vui lòng thử lại sau',
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
            const response = await axios.get(`${API_URL}/profile`);
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            return {
                success: false,
                error:
                    error.response?.data?.error ||
                    'Không thể tải thông tin người dùng',
            };
        }
    },
};
