import Home from '~/pages/home/index';
import Menu from '~/pages/menu/index';
import Contact from '~/pages/contact/index';
import Login from '~/pages/login/index';

const config = [
    { path: '/', component: Home },
    { path: '/menu', component: Menu },
    { path: '/contact', component: Contact },
    { path: '/login', component: Login, Lg: null },
];
export default config;
