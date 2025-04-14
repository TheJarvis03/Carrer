import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/pages/news.css';

const NewsPage = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/news/search?q=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    const handleLoadMore = () => {
        setLoading(true);
        // Simulate loading more data
        setTimeout(() => {
            setPage((prev) => prev + 1);
            setLoading(false);
        }, 800);
    };

    return (
        <div className="news-page">
            <section className="news-header">
                <h1>Tin tức & Sự kiện</h1>
                <p>Cập nhật thông tin mới nhất về giáo dục và hướng nghiệp</p>
                <div className="category-tabs">
                    <button
                        className={activeCategory === 'all' ? 'active' : ''}
                        onClick={() => setActiveCategory('all')}
                    >
                        Tất cả
                    </button>
                    <button
                        className={
                            activeCategory === 'admission' ? 'active' : ''
                        }
                        onClick={() => setActiveCategory('admission')}
                    >
                        Tuyển sinh
                    </button>
                    <button
                        className={activeCategory === 'career' ? 'active' : ''}
                        onClick={() => setActiveCategory('career')}
                    >
                        Hướng nghiệp
                    </button>
                    <button
                        className={
                            activeCategory === 'scholarship' ? 'active' : ''
                        }
                        onClick={() => setActiveCategory('scholarship')}
                    >
                        Học bổng
                    </button>
                </div>
            </section>

            <div className="news-content">
                <div className="news-grid">
                    <main className="news-main">
                        <div className="featured-news">
                            <article className="news-card featured">
                                <div className="news-image">
                                    <Link
                                        to="/article/featured-2024"
                                        className="news-link"
                                    >
                                        <img
                                            src="/images/featured.jpg"
                                            alt="Featured news"
                                        />
                                        <div className="news-overlay">
                                            <span className="news-category">
                                                Nổi bật
                                            </span>
                                            <h2>
                                                Xu hướng ngành nghề hot nhất năm
                                                2024
                                            </h2>
                                            <div className="news-meta">
                                                <span>12 tháng 3, 2024</span>
                                                <span>5 phút đọc</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </article>
                        </div>

                        <div className="news-list">
                            {Array(page * 6)
                                .fill(0)
                                .map((_, i) => (
                                    <article key={i} className="news-card">
                                        <Link
                                            to={`/article/news-${i + 1}`}
                                            className="news-link"
                                        >
                                            <div className="news-image">
                                                <img
                                                    src={`/images/news-${i + 1}.jpg`}
                                                    alt="News thumbnail"
                                                />
                                                <span className="article-category">
                                                    Tuyển sinh
                                                </span>
                                            </div>
                                            <div className="news-content">
                                                <h3>
                                                    Thông tin tuyển sinh năm
                                                    2024
                                                </h3>
                                                <p>
                                                    Cập nhật những thay đổi quan
                                                    trọng về quy chế tuyển sinh
                                                    đại học...
                                                </p>
                                                <div className="article-meta">
                                                    <span className="publish-date">
                                                        10 tháng 3, 2024
                                                    </span>
                                                    <span className="read-time">
                                                        3 phút đọc
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </article>
                                ))}
                        </div>

                        <div className="load-more">
                            <button
                                className={`load-more-btn ${loading ? 'loading' : ''}`}
                                onClick={handleLoadMore}
                                disabled={loading}
                            >
                                {loading ? 'Đang tải...' : 'Xem thêm tin tức'}
                            </button>
                        </div>
                    </main>

                    <aside className="news-sidebar">
                        <form
                            onSubmit={handleSearchSubmit}
                            className="search-box"
                        >
                            <input
                                type="text"
                                placeholder="Tìm kiếm tin tức..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button type="submit">
                                <span>🔍</span>
                            </button>
                        </form>

                        <div className="sidebar-section">
                            <h3>Tin nổi bật</h3>
                            <div className="trending-list">
                                {Array(5)
                                    .fill(0)
                                    .map((_, i) => (
                                        <Link
                                            to={`/article/trending-${i + 1}`}
                                            key={i}
                                            className="trending-item"
                                        >
                                            <span className="trending-number">
                                                {i + 1}
                                            </span>
                                            <div className="trending-content">
                                                <h4>
                                                    Những ngành học có nhu cầu
                                                    cao năm 2024
                                                </h4>
                                                <span className="trending-meta">
                                                    2.5k lượt xem
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default NewsPage;
