import axios from 'axios';

const API_URL = 'http://localhost:5000/api/schools';

export const schoolService = {
    getAll: async () => {
        try {
            const res = await axios.get(API_URL);
            console.log('API Response:', res.data);

            // Kiểm tra dữ liệu trả về
            if (res.data && res.data.data) {
                return {
                    success: true,
                    data: res.data.data.map((school) => ({
                        id: school.school_id, // Thay đổi school_code thành school_id
                        school_name: school.school_name,
                        location: school.location,
                        school_img: school.school_img, // Thay đổi img thành school_img
                        ownership: school.ownership,
                    })),
                };
            }

            return {
                success: false,
                error: 'Invalid data format',
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
