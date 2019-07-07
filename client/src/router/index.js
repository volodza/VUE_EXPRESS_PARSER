import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

import Tarif from '@/components/Tarif'
import Group from '@/components/instruments/search/Group'
import Users from '@/components/instruments/search/Users'
import Parents from '@/components/instruments/search/Parents'
import Birthdays from '@/components/instruments/search/Birthdays'
import Friends from '@/components/instruments/collect/Friends'
import Subscribers from '@/components/instruments/collect/Subscribers'
import RecentlyJoin from '@/components/instruments/collect/RecentlyJoin'
import Discussions from '@/components/instruments/collect/Discussions'
import Posts from '@/components/instruments/collect/Posts'
import Relatives from '@/components/instruments/collect/Relatives'
import Comments from '@/components/instruments/collect/Comments'
import SearchResults from '@/components/SearchResults'



Vue.use(Router)

export default new Router({
    routes: [{
            path: '',
            name: 'home',
            component: Home
        },
        {
            path: '/group',
            name: 'group',
            component: Group
        },
        {
            path: '/friends',
            name: 'friends',
            component: Friends
        },
        {
            path: '/users',
            name: 'users',
            component: Users
        },
        {
            path: '/parents',
            name: 'parents',
            component: Parents
        },
        {
            path: '/birthdays',
            name: 'birthdays',
            component: Birthdays
        },
        {
            path: '/subscribers',
            name: 'subscribers',
            component: Subscribers
        },
        {
            path: '/recentlyjoin',
            name: 'recentlyjoin',
            component: RecentlyJoin
        },
        {
            path: '/Discussions',
            name: 'Discussions',
            component: Discussions
        },
        {
            path: '/Posts',
            name: 'Posts',
            component: Posts
        },
        {
            path: '/Relatives',
            name: 'Relatives',
            component: Relatives
        },
        {
            path: '/Comments',
            name: 'Comments',
            component: Comments
        },
        {
            path: '/Tarif',
            name: 'Tarif',
            component: Tarif
        },
        {
            path: '/SearchResults',
            name: 'SearchResults',
            component: SearchResults
        }

    ],
    mode: 'history'
})