# 第二课：前端基础 - HTML & CSS

## 课程目标
1. 理解 HTML 和 CSS 的核心作用
2. 掌握常用 HTML 标签和语义化（Semantic HTML）
3. 掌握 CSS 核心概念与响应式设计（Responsive Design）
4. 完成 GitHub 仓库页面的模仿练习

## 一、HTML：网页的骨架

### 1.1 什么是 HTML？
- **超文本标记语言**（HyperText Markup Language）
- 定义网页**内容结构**（文字、图片、链接）
- 通过**标签**（Tag）描述内容，有时也会称为**元素**（Element），如 `<h1>我是标题</h1>`，中的 `h1` 就是标签/元素，意思是标题（Heading 1）

下面是一个简单的 HTML 文档结构：
```html
<!DOCTYPE html> <!-- 文档类型声明 -->
<html lang="zh-CN"> <!-- 根元素 -->
<head> <!-- 文档头部 -->
  <meta charset="UTF-8"> <!-- 元数据 -->
  <title>我的第一个网页</title> <!-- 网页标题 -->
</head>
<body> <!-- 文档主体 -->
  <h1>我的第一个网页</h1> <!-- 标题（Heading 1） -->
  <p>这是一个简单的网页</p> <!-- 段落（paragraph） -->
</body>
</html>
```

HTML 的语法特点：
- 标签通常成对出现，有开始和结束标签，如 `<h1>...</h1>`
- 没有结束标签的标签称为**空元素**（Self-Closing Tag），如 `<meta charset="UTF-8">`
- 标签可以包含属性（Attributes），用来提供更多信息，通常是键值对（key-value pair），如 `lang="zh-CN"` 表示这个网页的语言是中文
- 标签可以嵌套，形成树状结构
- 标签不区分大小写，但推荐使用小写
- 注释使用 `<!-- 注释内容 -->`

### 1.2 常用 HTML 标签
| 类型         | 标签示例                     | 说明                   |
|--------------|------------------------------|------------------------|
| 基础结构     | `<html>`, `<head>`, `<body>` | 网页容器               |
| 内容容器     | `<div>`, `<span>`            | 通用容器               |
| 文本         | `<h1>-<h6>`, `<p>`, `<a>`    | 标题/段落/链接         |
| 语义化容器   | `<header>`, `<nav>`, `<main>` | 页面区域标识           |
| 列表         | `<ul>`, `<ol>`, `<li>`       | 无序/有序列表          |
| 表单         | `<form>`, `<input>`, `<button>` | 用户输入             |
| 多媒体       | `<img>`, `<video>`, `<audio>` | 媒体嵌入             |

[更多 HTML 标签](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)

:::tip 提示
- 不知道该用什么标签时，可以先用 `<div>`，也可以问 LLM，如：`我要展示一张图片，用什么 HTML 标签和属性？`
- `<div>` 可能是最常用的容器标签，通常用于布局（包裹一组元素添加样式）。
- `<input>` 在创建表单（Form）时很常用，如输入框、单选框、复选框等。通过 [`type`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#input_%E7%B1%BB%E5%9E%8B) 属性指定类型。
:::

### 1.3 常用 HTML 属性

HTML 标签可以包含属性（Attributes），用来提供更多信息或控制元素行为
- 大部分属性是以键值对（key-value pair）的形式出现，如 `class="content"`
- 也有一些属性是布尔属性（Boolean Attributes），只需要写属性名即可，如 `disabled`，表示元素已经被禁用

| 属性         | 示例                     | 说明                     |
|--------------|--------------------------|------------------------|
| `class`      | `<p class="content">`    | 元素类名                |
| `id`         | `<div id="main">`        | 元素唯一标识符           |
| `href`       | `<a href="https://example.com">` | 链接地址        |
| `src`        | `<img src="image.jpg">`  | 图片/媒体资源地址         |
| `style`      | `<h1 style="color: red;">` | 内联样式（inline style）|
| `disabled`   | `<button disabled>`      | 禁用按钮                 |

[更多 HTML 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes)

:::tip 提示
`class` 可能是最常用的属性，通常用于为元素添加样式或 JavaScript 操作。
- 同一个类名可以应用到多个元素，如 `<ul><li class="file">...</li><li class="file">...</li></ul>`  
- 一个元素也可以应用多个类名，用空格分隔，如 `<button class="btn primary">...</button>`  
:::

### 1.4 HTML 语义化

语义化（Semantic）指的是使用合适的标签描述内容。

```html
<!-- 非语义化 div（division 区块） -->
<div class="header">我是标题</div>

<!-- 语义化 -->
<header>我是标题</header>
```

为什么要使用语义化标签？
- 提升[可访问性](https://developer.mozilla.org/zh-CN/docs/Web/Accessibility)（Accessibility）：屏幕阅读器更好识别
- 利于[SEO](https://developer.mozilla.org/zh-CN/docs/Glossary/SEO)（Search Engine Optimization）：搜索引擎更好理解网页内容

[更多 HTML 语义化标签](https://developer.mozilla.org/zh-CN/docs/Glossary/Semantics)

## 二、CSS：网页的皮肤

### 2.1 什么是 CSS？
- **层叠样式表**（Cascading Style Sheets）
- 控制网页的**视觉表现**（颜色、布局、动画）

下面是一个简单的 HTML + CSS 示例，展示了通过 `<style>` 标签添加 CSS 样式到 HTML 中：
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>我的第一个网页</title>
  <style>
    h1 { color: red; }
    .content { font-size: 24px; }
  </style>
</head>
<body>
  <h1>我的第一个网页</h1>
  <p class="content">这是一个简单的<p>网页</p></p>
  <button style="background-color: blue;">点击我</button>
</body>
</html>
```

CSS 的语法特点：
- 通过选择器（Selectors）定位元素，再通过属性（Properties）设置样式，如 `h1 { color: red; }` 表示选择所有 `<h1>` 元素并设置颜色为红色
  - 样式由**属性**（Property）和**值**（Value）组成，如 `color: red;`
  - 多个样式之间用分号 `;` 分隔，如 `h1 { color: red; font-size: 24px; }`

### 2.2 CSS 核心概念

#### 选择器（Selectors）

选择器用于定位 HTML 元素，定位后可以为元素添加样式。常见的选择器有：

```css
/* 标签选择器 */
h1 { color: red; }

/* 类选择器，假设 HTML 中有 <h1 class="title">...</h1> */
.title { font-size: 2rem; }

/* ID 选择器，假设 HTML 中有 <div id="main-content">...</div> */
#main-content { padding: 20px; }

/* 子元素选择器 */
.container > p { color: blue; }

/* 后代选择器 */
.container p { color: blue; }
```

伪类选择器（Pseudo-classes）用于选择元素的特殊状态，如 `:hover`、`:active`、`:focus`、`:disabled` 等：

```css
/* 鼠标悬停时改变颜色 */
.button:hover { background-color: lightblue; }

/* 按钮禁用时变成灰色 */
.button:disabled { background-color: gray; }
```

[更多关于 CSS 选择器的解释](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Selectors)

#### 优先级（Specificity）

当多个选择器作用于同一元素时，CSS 样式的优先级从高到低：
1. 最高优先级 `!important`，如 `color: red !important;`，平常不建议使用，只有不能修改源码但必须要覆盖样式时使用
2. 行内样式（`style="..."`），如 `<h1 style="color: blue;">`
3. ID 选择器，如 `#main-content { color: green; }`
4. 类/伪类选择器，如 `.title { color: teal; }`，推荐日常使用
5. 标签选择器，如 `h1 { color: white; }`

[更多关于 CSS 优先级的解释](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity)

#### 盒模型（Box Model）

盒模型描述了 HTML 元素的尺寸和间距：
- `content`：内容区域
- `padding`：内边距，内容与边框之间的距离
- `border`：边框，包围内容和内边距
- `margin`：外边距，元素与元素之间的距离

:::info 盒模型有什么用？
- 控制元素的尺寸和间距
  - 默认情况下，`width` 和 `height` 设置的是内容区域的尺寸（不包含 padding 和 border）
  - 可以把 `box-sizing: border-box;` 应用到元素，使 `width` 和 `height` 包含 padding 和 border
:::

[更多关于盒模型的解释](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/The_box_model)

#### Flex 弹性布局

Flex 布局是一种弹性布局模型，可以轻松实现元素的水平、垂直对齐。

```css
.container {
  display: flex;           /* 使用弹性布局 */
  justify-content: center; /* 主轴居中对齐，主轴默认水平方向 */
  align-items: center;     /* 交叉轴居中对齐，交叉轴默认垂直方向 */
  gap: 20px;               /* 元素间距 */
}
```

[更多 Flex 布局用法](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)

#### CSS 变量（Variables）

CSS 变量用于定义和使用可重复的值，如颜色、字体大小等。

```css
:root {
  --primary-color: #0366d6; /* 定义变量 */
}

.button {
  background-color: var(--primary-color); /* 使用变量 */
}
```

#### 单位系统
- `px`：绝对像素
- `rem`：根元素（`<html>`）字体大小的倍数（推荐），根元素默认字体大小是 16px，所以默认 1rem = 16px
- `vw/vh`：视窗宽高的百分比

[更多关于 CSS 单位的解释](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Values_and_units)

#### 颜色

颜色可以使用关键字（`red`、`blue`）、十六进制（`#ff0000`）、RGB（`rgb(255, 0, 0)`）等表示。

```css
/* 以下三种写法效果相同： */
h1 { color: red; }
h1 { color: #ff0000; }
h1 { color: rgb(255, 0, 0); }
```

透明度可以使用 `rgba(255, 0, 0, 0.5)` 表示，最后一个参数是透明度（0-1）。

[更多关于 CSS 颜色的解释](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value)

### 2.3 响应式设计（Responsive Design）

响应式设计是一种设计理念，旨在使网页在不同设备上（手机、平板、电脑）有良好的显示效果。

#### 媒体查询（Media Query）

媒体查询用于根据设备特性（屏幕宽度、高度、方向、暗黑模式等）应用不同的样式。
```css
/* 当屏幕宽度小于 768px 时生效 */
@media (max-width: 768px) {
  .container { padding: 10px; }
}
```

[更多关于 Media Query 的解释](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Media_Queries/Using_media_queries)

### 2.4 常用 CSS 属性

| 属性         | 示例                     | 说明                     |
|--------------|--------------------------|------------------------|
| `color`      | `color: #ffffff;`            | 文本颜色                 |
| `font-size`  | `font-size: 24px;`       | 字体大小                 |
| `font-family`| `font-family: Arial;`    | 字体                     |
| `background-color` | `background-color: lightblue;` | 背景颜色      |
| `padding`    | `padding: 10px;`         | 内边距                   |
| `margin`     | `margin: 20px;`          | 外边距                   |
| `border`     | `border: 1px solid #ccc;`| 边框                     |
| `display`    | `display: flex;`         | 使用弹性布局              |
| ^            | `display: none;`         | 隐藏元素                 |


[MDN CSS 参考文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS)

:::tip 提示
CSS 属性非常多，全部记住并不现实，可以在需要时查阅文档，或者直接问 LLM，如 `我想让一组按钮（class="my-button"）水平排列，按钮之间有 20px 间距，水平方向向左对齐，垂直方向居中对齐，屏幕空间不够时自动换行，怎么写 CSS？`
:::

## 三、实战作业：模仿 GitHub 仓库页面

### 3.1 要求
1. 实现包含以下元素的页面：
   - **顶部导航栏**：包含 "Code"、"Issues" 等标签（Tab）
   - **文件列表**：至少两个可点击文件（可用 `<a>` 标签）
   - **About 卡片**：右侧固定宽度信息卡片
   - **搜索框**：顶部 "Go to file" 搜索框
   - **Code 按钮**：绿色按钮（可用 `<button>`）

2. **样式细节**：
   - 标签页鼠标悬停（Hover）背景色变化
   - 文件列表项悬停显示小手掌光标（cursor: pointer）
   - About 卡片使用边框（border）和阴影（box-shadow）
   - 屏幕宽度小于 768px 时隐藏 About 卡片

3. **只需要实现静态页面**，不需要实现交互功能，如点击标签页切换内容等。颜色大小等不需要完全一致，只需模仿即可。

### 3.2 实现提示

#### Chrome 开发者工具

- 使用 Chrome 浏览器的开发者工具 `⌘ + Option + I`（Mac）或 `F12`（Windows）查看页面结构和样式
- 可以在元素（Elements）面板查看 HTML 结构，样式（Styles）面板查看 CSS 样式
  - 选中元素后，右侧会显示元素的 CSS 样式和盒模型，颜色、字体等属性
  - 可以在样式中修改属性值，实时预览效果

#### 导航栏（使用 Flex）
```html
<nav class="tabnav">
  <a href="#" class="tabnav-tab">Code</a>
  <a href="#" class="tabnav-tab">Issues</a>
</nav>
```
```css
.tabnav {
  display: flex;
  border-bottom: 1px solid #e1e4e8;
}

.tabnav-tab {
  padding: 8px 16px;
  color: #586069;
}

.tabnav-tab:hover {
  background-color: #f6f8fa;
  cursor: pointer;
}
```

#### 图标（使用 Font Awesome）

图标可以在 [Font Awesome](https://fontawesome.com/v6/icons) 查找。如 [`code` 图标](https://fontawesome.com/search?q=code&o=r)：

```html
<!-- 在 head 引入图标库 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<!-- 使用图标 -->
<i class="fa-solid fa-code"></i>
```

#### 文件列表（列表布局）
```html
<div class="file-list">
  <a href="#" class="file-item">
    <i class="fa-regular fa-file"></i>
    README.md
  </a>
</div>
```

#### 响应式布局（Media Query）
```css
@media (max-width: 768px) {
  .about-card {
    display: none; /* 小屏幕隐藏右侧卡片 */
  }
}
```

### 3.3 进阶挑战（Bonus）

- 还原 GitHub 的暗色主题（Dark Mode）

#### 提示
1. 使用 CSS 变量定义颜色变量
2. 使用 `@media (prefers-color-scheme: dark) { ... }` 检测系统主题

[更多关于 Dark Mode 的实现](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/prefers-color-scheme)

## 四、课后练习
1. CSS 选择器 `.nav > li` 和 `.nav li` 有什么区别？
2. 如何实现元素水平垂直居中？
3. 假设有 CSS 代码 `body { font-size: 20px; }; h1 { font-size: 2rem; }`，`h1` 的字体大小是多少`px`？
4. 假设有 CSS 代码 `html { font-size: 20px; }; h1 { font-size: 2rem; }`，`h1` 的字体大小是多少`px`？

<details>
<summary>参考答案</summary>
<ol>
<li>&gt; 选择直接子元素（孙子元素不会被选中），空格选择所有后代元素（子孙元素）</li>
<li>父容器设置 display: flex; justify-content: center; align-items: center;</li>
<li>36px。rem 是相对于根元素的字体大小，根元素是 &lt;html&gt; 而不是 &lt;body&gt;，根元素默认字体大小是 16px，所以 2rem = 2 * 16px = 32px</li>
<li>40px。根元素字体大小被设置为 20px，所以 2rem = 2 * 20px = 40px</li>
</ol>
</details>
