# Introduction to Rust Book Quizzes

Welcome to the Rust Book Quizzes. Here, you'll find quizzes to test your understanding and summaries to reinforce key concepts for each chapter of the official Rust book. Whether you're new to Rust or seeking deeper insight, this blog series is your guide through the chapters.

## 1. Quizzes

::: warning
This section is under construction.
:::

<Quiz id="sample1" title="Sample Question 1: True or False" :options="['True','False']" :answers="['True']">
  <template #description>

  True or False: The Rust programming language is designed for **performance** and **safety**.
  </template>
  <template #solution>

  **True**. Rust is designed to be a safe and performant systems programming language. It achieves this by enforcing memory safety principles at compile time without the need for a garbage collector.
  </template>
</Quiz>

<Quiz id="sample2" title="Sample Question 2: Multiple Choice" :options="['1','2','3','Does not compile']" :answers="['2']">
	<template #description>

  What is the output of the following code snippet?
  ```rust
  fn main() {
      let x = 1;
      let y = 1;
      let z = x + y;
      println!("{}", z);
  }
  ```
  </template>
	<template #solution>

  **2**. The code snippet compiles and outputs `2`. The variables `x` and `y` are assigned the value `1` and then added together to produce `2`.
  </template>
</Quiz>

<Quiz id="sample3" title="Sample Question 3: Multiple Choice with Multiple Answers" :options="[
  'Rust is a statically typed language.',
  'Rust is a dynamically typed language.',
  'Rust is a compiled language.',
  'Rust is an interpreted language.',
  ]" :answers="[
    'Rust is a statically typed language.',
    'Rust is a compiled language.',
  ]">
  <template #description>

  Which of the following statements are **true**?
  </template>
  <template #solution>

  **Rust is a statically typed language that is compiled.** Statically typed languages require variable types to be known at compile time while dynamically typed languages do not. Compiled languages are translated into machine code before execution while interpreted languages are translated during execution.
  </template>
</Quiz>

## 2. Summaries

::: warning
This section is under construction.
:::

## 3. Acknowledgments

::: warning
This section is under construction.
:::
