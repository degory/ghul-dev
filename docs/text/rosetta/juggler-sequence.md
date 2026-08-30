
# Juggler sequence

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Juggler_sequence

```ghul
use IO.Std.write_line
use System.Math.sqrt

step(value: long) -> long =>
    if (value % 2L) == 0L then
        cast long(sqrt(cast double(value)))
    else
        cast long(cast double(value) * sqrt(cast double(value)))
    fi

stats(start: long) -> (int, long, int) => (
    let current mut = start
    let terms mut = 0
    let highest mut = start
    let at mut = 0

    while current != 1L do
        current = step(current)
        terms = terms + 1

        if current > highest then
            highest = current
            at = terms
        fi
    od

    (terms, highest, at)
)

write_line("  n   l                h  i")

for n in 20::39 do
    let (terms, highest, at) = stats(cast long(n))
    write_line("{n,3}  {terms,3}  {highest,17:N0}  {at}")
od
```

output:

```
  n   l                h  i
 20    3                 20  0
 21    9                140  4
 22    3                 22  0
 23    9                110  1
 24    3                 24  0
 25   11             52,214  3
 26    6                 36  3
 27    6                140  1
 28    6                 36  3
 29    9                156  1
 30    6                 36  3
 31    6                172  1
 32    6                 36  3
 33    8              2,598  2
 34    6                 36  3
 35    8              2,978  2
 36    3                 36  0
 37   17  24,906,114,455,136  8
 38    3                 38  0
 39   14            233,046  3
```
