import axios from 'axios';

const API_URL = 'http://localhost:5000/api/school/detail';
const updateEndpoints = {
    MAJORS_URL: 'http://localhost:5000/api/majors',
    SCORES_URL: 'http://localhost:5000/api/admissionScores',
};

export const schoolDetailService = {
    getSchoolByCode: async (code) => {
        try {
            const response = await axios.get(`${API_URL}/${code}`);
            const { success, data } = response.data;

            if (success && data) {
                return {
                    success: true,
                    data: {
                        id: data.school_id,
                        code: data.school_code, // Thêm mã trường
                        school_name: data.school_name,
                        location: data.address, // Đổi tên field
                        school_img: data.school_img,
                        description: data.description,
                        ownership: data.ownership,
                        founded_year: data.founded_year,
                        ranking: data.ranking,
                        website: data.website,
                        phones: data.phones || [], // Thêm số điện thoại
                        method_link: data.method_link, // Thêm link phương thức TS
                        student_count: data.student_count,
                        majors: data.majors || [],
                    },
                };
            }
            return { success: false, error: 'Không tìm thấy thông tin trường' };
        } catch (error) {
            console.error('Error fetching school details:', error);
            return {
                success: false,
                error: 'Có lỗi xảy ra khi tải thông tin trường',
            };
        }
    },

    getSchoolMajors: async (schoolId) => {
        try {
            const response = await axios.get(`${API_URL}/${schoolId}/majors`);
            const { success, data } = response.data;

            if (success && Array.isArray(data)) {
                return { success: true, data };
            }
            return { success: false, error: 'Không tìm thấy danh sách ngành' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    getSchoolAdmissionScores: async (schoolId) => {
        try {
            const response = await axios.get(`${API_URL}/${schoolId}/scores`);
            const { success, data } = response.data;

            if (success && Array.isArray(data)) {
                return { success: true, data };
            }
            return { success: false, error: 'Không tìm thấy điểm chuẩn' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    getSchoolFacilities: async (schoolId) => {
        try {
            const response = await axios.get(
                `${API_URL}/${schoolId}/facilities`,
            );
            const { success, data } = response.data;

            if (success && Array.isArray(data)) {
                return { success: true, data };
            }
            return {
                success: false,
                error: 'Không tìm thấy thông tin cơ sở vật chất',
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    getMajorsBySchool: async (code) => {
        try {
            const response = await axios.get(`${API_URL}/${code}`);
            if (response?.data?.success && response.data.data?.majors) {
                const majors = response.data.data.majors;

                // Group by major info
                const groupedMajors = majors.reduce((acc, major) => {
                    const key = `${major.index}-${major.major_code}-${major.major_name}-${major.quota}`;

                    if (!acc[key]) {
                        acc[key] = {
                            index: major.index,
                            major_code: major.major_code,
                            major_name: major.major_name,
                            quota: major.quota,
                            combinations: [],
                        };
                    }

                    // Group subject combinations
                    const subjectKey = major.subject || '';
                    const existingCombination = acc[key].combinations.find(
                        (c) => c.subject === subjectKey,
                    );

                    if (!existingCombination) {
                        acc[key].combinations.push({
                            admission_methods: major.admission_methods,
                            subject: subjectKey,
                        });
                    }

                    return acc;
                }, {});

                return {
                    success: true,
                    data: Object.values(groupedMajors),
                };
            }
            return {
                success: false,
                data: [],
                error: 'Không tìm thấy thông tin ngành',
            };
        } catch (error) {
            console.error('Error fetching majors:', error);
            return {
                success: false,
                data: [],
                error: 'Lỗi khi tải dữ liệu ngành học',
            };
        }
    },

    getSchoolScores: async (code) => {
        try {
            const response = await axios.get(
                `${updateEndpoints.SCORES_URL}/school/${code}`,
            );
            if (response?.data?.success) {
                // Transform scores data
                const scores = response.data.data.map((score) => ({
                    year: score.year || new Date().getFullYear(),
                    majorName: score.major_name || '',
                    majorCode: score.major_code || '',
                    score: score.score || '',
                    subjects: score.subjects || [],
                    note: score.note || '',
                }));

                // Sort scores by year descending and group them
                const groupedScores = scores.reduce((acc, score) => {
                    if (!acc[score.year]) {
                        acc[score.year] = [];
                    }
                    acc[score.year].push(score);
                    return acc;
                }, {});

                return {
                    success: true,
                    data: groupedScores,
                };
            }
            return {
                success: false,
                data: [],
                error: 'Không tìm thấy điểm chuẩn',
            };
        } catch (error) {
            console.error('Error fetching scores:', error);
            return {
                success: false,
                data: [],
                error: 'Lỗi khi tải điểm chuẩn',
            };
        }
    },
};
