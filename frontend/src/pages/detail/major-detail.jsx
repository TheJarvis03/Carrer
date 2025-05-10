import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { majorDetailService } from '../../services/majorDetailService';
import '../../styles/pages/major-detail.css';

const AcademicMajorPage = () => {
    const { code } = useParams();
    const navigate = useNavigate();
    const [majorDetail, setMajorDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMajorDetail = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const data = await majorDetailService.getMajorDetailByCode(code);
                console.log('Component received data:', data);

                // Kiểm tra dữ liệu
                if (!data || !data.major_name) {
                    throw new Error('Invalid major data');
                }

                // Set trực tiếp dữ liệu từ API mà không cần xử lý
                setMajorDetail(data);

            } catch (err) {
                console.error('Error in component:', err);
                setError('Không thể tải thông tin ngành học');
            } finally {
                setLoading(false);
            }
        };

        if (code) {
            fetchMajorDetail();
        }
    }, [code]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading">Đang tải thông tin ngành học...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="error">
                    <h2>Có lỗi xảy ra</h2>
                    <p>{error}</p>
                    <button onClick={() => navigate('/search/majors')}>
                        Quay lại trang tìm kiếm
                    </button>
                </div>
            </div>
        );
    }

    if (!majorDetail) return <div className="error">Không tìm thấy thông tin ngành học</div>;

    return (
        <div className="academic-major-page">
            <section className="academic-major-header">
                <h1>{majorDetail.major_name}</h1>
                <div className="academic-major-meta">
                    <span>🔢 Mã ngành: {majorDetail.major_code}</span>
                </div>
            </section>

            <div className="academic-major-content">
                <aside className="academic-major-sidebar">
                    {majorDetail.salary_range && majorDetail.salary_range !== "Không có nội dung" && (
                        <div className="major-info-card">
                            <h3>Thu nhập</h3>
                            <div dangerouslySetInnerHTML={{ __html: majorDetail.salary_range.replace(/\n/g, '<br/>') }} />
                        </div>
                    )}
                </aside>

                <main className="major-main">
                    {majorDetail.description && majorDetail.description !== "Không có nội dung" && (
                        <section className="major-description">
                            <h2 className="section-title">Giới thiệu ngành</h2>
                            <div dangerouslySetInnerHTML={{ __html: majorDetail.description.replace(/\n/g, '<br/>') }} />
                        </section>
                    )}

                    {majorDetail.job_opportunities && majorDetail.job_opportunities !== "Không có nội dung" && (
                        <section className="career-prospects"> 
                            <h2 className="section-title">Cơ hội nghề nghiệp</h2>
                            <div dangerouslySetInnerHTML={{ __html: majorDetail.job_opportunities.replace(/\n/g, '<br/>') }} />
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AcademicMajorPage;
