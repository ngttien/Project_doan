import { useLocation } from "react-router-dom";
import React from "react"; // Import useLocation
import styles from "./sidebarAdmin.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth } from '~/firebase';
import { useNavigate } from 'react-router-dom';

function AdminSidebar() {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
    const location = useLocation();
    
    // const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/admin/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    // const handleNavigate = (path) => {
    //     navigate(path);
    //     setIsSidebarOpen(false); // Đóng sidebar trên mobile sau khi điều hướng
    // };

    return (
        <div className={cx("sidebar_container")}>
            {/* <div className={cx(`content ${isSidebarOpen ? 'open' : ''}`)}> */}
            <div className={cx("content")}>
                <Link to="/admin" className={cx("select", { active: location.pathname === "/admin" })}>
                    Doanh Thu
                </Link>
                <Link to="/admin/employees" className={cx("select", { active: location.pathname === "/admin/employees" })}>
                    Quản Lý Nhân Viên
                </Link>
                <Link to="/admin/customers" className={cx("select", { active: location.pathname === "/admin/customers" })}>
                    Quản Lý Khách Hàng
                </Link>
                <Link to="/admin/rooms" className={cx("select", { active: location.pathname === "/admin/rooms" })}>
                    Quản Lý Phòng
                </Link>
                <Link to="/admin/room_types" className={cx("select", { active: location.pathname === "/admin/room_types" })}>
                    Quản Lý Loại Phòng
                </Link>
                <Link to="/admin/bookings" className={cx("select", { active: location.pathname === "/admin/bookings" })}>
                    Quản Lý Đặt Phòng
                </Link>
                <Link to="/admin/services" className={cx("select", { active: location.pathname === "/admin/services" })}>
                    Quản Lý Dịch Vụ
                </Link>
                <Link to="/admin/invoices" className={cx("select", { active: location.pathname === "/admin/invoices" })}>
                    Quản Lý Hóa Đơn
                </Link>
                <Link to="/admin/statistics" className={cx("select", { active: location.pathname === "/admin/statistics" })}>
                    Thống Kê Gần Đây
                </Link>
                    <button className={cx("logout_btn")} onClick={handleLogout}>
                        Đăng xuất
                    </button>
                </div>
            </div>
    );
}

export default AdminSidebar;
