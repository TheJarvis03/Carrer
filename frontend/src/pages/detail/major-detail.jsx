import React from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/pages/major-detail.css';

const AcademicMajorPage = () => {
    // eslint-disable-next-line no-unused-vars
    const { id } = useParams();

    return (
        <div className="academic-major-page">
            <section className="academic-major-header">
                <h1>Công nghệ thông tin</h1>
                <div className="academic-major-meta">
                    <span>📚 Khối thi: A00, A01, D01</span>
                    <span>🎯 Điểm chuẩn: 24.5-26.5</span>
                    <span>💰 Học phí: 25-30 triệu/năm</span>
                    <span>⭐ Top 5 ngành hot nhất</span>
                </div>
            </section>

            <div className="academic-major-content">
                <aside className="academic-major-sidebar">
                    <div className="major-info-card">
                        <h3>Thông tin cơ bản</h3>
                        <ul>
                            <li>Thời gian đào tạo: 4 năm</li>
                            <li>Văn bằng: Kỹ sư CNTT</li>
                            <li>Cơ hội việc làm: 95%</li>
                            <li>Nhu cầu tuyển dụng: Cao</li>
                            <li>Mức lương khởi điểm: 10-15 triệu</li>
                            <li>Cơ hội du học: Có</li>
                        </ul>
                    </div>
                </aside>

                <main className="major-main">
                    <section className="major-description">
                        <h2 className="section-title">Giới thiệu ngành</h2>
                        <p>
                            Ngành Công nghệ thông tin (CNTT) là một trong những
                            ngành học được đánh giá là có tiềm năng phát triển
                            mạnh mẽ trong thời đại số. Chương trình đào tạo tập
                            trung vào các kiến thức về lập trình, phát triển
                            phần mềm, trí tuệ nhân tạo, và an ninh mạng.
                        </p>

                        <h3>Chương trình đào tạo</h3>
                        <ul>
                            <li>Lập trình cơ bản và nâng cao</li>
                            <li>Cơ sở dữ liệu</li>
                            <li>Phát triển ứng dụng Web/Mobile</li>
                            <li>An toàn thông tin</li>
                            <li>Trí tuệ nhân tạo và Machine Learning</li>
                        </ul>
                    </section>

                    <section className="career-prospects">
                        <h2 className="section-title">Cơ hội nghề nghiệp</h2>
                        <div className="prospects-grid">
                            <div className="prospect-card">
                                <h3>Lập trình viên</h3>
                                <p>
                                    Phát triển ứng dụng web, mobile và desktop
                                </p>
                                <p>Lương: 15-35 triệu</p>
                            </div>
                            <div className="prospect-card">
                                <h3>Kỹ sư AI/ML</h3>
                                <p>Nghiên cứu và phát triển các mô hình AI</p>
                                <p>Lương: 20-50 triệu</p>
                            </div>
                            <div className="prospect-card">
                                <h3>DevOps Engineer</h3>
                                <p>
                                    Quản lý và tối ưu hóa quy trình phát triển
                                </p>
                                <p>Lương: 25-45 triệu</p>
                            </div>
                        </div>
                    </section>

                    <section className="universities">
                        <h2 className="section-title">Các trường đào tạo</h2>
                        <div className="universities-grid">
                            <a href="/school/hust" className="university-card">
                                <h3>Đại học Bách Khoa Hà Nội</h3>
                                <p>Điểm chuẩn 2023: 26.5</p>
                                <p>Chỉ tiêu: 1000</p>
                            </a>
                            <a href="/school/uet" className="university-card">
                                <h3>Đại học Công nghệ - ĐHQGHN</h3>
                                <p>Điểm chuẩn 2023: 26.0</p>
                                <p>Chỉ tiêu: 480</p>
                            </a>
                            <a href="/school/fpt" className="university-card">
                                <h3>ĐH FPT</h3>
                                <p>Điểm chuẩn 2023: 21.0</p>
                                <p>Chỉ tiêu: 1500</p>
                            </a>
                            <a href="/school/ptit" className="university-card">
                                <h3>Học viện Công nghệ BCVT</h3>
                                <p>Điểm chuẩn 2023: 24.5</p>
                                <p>Chỉ tiêu: 750</p>
                            </a>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default AcademicMajorPage;
