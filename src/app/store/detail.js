export default {
        namespaced: true,
        state: {
                list: []
        },
        getters: {},
        mutations: {
                _getData(state, payload) {
                        state.list = payload;
                }
        },
        actions: {
                getData({ rootState, commit }, payload) {
                        return rootState.http({
                                method: 'post',
                                data: payload,
                                url: 'product/list2'
                        })
                                .then(data => {
                                commit('_getData', data);
                                return data;
                                })
                },
                addCart({ rootState }, { id, count }) {
                        return rootState.http({
                                method: 'post',
                                data: { pid: id, count },
                                url: 'detail/add'
                        })
                                .then(data => {
                                        return data;
                                })
                }
        }
}