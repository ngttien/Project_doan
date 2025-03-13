import Home from '~/pages/home/index';
import Menu from '~/pages/menu/index';
import Contact from '~/pages/contact/index';
import Login from '~/pages/login/index';
import Booking from '~/pages/booking/index';
import Sale from '~/pages/sale/index';
import Intro from '~/pages/intro/index';
import Search from '~/pages/search/index';
import User from '~/pages/user/index';
import Register from '~/pages/register/index';
import Party from '~/pages/service/party/index';
import Layout from '~/pages/service/laundry/index';
import Transport from '~/pages/service/transport/index';
import Shop from '~/pages/service/shop/index';

const config = [
    { path: '/', component: Home },
    { path: '/menu', component: Menu },
    { path: '/contact', component: Contact },
    { path: '/login', component: Login, hideLayout: true }, // Ẩn Header, Sidebar, Footer
    { path: '/booking', component: Booking },
    { path: '/sale', component: Sale },
    { path: '/intro', component: Intro },
    { path: '/search', component: Search },
    { path: '/user', component: User, hideLayout: true }, // Ẩn Header, Sidebar, Footer
    { path: '/register', component: Register, hideLayout: true }, // Ẩn Header, Sidebar, Footer
    { path: '/party', component: Party },
    { path: '/laundry', component: Layout },
    { path: '/transport', component: Transport },
    { path: '/shop', component: Shop },
];

export default config;
