// src/pages/admin/dashboard/index.js
import React from 'react';
import Styles from './admin.module.scss';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import '~/style/admin/admin.scss';


// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);


    // Dữ liệu biểu đồ (có thể thay đổi thành dữ liệu từ API sau)
    const chartData = {
        labels: [
            'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
            'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
        ],
        datasets: [
            {
                label: 'Doanh thu theo tháng',
                data: [100, 150, 50, 80, 200, 250, 600, 700, 300, 200, 150, 100], // Dữ liệu mẫu
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    const cx = classNames.bind(Styles);

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Doanh thu theo tháng - Thời gian: NĂM 2025',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 800, // Điều chỉnh theo giá trị tối đa của dữ liệu
                title: {
                    display: true,
                    text: 'Doanh thu (triệu đồng)',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Tháng',
                },
            },
        },
    };

    return (
        <div className={cx("admin_container")}>

            {/* {isSidebarOpen && <div className="backdrop" onClick={() => setIsSidebarOpen(false)} />} */}
            
                <div className={cx("container")}>
                    <Bar className={cx("chart")} data={chartData} options={chartOptions} />
                </div>
        </div>
    );
};

export default AdminDashboard;