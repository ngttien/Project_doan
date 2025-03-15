import React from "react";
import { FaHotel, FaBed, FaUserTie, FaUser, FaConciergeBell, FaFileInvoice, FaTags, FaStar, FaChartLine } from "react-icons/fa";
import styles from "./dashboard.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const menuItems = [
    { icon: <FaHotel />, label: "Phòng" },
    { icon: <FaBed />, label: "Đặt phòng" },
    { icon: <FaUserTie />, label: "Nhân viên" },
    { icon: <FaUser />, label: "Khách" },
    { icon: <FaConciergeBell />, label: "Dịch vụ" },
    { icon: <FaFileInvoice />, label: "Hóa đơn" },
    { icon: <FaTags />, label: "Khuyến mãi" },
    { icon: <FaStar />, label: "Phản hồi" },
    { icon: <FaChartLine />, label: "Doanh thu" },
];

const Dashboard = () => {
    return (
        <div className={cx("dashboard_container")}>
            <div className={cx("menu_grid")}>
                {menuItems.map((item, index) => (
                    <div key={index} className={cx("menu_item")}> 
                        {item.icon}
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
