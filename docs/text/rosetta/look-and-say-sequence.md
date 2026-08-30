
# Look-and-say sequence

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Look-and-say_sequence

```ghul
use IO.Std.write_line
use Ghul.Pipes

look_and_say(seed: string) -> Pipe[string] is
    let current mut = seed

    do
        yield current

        let said = System.Text.StringBuilder()
        let i mut = 0

        while i < current.length do
            let digit = current[i]
            let run mut = 0

            while i < current.length /\ current[i] == digit do
                run = run + 1
                i = i + 1
            od

            said.append(run)
            said.append(digit)
        od

        current = said.to_string()
    od
si

look_and_say("1") |> take(10) |> each(term => write_line(term))
```

output:

```
1
11
21
1211
111221
312211
13112221
1113213211
31131211131221
13211311123113112211
```
