<template>
	<div class="login-phone">
		<div class="form-item-wrapper">
			<input type="tel" placeholder="手机号" class="phone" v-text="phone" v-model="loginInfo.phone">
			<a class="code" v-text="code" @click="getCode"></a>
		</div>
		<div class="form-item-wrapper">
			<input type="text" placeholder="请输入验证码" class="scode" v-model="loginInfo.code">
		</div>
		<button class="btn-phone" @click="loginPhone">登录</button>
		<span class="gift">新会员限时惊喜 首次登录送百元礼包</span>
	</div>
</template>

<script type="text/ecmascript-6">
	import Cookies from 'js-cookie';

        export default {
                data: function() {
                        return {
                                loginInfo: { phone: '', code: ''},
                                code: '获取验证码',
	                        phone: ''
                        };
                },
	        methods: {
                        getCode: function() {
                                this.$http({ url:'/login/getcode',  })
                                        .then(data => this.code =data);
                        },
                        loginPhone: function() {
                                if(this.phone === '') {
                                        this.$store.commit('alert/open','手机号不能为空..');
                                        return;
                                }
                                if(this.code !== this.loginInfo.code.toUpperCase()) {
                                        this.$store.commit('alert/open', '验证码错误..');
                                        return;
                                }
                                this.$http({
                                        method:'post',
                                        url:'/login/phone',
                                        data: this.loginInfo
                                })
                                        .then(data => this.$router.replace(Cookies.get('target') || '/'));
                        }
	        }
        };
</script>

<style scoped>
	.form-item-wrapper {
		display: flex;
		height: 1.1rem;
		border-bottom: 1px solid #aaa;
	}
	.form-item-wrapper>input {
		flex-grow: 1;
		border: none;
		outline: none;
		font-size: 0.26rem;
		text-indent: 0.2rem;
	}
	button[class^=btn] {
		width: 100%;
		height: 0.88rem;
		border: none;
		outline: none;
		box-shadow: 0 4px 2px #f1eadf;
		font-size: 0.32rem;
		background: #999;
		color: #FFF;
		margin-top: 0.8rem;
	}
	.form-item-wrapper>input.phone {}
	.form-item-wrapper>a.code {
		width: 1.4rem;
		border-left: 1px solid #aaa;
		padding: 0.2rem 0.2rem 0.2rem 0.1rem;
		align-self: center;
		font-size: 0.26rem;
	}
	.form-item-wrapper>input.scode {}
	.form-item-wrapper>button.btn-login {}
	.login-phone>span.gift {
		display: block;
		text-align: center;
		margin-top: 0.1rem;
		color: rgb(255,70,100);
	}
</style>