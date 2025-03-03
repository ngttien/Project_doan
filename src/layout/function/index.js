import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./function.module.scss";
import { MdArrowDropDown } from "react-icons/md";


const cx = classNames.bind(styles);

function Function() {
    const [isServiceOpen, setIsServiceOpen] = useState(false);

    return (
        <div className={cx('function-container')}>
            <div className={cx('top_function')}></div>
            <div className={cx('bottom_function')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('function')}>
                            <a href="/intro" className={cx("intro")}>Giới thiệu</a>
                            <a href="/sale" className={cx("sale")}>Khuyến mãi</a>
                            <a href="/booking" className={cx("booking")}>Đặt phòng</a>
                            <div className={cx("service-wrapper")}
                                onMouseEnter={() => setIsServiceOpen(true)}
                                onMouseLeave={() => setIsServiceOpen(false)}>
                                    <div className={cx("row")}>
                                        <span className={cx("service-text")}>Dịch vụ</span>
                                        <MdArrowDropDown className={cx("arrow-icon")} />
                                    </div>

                                {isServiceOpen && (
                                    <div className={cx("dropdown-menu")}>  
                                        <a href="/#">Đặt xe</a>
                                        <a href="/#">Giặt đồ</a>
                                        <a href="/#">Cửa hàng</a>
                                        <a href="/#">Đặt tiệc</a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Function;
