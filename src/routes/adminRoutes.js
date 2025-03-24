
import AdminLogin from '../pages/admin/login/index';
// import ProtectedRoute from '~/component/ProtectedRoute';
import AdminRegister from '~/pages/admin/register/index';
import AdminDashboard from '~/pages/admin/dashboard/index';
import AdminEmployees from '~/pages/admin/employee/index';
import AdminBooking from '~/pages/admin/booking/index';
import AdminCustomers from '~/pages/admin/customers/index';
import AdminRooms from '~/pages/admin/room/index';
import AdminRoomTypes from '~/pages/admin/room_types/index';
import AdminServices from '~/pages/admin/services/index';
// import AdminInvoices from '~/pages/admin/invoices/index';
// import AdminStatistics from '~/pages/admin/statistics/index';

const config = [
    { path: '/admin/login', component: AdminLogin, hideLayout: true },
    { path: '/admin/register', component: AdminRegister, hideLayout: true },
    { path: '/admin/', component: AdminDashboard},
    { path: '/admin/employees', component: AdminEmployees},
    { path: '/admin/bookings', component: AdminBooking },
    { path: '/admin/customers', component: AdminCustomers },
    { path: '/admin/rooms', component: AdminRooms },
    { path: '/admin/room_types', component: AdminRoomTypes },
    { path: '/admin/services', component: AdminServices },
    // { path: '/admin/invoices', component: AdminInvoices },
    // { path: '/admin/statistics', component: AdminStatistics },
];

export default config;