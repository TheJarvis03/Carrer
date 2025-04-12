import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/general-search.css';

const GeneralSearchPage = () => {
    return (
        <div className="general-search-page">
            <section className="search-header">
                <h1>Tìm kiếm thông tin</h1>
                <p>Chọn loại thông tin bạn muốn tìm kiếm</p>
            </section>

            <div className="search-categories">
                <Link to="/search/schools" className="search-category">
                    <div className="category-icon">🏫</div>
                    <h2>Tìm kiếm trường</h2>
                    <p>Thông tin chi tiết về các trường đại học, cao đẳng</p>
                </Link>

                <Link to="/search/majors" className="search-category">
                    <div className="category-icon">📚</div>
                    <h2>Tìm kiếm ngành học</h2>
                    <p>Khám phá các ngành học và cơ hội nghề nghiệp</p>
                </Link>

                <Link to="/search/careers" className="search-category">
                    <div className="category-icon">💼</div>
                    <h2>Tìm kiếm nghề nghiệp</h2>
                    <p>Thông tin về các nghề nghiệp và thị trường lao động</p>
                </Link>

                <Link to="/search/scores" className="search-category">
                    <div className="category-icon">📊</div>
                    <h2>Tra cứu điểm chuẩn</h2>
                    <p>Điểm chuẩn các trường qua các năm</p>
                </Link>
            </div>
        </div>
    );
};

export default GeneralSearchPage;