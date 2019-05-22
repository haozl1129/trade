import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
const router = new Router({
    routes: [
        {
            name: 'home',
            path: '*',
            meta: { index: 1 },
            component: () => import('../pages/home/account')
        },
        {
            name: 'release',
            path: '/release',
            meta: { index: 1 },
            component: () => import('../pages/home/release')
        },
        {
            name: 'company',
            path: '/company',
            meta: { index: 2 },
            component: () => import('../pages/home/company')
        },
        {
            name: 'serious',
            path: '/serious',
            meta: { index: 3 },
            component: () => import('../pages/home/serious')
        },
        {
            name: 'order',
            path: '/order',
            meta: { index: 3 },
            component: () => import('../pages/home/order')
        },
        {
            name: 'message',
            path: '/message',
            meta: { index: 3 },
            component: () => import('../pages/home/message')
        },
        {
            name: 'seting',
            path: '/seting',
            meta: { index: 3 },
            component: () => import('../pages/home/seting')
        },
        {
            name: 'bill',
            path: '/bill',
            meta: { index: 2 },
            component: () => import('../pages/home/bill')
        },
        {
            name: 'record',
            path: '/record',
            meta: { index: 2 },
            component: () => import('../pages/home/record')
        },
        {
            name: 'association',
            path: '/association',
            meta: { index: 2 },
            component: () => import('../pages/home/association')
        },
        {
            name: 'cash',
            path: '/cash',
            meta: { index: 2 },
            component: () => import('../pages/home/cash')
        },
        {
            name: 'recharge',
            path: '/recharge',
            meta: { index: 2 },
            component: () => import('../pages/home/recharge')
        },
        {
            name: 'password',
            path: '/password',
            meta: { index: 2 },
            component: () => import('../pages/home/password')
        },
        {
            name: 'share',
            path: '/share',
            meta: { index: 2 },
            component: () => import('../pages/home/share')
        },
        {
            name: 'mobile',
            path: '/mobile',
            meta: { index: 2 },
            component: () => import('../pages/home/mobile')
        },
        {
            name: 'upduser',
            path: '/upduser',
            meta: { index: 2 },
            component: () => import('../pages/home/upduser')
        }
    ]
});
export default router;
