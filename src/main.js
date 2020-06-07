import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import './styles.scss'
import store from './store'

/**
 * 我的代码：开始
 */
import qs from 'qs'
import axios from 'axios'
import urls from "./api/url";

const instance = axios.create({
    baseURL: urls.baseUrl,
    timeout: 3000,
    headers: {'X-Custom-Header': 'foobar'}
});
Vue.prototype.$http = axios;
Vue.prototype.$axios = instance;
Vue.prototype.qs = qs;
Vue.prototype.$Api = urls;

import Watcher from "./components/Watcher";

Vue.component('watcher', Watcher);

/**
 * 停止
 */


Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
