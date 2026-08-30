
# ABC problem

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/ABC_problem

```ghul
use IO.Std.write_line
use Collections.List
use Ghul.Pipes

without(blocks: List[string], at: int) -> List[string] =>
    blocks
    |> index()
    |> filter(block => block.index != at)
    |> map(block => block.value)
    |> collect()

can_spell(word: string, blocks: List[string]) -> bool =>
    word.length == 0 \/
    (blocks
        |> index()
        |> filter(block => block.value.contains(word[0]))
        |> any(block =>
            can_spell(word.substring(1), blocks |> without(block.index))))

let blocks = [
    "BO", "XK", "DQ", "CP", "NA", "GT", "RE", "TG", "QD", "FS",
    "JW", "HU", "VI", "AN", "OB", "ER", "FS", "LY", "PC", "ZM"
]

let can_make_word = (word: string) => can_spell(word.to_upper(), blocks)

for word in ["A", "BARK", "BOOK", "TREAT", "COMMON", "SQUAD", "CONFUSE"] do
    write_line("can_make_word(\"{word}\") = {can_make_word(word)}")
od
```

output:

```
can_make_word("A") = True
can_make_word("BARK") = True
can_make_word("BOOK") = False
can_make_word("TREAT") = True
can_make_word("COMMON") = False
can_make_word("SQUAD") = True
can_make_word("CONFUSE") = True
```
