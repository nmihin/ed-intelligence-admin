import Vue from 'vue';
import App from './App.vue';
//import VueRouter from "vue-router";
import router from './router';
import $ from 'jquery';
import Notifications from 'vue-notification';
import VueLazyload from 'vue-lazyload';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';

import './assets/css/styles.css';
import './assets/css/swiper.min.css';
import './assets/css/bootstrap-grid.min.css';
import './assets/css/ui-elements.css';
import './assets/css/bootstrap.min.css';

Vue.use(Notifications);
Vue.use(VueLazyload);
Vue.use(VueMaterial);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  $
}).$mount("#app");
