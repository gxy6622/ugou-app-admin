<template>
	<div class="nav">
		<ul>
			<li><router-link to="/"><img src="../assets/images/category/header/homec.png" alt=""><span>首页</span></router-link></li>
			<li><router-link to="/category"><img src="../assets/images/category/header/class.png" alt=""><span>分类</span></router-link></li>
			<li><router-link to="/cart"><img src="../assets/images/category/header/ico-shopcartc.png" alt=""><span>购物车</span></router-link></li>
			<li><router-link to="/profile"><img src="../assets/images/category/header/ico-personc.png" alt=""><span>我的优购</span></router-link></li>
		</ul>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {};
</script>

<style scoped>
	.nav {
		width: 100%;
		height: 0.98rem;
		background: #666;
		z-index: 2;
	}
	.nav>ul {
		display: flex;
		width: 100%;
		height: 100%;
	}
	.nav>ul>li {
		display: flex;
		flex: 1;
	}
	.nav>ul>li>a {
		flex: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.nav>ul>li>a>img {
		width: 20%;
	}
	.nav>ul>li>a>span {
		font-size: 0.28rem;
		color: white;
	}
</style>