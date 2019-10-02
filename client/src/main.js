import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import router from './router'
import store from './store'
import '@mdi/font/css/materialdesignicons.css'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import VueResource from 'vue-resource'

// Globally register all base components for convenience, because they
// will be used very frequently. Components are registered using the
// PascalCased version of their file name.




Vue.use(VueResource)

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
        grey1: '#EDEEF0'
            // dark: true
    },
    iconfont: 'mdi'
})

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
    './components/elements',
    false,
    /p[A-Z]\w+\.vue$/)
requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName)
    const componentName = upperFirst(
        camelCase(
            fileName
            .replace(/^\.\/_/, '')
            .replace(/\.\w+$/, '')
        )
    )
    Vue.component(componentName, componentConfig.default || componentConfig)
})

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')