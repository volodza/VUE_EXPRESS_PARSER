import Vue from 'vue'
import Router from 'vue-router'
import StartPage from '@/views/StartPage'
import MainPage from '@/views/MainPage'

import Group from '@/components/instruments/search/Group'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: '/',
    routes: [{
            path: '/',
            name: 'startPage',
            component: StartPage
        },

        {
            path: '/main',
            name: 'mainPage',
            component: MainPage,
            children: [{
                path: 'group',
                name: 'group',
                component: Group
            }, ]
        }
        // {
        //   path: '/main',
        //   name: 'about',
        //   // route level code-splitting
        //   // this generates a separate chunk (about.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        // }
    ]
})