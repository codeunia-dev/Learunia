# C# Programming Cheatsheet

## Getting Started

### Installation and Setup
```bash
# Install .NET SDK
# Download from https://dotnet.microsoft.com/download

# Check installation
dotnet --version
dotnet --info

# Create new console application
dotnet new console -n MyApp
cd MyApp

# Create new web API
dotnet new webapi -n MyWebApi

# Create new MVC application
dotnet new mvc -n MyMvcApp

# Create new Blazor application
dotnet new blazorserver -n MyBlazorApp

# Restore packages
dotnet restore

# Build application
dotnet build

# Run application
dotnet run

# Publish application
dotnet publish -c Release
```

### Hello World
```csharp
// Program.cs (.NET 6+ top-level statements)
Console.WriteLine("Hello, World!");

// Traditional Program.cs
using System;

namespace HelloWorld
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello, World!");
        }
    }
}
```

### Project File (csproj)
```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Newtonsoft.Json" Version="13.0.3" />
    <PackageReference Include="Microsoft.EntityFrameworkCore" Version="8.0.0" />
  </ItemGroup>
</Project>
```

## Basic Syntax

### Variables and Data Types
```csharp
using System;

// Value types
int number = 42;
double price = 19.99;
float temperature = 98.6f;
decimal currency = 123.45m;
bool isActive = true;
char letter = 'A';
byte age = 25;
short distance = 1000;
long population = 7800000000L;

// Reference types
string name = "John Doe";
object obj = new object();
dynamic dynamicVar = "Can be anything";

// Nullable types
int? nullableInt = null;
string? nullableString = null;

// var keyword (implicit typing)
var message = "Hello"; // string
var count = 10;       // int
var items = new List<string>(); // List<string>

// Constants
const double PI = 3.14159;
const string APP_NAME = "MyApp";

// readonly fields
public readonly DateTime CreatedAt = DateTime.Now;

// Arrays
int[] numbers = { 1, 2, 3, 4, 5 };
string[] names = new string[3];
int[,] matrix = new int[3, 3];
int[][] jaggedArray = new int[3][];

Console.WriteLine($"Name: {name}, Age: {age}, Price: {price:C}");
```

### String Operations
```csharp
using System;

// String creation
string str1 = "Hello";
string str2 = "World";
string str3 = string.Empty;
string str4 = null;

// String concatenation
string greeting = str1 + " " + str2;
string greeting2 = string.Concat(str1, " ", str2);
string greeting3 = $"{str1} {str2}"; // String interpolation
string greeting4 = string.Format("{0} {1}", str1, str2);

// String methods
string text = "  Hello World  ";
Console.WriteLine(text.Length);           // 15
Console.WriteLine(text.Trim());           // "Hello World"
Console.WriteLine(text.ToUpper());        // "  HELLO WORLD  "
Console.WriteLine(text.ToLower());        // "  hello world  "
Console.WriteLine(text.Contains("World")); // True
Console.WriteLine(text.IndexOf("World"));  // 8
Console.WriteLine(text.Replace("World", "C#")); // "  Hello C#  "
Console.WriteLine(text.Substring(2, 5));  // "Hello"

// String splitting and joining
string csv = "apple,banana,orange";
string[] fruits = csv.Split(',');
string rejoined = string.Join(" | ", fruits);

// StringBuilder for multiple concatenations
using System.Text;
var sb = new StringBuilder();
sb.Append("Hello");
sb.Append(" ");
sb.AppendLine("World");
string result = sb.ToString();

// Raw string literals (.NET 7+)
string json = """
{
    "name": "John",
    "age": 30
}
""";

// Verbatim strings
string path = @"C:\Users\John\Documents\file.txt";
string multiline = @"This is a
multi-line
string";
```

## Control Flow

### Conditional Statements
```csharp
// if-else
int score = 85;
if (score >= 90)
{
    Console.WriteLine("Grade: A");
}
else if (score >= 80)
{
    Console.WriteLine("Grade: B");
}
else if (score >= 70)
{
    Console.WriteLine("Grade: C");
}
else
{
    Console.WriteLine("Grade: F");
}

// Ternary operator
string result = score >= 60 ? "Pass" : "Fail";

// switch statement
string dayName = DateTime.Now.DayOfWeek switch
{
    DayOfWeek.Monday => "Monday",
    DayOfWeek.Tuesday => "Tuesday",
    DayOfWeek.Wednesday => "Wednesday",
    DayOfWeek.Thursday => "Thursday",
    DayOfWeek.Friday => "Friday",
    DayOfWeek.Saturday => "Saturday",
    DayOfWeek.Sunday => "Sunday",
    _ => "Unknown"
};

// Traditional switch
switch (score / 10)
{
    case 10:
    case 9:
        Console.WriteLine("Excellent");
        break;
    case 8:
        Console.WriteLine("Good");
        break;
    case 7:
        Console.WriteLine("Average");
        break;
    default:
        Console.WriteLine("Needs Improvement");
        break;
}

// Pattern matching (C# 8+)
object value = 42;
string description = value switch
{
    int i when i > 0 => "Positive integer",
    int i when i < 0 => "Negative integer",
    int => "Zero",
    string s => $"String: {s}",
    null => "Null value",
    _ => "Unknown type"
};
```

### Loops
```csharp
// for loop
for (int i = 0; i < 10; i++)
{
    Console.WriteLine($"Count: {i}");
}

// foreach loop
string[] names = { "Alice", "Bob", "Charlie" };
foreach (string name in names)
{
    Console.WriteLine($"Hello, {name}!");
}

// foreach with index
foreach (var (name, index) in names.Select((name, index) => (name, index)))
{
    Console.WriteLine($"{index}: {name}");
}

// while loop
int count = 0;
while (count < 5)
{
    Console.WriteLine($"Count: {count}");
    count++;
}

// do-while loop
int number;
do
{
    Console.Write("Enter a positive number: ");
    int.TryParse(Console.ReadLine(), out number);
} while (number <= 0);

// break and continue
for (int i = 0; i < 10; i++)
{
    if (i == 3) continue;  // Skip 3
    if (i == 7) break;     // Stop at 7
    Console.WriteLine(i);
}

// Loop with collection
var numbers = new List<int> { 1, 2, 3, 4, 5 };
foreach (int num in numbers)
{
    Console.WriteLine(num * 2);
}
```

## Methods and Functions

### Basic Methods
```csharp
using System;

class Calculator
{
    // Static method
    public static int Add(int a, int b)
    {
        return a + b;
    }

    // Instance method
    public int Multiply(int a, int b)
    {
        return a * b;
    }

    // Method with default parameters
    public double CalculateArea(double radius, double pi = 3.14159)
    {
        return pi * radius * radius;
    }

    // Method with params keyword
    public int Sum(params int[] numbers)
    {
        int total = 0;
        foreach (int num in numbers)
        {
            total += num;
        }
        return total;
    }

    // Method with out parameter
    public bool TryDivide(int dividend, int divisor, out double result)
    {
        if (divisor == 0)
        {
            result = 0;
            return false;
        }
        result = (double)dividend / divisor;
        return true;
    }

    // Method with ref parameter
    public void Increment(ref int value)
    {
        value++;
    }

    // Method with in parameter (read-only reference)
    public void ProcessLargeStruct(in LargeStruct data)
    {
        // data is read-only here
        Console.WriteLine(data.Value);
    }

    // Generic method
    public T GetMax<T>(T a, T b) where T : IComparable<T>
    {
        return a.CompareTo(b) > 0 ? a : b;
    }

    // Async method
    public async Task<string> GetDataAsync()
    {
        await Task.Delay(1000); // Simulate async work
        return "Data retrieved";
    }

    // Expression-bodied method
    public int Square(int x) => x * x;

    // Local function
    public int ProcessNumbers(int[] numbers)
    {
        int Sum(int[] nums)
        {
            int total = 0;
            foreach (int num in nums)
                total += num;
            return total;
        }

        return Sum(numbers);
    }
}

struct LargeStruct
{
    public int Value { get; set; }
}

// Usage
class Program
{
    static void Main(string[] args)
    {
        // Static method call
        int sum = Calculator.Add(5, 3);

        // Instance method call
        var calc = new Calculator();
        int product = calc.Multiply(4, 6);

        // Method with default parameter
        double area = calc.CalculateArea(5.0);

        // Method with params
        int total = calc.Sum(1, 2, 3, 4, 5);

        // Method with out parameter
        if (calc.TryDivide(10, 3, out double result))
        {
            Console.WriteLine($"Result: {result}");
        }

        // Method with ref parameter
        int value = 5;
        calc.Increment(ref value);
        Console.WriteLine($"Incremented value: {value}");

        // Generic method
        int maxInt = calc.GetMax(10, 20);
        string maxString = calc.GetMax("apple", "banana");

        // Async method
        var task = calc.GetDataAsync();
        Console.WriteLine(task.Result);
    }
}
```

### Lambda Expressions and Delegates
```csharp
using System;
using System.Collections.Generic;
using System.Linq;

// Delegate declaration
public delegate int MathOperation(int a, int b);
public delegate void EventHandler();

class Program
{
    static void Main(string[] args)
    {
        // Delegate with lambda
        MathOperation add = (a, b) => a + b;
        MathOperation multiply = (a, b) => a * b;

        Console.WriteLine(add(5, 3));      // 8
        Console.WriteLine(multiply(4, 6)); // 24

        // Action delegate (no return value)
        Action<string> greet = name => Console.WriteLine($"Hello, {name}!");
        greet("World");

        // Func delegate (with return value)
        Func<int, int, int> subtract = (a, b) => a - b;
        Console.WriteLine(subtract(10, 4)); // 6

        // Predicate delegate
        Predicate<int> isEven = x => x % 2 == 0;
        Console.WriteLine(isEven(4)); // True

        // Lambda with collections
        var numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

        // Where (filter)
        var evenNumbers = numbers.Where(n => n % 2 == 0).ToList();
        
        // Select (map)
        var squares = numbers.Select(n => n * n).ToList();
        
        // OrderBy
        var ordered = numbers.OrderByDescending(n => n).ToList();
        
        // Aggregate
        int sum = numbers.Aggregate((acc, n) => acc + n);
        
        // Any and All
        bool hasEven = numbers.Any(n => n % 2 == 0);
        bool allPositive = numbers.All(n => n > 0);

        // GroupBy
        var grouped = numbers.GroupBy(n => n % 2 == 0 ? "Even" : "Odd")
                           .ToDictionary(g => g.Key, g => g.ToList());

        // Multiple parameters
        Func<int, int, int, int> addThree = (a, b, c) => a + b + c;
        
        // Expression body syntax
        Func<string, string> toUpper = s => s.ToUpper();
        
        // Block body syntax
        Func<string, string> processString = s =>
        {
            s = s.Trim();
            s = s.ToUpper();
            return s;
        };

        // Event handling
        EventHandler onClick = () => Console.WriteLine("Button clicked!");
        onClick();

        // Multicast delegate
        EventHandler multicast = () => Console.WriteLine("First handler");
        multicast += () => Console.WriteLine("Second handler");
        multicast(); // Calls both handlers
    }
}
```

## Object-Oriented Programming

### Classes and Objects
```csharp
using System;
using System.Collections.Generic;

// Base class
public class Person
{
    // Fields
    private string _name;
    private int _age;
    
    // Properties
    public string Name 
    { 
        get { return _name; } 
        set { _name = value ?? throw new ArgumentNullException(nameof(value)); } 
    }
    
    // Auto-property
    public int Age { get; set; }
    
    // Read-only property
    public string FullName { get; }
    
    // Property with validation
    private decimal _salary;
    public decimal Salary
    {
        get => _salary;
        set => _salary = value >= 0 ? value : throw new ArgumentException("Salary cannot be negative");
    }

    // Constructors
    public Person()
    {
        Name = "Unknown";
        Age = 0;
    }

    public Person(string name, int age)
    {
        Name = name;
        Age = age;
        FullName = $"{name} (Age: {age})";
    }

    // Static constructor
    static Person()
    {
        Console.WriteLine("Person class initialized");
    }

    // Methods
    public virtual void Introduce()
    {
        Console.WriteLine($"Hi, I'm {Name} and I'm {Age} years old.");
    }

    public void Greet(string otherName)
    {
        Console.WriteLine($"Hello {otherName}, nice to meet you!");
    }

    // Static method
    public static Person CreateAdult(string name)
    {
        return new Person(name, 18);
    }

    // Override ToString
    public override string ToString()
    {
        return $"Person: {Name}, Age: {Age}";
    }

    // Override Equals
    public override bool Equals(object obj)
    {
        if (obj is Person other)
        {
            return Name == other.Name && Age == other.Age;
        }
        return false;
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(Name, Age);
    }
}

// Derived class
public class Employee : Person
{
    public string Department { get; set; }
    public decimal Salary { get; set; }
    
    // Constructor calling base constructor
    public Employee(string name, int age, string department, decimal salary) 
        : base(name, age)
    {
        Department = department;
        Salary = salary;
    }

    // Override virtual method
    public override void Introduce()
    {
        base.Introduce(); // Call base implementation
        Console.WriteLine($"I work in {Department} department.");
    }

    // New method
    public void Work()
    {
        Console.WriteLine($"{Name} is working in {Department}.");
    }

    // Method hiding (using new keyword)
    public new string ToString()
    {
        return $"Employee: {Name}, Department: {Department}";
    }
}

// Abstract class
public abstract class Animal
{
    public string Name { get; set; }
    
    // Abstract method (must be implemented by derived classes)
    public abstract void MakeSound();
    
    // Virtual method (can be overridden)
    public virtual void Sleep()
    {
        Console.WriteLine($"{Name} is sleeping.");
    }
    
    // Concrete method
    public void Eat()
    {
        Console.WriteLine($"{Name} is eating.");
    }
}

public class Dog : Animal
{
    public override void MakeSound()
    {
        Console.WriteLine($"{Name} says: Woof!");
    }
    
    public override void Sleep()
    {
        Console.WriteLine($"{Name} the dog is sleeping on the couch.");
    }
}

// Sealed class (cannot be inherited)
public sealed class FinalClass
{
    public void DoSomething()
    {
        Console.WriteLine("This class cannot be inherited.");
    }
}

// Usage
class Program
{
    static void Main(string[] args)
    {
        // Create objects
        var person = new Person("Alice", 25);
        person.Introduce();

        var employee = new Employee("Bob", 30, "IT", 75000);
        employee.Introduce();
        employee.Work();

        // Polymorphism
        Person polymorphic = new Employee("Charlie", 35, "HR", 65000);
        polymorphic.Introduce(); // Calls Employee's implementation

        // Abstract class usage
        Animal dog = new Dog { Name = "Buddy" };
        dog.MakeSound();
        dog.Sleep();
        dog.Eat();

        // Static method
        Person adult = Person.CreateAdult("David");
        adult.Introduce();
    }
}
```

### Interfaces
```csharp
using System;
using System.Collections.Generic;

// Interface definition
public interface IDrawable
{
    void Draw();
    void Move(int x, int y);
    
    // Property in interface
    string Color { get; set; }
    
    // Default interface implementation (C# 8+)
    void Reset()
    {
        Color = "Black";
        Console.WriteLine("Shape reset to default color.");
    }
}

// Another interface
public interface IResizable
{
    void Resize(double factor);
    double Area { get; }
}

// Interface with generic
public interface IRepository<T>
{
    void Add(T item);
    T GetById(int id);
    IEnumerable<T> GetAll();
    void Update(T item);
    void Delete(int id);
}

// Class implementing multiple interfaces
public class Rectangle : IDrawable, IResizable
{
    public double Width { get; set; }
    public double Height { get; set; }
    public string Color { get; set; } = "Black";
    
    public double Area => Width * Height;

    public Rectangle(double width, double height)
    {
        Width = width;
        Height = height;
    }

    public void Draw()
    {
        Console.WriteLine($"Drawing a {Color} rectangle ({Width}x{Height})");
    }

    public void Move(int x, int y)
    {
        Console.WriteLine($"Moving rectangle to ({x}, {y})");
    }

    public void Resize(double factor)
    {
        Width *= factor;
        Height *= factor;
        Console.WriteLine($"Resized rectangle to ({Width}x{Height})");
    }
}

// Generic repository implementation
public class UserRepository : IRepository<User>
{
    private List<User> _users = new List<User>();
    private int _nextId = 1;

    public void Add(User item)
    {
        item.Id = _nextId++;
        _users.Add(item);
    }

    public User GetById(int id)
    {
        return _users.Find(u => u.Id == id);
    }

    public IEnumerable<User> GetAll()
    {
        return _users;
    }

    public void Update(User item)
    {
        var existing = GetById(item.Id);
        if (existing != null)
        {
            existing.Name = item.Name;
            existing.Email = item.Email;
        }
    }

    public void Delete(int id)
    {
        _users.RemoveAll(u => u.Id == id);
    }
}

public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
}

// Interface segregation
public interface IReadOnlyRepository<T>
{
    T GetById(int id);
    IEnumerable<T> GetAll();
}

public interface IWriteOnlyRepository<T>
{
    void Add(T item);
    void Update(T item);
    void Delete(int id);
}

// Explicit interface implementation
public class Shape : IDrawable
{
    public string Color { get; set; } = "Red";
    
    // Implicit implementation
    public void Draw()
    {
        Console.WriteLine($"Drawing shape in {Color}");
    }
    
    // Explicit implementation
    void IDrawable.Move(int x, int y)
    {
        Console.WriteLine($"Moving shape to ({x}, {y})");
    }
}

// Usage
class Program
{
    static void Main(string[] args)
    {
        // Interface usage
        IDrawable rectangle = new Rectangle(10, 5);
        rectangle.Draw();
        rectangle.Move(10, 20);
        rectangle.Reset(); // Default interface method

        // Multiple interfaces
        var rect = new Rectangle(8, 6);
        rect.Draw();
        ((IResizable)rect).Resize(1.5);
        Console.WriteLine($"Area: {((IResizable)rect).Area}");

        // Repository pattern
        IRepository<User> userRepo = new UserRepository();
        userRepo.Add(new User { Name = "John", Email = "john@email.com" });
        userRepo.Add(new User { Name = "Jane", Email = "jane@email.com" });

        foreach (var user in userRepo.GetAll())
        {
            Console.WriteLine($"User: {user.Name} ({user.Email})");
        }

        // Explicit interface implementation
        var shape = new Shape();
        shape.Draw(); // Calls implicit implementation
        ((IDrawable)shape).Move(5, 10); // Calls explicit implementation

        // Interface as parameter
        DrawShape(rectangle);
        DrawShape(shape);
    }

    static void DrawShape(IDrawable shape)
    {
        shape.Draw();
    }
}
```

## Exception Handling

### Try-Catch-Finally
```csharp
using System;
using System.IO;
using System.Net.Http;

class ExceptionHandling
{
    static void Main(string[] args)
    {
        // Basic try-catch
        try
        {
            int result = 10 / 0; // This will throw DivideByZeroException
        }
        catch (DivideByZeroException ex)
        {
            Console.WriteLine($"Cannot divide by zero: {ex.Message}");
        }

        // Multiple catch blocks
        try
        {
            string input = Console.ReadLine();
            int number = int.Parse(input);
            int result = 100 / number;
            Console.WriteLine($"Result: {result}");
        }
        catch (FormatException ex)
        {
            Console.WriteLine($"Invalid format: {ex.Message}");
        }
        catch (DivideByZeroException ex)
        {
            Console.WriteLine($"Cannot divide by zero: {ex.Message}");
        }
        catch (Exception ex) // Catch all other exceptions
        {
            Console.WriteLine($"An error occurred: {ex.Message}");
        }

        // Try-catch-finally
        FileStream fs = null;
        try
        {
            fs = new FileStream("test.txt", FileMode.Open);
            // Read from file
        }
        catch (FileNotFoundException)
        {
            Console.WriteLine("File not found");
        }
        catch (UnauthorizedAccessException)
        {
            Console.WriteLine("Access denied");
        }
        finally
        {
            fs?.Close(); // Always executed
            Console.WriteLine("File stream closed");
        }

        // Using statement (automatic disposal)
        try
        {
            using (var file = new FileStream("test.txt", FileMode.OpenOrCreate))
            {
                // File operations
            } // Automatically disposed here
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }

        // Exception filtering (when clause)
        try
        {
            ThrowCustomException();
        }
        catch (CustomException ex) when (ex.ErrorCode == 500)
        {
            Console.WriteLine("Server error occurred");
        }
        catch (CustomException ex) when (ex.ErrorCode == 404)
        {
            Console.WriteLine("Not found error occurred");
        }

        // Nested try-catch
        try
        {
            try
            {
                int result = 10 / 0;
            }
            catch (DivideByZeroException)
            {
                Console.WriteLine("Inner catch");
                throw; // Re-throw the exception
            }
        }
        catch (DivideByZeroException)
        {
            Console.WriteLine("Outer catch");
        }

        // Async exception handling
        HandleAsyncExceptions().Wait();
    }

    static void ThrowCustomException()
    {
        throw new CustomException("Something went wrong", 500);
    }

    static async Task HandleAsyncExceptions()
    {
        try
        {
            using (var client = new HttpClient())
            {
                var response = await client.GetStringAsync("https://invalid-url.com");
            }
        }
        catch (HttpRequestException ex)
        {
            Console.WriteLine($"HTTP error: {ex.Message}");
        }
        catch (TaskCanceledException ex)
        {
            Console.WriteLine($"Request timeout: {ex.Message}");
        }
    }
}

// Custom exception class
public class CustomException : Exception
{
    public int ErrorCode { get; }

    public CustomException(string message, int errorCode) : base(message)
    {
        ErrorCode = errorCode;
    }

    public CustomException(string message, int errorCode, Exception innerException) 
        : base(message, innerException)
    {
        ErrorCode = errorCode;
    }
}

// Exception handling best practices
public class BestPractices
{
    // Don't catch and ignore exceptions
    public void BadExample()
    {
        try
        {
            // Some operation
        }
        catch
        {
            // Silent failure - BAD!
        }
    }

    // Good: Handle specific exceptions
    public void GoodExample()
    {
        try
        {
            // Some operation
        }
        catch (SpecificException ex)
        {
            // Handle specific exception
            LogError(ex);
            // Possibly re-throw or handle gracefully
        }
    }

    // Use TryParse methods to avoid exceptions
    public bool ParseInteger(string input, out int result)
    {
        return int.TryParse(input, out result);
    }

    // Validate parameters
    public void ProcessData(string data)
    {
        if (string.IsNullOrEmpty(data))
            throw new ArgumentNullException(nameof(data));
        
        // Process data
    }

    private void LogError(Exception ex)
    {
        Console.WriteLine($"Error logged: {ex}");
    }
}
```

## Collections and LINQ

### Collections
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Concurrent;
using System.Linq;

class CollectionsDemo
{
    static void Main(string[] args)
    {
        // List<T>
        var numbers = new List<int> { 1, 2, 3, 4, 5 };
        numbers.Add(6);
        numbers.AddRange(new[] { 7, 8, 9 });
        numbers.Insert(0, 0);
        numbers.Remove(5);
        numbers.RemoveAt(0);
        Console.WriteLine($"Count: {numbers.Count}");

        // Dictionary<TKey, TValue>
        var scores = new Dictionary<string, int>
        {
            ["Alice"] = 95,
            ["Bob"] = 87,
            ["Charlie"] = 92
        };
        
        scores.Add("David", 88);
        scores["Eve"] = 91; // Add or update
        
        if (scores.TryGetValue("Alice", out int aliceScore))
        {
            Console.WriteLine($"Alice's score: {aliceScore}");
        }

        foreach (var kvp in scores)
        {
            Console.WriteLine($"{kvp.Key}: {kvp.Value}");
        }

        // HashSet<T> (unique elements)
        var uniqueNumbers = new HashSet<int> { 1, 2, 3, 2, 1 }; // Only 1, 2, 3
        uniqueNumbers.Add(4);
        uniqueNumbers.UnionWith(new[] { 5, 6, 7 });
        
        var otherSet = new HashSet<int> { 3, 4, 5 };
        uniqueNumbers.IntersectWith(otherSet); // Keep only common elements

        // Queue<T> (FIFO)
        var queue = new Queue<string>();
        queue.Enqueue("First");
        queue.Enqueue("Second");
        queue.Enqueue("Third");
        
        while (queue.Count > 0)
        {
            string item = queue.Dequeue();
            Console.WriteLine($"Processed: {item}");
        }

        // Stack<T> (LIFO)
        var stack = new Stack<int>();
        stack.Push(1);
        stack.Push(2);
        stack.Push(3);
        
        while (stack.Count > 0)
        {
            int item = stack.Pop();
            Console.WriteLine($"Popped: {item}");
        }

        // SortedDictionary<TKey, TValue>
        var sortedDict = new SortedDictionary<string, int>
        {
            ["Zebra"] = 1,
            ["Apple"] = 2,
            ["Banana"] = 3
        };
        // Items are automatically sorted by key

        // ConcurrentDictionary<TKey, TValue> (thread-safe)
        var concurrentDict = new ConcurrentDictionary<int, string>();
        concurrentDict.TryAdd(1, "One");
        concurrentDict.AddOrUpdate(2, "Two", (key, oldValue) => "Updated Two");

        // LinkedList<T>
        var linkedList = new LinkedList<string>();
        linkedList.AddFirst("First");
        linkedList.AddLast("Last");
        linkedList.AddAfter(linkedList.First, "Middle");

        // Custom collection
        var customCollection = new CustomCollection<int>();
        customCollection.Add(1);
        customCollection.Add(2);
        customCollection.Add(3);

        foreach (int item in customCollection)
        {
            Console.WriteLine(item);
        }
    }
}

// Custom collection implementing IEnumerable<T>
public class CustomCollection<T> : IEnumerable<T>
{
    private List<T> _items = new List<T>();

    public void Add(T item)
    {
        _items.Add(item);
    }

    public IEnumerator<T> GetEnumerator()
    {
        return _items.GetEnumerator();
    }

    IEnumerator IEnumerable.GetEnumerator()
    {
        return GetEnumerator();
    }
}
```

### LINQ (Language Integrated Query)
```csharp
using System;
using System.Collections.Generic;
using System.Linq;

class LinqDemo
{
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Department { get; set; }
        public double GPA { get; set; }
    }

    public class Course
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Department { get; set; }
        public int Credits { get; set; }
    }

    static void Main(string[] args)
    {
        var students = new List<Student>
        {
            new Student { Id = 1, Name = "Alice", Age = 20, Department = "CS", GPA = 3.8 },
            new Student { Id = 2, Name = "Bob", Age = 22, Department = "Math", GPA = 3.2 },
            new Student { Id = 3, Name = "Charlie", Age = 19, Department = "CS", GPA = 3.9 },
            new Student { Id = 4, Name = "Diana", Age = 21, Department = "Physics", GPA = 3.6 },
            new Student { Id = 5, Name = "Eve", Age = 20, Department = "Math", GPA = 3.4 }
        };

        var courses = new List<Course>
        {
            new Course { Id = 1, Name = "Data Structures", Department = "CS", Credits = 3 },
            new Course { Id = 2, Name = "Algorithms", Department = "CS", Credits = 4 },
            new Course { Id = 3, Name = "Calculus", Department = "Math", Credits = 4 },
            new Course { Id = 4, Name = "Physics I", Department = "Physics", Credits = 3 }
        };

        // Where (filtering)
        var csStudents = students.Where(s => s.Department == "CS").ToList();
        var highGpaStudents = students.Where(s => s.GPA > 3.5);

        // Select (projection)
        var studentNames = students.Select(s => s.Name).ToList();
        var studentInfo = students.Select(s => new { s.Name, s.GPA }).ToList();

        // SelectMany (flattening)
        var departments = new[] { new[] { "CS", "Math" }, new[] { "Physics", "Chemistry" } };
        var allDepts = departments.SelectMany(d => d).ToList();

        // OrderBy / OrderByDescending
        var sortedByGpa = students.OrderByDescending(s => s.GPA).ToList();
        var sortedByAgeThenName = students.OrderBy(s => s.Age).ThenBy(s => s.Name).ToList();

        // GroupBy
        var studentsByDept = students.GroupBy(s => s.Department)
                                   .ToDictionary(g => g.Key, g => g.ToList());

        var deptStats = students.GroupBy(s => s.Department)
                               .Select(g => new
                               {
                                   Department = g.Key,
                                   Count = g.Count(),
                                   AverageGPA = g.Average(s => s.GPA),
                                   MaxGPA = g.Max(s => s.GPA)
                               }).ToList();

        // Join
        var studentCourses = from s in students
                           join c in courses on s.Department equals c.Department
                           select new { StudentName = s.Name, CourseName = c.Name };

        // Group Join
        var deptWithCourses = from d in students.Select(s => s.Department).Distinct()
                            join c in courses on d equals c.Department into courseGroup
                            select new { Department = d, Courses = courseGroup };

        // Aggregate functions
        int totalStudents = students.Count();
        double averageAge = students.Average(s => s.Age);
        double minGpa = students.Min(s => s.GPA);
        double maxGpa = students.Max(s => s.GPA);
        double totalGpa = students.Sum(s => s.GPA);

        // First, FirstOrDefault, Single, SingleOrDefault
        var firstCsStudent = students.First(s => s.Department == "CS");
        var firstPhysicsStudent = students.FirstOrDefault(s => s.Department == "Physics");
        var singleStudentNamed = students.SingleOrDefault(s => s.Name == "Alice");

        // Any, All
        bool hasYoungStudents = students.Any(s => s.Age < 20);
        bool allPassingGrade = students.All(s => s.GPA >= 2.0);

        // Take, Skip, TakeWhile, SkipWhile
        var first3Students = students.Take(3).ToList();
        var skip2Students = students.Skip(2).ToList();
        var takeWhileYoung = students.OrderBy(s => s.Age).TakeWhile(s => s.Age < 21).ToList();

        // Distinct
        var uniqueDepartments = students.Select(s => s.Department).Distinct().ToList();

        // Union, Intersect, Except
        var dept1 = new[] { "CS", "Math" };
        var dept2 = new[] { "Math", "Physics" };
        var unionDepts = dept1.Union(dept2).ToList();        // CS, Math, Physics
        var intersectDepts = dept1.Intersect(dept2).ToList(); // Math
        var exceptDepts = dept1.Except(dept2).ToList();       // CS

        // Complex query with method syntax
        var complexQuery = students
            .Where(s => s.GPA > 3.0)
            .GroupBy(s => s.Department)
            .Where(g => g.Count() > 1)
            .Select(g => new
            {
                Department = g.Key,
                Students = g.OrderByDescending(s => s.GPA).Select(s => s.Name),
                AverageGPA = g.Average(s => s.GPA)
            })
            .OrderBy(x => x.Department);

        // Query syntax (SQL-like)
        var querySyntax = from s in students
                         where s.GPA > 3.5
                         orderby s.Name
                         select new { s.Name, s.Department, s.GPA };

        // Parallel LINQ (PLINQ)
        var parallelQuery = students.AsParallel()
                                  .Where(s => s.GPA > 3.0)
                                  .Select(s => s.Name)
                                  .ToList();

        // Custom extension method
        var adultStudents = students.WhereAdult().ToList();

        // Display results
        Console.WriteLine("CS Students:");
        csStudents.ForEach(s => Console.WriteLine($"  {s.Name} - GPA: {s.GPA}"));

        Console.WriteLine("\nDepartment Statistics:");
        foreach (var stat in deptStats)
        {
            Console.WriteLine($"  {stat.Department}: {stat.Count} students, Avg GPA: {stat.AverageGPA:F2}");
        }
    }
}

// Custom extension method
public static class StudentExtensions
{
    public static IEnumerable<LinqDemo.Student> WhereAdult(this IEnumerable<LinqDemo.Student> students)
    {
        return students.Where(s => s.Age >= 18);
    }
}
```

## Best Practices

### Performance Tips
1. **Use appropriate collection types** based on access patterns
2. **Prefer `StringBuilder` for multiple string concatenations**
3. **Use `async/await` for I/O operations**
4. **Dispose resources properly** with `using` statements
5. **Avoid boxing/unboxing** with generics
6. **Use `const` and `readonly`** for immutable data
7. **Profile and measure** performance bottlenecks
8. **Use `Span<T>` and `Memory<T>`** for high-performance scenarios
9. **Minimize allocations** in hot paths
10. **Use `ConfigureAwait(false)`** in library code

### Code Organization
1. **Follow naming conventions** (PascalCase for public, camelCase for private)
2. **Use meaningful names** for variables, methods, and classes
3. **Keep methods small** and focused on single responsibility
4. **Use regions sparingly** and prefer good organization
5. **Document public APIs** with XML comments
6. **Write unit tests** for all business logic
7. **Use dependency injection** for loose coupling
8. **Follow SOLID principles**
9. **Use consistent formatting** with EditorConfig
10. **Leverage static analysis** tools like FxCop/Roslyn analyzers
