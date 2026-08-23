# expressions

Expressions in ghūl are constructs that evaluate to a value. They can be used to perform calculations, make comparisons, and combine values in various ways.

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

### array
Array literals are constructed from a comma separated list of element values enclosed in `[` and `]`. The array element type is inferred as the most specific type compatible with all elements (which may be `object` if no more specific ancestor type exists). The resulting array type is `E[]` where `E` is the inferred element type. 

```ghul
let animals = ["frog", "bat", "elephant"]; // string[]
let things = ["frog", 1234, 12.5]; // object[]
let lists = [[1, 2], [3, 4], [5, 6], [7, 7]]; // int[][]
```

### tuple

Tuple literals are constructed from a comma separated list of elements enclosed in `(` and `)`. Each element can be a bare value or a named value, and each element can optionally specify a type. Where explicit types are omitted, element types will be inferred.

```ghul
let path_with_id = (path = "/tmp/my-file.txt", id = 1234);

let path = path_with_id.path;
let id = path_with_id.id;
```

If tuple elements are not explicitly named, they are assigned names consisting of a back-tick followed by an index

```ghul
let things = ("thing", 12.34);

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
…
let list = [1, 2, 3, 4, 5];

list |> filter(element => element < 3);
```

#### capturing and closure

A function literal can refer to identifiers from its surrounding lexical scope; those references form its closure:

```ghul
…
// Define a list to hold the closures:
let closure_list = LIST();

// Iterate over an integer range:
for i in 1::10 do
    // Create a closure capturing i's current value
    let closure = () => i;

    // Add the closure to the list:
    closure_list.add(closure);
od

// Each closure captured the value of i at the
// time of its creation:
for closure in closure_list do
    write_line("Closure captured value: {closure()}");
od
```

output:

```
Closure captured value: 1
Closure captured value: 2
Closure captured value: 3
Closure captured value: 4
Closure captured value: 5
Closure captured value: 6
Closure captured value: 7
Closure captured value: 8
Closure captured value: 9
Closure captured value: 10
```

An immutable `let` is captured by value, a snapshot taken when the function literal is constructed. A `let mut` is captured by reference instead, so the function literal and the surrounding scope share one live variable that either can read or reassign:

```ghul
…
let counter mut = 0;

let bump = (n: int) is
    counter = counter + n;
si;

let peek = () -> int => counter;

bump(10);
bump(5);

write_line("counter = {counter}, peek() = {peek()}");
```

output:

```
counter = 15, peek() = 15
```

## arithmetic

Arithmetic expressions allow you to perform mathematical calculations using operators such as `+`, `-`, `*`, `/`, and `%`.

```ghul
let sum = 10 + 5;           // Addition
let difference = 10 - 5;    // Subtraction
let product = 10 * 5;       // Multiplication
let quotient = 10 / 5;      // Division
let remainder = 10 % 3;     // Modulo (remainder)
```

## comparison

Comparison expressions allow you to compare values using operators such as `==`, `!=`, `<`, `>`, `<=`, and `>=`.

```ghul
let equal = 5 == 5; // Equality
let not_equal = 5 != 10; // Inequality
let less_than = 5 < 10; // Less than
let greater_than = 10 > 5; // Greater than
let less_than_or_equal = 5 <= 5; // Less or equal
let greater_than_or_equal = 10 >= 10; // Greater or equal
```

## short circuit logical

Logical expressions allow you to combine or negate boolean values using the `/\` (logical AND), `\/` (logical OR), and `!` (logical NOT) operators.

```ghul
let logical_and = true /\ false;    // Logical AND
let logical_or = true \/ false;     // Logical OR
let logical_not = !true;            // Logical NOT
```

Evaluation stops as soon as the result is known

## conditional

Conditional expressions allow you to evaluate different expressions based on a condition using the `if`-`then`-`else` construct.

```ghul
…
let max = if a > b then a else b fi;
```

## case expression

A `case` expression yields the value of the matched arm. It needs an `else` arm so that every value is covered; the arm values and the `else` agree on a type:

```ghul
…
let n = 2;

let size =
    case n
    when 0 then "none"
    when 1, 2, 3 then "small"
    else "large"
    esac;

write_line("size = {size}");
```

output:

```
size = small
```

## function call

Function call expressions allow you to invoke functions and methods by providing the necessary arguments.

```ghul
…
let result = sum(10, 5);
```

## thread-first calls

The `|>` operator threads its left side into the call on its right as that call's first argument, so `x |> f(a)` means `f(x, a)`. Chaining is left-to-right, which turns a nest of calls inside-out into a readable pipeline:

```ghul
use IO.Std.write_line;

class BOX(value: int);

twice(x: int) -> int => x * 2;
describe(b: BOX) -> string => "box of {b.value}";

// '|>' threads its left side in as the first argument of the call on
// its right, so a chain reads left-to-right instead of nesting
// inside-out. This line means write_line(describe(BOX(twice(21)))).
21 |> twice() |> BOX() |> describe() |> write_line();
```

output:

```
box of 42
```

The right side must be call-shaped: a free function, a constructor, or a method call on a receiver. The left side always becomes the first argument; the call is otherwise resolved exactly as if it had been written without the `|>`. This is separate from the `|` [pipe](https://ghul.dev/functional-programming.html) operator, which wraps a sequence for lazy `map` and `filter`; `|>` performs an ordinary call.

## property access

Property access expressions allow you to access the properties of an object using the dot notation.

```ghul
let length = "Hello".length;
```

## indexer

Indexer expressions allow you to access elements of an array or collection using square brackets.

```ghul
let first_element = [1, 2, 3][0];
```

## constructor

Constructor expressions allow you to create new instances of classes or structs by invoking their constructors.

```ghul
…
let point = POINT(10, 20);
```

## type cast

A type cast converts a value from one type to another explicitly, using the `cast` keyword. Scalar conversions, casts between unrelated reference types, and .NET user-defined conversion operators all go through it:

```ghul
let integer_value = cast int(3.14);
```

The target type can be left out when the surrounding expression already determines it. `cast(v)` converts `v` to whatever type the position it sits in calls for - a typed `let` initializer, an assignment, a `return` or `=>` body, a call argument's formal, an operator's other operand, an index:

```ghul
…
average(count: int, total: single) -> single =>
    total / cast(count);   // cast(v) takes its type from the formal

write_line("{average(4, 10.0)}")
```

output:

```
2.5
```

`cast(v)` is rejected where the position supplies no type at all, or where more than one overload or operator would accept it.

A cast written with an optional target yields rather than throwing: `cast T?(x)` is the absent value when `x` is not a `T`, which is the form [`if let`](https://ghul.dev/control-flow.html#if-let) builds on. Without the `?` the cast is checked: a failed one raises `System.InvalidCastException` at the point of the cast, and a `cast-may-throw` warning says so at the site.

## default value (`_`)

The `_` expression evaluates to the default value of a type: `null` for reference types, the zero value for numeric and other value types.

`_[T]` pins the type explicitly. A bare `_` takes its type from the surrounding context: a typed `let`, an assignment, or a return:

```ghul
let a = _[int];   // 0
let b: string? = _;   // null
…
zero[T]() -> T => _;
```

`let a = _` initialises a local to its type's default value, where the type is inferred from how the local is later used.

## let in

A `let ... in ...` expression introduces one or more local variables that are in scope only within the trailing expression.

```ghul
…
let area = let r = 5 in r * r;

write_line("area = {area}");
```

output:

```
area = 25
```

## block

A `val ... lav` block is a sequence of statements that produces a value. The value is the block's tail expression, or any `return E` whose target is the block. A block gives an expression room for intermediate local variables, loops, and early exits:

```ghul
…
let area = val
    let width = 4;
    let height = 5;
    width * height
lav;

write_line("area = {area}");
```

output:

```
area = 20
```

A `return E` inside a `val ... lav` block yields from the block, not from the enclosing function.

These are the main types of expressions in ghūl. They can be combined and nested to form more complex expressions and statements:


```ghul
let x = 10;
let y = 5;
let sum = x + y;
let product = x * y;
let is_greater = x > y;

if is_greater then
    IO.Std.write_line("x is greater than y");
else
    IO.Std.write_line("x is not greater than y");
fi

let numbers = [1, 2, 3, 4, 5];
let first_number = numbers[0];

IO.Std.write_line(
    "The first number is: {first_number}"
);
```

output:

```
x is greater than y
The first number is: 1
```
