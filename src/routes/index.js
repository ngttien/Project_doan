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

import AdminLogin from '~/pages/admin/login/index';
// import ProtectedRoute from '~/component/ProtectedRoute';
import AdminRegister from '~/pages/admin/register/index';
import AdminDashboard from '~/pages/admin/dashboard/index';
import AdminEmployees from '~/pages/admin/employee/index';
import AdminBooking from '~/pages/admin/booking/index';
// import AdminCustomers from '~/pages/admin/customers/index';
import AdminRooms from '~/pages/admin/room/index';
import AdminRoomTypes from '~/pages/admin/room_types/index';
import AdminServices from '~/pages/admin/services/index';
// import AdminInvoices from '~/pages/admin/invoices/index';
// import AdminStatistics from '~/pages/admin/statistics/index';

const config = [
    { path: '/', component: Home },
    { path: '/menu', component: Menu },
    { path: '/contact', component: Contact },
    { path: '/login', component: Login, hideLayout: true },
    { path: '/booking', component: Booking },
    { path: '/sale', component: Sale },
    { path: '/intro', component: Intro },
    { path: '/search', component: Search },
    { path: '/user', component: User, hideLayout: true },
    { path: '/register', component: Register, hideLayout: true },
    { path: '/party', component: Party },
    { path: '/laundry', component: Layout },
    { path: '/transport', component: Transport },
    { path: '/shop', component: Shop },
    { path: '/admin/login', component: AdminLogin, hideLayout: true },
    { path: '/admin/register', component: AdminRegister, hideLayout: true },
    { path: '/admin/', component: AdminDashboard, hideLayout: true },
    { path: '/admin/employees', component: AdminEmployees, hideLayout: true },
    { path: '/admin/bookings', component: AdminBooking, hideLayout: true },
    // { path: '/admin/customers', component: AdminCustomers },
    { path: '/admin/rooms', component: AdminRooms, hideLayout: true },
    { path: '/admin/room_types', component: AdminRoomTypes, hideLayout: true },
    { path: '/admin/services', component: AdminServices, hideLayout: true },
    // { path: '/admin/invoices', component: AdminInvoices },
    // { path: '/admin/statistics', component: AdminStatistics },
];

export default config;