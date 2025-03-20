import React, { useState } from "react";
import styles from "./manageUser.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const initialUsers = [
  { id: 1, name: "Nguyễn Văn A", email: "user1@example.com", role: "Admin" },
  { id: 2, name: "Trần Thị B", email: "user2@example.com", role: "Nhân viên" },
  { id: 3, name: "Lê Văn C", email: "user3@example.com", role: "Khách hàng" },
];

function ManageUser() {
  const [users, setUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Khách hàng" });

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSave = () => {
    if (editingUser) {
      setUsers(users.map(user => (user.id === editingUser.id ? editingUser : user)));
      setEditingUser(null);
    } else {
      setUsers([...users, { ...newUser, id: users.length + 1 }]);
      setNewUser({ name: "", email: "", role: "Khách hàng" });
    }
  };

  return (
    <div className={cx("user_container")}>
      <h1>Quản lý Người dùng</h1>

      {/* Form thêm / sửa người dùng */}
      <div className={cx("user-form")}>
        <h2>{editingUser ? "Chỉnh sửa người dùng" : "Thêm người dùng"}</h2>
        <input
          type="text"
          placeholder="Tên"
          value={editingUser ? editingUser.name : newUser.name}
          onChange={(e) =>
            editingUser
              ? setEditingUser({ ...editingUser, name: e.target.value })
              : setNewUser({ ...newUser, name: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          value={editingUser ? editingUser.email : newUser.email}
          onChange={(e) =>
            editingUser
              ? setEditingUser({ ...editingUser, email: e.target.value })
              : setNewUser({ ...newUser, email: e.target.value })
          }
        />
        <select
          value={editingUser ? editingUser.role : newUser.role}
          onChange={(e) =>
            editingUser
              ? setEditingUser({ ...editingUser, role: e.target.value })
              : setNewUser({ ...newUser, role: e.target.value })
          }
        >
          <option value="Admin">Admin</option>
          <option value="Nhân viên">Nhân viên</option>
          <option value="Khách hàng">Khách hàng</option>
        </select>
        <button onClick={handleSave}>{editingUser ? "Lưu" : "Thêm"}</button>
      </div>

      {/* Danh sách người dùng */}
      <table className={cx("user-table")}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className={cx("edit-btn")} onClick={() => handleEdit(user)}>Sửa</button>
                <button className={cx("delete-btn")} onClick={() => handleDelete(user.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUser;
