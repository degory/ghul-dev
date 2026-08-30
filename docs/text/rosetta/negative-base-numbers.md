
# Negative base numbers

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Negative_base_numbers

```ghul
use IO.Std.write_line
use Ghul.Pipes

let digit_set = "0123456789abcdefghijklmnopqrstuvwxyz"

encode(n: int, base: int) -> string => (
    let rest mut = n
    let digits mut = ""

    while rest != 0 do
        let remainder mut = rest % base

        rest = rest / base

        if remainder < 0 then
            remainder = remainder - base
            rest = rest + 1
        fi

        digits = "{digit_set[remainder]}{digits}"
    od

    if digits.length == 0 then "0" else digits fi
)

decode(encoded: string, base: int) -> int =>
    encoded
    |> reduce(0, (value, digit) =>
        value * base + digit_set.index_of(digit))

for (n, base) in [(10, -2), (146, -3), (15, -10)] do
    let encoded = encode(n, base)

    write_line(
        "{n} in base {base} is {encoded}, "
        "and back again is {decode(encoded, base)}")
od
```

output:

```
10 in base -2 is 11110, and back again is 10
146 in base -3 is 21102, and back again is 146
15 in base -10 is 195, and back again is 15
```
