import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
const router = new Router({
    // mode: 'history',
    routes: [
        {
            name: 'index',
            path: '*',
            meta: { index: 1 },
            component: () => import('../pages/index/index')
        },
        {
            name: 'hall',
            path: '/hall',
            meta: { index: 2 },
            component: () => import('../pages/index/hall')
        },
        {
            name: 'delist',
            path: '/delist',
            meta: { index: 2 },
            component: () => import('../pages/index/delist')
        },
        {
            name: 'bank',
            path: '/bank',
            meta: { index: 2 },
            component: () => import('../pages/index/bank')
        },
        {
            name: 'news',
            path: '/news',
            meta: { index: 2 },
            component: () => import('../pages/index/news'),
            children: [
                {
                    name: 'hyxw',
                    path: '/news/hyxw',
                    component: () => import('../pages/index/news/hyxw')
                },
                {
                    name: 'jtxw',
                    path: '/news/jtxw',
                    component: () => import('../pages/index/news/jtxw')
                },
                {
                    name: 'ptgg',
                    path: '/news/ptgg',
                    component: () => import('../pages/index/news/ptgg')
                },
                {
                    name: 'newinfo',
                    path: '/news/newinfo',
                    component: () => import('../pages/index/news/newinfo')
                }
            ]
        },
        {
            name: 'help',
            path: '/help',
            meta: { index: 2 },
            component: () => import('../pages/index/help')
        },
        {
            name: 'join',
            path: '/join',
            meta: { index: 2 },
            component: () => import('../pages/index/join')
        },
        {
            name: 'vip',
            path: '/vip',
            meta: { index: 2 },
            component: () => import('../pages/index/vip')
        },
        {
            name: 'about',
            path: '/about',
            meta: { index: 2 },
            component: () => import('../pages/index/about')
        },
        {
            name:'contract',
            path:'/contract',
            meta : {index:2},
            component : () =>import('../pages/index/contract')
        }
    ]
});
export default router;
