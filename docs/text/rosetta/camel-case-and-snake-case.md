
# Camel case and snake case

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Camel_case_and_snake_case

```ghul
use IO.Std.write_line
use Collections.LIST
use Ghul.Pipes
use System.Text.StringBuilder

class NAME(words: Collections.List[string] private) is
    to_camel_case() -> string =>
        _words
            |> index()
            |> map(
                ((index, word)) =>
                    if index == 0 then
                        lower_first(word)
                    else
                        upper_first(word)
                    fi)
            |> join("")

    to_snake_case() -> string =>
        _words
            |> map(word => word.to_lower())
            |> join("_")
si

parse(text: string) -> NAME is
    let words = LIST[string]()
    let word = StringBuilder()

    for character in text.trim() do
        if character == '_' \/ character == '-' \/ character == ' ' then
            if word.length > 0 then
                words.add(word.to_string())
                word.clear()
            fi
        elif char.is_upper(character) /\ word.length > 0 then
            words.add(word.to_string())
            word.clear()
            word.append(character)
        else
            word.append(character)
        fi
    od

    if word.length > 0 then
        words.add(word.to_string())
    fi

    return NAME(words)
si

lower_first(word: string) -> string =>
    "{char.to_lower(word[0])}{word[1..<0]}"

upper_first(word: string) -> string =>
    "{char.to_upper(word[0])}{word[1..<0]}"

quoted(text: string) -> string => "\"{text}\""

let tests = [
    "snakeCase",
    "snake_case",
    "variable_10_case",
    "variable10Case",
    "ɛrgo rE tHis",
    "hurry-up-joe!",
    "c://my-docs/happy_ghūl-Day/12.doc",
    "  spaces  "
]

let column = 37

write_line(
    "{"input".pad_right(column)} "
    "{"snake case".pad_right(column)} camel case")

for test in tests do
    let name = parse(test)

    write_line(
        "{quoted(test).pad_right(column)} "
        "{quoted(name.to_snake_case()).pad_right(column)} "
        "{quoted(name.to_camel_case())}")
od
```

output:

```
input                                 snake case                            camel case
"snakeCase"                           "snake_case"                          "snakeCase"
"snake_case"                          "snake_case"                          "snakeCase"
"variable_10_case"                    "variable_10_case"                    "variable10Case"
"variable10Case"                      "variable10_case"                     "variable10Case"
"ɛrgo rE tHis"                        "ɛrgo_r_e_t_his"                      "ɛrgoRETHis"
"hurry-up-joe!"                       "hurry_up_joe!"                       "hurryUpJoe!"
"c://my-docs/happy_ghūl-Day/12.doc"   "c://my_docs/happy_ghūl_day/12.doc"   "c://myDocs/happyGhūlDay/12.doc"
"  spaces  "                          "spaces"                              "spaces"
```
