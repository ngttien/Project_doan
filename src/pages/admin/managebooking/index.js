import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Styles from "./managebooking.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(Styles);

const branches = ["Chi nhánh 1", "Chi nhánh 2", "Chi nhánh 3"];
const roomsByBranch = {
    "Chi nhánh 1": ["101", "102", "103"],
    "Chi nhánh 2": ["201", "202", "203"],
    "Chi nhánh 3": ["301", "302", "303"],
};

function ManageBooking() {
    const [selectedBranch, setSelectedBranch] = useState(branches[0]);
    const [customer, setCustomer] = useState("");
    const [phone, setPhone] = useState("");
    const [room, setRoom] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [bookings, setBookings] = useState([]);
    const [showMessage, setShowMessage] = useState(false);

    const handleAddBooking = () => {
        if (customer && room && checkIn && checkOut) {
            const newBooking = { branch: selectedBranch, customer, room, checkIn, checkOut };
            setBookings([...bookings, newBooking]);
            setCustomer("");
            setRoom("");
            setCheckIn("");
            setCheckOut("");
            
            // Hiển thị thông báo
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000); // Ẩn sau 3 giây
        }
    };

    const handleDelete = (index) => {
        setBookings(bookings.filter((_, i) => i !== index));
    };

    return (
        <div className={cx("booking_container")}>  
            {/* Hiển thị thông báo đặt phòng thành công */}
            {showMessage && <div className={cx("success_message")}>Đặt phòng thành công!</div>}

            <div className={cx("form_client")}>
                <input
                    type="text"
                    placeholder="Tên khách hàng"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Số điện thoại"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <select onChange={(e) => setSelectedBranch(e.target.value)} value={selectedBranch}>
                    {branches.map((branch) => (
                        <option key={branch} value={branch}>{branch}</option>
                    ))}
                </select>
                <select onChange={(e) => setRoom(e.target.value)} value={room}>
                    <option value="">Chọn phòng</option>
                    {roomsByBranch[selectedBranch].map((room) => (
                        <option key={room} value={room}>{room}</option>
                    ))}
                </select>
                <span>Ngày nhận phòng:</span>
                <span>Ngày trả phòng:</span>
                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                <button onClick={handleAddBooking}>Thêm</button>
            </div>
        </div>
    );
}

export default ManageBooking;
