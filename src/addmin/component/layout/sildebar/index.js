import Menu from './menu/Menu';
import Menulist from './menu/MenuItem';
import routesConfig from '~/config/routes';
import styles from './slidebar.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function Sildebar() {
    return (
        <div className={cx('menu')}>
            <h1 className={cx('logo')}>logo</h1>
            <Menu>
                <Menulist to={routesConfig.booking} title="đặt bàn"></Menulist>
                <Menulist to={routesConfig.booktable} title="quản lý đặt bàn"></Menulist>
                <Menulist to={routesConfig.member} title="thành viên"></Menulist>
                <Menulist to={routesConfig.list} title="đặt bàn"></Menulist>
            </Menu>
        </div>
    );
}

export default Sildebar;
