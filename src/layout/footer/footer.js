
import styles from './footer.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Footer() {
    return (
        <footer className={cx('footer')}>
            <div className={cx('container')}>
                <div className={cx('row')}>
                    <div className={cx('col-xl-3')}>
                    </div>
                    <div className={cx('col-xl-3')}>
                    </div>
                    <div className={cx('col-xl-3')}>
                    </div>
                    <div className={cx('col-xl-3')}>
                    </div>
                </div>
            </div>
        </footer>
    ); 
}
export default Footer;
