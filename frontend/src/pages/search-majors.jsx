import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/search-majors.css';

const SearchMajorsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        field: 'all',
        examGroup: 'all',
        opportunity: 'all'
    });

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
    };

    const handleApplyFilters = () => {
        console.log('Applying filters:', filters);
    };

    return (
        <div className="sm-page">
            <section className="search-header">
                <h1>Tìm kiếm ngành học</h1>
                <p>Khám phá các ngành học và cơ hội nghề nghiệp tương lai</p>
                <form className="search-bar" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Nhập tên ngành học bạn quan tâm..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>
            </section>

            <div className="sm-content">
                <div className="sm-grid">
                    <div className="sm-filter-panel">
                        <h3>Bộ lọc tìm kiếm</h3>
                        <div className="filter-group">
                            <label>Khối ngành</label>
                            <select 
                                value={filters.field}
                                onChange={(e) => setFilters({...filters, field: e.target.value})}
                            >
                                <option value="all">Tất cả</option>
                                <option value="it">Công nghệ thông tin</option>
                                <option value="economics">Kinh tế</option>
                            </select>
                        </div>
                        <div className="filter-group">
                            <label>Khối thi</label>
                            <select 
                                value={filters.examGroup}
                                onChange={(e) => setFilters({...filters, examGroup: e.target.value})}
                            >
                                <option value="all">Tất cả</option>
                                <option value="a00">Khối A00</option>
                                <option value="b00">Khối B00</option>
                            </select>
                        </div>
                        <div className="filter-group">
                            <label>Cơ hội việc làm</label>
                            <select 
                                value={filters.opportunity}
                                onChange={(e) => setFilters({...filters, opportunity: e.target.value})}
                            >
                                <option value="all">Tất cả</option>
                                <option value="high">Cao</option>
                                <option value="medium">Trung bình</option>
                                <option value="low">Thấp</option>
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
                    </div>

                    <div className="sm-results-panel">
                        {[
                            {
                                id: 1,
                                name: "Công nghệ thông tin",
                                type: "Khối A00, A01",
                                description: "Chuyên ngành đào tạo về phát triển phần mềm, trí tuệ nhân tạo, và công nghệ web.",
                                avgScore: 26.5,
                                employmentRate: 92
                            },
                            {
                                id: 2,
                                name: "Quản trị kinh doanh",
                                type: "Khối A00, D01",
                                description: "Đào tạo các nhà quản lý tương lai với kiến thức về kinh doanh, marketing.",
                                avgScore: 25.75,
                                employmentRate: 88
                            },
                            {
                                id: 3,
                                name: "Kỹ thuật phần mềm",
                                type: "Khối A00, A01",
                                description: "Chuyên sâu về quy trình phát triển phần mềm, đảm bảo chất lượng phần mềm.",
                                avgScore: 25.8,
                                employmentRate: 90
                            },
                            {
                                id: 4,
                                name: "Marketing",
                                type: "Khối A00, D01",
                                description: "Nghiên cứu thị trường, xây dựng chiến lược marketing và quảng cáo.",
                                avgScore: 24.5,
                                employmentRate: 85
                            },
                            {
                                id: 5,
                                name: "Khoa học dữ liệu",
                                type: "Khối A00, A01",
                                description: "Phân tích dữ liệu lớn, học máy và trí tuệ nhân tạo.",
                                avgScore: 26.0,
                                employmentRate: 91
                            },
                            {
                                id: 6,
                                name: "Tài chính - Ngân hàng",
                                type: "Khối A00, D01",
                                description: "Quản lý tài chính, đầu tư và hoạt động ngân hàng.",
                                avgScore: 25.2,
                                employmentRate: 87
                            }
                        ].map((major) => (
                            <Link to={`/major/${major.id}`} key={major.id} className="sm-major-card">
                                <div className="sm-major-header">
                                    <h3>{major.name}</h3>
                                    <span className="sm-major-type">{major.type}</span>
                                </div>
                                <div className="sm-major-content">
                                    <p>{major.description}</p>
                                    <div className="sm-major-stats">
                                        <div className="sm-stat-item">
                                            <div className="sm-stat-label">Điểm chuẩn</div>
                                            <div className="sm-stat-value">{major.avgScore}</div>
                                        </div>
                                        <div className="sm-stat-item">
                                            <div className="sm-stat-label">Tỷ lệ việc làm</div>
                                            <div className="sm-stat-value">{major.employmentRate}%</div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchMajorsPage;
