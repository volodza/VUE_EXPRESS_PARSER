import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import router from './router'
import store from './store'
import '@mdi/font/css/materialdesignicons.css'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    primary: '#1976D2',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    // dark: true
  },
  iconfont: 'mdi'
})


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
