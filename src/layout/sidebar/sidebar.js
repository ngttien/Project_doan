import { useEffect, useRef } from "react";
import styles from "./sidebar.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Sidebar({ isOpen, toggleSidebar }) {
    const sidebarRef = useRef(null);

    // Đóng sidebar khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                toggleSidebar(); // Đóng sidebar nếu click bên ngoài
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
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
                    <p href="/#" className={cx('infor')}>Tổng quan</p>
                    <a href="/#" className={cx('sale-infor')}>Khuyến mãi</a>
                </div>

                <div className={cx("sidebar-middle")}>
                    <a href="/#" className={cx('rank')}>Bạn là thành viên....</a>
                    <a href="/#">Hồ sơ</a>
                    <a href="/#">Thẻ của tôi</a>
                    <a href="/#">Danh sách giao dịch</a>
                    <a href="/#">Khuyến mãi của tôi</a>
                </div>

                {/* Sidebar bottom*/}
                <div className={cx("sidebar-bottom")}>
                    <a href="/#">Trợ giúp</a>
                    <a href="/#">Gửi ý kiến phản hồi</a>
                </div>
            </nav>
        </>
    );
}

export default Sidebar;
