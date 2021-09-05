<template>
	<view class="content">
		<myTabbar />
	</view>
</template>

<script>
	import myTabbar from '@/components/stzhang-tab/stzhang-tab.vue'
	export default {
		components:{myTabbar},
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}
    .logo{
        height: 200upx;
        width: 200upx;
        margin-top: 200upx;
    }
	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
