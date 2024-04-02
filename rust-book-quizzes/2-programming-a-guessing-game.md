# Programming a Guessing Game

::: tip 📚 Chapter 2
This Chapter aims to showcase common Rust concepts by building a simple guessing game in the Command-Line Interface (CLI). The game generates a random number between 1 and 100, and the player has to guess the number.

**There are no quizzes for this Chapter.**

*You can skip this Chapter if you want to directly jump to the details of Rust Programming Language.*
:::

## The Completed Cargo Project with Comments

```toml
# Filename: Cargo.toml
[package]
name = "guessing_game"
version = "0.1.0"
edition = "2021"

# [dependencies] section is where you can specify 
#   external crates (libraries) that your project depends on. You can
#   think of crates as packages or libraries in other languages.
#   Crates can be found on https://crates.io
[dependencies]
# The rand crate provides functions to generate random numbers.
#   See details on https://crates.io/crates/rand
rand = "0.8.5"
```

```rust
// Filename: src/main.rs
use rand::Rng;
use std::cmp::Ordering;
use std::io;

fn main() {
	// println! is a macro that prints a string to the screen. 
	//   See https://doc.rust-lang.org/book/ch19-06-macros.html
    println!("Guess the number!");

	// Generate a random number between 1 and 100.
	// The `let` keyword is used to create an immutable variable.
	// The :: syntax is a namespace separator. 
	//   `rand::thread_rng` is a path to the thread_rng function. 
	//   See https://doc.rust-lang.org/reference/paths.html
	// The . syntax is used to call a method on an instance. 
	//   In this case, `rand::thread_rng()` returns an instance of the 
	//   random number generator, and `gen_range` is a method on that instance.
	// The 1..=100 is an inclusive range expression.
    let secret_number = rand::thread_rng().gen_range(1..=100);

	// `loop` is a keyword that creates an infinite loop, 
	//   like `while(true)` in other languages. You can use `break` to 
	//   exit the loop, `continue` to skip the rest of the loop 
	//   and start the next iteration.
    loop {
        println!("Please input your guess.");

		// The `let mut` syntax creates a mutable variable.
        let mut guess = String::new();

		// Read user input from the console.
		//   `&mut guess` is a mutable reference to the guess variable.
		//   You will learn more about references in 
		//   Chapter 4.2: References and Borrowing
        io::stdin()
            .read_line(&mut guess)
            .expect("Failed to read line");

		// Convert user input from a string to a number.
		//   The `match` keyword is used to handle different cases of a value.
		//   `guess.trim().parse()` returns a Result enum,
		//   which can be `Ok(num)` or `Err(_)`. You will learn more about
		//   error handling in Chapter 9: Error Handling.
        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };

		// {} is a placeholder for the value of the variable.
        println!("You guessed: {guess}");

		// Compare the user's guess with the secret number.
		//   `guess.cmp(&secret_number)` returns an Ordering enum.
		//   `&secret_number` is a immutable reference to the 
		//    secret_number variable.
        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Too small!"),
            Ordering::Greater => println!("Too big!"),
            Ordering::Equal => {
                println!("You win!");
                break;
            }
        }
    }
}
```

## Progress on this Page

There are no quizzes for this chapter.

## References

- Read this Chapter on the official Rust book: [Programming a Guessing Game - The Rust Programming Language](https://doc.rust-lang.org/book/ch02-00-guessing-game-tutorial.html)
