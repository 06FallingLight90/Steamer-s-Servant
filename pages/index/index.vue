<template>
	<view>
		<button class="refresh-btn" @click="confirmRefresh">
		    ⟳
		</button>
		<!-- 骰子组件 -->
	    <view class="dice-container">
	      <DiceRoller />
	    </view>
		<view class="grid-container">
		    <view class="grid-item top-left">
		      <MainCounter rotation='rotate90' mainColor="mistyrose"></MainCounter>
		    </view>
		    <view class="grid-item top-right">
		      <MainCounter rotation='rotate270' mainColor="lightgoldenrodyellow"></MainCounter>
		    </view>
		    <view class="grid-item bottom-left">
		      <MainCounter rotation='rotate90'></MainCounter>
		    </view>
		    <view class="grid-item bottom-right">
		      <MainCounter rotation='rotate270' mainColor="honeydew"></MainCounter>
		    </view>
		</view>
	</view>
</template>

<script>
	import MainCounter from "@/components/MainCounter.vue";
	import DiceRoller from "@/components/DiceRoller.vue";
	
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			confirmRefresh() {
			    // 弹出确认弹窗（使用 uni-app API）
			    uni.showModal({
			        title: '确认刷新',
			        content: '确定要刷新页面吗？',
			        success: (res) => {
			            if (res.confirm) {
			                // #ifdef H5
			                window.location.reload();  // H5环境刷新
			                // #endif
			                // #ifdef MP-WEIXIN
			                uni.reLaunch({
			                    url: '/pages/index/index'
			                });
			                // #endif
			            }
			        }
			    });
			}
		},
		components:{
			MainCounter,
			DiceRoller
		}
	}
</script>

<style scoped>
	.grid-container {
	  display: grid;
	  grid-template-columns: 1fr 1fr;  /* 两列等分 */
	  grid-template-rows: 1fr 1fr;     /* 两行等分 */
	  height: 100vh;                   /* 全屏高度 */
	  width: 100vw;                    /* 全屏宽度 */
	  gap: 2px;                        /* 组件之间的间距（可选） */
	  background-color: #ccc;          /* 间距的背景色 */
	}
	.grid-item {
	  border: 1px solid #ddd;
	  border-radius: 20px;
	  box-sizing: border-box;
	  overflow: hidden;
	  position: relative;
	}
	
	/*刷新按钮样式*/
	.refresh-btn {
	  position: fixed;
	  bottom: 0.5rem;
	  right: 0.5rem;
	  z-index: 999;
	  padding: 0.5rem 0.5rem;
	  line-height: 1;
	  background-color: rgba(0,0,0,0);
	  color: blue;
	  border: none;
	  border-radius: 50%;
	  font-size: 25px;
	  font-weight: 700;
	  cursor: pointer;
	  transition: all 0.3s ease;
	}
	
	.refresh-btn:hover {
	  background-color: #0056b3;
	  transform: scale(1.05);
	}
	
	.refresh-btn:active {
	  transform: scale(0.95);
	}
	
	/* 骰子容器样式 */
	.dice-container {
	  position: fixed;
	  top: 50%;
	  left: 50%;
	  transform: translate(-50%, -50%);
	  z-index: 998;
	}
</style>