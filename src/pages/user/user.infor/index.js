import React from 'react';
import styles from './user.module.scss';
import classNames from 'classnames/bind';
import { auth } from '~/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Added missing import

const cx = classNames.bind(styles);

const UserPage = () => {
    const navigate = useNavigate(); // Added hook for navigation
    const user = auth.currentUser; // Added to get current user state

    // Hàm xử lý đăng xuất
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/'); // Điều hướng về trang chính sau khi đăng xuất
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className={cx('user_container')}>
            <div className={cx("container")}>
                <div className={cx("user_name")}>
                    <div className={cx("user")}>
                        <div className={cx("avatar")}>
                            <img src="/logo/test-avt.png" alt="Avatar" />
                        </div>
                        <p>Trần Văn A</p>
                    </div>
                    <div className={cx("service_btn")}>,
                        <div className={cx("logout")}>
                            {user ? (
                                <div className={cx("user-info")}>
                                    <button onClick={handleLogout} className={cx("logout-btn")}>
                                        Đăng xuất
                                    </button>
                                </div>
                            ) : null}
                        </div>
                        <button className={cx("btn")}>Thay đổi</button>
                    </div>
                </div>
                <div className={cx("user_infor")}>
                    <div className={cx("row")}>
                        <div className={cx("col-xl-5")}>
                            <div className={cx("name")}>
                                <input type="text" value="Trần Văn A" disabled />
                            </div>
                            <div className={cx("row")}>
                                <div className={cx("sex")}>
                                    <label>Giới tính:</label>
                                    <input type="text" value="Nam" disabled />
                                </div>
                                <div className={cx("date")}>
                                    <label>Ngày sinh:</label>
                                    <input type="text" value="16/05/1990" disabled />
                                </div>
                            </div>
                            <div className={cx("phone")}>
                                <label>Số điện thoại:</label>
                                <input type="text" value="0345543580" disabled />
                            </div>
                            <div className={cx("mail")}>
                                <label>Email:</label>
                                <input type="text" value="********90@gmail.com" disabled />
                            </div>
                            <div className={cx("hobby")}>
                                <label>Sở thích:</label>
                                <input type="text" value="Phòng đôi, view biển" disabled />
                            </div>
                        </div>
                        <div className={cx("col-xl-5")}>
                            <div className={cx("change_avatar")}>
                                <img src="/logo/test-avt.png" alt="Avatar" />
                                <button>Change</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPage;