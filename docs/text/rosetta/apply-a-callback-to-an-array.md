
# Apply a callback to an array

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Apply_a_callback_to_an_array

## Using map

```ghul
use IO.Std.write_line
use Ghul.Pipes

write_line("{$([1, 2, 3, 4, 5] |> map(value => value * value))}")
```

output:

```
[1, 4, 9, 16, 25]
```

## Writing apply

```ghul
use IO.Std.write_line
use Collections.List
use Collections.LIST

apply[T, U](values: T[], callback: T -> U pure) -> List[U] is
    let applied = LIST[U]()

    for value in values do
        applied.add(callback(value))
    od

    return applied
si

shout(word: string) -> string => "{word.to_upper()}!"

write_line("{$([1, 2, 3, 4, 5] |> apply(value => value * value))}")
write_line("{$(["frog", "newt", "toad"] |> apply(shout))}")
```

output:

```
[1, 4, 9, 16, 25]
[FROG!, NEWT!, TOAD!]
```
