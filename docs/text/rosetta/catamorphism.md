
# Catamorphism

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Catamorphism

## Using reduce

```ghul
use IO.Std.write_line
use Ghul.Pipes

let numbers = [1, 2, 3, 4, 5]

let largest =
    (left: int, right: int) => if left > right then left else right fi

let sum = numbers |> reduce(0, (total, value) => total + value)
let product = numbers |> reduce(1, (total, value) => total * value)

write_line("sum:     {sum}")
write_line("product: {product}")
write_line("largest: {numbers |> reduce(numbers[0], largest)}")
```

output:

```
sum:     15
product: 120
largest: 5
```

## Writing fold

```ghul
use IO.Std.write_line
use Collections.Iterable
use Collections.List

fold_left[T, A](values: Iterable[T], seed: A, combine: (A, T) -> A) -> A is
    let running mut = seed

    for value in values do
        running = combine(running, value)
    od

    return running
si

fold_right[T, A](values: List[T], seed: A, combine: (T, A) -> A) -> A is
    let running mut = seed

    for i in 0..values.count do
        running = combine(values[values.count - 1 - i], running)
    od

    return running
si

let numbers = [1, 2, 3, 4, 5]

let bracket_left = (running: string, value: int) => "({running} {value})"
let bracket_right = (value: int, running: string) => "({value} {running})"

let left_sum = fold_left(numbers, 0, (total, value) => total + value)
let right_sum = fold_right(numbers, 0, (value, total) => value + total)

write_line("left  sum:  {left_sum}")
write_line("right sum:  {right_sum}")
write_line("left  tree: {fold_left(numbers, "nil", bracket_left)}")
write_line("right tree: {fold_right(numbers, "nil", bracket_right)}")
```

output:

```
left  sum:  15
right sum:  15
left  tree: (((((nil 1) 2) 3) 4) 5)
right tree: (1 (2 (3 (4 (5 nil)))))
```
