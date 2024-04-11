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
square(x: int) => x * x;
```

### control flow
ghūl supports standard control flow constructs like `if`, `else`, `while`, `for`, and `case` expressions.

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

ghūl is statically typed, with some support for type inference. Types can be explicitly specified using a colon `:` plus a type expression

```ghul
let x: int = 42;
let y = "Hello"; // type inferred as string
```
User types are defined using `class`, `struct`, `trait`, `enum`, and `union` keywords.

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

Arrays can be constructed with an array literal
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
Captured values will be covered with function literals. They are not explicitly defined but inferred from context.

### scope

The scope of all variable definitions is from the point of declaration to the end of the innermost block that contains the declaration. Blocks will be covered later, but generally a block is a control flow statement or a function or method body.

### type inference and explicit types
ghūl can infer the type of local variables from their initializer if present. It's a compile time error if a variable doesn't have either an explicit type or an initializer, or if an initializer is not assignment compatible with any explicit type.

## literals

### integers

Integer literals consist of an optional radix (base), followed by a sequence of digits with optional underscores for readability, followed by a dot and a decimal fraction and/or exponent (for floating point numbers) and finally a type suffix.

```ghul
let i = 12_345_678; // int
let hex = 0x1234_ABCD; // int
let long = 1_000_000_000_000_000L; // long

let hex_unsigned_long = 0x1234_5678__9ABC_DEF0_UL; // ulong

let b = 99b; // byte
```

### char
```ghul
let c = 'c';
let u_macron = 'ū'
```

### floating point
```ghul
let s = 123.456; // single
let t = 123.456E5; // single

let d = 123.456D; // double
let e = 123_456_789_000.0D // double
```

### string
```ghul
let hello_world = "Hello World!";
let unicode = "ghūl programming language"
```

### list
List literals are constructed from a comma separated list of element values enclosed in `[` and `]`. The list element type is inferred as the most specific type compatible with all elements (which may be `object`). The resulting list type is `Collections.List[E]` where `E` is the inferred element type. The constructed list object is an array, but this type is not exposed and should not be relied on. 

```ghul
let animals = ["frog", "bat", "elephant"]; // List[string]
let things = ["frog", 1234, 12.5] // List[object]
let lists = [[1, 2], [3, 4], [5, 6], [7, 7]] // List[List[int]]
```

### tuple

Tuple literals are constructed from a comma separated list of elements enclosed in `(` and `)`. Each element can be a bare value or a named value, and each element can optionally specify a type. Where explicit types are omitted, element types will be inferred.

```ghul
let path_with_id = (path = "/tmp/my-file.txt", id = 1234); // (path: string, id: int)

let path = path_with_id.path;
let id = path_with_id.id;
```

If tuple elements are not explicitly named, they are assigned names consisting of a back-tick followed by an index

```ghul
let things = ("thing", 12.34); // (string, int) with element names `0 and `1

let name = things.`0;
let weight = things.`1;
```

### function

Function literals are constructed from an parenthesized argument list, a return type, and a return expression or a function body. If there is only one argument, no parentheses are needed.

#### expression body function literal

```ghul
let simple_add = (x: int, y: int) -> int => x + y;
```

#### block body function literal

```ghul
let complex_add = (x: int, y: int) -> int is
    let result = x + y;
    return result;
si;
```

#### type inference

Return type can usually be omitted provided it can be inferred from the type of the expression body or any values returned from the block body

```ghul
let simple_add = (x: int, y: int) => x + y;

let complex_add = (x: int, y: int) is
    let result = x + y;
    return result;
si;
```

Argument types usually can be inferred if the function literal is being passed into a function.

```ghul
let list = [1, 2, 3, 4, 5];

list | .filter(element => element < 3); // type of element is inferred to be int
```

#### capturing and closure
In ghūl, function literals can capture and utilize values from their surrounding lexical scope, thereby forming closures. It's important to note that what are captured are the values of variables at the point of the function literal's creation, rather than the variables themselves. This distinction is crucial for understanding how closures work in ghūl.

When a function literal is constructed, it creates read-only snapshots of the values from the outer scopes that are referenced within it. These snapshots are immutable in the sense that the literal cannot alter the captured values. However, the immutability applies to the value's binding, not necessarily to the value itself. In ghūl, like in many .NET languages, a value could be a reference to an object. While the reference is immutable and remains constant throughout the lifetime of the function literal, the object it points to can still be mutable. This means that if the captured value is an object reference, the object's state can be modified either by the closure itself or by other code, but the reference held by the closure will always point to the same object.

Consider a simple closure that captures a loop variable:
```ghul
let g = () => i;
```

In this case, `g` captures the value of `i` at the moment of `g`'s creation. The variable `i` itself is not captured; only its value at a specific point in time is. Here is a more complete example:

```ghul
// Define a list to hold the closures:
let closure_list = new LIST[() -> int]();

// Iterate over an integer range:
for i in 1::10 do
    // Create a closure that captures the current value of i:
    let closure = () => i;

    // Add the closure to the list:
    closure_list.add(closure);
od

// Each closure captured the value of i at the time of its creation:
for closure in closure_list do
    write_line("Closure captured value: " + closure());
od
```

If the captured value is a reference to an object, like in the following example:
```ghul
let object_reference = new SOME_OBJECT();
let closure = () => object_reference.some_property;
```

Then while `closure` cannot change what `object_reference` points to, it can interact with `object_references`'s properties or methods, which can lead to changes in the state of the `SOME_OBJECT` object referenced by `object_reference`.

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

