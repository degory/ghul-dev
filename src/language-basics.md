# language basics

## data types

### primitive types

ghūl primitive types include various signed and unsigned integers, single and double precision floating point, and boolean.

* `byte`: signed 8-bit integer
* `ubyte`: unsigned 8-bit integer
* `short`: signed 16-bit integer
* `ushort`: unsigned 16-bit integer
* `int`: signed 32-bit integer
* `uint`: unsigned 32-bit integer
* `long`: signed 64-bit integer
* `ulong`: unsigned 64-bit integer
* `word`: signed pointer length integer
* `uword`: unsigned pointer length integer
* `void`: the absence of any value

As usual for languages targeting .NET, these ghūl primitive types are all actually aliases for standard .NET types defined in the `System` namespace, such as `System.Int32`. It is conventional to use the ghūl types rather the raw .NET type names, although technically they are interchangeable.

### composite types

ghūl supports various composite types.

#### arrays

Array types are composed with the `[]` postfix type operator

```ghul
int[] // a one dimensional array of integers
string[] // a one dimensional array of strings
```

ghūl does not have multi-dimensional arrays, but jagged array types can be composed using multiple `[]`

```ghul
int[][] // an array where each element can hold an array of integers
string[][] // an array where each element can hold an array of strings
```

Values of array type are references to the underlying array object, and can be null

Objects of array type can be constructed with `new type[](size)`

```ghul
let array = new int[](10);
```
Note there is no special array constructor syntax: the constructor parameter is in parentheses after the type as normal.

Elements of arrays can be accessed using the indexing operator `array[index]`

```ghul
let a = new int[](10);

a[0] = 0;
a[1] = 1;
```

In practice, use of arrays is fairly rare in ghūl. Use of collection traits like `List[T]` or `MutableList[T]` is preferred.

#### tuples

Tuples in ghūl are defined using parentheses ( and ). They can encapsulate multiple types.

The general syntax for a tuple type is `(type1, type2, ...)`. For example, `(int, string)` represents a tuple with an integer and a string.

Elements in a tuple can be named. The syntax for a tuple type with named elements is `(s: string, i: int)`, where s and i are the names of the tuple elements. If tuple elements are not explicitly named, they are assigned names consisting of a back-tick followed by an index.

Tuples in ghūl are structurally typed. A tuple value is assignment compatible with a tuple type only if the types of all of its elements are identical to the element types of the target tuple type (i.e. co-variance is not supported)

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

