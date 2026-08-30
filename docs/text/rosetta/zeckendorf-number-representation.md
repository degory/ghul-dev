
# Zeckendorf number representation

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Zeckendorf_number_representation

```ghul
use IO.Std.write_line
use Ghul.Pipes

fibonacci_up_to(limit: int) -> Pipe[int] is
    let smaller mut = 1
    let larger mut = 2

    do
        yield smaller

        if larger > limit then
            break
        fi

        let next = smaller + larger

        smaller = larger
        larger = next
    od
si

zeckendorf(n: int) -> string is
    let digits = System.Text.StringBuilder()
    let remaining mut = n

    for value in fibonacci_up_to(n) |> reverse() do
        if value <= remaining then
            digits.append('1')

            remaining = remaining - value
        elif digits.length > 0 then
            digits.append('0')
        fi
    od

    return if digits.length == 0 then "0" else digits.to_string() fi
si

for n in 0::20 do
    write_line("{n,2}: {zeckendorf(n)}")
od
```

output:

```
 0: 0
 1: 1
 2: 10
 3: 100
 4: 101
 5: 1000
 6: 1001
 7: 1010
 8: 10000
 9: 10001
10: 10010
11: 10100
12: 10101
13: 100000
14: 100001
15: 100010
16: 100100
17: 100101
18: 101000
19: 101001
20: 101010
```
