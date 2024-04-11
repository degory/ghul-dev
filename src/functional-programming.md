# functional programming

ghūl has some support for basic functional programming

## first class functions

ghūl has first class functions. There is a function literal syntax that
constructs functions, which can then be called, but also assigned to
variables, passed to other functions, stored in data structures, or
pretty much anything else you can do with any other ghūl value

```ghul
let f = (i: int) => i * 2;
f();
let g = f;
g();

let ff(f: int -> int, i: int) => f(f(i));
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
let factorial = (n: int) rec => if n == 0 then 1 else n * rec(n - 1) fi;
write_line("factorial(5): {factorial(5)}");

// fibonacci
let fibonacci = (n: int) rec => if n <= 1 then n else rec(n - 1) + rec(n - 2) fi;
write_line("fibonacci(10): {fibonacci(10)}");
```

### mutual recursion in anonymous functions

Mutual recursion for anonymous functions is slightly awkward, but possible
by passing one function into the other as an argument:

```ghul

let is_even = (n: int, is_odd: int -> bool) => if n == 0 then true else is_odd(n - 1) fi;
let is_odd = (n: int) rec => if n == 0 then false else is_even(n - 1, rec) fi;

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

### arrays are immutable
The ghūl array type `T[]` does not expose an assign indexer

### maps are immutable by default
The standard trait for maps `Collections.Map[T]` is immutable (it maps to .NET's ``System.Collections.Generic.IReadOnlyDictionary`2[K,V]``)

### list literals are immutable
The values constructed by list literals are immutable

```ghul
let list = [1, 2, 3, 4, 5];

let element = list[3]; // elements can be read

// the list is an instance of an immutable type:
assert list.get_type() == typeof Collections.List[int];

element[3] = 6; // elements cannot be assigned to - compile time error
```

### tuples are immutable
Values of ghūl tuple types `(T1, T2, T3, ...)` are immutable (the elements `` `0 ``, `` `1 ``, `` `2 ``, ... do not have assign accessors)

### tuple literals are immutable
The values constructed by tuple literals are immutable

```ghul
let tuple = (1, 2, 3, 4, 5);

let element = tuple.`3; // elements can be read

// the tuple is an instance of an immutable type:
assert tuple.get_type == typeof (int, int, int, int, int)

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

let thing = new THING("a thing");
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
let add = (x: int, y: int) => x + y;
write_line("add(5, 3): {add(5, 3)}");

let classify = (n: int) =>
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
let times_2 = (x: int) => x * 2;
write_line("apply(times_2, 5): {apply(times_2, 5)}");

let square = (x: int) => x * x;
write_line("apply(square, 5): {apply(square, 5)}");

// higher order function consumes another function:
let apply_twice = (f: int -> int, x: int) => f(f(x));
write_line("apply_twice(times_2, 5): {apply_twice(times_2, 5)}");

// higher order function returns another function:
let create_apply_twice = (f: int -> int) => (x: int) => f(f(x));
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

entry() is
    test_option();
    test_list();
    test_tree();
si

test_option() is
    let some_int = some(42);
    let none_int = none`[int]();

    let stringify_option = (o: Option[int]) rec =>
        if o.is_some then
            "{o.some}"
        else
            "none"
        fi;

    write_line(stringify_option(some_int));
    write_line(stringify_option(none_int));
si

test_list() is
    let list = cons(1, cons(2, cons(3, nil`[int]())));

    let stringify_list = (l: List[int]) rec =>
        if l.is_cons then
            let (head, tail) = l.cons in
            "{head}, {rec(tail)}"
        else
            "nil"
        fi;

    write_line(stringify_list(list));
si

test_tree() is
    let tree = node(
        node(
            leaf(1),
            leaf(2)
        ),
        node(
            leaf(3),
            leaf(4)
        )
    );

    let stringify_tree = (t: Tree[int]) rec =>
        if t.is_node then
            let (left, right) = t.node in
            "({rec(left)}, {rec(right)})"
        else
            "{t.leaf}"
        fi;

    write_line(stringify_tree(tree));
si

some[T](value: T) -> Option[T] => new Option.SOME[T](value);
none[T]() -> Option[T] => new Option[T].NONE();

node[T](left: Tree[T], right: Tree[T]) -> Tree[T] => new Tree.NODE[T](left, right);
leaf[T](value: T) -> Tree[T] => new Tree.LEAF[T](value);

cons[T](head: T, tail: List[T]) -> List[T] => new List.CONS[T](head, tail);
nil[T]() -> List[T] => new List.NIL[T]();
```

## pattern matching (TODO)
Pattern matching is under development [(see GitHub issue #1134)](https://github.com/degory/ghul/issues/1134)

## currying
```ghul
let curryed_add = (x: int) => (y: int) => x + y;

write_line("curryed_add(5)(3): {curryed_add(5)(3)}");

let add_5 = curryed_add(5);
write_line("add_5(3): {add_5(3)}");

let add_10 = curryed_add(10);
write_line("add_10(3): {add_10(3)}");
```

## partial application
```ghul
    let add = (x: int, y: int) => x + y;

    let add_5 = (y: int) => add(5, y);
    write_line("add_5(3): {add_5(3)}");

    let add_10 = (y: int) => add(10, y);
    write_line("add_10(3): {add_10(3)}");
```

## lazy evaluation (TODO)
Lazy evaluation is not yet supported [(see GitHub issue #1165)](https://github.com/degory/ghul/issues/1165)

The workaround is to implement the `Iterator[T]` trait and manually manage state. For example:

```ghul
// generate an infinite sequence of T generator from state S
class GENERATOR[T, S]: Collections.Iterator[T], Collections.Iterable[T] is
    current: T;
    iterator: Collections.Iterator[T] => self;

    _initial: S;
    _state: S;
    _generator: S -> (S, T); // given the current state, return the next state and the current value

    init(initial: S, generator: S -> (S, T)) is
        _initial = initial;
        _generator = generator;
        reset();
    si

    init() is
        reset();
    si
        
    move_next() -> bool is
        (_state, current) = _generator(_state);
        return true;
    si

    reset() is
        _state = _initial;
    si

    dispose() is
    si
si

// generator constructor helper so we don't have to specify types
generate[T, S](initial: S, generator: S -> (S, T)) -> GENERATOR[T, S] =>
    new GENERATOR[T, S](initial, generator);
```

```ghul
// generates an infinite sequence of fibonacci numbers:
let fibonacci = generate(
    (0, 1),
    (state: (int, int)) =>
        let
            (prev, current) = state,
            next = prev + current
        in
            ((current, next), next)
);

// generates an infinite sequence of factorials
// (although overflow will occur fairly rapidly)
let factorial_sequence = generate(
    (1U, 1UL),
    (state: (uint, ulong)) =>
        let
            (n, current) = state,
            next_n = n + 1U,
            next = current * cast ulong(next_n)
        in 
            ((next_n, next), next)
);

// the resulting sequences can be comsumed by a pipe, generating values on demand:

write_line("first 10 fibonacci numbers: {fibonacci_sequence | .take(10)}");
write_line("first 10 factorial numbers: {factorial_sequence | .take(10)}");

for (i, (fib, fact)) in fibonacci_sequence | .zip(factorial_sequence) .take(10) .index() do
    write_line("fibonacci {i} is {fib}");
    write_line("factorial {i} is {fact}");
od;

```
