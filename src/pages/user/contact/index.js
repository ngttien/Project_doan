import styles from './contact.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Contact() {
    return ( 
        <contact className={cx("contact-container")}>
            <div className={cx('container')}>
                <div className={cx('row')}>
                        <div className={cx('contact')}>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                    </div>
                </div>
            </div>
        </contact>
    ); 
}
export default Contact;