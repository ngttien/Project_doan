import Home from '../pages/user/home/index';
import Menu from '../pages/user/menu/index';
import Contact from '../pages/user/contact/index';
import Login from '../pages/user/login/index';
import Booking from '../pages/user/booking/index';
import Sale from '../pages/user/sale/index';
import Infor from '../pages/user/infor/index';
import Search from '../pages/user/search/index';
import User from '../pages/user/user.infor/index';
import Register from '../pages/user/register/index';
import Party from '../pages/user/service/party/index';
import Layout from '../pages/user/service/laudry/index';
import Transport from '../pages/user/service/transport/index';
import Shop from '../pages/user/service/shop/index';
import Laudry from '../pages/user/service/laudry/index';
import Transation from '../pages/user/transaction/index';

const config = [
    { path: '/', component: Home },
    { path: '/menu', component: Menu },
    { path: '/contact', component: Contact },
    { path: '/login', component: Login, hideLayout: true }, // Ẩn Header, Sidebar, Footer
    { path: '/booking', component: Booking },
    { path: '/sale', component: Sale },
    { path: '/infor', component: Infor },
    { path: '/search', component: Search },
    { path: '/user', component: User /*, hideLayout: true */}, // Ẩn Header, Sidebar, Footer
    { path: '/register', component: Register, hideLayout: true }, // Ẩn Header, Sidebar, Footer
    { path: '/party', component: Party },
    { path: '/laundry', component: Layout },
    { path: '/transport', component: Transport },
    { path: '/shop', component: Shop },
    { path: '/laudry', component: Laudry },
    { path: '/transaction', component: Transation },
];

export default config;
