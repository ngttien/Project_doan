import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './manageUser.module.scss';
import classNames from 'classnames/bind';
import { FaSearch } from "react-icons/fa";
import { auth } from '~/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const cx = classNames.bind(styles);

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editCustomer, setEditCustomer] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        fetchCustomers();
      } else {
        setLoading(false);
        navigate('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

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

  // Lọc danh sách khách hàng theo searchTerm
  const filteredCustomers = customers.filter(customer =>
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className={cx("user_container")}>
      <h1>Quản Lý Khách Hàng</h1>
      {message && <p className={message.includes('thành công') ? 'success' : 'error'}>{message}</p>}

      {/* Ô tìm kiếm */}
      <div className={cx("search_add")}>
        <input
          type="text"
          placeholder="Tìm kiếm khách hàng..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Form chỉnh sửa khách hàng */}
      {editCustomer && (
        <div className={cx("user_form")}>
          <h2>Chỉnh sửa khách hàng</h2>
          <input
            type="text"
            placeholder="Tên khách hàng"
            value={editCustomer.name}
            onChange={(e) => setEditCustomer({ ...editCustomer, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Số điện thoại"
            value={editCustomer.phone || ''}
            onChange={(e) => setEditCustomer({ ...editCustomer, phone: e.target.value })}
          />
          <input
            type="text"
            placeholder="Địa chỉ"
            value={editCustomer.address || ''}
            onChange={(e) => setEditCustomer({ ...editCustomer, address: e.target.value })}
          />
          <button onClick={handleUpdateCustomer}>Lưu</button>
          <button onClick={() => setEditCustomer(null)}>Hủy</button>
        </div>
      )}

      {/* Danh sách khách hàng */}
      <table className={cx("user_table")}>
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
          {filteredCustomers.map(customer => (
            <tr key={customer.email}>
              <td>{customer.email}</td>
              <td>{customer.name}</td>
              <td>{customer.phone || 'N/A'}</td>
              <td>{customer.address || 'N/A'}</td>
              <td>{new Date(customer.createdAt).toLocaleDateString()}</td>
              <td>
                <button className={cx("edit_btn")} onClick={() => setEditCustomer(customer)}>Sửa</button>
                <button className={cx("delete_btn")} onClick={() => handleDeleteCustomer(customer.email)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCustomers;