import React, { useState } from 'react';
import styles from './register.module.scss';
import classNames from 'classnames/bind';
import { FaUser, FaLock, FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '~/firebase';
import Button from '../../../component/Button/index';

const cx = classNames.bind(styles);

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Kiểm tra mật khẩu và xác nhận mật khẩu có khớp không
        if (password !== confirmPassword) {
            setError('Mật khẩu và xác nhận mật khẩu không khớp!');
            return;
        }

        try {
            // Đăng ký với Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Cập nhật thông tin profile (tên người dùng)
            await updateProfile(user, { displayName: username });

            // Lưu thông tin khách hàng vào Firestore
            const customerData = { name: username, email };
            const token = await user.getIdToken();
            const response = await fetch('http://localhost:5000/api/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(customerData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Lưu thông tin khách hàng thất bại: ${errorText || response.statusText}`);
            }

            console.log('Customer registered:', await response.json());
            setSuccess('Đăng ký thành công! Đang chuyển hướng đến trang đăng nhập...');
            setTimeout(() => {
                navigate('/login'); // Điều hướng đến trang đăng nhập sau 2 giây
            }, 2000);
        } catch (error) {
            console.error('Registration error:', error);
            // Xử lý các lỗi cụ thể từ Firebase
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setError('Email đã được sử dụng. Vui lòng chọn email khác!');
                    break;
                case 'auth/invalid-email':
                    setError('Email không hợp lệ. Vui lòng kiểm tra lại!');
                    break;
                case 'auth/weak-password':
                    setError('Mật khẩu quá yếu. Mật khẩu phải có ít nhất 6 ký tự!');
                    break;
                default:
                    setError('Đăng ký thất bại: ' + error.message);
            }
        }
    };

    return (
        <div className={cx("background_register")}>
            <div className={cx('register_container')}>
                {/* Nút quay về Home */}
                <Link to="/" className={cx('back_home')}>
                    <FaArrowLeft className={cx('back_icon')} /> Home
                </Link>

                <form className={cx("register_form")} onSubmit={handleSubmit}>
                    <div className={cx("register_title")}><h1>Register</h1></div>

                    {/* Hiển thị thông báo thành công nếu có */}
                    {success && <p className={cx("success")}>{success}</p>}

                    {/* Hiển thị thông báo lỗi nếu có */}
                    {error && <p className={cx("error")}>{error}</p>}

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
                            <Button className={cx("button_login")} primary to={'/login'}>
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