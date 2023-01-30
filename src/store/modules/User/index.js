export default {
    state: {
        user: null,
        userUid: null,
        key: null,
        loading: false
    },
    mutations: {
        saveUser(state, user) {
            state.user = {...user}
        },
        saveUserUid(state, uid) {
            state.userUid = uid
        },
        saveKey(state, key) {
            state.key = key
        },
        clearUserData(state) {
            state.user = state.userUid = state.key = null
        },
        loadingOff(state) {
            state.loading = false
        },
        loadingOn(state) {
            state.loading = true
        }
    },
    actions: {},
    getters: {
        user(state) {
            return state.user
        },
        userUid(state) {
            return state.userUid
        },
        key(state) {
            return state.key
        },
        loading(state) {
            return state.loading
        }
    }
}