
# Map range

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Map_range

```ghul
use IO.Std.write_line
use Ghul.Pipes

map_range(
    (a1, a2): (double, double),
    (b1, b2): (double, double),
    s: double
) -> double =>
    b1 + (s - a1) * (b2 - b1) / (a2 - a1)

(0::10)
    |> map(s =>
        (s, mapped = map_range((0.0D, 10.0D), (-1.0D, 0.0D), cast(s))))
    |> each(((s, mapped)) => write_line("{s} maps to {mapped:F1}"))
```

output:

```
0 maps to -1.0
1 maps to -0.9
2 maps to -0.8
3 maps to -0.7
4 maps to -0.6
5 maps to -0.5
6 maps to -0.4
7 maps to -0.3
8 maps to -0.2
9 maps to -0.1
10 maps to 0.0
```
