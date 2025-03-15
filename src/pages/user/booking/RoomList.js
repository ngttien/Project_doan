import React from "react";
import RoomCard from "./RoomCard";
import styles from "./roomCard.module.scss";
import classNames from "classnames/bind";
import roomImg1 from "../../../assets/user/images/room/room_1.png";
import roomImg2 from "../../../assets/user/images/room/room_2.png";
import roomImg3 from "../../../assets/user/images/room/room_3.png";
const cx = classNames.bind(styles);

const rooms = [
    {
        id: 1,
        name: "Phòng View Biển",
        price: "1.500.000 VND/Đêm",
        size: "35m²",
        beds: "1 giường đôi lớn",
        view: "Hướng biển tuyệt đẹp",
        image: roomImg1,  // Sử dụng ảnh đã import
        amenities: ["Bữa sáng buffet miễn phí", "Smart TV, Wi-Fi, minibar", "Hồ bơi, phòng gym, spa", "Dịch vụ phòng 24/7"],
        offers: ["Tặng 1 cocktail khi đặt online", "Miễn phí đưa đón sân bay (từ 2 đêm)"]
    },
    {
        id: 2,
        name: "Phòng View Thành Phố",
        price: "2.500.000 VND/Đêm",
        size: "50m²",
        beds: "1 giường đôi lớn",
        view: "Thành phố lung linh",
        image: roomImg2,  // Sử dụng ảnh đã import
        amenities: ["Wi-Fi miễn phí, Smart TV 55 inch", "Phòng tắm rộng, bồn tắm thư giãn", "Minibar, bàn làm việc, ghế sofa"],
        offers: ["Bữa sáng buffet miễn phí", "Miễn phí đưa đón sân bay", "Voucher giảm giá 20% dịch vụ spa"]
    },
    {
        id: 3,
        name: "Phòng View Biển",
        price: "3.500.000 VND/Đêm",
        size: "50m²",
        beds: "1 giường đôi lớn",
        view: "Hướng biển tuyệt đẹp",
        image: roomImg3,  // Sử dụng ảnh đã import
        amenities: ["Phòng tắm rộng, bồn tắm thư giãn", "Smart TV, Wi-Fi, minibar, bàn làm việc", "Hồ bơi, phòng gym, spa", "Dịch vụ phòng 24/7"],
        offers: ["Tặng 1 cocktail khi đặt online", "Miễn phí đưa đón sân bay"]
    }
];


const RoomList = () => {
    return (
        <div className={cx("room-list")}>
            {rooms.map((room) => (
                <RoomCard key={room.id} room={room} />
            ))}
        </div>
    );
};

export default RoomList;
