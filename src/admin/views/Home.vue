<template>
	<el-container class="u-home">
		<el-aside width="auto">
			<HomeNav></HomeNav>
		</el-aside>
		<el-container>
			<el-header>
				<h1>优购商城后台管理系统</h1>
				<div class="login-name">
					<span>欢迎</span>
					<em v-text="name"></em>
					<button @click="logout">退出登录</button>
				</div>
			</el-header>
			<el-main>
				<HomeTab></HomeTab>
			</el-main>
			<el-footer height="30px">
				<p>&copy; 版权所有：Author</p>
				<p>TEL：15306426622</p>
				<p>E-mail：123@123.com</p>
			</el-footer>
		</el-container>
	</el-container>
</template>

<script type="text/ecmascript-6">
	import HomeNav from '../components/HomeNav.vue';
	import HomeTab from '../components/HomeTab.vue';
	import { mapState, mapMutations } from 'vuex'

        export default {
	        data() {
	                return {}
	        },
                components: {
                        HomeNav,
	                HomeTab
                },
	        computed: {
		        ...mapState('login', ['name']),
	        },
                methods: {
	                ...mapMutations('login', ['_logout']),
                        logout() {
                                this._logout();
                        }
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.u-home
		width: 100%
		height: 100%
		.el-aside
			background-color: #303133
		.el-header
			background-color: #000
			display: flex
			align-items: center
			position relative
			h1
				color: #ffd04b
				font-size: 28px
			.login-name
				position absolute
				right 20px
				span
					color #ffd04b
				em
					color #ffd04b
					text-decoration underline
					font-style normal
				button
					margin-left 10px
					background-color #ffd04b
					outline none
					border none
		.el-footer
			display: flex
			align-items: center
			background-color: #606266
			p
				color: #f5f5f5
				font-size: 12px
				font-weight: normal
				margin-right: 50px
</style>