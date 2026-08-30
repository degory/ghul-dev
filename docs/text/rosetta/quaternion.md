
# Quaternion

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Quaternion

```ghul
use IO.Std.write_line
use System.Math

struct QUATERNION(a: double, b: double, c: double, d: double) is
    norm: double => Math.sqrt(a * a + b * b + c * c + d * d)

    negative: QUATERNION => QUATERNION(-a, -b, -c, -d)

    conjugate: QUATERNION => QUATERNION(a, -b, -c, -d)

    +(r: double) -> QUATERNION => QUATERNION(a + r, b, c, d)

    +(q: QUATERNION) -> QUATERNION =>
        QUATERNION(a + q.a, b + q.b, c + q.c, d + q.d)

    *(r: double) -> QUATERNION =>
        QUATERNION(a * r, b * r, c * r, d * r)

    *(q: QUATERNION) -> QUATERNION =>
        QUATERNION(
            a * q.a - b * q.b - c * q.c - d * q.d,
            a * q.b + b * q.a + c * q.d - d * q.c,
            a * q.c - b * q.d + c * q.a + d * q.b,
            a * q.d + b * q.c - c * q.b + d * q.a
        )

    =~(q: QUATERNION) -> bool =>
        a == q.a /\ b == q.b /\ c == q.c /\ d == q.d

    ▲ get_hash_code() -> int =>
        a.get_hash_code() ^ b.get_hash_code() ^
            c.get_hash_code() ^ d.get_hash_code()

    ▲ to_string() -> string => "({a}, {b}, {c}, {d})"
si

+(r: double, q: QUATERNION) -> QUATERNION => q + r

*(r: double, q: QUATERNION) -> QUATERNION => q * r

let q = QUATERNION(1.0D, 2.0D, 3.0D, 4.0D)
let q1 = QUATERNION(2.0D, 3.0D, 4.0D, 5.0D)
let q2 = QUATERNION(3.0D, 4.0D, 5.0D, 6.0D)
let r = 7.0D

write_line("q  = {q}")
write_line("q1 = {q1}")
write_line("q2 = {q2}")
write_line("r  = {r}")
write_line("")
write_line("norm q      = {q.norm}")
write_line("negative q  = {q.negative}")
write_line("conjugate q = {q.conjugate}")
write_line("q + r       = {q + r}")
write_line("r + q       = {r + q}")
write_line("q1 + q2     = {q1 + q2}")
write_line("q * r       = {q * r}")
write_line("r * q       = {r * q}")
write_line("q1 * q2     = {q1 * q2}")
write_line("q2 * q1     = {q2 * q1}")
write_line("q1 * q2 =~ q2 * q1: {q1 * q2 =~ q2 * q1}");
```

output:

```
q  = (1, 2, 3, 4)
q1 = (2, 3, 4, 5)
q2 = (3, 4, 5, 6)
r  = 7

norm q      = 5.477225575051661
negative q  = (-1, -2, -3, -4)
conjugate q = (1, -2, -3, -4)
q + r       = (8, 2, 3, 4)
r + q       = (8, 2, 3, 4)
q1 + q2     = (5, 7, 9, 11)
q * r       = (7, 14, 21, 28)
r * q       = (7, 14, 21, 28)
q1 * q2     = (-56, 16, 24, 26)
q2 * q1     = (-56, 18, 20, 28)
q1 * q2 =~ q2 * q1: False
```
