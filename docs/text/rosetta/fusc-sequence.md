
# Fusc sequence

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Fusc_sequence

```ghul
use IO.Std.write_line
use Collections.LIST
use Ghul.Pipes

let limit = 1000000

let fusc = LIST[int]([0, 1])

while fusc.count <= limit do
    let n = fusc.count

    if n % 2 == 0 then
        fusc.add(fusc[n / 2])
    else
        fusc.add(fusc[n / 2] + fusc[n / 2 + 1])
    fi
od

write_line(fusc |> take(61) |> join(", "))

let longest mut = 0

for index in 0::limit do
    let digits = fusc[index].to_string().length

    if digits > longest then
        longest = digits
        write_line("fusc[{index:N0}] = {fusc[index]:N0}")
    fi
od
```

output:

```
0, 1, 1, 2, 1, 3, 2, 3, 1, 4, 3, 5, 2, 5, 3, 4, 1, 5, 4, 7, 3, 8, 5, 7, 2, 7, 5, 8, 3, 7, 4, 5, 1, 6, 5, 9, 4, 11, 7, 10, 3, 11, 8, 13, 5, 12, 7, 9, 2, 9, 7, 12, 5, 13, 8, 11, 3, 10, 7, 11, 4
fusc[0] = 0
fusc[37] = 11
fusc[1,173] = 108
fusc[35,499] = 1,076
fusc[699,051] = 10,946
```
