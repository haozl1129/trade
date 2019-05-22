import Vue from 'vue';
import '@/assets/css/index.less';
import App from '@/pages/login/app_login.vue';
import { Input, Button, Message,Dialog , Icon } from 'element-ui';
import store from '@/store/login/index';
import router from '@/router/login';
import 'babel-polyfill';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(Input);
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Icon);

Vue.prototype.$message = Message;

const app = new Vue({
    router,
    store,
    render(h) {
        return h(App, {
            props: {
                projectName: 'trade'
            }
        });
    }
});

app.$mount('#App');

/**
__RESOURCE_MAP__;
**/
