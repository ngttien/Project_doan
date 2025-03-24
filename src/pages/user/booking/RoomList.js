import React, { useEffect, useState } from "react";
import RoomCard from "./RoomCard";
import styles from "./roomCard.module.scss";
import classNames from "classnames/bind";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";

const cx = classNames.bind(styles);

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRooms = async () => {
        try {
            setLoading(true);
            const roomsCollection = collection(db, "rooms");
            const roomsSnapshot = await getDocs(roomsCollection);
            const roomsList = roomsSnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    name: data.name || "Không có tên",
                    room_price: data.room_price || "Không có giá",
                    max_occupancy: data.max_occupancy || "Không có thông tin",
                    status: data.status || "Không có thông tin",
                    view: data.view || "Không có thông tin",
                    image: data.image || "https://via.placeholder.com/300", // Hình ảnh mặc định
                    amenities: Array.isArray(data.amenities) ? data.amenities : [],
                    offers: Array.isArray(data.offers) ? data.offers : [],
                };
            });
            setRooms(roomsList);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching rooms:", err);
            setError("Không thể tải danh sách phòng. Vui lòng thử lại sau.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    if (loading) {
        return <div className={cx("loading")}>Đang tải...</div>;
    }

    if (error) {
        return <div className={cx("error")}>{error}</div>;
    }

    return (
        <div className={cx("room-list")}>
            {rooms.length > 0 ? (
                rooms.map((room) => <RoomCard key={room.id} room={room} />)
            ) : (
                <div className={cx("no-rooms")}>Không có phòng nào để hiển thị.</div>
            )}
        </div>
    );
};

export default RoomList;