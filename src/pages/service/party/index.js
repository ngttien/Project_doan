import React from "react";
import styles from "./party.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Party = () => {
    return (
        <div className={cx("party_container")}>
            <div className={cx("form_container")}>
                <form className={cx("party_form")}>
                    <select className={cx("form_input")}>
                        <option>Loại tiệc</option>
                        <option>Tiệc cưới</option>
                        <option>Tiệc sinh nhật</option>
                        <option>Tiệc công ty</option>
                        <option>Tiệc gia đình</option>
                    </select>
                    
                    <select className={cx("form_input")}>
                        <option>Số lượng khách</option>
                        <option>Dưới 50</option>
                        <option>50 - 100</option>
                        <option>100 - 200</option>
                        <option>Trên 200</option>
                    </select>
                    
                    <select className={cx("form_input")}>
                        <option>Gói dịch vụ</option>
                        <option>Gói tiêu chuẩn</option>
                        <option>Gói cao cấp</option>
                        <option>Gói VIP</option>
                    </select>
                    
                    <select className={cx("form_input")}>
                        <option>Địa điểm tổ chức</option>
                        <option>Nhà hàng</option>
                        <option>Khách sạn</option>
                        <option>Hội trường</option>
                        <option>Ngoài trời</option>
                    </select>

                    <div className={cx("form_row")}>
                        <input type="date" className={cx("form_input")} />
                        <div className={cx("time_picker")}>
                            <select className={cx("time_input")}>
                                <option>Chọn giờ</option>
                                <option>08:00 AM</option>
                                <option>10:00 AM</option>
                                <option>12:00 PM</option>
                                <option>03:00 PM</option>
                                <option>06:00 PM</option>
                                <option>08:00 PM</option>
                            </select>
                        </div>
                    </div>

                    <button className={cx("submit_button")}>Đặt tiệc</button>
                </form>
            </div>
        </div>
    );
};

export default Party;
