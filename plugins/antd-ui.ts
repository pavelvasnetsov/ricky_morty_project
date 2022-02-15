import Vue from 'vue';
import {
    Button,
    PageHeader,
    Layout,
    Input,
    Radio,
    Pagination,
    Alert,
    Spin,
    notification
} from 'ant-design-vue';

Vue.use(Button);
Vue.use(PageHeader);
Vue.use(Layout);
Vue.use(Input);
Vue.use(Radio);
Vue.use(Pagination);
Vue.use(Alert);
Vue.use(Spin);

Vue.prototype.$notification = notification;