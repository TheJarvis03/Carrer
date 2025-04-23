import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const majorService = {
    getAll: async () => {
        try {
            const response = await axios.get(`${API_URL}/majors`);
            console.log('API Response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching majors:', error);
            throw error;
        }
    }
};
