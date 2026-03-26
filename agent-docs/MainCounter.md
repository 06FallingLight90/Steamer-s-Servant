# MainCounter 组件说明

## 组件概述
MainCounter 是万智牌计数器应用的主计数器组件，负责显示和操作玩家的生命值。

## 功能特性

### 核心功能
- **生命值显示**：显示当前生命值（默认40）
- **旋转适配**：支持4种旋转模式（normal、rotate90、rotate270、flip）
- **颜色定制**：可自定义主色调
- **长按加速**：长按可快速增减生命值
- **动画效果**：数字变化时显示浮动动画
- **附加计数器**：集成左右两个附加计数器，支持独立样式定制

### 交互方式
- **短按**：点击上半区域加1，点击下半区域减1
- **长按**：长按500ms后开始快速增减（+10/-10）

## 组件参数

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| rotation | String | "normal" | 旋转模式：normal/rotate90/rotate270/flip |
| mainColor | String | "aliceblue" | 主色调（CSS颜色值） |

## 使用示例

```vue
<template>
  <MainCounter 
    rotation="rotate90" 
    mainColor="mistyrose"
  />
</template>

<script>
import MainCounter from '@/components/MainCounter.vue'

export default {
  components: {
    MainCounter
  }
}
</script>
```

### 附加计数器集成

MainCounter 自动集成了两个附加计数器，分别位于左右两侧：

```vue
<!-- MainCounter 内部结构 -->
<ExtraCounter 
  logo="/static/planeswalker.png" 
  initialValue="0" 
  class="left"
  :style="extraCounterStyle"
/>

<ExtraCounter 
  logo="/static/poison.png" 
  initialValue="0" 
  class="right"
  :style="extraCounterStyle"
/>
```

## 实现细节

### 布局原理
- **自适应正方形**：组件始终以正方形显示，适应父容器长边
- **旋转中心**：通过CSS transform实现完美中心旋转
- **层级管理**：点击区域在底层，数字显示在上层

### 技术实现
- **响应式尺寸**：使用 `uni.createSelectorQuery()` 获取容器尺寸
- **事件处理**：仅使用触摸事件（@touchstart/@touchend），优化移动端体验
- **动画系统**：独立的动画队列管理
- **旋转同步**：附加计数器与主计数器保持旋转同步
- **深度选择器**：使用 `::v-deep` 穿透样式作用域，实现不同旋转状态的样式定制
- **显示修复**：使用空值合并运算符 `??` 确保生命值为0时正确显示

### 样式特点
- **CSS变量**：通过内联样式传递颜色
- **flex布局**：确保内容居中显示
- **z-index层级**：合理的元素堆叠顺序

## 文件结构
```
MainCounter.vue
├── template
│   ├── 外层容器（负责裁剪）
│   ├── 旋转层（负责旋转和尺寸）
│   ├── 内容层（数字显示）
│   ├── 点击区域（上下两个）
│   └── 动画层（浮动数字）
├── script
│   ├── 数据响应
│   ├── 计算属性
│   ├── 生命周期
│   └── 交互方法
└── style
    ├── 基础样式
    ├── 动画样式
    └── 响应式适配
```

## 兼容性说明
- 支持 uni-app 多端运行（H5、小程序等）
- 使用条件编译处理平台差异
- 遵循 uni-app 组件规范