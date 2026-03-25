<!--附加计数器-->
<template>
	<view class="extra-counter" :style="containerStyle">
		<view class="counter-content">
			<!-- 加号按钮 -->
			<view 
				class="btn add-btn" 
				@click="increment"
				@touchstart="startIncrement"
				@touchend="stopIncrement"
			>
				<image src="/static/plus.png" class="icon add-icon" />
			</view>
			
			<!-- 数字显示 -->
			<view class="number-display" :style="{ backgroundImage: logo ? `url(${logo})` : 'none' }">
				<text class="number">{{ count }}</text>
			</view>
			
			<!-- 减号按钮 -->
			<view 
				class="btn subtract-btn" 
				@click="decrement"
				@touchstart="startDecrement"
				@touchend="stopDecrement"
			>
				<image src="/static/minus.png" class="icon subtract-icon" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"ExtraCounter",
		props: {
			// logo 图片路径
			logo: {
				type: String,
				default: ''
			},
			// 初始值
			initialValue: {
				type: Number,
				default: 0
			},
			// 位置：left 或 right
			position: {
				type: String,
				default: 'left'
			},
			// 旋转状态
			rotation: {
				type: String,
				default: 'normal'
			}
		},
		computed: {
			// 容器样式：定位和旋转
			containerStyle() {
				let style = {
					position: 'absolute',
					zIndex: 5
				};
				
				// 根据位置和旋转状态设置定位
				if (this.rotation === 'rotate90') {
					if (this.position === 'left') {
						style.top = 'clamp(8px, 18vw, 30%)';
						style.left = 'clamp(10vw, 30vw, 30vw)';
					} else {
						style.top = 'clamp(75%, 70vw, 75%)';
						style.left = 'clamp(10vw, 30vw, 30vw)';
					}
					style.transform = 'rotate(90deg)';
					style.transformOrigin = 'center center';
				} else if (this.rotation === 'rotate270') {
					if (this.position === 'left') {
						style.top = 'clamp(8px, 18vw, 20%)';
						style.right = 'clamp(10vw, 28vw, 30vw)';
					} else {
						style.top = 'clamp(75%, 70vw, 75%)';
						style.right = 'clamp(10vw, 28vw, 30vw)';
					}
					style.transform = 'rotate(270deg)';
					style.transformOrigin = 'center center';
				} else {
					// normal 或 flip 状态
					if (this.position === 'left') {
						style.top = 'clamp(8px, 1vw, 20%)';
						style.left = 'clamp(10vw, 20vw, 100%)';
					} else {
						style.top = 'clamp(75%, 70vw, 75%)';
						style.right = 'clamp(10vw, 20vw, 30vw)';
					}
					if (this.rotation === 'flip') {
						style.transform = 'scaleX(-1)';
					}
				}
				
				return style;
			}
		},
		data() {
			return {
				count: 0,
				incrementTimer: null,
				decrementTimer: null,
				isLongPressing: false
			};
		},
		mounted() {
			this.count = this.initialValue;
		},
		methods: {
			// 增加数值
			increment() {
				if (!this.isLongPressing) {
					this.count++;
				}
			},
			
			// 减少数值
			decrement() {
				if (!this.isLongPressing) {
					this.count--;
				}
			},
			
			// 开始长按增加
			startIncrement() {
				this.clearTimers();
				this.isLongPressing = false;
				
				this.incrementTimer = setTimeout(() => {
					this.isLongPressing = true;
					this.startIncrementInterval();
				}, 500);
			},
			
			// 开始长按减少
			startDecrement() {
				this.clearTimers();
				this.isLongPressing = false;
				
				this.decrementTimer = setTimeout(() => {
					this.isLongPressing = true;
					this.startDecrementInterval();
				}, 500);
			},
			
			// 停止长按
			stopIncrement() {
				this.clearTimers();
				this.isLongPressing = false;
			},
			
			stopDecrement() {
				this.clearTimers();
				this.isLongPressing = false;
			},
			
			// 开始连续增加
			startIncrementInterval() {
				this.incrementTimer = setInterval(() => {
					this.count++;
				}, 200);
			},
			
			// 开始连续减少
			startDecrementInterval() {
				this.decrementTimer = setInterval(() => {
					this.count--;
				}, 200);
			},
			
			// 清理定时器
			clearTimers() {
				if (this.incrementTimer) {
					clearTimeout(this.incrementTimer);
					clearInterval(this.incrementTimer);
					this.incrementTimer = null;
				}
				if (this.decrementTimer) {
					clearTimeout(this.decrementTimer);
					clearInterval(this.decrementTimer);
					this.decrementTimer = null;
				}
			}
		},
		beforeUnmount() {
			this.clearTimers();
		}
	}
</script>

<style scoped>
.extra-counter {
	width: clamp(50px, 8vw, 80px);
	height: clamp(70px, 12vw, 100px);
	background-color: rgba(255, 255, 255, 0);
}

.counter-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	height: 100%;
	padding: clamp(4px, 0.8vw, 8px) 0;
}

.btn {
	width: clamp(25px, 8vw, 40px);
	height: clamp(15px, 8vw, 50px);
	display: flex;
	align-items: center;
	justify-content: center;
	/*background-color: #f0f0f0;
	border: clamp(1px, 0.2vw, 2px) solid #ccc;*/
	border-radius: 50%;
	cursor: pointer;
	transition: all 0.2s ease;
	user-select: none;
}

.btn:active {
	background-color: #e0e0e0;
	transform: scale(0.95);
}

/*
.btn text {
	font-size: clamp(12px, 2vw, 18px);
	font-weight: bold;
	color: #333;
}*/

.icon {
	width: clamp(40px, 10vw, 80px);
	height: clamp(40px, 6vw, 60px);
	opacity: 0.9;
}

.add-btn {
	order: 1;
}

.number-display {
	order: 2;
	display: flex;
	align-items: center;
	justify-content: center;
	height: clamp(40px, 6vw, 60px);
	margin:3vw;
	padding:3vw;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
}


.number {
	font-size: clamp(16px, 10vw, 24px);
	font-weight: bold;
	color: white;
	text-shadow: 
		-1px -1px 0 #000,
		1px -1px 0 #000,
		-1px 1px 0 #000,
		1px 1px 0 #000;
}

.subtract-btn {
	order: 3;
}

</style>