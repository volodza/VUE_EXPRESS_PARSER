import Vue from 'vue'
import Router from 'vue-router'
import StartPage from '@/views/StartPage'
import MainPage from '@/views/MainPage'


import Group from '@/components/instruments/search/Group'
import Users from '@/components/instruments/search/Users'
import Birthdays from '@/components/instruments/search/Birthdays'
import Parents from '@/components/instruments/search/Parents'
import Participant from '@/components/instruments/collect/Participant'
import topParticipant from '@/components/instruments/collect/topParticipant'

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
                },
                {
                    path: 'users',
                    name: 'users',
                    component: Users
                },
                {
                    path: 'Birthdays',
                    name: 'Birthdays',
                    component: Birthdays
                },
                {
                    path: 'Parents',
                    name: 'Parents',
                    component: Parents
                },
                {
                    path: 'Participant',
                    name: 'Participant',
                    component: Participant
                },
                {
                    path: 'topParticipant',
                    name: 'topParticipant',
                    component: topParticipant
                },
            ]
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