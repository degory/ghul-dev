
# Closures/Value capture

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Closures/Value_capture

```ghul
use IO.Std.write_line
use Collections.LIST

let squares = LIST[() -> int]()

for i in 0..10 do
    squares.add(() => i * i)
od

write_line("{squares[3]()}")
```

output:

```
9
```
