import styles from './home.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Home() {
    return (
        <Home className={cx("home-container")}>
            <div className={cx('container')}>
                <div className={cx('row')}>
                        <div className={cx('home')}>
                            <p> 1</p>
                            <p> 1</p>
                            <p> 1</p>
                            <p> 1</p>
                            <p> 1</p>
                            <p> 1</p>
                        </div>
                </div>
            </div>
        </Home>
    ); 
}
export default Home;