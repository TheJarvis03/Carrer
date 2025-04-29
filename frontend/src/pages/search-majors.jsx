import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/search-majors.css';
import { majorService } from '../services/majorService';

const SearchMajorsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [majors, setMajors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMajors = async () => {
          try {
            setLoading(true);
            const response = await majorService.getAll();
            // response.data là payload gốc
            const payload = response.data;            
            // payload.data là mảng nhóm ngành (hoặc ngành con nếu bạn đã flatten ở server)
            if (response.success && Array.isArray(payload.data)) {
              setMajors(payload.data);
            } else {
              console.error('Unexpected payload:', payload);
              setMajors([]);
            }
          } catch (error) {
            console.error('Fetch error:', error);
            setMajors([]);
          } finally {
            setLoading(false);
          }
        };
        fetchMajors();
      }, []);
      

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery) return;

        const results = majors.filter(major => 
            major.major_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            major.major_code.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setMajors(results);
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
                                // value={filters.field}
                                // onChange={(e) =>
                                //     setFilters({
                                //         ...filters,
                                //         field: e.target.value,
                                //     })
                                // }
                            >
                                <option value="all">Tất cả</option>
                                {/* {filterOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))} */}
                            </select>
                        </div>
                        <div className="filter-group">
                            <label>Khối thi</label>
                            <select
                                // value={filters.examGroup}
                                // onChange={(e) =>
                                //     setFilters({
                                //         ...filters,
                                //         examGroup: e.target.value,
                                //     })
                                // }
                            >
                                <option value="all">Tất cả</option>
                                <option value="a00">Khối A00</option>
                                <option value="b00">Khối B00</option>
                            </select>
                        </div>
                        <div className="filter-group">
                            <label>Cơ hội việc làm</label>
                            <select
                                // value={filters.opportunity}
                                // onChange={(e) =>
                                //     setFilters({
                                //         ...filters,
                                //         opportunity: e.target.value,
                                //     })
                                // }
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
                                // onClick={handleApplyFilters}
                            >
                                Áp dụng bộ lọc
                            </button>
                        </div>
                    </div>

                    <div className="sm-results-panel">
                        {loading ? (
                            <div>Đang tải dữ liệu...</div>
                        ) : majors.length === 0 ? (
                            <div>Không có dữ liệu</div>
                        ) : (
                            <div className="majors-grid">
                                {majors.map((major) => (
                                    <Link 
                                        to={`/major/${major.major_code}`}
                                        key={major.major_code} 
                                        className="sm-major-card"
                                    >
                                        <div className="sm-major-header">
                                            <h4>{major.major_name}</h4>
                                            <span className="major-code">
                                                Mã ngành: {major.major_code}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchMajorsPage;
