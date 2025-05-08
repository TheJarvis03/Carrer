import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admissionScores';

export const admissionScoreService = {
    getScores: async (filters) => {
        try {
            const response = await axios.get(API_URL, { params: filters });
            const { success, data, pagination } = response.data;

            if (success && Array.isArray(data)) {
                return {
                    success: true,
                    data: data.map(score => ({
                        _id: score._id,
                        major_name: score.major_name,
                        university: score.university,
                        major_code: score.major_code,
                        subject_group: score.subject_group,
                        score: score.score,
                        note: score.note
                    })),
                    pagination: pagination || {
                        currentPage: 1,
                        totalPages: 1,
                        totalItems: 0,
                        itemsPerPage: 10
                    }
                };
            }

            return { 
                success: false, 
                error: 'Invalid data format',
                data: [],
                pagination: {
                    currentPage: 1,
                    totalPages: 1,
                    totalItems: 0,
                    itemsPerPage: 10
                }
            };
        } catch (error) {
            console.error('Error fetching scores:', error);
            return { 
                success: false, 
                error: error.message,
                data: [],
                pagination: {
                    currentPage: 1,
                    totalPages: 1,
                    totalItems: 0,
                    itemsPerPage: 10
                }
            };
        }
    }
};
