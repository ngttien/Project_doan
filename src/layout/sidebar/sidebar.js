import { useEffect, useRef, useState } from "react";
import styles from "./sidebar.module.scss";
import classNames from "classnames/bind";
import { MdArrowDropDown } from "react-icons/md";

const cx = classNames.bind(styles);

function Sidebar({ isOpen, toggleSidebar }) {
    const sidebarRef = useRef(null);
    const [isServiceOpen, setIsServiceOpen] = useState(false);

    // Đóng sidebar khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                toggleSidebar();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, toggleSidebar]);

    return (
        <>
            {/* Overlay nền khi sidebar mở */}
            {isOpen && <div className={cx("backdrop")} onClick={toggleSidebar}></div>}

            {/* Sidebar */}
            <nav ref={sidebarRef} className={cx("sidebar", { active: isOpen })}>
                <div className={cx("close-btn")} onClick={toggleSidebar}>&times;</div>

                {/* Sidebar nội dung */}
                <div className={cx("sidebar-top")}>
                    <div className={cx("profile")}>
                        <div className={cx("row")}>
                            <a className={cx("avatar")} href="/#">
                                <img src="/logo/test-avt.png" alt="Avatar" />
                            </a>
                            <div className={cx("user")}>
                                <a className={cx("user-infor")} href="/#">Trần Văn A</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx("sidebar-middle")}>
                    <a href="/intro" className={cx("intro")}><p>Giới thiệu</p></a>
                    <a href="/sale" className={cx("sale")}><p>Khuyến mãi</p></a>
                    <a href="/booking" className={cx("booking")}><p>Đặt phòng</p></a>

                    {/* Dropdown dịch vụ */}
                    <div className={cx("service-wrapper")}
                        onMouseEnter={() => setIsServiceOpen(true)}
                        onMouseLeave={() => setIsServiceOpen(false)}
                    >
                        <div className={cx("row-middle")}>
                            <span className={cx("service-text")}>Dịch vụ</span>
                            <MdArrowDropDown className={cx("MdArrowDropDown")} />
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
                    <a href="/intro" className={cx("intro")}><p>Giới thiệu</p></a>
                    <a href="/sale" className={cx("sale")}><p>Khuyến mãi</p></a>
                    <a href="/booking" className={cx("booking")}><p>Đặt phòng</p></a>
                </div>

                {/* Sidebar bottom */}
                <div className={cx("sidebar-bottom")}>
                    <a href="/#">Trợ giúp</a>
                    <a href="/#">Gửi ý kiến phản hồi</a>
                </div>
            </nav>
        </>
    );
}

export default Sidebar;
