
# Descending primes

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Descending_primes

```ghul
use IO.Std.write_line
use Collections
use Ghul.Pipes

is_prime(n: int) -> bool =>
    if n < 2 then false
    elif n % 2 == 0 then n == 2
    else
        let divisor mut = 3

        while divisor * divisor <= n /\ n % divisor != 0 do
            divisor = divisor + 2
        od

        divisor * divisor > n
    fi

descending(so_far: int, next_digit: int, found: LIST[int]) is
    if so_far > 0 /\ is_prime(so_far) then
        found.add(so_far)
    fi

    for digit in 0::next_digit do
        descending(so_far * 10 + digit, digit - 1, found)
    od
si

let found = LIST()

descending(0, 9, found)

let primes = found |> collect_list()

primes.sort()

for row in 0::(primes.count - 1) / 6 do
    write_line(
        (0::5)
        |> filter(column => row * 6 + column < primes.count)
        |> map(column => "{primes[row * 6 + column],12}")
        |> join("")
    )
od

write_line("{primes.count} primes with strictly descending digits")
```

output:

```
           2           3           5           7          31          41
          43          53          61          71          73          83
          97         421         431         521         541         631
         641         643         653         743         751         761
         821         853         863         941         953         971
         983        5431        6421        6521        7321        7541
        7621        7643        8431        8521        8543        8641
        8731        8741        8753        8761        9421        9431
        9521        9631        9643        9721        9743        9851
        9871       75431       76421       76541       76543       86531
       87421       87541       87631       87641       87643       94321
       96431       97651       98321       98543       98621       98641
       98731      764321      865321      876431      975421      986543
      987541      987631     8764321     8765321     9754321     9875321
    97654321    98764321    98765431
87 primes with strictly descending digits
```
