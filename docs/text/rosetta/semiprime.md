
# Semiprime

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Semiprime

```ghul
use IO.Std.write_line
use Ghul.Pipes

is_semiprime(n: int) -> bool => (
    let rest mut = n
    let count mut = 0
    let divisor mut = 2

    while divisor * divisor <= rest /\ count < 3 do
        while rest % divisor == 0 do
            rest = rest / divisor
            count = count + 1
        od

        divisor = divisor + 1
    od

    if rest > 1 then
        count = count + 1
    fi

    count == 2
)

let up_to_100 = (2::100) |> filter(is_semiprime) |> join(", ")

write_line("semiprimes up to 100: {up_to_100}")

for n in [1679, 1234, 5, 9, 2093] do
    write_line(
        "{n} is {if is_semiprime(n) then "" else "not " fi}semiprime")
od
```

output:

```
semiprimes up to 100: 4, 6, 9, 10, 14, 15, 21, 22, 25, 26, 33, 34, 35, 38, 39, 46, 49, 51, 55, 57, 58, 62, 65, 69, 74, 77, 82, 85, 86, 87, 91, 93, 94, 95
1679 is semiprime
1234 is semiprime
5 is not semiprime
9 is semiprime
2093 is not semiprime
```
