export default {
    state: {
        tasks: [],
        taskBegin:null,
        results:{
            page:1,
            pages:1,
            arr:null
        }
    },
    mutations: {
        setTasks(state, payload) {
            state.tasks = payload
        },
        setTaskBegin (state, payload) {
            state.taskBegin = payload
        },
        setResults (state,payload){
            state.results = payload
        }
    },
    actions: {},
    getters: {
        tasks(state) {
            return state.tasks;
        },
        taskBegin(state){
            return state.taskBegin
        },
        results(state){
            return state.results
        }
    }
}