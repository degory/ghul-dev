
# Factorial

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Factorial

```ghul
use IO.Std.write_line

let factorial = n rec => if n <= 1 then 1L else cast(n) * rec(n - 1) fi

for n in [0, 1, 5, 10, 20] do
    write_line("{n}! = {factorial(n)}")
od
```

output:

```
0! = 1
1! = 1
5! = 120
10! = 3628800
20! = 2432902008176640000
```
