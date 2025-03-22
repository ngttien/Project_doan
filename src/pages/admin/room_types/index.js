import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './roomType.module.scss';
import classNames from 'classnames/bind';
import { FaSearch } from "react-icons/fa";
import { auth } from '~/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const cx = classNames.bind(styles);

const AdminRoomTypes = () => {
    const [roomTypes, setRoomTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [newRoomType, setNewRoomType] = useState({
        type_name: '',
        default_price: '',
        description: '',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                fetchRoomTypes();
            } else {
                setLoading(false);
                navigate('/admin/login');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

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

    // Lọc danh sách loại phòng theo searchTerm
    const filteredRoomTypes = roomTypes.filter(roomType =>
        roomType.type_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div>Loading...</div>;

    return (
        <div className={cx("room_type_container")}>
            <h1>Quản Lý Loại Phòng</h1>
            {message && <p className={message.includes('thành công') ? 'success' : 'error'}>{message}</p>}

            {/* Ô tìm kiếm */}
            <div className={cx("search_add")}>
                <input
                    type="text"
                    placeholder="Tìm kiếm loại phòng theo tên..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Form thêm loại phòng */}
            <div className={cx("add_form")}>
                <h2>Thêm Loại Phòng</h2>
                <form onSubmit={handleAddRoomType}>
                    <div className={cx("form_group")}>
                        <label>Tên loại phòng</label>
                        <input
                            type="text"
                            placeholder="Tên loại phòng"
                            value={newRoomType.type_name}
                            onChange={(e) => setNewRoomType({ ...newRoomType, type_name: e.target.value })}
                            required
                        />
                    </div>
                    <div className={cx("form_group")}>
                        <label>Giá mặc định</label>
                        <input
                            type="number"
                            placeholder="Giá mặc định"
                            value={newRoomType.default_price}
                            onChange={(e) => setNewRoomType({ ...newRoomType, default_price: e.target.value })}
                            required
                        />
                    </div>
                    <div className={cx("form_group")}>
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

            {/* Danh sách loại phòng */}
            <h2>Danh Sách Loại Phòng</h2>
            <table className={cx("room_type_table")}>
                <thead>
                    <tr>
                        <th>Mã Loại</th>
                        <th>Tên Loại</th>
                        <th>Giá Mặc Định</th>
                        <th>Mô Tả</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRoomTypes.map(roomType => (
                        <tr key={roomType.type_id}>
                            <td>{roomType.type_id}</td>
                            <td>{roomType.type_name}</td>
                            <td>{roomType.default_price}</td>
                            <td>{roomType.description || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminRoomTypes;