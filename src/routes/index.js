import Home from '~/pages/home';
import Menu from '~/pages/menu';
import Contact from '~/pages/contact';
import Login from '~/pages/login';

const config = [
    { path: '/', component: Home },
    { path: '/menu', component: Menu },
    { path: '/contact', component: Contact },
    { path: '/login', component: Login, Lg: null },
];
export default config;
