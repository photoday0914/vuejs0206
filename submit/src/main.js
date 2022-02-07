import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import vuetify from './plugins/vuetify'
import router from './router'


Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
     primary: '#7957d5',
  },
});

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
