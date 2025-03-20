import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '~/style/admin/admin.scss';
import { signOut } from 'firebase/auth';
import { auth } from '~/firebase';

const AdminCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editCustomer, setEditCustomer] = useState(null);
    const [message, setMessage] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const token = await auth.currentUser.getIdToken();
            const response = await fetch('http://localhost:5000/api/customers', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch customers: ${errorText || response.statusText}`);
            }
            const data = await response.json();
            setCustomers(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching customers:', error);
            setMessage('Lỗi khi lấy danh sách khách hàng: ' + error.message);
            setLoading(false);
        }
    };

    const handleUpdateCustomer = async (e) => {
        e.preventDefault();
        try {
            setMessage('');
            if (!editCustomer.name) {
                throw new Error('Vui lòng điền Tên khách hàng');
            }
            const token = await auth.currentUser.getIdToken();
            const response = await fetch(`http://localhost:5000/api/customers/${editCustomer.email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name: editCustomer.name, phone: editCustomer.phone, address: editCustomer.address }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${errorText || response.statusText}`);
            }

            const updatedCustomer = await response.json();
            setCustomers(customers.map(customer => customer.email === updatedCustomer.email ? updatedCustomer : customer));
            setEditCustomer(null);
            setMessage('Cập nhật khách hàng thành công!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error updating customer:', error);
            setMessage('Cập nhật khách hàng thất bại: ' + error.message);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const handleDeleteCustomer = async (email) => {
        try {
            setMessage('');
            const token = await auth.currentUser.getIdToken();
            const response = await fetch(`http://localhost:5000/api/customers/${email}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${errorText || response.statusText}`);
            }

            const result = await response.json();
            setCustomers(customers.filter(customer => customer.email !== email));
            setMessage('Xóa khách hàng thành công!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error deleting customer:', error);
            setMessage('Xóa khách hàng thất bại: ' + error.message);
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
                <h3>Doanh Thu</h3>
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
                <h1>Admin - Quản Lý Khách Hàng</h1>
                {message && <p className={message.includes('thành công') ? 'success' : 'error'}>{message}</p>}
                {editCustomer && (
                    <div className="add-form">
                        <h2>Cập nhật Khách Hàng</h2>
                        <form onSubmit={handleUpdateCustomer}>
                            <div className="form-group">
                                <label>Tên khách hàng</label>
                                <input
                                    type="text"
                                    placeholder="Tên khách hàng"
                                    value={editCustomer.name}
                                    onChange={(e) => setEditCustomer({ ...editCustomer, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Số điện thoại</label>
                                <input
                                    type="text"
                                    placeholder="Số điện thoại"
                                    value={editCustomer.phone}
                                    onChange={(e) => setEditCustomer({ ...editCustomer, phone: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Địa chỉ</label>
                                <input
                                    type="text"
                                    placeholder="Địa chỉ"
                                    value={editCustomer.address}
                                    onChange={(e) => setEditCustomer({ ...editCustomer, address: e.target.value })}
                                />
                            </div>
                            <button type="submit">Cập nhật</button>
                            <button type="button" onClick={() => setEditCustomer(null)}>Hủy</button>
                        </form>
                    </div>
                )}
                <h2>Danh Sách Khách Hàng</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Tên Khách Hàng</th>
                            <th>Số Điện Thoại</th>
                            <th>Địa Chỉ</th>
                            <th>Ngày Đăng Ký</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(customer => (
                            <tr key={customer.email}>
                                <td>{customer.email}</td>
                                <td>{customer.name}</td>
                                <td>{customer.phone}</td>
                                <td>{customer.address}</td>
                                <td>{new Date(customer.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <button onClick={() => setEditCustomer(customer)}>Sửa</button>
                                    <button onClick={() => handleDeleteCustomer(customer.email)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminCustomers;