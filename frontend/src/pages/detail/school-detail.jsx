import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
    const [selectedMethods, setSelectedMethods] = useState(null);
    const [selectedSubjects, setSelectedSubjects] = useState(null); // <--- Thêm dòng này

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

    const renderMethodsModal = () => {
        if (!selectedMethods) return null;
        return (
            <div className="subjects-modal-overlay" onClick={() => setSelectedMethods(null)}>
                <div className="subjects-modal" onClick={e => e.stopPropagation()}>
                    <h3>Phương thức xét tuyển</h3>
                    <div className="subjects-list">
                        {selectedMethods.map((method, idx) => (
                            <div key={idx} className="subject-item">{method}</div>
                        ))}
                    </div>
                    <button className="close-modal" onClick={() => setSelectedMethods(null)}>✕</button>
                </div>
            </div>
        );
    };

    const renderSubjectsModal = () => {
        if (!selectedSubjects) return null;
        return (
            <div className="subjects-modal-overlay" onClick={() => setSelectedSubjects(null)}>
                <div className="subjects-modal" onClick={e => e.stopPropagation()}>
                    <h3>Tổ hợp môn xét tuyển</h3>
                    <div className="subjects-list">
                        {selectedSubjects.map((subject, idx) => (
                            <div key={idx} className="subject-item">{subject}</div>
                        ))}
                    </div>
                    <button className="close-modal" onClick={() => setSelectedSubjects(null)}>✕</button>
                </div>
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

    const truncateAndRenderWithPopup = (items, label, isNote = false) => {
        if (!items || !items.length) return '';
        let processedItems;
        
        if (isNote) {
            processedItems = [items]; // For notes, treat as single string
        } else {
            processedItems = Array.isArray(items) ? items : items.split(';').map(item => item.trim());
        }

        const isTruncated = isNote ? items.length > 50 : processedItems.length > 2;
        const displayText = isNote 
            ? (isTruncated ? `${items.slice(0, 50)}...` : items)
            : (isTruncated ? `${processedItems.slice(0, 2).join('; ')}...` : processedItems.join('; '));

        return (
            <div
                className={`truncate-cell ${isNote ? 'note-cell' : ''}`}
                onClick={() => isTruncated && (
                    label === 'methods' ? setSelectedMethods(processedItems) :
                    label === 'subjects' ? setSelectedSubjects(processedItems) :
                    setSelectedSubjects([items])
                )}
                title={isTruncated ? 'Nhấn để xem đầy đủ' : ''}
            >
                {displayText}
            </div>
        );
    };

    const renderMethods = (methods) => truncateAndRenderWithPopup(methods, 'methods');
    const renderSubjectGroups = (subjects) => truncateAndRenderWithPopup(subjects, 'subjects');

    const renderContent = (tab, school, majors, scores) => {
        return (
            <div className="sd-unified-container">
                {tab === 'overview' && (
                    <section className="sd-content-section">
                        <div className="sd-overview-description">
                            <h2 className="sd-section-title">Tổng quan về trường</h2>
                            {school?.introduction && (
                                <div className="sd-text-section">
                                    {school.introduction.split('\n').map((paragraph, index) => (
                                        paragraph.trim() && (
                                            <p key={index} className="sd-paragraph">
                                                {paragraph}
                                            </p>
                                        )
                                    ))}
                                </div>
                            )}

                            {school?.tuition && (
                                <div className="sd-text-section">
                                    <h2>Học phí</h2>
                                    {school.tuition.split('\n').map((line, index) => (
                                        line.trim() && (
                                            <p key={index} className="sd-paragraph">
                                                {line}
                                            </p>
                                        )
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                )}
                
                {tab === 'majors' && (
                    <section className="sd-majors-section">
                        <div className="sd-majors-content">
                            <h2 className="sd-section-title">
                                Cách tính điểm xét tuyển {school.school_name}
                            </h2>
                            <div>
                                {school.text_content}
                            </div>
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
                            <div className="sd-majors-table-wrapper">
                                <table className="sd-majors-detail-table">
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
                                                    <tr key={`${major.major_code}-${idx}`}>
                                                        {idx === 0 && (
                                                            <>
                                                                <td rowSpan={rowSpan}>{major.index}</td>
                                                                <td rowSpan={rowSpan}>{major.major_code}</td>
                                                                <td rowSpan={rowSpan}>
                                                                    <Link
                                                                        to={`/major/detail/${major.major_code}`}
                                                                        className="school-link"
                                                                    >
                                                                        {major.major_name}
                                                                    </Link>
                                                                </td>
                                                                <td rowSpan={rowSpan}>{major.quota}</td>
                                                            </>
                                                        )}
                                                        <td className="methods-cell">
                                                            {renderMethods(combo.admission_methods)}
                                                        </td>
                                                        <td>
                                                            {renderSubjectGroups(combo.subject)}
                                                        </td>
                                                    </tr>
                                                )
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                )}
                
                {tab === 'scores' && (
                    <section className="sd-admission-section">
                        <div className="sd-admission-content">
                            <h2 className="sd-section-title">Điểm chuẩn đại học</h2>
                            {Object.entries(scores)
                                .sort(([yearA], [yearB]) => yearB - yearA)
                                .map(([year, yearScores]) => (
                                    <div key={year} className="sd-admission-year">
                                        <h3>Điểm chuẩn năm {year}</h3>
                                        <div className="sd-admission-table-wrapper">
                                            <table className="sd-admission-detail-table">
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
                                                            <td className="major-name">
                                                                <Link to={`/major/detail/${score.majorCode}`} className="school-link">
                                                                    {score.majorName}
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                {renderSubjectGroups(score.subjectGroup)}
                                                            </td>
                                                            <td className="score-value">{score.score}</td>
                                                            <td>{truncateAndRenderWithPopup(score.note, 'note', true)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </section>
                )}
            </div>
        );
    };

    if (loading) return <div>Đang tải thông tin...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!school) return <div>Không tìm thấy thông tin trường</div>;

    return (
        <div className="sd-school-detail-page">
            <div className="sd-page-wrapper">
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
                            {['overview', 'majors', 'scores'].map((tab) => (
                                <li key={tab}>
                                    <button
                                        className={activeTab === tab ? 'active' : ''}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {getTabLabel(tab)}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>

                <div className="sd-fixed-width-container">
                    {renderContent(activeTab, school, majors, scores)}
                </div>
            </div>

            {renderMethodsModal()}
            {renderSubjectsModal()}
        </div>
    );
};

export default SchoolDetailPage;
