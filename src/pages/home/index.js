// import { useState, useEffect } from "react";
import styles from './home.module.scss';
import 'react-multi-carousel/lib/styles.css';
import classNames from 'classnames/bind';
import Carousel from "react-multi-carousel";
import saleImg1 from '../../assets/user/images/sale/sale_1.png';
import saleImg2 from '../../assets/user/images/sale/sale_2.png';
import saleImg3 from '../../assets/user/images/sale/sale_3.png';
import saleImg4 from '../../assets/user/images/sale/sale_4.png';

const cx = classNames.bind(styles);
const Home = () => {
    //  Dữ liệu mẫu cập nhật backend
    // const [sliderItems, setSliderItems] = useState([]);
    // useEffect(() => {
    //     // Giả sử API của bạn trả về danh sách ảnh từ Firebase
    //     fetch("http://localhost:5000/api/sliders") // Đổi thành API của bạn
    //         .then((res) => res.json())
    //         .then((data) => setSliderItems(data))
    //         .catch((err) => console.error(err));
    // }, []);
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 2
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

      const sliderItems = [
        {
            bgImg: saleImg1,
        },
        {
            bgImg: saleImg2,
        },
        {
            bgImg: saleImg3,
        },
        {
            bgImg: saleImg4,
        }
      ];

    return ( 
        <home className={cx("home-container")}>
            <div className={cx('container')}>
                <div className={cx('home')}>
                    <div className={cx('frame_intro')}>
                        <div className={cx('intro')}>
                            <p>Giới thiệu</p>
                        </div>
                        <div className={cx('contact')}>
                            <h3>Liên hệ chúng tôi tại</h3>
                            <ul>
                                
                            </ul>
                        </div>
                    </div>
                    <div className={cx('sale_slider')}>
                        <Carousel 
                            responsive={responsive} 
                            className={cx('slider')} 
                            infinite={true}
                            autoPlay={true}
                            autoPlaySpeed={1500}
                            >
                            {/* Mẫu cập nhật ảnh qua backend
                            {sliderItems.map((item, index) => (
                                <div 
                                    key={index} 
                                    className={cx('slider_items')}
                                    style={{ backgroundImage: `url(${item.imageUrl})` }}>
                                </div>
                            ))} */}
                            {/* ảnh Mẫu */}
                            
                            {sliderItems.map((item, key) => (
                                <div 
                                className={cx('slider_items')}
                                style={{backgroundImage: `url(${item.bgImg})`}}
                                onClick={() => window.location.href = '/#'}
                                key={key}
                            ></div>
                            ))}
                            
                        
                        </Carousel>
                    </div>
                </div>
            </div>
        </home>
    ); 
}
export default Home;