
# Forward difference

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Forward_difference

```ghul
use IO.Std.write_line
use Collections
use Ghul.Pipes

differences(xs: List[int]) -> List[int] =>
    zip(xs[1..<0], xs[0..<1])
    |> map(((next, current)) => next - current)
    |> collect_list()

forward(order: int, xs: List[int]) -> List[int] =>
    if order == 0 then xs
    else forward(order - 1, differences(xs))
    fi

let xs: List[int] = [90, 47, 58, 29, 22, 32, 55, 5, 55, 73]

for order in 0..xs.count do
    write_line("order {order}: {forward(order, xs) |> join(", ")}")
od
```

output:

```
order 0: 90, 47, 58, 29, 22, 32, 55, 5, 55, 73
order 1: -43, 11, -29, -7, 10, 23, -50, 50, 18
order 2: 54, -40, 22, 17, 13, -73, 100, -32
order 3: -94, 62, -5, -4, -86, 173, -132
order 4: 156, -67, 1, -82, 259, -305
order 5: -223, 68, -83, 341, -564
order 6: 291, -151, 424, -905
order 7: -442, 575, -1329
order 8: 1017, -1904
order 9: -2921
```
