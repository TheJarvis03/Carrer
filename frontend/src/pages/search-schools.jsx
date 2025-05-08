import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/search-schools.css';

const SearchSchoolsPage = () => {
    const [filters, setFilters] = useState({
        type: 'all',
        region: 'all',
        tuition: 'all',
    });
    const [searchQuery, setSearchQuery] = useState('');

    const handleApplyFilters = () => {
        // TODO: Implement filter logic
        console.log('Applying filters:', filters);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
    };

    return (
        <div className="ssh-page">
            <section className="search-header">
                <h1>Khám phá trường đại học</h1>
                <p>
                    Tìm hiểu và so sánh các trường đại học, cao đẳng trên toàn quốc
                </p>
                <form className="search-box" onSubmit={handleSearch}>
                    <input 
                        type="text" 
                        placeholder="Tìm kiếm theo tên trường, ngành học..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit">
                        <i className="fas fa-search"></i>
                        Tìm kiếm
                    </button>
                </form>
                <div className="search-stats">
                    <span><strong>156</strong> trường</span>
                    <span><strong>2,450</strong> ngành học</span>
                    <span><strong>12,000+</strong> đánh giá</span>
                </div>
            </section>

            <div className="ssh-content">
                <div className="ssh-grid">
                    <aside className="filter-panel">
                        <h3>Bộ lọc tìm kiếm</h3>
                        <div className="ssh-filter-group">
                            <label>Loại trường</label>
                            <select
                                value={filters.type}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        type: e.target.value,
                                    })
                                }
                            >
                                <option value="all">Tất cả</option>
                                <option value="public">Đại học công lập</option>
                                <option value="private">Đại học dân lập</option>
                                <option value="college">Cao đẳng</option>
                            </select>
                        </div>
                        <div className="ssh-filter-group">
                            <label>Khu vực</label>
                            <select
                                value={filters.region}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        region: e.target.value,
                                    })
                                }
                            >
                                <option value="all">Toàn quốc</option>
                                <option value="north">Miền Bắc</option>
                                <option value="central">Miền Trung</option>
                                <option value="south">Miền Nam</option>
                            </select>
                        </div>
                        <div className="ssh-filter-group">
                            <label>Học phí</label>
                            <select
                                value={filters.tuition}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        tuition: e.target.value,
                                    })
                                }
                            >
                                <option value="all">Tất cả mức</option>
                                <option value="low">Dưới 15 triệu/năm</option>
                                <option value="medium">15-25 triệu/năm</option>
                                <option value="high">Trên 25 triệu/năm</option>
                            </select>
                        </div>
                        <div className="ssh-filter-actions">
                            <button
                                className="ssh-filter-apply-btn"
                                onClick={handleApplyFilters}
                            >
                                Áp dụng bộ lọc
                            </button>
                        </div>
                    </aside>

                    <div className="ssh-results-panel">
                        <div className="ssh-results-header">
                            <div className="ssh-found-count">
                                Tìm thấy <strong>156</strong> trường
                            </div>
                            <div className="ssh-sort-options">
                                <label>Sắp xếp:</label>
                                <select>
                                    <option>Phù hợp nhất</option>
                                    <option>A-Z</option>
                                    <option>Điểm chuẩn cao nhất</option>
                                </select>
                            </div>
                        </div>

                        <div className="ssh-schools-grid">
                            {Array(6)
                                .fill(0)
                                .map((_, i) => (
                                    <Link
                                        to={`/school/${i + 1}`}
                                        key={i}
                                        className="ssh-school-card"
                                    >
                                        <div className="ssh-school-image">
                                            <img
                                                src={`/images/school-${i + 1}.jpg`}
                                                alt="School"
                                            />
                                            <div className="ssh-school-type">
                                                Công lập
                                            </div>
                                        </div>
                                        <div className="ssh-school-content">
                                            <div className="ssh-school-main">
                                                <h3 className="ssh-school-name">
                                                    Trường Đại học {i + 1}
                                                </h3>
                                                <div className="ssh-school-info">
                                                    <div className="ssh-info-item">
                                                        <i className="fas fa-map-marker-alt"></i>
                                                        <span>Hà Nội</span>
                                                    </div>
                                                    <div className="ssh-info-item">
                                                        <i className="fas fa-graduation-cap"></i>
                                                        <span>
                                                            12,000 sinh viên
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ssh-school-details">
                                                <div className="ssh-stat-item">
                                                    <div className="ssh-stat-label">
                                                        Điểm chuẩn
                                                    </div>
                                                    <div className="ssh-stat-value">
                                                        23.5-27.5
                                                    </div>
                                                    <div className="ssh-stat-range">
                                                        Năm 2023
                                                    </div>
                                                </div>
                                                <div className="ssh-stat-item">
                                                    <div className="ssh-stat-label">
                                                        Học phí/năm
                                                    </div>
                                                    <div className="ssh-stat-value">
                                                        15-20tr
                                                    </div>
                                                </div>
                                                <div className="ssh-stat-item">
                                                    <div className="ssh-stat-label">
                                                        Tỷ lệ có việc làm
                                                    </div>
                                                    <div className="ssh-stat-value">
                                                        92%
                                                    </div>
                                                    <div className="ssh-stat-note">
                                                        Sau 12 tháng
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                        </div>

                        <div className="ssh-pagination">
                            <button>Trước</button>
                            <button className="ssh-active">1</button>
                            <button>2</button>
                            <button>3</button>
                            <button>Sau</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchSchoolsPage;
