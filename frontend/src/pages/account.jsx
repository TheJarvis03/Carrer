import React from 'react';
import '../styles/pages/account.css';

const UserAccountPage = () => {
    return (
        <div className="user-account-page">
            <main className="content">
                <section className="profile">
                    <div className="avatar">Avatar</div>
                    <div className="profile-info">Thông tin cá nhân</div>
                </section>

                <section className="followed-schools">
                    <h2>Danh sách trường đang theo dõi</h2>
                    <div className="school-list">Danh sách trường</div>
                </section>

                <section className="comments">
                    <h2>Nhận xét</h2>
                    <div className="comment-list">Danh sách nhận xét</div>
                </section>
            </main>
        </div>
    );
};

export default UserAccountPage;
