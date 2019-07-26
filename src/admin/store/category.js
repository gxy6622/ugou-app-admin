export default {
        namespaced: true,
        state: {
                isMainListInit: false,                          //标识一级分类信息有没有初始化过
                mainList: [],                                           //分类页面所有一级分类列表
                subLists: {},
                //curCid: 0,
        },
        getters: {
                // subList(state, getters, rootState, rootGetters) {
                //         return state.subLists[state.curCid] || [];
                // }
        },
        mutations: {
                _initMainList(state, payload) {
                        state.isMainListInit = true;
                        state.mainList = payload;
                },
                //_changeCurCid(state, payload) { state.curCid = payload },
                _initSubLists(state, payload) {
                        state.subLists ={
                                ...payload,
                                ...state.subLists
                        };
                },
                _removeCategory(state, payload) {
                        let i = state.mainList.findIndex(item => item.id === payload);
                        if(i !== -1) {
                                state.mainList.splice(i, 1);
                                return;
                        }
                        for(let key in state.subLists) {
                                i = state.subLists[key].findIndex(item => item.id === payload);
                                if(i !== -1) {
                                        state.subLists[key].splice(i, 1);
                                        return;
                                }
                        }
                },
                _addCategory(state, payload) {
                        if(payload.fid === 0)
                                state.mainList.push(payload);
                        if(payload.fid !== 0 && typeof state.subLists[payload.fid] !== 'undefined') {
                                console.log(state.subLists[payload.fid]);
                                state.subLists[payload.fid].push(payload);
                        }
                },
                _updateCategory(state, payload) {
                        let obj = {
                                id: payload.id,
                                fid: payload.fid,
                                name: payload.name,
                                avatar: payload.oldAvatar === payload.avatar ? payload.avatar : `/images/category/${ payload.avatar }`
                        };
                        let i = -1;
                        if(payload.fid === 0) {                 //修改的一级
                                i = state.mainList.findIndex(item => item.id === payload.id);
                                state.mainList[i] = obj;
                        } else {                                        //修改的二级
                                for(let key in state.subLists) {
                                        i = state.subLists[key].findIndex(item => item.id === payload.id);
                                        if(i !== -1) {
                                                 if(payload.fid.toString() === key) state.subLists[key][i] = obj;                //判断二级有没有在一级分类里来回跳，相等表示没有
                                                 else {
                                                        state.subLists[key].splice(i, 1);
                                                        if(typeof state.subLists[payload.fid] !== 'undefined') state.subLists[payload.fid].push(obj);
                                                 }
                                                 break;
                                        }
                                }
                        }
                }
        },
        actions: {
                initMainList({ state, commit, dispatch, rootState }) {
                        if(state.isMainListInit) return Promise.resolve();
                        else return rootState.http({ url: 'category/main' })
                                .then(data => {
                                        commit('_initMainList', data);
                                        //dispatch('initSubLists', data[0].id);
                                });
                },
                initSubLists({ state, commit, rootState }, payload) {
                        //commit('_changeCurCid', payload);
                        if(typeof state.subLists[payload] !== 'undefined') return Promise.resolve();
                        else return rootState.http({
                                params: { id: payload },
                                url: 'category/sub'
                        })
                                .then(data => {
                                        let temp = {};
                                        temp[payload] = data;
                                        commit('_initSubLists', temp);
                                });
                },
                removeCategory({ rootState, commit }, { id, avatar }) {
                        return rootState.http({
                                        method: 'post',
                                        data: { id, avatar },
                                        url: '/category/remove'
                                })
                                        .then(data => { commit('_removeCategory', id); });
                        // commit('_removeCategory', payload);
                        // return Promise.resolve();
                },
                addCategory({ rootState, commit }, payload) {
                        return rootState.http({
                                        method: 'post',
                                        url: '/category/add',
                                        data: payload
                                })
                                        .then(data => {         //这个data就是数据返回来的新的id值
                                                let temp = {};
                                                temp.id = data;
                                                temp.name = payload.name;
                                                temp.fid = payload.fid;
                                                temp.avatar = !payload.avatar ? '' :`/images/category/${ payload.avatar }`;
                                                //调用mutations中的方法更新仓库的数据
                                                commit('_addCategory', temp);
                                                //给组件返回一个结果
                                                return temp;
                                        })
                },
                updateCategory({ rootState, commit }, payload) {
                        return rootState.http({
                                        method: 'post',
                                        url: 'category/update',
                                        data: payload
                                })
                                        .then(() => commit('_updateCategory', payload));
                }
        }
};