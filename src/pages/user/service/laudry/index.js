import React from "react";
import styles from "./laudry.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Laudry() { 

    return (
        <div className={cx("laundry_container")}>
            <div className={cx("form_container")}>
                <form className={cx("laundry_form")}>
                    <select className={cx("form_input")}>
                        <option>Loại dịch vụ</option>
                        <option>Giặt ủi</option>
                        <option>Giặt khô</option>
                        <option>Giặt khô và ủi</option>
                    </select>
                    
                    <select className={cx("form_input")}>
                        <option>Khối lượng</option>
                        <option>Dưới 5kg</option>
                        <option>5 - 10kg</option>
                        <option>10 - 15kg</option>
                        <option>Trên 15kg</option>
                    </select>
                    
                    <select className={cx("form_input")}>
                        <option>Loại vải</option>
                        <option>Thường</option>
                        <option>Không co giãn</option>
                        <option>Co giãn</option>
                        <option>Len</option>
                        <option>Da lộn</option>
                    </select>
                    
                    <select className={cx("form_input")}>
                        <option>Loại sản phẩm</option>
                        <option>Quần áo</option>
                        <option>Khăn</option>
                        <option>Drap</option>
                        <option>Khăn trải bàn</option>
                        <option>Khăn tắm</option>
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

                    <button className={cx("submit_button")}>Đặt dịch vụ </button>
                </form>
            </div>
        </div>
        
);
}

export default Laudry;