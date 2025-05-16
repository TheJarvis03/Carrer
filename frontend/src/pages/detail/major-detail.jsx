import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { majorService } from '../../services/majorService';
import '../../styles/pages/major-detail.css';

const MajorDetailPage = () => {
    const { majorCode } = useParams();
    const [major, setMajor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMajorDetail = async () => {
            try {
                setLoading(true);
                const result =
                    await majorService.getMajorDetailByCode(majorCode);
                if (result.success) {
                    setMajor(result.data);
                } else {
                    setError('Không thể tải thông tin ngành học');
                }
            } catch (err) {
                console.error('Error fetching major details:', err);
                setError('Có lỗi xảy ra khi tải thông tin ngành học');
            } finally {
                setLoading(false);
            }
        };

        if (majorCode) {
            fetchMajorDetail();
        }
    }, [majorCode]);

    if (loading)
        return <div className="loading">Đang tải thông tin ngành...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!major)
        return <div className="not-found">Không tìm thấy thông tin ngành</div>;

    return (
        <div className="major-detail-page">
            <div className="major-detail-header">
                <Link to="/search/majors" className="back-link">
                    <i className="fas fa-arrow-left"></i> Quay lại
                </Link>
                <h1>{major.major_name}</h1>
                <div className="major-code">Mã ngành: {major.major_code}</div>
            </div>

            <div className="major-detail-content">
                <section className="major-section">
                    <h2>Mô tả ngành học</h2>
                    <div className="section-content">
                        {major.description || 'Chưa có thông tin'}
                    </div>
                </section>

                <section className="major-section">
                    <h2>Cơ hội việc làm</h2>
                    <div className="section-content">
                        {major.job_opportunities || 'Chưa có thông tin'}
                    </div>
                </section>

                <section className="major-section">
                    <h2>Mức lương tham khảo</h2>
                    <div className="section-content">
                        {major.salary_range || 'Chưa có thông tin'}
                    </div>
                </section>

                <section className="major-section">
                    <h2>Khối thi</h2>
                    <div className="section-content exam-groups">
                        {major.exam_groups?.map((group) => (
                            <span key={group} className="exam-group-tag">
                                {group}
                            </span>
                        )) || 'Chưa có thông tin'}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MajorDetailPage;
