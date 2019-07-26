<template>
	<div class="profile-wrapper">
		<div class="header">
			<div class="back">
				<router-link to="/">
					<img src="../assets/images/category/header/new-back.png" alt="">
				</router-link>
			</div>
			<div class="ugou">
				<span>我的优购</span>
			</div>
			<div class="menu" @click="isShow = !isShow">
				<img src="../assets/images/category/header/ico-menu.png" alt="">
			</div>
		</div>
		<PopUp v-show="isShow"></PopUp>
		<div class="profile-content">
			<div class="management">
				<a href="#" class="user-name">
					<img src="../assets/images/profile/user.png" alt="" class="people">
					<span class="name">zhangsan</span>
					<span class="vip">普通会员</span>
					<img src="../assets/images/profile/information-small.png" alt="" class="information">
					<router-link to="/address" class="account">账户地址管理&gt;</router-link>
				</a>
			</div>
			<div class="user-info">
				<div class="my-order">
					<a href="#">
						<p class="title">我的订单<span>全部订单</span></p>
						<ul>
							<li>
								<i><img src="../assets/images/profile/pay.png" alt=""></i>
								<span>待付款</span>
							</li>
							<li>
								<i><img src="../assets/images/profile/logistics.png" alt=""></i>
								<span>查看物流</span>
							</li>
							<li>
								<i><img src="../assets/images/profile/evaluate.png" alt=""></i>
								<span>待评价</span>
							</li>
						</ul>
					</a>
				</div>
				<div class="my-pay">
					<a href="#">
						<p class="title">我的钱包</p>
						<ul>
							<li>
								<i>0</i>
								<span>礼品卡</span>
							</li>
							<li>
								<i>3</i>
								<span>优惠券</span>
							</li>
							<li>
								<i>100</i>
								<span>积分</span>
							</li>
						</ul>
					</a>
				</div>
				<div class="user-list">
					<ul>
						<li><a href="#"><i><img src="../assets/images/profile/member.png" alt=""></i><span>用户中心</span></a></li>
						<li><a href="#"><i><img src="../assets/images/profile/integration.png" alt=""></i><span>积分商城</span></a></li>
						<li><a href="#"><i><img src="../assets/images/profile/past.png" alt=""></i><span>每日签到</span></a></li>
						<li><a href="#"><i><img src="../assets/images/profile/service.png" alt=""></i><span>联系客服</span></a></li>
					</ul>
				</div>
				<div class="user-list sub">
					<ul>
						<li><a href="#"><i><img src="../assets/images/profile/collection.png" alt=""></i><span>收藏/关注</span></a></li>
						<li><a href="#"><i><img src="../assets/images/profile/help.png" alt=""></i><span>帮助中心</span></a></li>
						<li><a href="#"><i><img src="../assets/images/profile/suggession.png" alt=""></i><span>意见反馈</span></a></li>
						<li></li>
					</ul>
				</div>
			</div>
			<div class="footer">
				<div>
					<span class="name">zhangsan</span>
					<span>|</span>
					<span class="login-out">退出</span>
				</div>
				<div>
					<span>电脑版</span>
					<span>客户端</span>
					<span>微信</span>
				</div>
			</div>
			<footer>
				<p>百丽国际旗下购物网站</p>
				<p>Copyright © 2011-2018 优购 m.yougou.com</p>
			</footer>
		</div>
		<MiNav class="profile-bottom"></MiNav>
	</div>
</template>

<script type="text/ecmascript-6">
	import MiNav from '../components/MiNav.vue';
	import PopUp from '../components/PopUp.vue';

        export default {
                components: { MiNav, PopUp },
                data() {
                        return {
                                isShow: false
                        }
                }
        };
</script>

<style scoped>
	.profile-wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.profile-content {
		flex-grow: 1;
		overflow: auto;
	}
	.profile-bottom {
		flex-shrink: 0;
	}
	button {
		border: none;
		outline: none;
		background-color: transparent;
	}
	.header {
		position: relative;
		height: 0.8rem;
		flex-shrink: 0;
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
	.header>.ugou {
		flex-grow: 1;
	}
	.header>.ugou>span {
		font-size: 0.36rem;
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
	.management {
		position: relative;
		height: 1.8rem;
		padding: 0.2rem;
		box-sizing: border-box;
		background-image: url(../assets/images/profile/top-backgroundc.jpg);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	a.user-name {
		display: block;
		color: #fff;
	}
	a.user-name>img.people {
		width: 1.2rem;
	}
	a.user-name>span.name {
		position: absolute;
		top: 0.3rem;
		left: 1.6rem;
		font-size: 0.32rem;
	}
	a.user-name>span.vip {
		position: absolute;
		bottom: 0.3rem;
		left: 1.55rem;
		font-size: 0.28rem;
		background-color: #bd2302;
		padding: 0.05rem 0.2rem;
		border-radius: 0.56rem;
	}
	a.user-name>img.information {
		position: absolute;
		top: 0.2rem;
		right: 0.2rem;
		width: 0.44rem;
	}
	a.user-name>a.account {
		position: absolute;
		bottom: 0.2rem;
		right: 0.2rem;
		font-size: 0.28rem;
		color: white;
	}
	.user-info {
		flex-grow: 1;
	}
	.my-order {
		display: flex;
		height: 2.4rem;
		background: #fff;
	}
	.my-order>a {
		display: block;
		width: 100%;
		color: #333;
	}
	.my-order>a>p {
		display: flex;
		position: relative;
		justify-content: space-between;
		align-items: center;
		height: 0.84rem;
		padding-left: 0.3rem;
		font-size: 0.32rem;
		border-bottom: 1px solid #ddd;
	}
	.my-order>a>p>span {
		font-size: 0.24rem;
		padding-right: 0.5rem;
	}
	.my-order>a>p>span:after {
		content: '';
		position: absolute;
		right: 0.2rem;
		top: 50%;
		transform: translateY(-50%);
		width: 0.2rem;
		height: 0.2rem;
		background-image: url(../assets/images/profile/gray-open.png);
		background-size: 100% 100%;
	}
	.my-order>a>ul {
		display: flex;
		height: 1.6rem;
	}
	.my-order>a>ul>li {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		justify-content: center;
		align-items: center;
	}
	.my-order>a>ul>li>i {}
	.my-order>a>ul>li>i>img {
		width: 0.42rem;
	}
	.my-order>a>ul>li>span {
		font-size: 0.26rem;
	}
	.my-pay {
		display: flex;
		height: 2.4rem;
		background: #fff;
		margin-top: 0.2rem;
	}
	.my-pay>a {
		display: block;
		width: 100%;
		color: #333;
	}
	.my-pay>a>p {
		display: flex;
		align-items: center;
		height: 0.84rem;
		padding-left: 0.3rem;
		font-size: 0.32rem;
		border-bottom: 1px solid #ddd;
	}
	.my-pay>a>p>span {
		font-size: 0.24rem;
		padding-right: 0.5rem;
	}
	.my-pay>a>ul {
		display: flex;
		height: 1.6rem;
	}
	.my-pay>a>ul>li {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		justify-content: center;
		align-items: center;
	}
	.my-pay>a>ul>li>i {
		font-style: normal;
		font-weight: bold;
	}
	.my-pay>a>ul>li>span {
		font-size: 0.26rem;
		margin-top: 0.2rem;
	}
	.user-list {
		height: 1.6rem;
		background: #fff;
		margin-top: 0.2rem;
	}
	.user-list>ul {
		display: flex;
		height: 100%;
	}
	.user-list>ul>li {
		display: flex;
		flex-grow: 1;
		justify-content: center;
		align-items: center;
	}
	.user-list>ul>li>a {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.user-list>ul>li>a>i {}
	.user-list>ul>li>a>i>img {
		width: 0.46rem;
	}
	.user-list>ul>li>a>span {
		font-size: 0.26rem;
		margin-top: 0.2rem;
		color: #333;
	}
	.sub>ul>li {
		flex-grow: 0;
		margin-left: 0.45rem;
		margin-right: 0.55rem;
	}
	.footer {
		display: flex;
		flex: none;
		flex-shrink: 0;
		height: 1rem;
		justify-content: space-between;
		border-top: 1px solid #ddd;
		background: #f8f8f8;
		color: #666;
	}
	.footer>div {
		padding: 0.3rem;
	}
	.footer>div>span{
		padding-right: 0.1rem;
	}
	footer {
		text-align: center;
		padding-bottom: 0.2rem;
		color: #a0a0a0;
		background: #f8f8f8;
	}
</style>