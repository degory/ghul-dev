
# Ormiston pairs

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Ormiston_pairs

```ghul
use IO.Std.write_line
use Collections.LIST
use Ghul.Pipes

let limit = 10000000

let composite = LIST[bool]()

(0::limit) |> each(_ => composite.add(false))

let root mut = 2

while root * root <= limit do
    if !composite[root] then
        let multiple mut = root * root

        while multiple <= limit do
            composite[multiple] = true
            multiple = multiple + root
        od
    fi

    root = root + 1
od

digit_signature(value: int) -> string => (
    let counts = LIST[int]()

    for _ in 0..10 do
        counts.add(0)
    od

    let rest mut = value

    while rest > 0 do
        let digit = rest % 10
        counts[digit] = counts[digit] + 1
        rest = rest / 10
    od

    let signature mut = ""

    for count in counts do
        signature = "{signature}{count}"
    od

    signature
)

let pairs = LIST[string]()
let up_to_million mut = 0
let up_to_ten_million mut = 0
let previous mut = 0
let previous_signature mut = ""

for candidate in 2..(limit + 1) do
    if !composite[candidate] then
        let signature = digit_signature(candidate)

        if previous_signature =~ signature then
            if pairs.count < 30 then
                pairs.add("({previous}, {candidate})")
            fi

            if candidate <= 1000000 then
                up_to_million = up_to_million + 1
            fi

            up_to_ten_million = up_to_ten_million + 1
        fi

        previous = candidate
        previous_signature = signature
    fi
od

write_line("first 30 Ormiston pairs:")

for pair in pairs do
    write_line(pair)
od

write_line("{up_to_million} pairs up to 1000000")
write_line("{up_to_ten_million} pairs up to 10000000");
```

output:

```
first 30 Ormiston pairs:
(1913, 1931)
(18379, 18397)
(19013, 19031)
(25013, 25031)
(34613, 34631)
(35617, 35671)
(35879, 35897)
(36979, 36997)
(37379, 37397)
(37813, 37831)
(40013, 40031)
(40213, 40231)
(40639, 40693)
(45613, 45631)
(48091, 48109)
(49279, 49297)
(51613, 51631)
(55313, 55331)
(56179, 56197)
(56713, 56731)
(58613, 58631)
(63079, 63097)
(63179, 63197)
(64091, 64109)
(65479, 65497)
(66413, 66431)
(74779, 74797)
(75913, 75931)
(76213, 76231)
(76579, 76597)
382 pairs up to 1000000
3722 pairs up to 10000000
```
