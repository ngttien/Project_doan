import React from 'react';
import styles from './user.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const UserPage = () => {
    return (
        <div>
            <h1>User Page</h1>
            <p>Welcome to the user page!</p>
        </div>
    );
};

export default UserPage;