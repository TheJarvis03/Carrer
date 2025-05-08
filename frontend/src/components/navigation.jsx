import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/components/navigation.css';
import logo from '../assets/images/logo.svg';

const Navigation = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            navigate(`/search?q=${e.target.value}`);
        }
    };

    return (
        <nav className="navigation">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="Career Guide Logo" height="40" />
                </Link>
            </div>

            <div className="nav-search">
                <input
                    type="text"
                    placeholder="Tìm kiếm trường, ngành học..."
                    onKeyPress={handleSearch}
                />
                <button className="search-icon">
                    <Link to="/search">🔍</Link>
                </button>
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
                <li>
                    <Link to="/login">Đăng nhập</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
