import Vue from 'vue';
import '@/assets/css/index.less';
import router from '@/router/home';
import store from '@/store/home';
import 'babel-polyfill';
import 'element-ui/lib/theme-chalk/index.css';

import App from '@/pages/home/app.vue';
import {
    Input,
    TimeSelect,
    TimePicker,
    Upload,
    DatePicker,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    Button,
    Pagination,
    Select,
    Option,
    Table,
    TableColumn,
    Dialog,
    Tooltip,
    Message,
    Row,
    Col,
    Form,
    FormItem,
    CheckboxButton,
    CheckboxGroup,
    MessageBox,
    Loading,
    Icon,
    Badge,
    Notification
} from 'element-ui';

Vue.use(Input);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Upload);
Vue.use(DatePicker);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(Button);
Vue.use(Pagination);
Vue.use(Select);
Vue.use(Option);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dialog);
Vue.use(Tooltip);
Vue.use(Icon);
Vue.use(Notification);
Vue.use(Badge);
Vue.use(Row);
Vue.use(Col);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$notify = Notification;
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
