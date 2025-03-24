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
    const [userRole, setUserRole] = useState(null); 
    const navigate = useNavigate();

    // Kiểm tra trạng thái đăng nhập và vai trò
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                // Lấy vai trò từ custom claims
                const tokenResult = await currentUser.getIdTokenResult();
                const role = tokenResult.claims.role || 'user';
                setUserRole(role);

                // Nếu là admin, điều hướng về trang admin
                if (role === 'admin') {
                    navigate('/admin');
                }
            } else {
                setUser(null);
                setUserRole(null);
            }
        });

        return () => unsubscribe();
    }, [navigate]);

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

    const handleLoginRedirect = () => {
        navigate('/login');
        toggleSidebar();
    };

    return (
        <>
            {isOpen && <div className={cx("backdrop")} onClick={toggleSidebar}></div>}

            <nav ref={sidebarRef} className={cx("sidebar", { active: isOpen })}>
                <div className={cx("close-btn")} onClick={toggleSidebar}>×</div>

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

                {/* Hiển thị menu chỉ khi đã đăng nhập và là user */}
                {user && userRole === 'user' && (
                    <>
                        <div className={cx("sidebar-middle")}>
                            <Link to="/infor" className={cx("intro")}><p>Giới thiệu</p></Link>
                            <Link to="/sale" className={cx("sale")}><p>Khuyến mãi</p></Link>
                            <Link to="/booking" className={cx("booking")}><p>Đặt phòng</p></Link>

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