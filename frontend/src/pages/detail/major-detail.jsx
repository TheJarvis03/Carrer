import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { majorDetailService } from '../../services/majorDetailService';
import '../../styles/pages/major-detail.css';

const MajorDetailPage = () => {
    const { code } = useParams();
    const [majorData, setMajorData] = useState(null);
    const [error, setError] = useState('');
    const [schools, setSchools] = useState([]);
    const [loadingSchools, setLoadingSchools] = useState(false);

    useEffect(() => {
        const fetchMajorDetail = async () => {
            if (code) {
                const result =
                    await majorDetailService.getMajorDetailByCode(code);
                if (result.success && result.data) {
                    setMajorData(result.data);
                    setError('');
                } else {
                    setMajorData(null);
                    setError(result.error || 'Không tìm thấy thông tin ngành');
                }
            }
        };
        fetchMajorDetail();
    }, [code]);

    useEffect(() => {
        const fetchSchools = async () => {
            if (code) {
                setLoadingSchools(true);
                const result = await majorDetailService.getMajorSchools(code);
                console.log('API getMajorSchools result:', result); // Thêm log để debug cấu trúc dữ liệu

                // Kiểm tra các trường hợp dữ liệu trả về
                let schoolArr = [];
                if (result.success) {
                    if (Array.isArray(result.data)) {
                        schoolArr = result.data;
                    } else if (
                        result.data &&
                        Array.isArray(result.data.schools)
                    ) {
                        schoolArr = result.data.schools;
                    } else if (result.data && Array.isArray(result.data.data)) {
                        schoolArr = result.data.data;
                    }
                }
                setSchools(schoolArr);
                setLoadingSchools(false);
            }
        };
        fetchSchools();
    }, [code]);

    if (error) return <div className="error">{error}</div>;
    if (!majorData) return <div>Đang tải thông tin...</div>;

    return (
        <div className="major-detail-page">
            <div className="major-title-area">
                <h1 className="major-title">{majorData.major_name}</h1>
                <div className="major-code-box right">
                    Mã ngành: {majorData.major_code}
                </div>
            </div>
            <div className="major-detail-content">
                <section className="major-section">
                    <h2>Mô tả ngành học</h2>
                    <div className="section-content">
                        {majorData.description}
                    </div>
                </section>

                <section className="major-section">
                    <h2>Cơ hội việc làm</h2>
                    <div className="section-content">
                        {majorData.job_opportunities}
                    </div>
                </section>

                <section className="major-section">
                    <h2>Mức lương tham khảo</h2>
                    <div className="section-content">
                        {majorData.salary_range}
                    </div>
                </section>

                <section className="major-section">
                    <h2>Các trường đào tạo</h2>
                    <div className="section-content">
                        {loadingSchools ? (
                            <div>Đang tải danh sách trường...</div>
                        ) : error ? (
                            <div className="error">{error}</div>
                        ) : schools.length > 0 ? (
                            <table className="school-table">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Mã trường</th>
                                        <th>Tên trường</th>
                                        <th>Phương thức xét tuyển</th>
                                        <th>Tổ hợp môn</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {schools.map((school, idx) => {
                                        // Lấy các phương thức và tổ hợp môn duy nhất
                                        const methods = Array.isArray(
                                            school.admission_methods,
                                        )
                                            ? [
                                                  ...new Set(
                                                      school.admission_methods,
                                                  ),
                                              ]
                                            : [];
                                        const subjects = Array.isArray(
                                            school.subject,
                                        )
                                            ? [...new Set(school.subject)]
                                            : [];
                                        const maxRows = Math.max(
                                            methods.length,
                                            subjects.length,
                                            1,
                                        );

                                        return (
                                            <React.Fragment key={idx}>
                                                <tr>
                                                    <td rowSpan={maxRows}>
                                                        {idx + 1}
                                                    </td>
                                                    <td rowSpan={maxRows}>
                                                        {school.school_code}
                                                    </td>
                                                    <td rowSpan={maxRows}>
                                                        <Link
                                                            to={`/school/detail/${school.school_code}`}
                                                            className="school-link"
                                                        >
                                                            {school.school_name}
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        {methods[0] ? (
                                                            <span className="admission-method">
                                                                {methods[0]}
                                                            </span>
                                                        ) : (
                                                            ''
                                                        )}
                                                    </td>
                                                    <td>
                                                        {subjects[0] ? (
                                                            <span className="subject-item">
                                                                {subjects[0]}
                                                            </span>
                                                        ) : (
                                                            ''
                                                        )}
                                                    </td>
                                                </tr>
                                                {Array.from({
                                                    length: maxRows - 1,
                                                }).map((_, i) => (
                                                    <tr key={`${idx}-sub-${i}`}>
                                                        <td>
                                                            {methods[i + 1] ? (
                                                                <span className="admission-method">
                                                                    {
                                                                        methods[
                                                                            i +
                                                                                1
                                                                        ]
                                                                    }
                                                                </span>
                                                            ) : (
                                                                ''
                                                            )}
                                                        </td>
                                                        <td>
                                                            {subjects[i + 1] ? (
                                                                <span className="subject-item">
                                                                    {
                                                                        subjects[
                                                                            i +
                                                                                1
                                                                        ]
                                                                    }
                                                                </span>
                                                            ) : (
                                                                ''
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        );
                                    })}
                                </tbody>
                            </table>
                        ) : (
                            <div>Không có trường đào tạo ngành này.</div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MajorDetailPage;
