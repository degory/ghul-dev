
# Reverse a string

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Reverse_a_string

```ghul
use IO.Std.write_line
use Ghul.Pipes

reverse(text: string) -> string =>
    text |> reduce("", (reversed, character) => "{character}{reversed}")

write_line(reverse("asdf"))
write_line(reverse("Hello, World!"));
```

output:

```
fdsa
!dlroW ,olleH
```
