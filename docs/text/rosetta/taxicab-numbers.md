
# Taxicab numbers

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Taxicab_numbers

```ghul
use IO.Std.write_line
use Collections
use Ghul.Pipes

let pair_bound = 1200

let sums = LIST[long]()

for a in 1..pair_bound do
    let a_cubed = cast long(a) * cast long(a) * cast long(a)

    for b in (a + 1)..pair_bound do
        let b_cubed = cast long(b) * cast long(b) * cast long(b)

        sums.add(a_cubed + b_cubed)
    od
od

sums.sort()

let taxis = LIST[long]()

let i mut = 0

while i < sums.count - 1 do
    if sums[i] == sums[i + 1] then
        let value = sums[i]

        taxis.add(value)

        while i < sums.count /\ sums[i] == value do
            i = i + 1
        od
    else
        i = i + 1
    fi
od

cube_root(value: long) -> long => (
    let cube_root_of = System.Math.cbrt(cast(value))
    let root = cast long(System.Math.floor(cube_root_of + 0.5D))

    if root * root * root == value then root else 0L fi
)

expressions(taxi: long) -> string => (
    let parts = LIST[string]()
    let a mut = 1L

    while a * a * a * 2L < taxi do
        let b = cube_root(taxi - a * a * a)

        if b > 0L then
            parts.add("{a}^3 + {b}^3")
        fi

        a = a + 1L
    od

    parts |> join(" = ")
)

show(rank: int, taxis: List[long]) is
    let taxi = taxis[rank - 1]

    write_line("{rank}: {taxi} = {expressions(taxi)}")
si

write_line("the lowest 25 taxicab numbers:")

for rank in 1::25 do
    show(rank, taxis)
od

write_line("the 2000th taxicab number, and half a dozen more:")

for rank in 2000::2006 do
    show(rank, taxis)
od
```

output:

```
the lowest 25 taxicab numbers:
1: 1729 = 1^3 + 12^3 = 9^3 + 10^3
2: 4104 = 2^3 + 16^3 = 9^3 + 15^3
3: 13832 = 2^3 + 24^3 = 18^3 + 20^3
4: 20683 = 10^3 + 27^3 = 19^3 + 24^3
5: 32832 = 4^3 + 32^3 = 18^3 + 30^3
6: 39312 = 2^3 + 34^3 = 15^3 + 33^3
7: 40033 = 9^3 + 34^3 = 16^3 + 33^3
8: 46683 = 3^3 + 36^3 = 27^3 + 30^3
9: 64232 = 17^3 + 39^3 = 26^3 + 36^3
10: 65728 = 12^3 + 40^3 = 31^3 + 33^3
11: 110656 = 4^3 + 48^3 = 36^3 + 40^3
12: 110808 = 6^3 + 48^3 = 27^3 + 45^3
13: 134379 = 12^3 + 51^3 = 38^3 + 43^3
14: 149389 = 8^3 + 53^3 = 29^3 + 50^3
15: 165464 = 20^3 + 54^3 = 38^3 + 48^3
16: 171288 = 17^3 + 55^3 = 24^3 + 54^3
17: 195841 = 9^3 + 58^3 = 22^3 + 57^3
18: 216027 = 3^3 + 60^3 = 22^3 + 59^3
19: 216125 = 5^3 + 60^3 = 45^3 + 50^3
20: 262656 = 8^3 + 64^3 = 36^3 + 60^3
21: 314496 = 4^3 + 68^3 = 30^3 + 66^3
22: 320264 = 18^3 + 68^3 = 32^3 + 66^3
23: 327763 = 30^3 + 67^3 = 51^3 + 58^3
24: 373464 = 6^3 + 72^3 = 54^3 + 60^3
25: 402597 = 42^3 + 69^3 = 56^3 + 61^3
the 2000th taxicab number, and half a dozen more:
2000: 1671816384 = 428^3 + 1168^3 = 940^3 + 944^3
2001: 1672470592 = 29^3 + 1187^3 = 632^3 + 1124^3
2002: 1673170856 = 458^3 + 1164^3 = 828^3 + 1034^3
2003: 1675045225 = 522^3 + 1153^3 = 744^3 + 1081^3
2004: 1675958167 = 492^3 + 1159^3 = 711^3 + 1096^3
2005: 1676926719 = 63^3 + 1188^3 = 714^3 + 1095^3
2006: 1677646971 = 99^3 + 1188^3 = 891^3 + 990^3
```
