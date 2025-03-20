import React from "react";
import RoomList from "./RoomList";
import styles from "./booking.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const BookingPage = () => {
    return (
        <div className={cx("room_container")}>
            <div className={cx("container")}>
                <div className={cx("booking_title")}>
                    <h1>Phòng nổi bật, đề xuất cho bạn!</h1>
                </div>
                    <RoomList />
            </div>
        </div>
    );
};

export default BookingPage;
