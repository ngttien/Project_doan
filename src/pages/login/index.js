import styles from './login.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Login() {
    return ( 
        <login className={cx("login-container")}>
            <div className={cx('container')}>
                <div className={cx('row')}>
                        <div className={cx('login')}>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                    </div>
                </div>
            </div>
        </login>
    ); 
}
export default Login;