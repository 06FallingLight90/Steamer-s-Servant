<!--主计数器-->
<template>
  <!-- 组件旋转与自适应窗口思路：让组件正方形适应grid-item的较长边，然后较短边溢出的部分裁剪掉 -->
  <view class="container" ref="containerRef">
    <!-- 左侧附加计数器 -->
    <ExtraCounter 
      logo="/static/planeswalker.png" 
      initialValue="0" 
      position="left"
      :rotation="rotation"
    />

    <!-- 右侧附加计数器 -->
    <ExtraCounter 
      logo="/static/poison.png" 
      initialValue="0" 
      position="right"
      :rotation="rotation"
    />
    <!-- 内层负责旋转和动态尺寸 ：style做到动态绑定组件css -->
    <view class="rotator" :style="rotatorStyle">
      <view class="content">
        <text class="health">{{ health || 40 }}</text>
        <!-- 数字变化动画 -->
        <view
          v-for="item in animations"
          :key="item.id"
          class="number-animation"
          :class="item.type"
          :style="{ top: item.top + '%', left: item.left + '%' }"
        >
          <text>{{ item.value }}</text>
        </view>
      </view>
      <view
        class="click-area top-area"
        :style="{ backgroundColor: mainColor }"
        @mousedown="startAddLongPress"
        @mouseup="cancelAddLongPress"
        @mouseleave="cancelAddLongPress"
        @touchstart="startAddLongPress"
        @touchend="cancelAddLongPress"
        @touchcancel="cancelAddLongPress"
      />
      <view
        class="click-area bottom-area"
        :style="{ backgroundColor: mainColor }"
        @mousedown="startSubtractLongPress"
        @mouseup="cancelSubtractLongPress"
        @mouseleave="cancelSubtractLongPress"
        @touchstart="startSubtractLongPress"
        @touchend="cancelSubtractLongPress"
        @touchcancel="cancelSubtractLongPress"
      />
    </view>
  </view>
</template>

<script>
import ExtraCounter from '@/components/ExtraCounter.vue'

export default {
  name: "MainCounter",
  props: {
    rotation: { type: String, default: "normal" },
    mainColor: { type: String, default: "aliceblue" }
  },
  data() {
    return {
      health: 40,
      squareSize: 0,
      longPressTimer: null, // 长按定时器
      longPressInterval: null, // 长按加速间隔
      isLongPressing: false, // 是否正在长按
      //血量变化时跳出数字
      animations: [], // 动画列表
      animationId: 0 // 动画ID计数器
    };
  },
  components: {
    ExtraCounter
  },
  computed: {
    rotatorStyle() {
      // 基础居中变换
      /* 原理：CSS 中 top: 50%; left: 50% 会将元素的左上角定位到父容器中心。
         作用：translate(-50%, -50%) 将元素向左和向上各移动自身宽高的一半。
         结果：无论元素多大（即使是动态计算的超大正方形），其几何中心永远与父容器中心重合。这是实现“完美居中裁剪”的前提。 */
      const center = "translate(-50%, -50%)";
      let transform = center;
      let w = "100%", h = "100%";
      /* 原理：CSS 的 transform 属性是从左到右依次执行的。
         执行顺序：
         translate(-50%, -50%)：先把自己拉回中心。
         rotate(90deg)：围绕当前的中心点进行旋转。
         关键点：因为先做了居中平移，旋转轴心就是父容器的中心。如果顺序反了（先旋转再平移），旋转轴心会是元素自己的左上角，导致元素飞出屏幕。 */
      if (this.rotation === "rotate90") {
        transform = `${center} rotate(90deg)`;
        w = h = this.squareSize + "px";
      } else if (this.rotation === "rotate270") {
        transform = `${center} rotate(270deg)`;
        w = h = this.squareSize + "px";
      } else if (this.rotation === "flip") {
        transform = `${center} scaleX(-1)`;
      }
      // 返回的结果会自动应用于对应标签的样式表
      return { width: w, height: h, transform };
    },


  },
  mounted() {
    this.$nextTick(() => {
      this.updateSize(); // 获取父标签长边供参考
    });
    // #ifdef H5
    window.addEventListener("resize", this.updateSize);
    // #endif
  },
  beforeUnmount() {
    // #ifdef H5
    window.removeEventListener("resize", this.updateSize);
    // #endif
  },
  methods: {
    updateSize() {
      // 使用 uni.createSelectorQuery 获取元素尺寸（兼容小程序和H5）
      const query = uni.createSelectorQuery().in(this);
      query.select('.container').boundingClientRect((rect) => {
        if (rect) {
          // 取长边作为正方形边长，实现"适应长边，裁剪短边"
          this.squareSize = Math.max(rect.width, rect.height);
        }
      }).exec();
    },
    /* 普通点击
    addHealth() {
      if (!this.isLongPressing) {
        // 如果不是长按触发的
        this.health++;
      }
    },
    subtractHealth() {
      if (!this.isLongPressing) {
        this.health--;
      }
    },*/
    // 长按加速加
    startAddLongPress() {
      this.startLongPress("add");
    },
    // 长按加速减
    startSubtractLongPress() {
      this.startLongPress("subtract");
    },
		// 取消长按加速加
		cancelAddLongPress() {
		  this.cancelLongPress("add");
		},
		// 取消长按加速减
		cancelSubtractLongPress() {
		  this.cancelLongPress("subtract");
		},
    // 通用长按开始
    startLongPress(type) {
      this.clearAllTimers();
      this.isLongPressing = false;

      // 1000ms 后判断为长按
      this.longPressTimer = setTimeout(() => {
        this.isLongPressing = true;

        // 先执行一次加减10
        if (type === "add") {
          this.health += 10;
          this.showAnimation('+10', 'add');
        } else {
          this.health -= 10;
          this.showAnimation('-10', 'subtract');
        }

        // 每隔1秒再加减10
        this.longPressInterval = setInterval(() => {
          if (type === "add") {
            this.health += 10;
            this.showAnimation('+10', 'add');
          } else {
            this.health -= 10;
            this.showAnimation('-10', 'subtract');
          }
        }, 1000);
      }, 1000);
    },
    // 取消长按
    cancelLongPress(type) {
			//若计时器未过以及未进入长按模式，则加减1
			console.log(this.longPressTimer);
			if(this.longPressTimer&&!this.isLongPressing){
				clearTimeout(this.longPressTimer);
				if(type=="add"){
					this.health++;
					this.showAnimation('+1', 'add');
				}
				else{
					this.health--;
					this.showAnimation('-1', 'subtract');
				}
			}
      this.clearAllTimers();
      this.isLongPressing = false;
    },
    // 显示数字动画
    showAnimation(value, type) {
      const id = this.animationId++;
      // 随机位置偏移 (-20% 到 20%)
      const left = 50 + (Math.random() - 0.5) * 40;
      const top = 50 + (Math.random() - 0.5) * 30;
      
      //向动画数组中添加一个动画元素
      this.animations.push({
        id,
        value,
        type,
        top,
        left
      });
      
      // 600ms 后移除动画
      setTimeout(() => {
        const index = this.animations.findIndex(item => item.id === id);
        if (index > -1) {
          this.animations.splice(index, 1);
        }
      }, 600);
    },
    // 清理所有定时器
    clearAllTimers() {
      if (this.longPressTimer) {
        clearTimeout(this.longPressTimer);
        this.longPressTimer = null;
      }
      if (this.longPressInterval) {
        clearInterval(this.longPressInterval);
        this.longPressInterval = null;
      }
    }
  }
};
</script>

<style scoped>
/* 重置 view 组件默认样式 */
view {
  box-sizing: border-box;
}

/* 外层：占满格子，负责裁剪 */
.container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden; /* 关键：裁剪溢出部分 */
  display: block;
}

/* 内层：绝对居中，动态尺寸，执行旋转 */
.rotator {
  position: absolute;
  top: 50%;
  left: 50%;
  /* transform 由 JS 动态控制 (包含 translate 和 rotate) */
  transform-origin: center center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  pointer-events: none;
}

.health {
  font-size: clamp(16px, 15vw, 64px);
  font-weight: bold;
  color: black;
  white-space: nowrap;
  display: inline-block;
  line-height: 1;
}

.click-area {
  position: absolute;
  left: 0;
  width: 100%;
  height: 50%;
  z-index: 1;
  cursor: pointer;
  /* background-color 由组件传入 */
}

.click-area:active {
  filter: brightness(0.8); /* 颜色加深 */
}

.top-area {
  top: 0;
}

.bottom-area {
  top: 50%;
}

/* 数字变化动画 */
.number-animation {
  position: absolute;
  font-size: clamp(1rem, 8vw, 2rem);
  font-weight: bold;
  pointer-events: none;
  animation: floatUp 0.6s ease-out forwards;
  z-index: 10;
}

.number-animation.add {
  color: #4CAF50;
}

.number-animation.subtract {
  color: #F44336;
}

@keyframes floatUp {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -150%) scale(1.2);
  }
}

</style>