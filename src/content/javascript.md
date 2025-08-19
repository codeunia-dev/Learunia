# JavaScript Cheatsheet

## Variables & Data Types

```javascript
// Variable declarations
let name = "John";           // Block-scoped, mutable
const age = 25;              // Block-scoped, immutable
var oldWay = "legacy";       // Function-scoped (avoid)

// Data types
const string = "Hello";       // String
const number = 42;           // Number
const boolean = true;        // Boolean
const array = [1, 2, 3];    // Array
const object = {key: "value"}; // Object
const nullValue = null;      // Null
const undefined = undefined; // Undefined
const symbol = Symbol();     // Symbol
```

## Functions

```javascript
// Function declaration
function greet(name) {
    return `Hello, ${name}!`;
}

// Function expression
const greetArrow = (name) => `Hello, ${name}!`;

// Arrow function with multiple parameters
const add = (a, b) => a + b;

// Default parameters
const greetWithDefault = (name = "Guest") => `Hello, ${name}!`;

// Rest parameters
const sum = (...numbers) => numbers.reduce((acc, num) => acc + num, 0);
```

## Arrays

```javascript
const fruits = ["apple", "banana", "orange"];

// Array methods
fruits.push("grape");           // Add to end
fruits.pop();                   // Remove from end
fruits.unshift("strawberry");  // Add to beginning
fruits.shift();                // Remove from beginning

// Iteration methods
fruits.forEach(fruit => console.log(fruit));
const upperFruits = fruits.map(fruit => fruit.toUpperCase());
const filteredFruits = fruits.filter(fruit => fruit.length > 5);

// Destructuring
const [first, second, ...rest] = fruits;
```

## Objects

```javascript
const person = {
    name: "John",
    age: 30,
    greet() {
        return `Hello, I'm ${this.name}`;
    }
};

// Object destructuring
const { name, age } = person;
const { name: personName } = person; // Rename

// Spread operator
const updatedPerson = { ...person, age: 31 };

// Object methods
Object.keys(person);      // ["name", "age", "greet"]
Object.values(person);    // ["John", 30, ƒ]
Object.entries(person);   // [["name", "John"], ["age", 30], ["greet", ƒ]]
```

## Classes

```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return `Hello, I'm ${this.name}`;
    }
    
    static create(name, age) {
        return new Person(name, age);
    }
    
    get isAdult() {
        return this.age >= 18;
    }
}

class Employee extends Person {
    constructor(name, age, role) {
        super(name, age);
        this.role = role;
    }
    
    work() {
        return `${this.name} is working as ${this.role}`;
    }
}

// Usage
const person = new Person("John", 25);
const employee = Employee.create("Jane", 30, "Developer");
```

## Modern ES6+ Features

```javascript
// Template literals
const message = `Hello ${name}, you are ${age} years old!`;

// Destructuring assignment
const { title, author, ...otherProps } = book;

// Spread operator
const combined = [...array1, ...array2];
const cloned = { ...originalObject };

// Optional chaining
const city = user?.address?.city;

// Nullish coalescing
const displayName = user.name ?? "Anonymous";

// Logical assignment
user.isActive ||= true;
user.lastSeen ??= new Date();
```

## Async Programming

```javascript
// Promises
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data fetched!");
        }, 1000);
    });
};

// Async/Await
async function getData() {
    try {
        const result = await fetchData();
        console.log(result);
    } catch (error) {
        console.error("Error:", error);
    }
}

// Promise methods
Promise.all([promise1, promise2]);      // Wait for all
Promise.race([promise1, promise2]);     // Wait for first
Promise.allSettled([promise1, promise2]); // Wait for all to settle
```

## Error Handling

```javascript
try {
    // Risky code
    throw new Error("Something went wrong");
} catch (error) {
    console.error("Caught error:", error.message);
} finally {
    // Always executes
    console.log("Cleanup");
}

// Custom errors
class CustomError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
        this.name = "CustomError";
    }
}
```

## Regular Expressions

```javascript
// Creating regex
const regex1 = /pattern/gi;
const regex2 = new RegExp("pattern", "gi");

// Common patterns
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
const urlRegex = /^https?:\/\/.+/;

// Methods
const text = "Hello World";
text.match(/o/g);           // ["o", "o"]
text.replace(/o/g, "0");    // "Hell0 W0rld"
text.search(/World/);       // 6

// Groups and capture
const dateRegex = /(\d{4})-(\d{2})-(\d{2})/;
const match = "2024-01-15".match(dateRegex);
// match[1] = "2024", match[2] = "01", match[3] = "15"
```

## Date & Time

```javascript
// Creating dates
const now = new Date();
const specificDate = new Date("2024-01-15");
const timestamp = new Date(1705276800000);

// Date methods
now.getFullYear();      // 2024
now.getMonth();         // 0-11 (January = 0)
now.getDate();          // Day of month
now.getDay();           // Day of week (0 = Sunday)
now.getHours();         // Hour (0-23)
now.getMinutes();       // Minutes (0-59)
now.getSeconds();       // Seconds (0-59)

// Formatting
now.toISOString();      // "2024-01-15T10:30:00.000Z"
now.toLocaleDateString(); // "1/15/2024"
now.toLocaleTimeString(); // "10:30:00 AM"

// Date arithmetic
const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
const diffInDays = (date2 - date1) / (1000 * 60 * 60 * 24);
```

## Local Storage & Session Storage

```javascript
// Local Storage (persistent)
localStorage.setItem("user", JSON.stringify({name: "John", age: 25}));
const user = JSON.parse(localStorage.getItem("user"));
localStorage.removeItem("user");
localStorage.clear();

// Session Storage (cleared when tab closes)
sessionStorage.setItem("token", "abc123");
const token = sessionStorage.getItem("token");
sessionStorage.removeItem("token");

// Helper functions
const storage = {
    set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    get: (key) => {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch {
            return null;
        }
    },
    remove: (key) => localStorage.removeItem(key)
};
```

## DOM Manipulation

```javascript
// Selecting elements
const element = document.getElementById("myId");
const elements = document.querySelectorAll(".myClass");
const firstMatch = document.querySelector(".myClass");

// Creating elements
const newDiv = document.createElement("div");
newDiv.textContent = "Hello World";
newDiv.className = "myClass";

// Modifying elements
element.innerHTML = "<strong>Bold text</strong>";
element.setAttribute("data-id", "123");
element.classList.add("active");
element.classList.remove("inactive");
element.classList.toggle("visible");

// Event listeners
element.addEventListener("click", (event) => {
    console.log("Clicked!", event);
});
```

## Modules

```javascript
// Exporting
export const PI = 3.14159;
export function multiply(a, b) { return a * b; }
export default class Calculator {}

// Importing
import Calculator, { PI, multiply } from './math.js';
import * as math from './math.js';
import { default as Calc } from './math.js';
```

## Performance & Optimization

```javascript
// Debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttling
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Memoization
function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}
```

## Best Practices

```javascript
// Use const by default, let when needed
const config = { apiUrl: "https://api.example.com" };

// Prefer arrow functions for callbacks
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);

// Use template literals for strings
const url = `${config.apiUrl}/users/${userId}`;

// Destructure function parameters
const createUser = ({ name, email, age = 18 }) => {
    return { name, email, age };
};

// Use optional chaining and nullish coalescing
const userName = user?.profile?.name ?? "Unknown";

// Avoid global variables
(function() {
    // Module code here
})();

// Use strict mode
"use strict";
```

## Common Patterns

```javascript
// Singleton
class Singleton {
    static instance;
    constructor() {
        if (Singleton.instance) {
            return Singleton.instance;
        }
        Singleton.instance = this;
    }
}

// Factory function
function createUser(type) {
    switch(type) {
        case 'admin':
            return new AdminUser();
        case 'regular':
            return new RegularUser();
        default:
            throw new Error('Invalid user type');
    }
}

// Observer pattern
class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }
    
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }
}
```
