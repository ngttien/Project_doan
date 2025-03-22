import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./sidebarAdmin.module.scss";
import classNames from "classnames/bind";
import { signOut } from 'firebase/auth';
import { auth } from '~/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const cx = classNames.bind(styles);

function AdminSidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Kiểm tra trạng thái đăng nhập khi component mount
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true); // Người dùng đã đăng nhập
            } else {
                setIsAuthenticated(false); // Người dùng chưa đăng nhập
            }
        });

        return () => unsubscribe(); // Cleanup subscription khi component unmount
    }, []);

    // Hàm xử lý đăng xuất
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/admin/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    // Hàm xử lý đăng nhập (điều hướng đến trang đăng nhập)
    const handleLogin = () => {
        navigate('/admin/login');
    };

    return (
        <div className={cx("sidebar_container")}>
            <div className={cx("content")}>
                <Link to="/admin/revenue" className={cx("select", { active: location.pathname === "/admin/revenue" })}>
                    <p>Doanh Thu</p>
                </Link>
                <Link to="/admin/manage-staff" className={cx("select", { active: location.pathname === "/admin/manage-staff" })}>
                    <p>Quản Lí Nhân Viên</p>
                </Link>
                <Link to="/admin/manage-user" className={cx("select", { active: location.pathname === "/admin/manage-user" })}>
                    <p>Quản Lí Khách Hàng</p>
                </Link>
                <Link to="/admin/manage-rooms" className={cx("select", { active: location.pathname === "/admin/manage-rooms" })}>
                    <p>Quản Lí Phòng</p>
                </Link>
                <Link to="/admin/room-types" className={cx("select", { active: location.pathname === "/admin/room-types" })}>
                    <p>Quản Lí Loại Phòng</p>
                </Link>
                <Link to="/admin/manage-booking" className={cx("select", { active: location.pathname === "/admin/manage-booking" })}>
                    <p>Quản Lí Đặt Phòng</p>
                </Link>
                <Link to="/admin/manage-services" className={cx("select", { active: location.pathname === "/admin/manage-services" })}>
                    <p>Quản Lí Dịch Vụ</p>
                </Link>
                <Link to="/admin/manage-bills" className={cx("select", { active: location.pathname === "/admin/manage-bills" })}>
                    <p>Quản Lí Hoá Đơn</p>
                </Link>
                <Link to="/admin/reviews" className={cx("select", { active: location.pathname === "/admin/reviews" })}>
                    <p>Quản Lí Đánh Giá và Phản Hồi</p>
                </Link>

                {/* Hiển thị nút "Đăng nhập" hoặc "Đăng xuất" dựa trên trạng thái đăng nhập */}
                <button
                    className={cx("logout_btn")}
                    onClick={isAuthenticated ? handleLogout : handleLogin}
                >
                    {isAuthenticated ? 'Đăng xuất' : 'Đăng nhập'}
                </button>
            </div>
        </div>
    );
}

export default AdminSidebar;