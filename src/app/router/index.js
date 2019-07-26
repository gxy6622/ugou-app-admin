//Vue项目路由配置文件
import Vue from 'vue';
import Router from 'vue-router';

//导入所有需要vue-router控制的页面级组件
import Home from '../views/Home.vue';
import Category from '../views/Category.vue';
import Discover from '../views/Discover.vue';
import Cart from '../views/Cart.vue';
import Profile from '../views/Profile.vue';
import List from '../views/List.vue';
import Login from '../views/Login.vue';
import Detail from '../views/Detail.vue';
import Order from '../views/Order.vue';
import Address from '../views/Address.vue';

//向vue体系注入vue-router路由体系
Vue.use(Router);

//创建路由对象
let router = new Router({
        linkActiveClass: 'active',
        routes: [
                { path: '/', component: Home },
                {
                        path: '/category',
                        component: Category,
                        meta: {
                               keepAlive: true         //表示是否缓存
                        }
                },
                { path: '/discover', component: Discover },
                { path: '/cart', component: Cart },
                { path: '/profile', component: Profile },
                {
                        path: '/list/:mainId/:subId',
                        component: List ,
                        meta: {
                                keepAlive: true
                        }
                },
                { path: '/login', component: Login },
                { path: '/detail/:pid', component: Detail },
                { path: '/order/:orderId', component: Order },
                { path: '/address', component: Address },
        ]
});

//导出路由对象
export default router;