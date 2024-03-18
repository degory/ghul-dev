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
While ghūl doesn't do anything special to enforce immutability,
pipes make it easy to iterate over data and produce
transformed output without mutation

```ghul
let list = [1, 2, 3, 4, 5];

let doubled = list | .map(x => x * 2);

// original list is still the same:
write_line("list: {list| }");
```

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

## pattern matching
pattern matching is not yet supported, but if expressions
go some way to providing similar functionality:
```ghul
let is_even =
    (n: int) => 
        if n % 2 == 0 then 
            true 
        else 
            false
        fi;

let is_odd = 
    (n: int) => 
        if n % 2 != 0 then
            true 
        else 
            false
        fi;

let parity = 
    (n: int) => 
        if is_even(n) then
            "even" 
        else
            "odd"
        fi;

write_line("parity(10): {parity(10)}");
write_line("parity(11): {parity(11)}");
```

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

## lazy evaluation

```ghul
// a generic infinite sequence generator with arbitrary state
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
let fibonacci_sequence = generate(
    (0, 1),
    (state: (prev: int, current: int) =>
        ((state.current, state.prev + state.current), state.prev + state.current))
);

// generates an infinite sequence of factorials:
let factorial_sequence = generate(
    (1, 1),
    (state: (n: int, prev: int) =>
        ((state.n + 1, state.prev * (state.n + 1)), state.prev * (state.n + 1)))
);

let fibonacci_sequence_block_body = generate(
    (0, 1),
    (state: (prev: int, current: int) is
        let next = state.prev + state.current;
        return ((state.current, next), next)
    si)
);

write_line("first 20 fibonacci numbers: {fibonacci_sequence | .take(10)}");
write_line("first 20 factorial numbers: {factorial_sequence | .take(10)}");

for (i, (fib, fact)) in fibonacci_sequence | .zip(factorial_sequence) .take(10) .index() do
    write_line("fibonacci {i} is {fib}");
    write_line("factorial {i} is {fact}");
od;

```
