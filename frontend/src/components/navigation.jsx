import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/components/navigation.css';
import logo from '../assets/images/logo.svg';
import { schoolService } from '../services/schoolService';
import { majorService } from '../services/majorService';
import { authService } from '../services/authService';

const Navigation = () => {
    const { user, logout } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState({
        schools: [],
        majors: [],
    });
    const dropdownRef = useRef(null);
    const searchRef = useRef(null);
    const userDropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                setShowSuggestions(false);
            }
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }
            if (
                userDropdownRef.current &&
                !userDropdownRef.current.contains(event.target)
            ) {
                setShowUserDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Sử dụng API search chuyên biệt cho từng loại
    const fetchSchoolSuggestions = async (query) => {
        // Ưu tiên dùng API searchSchools, nếu không có thì fallback sang filter client
        if (schoolService.searchSchools) {
            try {
                const res = await schoolService.searchSchools(query);
                if (res.success) {
                    return res.data.slice(0, 5).map((school) => ({
                        id: school.id || school.code,
                        code: school.id || school.code,
                        name: school.school_name || school.name,
                        location: school.location,
                        type: school.ownership || school.type,
                    }));
                }
            } catch (e) {}
        }
        // Fallback: lấy toàn bộ và filter client-side (giống trang search-schools.jsx)
        try {
            const res = await schoolService.getAll();
            if (res.success) {
                const q = query.trim().toLowerCase();
                const filtered = res.data.filter(
                    (school) =>
                        (school.school_name &&
                            school.school_name.toLowerCase().includes(q)) ||
                        (school.location &&
                            school.location.toLowerCase().includes(q)) ||
                        (school.id && school.id.toLowerCase().includes(q)),
                );
                return filtered.slice(0, 5).map((school) => ({
                    id: school.id || school.code,
                    code: school.id || school.code,
                    name: school.school_name || school.name,
                    location: school.location,
                    type: school.ownership || school.type,
                }));
            }
        } catch (e) {}
        return [];
    };

    const fetchMajorSuggestions = async (query) => {
        try {
            // Ưu tiên lọc client nếu đã có majors trong redux/store, nếu không thì gọi API
            const q = query.trim().toLowerCase();
            const res = await majorService.getAll();
            if (res.success && Array.isArray(res.data)) {
                // Lọc theo tên ngành, mã ngành, hoặc khối thi
                const filtered = res.data.filter((major) => {
                    const nameMatch = major.major_name
                        ?.toLowerCase()
                        .includes(q);
                    const codeMatch = major.code?.toLowerCase().includes(q);
                    const examGroupMatch = Array.isArray(major.exam_groups)
                        ? major.exam_groups.some((g) =>
                              g.toLowerCase().includes(q),
                          )
                        : false;
                    return nameMatch || codeMatch || examGroupMatch;
                });
                return filtered.slice(0, 5).map((major) => ({
                    id: major.code,
                    code: major.code,
                    name: major.major_name,
                    group: major.group_name,
                    examGroups: major.exam_groups,
                }));
            }
        } catch (e) {}
        return [];
    };

    const handleSearchChange = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length >= 1) {
            try {
                // Gọi API search cho từng loại
                const [schoolResults, majorResults] = await Promise.all([
                    fetchSchoolSuggestions(query),
                    fetchMajorSuggestions(query),
                ]);
                setSuggestions({
                    schools: schoolResults,
                    majors: majorResults,
                });
                setShowSuggestions(true);
            } catch (error) {
                setSuggestions({ schools: [], majors: [] });
            }
        } else {
            setShowSuggestions(false);
        }
    };

    // Khi nhấn Enter, điều hướng đến đúng trang tìm kiếm
    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            setShowSuggestions(false);
            // Ưu tiên trường nếu có kết quả, ngược lại là ngành
            if (suggestions.schools.length > 0) {
                navigate(
                    `/search/schools?q=${encodeURIComponent(searchQuery.trim())}`,
                );
            } else {
                navigate(
                    `/search/majors?q=${encodeURIComponent(searchQuery.trim())}`,
                );
            }
        }
    };

    // Khi click icon search
    const handleSearchIconClick = () => {
        if (searchQuery.trim()) {
            setShowSuggestions(false);
            if (suggestions.schools.length > 0) {
                navigate(
                    `/search/schools?q=${encodeURIComponent(searchQuery.trim())}`,
                );
            } else {
                navigate(
                    `/search/majors?q=${encodeURIComponent(searchQuery.trim())}`,
                );
            }
        }
    };

    const handleSuggestionClick = (type, item) => {
        setShowSuggestions(false);
        setSearchQuery('');
        if (type === 'school') {
            navigate(`/school/detail/${item.code}`);
        } else {
            navigate(`/major/detail/${item.code}`);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await authService.logout();
            if (response.success) {
                logout();
                navigate('/');
            } else {
                console.error('Logout failed:', response.message);
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <nav className="navigation">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="Career Guide Logo" height="40" />
                </Link>
            </div>

            <div className="nav-search" ref={searchRef}>
                <input
                    type="text"
                    placeholder="Tìm kiếm trường, ngành học..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyPress={handleSearch}
                    onFocus={() =>
                        searchQuery.length >= 1 && setShowSuggestions(true)
                    }
                />
                <button className="search-icon" onClick={handleSearchIconClick}>
                    <i className="fas fa-search"></i>
                </button>

                {showSuggestions && (
                    <div className="search-suggestions">
                        {suggestions.schools.length > 0 && (
                            <div className="suggestion-section">
                                <h4>Trường học</h4>
                                {suggestions.schools.map((school) => (
                                    <div
                                        key={school.code}
                                        className="suggestion-item"
                                        onClick={() =>
                                            handleSuggestionClick(
                                                'school',
                                                school,
                                            )
                                        }
                                    >
                                        <i className="fas fa-university"></i>
                                        <div className="suggestion-content">
                                            <span className="suggestion-name">
                                                {school.name}
                                            </span>
                                            <span className="suggestion-detail">
                                                {school.location} •{' '}
                                                {school.type}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {suggestions.majors.length > 0 && (
                            <div className="suggestion-section">
                                <h4>Ngành học</h4>
                                {suggestions.majors.map((major) => (
                                    <div
                                        key={major.code}
                                        className="suggestion-item"
                                        onClick={() =>
                                            handleSuggestionClick(
                                                'major',
                                                major,
                                            )
                                        }
                                    >
                                        <i className="fas fa-graduation-cap"></i>
                                        <div className="suggestion-content">
                                            <span className="suggestion-name">
                                                {major.name}
                                            </span>
                                            <span className="suggestion-detail">
                                                {major.group} •{' '}
                                                {major.examGroups?.join(', ')}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <ul>
                <li>
                    <Link to="/">Trang chủ</Link>
                </li>
                <li>
                    <Link to="/news">Tin tức</Link>
                </li>
                <li className="dropdown" ref={dropdownRef}>
                    <span
                        className="dropdown-trigger"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        Danh mục
                    </span>
                    <div
                        className={`dropdown-menu ${showDropdown ? 'active' : ''}`}
                    >
                        <Link
                            to="/search/schools"
                            onClick={() => setShowDropdown(false)}
                        >
                            Trường học
                        </Link>
                        <Link
                            to="/search/majors"
                            onClick={() => setShowDropdown(false)}
                        >
                            Ngành học
                        </Link>
                        <Link
                            to="/search/scores"
                            onClick={() => setShowDropdown(false)}
                        >
                            Điểm chuẩn
                        </Link>
                        <Link
                            to="/search/careers"
                            onClick={() => setShowDropdown(false)}
                        >
                            Nghề nghiệp
                        </Link>
                    </div>
                </li>
                <li className="dropdown" ref={userDropdownRef}>
                    {user ? (
                        <>
                            <span
                                className="dropdown-trigger"
                                onClick={() =>
                                    setShowUserDropdown(!showUserDropdown)
                                }
                            >
                                Xin chào, {user.name}
                            </span>
                            <div
                                className={`dropdown-menu ${showUserDropdown ? 'active' : ''}`}
                            >
                                <Link
                                    to="/profile"
                                    onClick={() => setShowUserDropdown(false)}
                                >
                                    Thông tin cá nhân
                                </Link>
                                <button
                                    onClick={() => {
                                        setShowUserDropdown(false);
                                        handleLogout();
                                    }}
                                    className="dropdown-item"
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        </>
                    ) : (
                        <Link to="/login">Đăng nhập</Link>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;