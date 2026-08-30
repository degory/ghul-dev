
# Amicable pairs

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Amicable_pairs

```ghul
use IO.Std.write_line
use Ghul.Pipes

let limit = 20000

sum_of_proper_divisors(n: int) -> int =>
    (1::(n / 2))
        |> filter(divisor => n % divisor == 0)
        |> reduce(0, (total, divisor) => total + divisor)

(1::limit)
    |> map(n => (n, partner = sum_of_proper_divisors(n)))
    |> filter(((n, partner)) =>
        partner > n /\ sum_of_proper_divisors(partner) == n)
    |> each(((n, partner)) => write_line("{n} and {partner}"));
```

output:

```
220 and 284
1184 and 1210
2620 and 2924
5020 and 5564
6232 and 6368
10744 and 10856
12285 and 14595
17296 and 18416
```
