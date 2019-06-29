import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
// import VueResource from 'vue-resource'
// import colors from 'vuetify/es5/util/colors'


// Vue.use(VueResource)

Vue.use(Vuetify, {
    theme: {
        primary: '#8CCFB9', //white
        secondary: '#F27865', //red
        accent: '#8CCFB9', //green
        side: '#4f555e', //grey
        header: '#eef1f0' //light grey
    },
    iconfont: 'mdi'
})

Vue.config.productionTip = false

new Vue({
        router,
        store,
        render: h => h(App)
    })
    .$mount('#app')

/* eslint-disable no-new */
// new Vue({
//     el: '#app',
//     router,
//     store,
//     components: { App },
//     template: '<App/>',
//     created() {
//         fb.initializeApp({
//             apiKey: "AIzaSyDsUYWd1Eegmv1P9nCPPLo600Jc8ni2MSM",
//             authDomain: "theta-shuttle-228314.firebaseapp.com",
//             databaseURL: "https://theta-shuttle-228314.firebaseio.com",
//             projectId: "theta-shuttle-228314",
//             storageBucket: "theta-shuttle-228314.appspot.com",
//             messagingSenderId: "909587803669",
//             appId: "1:909587803669:web:b8769bd4da145504"
//         })
//     }
// })