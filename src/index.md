
#  ghūl programming language

![ghūl programming language logo](ghul-logo-draft.png)

> - The ghūl language, compiler, tools, and this website are all very much a **work-in-progress**.
> - Whatever the [ghūl compiler](https://github.com/degory/ghul) accepts is currently the definitive ghūl language reference.
> - ghūl is pronounced 'ghoul'.

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
use Ghul.Pipes.stream;

entry() is
    // lazily generates an infinite sequence of fibonacci numbers:
    let fibonacci_sequence = stream(
        (prev = 1, current = 1),
        s => s.current || (prev = s.current, current = s.prev + s.current)
    );

    // lazily generates an infinite sequence of factorials:
    let factorial_sequence = stream(
        (n = 1, prev = 1),
        s => let next_n = s.n + 1, next = s.prev * next_n in
            next || (n = next_n, prev = next)
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

class CALCULATOR is
    init() is
    si

    add(x: single, y: single) -> single =>
        x + y;

    subtract(x: single, y: single) -> single =>
        x - y;

    multiply(x: single, y: single) -> single =>
        x * y;

    divide(x: single, y: single) -> single =>
        if y != 0.0 then
            x / y;
        else
            throw System.DivideByZeroException("oops: division by zero");
        fi;
si

entry() is
    let calc = CALCULATOR();

    let a = 10.0;
    let b = 5.0;

    write_line("Addition: {calc.add(a, b)}");
    write_line("Subtraction: {calc.subtract(a, b)}");
    write_line("Multiplication: {calc.multiply(a, b)}");
    write_line("Division: {calc.divide(a, b)}");
si
```

### examples project
See the [ghūl examples repository](https://github.com/degory/ghul-examples) for projects with these examples and others that can be viewed, edited and run from Visual Studio Code or a GitHub Codespace.
