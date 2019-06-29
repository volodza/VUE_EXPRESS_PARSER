export default {
    state:{
        tasks:[]
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