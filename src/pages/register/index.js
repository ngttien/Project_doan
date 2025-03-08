import style from './register.module.scss';
import classNames from 'classnames/bind';
import Button from '../../component/Button';

const cx = classNames.bind(style);
function Register() {
    return (
        <div className={cx('register-container')}>
            <form action="">
                <h1>Register</h1>
                <div className={cx('input-container')}>
                    <input type="text" name="username" id="username" placeholder="Username" required />
                </div>
                <div className={cx('input-container')}>
                    <input type="email" name="email" id="email" placeholder="Email" required />
                </div>
                <div className={cx('input-container')}>
                    <input type="password" name="password" id="password" placeholder="Password" required />
                </div>
                <div className={cx('input-container')}>
                    <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        placeholder="Confirm Password"
                        required
                    />
                </div>
                <div className={cx('input-container')}>
                    <button type="submit">Register</button>
                </div>
                <div className="register-link">
                    <p>
                        Already have an account?{' '}
                        <Button primary to={'/login'}>
                            Login
                        </Button>
                    </p>
                </div>
            </form>
        </div>
    );
}
export default Register;
