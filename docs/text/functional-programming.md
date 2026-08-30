# functional programming

> **editable examples**
>
> Every example on this page can be edited and run here: click the pencil to open it in an editor, change it, and run it in your browser. Errors, hovers and completions come from the ghūl compiler as you type.
>
> The [ghul-examples repository](https://github.com/degory/ghul-examples/tree/main/examples/functional) has fuller functional-programming examples to build and run locally, in a GitHub Codespace or a dev container.

ghūl supports a functional style of programming: functions are first-class
values, the common data types are read-only by default, unions and pattern
matching model data by cases, and pipes transform sequences without mutating
them.

## first-class functions

Functions are values. A function literal constructs one, and the result can
be called, assigned to a variable, passed to another function, or stored in
a data structure, like any other value:

```ghul
…
let f = i => i * 2;
write_line("f(123): {f(123)}");

// assigned to another variable
let g = f;
write_line("g(456): {g(456)}");

// passed to another function
let apply_twice = (f, i) => f(f(i));
write_line("apply_twice(f, 7): {apply_twice(f, 7)}");
```

output:

```
f(123): 246
g(456): 912
apply_twice(f, 7): 28
```

## closures

A function literal captures the variables of its enclosing scope. An
immutable `let` is captured by value - a snapshot taken when the literal is
constructed - and a `let mut` is captured by reference, so the function and
the enclosing scope share one live variable that either side can read or
reassign:

```ghul
…
// an immutable let is captured by value
let base = 10;
let add_base = n => n + base;
write_line("add_base(5): {add_base(5)}");

// a mut variable is captured by reference: the function and
// the enclosing scope share it
let count mut = 0;
let next = () => ( count = count + 1; count );

write_line("next(): {next()}");
write_line("next(): {next()}");
write_line("count: {count}");
```

output:

```
add_base(5): 15
next(): 1
next(): 2
count: 2
```

## filter, map, reduce

ghūl pipes provide filter, map and reduce as well as other ways to
work with sequences of values. Each is a global function in
`Ghul.Pipes` taking the sequence as its first argument, so the
[thread-first operator](https://ghul.dev/expressions#thread-first-calls) `|>` feeds one
into the next:

```ghul
…
// map
let doubled = [1, 2, 3, 4, 5] |> map(x => x * 2);
write_line("doubled: {doubled}");

// filter
let evens = [1, 2, 3, 4, 5] |> filter(x => x % 2 == 0);
write_line("evens: {evens}");

// reduce
let sum = [1, 2, 3, 4, 5] |> reduce(0, (acc, x) => acc + x);
write_line("sum: {sum}");
```

output:

```
doubled: 2, 4, 6, 8, 10
evens: 2, 4
sum: 15
```

## recursion

Methods, global functions and anonymous functions can all call themselves
recursively. A named function calls itself by name; an anonymous function
has no name, so the `rec` keyword refers to
the function itself:

```ghul
…
// factorial
let factorial = n rec =>
    if n == 0 then 1 else n * rec(n - 1) fi;
write_line("factorial(5): {factorial(5)}");

// fibonacci
let fibonacci = n rec =>
    if n <= 1 then n else rec(n - 1) + rec(n - 2) fi;
write_line("fibonacci(10): {fibonacci(10)}");
```

output:

```
factorial(5): 120
fibonacci(10): 55
```

An anonymous function cannot refer to a variable that is not yet defined, so
there is no direct way to write two anonymous functions that call each
other. Write mutually recursive functions as named functions, which can
refer to each other whatever order they are defined in:

```ghul
is_even(n: int) -> bool =>
    if n == 0 then true else is_odd(n - 1) fi;

is_odd(n: int) -> bool =>
    if n == 0 then false else is_even(n - 1) fi;
```

## read-only by default

While ghūl supports imperative code, it also aims to make pure functions and
predictable shared data low friction: the types and traits below expose no
way to change a value after it is constructed. The guarantee has two limits.
It is shallow: a read-only structure can still hold references to objects
that are themselves mutable. And it binds only ghūl code: code written in
another .NET language is not required to honour it. Within those limits,
data shared through these types cannot be changed by the code you pass it
to.

### lists and maps are read-only views

The standard traits `Collections.List[T]` and `Collections.Map[K, V]` expose
no mutating members. The mutable `LIST` and `MAP` implement them, so a
function that accepts `List[T]` can read the list it is given but cannot
change it.

### arrays are read-only

The ghūl array type `T[]` has no assign indexer: elements can be read but not
replaced. An array literal constructs a plain array, so the same applies to it.

```ghul
…
let numbers = [1, 2, 3, 4, 5];

let element = numbers[3]; // elements can be read

numbers[3] = 6;
```

diagnostics:

- error: indexer is read-only in int[]

### tuples are immutable

Tuple elements have no assign accessors, and tuples are value types, so a
tuple passed to other code is a copy: nothing can change a tuple you hold.

```ghul
…
let tuple = (1, 2, 3, 4, 5);

let element = tuple.`3; // elements can be read

tuple.`3 = 6;
```

diagnostics:

- error: 3: int is not publicly assignable

### unions are read-only

A union value is fixed at construction: variant fields cannot be assigned,
and nothing can change which variant a value holds. Methods can be added to
a union with [`partial` and `impl`
blocks](https://ghul.dev/definitions.html#partial-and-impl-blocks), but each must be pure: a
union method that assigns a field of any object is reported.

### properties are not publicly assignable by default

A property is readable from anywhere but assignable only within its defining
type, unless it is declared `public`:

```ghul
…
struct THING(name: string);
…
let thing = THING("a thing");

thing.name = "change it";
```

diagnostics:

- error: THING.name: string is not publicly assignable

The members a primary constructor generates are ordinary properties, so the
same applies to them: they are set at construction and cannot be publicly
assigned afterwards unless the parameter carries the `public` modifier.

### pipe operations build new sequences

Pipe operations do not mutate their source: `map`, `filter` and the rest
produce a new sequence and leave the input as it was:

```ghul
…
let list = [1, 2, 3, 4, 5];

let doubled = list |> map(x => x * 2);
write_line("doubled: {doubled}");

// the original list is unchanged:
write_line("list: {list |> join(", ")}");
```

output:

```
doubled: 2, 4, 6, 8, 10
list: 1, 2, 3, 4, 5
```

## pure functions

A function or method can carry a postfix `pure` modifier, declaring that it
assigns no field, property, or array element of any object. Most function
bodies are proven pure with no modifier needed; the declaration covers the
rest, and every override of a pure member must itself be pure. A function
*type* can be pure too, so a signature can require that only pure functions
are passed to it:

```ghul
…
// pure: square assigns no field, property, or array element
square(x: int) -> int pure => x * x;

// a pure function type: this slot accepts only pure functions
apply(f: (int) -> int pure, x: int) -> int => f(x);

write_line("apply(square, 5): {apply(square, 5)}");
write_line("apply(anonymous, 5): {apply(x => x + 1, 5)}");
```

output:

```
apply(square, 5): 25
apply(anonymous, 5): 6
```

A class or struct can opt in to the same discipline for the whole type:
declared `pure` on its header, every member must be proven or declared not
to assign any field, property, or array element after construction. The
details, including what purity means to [type
narrowing](https://ghul.dev/type-narrowing.html), are under
[methods](https://ghul.dev/definitions.html#methods).

Expression bodies and value-producing `if`, `case`, and parenthesised blocks
help in writing pure functions; see
[expression-oriented programming](https://ghul.dev/expression-oriented-programming).

## higher-order functions

A higher-order function takes another function as an argument, or returns
one. Global functions and methods can do this generically:

### higher-order generic global functions

```ghul
apply[T](f: T -> T, x: T) -> T =>
    f(x);

apply_if[T](f: T -> T, x: T, predicate: T -> bool) -> T =>
    if predicate(x) then f(x) else x fi;
```

### higher-order generic methods

```ghul
class HIGHER_ORDER_FUNCTIONS[T] is
    apply(f: T -> T, x: T) -> T static =>
        f(x);

    apply_if(
        f: T -> T, x: T, predicate: T -> bool
    ) -> T static =>
        if predicate(x) then f(x) else x fi;
si
```

### higher-order anonymous functions

```ghul
…
let times_2 = x => x * 2;
write_line("apply(times_2, 5): {apply(times_2, 5)}");

let square = x => x * x;
write_line("apply(square, 5): {apply(square, 5)}");

// higher order function consumes another function:
let apply_twice = (f: int -> int, x) => f(f(x));
write_line(
    "apply_twice(times_2, 5): {apply_twice(times_2, 5)}"
);

// higher order function returns another function:
let create_apply_twice = (f: int -> int) => x => f(f(x));
let apply_twice_times_2 = create_apply_twice(times_2);

write_line(
    "apply_twice_times_2(5): {apply_twice_times_2(5)}"
);
```

output:

```
apply(times_2, 5): 10
apply(square, 5): 25
apply_twice(times_2, 5): 20
apply_twice_times_2(5): 20
```

Anonymous functions take a single concrete type from context; there is no generic equivalent to the two preceding forms. For polymorphic behaviour, declare a generic global function or method.

## function composition

There is no built-in composition operator, but
[operators are ordinary functions](https://ghul.dev/definitions.html#operators), so a
generic `>>` takes two lines to define:

```ghul
…
>>[A, B, C](f: A -> B, g: B -> C) -> A -> C =>
    x => g(f(x));

let times_2 = x => x * 2;
let add_1 = x => x + 1;

let times_2_then_add_1 = times_2 >> add_1;
write_line("times_2_then_add_1(5): {times_2_then_add_1(5)}");

let pipeline = times_2 >> add_1 >> x => "[{x}]";
write_line("pipeline(5): {pipeline(5)}");
```

output:

```
times_2_then_add_1(5): 11
pipeline(5): [11]
```

## currying

A curried function takes its arguments one at a time: each call takes one
argument and returns a function that takes the next. In ghūl that is an
anonymous function that returns another:

```ghul
…
let curried_add = x => y => x + y;

write_line("curried_add(5)(3): {curried_add(5)(3)}");

let add_5 = curried_add(5);
write_line("add_5(3): {add_5(3)}");

let add_10 = curried_add(10);
write_line("add_10(3): {add_10(3)}");
```

output:

```
curried_add(5)(3): 8
add_5(3): 8
add_10(3): 13
```

## partial application

Partial application fixes some of a function's arguments and leaves the rest
open. No special syntax is needed: an anonymous function supplies the fixed
arguments:

```ghul
…
let add = (x, y) => x + y;

let add_5 = y => add(5, y);
write_line("add_5(3): {add_5(3)}");

let add_10 = y => add(10, y);
write_line("add_10(3): {add_10(3)}");
```

output:

```
add_5(3): 8
add_10(3): 13
```

## union types and pattern matching

A union holds one of several variants, and the `if let` and `case` patterns
take one apart; they are how functional ghūl code models data. A `case` over
a union is checked for exhaustiveness, so covering every variant needs no
`else` arm:

```ghul
…
area(s: Shape) -> double =>
    // case over a union is checked for exhaustiveness: every variant
    // is covered here, so no else arm is needed
    case ► s
    when c: CIRCLE then 3.14159d * c.radius * c.radius
    when q: SQUARE then q.side * q.side
    esac;

write_line("{area(CIRCLE(2.0d))}");
write_line("{area(SQUARE(3.0d))}");
```

output:

```
12.56636
9
```

The full construct - guards, destructuring, nesting - has its own page:
[unions and pattern matching](https://ghul.dev/unions-and-pattern-matching.html).

## optional types

An optional type `T?` holds a value that may be absent - the role `Option`
and `Maybe` types play in other languages, built into the type system. `??`
supplies a fallback value, `?.` reads a member only when the receiver is
present, and `if let` tests and unwraps in one step:

```ghul
…
find_first[T](xs: T[], predicate: T -> bool) -> T? is
    for x in xs do
        if predicate(x) then
            return x;
        fi
    od

    return null;
si

let first_even = find_first([1, 3, 4, 7, 8], n => n % 2 == 0);    // T = int, a value type
let first_long = find_first(["a", "bb", "ccc"], s => s.length > 2); // T = string, a reference type

write_line("first even: {first_even ?? -1}");
write_line("first long: {first_long ?? "none"}");
```

output:

```
first even: 4
first long: ccc
```

Optional types have [their own page](https://ghul.dev/optional-types.html).

## lazy sequences

Lazy infinite and finite sequences are expressed with the
`Ghul.Pipes.STREAM[T, S]` union and the `stream(initial, advance)`
factory. State type `S` and output type `T` are independent, so the
state of a stream is hidden from its consumers; `stream()` returns a
plain `Pipe[T]`.

```ghul
union STREAM[T, S] is
    DONE;
    YIELD(value: T, state: S);
si

stream[T, S](
    initial: S,
    advance: S -> STREAM[T, S]
) -> Pipe[T]
```

`advance` is a step function: it receives the current state and returns
either `DONE` (the sequence is over) or `YIELD(value, next_state)`, the
yielded element and the state to feed back in on the next step. The `||`
infix constructs `YIELD(value, next_state)`, so a step body usually reads
`value || next_state`.

```ghul
…
use Ghul.Pipes;
use STREAM.DONE;
use STREAM.YIELD;
…
// counting down. State and output are both int;
// the sequence ends when the state reaches zero.
let counting = (n: int) =>
    stream(
        n,
        i =>
            if i == 0 then
                DONE()
            else
                i || (i - 1)
            fi
    );

// fibonacci. State is the named tuple
// (prev, current); output is int. The state and
// output types differ.
let fibonacci = stream(
    (prev = 1, current = 1),
    ((prev, current)) =>
        current || (
            prev = current,
            current = prev + current
        )
);

// factorial. State is (n, prev); output is int.
let factorial = stream(
    (n = 1, prev = 1),
    ((n, prev)) =>
        let next_n = n + 1, next = prev * next_n in
        next || (n = next_n, prev = next)
);

// chars of a string: state is an int cursor,
// output is char. The input string is captured by
// the anonymous function; the integer state is hidden inside
// the resulting Pipe[char].
let chars_of = (s: string) =>
    let xs = s.to_char_array() in
    stream(
        0,
        i =>
            if i == xs.count then
                DONE()
            else
                xs[i] || (i + 1)
            fi
    );

write_line(
    "counting down from 5: {counting(5)}"
);
write_line(
    "first 10 fibonacci numbers: {fibonacci |> take(10)}"
);
write_line(
    "first 10 factorial numbers: {factorial |> take(10)}"
);
write_line("chars of hello: {chars_of("hello")}");

let indexed =
    fibonacci |> zip(factorial) |> take(10) |> index();

for (i, (fib, fact)) in indexed do
    write_line("fibonacci {i} is {fib}");
    write_line("factorial {i} is {fact}");
od;
```

output:

```
counting down from 5: 5, 4, 3, 2, 1
first 10 fibonacci numbers: 1, 2, 3, 5, 8, 13, 21, 34, 55, 89
first 10 factorial numbers: 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800
chars of hello: h, e, l, l, o
fibonacci 0 is 1
factorial 0 is 2
fibonacci 1 is 2
factorial 1 is 6
fibonacci 2 is 3
factorial 2 is 24
fibonacci 3 is 5
factorial 3 is 120
fibonacci 4 is 8
factorial 4 is 720
fibonacci 5 is 13
factorial 5 is 5040
fibonacci 6 is 21
factorial 6 is 40320
fibonacci 7 is 34
factorial 7 is 362880
fibonacci 8 is 55
factorial 8 is 3628800
fibonacci 9 is 89
factorial 9 is 39916800
```

Type arguments to `stream` are inferred from the initial-state value
and the anonymous function's yield expression.

The factory returns `Pipe[T]`, so combinators like `take`, `filter`,
`map`, `zip`, and `index` chain straight onto it. The state type does not
appear in that result, so consumers never see how a stream is stepped.

[Generators](https://ghul.dev/async-and-generators.html) are the other way to a lazy
sequence: a function containing `yield` produces its elements on demand,
and its result is a `Pipe[T]` too.
