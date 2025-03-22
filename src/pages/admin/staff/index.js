import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './staff.module.scss';
import classNames from 'classnames/bind';
import { FaSearch } from "react-icons/fa";
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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const tokenResult = await currentUser.getIdTokenResult();
                console.log('User role:', tokenResult.claims.role);
                fetchEmployees();
            } else {
                setLoading(false);
                navigate('/admin/login');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const fetchEmployees = async () => {
        try {
            const token = await auth.currentUser.getIdToken();
            console.log('Fetching employees with token:', token);
            const response = await fetch('http://localhost:5000/api/employees', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch employees: ${errorText || response.statusText}`);
            }
            const data = await response.json();
            setEmployees(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching employees:', error);
            setLoading(false);
        }
    };

    const handleAddEmployee = async (e) => {
        e.preventDefault();
        try {
            setMessage('');
            if (!newEmployee.name || !newEmployee.position || !newEmployee.email || !newEmployee.phone || !newEmployee.status) {
                throw new Error('Vui lòng điền đầy đủ thông tin');
            }
            const token = await auth.currentUser.getIdToken();
            console.log('Token for adding employee:', token);
            console.log('Sending employee data:', newEmployee);

            const response = await fetch('http://localhost:5000/api/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newEmployee),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${errorText || response.statusText}`);
            }

            const data = await response.json();
            console.log('Added employee:', data);
            setEmployees([...employees, data]);
            setShowForm(false);
            setNewEmployee({ name: '', position: 'Nhân viên', email: '', phone: '', status: 'Đang làm' });
            setMessage('Thêm nhân viên thành công!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error adding employee:', error);
            setMessage('Thêm nhân viên thất bại: ' + error.message);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const handleUpdateStatus = async (employeeId, newStatus) => {
        try {
            setMessage('');
            const token = await auth.currentUser.getIdToken();
            console.log('Updating status for employee ID:', employeeId, 'with status:', newStatus);

            const response = await fetch(`http://localhost:5000/api/employees/${employeeId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${errorText || response.statusText}`);
            }

            const updatedEmployee = await response.json();
            console.log('Updated employee:', updatedEmployee);
            setEmployees(employees.map(emp => emp.id === employeeId ? updatedEmployee : emp));
            setMessage('Cập nhật trạng thái thành công!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error updating status:', error);
            setMessage('Cập nhật trạng thái thất bại: ' + error.message);
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

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div>Loading...</div>;

    return (
        <div className={cx("staff_container")}>
            <h1>Quản Lý Nhân Viên</h1>
            {message && <p className={message.includes('thành công') ? 'success' : 'error'}>{message}</p>}
            <div className={cx("search_add")}>
                <input
                    type="text"
                    placeholder="Tìm kiếm nhân viên..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={() => setShowForm(true)}>Thêm</button>
            </div>

            <table className={cx("staff_table")}>
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
                                {editingEmployeeId === employee.id ? (
                                    <select
                                        value={employee.status}
                                        onChange={(e) => handleUpdateStatus(employee.id, e.target.value)}
                                        onBlur={() => setEditingEmployeeId(null)}
                                    >
                                        <option value="Đang làm">Đang làm</option>
                                        <option value="Không làm">Không làm</option>
                                    </select>
                                ) : (
                                    <span onClick={() => setEditingEmployeeId(employee.id)} style={{ cursor: 'pointer' }}>
                                        {employee.status}
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showForm && (
                <div className={cx("add_form")}>
                    <h2>Thêm Nhân Viên</h2>
                    <form onSubmit={handleAddEmployee}>
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
                            required
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
                            type="text"
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
                        <button type="submit">Lưu</button>
                        <button type="button" onClick={() => setShowForm(false)}>Hủy</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminEmployees;