import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' 
import VueRouter from 'vue-router'
import VueSimpleAlert from "vue-simple-alert";
Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.use(VueSimpleAlert);



Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')


