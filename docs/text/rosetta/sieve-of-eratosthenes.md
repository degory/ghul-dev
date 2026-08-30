
# Sieve of Eratosthenes

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Sieve_of_Eratosthenes

```ghul
use IO.Std.write_line
use Collections
use Ghul.Pipes

sieve(limit: int) -> List[int] is
    let composite = LIST()

    (0::limit) |> each(_ => composite.add(false))

    let prime mut = 2

    while prime * prime <= limit do
        if !composite[prime] then
            let multiple mut = prime * prime

            while multiple <= limit do
                composite[multiple] = true
                multiple = multiple + prime
            od
        fi

        prime = prime + 1
    od

    return
        (2::limit)
            |> filter(i => !composite[i])
            |> collect()
si

for prime in sieve(100) do
    write_line("{prime}")
od
```

output:

```
2
3
5
7
11
13
17
19
23
29
31
37
41
43
47
53
59
61
67
71
73
79
83
89
97
```
