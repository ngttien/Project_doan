
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import '~/style/admin/admin.scss';
import { signOut } from 'firebase/auth';
import { auth } from '~/firebase';

const AdminBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newBooking, setNewBooking] = useState({
        customerName: '',
        branch: '',
        phone: '',
        roomNumber: '',
        bookingDate: '',
        checkOutDate: '',
    });
    const [message, setMessage] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchBookings();
        fetchRooms();
        fetchRoomTypes();
    }, []);

    const fetchBookings = async () => {
        try {
            const token = await auth.currentUser.getIdToken();
            console.log('Fetching bookings with token:', token);
            const response = await fetch('http://localhost:5000/api/bookings', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch bookings: ${errorText || response.statusText}`);
            }
            const data = await response.json();
            setBookings(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            setLoading(false);
        }
    };

    const fetchRooms = async () => {
        try {
            const token = await auth.currentUser.getIdToken();
            const response = await fetch('http://localhost:5000/api/rooms', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch rooms: ${errorText || response.statusText}`);
            }
            const data = await response.json();
            const availableRooms = data.filter(room => room.status === 'available');
            setRooms(availableRooms);
        } catch (error) {
            console.error('Error fetching rooms:', error);
            setMessage('Lỗi khi lấy danh sách phòng: ' + error.message);
        }
    };

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
        } catch (error) {
            console.error('Error fetching room types:', error);
            setMessage('Lỗi khi lấy danh sách loại phòng: ' + error.message);
        }
    };

    const handleAddBooking = async (e) => {
        e.preventDefault();
        try {
            setMessage('');
            console.log('Submitting booking data:', newBooking);
            if (!newBooking.customerName || newBooking.customerName.trim() === '') {
                throw new Error('Vui lòng điền Tên khách hàng');
            }
            if (!newBooking.branch || newBooking.branch === '') {
                throw new Error('Vui lòng chọn Loại phòng');
            }
            if (!newBooking.phone || newBooking.phone.trim() === '') {
                throw new Error('Vui lòng điền Nghề nghiệp');
            }
            if (!newBooking.roomNumber || newBooking.roomNumber === '') {
                throw new Error('Vui lòng chọn Phòng');
            }
            if (!newBooking.bookingDate) {
                throw new Error('Vui lòng chọn Ngày đặt phòng');
            }
            if (!newBooking.checkOutDate) {
                throw new Error('Vui lòng chọn Ngày trả phòng');
            }

            const token = await auth.currentUser.getIdToken();
            console.log('Token for adding booking:', token);
            console.log('Sending booking data:', newBooking);

            const response = await fetch('http://localhost:5000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newBooking),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${errorText || response.statusText}`);
            }

            const data = await response.json();
            console.log('Added booking:', data);
            setBookings([...bookings, data]);
            setNewBooking({
                customerName: '',
                branch: '',
                phone: '',
                roomNumber: '',
                bookingDate: '',
                checkOutDate: '',
            });
            setMessage('Thêm đặt phòng thành công!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error adding booking:', error);
            setMessage('Thêm đặt phòng thất bại: ' + error.message);
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
            <div className="main-content">
                <h1>Admin</h1>
                {message && <p className={message.includes('thành công') ? 'success' : 'error'}>{message}</p>}
                <div className="add-form">
                    <h2>Thêm Đặt Phòng</h2>
                    <form onSubmit={handleAddBooking}>
                        <div className="form-group">
                            <label>Tên khách hàng</label>
                            <input
                                type="text"
                                placeholder="Tên khách hàng"
                                value={newBooking.customerName}
                                onChange={(e) => setNewBooking({ ...newBooking, customerName: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Chi nhánh</label>
                            <select
                                value={newBooking.branch}
                                onChange={(e) => setNewBooking({ ...newBooking, branch: e.target.value })}
                                required
                            >
                                <option value="" disabled>Chọn chi nhánh</option>
                                <option value="Hà Nội">Hà Nội</option>
                                <option value="Đà Nẵng">Đà Nẵng</option>
                                <option value="TP Hồ Chí Minh">TP Hồ Chí Minh</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Số điện thoại</label>
                            <input
                                type="text"
                                placeholder="SĐT"
                                value={newBooking.phone}
                                onChange={(e) => setNewBooking({ ...newBooking, phone: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Chọn phòng</label>
                            <select
                                value={newBooking.roomNumber}
                                onChange={(e) => setNewBooking({ ...newBooking, roomNumber: e.target.value })}
                                required
                            >
                                <option value="" disabled>Chọn phòng có sẵn</option>
                                {rooms.map(room => {
                                    const roomType = roomTypes.find(type => type.type_id === room.type_id);
                                    return (
                                        <option key={room.room_id} value={room.room_id}>
                                            {room.room_id} ({roomType ? roomType.type_name : 'Không xác định'})
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Ngày đặt phòng</label>
                            <input
                                type="date"
                                value={newBooking.bookingDate}
                                onChange={(e) => setNewBooking({ ...newBooking, bookingDate: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Ngày trả phòng</label>
                            <input
                                type="date"
                                value={newBooking.checkOutDate}
                                onChange={(e) => setNewBooking({ ...newBooking, checkOutDate: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit">Thêm</button>
                    </form>
                </div>
                <h2>Danh Sách Đặt Phòng</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Tên Khách Hàng</th>
                            <th>Chi Nhánh</th>
                            <th>Số Phòng</th>
                            <th>Số Điện Thoại</th>
                            <th>Ngày Đặt</th>
                            <th>Ngày Trả</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking.id}>
                                <td>{booking.customerName}</td>
                                <td>{booking.branch}</td>
                                <td>{booking.roomNumber}</td>
                                <td>{booking.phone}</td>
                                <td>{booking.bookingDate}</td>
                                <td>{booking.checkOutDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminBooking;