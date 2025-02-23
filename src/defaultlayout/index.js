import Header from '~/layout/header';
import Slibar from '~/layout/slibar/slibar';
import styles from './df.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Defaultlayout({ children }) {
    return (
        <div>
            <Header></Header>

            <div className={cx('iner')}>
                <Slibar></Slibar>
                <div>{children}</div>
            </div>
        </div>
    );
}
export default Defaultlayout;
