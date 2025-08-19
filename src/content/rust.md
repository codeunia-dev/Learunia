# Rust Programming Cheatsheet

## Getting Started

### Installation
```bash
# Install Rust via rustup
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Add to PATH
source ~/.cargo/env

# Check installation
rustc --version
cargo --version

# Update Rust
rustup update

# Install specific toolchain
rustup install stable
rustup install nightly
rustup default stable
```

### Hello World
```rust
// main.rs
fn main() {
    println!("Hello, World!");
}

// Compile and run
// rustc main.rs && ./main
// or
// cargo run (in a Cargo project)
```

### Cargo Project
```bash
# Create new project
cargo new my_project
cd my_project

# Create library
cargo new --lib my_library

# Build project
cargo build           # Debug build
cargo build --release # Release build

# Run project
cargo run

# Test project
cargo test

# Check syntax without building
cargo check

# Format code
cargo fmt

# Lint code
cargo clippy
```

## Basic Syntax

### Variables and Mutability
```rust
fn main() {
    // Immutable by default
    let x = 5;
    // x = 6; // Error: cannot assign twice to immutable variable

    // Mutable variables
    let mut y = 5;
    y = 6; // OK

    // Constants
    const MAX_POINTS: u32 = 100_000;

    // Shadowing
    let x = 5;
    let x = x + 1;        // x is now 6
    let x = x * 2;        // x is now 12
    let x = "hello";      // x is now a string (different type)

    println!("x: {}, y: {}, MAX_POINTS: {}", x, y, MAX_POINTS);
}
```

### Data Types
```rust
fn main() {
    // Integer types
    let a: i8 = -128;      // 8-bit signed
    let b: u8 = 255;       // 8-bit unsigned
    let c: i32 = -2147483648; // 32-bit signed (default)
    let d: u32 = 4294967295;  // 32-bit unsigned
    let e: i64 = 9223372036854775807; // 64-bit signed
    let f: u64 = 18446744073709551615; // 64-bit unsigned
    let g: isize = -9223372036854775808; // pointer-sized signed
    let h: usize = 18446744073709551615; // pointer-sized unsigned

    // Floating point
    let float1: f32 = 3.0;  // 32-bit float
    let float2: f64 = 3.0;  // 64-bit float (default)

    // Boolean
    let is_true: bool = true;
    let is_false: bool = false;

    // Character (Unicode scalar)
    let letter: char = 'A';
    let emoji: char = '😀';
    let chinese: char = '中';

    // String types
    let string_literal: &str = "Hello";        // String slice
    let owned_string: String = String::from("Hello"); // Owned string

    // Arrays (fixed size)
    let array: [i32; 5] = [1, 2, 3, 4, 5];
    let zeros: [i32; 3] = [0; 3];              // [0, 0, 0]

    // Tuples
    let tuple: (i32, f64, char) = (42, 3.14, 'A');
    let (x, y, z) = tuple;                     // Destructuring
    let first = tuple.0;                       // Access by index

    println!("Array: {:?}, Tuple: {:?}", array, tuple);
}
```

## Ownership and Borrowing

### Ownership Rules
```rust
fn main() {
    // 1. Each value has an owner
    let s = String::from("hello");  // s owns the string

    // 2. There can only be one owner at a time
    let s2 = s;  // s is moved to s2, s is no longer valid
    // println!("{}", s); // Error: borrow of moved value

    // 3. When owner goes out of scope, value is dropped
    {
        let temp = String::from("temporary");
    } // temp is dropped here

    // Clone for deep copy
    let s3 = s2.clone();
    println!("s2: {}, s3: {}", s2, s3); // Both are valid

    // Copy trait types (integers, floats, bools, chars)
    let x = 5;
    let y = x;  // x is copied, not moved
    println!("x: {}, y: {}", x, y); // Both are valid
}

fn takes_ownership(some_string: String) {
    println!("{}", some_string);
} // some_string is dropped here

fn makes_copy(some_integer: i32) {
    println!("{}", some_integer);
} // some_integer goes out of scope, but nothing special happens
```

### References and Borrowing
```rust
fn main() {
    let s1 = String::from("hello");

    // Immutable reference (borrowing)
    let len = calculate_length(&s1);
    println!("Length of '{}' is {}.", s1, len);

    // Mutable reference
    let mut s2 = String::from("hello");
    change(&mut s2);
    println!("Changed string: {}", s2);

    // Multiple immutable references are OK
    let r1 = &s1;
    let r2 = &s1;
    println!("r1: {}, r2: {}", r1, r2);

    // But can't have mutable and immutable references at same time
    let mut s3 = String::from("hello");
    let r3 = &s3;
    // let r4 = &mut s3; // Error: cannot borrow as mutable
    println!("r3: {}", r3);

    // This is OK - references' scope ends
    let r5 = &mut s3;
    println!("r5: {}", r5);
}

fn calculate_length(s: &String) -> usize {
    s.len()
} // s goes out of scope, but doesn't drop the value (just a reference)

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}

// Returning references
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

### Slices
```rust
fn main() {
    let s = String::from("hello world");

    // String slices
    let hello = &s[0..5];   // "hello"
    let world = &s[6..11];  // "world"
    let hello2 = &s[..5];   // "hello" (start from beginning)
    let world2 = &s[6..];   // "world" (go to end)
    let whole = &s[..];     // "hello world" (entire string)

    println!("{}, {}", hello, world);

    // Array slices
    let a = [1, 2, 3, 4, 5];
    let slice = &a[1..4];   // [2, 3, 4]
    println!("Array slice: {:?}", slice);

    // Finding first word
    let word = first_word(&s);
    println!("First word: {}", word);
}

fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }

    &s[..]
}
```

## Control Flow

### if Expressions
```rust
fn main() {
    let number = 6;

    // Basic if
    if number < 5 {
        println!("condition was true");
    } else {
        println!("condition was false");
    }

    // else if
    if number % 4 == 0 {
        println!("number is divisible by 4");
    } else if number % 3 == 0 {
        println!("number is divisible by 3");
    } else if number % 2 == 0 {
        println!("number is divisible by 2");
    } else {
        println!("number is not divisible by 4, 3, or 2");
    }

    // if as expression
    let condition = true;
    let number = if condition { 5 } else { 6 };
    println!("The value of number is: {}", number);

    // if let
    let some_value = Some(3);
    if let Some(x) = some_value {
        println!("Got a value: {}", x);
    }
}
```

### Loops
```rust
fn main() {
    // Infinite loop
    let mut counter = 0;
    let result = loop {
        counter += 1;
        if counter == 10 {
            break counter * 2;  // Return value from loop
        }
    };
    println!("Result: {}", result);

    // While loop
    let mut number = 3;
    while number != 0 {
        println!("{}!", number);
        number -= 1;
    }
    println!("LIFTOFF!!!");

    // For loop with range
    for number in (1..4).rev() {
        println!("{}!", number);
    }
    println!("LIFTOFF!!!");

    // For loop with collection
    let a = [10, 20, 30, 40, 50];
    for element in a {
        println!("The value is: {}", element);
    }

    // For loop with index
    for (index, value) in a.iter().enumerate() {
        println!("Index: {}, Value: {}", index, value);
    }

    // While let
    let mut stack = Vec::new();
    stack.push(1);
    stack.push(2);
    stack.push(3);

    while let Some(top) = stack.pop() {
        println!("Popped: {}", top);
    }

    // Loop labels
    'outer: for i in 0..3 {
        for j in 0..3 {
            if i == 1 && j == 1 {
                break 'outer;
            }
            println!("i: {}, j: {}", i, j);
        }
    }
}
```

### Match Expression
```rust
enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter(String), // Quarter with state
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => {
            println!("Lucky penny!");
            1
        }
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter(state) => {
            println!("State quarter from {}!", state);
            25
        }
    }
}

fn main() {
    let coin = Coin::Quarter(String::from("Alaska"));
    println!("Value: {} cents", value_in_cents(coin));

    // Match with Option
    let x: Option<i32> = Some(5);
    let y: Option<i32> = None;

    match x {
        None => println!("Nothing"),
        Some(i) => println!("Got: {}", i),
    }

    // Match with ranges
    let x = 5;
    match x {
        1..=5 => println!("one through five"),
        6..=10 => println!("six through ten"),
        _ => println!("something else"),
    }

    // Match guards
    let num = Some(4);
    match num {
        Some(x) if x < 5 => println!("less than five: {}", x),
        Some(x) => println!("{}", x),
        None => (),
    }

    // Destructuring
    let point = (3, 5);
    match point {
        (0, y) => println!("On the y axis at {}", y),
        (x, 0) => println!("On the x axis at {}", x),
        (x, y) => println!("On neither axis: ({}, {})", x, y),
    }
}
```

## Functions

### Basic Functions
```rust
fn main() {
    println!("Hello, world!");

    another_function(5);
    print_labeled_measurement(5, 'h');

    let x = five();
    println!("The value of x is: {}", x);

    let y = plus_one(5);
    println!("The value of y is: {}", y);
}

fn another_function(x: i32) {
    println!("The value of x is: {}", x);
}

fn print_labeled_measurement(value: i32, unit_label: char) {
    println!("The measurement is: {}{}", value, unit_label);
}

// Function with return value
fn five() -> i32 {
    5  // No semicolon = expression (returned)
}

fn plus_one(x: i32) -> i32 {
    x + 1
}

// Multiple return values with tuple
fn calculate(x: i32, y: i32) -> (i32, i32, i32) {
    (x + y, x - y, x * y)
}

// Early return
fn divide(dividend: f64, divisor: f64) -> Option<f64> {
    if divisor == 0.0 {
        return None;
    }
    Some(dividend / divisor)
}
```

### Closures
```rust
fn main() {
    // Basic closure
    let add_one = |x: i32| -> i32 { x + 1 };
    println!("Result: {}", add_one(5));

    // Type inference
    let add_two = |x| x + 2;
    println!("Result: {}", add_two(5));

    // Capturing environment
    let x = 4;
    let equal_to_x = |z| z == x;
    println!("Equal: {}", equal_to_x(4));

    // Moving ownership into closure
    let x = vec![1, 2, 3];
    let equal_to_x = move |z| z == x;
    // println!("{:?}", x); // Error: x moved into closure

    // Using closures with iterators
    let v1: Vec<i32> = vec![1, 2, 3];
    let v2: Vec<_> = v1.iter().map(|x| x + 1).collect();
    println!("Mapped: {:?}", v2);

    // Closures as function parameters
    let numbers = vec![1, 2, 3, 4, 5];
    let even_numbers: Vec<_> = numbers.into_iter().filter(|&x| x % 2 == 0).collect();
    println!("Even numbers: {:?}", even_numbers);

    // Storing closures
    let mut expensive_closure = |num: u32| -> u32 {
        println!("calculating slowly...");
        std::thread::sleep(std::time::Duration::from_secs(2));
        num
    };

    println!("Result: {}", expensive_closure(5));
}

// Function that takes a closure
fn simulated_expensive_calculation<F>(intensity: u32, random_number: u32, f: F) -> u32
where
    F: Fn(u32) -> u32,
{
    if intensity < 25 {
        f(intensity)
    } else {
        if random_number == 3 {
            f(intensity)
        } else {
            intensity
        }
    }
}
```

## Structs and Enums

### Structs
```rust
// Basic struct
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

// Tuple structs
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

// Unit-like structs
struct AlwaysEqual;

impl User {
    // Associated function (like static method)
    fn new(email: String, username: String) -> User {
        User {
            email,
            username,
            active: true,
            sign_in_count: 1,
        }
    }

    // Method
    fn is_active(&self) -> bool {
        self.active
    }

    // Mutable method
    fn deactivate(&mut self) {
        self.active = false;
    }

    // Method that takes ownership
    fn into_username(self) -> String {
        self.username
    }
}

fn main() {
    // Creating instances
    let user1 = User {
        email: String::from("someone@example.com"),
        username: String::from("someusername123"),
        active: true,
        sign_in_count: 1,
    };

    // Mutable instance
    let mut user2 = User {
        email: String::from("another@example.com"),
        username: String::from("anotherusername456"),
        active: true,
        sign_in_count: 1,
    };
    user2.email = String::from("anotheremail@example.com");

    // Struct update syntax
    let user3 = User {
        email: String::from("yet_another@example.com"),
        ..user1  // Use remaining fields from user1
    };

    // Using associated function
    let user4 = User::new(
        String::from("test@example.com"),
        String::from("testuser"),
    );

    // Using methods
    println!("User is active: {}", user4.is_active());

    // Tuple structs
    let black = Color(0, 0, 0);
    let origin = Point(0, 0, 0);

    // Unit-like struct
    let subject = AlwaysEqual;

    println!("User: {}, Email: {}", user4.username, user4.email);
}

// Struct with lifetime parameters
struct ImportantExcerpt<'a> {
    part: &'a str,
}

impl<'a> ImportantExcerpt<'a> {
    fn level(&self) -> i32 {
        3
    }

    fn announce_and_return_part(&self, announcement: &str) -> &str {
        println!("Attention please: {}", announcement);
        self.part
    }
}
```

### Enums
```rust
// Basic enum
enum IpAddrKind {
    V4,
    V6,
}

// Enum with data
enum IpAddr {
    V4(u8, u8, u8, u8),
    V6(String),
}

// Enum with different types
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

impl Message {
    fn call(&self) {
        match self {
            Message::Quit => println!("Quit"),
            Message::Move { x, y } => println!("Move to ({}, {})", x, y),
            Message::Write(text) => println!("Write: {}", text),
            Message::ChangeColor(r, g, b) => println!("Change color to ({}, {}, {})", r, g, b),
        }
    }
}

fn main() {
    // Using enums
    let home = IpAddr::V4(127, 0, 0, 1);
    let loopback = IpAddr::V6(String::from("::1"));

    // Using Option<T>
    let some_number = Some(5);
    let some_string = Some("a string");
    let absent_number: Option<i32> = None;

    // Pattern matching with Option
    let x: Option<i32> = Some(5);
    let y: Option<i32> = None;

    match x {
        None => println!("Got nothing"),
        Some(i) => println!("Got: {}", i),
    }

    // Using if let
    if let Some(value) = x {
        println!("Got value: {}", value);
    }

    // Using Result<T, E>
    let result: Result<i32, &str> = Ok(42);
    let error: Result<i32, &str> = Err("Something went wrong");

    match result {
        Ok(value) => println!("Success: {}", value),
        Err(error) => println!("Error: {}", error),
    }

    // Using messages
    let m = Message::Write(String::from("hello"));
    m.call();

    let m2 = Message::Move { x: 10, y: 20 };
    m2.call();
}

// Custom Result type
type MyResult<T> = Result<T, MyError>;

#[derive(Debug)]
enum MyError {
    IoError,
    ParseError,
    NetworkError,
}
```

## Collections

### Vectors
```rust
fn main() {
    // Creating vectors
    let v: Vec<i32> = Vec::new();
    let mut v2 = vec![1, 2, 3];

    // Adding elements
    v2.push(4);
    v2.push(5);

    // Accessing elements
    let third: &i32 = &v2[2];  // Panics if index out of bounds
    println!("Third element: {}", third);

    let third: Option<&i32> = v2.get(2);  // Returns None if out of bounds
    match third {
        Some(value) => println!("Third element: {}", value),
        None => println!("No third element"),
    }

    // Iterating over vector
    for i in &v2 {
        println!("{}", i);
    }

    // Mutable iteration
    for i in &mut v2 {
        *i += 50;
    }

    // Vector of different types using enum
    enum SpreadsheetCell {
        Int(i32),
        Float(f64),
        Text(String),
    }

    let row = vec![
        SpreadsheetCell::Int(3),
        SpreadsheetCell::Text(String::from("blue")),
        SpreadsheetCell::Float(10.12),
    ];

    // Vector methods
    let mut v3 = vec![1, 2, 3, 4, 5];
    println!("Length: {}", v3.len());
    println!("Is empty: {}", v3.is_empty());
    println!("Capacity: {}", v3.capacity());

    v3.pop();  // Remove last element
    v3.insert(1, 10);  // Insert at index
    v3.remove(0);  // Remove at index

    println!("Vector: {:?}", v3);
}
```

### Hash Maps
```rust
use std::collections::HashMap;

fn main() {
    // Creating hash maps
    let mut scores = HashMap::new();
    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);

    // From vectors
    let teams = vec![String::from("Blue"), String::from("Yellow")];
    let initial_scores = vec![10, 50];
    let scores2: HashMap<_, _> = teams.into_iter()
        .zip(initial_scores.into_iter())
        .collect();

    // Accessing values
    let team_name = String::from("Blue");
    let score = scores.get(&team_name);
    match score {
        Some(s) => println!("Score: {}", s),
        None => println!("Team not found"),
    }

    // Iterating
    for (key, value) in &scores {
        println!("{}: {}", key, value);
    }

    // Updating
    scores.insert(String::from("Blue"), 25);  // Overwrite

    // Insert if key doesn't exist
    scores.entry(String::from("Red")).or_insert(0);
    scores.entry(String::from("Blue")).or_insert(0);  // Won't overwrite

    // Update based on old value
    let text = "hello world wonderful world";
    let mut map = HashMap::new();

    for word in text.split_whitespace() {
        let count = map.entry(word).or_insert(0);
        *count += 1;
    }

    println!("{:?}", map);

    // Other useful methods
    println!("Contains key 'Blue': {}", scores.contains_key("Blue"));
    println!("Length: {}", scores.len());
    scores.remove("Red");
    scores.clear();
}
```

### Strings
```rust
fn main() {
    // Creating strings
    let mut s = String::new();
    let s2 = "initial contents".to_string();
    let s3 = String::from("initial contents");

    // Updating strings
    s.push_str("hello");
    s.push(' ');
    s.push_str("world");

    let s4 = s2 + &s3;  // s2 is moved, s3 is borrowed

    // Concatenation with format!
    let s5 = format!("{}-{}-{}", s3, s4, s);

    // String slicing (be careful with UTF-8)
    let hello = "Здравствуйте";
    let s = &hello[0..4];  // First 4 bytes (not characters!)

    // Iterating over strings
    for c in "नमस्ते".chars() {
        println!("{}", c);
    }

    for b in "नमस्ते".bytes() {
        println!("{}", b);
    }

    // String methods
    let s = String::from("  hello world  ");
    println!("Original: '{}'", s);
    println!("Trimmed: '{}'", s.trim());
    println!("Uppercase: '{}'", s.to_uppercase());
    println!("Lowercase: '{}'", s.to_lowercase());
    println!("Starts with 'hello': {}", s.trim().starts_with("hello"));
    println!("Contains 'world': {}", s.contains("world"));

    // Splitting
    let data = "apple,banana,orange";
    let fruits: Vec<&str> = data.split(',').collect();
    println!("Fruits: {:?}", fruits);

    // Replace
    let s = "hello world";
    let new_s = s.replace("world", "Rust");
    println!("Replaced: {}", new_s);
}
```

## Error Handling

### panic! and unwrap
```rust
fn main() {
    // Explicit panic
    // panic!("crash and burn");

    // Panic from library code
    let v = vec![1, 2, 3];
    // v[99]; // This will panic

    // unwrap - panics on error
    let f = std::fs::File::open("hello.txt");
    // let f = f.unwrap(); // Panics if file doesn't exist

    // expect - panic with custom message
    // let f = std::fs::File::open("hello.txt")
    //     .expect("Failed to open hello.txt");
}
```

### Result<T, E>
```rust
use std::fs::File;
use std::io::ErrorKind;
use std::io::{self, Read};

fn main() {
    // Basic Result handling
    let f = File::open("hello.txt");
    let f = match f {
        Ok(file) => file,
        Err(error) => match error.kind() {
            ErrorKind::NotFound => match File::create("hello.txt") {
                Ok(fc) => fc,
                Err(e) => panic!("Problem creating file: {:?}", e),
            },
            other_error => {
                panic!("Problem opening file: {:?}", other_error)
            }
        },
    };

    // Using unwrap_or_else
    let f = File::open("hello.txt").unwrap_or_else(|error| {
        if error.kind() == ErrorKind::NotFound {
            File::create("hello.txt").unwrap_or_else(|error| {
                panic!("Problem creating file: {:?}", error);
            })
        } else {
            panic!("Problem opening file: {:?}", error);
        }
    });

    // Propagating errors with ?
    fn read_username_from_file() -> Result<String, io::Error> {
        let mut f = File::open("hello.txt")?;
        let mut s = String::new();
        f.read_to_string(&mut s)?;
        Ok(s)
    }

    // Even shorter
    fn read_username_from_file_short() -> Result<String, io::Error> {
        let mut s = String::new();
        File::open("hello.txt")?.read_to_string(&mut s)?;
        Ok(s)
    }

    // Shortest (using fs::read_to_string)
    fn read_username_from_file_shortest() -> Result<String, io::Error> {
        std::fs::read_to_string("hello.txt")
    }

    // Using the functions
    match read_username_from_file() {
        Ok(username) => println!("Username: {}", username),
        Err(e) => println!("Error reading file: {}", e),
    }

    // Custom error types
    #[derive(Debug)]
    enum MyError {
        IoError(io::Error),
        ParseError,
    }

    impl From<io::Error> for MyError {
        fn from(error: io::Error) -> Self {
            MyError::IoError(error)
        }
    }

    fn my_function() -> Result<i32, MyError> {
        let content = std::fs::read_to_string("number.txt")?;
        let number: i32 = content.trim().parse().map_err(|_| MyError::ParseError)?;
        Ok(number)
    }
}
```

## Generics and Traits

### Generics
```rust
// Generic function
fn largest<T: PartialOrd + Copy>(list: &[T]) -> T {
    let mut largest = list[0];
    for &item in list {
        if item > largest {
            largest = item;
        }
    }
    largest
}

// Generic struct
struct Point<T> {
    x: T,
    y: T,
}

impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }

    fn new(x: T, y: T) -> Self {
        Point { x, y }
    }
}

// Multiple generic types
struct Point2<T, U> {
    x: T,
    y: U,
}

impl<T, U> Point2<T, U> {
    fn mixup<V, W>(self, other: Point2<V, W>) -> Point2<T, W> {
        Point2 {
            x: self.x,
            y: other.y,
        }
    }
}

// Generic enum
enum Option<T> {
    Some(T),
    None,
}

enum Result<T, E> {
    Ok(T),
    Err(E),
}

fn main() {
    // Using generic function
    let number_list = vec![34, 50, 25, 100, 65];
    let result = largest(&number_list);
    println!("The largest number is {}", result);

    let char_list = vec!['y', 'm', 'a', 'q'];
    let result = largest(&char_list);
    println!("The largest char is {}", result);

    // Using generic struct
    let integer = Point::new(5, 10);
    let float = Point::new(1.0, 4.0);

    println!("integer.x = {}", integer.x());

    // Multiple generic types
    let p1 = Point2 { x: 5, y: 10.4 };
    let p2 = Point2 { x: "Hello", y: 'c' };
    let p3 = p1.mixup(p2);
    println!("p3.x = {}, p3.y = {}", p3.x, p3.y);
}
```

### Traits
```rust
// Defining a trait
trait Summary {
    fn summarize(&self) -> String;

    // Default implementation
    fn author(&self) -> String {
        String::from("Unknown")
    }

    // Default implementation using other methods
    fn summarize_with_author(&self) -> String {
        format!("(Read more from {}...)", self.author())
    }
}

struct NewsArticle {
    pub headline: String,
    pub location: String,
    pub author: String,
    pub content: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{}, by {} ({})", self.headline, self.author, self.location)
    }

    fn author(&self) -> String {
        format!("@{}", self.author)
    }
}

struct Tweet {
    pub username: String,
    pub content: String,
    pub reply: bool,
    pub retweet: bool,
}

impl Summary for Tweet {
    fn summarize(&self) -> String {
        format!("{}: {}", self.username, self.content)
    }
}

// Trait as parameter
fn notify(item: &impl Summary) {
    println!("Breaking news! {}", item.summarize());
}

// Trait bound syntax
fn notify2<T: Summary>(item: &T) {
    println!("Breaking news! {}", item.summarize());
}

// Multiple trait bounds
fn notify3<T: Summary + std::fmt::Display>(item: &T) {
    println!("Breaking news! {}", item.summarize());
}

// Where clauses for complex bounds
fn some_function<T, U>(t: &T, u: &U) -> i32
where
    T: std::fmt::Display + Clone,
    U: Clone + std::fmt::Debug,
{
    // function body
    0
}

// Returning types that implement traits
fn returns_summarizable() -> impl Summary {
    Tweet {
        username: String::from("horse_ebooks"),
        content: String::from("of course, as you probably already know, people"),
        reply: false,
        retweet: false,
    }
}

// Conditionally implement methods
struct Pair<T> {
    x: T,
    y: T,
}

impl<T> Pair<T> {
    fn new(x: T, y: T) -> Self {
        Self { x, y }
    }
}

impl<T: std::fmt::Display + PartialOrd> Pair<T> {
    fn cmp_display(&self) {
        if self.x >= self.y {
            println!("The largest member is x = {}", self.x);
        } else {
            println!("The largest member is y = {}", self.y);
        }
    }
}

fn main() {
    let tweet = Tweet {
        username: String::from("horse_ebooks"),
        content: String::from("of course, as you probably already know, people"),
        reply: false,
        retweet: false,
    };

    println!("1 new tweet: {}", tweet.summarize());

    let article = NewsArticle {
        headline: String::from("Penguins win the Stanley Cup Championship!"),
        location: String::from("Pittsburgh, PA, USA"),
        author: String::from("Iceburgh"),
        content: String::from("The Pittsburgh Penguins once again are the best hockey team in the NHL."),
    };

    println!("New article available! {}", article.summarize());
    println!("Author: {}", article.author());

    notify(&tweet);
    notify(&article);
}

// Deriving common traits
#[derive(Debug, Clone, PartialEq)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}
```

## Modules and Packages

### Modules
```rust
// src/lib.rs or src/main.rs
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
        fn seat_at_table() {}
    }

    mod serving {
        fn take_order() {}
        fn serve_order() {}
        fn take_payment() {}
    }
}

pub fn eat_at_restaurant() {
    // Absolute path
    crate::front_of_house::hosting::add_to_waitlist();

    // Relative path
    front_of_house::hosting::add_to_waitlist();
}

// Using use to bring paths into scope
use crate::front_of_house::hosting;

pub fn eat_at_restaurant2() {
    hosting::add_to_waitlist();
}

// Use with as for aliases
use std::fmt::Result;
use std::io::Result as IoResult;

// Re-exporting with pub use
pub use crate::front_of_house::hosting;

// Using external packages
use rand::Rng;
use std::collections::HashMap;

// Nested paths
use std::{cmp::Ordering, io};
use std::io::{self, Write};

// Glob operator
use std::collections::*;

fn main() {
    eat_at_restaurant();

    // Using random number generator
    let secret_number = rand::thread_rng().gen_range(1..101);
    println!("Secret number: {}", secret_number);

    // Using HashMap
    let mut map = HashMap::new();
    map.insert(1, 2);
}
```

### Separating Modules into Files
```rust
// src/lib.rs
mod front_of_house;

pub use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
}

// src/front_of_house.rs
pub mod hosting {
    pub fn add_to_waitlist() {}
}

// Alternative: src/front_of_house/mod.rs
pub mod hosting;

// src/front_of_house/hosting.rs
pub fn add_to_waitlist() {}
```

## Testing

### Writing Tests
```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }

    #[test]
    fn exploration() {
        assert_eq!(2 + 2, 4);
    }

    #[test]
    #[should_panic]
    fn another() {
        panic!("Make this test fail");
    }

    #[test]
    #[should_panic(expected = "Guess value must be less than or equal to 100")]
    fn greater_than_100() {
        Guess::new(200);
    }

    #[test]
    fn it_works_with_result() -> Result<(), String> {
        if 2 + 2 == 4 {
            Ok(())
        } else {
            Err(String::from("two plus two does not equal four"))
        }
    }

    #[test]
    #[ignore]
    fn expensive_test() {
        // code that takes an hour to run
    }
}

pub struct Guess {
    value: i32,
}

impl Guess {
    pub fn new(value: i32) -> Guess {
        if value < 1 {
            panic!("Guess value must be greater than or equal to 1, got {}.", value);
        } else if value > 100 {
            panic!("Guess value must be less than or equal to 100, got {}.", value);
        }

        Guess { value }
    }
}

pub fn add_two(a: i32) -> i32 {
    a + 2
}

pub fn greeting(name: &str) -> String {
    format!("Hello {}!", name)
}

pub struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    pub fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

#[cfg(test)]
mod rectangle_tests {
    use super::*;

    #[test]
    fn larger_can_hold_smaller() {
        let larger = Rectangle {
            width: 8,
            height: 7,
        };
        let smaller = Rectangle {
            width: 5,
            height: 1,
        };

        assert!(larger.can_hold(&smaller));
    }

    #[test]
    fn smaller_cannot_hold_larger() {
        let larger = Rectangle {
            width: 8,
            height: 7,
        };
        let smaller = Rectangle {
            width: 5,
            height: 1,
        };

        assert!(!smaller.can_hold(&larger));
    }

    #[test]
    fn it_adds_two() {
        assert_eq!(4, add_two(2));
    }

    #[test]
    fn greeting_contains_name() {
        let result = greeting("Carol");
        assert!(
            result.contains("Carol"),
            "Greeting did not contain name, value was `{}`",
            result
        );
    }
}

// Running tests
// cargo test
// cargo test -- --help
// cargo test -- --test-threads=1
// cargo test -- --show-output
// cargo test one_hundred
// cargo test -- --ignored
```

### Integration Tests
```rust
// tests/integration_test.rs
use adder;

#[test]
fn it_adds_two() {
    assert_eq!(4, adder::add_two(2));
}

// tests/common/mod.rs (helper module)
pub fn setup() {
    // setup code specific to your library's tests would go here
}

// tests/integration_test.rs (using helper)
use adder;

mod common;

#[test]
fn it_adds_two() {
    common::setup();
    assert_eq!(4, adder::add_two(2));
}
```

## Best Practices

### Performance Tips
1. **Use references instead of owned values** when possible
2. **Prefer iterators over for loops** for functional style
3. **Use `Vec::with_capacity()`** when you know the size
4. **Avoid unnecessary cloning** with `Cow` or borrowing
5. **Use `&str` instead of `String`** for parameters
6. **Profile your code** with tools like `cargo flamegraph`
7. **Use release builds** for performance testing
8. **Consider using `Box`, `Rc`, or `Arc`** for large data structures
9. **Use `const` and `static`** for compile-time constants
10. **Minimize allocations** in hot paths

### Code Organization
1. **Use modules** to organize related functionality
2. **Keep functions small** and focused
3. **Use descriptive names** for variables and functions
4. **Document public APIs** with doc comments
5. **Write tests** for all public functions
6. **Use `clippy`** for additional linting
7. **Format code** with `rustfmt`
8. **Use `cargo check`** for fast compilation checking
9. **Leverage the type system** to prevent bugs
10. **Follow Rust naming conventions**
