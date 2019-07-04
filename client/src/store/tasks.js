export default {
<<<<<<< HEAD
    state: {
        tasks: []
=======
    state:{
        tasks:null
>>>>>>> 73e4b6d146aa2ec8e04dfbe3d5c533c3dd883e56
    },
    mutations: {
        setTasks(state, payload) {
            state.tasks = payload
        }
    },
    actions: {},
    getters: {
        tasks(state) {
            return state.tasks;
        }
    }
}