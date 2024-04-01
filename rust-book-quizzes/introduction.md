# Introduction to Rust Book Quizzes

Welcome to the Rust Book Quizzes. Here, you'll find quizzes to test your understanding and summaries to reinforce key concepts for each chapter of the official Rust book. Whether you're new to Rust or seeking deeper insight, this blog series is your guide through the chapters.

## How to Use the Quizzes?

Quizzes can be found throughout each chapter. After submitting, you'll see `✅ Correct answer` or `❗ Incorrect answer` displayed next to the "Submit" button to indicate whether your answers were entirely correct. Also, the correct options will be highlighted in green, and the selected incorrect options will be highlighted in red. Additionally, you can view the solution to each quiz by clicking the "Show solution" button.

Here are some sample quizzes to get you familiar with the interface:

<Quiz id="quiz-sample1" title="Sample Question 1: True or False" :options="['True','False']" :answers="['True']">
  <template #description>

  True or False: The Rust programming language is designed for **performance** and **safety**.
  </template>
  <template #solution>

  **True**. Rust is designed to be a safe and performant systems programming language. It achieves this by enforcing memory safety principles at compile time without the need for a garbage collector.
  </template>
</Quiz>

<Quiz id="quiz-sample2" title="Sample Question 2: Multiple Choice" :options="['1','2','3','Does not compile']" :answers="['2']">
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

<Quiz id="quiz-sample3" title="Sample Question 3: Multiple Choice with Multiple Answers" :options="[
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

## Progress on this Page

To help you track your progress, each chapter contains a "Progress on this Page" section that displays the submission status of the quizzes on that page.

The progress of the entire Rust book quizzes can be viewed on the [Progress](/rust-book-quizzes/progress) page.

<QuizProgress
  :ids="['quiz-sample1','quiz-sample2','quiz-sample3']"
  :titles="['Sample Question 1: True or False','Sample Question 2: Multiple Choice','Sample Question 3: Multiple Choice with Multiple Answers']"
  :relativePaths="['introduction']"
  />

## Do I Need to Create an Account?

No, submissions are stored in your browser's [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), so you can freely test your knowledge without any privacy concerns. However, please note that your submissions will be lost if you clear your browser's local storage.

## Acknowledgments

The Rust Book Quizzes, inspired by the [Experiment: Improving the Rust Book](https://rust-book.cs.brown.edu), provide interactive quizzes for the [official Rust book](https://doc.rust-lang.org/book/). The quizzes are created using [Vue.js](https://vuejs.org) and [VitePress](https://vitepress.dev) and are hosted on [GitHub Pages](https://pages.github.com).