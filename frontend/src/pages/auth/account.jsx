import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { authService } from '../../services/authService';
import '../../styles/pages/account.css';

const UserAccountPage = () => {
    const { user } = useContext(UserContext);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [followedSchools, setFollowedSchools] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Check if user exists
                if (!user) {
                    setError('Vui lòng đăng nhập để xem thông tin');
                    return;
                }

                // Fetch user profile
                const profileResponse = await authService.getProfile();
                if (profileResponse.success) {
                    setProfile(profileResponse.data);
                } else {
                    throw new Error('Không thể tải thông tin người dùng');
                }

                // Fetch followed schools if needed
                // TODO: Implement when API is ready
                // const schoolsResponse = await authService.getFollowedSchools();
                // if (schoolsResponse.success) {
                //     setFollowedSchools(schoolsResponse.data);
                // }

            } catch (err) {
                console.error('Error fetching user data:', err);
                setError(err.message || 'Đã xảy ra lỗi khi tải thông tin');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    if (loading) return <div className="loading-state">Đang tải...</div>;
    if (error) return <div className="error-state">{error}</div>;

    return (
        <div className="user-account-page">
            <main className="content">
                <section className="profile">
                    <div className="avatar">
                        <img 
                            src={profile?.avatar || '/images/default-avatar.png'} 
                            alt="Avatar"
                            className="avatar-image"
                        />
                    </div>
                    <div className="profile-info">
                        <h2>{profile?.fullName || user.username}</h2>
                        <div className="info-row">
                            <span className="label">Email:</span>
                            <span>{profile?.email || 'Chưa cập nhật'}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Ngày tham gia:</span>
                            <span>{new Date(user.createdAt).toLocaleDateString('vi-VN')}</span>
                        </div>
                    </div>
                </section>

                <section className="followed-schools">
                    <h2>Danh sách trường đang theo dõi</h2>
                    <div className="school-list">
                        {followedSchools.length > 0 ? (
                            followedSchools.map(school => (
                                <div key={school.id} className="followed-school-item">
                                    {school.name}
                                </div>
                            ))
                        ) : (
                            <p className="empty-state">Chưa theo dõi trường nào</p>
                        )}
                    </div>
                </section>

                <section className="comments">
                    <h2>Nhận xét gần đây</h2>
                    <div className="comment-list">
                        <p className="empty-state">Chưa có nhận xét nào</p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default UserAccountPage;
