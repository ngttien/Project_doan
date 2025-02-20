import classNames from 'classnames/bind';
import styles from './footer.module.scss';
import img from '~/asset/img/12.png';

const cx = classNames.bind(styles);
function Footer() {
    return (
        <div className={cx('wrapper')} style={{ backgroundImage: `url(${img})` }}>
            <div className={cx('iner1')}>
                <h2>Xiangyuan</h2>
                Nhà hàng chúng tôi luôn luôn đặt khách lên hàng đầu, tận tâm phục vụ, mang lại cho khách hàng những trãi
                nghiệm tuyệt vời nhất. Các món ăn với các công thức độc quyền sẽ mang lại hương vị mới mẻ cho thực
                khách. Xiangyuan xin chân thành cảm ơn.
                <br />
                Cửa hàng chính Địa chỉ: 245 Nguyên Thái Bình - Phường 12 - Quận Tân Bình - TP Hồ Chí Minh
                <br />
                Điện thoại: 0123456789 Email: TaMa@nhahang.com
            </div>
            <div className={cx('iner2')}>
                <h2>Hướng dẫn</h2> <br />
                Hướng dẫn mua hàng <br />
                Hướng dẫn thanh toán <br />
                Đăng kí thành viên
                <br />
                Hỗ trợ khách hàng
            </div>
            <div className={cx('iner2')}>
                <h2>Chinh sách</h2> <br />
                Chính sách thành viên
                <br />
                Chính sách thanh toán
                <br />
                Bảo vệ thông tin cá nhân
                <br />
                Quà tặng tri ân
            </div>
            <div className={cx('iner2')}>
                <h2>Thông tin</h2>
                <br />
                Trang chủ
                <br /> Giới thiệu
                <br /> Menu
                <br /> Thông bá
                <br /> Khuyến mãi
                <br /> Liên hệ
            </div>
        </div>
    );
}

export default Footer;
