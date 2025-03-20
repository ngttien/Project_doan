import React, { useState } from 'react';
import styles from './register.module.scss';
import classNames from 'classnames/bind';
import { FaUser, FaLock, FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Button from '../../../component/Button/index';

const cx = classNames.bind(styles);

function Register() {
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Registering with:', { username, email, password, confirmPassword });
        // Xử lý đăng ký tại đây
    };

    return (
        <div className={cx('background_register')}>
            <div className={cx('register_container')}>
                {/* Nút quay về Home */}
                <Link to="/" className={cx('back_home')}>
                    <FaArrowLeft className={cx('back_icon')} /> Home
                </Link>

                <form className={cx('register_form')} onSubmit={handleSubmit}>
                    <div className={cx('register_title')}>
                        <h1>Register</h1>
                    </div>

                    {/* Username */}
                    <input
                        className={cx('input_username')}
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <FaUser className={cx('icon')} />

                    {/* Email */}
                    <input
                        className={cx('input_email')}
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FaEnvelope className={cx('icon')} />

                    {/* Password */}
                    <input
                        className={cx('input_password')}
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FaLock className={cx('icon')} />

                    {/* Confirm Password */}
                    <input
                        className={cx('input_repassword')}
                        type="password"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <FaLock className={cx('icon')} />

                    {/* Button Register */}
                    <div className={cx('register_btn')}>
                        <button type="submit" className={cx('register_button')}>
                            Register
                        </button>
                    </div>

                    {/* Login */}
                    <div className={cx('login_link')}>
                        <p>
                            Already have an account? →
                            <Button className={cx('button_login')} primary to={'/login'}>
                                Click Here
                            </Button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
