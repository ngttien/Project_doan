import classNames from 'classnames/bind';
import styles from './baby3.module.scss';
import img from '~/asset/img/06.jpg';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import AOS from 'aos';

const cx = classNames.bind(styles);
function BBaby3() {
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
                <h1 data-aos="fade-left">Xiangyuan</h1>
                <div data-aos="fade-left">
                    XiangYuan – nơi bạn sẽ được đắm chìm trong hương vị tinh túy của ẩm thực Trung Hoa, nơi kết hợp hoàn
                    hảo giữa phong cách truyền thống và phong vị hiện đại. Được xây dựng trên lý tưởng trung thực và
                    chất lượng, nhà hàng cam kết mang đến trải nghiệm ẩm thực chân thực nhất. Tại XiangYuan, chúng tôi
                    tự hào tái hiện hàng trăm món ăn danh tiếng từ xứ sở tỷ dân, mỗi món ăn là một hành trình văn hóa
                    đầy sắc màu. Nhà hàng không chỉ chú trọng đến hình thức, trang trí mà còn đặc biệt chú trọng đến
                    chất lượng và sự hoàn hảo trong từng dịch vụ. Thực đơn của XiangYuan vô cùng phong phú, nhưng món
                    Vịt quay Bắc Kinh giòn rụm, vàng ươm và Thịt Đông Pha mềm ngọt, đậm đà luôn là những lựa chọn được
                    yêu thích nhất. Bên cạnh đó, những món đặc sắc khác như lẩu Tứ Xuyên cay nồng, hay cá hấp xì dầu
                    thơm lừng cũng sẽ khiến thực khách phải xuýt xoa
                </div>
            </div>
            <div>
                <img className={cx('picture')} src={img} alt="aaa"></img>
            </div>
        </div>
    );
}

export default BBaby3;
