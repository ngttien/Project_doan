import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '~/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import '~/style/admin/adminLogin.scss';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin/'); // Chuyển hướng đến trang chính admin
        } catch (err) {
            setError('Email hoặc mật khẩu không đúng!');
        }
    };

    return (
        <div className="admin-login-container">
            <h2>Đăng nhập Admin</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Mật khẩu:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Đăng nhập</button>
                <p>
                    Chưa có tài khoản? <a href="/admin/register">Đăng ký tại đây</a>
                </p>
            </form>
        </div>
    );
};

export default AdminLogin;