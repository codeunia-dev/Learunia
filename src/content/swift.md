# Swift Programming Cheatsheet

## Basic Syntax

### Hello World
```swift
import Foundation

print("Hello, World!")

// Or in a Swift playground
"Hello, World!"
```

### Variables & Constants
```swift
// Variables (can be changed)
var name = "Swift"
var age = 10
var isAwesome = true

// Constants (cannot be changed)
let pi = 3.14159
let appName = "My App"

// Type annotations
var message: String = "Hello"
var count: Int = 42
var price: Double = 9.99
var isReady: Bool = false

// Optional variables
var optionalName: String? = nil
optionalName = "John"

// Implicitly unwrapped optionals
var forcedName: String! = "Jane"
```

## Data Types

### Basic Types
```swift
// Numbers
let integer: Int = 42
let double: Double = 3.14159
let float: Float = 2.718
let decimal: Decimal = 123.456

// Strings
let greeting = "Hello"
let multiline = """
This is a
multiline string
"""

// Characters
let letter: Character = "A"

// Booleans
let isTrue: Bool = true
let isFalse: Bool = false

// Type inference
let inferredInt = 42        // Int
let inferredDouble = 3.14   // Double
let inferredString = "Text" // String
```

### Collections
```swift
// Arrays
var fruits = ["apple", "banana", "orange"]
var numbers: [Int] = [1, 2, 3, 4, 5]
var emptyArray: [String] = []

// Array operations
fruits.append("grape")
fruits.insert("mango", at: 0)
fruits.remove(at: 1)
let firstFruit = fruits[0]
let count = fruits.count

// Sets
var uniqueNumbers: Set<Int> = [1, 2, 3, 2, 1] // {1, 2, 3}
uniqueNumbers.insert(4)
uniqueNumbers.remove(2)

// Dictionaries
var person = ["name": "John", "age": "30"]
var scores: [String: Int] = ["Math": 95, "Science": 87]
scores["English"] = 92
scores["Math"] = nil  // Remove key-value pair
```

## Control Flow

### Conditionals
```swift
// If statements
let temperature = 25

if temperature > 30 {
    print("It's hot!")
} else if temperature > 20 {
    print("It's warm")
} else {
    print("It's cool")
}

// Guard statements
guard let name = optionalName else {
    print("Name is nil")
    return
}

// Switch statements
let grade = "A"

switch grade {
case "A":
    print("Excellent!")
case "B", "C":
    print("Good job")
case "D":
    print("Need improvement")
default:
    print("Invalid grade")
}

// Switch with ranges
let score = 85

switch score {
case 90...100:
    print("A grade")
case 80..<90:
    print("B grade")
case 70..<80:
    print("C grade")
default:
    print("Below C grade")
}
```

### Loops
```swift
// For-in loops
for i in 1...5 {
    print(i)  // 1, 2, 3, 4, 5
}

for i in 1..<5 {
    print(i)  // 1, 2, 3, 4
}

// Iterating over arrays
for fruit in fruits {
    print(fruit)
}

// Iterating with index
for (index, fruit) in fruits.enumerated() {
    print("\(index): \(fruit)")
}

// While loops
var counter = 0
while counter < 3 {
    print(counter)
    counter += 1
}

// Repeat-while loops
repeat {
    print("This runs at least once")
    counter -= 1
} while counter > 0
```

## Functions

### Basic Functions
```swift
// Simple function
func greet() {
    print("Hello!")
}

// Function with parameters
func greet(name: String) {
    print("Hello, \(name)!")
}

// Function with return value
func add(a: Int, b: Int) -> Int {
    return a + b
}

// Function with multiple parameters and labels
func greet(person name: String, from hometown: String) -> String {
    return "Hello \(name)! Glad you could visit from \(hometown)."
}

// Call with argument labels
let greeting = greet(person: "Bill", from: "Cupertino")

// Function with default parameters
func greet(name: String = "World") {
    print("Hello, \(name)!")
}

// Variadic parameters
func average(_ numbers: Double...) -> Double {
    var total: Double = 0
    for number in numbers {
        total += number
    }
    return total / Double(numbers.count)
}

let avg = average(1, 2, 3, 4, 5)
```

### Advanced Functions
```swift
// Functions as parameters
func applyOperation(_ a: Int, _ b: Int, operation: (Int, Int) -> Int) -> Int {
    return operation(a, b)
}

let result = applyOperation(5, 3, operation: add)

// Closures
let multiply = { (a: Int, b: Int) -> Int in
    return a * b
}

// Simplified closure syntax
let divide = { a, b in a / b }
let subtract = { $0 - $1 }

// Trailing closure syntax
let numbers = [1, 2, 3, 4, 5]
let doubled = numbers.map { $0 * 2 }
let filtered = numbers.filter { $0 > 2 }
```

## Optionals

### Working with Optionals
```swift
var optionalString: String? = "Hello"

// Optional binding (if let)
if let actualString = optionalString {
    print("String is: \(actualString)")
} else {
    print("String is nil")
}

// Guard let
guard let actualString = optionalString else {
    print("String is nil")
    return
}

// Nil coalescing operator
let greeting = optionalString ?? "Default greeting"

// Optional chaining
struct Person {
    var name: String
    var address: Address?
}

struct Address {
    var street: String
    var city: String
}

let person = Person(name: "John", address: nil)
let city = person.address?.city  // Returns nil

// Force unwrapping (use carefully!)
let forcedString = optionalString!  // Crashes if nil
```

## Classes and Structures

### Structures
```swift
struct Point {
    var x: Double
    var y: Double
    
    // Computed property
    var magnitude: Double {
        return sqrt(x * x + y * y)
    }
    
    // Methods
    func distance(to other: Point) -> Double {
        let dx = x - other.x
        let dy = y - other.y
        return sqrt(dx * dx + dy * dy)
    }
    
    // Mutating methods
    mutating func moveBy(x deltaX: Double, y deltaY: Double) {
        x += deltaX
        y += deltaY
    }
}

var point = Point(x: 0, y: 0)
point.moveBy(x: 3, y: 4)
print(point.magnitude)  // 5.0
```

### Classes
```swift
class Vehicle {
    var numberOfWheels: Int
    var name: String
    
    init(name: String, numberOfWheels: Int) {
        self.name = name
        self.numberOfWheels = numberOfWheels
    }
    
    func description() -> String {
        return "\(name) has \(numberOfWheels) wheels"
    }
}

class Car: Vehicle {
    var isElectric: Bool
    
    init(name: String, isElectric: Bool) {
        self.isElectric = isElectric
        super.init(name: name, numberOfWheels: 4)
    }
    
    override func description() -> String {
        let type = isElectric ? "electric" : "gas-powered"
        return "\(name) is a \(type) car with \(numberOfWheels) wheels"
    }
}

let tesla = Car(name: "Model S", isElectric: true)
print(tesla.description())
```

## Protocols

### Basic Protocols
```swift
protocol Drawable {
    func draw()
    var area: Double { get }
}

protocol Named {
    var name: String { get set }
}

struct Circle: Drawable, Named {
    var radius: Double
    var name: String
    
    var area: Double {
        return Double.pi * radius * radius
    }
    
    func draw() {
        print("Drawing a circle with radius \(radius)")
    }
}

// Protocol as type
let drawable: Drawable = Circle(radius: 5, name: "My Circle")
drawable.draw()
```

### Protocol Extensions
```swift
extension Drawable {
    func describe() -> String {
        return "A drawable with area \(area)"
    }
}

// All types conforming to Drawable now have describe() method
let circle = Circle(radius: 3, name: "Small Circle")
print(circle.describe())
```

## Enumerations

### Basic Enums
```swift
enum Direction {
    case north
    case south
    case east
    case west
}

let heading = Direction.north

// Switch with enums
switch heading {
case .north:
    print("Going north")
case .south:
    print("Going south")
case .east:
    print("Going east")
case .west:
    print("Going west")
}
```

### Enums with Associated Values
```swift
enum Result {
    case success(String)
    case failure(Error)
}

enum ServerResponse {
    case result(String, String)
    case failure(String)
    case loading
}

let response = ServerResponse.result("200", "OK")

switch response {
case .result(let code, let message):
    print("Success: \(code) - \(message)")
case .failure(let error):
    print("Error: \(error)")
case .loading:
    print("Loading...")
}
```

### Enums with Raw Values
```swift
enum Planet: Int {
    case mercury = 1
    case venus = 2
    case earth = 3
    case mars = 4
}

let earth = Planet.earth
print(earth.rawValue)  // 3

// Initialize from raw value
if let planet = Planet(rawValue: 2) {
    print("Found planet: \(planet)")  // venus
}
```

## Error Handling

### Defining and Throwing Errors
```swift
enum ValidationError: Error {
    case tooShort
    case tooLong
    case invalidCharacters
}

func validatePassword(_ password: String) throws -> Bool {
    if password.count < 8 {
        throw ValidationError.tooShort
    }
    if password.count > 128 {
        throw ValidationError.tooLong
    }
    return true
}

// Handling errors
do {
    try validatePassword("abc")
    print("Password is valid")
} catch ValidationError.tooShort {
    print("Password is too short")
} catch ValidationError.tooLong {
    print("Password is too long")
} catch {
    print("Unknown error: \(error)")
}

// Try? and try!
let result = try? validatePassword("password123")  // Optional Bool
// let forced = try! validatePassword("password123")  // Force unwrap
```

## Extensions

### Extending Existing Types
```swift
extension String {
    var isEmail: Bool {
        return self.contains("@") && self.contains(".")
    }
    
    func reversed() -> String {
        return String(self.reversed())
    }
    
    mutating func reverse() {
        self = String(self.reversed())
    }
}

let email = "user@example.com"
print(email.isEmail)  // true
print(email.reversed())  // moc.elpmaxe@resu

extension Int {
    var squared: Int {
        return self * self
    }
    
    func times(_ operation: () -> Void) {
        for _ in 0..<self {
            operation()
        }
    }
}

print(5.squared)  // 25
3.times { print("Hello") }  // Prints "Hello" 3 times
```

## Memory Management

### ARC and Strong References
```swift
class Person {
    let name: String
    var apartment: Apartment?
    
    init(name: String) {
        self.name = name
    }
    
    deinit {
        print("\(name) is being deinitialized")
    }
}

class Apartment {
    let unit: String
    weak var tenant: Person?  // Weak reference to avoid retain cycle
    
    init(unit: String) {
        self.unit = unit
    }
    
    deinit {
        print("Apartment \(unit) is being deinitialized")
    }
}
```

### Weak and Unowned References
```swift
// Weak references
weak var weakReference: SomeClass?

// Unowned references (use when you know the reference will never be nil)
unowned let unownedReference: SomeClass

// Closure capture lists
lazy var someClosure: () -> String = { [weak self] in
    guard let self = self else { return "" }
    return self.someProperty
}
```

## SwiftUI Basics

### Simple SwiftUI View
```swift
import SwiftUI

struct ContentView: View {
    @State private var count = 0
    
    var body: some View {
        VStack {
            Text("Count: \(count)")
                .font(.largeTitle)
                .padding()
            
            Button("Increment") {
                count += 1
            }
            .padding()
            .background(Color.blue)
            .foregroundColor(.white)
            .cornerRadius(10)
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
```

### State Management
```swift
struct UserProfile: View {
    @State private var name = ""
    @State private var isEditing = false
    
    var body: some View {
        VStack {
            if isEditing {
                TextField("Enter name", text: $name)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
            } else {
                Text("Hello, \(name.isEmpty ? "World" : name)!")
                    .font(.title)
            }
            
            Button(isEditing ? "Save" : "Edit") {
                isEditing.toggle()
            }
        }
        .padding()
    }
}
```

## Common Patterns

### Singleton Pattern
```swift
class NetworkManager {
    static let shared = NetworkManager()
    
    private init() {
        // Private initializer
    }
    
    func fetchData() {
        // Network operations
    }
}

// Usage
NetworkManager.shared.fetchData()
```

### Observer Pattern with NotificationCenter
```swift
// Posting notification
NotificationCenter.default.post(name: NSNotification.Name("DataUpdated"), object: nil)

// Observing notification
NotificationCenter.default.addObserver(
    self,
    selector: #selector(handleDataUpdate),
    name: NSNotification.Name("DataUpdated"),
    object: nil
)

@objc func handleDataUpdate() {
    // Handle the notification
}
```

### Delegation Pattern
```swift
protocol DataSourceDelegate: AnyObject {
    func didReceiveData(_ data: String)
}

class DataSource {
    weak var delegate: DataSourceDelegate?
    
    func fetchData() {
        // Simulate data fetching
        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
            self.delegate?.didReceiveData("Sample data")
        }
    }
}
```

## Useful Tips

### String Interpolation
```swift
let name = "Swift"
let version = 5.5
let message = "Welcome to \(name) \(version)!"

// Custom string interpolation
extension String.StringInterpolation {
    mutating func appendInterpolation<T: Numeric>(_ value: T, format: String) {
        let formatted = String(format: format, value as! CVarArg)
        appendLiteral(formatted)
    }
}

let price = 29.99
let text = "Price: $\(price, format: "%.2f")"
```

### Property Wrappers
```swift
@propertyWrapper
struct Capitalized {
    private var value: String = ""
    
    var wrappedValue: String {
        get { value }
        set { value = newValue.capitalized }
    }
}

struct Person {
    @Capitalized var firstName: String
    @Capitalized var lastName: String
}

var person = Person()
person.firstName = "john"  // Automatically becomes "John"
```

### Result Type
```swift
enum NetworkError: Error {
    case invalidURL
    case noData
}

func fetchData() -> Result<String, NetworkError> {
    // Simulate network call
    if Bool.random() {
        return .success("Data received")
    } else {
        return .failure(.noData)
    }
}

// Usage
switch fetchData() {
case .success(let data):
    print("Success: \(data)")
case .failure(let error):
    print("Error: \(error)")
}
```

## Best Practices

1. **Use `let` instead of `var`** when values don't change
2. **Prefer optionals over force unwrapping** for safety
3. **Use guard statements** for early exits
4. **Follow naming conventions** - camelCase for variables/functions, PascalCase for types
5. **Use weak references** to avoid retain cycles
6. **Leverage Swift's type system** for safer code
7. **Use extensions** to organize code and add functionality
8. **Prefer structs over classes** when you don't need reference semantics
9. **Use property observers** (`willSet`, `didSet`) when needed
10. **Write unit tests** to ensure code reliability
