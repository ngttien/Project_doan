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

  // Hàm xử lý đăng xuất
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Điều hướng về trang chính sau khi đăng xuất
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
                  {/* search form */}
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
                        <button onClick={handleLogout} className={cx("logout-btn")}>
                          Đăng xuất
                        </button>
                      </div>
                    ) : (
                      <Link to="/login">
                        <button>Đăng nhập</button>
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