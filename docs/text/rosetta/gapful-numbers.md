
# Gapful numbers

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Gapful_numbers

```ghul
use IO.Std.write_line
use Collections.LIST
use Ghul.Pipes

gapful_from(start: int, wanted: int) -> LIST[int] is
    let found = LIST[int]()
    let candidate mut = start

    while found.count < wanted do
        let digits = candidate.to_string()
        let first_last = int.parse(
            "{digits[0]}{digits[digits.length - 1]}")

        if candidate % first_last == 0 then
            found.add(candidate)
        fi

        candidate = candidate + 1
    od

    found
si

write_line("first 30 gapful numbers:")
write_line(gapful_from(100, 30) |> join(", "))

write_line("first 15 gapful numbers >= 1,000,000:")
write_line(gapful_from(1000000, 15) |> join(", "))

write_line("first 10 gapful numbers >= 1,000,000,000:")
write_line(gapful_from(1000000000, 10) |> join(", "))
```

output:

```
first 30 gapful numbers:
100, 105, 108, 110, 120, 121, 130, 132, 135, 140, 143, 150, 154, 160, 165, 170, 176, 180, 187, 190, 192, 195, 198, 200, 220, 225, 231, 240, 242, 253
first 15 gapful numbers >= 1,000,000:
1000000, 1000005, 1000008, 1000010, 1000016, 1000020, 1000021, 1000030, 1000032, 1000034, 1000035, 1000040, 1000050, 1000060, 1000065
first 10 gapful numbers >= 1,000,000,000:
1000000000, 1000000001, 1000000005, 1000000008, 1000000010, 1000000016, 1000000020, 1000000027, 1000000030, 1000000032
```
