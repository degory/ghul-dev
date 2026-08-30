
# Kaprekar numbers

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Kaprekar_numbers

```ghul
use IO.Std.write_line
use Ghul.Pipes

kaprekar(n: int) -> bool => (
    let square mut = cast long(n) * cast long(n)
    let power mut = 10L

    let matched = while power <= square do
        let right = square % power

        if right > 0L /\ square / power + right == cast long(n) then
            break true
        fi

        power = power * 10L
    od

    matched ?? false
)

let below_ten_thousand = (1::9999)
    |> filter(n => n == 1 \/ kaprekar(n))
    |> collect_list()

write_line("Kaprekar numbers below 10000:")
write_line(below_ten_thousand |> join(", "))

let below_million = (1..1000000)
    |> filter(n => n == 1 \/ kaprekar(n))
    |> count()

write_line("{below_million} Kaprekar numbers below 1000000")
```

output:

```
Kaprekar numbers below 10000:
1, 9, 45, 55, 99, 297, 703, 999, 2223, 2728, 4879, 4950, 5050, 5292, 7272, 7777, 9999
54 Kaprekar numbers below 1000000
```
