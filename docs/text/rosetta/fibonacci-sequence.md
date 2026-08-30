
# Fibonacci sequence

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Fibonacci_sequence

## Functional

```ghul
use IO.Std.write_line
use Ghul.Pipes

let fibonacci_sequence = stream(
    (0, 1),
    ((previous, current)) =>
        previous || (current, previous + current)
)

let fib = n => fibonacci_sequence |> skip(n) |> first()

fibonacci_sequence
    |> take(10)
    |> index()
    |> each(((position, value)) =>
        write_line("fib({position}) = {value}"))

write_line("fib(30) = {fib(30)}");
```

output:

```
fib(0) = 0
fib(1) = 1
fib(2) = 1
fib(3) = 2
fib(4) = 3
fib(5) = 5
fib(6) = 8
fib(7) = 13
fib(8) = 21
fib(9) = 34
fib(30) = 832040
```

## Imperative

```ghul
use IO.Std.write_line
use Ghul.Pipes

fibonacci() -> Pipe[int] is
    let previous mut = 0
    let current mut = 1
    do
        yield previous

        (previous, current) = (current, previous + current)
    od
si

let fib = n => fibonacci() |> skip(n) |> first()

for (position, value) in fibonacci() |> take(10) |> index() do
    write_line("fib({position}) = {value}")
od

write_line("fib(30) = {fib(30)}");
```

output:

```
fib(0) = 0
fib(1) = 1
fib(2) = 1
fib(3) = 2
fib(4) = 3
fib(5) = 5
fib(6) = 8
fib(7) = 13
fib(8) = 21
fib(9) = 34
fib(30) = 832040
```
