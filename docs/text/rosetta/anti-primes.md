
# Anti-primes

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Anti-primes

```ghul
use IO.Std.write_line
use Ghul.Pipes

divisor_count(n: int) -> int =>
    (1::n) |> filter(divisor => n % divisor == 0) |> count()

anti_primes() -> Pipe[int] is
    let most mut = 0
    let n mut = 1

    do
        let divisors = divisor_count(n)

        if divisors > most then
            most = divisors

            yield n
        fi

        n = n + 1
    od
si

write_line(anti_primes() |> take(20) |> join(" "))
```

output:

```
1 2 4 6 12 24 36 48 60 120 180 240 360 720 840 1260 1680 2520 5040 7560
```
