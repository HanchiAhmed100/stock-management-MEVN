import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import BootstrapVue from 'bootstrap-vue'


Vue.config.productionTip = false
Vue.use(BootstrapVue);




import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'uikit/dist/js/uikit-icons.min.js';
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min.js';
import 'font-awesome/css/font-awesome.css'



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
