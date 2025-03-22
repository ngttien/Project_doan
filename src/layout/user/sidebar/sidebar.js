import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./sidebar.module.scss";
import classNames from "classnames/bind";
import { MdArrowDropDown } from "react-icons/md";
import { auth } from '~/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const cx = classNames.bind(styles);

function Sidebar({ isOpen, toggleSidebar }) {
    const sidebarRef = useRef(null);
    const [isServiceOpen, setIsServiceOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Kiểm tra trạng thái đăng nhập khi component mount
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser); // Lưu thông tin người dùng nếu đã đăng nhập
            } else {
                setUser(null); // Đặt user là null nếu chưa đăng nhập
            }
        });

        return () => unsubscribe(); // Cleanup subscription khi component unmount
    }, []);

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

    // Hàm điều hướng đến trang đăng nhập
    const handleLoginRedirect = () => {
        navigate('/login');
        toggleSidebar(); // Đóng sidebar sau khi điều hướng
    };

    return (
        <>
            {/* Overlay nền khi sidebar mở */}
            {isOpen && <div className={cx("backdrop")} onClick={toggleSidebar}></div>}

            {/* Sidebar */}
            <nav ref={sidebarRef} className={cx("sidebar", { active: isOpen })}>
                <div className={cx("close-btn")} onClick={toggleSidebar}>×</div>

                {/* Sidebar nội dung */}
                <div className={cx("sidebar-top")}>
                    <div className={cx("profile")}>
                        <div className={cx("row")}>
                            {user ? (
                                <>
                                    <Link className={cx("avatar")} to="/user">
                                        <img src="/logo/test-avt.png" alt="Avatar" />
                                    </Link>
                                    <div className={cx("user")}>
                                        <Link className={cx("user-infor")} to="/user">
                                            {user.displayName || user.email || "Người dùng"}
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <div className={cx("not-logged-in")}>
                                    <p>Bạn chưa đăng nhập</p>
                                    <button onClick={handleLoginRedirect} className={cx("login-btn")}>
                                        Đăng nhập
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Hiển thị menu chỉ khi đã đăng nhập */}
                {user && (
                    <>
                        <div className={cx("sidebar-middle")}>
                            <Link to="/infor" className={cx("intro")}><p>Giới thiệu</p></Link>
                            <Link to="/sale" className={cx("sale")}><p>Khuyến mãi</p></Link>
                            <Link to="/booking" className={cx("booking")}><p>Đặt phòng</p></Link>

                            {/* Dropdown dịch vụ */}
                            <div
                                className={cx("service-wrapper")}
                                onMouseEnter={() => setIsServiceOpen(true)}
                                onMouseLeave={() => setIsServiceOpen(false)}
                            >
                                <div className={cx("row-middle")}>
                                    <span className={cx("service-text")}>Dịch vụ</span>
                                    <MdArrowDropDown className={cx("MdArrowDropDown")} />
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

                        {/* Sidebar bottom */}
                        <div className={cx("sidebar-bottom")}>
                            <Link to="#">Trợ giúp</Link>
                            <Link to="#">Gửi ý kiến phản hồi</Link>
                        </div>
                    </>
                )}
            </nav>
        </>
    );
}

export default Sidebar;