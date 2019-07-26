<template>
	<div class="page-wrapper">
		<div class="header">
			<div class="back">
				<router-link to="/">
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
		<div class="content">
			<div class="left">
				<ul class="category-main">
					<li v-for="item in mainList" :key="item.id" :class="{ active: item.id === curCid}" @click="initSubLists(item.id)">
						<span v-text="item.name"></span>
					</li>
				</ul>
			</div>
			<div class="right" ref="right">
				<ul class="category-sub">
					<li v-for="item in subList" :key="item.id">
						<router-link :to="`list/${ curCid }/${ item.id }`">
							<img :src="item.avatar" />
							<span v-text="item.name"></span>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
		<div class="footer">
			<MiNav></MiNav>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import PopUp from '../components/PopUp.vue';
	import MiNav from '../components/MiNav.vue';
	import { createNamespacedHelpers } from 'vuex';
	import BScroll from 'better-scroll';
	import imagesLoaded from 'imagesloaded';

	let{ mapState, mapGetters, mapActions } = createNamespacedHelpers('category');

        export default {
                components: {
                        MiNav,
	                PopUp
                },
	        data: function() {
                        return {
	                        show: true                 //表示显示弹窗
		        }
	        },
                computed: {
	                ...mapState([ 'mainList', 'curCid' ]),
	                ...mapGetters([ 'subList' ])
                },
//	        watch: {
//                        curCid: function(newValue, oldValue) {
//                                if(typeof this.subLists[this.curCid] === 'undefined') {
//                                        this._getSubListData();
//                                }
//                        }
//	        },
	        methods: {
		        ...mapActions([ 'initMainList', 'initSubLists' ]),
		        _initAndRefreshRightScroll() {
		                imagesLoaded(this.$refs.right, () => {
                                        this.$nextTick(() => {
                                                if(!this.rightScroll) {
                                                        this.rightScroll = new BScroll(this.$refs.right, { click:true });
                                                } else this.rightScroll.refresh();
                                        });
		                });
		        }
//                        _getMainListData: function() {
//                                this.$http({ url:'/category/main' })
//	                                .then(data =>{
//	                                        this.mainList = data;
//	                                        if(data.length > 0) this.curCid = data[0].id
//	                                });
//                        },
//		        _getSubListData: function() {
//                                this.$http({
//	                                params: { id: this.curCid },
//	                                url: '/category/sub'
//                                }).then(data => {
//                                        this.$set(this.subLists, this.curCid, data);
////                                        let temp = {};
////                                        temp[this.curCid] = data;
////                                        this.subLists = {
////	                                        ...this.subLists,
////	                                        ...temp
////                                        };
//                                });
//		        }
	        },
	        created: function() {
                        this.initMainList();
                },
	        updated: function() {
                        this._initAndRefreshRightScroll();
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
		flex-wrap: wrap;
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
		flex: 1;
		overflow: auto;
		display: flex;
	}
	.content>.left {
		width: 1.8rem;
		height: 100%;
		overflow: auto;
		flex-shrink: 0;
		/*border-right: 1px solid #ccc;*/
		font-size: 0.28rem;
	}
	.content>.left>ul.category-main {}
	.content>.left>ul.category-main>li {
		padding: 0.2rem 0;
		text-align: center;
		border-bottom: 1px solid #ddd;
		border-right: 1px solid #ddd;
		color: #666;
	}
	.content>.left>ul.category-main>li.active {
		color: #ff0000;
		border-right: 1px solid transparent;
		background: #eee;
	}
	.content>.left>ul.category-main>li>span {}
	.right {
		flex-grow: 1;
		overflow: hidden;
		padding: 0 0.1rem;
		background: #eee;
	}
	.right::-webkit-scrollbar {
		display: none;
	}
	.right ul.category-sub {
		background: #fff;
	}
	.right li {
		display: inline-block;
		width: 33.333333%;
		padding: 0.2rem 0.6rem 0.4rem 0.26rem;
		box-sizing: border-box;
	}
	.right li>a {
		display: block;
		text-align: center;
		color: #333;
	}
	.right li>a>img {
		width: 100%;
	}
	.right li>span {}
	.footer {
		flex: none;
	}
</style>