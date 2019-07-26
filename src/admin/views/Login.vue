<template>
	<el-dialog :visible="true"
		:modal="false"
		:show-close="false"
		:center="true"
		width="500px"
		title="优购商城后台管理系统"
		class="dialog-login">
		<el-form ref="form" :model="model" :rules="rules" :status-icon="true">
			<el-form-item prop="name">
				<el-input placeholder="请输入用户名" prefix-icon="el-icon-user" v-model="model.name">
					<template slot="prepend">用户名</template>
				</el-input>
			</el-form-item>
			<el-form-item prop="pwd">
				<el-input placeholder="请输入密码" show-password prefix-icon="el-icon-lock" v-model="model.pwd">
					<template slot="prepend">密　码</template>
				</el-input>
			</el-form-item>
		</el-form>
		<div slot="footer">
			<el-button type="primary" @click="login2">确定</el-button>
			<el-button @click="$refs.form.resetFields()">重置</el-button>
		</div>
	</el-dialog>
</template>

<script type="text/ecmascript-6">
	import { createNamespacedHelpers } from 'vuex';

	let { mapActions } = createNamespacedHelpers('login');

        export default {
                data() {
                        return {
				model: { name: '', pwd: '' },
	                        rules: {
				        name: [
					        { required: true, message: '用户名不能为空', trigger: 'blur' }
				        ],
		                        pwd: [
                                                { required: true, message: '密码不能为空', trigger: 'blur' },
			                        { min: 3, max: 20, message: '密码长度为3-20', trigger: 'blur' }
		                        ]
	                        }
                        }
                },
	        methods: {
		        ...mapActions([ 'login' ]),
		        login2() {
				this.$refs.form.validate()
					.then(() => this.login(this.model))
					.catch(() => {})
		        }
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.dialog-login
		background-image: url("../assets/images/login_bg01.png")
		background-size: 100% 100%
		background-repeat: no-repeat
		background-position: center center
		font-weight: bolder
</style>