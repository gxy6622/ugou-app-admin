<template>
	<ul class="nav">
		<li>
			<router-link to="/">
				<img src="../assets/images/footer/footer01.png" alt="">
			</router-link>
		</li>
		<li>
			<router-link to="/category">
				<img src="../assets/images/footer/footer02.png" alt="">
			</router-link>
		</li>
		<li>
			<router-link to="/discover">
				<img src="../assets/images/footer/footer03.png" alt="">
			</router-link>
		</li>
		<li>
			<router-link to="/cart">
				<img src="../assets/images/footer/footer04.png" alt="">
			</router-link>
		</li>
		<li>
			<router-link to="/profile">
				<img src="../assets/images/footer/footer05.png" alt="">
			</router-link>
		</li>
	</ul>
</template>

<script type="text/ecmascript-6">
        export default {};
</script>

<style scoped>
	ul.nav {
		display: flex;
		height: 1rem;
	}

	ul.nav>li {
		display: flex;
		flex: 1;
	}

	ul.nav>li>a {
		flex: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	ul.nav>li>a>img {
		width: 50%;
	}
</style>