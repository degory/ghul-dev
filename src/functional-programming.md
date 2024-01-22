# functional programming - TODO

```ghul
use IO.Std.write_line;

entry() is
    let add = (x: single, y: single) => x + y;
    let subtract = (x: single, y: single) => x - y;
    let multiply = (x: single, y: single) => x * y;
    let divide = (x: single, y: single) => x / y;

    let calc = (x: single, y: single, operation: (single, single) -> single) => operation(x, y);

    let a = 10.0;
    let b = 5.0;

    write_line("Addition: " + calc(a, b, add));
    write_line("Subtraction: " + calc(a, b, subtract));
    write_line("Multiplication: " + calc(a, b, multiply));
    write_line("Division: " + calc(a, b, divide));
si
```
