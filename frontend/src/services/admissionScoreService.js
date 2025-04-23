import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
const MAX_RETRIES = 3;

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const admissionScoreService = {
    getAll: async (filters = {}, retryCount = 0) => {
        try {
            const response = await axios.get(`${API_URL}/admission-scores`, {
                params: filters,
                timeout: 5000, // 5 seconds timeout
            });
            return response.data;
        } catch (error) {
            if (error.code === 'ECONNREFUSED' && retryCount < MAX_RETRIES) {
                console.log(`Connection failed, retrying... (${retryCount + 1}/${MAX_RETRIES})`);
                await wait(1000 * (retryCount + 1)); // Exponential backoff
                return admissionScoreService.getAll(filters, retryCount + 1);
            }
            console.error('Error fetching scores:', error.message);
            throw new Error('Could not connect to server. Please check if the backend is running.');
        }
    }
};
