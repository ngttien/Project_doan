import styles from './Header.module.scss';
import MenuItem from './menu/MenuList';
import Menu from './menu/Menu';
import routesConfig from '~/config/routes';
import classNames from 'classnames/bind';
import Button from '~/component/Button';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Menu>
                    <MenuItem to={routesConfig.home} title="Trang chủ" />
                    <MenuItem to={routesConfig.menu} title="menu" />
                    <MenuItem to={routesConfig.table} title="đặt bàn" />
                    <MenuItem to={routesConfig.introduce} title="giới thiệu" />
                    <MenuItem to={routesConfig.contact} title="Liên hệ" />
                    <Button primary to={routesConfig.login}>
                        đăng nhập
                    </Button>
                </Menu>
            </div>
        </header>
    );
}

export default Header;
