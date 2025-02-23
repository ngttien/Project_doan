import styles from './header.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Header() {
    return <div className={cx('header')}>header</div>;
}
export default Header;
