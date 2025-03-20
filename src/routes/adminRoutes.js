import Dashboard from '../pages/admin/dashboard/index';
import Login from '../pages/admin/login/index';
import ManageBooking from '../pages/admin/managebooking/index';
import ManageRoom from '../pages/admin/room/index';
import ManageStaff from '../pages/admin/staff/index';
import Revenue from '../pages/admin/revenue/index';
import ManageUser from '../pages/admin/manageUser/index';
import Reviews from '../pages/admin/review/index';

const adminRoutes = [
    { path: '/admin', component: Dashboard },
    { path: '/admin/login', component: Login, hideLayout: true }, // Trang login không có layout
    { path: '/admin/manage-booking', component: ManageBooking },
    { path: '/admin/manage-rooms', component: ManageRoom },
    { path: '/admin/manage-staff', component: ManageStaff },
    { path: '/admin/revenue', component: Revenue },
    { path: '/admin/manage-user', component: ManageUser },
    { path: '/admin/reviews', component: Reviews },
];

export default adminRoutes;
 