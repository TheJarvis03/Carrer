import axios from 'axios';

const API_URL = 'http://localhost:5000/api/major/detail';

export const majorDetailService = {
    getAllMajorDetails: async () => {
        const response = await axios.get(API_URL);
        return response.data;
    },
    createMajorDetail: async (majorDetail) => {
        const response = await axios.post(API_URL, majorDetail);
        return response.data;
    },
    updateMajorDetail: async (id, majorDetail) => {
        const response = await axios.put(`${API_URL}/${id}`, majorDetail);
        return response.data;
    },
    deleteMajorDetail: async (id) => {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    },
    getMajorDetailByCode: async (code) => {
        try {
            const response = await axios.get(`${API_URL}/${code}`);
            console.log('API Response:', response); // Debug log

            // Kiểm tra và xử lý response
            if (!response.data) {
                throw new Error('Invalid response data');
            }

            return response.data; // Trả về trực tiếp dữ liệu nhận được
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },
};
