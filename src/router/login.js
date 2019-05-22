import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
const router = new Router({
    // mode: 'history',
    routes: [
        {
            name: 'login',
            path: '*',
            meta: { index: 1 },
            component: () => import('../pages/login/index')
        },
        {
            name: 'retrieve',
            path: '/retrieve',
            meta: { index: 2 },
            component: () => import('../pages/login/retrieve')
        }
        // {
        //     name: 'registered',
        //     path: '/registered',
        //     meta: { index: 1 },
        //     component: () => import('../pages/login/registered')
        // }
    ]
});
export default router;
