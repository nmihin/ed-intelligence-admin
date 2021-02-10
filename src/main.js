import Vue from 'vue';
import App from './App.vue';
//import VueRouter from "vue-router";
import router from './router';
import $ from 'jquery';
import Notifications from 'vue-notification';
import VueLazyload from 'vue-lazyload';
import VueMaterial from 'vue-material';

import './assets/css/styles.scss';

Vue.use(Notifications);
Vue.use(VueLazyload);
Vue.use(VueMaterial);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  $
}).$mount("#app");
