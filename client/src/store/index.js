import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import tasks from './modules/tasks'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        user,tasks
    }
})