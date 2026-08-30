
# Achilles numbers

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Achilles_numbers

```ghul
…
use IO.Std.write_line
use Collections.LIST
use Collections.List
use Collections.Iterable
use Ghul.Pipes

factorize(n: int) -> List[(prime: int, exponent: int)] is
    let factors = LIST[(prime: int, exponent: int)]()
    let remaining mut = n
    let prime mut = 2

    while prime * prime <= remaining do
        let exponent mut = 0

        while remaining % prime == 0 do
            remaining = remaining / prime
            exponent = exponent + 1
        od

        if exponent > 0 then
            factors.add((prime, exponent))
        fi

        prime = prime + 1
    od

    if remaining > 1 then
        factors.add((remaining, 1))
    fi

    return factors
si

gcd(a: int, b: int) -> int =>
    if b == 0 then a else gcd(b, a % b) fi

power(base: int, exponent: int) -> int =>
    if exponent == 0 then 1 else base * power(base, exponent - 1) fi

is_achilles(n: int) -> bool =>
    let factors = factorize(n) in
        factors.count > 0 /\
        (factors |> all(factor => factor.exponent >= 2)) /\
        (factors |> map(factor => factor.exponent) |> reduce(0, gcd)) == 1

totient(n: int) -> int =>
    factorize(n)
    |> reduce(1, (total, factor) =>
        total *
        power(factor.prime, factor.exponent - 1) *
        (factor.prime - 1))

achilles_numbers() -> Pipe[int] is
    let n mut = 1

    do
        if is_achilles(n) then
            yield n
        fi

        n = n + 1
    od
si

show(heading: string, numbers: Iterable[int]) is
    write_line(heading)

    for row in numbers |> chunk(10) do
        write_line(row |> map(n => "{n,7}") |> join(""))
    od

    write_line("")
si

show("first 50 Achilles numbers:", achilles_numbers() |> take(50))

show(
    "first 20 strong Achilles numbers:",
    achilles_numbers() |> filter(n => is_achilles(totient(n))) |> take(20)
)

for digits in 2::5 do
    let total =
        (power(10, digits - 1)..power(10, digits))
        |> filter(is_achilles)
        |> count()

    write_line("Achilles numbers with {digits} digits: {total}")
od
```

diagnostics:

- warning: [impure-function-argument] argument must be a pure function
- warning: [impure-function-argument] argument must be a pure function

output:

```
first 50 Achilles numbers:
     72    108    200    288    392    432    500    648    675    800
    864    968    972   1125   1152   1323   1352   1372   1568   1800
   1944   2000   2312   2592   2700   2888   3087   3200   3267   3456
   3528   3872   3888   4000   4232   4500   4563   4608   5000   5292
   5324   5400   5408   5488   6075   6125   6272   6728   6912   7200

first 20 strong Achilles numbers:
    500    864   1944   2000   2592   3456   5000  10125  10368  12348
  12500  16875  19652  19773  30375  31104  32000  33275  37044  40500

Achilles numbers with 2 digits: 1
Achilles numbers with 3 digits: 12
Achilles numbers with 4 digits: 47
Achilles numbers with 5 digits: 192
```
