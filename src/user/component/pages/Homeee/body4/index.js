import classNames from 'classnames/bind';
import styles from './baby4.module.scss';
import img1 from '~/asset/img/07.jpg';
import img2 from '~/asset/img/08.jpg';
import img3 from '~/asset/img/09.jpg';
import img4 from '~/asset/img/10.jpg';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import AOS from 'aos';

const cx = classNames.bind(styles);
function BBaby4() {
    useEffect(() => {
        AOS.init({
            duration: 2500,
            offset: 100,
            once: true,
        });
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('picture')}>
                <div className={cx('ineer1')}>
                    <img className={cx('picture1')} src={img1} alt="aaa"></img>
                    <img className={cx('picture1')} src={img2} alt="aaa"></img>
                </div>
                <div className={cx('ineer2')}>
                    <img className={cx('picture1')} src={img3} alt="aaa"></img>
                    <img className={cx('picture1')} src={img4} alt="aaa"></img>
                </div>
            </div>
            <div className={cx('iner')}>
                <h1 data-aos="fade-right">VỊT QUAY BẮC KINH</h1>
                <div data-aos="fade-right">
                    Khi nhắc đến món ăn Trung Hoa thì hiển nhiên không thể thiếu được món Vịt quay Bắc Kinh, đây được
                    xem là biểu trưng cho hương vị ẩm thực truyền thống Trung Quốc. Với lớp da vàng, giòn rụm và thịt
                    mềm mộng nước kết hợp cùng các loại gia vị thảo dược đặc trưng sẽ tạo nên một món ăn hấp dẫn và thực
                    khách nên dùng thử Vịt quay Bắc Kinh tại XiangYuan để có một trải nghiệm trọn vẹn
                </div>
            </div>
        </div>
    );
}

export default BBaby4;
