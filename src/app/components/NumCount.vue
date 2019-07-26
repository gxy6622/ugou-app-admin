<template>
	<div class="num-count">
		<span class="decrease" @click="$emit('decrease')"></span>
		<span class="count" v-text="count"></span>
		<span class="increase" @click="$emit('increase')"></span>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                props: [ 'count' ]
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.num-count
		width: 1.8rem
		height: 0.4rem
		display: flex
		span
			flex: 0 0 auto
			width: 0.52rem
			text-align: center
			color: #666
			font-weight: bold
			border: 1px solid #bbb
			&.decrease
				border-right: none
				background-image: url(../assets/images/cart/minusN.png)
				background-repeat: no-repeat
				background-size: 60% 10%
				background-position: center center;
			&.increase
				border-left: none
				background-image: url(../assets/images/cart/addN.png)
				background-repeat: no-repeat
				background-size: 60% 60%
				background-position: center center
</style>