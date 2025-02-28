import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./header.module.scss";
import classNames from "classnames/bind";
import Sidebar from "../sidebar/sidebar";
import { LuMenu } from "react-icons/lu";

const cx = classNames.bind(styles);

function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // phần này để xử lý ô tìm kiếm
  const handleFocus = () => setIsExpanded(true);
  const handleBlur = () => {
    setTimeout(() => {
      if (!query) setIsExpanded(false);
    }, 200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", query);
  };

  return (
    <>
      <header className={cx("header-container")}>
        <div className={cx("container")}>
          <div className={cx("header")}>
            <div className={cx("menu")}>
              {/* Menu Trái */}
              <div className="col-xl-3">
                <div className={cx("menu-left")}>
                  <div className={cx("menu-logo")} onClick={toggleSidebar}>
                    <LuMenu />
                  </div>
                  <h6 className={cx("menu-title")}>Menu</h6>
                </div>
              </div>
              {/* menu giữa */}
              <div className="col-xl-6">
                <div className={cx("menu-center")}>
                  <a href="/" className={cx("logo")}>
                    <img src="/logo/logoweb.png" alt="Logo" />
                  </a>
                </div>
              </div>

              {/* Menu Phải */}
              <div className="col-xl-3">
                <div className={cx("menu-right")}>
                  {/* Ô tìm kiếm */}
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

                  {/* Nút đăng nhập/đăng ký */}
                  <div className={cx("log-container")}>
                    <a href="/#">
                      <button>Đăng nhập/Đăng ký</button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      </header>
    </>
  );
}

export default Header;
