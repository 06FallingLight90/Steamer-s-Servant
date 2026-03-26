# ExtraCounter 组件说明

## 组件概述
ExtraCounter 是主计数器的附加计数器，用于记录指挥官伤害、中毒指示物等额外信息。

## 功能特性

### 核心功能
- **数值记录**：记录附加数值（默认0）
- **logo背景**：支持自定义logo作为数字区域背景图
- **垂直布局**：`+`、数字、`-` 垂直排列
- **长按加速**：支持长按连续增减
- **位置定位**：支持左/右定位样式
- **响应式设计**：使用 `clamp()` 和 `vw` 单位实现全尺寸适配
- **文字描边**：数字添加黑色描边，确保在复杂背景下清晰可见

### 交互方式
- **短按**：点击 `+` 加1，点击 `-` 减1
- **长按**：长按500ms后开始快速增减（每200ms增减1次）

## 组件参数

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| logo | String | "" | logo图片路径（可选） |
| initialValue | Number | 0 | 初始数值 |
| position | String | "" | 位置：left/right |
| rotation | String | "" | 旋转模式：normal/rotate90/rotate270/flip |

## 使用示例

```vue
<template>
  <!-- 左侧附加计数器（指挥官伤害） -->
  <ExtraCounter 
    logo="/static/commander.png" 
    initialValue="0" 
    position="left"
    :rotation="rotation"
  />
  
  <!-- 右侧附加计数器（中毒指示物） -->
  <ExtraCounter 
    logo="/static/poison.png" 
    initialValue="0" 
    position="right"
    :rotation="rotation"
  />
</template>

<script>
import ExtraCounter from '@/components/ExtraCounter.vue'

export default {
  components: {
    ExtraCounter
  }
}
</script>
```

## 实现细节

### 布局设计
- **绝对定位**：使用 `position: absolute` 定位在主计数器上层
- **垂直排列**：flex布局实现 `+`、数字、`-` 垂直居中
- **响应式尺寸**：使用 `clamp()` 函数结合 `vw` 单位实现自适应
- **背景样式**：logo背景使用 `background-size: cover` 覆盖整个数字区域
- **动态样式**：根据 `position` 和 `rotation` 参数动态计算位置和旋转样式

### 交互逻辑
- **事件绑定**：同时支持点击和触摸事件
- **长按检测**：500ms延迟后进入长按模式
- **连续增减**：长按时每200ms自动增减
- **状态管理**：`isLongPressing` 状态防止重复触发

### 样式特点
- **半透明背景**：白色90%透明度，不影响主计数器显示
- **圆角边框**：10px圆角，视觉友好
- **阴影效果**：轻微阴影增强层次感
- **按钮反馈**：点击时有缩放和颜色变化

## 文件结构
```
ExtraCounter.vue
├── template
│   ├── 外层容器（背景和定位）
│   ├── 内容容器（垂直布局）
│   ├── 加号按钮
│   ├── 数字显示
│   └── 减号按钮
├── script
│   ├── 组件参数
│   ├── 数据响应
│   ├── 交互方法
│   └── 生命周期
└── style
    ├── 基础样式
    ├── 按钮样式
    ├── 数字样式
    └── 定位样式
```

## 应用场景

### 万智牌游戏场景
1. **指挥官伤害**：记录对特定玩家的指挥官伤害
2. **中毒指示物**：记录中毒计数
3. **能量指示物**：记录能量值
4. **经验指示物**：记录经验值

### 样式定制
- **logo定制**：通过 `logo` 参数传入自定义图片
- **位置调整**：使用 `left`/`right` 类名控制位置
- **数值范围**：支持正负数值显示

## 兼容性说明
- 支持 uni-app 多端运行
- 使用标准的 `view`/`text` 组件
- 响应式字体大小适配不同屏幕