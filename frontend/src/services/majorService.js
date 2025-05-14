import axios from 'axios';

const API_URL = 'http://localhost:5000/api/majors'; // Keep this URL

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
                    })),
                };
            }
            return { success: false, error: 'Invalid data format' };
        } catch (error) {
            if (error.response?.status === 404) {
                return { success: false, error: 'API endpoint not found' };
            }
            return { success: false, error: error.message };
        }
    },

    getMajorGroups: async () => {
        try {
            const res = await axios.get(`${API_URL}/groups`);
            const { success, data } = res.data;

            if (success && Array.isArray(data)) {
                return { success: true, data };
            }
            return { success: false, error: 'Invalid group data format' };
        } catch (error) {
            console.error('Error fetching major groups:', error);
            return {
                success: false,
                error:
                    error.response?.status === 404
                        ? 'Major groups endpoint not available'
                        : error.message,
            };
        }
    },

    searchMajors: async (query) => {
        try {
            if (!query?.trim()) {
                return await majorService.getAll();
            }

            const response = await axios.get(`${API_URL}`, {
                params: {
                    q: query.trim(), // Use 'q' instead of 'search'
                },
            });

            if (response?.data?.data) {
                const majors = response.data.data;
                return {
                    success: true,
                    data: majors.map((major) => ({
                        code: major.code || major.major_code,
                        major_name: major.name || major.major_name,
                        group_id: major.group_id,
                        group_name: major.group_name,
                        exam_groups: major.exam_groups || [],
                    })),
                };
            }
            return {
                success: false,
                error: 'Không tìm thấy kết quả phù hợp',
            };
        } catch (error) {
            console.error('Search error:', error?.response?.data || error);
            return {
                success: false,
                error: 'Không thể tìm kiếm, vui lòng thử lại',
            };
        }
    },
};
