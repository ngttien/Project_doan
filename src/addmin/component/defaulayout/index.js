import Sildebar from '../layout/sildebar';
import styles from './default.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Defaultlayout({ children }) {
    return (
        <div className={cx('main')}>
            <Sildebar />
            <div className={cx('inner')}>{children}</div>
        </div>
    );
}

export default Defaultlayout;
