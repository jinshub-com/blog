# 第四课：前端基础 - JavaScript 进阶

## 课程目标
1. 掌握 ES6+ 核心特性（解构、展开运算符）
2. 理解并应用 `setTimeout` 和 `async/await`
3. 使用 Fetch API 进行数据请求
4. 学习模块化开发（import/export）
5. 利用 Node.js + npm + Vite 创建和运行项目

## 第四课：前端基础 - JavaScript 进阶

## 1. ES6+ 核心特性

### 解构赋值 (Destructuring Assignment)
- **核心定义**：从数组或对象中提取数据并赋值给变量。
- **为什么重要**：简化数据访问，提高代码可读性。
- **典型应用**：函数参数解构、交换变量值、提取嵌套对象属性
- **代码示例**：
    ```javascript
    // 数组解构
    const [first, second] = [1, 2];
    console.log(first); // 输出: 1

    // 对象解构
    const { name, age } = { name: "Alice", age: 25 };
    console.log(name); // 输出: Alice

	// 参数解构
	function printArticle({ title, content }) {
		console.log(`${title}: ${content}`)
	}
	printArticle({ title: 'JavaScript', content: 'Learn JavaScript' });

	// 换位赋值
	let a = 5;
	let b = 10;
	[a, b] = [b, a];
	console.log(a); // 输出: 10
	console.log(b); // 输出: 5
    ```

### 展开运算符 (Spread Operator)
- **核心定义**：用 `...` 语法展开可迭代对象（如数组/对象）。
- **为什么重要**：简化数据操作，合并数组和对象。
- **典型应用**：数组合并、对象属性复制、函数参数传递
- **代码示例**：
    ```javascript
    // 数组合并
    const arr1 = [1, 2];
    const arr2 = [...arr1, 3, 4]; // 输出: [1, 2, 3, 4]

    // 对象复制
    const obj1 = { name: "Bob", age: 30 };
    const obj2 = { ...obj1, city: "New York" }; // 输出: {name: 'Bob', age: 30, city: 'New York'}

	// 函数参数传递
	const arr3 = [10, 20, 5]
	Math.max(...arr3); // 输出: 20
    ```

## 2. 异步编程 (Asynchronous Programming)

在 JavaScript 中，异步编程是一个关键概念。通过异步编程，我们可以在未来的某个时间点运行特定的任务。

接下来我们用 `setTimeout` 方法来模拟一组复杂的异步任务。

### setTimeout
- **核心定义**：延迟执行一段代码。
- **为什么重要**：实现定时任务，控制函数调用时机。
- **典型应用**： 显示倒计时。其实 `setTimeout` 很少用，这里用它做例子介绍异步编程和回调函数，回调函数是指未来特定时机执行的函数（Function）。
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
    ```

当异步操作越来越多，回调函数嵌套越来越深，代码将会变得难以维护。我们来学习如何使用Promise链式调用和async/await语法，将上述代码改写成线性结构：

### Promise
- **核心定义**：异步编程的一种解决方案。
- **为什么重要**：提供了一种更优雅的方式来处理异步操作。
- **典型应用**：控制复杂的异步逻辑。
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
		simulateLogin()
			.then(user => showWelcomePopup(user))
			.then(() => handleAdRedirect())
			.catch(error => console.error("流程异常:", error));
	}

	// 执行流程
	userFlow();
	```

改写后代码看起来变多了，也没啥明显的好处。这里只是一个例子，展示如何用 Promise 将一个异步操作封装成独立函数，并串联不同的异步操作。

通过 Promise 我们可以把不同操作放在不同函数里，让代码更清晰易懂，这对复杂项目尤其重要。

接下来我们学习另外一种非常常用的异步编程方式 async/await。

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
			const user = await simulateLogin();
			await showWelcomePopup(user);
			await handleAdRedirect();
		} catch (error) {
			console.error("流程异常:", error);
		}
	}

	// 执行流程
	userFlow();
    ```

## 3. Fetch API
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

## 4. 模块化开发
- **核心定义**：将代码分割成可重用的模块。
- **为什么重要**：提高代码组织性，便于维护和复用。
- **典型应用**：
  - 创建组件
  - 管理路由配置
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

## 5. Node.js + NPM + Vite

之前我们一直是在浏览器里运行 JavaScript 的代码，我们可以称浏览器为一个 JavaScript 运行环境，而 Node.js 是另外一个常用的 JavaScript 运行环境。

在 macOS 上可以通过 homebrew 来安装 Node.js，运行命令：`brew install node` 即可完成安装。Windows 或其它系统可以去[官网](https://nodejs.org/en/download)下载安装。

NPM 是 Node.js 的包管理工具，用于安装和管理 JavaScript 包。不需要单独安装，安装 `Node.js` 的时候会自动安装 `npm`。

所谓的包管理工具是用于安装和管理软件包的工具，它可以帮助我们快速地获取、管理和使用各种**第三方**库（Library）或框架（Framework）。说人话就是：**帮我们下载别人写好的代码的工具**。

`Vite` 就是一个别人写好的前端构建工具，它可以帮助我们创建一个真正的前端项目（以前手动创建文件夹作为一个项目太简陋了，实际的项目更杂，要考虑的细节更多）。

```bash
# 使用 Vite 创建一个名为 my-vanilla-app 的新项目
npm create vite@latest my-vanilla-app -- --template vanilla

# 进入项目目录
cd my-vanilla-app

# 安装依赖（Dependencies）
npm install

# 启动开发服务器
npm run dev
```

## 课后练习
1. 辨析类题目：
   - `Promise` 和 `async/await` 的区别是什么？

2. 代码补全练习：
    ```javascript
    // 使用展开运算符合并两个对象
    const obj1 = { a: 1, b: 2 };
    const obj2 = _____________________;
    console.log(obj2); // 输出: {a: 1, b: 2, c: 3}
    ```

3. 小型实战项目：使用 Vite 创建一个简单的待办事项应用，功能包括：
   - 使用 Fetch API 从服务器获取一条代办事项并显示在第一条任务列表中。可以使用这个后端接口（API） `https://jsonplaceholder.typicode.com/todos/1` 
   - 列表显示所有任务
   - 点击按钮添加新任务（不需要保存到服务器，点击按钮后显示一条新的代办事项就可以）
   - 点击按钮删除第一个任务

## 参考答案

1. `Promise` 是异步操作的解决方案，而 `async/await` 则是基于 Promise 的语法糖。使用 `async/await` 使得代码更加简洁易读。

2. 代码补全参考：
	```javascript
	const obj1 = { a: 1, b: 2 };
	const obj2 = {...obj1, c: 3};
	console.log(obj2); // 输出: {a: 1, b: 2, c: 3}
