"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const _sfc_main = {
  name: "ExtraCounter",
  props: {
    // logo 图片路径
    logo: {
      type: String,
      default: ""
    },
    // 初始值
    initialValue: {
      type: Number,
      default: 0
    },
    // 位置：left 或 right
    position: {
      type: String,
      default: "left"
    },
    // 旋转状态
    rotation: {
      type: String,
      default: "normal"
    }
  },
  computed: {
    // 容器样式：定位和旋转
    containerStyle() {
      let style = {
        position: "absolute",
        zIndex: 5
      };
      if (this.rotation === "rotate90") {
        if (this.position === "left") {
          style.top = "clamp(8px, 18vw, 30%)";
          style.left = "clamp(10vw, 30vw, 30vw)";
        } else {
          style.top = "clamp(75%, 70vw, 75%)";
          style.left = "clamp(10vw, 30vw, 30vw)";
        }
        style.transform = "rotate(90deg)";
        style.transformOrigin = "center center";
      } else if (this.rotation === "rotate270") {
        if (this.position === "left") {
          style.top = "clamp(8px, 18vw, 20%)";
          style.right = "clamp(10vw, 28vw, 30vw)";
        } else {
          style.top = "clamp(75%, 70vw, 75%)";
          style.right = "clamp(10vw, 28vw, 30vw)";
        }
        style.transform = "rotate(270deg)";
        style.transformOrigin = "center center";
      } else {
        if (this.position === "left") {
          style.top = "clamp(8px, 1vw, 20%)";
          style.left = "clamp(10vw, 20vw, 100%)";
        } else {
          style.top = "clamp(75%, 70vw, 75%)";
          style.right = "clamp(10vw, 20vw, 30vw)";
        }
        if (this.rotation === "flip") {
          style.transform = "scaleX(-1)";
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
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: common_vendor.o((...args) => $options.increment && $options.increment(...args), "ee"),
    c: common_vendor.o((...args) => $options.startIncrement && $options.startIncrement(...args), "d0"),
    d: common_vendor.o((...args) => $options.stopIncrement && $options.stopIncrement(...args), "7b"),
    e: common_vendor.t($data.count),
    f: $props.logo ? `url(${$props.logo})` : "none",
    g: common_assets._imports_1,
    h: common_vendor.o((...args) => $options.decrement && $options.decrement(...args), "13"),
    i: common_vendor.o((...args) => $options.startDecrement && $options.startDecrement(...args), "8c"),
    j: common_vendor.o((...args) => $options.stopDecrement && $options.stopDecrement(...args), "c0"),
    k: common_vendor.s($options.containerStyle)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-268f96f7"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/ExtraCounter.js.map
