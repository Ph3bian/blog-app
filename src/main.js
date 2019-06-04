import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import VueNoty from 'vuejs-noty';
import 'vuejs-noty/dist/vuejs-noty.css';

Vue.config.productionTip = false

Vue.use(VueNoty);
const authData = localStorage.getItem('auth');

new Vue({
  router,
  data: {
    auth: authData ? JSON.parse(authData) : {},
  },
  render: h => h(App),
}).$mount('#app')
