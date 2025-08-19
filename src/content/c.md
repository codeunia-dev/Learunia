# C Programming Cheatsheet

## Basic Syntax

### Hello World
```c
#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    return 0;
}
```

### Basic Structure
```c
#include <stdio.h>    // Standard input/output
#include <stdlib.h>   // Standard library
#include <string.h>   // String functions

// Function declaration
int add(int a, int b);

int main() {
    // Main function - entry point
    return 0;
}

// Function definition
int add(int a, int b) {
    return a + b;
}
```

## Data Types

### Basic Data Types
```c
// Integer types
char c = 'A';           // 1 byte
short s = 32767;        // 2 bytes
int i = 2147483647;     // 4 bytes
long l = 9223372036854775807L;  // 8 bytes

// Unsigned versions
unsigned char uc = 255;
unsigned short us = 65535;
unsigned int ui = 4294967295U;
unsigned long ul = 18446744073709551615UL;

// Floating point
float f = 3.14f;        // 4 bytes
double d = 3.14159;     // 8 bytes
long double ld = 3.141592653589793L;  // 16 bytes

// Size information
printf("char: %zu bytes\n", sizeof(char));
printf("int: %zu bytes\n", sizeof(int));
printf("float: %zu bytes\n", sizeof(float));
printf("double: %zu bytes\n", sizeof(double));
```

### Constants and Literals
```c
// Preprocessor constants
#define PI 3.14159
#define MAX_SIZE 100

// const keyword
const int DAYS_IN_WEEK = 7;
const char* MESSAGE = "Hello";

// Literal examples
int decimal = 42;       // Decimal
int octal = 052;        // Octal (starts with 0)
int hex = 0x2A;         // Hexadecimal (starts with 0x)
float scientific = 1.23e-4f;  // Scientific notation

// Character escape sequences
char newline = '\n';
char tab = '\t';
char backslash = '\\';
char quote = '\"';
```

## Variables and Storage Classes

### Variable Declaration
```c
int x;              // Declaration
int y = 10;         // Declaration with initialization
int a, b, c;        // Multiple declarations
int d = 1, e = 2;   // Multiple with initialization

// Automatic variables (local)
void function() {
    auto int local_var = 10;  // 'auto' is default
    int another_local = 20;   // Same as above
}

// Static variables
void counter() {
    static int count = 0;     // Retains value between calls
    count++;
    printf("Count: %d\n", count);
}

// External variables (global)
extern int global_var;        // Declaration (defined elsewhere)
int global_var = 100;         // Definition

// Register variables (suggestion to compiler)
void fast_function() {
    register int fast_var = 42;  // May be stored in CPU register
}
```

## Operators

### Arithmetic Operators
```c
int a = 10, b = 3;

int addition = a + b;       // 13
int subtraction = a - b;    // 7
int multiplication = a * b; // 30
int division = a / b;       // 3 (integer division)
int modulo = a % b;         // 1

// Increment/Decrement
int x = 5;
printf("%d\n", ++x);    // Pre-increment: 6
printf("%d\n", x++);    // Post-increment: 6 (then x becomes 7)
printf("%d\n", --x);    // Pre-decrement: 6
printf("%d\n", x--);    // Post-decrement: 6 (then x becomes 5)
```

### Comparison and Logical Operators
```c
int a = 10, b = 20;

// Comparison operators
int equal = (a == b);           // 0 (false)
int not_equal = (a != b);       // 1 (true)
int less_than = (a < b);        // 1 (true)
int greater_than = (a > b);     // 0 (false)
int less_equal = (a <= b);      // 1 (true)
int greater_equal = (a >= b);   // 0 (false)

// Logical operators
int and_result = (a > 5) && (b < 30);   // 1 (true)
int or_result = (a > 15) || (b < 30);   // 1 (true)
int not_result = !(a > 15);             // 1 (true)
```

### Bitwise Operators
```c
int a = 12;  // Binary: 1100
int b = 10;  // Binary: 1010

int and_op = a & b;     // 8  (1000)
int or_op = a | b;      // 14 (1110)
int xor_op = a ^ b;     // 6  (0110)
int not_op = ~a;        // -13 (complement)
int left_shift = a << 1; // 24 (11000)
int right_shift = a >> 1; // 6  (110)

// Practical bitwise operations
int set_bit = a | (1 << 2);     // Set bit at position 2
int clear_bit = a & ~(1 << 2);  // Clear bit at position 2
int toggle_bit = a ^ (1 << 2);  // Toggle bit at position 2
int check_bit = (a >> 2) & 1;  // Check if bit at position 2 is set
```

## Control Flow

### Conditional Statements
```c
int x = 10;

// if-else
if (x > 0) {
    printf("Positive\n");
} else if (x < 0) {
    printf("Negative\n");
} else {
    printf("Zero\n");
}

// Ternary operator
int abs_x = (x >= 0) ? x : -x;
printf("Absolute value: %d\n", abs_x);

// switch statement
char grade = 'B';
switch (grade) {
    case 'A':
        printf("Excellent!\n");
        break;
    case 'B':
        printf("Good job!\n");
        break;
    case 'C':
        printf("Average\n");
        break;
    default:
        printf("Invalid grade\n");
        break;
}
```

### Loops
```c
// for loop
for (int i = 0; i < 10; i++) {
    printf("%d ", i);
}
printf("\n");

// while loop
int count = 0;
while (count < 5) {
    printf("Count: %d\n", count);
    count++;
}

// do-while loop
int input;
do {
    printf("Enter a positive number: ");
    scanf("%d", &input);
} while (input <= 0);

// Nested loops
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        printf("(%d,%d) ", i, j);
    }
    printf("\n");
}

// Loop control
for (int i = 0; i < 10; i++) {
    if (i == 3) continue;    // Skip iteration
    if (i == 7) break;       // Exit loop
    printf("%d ", i);
}
```

## Functions

### Basic Functions
```c
// Function declaration (prototype)
int add(int a, int b);
void greet(const char* name);
double calculate_area(double radius);

// Function definitions
int add(int a, int b) {
    return a + b;
}

void greet(const char* name) {
    printf("Hello, %s!\n", name);
}

double calculate_area(double radius) {
    return 3.14159 * radius * radius;
}

// Function calls
int main() {
    int sum = add(5, 3);
    greet("Alice");
    double area = calculate_area(2.5);
    
    return 0;
}
```

### Advanced Function Features
```c
// Recursive function
int factorial(int n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

// Function with variable arguments
#include <stdarg.h>
int sum_all(int count, ...) {
    va_list args;
    va_start(args, count);
    
    int total = 0;
    for (int i = 0; i < count; i++) {
        total += va_arg(args, int);
    }
    
    va_end(args);
    return total;
}

// Usage: sum_all(3, 10, 20, 30) returns 60

// Function pointers
int (*operation)(int, int);  // Declare function pointer

int multiply(int a, int b) {
    return a * b;
}

int main() {
    operation = add;
    printf("Add: %d\n", operation(5, 3));
    
    operation = multiply;
    printf("Multiply: %d\n", operation(5, 3));
    
    return 0;
}
```

## Arrays

### One-Dimensional Arrays
```c
// Array declaration and initialization
int numbers[5];                    // Uninitialized array
int scores[5] = {85, 92, 78, 96, 88};  // Initialized array
int values[] = {1, 2, 3, 4, 5};   // Size inferred from initializer
int zeros[10] = {0};               // Initialize all elements to 0

// Array access and modification
scores[0] = 90;                    // Modify first element
int first_score = scores[0];       // Access first element

// Array traversal
for (int i = 0; i < 5; i++) {
    printf("Score %d: %d\n", i, scores[i]);
}

// Array size
int size = sizeof(scores) / sizeof(scores[0]);
printf("Array size: %d\n", size);
```

### Multi-Dimensional Arrays
```c
// 2D array declaration and initialization
int matrix[3][4];                  // 3x4 matrix
int grid[3][3] = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// Alternative initialization
int table[2][3] = {{1, 2, 3}, {4, 5, 6}};

// 2D array access
grid[1][2] = 10;                   // Set element at row 1, column 2
int value = grid[2][1];            // Get element at row 2, column 1

// 2D array traversal
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        printf("%d ", grid[i][j]);
    }
    printf("\n");
}

// 3D array
int cube[2][3][4];                 // 2x3x4 three-dimensional array
```

### Arrays and Functions
```c
// Passing array to function (array decays to pointer)
void print_array(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

// Alternative syntax
void print_array2(int* arr, int size) {
    // Same as above
}

// Passing 2D array to function
void print_matrix(int rows, int cols, int matrix[rows][cols]) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            printf("%d ", matrix[i][j]);
        }
        printf("\n");
    }
}

// Using arrays
int main() {
    int numbers[] = {1, 2, 3, 4, 5};
    int size = sizeof(numbers) / sizeof(numbers[0]);
    
    print_array(numbers, size);
    
    int matrix[2][3] = {{1, 2, 3}, {4, 5, 6}};
    print_matrix(2, 3, matrix);
    
    return 0;
}
```

## Pointers

### Basic Pointers
```c
int x = 42;
int* ptr = &x;          // ptr points to x

printf("Value of x: %d\n", x);          // 42
printf("Address of x: %p\n", &x);       // Address
printf("Value of ptr: %p\n", ptr);      // Same address
printf("Value pointed by ptr: %d\n", *ptr);  // 42

// Modify value through pointer
*ptr = 100;
printf("New value of x: %d\n", x);      // 100
```

### Pointer Arithmetic
```c
int arr[] = {10, 20, 30, 40, 50};
int* p = arr;           // Points to first element

printf("First element: %d\n", *p);      // 10
printf("Second element: %d\n", *(p + 1)); // 20
printf("Third element: %d\n", *(p + 2));  // 30

// Moving pointer
p++;                    // Now points to second element
printf("Current element: %d\n", *p);     // 20

// Pointer difference
int* start = &arr[0];
int* end = &arr[4];
int distance = end - start;              // 4 (elements apart)

// Array traversal using pointers
for (int* ptr = arr; ptr < arr + 5; ptr++) {
    printf("%d ", *ptr);
}
```

### Dynamic Memory Allocation
```c
#include <stdlib.h>

// Allocate memory for single integer
int* num = (int*)malloc(sizeof(int));
if (num != NULL) {
    *num = 42;
    printf("Dynamic value: %d\n", *num);
    free(num);          // Don't forget to free!
}

// Allocate memory for array
int size = 10;
int* arr = (int*)malloc(size * sizeof(int));
if (arr != NULL) {
    // Initialize array
    for (int i = 0; i < size; i++) {
        arr[i] = i * i;
    }
    
    // Use array
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
    
    // Resize array
    size = 20;
    arr = (int*)realloc(arr, size * sizeof(int));
    
    free(arr);          // Free memory
}

// calloc - allocates and initializes to zero
int* zeros = (int*)calloc(10, sizeof(int));
if (zeros != NULL) {
    // All elements are initialized to 0
    free(zeros);
}
```

### Pointers to Pointers
```c
int x = 42;
int* ptr = &x;
int** ptr_to_ptr = &ptr;

printf("Value: %d\n", **ptr_to_ptr);    // 42
printf("Address of ptr: %p\n", ptr_to_ptr);
printf("Value of ptr: %p\n", *ptr_to_ptr);

// Dynamic 2D array using pointer to pointer
int rows = 3, cols = 4;
int** matrix = (int**)malloc(rows * sizeof(int*));
for (int i = 0; i < rows; i++) {
    matrix[i] = (int*)malloc(cols * sizeof(int));
}

// Use matrix
matrix[1][2] = 100;

// Free matrix
for (int i = 0; i < rows; i++) {
    free(matrix[i]);
}
free(matrix);
```

## Strings

### String Basics
```c
#include <string.h>

// String declaration and initialization
char str1[20] = "Hello";           // Character array
char str2[] = "World";             // Size inferred
char* str3 = "Hello, World!";      // String literal (read-only)

// String input/output
char name[50];
printf("Enter your name: ");
scanf("%s", name);                 // Reads until whitespace
printf("Hello, %s!\n", name);

// Reading line with spaces
char line[100];
printf("Enter a line: ");
getchar();                         // Clear newline from buffer
fgets(line, sizeof(line), stdin);  // Reads entire line
printf("You entered: %s", line);
```

### String Functions
```c
#include <string.h>

char str1[50] = "Hello";
char str2[50] = "World";
char str3[100];

// String length
int len = strlen(str1);            // 5

// String copy
strcpy(str3, str1);                // str3 = "Hello"
strncpy(str3, str1, 3);            // str3 = "Hel"

// String concatenation
strcat(str1, " ");                 // str1 = "Hello "
strcat(str1, str2);                // str1 = "Hello World"
strncat(str3, str2, 2);            // Append first 2 chars

// String comparison
int cmp = strcmp(str1, str2);      // Returns 0 if equal
int ncmp = strncmp(str1, str2, 3); // Compare first 3 chars

// String search
char* pos = strchr(str1, 'o');     // Find first occurrence of 'o'
char* last = strrchr(str1, 'o');   // Find last occurrence of 'o'
char* sub = strstr(str1, "World"); // Find substring

// String to number conversion
char num_str[] = "12345";
int num = atoi(num_str);           // String to integer
double dnum = atof("123.45");      // String to double

// Number to string conversion
char buffer[20];
sprintf(buffer, "%d", 12345);      // Integer to string
sprintf(buffer, "%.2f", 123.45);  // Double to string with format
```

### String Manipulation
```c
// Custom string functions
int my_strlen(const char* str) {
    int length = 0;
    while (str[length] != '\0') {
        length++;
    }
    return length;
}

void my_strcpy(char* dest, const char* src) {
    int i = 0;
    while (src[i] != '\0') {
        dest[i] = src[i];
        i++;
    }
    dest[i] = '\0';
}

// String reversal
void reverse_string(char* str) {
    int len = strlen(str);
    for (int i = 0; i < len / 2; i++) {
        char temp = str[i];
        str[i] = str[len - 1 - i];
        str[len - 1 - i] = temp;
    }
}

// Character classification
#include <ctype.h>
char ch = 'A';
printf("Is digit: %d\n", isdigit(ch));    // 0
printf("Is alpha: %d\n", isalpha(ch));    // 1
printf("Is upper: %d\n", isupper(ch));    // 1
printf("Is lower: %d\n", islower(ch));    // 0
printf("To lower: %c\n", tolower(ch));    // 'a'
printf("To upper: %c\n", toupper('a'));   // 'A'
```

## Structures

### Basic Structures
```c
// Structure definition
struct Person {
    char name[50];
    int age;
    float height;
};

// Structure variable declaration
struct Person person1;
struct Person person2 = {"John Doe", 30, 5.9};

// Accessing structure members
strcpy(person1.name, "Jane Smith");
person1.age = 25;
person1.height = 5.6;

printf("Name: %s\n", person1.name);
printf("Age: %d\n", person1.age);
printf("Height: %.1f\n", person1.height);

// Array of structures
struct Person people[3] = {
    {"Alice", 28, 5.4},
    {"Bob", 32, 6.0},
    {"Charlie", 29, 5.8}
};

// Accessing array of structures
for (int i = 0; i < 3; i++) {
    printf("Person %d: %s, Age: %d\n", i + 1, people[i].name, people[i].age);
}
```

### Pointers to Structures
```c
struct Person* ptr = &person1;

// Accessing members through pointer
(*ptr).age = 26;               // Method 1
ptr->age = 26;                 // Method 2 (preferred)
strcpy(ptr->name, "Jane Doe");

// Dynamic allocation of structures
struct Person* dynamic_person = (struct Person*)malloc(sizeof(struct Person));
if (dynamic_person != NULL) {
    strcpy(dynamic_person->name, "Dynamic Person");
    dynamic_person->age = 35;
    dynamic_person->height = 5.7;
    
    printf("Dynamic person: %s\n", dynamic_person->name);
    
    free(dynamic_person);
}
```

### Nested Structures and typedef
```c
// Nested structures
struct Address {
    char street[100];
    char city[50];
    int zip_code;
};

struct Employee {
    char name[50];
    int id;
    struct Address address;
    float salary;
};

// Using nested structure
struct Employee emp;
strcpy(emp.name, "John Smith");
emp.id = 1001;
strcpy(emp.address.street, "123 Main St");
strcpy(emp.address.city, "Anytown");
emp.address.zip_code = 12345;
emp.salary = 50000.0;

// typedef for easier syntax
typedef struct {
    char brand[30];
    char model[30];
    int year;
    float price;
} Car;

// Now we can use Car instead of struct Car
Car my_car = {"Toyota", "Camry", 2022, 25000.0};
Car* car_ptr = &my_car;
printf("Car: %s %s\n", car_ptr->brand, car_ptr->model);
```

## File I/O

### Basic File Operations
```c
#include <stdio.h>

// Opening and closing files
FILE* file = fopen("data.txt", "w");  // Open for writing
if (file == NULL) {
    printf("Error opening file!\n");
    return 1;
}

// Writing to file
fprintf(file, "Hello, File!\n");
fprintf(file, "Number: %d\n", 42);
fputs("This is a line\n", file);
fputc('A', file);

fclose(file);  // Always close the file

// Reading from file
file = fopen("data.txt", "r");
if (file != NULL) {
    char buffer[100];
    
    // Reading line by line
    while (fgets(buffer, sizeof(buffer), file) != NULL) {
        printf("Read: %s", buffer);
    }
    
    fclose(file);
}
```

### Advanced File Operations
```c
// Binary file operations
struct Person person = {"Alice", 30, 5.6};

// Write binary data
FILE* bin_file = fopen("person.dat", "wb");
if (bin_file != NULL) {
    fwrite(&person, sizeof(struct Person), 1, bin_file);
    fclose(bin_file);
}

// Read binary data
struct Person read_person;
bin_file = fopen("person.dat", "rb");
if (bin_file != NULL) {
    fread(&read_person, sizeof(struct Person), 1, bin_file);
    printf("Read person: %s, %d\n", read_person.name, read_person.age);
    fclose(bin_file);
}

// File positioning
FILE* file = fopen("data.txt", "r+");
if (file != NULL) {
    fseek(file, 0, SEEK_END);      // Go to end of file
    long size = ftell(file);        // Get file size
    fseek(file, 0, SEEK_SET);      // Go to beginning
    
    // Read specific position
    fseek(file, 10, SEEK_SET);     // Go to 10th byte
    int ch = fgetc(file);
    
    fclose(file);
}
```

## Preprocessor

### Macros
```c
// Simple macros
#define PI 3.14159
#define MAX_SIZE 100
#define SQUARE(x) ((x) * (x))
#define MAX(a, b) ((a) > (b) ? (a) : (b))

// Using macros
double area = PI * SQUARE(5);
int max_val = MAX(10, 20);

// Multi-line macros
#define PRINT_ERROR(msg) \
    do { \
        printf("Error: %s\n", msg); \
        printf("File: %s, Line: %d\n", __FILE__, __LINE__); \
    } while(0)

// Conditional compilation
#ifdef DEBUG
    printf("Debug mode enabled\n");
#endif

#ifndef BUFFER_SIZE
    #define BUFFER_SIZE 1024
#endif

#if defined(WINDOWS)
    // Windows-specific code
#elif defined(LINUX)
    // Linux-specific code
#else
    // Default code
#endif
```

### Include Guards
```c
// header.h
#ifndef HEADER_H
#define HEADER_H

// Header content goes here
void my_function();

#endif // HEADER_H

// Alternative using pragma once
#pragma once

// Header content
```

## Memory Management

### Stack vs Heap
```c
void memory_demo() {
    // Stack allocation (automatic)
    int stack_var = 42;          // Automatically freed when function ends
    char stack_array[100];       // Fixed size, fast allocation
    
    // Heap allocation (dynamic)
    int* heap_var = malloc(sizeof(int));
    if (heap_var != NULL) {
        *heap_var = 42;
        free(heap_var);          // Must manually free
    }
    
    // Large array on heap
    int* large_array = malloc(1000000 * sizeof(int));
    if (large_array != NULL) {
        // Use array...
        free(large_array);
    }
}
```

### Memory Debugging
```c
// Check for memory leaks
void check_memory() {
    int* ptr1 = malloc(100 * sizeof(int));
    int* ptr2 = malloc(200 * sizeof(int));
    
    if (ptr1 != NULL && ptr2 != NULL) {
        // Use memory...
        
        free(ptr1);
        free(ptr2);
        
        // Set pointers to NULL to avoid accidental use
        ptr1 = NULL;
        ptr2 = NULL;
    }
}

// Safe memory allocation wrapper
void* safe_malloc(size_t size) {
    void* ptr = malloc(size);
    if (ptr == NULL) {
        fprintf(stderr, "Memory allocation failed!\n");
        exit(1);
    }
    return ptr;
}
```

## Common Patterns and Best Practices

### Error Handling
```c
#include <errno.h>

// Function with error checking
int safe_divide(int a, int b, int* result) {
    if (b == 0) {
        return -1;  // Error code
    }
    *result = a / b;
    return 0;       // Success
}

// File operations with error handling
FILE* safe_fopen(const char* filename, const char* mode) {
    FILE* file = fopen(filename, mode);
    if (file == NULL) {
        perror("Error opening file");
        return NULL;
    }
    return file;
}

// Using error handling
int main() {
    int result;
    if (safe_divide(10, 0, &result) != 0) {
        printf("Division by zero error!\n");
    }
    
    FILE* file = safe_fopen("nonexistent.txt", "r");
    if (file == NULL) {
        printf("Failed to open file\n");
    } else {
        // Use file...
        fclose(file);
    }
    
    return 0;
}
```

### Generic Programming with void*
```c
// Generic swap function
void swap(void* a, void* b, size_t size) {
    char* temp = malloc(size);
    if (temp != NULL) {
        memcpy(temp, a, size);
        memcpy(a, b, size);
        memcpy(b, temp, size);
        free(temp);
    }
}

// Usage
int x = 10, y = 20;
swap(&x, &y, sizeof(int));

double d1 = 3.14, d2 = 2.71;
swap(&d1, &d2, sizeof(double));
```

## Useful Libraries

### Standard Library Functions
```c
#include <math.h>
#include <time.h>
#include <stdlib.h>

// Math functions
double result = sqrt(16.0);     // 4.0
double power = pow(2.0, 3.0);   // 8.0
double sine = sin(PI / 2);      // 1.0
int absolute = abs(-5);         // 5

// Random numbers
srand(time(NULL));              // Seed random number generator
int random_num = rand() % 100;  // Random number 0-99
double random_double = (double)rand() / RAND_MAX;  // 0.0-1.0

// Time functions
time_t current_time = time(NULL);
printf("Current time: %s", ctime(&current_time));

clock_t start = clock();
// ... some computation ...
clock_t end = clock();
double cpu_time = ((double)(end - start)) / CLOCKS_PER_SEC;
printf("CPU time: %f seconds\n", cpu_time);
```

## Best Practices

1. **Always initialize variables** before using them
2. **Check return values** of functions that can fail
3. **Free dynamically allocated memory** to prevent leaks
4. **Use const** for parameters that shouldn't be modified
5. **Validate input** before processing
6. **Use meaningful variable names** and comments
7. **Keep functions small** and focused on one task
8. **Avoid global variables** when possible
9. **Use header guards** in header files
10. **Compile with warnings** enabled (-Wall -Wextra)
