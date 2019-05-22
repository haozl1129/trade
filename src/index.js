import Vue from 'vue';
import '@/assets/css/index.less';
import router from '@/router/index';
import store from '@/store/index/index';
import App from '@/pages/index/app.vue';
import utilDate from '@/util/date';
import 'element-ui/lib/theme-chalk/index.css';
import VueAMap from 'vue-amap';
import 'babel-polyfill';
import {
    Input,
    Tag,
    Table,
    TableColumn,
    Pagination,
    Button,
    Carousel,
    CarouselItem,
    Message,
    Checkbox,
    MessageBox,
    Dialog,
    DatePicker,
    Tooltip,
    Icon,
    Notification
} from 'element-ui';

Vue.use(Input);
Vue.use(Tag);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Button);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Checkbox);
Vue.use(Dialog);
Vue.use(DatePicker);
Vue.use(Icon);
Vue.use(Notification);

Vue.use(Tooltip);
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
    key: '37accfdec026663ba278bc9a4bc6d448',
    plugin: [
        'AMap.Autocomplete',
        'AMap.PlaceSearch',
        'AMap.Scale',
        'AMap.OverView',
        'AMap.ToolBar',
        'AMap.MapType',
        'AMap.PolyEditor',
        'AMap.CircleEditor',
        'AMap.Geolocation',
        'AMap.Geocoder'
    ]
});
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$notify = Notification;

// 时间格式
// | formatTime('yyyy-MM-dd')
Vue.filter(
    'formatTime',
    (value, customFormat = 'yyyy-MM-dd hh:mm:ss', isMsec = true, days = 0) => {
        // customFormat 要展示的时间格式
        // isMsec----传入的value值是否是毫秒
        // days----计算value后多少天的日期
        let time = '';
        if (!isNaN(value)) {
            value = isMsec ? value * 1 : value * 1000;
            value = value + days * 24 * 60 * 60 * 1000;
        } else {
            value = new Date(value).getTime();
        }
        time = value ? utilDate.toFormat(value, customFormat) : '';
        return time;
    }
);

Vue.filter('formatSubStr', (value, num = 6) => {
    if (value && value.length > num) {
        return value.substr(0, num) + '...';
    }
    return value;
});
/* eslint-disable */
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