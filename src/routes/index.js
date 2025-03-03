import Home from '~/pages/home/index';
import Menu from '~/pages/menu/index';
import Contact from '~/pages/contact/index';
import Login from '~/pages/login/index';
import Booking from '~/pages/booking/index';
import Sale from '~/pages/sale/index';
import Intro from '~/pages/intro/index';


const config = [
    { path: '/', component: Home },
    { path: '/menu', component: Menu },
    { path: '/contact', component: Contact },
    { path: '/login', component: Login, Lg: null },
    { path: '/booking', component: Booking},
    { path: '/sale', component: Sale},
    { path: '/intro', component: Intro}
];
export default config;
