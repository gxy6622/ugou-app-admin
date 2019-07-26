<template>
	<div class="page-wrapper">
		<div class="header">
			<div class="back">
				<router-link to="/cart">
					<img src="../assets/images/category/header/new-back.png" alt="">
				</router-link>
			</div>
			<div class="ugou">
				<span>结算中心</span>
			</div>
		</div>
		<div class="content">
			<div class="address">
				<p class="receive-title"><img src="../assets/images/order/adress.png" alt="">收货地址</p>
				<p class="receive-name"><span>zhangsan</span><span>137****7777</span></p>
				<p class="receive-address">
					******长城路000号
					<router-link to="/address">
						<img src="../assets/images/order/open.png" alt="">
					</router-link>
				</p>
			</div>
			<div class="deliver-date">
				<p><img src="../assets/images/order/date.png" alt="">选择配送时间</p>
				<ul class="deliver">
					<li class="active">工作日、双休日与假日均可送货</li>
					<li>仅工作日送货（周一至周五）</li>
					<li>仅周末送货（周六、周日）</li>
				</ul>
			</div>
			<div class="pay-style">
				<p><img src="../assets/images/order/pay.png" alt="">选择支付方式</p>
				<ul class="pay">
					<li class="active">支付宝钱包支付</li>
					<li>云闪付</li>
					<li>招商银行</li>
				</ul>
			</div>
			<div class="gift-card">
				<p><img src="../assets/images/order/discount.png" alt="">使用优惠券与礼品卡</p>
				<ul>
					<li>使用优惠券<img src="../assets/images/order/open.png" alt=""></li>
					<li>使用礼品卡<img src="../assets/images/order/open.png" alt=""></li>
				</ul>
			</div>
			<div class="invoice">
				<p class="invoice-info"><img src="../assets/images/order/invoice.png" alt="">发票信息</p>
				<p class="no-need">不需要发票<img src="../assets/images/order/open.png" alt=""></p>
			</div>
			<div class="product-info">
				<p><img src="../assets/images/order/information.png" alt="">商品信息</p>
				<ul class="info-list">
					<li v-for="item in list" :key="item.id">
						<img :src="item.avatar" />
						<div>
							<p class="name" v-text="item.name"></p>
							<span class="price" v-text="`￥${item.price}`"></span>
							<span class="count"><em>×</em>{{ item.count }}</span>
						</div>
					</li>
				</ul>
			</div>
			<p class="order-id"></p>
		</div>
		<div class="footer">
			<div class="total-price-wrapper">
				应付金额：<em>￥{{ lists.account }}</em>
			</div>
			<button class="btn-settlement">提交订单</button>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import { mapState, mapActions } from 'vuex';

        export default {
                data() {
                        return {
                                lists: { account: 0 }
                        }
                },
	        computed: {
		        ...mapState('order', [ 'list' ]),
	        },
	        created() {
                        this.getOrderData();
	        },
	        methods: {
		        ...mapActions('order', [ 'getData' ]),
		        getOrderData() {
		                let orderId = this.$route.params.orderId;
		                this.getData({ orderId: orderId })
			                .then(data => {
			                        this.lists.account = data[0].account;
			                })
			                .catch(() => {});
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
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		text-align: center;
	}
	.header>.back img {
		width: 0.24rem;
		height: 0.4rem;
	}
	.header>.ugou {
		flex-grow: 1;
	}
	.header>.ugou>span {
		font-size: 0.36rem;
		color: #333;
		text-align: center;
	}
	.content {
		flex: 1;
		font-size: 0.3rem;
	}
	.address {
		padding: 0.2rem;
		border-top: 0.12rem solid #eee;
	}
	.address>p.receive-title {
		font-size: 0.3rem;
		color: #333;
		padding-bottom: 0.1rem;
		border-bottom: 1px solid #eee;
	}
	.address>p.receive-title>img {
		width: 3.5%;
		margin-right: 0.2rem;
	}
	.address>p.receive-name {
		color: #666;
		padding-bottom: 0.1rem;
	}
	.address>p.receive-name>span {
		margin-right: 0.1rem;
		font-size: 0.26rem;
	}
	.address>p.receive-address {
		position: relative;
		font-size: 0.26rem;
		color: #666;
	}
	.address>p.receive-address>a {}
	.address>p.receive-address>a>img {
		width: 0.24rem;
		height: 0.3rem;
		position: absolute;
		top: -0.2rem;
		right: 0.2rem;
	}
	.deliver-date {
		padding: 0.2rem;
		border-top: 0.12rem solid #eee;
	}
	.deliver-date>p {
		font-size: 0.3rem;
		color: #333;
		padding-bottom: 0.1rem;
	}
	.deliver-date>p>img {
		width: 3.5%;
		margin-right: 0.2rem;
	}
	.deliver-date>ul.deliver {
		font-size: 0.26rem;
	}
	.deliver-date>ul>li {
		color: #666;
		padding: 0.1rem;
		margin-bottom: -0.02rem;
		/* border: 1px solid #eee; */
	}
	.deliver-date>ul>li.active {
		border: 1px solid #ff0000;
	}
	.pay-style {
		padding: 0.2rem;
		border-top: 0.12rem solid #eee;
	}
	.pay-style>p {
		font-size: 0.3rem;
		color: #333;
		padding-bottom: 0.1rem;
	}
	.pay-style>p>img {
		width: 3.5%;
		margin-right: 0.2rem;
	}
	.pay-style>ul.pay {
		font-size: 0.26rem;
	}
	.pay-style>ul>li {
		color: #666;
		padding: 0.1rem;
		margin-bottom: -0.02rem;
		/* border: 1px solid #eee; */
	}
	.pay-style>ul>li.active {
		border: 1px solid #ff0000;
	}
	.gift-card {
		padding: 0.2rem;
		border-top: 0.12rem solid #eee;
	}
	.gift-card>p {
		font-size: 0.3rem;
		color: #333;
		padding-bottom: 0.16rem;
		border-bottom: 1px solid #eee;
	}
	.gift-card>p>img {
		width: 3.5%;
		margin-right: 0.2rem;
	}
	.gift-card>ul {
		font-size: 0.26rem;
	}
	.gift-card>ul>li {
		position: relative;
		color: #666;
		padding: 0.16rem;
		margin-bottom: -0.02rem;
		border-bottom: 1px solid #eee;
	}
	.gift-card>ul>li>img {
		position: absolute;
		right: 0.2rem;
		top: 50%;
		transform: translateY(-50%);
		width: 0.24rem;
		height: 0.3rem;
	}
	.invoice {
		padding: 0.2rem;
		border-top: 0.12rem solid #eee;
	}
	.invoice>p {
		font-size: 0.3rem;
		color: #333;
	}
	.invoice>p.invoice-info {
		padding-bottom: 0.2rem;
		border-bottom: 1px solid #eee;
	}
	.invoice>p.invoice-info>img {
		width: 3.5%;
		margin-right: 0.2rem;
	}
	.invoice>p.no-need {
		position: relative;
		padding: 0.16rem 0 0.16rem 0.2rem;
		font-size: 0.26rem;
		color: #666;
	}
	.invoice>p.no-need>img {
		position: absolute;
		right: 0.2rem;
		top: 50%;
		transform: translateY(-50%);
		width: 0.24rem;
		height: 0.3rem;
	}
	.product-info {
		margin-bottom: 1.2rem;
		padding: 0.2rem;
		border-top: 0.12rem solid #eee;
		border-bottom: 0.12rem solid #eee;
	}
	.product-info>p {
		font-size: 0.3rem;
		color: #333;
		padding-bottom: 0.2rem;
		border-bottom: 1px solid #eee;
	}
	.product-info>p>img {
		width: 3.5%;
		margin-right: 0.2rem;
	}
	.product-info>ul.info-list {}
	.product-info>ul.info-list>li {
		display: flex;
		padding: 0.2rem;
		border-bottom: 1px solid #ddd;
	}
	.product-info>ul.info-list>li>img {
		width: 30%;
		height: 30%;
		border: 1px solid #eee;
	}
	.product-info>ul.info-list>li>div {
		position: relative;
		margin-left: 0.2rem;
	}
	.product-info>ul.info-list>li>div>p.name {
		font-size: 0.26rem;
		color: #333;
	}
	.product-info>ul.info-list>li>div>span.price {
		position: absolute;
		bottom: 0;
		left: 0;
		font-size: 0.28rem;
		color: #333;
	}
	.product-info>ul.info-list>li>div>span.count {
		position: absolute;
		right: 0;
		bottom: 0;
		font-size: 0.26rem;
		color: #666;
	}
	.product-info>ul.info-list>li>div>span.count>em {
		font-style: normal;
	}
	.footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 1rem;
		flex-shrink: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: 1px solid #ddd;
		background: #ddd;
		z-index: 100;
	}
	.total-price-wrapper {
		flex-grow: 1;
		padding-left: 0.2rem;
		text-align: left;
		font-size: 0.28rem;
	}
	.total-price-wrapper em {
		font-style: normal;
		color: #ff0000;
	}
	.footer button {
		width: 2.34rem;
		height: 100%;
		background-color: #ff3300;
		color: white;
		font-size: 0.32rem;
	}
</style>