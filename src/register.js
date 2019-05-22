import Vue from 'vue';
import '@/assets/css/index.less';
import App from '@/pages/login/app_regis.vue';
import store from '@/store/register/index';
import 'babel-polyfill';
import 'element-ui/lib/theme-chalk/index.css';


import { Input, Button, Checkbox, Message ,Dialog , Icon} from 'element-ui';

Vue.use(Input);
Vue.use(Button);
Vue.use(Checkbox);
Vue.use(Dialog);
Vue.use(Icon);

Vue.prototype.$message = Message;

const app = new Vue({
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
