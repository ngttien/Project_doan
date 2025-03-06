import styles from './login.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Login() {
    return (
        <div className={cx('login-container')}>
            <div className={cx('container')}>
                <div className={cx('row')}>
                    <div className={cx('login')}>
                        <h1 className={cx('login-title')}>Login</h1>
                        <form>
                            <div className={cx('form-container')}>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" placeholder="Email" />
                            </div>
                            <div className={cx('form-container')}>
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" placeholder="Password" />
                            </div>
                            <div className={cx('form-container')}>
                                <button type="submit">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
