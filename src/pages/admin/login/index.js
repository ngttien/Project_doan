import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './loginAdmin.module.scss';
import classNames from 'classnames/bind';
import { FaUser, FaLock, FaArrowLeft } from 'react-icons/fa';
import { auth } from '~/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const cx = classNames.bind(styles);

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    // Tự động điền thông tin từ localStorage khi component mount
    useEffect(() => {
        const savedEmail = localStorage.getItem('adminEmail');
        const savedPassword = localStorage.getItem('adminPassword');
        const savedRememberMe = localStorage.getItem('adminRememberMe') === 'true';

        if (savedEmail && savedPassword && savedRememberMe) {
            setEmail(savedEmail);
            setPassword(savedPassword);
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);

            // Lưu thông tin nếu chọn "Remember me"
            if (rememberMe) {
                localStorage.setItem('adminEmail', email);
                localStorage.setItem('adminPassword', password);
                localStorage.setItem('adminRememberMe', 'true');
            } else {
                // Xóa thông tin nếu không chọn "Remember me"
                localStorage.removeItem('adminEmail');
                localStorage.removeItem('adminPassword');
                localStorage.removeItem('adminRememberMe');
            }

            navigate('/admin/'); // Chuyển hướng đến trang chính admin
        } catch (err) {
            setError('Email hoặc mật khẩu không đúng!');
        }
    };

    return (
        <div className={cx('background_login')}>
            <div className={cx('login_container')}>
                {/* Nút quay về Home */}
                <Link to="/" className={cx('back_home')}>
                    <FaArrowLeft className={cx('back_icon')} /> Home
                </Link>

                <form className={cx('login_form')} onSubmit={handleSubmit}>
                    <div className={cx('login_title')}>
                        <h1>Login</h1>
                    </div>

                    {/* Hiển thị thông báo lỗi nếu có */}
                    {error && <p className={cx('error')}>{error}</p>}

                    {/* Email */}
                    <input
                        className={cx('input_username')}
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FaUser className={cx('icon')} />

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

                    {/* Remember me & Forgot password */}
                    <div className={cx('remember_forgot')}>
                        <label className={cx('remember_label')}>
                            <input
                                type="checkbox"
                                name="remember"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            /> Remember me
                        </label>
                        <a href="/forgotAdmin" className={cx('forgot_password')}>
                            Forgot password?
                        </a>
                    </div>

                    {/* Button Login */}
                    <div className={cx('login_btn')}>
                        <button type="submit" className={cx('login_button')}>
                            Login
                        </button>
                    </div>

                    {/* Register */}
                    {/* <div className={cx('register_link')}>
                        <p>
                            Chưa có tài khoản?{' '}
                            <Link to="/admin/register" className={cx('button_regis')}>
                                Đăng ký tại đây
                            </Link>
                        </p>
                    </div> */}
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;