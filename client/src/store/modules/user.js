export default {
    state:{
        user:{photo:'0'},
        error:null,
        success:null
    },
    mutations:{
        setUser(state,payload){
            state.user = payload
        },
        logout(state){
            state.user = null
        },
        setError(state,payload){
            state.error = payload
        },
        clearError(state){
            state.error = null
        },
        setSuccess(state,payload){
            state.success = payload
        },
        clearSuccess(state){
            state.success = null
        }
    },
    actions:{
        setError ({commit},payload){
            commit('setError',payload)
        },
        clearError ({commit}){
            commit('clearError')
        },
        setSuccess ({commit},payload){
            commit('setSuccess',payload)
        },
        clearSuccess ({commit}){
            commit('clearSuccess')
        }
    },
    getters:{
        user(state){
            return state.user;
        },
        isUserLoggedIn (state){
            return state.user !== null
        },
        error(state){
            return state.error
        },
        success(state){
            return state.success
        }
    }
}