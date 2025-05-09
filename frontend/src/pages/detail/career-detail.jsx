import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/pages/career-detail.css';

const CareerDetailPage = () => {
    const careerData = {
        title: 'Lập trình viên Frontend',
        salary: '15-35 triệu/tháng',
        experience: '1-3 năm',
        opportunity: 'Cao',
        field: 'Công nghệ thông tin',
        environment: 'Văn phòng',
        workTime: 'Full-time',
    };

    const requirements = [
        {
            title: 'Kiến thức chuyên môn',
            description:
                'Nắm vững HTML, CSS, JavaScript và các framework như React, Vue.js hoặc Angular',
        },
        {
            title: 'Kinh nghiệm làm việc',
            description:
                'Có ít nhất 1-3 năm kinh nghiệm trong phát triển giao diện người dùng',
        },
        {
            title: 'Ngôn ngữ',
            description: 'Tiếng Anh giao tiếp tốt, đọc hiểu tài liệu kỹ thuật',
        },
        {
            title: 'Kỹ năng mềm',
            description:
                'Khả năng làm việc nhóm, giao tiếp tốt, quản lý thời gian hiệu quả',
        },
    ];

    const skills = [
        {
            category: 'Kỹ năng kỹ thuật',
            items: [
                'HTML5/CSS3',
                'JavaScript/ES6+',
                'React.js',
                'Redux',
                'REST APIs',
                'Git',
            ],
        },
        {
            category: 'Công cụ phát triển',
            items: [
                'VS Code',
                'Chrome DevTools',
                'npm/yarn',
                'Webpack',
                'ESLint',
            ],
        },
        {
            category: 'Kỹ năng mềm',
            items: [
                'Làm việc nhóm',
                'Quản lý thời gian',
                'Giải quyết vấn đề',
                'Tư duy logic',
            ],
        },
    ];

    return (
        <div className="career-detail-page">
            <div className="career-banner">
                <div className="banner-content">
                    <div>
                        <h1>{careerData.title}</h1>
                    </div>
                    <div className="career-meta">
                        <div className="meta-item">
                            <span className="label">Mức lương:</span>
                            <span className="value">{careerData.salary}</span>
                        </div>
                        <div className="meta-item">
                            <span className="label">Kinh nghiệm:</span>
                            <span className="value">
                                {careerData.experience}
                            </span>
                        </div>
                        <div className="meta-item">
                            <span className="label">Cơ hội việc làm:</span>
                            <span className="value high">
                                {careerData.opportunity}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="career-nav">
                <nav className="nav-links">
                    <a href="#overview" className="active">
                        Tổng quan
                    </a>
                    <a href="#requirements">Yêu cầu</a>
                    <a href="#skills">Kỹ năng</a>
                    <a href="#education">Học vấn</a>
                    <a href="#prospects">Triển vọng</a>
                </nav>
            </div>

            <div className="content">
                <main className="main-content">
                    <section id="overview" className="section">
                        <h2 className="section-title">Tổng quan nghề nghiệp</h2>
                        <p>
                            Mô tả chi tiết về nghề nghiệp và vai trò trong công
                            việc...
                        </p>

                        <div className="career-stats">
                            <div className="stat-card">
                                <div className="stat-value">92%</div>
                                <div className="stat-label">
                                    Tỷ lệ có việc làm
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-value">25M+</div>
                                <div className="stat-label">
                                    Lương trung bình
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-value">45%</div>
                                <div className="stat-label">
                                    Tăng trưởng ngành
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="requirements" className="section">
                        <h2 className="section-title">Yêu cầu công việc</h2>
                        <div className="requirements-list">
                            {requirements.map((req, index) => (
                                <div key={index} className="requirement-item">
                                    <h3>{req.title}</h3>
                                    <p>{req.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="skills" className="section">
                        <h2 className="section-title">Kỹ năng cần thiết</h2>
                        {skills.map((skillGroup, index) => (
                            <div key={index} className="skill-category">
                                <h3>{skillGroup.category}</h3>
                                <div className="skill-items">
                                    {skillGroup.items.map((skill, idx) => (
                                        <span key={idx} className="skill-tag">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>
                </main>

                <aside className="side-content">
                    <div className="info-card">
                        <h3>Thông tin cơ bản</h3>
                        <div className="info-list">
                            <div className="info-item">
                                <span className="info-label">Lĩnh vực</span>
                                <span className="info-value">
                                    {careerData.field}
                                </span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Môi trường</span>
                                <span className="info-value">
                                    {careerData.environment}
                                </span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Thời gian</span>
                                <span className="info-value">
                                    {careerData.workTime}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="info-card">
                        <h3>Ngành học liên quan</h3>
                        <div className="related-majors">
                            <Link to="/major/1" className="related-item">
                                <span className="major-name">
                                    Công nghệ thông tin
                                </span>
                                <span className="arrow">→</span>
                            </Link>
                            <Link to="/major/2" className="related-item">
                                <span className="major-name">
                                    Kỹ thuật phần mềm
                                </span>
                                <span className="arrow">→</span>
                            </Link>
                            <Link to="/major/3" className="related-item">
                                <span className="major-name">
                                    Khoa học máy tính
                                </span>
                                <span className="arrow">→</span>
                            </Link>
                        </div>
                    </div>

                    <div className="info-card">
                        <h3>Việc làm tương tự</h3>
                        <div className="similar-careers">
                            <Link to="/career/2" className="similar-item">
                                <span className="career-name">
                                    Backend Developer
                                </span>
                                <span className="salary">20-40M</span>
                            </Link>
                            <Link to="/career/3" className="similar-item">
                                <span className="career-name">
                                    Full-stack Developer
                                </span>
                                <span className="salary">25-45M</span>
                            </Link>
                            <Link to="/career/4" className="similar-item">
                                <span className="career-name">
                                    UI/UX Designer
                                </span>
                                <span className="salary">15-35M</span>
                            </Link>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default CareerDetailPage;
