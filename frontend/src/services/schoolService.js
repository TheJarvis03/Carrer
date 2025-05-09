import axios from 'axios';

const API_URL = 'http://localhost:5000/api/search/schools';

export const schoolService = {
    getAll: async () => {
        try {
            const res = await axios.get(API_URL);
            console.log('API Response:', res.data);

            // Trường hợp API trả về mảng trực tiếp
            if (Array.isArray(res.data)) {
                return {
                    success: true,
                    data: res.data.map((school) => ({
                        id: school.id || school.school_id,
                        name: school.name || school.school_name,
                        location: school.location || school.school_location,
                        type: school.type || school.school_type,
                        ownership: school.ownership || school.school_ownership,
                    })),
                };
            }

            // Trường hợp API bọc mảng trong object có success/data
            const { success, data } = res.data;

            if (success && Array.isArray(data)) {
                return {
                    success: true,
                    data: data.map((school) => ({
                        id: school.id || school.school_id,
                        name: school.name || school.school_name,
                        location: school.location || school.school_location,
                        type: school.type || school.school_type,
                        ownership: school.ownership || school.school_ownership,
                    })),
                };
            }

            return {
                success: false,
                error: 'No data received or invalid format',
            };
        } catch (error) {
            console.error('Error fetching schools:', error);
            return { success: false, error: error.message };
        }
    },

    searchSchools: async (query) => {
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
