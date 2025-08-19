# C++ Cheatsheet

## Basic Syntax

```cpp
// Hello World
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}

// Variables
int number = 42;
double decimal = 3.14;
char letter = 'A';
bool flag = true;
string text = "Hello";

// Constants
const int MAX_SIZE = 100;
#define PI 3.14159

// Comments
// Single line comment
/* Multi-line comment */
```

## Data Types

```cpp
// Integer types
short s = 32767;        // 16-bit, -32,768 to 32,767
int i = 2147483647;     // 32-bit, -2^31 to 2^31-1
long l = 2147483647L;   // At least 32-bit
long long ll = 9223372036854775807LL; // 64-bit

// Floating point types
float f = 3.14f;        // 32-bit
double d = 3.14;        // 64-bit
long double ld = 3.14L; // Extended precision

// Character types
char c = 'A';           // 8-bit
wchar_t wc = L'A';      // Wide character
char16_t c16 = u'A';    // 16-bit Unicode
char32_t c32 = U'A';    // 32-bit Unicode

// Boolean type
bool b = true;          // true or false
```

## Control Flow

```cpp
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

// Loops
for (int i = 0; i < 10; i++) {
    cout << i << endl;
}

for (auto item : container) {
    cout << item << endl;
}

while (condition) {
    // code
}

do {
    // code
} while (condition);
```

## Arrays and Vectors

```cpp
#include <vector>
#include <array>

// C-style arrays
int arr[5] = {1, 2, 3, 4, 5};
int arr2[] = {1, 2, 3, 4, 5};

// Multi-dimensional arrays
int matrix[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};

// std::array (C++11)
array<int, 5> stdArr = {1, 2, 3, 4, 5};
int size = stdArr.size();
int first = stdArr[0];
int firstSafe = stdArr.at(0); // Bounds checking

// std::vector (dynamic array)
vector<int> vec = {1, 2, 3, 4, 5};
vec.push_back(6);
vec.pop_back();
int size = vec.size();
bool empty = vec.empty();
vec.resize(10);
vec.clear();
```

## Strings

```cpp
#include <string>

// String creation
string str1 = "Hello";
string str2("World");
string str3 = str1 + " " + str2;

// String methods
int length = str.length();
int size = str.size();
char charAt = str[0];
char charAtSafe = str.at(0);
string substring = str.substr(0, 3);
string upper = str;
transform(upper.begin(), upper.end(), upper.begin(), ::toupper);
string lower = str;
transform(lower.begin(), lower.end(), lower.begin(), ::tolower);
bool contains = str.find("Hello") != string::npos;
bool startsWith = str.substr(0, 2) == "He";
bool endsWith = str.substr(str.length() - 2) == "lo";

// String concatenation
string result = str1 + " " + str2;
str1.append(" World");
str1 += "!";

// String comparison
bool equal = str1 == str2;
bool less = str1 < str2;
int compare = str1.compare(str2);
```

## Functions

```cpp
// Function declaration
int add(int a, int b);
int add(int a, int b, int c); // Function overloading

// Function definition
int add(int a, int b) {
    return a + b;
}

// Default parameters
int multiply(int a, int b = 1) {
    return a * b;
}

// Pass by reference
void modifyValue(int& value) {
    value *= 2;
}

// Pass by const reference
void printValue(const string& value) {
    cout << value << endl;
}

// Return by reference
int& getElement(vector<int>& vec, int index) {
    return vec[index];
}

// Function pointers
int (*funcPtr)(int, int) = add;
int result = funcPtr(5, 3);

// Lambda functions (C++11)
auto lambda = [](int x, int y) { return x + y; };
int result = lambda(5, 3);

// Lambda with capture
int multiplier = 10;
auto lambda2 = [multiplier](int x) { return x * multiplier; };
```

## Classes and Objects

```cpp
// Class definition
class Person {
private:
    string name;
    int age;
    static int count; // Static member

public:
    // Constructor
    Person(string n, int a) : name(n), age(a) {
        count++;
    }
    
    // Default constructor
    Person() : name("Unknown"), age(0) {
        count++;
    }
    
    // Copy constructor
    Person(const Person& other) : name(other.name), age(other.age) {
        count++;
    }
    
    // Destructor
    ~Person() {
        count--;
    }
    
    // Member functions
    string getName() const { return name; }
    void setName(const string& n) { name = n; }
    int getAge() const { return age; }
    void setAge(int a) { age = a; }
    
    // Static member function
    static int getCount() { return count; }
    
    // Operator overloading
    Person& operator=(const Person& other) {
        if (this != &other) {
            name = other.name;
            age = other.age;
        }
        return *this;
    }
    
    // Friend function
    friend ostream& operator<<(ostream& os, const Person& p);
};

// Static member initialization
int Person::count = 0;

// Friend function definition
ostream& operator<<(ostream& os, const Person& p) {
    os << "Person{name='" << p.name << "', age=" << p.age << "}";
    return os;
}

// Object creation
Person person1("John", 30);
Person person2 = person1; // Copy constructor
Person person3;
person3 = person1; // Assignment operator
```

## Inheritance

```cpp
// Base class
class Animal {
protected:
    string name;
    
public:
    Animal(string n) : name(n) {}
    virtual void makeSound() {
        cout << "Some sound" << endl;
    }
    virtual ~Animal() {} // Virtual destructor
};

// Derived class
class Dog : public Animal {
private:
    string breed;
    
public:
    Dog(string n, string b) : Animal(n), breed(b) {}
    
    void makeSound() override {
        cout << "Woof!" << endl;
    }
    
    void wagTail() {
        cout << "Tail wagging" << endl;
    }
};

// Multiple inheritance
class FlyingAnimal : public Animal {
public:
    FlyingAnimal(string n) : Animal(n) {}
    virtual void fly() {
        cout << "Flying" << endl;
    }
};

class Bird : public Animal, public FlyingAnimal {
public:
    Bird(string n) : Animal(n), FlyingAnimal(n) {}
    
    void makeSound() override {
        cout << "Chirp!" << endl;
    }
    
    void fly() override {
        cout << "Bird flying" << endl;
    }
};
```

## Polymorphism

```cpp
// Virtual functions
class Shape {
public:
    virtual double area() const = 0; // Pure virtual function
    virtual ~Shape() {}
};

class Circle : public Shape {
private:
    double radius;
    
public:
    Circle(double r) : radius(r) {}
    
    double area() const override {
        return 3.14159 * radius * radius;
    }
};

class Rectangle : public Shape {
private:
    double width, height;
    
public:
    Rectangle(double w, double h) : width(w), height(h) {}
    
    double area() const override {
        return width * height;
    }
};

// Polymorphic usage
vector<Shape*> shapes;
shapes.push_back(new Circle(5));
shapes.push_back(new Rectangle(4, 6));

for (auto shape : shapes) {
    cout << "Area: " << shape->area() << endl;
}

// Clean up
for (auto shape : shapes) {
    delete shape;
}
```

## Templates

```cpp
// Function template
template<typename T>
T add(T a, T b) {
    return a + b;
}

// Class template
template<typename T>
class Box {
private:
    T content;
    
public:
    Box(T c) : content(c) {}
    T get() const { return content; }
    void set(T c) { content = c; }
};

// Template specialization
template<>
class Box<string> {
private:
    string content;
    
public:
    Box(string c) : content(c) {}
    string get() const { return content; }
    void set(string c) { content = c; }
    int length() const { return content.length(); }
};

// Template with multiple types
template<typename T, typename U>
class Pair {
public:
    T first;
    U second;
    
    Pair(T f, U s) : first(f), second(s) {}
};

// Usage
int result = add<int>(5, 3);
double result2 = add(5.5, 3.2); // Type deduction
Box<int> intBox(42);
Box<string> stringBox("Hello");
Pair<int, string> pair(1, "One");
```

## STL Containers

```cpp
#include <vector>
#include <list>
#include <deque>
#include <set>
#include <map>
#include <unordered_set>
#include <unordered_map>
#include <stack>
#include <queue>

// Vector
vector<int> vec = {1, 2, 3, 4, 5};
vec.push_back(6);
vec.insert(vec.begin(), 0);
vec.erase(vec.begin());
vec.clear();

// List (doubly linked list)
list<int> lst = {1, 2, 3, 4, 5};
lst.push_front(0);
lst.push_back(6);
lst.pop_front();
lst.pop_back();

// Set (ordered)
set<int> s = {3, 1, 4, 1, 5};
s.insert(2);
s.erase(3);
bool found = s.find(4) != s.end();

// Map (ordered)
map<string, int> m;
m["one"] = 1;
m["two"] = 2;
m["three"] = 3;
int value = m["one"];
bool exists = m.find("two") != m.end();

// Unordered containers (hash tables)
unordered_set<int> us = {1, 2, 3, 4, 5};
unordered_map<string, int> um;
um["one"] = 1;

// Stack
stack<int> st;
st.push(1);
st.push(2);
int top = st.top();
st.pop();

// Queue
queue<int> q;
q.push(1);
q.push(2);
int front = q.front();
q.pop();
```

## STL Algorithms

```cpp
#include <algorithm>
#include <numeric>

vector<int> vec = {3, 1, 4, 1, 5, 9, 2, 6};

// Sorting
sort(vec.begin(), vec.end());
sort(vec.begin(), vec.end(), greater<int>());

// Searching
auto it = find(vec.begin(), vec.end(), 5);
bool found = binary_search(vec.begin(), vec.end(), 5);

// Counting
int count_ones = count(vec.begin(), vec.end(), 1);
int count_even = count_if(vec.begin(), vec.end(), 
    [](int x) { return x % 2 == 0; });

// Transforming
vector<int> doubled;
transform(vec.begin(), vec.end(), back_inserter(doubled),
    [](int x) { return x * 2; });

// Accumulating
int sum = accumulate(vec.begin(), vec.end(), 0);
int product = accumulate(vec.begin(), vec.end(), 1, multiplies<int>());

// Min/Max
auto min_it = min_element(vec.begin(), vec.end());
auto max_it = max_element(vec.begin(), vec.end());
int min_val = *min_it;
int max_val = *max_it);

// Removing
vec.erase(remove(vec.begin(), vec.end(), 1), vec.end());
vec.erase(remove_if(vec.begin(), vec.end(), 
    [](int x) { return x % 2 == 0; }), vec.end());
```

## Smart Pointers (C++11+)

```cpp
#include <memory>

// Unique pointer
unique_ptr<int> ptr1(new int(42));
unique_ptr<int> ptr2 = make_unique<int>(42);
int value = *ptr1;
ptr1.reset(); // Delete and set to nullptr

// Shared pointer
shared_ptr<int> ptr3 = make_shared<int>(42);
shared_ptr<int> ptr4 = ptr3; // Reference count increases
int refCount = ptr3.use_count();

// Weak pointer
weak_ptr<int> ptr5 = ptr3;
if (auto shared = ptr5.lock()) {
    int value = *shared;
}

// Custom deleter
auto deleter = [](int* p) { 
    cout << "Deleting " << *p << endl; 
    delete p; 
};
unique_ptr<int, decltype(deleter)> ptr6(new int(42), deleter);
```

## Exception Handling

```cpp
#include <stdexcept>

// Try-catch
try {
    if (value < 0) {
        throw invalid_argument("Value cannot be negative");
    }
    // Process value
} catch (const invalid_argument& e) {
    cerr << "Invalid argument: " << e.what() << endl;
} catch (const exception& e) {
    cerr << "Exception: " << e.what() << endl;
} catch (...) {
    cerr << "Unknown exception" << endl;
}

// Custom exception
class CustomException : public exception {
private:
    string message;
    
public:
    CustomException(const string& msg) : message(msg) {}
    
    const char* what() const noexcept override {
        return message.c_str();
    }
};

// RAII (Resource Acquisition Is Initialization)
class ResourceManager {
private:
    int* resource;
    
public:
    ResourceManager() : resource(new int(42)) {}
    
    ~ResourceManager() {
        delete resource;
    }
    
    // Disable copy
    ResourceManager(const ResourceManager&) = delete;
    ResourceManager& operator=(const ResourceManager&) = delete;
    
    // Enable move
    ResourceManager(ResourceManager&& other) noexcept 
        : resource(other.resource) {
        other.resource = nullptr;
    }
    
    ResourceManager& operator=(ResourceManager&& other) noexcept {
        if (this != &other) {
            delete resource;
            resource = other.resource;
            other.resource = nullptr;
        }
        return *this;
    }
};
```

## Modern C++ Features

```cpp
// Auto keyword (C++11)
auto i = 42;           // int
auto d = 3.14;         // double
auto s = "Hello";      // const char*
auto vec = vector<int>{1, 2, 3}; // vector<int>

// Range-based for loop (C++11)
vector<int> numbers = {1, 2, 3, 4, 5};
for (const auto& num : numbers) {
    cout << num << endl;
}

// Initializer lists (C++11)
vector<int> vec = {1, 2, 3, 4, 5};
map<string, int> m = {{"one", 1}, {"two", 2}};

// nullptr (C++11)
int* ptr = nullptr; // Instead of NULL

// constexpr (C++11)
constexpr int factorial(int n) {
    return (n <= 1) ? 1 : n * factorial(n - 1);
}

// Lambda expressions (C++11)
auto add = [](int a, int b) { return a + b; };
auto multiply = [](int a, int b) -> int { return a * b; };

// Capture by value/reference
int multiplier = 10;
auto lambda1 = [multiplier](int x) { return x * multiplier; };
auto lambda2 = [&multiplier](int x) { return x * multiplier; };

// Variadic templates (C++11)
template<typename... Args>
void print(Args... args) {
    (cout << ... << args) << endl;
}

// Fold expressions (C++17)
template<typename... Args>
auto sum(Args... args) {
    return (... + args);
}
```

## Best Practices

```cpp
// Use RAII for resource management
class FileHandler {
private:
    FILE* file;
    
public:
    FileHandler(const char* filename) {
        file = fopen(filename, "r");
        if (!file) throw runtime_error("Cannot open file");
    }
    
    ~FileHandler() {
        if (file) fclose(file);
    }
    
    FILE* get() { return file; }
};

// Use const correctness
class Calculator {
public:
    int add(int a, int b) const { return a + b; }
    void setValue(int v) { value = v; }
    int getValue() const { return value; }
    
private:
    mutable int value; // Can be modified even in const functions
};

// Use references to avoid copying
void processVector(const vector<int>& vec) {
    for (const auto& item : vec) {
        // Process item
    }
}

// Use smart pointers instead of raw pointers
unique_ptr<Resource> createResource() {
    return make_unique<Resource>();
}

// Use noexcept for functions that don't throw
void simpleFunction() noexcept {
    // Simple operations that won't throw
}

// Use override keyword
class Base {
public:
    virtual void function() = 0;
    virtual ~Base() = default;
};

class Derived : public Base {
public:
    void function() override { // Compiler checks
        // Implementation
    }
};
```
