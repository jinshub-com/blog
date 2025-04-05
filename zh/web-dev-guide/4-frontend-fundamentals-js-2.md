# 第四课：前端基础 - JavaScript 进阶

## 课程目标
1. 理解并应用 **Promise** 和 **async/await**
2. 使用 Fetch API 进行数据请求
3. 学习模块化开发（import/export）
4. 利用 Node.js + npm + Vite 创建和运行项目

## 1. 异步编程 (Asynchronous Programming) 和 非阻塞（Non-blocking）

在 JavaScript 中，异步编程是一个关键概念。通过异步编程，我们可以在未来的某个时间点运行特定的任务，并且不阻塞当下运行的其它任务。

详细介绍异步编程之前，我们先来认识下什么是同步（Synchronous）和阻塞（Blocking）。其实我们目前写的大部分代码都是同步阻塞的，同步阻塞代码按顺序从上到下执行，也就是说后面的代码等到前面的代码运行完后才会运行。比如下面的代码：

```javascript
console.log("来切一点点葱花 备用");
console.log("再来一点点蒜蓉 备用");
sleepFor(3); // 小睡 3 秒再切香菜，同步阻塞代码示例（切勿在实际项目中使用！）
console.log("要切一点点香菜");
console.log("再放几勺 盐");
console.log("面面准备好了");
function sleepFor(sleepDuration){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration * 1000){ /* Do nothing */ }
}
```

这段代码永远都是先切葱花再加蒜蓉再切香菜。如果加蒜蓉之后睡了 3 秒种，切香菜就得等 3 秒钟。大部分代码运行起来很快，我们感觉不到延迟，但不是所有代码都能瞬间完成的，比如向后端请求数据。

假如今天网特别卡，可能等了 10 秒后端才传回了数据，又假设所有代码都是同步阻塞的，等待期间就不能运行其它的 JavaScript 代码，网页就卡住了。为什么卡住了？想象下用户在这 10 秒期间点了某个按钮，会发现没有任何反应，因为所有代码都是同步阻塞的，点按钮要执行的代码要等前面网络请求的代码运行完才能执行。

因此我们需要异步编程来实现非阻塞，接下来我们用 **setTimeout** 方法来模拟一组复杂的异步任务。后面介绍 **Fetch API** 时会看到真实网络请求异步代码是怎么写的。

### setTimeout
- **核心定义**：延迟执行一段代码。
- **为什么重要**：实现定时任务，控制函数调用时机。
- **典型应用**： 显示倒计时，简单延迟任务
- **代码示例**：
    ```javascript
	// 模拟用户登录后需要依次执行的复杂异步操作
	// 可以复制这段代码到浏览器控制台（console）中运行
	console.log("[1/4] 模拟用户开始登录（假设2秒后成功）...");
	setTimeout(() => {
		console.log("[1/4] ✅ 模拟登录成功，后端返回了用户信息"); 
		const user = { name: "Tom", id: 123 };
		console.log(`[2/4] 模拟显示欢迎弹窗：欢迎回来，${user.name}！（假设用户盯着弹窗看了6秒）...`);
		setTimeout(() => {
			console.log("[3/4] 🖱️ 用户点击关闭按钮，但是手抖点到了广告，跳转到广告页面（假设3秒后跳转到广告页面） ...");
			setTimeout(() => {
				console.log("[4/4] 📊 用户开始看广告了，“下面有请尊贵的...”");
			}, 3000);
		}, 6000);
	}, 2000);
	console.log("这里浏览器会继续执行下面的其它代码，不会因为 setTimeout 内部的异步操作还没执行而卡住"); // [!code highlight]
    ```

在上面的代码中，我们调用 setTimeout 时传递的第一个参数是一个箭头函数，这个箭头函数就是一个**回调函数（callback）**（作为参数传递的函数，在未来特定时机执行）。第二个参数是一个数字，表示等待多少毫秒（1000 毫秒 = 1 秒）后执行回调函数。如果在浏览器里运行上诉代码，你会发现最后一行 console.log 代码会先于回调函数执行，因为这些传入 setTimeout 的回调函数是异步执行的，所以不会阻塞 setTimeout 后面其它代码执行。

回调函数是一种简单有效的同步阻塞问题解决方案，但当异步操作越来越多，且互相依赖时，回调函数嵌套越来越深，代码将会变得难以维护，这种现象被称为回调地狱（Callback Hell）。接下来将介绍如何使用 Promise 链式调用和 async/await 语法，改写上述代码使其更容易理解和维护。

### Promise
- **核心定义**：异步编程的另一种解决方案。
- **为什么重要**：几乎所有现代 JavaScript 异步 API 都是基于 Promise 的。
- **典型应用**：控制复杂的异步逻辑。更多用法请看 [MDN Promise 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- **代码示例**：
    ```javascript
	// 使用 Promise 改写上面的例子
	// 将每个步骤封装成返回 Promise 的函数
	function simulateLogin() {
		return new Promise(resolve => {
			console.log("[1/4] 模拟用户开始登录（假设2秒后成功）...");
			setTimeout(() => {
				console.log("[1/4] ✅ 模拟登录成功，后端返回了用户信息");
				const user = { name: "Tom", id: 123 };
				resolve(user);
			}, 2000);
		});
	}

	function showWelcomePopup(user) {
		return new Promise(resolve => {
			console.log(`[2/4] 模拟显示欢迎弹窗：欢迎回来，${user.name}！（假设用户盯着弹窗看了6秒）...`);
			setTimeout(resolve, 6000);
		});
	}

	function handleAdRedirect() {
		return new Promise(resolve => {
			console.log("[3/4] 🖱️ 用户点击关闭按钮，但是手抖点到了广告，跳转到广告页面（假设3秒后跳转到广告页面） ...");
			setTimeout(() => {
				console.log("[4/4] 📊 用户开始看广告了，“下面有请尊贵的...”");
				resolve();
			}, 3000);
		});
	}

	// 使用 Promise 链式调用一组异步操作
	function userFlow() {
		simulateLogin() // [!code highlight]
			.then(showWelcomePopup) // [!code highlight]
			.then(() => handleAdRedirect()) // [!code highlight]
			.catch(error => console.error("流程异常:", error));
	}

	// 执行流程
	userFlow();
	console.log("这里浏览器会继续执行下面的其它代码，不会因为 userFlow 内部的异步操作还没执行而卡住");
	```

对于一个真实的项目，通过 Promise 我们可以把不同操作定义在不同函数里，使用时任意组合，能让代码更清晰易懂。

#### Promise.all

Promise.all 是一个非常有用的工具，用于处理多个并行的异步操作。它可以接受一个 Promise 对象数组，并在所有 Promise 都成功完成后返回一个包含每个结果的数组。如果其中任何一个 Promise 被拒绝，则会立即返回这个被拒绝的原因。

假设我们有一些独立的操作（比如加载用户信息、获取广告数据等），我们可以使用 Promise.all 来并行执行这些操作，而不是串行执行。下面一个简单的示例：
```javascript
// Promise.resolve 
const asyncTask1 = () => Promise.resolve(1); // 模拟一个异步操作，最后返回数字 1
const asyncTask2 = () => Promise.resolve(2); // 模拟一个异步操作，最后返回数字 2
const asyncTask3 = () => Promise.resolve(3); // 模拟一个异步操作，最后返回数字 3
const runAllAsyncTasksTogether = () => Promise.all([asyncTask1(), asyncTask2(), asyncTask3()]);
runAllAsyncTasksTogether()
	.then(results => {
		// 3 个异步操作都完成后运行
		console.log(results) // 输出 [1, 2, 3]
	});
```

接下来我们学习另外一种非常常用的异步编程方式 **async/await**。

### async/await
- **核心定义**：用于进一步简化处理基于 Promise 的异步操作。
- **为什么重要**：异步操作实在是太常见了，JavaScript 开发者又经常使用 async/await 来编写异步操作，所以一定要熟悉。
- **典型应用**：控制复杂的异步逻辑。
- **代码示例**：
    ```javascript
	// 使用 async/await 改写上面的例子

	// 封装基础操作函数（与 Promise 版本相同）
	// 此处省略 simulateLogin 等函数的重复定义...

	// 使用 async/await 的主流程
	async function userFlow() {
		try {
			const user = await simulateLogin(); // [!code highlight]
			await showWelcomePopup(user); // [!code highlight]
			await handleAdRedirect(); // [!code highlight]
		} catch (error) {
			console.error("流程异常:", error);
		}
	}

	// 执行流程
	userFlow();
	console.log("这里浏览器会继续执行下面的其它代码，不会因为 userFlow 内部的异步操作还没执行而卡住");
    ```

async 函数本质上是一个返回 Promise 的函数，其内部的 await 会暂停函数执行，直到右侧的 Promise 完成。语法上更像同步代码，但底层仍是异步。

在上面的例子里，userFlow 是一个 async 函数，它内部 `await showWelcomePopup(user)` 会等待 `const user = await simulateLogin()` 运行完成后再运行。但当我们调用 **userFlow** 时（倒数第二行），前面没加 await，因此最后一行的 **console.log** 不会等 **userFlow** 中的异步操作完成后才运行。

**async/await** 不是必须的，你可以只使用 **Promise** 来定义和调用异步非阻塞函数，但是在现代 JavaScript 项目里你会经常看到 **async/await**，所以要需要理解 async function 内部的代码执行顺序。简单来说，任何 await 下面的代码都要等 await 右边的异步操作完成后才运行。如果一个异步操作左边没有 await，则下面的代码不会等待。

## 2. Fetch API

Fetch API 就是一个基于 **Promise** 实现的异步非阻塞 API，通常用于前后端数据交换。

- **核心定义**：用于发起网络请求并处理响应。
- **为什么重要**：现代的前端数据交互方式，替代了 XMLHttpRequest（Ajax）技术。
- **典型应用**：获取服务器数据，发送数据到服务器
- **代码示例**：
    ```javascript
	function getTodoItemById(id) {
		return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
			.then(response => response.json())
			.then((data) => console.log(data))
			.catch(error => console.error("请求失败:", error));
	}

	getTodoItemById(1);
    ```

	```javascript
	// 使用 async/await 改写 getTodoItemById 函数
	async function fetchTodoItemById(id) {
		try {
			const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.error("请求失败:", error);
		}
	}

	fetchTodoItemById(1);
	```

说起来 Fetch API 不得不顺便介绍一下 [JSON（JavaScript Object Notation）](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON)，JSON 是一种轻量级的文本数据交换格式。通常用于前后端之间传输数据。它的语法类似于 JavaScript 对象和数组，使用键值对来存储数据。一个简单的例子，用 JSON 格式传输一个人的信息：
```json
{
	"name": "John Doe",
	"age": 30,
	"email": "johndoe@example.com",
	"boy_friends": ["Alice", "Bob"],
	"hobbies": ["reading", "coding"],
	"address": {
		"street": "123 Main St",
		"city": "Anytown",
		"state": "CA"
	}
}
```

上面 Fetch API 例子里的后端接口 https://jsonplaceholder.typicode.com/todos/1 返回的数据就是一个 JSON 对象：
```json
{
	"userId": 1,
	"id": 1,
	"title": "delectus aut autem",
	"completed": false
}
```
通过 key 命名猜测含义：
- userId: 用户 ID
- id: TODO 任务 ID
- title: 任务标题
- completed: 任务是否已完成

后面我们会经常见到 JSON 格式的数据。


## 3. 模块化开发
- **核心定义**：将代码分割成可重用的模块。
- **为什么重要**：提高代码组织性，便于维护和复用。
- **典型应用**：创建可重用的函数，组件
- **代码示例**：  
	`utils.js` 文件中导出一个名为 `greet` 的函数，该函数接受一个参数 `name` 并返回问候语。
    ```javascript
    // utils.js (导出函数)
    export function greet(name) {
        return `Hello, ${name}!`;
    }
    ```
	`main.js` 文件中导入并使用 `greet` 函数。
    ```javascript
    // main.js (导入并使用函数)
    import { greet } from './utils.js';
    console.log(greet("World")); // 输出: Hello, World!
    ```

## 4. Node.js + NPM + Vite

之前我们一直是在浏览器里运行 JavaScript 的代码，我们可以称浏览器为一个 JavaScript 运行环境，而 Node.js 是另外一个常用的 JavaScript 运行环境。

浏览器提供很多了 Web API 来实现 web 应用前端的功能，Node.js 提供了很多 web 应用后端需要的 API，比如文件读写、网络请求与响应等。

Node.js 不仅可以用于后端开发，对前端应用开发也很重要。由于现代前端项目通常不会直接把源码放在浏览器里运行，而是通过一些工具打包优化后再提供一个体积较小，兼容性更好的代码给用户使用。很多前端开发工具就是用 Node.js 来实现的，比如 [Vite](https://cn.vite.dev/guide/why)。

在 macOS 上可以通过 homebrew 来安装 Node.js，运行命令：`brew install node` 即可完成安装。Windows 或其它系统可以去[官网](https://nodejs.org/en/download)下载安装。

输入命令 `node -v` 可以查看当前 Node.js 的版本号。如果安装成功，则会输出类似 `v22.1.0` 这样的版本号。

NPM 是 Node.js 的包管理工具（Package Manager），用于安装和管理 JavaScript 包（Package），所谓的包就是指一组 JavaScript 代码。NPM 不需要单独安装，安装 **Node.js** 的时候会自动安装 **npm**。

所谓的包管理工具是用于安装和管理软件包的工具，它可以帮助我们快速地获取、管理和使用各种**第三方**库（Library）或框架（Framework）。说人话就是：**帮我们下载别人写好的代码的工具**。

输入命令 `npm -v` 可以查看当前 NPM 的版本号。如果安装成功，则会输出类似 `10.1.2` 这样的版本号。

**Vite** 就是一个别人写好的前端构建工具，它可以帮助我们创建一个真正的前端项目，以下是一个简单的示例：
```bash
# 使用 Vite 创建一个名为 my-vanilla-app 的新项目
npm create vite@latest my-vanilla-app -- --template vanilla
# 进入项目目录
cd my-vanilla-app
# 安装依赖包（Dependencies）
npm install
# 启动开发服务器
npm run dev
```

如果我们看一下 **my-vanilla-app** 目录下的文件结构：
```text
➜  my-vanilla-app tree -L 2  
.
├── index.html
├── node_modules
│   ├── @esbuild
│   ├── @rollup
│   ├── @types
│   ├── esbuild
│   ├── nanoid
│   ├── picocolors
│   ├── postcss
│   ├── rollup
│   ├── source-map-js
│   └── vite
├── package-lock.json
├── package.json
├── public
│   └── vite.svg
└── src
    ├── counter.js
    ├── javascript.svg
    ├── main.js
    └── style.css

14 directories, 8 files
```

Vite 帮我们创建了很多文件和文件夹。其中：
- **index.html** 是我们网页的入口点，它包含了我们页面的结构和样式。
- **node_modules** 是存放依赖的目录，也就是我们用 NPM 下载的第三方包。
- **package.json** 和 **package-lock.json** 是存放依赖信息的配置文件。
- **public** 是存放公共资源的目录，比如图片、字体等文件。**vite.svg** 是 Vite 的 Logo 图标文件。
- **src** 是存放源代码的目录，包括我们的 HTML、CSS 和 JavaScript 文件。
  - **main.js** 和 **counter.js** 是我们的 JavaScript 文件，它们包含了一些基本的示例逻辑代码。
  - **style.css** 是我们的 CSS 文件，它包含了我们页面的样式示例。

如果我们运行 `npm run dev`，Vite 会自动启动开发服务器，并提供一个 URL 让我们预览网页。每当修改了源代码后，Vite 会自动重新编译并刷新浏览器。

如果我们运行 `npm run build`，会发现多了一个 **dist** 文件夹，文件结构如下：
```
dist
├── assets
│   ├── index-CrYBktwj.css
│   └── index-_AYE_jbl.js
├── index.html
└── vite.svg
```

这是因为 Vite 将我们 src 中的源代码打包并输出到了 **dist** 下。注意看原本 src 里的 **main.js** 和 **counter.js** 2 个文件现在变成了 1 个 **dist/assets/index-_AYE_jbl.js**，Vite 帮我们打包压缩了代码，这样用户访问网页时需要下载的文件更小，加载速度更快。

## 课后练习
1. 辨析类题目：
   - **Promise** 和 **async/await** 的区别是什么？
   - 同步代码与异步代码的核心区别是什么？


2. 代码补全练习：  
	将以下回调代码改写为 Promise 链式调用：  

	```javascript
	// 原代码（回调嵌套）
	function fetchData(callback) {
		setTimeout(() => {
			callback("数据加载完成");
		}, 1000);
	}

	fetchData((data) => {
		console.log(data);
		fetchData((data) => {
			console.log(data);
		});
	});
	```
	以下代码的输出顺序是什么？  

	```javascript
	console.log("A");
	setTimeout(() => console.log("B"), 0);
	console.log("C");
	```

3. 小型实战项目：使用 Vite 创建一个简单的待办事项应用，功能包括：
   - 一个列表显示所有任务
   - 网页加载后使用 Fetch API 从后端获取 3 条代办事项并把它们的标题（title）显示在列表中。
     - 使用这个后端接口（Endpoint） `https://jsonplaceholder.typicode.com/todos/${id}` 
     - 三条代办事项的 id 分别是 1, 2, 3，点击下面的三个链接可以预览它们返回的数据：
       - https://jsonplaceholder.typicode.com/todos/1
       - https://jsonplaceholder.typicode.com/todos/2
       - https://jsonplaceholder.typicode.com/todos/3
   - 点击“删除”按钮删除第一个任务（从网页列表里移除即可）
   - 点击“随机”按钮随机从后端获取一个任务，并把标题（title）显示到列表中（id 范围 1 - 100）

## 参考答案

1. **Promise** 和 **async/await** 的区别是什么？
   1. Promise 是异步操作的封装，通过 .then() 链式调用处理结果。
   2. async/await 是 Promise 的语法糖，用同步写法处理异步逻辑。async 函数返回 Promise，await 会暂停函数执行直到 Promise 完成。
2. 同步代码与异步代码的核心区别是什么？
   - 同步代码按顺序执行，会阻塞后续代码直到完成；异步代码将任务交给浏览器/环境后台处理，主线程继续执行后续代码，待异步任务完成后通过回调/Promise等机制处理结果。
3. 代码补全参考：  
	将以下回调代码改写为 Promise 链式调用：  

	```javascript
	function fetchData() {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve("数据加载完成");
			}, 1000);
		});
	}

	fetchData()
		.then(data => {
			console.log(data);
			return fetchData();
		})
		.then(console.log);
	```
	以下代码的输出顺序是什么？  

	```javascript
	console.log("A");
	setTimeout(() => console.log("B"), 0);
	console.log("C");
	// A
	// C
	// B
	```
4. 小型实战项目：使用 Vite 创建一个简单的待办事项应用
   	```html
   	<!-- index.html -->
	<!doctype html>
	<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<link rel="icon" type="image/svg+xml" href="/vite.svg" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Vite App</title>
	</head>
	<body>
		<div class="container">
			<h1>Todo List</h1>
			<div class="button-group">
				<button id="deleteFirst">删除第一个任务</button>
				<button id="addRandom">添加随机任务</button>
			</div>
			<ul id="todo-list"></ul>
		</div>
		<script type="module" src="/src/todo.js"></script>
	</body>
	</html>
	```
   	```javascript
	// src/todo.js
	let todos = []

	// 初始化加载
	window.onload = async () => {
		try {
			const responses = await Promise.all(
				[1, 2, 3].map(id => 
					fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
				)
			)
			const data = await Promise.all(responses.map(res => res.json()))
			todos = data
			renderTodos()
		} catch (error) {
			console.error('初始化加载失败:', error)
		}
	}

	// 渲染任务列表
	function renderTodos() {
	const list = document.getElementById('todo-list')
	list.innerHTML = '' // 清空当前列表

	todos.forEach(todo => {
		const li = document.createElement('li')
		if (todo.completed) li.classList.add('completed')
		
		li.innerHTML = `
		<span>${todo.title}</span>
		<span>${todo.completed ? '✅' : '⏳'}</span>
		`
		list.appendChild(li)
	})
	}

	// 删除第一个任务
	function deleteFirst() {
	if (todos.length === 0) return
	todos = todos.slice(1)
	renderTodos()
	}

	// 添加随机任务
	async function addRandom() {
	try {
		const randomId = Math.floor(Math.random() * 100) + 1
		const response = await fetch(
		`https://jsonplaceholder.typicode.com/todos/${randomId}`
		)
		const newTodo = await response.json()
		todos.push(newTodo)
		renderTodos()
	} catch (error) {
		console.error('获取随机任务失败:', error)
	}
	}

	document.getElementById("deleteFirst").addEventListener("click", deleteFirst);
	document.getElementById("addRandom").addEventListener("click", addRandom);
	```
