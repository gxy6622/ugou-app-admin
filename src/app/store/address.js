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
                               url: '/address/list',
                               data: { name: payload }
                       })
                               .then(data => {
                                       commit('_getData', data);
                                       return data;
                               })
               },
                //新增地址
                addAddress({ rootState }, { receiveName, receiveTel, receiveAddress }) {
                       console.log(receiveName, receiveTel, receiveAddress);
                       return rootState.http({
                               method: 'post',
                               url: '/address/add',
                               data: { receiveName, receiveTel, receiveAddress }
                       })
                               .then(() => {})
                },
                //删除地址
                removeAddress({ rootState, commit }, payload) {
                       return rootState.http({
                               method: 'post',
                               url: '/address/remove',
                               data: { id: payload.id }
                       })
                               .then(() => {})
                },
                editAddress({ rootState, commit }, { receiveName, receiveTel, receiveAddress, id }) {
                       console.log(receiveName, receiveTel, receiveAddress, id);
                       return rootState.http({
                               method: 'post',
                               url: '/address/update',
                               data: { receiveName, receiveTel, receiveAddress, id }
                       })
                               .then(() => {})
                }
        }
}