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
                getData({ rootState, commit }, { orderId }) {
                        return rootState.http({
                                        method: 'post',
                                        url: '/order/list',
                                        data: { orderId: orderId }
                                })
                                        .then(data => {
                                                commit('_getData', data[0]);
                                                return data[0];
                                        })
                }
        }
}