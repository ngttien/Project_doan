import Home from '~/pages/home/index';
import Menu from '~/pages/menu/index';
import Contact from '~/pages/contact/index';
import Login from '~/pages/login/index';
import Booking from '~/pages/booking/index';
import Sale from '~/pages/sale/index';
import Intro from '~/pages/intro/index';
import Search from '~/pages/search/index';
import User from '~/pages/user/index';


const config = [
    { path: '/', component: Home },
    { path: '/menu', component: Menu },
    { path: '/contact', component: Contact },
    { path: '/login', component: Login, hideLayout: true }, // Ẩn Layout
    { path: '/booking', component: Booking },
    { path: '/sale', component: Sale },
    { path: '/intro', component: Intro },
    { path: '/search', component: Search },
    { path: '/user', component: User, hideLayout: true }, // Ẩn Layout
]; 
export default config;

