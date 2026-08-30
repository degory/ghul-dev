
# Generic swap

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Generic_swap

```ghul
use IO.Std.write_line

swap[T](left: T ref, right: T ref) is
    (left!, right!) = (right!, left!)
si

let a mut = 1
let b mut = 2

swap(a ref, b ref)

write_line("ints:    {a} {b}")

let s mut = "first"
let t mut = "second"

swap(s ref, t ref)

write_line("strings: {s} {t}")

let p mut = (1, "one")
let q mut = (2, "two")

swap(p ref, q ref)

write_line("tuples:  {p} {q}");
```

output:

```
ints:    2 1
strings: second first
tuples:  (2, two) (1, one)
```
