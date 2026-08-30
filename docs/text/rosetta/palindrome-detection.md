
# Palindrome detection

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Palindrome_detection

```ghul
use IO.Std.write_line
use Ghul.Collections
use Ghul.Pipes

reverse(text: string) -> string =>
    text |> reduce("", (reversed, character) => "{character}{reversed}")

is_palindrome(text: string) -> bool => text =~ reverse(text)

is_inexact_palindrome(text: string) -> bool =>
    text
        |> filter(char.is_letter)
        |> map(char.to_lower)
        |> reduce("", (letters, character) => "{letters}{character}")
        |> is_palindrome()

test(
    maybe_palindrome: string,
    palindrome_check: string -> bool
) -> string =>
    if palindrome_check(maybe_palindrome) then
        "\"{maybe_palindrome}\" is a palindrome"
    else
        "\"{maybe_palindrome}\" is not a palindrome"
    fi

write_line(test("racecar", is_palindrome))
write_line(test("hello", is_palindrome))
write_line(test("rotor", is_palindrome))

write_line(test("A man, a plan, a canal: Panama", is_inexact_palindrome))
write_line(test("race car", is_inexact_palindrome))
write_line(test("hello world", is_inexact_palindrome))
```

output:

```
"racecar" is a palindrome
"hello" is not a palindrome
"rotor" is a palindrome
"A man, a plan, a canal: Panama" is a palindrome
"race car" is a palindrome
"hello world" is not a palindrome
```
