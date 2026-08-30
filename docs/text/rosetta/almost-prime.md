
# Almost prime

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Almost_prime

```ghul
use IO.Std.write_line
use Ghul.Pipes

smallest_factor(n: int) -> int =>
    (2::n) |> find_or_throw(divisor => n % divisor == 0)

prime_factor_count(n: int) -> int =>
    if n == 1 then 0 else 1 + prime_factor_count(n / smallest_factor(n)) fi

almost_primes(k: int) -> Pipe[int] is
    let n mut = 2

    do
        if prime_factor_count(n) == k then
            yield n
        fi

        n = n + 1
    od
si

for k in 1::5 do
    let first_ten = almost_primes(k) |> take(10) |> map(n => "{n,5}")

    write_line("k = {k}:{first_ten |> join("")}")
od
```

output:

```
k = 1:    2    3    5    7   11   13   17   19   23   29
k = 2:    4    6    9   10   14   15   21   22   25   26
k = 3:    8   12   18   20   27   28   30   42   44   45
k = 4:   16   24   36   40   54   56   60   81   84   88
k = 5:   32   48   72   80  108  112  120  162  168  176
```
