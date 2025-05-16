import axios from 'axios';

const API_URL = 'http://localhost:5000/api/school/detail';

const schoolDetailService = {
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
            const response = await axios.get(`http://localhost:5000/api/admissionScores/university/${code}`);
            
            if (response?.data?.success) {
                const scores = response.data.data;
                
                // Group scores by year
                const groupedScores = scores.reduce((acc, score) => {
                    const year = score.year || new Date().getFullYear();
                    
                    if (!acc[year]) {
                        acc[year] = [];
                    }
                    
                    acc[year].push({
                        majorCode: score.major_code || '',
                        majorName: score.major_name || '',
                        subjectGroup: score.subject_group || '',  // Sử dụng trực tiếp subject_group
                        score: score.score || 0,
                        note: score.note || ''
                    });
                    
                    return acc;
                }, {});

                // Sort scores within each year by majorCode
                Object.keys(groupedScores).forEach(year => {
                    groupedScores[year].sort((a, b) => a.majorCode.localeCompare(b.majorCode));
                });

                return {
                    success: true,
                    data: groupedScores
                };
            }
            return { success: false, data: {}, error: 'Không tìm thấy điểm chuẩn' };
        } catch (error) {
            console.error('Error fetching scores:', error);
            return { success: false, data: {}, error: 'Lỗi khi tải điểm chuẩn' };
        }
    }
};

export default schoolDetailService;
