import React from 'react';
import styles from './user.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const UserPage = () => {
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
                    <button className={cx("btn")}>Thay đổi</button>
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
