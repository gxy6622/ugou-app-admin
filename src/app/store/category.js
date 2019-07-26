import http from '../utils/http.js';

export default {
        namespaced: true,
        state: {
                mainList: [],
                subLists: {},
                curCid: 0,
        },
        getters: {
                subList(state, getters, rootState, rootGetters) {
                        return state.subLists[state.curCid] || [];
                }
        },
        mutations: {
                _initMainList(state, payload) { state.mainList = payload },
                _changeCurCid(state, payload) { state.curCid = payload },
                _initSubLists(state, payload) {
                        let temp = {};
                        temp[state.curCid] = payload;
                        state.subLists ={
                                ...temp,
                                ...state.subLists
                        };
                }
        },
        actions: {
                initMainList({ commit, dispatch }) {
                        http({ url: 'category/main' })
                                .then(data => {
                                        commit('_initMainList', data);
                                        dispatch('initSubLists', data[0].id);
                                });
                },
                initSubLists({ state, commit }, payload) {
                        commit('_changeCurCid', payload);
                        if(typeof state.subLists[payload] !== 'undefined') return;
                        http({
                                params: { id: payload },
                                url: 'category/sub'
                        })
                                .then(data => commit('_initSubLists', data));
                }
        }
};