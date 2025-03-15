import React from 'react';
import Styles from './headerAdmin.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(Styles);

function AdminHeader() {
    console.log("Render AdminHeader");
    return (
        <header className={cx("header_container")}>
            <div className={cx("container")}>
                <div className={cx("header")}> 
                    <h1>Admin</h1>          
                </div>
            </div>
        </header>
    );
};


export default AdminHeader;