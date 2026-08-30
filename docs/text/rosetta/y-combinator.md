
# Y combinator

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Y_combinator

## The y combinator

```ghul
use IO.Std.write_line

class SELF_APPLY[A, B](_f: (SELF_APPLY[A, B]) -> (A -> B)) is
    apply(r: SELF_APPLY[A, B]) -> (A -> B) => _f(r)
si

y[A, B](f: (A -> B) -> (A -> B)) -> (A -> B) =>
    let wrap =
        SELF_APPLY[A, B](
            (r: SELF_APPLY[A, B]) => (a: A) => f(r.apply(r))(a))
    in wrap.apply(wrap)

let factorial =
    y(recurse => n =>
        if n <= 1 then 1L else cast(n) * recurse(n - 1) fi)

let fibonacci =
    y(recurse => n =>
        if n < 2 then n else recurse(n - 1) + recurse(n - 2) fi)

let countdown =
    y(recurse => n =>
        if n <= 0 then "liftoff" else "{n}, {recurse(n - 1)}" fi)

let gcd =
    y(recurse => ((a, b): (int, int)) =>
        if b == 0 then a else recurse((b, a % b)) fi)

for n in 0::10 do
    write_line(
        "factorial({n}) = {factorial(n)}, "
        "fibonacci({n}) = {fibonacci(n)}")
od

write_line("countdown(5) = {countdown(5)}")
write_line("gcd(1071, 462) = {gcd((1071, 462))}");
```

output:

```
factorial(0) = 1, fibonacci(0) = 0
factorial(1) = 1, fibonacci(1) = 1
factorial(2) = 2, fibonacci(2) = 1
factorial(3) = 6, fibonacci(3) = 2
factorial(4) = 24, fibonacci(4) = 3
factorial(5) = 120, fibonacci(5) = 5
factorial(6) = 720, fibonacci(6) = 8
factorial(7) = 5040, fibonacci(7) = 13
factorial(8) = 40320, fibonacci(8) = 21
factorial(9) = 362880, fibonacci(9) = 34
factorial(10) = 3628800, fibonacci(10) = 55
countdown(5) = 5, 4, 3, 2, 1, liftoff
gcd(1071, 462) = 21
```

## Using rec

```ghul
use IO.Std.write_line

let factorial = n rec => if n <= 1 then 1L else cast(n) * rec(n - 1) fi

let fibonacci = n rec => if n < 2 then n else rec(n - 1) + rec(n - 2) fi

let countdown =
    n rec => if n <= 0 then "liftoff" else "{n}, {rec(n - 1)}" fi

let gcd =
    ((a, b): (int, int)) rec =>
        if b == 0 then a else rec((b, a % b)) fi

for n in 0::10 do
    write_line(
        "factorial({n}) = {factorial(n)}, "
        "fibonacci({n}) = {fibonacci(n)}")
od

write_line("countdown(5) = {countdown(5)}")
write_line("gcd(1071, 462) = {gcd((1071, 462))}");
```

output:

```
factorial(0) = 1, fibonacci(0) = 0
factorial(1) = 1, fibonacci(1) = 1
factorial(2) = 2, fibonacci(2) = 1
factorial(3) = 6, fibonacci(3) = 2
factorial(4) = 24, fibonacci(4) = 3
factorial(5) = 120, fibonacci(5) = 5
factorial(6) = 720, fibonacci(6) = 8
factorial(7) = 5040, fibonacci(7) = 13
factorial(8) = 40320, fibonacci(8) = 21
factorial(9) = 362880, fibonacci(9) = 34
factorial(10) = 3628800, fibonacci(10) = 55
countdown(5) = 5, 4, 3, 2, 1, liftoff
gcd(1071, 462) = 21
```
