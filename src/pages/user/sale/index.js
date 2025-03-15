import React from 'react';
import classNames from 'classnames/bind';
import styles from './sale.module.scss';

const cx = classNames.bind(styles);

const SalePage = () => {
    return (
        <div className={cx("container")}>
            <div className={cx("sale_container")}>
                <div className={cx("row")}>
                    <div className={cx("col-xl-3")}>
                        <div className={cx("sale_menu")}>
                            
                            <ul>
                                <strong>Ưu đãi</strong>
                                <li>Phiếu giảm giá</li>
                                <li>Khuyến mãi có thời hạn</li>
                                <li>Chiến dịch đặc biệt</li>
                            </ul>
                            
                            <ul>
                                <strong>Giảm giá</strong>
                                <li>Dưới 10%</li>
                                <li>10% - 20%</li>
                                <li>Trên 25%</li>
                            </ul>

                            <ul>
                                <strong>Thời gian</strong>
                                <li>Đang diễn ra</li>
                                <li>Sắp hết hạn</li>
                            </ul>
                        </div>
                    </div>
                    <div className={cx("col-xl-7")}>
                        <div className={cx("sale_content")}>
                            <div className={cx("sale_search")}>
                                <div className={cx("search_form")}>
                                    <input 
                                    className={cx("search_input")}
                                    type="text"
                                    placeholder="Tìm kiếm" 
                                    />
                                    <button>Tìm</button>                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalePage;
