import classNames from 'classnames/bind';
import styles from './baby5.module.scss';
import img from '~/asset/img/11.jpg';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import AOS from 'aos';

const cx = classNames.bind(styles);
function BBaby5() {
    useEffect(() => {
        AOS.init({
            duration: 2500,
            offset: 100,
            once: true,
        });
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('iner')}>
                <h1 data-aos="fade-left">Thịt Đông Pha</h1>
                <div data-aos="fade-left">
                    Thịt Đông Pha là món ăn nức danh tại Hàng Châu, Trung Quốc. Món này được chế biến từ thịt ba chỉ hầm
                    kỹ cùng rượu Thiệu Hưng và gia vị, tạo nên hương vị đậm đà, béo mềm, kết hợp hoàn hảo giữa vị mặn và
                    ngọt. Với vẻ ngoài bóng bẩy và hương thơm quyến rũ, thịt Đông Pha tại XiangYuan mang đến trải nghiệm
                    ẩm thực tinh tế và truyền thống cho mọi thực khách.
                </div>
            </div>
            <div>
                <img className={cx('picture')} src={img} alt="aaa"></img>
            </div>
        </div>
    );
}

export default BBaby5;
