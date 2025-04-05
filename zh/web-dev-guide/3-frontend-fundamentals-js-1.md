# 第三课：前端基础 - JavaScript 基础

## 课程目标
1. 掌握 JavaScript 基础语法  
2. 理解基本数据类型和对象操作  
3. 学会使用条件语句、循环及数组操作方法  
4. 实现简单的 DOM 操作，绑定事件处理程序  

## 1. 变量与常量
- **核心定义**：使用 `let`（可变变量）和 `const`（不可变常量）存储数据
- **为什么重要**：是程序存储和操作数据的基础单元，避免使用过时的 `var`
- **典型应用**：用户信息存储、计数器、配置项
- **代码示例**：
    ```javascript
    let name = "Alice"; // 可重新赋值的变量
    const age = 25;     // 不可更改的常量
    console.log(name);  // 输出: Alice
    console.log(age);   // 输出: 25
	name = "Bob";      // 可重新赋值
    console.log(name);  // 输出: Bob
    age = 30;          // 不可更改，会导致错误
    ```

可以在浏览器控制台中尝试上诉代码： 打开任意网站 > ”打开开发者工具“ > “控制台（console）” > 复制粘贴代码并按回车键。

## 2. 数据类型
- **核心定义**：数据类型（Data Type）是变量所存储数据的种类。
- **为什么重要**：不同的数据类型有不同的操作方式和行为。
- **典型应用**：
  - Number：数字，包括整数与浮点数（float 也就是有小数点的数）。
  - String：字符串，用于表示文本。
  - Boolean：布尔值，表示真或假。
  - Null：空值，代表没有值的状态。
  - Undefined：未定义，表示变量尚未初始化。
  - Object：对象，包含键值对的数据结构。例如用户资料结构化存储。
  - Array：数组，有序集合，通常存储同种类型元素。例如存储商品列表。
- **代码示例**：
    ```javascript
    let count = 10;                 // Number 类型
    let message = "Hello, World!";  // String 类型
	let isAvailable = true;         // Boolean 类型
    let person = {name: "Bob", age: 30};   // Object 类型
    let items = [1, 2, 3, 4];           // Array 类型

    console.log(count);   // 输出: 10
    console.log(message); // 输出: Hello, World!
	console.log(isAvailable); // 输出: true
    console.log(person);  // 输出: {name: "Bob", age: 30}
    console.log(items);   // 输出: [1, 2, 3, 4]
    ```

## 3. 函数 (Function)
- **核心定义**：使用 function 或箭头函数（Arrow function）封装可重用代码块
- **为什么重要**：提高代码复用率，实现模块化编程
- **典型应用**：表单验证、数据处理、事件处理
- **代码示例**：
    ```javascript
	// 使用 function 关键字定义传统函数，a 和 b 为参数，返回 a 加 b 的结果
	function sum(a, b) {
		return a + b
	}

	// 使用箭头函数表达式定义箭头函数（现代写法），x 和 y 为参数，返回 x 乘以 y 的结果
	const multiply = (x, y) => x * y
    ```

## 4. 解构赋值和展开运算符

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

## 5. 循环与条件语句
- **核心定义**：循环（Loop）用于重复执行一段代码；条件语句（Conditional Statement）用于根据条件选择性执行代码。
- **为什么重要**：实现业务逻辑的核心手段。
- **典型应用**：数据过滤、列表渲染、权限判断。
- **代码示例**：
    ```javascript
    let numbers = [1, 2, 3, 4, 5];

    // for 循环遍历数组
    for (let i = 0; i < numbers.length; i++) {
        console.log(numbers[i]);  // 输出: 1, 2, 3, 4, 5
    }

	// filter 函数过滤数组元素
	// `num % 2 === 0` 是一个表达式，用于判断一个数是否为偶数。如果 === 左右两边完全相等，则返回 true，否则返回 false。
	let evenNumbers = numbers.filter((num) => num % 2 === 0);
	console.log(evenNumbers);   // 输出: [2, 4]
	
	// map 函数遍历数组并返回新数组
	let doubledNumbers = numbers.map((num) => num * 2);
	console.log(doubledNumbers);   // 输出: [2, 4, 6, 8, 10]

	// forEach 函数遍历数组并执行回调函数
	numbers.forEach((num, index) => {
		// `${num} ...` 是字符串模板，用于将变量 num 和 index 插入到字符串中。
        console.log(`第 ${index + 1} 个数字是 ${num}`);   // 输出: 第 1 个数字是 1, 第 2 个数字是 2, ...
	});

    // if...else 判断条件
    let age = 18;
    if (age >= 18) {
        console.log("Adult");   // 输出: Adult
    } else {
        console.log("Minor");
    }

    // 三元运算符
    let isEven = (number) => number % 2 === 0 ? "偶数" : "奇数";
    console.log(isEven(4));     // 输出: 偶数
    ```

## 6. DOM（Document Object Model）基础操作
- **核心定义**：通过 JavaScript 操作页面元素
- **为什么重要**：实现动态交互的核心技术
- **典型应用**：动态内容更新、表单验证、交互反馈
- **代码示例**：
    ```html
	<ul id="list"></ul>
	<button id="btn">添加项目</button>
	<button id="btn-delete-last">删除最后一个项目</button>

	<script>
	const btn = document.getElementById('btn')
	const btnDeleteLast = document.getElementById('btn-delete-last')
	const list = document.querySelector('#list')

	btn.addEventListener('click', () => {
		const newItem = document.createElement('li')
		newItem.textContent = `新项目 ${Date.now()}`
		list.appendChild(newItem)
	})

	btnDeleteLast.addEventListener('click', () => {
		const lastItem = list.lastChild
		if (lastItem) {
			list.removeChild(lastItem)
		}
	})
	</script>
    ```

更多 DOM API 和示例代码，请参考 [MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model)

## 7. Web API 介绍

上一节我们介绍了 DOM，DOM 是浏览器提供的一组接口（Application Programming Interface），用 JavaScript 操作 HTML 元素。现代浏览器提供了非常多 API，用于实现各种交互功能。以下是一些实用的 Web APIs：
- [`Fetch API`](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) API：用于发送 HTTP 请求到后端服务器。下一课我们会学习它的用法。
- [`Web Storage API`](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API) API：用于存储数据到浏览器中。
- [`MediaStream Recording API`](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaStream_Recording_API) API：用于录制音频或者视频。

更多 Web API，请参考 [MDN Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)。


## 课后练习

1. **辨析类题目**
   - `let` vs `const` 的区别。
   - 什么是 API？什么是 Web API？
   
2. **代码补全练习**  
	小写转大写：  

   ```javascript
   let fruits = ['apple', 'banana', 'cherry'];
   // 使用 map 方法生成新的数组，所有水果名称变大写
   let uppercasedFruits = fruits.map(/* your code here */);
   console.log(uppercasedFruits);  // 输出: ["APPLE", "BANANA", "CHERRY"]
   ```
	使用展开运算符合并两个对象：  

    ```javascript
    const obj1 = { a: 1, b: 2 };
    const obj2 = _____________________;
    console.log(obj2); // 输出: {a: 1, b: 2, c: 3}
    ```
   
3. **DOM 操作练习**
   - 创建一个包含三个列表项的无序列表（`<ul>`），每个列表项的文字内容分别为“Item 1”，“Item 2”和“Item 3”。使用 JavaScript 将这个列表添加到 HTML 页面中已存在的 `<div id="list-container">` 元素内。

4. **函数编写**
   - 编写一个函数 `isPalindrome`，接受一个字符串参数并返回该字符串是否为回文（正读反读都一样的字符串）。例如：
     ```javascript
     console.log(isPalindrome("racecar"));  // 输出: true
     console.log(isPalindrome("hello"));    // 输出: false
     ```

## 参考答案

### 辨析类题目答案

- `let` 和 `const` 的区别在于声明变量的作用域以及是否可以重新赋值。
  - `let` 声明的变量具有块级作用域，并且可以在声明后重新赋值。
  - `const` 声明的变量也具有块级作用域，但不能直接重新赋值。然而，如果 `const` 变量是一个对象或数组，则其内部属性可以被修改。
- API 全称为 Application Programming Interface，即应用程序编程接口。说人话就是：别人写好了一些代码，提供给我们调用。
- Web API 就是浏览器提供给我们的一组 API，用于在网页上实现各种功能。

### 代码补全练习答案

小写转大写：  

```javascript
let fruits = ['apple', 'banana', 'cherry'];
// 使用 map 方法生成新的数组，所有水果名称变大写
let uppercasedFruits = fruits.map(fruit => fruit.toUpperCase());
console.log(uppercasedFruits);  // 输出: ["APPLE", "BANANA", "CHERRY"]
```

使用展开运算符合并两个对象：  

```javascript
const obj1 = { a: 1, b: 2 };
const obj2 = {...obj1, c: 3};
console.log(obj2); // 输出: {a: 1, b: 2, c: 3}
```

### DOM 操作练习答案

```javascript
const container = document.getElementById("list-container");
const ulElement = document.createElement("ul");

let items = ['Item 1', 'Item 2', 'Item 3'];
items.forEach(item => {
    const liElement = document.createElement("li");
    liElement.textContent = item;
    ulElement.appendChild(liElement);
});

container.appendChild(ulElement);
```

### 函数编写答案

```javascript
function isPalindrome(str) {
    // 去除字符串中的空格并统一转为小写（确保不区分大小写）
    let cleanedStr = str.replaceAll(' ', '').toLowerCase();
    // 反转清理后的字符串
    let reversedStr = cleanedStr.split('').reverse().join('');
    // 比较原字符串和反转后的字符串是否相同
    return cleanedStr === reversedStr;
}

console.log(isPalindrome("racecar"));  // 输出: true
console.log(isPalindrome("hello"));    // 输出: false
```
