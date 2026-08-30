
# Additive primes

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Additive_primes

```ghul
use IO.Std.write_line
use Ghul.Pipes

is_prime(n: int) -> bool =>
    n > 1 /\
    ((2..n)
        |> take_while(divisor => divisor * divisor <= n)
        |> all(divisor => n % divisor != 0))

digit_sum(n: int) -> int =>
    if n == 0 then 0 else n % 10 + digit_sum(n / 10) fi

let additive =
    (2..500)
    |> filter(n => is_prime(n) /\ is_prime(digit_sum(n)))
    |> collect_list()

for row in additive |> chunk(10) do
    write_line(row |> map(n => "{n,4}") |> join(""))
od

write_line("")
write_line("{additive.count} additive primes below 500")
```

output:

```
   2   3   5   7  11  23  29  41  43  47
  61  67  83  89 101 113 131 137 139 151
 157 173 179 191 193 197 199 223 227 229
 241 263 269 281 283 311 313 317 331 337
 353 359 373 379 397 401 409 421 443 449
 461 463 467 487

54 additive primes below 500
```
