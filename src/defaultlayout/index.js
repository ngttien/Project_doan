import Header from '~/layout/header/index';
import Function from '~/layout/function/index';
import Sidebar from '~/layout/sidebar/sidebar';
import Footer from '~/layout/footer/footer';
import styles from './df.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Defaultlayout({ children, ...props  }) {
    return (
        <div>
            <Header></Header>
            <Function></Function>
            <Sidebar></Sidebar>
            <div className={cx('iner')} {...props}>
                <div>{children}</div>
            </div>
            <Footer></Footer>
        </div>
    );
}
export default Defaultlayout;
