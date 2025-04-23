import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/search-majors.css';
import { majorService } from '../services/majorService';

const SearchMajorsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        field: 'all',
        examGroup: 'all',
        opportunity: 'all',
    });
    const [fields, setFields] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFields = async () => {
            try {
                setLoading(true);
                const response = await majorService.getAll();
                console.log('Fetched data:', response);
                if (response.success && Array.isArray(response.data)) {
                    setFields(response.data);
                } else {
                    console.error('Invalid data format:', response);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFields();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const filteredFields = fields.map(field => ({
            ...field,
            majors: field.majors.filter(major => 
                major.major_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                major.major_code.includes(searchQuery)
            )
        })).filter(field => field.majors.length > 0);
        setFields(filteredFields);
    };

    const handleApplyFilters = () => {
        const fetchAndFilterMajors = async () => {
            try {
                setLoading(true);
                const response = await majorService.getAll();
                let filteredData = response.data;

                if (filters.field !== 'all') {
                    filteredData = filteredData.filter(field => 
                        field.group_id === filters.field
                    );
                }

                setFields(filteredData);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAndFilterMajors();
    };

    const filterOptions = fields.map(field => ({
        value: field.group_id,
        label: field.group_name
    }));

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
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        field: e.target.value,
                                    })
                                }
                            >
                                <option value="all">Tất cả</option>
                                {filterOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="filter-group">
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
                                <option value="a00">Khối A00</option>
                                <option value="b00">Khối B00</option>
                            </select>
                        </div>
                        <div className="filter-group">
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
                        </div>
                    </div>

                    <div className="sm-results-panel">
                        {loading ? (
                            <div>Đang tải dữ liệu...</div>
                        ) : fields.length === 0 ? (
                            <div>Không có dữ liệu</div>
                        ) : (
                            fields.map((field) => (
                                <div key={field.group_id} className="major-group">
                                    <h3 className="group-name">{field.group_name}</h3>
                                    <div className="majors-grid">
                                        {field.majors?.length > 0 ? (
                                            field.majors.map((major) => (
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
                                            ))
                                        ) : (
                                            <div>Chưa có ngành trong nhóm này</div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchMajorsPage;
