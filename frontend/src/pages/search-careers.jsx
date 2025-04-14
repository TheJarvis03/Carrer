import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/search-careers.css';

const SearchCareersPage = () => {
  const [filters, setFilters] = useState({
    field: 'all',
    salary: 'all',
    experience: 'all',
  });

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApplyFilters = () => {
    console.log('Applying filters:', filters);
  };

  return (
    <div className="sc-page">
      <section className="search-header">
        <h1>Tìm kiếm nghề nghiệp</h1>
        <p>Khám phá cơ hội nghề nghiệp và định hướng tương lai</p>
      </section>

      <div className="sc-content">
        <div className="sc-grid">
          <div className="filter-panel">
            <h3>Bộ lọc tìm kiếm</h3>
            <div className="filter-group">
              <label>Lĩnh vực</label>
              <select
                value={filters.field}
                onChange={(e) => handleFilterChange('field', e.target.value)}
              >
                <option value="all">Tất cả lĩnh vực</option>
                <option value="it">Công nghệ thông tin</option>
                <option value="finance">Tài chính - Ngân hàng</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Mức lương</label>
              <select
                value={filters.salary}
                onChange={(e) => handleFilterChange('salary', e.target.value)}
              >
                <option value="all">Tất cả</option>
                <option value="under10">Dưới 10 triệu</option>
                <option value="10to20">10 - 20 triệu</option>
                <option value="above20">Trên 20 triệu</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Kinh nghiệm</label>
              <select
                value={filters.experience}
                onChange={(e) =>
                  handleFilterChange('experience', e.target.value)
                }
              >
                <option value="all">Tất cả</option>
                <option value="none">Chưa có kinh nghiệm</option>
                <option value="1to3">1-3 năm</option>
                <option value="above3">Trên 3 năm</option>
              </select>
            </div>
            <div className="filter-actions">
              <button className="filter-apply-btn" onClick={handleApplyFilters}>
                Áp dụng bộ lọc
              </button>
            </div>
          </div>

          <div className="sc-results-panel">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Link
                  to={`/career/${i + 1}`}
                  key={i}
                  className="sc-career-card"
                >
                  <div className="career-icon">💼</div>
                  <div className="sc-career-content">
                    <h3>Nghề nghiệp {i + 1}</h3>
                    <p>Mô tả về nghề nghiệp và cơ hội...</p>
                    <div className="career-stats">
                      <div className="stat">
                        <span>Mức lương: </span>
                        <strong>15-20tr</strong>
                      </div>
                      <div className="stat">
                        <span>Kinh nghiệm: </span>
                        <strong>1-3 năm</strong>
                      </div>
                      <div className="stat">
                        <span>Cơ hội: </span>
                        <strong>Cao</strong>
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

export default SearchCareersPage;
