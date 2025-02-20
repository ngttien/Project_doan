import home from '~/user/component/pages/Homeee/home';
import menu from '~/user/component/pages/menu';
import table from '~/user/component/pages/table';
import login from '~/user/component/pages/login';
import introduce from '~/user/component/pages/introduce';
import contact from '~/user/component/pages/contact';
import Booking from '~/addmin/component/page/booking/booking';
import List from '~/addmin/component/page/menu';
import Booktable from '~/addmin/component/page/mnbook';
import member from '~/addmin/component/page/member';
import routesconfig from '~/config/routes';
import Defaultlayout from '~/addmin/component/defaulayout';

const publicRoutes = [
    { path: routesconfig.home, component: home },
    { path: routesconfig.menu, component: menu },
    { path: routesconfig.table, component: table },
    { path: routesconfig.introduce, component: introduce },
    { path: routesconfig.contact, component: contact },
    { path: routesconfig.login, component: login, layout: null },
    { path: routesconfig.list, component: List, layout: Defaultlayout },
    { path: routesconfig.member, component: member, layout: Defaultlayout },
    { path: routesconfig.booktable, component: Booktable, layout: Defaultlayout },
    { path: routesconfig.booking, component: Booking, layout: Defaultlayout },
];
export { publicRoutes };
