import axios from 'axios';

const API_URL = 'http://localhost:5000/api/search/majors';

export const majorService = {
    getAll: async () => {
        try {
            const res = await axios.get(API_URL);
            const { success, data } = res.data;

            if (success && Array.isArray(data)) {
                return {
                    success: true,
                    data: data.map((major) => ({
                        code: major.code || major.major_code,
                        major_name: major.name || major.major_name,
                        group_id: major.group_id,
                        group_name: major.group_name,
                        exam_groups: major.exam_groups || [],
                        job_opportunity: major.job_opportunity || 'medium',
                        description: major.description || '',
                    })),
                };
            }

            return { success: false, error: 'Invalid data format' };
        } catch (error) {
            console.error('Error fetching majors:', error);
            return { success: false, error: error.message };
        }
    },

    getMajorGroups: async () => {
        try {
            const res = await axios.get(`${API_URL}/groups`);
            const { success, data } = res.data;

            if (success && Array.isArray(data)) {
                return {
                    success: true,
                    data: data,
                };
            }

            return { success: false, error: 'Invalid group data format' };
        } catch (error) {
            console.error('Error fetching major groups:', error);
            return { success: false, error: error.message };
        }
    },

    searchMajors: async (query) => {
        try {
            const response = await axios.get(
                `${API_URL}/search?q=${encodeURIComponent(query)}`,
            );
            const { success, data } = response.data;
            if (success) {
                return { success: true, data };
            }
            return { success: false, error: 'Search failed' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
};
