import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '~/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Styles from './registerAdmin.module.scss';
import classNames from 'classnames/bind';

const AdminRegister = () => {
    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const cx = classNames.bind(Styles);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu không khớp!');
            setMessage('');
            return;
        }
        try {
            setLoading(true);
            setError('');
            setMessage('');
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;
            const token = await user.getIdToken();

            const response = await fetch('http://localhost:5000/api/set-admin-role', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ email: formData.email }),
            });

            if (!response.ok) {
                throw new Error('Không thể đặt quyền admin!');
            }

            setMessage('Đăng ký thành công! Chuyển hướng đến trang đăng nhập...');
            setTimeout(() => navigate('/admin/login'), 2000);
        } catch (err) {
            setError('Đăng ký thất bại: ' + err.message);
            setMessage('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cx("background_register")}> 
            <div className={cx('register_container')}>
                <form className={cx('register_form')} onSubmit={handleRegister}>
                    <div className={cx('register_title')}>
                        <h1>Đăng ký Admin</h1>
                        {error && <p className={cx('error_message')}>{error}</p>}
                        {message && <p className={cx('success_message')}>{message}</p>}
                    </div>
                    <input
                        className={cx("input_field")}
                        type="email"
                        name="email"
                        placeholder="Nhập email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                    />
                    <input
                        className={cx("input_field")}
                        type="password"
                        name="password"
                        placeholder="Nhập mật khẩu"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                        required
                    />
                    <input
                        className={cx("input_field")}
                        type="password"
                        name="confirmPassword"
                        placeholder="Xác nhận mật khẩu"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        autoComplete="new-password"
                        required
                    />
                    <div className={cx("register_btn")}>
                    <button className={cx("register_button")} type="submit" disabled={loading}>
                        {loading ? 'Đang đăng ký...' : 'Đăng ký'}
                    </button>
                    </div>
                    <p className={cx("login_link")}>
                        Đã có tài khoản? <Link className={cx("button_login")} to="/admin/login">Đăng nhập ngay</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default AdminRegister;
