import Home from '~/user/pages/home';
import Menu from '~/user/pages/menu';
import Contact from '~/user/pages/contact';
import Login from '~/user/pages/login';
import Default from '~/admin/default';
import Manager from '~/admin/pages/manager';

const config = [
    { path: '/', component: Home },
    { path: '/menu', component: Menu },
    { path: '/contact', component: Contact },
    { path: '/login', component: Login, Layout: null },
    { path: '/manager', component: Manager, Layout: Default },
];
export default config;
