<template>
	<button 
	:type="(btnType||'primary')" 
	:size="(size||'default')" 
	:id="preId"
	class="QS_WavesButton" 
	:style="(btnStyle||'')"
	:disabled="disabled||false"
	:loading="loading||false"
	:plain="plain||false"
	:form-type="formType||''"
	:open-type="openType||''"
	:hover-start-time="hoverStartTime||20"
	:hover-stay-time="hoverStayTime||70"
	:hover-class="hoverClass||'button-hover'"
	@getuserinfo="getuserinfo($event)"
	@tap.prevent.stop="handleClick($event)">
		<block v-if="preIconType">
			<uniIcon :type="preIconType" :color="preIconColor||'#fff'" :size="preIconSize||'100%'"></uniIcon>
		</block>
		<block v-if="txt">
			{{txt}}
		</block>
		<block v-else>
			<slot></slot>
		</block>
		<view class="waves-ripple" :class="{'z-active':active}" :style="{
			'top': rippleTop + 'px',
			'left': rippleLeft + 'px',
			'width': fields.finalWidth + 'px',
			'height': fields.finalWidth + 'px',
			'background-color':(wavesColor||'rgba(0, 0, 0, .15)')
		}">
		</view>
	</button>
</template>

<script>
	import _app from './app.js';
	import uniIcon from './uni-icon.vue'
	var QSWavesButton_preId = 0;
	export default {
		components:{ uniIcon },
		props: {
			txt: {
				type: String,
				default: ''
			},
			wavesColor: {
				type: String,
				default: ''
			},
			btnType: {
				type: String,
				default: ''
			},
			size: {
				type: String,
				default: ''
			},
			btnStyle: {
				type: String,
				default: ''
			},
			disabled: {
				type: Boolean,
				default: false
			},
			loading: {
				type: Boolean,
				default: false
			},
			plain: {
				type: Boolean,
				default: false
			},
			formType: {
				type: String,
				default: ''
			},
			openType: {
				type: String,
				default: ''
			},
			hoverStartTime: {
				type: Number,
				default: 20
			},
			hoverStayTime: {
				type: Number,
				default: 70
			},
			hoverClass: {
				type: String,
				default: 'button-hover'
			},
			preIconType: {
				type: String,
				default: ''
			},
			preIconColor: {
				type: String,
				default: '#fff'
			},
			preIconSize: {
				type: String,
				default: '100%'
			}
		},
		data() {
			let preId = 'QS_WavesButton' + QSWavesButton_preId++;
			return {
				preId: preId,
				rippleTop: 0,
				rippleLeft: 0,
				fields: {},
				active: Boolean,
				query: null,
			}
		},
		methods: {
			handleClick(e) {
				this.active = false;
				this.$nextTick(() => {
					this.activeFc(e);
				})
				this.$emit('click');
			},
			activeFc(e) {
				// console.log('点击事件:' + JSON.stringify(e));
				this.getFields().then(res => {
					// console.log('得到数据:' + JSON.stringify(data));
					let data = res[0]
					if(!data.height) return;
					data.finalWidth = (data.height > data.width ? data.height : data.width);
					if (!data.finalWidth) return;
					this.fields = data;
					let touchesX;
					let touchesY;
					// #ifdef MP-BAIDU
					touchesX = e.changedTouches[0].clientX;
					touchesY = e.changedTouches[0].clientY;
					// #endif
					// #ifdef MP-ALIPAY
					touchesX = e.detail.clientX;
					touchesY = e.detail.clientY;
					// #endif
					// #ifndef MP-BAIDU || MP-ALIPAY
					touchesX = e.touches[0].clientX;
					touchesY = e.touches[0].clientY;
					// #endif
					this.rippleTop = (touchesY - data.top - (data.finalWidth / 2));
					this.rippleLeft = (touchesX - data.left - (data.finalWidth / 2));
					this.$nextTick(() => {
						// setTimeout(()=>{	//若不能生成波纹请把setTimeout的注释打开
							this.active = true;
						// }, 10)
					})
				})
			},
			getFields() {
				return new Promise(rs => {
					let Query;
					let id;
					 // #ifdef MP-ALIPAY
					Query = uni.createSelectorQuery();
					id = '#' + this.preId;
					// #endif
					// #ifndef MP-ALIPAY
					Query = uni.createSelectorQuery().in(this);
					id = '.QS_WavesButton';
					// #endif
					console.log('id', id);
					Query.select(id).fields({ size: true, rect: true });
					Query.exec((data) => {
						console.log(data);
						if(data[0]===null) {
							this.retryGetFields().then(res=>{
								if(data[0]===null) {
									rs([{}]);
									return;
								}
								rs(res)
							});
							return;
						}
						rs(data)
					});
				})
			},
			retryGetFields() {	// 目前应该不用
				console.log('正在尝试重新获取布局信息, 请注意是否使用自定义组件模式, 并app.js中usingComponents是否配置正确')
				return new Promise(rs=>{
					let Query;
					if(_app.usingComponents) {
						// console.log('非自定义组件模式');
						Query= uni.createSelectorQuery();
					}else{
						// console.log('自定义组件模式');
						Query= uni.createSelectorQuery().in(this);
					}
					Query.select('.QS_WavesButton').boundingClientRect();
					Query.exec((data) => {
						// console.log('返回节点信息:' + JSON.stringify(data))
						rs(data)
					});
				})
			},
			getuserinfo(e) {
				this.$emit('getuserinfo', e)
			}
		}

	}
</script>

<style scoped>
	.QS_WavesButton {
		position: relative;
		overflow: hidden;
	}

	.waves-ripple {
		position: absolute;
		border-radius: 100%;
		background-clip: padding-box;
		pointer-events: none;
		user-select: none;
		transform: scale(0);
		opacity: 1;
	}

	.waves-ripple.z-active {
		opacity: 0;
		transform: scale(2);
		transition: opacity 1.2s ease-out, transform 0.6s ease-out;
	}
	
	.btn_icon{
		margin: 5px;
	}
</style>
