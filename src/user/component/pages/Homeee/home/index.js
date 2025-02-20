import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import BBaby3 from '~/user/component/pages/Homeee/body3';
import BBaby4 from '~/user/component/pages/Homeee/body4';
import BBaby5 from '~/user/component/pages/Homeee/body5';

const cx = classNames.bind(styles);
function home() {
    return (
        <div className={cx('wapper')}>
            <div className={cx('body')}>
                <div className={cx('baby1')}>
                    <img className={cx('picture')} alt={'aaa'}></img>
                </div>

                <div className={cx('baby3')}>
                    <BBaby3 />
                </div>
                <div className={cx('baby4')}>
                    <BBaby4 />
                </div>
                <div className={cx('baby5')}>
                    <BBaby5 />
                </div>
            </div>
        </div>
    );
}

export default home;
