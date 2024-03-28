# Getting Started

::: tip 📚 Chapter 1
This Chapter is an introduction to Rust and its ecosystem. It covers installing Rust, writing a simple program, and using Cargo, the Rust package manager and build tool.

**There are no quizzes for this Chapter.**

*You can skip this Chapter if you're already familiar with commands like `rustc` and `cargo`.*
:::

## Installation

`rustup` is a command line tool for managing Rust versions and associated tools.

#### Installing rustup on Linux or macOS

```bash
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```

#### Installing C compiler on macOS (if needed)

```bash
xcode-select --install
```

#### Installing C compiler on Ubuntu (if needed)

```bash
sudo apt-get update
sudo apt-get install build-essential
```

#### Installing rustup on Windows

Follow the instructions on the [Rust website](https://www.rust-lang.org/tools/install).

#### Verifying Rust Installation

```bash
rustc --version
```

#### Updating Rust

```bash
rustup update
```

#### Uninstalling Rust

```bash
rustup self uninstall
```

#### Local Documentation

```bash
rustup doc
```

## Hello, World!

#### Creating a Project

```bash
mkdir hello_world
cd hello_world
```

#### Writing a Rust program

```bash
touch main.rs
```

```rust
// Filename: main.rs
fn main() {
	println!("Hello, world!");
}
```

#### Compiling the program

```bash
rustc main.rs
```

#### Running the program

```bash
./main # or .\main.exe on Windows
```

## Hello, Cargo!

Cargo is the official Rust package manager and build tool. It should have been installed with `rustup`.

#### Verifying Cargo installation

```bash
cargo --version
```

#### Creating a new project with Cargo

```bash
cargo new hello_cargo
cd hello_cargo
```

#### Configuring a Cargo project

Cargo uses a `Cargo.toml` file to store configuration details.

::: details `Cargo.toml`
```toml
# Filename: Cargo.toml
[package]
name = "hello_cargo"
version = "0.1.0"
edition = "2021"
# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html
[dependencies]
```
:::

#### Running a Cargo project

```bash
cargo run
```

#### Running and watching for changes in a Cargo project

```bash
cargo install cargo-watch
cargo watch -x run
```

See more about [cargo-watch](https://crates.io/crates/cargo-watch).

#### Building a Cargo project

```bash
cargo build
```

`cargo build` compiles the project and stores the executable in the `target/debug` directory.

#### Checking compiling errors in a Cargo project

```bash
cargo check
```

`cargo check` checks the project for compiling errors without producing an executable. It's faster than `cargo build`.

#### Building a Cargo project for release

```bash
cargo build --release
```

`cargo build --release` compiles the project with optimizations and stores the executable in the `target/release` directory.

## References

- Read this Chapter on the official Rust book: [Getting Started - The Rust Programming Language](https://doc.rust-lang.org/book/ch01-00-getting-started.html)
