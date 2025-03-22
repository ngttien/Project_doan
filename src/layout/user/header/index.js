// eslint-disable-next-line no-unused-vars
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import styles from './header.module.scss';
import classNames from 'classnames/bind';
import Sidebar from '../sidebar/sidebar';
import { LuMenu } from 'react-icons/lu';

const cx = classNames.bind(styles);

function Header() {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleFocus = () => setIsExpanded(true);
    const handleBlur = () => {
        setTimeout(() => {
            if (!query.trim()) setIsExpanded(false);
        }, 200);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Gửi luôn mà không kiểm tra query rỗng
        navigate(`/search?query=${encodeURIComponent(query)}`);
    };

    return (
        <header className={cx('header_container')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <div className={cx('menu')}>
                        <div className="col-xl-3">
                            <div className={cx('menu_left')}>
                                <div className={cx('menu_logo')} onClick={toggleSidebar}>
                                    <LuMenu />
                                </div>
                                <h6 className={cx('menu_title')}>Menu</h6>
                            </div>
                        </div>

                        <div className="col-xl-6">
                            <div className={cx('menu_center')}>
                                <Link to="/" className={cx('logo')}>
                                    <img src="/logo/logoweb.png" alt="Logo" />
                                </Link>
                            </div>
                        </div>

                        <div className="col-xl-3">
                            <div className={cx('menu_right')}>
                                {/* Search form */}
                                <form className={cx('search_form', { expanded: isExpanded })} onSubmit={handleSubmit}>
                                    <div className={cx('input_holder')}>
                                        <input
                                            type="text"
                                            className={cx('search_input')}
                                            placeholder="Tìm kiếm..."
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                        />
                                        <button type="submit" className={cx('search_icon')}>
                                            <FaSearch />
                                        </button>
                                    </div>
                                </form>

                                <div className={cx('log_container')}>
                                    <Link to="/login">
                                        <button>Đăng nhập/Đăng ký</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        </header>
    );
}

export default Header;
