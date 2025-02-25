import { useState } from 'react'; // Import useState
import styles from './header.module.scss';
import classNames from 'classnames/bind';
import Sidebar from '../sidebar/sidebar'; // Import Sidebar
import { TiThMenu } from "react-icons/ti";
import { IoIosNotificationsOutline } from "react-icons/io";

const cx = classNames.bind(styles);

function Header() {
    const [sidebarOpen, setSidebarOpen] = useState(false); // State kiểm soát sidebar

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen); // Đảo trạng thái sidebar
    };

    return (
        <>
        <header className={cx('header-container')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <div className={cx('menu')}>
                        {/* Menu Trái */}
                        <div className='col-xl-3'>
                            <div className={cx('menu-left')} >
                                <div className={cx('menu-logo')} onClick={toggleSidebar}>
                                    <TiThMenu />
                                </div>
                                <a href="/" className={cx('logo')}>
                                    <img src="/logo/logoweb.png" alt="Logo" />
                                </a>
                            </div>
                        </div>

                        <div className='col-xl-6'>
                            <div className={cx('menu-center')}>
                                <div className={cx('head-menu')}>
                                    <a href="/"><button>Trang chủ</button></a>
                                    <a href="/#"><button>Hỗ trợ</button></a>
                                    <a href="/#"><button>Đặt chỗ của tôi</button></a>
                                </div>
                            </div>
                        </div>

                        {/* Menu Phải */}
                        <div className='col-xl-3'>
                            <div className={cx('menu-right')}>
                                <IoIosNotificationsOutline className={cx('noti-logo')}/>
                                <div className={cx('log-container')}>
                                    <a href="/#"><button>Đăng nhập/Đăng ký</button></a>
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
};

export default Header;
