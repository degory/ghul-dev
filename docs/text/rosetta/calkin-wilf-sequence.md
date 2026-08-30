
# Calkin-Wilf sequence

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Calkin-Wilf_sequence

```ghul
use IO.Std.write_line
use Collections.LIST
use Ghul.Pipes

next_term(numerator: int, denominator: int) -> (int, int) =>
    (denominator,
     denominator * (2 * (numerator / denominator) + 1) - numerator)

let current mut = (1, 1)
let terms = LIST[string]()

for _ in 1::20 do
    terms.add("{current.`0}/{current.`1}")
    current = next_term(current.`0, current.`1)
od

write_line(terms |> join(" "))

continued_fraction(numerator: int, denominator: int) -> LIST[int] is
    let left mut = numerator
    let right mut = denominator
    let terms = LIST[int]()

    while right > 0 do
        terms.add(left / right)
        let remainder = left % right
        left = right
        right = remainder
    od

    if terms.count % 2 == 0 then
        terms[terms.count - 1] = terms[terms.count - 1] - 1
        terms.add(1)
    fi

    terms
si

let fraction = continued_fraction(83116, 51639)

let bits mut = ""
let one mut = true

for step in 0::(fraction.count - 1) do
    let run = fraction[fraction.count - 1 - step]

    for _ in 1::run do
        bits = "{bits}{if one then "1" else "0" fi}"
    od
    one = !one
od

write_line("83116/51639 is term {System.Convert.to_int64(bits, 2)}");
```

output:

```
1/1 1/2 2/1 1/3 3/2 2/3 3/1 1/4 4/3 3/5 5/2 2/5 5/3 3/4 4/1 1/5 5/4 4/7 7/3 3/8
83116/51639 is term 123456789
```
