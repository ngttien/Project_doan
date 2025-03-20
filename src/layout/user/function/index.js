import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
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
                            <Link to="/infor" className={cx("intro")}>Giới thiệu</Link>
                            <Link to="/sale" className={cx("sale")}>Khuyến mãi</Link>
                            <Link to="/booking" className={cx("booking")}>Đặt phòng</Link>
                            <div className={cx("service-wrapper")}
                                onMouseEnter={() => setIsServiceOpen(true)}
                                onMouseLeave={() => setIsServiceOpen(false)}>
                                    <div className={cx("row")}>
                                        <span className={cx("service-text")}>Dịch vụ</span>
                                        <MdArrowDropDown className={cx("arrow-icon")} />
                                    </div>

                                {isServiceOpen && (
                                    <div className={cx("dropdown-menu")}>  
                                        <Link to="/transport">Đặt xe</Link>
                                        <Link to="/laudry">Giặt đồ</Link>
                                        <Link to="/shop">Cửa hàng</Link>
                                        <Link to="/party">Đặt tiệc</Link>
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
