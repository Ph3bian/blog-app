import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import VueNoty from 'vuejs-noty';
import 'vuejs-noty/dist/vuejs-noty.css';
import VueDisqus from 'vue-disqus';
import wysiwyg from "vue-wysiwyg";
import "vue-wysiwyg/dist/vueWysiwyg.css";


Vue.config.productionTip = false

Vue.use(VueNoty);
Vue.use(VueDisqus);
Vue.use(wysiwyg, {});
const authData = localStorage.getItem('auth');

new Vue({
  router,
  data: {
    auth: authData ? JSON.parse(authData) : {},
  },
  render: h => h(App),
}).$mount('#app')
