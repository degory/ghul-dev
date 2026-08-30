
# Hailstone sequence

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Hailstone_sequence

```ghul
…
use IO.Std.write_line
use Collections.LIST
use Ghul.Pipes

hailstone(n: int) -> Pipe[int] is
    let current mut = n

    while true do
        yield current

        if current == 1 then
            return
        fi

        current =
            if current % 2 == 0 then current / 2 else 3 * current + 1 fi
    od
si

let sequence = hailstone(27) |> collect_list()
write_line("length of hailstone(27): {sequence.count}")
let first = sequence[0..4] |> join(", ")
let last = sequence[4..<<0] |> join(", ")

write_line("first four: {first}")
write_line("last four: {last}")

let longest mut = 0
let longest_length mut = 0

for n in 1..100_000 do
    let length = hailstone(n) |> count()

    if length > longest_length then
        longest = n
        longest_length = length
    fi
od

write_line("longest under 100,000: {longest} (length {longest_length})");
```

diagnostics:

- warning: [return-without-value] return without value from non void function returns default value of type Pipe[int]

output:

```
length of hailstone(27): 112
first four: 27, 82, 41, 124
last four: 8, 4, 2, 1
longest under 100,000: 77031 (length 351)
```
