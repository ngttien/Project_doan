// import { useState, useEffect } from "react";
import styles from './home.module.scss';
import { Link } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import classNames from 'classnames/bind';
import Carousel from "react-multi-carousel";
import saleImg1 from '../../../assets/user/images/sale/sale_1.png';
import saleImg2 from '../../../assets/user/images/sale/sale_2.png';
import saleImg3 from '../../../assets/user/images/sale/sale_3.png';
import saleImg4 from '../../../assets/user/images/sale/sale_4.png';

const cx = classNames.bind(styles);
const Home = () => {
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 2
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 2
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
        { bgImg: saleImg1 },
        { bgImg: saleImg2 },
        { bgImg: saleImg3 },
        { bgImg: saleImg4 }
      ];

    return ( 
        <home className={cx("home_container")}>
            <div className={cx('background_container')}>
                <div className={cx('frame_intro')}>
                    <div className={cx('intro')}>
                        <p>Giới thiệu</p>
                    </div>
                </div>
            </div>
            <div className={cx('container')}>
                <div className={cx('home')}>
                    <div className={cx('home_title')}>
                        <p>Khuyến mãi</p>
                    </div>
                    <div className={cx('sale_slider')}>
                        <Carousel 
                            responsive={responsive} 
                            className={cx('slider')} 
                            infinite={true}
                            autoPlay={true}
                            autoPlaySpeed={3000}
                        >
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
                    <div className={cx('service')}>
                        <div className={cx('service_title')}>
                            <p>Khám phá dịch vụ</p>
                        </div>
                        <div className={cx("service_items")}>
                            <Link to="/booking" className={cx("rooms")}><h1>Đặt phòng</h1></Link>
                            <Link to="/restaurant" className={cx("restaurant")}><p>Dịch vụ ăn uống</p></Link>
                            <Link to="/infor" className={cx("infor")}><p>Thông tin khách sạn</p></Link>
                        </div>
                    </div>
                </div>
            </div>
        </home>
    ); 
}

export default Home;