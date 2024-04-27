# language basics

## syntax

ghūl syntax is inspired by a number of non-brace languages, including ALGOL 68 and Pascal

### identifiers and keywords

Identifiers in ghūl follow the convention of `snake_case` for variables, functions, and properties, `PascalCase` for namespaces and traits, and `MACRO_CASE` for concrete types like classes, structs, and enums. ghūl keywords are lowercase.

ghūl relies on keywords for block structure where other languages use braces or indentation. Keywords are context specific and generally come in pairs where the closing keyword is the reverse or mirror image of the opening keyword. In the examples below `is` introduces a method or class body and its block is closed by the reverse keyword `si`

```ghul
let my_variable = 42;

print_something(thing: string) is
    write_line("The thing is: {thing}");
si

class PERSON is
    name: string;
    age: int;
si
```

### expressions and statements
Expressions in ghūl are constructs that return a value, while statements perform actions. All expressions can be used where statements are allowed, but only if statements can be used as expressions.

```ghul
let x = 10; // variable declaration statement
let y = x * 2; // expression used as part of a declaration statement

if x > 5 then // 'if' is a statement, 'x > 5' is an expression
    write_line("x is greater than 5");
fi

let z = if x > 5 then x else y fi; // if can also be used as an expression
```

### function declarations
Functions in ghūl are declared with an optional return type, a name, a list of parameters in parentheses, and a body enclosed in `is` and `si` keywords

```ghul
greet(name: string) -> void is
    write_line("Hello, {name}!");
si
```

Functions can also have an expression body using `=>` instead of `is` / `si`:
```ghul
square(x: int) -> int => x * x;
```

### control flow
ghūl supports various [control flow constructs](/control-flow.html) like `if`, `else`, `while`, `for`, and `case` expressions.

```ghul
if x > 0 then
    write_line("Positive");
elif x < 0 then
    write_line("Negative");
else
    write_line("Zero");
fi

for item in my_list do
    process(item);
od
```

### types

ghūl is statically typed, with some support for [type inference](/type-inference.html). Types can be explicitly specified using a colon `:` plus a type expression

```ghul
let x: int = 42;
let y = "Hello"; // type inferred as string
```
[User types](/definitions.html#types) are defined using `class`, `struct`, `trait`, `enum`, and `union` keywords.

## data types

ghūl supports a variety of data types, including primitives, arrays, and tuples.

### primitive types

ghūl provides the following primitive data types:

* integer types: `byte`, `ubyte`, `short`, `ushort`, `int`, `uint`, `long`, `ulong`, `word`, `uword`
* floating-point types: `single`, `double`
* boolean type: `bool`
* character type: `char`
* void type: `void`

```ghul
let my_int: int = 42;
let my_float: double = 3.14;
let my_bool: bool = true;
let my_char: char = 'A';
```
These types are used to represent basic values in ghūl programs.

### arrays

ghūl supports arrays, which are fixed-size, **immutable** collections of elements of the same type. Array types are denoted using square brackets [] after the element type.

```ghul
let numbers: int[];
```

Arrays can be constructed with an [array literal]()
```ghul
let primes = [2, 3, 5, 7, 11];
```

Array elements can be read with indexer syntax
```ghul
let p = primes[i];
```

### tuples
Tuples in ghūl are lightweight, immutable data structures that can hold a fixed number of elements of different types. Tuple types use parentheses `(` `)`, with elements separated by commas. Tuple literals are similarly constructed with `(` `)` and comma delimited elements

```ghul
let point: (int, int) = (10, 20);
let person: (string, int) = ("Alice", 30);
```

Tuple elements can be accessed using the dot `.` notation followed by the element name:

```ghul
let x = point.`0;
let y = point.`1;
let name = person.`0;
let age = person.`1;
```

Tuple elements can be given more descriptive names, either in the type or in the tuple literal:
```ghul
let point: (x: int, y: int) = (10, 20);
let person = (name = "Alice", age = 30);
let x = point.x;
let y = point.y;
let name = person.name;
let age = person.age;
```

ghūl also supports tuple destructuring:
```ghul
let (a, b) = point;
let (name, age) = person;
```
These are the basic data types available in ghūl. The language also supports more advanced types such as classes, structs, traits, enums, and unions, which will be covered in later sections of the documentation.

### type conversions

ghūl does not perform implicit type conversion (coercion) between scalar types; all scalar type conversions must be explicitly cast. However, ghūl supports polymorphic behavior by allowing upcasting, where instances of derived classes or interfaces can be automatically coerced to compatible ancestor types in the class/interface hierarchy.

```ghul
let d = 1.0d + 1.0d; // OK both addends are type double
let e = 1.0d + 1; // Compile time error because addends are mixed types (double vs int)
let e = 1.0d + cast double(1); // OK with explicit cast

let o: object = "hello"; // OK "hello" is a string, and string is derived from object
```

## variables

ghūl has three kinds of variables: locals declared within the body of a function or method, function or method arguments and captured values.

### locals

Local variables are declared with `let` followed by the variable name, plus a type and/or an initializer.

```ghul
let i = 1234;
let j: int;
let k: int = 5678;
```

Local variables with no explicit initializer are initialized to the default value for their type (zero, false, or null)

### arguments

Arguments will be covered in detail with functions and methods, but the basic form is the argument name followed by its type.

```ghul
some_function(argument: type)
```

### captured values
Captured values will be covered with [function literals](/language-basics.html#function). They are not explicitly defined but inferred from context.

### scope

The scope of all variable definitions is from the point of declaration to the end of the innermost block that contains the declaration. Blocks will be covered later, but generally a block is a control flow statement or a function or method body.

### type inference and explicit types
ghūl can infer the type of local variables from their initializer if present. It's a compile time error if a variable doesn't have either an explicit type or an initializer, or if an initializer is not assignment compatible with any explicit type.

## literals
Literal expressions represent fixed values of a specific type.

```ghul
let integer_literal = 42;
let floating_point_literal = 3.14;
let string_literal = "Hello, world!";
let boolean_literal_true = true;
let boolean_literal_false = false;
```

## operators and expressions
### arithmetic operators
```ghul
let add = 1 + 2;
let sub = 3 - 1;
let mul = 3 * 3;
let div = 12 / 3;
let mod = 13 % 4;
```

### comparison and logical operators
```ghul
let gt = 3 > 1; // true
let gte = 4 >= 4; // true
let lt = 3 < 1; // false
let lte = 4 <= 4; // true
let eq = 1 == 2; // false
let neq = 1 != 2; // true
```

```ghul
let list = [1, 2, 3]

let index = 4;
let search_value = 3;

let and_then = index < list.count /\ list[index] == search_value; // false
let or_else = index >= list.count \/ list[index] != search_value; // true
```

## assignment

variables and properties can be updated via assignment statements

```ghul
let i = 0;
let j = 10;
let s = "Hello";

i = i + j;
s = s + " World!";

thing.property = i + j;
```

