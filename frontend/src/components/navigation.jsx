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

    const isSchoolCode = (query) => {
        const schoolCodePattern = /^[A-Z0-9]{1,3}$/;
        return schoolCodePattern.test(query.toUpperCase());
    };

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

    const handleSearchChange = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length >= 1) {
            // Changed from 2 to 1 to handle short codes
            try {
                const [schoolsResponse, majorsResponse] = await Promise.all([
                    schoolService.getAll(),
                    majorService.getAll(),
                ]);

                const schoolResults = schoolsResponse.success
                    ? schoolsResponse.data
                          .filter((school) => {
                              if (isSchoolCode(query)) {
                                  return (
                                      school.code?.toString().toUpperCase() ===
                                      query.toUpperCase()
                                  );
                              }
                              return (
                                  school.name
                                      ?.toLowerCase()
                                      .includes(query.toLowerCase()) ||
                                  school.location
                                      ?.toLowerCase()
                                      .includes(query.toLowerCase())
                              );
                          })
                          .slice(0, 5)
                          .map((school) => ({
                              id: school.code,
                              code: school.code,
                              name: school.name,
                              location: school.location,
                          }))
                    : [];

                const majorResults = majorsResponse.success
                    ? majorsResponse.data
                          .filter(
                              (major) =>
                                  major.major_name
                                      .toLowerCase()
                                      .includes(query.toLowerCase()) ||
                                  major.code
                                      ?.toLowerCase()
                                      .includes(query.toLowerCase()) ||
                                  major.group_name
                                      ?.toLowerCase()
                                      .includes(query.toLowerCase()) ||
                                  major.exam_groups?.some((group) =>
                                      group
                                          .toLowerCase()
                                          .includes(query.toLowerCase()),
                                  ),
                          )
                          .slice(0, 5)
                          .map((major) => ({
                              id: major.code,
                              code: major.code,
                              name: major.major_name,
                              group: major.group_name,
                              examGroups: major.exam_groups,
                          }))
                    : [];

                setSuggestions({
                    schools: schoolResults,
                    majors: majorResults,
                });
                setShowSuggestions(true);
            } catch (error) {
                console.error('Search error:', error);
                setSuggestions({ schools: [], majors: [] });
            }
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            setShowSuggestions(false);

            const { schools, majors } = suggestions;
            if (schools.length > majors.length) {
                navigate(`/school?q=${encodeURIComponent(searchQuery.trim())}`);
            } else {
                navigate(`/major?q=${encodeURIComponent(searchQuery.trim())}`);
            }
        }
    };

    const handleSuggestionClick = (type, item) => {
        setShowSuggestions(false);
        setSearchQuery('');
        if (type === 'school') {
            navigate(`/school/${item.code}`);
        } else {
            navigate(`/major/${item.code}`);
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
                        searchQuery.length >= 2 && setShowSuggestions(true)
                    }
                />
                <button
                    className="search-icon"
                    onClick={() =>
                        searchQuery.trim() &&
                        navigate(
                            `/search?q=${encodeURIComponent(searchQuery.trim())}`,
                        )
                    }
                >
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
