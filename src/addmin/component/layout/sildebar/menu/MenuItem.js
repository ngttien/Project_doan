import { NavLink } from 'react-router-dom';

import styles from './menu.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function MenuItem({ to, title }) {
    return (
        <div className={cx('item')}>
            <NavLink className={(nav) => cx('list', { active: nav.isActive })} to={to}>
                {title}
            </NavLink>
        </div>
    );
}

export default MenuItem;
