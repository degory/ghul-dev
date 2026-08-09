# functional programming

> **runnable examples**
>
> The [ghul-examples repository](https://github.com/degory/ghul-examples/tree/main/examples/functional) has fuller, runnable functional-programming examples. Open it in a GitHub Codespace or a dev container to build and run them.

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
## immutable data structures and pure functions
While ghūl supports imperative code it also aims to support
writing pure functions with appropriate constructs and defaults

### lists are immutable by default
The standard trait for lists `Collections.List[T]` is immutable

### maps are immutable by default
The standard trait for maps `Collections.Map[K, V]` is immutable

### arrays are immutable
The ghūl array type `T[]` does not expose an assign indexer

### array literals are immutable
The values constructed by array literals are immutable

```ghul
…
let list = [1, 2, 3, 4, 5];

let element = list[3]; // elements can be read

list[3] = 6;
```

diagnostics:

- error: indexer is read-only in int[]

### tuples are immutable
Values of ghūl tuple types `(T1, T2, T3, ...)` are immutable (the elements `` `0 ``, `` `1 ``, `` `2 ``, ... do not have assign accessors)

### tuple literals are immutable
The values constructed by tuple literals are immutable

```ghul
…
let tuple = (1, 2, 3, 4, 5);

let element = tuple.`3; // elements can be read

tuple.`3 = 6;
```

diagnostics:

- error: 3: int is not publicly assignable

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

## union types

A union holds a value of one of several variants, each with its own set of fields: one type that represents several kinds of data. The [definitions page](https://ghul.dev/definitions.html#unions) covers the full surface - unit variants, the `default` variant, primary-constructor headers, and traits; here they appear in the functional idiom.

```ghul
union Shape is
    CIRCLE(radius: double);
    SQUARE(side: double);
si

union Option[T] is
    SOME(value: T);
    NONE;
si

union Result[T, E] is
    OK(value: T);
    ERROR(error: E);
si
```

Accessing the data held by a union's variant requires first checking which variant the union currently holds. An `isa Variant(value)` test checks the variant and, in the then-branch, narrows the value to it so the variant's fields are reachable:

```ghul
…
if isa Option.SOME( ► an_option) then
    let value = an_option.value;
    write_line("the option holds {value}");
fi
```

output:

```
the option holds 42
```

Unions shaped like `Option` types - a single field-carrying variant, or one variant marked `default` - support the `?` and `!` operators, for testing whether they hold a value and for unwrapping it:

```ghul
…
if ► an_option? then
    let value = an_option!;
    write_line("the option holds {value}");
fi
```

output:

```
the option holds 42
```

```ghul
use IO.Std.write_line;

union Option[T] is
    SOME(value: T);
    NONE;
si

union List[T] is
    NIL;
    CONS(head: T, tail: List[T]);
si

union Tree[T] is
    LEAF(value: T);
    NODE(left: Tree[T], right: Tree[T]);
si

use Option.SOME;
use Option.NONE;
use List.NIL;
use List.CONS;
use Tree.LEAF;
use Tree.NODE;

test_option();
test_list();
test_tree();

test_option() is
    let some_int = SOME(42);
    let none_int = NONE();

    let stringify_option = o rec =>
        if isa SOME( ► o) then
            "{o.value}"
        else
            "none"
        fi;

    write_line(stringify_option(some_int));
    write_line(stringify_option(none_int));
si

test_list() is
    let list = CONS(1, CONS(2, CONS(3, NIL())));

    let stringify_list = l rec =>
        if isa CONS( ► l) then
            let (head, tail) = l in
            "{head}, {rec(tail)}"
        else
            "nil"
        fi;

    write_line(stringify_list(list));
si

test_tree() is
    let tree = NODE(
        NODE(
            LEAF(1),
            LEAF(2)
        ),
        NODE(
            LEAF(3),
            LEAF(4)
        )
    );

    let stringify_tree = t rec =>
        if isa NODE( ► t) then
            let (left, right) = t in
            "({rec(left)}, {rec(right)})"
        else
            "{t.value}"
        fi;

    write_line(stringify_tree(tree));
si
```

output:

```
42
none
1, 2, 3, nil
((1, 2), (3, 4))
```

`Option` here is a union built from scratch to show how the shape works, but everyday code rarely needs to: ghūl's own optional types (`T?`) give you this for free, over reference types, value types, and unconstrained generic types alike - see [optional types](https://ghul.dev/optional-types) for the full picture, including how a user-defined union like this one fits alongside the built-in representations.

## pattern matching

Discovering which variant a union holds, and branching on the result, is done with `if let`: a `let` definition in an `if` / `elif` condition, where the branch runs only on a match, with the variable narrowed and in scope:

```ghul
union Shape is
    CIRCLE(radius: double);
    SQUARE(side: double);
si
…
area(s: Shape) -> double is
    if let c: CIRCLE = ► s then
        return 3.14159d * c.radius * c.radius;
    elif let q: SQUARE = ► s then
        return q.side * q.side;
    fi

    return 0.0d;
si
```

`isa` variant tests and `else`-branch narrowing cover the same ground; see [type narrowing and `if let`](https://ghul.dev/control-flow.html#type-narrowing) in the control flow page for the full picture.

A `case` expression matches one scrutinee against several `when` arms, which reads better than a chain of `if let`/`elif let` once there are more than a couple of variants to cover. Over a closed domain - a union's variants, `bool`, an enum, or a class hierarchy closed to the assembly - the compiler checks the arms for exhaustiveness, so `area` needs no fallback return for a variant the `when` arms forgot:

```ghul
…
area(s: Shape) -> double =>
    // case over a union is checked for exhaustiveness: every variant
    // is covered here, so no else arm is needed
    case s
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

`when` arms accept the same patterns as `if let` - a type test that binds and narrows (`c: CIRCLE`), destructuring, and literal leaves - so `case` is the exhaustive counterpart to `if let` rather than a different matching mechanism. See [the case statement](https://ghul.dev/control-flow.html#case-statement) for the full picture.

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
