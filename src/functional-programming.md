# functional programming

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

## recursion

ghūl methods, global functions and anonymous functions
can all call themselves or each other recursively

### self recursion in anonymous functions

```ghul
// factorial
let factorial = n rec => if n == 0 then 1 else n * rec(n - 1) fi;
write_line("factorial(5): {factorial(5)}");

// fibonacci
let fibonacci = n rec => if n <= 1 then n else rec(n - 1) + rec(n - 2) fi;
write_line("fibonacci(10): {fibonacci(10)}");
```

### mutual recursion in anonymous functions

Mutual recursion for anonymous functions is slightly awkward, but possible
by passing one function into the other as an argument:

```ghul

let is_even = (n, is_odd: int -> bool) => if n == 0 then true else is_odd(n - 1) fi;
let is_odd = n rec => if n == 0 then false else is_even(n - 1, rec) fi;

write_line("even(10): {is_even(10, is_odd)}");
write_line("odd(10): {is_odd(10)}");
```

### mutual recursion in named functions
Mututal recursion with named functions, doesn't require any workarounds

```ghul
is_even(n: int) -> bool is
    if n == 0 then true else is_odd(n - 1) fi;
si

is_odd(n: int) -> bool is
    if n == 0 then false else is_even(n - 1) fi;
si
```
## immutable data structures and pure functions
While ghūl supports imperitive code it also aims to support
writing pure functions with appropriate constructs and defaults

### lists are immutable by default
The standard trait for lists `Collections.List[T]` is immutable (it maps to .NET's ``System.Collections.Generic.IReadOnlyList`1[T]``)

### maps are immutable by default
The standard trait for maps `Collections.Map[T]` is immutable (it maps to .NET's ``System.Collections.Generic.IReadOnlyDictionary`2[K,V]``)

### arrays are immutable
The ghūl array type `T[]` does not expose an assign indexer

### array literals are immutable
The values constructed by array literals are immutable

```ghul
let list = [1, 2, 3, 4, 5];

let element = list[3]; // elements can be read

// the list is an instance of an immutable type:
assert list.get_type() == typeof int[];

list[3] = 6; // elements cannot be assigned to - compile time error
```

### tuples are immutable
Values of ghūl tuple types `(T1, T2, T3, ...)` are immutable (the elements `` `0 ``, `` `1 ``, `` `2 ``, ... do not have assign accessors)

### tuple literals are immutable
The values constructed by tuple literals are immutable

```ghul
let tuple = (1, 2, 3, 4, 5);

let element = tuple.`3; // elements can be read

// the tuple is an instance of an immutable type:
assert tuple.get_type() == typeof (int, int, int, int, int);

tuple.`3 = 6; // elements cannot be assigned to - compile time error
```

### properties are not publicly assignable by default
When defining properties in classes and structs, they are not
publicly assignable by default

```ghul
struct THING is
    name: string;

    init(name: string) is
        self.name = name;
    si
si

let thing = THING("a thing");
thing.name = "change it"; // compile time error
```

### pipes support non mutating operations over lists

pipes make it easy to iterate over lists and generators producing
transformed output without mutating the source data

```ghul
let list = [1, 2, 3, 4, 5];

let doubled = list | .map(x => x * 2);

// original list is still the same:
write_line("list: {list| }");
```
### expression oriented programming
Expression bodied functions and some support for
expression oriented programming help in writing
pure functions

```ghul
let add = (x, y) => x + y;
write_line("add(5, 3): {add(5, 3)}");

let classify = n =>
    if n == 0 then
        "Zero"
    elif n % 2 == 0 /\ n < 0 then
        if n % 5 == 0 then "Negative even and multiple of 5" else "Negative even" fi
    elif n % 2 != 0 /\ n < 0 then
        if n % 5 == 0 then "Negative odd and multiple of 5" else "Negative odd" fi
    elif n % 2 == 0 then
        if n % 5 == 0 then "Positive even and multiple of 5" else "Positive even" fi
    else
        if n % 5 == 0 then "Positive odd and multiple of 5" else "Positive odd" fi
    fi;

write_line("classifyNumber(-10): {classify(-10)}");
write_line("classifyNumber(-3): {classify(-3)}");
write_line("classifyNumber(0): {classify(0)}");
write_line("classifyNumber(4): {classify(4)}");
write_line("classifyNumber(25): {classify(25)}");        

```

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

    apply_if(f: T -> T, x: T, predicate: T -> bool) -> T static =>
        if predicate(x) then f(x) else x fi;
si
```

### higher order anonymous functions:

```ghul
let times_2 = x => x * 2;
write_line("apply(times_2, 5): {apply(times_2, 5)}");

let square = x => x * x;
write_line("apply(square, 5): {apply(square, 5)}");

// higher order function consumes another function:
let apply_twice = (f: int -> int, x) => f(f(x));
write_line("apply_twice(times_2, 5): {apply_twice(times_2, 5)}");

// higher order function returns another function:
let create_apply_twice = (f: int -> int) => x => f(f(x));
let apply_twice_times_2 = create_apply_twice(times_2);

write_line("apply_twice_times_2(5): {apply_twice_times_2(5)}");
```

## union types

Unions are under development [(see GitHub issue #1132)](https://github.com/degory/ghul/issues/1132)

Unions hold a value of one of several different types (variants). Each variant can have its own set of fields. This is useful for creating types that can represent multiple kinds of data in a single structure.

```ghul
union Shape is
    CIRCLE(radius: float);
    SQUARE(side: float);
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

Accessing the data held by a union's variant requires first checking which variant the union currently holds. Unions provide properties for this for each of their variants:

```ghul
if an_option.is_some then
    let value = an_option.some;
    ...
fi
```

Unions shaped like `Option` types (exactly one non-unit variant) support the `?` and `!` operators for testing if they hold a value and for unwrapping that value, respectively:

```ghul
if an_option? then
    let value = an_option!;
    ...
fi
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

entry() is
    test_option();
    test_list();
    test_tree();
si

test_option() is
    let some_int = SOME(42);
    let none_int = NONE[int]();

    let stringify_option = (o: Option[int]) rec =>
        if o.is_some then
            "{o.value}"
        else
            "none"
        fi;

    write_line(stringify_option(some_int));
    write_line(stringify_option(none_int));
si

test_list() is
    let list = CONS(1, CONS(2, CONS(3, NIL())));

    let stringify_list = (l: List[int]) rec =>
        if l.is_cons then
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

    let stringify_tree = (t: Tree[int]) rec =>
        if t.is_node then
            let (left, right) = t in
            "({rec(left)}, {rec(right)})"
        else
            "{t.value}"
        fi;

    write_line(stringify_tree(tree));
si
```

## pattern matching

ghūl has no dedicated `match` construct. Discovering which variant a union holds, and branching on the result is done with `if let` — a `let` definition in an `if` / `elif` condition, where the branch runs only on a match, with the variable narrowed and in scope:

```ghul
union Shape is
    CIRCLE(radius: double);
    SQUARE(side: double);
si

area(s: Shape) -> double is
    if let c: CIRCLE = s then
        return 3.14159 * c.radius * c.radius;
    elif let q: SQUARE = s then
        return q.side * q.side;
    fi

    return 0.0;
si
```

Union variant tags (`s.is_circle`) and `else`-branch narrowing cover the same ground; see [type narrowing and `if let`](/control-flow.html#type-narrowing) in the control flow chapter for the full picture.

## currying
```ghul
let curried_add = x => y => x + y;

write_line("curried_add(5)(3): {curried_add(5)(3)}");

let add_5 = curried_add(5);
write_line("add_5(3): {add_5(3)}");

let add_10 = curried_add(10);
write_line("add_10(3): {add_10(3)}");
```

## partial application
```ghul
let add = (x, y) => x + y;

let add_5 = y => add(5, y);
write_line("add_5(3): {add_5(3)}");

let add_10 = y => add(10, y);
write_line("add_10(3): {add_10(3)}");
```

## lazy sequences

Lazy infinite and finite sequences are expressed with the
`Ghul.Pipes.STREAM[T, S]` union and the `stream(initial, advance)`
factory. State type `S` and output type `T` are independent, so the
state of a stream is hidden from its consumers — `stream()` returns a
plain `Pipe[T]`.

```ghul
union STREAM[T, S] is
    DONE;
    YIELD(value: T, state: S);
si

stream[T, S](initial: S, advance: S -> STREAM[T, S]) -> Pipe[T]
```

`advance` is a pure step function: it receives the current state and
returns either `DONE` (sequence is over) or `YIELD(value, next_state)`
— the yielded element and the state to feed back in on the next step.
The `||` infix is parser sugar for `YIELD(value, next_state)`, so a
step body usually reads `value || next_state`.

```ghul
use Ghul.Pipes.STREAM;
use Ghul.Pipes.stream;
use STREAM.DONE;
use STREAM.YIELD;

// counting down: state and output are both int; sequence terminates
// when state reaches zero.
let counting = (n: int) =>
    stream(n, i => if i == 0 then DONE[int, int]() else i || (i - 1) fi);

// fibonacci. State is the named tuple (prev, current); output is int.
// State and output are different types.
let fibonacci = stream(
    (prev = 1, current = 1),
    s => s.current || (prev = s.current, current = s.prev + s.current)
);

// factorial. State is (n, prev); output is int.
let factorial = stream(
    (n = 1, prev = 1),
    s => let next_n = s.n + 1, next = s.prev * next_n in
        next || (n = next_n, prev = next)
);

// chars of a string: state is an int cursor, output is char.
// Input string is captured by the lambda; integer state is hidden
// inside the resulting Pipe[char].
let chars_of = (s: string) =>
    let xs = s.to_char_array() in
    stream(0, i => if i == xs.count then DONE[char, int]() else xs[i] || (i + 1) fi);

write_line("counting down from 5: {counting(5)}");
write_line("first 10 fibonacci numbers: {fibonacci | .take(10)}");
write_line("first 10 factorial numbers: {factorial | .take(10)}");
write_line("chars of hello: {chars_of("hello")}");

for (i, (fib, fact)) in fibonacci | .zip(factorial) .take(10) .index() do
    write_line("fibonacci {i} is {fib}");
    write_line("factorial {i} is {fact}");
od;
```

Type arguments to `stream` are inferred from the initial-state value
and the lambda's yield expression. Multi-component state reads more
clearly as a named tuple (`(n = 1, prev = 1)` with `s.n` and `s.prev`
field access) than as a positional tuple needing destructuring. The
no-argument `DONE[T, S]()` constructor in terminating sequences keeps
its explicit type arguments — the surrounding `if/else` widens to
`object` before the outer lambda return type can constrain it.

The factory returns `Pipe[T]` directly so combinators like `.take`,
`.filter`, `.map`, `.zip`, and `.index` chain straight onto a stream
value. State shape never appears in the type a consumer sees of a
`stream(...)`-produced pipe.
