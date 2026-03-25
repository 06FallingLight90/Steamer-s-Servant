"use strict";
const common_vendor = require("../../common/vendor.js");
const MainCounter = () => "../../components/MainCounter.js";
const DiceRoller = () => "../../components/DiceRoller.js";
const _sfc_main = {
  data() {
    return {
      title: "Hello"
    };
  },
  onLoad() {
  },
  methods: {
    confirmRefresh() {
      common_vendor.index.showModal({
        title: "确认刷新",
        content: "确定要刷新页面吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.reLaunch({
              url: "/pages/index/index"
            });
          }
        }
      });
    }
  },
  components: {
    MainCounter,
    DiceRoller
  }
};
if (!Array) {
  const _component_DiceRoller = common_vendor.resolveComponent("DiceRoller");
  const _component_MainCounter = common_vendor.resolveComponent("MainCounter");
  (_component_DiceRoller + _component_MainCounter)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.confirmRefresh && $options.confirmRefresh(...args), "84"),
    b: common_vendor.p({
      rotation: "rotate90",
      mainColor: "mistyrose"
    }),
    c: common_vendor.p({
      rotation: "rotate270",
      mainColor: "lightgoldenrodyellow"
    }),
    d: common_vendor.p({
      rotation: "rotate90"
    }),
    e: common_vendor.p({
      rotation: "rotate270",
      mainColor: "honeydew"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
