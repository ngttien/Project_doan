import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Styles from './headerAdmin.module.scss';
import classNames from 'classnames/bind';
import { auth } from '~/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const cx = classNames.bind(Styles);

function AdminHeader() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Kiểm tra trạng thái đăng nhập khi component mount
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    // Hàm xử lý điều hướng khi nhấn chữ "Admin"
    const handleNavigateToAdmin = () => {
        navigate('/admin');
    };

    console.log("Render AdminHeader");
    return (
        <header className={cx("header_container")}>
            <div className={cx("container")}>
                <div className={cx("header")}>
                    <div className={cx("user_info")}>
                        {user ? (
                            <span>Xin chào, {user.email}</span>
                        ) : (
                            <span>Chưa đăng nhập</span>
                        )}
                    </div>
                    <h1 className={cx("admin_title")} onClick={handleNavigateToAdmin}>
                        Admin
                    </h1>
                </div>
            </div>
        </header>
    );
}

export default AdminHeader;