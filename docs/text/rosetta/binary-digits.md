
# Binary digits

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Binary_digits

```ghul
use IO.Std.write_line

binary(value: int) -> string =>
    if value < 2 then "{value}" else "{binary(value / 2)}{value % 2}" fi

for value in [5, 50, 9000] do
    write_line(binary(value))
od
```

output:

```
101
110010
10001100101000
```
