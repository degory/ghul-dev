
# Josephus problem

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Josephus_problem

## Who survives

```ghul
use IO.Std.write_line

survivor(n: int, k: int) -> int =>
    if n == 1 then 0 else (survivor(n - 1, k) + k) % n fi

write_line(
    "41 prisoners, every 3rd killed: prisoner {survivor(41, 3)} survives")

write_line(
    "5 prisoners, every 2nd killed:  prisoner {survivor(5, 2)} survives");
```

output:

```
41 prisoners, every 3rd killed: prisoner 30 survives
5 prisoners, every 2nd killed:  prisoner 2 survives
```

## The killing sequence

```ghul
use IO.Std.write_line
use Ghul.Pipes

killings(n: int, k: int) -> Pipe[int] is
    let standing = (0..n) |> collect_list()
    let at mut = 0

    while standing.count > 1 do
        at = (at + k - 1) % standing.count

        yield standing[at]

        standing.remove_at(at)
    od
si

show(n: int, k: int) is
    let killed = killings(n, k) |> collect_list()

    write_line("n = {n}, k = {k}: killed {killed |> join(", ")}")
si

show(5, 2)
show(7, 3);
```

output:

```
n = 5, k = 2: killed 1, 3, 0, 4
n = 7, k = 3: killed 2, 5, 1, 6, 4, 0
```
