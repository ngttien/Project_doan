import React from "react";
import styles from "./roomCard.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const RoomCard = ({ room }) => {
    // Cung cấp giá trị mặc định cho offers và amenities nếu chúng là undefined
    const offers = Array.isArray(room.offers) ? room.offers : [];
    const amenities = Array.isArray(room.amenities) ? room.amenities : [];

    return (
        <div className={cx("room-card")}>
            <div className={cx("room_image_container")}>
                <img
                    src={room.image || "https://via.placeholder.com/300"} // Hình ảnh mặc định nếu không có
                    alt={room.name || "Phòng không có tên"}
                    className={cx("room_image")}
                />
            </div>

            <div className={cx("room-info")}>
                <h2>
                    {room.name || "Không có tên"} - {room.room_price || "Không có giá"}
                </h2>
                <p>
                    <strong>Số người tối đa:</strong> {room.max_occupancy || "Không có thông tin"} |{" "}
                    <strong>Trạng thái:</strong> {room.status || "Không có thông tin"} |{" "}
                    <strong>Giường:</strong> {room.beds || "Không có thông tin"}
                </p>

                {/* Tiện nghi (bỏ comment và thêm kiểm tra an toàn) */}
                <p><strong>Tiện Nghi:</strong></p>
                {amenities.length > 0 ? (
                    <ul>
                        {amenities.map((amenity, index) => (
                            <li key={index}>{amenity}</li>
                        ))}
                    </ul>
                ) : (
                    <p>Không có tiện nghi nào được liệt kê.</p>
                )}

                {/* Ưu đãi */}
                <p><strong>Ưu Đãi:</strong></p>
                {offers.length > 0 ? (
                    <ul>
                        {offers.map((offer, index) => (
                            <li key={index}>{offer}</li>
                        ))}
                    </ul>
                ) : (
                    <p>Không có ưu đãi nào được liệt kê.</p>
                )}

                <div className={cx("room-actions")}>
                    <button className={cx("highlight")}>Đặt phòng</button>
                    <button>Xem chi tiết</button>
                </div>
            </div>
        </div>
    );
};

export default RoomCard;