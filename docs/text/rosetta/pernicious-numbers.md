
# Pernicious numbers

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Pernicious_numbers

```ghul
use IO.Std.write_line
use Ghul.Pipes

prime(value: int) -> bool => (
    let divisor mut = 2

    let factor_found = while divisor * divisor <= value do
        if value % divisor == 0 then
            break true
        fi

        divisor = divisor + 1
    od

    value >= 2 /\ !(factor_found ?? false)
)

population_count(value: int) -> int =>
    System.Convert.to_string(value, 2)
        |> filter(bit => bit == '1')
        |> count()

pernicious(value: int) -> bool => prime(population_count(value))

write_line("first 25:")

write_line(
    (1..200) |> filter(pernicious) |> take(25) |> join(", "))

write_line("between 888888877 and 888888888:")

write_line(
    (888888877::888888888) |> filter(pernicious) |> join(", "))
```

output:

```
first 25:
3, 5, 6, 7, 9, 10, 11, 12, 13, 14, 17, 18, 19, 20, 21, 22, 24, 25, 26, 28, 31, 33, 34, 35, 36
between 888888877 and 888888888:
888888877, 888888878, 888888880, 888888883, 888888885, 888888886
```
