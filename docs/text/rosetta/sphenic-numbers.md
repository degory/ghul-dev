
# Sphenic numbers

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Sphenic_numbers

```ghul
use IO.Std.write_line
use Collections
use Ghul.Pipes

let search_limit = 1000000

smallest_prime_factors(limit: int) -> List[int] is
    let factor = LIST()

    (0..limit) |> each(_ => factor.add(0))

    let prime mut = 2

    while prime * prime < limit do
        if factor[prime] == 0 then
            let multiple mut = prime * prime

            while multiple < limit do
                if factor[multiple] == 0 then
                    factor[multiple] = prime
                fi

                multiple = multiple + prime
            od
        fi

        prime = prime + 1
    od

    let n mut = 2

    while n < limit do
        if factor[n] == 0 then
            factor[n] = n
        fi

        n = n + 1
    od

    return factor
si

is_sphenic(n: int, factor: List[int]) -> bool => (
    let rest mut = n
    let previous mut = 0
    let total mut = 0
    let distinct mut = 0

    while rest > 1 do
        let prime = factor[rest]

        total = total + 1

        if prime != previous then
            distinct = distinct + 1
            previous = prime
        fi

        rest = rest / prime
    od

    total == 3 /\ distinct == 3
)

prime_factors(n: int, factor: List[int]) -> List[string] => (
    let rest mut = n
    let factors = LIST[string]()

    while rest > 1 do
        let prime = factor[rest]
        factors.add("{prime}")
        rest = rest / prime
    od

    factors
)

let factor = smallest_prime_factors(search_limit)

let sphenics =
    (2..search_limit)
    |> filter(n => is_sphenic(n, factor))
    |> collect_list()

let below_1000 = sphenics |> filter(n => n < 1000) |> join(", ")

write_line("sphenic numbers below 1000: {below_1000}")

let triplets = LIST()

let i mut = 0

while i + 2 < sphenics.count do
    if sphenics[i + 1] == sphenics[i] + 1 /\
        sphenics[i + 2] == sphenics[i] + 2
    then
        triplets.add(sphenics[i])
    fi

    i = i + 1
od

write_line("sphenic triplets below 10000:")

for first in triplets do
    if first + 2 < 10000 then
        write_line("({first}, {first + 1}, {first + 2})")
    fi
od

write_line("sphenic numbers below {search_limit}: {sphenics.count}")
write_line("sphenic triplets below {search_limit}: {triplets.count}")

let sphenic_200000th = sphenics[200000 - 1]

write_line(
    "the 200000th sphenic number is {sphenic_200000th} = {
        prime_factors(sphenic_200000th, factor) |> join(" x ")
    }"
)

let triplet_5000th = triplets[5000 - 1]

write_line(
    "the 5000th sphenic triplet is "
    "({triplet_5000th}, {triplet_5000th + 1}, {triplet_5000th + 2})");
```

output:

```
sphenic numbers below 1000: 30, 42, 66, 70, 78, 102, 105, 110, 114, 130, 138, 154, 165, 170, 174, 182, 186, 190, 195, 222, 230, 231, 238, 246, 255, 258, 266, 273, 282, 285, 286, 290, 310, 318, 322, 345, 354, 357, 366, 370, 374, 385, 399, 402, 406, 410, 418, 426, 429, 430, 434, 435, 438, 442, 455, 465, 470, 474, 483, 494, 498, 506, 518, 530, 534, 555, 561, 574, 582, 590, 595, 598, 602, 606, 609, 610, 615, 618, 627, 638, 642, 645, 646, 651, 654, 658, 663, 665, 670, 678, 682, 705, 710, 715, 730, 741, 742, 754, 759, 762, 777, 782, 786, 790, 795, 805, 806, 814, 822, 826, 830, 834, 854, 861, 874, 885, 890, 894, 897, 902, 903, 906, 915, 935, 938, 942, 946, 957, 962, 969, 970, 978, 986, 987, 994
sphenic triplets below 10000:
(1309, 1310, 1311)
(1885, 1886, 1887)
(2013, 2014, 2015)
(2665, 2666, 2667)
(3729, 3730, 3731)
(5133, 5134, 5135)
(6061, 6062, 6063)
(6213, 6214, 6215)
(6305, 6306, 6307)
(6477, 6478, 6479)
(6853, 6854, 6855)
(6985, 6986, 6987)
(7257, 7258, 7259)
(7953, 7954, 7955)
(8393, 8394, 8395)
(8533, 8534, 8535)
(8785, 8786, 8787)
(9213, 9214, 9215)
(9453, 9454, 9455)
(9821, 9822, 9823)
(9877, 9878, 9879)
sphenic numbers below 1000000: 206964
sphenic triplets below 1000000: 5457
the 200000th sphenic number is 966467 = 17 x 139 x 409
the 5000th sphenic triplet is (918005, 918006, 918007)
```
