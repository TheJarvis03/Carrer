import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/layout.css';
import '../styles/components/base.css';
import '../styles/pages/home.css';
import { getImageUrl } from '../services/api';

const HomePage = () => {
    return (
        <div className="homepage">
            <section className="banner">
                <h1>Khám phá tương lai nghề nghiệp của bạn</h1>
                <p>
                    Nền tảng tư vấn hướng nghiệp toàn diện giúp bạn tìm kiếm và
                    lựa chọn con đường sự nghiệp phù hợp nhất
                </p>
                <div className="banner-buttons">
                    <Link to="/search" className="button primary">
                        Bắt đầu tìm kiếm
                    </Link>
                </div>
            </section>

            <div className="home-container">
                <main className="main-content">
                    <section className="stats-section">
                        <div className="stats-grid">
                            <div className="stat-card">
                                <h3>200+</h3>
                                <p>Trường đại học</p>
                            </div>
                            <div className="stat-card">
                                <h3>1000+</h3>
                                <p>Ngành học</p>
                            </div>
                            <div className="stat-card">
                                <h3>500+</h3>
                                <p>Nghề nghiệp</p>
                            </div>
                        </div>
                    </section>

                    <section className="features-section">
                        <h2 className="section-title">
                            Khám phá dịch vụ của chúng tôi
                        </h2>
                        <div className="features-grid">
                            <div className="feature-card">
                                <div className="feature-icon">🏫</div>
                                <h3>Tìm kiếm trường học</h3>
                                <p>
                                    Khám phá và so sánh các trường đại học, cao
                                    đẳng trên cả nước với thông tin chi tiết về
                                    chương trình đào tạo
                                </p>
                                <Link
                                    to="/search/schools"
                                    className="learn-more"
                                >
                                    Tìm hiểu thêm →
                                </Link>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon">📚</div>
                                <h3>Khám phá ngành học</h3>
                                <p>
                                    Tìm hiểu về các ngành học, chương trình đạo
                                    tạo và kĩ năng cần thiết
                                </p>
                                <Link to="/search/major" className="learn-more">
                                    Khám phá ngay →
                                </Link>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon">📊</div>
                                <h3>Tra cứu điểm chuẩn</h3>
                                <p>
                                    Cập nhật thông tin điểm chuẩn mới nhất của
                                    các trường đại học trên toàn quốc
                                </p>
                                <Link
                                    to="/search/scores"
                                    className="learn-more"
                                >
                                    Xem điểm chuẩn →
                                </Link>
                            </div>
                            <div className="feature-card">
                                <div className="feature-icon">🎯</div>
                                <h3>Khám phá nghề nghiệp</h3>
                                <p>
                                    Tìm hiểu về các nghề nghiệp, cơ hội việc làm
                                    và triển vọng nghề nghiệp trong tương lai
                                </p>
                                <Link
                                    to="/search/careers"
                                    className="learn-more"
                                >
                                    Khám phá ngay →
                                </Link>
                            </div>
                        </div>
                    </section>

                    <section className="trending-section">
                        <h2 className="section-title">Ngành học thịnh hành</h2>
                        <div className="trending-grid">
                            <div className="trending-card">
                                <img
                                    src={getImageUrl('ai.jpg')}
                                    alt="AI"
                                    className="trending-image"
                                />
                                <div className="trending-content">
                                    <h3>Trí tuệ nhân tạo</h3>
                                    <p>Nhu cầu tăng 45% trong năm 2024</p>
                                    <Link to="/major/ai" className="learn-more">
                                        Chi tiết →
                                    </Link>
                                </div>
                            </div>
                            <div className="trending-card">
                                <img
                                    src={getImageUrl('data-science.jpg')}
                                    alt="Data Science"
                                    className="trending-image"
                                />
                                <div className="trending-content">
                                    <h3>Khoa học dữ liệu</h3>
                                    <p>Top 5 ngành có mức lương cao nhất</p>
                                    <Link
                                        to="/major/data-science"
                                        className="learn-more"
                                    >
                                        Chi tiết →
                                    </Link>
                                </div>
                            </div>
                            <div className="trending-card">
                                <img
                                    src={getImageUrl('digital-marketing.jpg')}
                                    alt="Digital Marketing"
                                    className="trending-image"
                                />
                                <div className="trending-content">
                                    <h3>Digital Marketing</h3>
                                    <p>Cơ hội việc làm tăng 30% mỗi năm</p>
                                    <Link
                                        to="/major/digital-marketing"
                                        className="learn-more"
                                    >
                                        Chi tiết →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <aside className="side-content">
                    <div className="events-section">
                        <h3>Sự kiện sắp diễn ra</h3>
                        <div className="event-list">
                            <div className="event-item">
                                <span className="event-date">20/04</span>
                                <div className="event-info">
                                    <h4>Ngày hội tư vấn tuyển sinh</h4>
                                    <p>Đại học Quốc gia Hà Nội</p>
                                    <Link
                                        to="/article/tuyen-sinh-dhqghn"
                                        className="event-link"
                                    >
                                        Chi tiết →
                                    </Link>
                                </div>
                            </div>
                            <div className="event-item">
                                <span className="event-date">25/04</span>
                                <div className="event-info">
                                    <h4>Hội thảo định hướng nghề nghiệp</h4>
                                    <p>Trực tuyến qua Zoom</p>
                                    <Link
                                        to="/article/hoi-thao-huong-nghiep"
                                        className="event-link"
                                    >
                                        Chi tiết →
                                    </Link>
                                </div>
                            </div>
                            <div className="event-item">
                                <span className="event-date">28/04</span>
                                <div className="event-info">
                                    <h4>Ngày hội việc làm IT</h4>
                                    <p>Đại học Bách Khoa Hà Nội</p>
                                    <Link
                                        to="/article/job-fair-bkhn"
                                        className="event-link"
                                    >
                                        Chi tiết →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="news-section">
                        <h3>Tin tức mới nhất</h3>
                        <div className="news-article-list">
                            <div className="news-article-item">
                                <span className="news-article-tag">
                                    Tuyển sinh
                                </span>
                                <div className="news-article-info">
                                    <h4>Thông tin tuyển sinh 2024</h4>
                                    <p>
                                        Cập nhật những thay đổi mới nhất về kỳ
                                        thi THPT
                                    </p>
                                    <Link
                                        to="/news/1"
                                        className="news-article-link"
                                    >
                                        Đọc thêm →
                                    </Link>
                                </div>
                            </div>
                            <div className="news-article-item">
                                <span className="news-article-tag">
                                    Thị trường
                                </span>
                                <div className="news-article-info">
                                    <h4>Top ngành hot 2024</h4>
                                    <p>
                                        Những ngành nghề có nhu cầu cao trong
                                        năm tới
                                    </p>
                                    <Link
                                        to="/news/2"
                                        className="news-article-link"
                                    >
                                        Đọc thêm →
                                    </Link>
                                </div>
                            </div>
                            <div className="news-article-item">
                                <span className="news-article-tag">
                                    Hướng nghiệp
                                </span>
                                <div className="news-article-info">
                                    <h4>Kỹ năng cần thiết cho Gen Z</h4>
                                    <p>
                                        Những kỹ năng quan trọng trong thời đại
                                        số
                                    </p>
                                    <Link
                                        to="/news/3"
                                        className="news-article-link"
                                    >
                                        Đọc thêm →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default HomePage;
