
# Anonymous recursion

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Anonymous_recursion

```ghul
use IO.Std.write_line

let fibonacci = n =>
    assert n >= 0 else "fibonacci is not defined for a negative argument" in
    (i rec => if i < 2 then i else rec(i - 1) + rec(i - 2) fi)(n)

for n in 0::10 do
    write_line("fibonacci({n}) = {fibonacci(n)}")
od
```

output:

```
fibonacci(0) = 0
fibonacci(1) = 1
fibonacci(2) = 1
fibonacci(3) = 2
fibonacci(4) = 3
fibonacci(5) = 5
fibonacci(6) = 8
fibonacci(7) = 13
fibonacci(8) = 21
fibonacci(9) = 34
fibonacci(10) = 55
```
