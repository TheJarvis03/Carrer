import axios from 'axios';
import { API_URL } from '../config';

export const schoolScoreService = {
    async getAll() {
        try {
            const response = await axios.get(`${API_URL}/api/school-scores`);
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            console.error('Error fetching school scores:', error);
            return {
                success: false,
                error: error.message || 'Failed to fetch school scores',
            };
        }
    },

    async getBySchoolId(schoolId) {
        try {
            const response = await axios.get(
                `${API_URL}/api/school-scores/${schoolId}`,
            );
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            console.error(
                `Error fetching scores for school ${schoolId}:`,
                error,
            );
            return {
                success: false,
                error: error.message || 'Failed to fetch school scores',
            };
        }
    },
};
