import Header from '../header/index';
import Function from '../function/index';
import Sidebar from '../sidebar/sidebar';
import Footer from '../footer/footer';
import styles from './df.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function DefaultLayout({ children, hideLayout }) {
    if (hideLayout) {
        return <div className={cx('iner')}>{children}</div>;
    }

    return (
        <div>
            <Header />
            <Function />
            <Sidebar />
            <div className={cx('iner')}>
                <div>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
