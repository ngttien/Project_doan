import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import '~/style/admin/admin.scss';
import { signOut } from 'firebase/auth';
import { auth } from '~/firebase';

const AdminRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newRoom, setNewRoom] = useState({
        room_id: '',
        type_id: '',
        room_price: '',
        max_occupancy: '',
        status: 'available',
        description: '',
    });
    const [message, setMessage] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchRooms();
        fetchRoomTypes();
    }, []);

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
            setRooms(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching rooms:', error);
            setMessage('Lỗi khi lấy danh sách phòng: ' + error.message);
            setLoading(false);
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

    const handleAddRoom = async (e) => {
        e.preventDefault();
        try {
            setMessage('');
            if (!newRoom.room_id || !newRoom.type_id || !newRoom.max_occupancy) {
                throw new Error('Vui lòng điền đầy đủ thông tin bắt buộc');
            }
            const token = await auth.currentUser.getIdToken();
            const response = await fetch('http://localhost:5000/api/rooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newRoom),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${errorText || response.statusText}`);
            }

            const data = await response.json();
            console.log('Added room:', data);
            setRooms([...rooms, { ...newRoom, room_id: newRoom.room_id }]);
            setNewRoom({
                room_id: '',
                type_id: '',
                room_price: '',
                max_occupancy: '',
                status: 'available',
                description: '',
            });
            setMessage('Thêm phòng thành công!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error adding room:', error);
            setMessage('Thêm phòng thất bại: ' + error.message);
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

    const handleRoomTypeChange = (e) => {
        const selectedTypeId = e.target.value;
        const selectedRoomType = roomTypes.find(type => type.type_id === selectedTypeId);
        const defaultPrice = selectedRoomType ? selectedRoomType.default_price : '';

        setNewRoom({
            ...newRoom,
            type_id: selectedTypeId,
            room_price: defaultPrice || '', // Tự động điền giá mặc định
        });
    };
    const selectedRoomType = roomTypes.find(type => type.type_id === newRoom.type_id);
    const defaultPrice = selectedRoomType ? selectedRoomType.default_price : '';

    if (loading) return <div>Loading...</div>;

    return (
        <div className="admin-container">
            <div className="main-content">
                <h1>Admin - Quản Lý Phòng</h1>
                {message && <p className={message.includes('thành công') ? 'success' : 'error'}>{message}</p>}
                <div className="add-form">
                    <h2>Thêm Phòng</h2>
                    <form onSubmit={handleAddRoom}>
                        <div className="form-group">
                            <label>Mã phòng</label>
                            <input
                                type="text"
                                placeholder="Mã phòng"
                                value={newRoom.room_id}
                                onChange={(e) => setNewRoom({ ...newRoom, room_id: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Loại phòng</label>
                            <select
                                value={newRoom.type_id}
                                onChange={(e) => setNewRoom({ ...newRoom, type_id: e.target.value })}
                                required
                            >
                                <option value="" disabled>Chọn loại phòng</option>
                                {roomTypes.map(type => (
                                    <option key={type.type_id} value={type.type_id}>
                                        {type.type_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Giá phòng</label>
                            {newRoom.type_id && (
                                <p>{defaultPrice} VNĐ</p>
                            )}
                        </div>
                        {/* <div className="form-group">
                            <label>Giá phòng</label>
                            <input
                                type="number"
                                placeholder="Giá phòng (mặc định nếu để trống)"
                                value={newRoom.room_price}
                                onChange={(e) => setNewRoom({ ...newRoom, room_price: e.target.value })}
                            />
                        </div> */}
                        <div className="form-group">
                            <label>Số người tối đa</label>
                            <input
                                type="number"
                                placeholder="Số người tối đa"
                                value={newRoom.max_occupancy}
                                onChange={(e) => setNewRoom({ ...newRoom, max_occupancy: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Trạng thái</label>
                            <select
                                value={newRoom.status}
                                onChange={(e) => setNewRoom({ ...newRoom, status: e.target.value })}
                                required
                            >
                                <option value="available">Có sẵn</option>
                                <option value="occupied">Đã đặt</option>
                                <option value="maintenance">Bảo trì</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Mô tả</label>
                            <input
                                type="text"
                                placeholder="Mô tả"
                                value={newRoom.description}
                                onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
                            />
                        </div>
                        <button type="submit">Thêm</button>
                    </form>
                </div>
                <h2>Danh Sách Phòng</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Mã Phòng</th>
                            <th>Loại Phòng</th>
                            <th>Giá Phòng</th>
                            <th>Số Người Tối Đa</th>
                            <th>Trạng Thái</th>
                            <th>Mô Tả</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map(room => (
                            <tr key={room.room_id}>
                                <td>{room.room_id}</td>
                                <td>{roomTypes.find(type => type.type_id === room.type_id)?.type_name || 'Không xác định'}</td>
                                <td>{room.room_price}</td>
                                <td>{room.max_occupancy}</td>
                                <td>{room.status}</td>
                                <td>{room.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminRooms;