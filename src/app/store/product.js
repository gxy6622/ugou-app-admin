import http from '../utils/http.js';

export default {
        namespaced: true,
        state: {
                list: [],
                pageSize: 6
        },
        getters: {},
        mutations: {
                _resetData(state) {
                        state.list = [];
                },
                _endAjax(state, payload) {
                        if(payload.length > 0) state.list = state.list.concat(payload);
                }
        },
        actions: {
                getData({ state, commit }, { subId, loadMore }) {
                        if(!loadMore) commit('_resetData');
                        return http({
                                method: 'post',
                                url:'product/list',
                                data :{
                                        cid: subId,
                                        begin: state.list.length,
                                        count: state.pageSize
                                },
                        })
                                .then(data => { //第一次data是请求的6条数据构成的数组，第二次是剩余的2条数据，之后是空数组。
                                        commit('_endAjax', data);
                                        return data.length === state.pageSize;
                                        //state.list = data;
                                });
                }
        }
};