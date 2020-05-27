import Vue from 'vue'
import App from './App.vue'
import router from './router'
import  VueResource from 'vue-resource';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import './assets/css/icon.css';
import './components/common/directives';
import "babel-polyfill";
import axios from 'axios';
import { Message } from 'element-ui';
//挂载axios
Vue.prototype.$http = axios;
Vue.prototype.$message = Message;
axios.defaults.baseURL='http://localhost:8081/demo'
Vue.use(VueResource);
Vue.config.productionTip = false
Vue.use(ElementUI, {
  size: 'small'
});

Vue.prototype.$axios = axios;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
