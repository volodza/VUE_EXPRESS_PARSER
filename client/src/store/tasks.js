export default {
    state: {
        tasks: [],
        taskBegin:null,
        results:{
            page:1,
            pages:1,
            answer:null
        },
        title:null,
        count:null,
        task:{}
    },
    mutations: {
        setTasks(state, payload) {
            state.tasks = payload
        },
        setTaskBegin (state, payload) {
            state.taskBegin = payload
        },
        setPage (state,payload){
            state.results.page = payload
        },
        setPages (state,payload){
            state.results.pages = payload
        },
        setResult ( state,payload){
            state.results.answer = payload
        },
        setTitle ( state,payload){
            state.title = payload
        },
        setCount (state,payload){
            state.count = payload
        },
        setTask (state,payload){
            state.task = payload
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
        page(state){
            return state.results.page
        },
        pages(state){
            return state.results.pages
        },
        result(state){
            return state.results.answer
        },
        title(state){
            return state.title
        },
        count(state){
            return state.count
        },
        task(state){
            return state.task
        }
    }
}