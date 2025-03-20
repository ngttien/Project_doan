import { Link, useLocation } from "react-router-dom"; // Import useLocation
import styles from "./sidebarAdmin.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function AdminSidebar() {
    const location = useLocation(); // Lấy pathname hiện tại

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
            </div>
        </div>
    );
}

export default AdminSidebar;
