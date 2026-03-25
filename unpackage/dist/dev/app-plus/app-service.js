if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const _imports_0 = "/static/plus.png";
  const _imports_1 = "/static/minus.png";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$4 = {
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
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "extra-counter",
        style: vue.normalizeStyle($options.containerStyle)
      },
      [
        vue.createElementVNode("view", { class: "counter-content" }, [
          vue.createElementVNode(
            "view",
            {
              class: "btn add-btn",
              onClick: _cache[0] || (_cache[0] = (...args) => $options.increment && $options.increment(...args)),
              onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.startIncrement && $options.startIncrement(...args)),
              onTouchend: _cache[2] || (_cache[2] = (...args) => $options.stopIncrement && $options.stopIncrement(...args))
            },
            [
              vue.createElementVNode("image", {
                src: _imports_0,
                class: "icon add-icon"
              })
            ],
            32
            /* NEED_HYDRATION */
          ),
          vue.createElementVNode(
            "view",
            {
              class: "number-display",
              style: vue.normalizeStyle({ backgroundImage: $props.logo ? `url(${$props.logo})` : "none" })
            },
            [
              vue.createElementVNode(
                "text",
                { class: "number" },
                vue.toDisplayString($data.count),
                1
                /* TEXT */
              )
            ],
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "view",
            {
              class: "btn subtract-btn",
              onClick: _cache[3] || (_cache[3] = (...args) => $options.decrement && $options.decrement(...args)),
              onTouchstart: _cache[4] || (_cache[4] = (...args) => $options.startDecrement && $options.startDecrement(...args)),
              onTouchend: _cache[5] || (_cache[5] = (...args) => $options.stopDecrement && $options.stopDecrement(...args))
            },
            [
              vue.createElementVNode("image", {
                src: _imports_1,
                class: "icon subtract-icon"
              })
            ],
            32
            /* NEED_HYDRATION */
          )
        ])
      ],
      4
      /* STYLE */
    );
  }
  const ExtraCounter = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-268f96f7"], ["__file", "E:/Documents/doc/各类文件/Uni-appProject/HealthCounter/components/ExtraCounter.vue"]]);
  const _sfc_main$3 = {
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
        const query = uni.createSelectorQuery().in(this);
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
          }, 600);
        }, 1e3);
      },
      // 取消长按
      cancelLongPress(type) {
        formatAppLog("log", "at components/MainCounter.vue:191", this.longPressTimer);
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
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_ExtraCounter = vue.resolveComponent("ExtraCounter");
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "container",
        ref: "containerRef"
      },
      [
        vue.createVNode(_component_ExtraCounter, {
          logo: "/static/planeswalker.png",
          initialValue: "0",
          position: "left",
          rotation: $props.rotation
        }, null, 8, ["rotation"]),
        vue.createVNode(_component_ExtraCounter, {
          logo: "/static/poison.png",
          initialValue: "0",
          position: "right",
          rotation: $props.rotation
        }, null, 8, ["rotation"]),
        vue.createElementVNode(
          "view",
          {
            class: "rotator",
            style: vue.normalizeStyle($options.rotatorStyle)
          },
          [
            vue.createElementVNode("view", { class: "content" }, [
              vue.createElementVNode(
                "text",
                { class: "health" },
                vue.toDisplayString($data.health ?? 40),
                1
                /* TEXT */
              ),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.animations, (item) => {
                  return vue.openBlock(), vue.createElementBlock(
                    "view",
                    {
                      key: item.id,
                      class: vue.normalizeClass(["number-animation", item.type]),
                      style: vue.normalizeStyle({ top: item.top + "%", left: item.left + "%" })
                    },
                    [
                      vue.createElementVNode(
                        "text",
                        null,
                        vue.toDisplayString(item.value),
                        1
                        /* TEXT */
                      )
                    ],
                    6
                    /* CLASS, STYLE */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            vue.createElementVNode(
              "view",
              {
                class: "click-area top-area",
                style: vue.normalizeStyle({ backgroundColor: $props.mainColor }),
                onTouchstart: _cache[0] || (_cache[0] = (...args) => $options.startAddLongPress && $options.startAddLongPress(...args)),
                onTouchend: _cache[1] || (_cache[1] = (...args) => $options.cancelAddLongPress && $options.cancelAddLongPress(...args)),
                onTouchcancel: _cache[2] || (_cache[2] = (...args) => $options.cancelAddLongPress && $options.cancelAddLongPress(...args))
              },
              null,
              36
              /* STYLE, NEED_HYDRATION */
            ),
            vue.createElementVNode(
              "view",
              {
                class: "click-area bottom-area",
                style: vue.normalizeStyle({ backgroundColor: $props.mainColor }),
                onTouchstart: _cache[3] || (_cache[3] = (...args) => $options.startSubtractLongPress && $options.startSubtractLongPress(...args)),
                onTouchend: _cache[4] || (_cache[4] = (...args) => $options.cancelSubtractLongPress && $options.cancelSubtractLongPress(...args)),
                onTouchcancel: _cache[5] || (_cache[5] = (...args) => $options.cancelSubtractLongPress && $options.cancelSubtractLongPress(...args))
              },
              null,
              36
              /* STYLE, NEED_HYDRATION */
            )
          ],
          4
          /* STYLE */
        )
      ],
      512
      /* NEED_PATCH */
    );
  }
  const MainCounter = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-3c192250"], ["__file", "E:/Documents/doc/各类文件/Uni-appProject/HealthCounter/components/MainCounter.vue"]]);
  const _sfc_main$2 = {
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
            const query = uni.createSelectorQuery().in(this);
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
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "dice-container" }, [
      vue.createElementVNode("view", {
        class: "dice-button",
        onClick: _cache[0] || (_cache[0] = (...args) => $options.toggleDiceSelect && $options.toggleDiceSelect(...args))
      }, [
        vue.createElementVNode("text", { class: "dice-icon" }, "🎲")
      ]),
      $data.showSelectMenu ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "dice-select-menu"
      }, [
        vue.createElementVNode("view", {
          class: "menu-item",
          onClick: _cache[1] || (_cache[1] = ($event) => $options.rollDice(4))
        }, "d4"),
        vue.createElementVNode("view", {
          class: "menu-item",
          onClick: _cache[2] || (_cache[2] = ($event) => $options.rollDice(6))
        }, "d6"),
        vue.createElementVNode("view", {
          class: "menu-item",
          onClick: _cache[3] || (_cache[3] = ($event) => $options.rollDice(20))
        }, "d20"),
        vue.createElementVNode("view", {
          class: "menu-item",
          onClick: _cache[4] || (_cache[4] = ($event) => $data.showCustomInput = true)
        }, "自定义")
      ])) : vue.createCommentVNode("v-if", true),
      $data.showCustomInput ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "custom-input-container"
      }, [
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.customSides = $event),
            type: "number",
            placeholder: "输入面数",
            class: "custom-input",
            onConfirm: _cache[6] || (_cache[6] = (...args) => $options.rollCustomDice && $options.rollCustomDice(...args))
          },
          null,
          544
          /* NEED_HYDRATION, NEED_PATCH */
        ), [
          [vue.vModelText, $data.customSides]
        ]),
        vue.createElementVNode("view", { class: "custom-buttons" }, [
          vue.createElementVNode("view", {
            class: "custom-btn",
            onClick: _cache[7] || (_cache[7] = (...args) => $options.rollCustomDice && $options.rollCustomDice(...args))
          }, "确定"),
          vue.createElementVNode("view", {
            class: "custom-btn cancel",
            onClick: _cache[8] || (_cache[8] = ($event) => $data.showCustomInput = false)
          }, "取消")
        ])
      ])) : vue.createCommentVNode("v-if", true),
      vue.withDirectives(vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["result-display", { "show": $data.showResultAnimation, "hide": $data.showResultHide }])
        },
        [
          vue.createElementVNode(
            "text",
            { class: "result-number" },
            vue.toDisplayString($data.diceResult),
            1
            /* TEXT */
          )
        ],
        2
        /* CLASS */
      ), [
        [vue.vShow, $data.showResult]
      ])
    ]);
  }
  const DiceRoller = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-0b7b4e9c"], ["__file", "E:/Documents/doc/各类文件/Uni-appProject/HealthCounter/components/DiceRoller.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {
        title: "Hello"
      };
    },
    onLoad() {
    },
    methods: {
      confirmRefresh() {
        uni.showModal({
          title: "确认刷新",
          content: "确定要刷新页面吗？",
          success: (res) => {
            if (res.confirm)
              ;
          }
        });
      }
    },
    components: {
      MainCounter,
      DiceRoller
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_DiceRoller = vue.resolveComponent("DiceRoller");
    const _component_MainCounter = vue.resolveComponent("MainCounter");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("button", {
        class: "refresh-btn",
        onClick: _cache[0] || (_cache[0] = (...args) => $options.confirmRefresh && $options.confirmRefresh(...args))
      }, " ⟳ "),
      vue.createElementVNode("view", { class: "dice-container" }, [
        vue.createVNode(_component_DiceRoller)
      ]),
      vue.createElementVNode("view", { class: "grid-container" }, [
        vue.createElementVNode("view", { class: "grid-item top-left" }, [
          vue.createVNode(_component_MainCounter, {
            rotation: "rotate90",
            mainColor: "mistyrose"
          })
        ]),
        vue.createElementVNode("view", { class: "grid-item top-right" }, [
          vue.createVNode(_component_MainCounter, {
            rotation: "rotate270",
            mainColor: "lightgoldenrodyellow"
          })
        ]),
        vue.createElementVNode("view", { class: "grid-item bottom-left" }, [
          vue.createVNode(_component_MainCounter, { rotation: "rotate90" })
        ]),
        vue.createElementVNode("view", { class: "grid-item bottom-right" }, [
          vue.createVNode(_component_MainCounter, {
            rotation: "rotate270",
            mainColor: "honeydew"
          })
        ])
      ])
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"], ["__file", "E:/Documents/doc/各类文件/Uni-appProject/HealthCounter/pages/index/index.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "E:/Documents/doc/各类文件/Uni-appProject/HealthCounter/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
