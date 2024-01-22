# object oriented programming - TODO

```ghul
use IO.Std.write_line;

class Calculator is
    init() is
    si

    add(x: single, y: single) -> single is
        return x + y;
    si

    subtract(x: single, y: single) -> single is
        return x - y;
    si

    multiply(x: single, y: single) -> single is
        return x * y;
    si

    divide(x: single, y: single) -> single is
        if y != 0.0 then
            return x / y;
        else
            throw new System.DivideByZeroException("Error: Division by zero");
        fi
    si
si

entry() is
    let calc = new Calculator();

    let a = 10.0;
    let b = 5.0;

    write_line("Addition: " + calc.add(a, b));
    write_line("Subtraction: " + calc.subtract(a, b));
    write_line("Multiplication: " + calc.multiply(a, b));
    write_line("Division: " + calc.divide(a, b));
si
```
