
# Undulating numbers

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Undulating_numbers

```ghul
use IO.Std.write_line
use Collections.LIST
use Ghul.Pipes

undulating_value(first: int, second: int, length: int) -> long => (
    let value mut = 0L

    for position in 0..length do
        let digit = if position % 2 == 0 then first else second fi
        value = value * 10L + cast long(digit)
    od

    value
)

let limit = 9007199254740992L

let values = LIST[long]()

for length in 3..17 do
    for first in 1..10 do
        for second in 0..10 do
            if second != first then
                let value = undulating_value(first, second, length)

                if value < limit then
                    values.add(value)
                fi
            fi
        od
    od
od

let three_digit = values |> filter(v => v < 1000L) |> collect_list()
let four_digit = values
    |> filter(v => v >= 1000L /\ v < 10000L)
    |> collect_list()

write_line("three digit:")

for row in 0..9 do
    write_line(
        three_digit
            |> skip(row * 9)
            |> take(9)
            |> map(v => "{v}")
            |> join(" "))
od

write_line("four digit:")

for row in 0..9 do
    write_line(
        four_digit
            |> skip(row * 9)
            |> take(9)
            |> map(v => "{v}")
            |> join(" "))
od

prime(value: long) -> bool => (
    let divisor mut = 2L

    let factor_found = while divisor * divisor <= value do
        if value % divisor == 0L then
            break true
        fi

        divisor = divisor + 1L
    od

    value >= 2L /\ !(factor_found ?? false)
)

write_line("three digit primes:")

write_line(
    three_digit |> filter(prime) |> map(v => "{v}") |> join(" "))

write_line("600th: {values[599]}")

write_line(
    "{values.count} undulating numbers below 2^53, "
    "the largest is {values[values.count - 1]}");
```

output:

```
three digit:
101 121 131 141 151 161 171 181 191
202 212 232 242 252 262 272 282 292
303 313 323 343 353 363 373 383 393
404 414 424 434 454 464 474 484 494
505 515 525 535 545 565 575 585 595
606 616 626 636 646 656 676 686 696
707 717 727 737 747 757 767 787 797
808 818 828 838 848 858 868 878 898
909 919 929 939 949 959 969 979 989
four digit:
1010 1212 1313 1414 1515 1616 1717 1818 1919
2020 2121 2323 2424 2525 2626 2727 2828 2929
3030 3131 3232 3434 3535 3636 3737 3838 3939
4040 4141 4242 4343 4545 4646 4747 4848 4949
5050 5151 5252 5353 5454 5656 5757 5858 5959
6060 6161 6262 6363 6464 6565 6767 6868 6969
7070 7171 7272 7373 7474 7575 7676 7878 7979
8080 8181 8282 8383 8484 8585 8686 8787 8989
9090 9191 9292 9393 9494 9595 9696 9797 9898
three digit primes:
101 131 151 181 191 313 353 373 383 727 757 787 797 919 929
600th: 4646464646
1125 undulating numbers below 2^53, the largest is 8989898989898989
```
