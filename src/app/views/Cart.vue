<template>
	<div class="page-wrapper">
		<div class="header">
			<div class="back">
				<a href="#">
					<img src="../assets/images/category/header/new-back.png" alt="">
				</a>
			</div>
			<div class="cart">
				<span>购物车</span>
			</div>
			<div class="menu" @click="isShow = !isShow">
				<img src="../assets/images/category/header/ico-menu.png" alt="">
			</div>
		</div>
		<PopUp v-show="isShow"></PopUp>
		<div class="content">
			<ul class="cart-list" v-if="list.length > 0">
				<li v-for="item in list" :key="item.id">
					<span class="checkbox" :class="{ checked: active = item.active }" @click="item.active = !item.active"></span>
					<router-link :to="`/detail/${ item.id }`" class="avatar-wrapper">
						<img :src="item.avatar"/>
					</router-link>
					<div class="info">
						<router-link :to="`/detail/${ item.pid }`" class="name" v-text="item.name"></router-link><br/>
						<router-link :to="`/detail/${ item.pid }`" class="price-wrapper">
							￥<span class="price" v-text="item.price"></span>
						</router-link>
						<div class="count-wrapper">
							<NumCount :count="item.count" @decrease="decrease(item)" @increase="increase(item)"></NumCount>
						</div>
					</div>
				</li>
			</ul>
			<p v-else>购物车暂无商品</p>
		</div>
		<div class="footer">
			<div class="all-wrapper">
				<span class="checkbox all" :class="{ checked: active1 }" @click="changeAll(active1)"></span>&nbsp;&nbsp;全选
				<span class="remove" @click="remove">删除<img src="../assets/images/cart/del.png" alt=""></span>
			</div>
			<div class="total-price-wrapper">
				合计：<em>￥<span class="total-price" v-text="totalPrice"></span></em>
			</div>
			<button class="btn-settlement" @click="settlement">去结算<span class="total-count" v-text="totalCount > 0 ? `(${ totalCount })` : ''"></span></button>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import NumCount from '../components/NumCount.vue';
	import PopUp from '../components/PopUp.vue';

        export default {
                components: { NumCount, PopUp },
                data(){
                        return {
                                list: [],
	                        isShow: false
                        }
                },
	        computed: {
                        active1() {     //全选
                                return !this.list.find(item => item.active === false);                  //show为真时，全选；find找到了为真，表达式取反为假，此时没有全部选中；
                        },                                                                                                                                               //find找不到为假，表达式取反为真，此时全部选中
                        totalPrice() {          //总金额
                                let result = 0;
                                this.list.filter(item => item.active).forEach(item => result += item.count * item.price);               //筛选出”选中“的商品进行迭代，计算金额
                                return result;
                        },
                        totalCount() {          //总数量
                                let result = 0;
                                this.list.filter(item => item.active).forEach(item => result += item.count);
                                return result;
                        }
	        },
	        created() {
                       this._getCartData();
	        },
                methods: {
                        _getCartData(){
                                this.$http({
                                        method: 'post',
                                        url: '/cart/list'
                                })
	                                .then(data => {
	                                        data.forEach((item) => {
	                                                item.active = true;
	                                        });
	                                        this.list = data;
	                                })
                        },
	                changeAll(flag) {
                                this.list.forEach(item => item.active = !flag);
	                },
			increase(item) {
                                if(item.count === 5) {
                                        this.$store.commit('alert/open', '商品数量已到达上限');
                                        return;
                                }
                                this.$http({
                                        method:'post',
                                        url:'/cart/increase',
                                        data:{ id: item.id },	//data传的值都是字符串
                                }).then(data => {
                                        item.count += 1;
                                })
			},
	                decrease(item) {
                                if(item.count === 1) {
                                        this.$store.commit('alert/open', '购买数量已达下限');
                                        return;
                                }
                                this.$http({
                                        method:'post',
                                        url:'/cart/decrease',
                                        data:{ id: item.id },
                                }).then(data => {
                                        item.count -= 1;
                                })
	                },
	                remove() {
                                let activeList = this.list.filter(item => item.active);
                                if(activeList.length < 1) {
                                        this.$store.commit('alert/open', '请先选择..');
                                        return;
                                }
                                if(!confirm('真删？')) return;
                                let ids = [];
                                activeList.forEach(item =>  ids.push(item.id));
                                this.$http({
                                        method:'post',
                                        url:'/cart/remove',
                                        data:{ ids: JSON.stringify(ids) }
                                }).then(data => {
					ids.forEach(item => {
					        for(let i = 0; i < this.list.length; i ++) {
					                if(this.list[i].id === item) {
					                        this.list.splice(i, 1);
					                        break;
					                }
					        }
					})
                                })
	                },
	                settlement() {
                                let activeList = this.list.filter(item => item.active);
                                if(activeList.length < 1) {
                                        this.$store.commit('alert/open', '请先选择..');
                                        return;
                                }
                                let ids = [];
                                activeList.forEach(item => ids.push(item.id));
                                this.$http({
                                        method:'post',
                                        url:'/cart/settlement',
                                        data:{
                                                ids: JSON.stringify(ids),
                                                account: this.totalPrice
                                        }
                                }).then(data => {
                                        ids.forEach(item => {
                                                for(let i = 0; i < this.list.length; i ++) {
                                                        if(this.list[i].id === item) {
                                                                this.list.splice(i, 1);
                                                                break;
                                                        }
                                                }
                                        });
                                        this.$router.push(`/order/${ data }`);
                                })
	                }
                }
        };
</script>

<style scoped>
	button {
		border: none;
		outline: none;
		background-color: transparent;
	}
	.header {
		position: relative;
		height: 0.8rem;
		/* flex-shrink: 0; */
		flex: none;
		display: flex;
		align-items: center;
		background-color: #f8f8f8;
		border-bottom: 1px solid #ddd;
	}
	.header > div {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.header > .back {
		width: 1rem;
		height: 0.56rem;
		flex-direction: column;
	}
	.header > .back > a {
		display: block;
		width: 100%;
		height: 100%;
		text-align: center;
	}
	.header > .back img {
		width: 0.24rem;
		height: 0.44rem;
	}
	.header > .cart {
		flex-grow: 1;
	}
	.header > .cart > span {
		font-size: 0.36rem;
		color: #333;
		text-align: center;
	}
	.header > .menu {
		width: 0.8rem;
		height: 0.56rem;
	}
	.header > .menu > img {
		width: 0.4rem;
		height: 0.32rem;
	}
	.content {
		flex: 1;
		overflow: auto;
		background: #eee;
	}
	ul.cart-list {
		margin: 0.2rem 0;
		border-top: 1px solid #ddd;
	}
	ul.cart-list li {
		display: flex;
		padding: 0.5rem 0.2rem;
		background: #fff;
	}
	ul.cart-list li>span.checkbox {
		flex-shrink: 0;
		align-self: center;
	}
	ul.cart-list li>a.avatar-wrapper {
		flex-shrink: 0;
		width: 2rem;
		height: 2rem;
		margin: 0 0.2rem;
	}
	ul.cart-list li>a.avatar-wrapper>img {
		width: 100%;
		height: 100%;
		transform: scale(1);
		border: 0.02rem solid #ddd;
	}
	ul.cart-list li>.info {
		flex-grow: 1;
		position: relative;
		margin-left: 0.05rem;
	}
	ul.cart-list li>.info>a.name {
		font-size: 0.28rem;
		color: #333;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}
	ul.cart-list li>.info>a.price-wrapper {
		display: block;
		font-size: 0.28rem;
		color: #333;
		margin-top: -0.2rem;
	}
	ul.cart-list li>.info>.count-wrapper {
		position: absolute;
		left: 0;
		bottom: 0;
	}
	.footer {
		height: 1rem;
		flex-shrink: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: 0.02rem solid #ddd;
	}
	.all-wrapper {
		display: flex;
		align-items: center;
		font-size: 0.28rem;
		margin-left: 0.2rem;
	}
	span.checkbox {
		display: block;
		width: 0.36rem;
		height: 0.36rem;
		background-image: url(../assets/images/cart/icon_checkbox_uncheck.png);
		background-size: 100% 100%;
	}
	span.checkbox.checked {
		background-image: url(../assets/images/cart/icon_checkbox_check.png);
		background-size: 100% 100%;
	}
	.total-price-wrapper {
		flex-grow: 1;
		padding-right: 0.2rem;
		text-align: right;
		font-size: 0.28rem;
	}
	.total-price-wrapper em {
		font-style: normal;
		color: rgb(191, 17, 17);
	}
	.footer button {
		width: 2.5rem;
		height: 100%;
		background-color: #bf1111;
		color: white;
		font-size: 0.32rem;
	}
	.footer span.remove {
		display: flex;
		margin-left: 0.5rem;
		align-items: center;
	}
	.footer span.remove>img {
		width: 30%;
		height: 30%;
	}
</style>