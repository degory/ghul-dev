# type inference

> **editable examples**
>
> Every example on this page can be edited and run here: click the pencil to open it in an editor, change it, and run it in your browser. Errors, hovers and completions come from the ghūl compiler as you type.
>
> The [ghul-examples repository](https://github.com/degory/ghul-examples/tree/main/examples/type-inference) has fuller type-inference examples to build and run locally, in a GitHub Codespace or a dev container.

ghūl infers types pervasively inside a method or function body: most local variables, loop variables, destructured variables and anonymous function parameters can be left unannotated, and the compiler works their types out from how they are initialized and used.

Mechanically it is bidirectional, constraint-based inference: types flow up from expressions and down from the contexts that use them, and the compiler re-walks each function body until the unknowns settle. The [implementation page](https://ghul.dev/implementation#type-inference) describes how.

Type inference is **function-local**: types inferred within one function are not visible outside it. Outside function bodies all types are explicit, including the signatures of methods and global functions, whose parameter and return types are always written out.

Within a function, types are inferred for:

- local variables
- loop variables
- destructured variables
- anonymous function parameters
- anonymous function return types
- generic type arguments on calls to constructors, methods, static methods and global functions

In each case the inferred type is concrete. The compiler does not introduce new type parameters during inference, so an anonymous function literal takes a single concrete function type from its context - it cannot itself be generic. For polymorphic behaviour, declare a generic global function or method and pass it where the function value is needed.

ghūl also performs [type narrowing](https://ghul.dev/type-narrowing.html) - within parts of a function a value can be observed at a more specific type than the one it was declared with. Inference and narrowing work together: the inferred type is the ceiling, and the control flow sharpens it region by region.

The examples below leave inferred types unannotated; hover over any variable to see the type the compiler worked out for it.

## what stays explicit

A function's signature is written out explicitly; inference works within the body.

```ghul
// the signature is explicit: the parameter type
// and the return type are written out
totals(
    values: Collections.Iterable[int]
) -> (sum: int, count: int) is
    let sum mut = 0;
    let count mut = 0;

    for v in values do
        sum = sum + v;
        count = count + 1;
    od

    return (sum, count);
si
…
```

Inference does not read types out of a body into the function's signature, and does not flow from one function into another: each body is checked on its own, against the explicit signatures of everything it calls.

Fields and properties belong to a type rather than to a function body, so their types are written out too - for private members as well as public ones.

```ghul
class COUNTER is
    count: int; // a property - its type is declared

    init() is
        count = 0;
    si

    tick() is
        // a local - its type is inferred from the
        // initializer
        let step = 1;
        count = count + step;
    si
si
…
```

## what gets inferred

### let statements and expressions

When no explicit type is given for a variable in a let statement or expression, its type is inferred from the initializer, provided one is present.

```ghul
let a_string = "12345";
let an_int = 12345;
let an_int_array = [1, 2, 3, 4, 5];
```

### destructuring variables

A destructuring `let` declares several variables at once from a tuple. Each variable takes its type from the corresponding element of the right-hand side, and the pattern can nest.

```ghul
let person = ("alice", 30);
let (name, age) = person;

let ((first, second), third) = (("a", "b"), "c");
```

### for loop variables

A `for` loop variable takes its type from the element type of the iterable being looped over. Destructuring composes with this: when the element type is a tuple, its element types flow into the destructured names.

```ghul
…
for i in 1::10 do
    write_line("{i}");
od

let pairs = [("a", 1), ("b", 2)];

for (name, count) in pairs do
    write_line("{name}: {count}");
od
```

output:

```
1
2
3
4
5
6
7
8
9
10
a: 1
b: 2
```

### list literal element types

The element type of a list literal is inferred from the types of the elements: the compiler finds a type compatible with all of them.

```ghul
class BASE();

class DERIVED(): BASE;
…
let array_of_base = [BASE(), DERIVED()];
let array_of_object = [BASE(), DERIVED(), object()];
let array_of_int = [1, 2, 3, 4, 5];
```

If a list contains tuple literals, the compiler finds a compatible common type for each tuple element across all elements of the list.

```ghul
let int_string = [(123, "hello"), (456, "goodbye")];

let int_object = [(123, 456), (798, "wibble")];
```

### if expression result types

The result type of an if expression is inferred from the types of all the branch results: the compiler finds a type compatible with all of them.

```ghul
class BASE();

class DERIVED(): BASE;

let derived =
    if true then
        DERIVED()
    else
        DERIVED()
    fi;

let base =
    if true then
        DERIVED()
    else
        BASE()
    fi;
```

### generic class, struct and variant constructors

When constructing a generic class, struct or variant, the generic type arguments are inferred from the constructor method arguments where possible.

```ghul
class THING[T](value: T);
…
let int_thing = THING(1234);
let string_thing = THING("hello");
```

Inference from the constructor arguments works when every type argument appears among those arguments and the constructor overload is unambiguous. A type argument left unpinned - by a no-argument constructor, say - can still be resolved from later use of the value (see [inference from later use sites](#inference-from-later-use-sites)).

### generic function and method calls

When calling a generic global function, a generic method, or a static method on a generic class or struct, the compiler infers the generic type arguments from the types of the actual arguments passed.

```ghul
class BASE();

class DERIVED(): BASE;

do_something[T](a: T, b: T) -> T => a;
let base = do_something(BASE(), DERIVED());
let derived = do_something(DERIVED(), DERIVED());
let obj = do_something(object(), DERIVED());
```

### anonymous function return types

The return type of an anonymous function literal is inferred from the type of its expression body, or from the types of return expressions in its block body.

```ghul
let returns_int = (i: int) => i * 2;
let returns_string = (s: string) => "{s}{s}";
```

### anonymous function argument types

When an anonymous function literal is passed as an argument and an unambiguous overload match can be made without knowing the exact function type, the compiler infers the argument types from the matching overload.

```ghul
…
[1, 2, 2, 4, 5] |> filter(i => i > 3);
```

Here `self` is already known to be `Pipe[int]`, so `Pipe[int].filter(predicate: int -> bool) -> Pipe[int]` is the only overload that could match. The `predicate` argument must therefore be `int -> bool`, and the type of `i` must be `int`.

## inference from later use sites

The sections above infer a type from a declaration's initializer or from a call argument. Because inference spans the whole function body, the compiler can also work the other way: when a declaration gives no type on its own, a later use of the variable in the same body can supply one.

```ghul
…
// m is BOX[?] here; the type argument is not
// yet known
let m = BOX();

// the set call takes an int, so m is BOX[int]
m.set(42);

let x = m.get();
```

The same applies to anonymous functions whose argument types are not explicit: if a later call supplies a concrete type, that flows back to the function literal.

```ghul
…
let f = x => x + 1;
write_line("{f(42)}");
```

output:

```
43
```

### recursive anonymous functions

In a recursive anonymous function, the argument type can be inferred from how the function is called, including from its own recursive calls.

```ghul
…
let factorial = n rec =>
    if n == 0 then 1 else n * rec(n - 1) fi;
write_line("{factorial(5)}");
```

output:

```
120
```

### operations on a not-yet-inferred value

When an anonymous function's parameter has no annotation, every operation the body performs on it - a member access, a method call, an index, an iteration, a destructuring - is recorded as a constraint on the parameter's type. Whatever type is eventually inferred for the parameter must satisfy all of them.

```ghul
…
let length_of = x => x.length;
write_line("{length_of("hello")}");
```

output:

```
5
```

The call passes a `string`, and `string` has a `length` member, so `x` resolves to `string`. When a call site leaves room for more than one type, a candidate that does not support every recorded operation is discarded.

### generic argument inference from sibling actuals

When a generic function or method is called with two arguments that share only a common ancestor, the generic argument is inferred from their nearest shared type rather than failing the overload match.

```ghul
class Animal abstract is
    speak() -> string => "animal";
si

class CAT(): Animal;

class DOG(): Animal;

merge[T](a: T, b: T) -> T => a;
…
let a = merge(CAT(), DOG());
```
