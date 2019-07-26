// Vue.config.productionTip = false
//入口文件，webpack从这里开始打包
//vue开发页面的根实例

import Vue from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';
import './assets/css/uReset.css';               //导入优购专用复位样式
import http from './utils/http.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Distpicker from 'v-distpicker';


Vue.prototype.$http =http;
Vue.use(ElementUI);
Vue.component('v-distpicker', Distpicker);

let vm = new  Vue({
        el: '#app',
        router,
        store,
        components: { App },
        template: '<App></App>'
});