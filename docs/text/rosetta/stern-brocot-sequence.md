
# Stern-Brocot sequence

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Stern-Brocot_sequence

```ghul
use IO.Std.write_line
use Collections.LIST
use Ghul.Pipes

let sequence = LIST[int]([1, 1])
let considered mut = 1

while sequence.count < 1200 do
    sequence.add(sequence[considered] + sequence[considered - 1])
    sequence.add(sequence[considered])
    considered = considered + 1
od

write_line("first 15 members:")
write_line(sequence |> take(15) |> join(", "))

write_line("first appearances:")

for value in 1::10 do
    write_line("{value} appears at index {sequence.index_of(value) + 1}")
od

write_line(
    "100 appears at index {sequence.index_of(100) + 1}")

gcd(left: int, right: int) -> int => (
    let a mut = left
    let b mut = right

    while b > 0 do
        let remainder = a % b
        a = b
        b = remainder
    od

    a
)

let all_coprime = for index in 0..999 do
    if gcd(sequence[index], sequence[index + 1]) != 1 then
        break false
    fi
od

write_line(
    "consecutive members up to the 1000th are all coprime: "
    "{if all_coprime ?? true then "true" else "false" fi}")
```

output:

```
first 15 members:
1, 1, 2, 1, 3, 2, 3, 1, 4, 3, 5, 2, 5, 3, 4
first appearances:
1 appears at index 1
2 appears at index 3
3 appears at index 5
4 appears at index 9
5 appears at index 11
6 appears at index 33
7 appears at index 19
8 appears at index 21
9 appears at index 35
10 appears at index 39
100 appears at index 1179
consecutive members up to the 1000th are all coprime: true
```
