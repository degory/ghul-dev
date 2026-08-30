
# Ackermann function

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Ackermann_function

```ghul
use IO.Std.write_line
use Ghul.Pipes

ackermann(m: int, n: int) -> int =>
    if m == 0 then
        n + 1
    elif n == 0 then
        ackermann(m - 1, 1)
    else
        ackermann(m - 1, ackermann(m, n - 1))
    fi

for m in 0::3 do
    let row = (0::5) |> map(n => "{ackermann(m, n)}") |> join(" ")

    write_line("A({m}, n) = {row}")
od
```

output:

```
A(0, n) = 1 2 3 4 5 6
A(1, n) = 2 3 4 5 6 7
A(2, n) = 3 5 7 9 11 13
A(3, n) = 5 13 29 61 125 253
```
