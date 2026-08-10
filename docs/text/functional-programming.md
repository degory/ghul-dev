# functional programming

> **editable examples**
>
> Every example on this page can be edited and run here: click the pencil to open it in an editor, change it, and run it in your browser. Errors, hovers and completions come from the ghūl compiler as you type.
>
> The [ghul-examples repository](https://github.com/degory/ghul-examples/tree/main/examples/functional) has fuller functional-programming examples to build and run locally, in a GitHub Codespace or a dev container.

ghūl has some support for basic functional programming

## first class functions

ghūl has first class functions. There is a function literal syntax that
constructs functions, which can then be called, but also assigned to
variables, passed to other functions, stored in data structures, or
pretty much anything else you can do with any other ghūl value

```ghul
let f = i => i * 2;
f(123);
let g = f;
g(456);

let ff = (f: int -> int, i) => f(f(i));
```

## filter, map, reduce

ghūl pipes provide filter, map and reduce as well as other ways to
work with sequences of values

```ghul
…
// map
let doubled = [1, 2, 3, 4, 5] | .map(x => x * 2);
write_line("doubled: {doubled}");

// filter
let evens = [1, 2, 3, 4, 5] | .filter(x => x % 2 == 0);
write_line("evens: {evens}");

// reduce
let sum = [1, 2, 3, 4, 5] | .reduce(0, (acc, x) => acc + x);
write_line("sum: {sum}");
```

output:

```
doubled: 2, 4, 6, 8, 10
evens: 2, 4
sum: 15
```

## recursion

ghūl methods, global functions and anonymous functions
can all call themselves or each other recursively

### self recursion in anonymous functions

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

### mutual recursion in anonymous functions

Mutual recursion for anonymous functions is slightly awkward because of the forward reference. One way is to declare one as a mutable variable, define the other, then assign to it: the `let mut` is captured by reference, so the first function sees the second once it is assigned:

```ghul
…
let is_odd mut = _;

let is_even = n =>
    if n == 0 then true else is_odd(n - 1) fi;

is_odd = n =>
    if n == 0 then false else is_even(n - 1) fi;

write_line("even(10): {is_even(10)}");
write_line("odd(10): {is_odd(10)}");
```

output:

```
even(10): True
odd(10): False
```

### mutual recursion in named functions
Mutual recursion with named functions doesn't require any workarounds

```ghul
is_even(n: int) -> bool =>
    if n == 0 then true else is_odd(n - 1) fi;

is_odd(n: int) -> bool =>
    if n == 0 then false else is_even(n - 1) fi;
```
## read-only by default

While ghūl supports imperative code, it also aims to make pure functions and
predictable shared data low friction: the types and traits below expose no way
to change a value after it is constructed. The guarantee is what .NET allows it
to be. It is shallow, so a read-only structure can still hold references to
objects that are themselves mutable, and it binds ghūl code, so code written in
another .NET language is not required to honour it. Stick to these types and
shared data behaves predictably.

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

### primary constructors define read-only members

The members a primary constructor generates are set at construction and, by
default, not publicly assignable afterwards: a parameter opts in to a
writable property with the `public` modifier. Fields declared on a union's
variants are read-only in the same way.

### properties are not publicly assignable by default
When defining properties in classes and structs, they are not
publicly assignable by default

```ghul
…
struct THING(name: string);
…
let thing = THING("a thing");

thing.name = "change it";
```

diagnostics:

- error: THING.name: string is not publicly assignable

### pipes support non mutating operations over lists

pipes make it easy to iterate over lists and generators producing
transformed output without mutating the source data

```ghul
…
let list = [1, 2, 3, 4, 5];

let doubled = list | .map(x => x * 2);

// original list is still the same:
write_line("list: {list}");
```

output:

```
list: System.Int32[]
```

### expression oriented programming

Expression bodies and value-producing `if`, `case`, and `val ... lav` blocks help in writing pure functions; see [expression oriented programming](https://ghul.dev/expression-oriented-programming).

## higher order functions

### higher order generically typed global functions

```ghul
apply[T](f: T -> T, x: T) -> T =>
    f(x);

apply_if[T](f: T -> T, x: T, predicate: T -> bool) -> T =>
    if predicate(x) then f(x) else x fi;
```

### higher order generically typed methods:
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

### higher order anonymous functions:

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

## union types and pattern matching

A union holds one of several variants, and the `if let` and `case` patterns take one apart. They are how functional ghūl code models data, and they have their own page: [unions and pattern matching](https://ghul.dev/unions-and-pattern-matching.html).

## currying
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

`advance` is a pure step function: it receives the current state and
returns either `DONE` (sequence is over) or `YIELD(value, next_state)`,
the yielded element and the state to feed back in on the next step.
The `||` infix is parser sugar for `YIELD(value, next_state)`, so a
step body usually reads `value || next_state`.

```ghul
…
use Ghul.Pipes.STREAM;
use Ghul.Pipes.stream;
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
    s =>
        s.current || (
            prev = s.current,
            current = s.prev + s.current
        )
);

// factorial. State is (n, prev); output is int.
let factorial = stream(
    (n = 1, prev = 1),
    s =>
        let next_n = s.n + 1, next = s.prev * next_n in
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
    "first 10 fibonacci numbers: {fibonacci | .take(10)}"
);
write_line(
    "first 10 factorial numbers: {factorial | .take(10)}"
);
write_line("chars of hello: {chars_of("hello")}");

let indexed =
    fibonacci | .zip(factorial) .take(10) .index();

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
and the anonymous function's yield expression. Multi-component state reads more
clearly as a named tuple (`(n = 1, prev = 1)` with `s.n` and `s.prev`
field access) than as a positional tuple needing destructuring. The
no-argument `DONE[T, S]()` constructor in terminating sequences keeps
its explicit type arguments because the surrounding `if/else` widens to
`object` before the outer anonymous function's return type can constrain it.

The factory returns `Pipe[T]` directly so combinators like `.take`,
`.filter`, `.map`, `.zip`, and `.index` chain straight onto a stream
value. State shape never appears in the type a consumer sees of a
`stream(...)`-produced pipe.
