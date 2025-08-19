# TypeScript Cheatsheet

## Basic Types

```typescript
// Primitive types
let str: string = "hello";
let num: number = 42;
let bool: boolean = true;
let n: null = null;
let u: undefined = undefined;
let sym: symbol = Symbol("key");

// Array types
let arr1: number[] = [1, 2, 3];
let arr2: Array<string> = ["a", "b", "c"];
let tuple: [string, number] = ["hello", 10];

// Object types
let obj: object = { x: 0 };
let any: any = "anything goes";
let unknown: unknown = "type-safe any";
let never: never; // represents unreachable code
```

## Type Annotations

```typescript
// Function parameters and return types
function add(x: number, y: number): number {
  return x + y;
}

// Arrow functions
const multiply = (x: number, y: number): number => x * y;

// Optional parameters
function greet(name: string, greeting?: string): string {
  return greeting ? `${greeting}, ${name}!` : `Hello, ${name}!`;
}

// Default parameters
function createUser(name: string, age: number = 18): object {
  return { name, age };
}

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, num) => acc + num, 0);
}
```

## Interfaces

```typescript
// Basic interface
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // optional property
  readonly createdAt: Date; // readonly property
}

// Implementing interface
class UserImpl implements User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public readonly createdAt: Date = new Date()
  ) {}
}

// Extending interfaces
interface Employee extends User {
  role: string;
  salary: number;
}

// Function interface
interface SearchFunc {
  (source: string, subString: string): boolean;
}

// Indexable interface
interface StringArray {
  [index: number]: string;
}
```

## Classes

```typescript
class Animal {
  // Properties
  private name: string;
  protected species: string;
  public age: number;

  // Constructor
  constructor(name: string, species: string, age: number = 0) {
    this.name = name;
    this.species = species;
    this.age = age;
  }

  // Methods
  public makeSound(): void {
    console.log("Some sound");
  }

  protected getInfo(): string {
    return `${this.name} is a ${this.species}`;
  }

  // Getter
  get animalName(): string {
    return this.name;
  }

  // Setter
  set animalName(value: string) {
    if (value.length > 0) {
      this.name = value;
    }
  }
}

// Inheritance
class Dog extends Animal {
  constructor(name: string, age: number) {
    super(name, "Canis", age);
  }

  public makeSound(): void {
    console.log("Woof!");
  }

  public wagTail(): void {
    console.log("Tail wagging");
  }
}
```

## Generics

```typescript
// Generic function
function identity<T>(arg: T): T {
  return arg;
}

// Generic interface
interface Container<T> {
  value: T;
  getValue(): T;
}

// Generic class
class Queue<T> {
  private data: T[] = [];

  push(item: T): void {
    this.data.push(item);
  }

  pop(): T | undefined {
    return this.data.shift();
  }

  peek(): T | undefined {
    return this.data[0];
  }
}

// Generic constraints
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// Multiple constraints
function combine<T extends object, U extends object>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}
```

## Union and Intersection Types

```typescript
// Union types
type Status = "loading" | "success" | "error";
type ID = string | number;

function processId(id: ID): string {
  if (typeof id === "string") {
    return id.toUpperCase();
  }
  return id.toString();
}

// Intersection types
interface HasName {
  name: string;
}

interface HasAge {
  age: number;
}

type Person = HasName & HasAge;

const person: Person = {
  name: "John",
  age: 30
};
```

## Type Guards

```typescript
// Type guards
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

function isArray(value: unknown): value is any[] {
  return Array.isArray(value);
}

// Usage
function processValue(value: unknown): string {
  if (isString(value)) {
    return value.toUpperCase();
  }
  if (isNumber(value)) {
    return value.toString();
  }
  if (isArray(value)) {
    return value.join(", ");
  }
  return "Unknown type";
}
```

## Utility Types

```typescript
// Partial - makes all properties optional
interface User {
  name: string;
  age: number;
  email: string;
}

type PartialUser = Partial<User>;
// Equivalent to: { name?: string; age?: number; email?: string; }

// Required - makes all properties required
type RequiredUser = Required<PartialUser>;

// Pick - selects specific properties
type UserName = Pick<User, "name" | "email">;

// Omit - excludes specific properties
type UserWithoutEmail = Omit<User, "email">;

// Record - creates object type with specific keys and values
type UserRoles = Record<string, string[]>;

// ReturnType - extracts return type of function
type AddReturnType = ReturnType<typeof add>;

// Parameters - extracts parameter types of function
type AddParams = Parameters<typeof add>;
```

## Advanced Types

```typescript
// Conditional types
type NonNullable<T> = T extends null | undefined ? never : T;
type ArrayElement<T> = T extends Array<infer U> ? U : never;

// Mapped types
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

// Template literal types
type EventName<T extends string> = `${T}Changed`;
type Concat<S1 extends string, S2 extends string> = `${S1}${S2}`;

// Infer keyword
type ExtractReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

## Enums

```typescript
// Numeric enums
enum Direction {
  Up = 0,
  Down = 1,
  Left = 2,
  Right = 3
}

// String enums
enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Pending = "PENDING"
}

// Computed enums
enum FileAccess {
  None = 0,
  Read = 1 << 0,
  Write = 1 << 1,
  ReadWrite = Read | Write
}
```

## Namespaces

```typescript
namespace Validation {
  export interface StringValidator {
    isValid(s: string): boolean;
  }

  export class EmailValidator implements StringValidator {
    isValid(s: string): boolean {
      return s.includes("@");
    }
  }
}

// Usage
const validator = new Validation.EmailValidator();
```

## Modules

```typescript
// Exporting
export interface User {
  id: number;
  name: string;
}

export class UserService {
  getUser(id: number): User | null {
    // implementation
    return null;
  }
}

export default class Database {
  // default export
}

// Importing
import { User, UserService } from "./user";
import Database from "./database";
import * as Utils from "./utils";
```

## Best Practices

```typescript
// Use strict mode
// tsconfig.json: "strict": true

// Prefer interfaces over type aliases for objects
interface Config {
  apiUrl: string;
  timeout: number;
}

// Use readonly for immutable properties
interface Point {
  readonly x: number;
  readonly y: number;
}

// Use const assertions
const colors = ["red", "green", "blue"] as const;
type Color = typeof colors[number];

// Avoid any, use unknown instead
function processData(data: unknown): void {
  if (typeof data === "string") {
    console.log(data.toUpperCase());
  }
}

// Use branded types for type safety
type UserId = string & { readonly brand: unique symbol };
type ProductId = string & { readonly brand: unique symbol };

function getUser(id: UserId): User {
  // implementation
}
```

## Common Patterns

```typescript
// Singleton pattern
class Singleton {
  private static instance: Singleton;
  private constructor() {}

  static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}

// Factory pattern
interface Product {
  name: string;
  price: number;
}

class ProductFactory {
  static createProduct(type: string): Product {
    switch (type) {
      case "book":
        return { name: "Book", price: 20 };
      case "laptop":
        return { name: "Laptop", price: 1000 };
      default:
        throw new Error("Unknown product type");
    }
  }
}

// Observer pattern
interface Observer {
  update(data: any): void;
}

class Subject {
  private observers: Observer[] = [];

  attach(observer: Observer): void {
    this.observers.push(observer);
  }

  notify(data: any): void {
    this.observers.forEach(observer => observer.update(data));
  }
}
```
