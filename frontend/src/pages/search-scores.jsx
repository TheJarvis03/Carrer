import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/search-scores.css';

const SearchScoresPage = () => {
    const [filters, setFilters] = useState({
        examGroup: 'all',
        scoreRange: 'all',
        region: 'all'
    });

    const handleFilterChange = (field, value) => {
        setFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleApplyFilters = () => {
        console.log('Applying filters:', filters);
    };

    return (
        <div className="ss-page">
            <section className="search-header">
                <h1>Tra cứu điểm chuẩn</h1>
                <p>Thông tin điểm chuẩn các trường qua các năm</p>
            </section>

            <div className="ss-content">
                <div className="ss-grid">
                    <aside className="filter-panel">
                        <h3>Bộ lọc tìm kiếm</h3>
                        <div className="filter-group">
                            <label>Khối thi</label>
                            <select 
                                value={filters.examGroup}
                                onChange={(e) => handleFilterChange('examGroup', e.target.value)}
                            >
                                <option value="all">Tất cả khối</option>
                                <option value="A00">A00 (Toán, Lý, Hóa)</option>
                                <option value="A01">A01 (Toán, Lý, Anh)</option>
                                <option value="D01">D01 (Toán, Văn, Anh)</option>
                            </select>
                        </div>
                        <div className="filter-group">
                            <label>Mức điểm</label>
                            <select 
                                value={filters.scoreRange}
                                onChange={(e) => handleFilterChange('scoreRange', e.target.value)}
                            >
                                <option value="all">Tất cả</option>
                                <option value="above25">Trên 25 điểm</option>
                                <option value="20to25">20 - 25 điểm</option>
                                <option value="15to20">15 - 20 điểm</option>
                            </select>
                        </div>
                        <div className="filter-group">
                            <label>Khu vực</label>
                            <select 
                                value={filters.region}
                                onChange={(e) => handleFilterChange('region', e.target.value)}
                            >
                                <option value="all">Toàn quốc</option>
                                <option value="north">Miền Bắc</option>
                                <option value="central">Miền Trung</option>
                                <option value="south">Miền Nam</option>
                            </select>
                        </div>
                        <div className="filter-actions">
                            <button 
                                className="filter-apply-btn"
                                onClick={handleApplyFilters}
                            >
                                Áp dụng bộ lọc
                            </button>
                        </div>
                    </aside>

                    <div className="ss-scores-panel">
                        <div className="ss-scores-header">
                            <div className="year-filter">
                                <button className="active">2024</button>
                                <button>2023</button>
                                <button>2022</button>
                                <button>2021</button>
                                <button>2020</button>
                            </div>
                            <div className="total-results">
                                Tổng số kết quả: <strong>156</strong>
                            </div>
                        </div>

                        <table className="ss-scores-table">
                            <thead>
                                <tr>
                                    <th>Trường</th>
                                    <th>Mã trường</th>
                                    <th>Ngành học</th>
                                    <th>Khối thi</th>
                                    <th>Điểm chuẩn</th>
                                    <th>Chỉ tiêu</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array(10).fill(0).map((_, i) => (
                                    <tr key={i}>
                                        <td>
                                            <Link to={`/school/BKA${i + 1}`} className="school-link">
                                                Đại học Bách Khoa Hà Nội
                                            </Link>
                                        </td>
                                        <td>BKA{i + 1}</td>
                                        <td>Công nghệ thông tin</td>
                                        <td>A00</td>
                                        <td className="score-value">26.5</td>
                                        <td>120</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchScoresPage;
