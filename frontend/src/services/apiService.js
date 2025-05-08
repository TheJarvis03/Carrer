import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const TIMEOUT = 15000;

const api = axios.create({
    baseURL: API_URL,
    timeout: TIMEOUT,
});

export const apiService = {
    async get(endpoint, params = {}, retries = 2) {
        try {
            const response = await api.get(endpoint, { params });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            return {
                data: response.data.data || [],
                pagination: response.data.pagination,
                message: response.data.message,
            };
        } catch (error) {
            if (error.code === 'ECONNABORTED' && retries > 0) {
                return this.get(endpoint, params, retries - 1);
            }
            throw new Error(
                error.response?.data?.message ||
                    error.message ||
                    'Không thể kết nối đến server',
            );
        }
    },

    async post(endpoint, data = {}) {
        try {
            const response = await api.post(endpoint, data);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Có lỗi xảy ra');
        }
    },
};
