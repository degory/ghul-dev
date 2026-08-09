# language basics

## syntax

ghūl syntax is inspired by a number of non-brace languages, including ALGOL 68 and Pascal

### identifiers and keywords

Identifiers in ghūl follow the convention of `snake_case` for variables, functions, methods, and properties, `PascalCase` for namespaces, traits, abstract classes, unions, and enums, and `MACRO_CASE` for concrete classes, structs, variants, and enum members. ghūl keywords are lowercase.

ghūl relies on keywords for block structure where other languages use braces or indentation. Keywords are context specific and generally come in pairs where the closing keyword is the reverse or mirror image of the opening keyword. In the examples below `is` introduces a method or class body and its block is closed by the reverse keyword `si`

```ghul
…
let my_variable = 42;

print_something(thing: string) is
    write_line("The thing is: {thing}");
si

print_something("a hello");

class PERSON is
    name: string;
    age: int;
si
```

output:

```
The thing is: a hello
```

### expressions and statements
Expressions in ghūl are constructs that return a value, while statements perform actions. All expressions can be used where statements are allowed, but only if statements can be used as expressions.

```ghul
…
// variable declaration statement
let x = 10;

// expression used as part of a declaration statement
let y = x * 2;

// 'if' is a statement, 'x > 5' is an expression
if x > 5 then
    write_line("x is greater than 5");
fi

// 'if' can also be used as an expression
let z = if x > 5 then x else y fi;
```

output:

```
x is greater than 5
```

### function declarations
Functions in ghūl are declared with an optional return type, a name, a list of parameters in parentheses, and a body enclosed in `is` and `si` keywords

```ghul
…
greet(name: string) -> void is
    write_line("Hello, {name}!");
si
```

Functions can also have an expression body using `=>` instead of `is` / `si`:
```ghul
square(x: int) -> int => x * x;
```

### control flow
ghūl supports various [control flow constructs](https://ghul.dev/control-flow.html) like `if`, `else`, `while`, `for`, and `case` expressions.

```ghul
…
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

output:

```
Positive
```

### types

ghūl is statically typed, with some support for [type inference](https://ghul.dev/type-inference.html). Types can be explicitly specified using a colon `:` plus a type expression

```ghul
let x: int = 42;
let y = "Hello";
```
[User types](https://ghul.dev/definitions.html#types) are defined using `class`, `struct`, `trait`, `enum`, and `union` keywords.

## built-in data types

ghūl's built-in data types are primitive types, arrays, tuples, and optionals.

### primitive types

ghūl provides the following primitive data types:

* integer types: `byte`, `ubyte`, `short`, `ushort`, `int`, `uint`, `long`, `ulong`, `word`, `uword`
* floating-point types: `single`, `double`
* fixed-point type: `decimal`
* boolean type: `bool`
* character type: `char`
* void type: `void`

```ghul
let my_int: int = 42;
let my_float: double = 3.14d;
let my_decimal: decimal = 19.99m;
let my_bool: bool = true;
let my_char: char = 'A';
```
These types are used to represent basic values in ghūl programs.

### arrays

ghūl supports arrays, which are fixed-size, **immutable** collections of elements of the same type. Array types are denoted using square brackets [] after the element type.

```ghul
let numbers: int[] = [1, 2, 3];
```

Arrays can be constructed with an [array literal]()
```ghul
let primes = [2, 3, 5, 7, 11];
```

Array elements can be read with indexer syntax
```ghul
…
let p = primes[i];
```

### tuples
Tuples in ghūl are lightweight, immutable data structures that can hold a fixed number of elements of different types. Tuple types use parentheses `(` `)`, with elements separated by commas. Tuple literals are similarly constructed with `(` `)` and comma delimited elements. Tuples compare by structural equality: two tuples are equal when their corresponding elements are.

```ghul
let point: (int, int) = (10, 20);
let person: (string, int) = ("Alice", 30);
```

Tuple elements can be accessed using the dot `.` notation followed by the element name:

```ghul
…
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
…
let (a, b) = point;
let (name, age) = person;
```

Destructuring also has a by-name form, `(local = field, ...)`, that pulls each element from a named field rather than by position; the positional and by-name forms are covered with [pattern matching](https://ghul.dev/control-flow.html#if-let).

### optional types

A type followed by `?` is an **optional** type: a value of `T?` can be present or absent. The same type written without the `?` is non-optional, and a non-optional value is always there.

```ghul
let ► name: string? = "Alice"; // present
let nickname: string? = null; // absent
```

The postfix `?` operator tests whether an optional has a value. A plain `if x?` narrows `x` to its non-optional form inside the branch, so the value reads directly:

```ghul
…
if ► name? then
    write_line("name is {name}"); // name is non-optional here
fi
```

output:

```
name is Alice
```

`!` reads the value out where narrowing hasn't already done it, but is rarely needed: `if let` tests an optional and reads its value into a local variable in one step (see [control flow](https://ghul.dev/control-flow.html#if-let)).

Optional types work for reference and value types alike - and beyond those two, for generic code that doesn't know which one it has, and for user-defined types that never mention `T?` at all. The [optional types](https://ghul.dev/optional-types) page covers all of that; here's the common case, a value-type optional like `int?`. You don't construct one explicitly: a plain value where an optional is expected widens automatically, and `null` marks the absent case:

```ghul
let ► here: int? = 42;   // present
let gone: int? = null; // absent
```

A non-optional type never holds the absent case, so a `T?` is not assignable to a `T`. The compiler rejects it rather than warning:

```ghul
…
// rejected: a string? is not assignable to a string
let title: string = maybe;
```

diagnostics:

- error: string? is not assignable to string
- warning: [non-optional] string expected but maybe may not hold a value

To pass a `T?` where a `T` is wanted, make the value present first: narrow it with `if x?` or `if let`, assert it with `x!` (which throws when absent), or supply a fallback with `x ?? other`:

```ghul
…
if ► maybe? then
    let narrowed: string = maybe; // narrowed to string here
    write_line(narrowed);
fi

let forced: string = ► maybe!;            // asserts present, throws if absent
let safe: string = maybe ?? "fallback"; // falls back when absent
```

output:

```
found
```

Reading a member through an optional not known to be present draws a `null-deref` warning; `x?.y`, `x.has_value`, `x!`, and `if let` are the warning-free routes. Applying `!`, `?`, or `?.` to a value already known to be present warns that the operator is redundant, and `!` on a value that was never optional is an error. Each warning has a slug you can silence with `@suppress("<slug>")` per declaration, per file, or across the project.

The `??` operator supplies a fallback: `a ?? b` is `a` when it is present, otherwise `b`, and `b` is evaluated only when needed. It is right-associative, so `a ?? b ?? c` tries each in turn, and the result stays optional until a non-optional value closes the chain:

```ghul
…
let name = lookup();
let greeting = "hello, {name ?? "stranger"}";
write_line(greeting);
```

output:

```
hello, stranger
```

The `?.` operator reads a member only when the receiver is present: `a?.b` is `b` when `a` is present, otherwise the absent case. The result is always optional, and `?.` chains, so a whole access path folds down to one optional. Only field and property access compose with `?.`; a method call needs an `if a?` guard first.

```ghul
…
let p = find();
let name = p?.name; // string? - absent when p is absent
write_line("name: {name ?? "unknown"}");
```

output:

```
name: unknown
```

These are the basic data types available in ghūl. The language also supports more advanced types such as classes, structs, traits, enums, and unions, which will be covered in later sections of the documentation.

### type conversions

ghūl does not perform implicit type conversion (coercion) between scalar types; all scalar type conversions must be explicitly cast. However, ghūl supports polymorphic behavior by allowing upcasting, where instances of derived classes or interfaces can be automatically coerced to compatible ancestor types in the class/interface hierarchy.

```ghul
// OK: both addends are type double
let d = 1.0d + 1.0d;

// compile time error: addends are mixed types
// (double vs int)
let e = 1.0d + 1;

// OK with explicit cast
let e = 1.0d + cast double(1);

// OK: "hello" is a string, and string derives
// from object
let o: object = "hello";
```

## variables

ghūl has three kinds of variables: locals declared within the body of a function or method, function or method arguments and variables captured by a function literal.

### locals

Local variables are declared with `let` followed by the variable name, an optional explicit type, and an initializer:

```ghul
let i = 1234;
let j: int = 0;
let k: int = 5678;
```

### arguments

Arguments will be covered in detail with functions and methods, but the basic form is the argument name followed by its type.

```ghul
some_function(argument: type)
```

### captured variables
Variables captured by a function literal will be covered with [function literals](https://ghul.dev/expressions.html#capturing-and-closure). They are not explicitly declared but inferred from each function literal's body.

### scope

The scope of all variable definitions is from the point of declaration to the end of the innermost block that contains the declaration. Blocks will be covered later, but generally a block is a control flow statement or a function or method body.

### type inference and explicit types
ghūl infers the type of a local variable from its initializer. An explicit type can be given alongside; it's a compile time error if the initializer is not assignment compatible with it.

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
let list = [1, 2, 3];

let index = 4;
let search_value = 3;

// false
let and_then =
    index < list.count /\ list[index] == search_value;

// true
let or_else =
    index >= list.count \/ list[index] != search_value;
```

## assignment

variables and properties can be updated via assignment statements

```ghul
…
let i mut = 0;
let j = 10;
let s mut = "Hello";

i = i + j;
s = "{s} World!";

thing.property = i + j;

write_line("i = {i}, s = {s}, thing.property = {thing.property}");
```

output:

```
i = 10, s = Hello World!, thing.property = 20
```
