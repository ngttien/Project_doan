import React from 'react';
import styles from './login.module.scss';
import classNames from 'classnames/bind';
import { FaUser, FaLock } from 'react-icons/fa';
import Button from '../../component/Button';
const cx = classNames.bind(styles);

function Login() {
    return (
        <div className={cx('login-container')}>
            <form action="">
                <h1>Login</h1>
                <div className={cx('input-container')}>
                    <input type="text" name="username" id="username" placeholder="Username" required />
                    <FaUser className="icon" />
                </div>
                <div className={cx('input-container')}>
                    <input type="password" name="password" id="password" placeholder="Password" required />
                    <FaLock className="icon" />
                </div>
                <div className="remember-forgot">
                    <label>
                        <input type="checkbox" name="remember" id="remember" />
                        Remember me
                    </label>
                    <a href="/forgot">Forgot password?</a>
                </div>
                <div className={cx('input-container')}>
                    <button type="submit">Login</button>
                </div>
                <div className="register-link ">
                    <p>
                        don't have an account?{' '}
                        <Button primary to={'/register'}>
                            Register
                        </Button>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;
