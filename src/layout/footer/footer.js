
import styles from './footer.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Footer() {
    return (
        <footer className={cx('footer')}>
            <div className={cx('container')}>
                <div className={cx('row')}>
                    <div className={cx('col-lg-3')}>
                        <ul className={cx('list-1')}>
                            <li className={cx('footer-list-item')}>About Us</li>
                            <li className={cx('footer-list-item')}>Contact Us</li>
                            <li className={cx('footer-list-item')}>Privacy Policy</li>
                            <li className={cx('footer-list-item')}>Terms of Service</li>
                        </ul>
                    </div>
                    <div className={cx('col-lg-3')}>
                    <ul className={cx('list-1')}>
                            <li className={cx('footer-list-item')}>About Us</li>
                            <li className={cx('footer-list-item')}>Contact Us</li>
                            <li className={cx('footer-list-item')}>Privacy Policy</li>
                            <li className={cx('footer-list-item')}>Terms of Service</li>
                        </ul>
                    </div>
                    <div className={cx('col-lg-3')}>
                    <ul className={cx('list-1')}>
                            <li className={cx('footer-list-item')}>About Us</li>
                            <li className={cx('footer-list-item')}>Contact Us</li>
                            <li className={cx('footer-list-item')}>Privacy Policy</li>
                            <li className={cx('footer-list-item')}>Terms of Service</li>
                        </ul>
                    </div>
                    <div className={cx('col-lg-3')}>
                    <ul className={cx('list-1')}>
                            <li className={cx('footer-list-item')}>About Us</li>
                            <li className={cx('footer-list-item')}>Contact Us</li>
                            <li className={cx('footer-list-item')}>Privacy Policy</li>
                            <li className={cx('footer-list-item')}>Terms of Service</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    ); 
}
export default Footer;
