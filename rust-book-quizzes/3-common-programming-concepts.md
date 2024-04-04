# Common Programming Concepts

::: tip 📚 Chapter 3
This Chapter introduces common programming concepts in Rust, such as variables, data types, functions, statements and expressions, comments, and control flow.

*You can skip this Chapter if you already have experience with using `let`, `let mut`, `const`, `i32`, `f64`, `bool`, `char`, `Tuple`, `Array`, `fn`, `if`, `else`, `loop`, `while`, and `for` in Rust.*
:::

## Variables and Mutability

Variables in Rust are declared using the `let` keyword. By default, variables are immutable, which means that once a value is assigned to a variable, it cannot be changed.

```rust
let x = 5;
x = 6; // This will cause a compile-time error
```

To make a variable mutable, you need to use the `mut` keyword.

```rust
let mut x = 5;
x = 6; // This is allowed
```

#### Shadowing

Shadowing is when you declare a new variable with the same name as a previous variable. The new variable shadows the previous variable.

```rust
let x = 5;
let x = x + 1;
{
	let x = x * 2;
	println!("The value of x in the inner scope is: {}", x); // x = 12
}
println!("The value of x in the outer scope is: {}", x); // x = 6
```

The scope of the variable `x` in the inner block is limited to that block. The variable `x` in the outer block is not affected by the inner block.

Shadowing is different from using `mut` because we can change the type of the variable using shadowing.

```rust
let digits = "123"; // digits is a string
let digits = digits.len(); // digits is an integer, the length of the string
```

#### Constants

Constants are declared using the `const` keyword. Constants are always immutable, and their type must be annotated. Constants can not be shadowed.

```rust
const MAX_POINTS: u32 = 100_000;
```

## Concept Check Quiz

<Quiz id="quiz-variables-and-mutability-1" title="Concept Check 3.1: Shadowing variables" :options="[
	'0123',
	'4',
	'Does not compile',
]" :answers="['4']">
  <template #description>

  What is the output of the following code snippet?
  ```rust
  let password = "0123";
  let password = password.len();
  println!("{}", password);
  ```
  </template>
  <template #solution>
  
  **4**. The code snippet compiles and outputs `4`. The variable `password` is shadowed by redeclaring it with a different type.
  </template>
</Quiz>

<Quiz id="quiz-variables-and-mutability-2" title="Concept Check 3.2: Shadowing mutable variables" :options="[
	'1',
	'2',
	'3',
	'Does not compile',
]" :answers="['2']">
  <template #description>

  What is the output of the following code snippet?
  ```rust
  let mut x = 1;
  x = 2;
  {
      let x = x + 1;
  }
  println!("{}", x);
  ```
  </template>
  <template #solution>
  
  **2**. The code snippet compiles and outputs `2`. The variable `x` is shadowed in the inner block and does not affect the outer block.
  </template>
</Quiz>

<Quiz id="quiz-variables-and-mutability-3" title="Concept Check 3.3: Mutable variables" :options="[
	'1',
	'2',
	'Does not compile',
]" :answers="['Does not compile']">
  <template #description>

  What is the output of the following code snippet?
  ```rust
  let mut x = 1;
  x = "2";
  println!("{}", x);
  ```
  </template>
  <template #solution>
  
  **Does not compile**. The code snippet does not compile because the variable `x` is declared as an integer and then assigned a string value.
  </template>
</Quiz>

## Data Types

Rust is a statically typed language, which means that the type of every variable must be known at compile time. There are two categories of data types in Rust: *scalar* and *compound*.

### Scalar Types

Scalar types in Rust represent single values. Rust's primary scalar types include *integers*, *floating-point numbers*, *booleans*, and *characters*.

#### Integers

Integers are whole numbers without a fractional component. Rust provides signed and unsigned integers of different sizes. For example, `i8` and `u8` represent signed and unsigned 8-bit integers, respectively. Each signed integer type can store numbers from $-2^{n-1}$ to $2^{n-1} - 1$, where $n$ is the number of bits used to represent the integer. Unsigned integers store only positive values and have a range from $0$ to $2^n - 1$. The default integer type is `i32`. 


```rust
let x: i8; // range: [-2^7, 2^7 - 1] => [-128, 127]
let x: u8; // range: [0, 2^8 - 1] => [0, 255]
let x: i16; // range: [-2^15, 2^15 - 1] => [-32,768, 32,767]
let x: u16; // range: [0, 2^16 - 1] => [0, 65,535]
let x: i32; // range: [-2^31, 2^31 - 1] => [-2,147,483,648, 2,147,483,647]
let x: u32; // range: [0, 2^32 - 1] => [0, 4,294,967,295]
// More built-in integer types: i64, u64, i128, u128, isize, usize
// See https://doc.rust-lang.org/book/ch03-02-data-types.html#integer-types
```

When an integer overflows, Rust will panic (crash) at runtime in debug mode. In release mode, Rust will perform two's complement wrapping, which means that the value will wrap around to the minimum value of the integer type, for example, `255 + 1 = 0` for an 8-bit unsigned integer.

```rust
let x: u8 = 255;
let y = x + 1; // This will panic in debug mode, wrap to 0 in release mode
println!("y = {}", y);
```

To explicitly handle integer overflow, you can use checked arithmetic, which returns an `Option` type. The `checked_add` method returns `Some(result)` if the operation does not overflow, and `None` if it does.

```rust
let x: u8 = 255;
let y = x.checked_add(1);
match y {
	Some(v) => println!("Result: {}", v),
	None => println!("Overflow!"),
}
```

More information about integer overflow can be found in the official Rust book: [Integer Overflow](https://doc.rust-lang.org/book/ch03-02-data-types.html#integer-overflow)

#### Floating-Point Numbers

Floating-point numbers represent numbers with a fractional component. Rust has two primitive floating-point types: `f32` and `f64`, which are 32-bit and 64-bit floating-point numbers, respectively. The IEEE-754 standard defines the representation of floating-point numbers. The default floating-point type is `f64`.

Rust supports basic arithmetic operations on floating-point and integer numbers, such as addition, subtraction, multiplication, and division.

```rust
let x: f32 = 3.14;
let y: f32 = 1.0;
let sum = x + y; // addition
let diff = x - y; // subtraction
let prod = x * y; // multiplication
let quot = 10 / 3; // division
let rem = 10 % 3; // remainder
```

#### Booleans

Booleans represent logical values: `true` and `false`. Booleans are one byte in size.

```rust
let x: bool = true;
let y: bool = false;
```

#### Characters

Characters represent single Unicode characters and are enclosed in single quotes. Rust's `char` type is four bytes in size and can represent any Unicode scalar value, including emojis.

```rust
let x: char = 'A';
let y: char = '😀';
```

### Compound Types

Compound types in Rust combine multiple values into a single type. Rust's primary compound types are *tuples* and *arrays*.

#### Tuples

Tuples are collections of values, and each value in a tuple can have a different type. Tuples have a fixed length, and their elements can be accessed by index.

```rust
let tuple: (i32, i32, char) = (1, 2, '3');
let (x, y, z) = tuple; // destructuring
println!("x: {}, y: {}, z: {}", x, y, z);
let first = tuple.0; // accessing elements by index
let second = tuple.1;
let third = tuple.2;
println!("first: {}, second: {}, third: {}", first, second, third);
```

#### Arrays

Arrays are collections of values of the same type with a fixed length. Arrays in Rust are stack-allocated and have a fixed size, which is determined at compile time. The type of an array includes the element type and the number of elements.

```rust
let array: [i32; 3] = [1, 2, 3]; // array of 3 integers
let first = array[0]; // accessing elements by index
let second = array[1];
let third = array[2];
println!("first: {}, second: {}, third: {}", first, second, third);
```

Rust provides a shorthand syntax for initializing arrays with the same value.

```rust
let array = [0; 3]; // array of 3 zeros
```

Arrays in Rust are bounds-checked at runtime. If you try to access an element outside the bounds of the array, Rust will panic.

```rust
let array = [1, 2, 3];
let fourth = array[3]; // This will panic
```

The length of an array can be obtained using the `len` method.

```rust
let array = [1, 2, 3];
let length = array.len(); // length = 3
```

To avoid panicking, you can use the `get` method, which returns an `Option` type.

```rust
let array = [1, 2, 3];
let fourth = array.get(3);
match fourth {
	Some(v) => println!("Fourth element: {}", v),
	None => println!("Index out of bounds"),
}
```

## Concept Check Quiz

<Quiz id="quiz-data-types-1" title="Concept Check 3.4: Data Types" :options="[
	'True',
	'False',
]" :answers="['True']">
  <template #description>

  True or False: Scalar types in Rust represent single values while compound types combine multiple values into a single type.
  </template>
  <template #solution>

  **True**. Scalar types include integers, floating-point numbers, booleans, and characters, while compound types include tuples and arrays.
  </template>
</Quiz>

<Quiz id="quiz-data-types-2" title="Concept Check 3.5: Integers" :options="[
	'256',
	'0',
	'Does not compile',
]" :answers="['Does not compile']">
  <template #description>

  What is the output of the following code snippet in debug mode?
  ```rust
  let x: u8 = 255;
  let y = x + 1;
  println!("{}", y);
  ```
  </template>
  <template #solution>
  
  **Does not compile**. The code snippet does not compile because the addition operation overflows the `u8` integer type. By default, Rust does not allow code to compile that results in an integer overflow and will panic at runtime in debug mode.
  </template>
</Quiz>

<Quiz id="quiz-data-types-3" title="Concept Check 3.6: Tuples and Arrays" :options="[
	'2',
	'4',
	'Does not compile',
]" :answers="['2']">
  <template #description>

  What is the output of the following code snippet?
  ```rust
  let array = [1; 3];
  let tuple = (1, array);
  let x = tuple.0 + tuple.1[0];
  println!("{}", x);
  ```
  </template>
  <template #solution>
  
  **2**. The code snippet compiles and outputs `2`. The tuple contains an integer and an array, and the sum of the first element of the tuple and the first element of the array is calculated. `[1; 3]` creates an array of 3 elements with the value `1`.
  </template>
</Quiz>

## Functions

Functions in Rust are declared using the `fn` keyword. The main function is the entry point of a Rust program and is called when the program is executed.

```rust
fn main() {
	println!("Hello, world!");
}
```

Functions can take parameters, which are specified within parentheses after the function name. The type of each parameter must be annotated. If a function returns a value, the return type must be specified after an arrow `->`.

```rust
fn add(x: i32, y: i32) -> i32 {
	x + y // The last expression in a function is the return value
}
```

## Statements and Expressions

Rust is an expression-based language, which means that most constructs in Rust are expressions that return a value. Expressions evaluate to a value, while statements perform actions and do not return a value.

```rust
let x = 1; // statement
let y = { // block expression
	let z = 2; // statement
	z + 1 // expression
};
println!("{}", y); // 3
```

## Concept Check Quiz

<Quiz id="quiz-functions-1" title="Concept Check 3.7: Functions" :options="[
	'1',
	'2',
	'Does not compile',
]" :answers="['Does not compile']">
  <template #description>

  What is the output of the following code snippet?
  ```rust
  fn add_one(x: i32) {
  	x + 1
  }
  let sum = add_one(1);
  println!("{}", sum);
  ```
  </template>
  <template #solution>
  
  **Does not compile**. The code snippet does not compile because the type of the parameter `x` is not annotated in the function signature.
  </template>
</Quiz>

## Comments

Comments in Rust are created using `//` for single-line comments and `/* */` for multi-line comments. Comments are ignored by the compiler and are used to document code.

```rust
// This is a single-line comment
/*
* This is a multi-line comment
*   that spans multiple lines
*/
let x = 1; // This is an inline comment
```

## Control Flow

Rust provides control flow constructs such as `if`, `else`, `loop`, `while`, and `for` to control the flow of execution in a program.

### `if` Expressions

The `if` expression evaluates a condition and executes a block of code if the condition is true.

```rust
let x = 1;
if x > 0 {
	println!("x is positive");
} else if x < 0 {
	println!("x is negative");
} else {
	println!("x is zero");
}
```

The `if` expression can be used in a let statement to assign a value based on a condition.

```rust
let x = 1;
let y = if x > 0 { 1 } else { -1 };
println!("y = {}", y); // y = 1
```

Rust does not have a concept of "Truthy" like some other languages. The condition in an `if` expression must be a boolean value.

```rust
let x = 1;
if x { // This will not compile
	println!("x is true");
}
```

### `loop` Loops

The `loop` keyword creates an infinite loop that continues until explicitly stopped using the `break` keyword.

```rust
let mut x = 1;
loop {
	x *= 2;
	if x > 100 {
		break;
	}
}
println!("x = {}", x); // x = 128
```

`break` can be used to return a value from a loop.

```rust
let mut x = 1;
let y = loop {
	x *= 2;
	if x > 100 {
		break x - 100;
	}
};
println!("y = {}", y); // y = 28
```

Nested loops can be labeled to break out of a specific loop.

```rust
let condition = true;
'outer: loop {
	'inner: loop {
		if condition {
			break 'outer;
		}
	}
}
```

`continue` can be used to skip the rest of the loop and start the next iteration.

```rust
let mut x = 1;
loop {
	x += 1;
	if x % 2 == 0 {
		continue;
	}
	if x > 10 {
		break;
	}
	println!("{}", x); // Output: 3, 5, 7, 9
}
```

### `while` Loops

The `while` keyword creates a loop that continues as long as a condition is true.

```rust
let mut x = 1;
while x < 100 {
	x *= 2;
}
println!("x = {}", x); // x = 128
```

### `for` Loops

The `for` keyword is used to iterate over a collection of items, such as an array or a range.

```rust
let array = [1, 2, 3];
for element in array {
	println!("{}", element); // Output: 1, 2, 3
}
for i in 0..array.len() {
	println!("{}", i); // Output: 0, 1, 2
}
```

## Concept Check Quiz

<Quiz id="quiz-control-flow-1" title="Concept Check 3.8: if Expressions" :options="[
	'0',
	'1',
	'-1',
	'Does not compile',
]" :answers="['Does not compile']">
  <template #description>

  What is the output of the following code snippet?
  ```rust
  let x = 0;
  let y = if !x { 1 } else { -1 };
  println!("{}", y);
  ```
  </template>
  <template #solution>
  
  **Does not compile**. The code snippet does not compile because the condition in the `if` expression must be a boolean value.
  </template>
</Quiz>

<Quiz id="quiz-control-flow-2" title="Concept Check 3.9: Loops" :options="[
	'True',
	'False',
]" :answers="['False']">
  <template #description>

  True or False: The following code snippet runs an infinite loop.
  ```rust
	let condition = true;
	'outer: loop {
		'inner: loop {
			if condition {
				break 'outer;
			}
		}
	}
  ```
  </template>
  <template #solution>
  
  **False**. The code snippet does not run an infinite loop because the `break 'outer;` statement breaks out of the outer loop when the condition is true.
  </template>
</Quiz>

## Progress on this Page

<QuizProgress
  :ids="['quiz-variables-and-mutability-1', 'quiz-variables-and-mutability-2', 'quiz-variables-and-mutability-3', 'quiz-data-types-1', 'quiz-data-types-2', 'quiz-data-types-3', 'quiz-functions-1', 'quiz-control-flow-1', 'quiz-control-flow-2']"
  :titles="['Concept Check 3.1: Shadowing variables','Concept Check 3.2: Shadowing mutable variables','Concept Check 3.3: Mutable variables', 'Concept Check 3.4: Data Types', 'Concept Check 3.5: Integers', 'Concept Check 3.6: Tuples and Arrays', 'Concept Check 3.7: Functions', 'Concept Check 3.8: if Expressions', 'Concept Check 3.9: Loops']"
  :relativePaths="['3-common-programming-concepts']"
  />

## References

- Read this Chapter on the official Rust book: [Common Programming Concepts - The Rust Programming Language](https://doc.rust-lang.org/book/ch03-00-common-programming-concepts.html)
- Operators and Symbols in Rust: [Operators and Symbols](https://doc.rust-lang.org/book/appendix-02-operators.html)
- Rust has a set of Keywords reserved for the language: [Appendix A: Keywords](https://doc.rust-lang.org/book/appendix-01-keywords.html)
