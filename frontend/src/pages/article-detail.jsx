import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/article-detail.css';

const ArticleDetailPage = () => {
    return (
        <div className="article-detail-page">
            <article className="article-content">
                <header className="article-header">
                    <div className="article-meta">
                        <span className="article-category">Tuyển sinh</span>
                        <span className="article-date">20 tháng 4, 2024</span>
                        <span className="article-read-time">5 phút đọc</span>
                    </div>
                    <h1>Ngày hội tư vấn tuyển sinh 2024 tại Đại học Quốc gia Hà Nội</h1>
                    <div className="article-author">
                        <img src="/images/author-avatar.jpg" alt="Author" />
                        <div>
                            <span className="author-name">Nguyễn Văn A</span>
                            <span className="author-role">Chuyên gia tư vấn</span>
                        </div>
                    </div>
                </header>

                <div className="article-body">
                    <img src="/images/article-banner.jpg" alt="Article banner" className="article-banner" />
                    
                    <div className="article-text">
                        <p>Ngày hội tư vấn tuyển sinh năm 2024 sẽ diễn ra tại Đại học Quốc gia Hà Nội với sự tham gia của hơn 100 trường đại học, cao đẳng trên cả nước...</p>
                        
                        <h2>Thời gian và địa điểm</h2>
                        <p>Sự kiện sẽ diễn ra từ 8h00-17h00, ngày 20/04/2024 tại:</p>
                        <ul>
                            <li>Địa điểm: Đại học Quốc gia Hà Nội</li>
                            <li>Địa chỉ: 144 Xuân Thủy, Cầu Giấy, Hà Nội</li>
                        </ul>

                        <h2>Nội dung chính</h2>
                        <ul>
                            <li>Tư vấn chọn ngành, chọn trường</li>
                            <li>Thông tin tuyển sinh 2024</li>
                            <li>Giao lưu với sinh viên các trường</li>
                            <li>Tham quan cơ sở vật chất</li>
                        </ul>
                    </div>
                </div>
            </article>

            <aside className="article-sidebar">
                <div className="related-articles">
                    <h3>Bài viết liên quan</h3>
                    <div className="related-list">
                        <Link to="/article/2" className="related-item">
                            <div className="related-image">
                                <img src="/images/article-2.jpg" alt="Related article" />
                            </div>
                            <div className="related-info">
                                <h4>Hướng dẫn đăng ký xét tuyển đại học 2024</h4>
                                <span className="related-date">15 tháng 4, 2024</span>
                            </div>
                        </Link>
                        <Link to="/article/3" className="related-item">
                            <div className="related-image">
                                <img src="/images/article-3.jpg" alt="Related article" />
                            </div>
                            <div className="related-info">
                                <h4>Top 10 ngành hot nhất năm 2024</h4>
                                <span className="related-date">10 tháng 4, 2024</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default ArticleDetailPage;
