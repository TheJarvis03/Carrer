import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/pages/login.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add login logic here
    console.log('Login attempt:', formData);
    navigate('/');
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

          <button type="submit">Đăng nhập</button>
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
