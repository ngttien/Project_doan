import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '~/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Styles from './loginAdmin.module.scss';
import classNames from 'classnames/bind';

const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const cx = classNames.bind(Styles);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
            navigate('/admin/');
        } catch (err) {
            switch (err.code) {
                case 'auth/user-not-found':
                    setError('Tài khoản không tồn tại!');
                    break;
                case 'auth/wrong-password':
                    setError('Sai mật khẩu!');
                    break;
                case 'auth/invalid-email':
                    setError('Email không hợp lệ!');
                    break;
                default:
                    setError('Có lỗi xảy ra, vui lòng thử lại!');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cx("background_login")}>
            <div className={cx('login_container')}>
                <form className={cx('login_form')} onSubmit={handleLogin}>
                    <div className={cx('login_title')}>
                        <h1>Login Admin</h1>
                        {error && <p className={cx('error_message')}>{error}</p>}
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
                        autoComplete="current-password"
                        required
                    />
                    <div className={cx("login_btn")}>
                        <button className={cx("login_button")} type="submit" disabled={loading}>
                            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                        </button>
                    </div>
                    <p className={cx("register_link")}>
                        Chưa có tài khoản? <Link className={cx("button_regis")} to="/admin/register">Đăng ký tại đây</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
