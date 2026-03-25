"use strict";
const common_vendor = require("../common/vendor.js");
const ExtraCounter = () => "./ExtraCounter.js";
const _sfc_main = {
  name: "MainCounter",
  props: {
    rotation: { type: String, default: "normal" },
    mainColor: { type: String, default: "aliceblue" }
  },
  data() {
    return {
      health: 40,
      squareSize: 0,
      longPressTimer: null,
      // 长按定时器
      longPressInterval: null,
      // 长按加速间隔
      isLongPressing: false,
      // 是否正在长按
      //血量变化时跳出数字
      animations: [],
      // 动画列表
      animationId: 0
      // 动画ID计数器
    };
  },
  components: {
    ExtraCounter
  },
  computed: {
    rotatorStyle() {
      const center = "translate(-50%, -50%)";
      let transform = center;
      let w = "100%", h = "100%";
      if (this.rotation === "rotate90") {
        transform = `${center} rotate(90deg)`;
        w = h = this.squareSize + "px";
      } else if (this.rotation === "rotate270") {
        transform = `${center} rotate(270deg)`;
        w = h = this.squareSize + "px";
      } else if (this.rotation === "flip") {
        transform = `${center} scaleX(-1)`;
      }
      return { width: w, height: h, transform };
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.updateSize();
    });
  },
  beforeUnmount() {
  },
  methods: {
    updateSize() {
      const query = common_vendor.index.createSelectorQuery().in(this);
      query.select(".container").boundingClientRect((rect) => {
        if (rect) {
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
      this.longPressTimer = setTimeout(() => {
        this.isLongPressing = true;
        if (type === "add") {
          this.health += 10;
          this.showAnimation("+10", "add");
        } else {
          this.health -= 10;
          this.showAnimation("-10", "subtract");
        }
        this.longPressInterval = setInterval(() => {
          if (type === "add") {
            this.health += 10;
            this.showAnimation("+10", "add");
          } else {
            this.health -= 10;
            this.showAnimation("-10", "subtract");
          }
        }, 1e3);
      }, 1e3);
    },
    // 取消长按
    cancelLongPress(type) {
      common_vendor.index.__f__("log", "at components/MainCounter.vue:197", this.longPressTimer);
      if (this.longPressTimer && !this.isLongPressing) {
        clearTimeout(this.longPressTimer);
        if (type == "add") {
          this.health++;
          this.showAnimation("+1", "add");
        } else {
          this.health--;
          this.showAnimation("-1", "subtract");
        }
      }
      this.clearAllTimers();
      this.isLongPressing = false;
    },
    // 显示数字动画
    showAnimation(value, type) {
      const id = this.animationId++;
      const left = 50 + (Math.random() - 0.5) * 40;
      const top = 50 + (Math.random() - 0.5) * 30;
      this.animations.push({
        id,
        value,
        type,
        top,
        left
      });
      setTimeout(() => {
        const index = this.animations.findIndex((item) => item.id === id);
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
if (!Array) {
  const _component_ExtraCounter = common_vendor.resolveComponent("ExtraCounter");
  _component_ExtraCounter();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      logo: "/static/planeswalker.png",
      initialValue: "0",
      position: "left",
      rotation: $props.rotation
    }),
    b: common_vendor.p({
      logo: "/static/poison.png",
      initialValue: "0",
      position: "right",
      rotation: $props.rotation
    }),
    c: common_vendor.t($data.health || 40),
    d: common_vendor.f($data.animations, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.value),
        b: item.id,
        c: common_vendor.n(item.type),
        d: item.top + "%",
        e: item.left + "%"
      };
    }),
    e: $props.mainColor,
    f: common_vendor.o((...args) => $options.startAddLongPress && $options.startAddLongPress(...args), "1b"),
    g: common_vendor.o((...args) => $options.cancelAddLongPress && $options.cancelAddLongPress(...args), "4c"),
    h: common_vendor.o((...args) => $options.cancelAddLongPress && $options.cancelAddLongPress(...args), "6d"),
    i: common_vendor.o((...args) => $options.startAddLongPress && $options.startAddLongPress(...args), "55"),
    j: common_vendor.o((...args) => $options.cancelAddLongPress && $options.cancelAddLongPress(...args), "43"),
    k: common_vendor.o((...args) => $options.cancelAddLongPress && $options.cancelAddLongPress(...args), "1e"),
    l: $props.mainColor,
    m: common_vendor.o((...args) => $options.startSubtractLongPress && $options.startSubtractLongPress(...args), "5d"),
    n: common_vendor.o((...args) => $options.cancelSubtractLongPress && $options.cancelSubtractLongPress(...args), "94"),
    o: common_vendor.o((...args) => $options.cancelSubtractLongPress && $options.cancelSubtractLongPress(...args), "92"),
    p: common_vendor.o((...args) => $options.startSubtractLongPress && $options.startSubtractLongPress(...args), "d8"),
    q: common_vendor.o((...args) => $options.cancelSubtractLongPress && $options.cancelSubtractLongPress(...args), "b9"),
    r: common_vendor.o((...args) => $options.cancelSubtractLongPress && $options.cancelSubtractLongPress(...args), "d2"),
    s: common_vendor.s($options.rotatorStyle)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3c192250"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/MainCounter.js.map
