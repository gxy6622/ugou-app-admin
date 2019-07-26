<template>
	<div class="page-wrapper">
		<div class="header">
			<div class="back">
				<router-link to="/category">
					<img src="../assets/images/category/header/new-back.png" alt="">
				</router-link>
			</div>
			<div class="search">
				<img src="../assets/images/category/header/search.png" alt="">
				<span>请输入关键字</span>
			</div>
			<div class="menu" @click="show = !show">
				<img src="../assets/images/category/header/ico-menu.png" alt="">
			</div>
		</div>
		<PopUp v-show="!show"></PopUp>
		<div class="content" ref="content">
			<div class="content-wrapper">
				<div class="banner">
					<img src="../assets/images/product/banner/banner.jpg" alt="">
					<div class="focus">
						<span>4585人关注</span>
						<a href="#">
							<img src="../assets/images/product/banner/noFocus.png" alt="">
							<span>关注</span>
						</a>
					</div>
				</div>
				<div class="srch-order">
					<ul>
						<li class="active">综合</li>
						<li>销量</li>
						<li>
							价格
							<img src="../assets/images/product/srch/gray.png" alt="">
						</li>
						<li>新品</li>
						<li>
							筛选
							<img src="../assets/images/product/srch/select.png" alt="">
						</li>
					</ul>
				</div>
				<div class="scroll" >
					<ul class="content-main" v-if="$store.state.product.list.length > 0">
						<li v-for="item in $store.state.product.list" :key="item.id">
							<router-link :to="`/detail/${ item.id }`">
								<div class="avatar-wrapper">
									<img :src="item.avatar" />
									<span class="mark-price" v-text="`￥${ item.markPrice }`"></span>
								</div>
								<p class="name" v-text="item.name"></p>
								<span class="price" v-text="`￥${ item.price }`"></span>
								<span class="old-price" v-text="`￥${ item.oldPrice }`"></span>
							</router-link>
						</li>
					</ul>
					<p v-else>暂无商品，敬请期待...</p>
					<p v-show="isLoading">loading...</p>
					<p v-show="$store.state.product.list.length > 0 && !hasMore">已到达底部...</p>
				</div>
			</div>


		</div>
		<div class="cart">
			<router-link to="/cart"></router-link>
		</div>
		<div class="footer">
			<ul>
				<li class="first">
					<span @click="active = !active">商品分类</span>
					<ul class="list" v-show="!active">
						<li><a href="#">品质男鞋</a></li>
						<li><a href="#">瘦腿长靴</a></li>
						<li><a href="#">人气中短靴</a></li>
						<li><a href="#">浅口单鞋</a></li>
						<li><a href="#">深口单鞋</a></li>
						<li><a href="#">潮流小白鞋/老爹鞋</a></li>
					</ul>
				</li>
				<li>
					<a href="#">品牌故事</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import PopUp from '../components/PopUp.vue';
	import BScroll from 'better-scroll';
	import imagesLoaded from 'imagesloaded';

        export default {
                components: { PopUp },
	        data: function() {
                        return {
                                isLoading: false,
	                        hasMore: true,
                                mainId: 0,
	                        subId: 0,
	                        show: true,
	                        active: true,
	                        scrollY: 0
		        }
	        },
	        watch: {
                        subId(newValue, oldValue) {
//                                this.$store.dispatch('product/getData', {
//                                        subId: this.subId
//                                });
	                        this.hasMore = true;
	                        this._getData(false);
                        },
		        isLoading(newValue, oldValue) {
                                if((!newValue) && this.hasMore && this.scroll) this.scroll.finishPullUp();
		        }
	        },
	        methods: {
                        _getData(loadMore) {
                                this.isLoading = true;
                                this.$store.dispatch('product/getData', {
                                        subId: this.subId,
	                                loadMore
                                }).then((flag) => {
                                        console.log(flag);
                                        this.isLoading = false;
                                        this.hasMore = flag;
                                });
                        },
                        _initAndRefreshContentScroll() {
                                imagesLoaded(this.$refs.content, () => {
					this.$nextTick(() => {
					        if(!this.scroll) {
                                                        this.scroll = new BScroll(this.$refs.content, {
                                                                click:true,
	                                                        pullUpLoad: {
                                                                        threshold: -50
	                                                        }
                                                        });
                                                        this.scroll.on('pullingUp', () => {
                                                                this._getData(true);
//                                                                this.$store.commit('alert/open', '正在加载更多...');
                                                        });
                                                }
                                                else this.scroll.refresh();
					});
                                });
                        }
	        },
	        activated() {
                        if(this.scroll) {
                                this.scroll.refresh();
                                this.scroll.scrollTo(0, this.scrollY);
                        }
                        //this.mainId = parseInt(this.$route.params.mainId);
                        this.subId = parseInt(this.$route.params.subId);
	        },
	        deactivated() { if(this.scroll) this.scrollY = this.scroll.y; },
                updated: function() {
                        this._initAndRefreshContentScroll();
                },
	        destroyed() {
                        if(this.scroll) this.scroll.destroy();
	        },
	        //路由守卫
	        beforeRouteUpdate(to, form, next) {
                        this.subId = parseInt(to.params.subId);
                        next();
	        }
        };
</script>

<style scoped>
	.header {
		position: relative;
		height: 0.8rem;
		flex-shrink: 0;
		flex: none;
		display: flex;
		align-items: center;
		background-color: #f8f8f8;
		border-bottom: 1px solid #ddd;
	}
	.header>div {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.header>.back {
		width: 1rem;
		height: 0.56rem;
		flex-direction: column;
	}
	.header>.back>a {
		display: block;
		width: 100%;
		height: 100%;
		text-align: center;
	}
	.header>.back img {
		width: 0.24rem;
		height: 0.44rem;
	}
	.header>.search {
		flex: 1;
		background: rgb(255, 255, 255);
		border: 0.02rem solid #bbb;
		border-radius: 0.03rem;
		height: 0.56rem;
	}
	.header>.search>img {
		width: 0.4rem;
		height: 0.32rem;
		margin-left: 0.12rem;
	}
	.header>.search>span {
		flex: 1;
		font-size: 0.24rem;
		color: #999;
		margin-left: 0.12rem;
	}
	.header>.menu {
		width: 0.8rem;
		height: 0.56rem;
	}
	.header>.menu>img {
		width: 0.4rem;
		height: 0.32rem;
	}
	.content {
		flex-grow: 1;
		flex-direction: column;
		overflow: hidden;
	}
	.content>.content-wrapper>.banner {
		position: relative;
		font-size: 0;
	}
	.content>.content-wrapper>.banner>img {
		width: 100%;
	}
	.content>.content-wrapper>.banner>.focus {
		position: absolute;
		right: 0.3rem;
		bottom: 0.2rem;
		color: #fff;
		font-size: 0.24rem;
	}
	.content>.content-wrapper>.banner>.focus>a {
		display: inline-block;
		color: white;
	}
	.content>.content-wrapper>.banner>.focus>a>img {
		width: 0.25rem;
		height: 0.22rem;
	}
	.content>.content-wrapper>.srch-order {
		flex: none;
		height: 0.84rem;
		border-bottom: 0.01rem solid #ddd;
	}
	.content>.content-wrapper>.srch-order>ul {
		display: flex;
		height: 100%;
		align-items: center;
	}
	.content>.content-wrapper>.srch-order>ul>li {
		flex: 1;
		height: 100%;
		text-align: center;
		padding: 0.3rem 0;
		box-sizing: border-box;
		color: #999;
	}
	.content>.content-wrapper>.srch-order>ul>li.active {
		color: #ff0000;
	}
	.content>.content-wrapper>.srch-order>ul>li>img {
		width: 0.2rem;
		height: 0.2rem;
	}
	.content .content-wrapper>.scroll {
		display: flex;
		flex-direction: column;
		overflow: hidden;
		background-color: #f5f5f5;
	}
	.content ul.content-main {
		background-color: #f5f5f5;
		flex-direction: column;
		padding: 0.1rem 0 0 0.1rem;

	}
	.content ul.content-main>li {
		display: inline-block;
		width: 48%;
		background: #fff;
		box-sizing: border-box;
		margin-bottom: 0.1rem;
		margin-right: 0.15rem;
		padding: 0.2rem;
	}
	.content ul.content-main>li>a {
		display: flex;
		flex-direction: column;
	}
	.content ul.content-main>li>a>.avatar-wrapper {
		position: relative;
	}
	.content ul.content-main>li>a>.avatar-wrapper>img {
		width: 100%;
	}
	.content ul.content-main>li>a>.avatar-wrapper>span.mark-price {
		display: inline-block;
		position: absolute;
		right: 0.1rem;
		bottom: 0.12rem;
		color: white;
		z-index: 1;
	}
	.content ul.content-main>li>a>.avatar-wrapper>span.mark-price:before {
		content: '';
		position: absolute;
		right: -0.17rem;
		bottom: -0.14rem;
		width: 0.9rem;
		height: 0.9rem;
		display: block;
		background-image: url(../assets/images/product/list/bg_price.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		z-index: -1;
	}
	.content ul.content-main>li>a>p.name {
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-break: break-all;
		display: -webkit-box;
		overflow: hidden;
		color: #666;
	}
	.content ul.content-main>li>a>span.price {
		font-size: 0.28rem;
		color: #fd4765;
	}
	.content ul.content-main>li>a>span.old-price {
		color: #666;
		text-decoration: line-through;
	}
	.cart {
		position: fixed;
		right: 0.2rem;
		bottom: 1.2rem;
		z-index: 99;
	}
	.cart>a{
		display: block;
		width: 0.8rem;
		height: 0.8rem;
		background-image: url(../assets/images/category/header/ico-shopcartc.png);
		background-size: 60% 60%;
		background-position: center center;
		background-repeat: no-repeat;
		border-radius: 0.4rem;
		background-color: rgba(0,0,0,0.3);
		z-index: 9;
	}
	.footer {
		height: 1rem;
		flex: none;
		border-top: 0.02rem solid #ddd;
	}
	.footer>ul {
		display: flex;
		height: 100%;
	}
	.footer>ul>li {
		display: flex;
		flex: 1;
		justify-content: center;
		align-items: center;
		font-size: 0.32rem;
		color: #666666;
	}
	.footer>ul>li.first {
		position: relative;
	}
	.footer>ul>li.first:after {
		content: '';
		width: 0.02rem;
		height: 0.41rem;
		background: #ccc;
		position: absolute;
		right: 0;
	}
	.footer>ul>li>a {
		color: #666;
	}
	.footer ul.list {
		position: absolute;
		bottom: 100%;
		left: 0;
		width: 100%;
		border: 0.02rem solid #ddd;
		padding: 0 0.2rem;
		box-sizing: border-box;
		background: #fff;
		z-index: 10;
	}
	.footer ul.list>li {
		padding: 0.2rem 0;
		text-align: center;
		border-bottom: 0.01rem solid #ddd;
	}
	.footer ul.list>li:last-child {
		border-bottom: 0.01rem solid transparent;
	}
	.footer ul.list>li>a {
		color: #666666;
	}
</style>