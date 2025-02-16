# 第一课：Hello Web（你好，万维网）

:::info 教程说明
本课程主要针对 **macOS 系统**设计，Windows 用户理论上也可运行，但部分软件安装和操作可能不同。  
:::

## 课程目标
1. 理解网页应用核心组件
2. 认识前端（Frontend）与后端（Backend）的区别
3. 掌握基础开发工具链
4. 完成首个网页部署

## 一、网页应用组成

### 核心组件
```d2
direction: right
用户 -> 浏览器: 输入网址
浏览器 -> 服务器: HTTP 请求
服务器 -> 浏览器: HTTP 响应
浏览器 -> 用户: 显示网页
```

- **浏览器（Browser）**：Chrome/Safari 等渲染网页的工具
- **客户端（Client）**：用户设备（你的电脑/手机）
- **服务端（Server）**：存储网站数据的远程计算机
- **互联网（Internet）**：连接世界各地计算机的网络
- **HTTP**：浏览器与服务器通信的协议（规则）

## 二、网页开发分类

- **前端（Frontend）**：开发用户界面和交互（图文、按钮），代码运行在**浏览器**（Browser）中，常用语言如 HTML、CSS、JavaScript。
- **后端（Backend）**：开发服务端逻辑（用户数据存储），代码运行在**服务器**（Server）中，常用语言如 Python、JavaScript。

```d2
direction: right
用户 -> 前端: 点击按钮
前端 -> 后端: 发送请求
后端 -> 前端: 返回数据
前端 -> 用户: 显示结果
```

## 三、开发工具配置

### 基础工具
1. **VS Code**：代码编辑器。[去官网下载](https://code.visualstudio.com/)
2. **终端（Terminal）**：通过命令行运行程序的工具。macOS 自带，按 `⌘ + 空格` 搜索使用
3. **Git**：代码版本控制工具。macOS 自带，使用终端运行 `git` 命令
```bash
# 首次使用需要安装 Xcode Command Line Tools
xcode-select --install
# 首次使用需要配置用户名和邮箱
git config --global user.name "你的用户名"
git config --global user.email "你的邮箱"
```
4. **GitHub 账号**：代码托管平台，也提供网页托管服务（Web hosting service）[GitHub Pages](https://pages.github.com/)。[去注册账号](https://github.com/)

### SSH 密钥配置
SSH（Secure Shell）是一种加密协议，用于安全连接远程服务器。配置 SSH 密钥后，可以免密码连接 GitHub 上传或下载代码。
```bash
# 生成密钥对（公钥+私钥），一路回车即可
ssh-keygen -t ed25519

# 查看公钥内容
cat ~/.ssh/id_ed25519.pub
```
将公钥上传到 GitHub：
1. 打开 [GitHub -> Settings -> SSH and GPG Keys -> New SSH Key](https://github.com/settings/ssh/new)
2. 粘贴公钥内容到 Key 输入框，点击 Add SSH Key 保存

:::warning 注意
私钥文件 `~/.ssh/id_ed25519` 相当于你的密码，不要泄露给他人。
:::

### AI 大模型（LLM）辅助编程

使用擅长编程的大模型可以快速生成代码，提高开发效率。例如 [Deepseek R1](https://chat.deepseek.com/)、 [Claude Sonnet 3.5](https://claude.ai/)、[ChatGPT o1/o3](https://chat.openai.com/)。
:::tip 提示
大模型编程能力进化迅速，擅长编程的模型在不断变化。可以在 [Aider LLM Leaderboards](https://aider.chat/docs/leaderboards/) 查看最新排名。
:::

## 四、实战作业

### 用 LLM 生成 HTML
示例提示词：
```
生成一个包含以下元素的 HTML 文件：
- 标题「我的第一个网页」
- 一个段落「这是一个简单的网页」
- 一个按钮「点击我」，点击后弹出提示框「你好，世界！」
```
示例代码：
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>我的第一个网页</title>
</head>
<body>
    <h1>我的第一个网页</h1>
    <p>这是一个简单的网页</p>
    <button onclick="alert('你好，世界！')">点击我</button>
</body>
</html>
```

### 项目创建流程
1. 新建项目 `hello-web`
```bash
# 在终端中运行以下命令，创建文件夹
mkdir hello-web
# 创建 index.html 文件
touch hello-web/index.html
```
2. 在 VS Code 中打开文件夹 hello-web，打开 `index.html` 文件并粘贴生成的代码，按 `⌘ + S` 保存
3. 保存文件后通过浏览器打开预览
```bash
# 在浏览器中打开文件
open hello-web/index.html
```

:::tip 提示
通过 `open hello-web/index.html` 命令在浏览器中打开的网页完整地址是 `file://文件夹地址/index.html` ，`file://` 开头表示这个网页是本地文件，其它人的电脑/手机无法访问，我们需要把代码部署到服务器上才能分享给他人。
:::

### 部署到 GitHub Pages

GitHub Pages 是 GitHub 提供的免费静态网页托管服务（免费的服务器），我们可以把网页文件上传到 GitHub 仓库，通过 `https://用户名.github.io/仓库名` 访问网页。

1. 登录 [GitHub](https:://github.com/)，点击右上角 `+` 号 -> `New repository`
2. Repository name 填写 `hello-web`，点击 `Create repository`
3. 连接本地项目与 GitHub 仓库
```bash
# 初始化 Git 仓库
cd hello-web
git init
git add .
git commit -m "First commit"

# 关联 GitHub 仓库，假设你的 GitHub 用户名是 zhangsan，仓库名是 hello-web
git remote add origin git@github.com:zhangsan/hello-web.git
git push -u origin main
```
4. 在 GitHub 里找到 hello-web 仓库，点击 Settings -> Pages 开启部署：
   1. Source 选择 "Deploy from a branch"
   2. Branch 选择 main 分支，选择 `/ (root)` 目录
   3. 点击 Save
   4. 等待几分钟，访问 `https://用户名.github.io/仓库名` 查看部署结果，假设你的用户名是 zhangsan，访问地址是 `https://zhangsan.github.io/hello-web`

:::tip 什么是 URL？
URL 是统一资源定位符（Uniform Resource Locator）的缩写，是互联网上资源的地址。URL 由多个部分组成，例如 `https://zhangsan.github.io/hello-web`：
- `https://`：网页协议，表示这是一个加密的 HTTP 请求
- `zhangsan.github.io`：域名，指向 GitHub Pages 服务器
- `hello-web`：路径，指向 zhangsan 用户下的 hello-web 仓库
- `index.html`：文件名，省略时默认访问 index.html 文件
:::

## 五、课后练习
1. 用 LLM 生成一个包含链接的网页，并部署到 GitHub Pages
2. 简单介绍浏览器和服务器的作用，前端和后端的区别
3. 你的电脑可以同时作为客户端和服务端吗？为什么？
4. HTML 文件名为什么通常是 `index.html`？可不可以改成其它名字？

<details>
<summary>参考答案</summary>
<ol>
<li>参考章节 “四、实战作业”</li>
<li>浏览器负责渲染网页，显示给用户；服务器存储网站数据，提供给用户访问；前端开发用户界面和交互，后端开发服务端逻辑。</li>
<li>可以，通过安装 Web 服务器软件如 Apache、Nginx，将电脑变成服务器，提供网页服务。</li>
<li>可以，但默认访问文件名是 `index.html`，如果改成其它名字，需要在 URL 中指定文件名。</li>
</ol>
</details>