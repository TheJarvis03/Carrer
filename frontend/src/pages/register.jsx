import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import '../styles/pages/register.css';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Client-side validation
        if (formData.password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            return;
        }

        if (!formData.email.includes('@')) {
            setError('Email không hợp lệ');
            return;
        }

        const { confirmPassword, ...userData } = formData;
        const result = await authService.register(userData);
        
        if (result.success) {
            navigate('/login');
        } else {
            setError(result.error || 'Đăng ký thất bại');
        }
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="register-page">
            <div className="register-container">
                <div className="register-header">
                    <h2>Đăng ký tài khoản</h2>
                    <p>Tạo tài khoản để trải nghiệm đầy đủ tính năng</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Tên đăng nhập</label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">
                            Xác nhận mật khẩu
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit">Đăng ký</button>
                </form>

                <div className="social-register">
                    <div className="social-register-title">
                        Hoặc đăng ký với
                    </div>
                    <div className="social-buttons">
                        <button className="social-button">
                            <img src="/images/google.svg" alt="Google" />
                            Đăng ký với Google
                        </button>
                        <button className="social-button">
                            <img src="/images/facebook.svg" alt="Facebook" />
                            Đăng ký với Facebook
                        </button>
                    </div>
                </div>

                <div className="form-footer">
                    Đã có tài khoản?
                    <Link to="/login">Đăng nhập</Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
