import axios from 'axios';

const API_URL = 'http://localhost:5000/api/major/detail';

export const majorDetailService = {
    getMajorDetailByCode: async (code) => {
        try {
            const response = await axios.get(`${API_URL}/${code}`);
            // Log toàn bộ response để debug
            console.log('Major detail API response:', response);

            // Nếu API trả về { success, data }
            if (response.data && response.data.success && response.data.data) {
                const d = response.data.data;
                return {
                    success: true,
                    data: {
                        id: d.major_id,
                        major_code: d.major_code,
                        major_name: d.major_name,
                        description: d.description,
                        job_opportunities: d.job_opportunities,
                        salary_range: d.salary_range,
                        exam_groups: d.exam_groups,
                    },
                };
            }

            // Nếu API trả về trực tiếp object ngành
            if (response.data && response.data.major_code) {
                return {
                    success: true,
                    data: {
                        id: response.data.major_id,
                        major_code: response.data.major_code,
                        major_name: response.data.major_name,
                        description: response.data.description,
                        job_opportunities: response.data.job_opportunities,
                        salary_range: response.data.salary_range,
                        exam_groups: response.data.exam_groups,
                    },
                };
            }

            return { success: false, error: 'Không tìm thấy thông tin ngành' };
        } catch (error) {
            console.error('Error fetching major details:', error);
            return {
                success: false,
                error: 'Có lỗi xảy ra khi tải thông tin ngành',
            };
        }
    },

    getMajorStatistics: async (code) => {
        try {
            const response = await axios.get(`${API_URL}/${code}/statistics`);
            return response.data;
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    getMajorSchools: async (code) => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/school/detail/major/${code}`,
            );
            if (
                !response.data ||
                !response.data.success ||
                !Array.isArray(response.data.data)
            ) {
                return {
                    success: false,
                    error: 'Không tìm thấy trường đào tạo ngành này',
                };
            }

            // Gộp các trường trùng tên/mã trường
            const schoolMap = {};
            response.data.data.forEach((item) => {
                const key = `${item.school_code}_${item.school_name}`;
                if (!schoolMap[key]) {
                    schoolMap[key] = {
                        school_name: item.school_name,
                        school_code: item.school_code,
                        admission_methods: [],
                        subject: [],
                    };
                }
                // Đảm bảo luôn là mảng
                const methods = Array.isArray(item.admission_methods)
                    ? item.admission_methods
                    : item.admission_methods
                      ? [item.admission_methods]
                      : [];
                const subjects = Array.isArray(item.subject)
                    ? item.subject
                    : item.subject
                      ? [item.subject]
                      : [];

                methods.forEach((method) => {
                    if (!schoolMap[key].admission_methods.includes(method)) {
                        schoolMap[key].admission_methods.push(method);
                    }
                });
                subjects.forEach((sub) => {
                    if (!schoolMap[key].subject.includes(sub)) {
                        schoolMap[key].subject.push(sub);
                    }
                });
            });

            const result = Object.values(schoolMap);

            return {
                success: true,
                data: result,
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
};
