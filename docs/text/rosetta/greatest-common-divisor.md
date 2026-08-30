
# Greatest common divisor

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Greatest_common_divisor

```ghul
use IO.Std.write_line

gcd(a: int, b: int) -> int => if b == 0 then a else gcd(b, a % b) fi

write_line("gcd(48, 18) = {gcd(48, 18)}")
write_line("gcd(1071, 462) = {gcd(1071, 462)}")
write_line("gcd(0, 13) = {gcd(0, 13)}")
write_line("gcd(13, 0) = {gcd(13, 0)}");
```

output:

```
gcd(48, 18) = 6
gcd(1071, 462) = 21
gcd(0, 13) = 13
gcd(13, 0) = 13
```
