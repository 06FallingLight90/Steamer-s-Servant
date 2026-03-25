<template>
	<view class="dice-container">
		<!-- 骰子按钮 -->
		<view class="dice-button" @click="toggleDiceSelect">
			<text class="dice-icon">🎲</text>
		</view>
		
		<!-- 骰子选择菜单 -->
		<view v-if="showSelectMenu" class="dice-select-menu">
			<view class="menu-item" @click="rollDice(4)">d4</view>
			<view class="menu-item" @click="rollDice(6)">d6</view>
			<view class="menu-item" @click="rollDice(20)">d20</view>
			<view class="menu-item" @click="showCustomInput = true">自定义</view>
		</view>
		
		<!-- 自定义骰子输入 -->
		<view v-if="showCustomInput" class="custom-input-container">
			<input 
				v-model="customSides" 
				type="number" 
				placeholder="输入面数" 
				class="custom-input"
				@confirm="rollCustomDice"
			/>
			<view class="custom-buttons">
				<view class="custom-btn" @click="rollCustomDice">确定</view>
				<view class="custom-btn cancel" @click="showCustomInput = false">取消</view>
			</view>
		</view>
		
		<!-- 结果显示 -->
		<view v-show="showResult" class="result-display" 
			:class="{ 'show': showResultAnimation, 'hide': showResultHide }">
			<text class="result-number">{{ diceResult }}</text>
		</view>
	</view>
</template>

<script>
export default {
	name: "DiceRoller",
	data() {
			return {
				showSelectMenu: false,
				showCustomInput: false,
				showResult: false,
				showResultAnimation: false,
				showResultHide: false,
				diceResult: 0,
				customSides: 0
			};
		},
	methods: {
		// 切换骰子选择菜单显示
		toggleDiceSelect() {
			this.showSelectMenu = !this.showSelectMenu;
			this.showCustomInput = false; // 切换时关闭自定义输入
		},
		
		// 投掷指定面数的骰子
		rollDice(sides) {
			this.showSelectMenu = false;
			this.showCustomInput = false;
			this.diceResult = Math.floor(Math.random() * sides) + 1;
			this.showResult = true;
			
			// 先显示元素，然后添加show类触发动画
			this.$nextTick(() => {
				setTimeout(() => {
					// 使用 uni-app 的 API 获取元素
					const query = uni.createSelectorQuery().in(this);
					query.select('.result-display').boundingClientRect((rect) => {
						if (rect) {
							// 在小程序中，我们通过数据绑定来控制动画
							this.showResultAnimation = true;
						}
					}).exec();
				}, 10);
			});
			
			// 2.5秒后开始淡出动画
			setTimeout(() => {
				this.showResultAnimation = false;
				this.showResultHide = true;
				// 淡出动画结束后隐藏元素
				setTimeout(() => {
					this.showResult = false;
					this.showResultHide = false;
				}, 400); // 匹配CSS动画时长
			}, 2500);
		},
		
		// 投掷自定义面数的骰子
		rollCustomDice() {
			const sides = parseInt(this.customSides);
			if (sides > 0) {
				this.rollDice(sides);
			}
			this.customSides = 0;
		}
	}
};
</script>

<style scoped>
.dice-container {
	position: relative;
	display: inline-block;
}

.dice-button {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: clamp(60px, 10vw, 80px);
	height: clamp(60px, 10vw, 80px);
	background-color: #f0f0f0;
	border: clamp(2px, 0.3vw, 3px) solid #ccc;
	border-radius: 50%;
	cursor: pointer;
	transition: all 0.2s ease;
	user-select: none;
}

.dice-button:active {
	transform: scale(0.95);
	background-color: #e0e0e0;
}

.dice-icon {
	font-size: clamp(24px, 4vw, 32px);
}


/* 骰子选择菜单 */
.dice-select-menu {
	position: absolute;
	top: 100%;
	right: 0;
	background-color: white;
	border: clamp(1px, 0.2vw, 2px) solid #ccc;
	border-radius: clamp(4px, 0.5vw, 8px);
	box-shadow: 0 clamp(2px, 0.3vw, 4px) clamp(8px, 1vw, 12px) rgba(0, 0, 0, 0.1);
	z-index: 1000;
	margin-top: clamp(4px, 0.5vw, 8px);
	min-width: clamp(100px, 15vw, 120px);
}

.menu-item {
	padding: clamp(8px, 1vw, 12px) clamp(12px, 1.5vw, 16px);
	font-size: clamp(14px, 2vw, 16px);
	color: #333;
	cursor: pointer;
	transition: background-color 0.2s ease;
}

.menu-item:hover {
	background-color: #f5f5f5;
}

/* 自定义输入 */
.custom-input-container {
	position: absolute;
	top: 100%;
	right: 0;
	background-color: white;
	border: clamp(1px, 0.2vw, 2px) solid #ccc;
	border-radius: clamp(4px, 0.5vw, 8px);
	box-shadow: 0 clamp(2px, 0.3vw, 4px) clamp(8px, 1vw, 12px) rgba(0, 0, 0, 0.1);
	z-index: 1000;
	margin-top: clamp(4px, 0.5vw, 8px);
	padding: clamp(8px, 1vw, 12px);
	min-width: clamp(150px, 20vw, 180px);
}

.custom-input {
	width: 100%;
	padding: clamp(8px, 1vw, 12px);
	border: clamp(1px, 0.2vw, 2px) solid #ccc;
	border-radius: clamp(4px, 0.5vw, 6px);
	font-size: clamp(14px, 2vw, 16px);
	margin-bottom: clamp(8px, 1vw, 12px);
}

.custom-buttons {
	display: flex;
	justify-content: space-between;
}

.custom-btn {
	flex: 1;
	padding: clamp(6px, 0.8vw, 10px);
	text-align: center;
	font-size: clamp(14px, 2vw, 16px);
	border-radius: clamp(4px, 0.5vw, 6px);
	cursor: pointer;
	transition: all 0.2s ease;
}

.custom-btn:not(.cancel) {
	background-color: #4CAF50;
	color: white;
	margin-right: clamp(8px, 1vw, 12px);
}

.custom-btn.cancel {
	background-color: #f0f0f0;
	color: #666;
}

/* 结果显示 */
.result-display {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%) scale(0) rotate(-10deg);
	font-size: clamp(80px, 20vw, 160px);
	font-weight: bold;
	color: #FF5722;
	text-shadow: 
		-2px -2px 0 #000,
		2px -2px 0 #000,
		-2px 2px 0 #000,
		2px 2px 0 #000;
	z-index: 9999;
	opacity: 0;
	transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.result-display.show {
	transform: translate(-50%, -50%) scale(1) rotate(0deg);
	opacity: 1;
}

.result-display.hide {
	opacity: 0;
	transform: translate(-50%, -50%) scale(0.8) rotate(5deg);
	transition: all 0.4s ease-out;
}
</style>
