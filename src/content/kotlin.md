# Kotlin Programming Cheatsheet

## Basic Syntax

### Hello World
```kotlin
fun main() {
    println("Hello, World!")
}

// Alternative with args
fun main(args: Array<String>) {
    println("Hello, Kotlin!")
}
```

### Variables & Constants
```kotlin
// Variables (mutable)
var name = "Kotlin"
var age = 10
var isAwesome = true

// Constants (immutable)
val pi = 3.14159
val appName = "My App"

// Type annotations
var message: String = "Hello"
var count: Int = 42
var price: Double = 9.99
var isReady: Boolean = false

// Nullable variables
var optionalName: String? = null
optionalName = "John"

// Late initialization
lateinit var userData: String

// Lazy initialization
val expensiveValue: String by lazy {
    // Computed only when first accessed
    "Expensive computation result"
}
```

## Data Types

### Basic Types
```kotlin
// Numbers
val byte: Byte = 127
val short: Short = 32767
val int: Int = 42
val long: Long = 123456789L
val float: Float = 3.14f
val double: Double = 3.14159
val unsignedInt: UInt = 42u

// Characters and Strings
val char: Char = 'A'
val string: String = "Hello"
val multilineString = """
    This is a
    multiline string
""".trimIndent()

// String interpolation
val greeting = "Hello, $name!"
val expression = "2 + 2 = ${2 + 2}"

// Booleans
val isTrue: Boolean = true
val isFalse: Boolean = false

// Type checking and casting
if (obj is String) {
    // Smart cast - obj is automatically cast to String
    println(obj.uppercase())
}

val str = obj as String  // Unsafe cast
val str2 = obj as? String  // Safe cast (returns null if fails)
```

### Collections
```kotlin
// Lists
val readOnlyList = listOf("apple", "banana", "orange")
val mutableList = mutableListOf("apple", "banana", "orange")
val emptyList = emptyList<String>()

// List operations
mutableList.add("grape")
mutableList.addAll(listOf("mango", "kiwi"))
mutableList.removeAt(0)
val first = mutableList.first()
val last = mutableList.last()
val size = mutableList.size

// Sets
val readOnlySet = setOf(1, 2, 3, 2, 1)  // {1, 2, 3}
val mutableSet = mutableSetOf(1, 2, 3)
mutableSet.add(4)
mutableSet.remove(2)

// Maps
val readOnlyMap = mapOf("name" to "John", "age" to 30)
val mutableMap = mutableMapOf("name" to "John", "age" to 30)
mutableMap["city"] = "New York"
mutableMap.remove("age")

// Accessing map values
val name = mutableMap["name"]  // Returns String?
val nameOrDefault = mutableMap.getOrDefault("name", "Unknown")

// Arrays
val array = arrayOf(1, 2, 3, 4, 5)
val typedArray: Array<String> = arrayOf("a", "b", "c")
val primitiveArray = intArrayOf(1, 2, 3, 4, 5)
```

## Functions

### Basic Functions
```kotlin
// Simple function
fun greet() {
    println("Hello!")
}

// Function with parameters
fun greet(name: String) {
    println("Hello, $name!")
}

// Function with return type
fun add(a: Int, b: Int): Int {
    return a + b
}

// Single expression function
fun multiply(a: Int, b: Int): Int = a * b

// Function with default parameters
fun greet(name: String = "World", enthusiastic: Boolean = false) {
    val greeting = if (enthusiastic) "Hello, $name!" else "Hello, $name."
    println(greeting)
}

// Named arguments
greet(enthusiastic = true, name = "Kotlin")

// Vararg parameters
fun sum(vararg numbers: Int): Int {
    var total = 0
    for (number in numbers) {
        total += number
    }
    return total
}

val result = sum(1, 2, 3, 4, 5)
```

### Higher-Order Functions
```kotlin
// Function as parameter
fun calculate(a: Int, b: Int, operation: (Int, Int) -> Int): Int {
    return operation(a, b)
}

val result = calculate(5, 3) { x, y -> x + y }

// Function returning function
fun getOperation(type: String): (Int, Int) -> Int {
    return when (type) {
        "add" -> { a, b -> a + b }
        "multiply" -> { a, b -> a * b }
        else -> { a, b -> 0 }
    }
}

// Lambda expressions
val square: (Int) -> Int = { x -> x * x }
val isEven = { number: Int -> number % 2 == 0 }

// it parameter (single parameter lambda)
val doubled = listOf(1, 2, 3).map { it * 2 }
val filtered = listOf(1, 2, 3, 4, 5).filter { it > 3 }

// Function literals with receiver
fun buildString(builderAction: StringBuilder.() -> Unit): String {
    val sb = StringBuilder()
    sb.builderAction()
    return sb.toString()
}

val result = buildString {
    append("Hello")
    append(" ")
    append("World")
}
```

## Control Flow

### Conditionals
```kotlin
// If expression
val max = if (a > b) a else b

val result = if (condition) {
    "True case"
} else {
    "False case"
}

// When expression (like switch)
val grade = when (score) {
    in 90..100 -> "A"
    in 80..89 -> "B"
    in 70..79 -> "C"
    in 60..69 -> "D"
    else -> "F"
}

// When with conditions
val description = when {
    age < 13 -> "Child"
    age < 20 -> "Teenager"
    age < 65 -> "Adult"
    else -> "Senior"
}

// When with type checking
val result = when (x) {
    is String -> x.length
    is Int -> x * 2
    is List<*> -> x.size
    else -> -1
}
```

### Loops
```kotlin
// For loops
for (i in 1..5) {
    println(i)  // 1, 2, 3, 4, 5
}

for (i in 1 until 5) {
    println(i)  // 1, 2, 3, 4
}

for (i in 5 downTo 1) {
    println(i)  // 5, 4, 3, 2, 1
}

for (i in 1..10 step 2) {
    println(i)  // 1, 3, 5, 7, 9
}

// Iterating over collections
val fruits = listOf("apple", "banana", "orange")
for (fruit in fruits) {
    println(fruit)
}

for ((index, fruit) in fruits.withIndex()) {
    println("$index: $fruit")
}

// While loops
var counter = 0
while (counter < 3) {
    println(counter)
    counter++
}

// Do-while loops
do {
    println("This runs at least once")
    counter--
} while (counter > 0)

// Break and continue
for (i in 1..10) {
    if (i == 5) continue
    if (i == 8) break
    println(i)
}

// Labeled breaks
outer@ for (i in 1..3) {
    for (j in 1..3) {
        if (i == 2 && j == 2) break@outer
        println("$i, $j")
    }
}
```

## Null Safety

### Nullable Types
```kotlin
var name: String? = null

// Safe call operator
val length = name?.length

// Elvis operator
val len = name?.length ?: 0

// Safe cast
val str: String? = obj as? String

// Let function
name?.let { 
    println("Name is $it")
    // This block runs only if name is not null
}

// Also function
val person = Person().also {
    it.name = "John"
    it.age = 30
}

// Run function
val result = name?.run {
    uppercase().substring(0, 3)
}

// Not-null assertion (use carefully!)
val length = name!!.length  // Throws exception if name is null
```

### Safe Calls and Elvis Operator
```kotlin
// Chaining safe calls
val city = person?.address?.city

// Elvis with function calls
val name = getName() ?: getDefaultName()

// Elvis with return/throw
fun processUser(user: User?) {
    val name = user?.name ?: return
    val email = user.email ?: throw IllegalArgumentException("Email required")
    // Process user...
}

// Safe collections operations
val list: List<String>? = getList()
val firstItem = list?.firstOrNull()
val size = list?.size ?: 0
```

## Classes and Objects

### Basic Classes
```kotlin
// Simple class
class Person {
    var name: String = ""
    var age: Int = 0
    
    fun introduce() {
        println("Hi, I'm $name and I'm $age years old")
    }
}

// Primary constructor
class Person(val name: String, var age: Int) {
    init {
        println("Person created: $name")
    }
    
    fun introduce() = println("Hi, I'm $name and I'm $age years old")
}

// Secondary constructors
class Person(val name: String) {
    var age: Int = 0
    
    constructor(name: String, age: Int) : this(name) {
        this.age = age
    }
}

// Properties with custom getters/setters
class Rectangle(val width: Double, val height: Double) {
    val area: Double
        get() = width * height
    
    var isSquare: Boolean
        get() = width == height
        set(value) {
            if (value) {
                // Make it square by setting height = width
                // Note: This is just an example, properties are immutable here
            }
        }
}
```

### Inheritance
```kotlin
// Open class (can be inherited)
open class Animal(val name: String) {
    open fun makeSound() {
        println("The animal makes a sound")
    }
    
    open val species: String = "Unknown"
}

class Dog(name: String) : Animal(name) {
    override fun makeSound() {
        println("$name barks")
    }
    
    override val species: String = "Canine"
    
    fun fetch() {
        println("$name fetches the ball")
    }
}

// Abstract classes
abstract class Shape {
    abstract val area: Double
    abstract fun draw()
    
    fun describe() {
        println("This is a shape with area $area")
    }
}

class Circle(val radius: Double) : Shape() {
    override val area: Double
        get() = Math.PI * radius * radius
    
    override fun draw() {
        println("Drawing a circle")
    }
}
```

### Data Classes
```kotlin
// Data class
data class User(val name: String, val email: String, val age: Int)

val user1 = User("John", "john@example.com", 30)
val user2 = User("John", "john@example.com", 30)

// Automatically generated methods
println(user1 == user2)  // true (equals)
println(user1)  // User(name=John, email=john@example.com, age=30) (toString)

// Copy with modifications
val user3 = user1.copy(age = 31)

// Destructuring
val (name, email, age) = user1
println("Name: $name, Email: $email, Age: $age")
```

### Object Declarations and Expressions
```kotlin
// Singleton object
object DatabaseManager {
    fun connect() {
        println("Connecting to database...")
    }
    
    fun disconnect() {
        println("Disconnecting from database...")
    }
}

// Usage
DatabaseManager.connect()

// Object expression (anonymous object)
val clickListener = object : OnClickListener {
    override fun onClick() {
        println("Button clicked!")
    }
}

// Companion object
class MyClass {
    companion object {
        const val CONSTANT = "Hello"
        
        fun create(): MyClass {
            return MyClass()
        }
    }
}

// Usage
val instance = MyClass.create()
println(MyClass.CONSTANT)
```

## Interfaces

### Basic Interfaces
```kotlin
interface Drawable {
    fun draw()
    
    // Interface with default implementation
    fun describe(): String = "This is a drawable object"
}

interface Resizable {
    fun resize(factor: Double)
}

class Rectangle : Drawable, Resizable {
    override fun draw() {
        println("Drawing a rectangle")
    }
    
    override fun resize(factor: Double) {
        println("Resizing rectangle by factor $factor")
    }
}

// Interface with properties
interface Named {
    val name: String
    val displayName: String
        get() = name.uppercase()
}

class Person(override val name: String) : Named

// Functional interfaces (SAM - Single Abstract Method)
fun interface StringProcessor {
    fun process(input: String): String
}

val processor = StringProcessor { it.uppercase() }
```

## Generics

### Generic Classes and Functions
```kotlin
// Generic class
class Box<T>(var value: T) {
    fun get(): T = value
    fun set(newValue: T) {
        value = newValue
    }
}

val stringBox = Box("Hello")
val intBox = Box(42)

// Generic functions
fun <T> identity(value: T): T = value

fun <T> List<T>.secondOrNull(): T? = 
    if (size >= 2) this[1] else null

// Multiple type parameters
fun <K, V> mapOf(vararg pairs: Pair<K, V>): Map<K, V> {
    val map = mutableMapOf<K, V>()
    for (pair in pairs) {
        map[pair.first] = pair.second
    }
    return map
}

// Generic constraints
fun <T : Number> sum(list: List<T>): Double {
    return list.sumOf { it.toDouble() }
}

fun <T> copyWhenGreater(list: List<T>, threshold: T): List<T>
    where T : CharSequence, T : Comparable<T> {
    return list.filter { it > threshold }
}
```

### Variance
```kotlin
// Covariance (out)
interface Producer<out T> {
    fun produce(): T
}

class StringProducer : Producer<String> {
    override fun produce(): String = "Hello"
}

val stringProducer: Producer<String> = StringProducer()
val anyProducer: Producer<Any> = stringProducer  // OK

// Contravariance (in)
interface Consumer<in T> {
    fun consume(item: T)
}

class AnyConsumer : Consumer<Any> {
    override fun consume(item: Any) {
        println("Consuming: $item")
    }
}

val anyConsumer: Consumer<Any> = AnyConsumer()
val stringConsumer: Consumer<String> = anyConsumer  // OK

// Star projection
fun printList(list: List<*>) {
    for (item in list) {
        println(item)
    }
}
```

## Coroutines

### Basic Coroutines
```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    println("Hello")
    delay(1000L)
    println("World!")
}

// Launching coroutines
fun main() = runBlocking {
    launch {
        delay(1000L)
        println("World!")
    }
    println("Hello")
}

// Async and await
suspend fun fetchUser(id: Int): User {
    delay(1000)  // Simulate network call
    return User("User$id", "user$id@example.com", 25)
}

fun main() = runBlocking {
    val deferred1 = async { fetchUser(1) }
    val deferred2 = async { fetchUser(2) }
    
    val user1 = deferred1.await()
    val user2 = deferred2.await()
    
    println("Users: $user1, $user2")
}
```

### Coroutine Builders and Scopes
```kotlin
// Different coroutine builders
fun main() = runBlocking {
    // launch - fire and forget
    launch {
        println("Launch")
    }
    
    // async - returns a result
    val deferred = async {
        "Result"
    }
    println(deferred.await())
    
    // withContext - switches context
    withContext(Dispatchers.IO) {
        // IO operations
    }
}

// Coroutine scope
class MyRepository {
    private val scope = CoroutineScope(Dispatchers.IO + SupervisorJob())
    
    fun fetchData() {
        scope.launch {
            // Network operation
        }
    }
    
    fun cleanup() {
        scope.cancel()
    }
}
```

## Extensions

### Extension Functions
```kotlin
// Extension function for String
fun String.isEmail(): Boolean {
    return this.contains("@") && this.contains(".")
}

// Usage
val email = "user@example.com"
println(email.isEmail())  // true

// Extension function with receiver
fun StringBuilder.appendLine(text: String): StringBuilder {
    return this.append(text).append("\n")
}

// Extension functions for collections
fun <T> List<T>.second(): T {
    if (size < 2) throw NoSuchElementException("List has fewer than 2 elements")
    return this[1]
}

fun <T> MutableList<T>.swap(index1: Int, index2: Int) {
    val temp = this[index1]
    this[index1] = this[index2]
    this[index2] = temp
}

// Extension properties
val String.lastChar: Char
    get() = this[length - 1]

var StringBuilder.lastChar: Char
    get() = this[length - 1]
    set(value) {
        this.setCharAt(length - 1, value)
    }
```

### Extension Functions on Nullable Types
```kotlin
fun String?.isNullOrEmpty(): Boolean {
    return this == null || this.isEmpty()
}

fun String?.orDefault(default: String): String {
    return if (this.isNullOrEmpty()) default else this
}

// Usage
val name: String? = null
println(name.isNullOrEmpty())  // true
println(name.orDefault("Unknown"))  // "Unknown"
```

## Scope Functions

### let, run, with, apply, also
```kotlin
// let - execute a code block and return the result
val result = "Hello".let {
    println(it)
    it.length
}

val name: String? = getName()
name?.let {
    println("Name is $it")
    processName(it)
}

// run - execute a code block and return the result
val result = "Hello".run {
    println(this)
    this.length
}

// with - execute a code block with the object as receiver
val result = with(StringBuilder()) {
    append("Hello")
    append(" ")
    append("World")
    toString()
}

// apply - execute a code block and return the object
val person = Person().apply {
    name = "John"
    age = 30
    city = "New York"
}

// also - execute a code block and return the object
val numbers = mutableListOf(1, 2, 3).also {
    println("Before: $it")
}.also {
    it.add(4)
}.also {
    println("After: $it")
}
```

## Delegation

### Property Delegation
```kotlin
// Built-in delegates
class User {
    val name: String by lazy {
        println("Computing name...")
        "John Doe"
    }
    
    var age: Int by Delegates.observable(0) { property, oldValue, newValue ->
        println("$oldValue -> $newValue")
    }
    
    var city: String by Delegates.vetoable("") { property, oldValue, newValue ->
        newValue.isNotEmpty()  // Only allow non-empty values
    }
}

// Custom delegate
class Preference<T>(private val key: String, private val defaultValue: T) {
    operator fun getValue(thisRef: Any?, property: KProperty<*>): T {
        // Get value from preferences
        return defaultValue  // Simplified
    }
    
    operator fun setValue(thisRef: Any?, property: KProperty<*>, value: T) {
        // Save value to preferences
        println("Saving $key = $value")
    }
}

class Settings {
    var username: String by Preference("username", "")
    var theme: String by Preference("theme", "light")
}
```

### Class Delegation
```kotlin
interface Base {
    fun doSomething()
    fun doSomethingElse()
}

class BaseImpl : Base {
    override fun doSomething() {
        println("BaseImpl: doSomething")
    }
    
    override fun doSomethingElse() {
        println("BaseImpl: doSomethingElse")
    }
}

class Derived(base: Base) : Base by base {
    override fun doSomething() {
        println("Derived: doSomething")
        // Can still override specific methods
    }
}

val base = BaseImpl()
val derived = Derived(base)
derived.doSomething()  // Derived: doSomething
derived.doSomethingElse()  // BaseImpl: doSomethingElse
```

## Useful Standard Library Functions

### Collection Operations
```kotlin
val numbers = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

// Filter and map
val evenSquares = numbers
    .filter { it % 2 == 0 }
    .map { it * it }

// Find operations
val firstEven = numbers.find { it % 2 == 0 }
val firstEvenIndex = numbers.indexOfFirst { it % 2 == 0 }

// Grouping
val grouped = numbers.groupBy { it % 3 }
// {1=[1, 4, 7, 10], 2=[2, 5, 8], 0=[3, 6, 9]}

// Partition
val (evens, odds) = numbers.partition { it % 2 == 0 }

// Reduce and fold
val sum = numbers.reduce { acc, n -> acc + n }
val product = numbers.fold(1) { acc, n -> acc * n }

// Take and drop
val first3 = numbers.take(3)
val without3 = numbers.drop(3)
val takeWhileSmall = numbers.takeWhile { it < 5 }

// Zip
val letters = listOf("a", "b", "c")
val zipped = numbers.zip(letters)  // [(1, a), (2, b), (3, c)]

// Flatten
val listOfLists = listOf(listOf(1, 2), listOf(3, 4), listOf(5, 6))
val flattened = listOfLists.flatten()  // [1, 2, 3, 4, 5, 6]

val flatMapped = listOf("hello", "world").flatMap { it.toList() }
// [h, e, l, l, o, w, o, r, l, d]
```

### String Operations
```kotlin
val text = "Hello, World!"

// Basic operations
val upper = text.uppercase()
val lower = text.lowercase()
val trimmed = "  hello  ".trim()

// Checking content
val startsWithHello = text.startsWith("Hello")
val endsWithExclamation = text.endsWith("!")
val containsWorld = text.contains("World")

// Splitting and joining
val words = text.split(", ")
val joined = listOf("Hello", "World").joinToString(" ")

// Regex
val phonePattern = Regex("""\d{3}-\d{3}-\d{4}""")
val isValidPhone = phonePattern.matches("123-456-7890")

val emailPattern = Regex("""[\w\.-]+@[\w\.-]+\.\w+""")
val emails = text.findAll(emailPattern).map { it.value }.toList()

// String building
val built = buildString {
    append("Hello")
    appendLine()
    append("World")
}
```

## Android Development with Kotlin

### Activity Example
```kotlin
class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        
        binding.button.setOnClickListener {
            binding.textView.text = "Button clicked!"
        }
    }
}
```

### ViewModel Example
```kotlin
class UserViewModel : ViewModel() {
    private val _users = MutableLiveData<List<User>>()
    val users: LiveData<List<User>> = _users
    
    private val _loading = MutableLiveData<Boolean>()
    val loading: LiveData<Boolean> = _loading
    
    fun loadUsers() {
        viewModelScope.launch {
            _loading.value = true
            try {
                val userList = userRepository.getUsers()
                _users.value = userList
            } catch (e: Exception) {
                // Handle error
            } finally {
                _loading.value = false
            }
        }
    }
}
```

## Best Practices

1. **Prefer `val` over `var`** - Use immutable variables when possible
2. **Use data classes** for simple data holders
3. **Leverage null safety** - Use safe calls and elvis operator
4. **Use scope functions appropriately** - `let`, `run`, `apply`, `also`, `with`
5. **Prefer extension functions** over utility classes
6. **Use coroutines** for asynchronous programming
7. **Follow naming conventions** - camelCase for functions/variables, PascalCase for classes
8. **Use type inference** when the type is obvious
9. **Prefer collections operations** over manual loops
10. **Use sealed classes** for representing restricted hierarchies
