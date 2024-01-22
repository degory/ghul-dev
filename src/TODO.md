

Constants: Declaration and benefits
Mutable vs immutable data
Operators and Expressions

Arithmetic operators
Comparison and logical operators
Assignment operators
Operator precedence and associativity
Expressions and evaluation
Control Flow

Conditional Statements
if, else statements: Syntax and examples
Nested conditionals and best practices
Conditional expressions (ternary operator)
Looping Constructs
for loops: Syntax, usage, and variations
while and do-while loops: Differences and use cases
Loop control statements (break, continue)
Error Handling and Exceptions

Try-catch-finally blocks: Syntax and how to use them
Creating custom exceptions
Best practices in exception handling
Error handling patterns
Comments and Documentation

Single-line and multi-line comments
Documentation comments: Syntax and tools for generating documentation
Best practices for commenting and documenting code
Input and Output Operations

Reading from and writing to the console
Basic file I/O operations (if applicable)
Formatting and parsing data
Modules and Namespaces

Defining and using modules/namespaces
Importing external modules
Organizing code into modules for better maintainability
Style and Naming Conventions

Recommended naming conventions for variables, functions, classes, etc.
Code formatting guidelines
Tips for writing clean and readable code



### interaction of return with try-catch-finally

If a return statement is executed from within a `try` block, then control is first passed to the enclosing `finally` blocks for every `try` block that encloses the `return` statement before control exits the function.

In general during the course of exception handling or function return, you can imagine there is a single return value or exception object that is being passed from the point of the return, the throw, or the function invocation that has thrown. 

That object passes through enclosing catch and finally blocks, where it can be replaced by a different exception or return value, until control flow finally leaves the function.

```ghul
swallow(i: int) -> int is
    try
        return do_something_risky(i);
    catch e: Exception
        return 1234; // I'm sure it was fine
    yrt
si
```