import React, { useState } from 'react';
import Styles from './staff.module.scss';
import classNames from 'classnames/bind';
import { FaSearch } from "react-icons/fa";

const cx = classNames.bind(Styles);

const staffList = [
    { id: 1, name: 'Nguyễn Văn A', position: 'Quản lý', email: 'a@gmail.com', phone: '0123456789', status: 'Đang làm' },
    { id: 2, name: 'Trần Thị B', position: 'Nhân viên', email: 'b@gmail.com', phone: '0987654321', status: 'Đang làm' },
    { id: 3, name: 'Lê Văn C', position: 'Nhân viên', email: 'c@gmail.com', phone: '0345678901', status: 'Không làm' }
];

function ManageStaff() {
    const [searchTerm, setSearchTerm] = useState('');
    const [staffData, setStaffData] = useState(staffList);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleStatusChange = (id, newStatus) => {
        setStaffData(prevStaff =>
            prevStaff.map(staff =>
                staff.id === id ? { ...staff, status: newStatus } : staff
            )
        );
    };

    const filteredStaff = staffData.filter(staff =>
        staff.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={cx("staff_container")}>            
            <div className={cx("search_add")}>                
                <input 
                    type="text" 
                    placeholder="Tìm kiếm nhân viên..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="Add_staff">
                    <button onClick={toggleModal} className={cx("add_button")}>
                        Thêm Nhân Viên
                    </button>
                </div>
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
                    {filteredStaff.map(staff => (
                        <tr key={staff.id}>
                            <td>{staff.name}</td>
                            <td>{staff.position}</td>
                            <td>{staff.email}</td>
                            <td>{staff.phone}</td>
                            <td>
                                <select 
                                    value={staff.status} 
                                    onChange={(e) => handleStatusChange(staff.id, e.target.value)}
                                >
                                    <option value="Đang làm">Đang làm</option>
                                    <option value="Không làm">Không làm</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className={cx("modal-overlay")}>
                    <div className={cx("modal-content")}>
                        <h2>Thêm Nhân Viên Mới</h2>
                        <p>Điền thông tin nhân viên tại đây (form có thể thêm sau).</p>
                        <button onClick={toggleModal} className={cx("close_button")}>
                            Đóng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageStaff;