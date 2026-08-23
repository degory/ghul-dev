# expression oriented programming

ghūl supports expression-oriented programming: most control-flow constructs produce a value, so they can be assigned to a local variable, returned, or passed as an argument. With expression bodies on functions and methods, a computation can read as one value-producing expression rather than a sequence of assignments.

The constructs are covered in full elsewhere: [if](https://ghul.dev/expressions#conditional) and [case](https://ghul.dev/expressions#case-expression) as expressions on the expressions page, and the [if](https://ghul.dev/control-flow#if-statement) and [case](https://ghul.dev/control-flow#case-statement) statement forms under control flow. This page shows them working together.

## if as an expression

An `if` yields the value of the chosen branch. Each branch is itself an expression, and the branches agree on a type:

```ghul
…
sign(n: int) -> string =>
    if n < 0 then "negative"
    elif n == 0 then "zero"
    else "positive"
    fi;

write_line(sign(-4));
write_line(sign(0));
write_line(sign(7));
```

output:

```
negative
zero
positive
```

## case as an expression

A `case` yields the value of the matched arm. As an expression it needs an `else` arm, so every value is covered:

```ghul
…
day_kind(day: int) -> string =>
    // days run Monday (0) to Sunday (6)
    case day
    when 5, 6 then "weekend"
    else "weekday"
    esac;

write_line(day_kind(5));
write_line(day_kind(3));
write_line(day_kind(6));
```

output:

```
weekend
weekday
weekend
```

## loops as expressions

Every loop form yields too, at type `T?`: a `break` with a value produces it, and falling off the end - a false condition, an exhausted iterator - produces the absent value. A search over a sequence is then one expression, and a valued break can carry its result out of nested loops to the outermost one that consumes it:

```ghul
…
// a valued break delivers to the nearest enclosing loop
// that consumes a value, so it can cross the inner,
// statement-form loop on its way out
let rows = [[1, 2, 3], [4, 5, 6]];

let first_even: int? =
    for row in rows do
        for cell in row do
            if cell % 2 == 0 then break cell fi
        od
    od;

write_line("{first_even ?? -1}")
```

output:

```
2
```

See [loops as expressions](https://ghul.dev/control-flow.html#loops-as-expressions) for the full rules.

## val blocks

A `val ... lav` block runs a sequence of statements and yields a value: its tail expression, or any `return` that targets the block. It gives an expression room for intermediate local variables, loops, and early exits:

```ghul
…
// a val block as a let initializer, with room for intermediate locals:
let midpoint = val
    let lo = 10;
    let hi = 20;
    lo + (hi - lo) / 2
lav;
write_line("midpoint = {midpoint}");

// a val block folding a loop, with a return that yields from the block:
let first_even = val
    for x in [1, 3, 4, 7] do
        if x % 2 == 0 then
            return x;
        fi
    od
    -1
lav;
write_line("first_even = {first_even}");

// a val block passed straight as a function argument:
write_line(
    val
        let doubled = midpoint * 2;
        "doubled = {doubled}"
    lav
);
```

output:

```
midpoint = 15
first_even = 4
doubled = 30
```

A `return` inside the block yields from the block, not from the enclosing function.

## let in

A `let ... in ...` expression introduces one or more local variables scoped to a single trailing expression. It is lighter than a `val ... lav` block when a value needs only a local or two:

```ghul
…
hypotenuse_squared(a: int, b: int) -> int =>
    let a2 = a * a, b2 = b * b in a2 + b2;

write_line("h2 = {hypotenuse_squared(3, 4)}");
```

output:

```
h2 = 25
```

## expression bodies

A function, method, property, or anonymous function can replace its block body with `=>` and a single expression. That expression can be an `if`, a `case`, or a `val ... lav` block:

```ghul
…
// expression-bodied free function:
square(n: int) -> int => n * n;

class COUNTER is
    _count: int;

    init() is si

    // an expression body can be a val ... lav block:
    bump() -> int => val
        _count = _count + 1;
        _count
    lav;
si

write_line("square(6) = {square(6)}");

let c = COUNTER();
write_line("bump = {c.bump()}");
write_line("bump = {c.bump()}");

// expression-bodied anonymous function:
let twice = (n: int) => n * 2;
write_line("twice(21) = {twice(21)}");
```

output:

```
square(6) = 36
bump = 1
bump = 2
twice(21) = 42
```

## composing them

These forms nest, so a `val` block can hold a `case` and an `if`:

```ghul
…
grade(score: int) -> string is
    // a val block as a let initializer, composing a case and an if:
    let label = val
        let band =
            case score / 10
            when 10, 9 then "A"
            when 8 then "B"
            when 7 then "C"
            else "F"
            esac;

        if band == "F" then "fail" else "pass ({band})" fi
    lav;

    return label;
si

write_line(grade(95));
write_line(grade(82));
write_line(grade(60));
```

output:

```
pass (A)
pass (B)
fail
```
