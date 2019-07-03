export default {
    state:{
        tasks:null
    },
    mutations:{
        setTasks(state,payload){
            state.tasks = payload
        }
    },
    actions:{},
    getters:{
        tasks(state){
            return state.tasks;
        }
    }
}