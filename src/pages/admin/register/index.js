import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '~/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import '~/style/admin/adminLogin.scss';

const AdminRegister = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Mật khẩu không khớp!');
            setMessage('');
            return;
        }
        try {
            setError('');
            setMessage('');
            console.log('Registering with email:', email);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const token = await user.getIdToken();
            console.log('Token after register:', token);

            const response = await fetch('http://localhost:5000/api/set-admin-role', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to set admin role: ${errorText || response.statusText}`);
            }

            setMessage('Đăng ký thành công! Chuyển hướng đến trang đăng nhập...');
            setTimeout(() => navigate('/admin/login'), 2000);
        } catch (err) {
            console.error('Register error:', err);
            setError('Đăng ký thất bại: ' + err.message);
            setMessage('');
        }
    };

    return (
        <div className="admin-register-container">
            <h2>Đăng ký Admin</h2>
            {error && <p className="error">{error}</p>}
            {message && <p className="success">{message}</p>}
            <form onSubmit={handleRegister}>
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
                <div className="form-group">
                    <label>Xác nhận mật khẩu:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Đăng ký</button>
                <p>
                    Đã có tài khoản? <a href="/admin/login">Đăng nhập</a>
                </p>
            </form>
        </div>
    );
};

export default AdminRegister;