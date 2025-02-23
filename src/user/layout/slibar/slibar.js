import styles from './slibar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Slibar() {
    return <div className={cx('slibar')}> slibar</div>;
}
export default Slibar;
