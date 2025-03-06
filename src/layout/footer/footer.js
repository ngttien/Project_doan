
import styles from './footer.module.scss';
import classNames from 'classnames/bind';
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";


const cx = classNames.bind(styles);
function Footer() {
    return (
        <footer className={cx('footer')}>
            <div className={cx('container')}>
                <div className={cx('footer-top')}>
                    <div className={cx('col-xl-3')}>
                        <div className={cx('footer-left')}>
                            <ul className={cx('list-1')}>
                                <li className={cx('footer-list-item')}>About Us</li>
                                <li className={cx('footer-list-item')}>Contact Us</li>
                                <li className={cx('footer-list-item')}>Privacy Policy</li>
                                <li className={cx('footer-list-item')}>Terms of Service</li>
                            </ul>
                        </div>

                    </div>
                    <div className={cx('col-xl-3')}>
                        <div className={cx('footer-center')}>
                            <h2>Thông tin liên hệ</h2>
                            <ul className={cx('list-contact')}>
                                <li className={cx('list-item')}>
                                <span>Địa chỉ:</span>
                                <a href='https://maps.app.goo.gl/3zKXNvp8MkjTM9jR8' className={cx('footer-address')} style={styles.link}>104 Nguyễn Văn Trỗi, P.8, Q. Phú Nhuận, TP.HCM</a>
                                </li>
                                <li className={cx('list-item')}>
                                <span>Số điện thoại:</span>
                                <a href="tel:0123456789" className={cx('footer-phone')} style={styles.link}>0123456789</a>
                                </li>
                                <li className={cx('list-item')}>
                                <span>Email:</span>
                                <a href="mailto:2331540120@vaa.edu.vn" className={cx('footer-email')} style={styles.link}>2331540120@vaa.edu.vn</a>
                                </li>
                            </ul>       
                        </div>
                    </div>
                    <div className={cx('col-xl-3')}>
                        <div className={cx('footer-right')}>
                            <div className={cx('row')}>
                                <h3>Mạng xã hội:</h3>
                                <a href="https://facebook.com" style={styles.link}><FaSquareFacebook className={cx('icon')} /></a>
                                <a href="/#" style={styles.link}><FaInstagramSquare className={cx('icon')} /></a>
                            </div>  
                        </div>
                    </div>
                </div>
                <div className={cx('footer-bottom')}>
                    <div className={cx('row')}>
                        <a href="/#" className={cx('privacy_policy')} style={styles.link}>
                            <strong>Chính sách Bảo mật</strong>
                        </a>
                        <a href="/#" className={cx('legal_infor')} style={styles.link}>
                            <p>Thông tin pháp lý</p>
                        </a>

                    </div>
                </div>
            </div>
        </footer>
    ); 
}
export default Footer;
