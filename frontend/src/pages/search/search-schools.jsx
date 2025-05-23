import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/pages/search-schools.css';
import { schoolService } from '../../services/schoolService';
import schoolDetailService from '../../services/schoolDetailService';

// Move sorting functions outside component
const getInstitutionTypePriority = (schoolName) => {
    schoolName = schoolName.toLowerCase();
    if (schoolName.includes('đại học')) return 1;
    if (schoolName.includes('học viện')) return 2;
    if (schoolName.includes('cao đẳng')) return 3;
    return 4;
};

const sortSchoolsByType = (schools) => {
    return [...schools].sort((a, b) => {
        const priorityA = getInstitutionTypePriority(a.school_name);
        const priorityB = getInstitutionTypePriority(b.school_name);
        return priorityA - priorityB;
    });
};

const getOwnershipLabel = (ownership) => {
    const labels = {
        'Công lập': 'Công lập',
        'Tư thục': 'Tư thục',
        'Dân lập': 'Dân lập',
    };
    return labels[ownership] || 'Chưa cập nhật';
};

const SearchSchoolsPage = () => {
    const [filters, setFilters] = useState({
        type: 'all',
        region: 'all',
        tuition: 'all',
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [schools, setSchools] = useState([]);
    const [filteredSchools, setFilteredSchools] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [admissionScores, setAdmissionScores] = useState({}); // Add this state

    // Use memoized sorted schools
    const sortedSchools = useMemo(() => sortSchoolsByType(schools), [schools]);

    useEffect(() => {
        const fetchSchools = async () => {
            setLoading(true);
            const result = await schoolService.getAll();
            if (result.success) {
                setSchools(result.data);
            } else {
                setError(result.error);
            }
            setLoading(false);
        };
        fetchSchools();
    }, []);

    useEffect(() => {
        setFilteredSchools(sortedSchools);
    }, [sortedSchools]);

    useEffect(() => {
        const fetchAdmissionScores = async () => {
            const scorePromises = schools.map((school) =>
                schoolDetailService.getSchoolScores(school.id),
            );

            const results = await Promise.all(scorePromises);

            const scoreMap = results.reduce((acc, result, index) => {
                if (result.success) {
                    const schoolId = schools[index].id;
                    const scores = Object.values(result.data)
                        .flat()
                        .map((s) => s.score);

                    if (scores.length > 0) {
                        acc[schoolId] = {
                            min: Math.min(...scores),
                            max: Math.max(...scores),
                        };
                    }
                }
                return acc;
            }, {});

            setAdmissionScores(scoreMap);
        };

        if (schools.length > 0) {
            fetchAdmissionScores();
        }
    }, [schools]);

    const handleSearch = useCallback(
        (e) => {
            e.preventDefault();
            setCurrentPage(1);
            setError(null);

            try {
                if (!schools || !Array.isArray(schools)) {
                    throw new Error('Dữ liệu trường không hợp lệ');
                }

                let filtered = [...schools];
                const query = searchQuery.trim().toLowerCase();

                // Filter by search query
                if (query) {
                    filtered = filtered.filter((school) => {
                        try {
                            return (
                                (school.school_name &&
                                    school.school_name
                                        .toLowerCase()
                                        .includes(query)) ||
                                (school.location &&
                                    school.location
                                        .toLowerCase()
                                        .includes(query)) ||
                                (school.id &&
                                    school.id.toLowerCase().includes(query))
                            );
                        } catch (err) {
                            console.error('Lỗi khi lọc trường:', err);
                            return false;
                        }
                    });
                }

                // Apply type filter
                if (filters.type !== 'all') {
                    filtered = filtered.filter((school) => {
                        if (filters.type === 'public') {
                            return school.ownership === 'Công lập';
                        } else if (filters.type === 'private') {
                            return ['Tư thục', 'Dân lập'].includes(
                                school.ownership,
                            );
                        }
                        return true;
                    });
                }

                // Apply region filter
                if (filters.region !== 'all') {
                    const regionMapping = {
                        north: [
                            'hà nội',
                            'bắc',
                            'thái nguyên',
                            'hải phòng',
                            'quảng ninh',
                        ],
                        central: [
                            'đà nẵng',
                            'huế',
                            'nghệ an',
                            'khánh hòa',
                            'thừa thiên',
                        ],
                        south: [
                            'hồ chí minh',
                            'cần thơ',
                            'đồng nai',
                            'bình dương',
                        ],
                    };

                    filtered = filtered.filter((school) => {
                        const location = school.location?.toLowerCase() || '';
                        return regionMapping[filters.region].some((keyword) =>
                            location.includes(keyword),
                        );
                    });
                }

                setFilteredSchools(sortSchoolsByType(filtered));
            } catch (err) {
                console.error('Search error:', err);
                setError(err.message || 'Có lỗi xảy ra khi tìm kiếm');
                setFilteredSchools([]);
            }
        },
        [schools, searchQuery, filters],
    );

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
        if (!e.target.value.trim()) {
            setFilteredSchools(schools); // Reset to all schools if search is cleared
        }
    };

    const paginateSchools = (filtered) => {
        const indexOfLastSchool = currentPage * itemsPerPage;
        const indexOfFirstSchool = indexOfLastSchool - itemsPerPage;
        return filtered.slice(indexOfFirstSchool, indexOfLastSchool);
    };

    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(filteredSchools.length / itemsPerPage);

    return (
        <div className="ssh-page">
            <section className="search-header">
                <h1>Khám phá trường đại học</h1>
                <p>
                    Tìm hiểu và so sánh các trường đại học, cao đẳng trên toàn
                    quốc
                </p>
                <form className="search-box" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên trường, mã trường..."
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
                        <strong>400+</strong> ngành học
                    </span>
                    <span>
                        <strong>1,200+</strong> đánh giá
                    </span>
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
                        <div className="ssh-filter-actions">
                            <button
                                className="ssh-filter-apply-btn"
                                onClick={handleSearch}
                            >
                                Áp dụng bộ lọc
                            </button>
                            <button
                                className="filter-reset-btn"
                                onClick={() => {
                                    setFilters({
                                        type: 'all',
                                        region: 'all',
                                        tuition: 'all',
                                    });
                                    setSearchQuery('');
                                    setFilteredSchools(schools);
                                }}
                            >
                                Đặt lại
                            </button>
                        </div>
                    </aside>

                    <div className="ssh-results-panel">
                        {error && (
                            <div className="ssh-error-message">
                                <i className="fas fa-exclamation-circle"></i>
                                {error}
                            </div>
                        )}
                        <div className="ssh-results-header">
                            <div className="ssh-found-count">
                                Tìm thấy{' '}
                                <strong>{filteredSchools.length}</strong> trường
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
                            {loading ? (
                                <div>Loading...</div>
                            ) : error ? (
                                <div className="error-message">{error}</div>
                            ) : (
                                paginateSchools(filteredSchools).map(
                                    (school) => (
                                        <Link
                                            to={`/school/detail/${school.id}`}
                                            key={school.id}
                                            className="ssh-school-card"
                                        >
                                            <div className="ssh-school-image">
                                                <img
                                                    src={
                                                        school.school_img ||
                                                        `/images/school-default.jpg`
                                                    }
                                                    alt={school.school_name}
                                                />
                                            </div>
                                            <div className="ssh-school-content">
                                                <div className="ssh-school-main">
                                                    <div className="ssh-school-header">
                                                        <h3 className="ssh-school-name">
                                                            {school.school_name}
                                                        </h3>
                                                        <span className="ssh-school-code">
                                                            {school.id}
                                                        </span>
                                                    </div>
                                                    <div className="ssh-school-info">
                                                        <div className="ssh-info-item">
                                                            <i className="fas fa-map-marker-alt"></i>
                                                            <span>
                                                                {school.location ||
                                                                    'Chưa cập nhật'}
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
                                                            {admissionScores[
                                                                school.id
                                                            ]
                                                                ? `${admissionScores[
                                                                      school.id
                                                                  ].min.toFixed(
                                                                      1,
                                                                  )}-${admissionScores[
                                                                      school.id
                                                                  ].max.toFixed(
                                                                      1,
                                                                  )}`
                                                                : 'Chưa cập nhật'}
                                                        </div>
                                                        <div className="ssh-stat-range">
                                                            Năm 2024
                                                        </div>
                                                    </div>
                                                    <div className="ssh-stat-item">
                                                        <div className="ssh-stat-label">
                                                            Loại trường
                                                        </div>
                                                        <div className="ssh-stat-value">
                                                            {getOwnershipLabel(
                                                                school.ownership,
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ),
                                )
                            )}
                        </div>

                        <div className="ssh-pagination">
                            <button
                                onClick={() =>
                                    handlePagination(currentPage - 1)
                                }
                                disabled={currentPage === 1}
                                className="pagination-btn"
                            >
                                Trước
                            </button>
                            {[...Array(totalPages)].map((_, index) => {
                                const pageNumber = index + 1;
                                if (
                                    pageNumber === 1 ||
                                    pageNumber === totalPages ||
                                    (pageNumber >= currentPage - 2 &&
                                        pageNumber <= currentPage + 2)
                                ) {
                                    return (
                                        <button
                                            key={pageNumber}
                                            className={`pagination-btn ${currentPage === pageNumber ? 'active' : ''}`}
                                            onClick={() =>
                                                handlePagination(pageNumber)
                                            }
                                        >
                                            {pageNumber}
                                        </button>
                                    );
                                }
                                if (
                                    pageNumber === currentPage - 3 ||
                                    pageNumber === currentPage + 3
                                ) {
                                    return (
                                        <span
                                            key={pageNumber}
                                            className="pagination-ellipsis"
                                        >
                                            ...
                                        </span>
                                    );
                                }
                                return null;
                            })}
                            <button
                                onClick={() =>
                                    handlePagination(currentPage + 1)
                                }
                                disabled={currentPage === totalPages}
                                className="pagination-btn"
                            >
                                Sau
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchSchoolsPage;
