<template>
	<div class="login-pwd">
		<div class="form-item-wrapper">
			<input type="text" placeholder="手机号/邮箱" class="account" v-model="loginInfo.account">
		</div>
		<div class="form-item-wrapper pwd-img-position">
			<input type="password" placeholder="密码" class="pwd" v-model="loginInfo.pwd">
			<div class="pwd-img">
				<img src="../assets/images/login/close_eye.png" class="close active" />
				<img src="../assets/images/login/open_eye.png" class="open" />
			</div>
		</div>
		<button class="btn-pwd" @click="loginPwd">登录</button>
		<span class="forgot">忘记密码</span>
	</div>
</template>

<script type="text/ecmascript-6">
	import Cookies from 'js-cookie';

        export default {
                data: function() {
                        return {
                                loginInfo: { account: '', pwd: ''},
                        }
                },
                methods: {
                        loginPwd: function() {
                                this.$http({
                                        method:'post',
                                        url:'/login/pwd',
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
	.form-item-wrapper>input.account {}
	.form-item-wrapper>input.pwd {}
	.pwd-img-position {
		position: relative;
	}
	.form-item-wrapper>.pwd-img {
		position: absolute;
		bottom: -50%;
		right: 0;
		height: 100%;
	}
	.form-item-wrapper>.pwd-img>img {
		display: none;
		width: 50%;
	}
	.form-item-wrapper>.pwd-img>img.active {
		display: block;
	}
	.login-pwd>span.forgot {
		display: block;
		text-align: right;
		margin-top: 0.1rem;
	}
</style>