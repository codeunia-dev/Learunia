# Python Cheatsheet

## Variables & Data Types

```python
# Variable assignment
name = "John"           # String
age = 25               # Integer
height = 5.9           # Float
is_student = True      # Boolean
grades = [85, 90, 78] # List
info = {"name": "John", "age": 25} # Dictionary
coordinates = (10, 20) # Tuple
unique_set = {1, 2, 3} # Set

# Type checking
type(name)             # <class 'str'>
isinstance(age, int)   # True
```

## Strings

```python
# String creation
text = "Hello, World!"
multiline = """This is a
multiline string"""

# String methods
text.upper()           # "HELLO, WORLD!"
text.lower()           # "hello, world!"
text.split(",")        # ["Hello", " World!"]
text.replace("World", "Python") # "Hello, Python!"
text.strip()           # Remove whitespace
len(text)              # 13

# String formatting
name = "Alice"
age = 30
f"Hello, {name}. You are {age} years old."  # f-string
"Hello, {}. You are {} years old.".format(name, age)  # .format()
```

## Lists

```python
# List creation and manipulation
fruits = ["apple", "banana", "orange"]
fruits.append("grape")        # Add to end
fruits.insert(1, "mango")    # Insert at index
fruits.remove("banana")      # Remove by value
popped = fruits.pop()        # Remove and return last
fruits[0] = "pear"          # Update by index

# List comprehensions
squares = [x**2 for x in range(5)]  # [0, 1, 4, 9, 16]
evens = [x for x in range(10) if x % 2 == 0]  # [0, 2, 4, 6, 8]

# Useful list methods
len(fruits)              # Length
fruits.count("apple")    # Count occurrences
fruits.index("orange")   # Find index
fruits.sort()           # Sort in place
sorted(fruits)          # Return sorted copy
```

## Dictionaries

```python
# Dictionary creation and access
person = {"name": "John", "age": 30, "city": "NYC"}
person["name"]           # Access by key
person.get("age", 0)     # Safe access with default

# Dictionary methods
person["email"] = "john@email.com"  # Add/update
del person["city"]       # Delete key
person.pop("age")        # Remove and return value
person.keys()            # Get all keys
person.values()          # Get all values
person.items()           # Get key-value pairs

# Dictionary comprehensions
squared = {x: x**2 for x in range(5)}  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
```

## Functions

```python
# Basic function
def greet(name):
    return f"Hello, {name}!"

# Function with default parameters
def greet_with_title(name, title="Mr."):
    return f"Hello, {title} {name}!"

# Function with multiple return values
def get_name_age():
    return "John", 25

name, age = get_name_age()  # Unpacking

# Lambda functions
square = lambda x: x**2
add = lambda x, y: x + y

# Higher-order functions
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))
evens = list(filter(lambda x: x % 2 == 0, numbers))
```

## Control Flow

```python
# If statements
if age >= 18:
    print("Adult")
elif age >= 13:
    print("Teenager")
else:
    print("Child")

# For loops
for i in range(5):          # 0 to 4
    print(i)

for fruit in fruits:        # Iterate over list
    print(fruit)

for i, fruit in enumerate(fruits):  # With index
    print(f"{i}: {fruit}")

# While loops
count = 0
while count < 5:
    print(count)
    count += 1

# Loop control
for i in range(10):
    if i == 3:
        continue    # Skip iteration
    if i == 7:
        break      # Exit loop
    print(i)
```

## Classes and Objects

```python
# Basic class
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        return f"Hi, I'm {self.name}"
    
    def have_birthday(self):
        self.age += 1

# Creating objects
person = Person("Alice", 25)
print(person.greet())       # "Hi, I'm Alice"
person.have_birthday()

# Inheritance
class Student(Person):
    def __init__(self, name, age, student_id):
        super().__init__(name, age)
        self.student_id = student_id
    
    def study(self):
        return f"{self.name} is studying"
```

## Error Handling

```python
# Try-except blocks
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")
except Exception as e:
    print(f"An error occurred: {e}")
else:
    print("No errors occurred")
finally:
    print("This always runs")

# Raising exceptions
def divide(a, b):
    if b == 0:
        raise ValueError("Division by zero is not allowed")
    return a / b
```

## File Operations

```python
# Reading files
with open("file.txt", "r") as file:
    content = file.read()           # Read entire file
    lines = file.readlines()       # Read all lines

# Writing files
with open("file.txt", "w") as file:
    file.write("Hello, World!")
    file.writelines(["Line 1\n", "Line 2\n"])

# Appending to files
with open("file.txt", "a") as file:
    file.write("\nAppended text")
```

## Modules and Packages

```python
# Importing modules
import math
from datetime import datetime
import json as js

# Using imported modules
print(math.sqrt(16))        # 4.0
now = datetime.now()
data = js.loads('{"key": "value"}')

# Creating your own module (save as mymodule.py)
def my_function():
    return "Hello from my module"

# Importing your module
from mymodule import my_function
```

## Common Built-in Functions

```python
# Math functions
abs(-5)                 # 5
max([1, 5, 3])         # 5
min([1, 5, 3])         # 1
sum([1, 2, 3])         # 6
round(3.14159, 2)      # 3.14

# Type conversion
int("123")             # 123
float("3.14")          # 3.14
str(123)               # "123"
list("hello")          # ['h', 'e', 'l', 'l', 'o']

# Useful functions
len("hello")           # 5
range(5)               # 0, 1, 2, 3, 4
zip([1, 2], ['a', 'b']) # [(1, 'a'), (2, 'b')]
```

## List and Dictionary Methods

```python
# Advanced list operations
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
numbers.sort()              # Sort in place
numbers.reverse()           # Reverse in place
numbers.extend([7, 8])      # Add multiple elements

# Dictionary operations
data = {"a": 1, "b": 2}
data.update({"c": 3})       # Add multiple key-value pairs
data.setdefault("d", 4)     # Add if key doesn't exist
```

## Best Practices

```python
# Use descriptive variable names
user_name = "john_doe"      # Good
un = "john_doe"            # Bad

# Use list comprehensions when appropriate
squares = [x**2 for x in range(10)]  # Good
squares = []                         # Less pythonic
for x in range(10):
    squares.append(x**2)

# Use enumerate for index and value
for i, item in enumerate(items):     # Good
    print(f"{i}: {item}")

for i in range(len(items)):          # Less pythonic
    print(f"{i}: {items[i]}")

# Follow PEP 8 style guide
def calculate_area(length, width):
    return length * width
```
