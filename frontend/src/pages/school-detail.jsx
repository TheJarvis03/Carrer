import React from 'react';
import '../styles/pages/school-detail.css';

const SchoolDetailPage = () => {
    return (
        <div className="sd-school-detail-page">
            <section className="sd-school-banner">
                <div className="sd-banner-content">
                    <div className="sd-school-logo">
                        <img
                            src="/school-logo.png"
                            alt="Logo trường"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                            }}
                        />
                    </div>
                    <div className="sd-school-info">
                        <h1>Đại học Bách Khoa Hà Nội</h1>
                    </div>
                    <div className="sd-school-stats">
                        <div className="sd-stat-item">
                            <span className="sd-stat-label">Thành lập</span>
                            <span className="sd-stat-value">1956</span>
                        </div>
                        <div className="sd-stat-item">
                            <span className="sd-stat-label">Loại trường</span>
                            <span className="sd-stat-value">Công lập</span>
                        </div>
                        <div className="sd-stat-item">
                            <span className="sd-stat-label">Xếp hạng</span>
                            <span className="sd-stat-value">#1</span>
                        </div>
                        <div className="sd-stat-item">
                            <span className="sd-stat-label">Quy mô</span>
                            <span className="sd-stat-value">35K+</span>
                        </div>
                    </div>
                </div>
            </section>

            <nav className="sd-school-nav">
                <div className="sd-nav-container">
                    <ul>
                        <li>
                            <a href="#overview" className="active">
                                Tổng quan
                            </a>
                        </li>
                        <li>
                            <a href="#majors">Ngành đào tạo</a>
                        </li>
                        <li>
                            <a href="#scores">Điểm chuẩn</a>
                        </li>
                        <li>
                            <a href="#quota">Chỉ tiêu tuyển sinh</a>
                        </li>
                        <li>
                            <a href="#facilities">Cơ sở vật chất</a>
                        </li>
                    </ul>
                </div>
            </nav>

            <main className="sd-main-content">
                <div className="sd-content-container">
                    <section id="overview" className="sd-content-section">
                        <h2 className="sd-section-title">
                            Tổng quan về trường
                        </h2>
                        <div className="sd-section-content">
                            <div className="sd-overview-stats">
                                <div className="sd-stat-box">
                                    <span className="sd-stat-number">40+</span>
                                    <span className="sd-stat-label">
                                        Ngành đào tạo
                                    </span>
                                </div>
                                <div className="sd-stat-box">
                                    <span className="sd-stat-number">35k+</span>
                                    <span className="sd-stat-label">
                                        Sinh viên
                                    </span>
                                </div>
                                <div className="sd-stat-box">
                                    <span className="sd-stat-number">95%</span>
                                    <span className="sd-stat-label">
                                        Tỷ lệ việc làm
                                    </span>
                                </div>
                            </div>
                            <div className="sd-overview-description">
                                <p>
                                    Trường Đại học Bách khoa Hà Nội (tên tiếng
                                    Anh: Hanoi University of Science and
                                    Technology - HUST) là trường đại học đầu
                                    ngành về kỹ thuật và công nghệ tại Việt Nam.
                                    Với hơn 65 năm xây dựng và phát triển,
                                    Trường ĐHBK Hà Nội đã trở thành một địa chỉ
                                    đào tạo uy tín, cung cấp nguồn nhân lực chất
                                    lượng cao cho xã hội.
                                </p>
                                <a
                                    href="https://hust.edu.vn"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="sd-website-button"
                                >
                                    <span>Truy cập website chính thức</span>
                                    <span className="external-link-icon">
                                        ↗
                                    </span>
                                </a>
                            </div>
                        </div>
                    </section>

                    <section id="majors" className="sd-content-section">
                        <h2 className="sd-section-title">Ngành đào tạo</h2>
                        <div className="sd-section-content">
                            <div className="sd-major-groups">
                                <div className="sd-major-group">
                                    <h3>Khối ngành Công nghệ thông tin</h3>
                                    <ul>
                                        <li>Khoa học máy tính</li>
                                        <li>Kỹ thuật phần mềm</li>
                                        <li>Hệ thống thông tin</li>
                                        <li>An toàn thông tin</li>
                                    </ul>
                                </div>
                                <div className="sd-major-group">
                                    <h3>Khối ngành Điện - Điện tử</h3>
                                    <ul>
                                        <li>Kỹ thuật điện</li>
                                        <li>Kỹ thuật điện tử</li>
                                        <li>
                                            Kỹ thuật điều khiển và tự động hóa
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="scores" className="sd-content-section">
                        <h2 className="sd-section-title">Điểm chuẩn</h2>
                        <div className="sd-section-content">
                            <div className="sd-section-description">
                                <p>
                                    Điểm chuẩn xét tuyển đại học năm 2023 theo
                                    phương thức xét điểm thi THPT Quốc gia:
                                </p>
                            </div>
                            <table className="sd-score-table">
                                <thead>
                                    <tr>
                                        <th>Ngành</th>
                                        <th>Điểm chuẩn</th>
                                        <th>Tổ hợp môn</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td data-label="Ngành">
                                            Khoa học máy tính
                                        </td>
                                        <td data-label="Điểm chuẩn">27.50</td>
                                        <td data-label="Tổ hợp môn">
                                            A00, A01
                                        </td>
                                    </tr>
                                    <tr>
                                        <td data-label="Ngành">
                                            Kỹ thuật phần mềm
                                        </td>
                                        <td data-label="Điểm chuẩn">28.75</td>
                                        <td data-label="Tổ hợp môn">
                                            A00, A01, D01
                                        </td>
                                    </tr>
                                    <tr>
                                        <td data-label="Ngành">
                                            Hệ thống thông tin
                                        </td>
                                        <td data-label="Điểm chuẩn">27.80</td>
                                        <td data-label="Tổ hợp môn">
                                            A00, A01, D01
                                        </td>
                                    </tr>
                                    <tr>
                                        <td data-label="Ngành">
                                            An toàn thông tin
                                        </td>
                                        <td data-label="Điểm chuẩn">27.90</td>
                                        <td data-label="Tổ hợp môn">
                                            A00, A01
                                        </td>
                                    </tr>
                                    <tr>
                                        <td data-label="Ngành">
                                            Kỹ thuật điện
                                        </td>
                                        <td data-label="Điểm chuẩn">26.50</td>
                                        <td data-label="Tổ hợp môn">
                                            A00, A01
                                        </td>
                                    </tr>
                                    <tr>
                                        <td data-label="Ngành">
                                            Kỹ thuật điện tử
                                        </td>
                                        <td data-label="Điểm chuẩn">26.75</td>
                                        <td data-label="Tổ hợp môn">
                                            A00, A01
                                        </td>
                                    </tr>
                                    <tr>
                                        <td data-label="Ngành">
                                            Kỹ thuật điều khiển và tự động hóa
                                        </td>
                                        <td data-label="Điểm chuẩn">27.15</td>
                                        <td data-label="Tổ hợp môn">
                                            A00, A01
                                        </td>
                                    </tr>
                                    <tr>
                                        <td data-label="Ngành">
                                            Kỹ thuật cơ khí
                                        </td>
                                        <td data-label="Điểm chuẩn">26.25</td>
                                        <td data-label="Tổ hợp môn">
                                            A00, A01
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section id="quota" className="sd-content-section">
                        <h2 className="sd-section-title">
                            Chỉ tiêu tuyển sinh
                        </h2>
                        <div className="sd-section-content">
                            <div className="sd-section-description">
                                <p>
                                    Thông tin chi tiết chỉ tiêu tuyển sinh năm
                                    2024 và phương thức xét tuyển:
                                </p>
                                <ul className="sd-admission-methods">
                                    <li>
                                        Xét tuyển thẳng và ưu tiên xét tuyển
                                    </li>
                                    <li>Xét tuyển dựa trên kết quả thi THPT</li>
                                    <li>
                                        Xét tuyển dựa trên kết quả học bạ THPT
                                    </li>
                                </ul>
                            </div>
                            <table className="sd-score-table">
                                <thead>
                                    <tr>
                                        <th>Ngành</th>
                                        <th>Chỉ tiêu</th>
                                        <th>Tỷ lệ các phương thức</th>
                                        <th>Mã ngành</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td data-label="Ngành">
                                            Khoa học máy tính
                                        </td>
                                        <td data-label="Chỉ tiêu">480</td>
                                        <td data-label="Tỷ lệ">
                                            70% THPT, 20% Học bạ, 10% Xét tuyển
                                            thẳng
                                        </td>
                                        <td data-label="Mã ngành">7480101</td>
                                    </tr>
                                    <tr>
                                        <td data-label="Ngành">
                                            Kỹ thuật phần mềm
                                        </td>
                                        <td data-label="Chỉ tiêu">460</td>
                                        <td data-label="Tỷ lệ">
                                            70% THPT, 20% Học bạ, 10% Xét tuyển
                                            thẳng
                                        </td>
                                        <td data-label="Mã ngành">7480103</td>
                                    </tr>
                                    {/* ...existing rows... */}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section id="facilities" className="sd-content-section">
                        <h2 className="sd-section-title">Cơ sở vật chất</h2>
                        <div className="sd-section-content">
                            <div className="sd-facilities-grid">
                                <div className="sd-facility-item">
                                    <h3>Thư viện Tạ Quang Bửu</h3>
                                    <p>
                                        Thư viện với hơn 200,000 đầu sách, tài
                                        liệu điện tử và không gian học tập hiện
                                        đại.
                                    </p>
                                </div>
                                <div className="sd-facility-item">
                                    <h3>Khu Ký túc xá</h3>
                                    <p>
                                        Hệ thống ký túc xá hiện đại có sức chứa
                                        hơn 10,000 sinh viên với đầy đủ tiện
                                        nghi.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default SchoolDetailPage;
