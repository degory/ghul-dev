
# Non-continuous subsequences

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Non-continuous_subsequences

```ghul
use IO.Std.write_line
use Collections.LIST
use Ghul.Pipes

let elements = [1, 2, 3, 4]

selected(mask: int) -> LIST[int] =>
    (0..elements.count)
        |> filter(index => (mask & (1 << index)) != 0)
        |> map(index => elements[index])
        |> collect_list()

continuous(chosen: LIST[int]) -> bool =>
    chosen[chosen.count - 1] - chosen[0] + 1 == chosen.count

(1..(1 << elements.count))
    |> map(selected)
    |> filter(chosen => chosen.count > 1 /\ !continuous(chosen))
    |> map(chosen => chosen |> join(", "))
    |> each(line => write_line(line))
```

output:

```
1, 3
1, 4
2, 4
1, 2, 4
1, 3, 4
```
