
# Population count

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Population_count

```ghul
use IO.Std.write_line
use Ghul.Pipes

popcount(n: long) -> int => (
    let bits mut = n
    let count mut = 0

    while bits != 0L do
        count = count + cast int(bits & 1L)
        bits = bits >>> 1
    od

    count
)

let powers_of_three = stream(1L, power => power || power * 3L)

let counts =
    powers_of_three |> take(30) |> map(popcount) |> join(", ")

write_line("population counts of the first thirty powers of 3: {counts}")

let naturals = stream(0L, n => n || n + 1L)

let evil =
    naturals |> filter(n => popcount(n) % 2 == 0) |> take(30) |> join(", ")

write_line("the first thirty evil numbers: {evil}")

let odious =
    naturals |> filter(n => popcount(n) % 2 == 1) |> take(30) |> join(", ")

write_line("the first thirty odious numbers: {odious}");
```

output:

```
population counts of the first thirty powers of 3: 1, 2, 2, 4, 3, 6, 6, 5, 6, 8, 9, 13, 10, 11, 14, 15, 11, 14, 14, 17, 17, 20, 19, 22, 16, 18, 24, 30, 25, 25
the first thirty evil numbers: 0, 3, 5, 6, 9, 10, 12, 15, 17, 18, 20, 23, 24, 27, 29, 30, 33, 34, 36, 39, 40, 43, 45, 46, 48, 51, 53, 54, 57, 58
the first thirty odious numbers: 1, 2, 4, 7, 8, 11, 13, 14, 16, 19, 21, 22, 25, 26, 28, 31, 32, 35, 37, 38, 41, 42, 44, 47, 49, 50, 52, 55, 56, 59
```
