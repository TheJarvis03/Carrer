import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/footer.css'; 

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Về chúng tôi</h3>
                    <p>Career Guidance - Nền tảng tư vấn hướng nghiệp cho học sinh, sinh viên</p>
                </div>

                <div className="footer-section">
                    <h3>Liên kết nhanh</h3>
                    <ul>
                        <li><Link to="/">Trang chủ</Link></li>
                        <li><Link to="/search/schools">Tìm trường</Link></li>
                        <li><Link to="/search/majors">Ngành học</Link></li>
                        <li><Link to="/search/careers">Nghề nghiệp</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Liên hệ</h3>
                    <ul>
                        <li>Email: contact@careerguidance.com</li>
                        <li>Điện thoại: (84) 123-456-789</li>
                        <li>Địa chỉ: 170 An Dương Vương, Thành phố Quy Nhơn, Tỉnh Bình Định</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Theo dõi chúng tôi</h3>
                    <div className="social-links">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Career Guidance. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
