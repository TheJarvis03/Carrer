import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { majorDetailService } from '../../services/majorDetailService';
import '../../styles/pages/major-detail.css';

const MajorDetailPage = () => {
    const { code } = useParams();
    const [majorData, setMajorData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMajorDetail = async () => {
            if (code) {
                const result = await majorDetailService.getMajorDetailByCode(code);
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

    if (error) return <div className="error">{error}</div>;
    if (!majorData) return <div>Đang tải thông tin...</div>;

    return (
        <div className="major-detail-page">
            <div className="major-title-area">
                <h1 className="major-title">{majorData.major_name}</h1>
                <div className="major-code-box right">Mã ngành: {majorData.major_code}</div>
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

                {majorData.schools && majorData.schools.length > 0 && (
                    <section className="major-section">
                        <h2>Các trường đào tạo</h2>
                        <div className="section-content school-list">
                            {majorData.schools.map((school, idx) => (
                                <div key={idx} className="school-item">
                                    {school}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default MajorDetailPage;
