# Go Programming Cheatsheet

## Basic Syntax

### Hello World
```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

### Variables & Constants
```go
// Variable declaration
var name string = "Go"
var age int = 13
var isAwesome bool = true

// Short declaration (inside functions)
name := "Go"
age := 13

// Multiple variables
var (
    name string = "Go"
    age  int    = 13
)

// Constants
const Pi = 3.14159
const (
    StatusOK = 200
    StatusNotFound = 404
)
```

## Data Types

### Basic Types
```go
// Numeric types
var i int = 42              // Platform dependent
var i8 int8 = 127           // 8-bit signed
var i16 int16 = 32767       // 16-bit signed
var i32 int32 = 2147483647  // 32-bit signed
var i64 int64 = 9223372036854775807

var ui uint = 42            // Platform dependent unsigned
var ui8 uint8 = 255         // 8-bit unsigned (byte)
var ui16 uint16 = 65535     // 16-bit unsigned
var ui32 uint32 = 4294967295
var ui64 uint64 = 18446744073709551615

var f32 float32 = 3.14      // 32-bit floating point
var f64 float64 = 3.14159   // 64-bit floating point

var c64 complex64 = 1 + 2i   // Complex numbers
var c128 complex128 = 1 + 2i

// String and boolean
var s string = "Hello"
var b bool = true

// Byte and rune
var bt byte = 'A'           // Alias for uint8
var r rune = 'A'            // Alias for int32 (Unicode)
```

### Collections
```go
// Arrays (fixed size)
var arr [5]int = [5]int{1, 2, 3, 4, 5}
arr := [...]int{1, 2, 3, 4, 5}  // Size inferred

// Slices (dynamic arrays)
var slice []int = []int{1, 2, 3}
slice := make([]int, 5)         // Length 5, zero values
slice := make([]int, 5, 10)     // Length 5, capacity 10

// Maps
var m map[string]int = make(map[string]int)
m := map[string]int{
    "apple":  5,
    "banana": 3,
}

// Checking if key exists
value, exists := m["apple"]
if exists {
    fmt.Println("Apple count:", value)
}
```

## Functions

### Basic Functions
```go
// Simple function
func add(a, b int) int {
    return a + b
}

// Multiple parameters of same type
func fullName(first, last string) string {
    return first + " " + last
}

// Multiple return values
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("division by zero")
    }
    return a / b, nil
}

// Named return values
func split(sum int) (x, y int) {
    x = sum * 4 / 9
    y = sum - x
    return  // naked return
}

// Variadic functions
func sum(nums ...int) int {
    total := 0
    for _, num := range nums {
        total += num
    }
    return total
}
```

### Function Types & Closures
```go
// Function as type
type operation func(int, int) int

func main() {
    var op operation = add
    result := op(3, 4)
}

// Anonymous functions
func main() {
    square := func(x int) int {
        return x * x
    }
    fmt.Println(square(5))
}

// Closures
func counter() func() int {
    count := 0
    return func() int {
        count++
        return count
    }
}
```

## Control Flow

### Conditionals
```go
// If statement
if x > 10 {
    fmt.Println("x is greater than 10")
} else if x > 5 {
    fmt.Println("x is greater than 5")
} else {
    fmt.Println("x is 5 or less")
}

// If with short statement
if err := someFunction(); err != nil {
    log.Fatal(err)
}

// Switch statement
switch day := time.Now().Weekday(); day {
case time.Saturday, time.Sunday:
    fmt.Println("Weekend!")
default:
    fmt.Println("Weekday")
}

// Type switch
switch v := interface{}(x).(type) {
case int:
    fmt.Printf("Integer: %d", v)
case string:
    fmt.Printf("String: %s", v)
default:
    fmt.Printf("Unknown type: %T", v)
}
```

### Loops
```go
// For loop (only loop in Go)
for i := 0; i < 10; i++ {
    fmt.Println(i)
}

// While-style loop
for condition {
    // code
}

// Infinite loop
for {
    // code
    if condition {
        break
    }
}

// Range over slice
slice := []string{"a", "b", "c"}
for index, value := range slice {
    fmt.Printf("Index: %d, Value: %s\n", index, value)
}

// Range over map
m := map[string]int{"a": 1, "b": 2}
for key, value := range m {
    fmt.Printf("Key: %s, Value: %d\n", key, value)
}

// Skip index or value
for _, value := range slice {  // Skip index
    fmt.Println(value)
}
for key := range m {           // Skip value
    fmt.Println(key)
}
```

## Structs & Methods

### Structs
```go
// Define struct
type Person struct {
    Name string
    Age  int
}

// Create struct
p1 := Person{Name: "Alice", Age: 30}
p2 := Person{"Bob", 25}  // Positional
var p3 Person            // Zero values

// Anonymous struct
person := struct {
    Name string
    Age  int
}{
    Name: "Charlie",
    Age:  35,
}

// Embedded structs
type Employee struct {
    Person  // Embedded
    ID      int
    Salary  float64
}

emp := Employee{
    Person: Person{Name: "David", Age: 40},
    ID:     123,
    Salary: 50000,
}
```

### Methods
```go
// Method with value receiver
func (p Person) Speak() string {
    return "Hello, I'm " + p.Name
}

// Method with pointer receiver (can modify)
func (p *Person) Birthday() {
    p.Age++
}

// Method usage
person := Person{Name: "Alice", Age: 30}
fmt.Println(person.Speak())
person.Birthday()
```

## Interfaces

### Basic Interfaces
```go
// Define interface
type Speaker interface {
    Speak() string
}

type Writer interface {
    Write([]byte) (int, error)
}

// Empty interface (any type)
var anything interface{}
anything = 42
anything = "hello"
anything = []int{1, 2, 3}

// Type assertion
var i interface{} = "hello"
s := i.(string)        // Panic if not string
s, ok := i.(string)    // Safe assertion
if ok {
    fmt.Println("String:", s)
}
```

### Common Interfaces
```go
// Stringer interface
type Stringer interface {
    String() string
}

func (p Person) String() string {
    return fmt.Sprintf("Person{Name: %s, Age: %d}", p.Name, p.Age)
}

// Error interface
type error interface {
    Error() string
}

type MyError struct {
    Message string
}

func (e MyError) Error() string {
    return e.Message
}
```

## Goroutines & Channels

### Goroutines
```go
// Start goroutine
go someFunction()

// Anonymous goroutine
go func() {
    fmt.Println("Running in goroutine")
}()

// Wait for goroutines
var wg sync.WaitGroup

func worker(id int) {
    defer wg.Done()
    fmt.Printf("Worker %d starting\n", id)
    time.Sleep(time.Second)
    fmt.Printf("Worker %d done\n", id)
}

func main() {
    for i := 1; i <= 5; i++ {
        wg.Add(1)
        go worker(i)
    }
    wg.Wait()
}
```

### Channels
```go
// Create channel
ch := make(chan int)
ch := make(chan int, 10)  // Buffered channel

// Send and receive
ch <- 42        // Send
value := <-ch   // Receive

// Close channel
close(ch)

// Range over channel
for value := range ch {
    fmt.Println(value)
}

// Select statement
select {
case msg1 := <-ch1:
    fmt.Println("Received from ch1:", msg1)
case msg2 := <-ch2:
    fmt.Println("Received from ch2:", msg2)
case <-time.After(1 * time.Second):
    fmt.Println("Timeout")
default:
    fmt.Println("No communication ready")
}
```

## Error Handling

### Basic Error Handling
```go
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}

func main() {
    result, err := divide(10, 0)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println(result)
}
```

### Custom Errors
```go
type ValidationError struct {
    Field   string
    Message string
}

func (v ValidationError) Error() string {
    return fmt.Sprintf("validation error on %s: %s", v.Field, v.Message)
}

// Error wrapping (Go 1.13+)
import "fmt"

err := fmt.Errorf("failed to process: %w", originalError)

// Error unwrapping
errors.Unwrap(err)
errors.Is(err, target)
errors.As(err, &target)
```

## Packages & Imports

### Package Declaration
```go
// main package (executable)
package main

// library package
package mypackage
```

### Imports
```go
import "fmt"
import "time"

// Multiple imports
import (
    "fmt"
    "time"
    "net/http"
)

// Aliased imports
import (
    f "fmt"
    . "math"     // Import into current namespace
    _ "image/png" // Import for side effects only
)
```

### Exported vs Unexported
```go
// Exported (public) - starts with capital letter
type Person struct {
    Name string  // Exported field
    age  int     // Unexported field
}

func (p Person) GetAge() int {  // Exported method
    return p.age
}

func (p *Person) setAge(age int) {  // Unexported method
    p.age = age
}
```

## Common Patterns

### JSON Handling
```go
import "encoding/json"

type Person struct {
    Name string `json:"name"`
    Age  int    `json:"age"`
}

// Marshal (struct to JSON)
p := Person{Name: "Alice", Age: 30}
jsonData, err := json.Marshal(p)

// Unmarshal (JSON to struct)
var p Person
err := json.Unmarshal(jsonData, &p)
```

### HTTP Server
```go
import (
    "fmt"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello, %s!", r.URL.Path[1:])
}

func main() {
    http.HandleFunc("/", handler)
    http.ListenAndServe(":8080", nil)
}
```

### File Operations
```go
import (
    "io/ioutil"
    "os"
)

// Read file
data, err := ioutil.ReadFile("file.txt")
if err != nil {
    log.Fatal(err)
}

// Write file
err = ioutil.WriteFile("file.txt", []byte("Hello"), 0644)

// Open file
file, err := os.Open("file.txt")
if err != nil {
    log.Fatal(err)
}
defer file.Close()
```

## Testing

### Basic Tests
```go
// math_test.go
package math

import "testing"

func TestAdd(t *testing.T) {
    result := Add(2, 3)
    expected := 5
    if result != expected {
        t.Errorf("Add(2, 3) = %d; want %d", result, expected)
    }
}

// Table-driven tests
func TestAddTable(t *testing.T) {
    tests := []struct {
        a, b, expected int
    }{
        {2, 3, 5},
        {0, 0, 0},
        {-1, 1, 0},
    }
    
    for _, test := range tests {
        result := Add(test.a, test.b)
        if result != test.expected {
            t.Errorf("Add(%d, %d) = %d; want %d", 
                test.a, test.b, result, test.expected)
        }
    }
}
```

### Benchmarks
```go
func BenchmarkAdd(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Add(2, 3)
    }
}
```

## Best Practices

1. **Use `gofmt`** - Format your code consistently
2. **Follow naming conventions** - Use camelCase, start with capital for exported
3. **Handle errors explicitly** - Don't ignore errors
4. **Use interfaces** - Accept interfaces, return concrete types
5. **Keep functions small** - Single responsibility principle
6. **Use channels for communication** - Don't communicate by sharing memory
7. **Prefer composition over inheritance** - Use embedding
8. **Document public APIs** - Use godoc comments
