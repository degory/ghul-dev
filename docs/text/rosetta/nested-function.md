
# Nested function

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Nested_function

```ghul
use IO.Std.write_line
use Collections.LIST
use Ghul.Pipes

make_list(separator: string) -> string is
    let counter mut = 0

    let make_item = (item: string) => (
        counter = counter + 1
        "{counter}{separator}{item}"
    )

    let items = LIST[string]()

    for item in ["first", "second", "third"] do
        items.add(make_item(item))
    od

    return items |> join("\n")
si

write_line(make_list(". "));
```

output:

```
1. first
2. second
3. third
```
