// src/pages/admin/dashboard/index.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '~/style/admin/admin.scss';
import { signOut } from 'firebase/auth';
import { auth } from '~/firebase';

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/admin/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleNavigate = (path) => {
        navigate(path);
        setIsSidebarOpen(false); // Đóng sidebar trên mobile sau khi điều hướng
    };

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
        <div className="admin-container">
            <button className="hamburger" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                ☰
            </button>
            {isSidebarOpen && <div className="backdrop" onClick={() => setIsSidebarOpen(false)} />}
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <ul>
                    <li className={location.pathname === '/admin' ? 'active' : ''} onClick={() => handleNavigate('/admin')}>
                        Doanh Thu
                    </li>
                    <li className={location.pathname === '/admin/employees' ? 'active' : ''} onClick={() => handleNavigate('/admin/employees')}>
                        Quản Lý Nhân Viên
                    </li>
                    <li className={location.pathname === '/admin/customers' ? 'active' : ''} onClick={() => handleNavigate('/admin/customers')}>
                        Quản Lý Khách Hàng
                    </li>
                    <li className={location.pathname === '/admin/rooms' ? 'active' : ''} onClick={() => handleNavigate('/admin/rooms')}>
                        Quản Lý Phòng
                    </li>
                    <li className={location.pathname === '/admin/room_types' ? 'active' : ''} onClick={() => handleNavigate('/admin/room_types')}>
                        Quản Lý Loại Phòng
                    </li>
                    <li className={location.pathname === '/admin/bookings' ? 'active' : ''} onClick={() => handleNavigate('/admin/bookings')}>
                        Quản Lý Đặt Phòng
                    </li>
                    <li className={location.pathname === '/admin/services' ? 'active' : ''} onClick={() => handleNavigate('/admin/services')}>
                        Quản Lý Dịch Vụ
                    </li>
                    <li className={location.pathname === '/admin/invoices' ? 'active' : ''} onClick={() => handleNavigate('/admin/invoices')}>
                        Quản Lý Hóa Đơn
                    </li>
                    <li className={location.pathname === '/admin/statistics' ? 'active' : ''} onClick={() => handleNavigate('/admin/statistics')}>
                        Thống Kê Gần Đây
                    </li>
                </ul>
                <button className="logout-btn" onClick={handleLogout}>
                    Đăng xuất
                </button>
            </div>
            <div className="main-content">
                <h1>Admin</h1>
                <div className="chart-container">
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;