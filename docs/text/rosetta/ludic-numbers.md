
# Ludic numbers

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Ludic_numbers

```ghul
use IO.Std.write_line
use Collections.LIST
use Collections.SET
use Ghul.Pipes

let remaining mut = (2..25000) |> collect_list()
let ludic = LIST[int]()

while ludic.count < 2005 do
    let next_ludic = remaining[0]
    ludic.add(next_ludic)
    remaining.remove_at(0)

    let position mut = 0
    let kept = LIST[int]()

    for candidate in remaining do
        position = position + 1

        if position % next_ludic != 0 then
            kept.add(candidate)
        fi
    od

    remaining = kept
od

write_line(
    "first 25: {ludic |> take(25) |> join(" ")}")

let up_to_1000 = ludic |> filter(n => n <= 1000) |> count()

write_line("{up_to_1000} ludic numbers <= 1000")
write_line(
    "2000th..2005th: {ludic |> skip(1999) |> take(6) |> join(" ")}")

let set = SET[int](ludic)
let triplets = ludic
    |> filter(x => x + 6 < 1000 /\
            set.contains(x + 2) /\
            set.contains(x + 6))
    |> map(x => "({x}, {x + 2}, {x + 6})")
    |> join("  ")

write_line("triplets: {triplets}")
```

output:

```
first 25: 2 3 5 7 11 13 17 23 25 29 37 41 43 47 53 61 67 71 77 83 89 91 97 107 115
141 ludic numbers <= 1000
2000th..2005th: 21481 21487 21493 21503 21511 21523
triplets: (5, 7, 11)  (11, 13, 17)  (23, 25, 29)  (41, 43, 47)  (173, 175, 179)  (221, 223, 227)  (233, 235, 239)  (431, 433, 437)  (851, 853, 857)
```
