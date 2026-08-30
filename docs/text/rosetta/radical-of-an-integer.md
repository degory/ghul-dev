
# Radical of an integer

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Radical_of_an_integer

```ghul
use IO.Std.write_line
use Collections.LIST
use Ghul.Pipes

let limit = 1000000

let radical = LIST[int]()
let factor_counts = LIST[int]()
let composite = LIST[bool]()

for _ in 0::limit do
    radical.add(1)
    factor_counts.add(0)
    composite.add(false)
od

for prime in 2..(limit + 1) do
    if !composite[prime] then
        let multiple mut = prime

        while multiple <= limit do
            radical[multiple] = radical[multiple] * prime
            factor_counts[multiple] = factor_counts[multiple] + 1
            composite[multiple] = true
            multiple = multiple + prime
        od
    fi
od

write_line("radicals of the first 50 positive integers:")

for row in 0..5 do
    write_line(
        (row * 10 + 1..row * 10 + 11)
            |> map(n => "{radical[n],3}")
            |> join(" "))
od

for n in [99999, 499999, 999999] do
    write_line("radical[{n}] = {radical[n]}")
od

let distribution = LIST[int]()

for _ in 0..8 do
    distribution.add(0)
od

for n in 1..(limit + 1) do
    let count = factor_counts[n]
    distribution[count] = distribution[count] + 1
od

write_line("first 1000000 integers by distinct prime factors:")

for count in 0..8 do
    if distribution[count] > 0 then
        write_line("{count}: {distribution[count]:N0}")
    fi
od

prime(n: int, factors: LIST[int], radicals: LIST[int]) -> bool =>
    n >= 2 /\ factors[n] == 1 /\ radicals[n] == n

let primes = (2..(limit + 1))
    |> filter(n => prime(n, factor_counts, radical))
    |> collect_list()

let powers mut = 0

for base in primes do
    let power mut = cast long(base) * cast long(base)

    while power <= cast long(limit) do
        powers = powers + 1
        power = power * cast long(base)
    od
od

write_line(
    "{primes.count:N0} primes plus {powers} prime powers "
    "= {primes.count + powers:N0}, matching the one-factor "
    "count {distribution[1]:N0}");
```

output:

```
radicals of the first 50 positive integers:
  1   2   3   2   5   6   7   2   3  10
 11   6  13  14  15   2  17   6  19  10
 21  22  23   6   5  26   3  14  29  30
 31   2  33  34  35   6  37  38  39  10
 41  42  43  22  15  46  47   6   7  10
radical[99999] = 33333
radical[499999] = 3937
radical[999999] = 111111
first 1000000 integers by distinct prime factors:
0: 1
1: 78,734
2: 288,726
3: 379,720
4: 208,034
5: 42,492
6: 2,285
7: 8
78,498 primes plus 236 prime powers = 78,734, matching the one-factor count 78,734
```
