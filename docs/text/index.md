
#  ghūl programming language

<img class="ghul-logo" src="/ghul-logo-draft.png" alt="ghūl programming language logo" />

ghūl (pronounced 'ghoul') is a statically typed, general-purpose programming language that compiles to .NET 10. It produces ordinary .NET assemblies and NuGet packages, and ghūl code can call any .NET library. The [ghūl compiler](https://github.com/degory/ghul) is written in ghūl - about 120,000 lines of it - and compiles itself.

## examples

> **editable examples**
>
> Every example on this site is editable: click the pencil to open it in an editor, change it, and run it in your browser. Output and any compiler errors appear in the panel beneath.
>
> Nothing you edit is saved. To keep something, paste it into the [ghūl scratchpad](https://github.com/degory/ghul-scratchpad)'s `main.ghul`: a one-file project that opens in a GitHub Codespace with the compiler ready, or that you can clone on your own machine. For a project of your own, start from the [repository template](https://github.com/degory/ghul-repository-template).

Each of these is a complete program:

**fibonacci: streams + `|>`**

```ghul
use IO.Std.write_line;
use Ghul.Pipes;

// lazily generates an infinite sequence of
// fibonacci numbers. the state is a (prev, current)
// tuple; each step yields prev and builds the next state:
let fibonacci_sequence = stream(
    (0, 1),
    ((prev, current)) =>
        prev || (current, prev + current)
);

// lazily generates an infinite sequence of
// factorials. the state is an (n, factorial of n) tuple:
let factorial_sequence = stream(
    (0, 1),
    ((n, current)) =>
        current || (n + 1, current * (n + 1))
);

let first_10_fib = fibonacci_sequence |> take(10);
let first_10_fact = factorial_sequence |> take(10);

let first_10_even =
    fibonacci_sequence
        |> filter(x => x % 2 == 0)
        |> take(10);

write_line(
    "first 10 fibonacci numbers: {first_10_fib}"
);
write_line(
    "first 10 factorial numbers: {first_10_fact}"
);
write_line(
    "first 10 even fibonacci numbers: {first_10_even}"
);

// the whole thing stays one expression: pair the two
// sequences up, number them, and consume the result
fibonacci_sequence
    |> zip(factorial_sequence)
    |> take(10)
    |> index()
    |> each(
        ((i, (fib, fact))) =>
            write_line(
                // adjacent string literals concatenate
                "fibonacci {i} is {fib}\n"
                "factorial {i} is {fact}"
            )
    );
```

output:

```
first 10 fibonacci numbers: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
first 10 factorial numbers: 1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880
first 10 even fibonacci numbers: 0, 2, 8, 34, 144, 610, 2584, 10946, 46368, 196418
fibonacci 0 is 0
factorial 0 is 1
fibonacci 1 is 1
factorial 1 is 1
fibonacci 2 is 1
factorial 2 is 2
fibonacci 3 is 2
factorial 3 is 6
fibonacci 4 is 3
factorial 4 is 24
fibonacci 5 is 5
factorial 5 is 120
fibonacci 6 is 8
factorial 6 is 720
fibonacci 7 is 13
factorial 7 is 5040
fibonacci 8 is 21
factorial 8 is 40320
fibonacci 9 is 34
factorial 9 is 362880
```

**expression trees: classes + traits**

```ghul
use IO.Std.write_line;

// a trait for rendering an expression as a string
trait Renderable is
    render() -> string;
si

// an abstract expression: body-less eval and render
// make the class abstract, so only the subclasses below
// can be constructed
class Expr: Renderable is
    eval() -> int;
    render() -> string;
si

class NUM(value: int): Expr is
    eval() -> int => value;
    render() -> string => "{value}";
si

class ADD(left: Expr, right: Expr): Expr is
    eval() -> int => left.eval() + right.eval();
    render() -> string => "({left.render()} + {right.render()})";
si

class MUL(left: Expr, right: Expr): Expr is
    eval() -> int => left.eval() * right.eval();
    render() -> string => "({left.render()} * {right.render()})";
si

// (2 * (3 + 4)) = 14
let expression = MUL(NUM(2), ADD(NUM(3), NUM(4)));

write_line("{expression.render()} = {expression.eval()}");

// any of the classes above satisfies Renderable, so a
// value held at the trait renders whatever it really is
let renderables: Renderable[] = [NUM(7), expression];

for r in renderables do
    write_line(r.render());
od
```

output:

```
(2 * (3 + 4)) = 14
7
(2 * (3 + 4))
```

**expression trees: union + pattern matching**

```ghul
use IO.Std.write_line;

// an expression is one of three variants
union Expr is
    NUM(value: int);
    ADD(left: Expr, right: Expr);
    MUL(left: Expr, right: Expr);
si

use Expr.NUM;
use Expr.ADD;
use Expr.MUL;

// evaluate an expression, recursing into the children
eval(e: Expr) -> int =>
    case e
    when n: NUM then n.value
    when a: ADD then eval(a.left) + eval(a.right)
    when m: MUL then eval(m.left) * eval(m.right)
    esac;

// render an expression, recursing into the children
render(e: Expr) -> string =>
    case e
    when n: NUM then "{n.value}"
    when a: ADD then "({render(a.left)} + {render(a.right)})"
    when m: MUL then "({render(m.left)} * {render(m.right)})"
    esac;

// (2 * (3 + 4)) = 14
let expression = MUL(NUM(2), ADD(NUM(3), NUM(4)));

write_line("{render(expression)} = {eval(expression)}");
```

output:

```
(2 * (3 + 4)) = 14
```

**fibonacci: generators + pipes**

```ghul
use IO.Std.write_line;
use Ghul.Pipes;

// a generator: a function returning Pipe[T] that yields.
// each yield produces the next value and pauses until the
// caller asks for another, so this sequence is infinite
// but only ever computed as far as it is consumed
fibonacci() -> Pipe[int] is
    let prev mut = 0;
    let current mut = 1;
    do
        yield prev;
        // the right hand side is evaluated before either
        // variable is assigned, so no temporary is needed
        (prev, current) = (current, prev + current);
    od
si

factorial() -> Pipe[int] is
    let n mut = 0;
    let current mut = 1;
    do
        yield current;
        (n, current) = (n + 1, current * (n + 1));
    od
si

// a generator is a Pipe, so the pipe operations compose
// onto it directly
write_line("first 10 fibonacci numbers: {fibonacci() |> take(10)}");
write_line("first 10 factorial numbers: {factorial() |> take(10)}");

let first_10_even =
    fibonacci()
        |> filter(x => x % 2 == 0)
        |> take(10);

write_line("first 10 even fibonacci numbers: {first_10_even}");

// take(10) bounds the infinite generators so the loop ends
let indexed =
    fibonacci()
        |> zip(factorial())
        |> take(10)
        |> index();

for (i, (fib, fact)) in indexed do
    write_line("fibonacci {i} is {fib}");
    write_line("factorial {i} is {fact}");
od
```

output:

```
first 10 fibonacci numbers: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
first 10 factorial numbers: 1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880
first 10 even fibonacci numbers: 0, 2, 8, 34, 144, 610, 2584, 10946, 46368, 196418
fibonacci 0 is 0
factorial 0 is 1
fibonacci 1 is 1
factorial 1 is 1
fibonacci 2 is 1
factorial 2 is 2
fibonacci 3 is 2
factorial 3 is 6
fibonacci 4 is 3
factorial 4 is 24
fibonacci 5 is 5
factorial 5 is 120
fibonacci 6 is 8
factorial 6 is 720
fibonacci 7 is 13
factorial 7 is 5040
fibonacci 8 is 21
factorial 8 is 40320
fibonacci 9 is 34
factorial 9 is 362880
```

**calculator: generics**

```ghul
use IO.Std.write_line;

use Collections.MAP;

// operations on values of some type T
trait Operation[T] is
    execute(left: T, right: T) -> T;
si

// a calculator over any T, given named operations on T
class CALCULATOR[T] is
    _operations: MAP[string, Operation[T]];

    init(operations: Collections.Iterable[(name: string, operation: Operation[T])]) is
        _operations = MAP[string, Operation[T]]();
        for (name, operation) in operations do
            _operations.add(name, operation);
        od
    si

    calculate(name: string, left: T, right: T) -> T =>
        _operations[name].execute(left, right);
si

class INT_ADD(): Operation[int] is
    execute(left: int, right: int) -> int => left + right;
si

class INT_MULTIPLY(): Operation[int] is
    execute(left: int, right: int) -> int => left * right;
si

class STRING_APPEND(): Operation[string] is
    execute(left: string, right: string) -> string => "{left}{right}";
si

// the same generic calculator, instantiated at two types
let ints = CALCULATOR([("+", INT_ADD()), ("*", INT_MULTIPLY())]);

write_line("3 + 4 = {ints.calculate("+", 3, 4)}");
write_line("3 * 4 = {ints.calculate("*", 3, 4)}");

let strings = CALCULATOR([("+", STRING_APPEND())]);

write_line("ghūl + lang = {strings.calculate("+", "ghūl", "lang")}");
```

output:

```
3 + 4 = 7
3 * 4 = 12
ghūl + lang = ghūllang
```

**optionals: `T?` + narrowing**

```ghul
use IO.Std.write_line;

// T? marks a value that can be absent. a non-optional T
// never holds null, and the compiler keeps the two apart
find_user(id: int) -> string? =>
    if id == 1 then
        "alice"
    elif id == 2 then
        "bob"
    else
        null
    fi;

greet(id: int) is
    let name = find_user(id);

    // name is string? here; testing it narrows it to
    // string inside the branch, so no unwrap is needed
    if ► name? then
        write_line("hello, {name}");
    else
        write_line("user {id} not found");
    fi
si

greet(1);
greet(2);
greet(3);

// if let tests and reads the value in one step
if let name = find_user(1) then
    write_line("found: {name}");
fi

// ?? falls back when the value is absent
let display = find_user(42) ?? "guest";
write_line("signed in as {display}");
```

output:

```
hello, alice
hello, bob
user 3 not found
found: alice
signed in as guest
```

So is this one:

```ghul
IO.Std.write_line("hello, world");
```

output:

```
hello, world
```

A file with no namespace runs its top-level statements as the program's entry point, so a program needs no other ceremony until it grows enough to want some.

## features

- **functional programming**: first-class anonymous functions with closures, higher order functions, and non-mutating pipe operations over lists. Arrays, tuples, and list literals are immutable.

- **expression-oriented**: `if`, `if let`, `case`, loops, and block forms are expressions, and a block body's unterminated last value-producing statement is its value.

- **pattern matching**: `if let` and `case`/`when` arms with type tests, destructuring with literal leaves, and value lists. `case` arms over a union, enum, `bool`, or closed class hierarchy are checked for exhaustiveness; open-domain scrutinees need `else`.

- **OOP**: classes, structs, traits, inheritance, polymorphism, properties, and indexers.

- **type inference**: local variables, loop variables, destructured variables, anonymous function parameter and return types, and generic type arguments at call sites are inferred from initializers and use sites. Inference is bidirectional and iterative within a function body.

- **type narrowing**: union variant tests, `isa` checks, null checks, and `if let` narrow a local variable's type within the code the check covers.

- **generics**: types, methods, and functions can have generic type parameters. Traits can be declared covariant or contravariant with `[T: out]` / `[T: in]`; variance on imported .NET generics is read from metadata.

- **generators**: functions returning `Pipe[T]` can use `yield` to produce a sequence of values lazily.

- **async/await**: functions returning `Tasks.TASK[T]` can use `await` to wait on a task and resume with its result.

- **.NET integration**: ghūl targets .NET, producing and consuming NuGet packages and inter-operating with other .NET languages.

- **error handling**: `try`/`catch`/`finally` over .NET exceptions.

- **type safety**: ghūl enforces type safety at compile-time.

## why ghūl?

Why not 🤔

ghūl is mainly an opportunity for [me](https://github.com/degory) to experiment with programming language design. Apart from a slightly quirky syntax, ghūl is a fairly conventional programming language. It is a hobby project maintained by a single person, but its goal is to be sufficiently expressive for general-purpose development, and the self-hosting compiler is the working test of that goal.

The language, compiler, tools, and this website are all a **work-in-progress**: whatever the [ghūl compiler](https://github.com/degory/ghul) accepts is currently the definitive ghūl language reference.
