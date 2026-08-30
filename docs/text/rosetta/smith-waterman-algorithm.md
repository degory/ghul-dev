
# Smith–Waterman algorithm

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Smith–Waterman_algorithm

```ghul
use IO.Std.write_line
use Collections.LIST
use Ghul.Pipes

score(first: char, second: char) -> int =>
    if first == second then 2 else -1 fi

gap() -> int => -2

highest(values: int[]) -> int =>
    values
    |> reduce(0, (best, value) => if value > best then value else best fi)

matrix(first: string, second: string) -> LIST[LIST[int]] is
    let scores = LIST[LIST[int]]()

    for i in 0::first.length do
        let row = LIST[int]()

        for j in 0::second.length do
            row.add(0)
        od

        scores.add(row)
    od

    for i in 1::first.length do
        for j in 1::second.length do
            scores[i][j] =
                highest([
                    0,
                    scores[i - 1][j - 1] +
                        score(first[i - 1], second[j - 1]),
                    scores[i - 1][j] + gap(),
                    scores[i][j - 1] + gap()
                ])
        od
    od

    return scores
si

best_cell(scores: LIST[LIST[int]]) -> (row: int, column: int) is
    let row mut = 0
    let column mut = 0

    for i in 0..scores.count do
        for j in 0..scores[i].count do
            if scores[i][j] > scores[row][column] then
                row = i
                column = j
            fi
        od
    od

    return (row = row, column = column)
si

trace(
    first: string,
    second: string,
    scores: LIST[LIST[int]]
) -> (a_aligned: string, b_aligned: string, path: string) is
    let (row, column) = best_cell(scores)

    let i mut = row
    let j mut = column

    let top = LIST[char]()
    let bottom = LIST[char]()
    let cells = LIST[string]()

    while i > 0 /\ j > 0 /\ scores[i][j] > 0 do
        cells.add("({i},{j})")

        let diagonal =
            scores[i - 1][j - 1] + score(first[i - 1], second[j - 1])

        if scores[i][j] == diagonal then
            top.add(first[i - 1])
            bottom.add(second[j - 1])

            i = i - 1
            j = j - 1
        elif scores[i][j] == scores[i - 1][j] + gap() then
            top.add(first[i - 1])
            bottom.add('-')

            i = i - 1
        else
            top.add('-')
            bottom.add(second[j - 1])

            j = j - 1
        fi
    od

    top.reverse()
    bottom.reverse()
    cells.reverse()

    return (
        a_aligned = string(top.to_array()),
        b_aligned = string(bottom.to_array()),
        path = cells |> join(" ")
    )
si

show(first: string, second: string) is
    let scores = matrix(first, second)
    let (row, column) = best_cell(scores)
    let (a_aligned, b_aligned, path) = trace(first, second, scores)

    write_line("sequences: {first} and {second}")
    write_line("highest score: {scores[row][column]}")
    write_line("aligned: {a_aligned}")
    write_line("         {b_aligned}")
    write_line("path: {path}")
    write_line("")
    let heading =
        second |> map(character => "{character}".pad_left(3)) |> join("")

    write_line("       {heading}")

    for i in 0::first.length do
        let label = if i == 0 then " " else "{first[i - 1]}" fi

        let row =
            scores[i] |> map(value => "{value}".pad_left(3)) |> join("")

        write_line("  {label} {row}")
    od
si

show("ACACACTA", "AGCACACA")
```

output:

```
sequences: ACACACTA and AGCACACA
highest score: 10
aligned: ACACA
         ACACA
path: (1,4) (2,5) (3,6) (4,7) (5,8)

         A  G  C  A  C  A  C  A
      0  0  0  0  0  0  0  0  0
  A   0  2  0  0  2  0  2  0  2
  C   0  0  1  2  0  4  2  4  2
  A   0  2  0  0  4  2  6  4  6
  C   0  0  1  2  2  6  4  8  6
  A   0  2  0  0  4  4  8  6 10
  C   0  0  1  2  2  6  6 10  8
  T   0  0  0  0  1  4  5  8  9
  A   0  2  0  0  2  2  6  6 10
```
