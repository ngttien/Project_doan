import Header from '~/layout/header/index';
import Function from '~/layout/function/index';
import Sidebar from '~/layout/sidebar/sidebar';
import Footer from '~/layout/footer/footer';
import styles from './df.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Defaultlayout({ children, hideLayout, ...props }) {
    return (
        <div>
            {!hideLayout && <Header />}
            {!hideLayout && <Function />}
            {!hideLayout && <Sidebar />}
            <div className={cx('iner')} {...props}>
                <div>{children}</div>
            </div>
            {!hideLayout && <Footer />}
        </div>
    );
}

export default Defaultlayout;
