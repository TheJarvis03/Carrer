import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { admissionScoreService } from '../../services/admissionScoreService';
import '../../styles/pages/search-scores.css';

const SearchScoresPage = () => {
    const [filters, setFilters] = useState({
        examGroup: 'all',
        scoreRange: 'all',
        region: 'all',
        year: '2024',
        page: 1,
    });
    const [searchQuery, setSearchQuery] = useState('');  // Separate search query state
    const [scores, setScores] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10, // Changed from 20 to 10
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchScores = useCallback(async (params) => {
        try {
            setLoading(true);
            setError(null);
            const response = await admissionScoreService.getScores(params);
            
            if (response.success) {
                setScores(response.data);
                setPagination(response.pagination);
            } else {
                setError('Không tìm thấy kết quả phù hợp');
                setScores([]);
            }
        } catch (err) {
            setError('Đã xảy ra lỗi khi tìm kiếm');
            setScores([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial load
    useEffect(() => {
        fetchScores(filters);
    }, [fetchScores, filters]);

    const handleSearch = useCallback((e) => {
        e?.preventDefault();
        const searchFilters = {
            ...filters,
            page: 1,
            keyword: searchQuery.trim()
        };

        if (!searchQuery.trim()) {
            delete searchFilters.keyword;
        }

        fetchScores(searchFilters);
    }, [filters, searchQuery, fetchScores]);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
        if (!e.target.value.trim()) {
            fetchScores(filters); // Reset to default filters if search is cleared
        }
    };

    const handleFilterChange = (field, value) => {
        setFilters(prev => ({
            ...prev,
            [field]: value,
            page: field !== 'page' ? 1 : value // Reset page when changing filters except for pagination
        }));
    };

    const handlePageChange = (newPage) => {
        setFilters((prev) => ({
            ...prev,
            page: newPage,
        }));
    };

    const renderPaginationButtons = () => {
        const MAX_VISIBLE_PAGES = 5;
        const pages = [];
        let startPage = 1;
        let endPage = pagination.totalPages;

        if (pagination.totalPages > MAX_VISIBLE_PAGES) {
            const leftOffset = Math.floor(MAX_VISIBLE_PAGES / 2);
            const rightOffset = MAX_VISIBLE_PAGES - leftOffset - 1;

            if (pagination.currentPage <= leftOffset) {
                endPage = MAX_VISIBLE_PAGES;
            } else if (
                pagination.currentPage >=
                pagination.totalPages - rightOffset
            ) {
                startPage = pagination.totalPages - MAX_VISIBLE_PAGES + 1;
            } else {
                startPage = pagination.currentPage - leftOffset;
                endPage = pagination.currentPage + rightOffset;
            }
        }

        if (startPage > 1) {
            pages.push(
                <button
                    key="1"
                    className="pagination-btn"
                    onClick={() => handlePageChange(1)}
                >
                    1
                </button>,
            );
            if (startPage > 2) {
                pages.push(
                    <span key="start-ellipsis" className="pagination-ellipsis">
                        ...
                    </span>,
                );
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    className={`pagination-btn ${pagination.currentPage === i ? 'active' : ''}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>,
            );
        }

        if (endPage < pagination.totalPages) {
            if (endPage < pagination.totalPages - 1) {
                pages.push(
                    <span key="end-ellipsis" className="pagination-ellipsis">
                        ...
                    </span>,
                );
            }
            pages.push(
                <button
                    key={pagination.totalPages}
                    className="pagination-btn"
                    onClick={() => handlePageChange(pagination.totalPages)}
                >
                    {pagination.totalPages}
                </button>,
            );
        }

        return pages;
    };

    return (
        <div className="ss-page">
            <section className="search-header">
                <h1>Tra cứu điểm chuẩn</h1>
                <p>Thông tin điểm chuẩn các trường qua các năm</p>
                <form className="search-box" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Nhập tên trường, mã trường hoặc mã ngành..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                    <button type="submit">
                        <i className="fas fa-search"></i>
                        Tìm kiếm
                    </button>
                </form>
                <div className="search-stats">
                    <span>
                        <strong>300+</strong> trường
                    </span>
                    <span>
                        <strong>400+</strong> ngành
                    </span>
                    <span>
                        <strong>5</strong> năm gần nhất
                    </span>
                </div>
            </section>

            <div className="ss-content">
                <div className="ss-grid">
                    <aside className="filter-panel">
                        <h3>Bộ lọc tìm kiếm</h3>
                        <div className="filter-group">
                            <label>Khối thi</label>
                            <select
                                value={filters.examGroup}
                                onChange={(e) =>
                                    handleFilterChange(
                                        'examGroup',
                                        e.target.value,
                                    )
                                }
                            >
                                <option value="all">Tất cả khối</option>
                                <option value="A00">A00 (Toán, Lý, Hóa)</option>
                                <option value="A01">A01 (Toán, Lý, Anh)</option>
                                <option value="D01">
                                    D01 (Toán, Văn, Anh)
                                </option>
                            </select>
                        </div>
                        <div className="filter-group">
                            <label>Mức điểm</label>
                            <select
                                value={filters.scoreRange}
                                onChange={(e) =>
                                    handleFilterChange(
                                        'scoreRange',
                                        e.target.value,
                                    )
                                }
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
                                onChange={(e) =>
                                    handleFilterChange('region', e.target.value)
                                }
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
                                onClick={handleSearch} // Changed from handleApplyFilters to handleSearch
                            >
                                Áp dụng bộ lọc
                            </button>
                            <button
                                className="filter-reset-btn"
                                onClick={() => {
                                    setFilters({
                                        examGroup: 'all',
                                        scoreRange: 'all',
                                        region: 'all',
                                        year: '2024',
                                        page: 1,
                                    });
                                    fetchScores();
                                }}
                            >
                                Đặt lại
                            </button>
                        </div>
                    </aside>

                    <div className="ss-scores-panel">
                        {loading ? (
                            <div className="loading-state">
                                Đang tải dữ liệu...
                            </div>
                        ) : error ? (
                            <div className="error-state">
                                <p>{error}</p>
                                <button
                                    className="retry-btn"
                                    onClick={handleSearch}
                                >
                                    Thử lại
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="ss-scores-header">
                                    <div className="year-filter">
                                        {[2024, 2023, 2022, 2021, 2020].map(
                                            (year) => (
                                                <button
                                                    key={year}
                                                    className={
                                                        filters.year ===
                                                        year.toString()
                                                            ? 'active'
                                                            : ''
                                                    }
                                                    onClick={() =>
                                                        handleFilterChange(
                                                            'year',
                                                            year.toString(),
                                                        )
                                                    }
                                                >
                                                    {year}
                                                </button>
                                            ),
                                        )}
                                    </div>
                                    <div className="total-results">
                                        Tổng số kết quả:{' '}
                                        <strong>{pagination.totalItems}</strong>
                                    </div>
                                </div>

                                <table className="ss-scores-table">
                                    <thead>
                                        <tr>
                                            <th>Trường</th>
                                            <th>Mã ngành</th>
                                            <th>Ngành học</th>
                                            <th>Tổ hợp môn</th>
                                            <th>Điểm chuẩn</th>
                                            <th>Ghi chú</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {scores.map((score, index) => (
                                            <tr key={score._id || index}>
                                                <td
                                                    className="truncate"
                                                    title={score.school_name}
                                                >
                                                    <Link
                                                        to={`/school/detail/${score.school_code}`}
                                                        className="school-link"
                                                    >
                                                        {score.school_name}
                                                    </Link>
                                                </td>
                                                <td>{score.major_code}</td>
                                                <td
                                                    className="truncate"
                                                    title={score.major_name}
                                                >
                                                    {score.major_name}
                                                </td>
                                                <td className="exam-group">
                                                    {score.subject_group}
                                                </td>
                                                <td className="score-value">
                                                    {score.score}
                                                </td>
                                                <td
                                                    className="note-cell"
                                                    title={score.note}
                                                >
                                                    {score.note}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="pagination">
                                    <button
                                        className="pagination-btn"
                                        disabled={pagination.currentPage === 1}
                                        onClick={() =>
                                            handlePageChange(
                                                pagination.currentPage - 1,
                                            )
                                        }
                                    >
                                        Trước
                                    </button>

                                    {renderPaginationButtons()}

                                    <button
                                        className="pagination-btn"
                                        disabled={
                                            pagination.currentPage ===
                                            pagination.totalPages
                                        }
                                        onClick={() =>
                                            handlePageChange(
                                                pagination.currentPage + 1,
                                            )
                                        }
                                    >
                                        Sau
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchScoresPage;
