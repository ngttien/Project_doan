import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHotel, FaBed, FaUserTie, FaUser, FaConciergeBell, FaFileInvoice, FaTags, FaStar, FaChartLine } from "react-icons/fa";
import styles from "./dashboard.module.scss";
import classNames from "classnames/bind";
import { auth } from '~/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const cx = classNames.bind(styles);

const menuItems = [
    { icon: <FaHotel />, label: "Phòng", path: "/admin/manage-rooms" },
    { icon: <FaBed />, label: "Đặt phòng", path: "/admin/manage-booking" },
    { icon: <FaUserTie />, label: "Nhân viên", path: "/admin/manage-staff" },
    { icon: <FaUser />, label: "Khách", path: "/admin/manage-user" },
    { icon: <FaConciergeBell />, label: "Dịch vụ", path: "/admin/manage-services" },
    { icon: <FaFileInvoice />, label: "Hóa đơn", path: "/admin/manage-bills" },
    { icon: <FaTags />, label: "Khuyến mãi", path: "/admin/promotions" },
    { icon: <FaStar />, label: "Phản hồi", path: "/admin/reviews" },
    { icon: <FaChartLine />, label: "Doanh thu", path: "/admin/revenue" },
];

const Dashboard = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Kiểm tra trạng thái đăng nhập khi component mount
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        });

        return () => unsubscribe();
    }, []);

    // Hàm xử lý điều hướng
    const handleNavigate = (path) => {
        if (isAuthenticated) {
            navigate(path);
        } else {
            alert("Bắt buộc đăng nhập để tiếp tục!");
        }
    };

    return (
        <div className={cx("dashboard_container")}>
            <div className={cx("menu_grid")}>
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        className={cx("menu_item")}
                        onClick={() => handleNavigate(item.path)}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;