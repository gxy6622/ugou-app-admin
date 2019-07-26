export default {
        namespaced: true,
        state: {
                name: ''                        //标识用户有没有登录，为空则没有登录
        },
        getters: {      //计算属性，判断有没有登录，登录了isLogin为真，在App.vue中Home组件和Login组件会根据isLogin来进行v-if判断。
                isLogin(state) {
                        return state.name !== '';
                }
        },
        mutations: {
                _login(state, payload) { state.name = payload; },
                _logout(state) { state.name = ''; }
        },
        actions: {
                login({ commit, rootState }, payload) {
                        rootState.http({
                                method: 'post',
                                data: payload,
                                url: '/admin/login'
                        })
                                .then(() => commit('_login', payload.name))
                },
                password({ commit, rootState }, payload) {
                        rootState.http({
                                method: 'post',
                                data: payload,
                                url: '/admin/password'
                        })
                                .then(() => commit('_logout'))
                }
        }
};