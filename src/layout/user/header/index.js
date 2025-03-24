import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import styles from "./header.module.scss";
import classNames from "classnames/bind";
import Sidebar from "../sidebar/sidebar";
import { LuMenu } from "react-icons/lu";
import { auth } from '~/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const cx = classNames.bind(styles);

function Header() {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const tokenResult = await currentUser.getIdTokenResult();
                const role = tokenResult.claims.role || 'user';
                setUserRole(role);
            } else {
                setUser(null);
                setUserRole(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleFocus = () => setIsExpanded(true);
    const handleBlur = () => {
        setTimeout(() => {
            if (!query) setIsExpanded(false);
        }, 200);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?query=${encodeURIComponent(query)}`);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <>
            <header className={cx("header_container")}>
                <div className={cx("container")}>
                    <div className={cx("header")}>
                        <div className={cx("menu")}>
                            <div className="col-xl-3">
                                <div className={cx("menu-left")}>
                                    <div className={cx("menu-logo")} onClick={toggleSidebar}>
                                        <LuMenu />
                                    </div>
                                    <h6 className={cx("menu-title")}>Menu</h6>
                                </div>
                            </div>

                            <div className="col-xl-6">
                                <div className={cx("menu-center")}>
                                    <Link to="/" className={cx("logo")}>
                                        <img src="/logo/logoweb.png" alt="Logo" />
                                    </Link>
                                </div>
                            </div>

                            <div className="col-xl-3">
                                <div className={cx("menu-right")}>
                                    <form className={cx("search-form", { expanded: isExpanded })} onSubmit={handleSubmit}>
                                        <div className={cx("input-holder")}>
                                            <input
                                                type="text"
                                                className={cx("search-input")}
                                                placeholder="Tìm kiếm..."
                                                value={query}
                                                onChange={(e) => setQuery(e.target.value)}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                            />
                                            <button type="submit" className={cx("search-icon")}>
                                                <FaSearch />
                                            </button>
                                        </div>
                                    </form>

                                    <div className={cx("log-container")}>
                                        {user ? (
                                            <div className={cx("user-info")}>
                                                <span>Xin chào, {user.displayName || user.email}</span>
                                                {userRole === 'admin' ? (
                                                    <Link to="/admin">
                                                        <button>Trang Admin</button>
                                                    </Link>
                                                ) : null}
                                                <button onClick={handleLogout} className={cx("logout-btn")}>
                                                    Đăng xuất
                                                </button>
                                            </div>
                                        ) : (
                                            <Link to="/login">
                                                <button>Đăng nhập/Đăng ký</button>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            </header>
        </>
    );
}

export default Header;