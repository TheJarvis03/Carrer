import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/search-majors.css';
import { majorService } from '../../services/majorService';

const ITEMS_PER_PAGE = 10;

const SearchMajorsPage = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [majors, setMajors] = useState([]);
    const [originalMajors, setOriginalMajors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        field: 'all',
        examGroup: 'all',
        opportunity: 'all',
    });
    const [majorGroups, setMajorGroups] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: ITEMS_PER_PAGE,
    });
    const [error, setError] = useState('');
    const [selectedMajor, setSelectedMajor] = useState(null);

    const filterOptions = {
        examGroups: [
            { value: 'A00', label: 'A00 (Toán, Lý, Hóa)' },
            { value: 'A01', label: 'A01 (Toán, Lý, Anh)' },
            { value: 'B00', label: 'B00 (Toán, Hóa, Sinh)' },
            { value: 'D01', label: 'D01 (Toán, Văn, Anh)' },
        ],
    };

    useEffect(() => {
        const fetchMajors = async () => {
            try {
                setLoading(true);
                const response = await majorService.getAll();
                if (response.success) {
                    setMajors(response.data);
                    setOriginalMajors(response.data);
                } else {
                    console.error('Failed to fetch majors:', response.error);
                }
            } catch (error) {
                console.error('Error:', error);
                setMajors([]);
            } finally {
                setLoading(false);
            }
        };
        fetchMajors();
    }, []);

    useEffect(() => {
        const fetchMajorGroups = async () => {
            const response = await majorService.getMajorGroups();
            if (response.success) {
                setMajorGroups(response.data);
            }
        };
        fetchMajorGroups();
    }, []);

    useEffect(() => {
        // Update pagination when majors change
        setPagination((prev) => ({
            ...prev,
            totalItems: majors.length,
            totalPages: Math.ceil(majors.length / ITEMS_PER_PAGE),
        }));
    }, [majors]);

    const handleApplyFilters = () => {
        let results = [...originalMajors];

        if (filters.field !== 'all') {
            results = results.filter(
                (major) => major.group_id === filters.field,
            );
        }

        if (filters.examGroup !== 'all') {
            results = results.filter((major) =>
                major.exam_groups?.includes(filters.examGroup),
            );
        }

        if (filters.opportunity !== 'all') {
            results = results.filter(
                (major) => major.job_opportunity === filters.opportunity,
            );
        }

        setMajors(results);
        setPagination((prev) => ({
            ...prev,
            currentPage: 1,
        }));
    };

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > pagination.totalPages) return;
        setPagination((prev) => ({
            ...prev,
            currentPage: newPage,
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

        // Add first page button if needed
        if (startPage > 1) {
            pages.push(
                <button
                    key={1}
                    onClick={() => handlePageChange(1)}
                    className="pagination-btn"
                >
                    1
                </button>,
            );
            if (startPage > 2)
                pages.push(<span key="start-ellipsis">...</span>);
        }

        // Add page numbers
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`pagination-btn ${pagination.currentPage === i ? 'active' : ''}`}
                >
                    {i}
                </button>,
            );
        }

        // Add last page button if needed
        if (endPage < pagination.totalPages) {
            if (endPage < pagination.totalPages - 1)
                pages.push(<span key="end-ellipsis">...</span>);
            pages.push(
                <button
                    key={pagination.totalPages}
                    onClick={() => handlePageChange(pagination.totalPages)}
                    className="pagination-btn"
                >
                    {pagination.totalPages}
                </button>,
            );
        }

        return pages;
    };

    // Calculate current items to display
    const getCurrentItems = () => {
        const startIndex =
            (pagination.currentPage - 1) * pagination.itemsPerPage;
        const endIndex = startIndex + pagination.itemsPerPage;
        return majors.slice(startIndex, endIndex);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (searchQuery.trim()) {
                const response = await majorService.searchMajors(searchQuery);
                if (response.success) {
                    setMajors(response.data);
                    setPagination((prev) => ({
                        ...prev,
                        currentPage: 1,
                        totalItems: response.data.length,
                        totalPages: Math.ceil(
                            response.data.length / ITEMS_PER_PAGE,
                        ),
                    }));
                } else {
                    throw new Error(response.error || 'Lỗi tìm kiếm');
                }
            } else {
                setMajors(originalMajors);
                setPagination((prev) => ({
                    ...prev,
                    currentPage: 1,
                    totalItems: originalMajors.length,
                    totalPages: Math.ceil(
                        originalMajors.length / ITEMS_PER_PAGE,
                    ),
                }));
            }
        } catch (error) {
            console.error('Search error:', error);
            setError(error.message);
            setMajors([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
        if (!e.target.value.trim()) {
            setMajors(originalMajors);
        }
    };

    const handleMajorClick = (majorCode) => {
        navigate(`/major/detail/${majorCode}`);
    };

    return (
        <div className="sma-page">
            <section className="search-header">
                <h1>Khám phá ngành học</h1>
                <p>Tìm hiểu và so sánh các ngành học phù hợp với bạn</p>
                <form className="search-box" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên ngành, mã ngành, khối thi..."
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
                        <strong>{majorGroups.length}</strong> khối ngành
                    </span>
                    <span>
                        <strong>{majors.length}</strong> ngành học
                    </span>
                    <span>
                        <strong>92%</strong> tỉ lệ việc làm
                    </span>
                </div>
            </section>

            <div className="sma-content">
                <div className="sma-grid">
                    <aside className="sma-sidebar">
                        <div className="sma-filter-panel">
                            <h3>Bộ lọc tìm kiếm</h3>
                            <div className="sma-filter-group">
                                <label>Khối ngành</label>
                                <select
                                    value={filters.field}
                                    onChange={(e) =>
                                        setFilters({
                                            ...filters,
                                            field: e.target.value,
                                        })
                                    }
                                >
                                    <option value="all">
                                        Tất cả khối ngành
                                    </option>
                                    {majorGroups.map((group) => (
                                        <option
                                            key={group.group_id}
                                            value={group.group_id}
                                        >
                                            {group.group_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="sma-filter-group">
                                <label>Khối thi</label>
                                <select
                                    value={filters.examGroup}
                                    onChange={(e) =>
                                        setFilters({
                                            ...filters,
                                            examGroup: e.target.value,
                                        })
                                    }
                                >
                                    <option value="all">Tất cả</option>
                                    {filterOptions.examGroups.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="sma-filter-group">
                                <label>Cơ hội việc làm</label>
                                <select
                                    value={filters.opportunity}
                                    onChange={(e) =>
                                        setFilters({
                                            ...filters,
                                            opportunity: e.target.value,
                                        })
                                    }
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
                                <button
                                    className="filter-reset-btn"
                                    onClick={() => {
                                        setFilters({
                                            field: 'all',
                                            examGroup: 'all',
                                            opportunity: 'all',
                                        });
                                        setSearchQuery('');
                                        setMajors(originalMajors);
                                    }}
                                >
                                    Đặt lại
                                </button>
                            </div>
                        </div>
                    </aside>

                    <div className="sma-results-panel">
                        {error && (
                            <div className="sma-error-message">
                                <i className="fas fa-exclamation-circle"></i>
                                {error}
                            </div>
                        )}
                        <div className="sma-results-header">
                            <div className="sma-results-count">
                                Tìm thấy <strong>{majors.length}</strong> ngành
                                học
                            </div>
                        </div>
                        {loading ? (
                            <div>Đang tải dữ liệu...</div>
                        ) : majors.length === 0 ? (
                            <div>Không có dữ liệu</div>
                        ) : (
                            <>
                                <div className="sma-majors-grid">
                                    {getCurrentItems().map((major) => (
                                        <div
                                            key={major.code}
                                            className="sma-major-card"
                                            onClick={() =>
                                                handleMajorClick(major.code)
                                            }
                                        >
                                            <div className="sma-major-header">
                                                <h4 className="sma-major-name">
                                                    {major.major_name}
                                                </h4>
                                                <span className="sma-major-code">
                                                    Mã ngành: {major.code}
                                                </span>
                                            </div>
                                            <div className="sma-major-content">
                                                <div className="sma-major-info">
                                                    <p className="sma-major-row">
                                                        <span className="label">
                                                            Khối ngành:
                                                        </span>
                                                        <span className="value">
                                                            {major.group_name}
                                                        </span>
                                                    </p>
                                                    {major.exam_groups &&
                                                        major.exam_groups
                                                            .length > 0 && (
                                                            <p className="sma-major-row">
                                                                <span className="label">
                                                                    Khối thi:
                                                                </span>
                                                                <span className="value">
                                                                    {major.exam_groups.join(
                                                                        ', ',
                                                                    )}
                                                                </span>
                                                            </p>
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

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

            <div className="major-detail-container">
                {selectedMajor ? (
                    <div className="major-detail">
                        <h2>{selectedMajor.major_name}</h2>
                        <div className="major-code">
                            Mã ngành: {selectedMajor.major_code}
                        </div>

                        <div className="major-section">
                            <h3>Mô tả</h3>
                            <p>
                                {selectedMajor.description ||
                                    'Chưa có thông tin'}
                            </p>
                        </div>

                        <div className="major-section">
                            <h3>Cơ hội việc làm</h3>
                            <p>
                                {selectedMajor.job_opportunities ||
                                    'Chưa có thông tin'}
                            </p>
                        </div>

                        <div className="major-section">
                            <h3>Mức lương</h3>
                            <p>
                                {selectedMajor.salary_range ||
                                    'Chưa có thông tin'}
                            </p>
                        </div>

                        <button
                            className="back-button"
                            onClick={() => setSelectedMajor(null)}
                        >
                            Quay lại danh sách
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default SearchMajorsPage;
