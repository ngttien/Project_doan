import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '~/style/admin/admin.scss';
import { signOut } from 'firebase/auth';
import { auth } from '~/firebase';

const AdminServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newService, setNewService] = useState({
        name: '',
        price: '',
        description: '',
    });
    const [editService, setEditService] = useState(null);
    const [message, setMessage] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const token = await auth.currentUser.getIdToken();
            const response = await fetch('http://localhost:5000/api/services', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch services: ${errorText || response.statusText}`);
            }
            const data = await response.json();
            setServices(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching services:', error);
            setMessage('Lỗi khi lấy danh sách dịch vụ: ' + error.message);
            setLoading(false);
        }
    };

    const handleAddService = async (e) => {
        e.preventDefault();
        try {
            setMessage('');
            if (!newService.name || !newService.price) {
                throw new Error('Vui lòng điền Tên và Giá');
            }
            const token = await auth.currentUser.getIdToken();
            const response = await fetch('http://localhost:5000/api/services', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newService),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${errorText || response.statusText}`);
            }

            const data = await response.json();
            setServices([...services, data]);
            setNewService({ name: '', price: '', description: '' });
            setMessage('Thêm dịch vụ thành công!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error adding service:', error);
            setMessage('Thêm dịch vụ thất bại: ' + error.message);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const handleUpdateService = async (e) => {
        e.preventDefault();
        try {
            setMessage('');
            if (!editService.name || !editService.price) {
                throw new Error('Vui lòng điền Tên và Giá');
            }
            const token = await auth.currentUser.getIdToken();
            const response = await fetch(`http://localhost:5000/api/services/${editService.service_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name: editService.name, price: editService.price, description: editService.description }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${errorText || response.statusText}`);
            }

            const updatedService = await response.json();
            setServices(services.map(service => service.service_id === updatedService.service_id ? updatedService : service));
            setEditService(null);
            setMessage('Cập nhật dịch vụ thành công!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error updating service:', error);
            setMessage('Cập nhật dịch vụ thất bại: ' + error.message);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const handleDeleteService = async (serviceId) => {
        try {
            setMessage('');
            const token = await auth.currentUser.getIdToken();
            const response = await fetch(`http://localhost:5000/api/services/${serviceId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${errorText || response.statusText}`);
            }

            const result = await response.json();
            setServices(services.filter(service => service.service_id !== serviceId));
            setMessage('Xóa dịch vụ thành công!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error deleting service:', error);
            setMessage('Xóa dịch vụ thất bại: ' + error.message);
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
                <h1>Admin - Quản Lý Dịch Vụ</h1>
                {message && <p className={message.includes('thành công') ? 'success' : 'error'}>{message}</p>}
                <div className="add-form">
                    <h2>{editService ? 'Cập nhật Dịch Vụ' : 'Thêm Dịch Vụ'}</h2>
                    <form onSubmit={editService ? handleUpdateService : handleAddService}>
                        <div className="form-group">
                            <label>Tên dịch vụ</label>
                            <input
                                type="text"
                                placeholder="Tên dịch vụ"
                                value={editService ? editService.name : newService.name}
                                onChange={(e) => editService ? setEditService({ ...editService, name: e.target.value }) : setNewService({ ...newService, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Giá</label>
                            <input
                                type="number"
                                placeholder="Giá"
                                value={editService ? editService.price : newService.price}
                                onChange={(e) => editService ? setEditService({ ...editService, price: e.target.value }) : setNewService({ ...newService, price: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Mô tả</label>
                            <input
                                type="text"
                                placeholder="Mô tả"
                                value={editService ? editService.description : newService.description}
                                onChange={(e) => editService ? setEditService({ ...editService, description: e.target.value }) : setNewService({ ...newService, description: e.target.value })}
                            />
                        </div>
                        <button type="submit">{editService ? 'Cập nhật' : 'Thêm'}</button>
                        {editService && <button type="button" onClick={() => setEditService(null)}>Hủy</button>}
                    </form>
                </div>
                <h2>Danh Sách Dịch Vụ</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Mã Dịch Vụ</th>
                            <th>Tên Dịch Vụ</th>
                            <th>Giá</th>
                            <th>Mô Tả</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map(service => (
                            <tr key={service.service_id}>
                                <td>{service.service_id}</td>
                                <td>{service.name}</td>
                                <td>{service.price} VNĐ</td>
                                <td>{service.description}</td>
                                <td>
                                    <button onClick={() => setEditService(service)}>Sửa</button>
                                    <button onClick={() => handleDeleteService(service.service_id)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminServices;