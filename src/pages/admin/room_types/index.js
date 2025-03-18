import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '~/style/admin/admin.scss';
import { signOut } from 'firebase/auth';
import { auth } from '~/firebase';

const AdminRoomTypes = () => {
    const [roomTypes, setRoomTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newRoomType, setNewRoomType] = useState({
        type_name: '',
        default_price: '',
        description: '',
    });
    const [message, setMessage] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchRoomTypes();
    }, []);

    const fetchRoomTypes = async () => {
        try {
            const token = await auth.currentUser.getIdToken();
            const response = await fetch('http://localhost:5000/api/room_types', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch room types: ${errorText || response.statusText}`);
            }
            const data = await response.json();
            setRoomTypes(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching room types:', error);
            setMessage('Lỗi khi lấy danh sách loại phòng: ' + error.message);
            setLoading(false);
        }
    };

    const handleAddRoomType = async (e) => {
        e.preventDefault();
        try {
            setMessage('');
            if (!newRoomType.type_name || !newRoomType.default_price) {
                throw new Error('Vui lòng điền đầy đủ thông tin bắt buộc');
            }
            const token = await auth.currentUser.getIdToken();
            const response = await fetch('http://localhost:5000/api/room_types', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newRoomType),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${errorText || response.statusText}`);
            }

            const data = await response.json();
            console.log('Added room type:', data);
            setRoomTypes([...roomTypes, data]);
            setNewRoomType({
                type_name: '',
                default_price: '',
                description: '',
            });
            setMessage('Thêm loại phòng thành công!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error adding room type:', error);
            setMessage('Thêm loại phòng thất bại: ' + error.message);
            setTimeout(() => setMessage(''), 3000);
        }
    };

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
        setIsSidebarOpen(false);
    };

    if (loading) return <div>Loading...</div>;

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
                <h1>Admin - Quản Lý Loại Phòng</h1>
                {message && <p className={message.includes('thành công') ? 'success' : 'error'}>{message}</p>}
                <div className="add-form">
                    <h2>Thêm Loại Phòng</h2>
                    <form onSubmit={handleAddRoomType}>
                        <div className="form-group">
                            <label>Tên loại phòng</label>
                            <input
                                type="text"
                                placeholder="Tên loại phòng"
                                value={newRoomType.type_name}
                                onChange={(e) => setNewRoomType({ ...newRoomType, type_name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Giá mặc định</label>
                            <input
                                type="number"
                                placeholder="Giá mặc định"
                                value={newRoomType.default_price}
                                onChange={(e) => setNewRoomType({ ...newRoomType, default_price: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Mô tả</label>
                            <input
                                type="text"
                                placeholder="Mô tả"
                                value={newRoomType.description}
                                onChange={(e) => setNewRoomType({ ...newRoomType, description: e.target.value })}
                            />
                        </div>
                        <button type="submit">Thêm</button>
                    </form>
                </div>
                <h2>Danh Sách Loại Phòng</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Mã Loại</th>
                            <th>Tên Loại</th>
                            <th>Giá Mặc Định</th>
                            <th>Mô Tả</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roomTypes.map(roomType => (
                            <tr key={roomType.type_id}>
                                <td>{roomType.type_id}</td>
                                <td>{roomType.type_name}</td>
                                <td>{roomType.default_price}</td>
                                <td>{roomType.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminRoomTypes;