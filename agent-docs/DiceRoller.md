# DiceRoller 组件说明

## 组件概述
DiceRoller 是一个骰子投掷组件，提供快速选择和投掷不同类型骰子的功能。

## 功能特性

### 核心功能
- **骰子类型**：支持 d4、d6、d20 和自定义面数骰子
- **结果显示**：投掷后显示巨大的结果数字，3秒后自动消失
- **动画效果**：丝滑的弹出和淡出动画
- **交互优化**：点击骰子按钮可切换菜单显示/隐藏
- **响应式设计**：适配不同屏幕尺寸

### 交互方式
- **点击骰子按钮**：打开/关闭骰子选择菜单
- **选择骰子类型**：点击 d4/d6/d20 直接投掷
- **自定义骰子**：点击"自定义"输入面数
- **结果显示**：屏幕中央显示结果数字，带动画效果

## 组件参数
该组件无需外部参数，开箱即用。

## 使用示例

```vue
<template>
  <DiceRoller />
</template>

<script>
import DiceRoller from '@/components/DiceRoller.vue'

export default {
  components: {
    DiceRoller
  }
}
</script>
```

## 实现细节

### 布局设计
- **浮动按钮**：使用 `position: fixed` 浮动在页面上方
- **菜单定位**：选择菜单相对于按钮定位
- **结果显示**：使用 `position: fixed` 居中显示结果

### 交互逻辑
- **菜单切换**：点击骰子按钮切换菜单显示状态
- **骰子投掷**：根据选择的骰子类型生成随机结果
- **动画控制**：使用 CSS transition 和 class 切换实现动画
- **定时器管理**：使用 setTimeout 控制结果显示时间

### 动画效果
- **弹出动画**：使用 `cubic-bezier` 弹性缓动函数，带旋转效果
- **淡出动画**：平滑的缩放和透明度变化
- **按钮反馈**：点击时有缩放效果

## 文件结构
```
DiceRoller.vue
├── template
│   ├── 骰子按钮
│   ├── 骰子选择菜单
│   ├── 自定义输入界面
│   └── 结果显示区域
├── script
│   ├── 数据响应
│   ├── 菜单切换方法
│   ├── 骰子投掷方法
│   └── 动画控制
└── style
    ├── 按钮样式
    ├── 菜单样式
    ├── 输入界面样式
    └── 结果动画样式
```

## 技术实现

### 动画系统
```css
/* 弹出动画 */
.result-display {
  transform: translate(-50%, -50%) scale(0) rotate(-10deg);
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.result-display.show {
  transform: translate(-50%, -50%) scale(1) rotate(0deg);
}

/* 淡出动画 */
.result-display.hide {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.8) rotate(5deg);
  transition: all 0.4s ease-out;
}
```

### 随机数生成
```javascript
rollDice(sides) {
  this.diceResult = Math.floor(Math.random() * sides) + 1;
}
```

## 应用场景

### 游戏场景
1. **万智牌游戏**：投掷骰子决定先手、伤害计算等
2. **桌面角色扮演**：各种技能检定和属性测试
3. **卡牌游戏**：需要随机元素的游戏机制

### 用户体验
- **快捷操作**：一键打开菜单，快速选择骰子类型
- **视觉反馈**：动画效果提供清晰的操作反馈
- **简洁界面**：按钮占用空间小，不影响主界面

## 兼容性说明
- 支持 uni-app 多端运行（H5、小程序等）
- 使用标准的 `view`/`text` 组件
- 响应式设计适配不同屏幕尺寸
- 使用 CSS 动画，性能友好
