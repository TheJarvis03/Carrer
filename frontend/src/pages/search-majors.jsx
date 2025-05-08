import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/search-majors.css';
import { majorService } from '../services/majorService';

const ITEMS_PER_PAGE = 6;

const SearchMajorsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [majors, setMajors] = useState([]);
    const [originalMajors, setOriginalMajors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        field: 'all',
        examGroup: 'all',
        opportunity: 'all',
    });
    const [majorGroups, setMajorGroups] = useState([]);

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

        setMajors(results.slice(0, ITEMS_PER_PAGE));
        setCurrentPage(1);
    };

    // Calculate current items to display
    const getCurrentItems = () => {
        const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
        const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
        return majors.slice(indexOfFirstItem, indexOfLastItem);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery) {
            setMajors(originalMajors);
            return;
        }

        const results = originalMajors.filter(
            (major) =>
                major.major_name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                major.major_code
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
        );

        setMajors(results);
    };

    return (
        <div className="sma-page">
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

            <div className="sma-content">
                <div className="sma-grid">
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
                                <option value="all">Tất cả khối ngành</option>
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
                                    setMajors(
                                        originalMajors.slice(0, ITEMS_PER_PAGE),
                                    );
                                }}
                            >
                                Đặt lại
                            </button>
                        </div>
                    </div>

                    <div className="sma-results-panel">
                        {loading ? (
                            <div>Đang tải dữ liệu...</div>
                        ) : majors.length === 0 ? (
                            <div>Không có dữ liệu</div>
                        ) : (
                            <div className="sma-majors-grid">
                                {getCurrentItems().map((major) => (
                                    <Link
                                        to={`/major/${major.major_name}`}
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
                                                                    key={group}
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
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchMajorsPage;
