
# Mutual recursion

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Mutual_recursion

```ghul
use IO.Std.write_line
use Ghul.Pipes

female(n: int) -> int => if n == 0 then 1 else n - male(female(n - 1)) fi

male(n: int) -> int => if n == 0 then 0 else n - female(male(n - 1)) fi

show(name: string, function: (int) -> int pure) =>
    write_line("{name} {(0..20) |> map(function) |> join(" ")}")

show("F:", female)
show("M:", male);
```

output:

```
F: 1 1 2 2 3 3 4 5 5 6 6 7 8 8 9 9 10 11 11 12
M: 0 0 1 2 2 3 4 4 5 6 6 7 7 8 9 9 10 11 11 12
```
