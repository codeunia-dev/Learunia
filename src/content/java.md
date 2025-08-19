# Java Cheatsheet

## Basic Syntax

```java
// Hello World
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}

// Variables
int number = 42;
double decimal = 3.14;
String text = "Hello";
boolean flag = true;
char letter = 'A';

// Constants
final int MAX_SIZE = 100;
final String APP_NAME = "MyApp";

// Comments
// Single line comment
/* Multi-line comment */
/** JavaDoc comment */
```

## Data Types

```java
// Primitive types
byte b = 127;           // 8-bit, -128 to 127
short s = 32767;        // 16-bit, -32,768 to 32,767
int i = 2147483647;     // 32-bit, -2^31 to 2^31-1
long l = 9223372036854775807L; // 64-bit, -2^63 to 2^63-1
float f = 3.14f;        // 32-bit floating point
double d = 3.14;        // 64-bit floating point
boolean bool = true;     // true or false
char c = 'A';           // 16-bit Unicode character

// Reference types
String str = "Hello";
Integer num = 42;
Double dec = 3.14;
Boolean flag = true;
```

## Control Flow

```java
// If-else
if (condition) {
    // code
} else if (anotherCondition) {
    // code
} else {
    // code
}

// Switch statement
switch (variable) {
    case value1:
        // code
        break;
    case value2:
        // code
        break;
    default:
        // code
        break;
}

// Switch expression (Java 14+)
String result = switch (day) {
    case "MONDAY", "TUESDAY" -> "Work day";
    case "WEDNESDAY" -> "Hump day";
    case "THURSDAY", "FRIDAY" -> "Almost weekend";
    case "SATURDAY", "SUNDAY" -> "Weekend";
    default -> "Unknown day";
};

// Loops
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}

for (String item : items) {
    System.out.println(item);
}

while (condition) {
    // code
}

do {
    // code
} while (condition);
```

## Arrays

```java
// Array declaration
int[] numbers = new int[5];
int[] numbers2 = {1, 2, 3, 4, 5};

// Multi-dimensional arrays
int[][] matrix = new int[3][3];
int[][] matrix2 = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};

// Array methods
int length = numbers.length;
Arrays.sort(numbers);
Arrays.fill(numbers, 0);
boolean equals = Arrays.equals(numbers, numbers2);
```

## Strings

```java
// String creation
String str1 = "Hello";
String str2 = new String("Hello");

// String methods
int length = str.length();
char charAt = str.charAt(0);
String substring = str.substring(0, 3);
String upper = str.toUpperCase();
String lower = str.toLowerCase();
boolean contains = str.contains("Hello");
boolean startsWith = str.startsWith("He");
boolean endsWith = str.endsWith("lo");
String[] parts = str.split(" ");
String trimmed = str.trim();
String replaced = str.replace("Hello", "Hi");

// String concatenation
String result = str1 + " " + str2;
String result2 = str1.concat(" ").concat(str2);
String result3 = String.format("Hello %s", name);

// StringBuilder (mutable)
StringBuilder sb = new StringBuilder();
sb.append("Hello");
sb.append(" World");
String result4 = sb.toString();
```

## Classes and Objects

```java
// Class definition
public class Person {
    // Instance variables
    private String name;
    private int age;
    
    // Static variable
    public static int count = 0;
    
    // Constructor
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
        count++;
    }
    
    // Default constructor
    public Person() {
        this("Unknown", 0);
    }
    
    // Instance methods
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public int getAge() {
        return age;
    }
    
    public void setAge(int age) {
        if (age >= 0) {
            this.age = age;
        }
    }
    
    // Static method
    public static int getCount() {
        return count;
    }
    
    // Override toString
    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }
}

// Object creation
Person person = new Person("John", 30);
Person person2 = new Person(); // Uses default constructor
```

## Inheritance

```java
// Parent class
public class Animal {
    protected String name;
    
    public Animal(String name) {
        this.name = name;
    }
    
    public void makeSound() {
        System.out.println("Some sound");
    }
    
    public final void breathe() {
        System.out.println("Breathing");
    }
}

// Child class
public class Dog extends Animal {
    private String breed;
    
    public Dog(String name, String breed) {
        super(name); // Call parent constructor
        this.breed = breed;
    }
    
    @Override
    public void makeSound() {
        System.out.println("Woof!");
    }
    
    public void wagTail() {
        System.out.println("Tail wagging");
    }
}

// Usage
Animal animal = new Animal("Generic");
Dog dog = new Dog("Buddy", "Golden Retriever");
Animal dogAsAnimal = new Dog("Max", "Labrador"); // Polymorphism
```

## Interfaces

```java
// Interface definition
public interface Drawable {
    void draw();
    default void erase() {
        System.out.println("Erasing");
    }
}

public interface Movable {
    void move(int x, int y);
}

// Implementing interfaces
public class Circle implements Drawable, Movable {
    private int x, y, radius;
    
    public Circle(int x, int y, int radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing circle at (" + x + ", " + y + ")");
    }
    
    @Override
    public void move(int newX, int newY) {
        this.x = newX;
        this.y = newY;
    }
}

// Functional interface (Java 8+)
@FunctionalInterface
public interface Calculator {
    int calculate(int a, int b);
}

// Lambda expressions
Calculator add = (a, b) -> a + b;
Calculator multiply = (a, b) -> a * b;
int result = add.calculate(5, 3); // 8
```

## Collections

```java
import java.util.*;

// List
List<String> list = new ArrayList<>();
list.add("Apple");
list.add("Banana");
list.add("Cherry");
String fruit = list.get(0);
list.remove("Banana");
int size = list.size();
boolean contains = list.contains("Apple");

// Set
Set<String> set = new HashSet<>();
set.add("Apple");
set.add("Apple"); // Duplicate ignored
set.add("Banana");
set.remove("Apple");

// Map
Map<String, Integer> map = new HashMap<>();
map.put("Apple", 1);
map.put("Banana", 2);
int value = map.get("Apple");
map.remove("Banana");
boolean containsKey = map.containsKey("Apple");
boolean containsValue = map.containsValue(1);

// Queue
Queue<String> queue = new LinkedList<>();
queue.offer("First");
queue.offer("Second");
String first = queue.poll(); // Remove and return
String peek = queue.peek(); // Return without removing

// Stack
Stack<String> stack = new Stack<>();
stack.push("First");
stack.push("Second");
String top = stack.pop(); // Remove and return
String peekTop = stack.peek(); // Return without removing
```

## Exception Handling

```java
// Try-catch
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Division by zero: " + e.getMessage());
} catch (Exception e) {
    System.out.println("General error: " + e.getMessage());
} finally {
    System.out.println("Always executed");
}

// Try-with-resources (Java 7+)
try (FileReader reader = new FileReader("file.txt")) {
    // Use reader
} catch (IOException e) {
    System.out.println("Error reading file: " + e.getMessage());
}

// Custom exception
public class CustomException extends Exception {
    public CustomException(String message) {
        super(message);
    }
}

// Throwing exceptions
public void riskyMethod() throws CustomException {
    if (someCondition) {
        throw new CustomException("Something went wrong");
    }
}
```

## Generics

```java
// Generic class
public class Box<T> {
    private T content;
    
    public void set(T content) {
        this.content = content;
    }
    
    public T get() {
        return content;
    }
}

// Generic method
public static <T> void printArray(T[] array) {
    for (T element : array) {
        System.out.println(element);
    }
}

// Bounded generics
public class NumberBox<T extends Number> {
    private T number;
    
    public NumberBox(T number) {
        this.number = number;
    }
    
    public double getValue() {
        return number.doubleValue();
    }
}

// Wildcards
public static void printList(List<?> list) {
    for (Object item : list) {
        System.out.println(item);
    }
}

public static void printNumbers(List<? extends Number> list) {
    for (Number item : list) {
        System.out.println(item);
    }
}
```

## Streams (Java 8+)

```java
import java.util.stream.*;

// Creating streams
Stream<String> stream1 = Stream.of("A", "B", "C");
Stream<String> stream2 = Arrays.stream(new String[]{"A", "B", "C"});
Stream<String> stream3 = list.stream();

// Stream operations
List<String> result = list.stream()
    .filter(s -> s.startsWith("A"))
    .map(String::toUpperCase)
    .collect(Collectors.toList());

// Common stream methods
long count = list.stream().count();
boolean anyMatch = list.stream().anyMatch(s -> s.length() > 5);
boolean allMatch = list.stream().allMatch(s -> s.length() > 0);
Optional<String> first = list.stream().findFirst();
Optional<String> any = list.stream().findAny();

// Collectors
List<String> collected = list.stream()
    .filter(s -> s.length() > 3)
    .collect(Collectors.toList());

Set<String> set = list.stream()
    .collect(Collectors.toSet());

Map<String, Integer> map = list.stream()
    .collect(Collectors.toMap(
        s -> s,
        String::length
    ));

String joined = list.stream()
    .collect(Collectors.joining(", "));
```

## Optional (Java 8+)

```java
import java.util.Optional;

// Creating Optional
Optional<String> optional1 = Optional.of("Hello");
Optional<String> optional2 = Optional.empty();
Optional<String> optional3 = Optional.ofNullable(null);

// Using Optional
if (optional1.isPresent()) {
    String value = optional1.get();
    System.out.println(value);
}

// Functional approach
optional1.ifPresent(System.out::println);
String result = optional1.orElse("Default");
String result2 = optional1.orElseGet(() -> "Generated");
String result3 = optional1.orElseThrow(() -> new RuntimeException("Not found"));

// Chaining
Optional<String> result4 = optional1
    .filter(s -> s.length() > 3)
    .map(String::toUpperCase);
```

## Date and Time (Java 8+)

```java
import java.time.*;

// LocalDate
LocalDate date = LocalDate.now();
LocalDate specificDate = LocalDate.of(2023, 12, 25);
LocalDate tomorrow = date.plusDays(1);
LocalDate yesterday = date.minusDays(1);

// LocalTime
LocalTime time = LocalTime.now();
LocalTime specificTime = LocalTime.of(14, 30, 0);
LocalTime later = time.plusHours(2);

// LocalDateTime
LocalDateTime dateTime = LocalDateTime.now();
LocalDateTime specificDateTime = LocalDateTime.of(date, time);

// Duration and Period
Duration duration = Duration.between(time, later);
Period period = Period.between(date, specificDate);

// Formatting
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
String formatted = dateTime.format(formatter);
```

## File I/O

```java
import java.io.*;
import java.nio.file.*;

// Reading files
try (BufferedReader reader = new BufferedReader(new FileReader("file.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
}

// Writing files
try (BufferedWriter writer = new BufferedWriter(new FileWriter("output.txt"))) {
    writer.write("Hello, World!");
    writer.newLine();
    writer.write("Second line");
}

// NIO.2 (Java 7+)
Path path = Paths.get("file.txt");
List<String> lines = Files.readAllLines(path);
Files.write(path, Arrays.asList("Line 1", "Line 2"));

// Creating directories
Files.createDirectories(Paths.get("dir1", "dir2", "dir3"));
```

## Best Practices

```java
// Use meaningful names
public class UserService {
    public User findUserById(int userId) {
        // implementation
    }
}

// Use constants for magic numbers
public class Constants {
    public static final int MAX_RETRY_ATTEMPTS = 3;
    public static final String DEFAULT_TIMEZONE = "UTC";
}

// Use StringBuilder for string concatenation in loops
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    sb.append("Item ").append(i).append(", ");
}

// Use try-with-resources
try (Connection conn = DriverManager.getConnection(url);
     PreparedStatement stmt = conn.prepareStatement(sql)) {
    // Use connection and statement
}

// Use Optional instead of null
public Optional<User> findUser(int id) {
    // Return Optional.empty() instead of null
}

// Use streams for functional programming
List<String> filtered = items.stream()
    .filter(item -> item != null)
    .map(String::trim)
    .collect(Collectors.toList());
```

## Common Design Patterns

```java
// Singleton pattern
public class Singleton {
    private static Singleton instance;
    private Singleton() {}
    
    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}

// Factory pattern
public interface Animal {
    void makeSound();
}

public class AnimalFactory {
    public static Animal createAnimal(String type) {
        switch (type.toLowerCase()) {
            case "dog":
                return new Dog();
            case "cat":
                return new Cat();
            default:
                throw new IllegalArgumentException("Unknown animal type");
        }
    }
}

// Observer pattern
public interface Observer {
    void update(String message);
}

public class Subject {
    private List<Observer> observers = new ArrayList<>();
    
    public void attach(Observer observer) {
        observers.add(observer);
    }
    
    public void notifyObservers(String message) {
        for (Observer observer : observers) {
            observer.update(message);
        }
    }
}
```
