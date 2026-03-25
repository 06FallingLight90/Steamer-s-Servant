"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
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
      this.showCustomInput = false;
    },
    // 投掷指定面数的骰子
    rollDice(sides) {
      this.showSelectMenu = false;
      this.showCustomInput = false;
      this.diceResult = Math.floor(Math.random() * sides) + 1;
      this.showResult = true;
      this.$nextTick(() => {
        setTimeout(() => {
          const query = common_vendor.index.createSelectorQuery().in(this);
          query.select(".result-display").boundingClientRect((rect) => {
            if (rect) {
              this.showResultAnimation = true;
            }
          }).exec();
        }, 10);
      });
      setTimeout(() => {
        this.showResultAnimation = false;
        this.showResultHide = true;
        setTimeout(() => {
          this.showResult = false;
          this.showResultHide = false;
        }, 400);
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.toggleDiceSelect && $options.toggleDiceSelect(...args), "cc"),
    b: $data.showSelectMenu
  }, $data.showSelectMenu ? {
    c: common_vendor.o(($event) => $options.rollDice(4), "88"),
    d: common_vendor.o(($event) => $options.rollDice(6), "b0"),
    e: common_vendor.o(($event) => $options.rollDice(20), "41"),
    f: common_vendor.o(($event) => $data.showCustomInput = true, "b6")
  } : {}, {
    g: $data.showCustomInput
  }, $data.showCustomInput ? {
    h: common_vendor.o((...args) => $options.rollCustomDice && $options.rollCustomDice(...args), "07"),
    i: $data.customSides,
    j: common_vendor.o(($event) => $data.customSides = $event.detail.value, "cb"),
    k: common_vendor.o((...args) => $options.rollCustomDice && $options.rollCustomDice(...args), "a8"),
    l: common_vendor.o(($event) => $data.showCustomInput = false, "e9")
  } : {}, {
    m: common_vendor.t($data.diceResult),
    n: $data.showResult,
    o: $data.showResultAnimation ? 1 : "",
    p: $data.showResultHide ? 1 : ""
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0b7b4e9c"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/DiceRoller.js.map
