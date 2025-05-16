import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import schoolDetailService from '../../services/schoolDetailService';
import '../../styles/pages/school-detail.css';

const SchoolDetailPage = () => {
    const { code } = useParams();
    const [school, setSchool] = useState(null);
    const [majors, setMajors] = useState([]);
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [schoolRes, majorsRes, scoresRes] = await Promise.all([
                    schoolDetailService.getSchoolByCode(code),
                    schoolDetailService.getMajorsBySchool(code),
                    schoolDetailService.getSchoolScores(code),
                ]);

                if (schoolRes.success) setSchool(schoolRes.data);
                if (majorsRes.success) setMajors(majorsRes.data);
                if (scoresRes.success) setScores(scoresRes.data);
            } catch (err) {
                setError('Không thể tải thông tin trường');
            } finally {
                setLoading(false);
            }
        };

        if (code) {
            fetchData();
        }
    }, [code]);

    if (loading) return <div>Đang tải thông tin...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!school) return <div>Không tìm thấy thông tin trường</div>;

    return (
        <div className="sd-school-detail-page">
            <section className="sd-school-banner">
                <div className="sd-banner-content">
                    <div className="sd-school-header">
                        <div className="sd-school-info">
                            <h1>{school.school_name}</h1>
                        </div>
                        <div className="sd-school-logo">
                            <img
                                src={`/images/schools/${school.code?.toLowerCase()}.png`}
                                alt={school.school_name}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <nav className="sd-school-nav">
                <div className="sd-nav-container">
                    <ul>
                        {['overview', 'majors', 'scores'].map(
                            (tab) => (
                                <li key={tab}>
                                    <button
                                        className={
                                            activeTab === tab ? 'active' : ''
                                        }
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {getTabLabel(tab)}
                                    </button>
                                </li>
                            ),
                        )}
                    </ul>
                </div>
            </nav>

            <main className="sd-main-content">
                <div className="sd-content-container">
                    {renderContent(activeTab, school, majors, scores)}
                </div>
            </main>
        </div>
    );
};

const getTabLabel = (tab) => {
    const labels = {
        overview: 'Tổng quan',
        majors: 'Ngành đào tạo',
        scores: 'Điểm chuẩn',
    };
    return labels[tab];
};

const getMethodClass = (method) => {
    const methodMap = {
        'ĐT THPT': 'dt-thpt',
        'ĐGNL': 'dgnl',
        'CCQT': 'ccqt',
        'Ưu Tiên': 'uu-tien',
        'KCH': 'kch',
        'ĐGTD BK': 'dgtd-bk',
        'ĐGNL HN': 'dgnl-hn'
    };
    return methodMap[method] || '';
};

const renderMethods = (methods) => {
    if (!methods || !methods.length) return '';
    return methods.map((method, idx) => (
        <span
            key={idx}
            className={`admission-method ${getMethodClass(method)}`}
        >
            {method}
        </span>
    ));
};

const renderSubjectGroups = (subjectGroup) => {
    if (!subjectGroup) return '';
    const groups = subjectGroup.split(';').map(group => group.trim());
    return (
        <div className="subject-group">
            {groups.map((group, index) => (
                <span key={index}>{group}</span>
            ))}
        </div>
    );
};

const renderContent = (tab, school, majors, scores) => {
    switch (tab) {
        case 'overview':
            return (
                <section className="sd-content-section">
                    <h2 className="sd-section-title">Tổng quan về trường</h2>
                    <div className="sd-overview-description">
                        <p>{school?.description}</p>

                        <div className="sd-contact-info">
                            <h3>Thông tin liên hệ</h3>
                            <div className="sd-contact-list">
                                {school?.location && (
                                    <div className="sd-contact-item">
                                        <i className="fas fa-map-marker-alt"></i>
                                        <span>{school.location}</span>
                                    </div>
                                )}
                                {school?.website && (
                                    <div className="sd-contact-item">
                                        <i className="fas fa-globe"></i>
                                        <a
                                            href={school.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {school.website}
                                        </a>
                                    </div>
                                )}
                                {school?.phones && school.phones.length > 0 && (
                                    <div className="sd-contact-item">
                                        <i className="fas fa-phone"></i>
                                        <span>{school.phones.join(' - ')}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            );

        case 'majors':
            return (
                <section className="sd-content-section">
                    <h2 className="sd-section-title">
                        Danh sách ngành đào tạo
                        {school?.method_link && (
                            <a
                                href={school.method_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="sd-quota-button"
                            >
                                <i className="fas fa-file-alt"></i>
                                Đề án tuyển sinh {new Date().getFullYear()}
                            </a>
                        )}
                    </h2>

                    <div className="sd-majors-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã ngành</th>
                                    <th>Tên ngành</th>
                                    <th>Chỉ tiêu</th>
                                    <th>Phương thức xét tuyển</th>
                                    <th>Tổ hợp môn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {majors?.map((major) => {
                                    const rowSpan = major.combinations.length;

                                    return major.combinations.map(
                                        (combo, idx) => (
                                            <tr
                                                key={`${major.major_code}-${idx}`}
                                            >
                                                {idx === 0 && (
                                                    <>
                                                        <td rowSpan={rowSpan}>
                                                            {major.index}
                                                        </td>
                                                        <td rowSpan={rowSpan}>
                                                            {major.major_code}
                                                        </td>
                                                        <td rowSpan={rowSpan}>
                                                            {major.major_name}
                                                        </td>
                                                        <td rowSpan={rowSpan}>
                                                            {major.quota}
                                                        </td>
                                                    </>
                                                )}
                                                <td className="methods-cell">
                                                    {renderMethods(
                                                        combo.admission_methods,
                                                    )}
                                                </td>
                                                <td>
                                                    {combo.subject}
                                                </td>
                                            </tr>
                                        ),
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>
            );

        case 'scores':
            return (
                <section className="sd-content-section">
                    <h2 className="sd-section-title">Điểm chuẩn đại học</h2>
                    <div className="sd-scores-content">
                        {Object.entries(scores)
                            .sort(([yearA], [yearB]) => yearB - yearA)
                            .map(([year, yearScores]) => (
                                <div key={year} className="sd-scores-year">
                                    <h3>Điểm chuẩn năm 2024</h3>
                                    <div className="sd-scores-table">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Mã ngành</th>
                                                    <th>Tên ngành</th>
                                                    <th>Tổ hợp môn</th>
                                                    <th>Điểm chuẩn</th>
                                                    <th>Ghi chú</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {yearScores.map((score, index) => (
                                                    <tr key={index}>
                                                        <td>{score.majorCode}</td>
                                                        <td>{score.majorName}</td>
                                                        <td>{renderSubjectGroups(score.subjectGroup)}</td>
                                                        <td className="score-value">{score.score}</td>
                                                        <td>{score.note}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ))}
                    </div>
                </section>
            );

        default:
            return null;
    }
};

export default SchoolDetailPage;
