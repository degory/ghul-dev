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
let closure_list = LIST[() -> int]();

// Iterate over an integer range:
for i in 1::10 do
    // Create a closure that captures the current value of i:
    let closure = () => i;

    // Add the closure to the list:
    closure_list.add(closure);
od

// Each closure captured the value of i at the time of its creation:
for closure in closure_list do
    write_line("Closure captured value: {closure()}");
od
```

If the captured value is a reference to an object, like in the following example:
```ghul
let object_reference = SOME_OBJECT();
let closure = () => object_reference.some_property;
```

Then while `closure` cannot change what `object_reference` points to, it can interact with `object_references`'s properties or methods, which can lead to changes in the state of the `SOME_OBJECT` object referenced by `object_reference`.

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
let equal = 5 == 5;              // Equality
let not_equal = 5 != 10;         // Inequality
let less_than = 5 < 10;          // Less than
let greater_than = 10 > 5;       // Greater than
let less_than_or_equal = 5 <= 5; // Less than or equal to
let greater_than_or_equal = 10 >= 10; // Greater than or equal to
```

## short circuit logical

Logical expressions allow you to combine or negate boolean values using the `&&` (logical AND), `||` (logical OR), and `!` (logical NOT) operators.

```ghul
let logical_and = true /\ false;    // Logical AND
let logical_or = true \/ false;     // Logical OR
let logical_not = !true;            // Logical NOT
```

Evaluation stops as soon as the result is known

## conditional

Conditional expressions allow you to evaluate different expressions based on a condition using the `if`-`then`-`else` construct.

```ghul
let max = if a > b then a else b fi;
```

## function call

Function call expressions allow you to invoke functions and methods by providing the necessary arguments.

```ghul
let result = sum(10, 5);
```

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
let point = POINT(10, 20);
```

## type cast

Type cast expressions allow you to explicitly convert a value from one type to another using the `cast` keyword.

```ghul
let integer_value = cast int(3.14);
```

These are the main types of expressions in ghūl. They can be combined and nested to form more complex expressions and statements:


```ghul
entry() is
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

    IO.Std.write_line("The first number is: {first_number}");
si
```
