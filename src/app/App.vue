<template>
	<div class="root">
		<UgouAlert></UgouAlert>
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>

<script type="text/ecmascript-6">
	import UgouAlert from './components/UgouAlert.vue';

        export default {
                components: { UgouAlert }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.root
		width: 100%
		height: 100%
</style>