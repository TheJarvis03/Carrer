import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/pages/search-majors.css';
import { majorService } from '../../services/majorService';

const ITEMS_PER_PAGE = 6;

const SearchMajorsPage = () => {
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
            } else if (pagination.currentPage >= pagination.totalPages - rightOffset) {
                startPage = pagination.totalPages - MAX_VISIBLE_PAGES + 1;
            } else {
                startPage = pagination.currentPage - leftOffset;
                endPage = pagination.currentPage + rightOffset;
            }
        }

        // Add first page button if needed
        if (startPage > 1) {
            pages.push(
                <button key={1} onClick={() => handlePageChange(1)} className="pagination-btn">
                    1
                </button>
            );
            if (startPage > 2) pages.push(<span key="start-ellipsis">...</span>);
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
                </button>
            );
        }

        // Add last page button if needed
        if (endPage < pagination.totalPages) {
            if (endPage < pagination.totalPages - 1) pages.push(<span key="end-ellipsis">...</span>);
            pages.push(
                <button
                    key={pagination.totalPages}
                    onClick={() => handlePageChange(pagination.totalPages)}
                    className="pagination-btn"
                >
                    {pagination.totalPages}
                </button>
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

    const handleSearch = (e) => {
        e.preventDefault();
        
        try {
            let results = [...originalMajors];
            const query = searchQuery.trim();

            if (query) {
                results = results.filter(major => 
                    major.major_name.toLowerCase().includes(query.toLowerCase()) ||
                    major.code?.toString().toLowerCase().includes(query.toLowerCase()) ||
                    major.group_name?.toLowerCase().includes(query.toLowerCase()) ||
                    major.exam_groups?.some(group => 
                        group.toLowerCase().includes(query.toLowerCase())
                    )
                );
            }

            // Combine with current filters
            if (filters.field !== 'all') {
                results = results.filter(major => major.group_id === filters.field);
            }
            if (filters.examGroup !== 'all') {
                results = results.filter(major => 
                    major.exam_groups?.includes(filters.examGroup)
                );
            }
            if (filters.opportunity !== 'all') {
                results = results.filter(major => 
                    major.job_opportunity === filters.opportunity
                );
            }

            setMajors(results);
            setPagination(prev => ({
                ...prev,
                currentPage: 1,
                totalItems: results.length,
                totalPages: Math.ceil(results.length / ITEMS_PER_PAGE)
            }));

        } catch (error) {
            console.error('Search error:', error);
            setMajors([]);
        }
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
        if (!e.target.value.trim()) {
            setMajors(originalMajors);
        }
    };

    return (
        <div className="sma-page">
            <section className="search-header">
                <h1>Tìm kiếm ngành học</h1>
                <p>Khám phá các ngành học và cơ hội nghề nghiệp tương lai</p>
                <form className="search-bar" onSubmit={handleSearch}>
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
                                        <Link
                                            to={`/major/${major.code}`}
                                            key={major.code}
                                            className="sma-major-card"
                                        >
                                            <div className="sma-major-header">
                                                <h4 className="sma-major-name">
                                                    {major.major_name}
                                                </h4>
                                                <span className="sma-major-code">
                                                    Mã: {major.code}
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
                                                    <p>
                                                        <span className="label">
                                                            Khối thi
                                                        </span>
                                                        <div className="sma-exam-groups">
                                                            {major.exam_groups?.map(
                                                                (group) => (
                                                                    <span
                                                                        key={
                                                                            group
                                                                        }
                                                                        className="sma-exam-group"
                                                                    >
                                                                        {group}
                                                                    </span>
                                                                ),
                                                            )}
                                                        </div>
                                                    </p>
                                                </div>
                                                <div
                                                    className={`sma-job-opportunity ${major.job_opportunity}`}
                                                >
                                                    <span className="label">
                                                        Cơ hội việc làm
                                                    </span>
                                                    <span className="value">
                                                        {major.job_opportunity ===
                                                        'high'
                                                            ? 'Cao'
                                                            : major.job_opportunity ===
                                                              'medium'
                                                            ? 'Trung bình'
                                                            : 'Thấp'}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
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
        </div>
    );
};

export default SearchMajorsPage;
