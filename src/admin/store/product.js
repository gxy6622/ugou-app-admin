export default {
        namespaced: true,
        state: {
                list: []
        },
        getters: {},
        mutations: {
                _updateList(state, payload) {
                        state.list = payload;
                },
                uploadBanner(state, { id, filePath }) {
                        //payload: { id: ??, filePath: ?? }
                        let i =state.list.findIndex(item => item.id === id);            //找到要改的元素的下标
                        let temp = { ...state.list[i] };                                                //重新创建一个对象
                        if(temp.bannerImgs !== '') {                                               //避免空的时候是‘，’
                                temp.bannerImgs = temp.bannerImgs.split(',');
                                temp.bannerImgs.push(filePath);
                                temp.bannerImgs = temp.bannerImgs.join(',');
                        } else temp.bannerImgs = filePath;
                        state.list.splice(i, 1, temp);
                },
                _removeBanner(state, { id, newBannerImgs }) {
                        let i = state.list.findIndex(item => item.id === id);
                        let temp = { ...state.list[i] };
                        temp.bannerImgs = newBannerImgs;                //新图换旧图
                        state.list.splice(i, 1, temp);                                  //删除并替换
                },
                _addProduct(state, payload) {
                        console.log(payload);
                        let tempItem = state.list.find(item => item.cid === payload.cid);
                        let temp = {};
                        temp.id = payload.id;
                        temp.cid = payload.cid;
                        temp.name = payload.name;
                        temp.price = payload.price;
                        temp.oldPrice = payload.oldPrice;
                        temp.markPrice = payload.markPrice;
                        temp.avatar = `/images/product/${ payload.avatar }`;
                        console.log(payload.avatar);
                        console.log(temp.avatar);
                        temp.bannerImgs = '';
                        temp.subCategoryName = tempItem.subCategoryName;
                        temp.mainCategoryId = tempItem.mainCategoryId;
                        temp.mainCategoryName = tempItem.mainCategoryName;
                        state.list.push(temp);
                }
        },
        actions: {
                getData({ commit, rootState }, payload) {
                        return rootState.http({
                                method: 'post',
                                data: payload,
                                url: '/product/admin-list'
                        })
                                .then(data => {
                                        commit('_updateList', data.list);
                                        return data.total;
                                })
                },
                //组件传过来的payload是 { id: ?, filePath: ?? }。然后传到服务器时候再多传一个newBannerImgs：？？，字符串形式，来减轻数据库压力
                removeBanner({ state, commit, rootState }, { id, filePath }) {
                        let oldBannerImgs = state.list.find(item => item.id ===id).bannerImgs;
                        let newBannerImgs = '';
                        if(oldBannerImgs !== filePath) {
                                let arr = oldBannerImgs.split(',');
                                arr.splice(arr.indexOf(filePath), 1);
                                newBannerImgs = arr.join(',');
                        }
                        return rootState.http({
                                        method: 'post',
                                        url: '/product/banner/remove',
                                        data: { id, filePath, newBannerImgs }
                                })
                                        .then(() => commit('_removeBanner', { id, newBannerImgs }))
                },
                addProduct({ state, rootState, commit }, payload) {
                        return rootState.http({
                                method: 'post',
                                data: payload,
                                url: '/product/add'
                        })
                                .then(data => {
                                        if(state.list.findIndex(item => item.cid === payload.cid) !== -1) {
                                                commit('_addProduct', { ...payload, id: data })
                                        }
                                })
                }
        }
};