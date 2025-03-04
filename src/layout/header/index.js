import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import styles from "./header.module.scss";
import classNames from "classnames/bind";
import Sidebar from "../sidebar/sidebar";
import { LuMenu } from "react-icons/lu";

const cx = classNames.bind(styles);

function Header() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

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
      console.log("Navigating to:", `/search?query=${encodeURIComponent(query)}`);
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };
  

  return (
    <>
      <header className={cx("header-container")}>
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
                  <a href="/" className={cx("logo")}>
                    <img src="/logo/logoweb.png" alt="Logo" />
                  </a>
                </div>
              </div>

              <div className="col-xl-3">
                <div className={cx("menu-right")}>
                  {/* search form  */}
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
                    <a href="/login">
                      <button>Đăng nhập/Đăng ký</button>
                    </a>
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
