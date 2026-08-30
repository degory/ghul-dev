
# Cumulative standard deviation

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Cumulative_standard_deviation

```ghul
use IO.Std.write_line
use System.Math.sqrt

let standard_deviation =
    let count mut = 0 in
    let total mut = 0.0D in
    let squares mut = 0.0D in

    (sample: double) -> double => (
        count = count + 1
        total = total + sample
        squares = squares + sample * sample

        let mean = total / cast double(count)

        sqrt(squares / cast double(count) - mean * mean)
    )

for sample in [2.0D, 4.0D, 4.0D, 4.0D, 5.0D, 5.0D, 7.0D, 9.0D] do
    write_line("after {sample}: {standard_deviation(sample)}")
od
```

output:

```
after 2: 0
after 4: 1
after 4: 0.9428090415820626
after 4: 0.8660254037844386
after 5: 0.9797958971132716
after 5: 1
after 7: 1.3997084244475297
after 9: 2
```
