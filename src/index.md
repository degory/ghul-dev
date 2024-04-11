
#  ghūl programming language

![ghūl programming language logo](ghul-logo-draft.png)

(Note: this site is very much a **work-in-progress**. The [ghūl compiler](https://github.com/degory/ghul) source code is currently the definitive ghūl language reference)

## why ghūl?

Why not 🤔

ghūl is mainly an opportunity for [me](https://github.com/degory) to experiment with programming language design. Apart from a slightly quirky syntax, ghūl is a fairly conventional programming language. Although ghūl is a hobby project maintained by a single person, its goal is to be sufficiently expressive for general-purpose development: the [ghūl compiler](https://github.com/degory/ghul) itself is written in ghūl.

## features

- **type safety**: ghūl enforces type safety at compile-time.

- **functional programming elements**: ghūl supports anonymous functions with closures.

- **OOP**: ghūl supports classes, objects, inheritance, polymorphism, and other Object-Oriented Programming concepts.

- **error handling**: the language includes try/catch/finally for error handling.

- **generics**: ghūl types, methods, and functions can have generic type parameters.

- **.NET integration**: ghūl targets .NET, producing and consuming NuGet packages and supporting inter-operation with other .NET languages.

## examples

### hello world!

```ghul
entry() =>
    IO.Std.write_line("hello world"); 
```

### functional

```ghul
use IO.Std.write_line;

entry() is
    // lazily generates an infinite sequence of fibonacci numbers:
    let fibonacci_sequence = generate(
        (0, 1),
        state: (int, int) =>
            let 
                (prev, current) = state,
                next = prev + current
            in
                ((current, next), next)
    );

    // lazily generates an infinite sequence of factorials:
    let factorial_sequence = generate(
        (1, 1),
        state: (int, int) =>
            let
                (p, prev) = state,
                n = p + 1,
                next = prev * n
            in
                ((n, next), next)            
    );

    write_line("first 10 fibonacci numbers: {fibonacci_sequence | .take(10)}");
    write_line("first 10 factorial numbers: {factorial_sequence | .take(10)}");
    write_line("first 10 even fibonacci numbers: {fibonacci_sequence | .filter(x => x % 2 == 0) .take(10)}");

    for (i, (fib, fact)) in fibonacci_sequence | .zip(factorial_sequence) .take(10) .index() do
        write_line("fibonacci {i} is {fib}");
        write_line("factorial {i} is {fact}");
    od;
si
```

### OOP
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

### examples project
See the [ghūl examples repository](https://github.com/degory/ghul-examples) for projects with these examples and others that can be viewed, edited and run from Visual Studio Code or a GitHub Codespace.
