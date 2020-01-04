import Vue from 'vue'
import router from './router'
import App from './App'
import store from './store'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
Vue.use(VueRouter)
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
