import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './login.module.scss';
import classNames from 'classnames/bind';
import { FaUser, FaLock, FaArrowLeft, FaEnvelope } from 'react-icons/fa';
import Button from '../../../component/Button/index';
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';
import { auth } from '~/firebase';

const cx = classNames.bind(styles);

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            // Thiết lập persistence dựa trên lựa chọn "Remember me"
            const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;
            await setPersistence(auth, persistence);

            // Đăng nhập với Firebase Authentication
            await signInWithEmailAndPassword(auth, email, password);

            // Hiển thị thông báo thành công
            setSuccess('Đăng nhập thành công! Đang chuyển hướng...');
            setTimeout(() => {
                navigate('/'); // Điều hướng đến trang chính sau 2 giây
            }, 2000);
        } catch (error) {
            console.error('Login error:', error);
            // Xử lý các lỗi cụ thể từ Firebase
            switch (error.code) {
                case 'auth/user-not-found':
                    setError('Email không tồn tại. Vui lòng kiểm tra lại!');
                    break;
                case 'auth/wrong-password':
                    setError('Mật khẩu không đúng. Vui lòng thử lại!');
                    break;
                case 'auth/invalid-email':
                    setError('Email không hợp lệ. Vui lòng kiểm tra lại!');
                    break;
                case 'auth/invalid-credential':
                    setError('Thông tin đăng nhập không hợp lệ. Vui lòng kiểm tra lại email hoặc mật khẩu!');
                    break;
                default:
                    setError('Đăng nhập thất bại: ' + error.message);
            }
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

                    {/* Hiển thị thông báo thành công nếu có */}
                    {success && <p className={cx("success")}>{success}</p>}

                    {/* Hiển thị thông báo lỗi nếu có */}
                    {error && <p className={cx("error")}>{error}</p>}

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

                    {/* Remember me & Forgot password */}
                    <div className={cx('remember_forgot')}>
                        <label className={cx('remember_label')}>
                            <input
                                type="checkbox"
                                name="remember"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)} // Cập nhật state khi checkbox thay đổi
                            />
                            Remember me
                        </label>
                        <a href="/forgot" className={cx('forgot_password')}>
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
                    <div className={cx('register_link')}>
                        <p>
                            To register new account →
                            <Button className={cx('button_regis')} primary to={'/register'}>
                                Click Here
                            </Button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;