import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './emloyee.module.scss'; // Sửa lỗi chính tả từ 'emloyee' thành 'employee'
import { auth } from '~/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const cx = classNames.bind(styles);

const AdminEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        position: 'Nhân viên',
        email: '',
        phone: '',
        status: 'Đang làm',
    });
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const [editingEmployeeId, setEditingEmployeeId] = useState(null);
    const navigate = useNavigate();

    // Xử lý authentication
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                await fetchEmployees();
            } else {
                setLoading(false);
                navigate('/admin/login');
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    // Lấy danh sách nhân viên
    const fetchEmployees = async () => {
        try {
            const token = await auth.currentUser?.getIdToken();
            const response = await fetch('http://localhost:5000/api/employees', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error('Failed to fetch employees');
            const data = await response.json();
            setEmployees(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching employees:', error);
            setLoading(false);
        }
    };

    // Thêm nhân viên mới
    const handleAddEmployee = async (e) => {
        e.preventDefault();
        try {
            const token = await auth.currentUser?.getIdToken();
            const response = await fetch('http://localhost:5000/api/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newEmployee),
            });

            if (!response.ok) throw new Error('Failed to add employee');
            const data = await response.json();
            setEmployees([...employees, data]);
            setShowForm(false);
            setNewEmployee({ name: '', position: 'Nhân viên', email: '', phone: '', status: 'Đang làm' });
            setMessage('Thêm nhân viên thành công!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage(`Thêm nhân viên thất bại: ${error.message}`);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    // Cập nhật trạng thái nhân viên
    const handleUpdateStatus = async (employeeId, newStatus) => {
        try {
            const token = await auth.currentUser?.getIdToken();
            const response = await fetch(`http://localhost:5000/api/employees/${employeeId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) throw new Error('Failed to update status');
            const updatedEmployee = await response.json();
            setEmployees(employees.map(emp => 
                emp.id === employeeId ? updatedEmployee : emp
            ));
            setEditingEmployeeId(null);
            setMessage('Cập nhật trạng thái thành công!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage(`Cập nhật trạng thái thất bại: ${error.message}`);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    // Đăng xuất
    const handleLogout = async () => {
        await signOut(auth);
        navigate('/admin/login');
    };

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className={cx('loading')}>Loading...</div>;

    return (
        <div className={cx('employee_container')}>
            <div className={cx('container')}>
                <div className={cx('main-content')}>
                    
                    <div className={cx('search_add')}>
                        <input
                            type="text"
                            placeholder="Tìm kiếm nhân viên..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className={cx("add_button")} onClick={() => setShowForm(true)}>Thêm</button>
                    </div>

                    <table className={cx('employee_table')}>
                        <thead>
                            <tr>
                                <th>Họ và tên</th>
                                <th>Chức vụ</th>
                                <th>Email</th>
                                <th>SĐT</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.map(employee => (
                                <tr key={employee.id}>
                                    <td>{employee.name}</td>
                                    <td>{employee.position}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.phone}</td>
                                    <td>
                                        <select
                                            value={employee.status}
                                            onChange={(e) => handleUpdateStatus(employee.id, e.target.value)}
                                        >
                                            <option value="Đang làm">Đang làm</option>
                                            <option value="Không làm">Không làm</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {showForm && (
                        <div className={cx('modal_overlay')}>
                            <div className={cx('modal_content')}>
                                <h2>Thêm Nhân Viên</h2>
                                <form onSubmit={handleAddEmployee}>
                                {message && (
                                    <p className={cx({
                                        'success': message.includes('thành công'),
                                        'error': !message.includes('thành công')
                                    })}>
                                        {message}
                                    </p>
                                )}
                    
                                    <input
                                        type="text"
                                        placeholder="Họ và tên"
                                        value={newEmployee.name}
                                        onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                                        required
                                    />
                                    <select
                                        value={newEmployee.position}
                                        onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                                    >
                                        <option value="Nhân viên">Nhân viên</option>
                                        <option value="Quản lý">Quản lý</option>
                                    </select>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={newEmployee.email}
                                        onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="tel"
                                        placeholder="SĐT"
                                        value={newEmployee.phone}
                                        onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                                        required
                                    />
                                    <select
                                        value={newEmployee.status}
                                        onChange={(e) => setNewEmployee({ ...newEmployee, status: e.target.value })}
                                    >
                                        <option value="Đang làm">Đang làm</option>
                                        <option value="Không làm">Không làm</option>
                                    </select>
                                    <div className={cx('form_buttons')}>
                                        <button type="submit">Lưu</button>
                                        <button type="button" onClick={() => setShowForm(false)}>Hủy</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminEmployees;