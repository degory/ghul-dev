
# Van Eck sequence

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Van_Eck_sequence

```ghul
use IO.Std.write_line
use Collections.MAP
use Ghul.Pipes

van_eck() -> Pipe[int] is
    let last_seen = MAP[int, int]()

    let term mut = 0
    let position mut = 0

    do
        yield term

        let previous mut = 0
        let next =
            if last_seen.try_get_value(term, previous ref) then
                position - previous
            else
                0
            fi

        last_seen[term] = position

        term = next
        position = position + 1
    od
si

write_line("first ten:      {van_eck() |> take(10) |> join(" ")}")
write_line(
    "terms 991-1000: {van_eck() |> skip(990) |> take(10) |> join(" ")}")
```

output:

```
first ten:      0 0 1 0 2 0 2 2 1 6
terms 991-1000: 4 7 30 25 67 225 488 0 10 136
```
