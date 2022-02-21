import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import '@fortawesome/fontawesome-free/css/all.css'
import setup from './service/axios'

Vue.prototype.$Axios = setup;



Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
     primary: '#7957d5',
  },
  icons: {
    iconfont: 'fa',
  },
});

new Vue({
  router,
  store,   
  vuetify,  
  render: h => h(App)
}).$mount('#app')
