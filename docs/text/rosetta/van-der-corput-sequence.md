
# Van der Corput sequence

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Van_der_Corput_sequence

```ghul
use IO.Std.write_line
use Collections
use Ghul.Pipes

van_der_corput(n: int, base: int) -> double pure => (
    let rest mut = n
    let weight mut = 1.0D / cast(base)
    let term mut = 0.0D

    while rest > 0 do
        term = term + cast(rest % base) * weight

        rest = rest / base
        weight = weight / cast(base)
    od

    term
)

let base_2 = (0::9) |> map(n => "{van_der_corput(n, 2)}") |> join(", ")

write_line("base 2: {base_2}")

for base in 3::5 do
    let terms = LIST()

    for n in 0::9 do
        terms.add("{van_der_corput(n, base):F4}")
    od

    write_line("base {base}: {terms |> join(", ")}")
od
```

output:

```
base 2: 0, 0.5, 0.25, 0.75, 0.125, 0.625, 0.375, 0.875, 0.0625, 0.5625
base 3: 0.0000, 0.3333, 0.6667, 0.1111, 0.4444, 0.7778, 0.2222, 0.5556, 0.8889, 0.0370
base 4: 0.0000, 0.2500, 0.5000, 0.7500, 0.0625, 0.3125, 0.5625, 0.8125, 0.1250, 0.3750
base 5: 0.0000, 0.2000, 0.4000, 0.6000, 0.8000, 0.0400, 0.2400, 0.4400, 0.6400, 0.8400
```
