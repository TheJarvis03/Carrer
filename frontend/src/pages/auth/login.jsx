import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';
import '../../styles/pages/login.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Validation
            if (!formData.username.trim() || !formData.password) {
                setError('Vui lòng nhập đầy đủ thông tin đăng nhập');
                return;
            }

            const response = await authService.login(formData.username, formData.password);

            if (response.success) {
                const { token, user } = response.data;
                
                // Save auth data
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                
                // Update context
                setUser(user);

                // Redirect based on role
                if (user.role === 'admin') {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/');
                }
            } else {
                setError(response.message || 'Tên đăng nhập hoặc mật khẩu không chính xác');
                setFormData(prev => ({ ...prev, password: '' }));
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.');
            setFormData(prev => ({ ...prev, password: '' }));
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <h2>Đăng nhập</h2>
                    <p>Chào mừng bạn trở lại</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form className="login-form" onSubmit={handleSubmit}>
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

                    <div className="forgot-password">
                        <Link to="/forgot-password">Quên mật khẩu?</Link>
                    </div>

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </button>
                </form>

                <div className="login-divider">
                    <span>Hoặc</span>
                </div>

                <div className="social-login">
                    <button className="social-button">
                        <img src="/images/google.svg" alt="Google" />
                        Đăng nhập với Google
                    </button>
                    <button className="social-button">
                        <img src="/images/facebook.svg" alt="Facebook" />
                        Đăng nhập với Facebook
                    </button>
                </div>

                <div className="register-link">
                    Chưa có tài khoản?
                    <Link to="/register">Đăng ký ngay</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
