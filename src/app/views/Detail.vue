<template>
	<div class="detail-content">
		<div class="wrapper">
			<div class="header">
				<div class="back">
					<span @click="() => $router.go(-1)">
						<img src="../assets/images/category/header/new-back.png" alt="">
					</span>
				</div>
				<div class="ugou">
					<span>商品详情</span>
				</div>
				<div class="menu" @click="isShow = !isShow">
					<img src="../assets/images/category/header/ico-menu.png" alt="">
				</div>
			</div>
			<PopUp v-show="isShow"></PopUp>
			<div class="content">
				<div class="swiper-container">
					<ul class="swiper-wrapper">
						<li class="swiper-slide" v-for="item in lists.bannerImgs" :key="item.id"><img :src="item"></li>
					</ul>
					<div class="swiper-pagination"></div>
					<p class="name" v-text="lists.name"></p>
					<i class="dec">￥<span class="price" v-text="lists.price"></span></i>
					<i class="dect">￥<span class="old-price" v-text="lists.oldPrice"></span></i>
				</div>
				<div class="style">
					<p>已选<span>粉金色/尺码</span><i>&gt;</i></p>
				</div>
				<div class="recomend-wrapper">
					<p class="title">评价(1)<span>&gt;</span></p>
					<dl>
						<dt>
							<span class="phone">139****</span>
							<img src="../assets/images/detail/star.png" alt="">
							<img src="../assets/images/detail/star.png" alt="">
							<img src="../assets/images/detail/star.png" alt="">
							<img src="../assets/images/detail/star.png" alt="">
							<img src="../assets/images/detail/star.png" alt="">
							<span class="date">2019-05-27</span>
						</dt>
						<dd>
							<p class="like">非常喜欢 很舒适</p>
							<p class="suit">颜色：粉金色,尺码：35(合适)</p>
						</dd>
					</dl>
				</div>
				<div class="brand">
					<a>
						<img src="../assets/images/detail/teenmix.jpg" alt="">
						<span class="teen">天美意</span>
						<span class="bali">百丽优购</span>
						<span class="gt">&gt;</span>
					</a>
				</div>
				<div class="like-other">
					<p>喜欢此商品的人还买了<span>&gt;</span></p>
					<ul>
						<li>
							<a href="#">
								<img src="../assets/images/detail/other/other01.jpg" alt="">
								<p>Teenmix/天美意夏黑色羊绒皮革/纺织品多条带方跟女凉鞋CDX06BL8</p>
								<span>￥278</span>
							</a>
						</li>
						<li>
							<a href="#">
								<img src="../assets/images/detail/other/other02.jpg" alt="">
								<p>Teenmix/天美意夏黑色羊绒皮革/纺织品多条带方跟女凉鞋CDX06BL8</p>
								<span>￥278</span>
							</a>
						</li>
						<li>
							<a href="#">
								<img src="../assets/images/detail/other/other03.jpg" alt="">
								<p>Teenmix/天美意夏黑色羊绒皮革/纺织品多条带方跟女凉鞋CDX06BL8</p>
								<span>￥278</span>
							</a>
						</li>
					</ul>
					<ul>
						<li>
							<a href="#">
								<img src="../assets/images/detail/other/other04.jpg" alt="">
								<p>Teenmix/天美意夏黑色羊绒皮革/纺织品多条带方跟女凉鞋CDX06BL8</p>
								<span>￥278</span>
							</a>
						</li>
						<li>
							<a href="#">
								<img src="../assets/images/detail/other/other05.jpg" alt="">
								<p>Teenmix/天美意夏黑色羊绒皮革/纺织品多条带方跟女凉鞋CDX06BL8</p>
								<span>￥278</span>
							</a>
						</li>
						<li>
							<a href="#">
								<img src="../assets/images/detail/other/other06.jpg" alt="">
								<p>Teenmix/天美意夏黑色羊绒皮革/纺织品多条带方跟女凉鞋CDX06BL8</p>
								<span>￥278</span>
							</a>
						</li>
					</ul>
				</div>
				<div class="tab">
					<ul class="main-tab">
						<li :class="{ active: curIndex === 0 }" @click="curIndex = 0"><span>详情</span></li>
						<li :class="{ active: curIndex === 1 }" @click="curIndex = 1"><span>评价(1)</span></li>
						<li :class="{ active: curIndex === 2 }" @click="curIndex = 2"><span>推荐</span></li>
					</ul>
					<div class="sub-tab sub-tab-detail" v-show="curIndex === 0">
						<ul>
							<li>
								<p>商品参数</p>
							</li>
							<li>
								<p>尺码对照表</p>
							</li>
							<li>
								<p>图文详情</p>
							</li>
						</ul>
					</div>
					<div class="sub-tab sub-tab-remark" v-show="curIndex === 1">
						<p>非常喜欢 很舒适</p>
					</div>
					<div class="sub-tab sub-tab-recomend" v-show="curIndex === 2">
						<ul>
							<li>
								<a href="">
									<p>Teenmix/天美意夏专柜同款黑色简约一字带厚底女凉鞋CD301BL8</p>
								</a>
							</li>
							<li>
								<a href="">
									<p>Teenmix/天美意夏专柜同款黑色简约一字带厚底女凉鞋CD301BL8</p>
								</a>
							</li>
							<li>
								<a href="">
									<p>Teenmix/天美意夏专柜同款黑色简约一字带厚底女凉鞋CD301BL8</p>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="footer">
			<ul>
				<li><router-link to="#"><i><img src="../assets/images/detail/like.png" alt=""></i><span class="color">收藏</span></router-link></li>
				<li><router-link to="/cart"><i><img src="../assets/images/detail/car1.png" alt=""></i><span class="color">购物车</span></router-link></li>
				<li @click="addCart2"><router-link to="#"><span class="add-cart">加入购物车</span></router-link></li>
				<li><router-link to="/cart"><span>立即购买</span></router-link></li>
			</ul>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import { createNamespacedHelpers } from 'vuex';
	import PopUp from '../components/PopUp.vue';
        import Swiper from 'swiper';
        import 'swiper/dist/css/swiper.min.css';

	let { mapState, mapActions } = createNamespacedHelpers('detail');

        export default {
                components: { PopUp },
	        data() {
                        return {
                                curIndex: 0,
                                isShow: false,
	                        lists: { name: '', price: '', oldPrice: '', bannerImgs: [] },
	                        count: 1
                        }
	        },
	        computed: {
		        ...mapState([ 'list' ])
	        },
	        methods: {
		        ...mapActions([ 'getData', 'addCart' ]),
		        getData2() {
		                let pid = this.$route.params.pid;
		                this.getData({ id: pid })
			                .then(data => {
			                        let bannerPath = data[0].bannerImgs;
			                        //console.log(data[0].bannerImgs.substr(0).split(','));
                                                //console.log(data[0].bannerImgs.split(','));
		                                this.lists.name = data[0].name;
		                                this.lists.price = data[0].price;
		                                this.lists.oldPrice = data[0].oldPrice;
		                                this.lists.bannerImgs = bannerPath.split(',');
			                })
			                .catch(() => {});
		        },
		        initBanner() {
		                setTimeout(() => {
                                        let mySwiper = new Swiper('.swiper-container', {
                                                autoplay: {
                                                        disableOnInteraction: false,
                                                },
                                                speed:300,
                                                loop:true,
                                                observer:true,
                                                pagination:{
                                                        el:'.swiper-pagination',
                                                },
//                                                onClick: function(swiper){
//                                                        alert('你点了Swiper');
//                                                        alert(mySwiper.realIndex);     //当前索引
//                                                }
                                        })
		                }, 100)
		        },
		        addCart2() {
		                let pid = this.$route.params.pid;
				this.addCart({ id: pid, count: this.count })
					.then(data => {
					        if(data !== null) {
                                                        this.$store.commit('alert/open', `${ data }`);
					        }
                                                else {
					                this.$store.commit('alert/open', '成功加入购物车');
					        }
					})
					.catch(() => {});
		        }
	        },
	        created() {
                        this.getData2();
                        this.initBanner();
	        },
        };
</script>

<style scoped>
	.detail-content {
		height:100%;
		display: flex;
		flex-direction: column;
	}
	button {
		border: none;
		outline: none;
		background-color: transparent;
	}
	.wrapper {
		flex-grow: 1;
		overflow: auto;
	}
	.wrapper::-webkit-scrollbar {
		display: none;
	}
	.header {
		position: relative;
		height: 0.8rem;
		flex-shrink: 0;
		/* flex: none; */
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
	.header>.back>span {
		display: block;
		width: 100%;
		height: 100%;
		text-align: center;
	}
	.header>.back img {
		width: 0.24rem;
		height: 0.44rem;
	}
	.header>.ugou {
		flex-grow: 1;
	}
	.header>.ugou>span {
		font-size: 36px;
		color: #333;
		text-align: center;
	}
	.header>.menu {
		width: 0.8rem;
		height: 0.56rem;
	}
	.header>.menu>img {
		width: 0.4rem;
		height: 0.32rem;
	}
	/*----------中间content区域------------*/
	.content {
		flex-grow: 1;
		background: #eee;
	}
	.content>.swiper-container {
		position: relative;
		padding: 0 0.2rem;
		background: #fff;
	}
	.content ul.swiper-wrapper {
		width: 500%;
		margin-left: 1.5rem;
	}
	.content ul.swiper-wrapper>li {
		width: 20%;
		height: 5.2rem;
		display: inline-block;
	}
	.content ul.swiper-wrapper>li>img {
		width: 5.2rem;
		height: 5.2rem;
	}
	.content .swiper-container>p.name {
		font-size: 28px;
		color: #666;
		margin-bottom: 0.2rem;
	}
	.content .swiper-container>i {
		font-style: normal;
	}
	.content .swiper-container>i.dec {
		font-size: 28px;
		font-weight: bold;
		color: #ff0000;
	}
	.content .swiper-container>i.dect {
		font-size: 28px;
		color: #666;
		text-decoration: line-through;
	}
	.content .swiper-container>i>span.price {
		font-size: 48px;
		font-weight: bold;
		color: #ff0000;
	}
	.content .swiper-container>I>span.old-price {
		font-size: 28px;
		color: #666;
		text-decoration: line-through;
	}
	.content .swiper-pagination {
		position: absolute;
		bottom: 1.7rem;
	}
	.content .swiper-pagination>.swiper-pagination-bullet {
		width: 0.15rem;
		height: 0.15rem;
		background-color: #FF0000;
	}
	.style {
		background: #fff;
		margin-top: 0.15rem;
		padding-left: 0.2rem;
	}
	.style>p {
		padding: 0.2rem 0;
		font-size:28px;
		color: #666;
	}
	.style>p>span {
		margin-left: 0.3rem;
		color: #333;
	}
	.style>p>i {
		float: right;
		padding-right: 0.2rem;
		font-style: normal;
		text-align: right;
		font-size: 28px;
	}
	.recomend-wrapper {
		margin-top: 0.15rem;
		background: #fff;
		border-bottom: 1px solid #aaa;
	}
	.recomend-wrapper>p.title {
		font-size: 28px;
		color: #666;
		border-bottom: 1px solid #aaa;
		padding: 0.2rem 0.2rem;
	}
	.recomend-wrapper>p.title>span {
		float: right;
		font-size:28px;
	}
	.recomend-wrapper>dl {
		padding: 0.2rem;
		font-size: 14px;
	}
	.recomend-wrapper>dl>dt {
		border-bottom: 1px dashed black;
		padding-bottom: 0.2rem;
	}
	.recomend-wrapper>dl>dt>span.phone {
		margin-right: 0.2rem;
		font-size: 28px;
	}
	.recomend-wrapper>dl>dt>span.date {
		float: right;
		padding-right: 0.2rem;
		font-size: 28px;
	}
	.recomend-wrapper>dl>dt>img {}
	.recomend-wrapper>dl>dd {}
	.recomend-wrapper>dl>dd>p.like {
		color: #666;
		padding: 0.2rem 0;
		font-size: 28px;
	}
	.recomend-wrapper>dl>dd>p.suit {
		color: #a0a0a0;
		font-size: 28px;
	}
	.brand {
		background: #fff;
		position: relative;
		font-size: 24px;
	}
	.brand>a {
		display: block;
		padding: 0.2rem;
	}
	.brand>a>img {
		width: 1.2rem;
		border: 1px solid #bbb;
	}
	.brand>a>span.teen {
		position: absolute;
		top: 18%;
		left: 1.6rem;
		color: #666;
	}
	.brand>a>span.bali {
		position: absolute;
		bottom: 19%;
		left: 1.6rem;
		color: #666;
	}
	.brand>a>span.gt {
		position: absolute;
		right: 0.2rem;
		top: 0.3rem;
		font-size: 28px;
	}
	.like-other {
		background: #FFFFFF;
		border-top: 1px solid #aaa;
	}
	.like-other>p {
		padding: 0.2rem;
		border-bottom: 1px solid #aaa;
		font-size: 28px;
	}
	.like-other>p>span {
		float: right;
		font-size: 0.24rem;
	}
	.like-other>ul {
		width: 100%;
	}
	.like-other>ul>li {
		display: inline-block;
		width: 32%;
		box-sizing: border-box;
		font-size: 28px;
		padding: 0.2rem;
	}
	.like-other>ul>li>a {
		display: block;
	}
	.like-other>ul>li>a>img {
		width: 100%;
		border: 1px solid #bbb;
	}
	.like-other>ul>li>a>p {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #666;
	}
	.like-other>ul>li>a>span {
		color: #ff0000;
		font-weight: bold;
	}
	.tab {
		margin-top: 0.2rem;
		background: #fff;
	}
	.tab>ul {
		display: flex;
		height: 0.6rem;
		border-bottom: 1px solid #bbb;
	}
	.tab>ul>li {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		flex-grow: 1;
		font-size: 28px;
		text-align: center;
	}
	.tab>ul>li.active {
		border-bottom: 3px solid red;
	}
	.tab>ul>li:nth-child(1) {
		border-right: 1px solid #aaa;
	}
	.tab>ul>li:nth-child(2) {
		border-right: 1px solid #aaa;
	}
	.tab>.sub-tab {
		font-size: 28px;
		color: #333;
		/*display: none;*/
		height: 5rem;
	}
	/*.tab>.sub-tab.active {*/
		/*display: block;*/
	/*}*/
	.tab>.sub-tab a {
		color: #333;
	}


	/*-----------------END--------------------*/
	.footer {
		flex: none;
		height: 0.9rem;
		border-top: 1px solid #ddd;
	}
	.footer>ul {
		display: flex;
		height: 100%;
	}
	.footer>ul>li {
		flex-grow: 1;
		display: flex;
		align-items: center;
		text-align: center;
	}
	.footer>ul>li:nth-child(3) {
		flex-grow: 2;
		background: #ffbc00;
	}
	.footer>ul>li:nth-child(3)>a {
		color: white;
		font-size: 0.32rem;
	}
	.footer>ul>li:nth-child(4) {
		flex-grow: 2;
		background: #ff3300;
	}
	.footer>ul>li:nth-child(4)>a {
		color: white;
		font-size: 0.32rem;
	}
	.footer>ul>li>a {
		display: flex;
		flex: auto;
		flex-direction: column;
	}
	.footer>ul>li>a>i {}
	.footer>ul>li>a>i>img {
		width: 0.42rem;
		height: 0.36rem;
	}
	.footer>ul>li>a>span.color {
		color: #666;
		font-size: 24px;
	}
</style>
<style>
	.swiper-pagination-bullet {
		width: 10px;
		height: 10px;
		border-radius: 5px;
		background-color: red;
	}
</style>