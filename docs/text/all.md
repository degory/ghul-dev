# the ghūl programming language

Every page of [https://ghul.dev](https://ghul.dev), in sidebar order, as plain Markdown.
Each page is also published on its own, as
`https://ghul.dev/text/<page>.md`.

Code samples are the ones the site displays. An example that produced
output or compiler diagnostics carries them beneath it. `…` marks
surrounding scaffolding the page hides, and `►` / `◄` are the narrowing
hints the site shows inline. Syntax colour and hover tooltips are the
only things dropped.

## contents

- [overview](#index) - https://ghul.dev/
- [getting started](#getting-started) - https://ghul.dev/getting-started
- [expression oriented programming](#expression-oriented-programming) - https://ghul.dev/expression-oriented-programming
- [functional programming](#functional-programming) - https://ghul.dev/functional-programming
- [object oriented programming](#object-oriented-programming) - https://ghul.dev/object-oriented-programming
- [unions and pattern matching](#unions-and-pattern-matching) - https://ghul.dev/unions-and-pattern-matching
- [generics](#generics) - https://ghul.dev/generics
- [optional types and narrowing](#optionals-and-narrowing) - https://ghul.dev/optionals-and-narrowing
- [async and generators](#async-and-generators) - https://ghul.dev/async-and-generators
- [.NET integration](#dotnet-integration) - https://ghul.dev/dotnet-integration
- [runtime library](#runtime-library) - https://ghul.dev/runtime-library
- [tooling](#tooling) - https://ghul.dev/tooling
- [language basics](#language-basics) - https://ghul.dev/language-basics
- [syntax](#syntax) - https://ghul.dev/syntax
- [definitions](#definitions) - https://ghul.dev/definitions
- [expressions](#expressions) - https://ghul.dev/expressions
- [control flow](#control-flow) - https://ghul.dev/control-flow
- [optional types](#optional-types) - https://ghul.dev/optional-types
- [type narrowing](#type-narrowing) - https://ghul.dev/type-narrowing
- [type inference](#type-inference) - https://ghul.dev/type-inference
- [grammar](#grammar) - https://ghul.dev/grammar
- [known issues](#known-issues) - https://ghul.dev/known-issues
- [tasks](#rosetta/index) - https://ghul.dev/rosetta/
- [implementation](#implementation) - https://ghul.dev/implementation
- [history](#history) - https://ghul.dev/history
- [resources](#resources) - https://ghul.dev/resources
- [100 doors](#rosetta/100-doors) - https://ghul.dev/rosetta/100-doors
- [Averages/Arithmetic mean](#rosetta/arithmetic-mean) - https://ghul.dev/rosetta/arithmetic-mean
- [Binary digits](#rosetta/binary-digits) - https://ghul.dev/rosetta/binary-digits
- [Factorial](#rosetta/factorial) - https://ghul.dev/rosetta/factorial
- [FizzBuzz](#rosetta/fizzbuzz) - https://ghul.dev/rosetta/fizzbuzz
- [Hello world/Text](#rosetta/hello-world-text) - https://ghul.dev/rosetta/hello-world-text
- [Quine](#rosetta/quine) - https://ghul.dev/rosetta/quine
- [Reverse a string](#rosetta/reverse-a-string) - https://ghul.dev/rosetta/reverse-a-string
- [Towers of Hanoi](#rosetta/towers-of-hanoi) - https://ghul.dev/rosetta/towers-of-hanoi
- [Accumulator factory](#rosetta/accumulator-factory) - https://ghul.dev/rosetta/accumulator-factory
- [Anonymous recursion](#rosetta/anonymous-recursion) - https://ghul.dev/rosetta/anonymous-recursion
- [Apply a callback to an array](#rosetta/apply-a-callback-to-an-array) - https://ghul.dev/rosetta/apply-a-callback-to-an-array
- [Catamorphism](#rosetta/catamorphism) - https://ghul.dev/rosetta/catamorphism
- [Church numerals](#rosetta/church-numerals) - https://ghul.dev/rosetta/church-numerals
- [Closures/Value capture](#rosetta/closures-value-capture) - https://ghul.dev/rosetta/closures-value-capture
- [Cumulative standard deviation](#rosetta/cumulative-standard-deviation) - https://ghul.dev/rosetta/cumulative-standard-deviation
- [First-class functions](#rosetta/first-class-functions) - https://ghul.dev/rosetta/first-class-functions
- [Jensen's Device](#rosetta/jensens-device) - https://ghul.dev/rosetta/jensens-device
- [Man or boy test](#rosetta/man-or-boy-test) - https://ghul.dev/rosetta/man-or-boy-test
- [Mutual recursion](#rosetta/mutual-recursion) - https://ghul.dev/rosetta/mutual-recursion
- [Nested function](#rosetta/nested-function) - https://ghul.dev/rosetta/nested-function
- [Variadic function](#rosetta/variadic-function) - https://ghul.dev/rosetta/variadic-function
- [Y combinator](#rosetta/y-combinator) - https://ghul.dev/rosetta/y-combinator
- [Abstract type](#rosetta/abstract-type) - https://ghul.dev/rosetta/abstract-type
- [Algebraic data types](#rosetta/algebraic-data-types) - https://ghul.dev/rosetta/algebraic-data-types
- [Arithmetic evaluation](#rosetta/arithmetic-evaluation) - https://ghul.dev/rosetta/arithmetic-evaluation
- [Flatten a list](#rosetta/flatten-a-list) - https://ghul.dev/rosetta/flatten-a-list
- [Generic swap](#rosetta/generic-swap) - https://ghul.dev/rosetta/generic-swap
- [Multiple distinct objects](#rosetta/multiple-distinct-objects) - https://ghul.dev/rosetta/multiple-distinct-objects
- [Null object](#rosetta/null-object) - https://ghul.dev/rosetta/null-object
- [Quaternion](#rosetta/quaternion) - https://ghul.dev/rosetta/quaternion
- [Queue/Definition](#rosetta/queue-definition) - https://ghul.dev/rosetta/queue-definition
- [S-expressions](#rosetta/s-expressions) - https://ghul.dev/rosetta/s-expressions
- [Ternary logic](#rosetta/ternary-logic) - https://ghul.dev/rosetta/ternary-logic
- [Amb](#rosetta/amb) - https://ghul.dev/rosetta/amb
- [Balanced brackets](#rosetta/balanced-brackets) - https://ghul.dev/rosetta/balanced-brackets
- [Calkin-Wilf sequence](#rosetta/calkin-wilf-sequence) - https://ghul.dev/rosetta/calkin-wilf-sequence
- [EKG sequence convergence](#rosetta/ekg-sequence-convergence) - https://ghul.dev/rosetta/ekg-sequence-convergence
- [Fibonacci sequence](#rosetta/fibonacci-sequence) - https://ghul.dev/rosetta/fibonacci-sequence
- [Fusc sequence](#rosetta/fusc-sequence) - https://ghul.dev/rosetta/fusc-sequence
- [Hailstone sequence](#rosetta/hailstone-sequence) - https://ghul.dev/rosetta/hailstone-sequence
- [Intersecting number wheels](#rosetta/intersecting-number-wheels) - https://ghul.dev/rosetta/intersecting-number-wheels
- [Kolakoski sequence](#rosetta/kolakoski-sequence) - https://ghul.dev/rosetta/kolakoski-sequence
- [Look-and-say sequence](#rosetta/look-and-say-sequence) - https://ghul.dev/rosetta/look-and-say-sequence
- [Ordered partitions](#rosetta/ordered-partitions) - https://ghul.dev/rosetta/ordered-partitions
- [Same fringe](#rosetta/same-fringe) - https://ghul.dev/rosetta/same-fringe
- [Stern-Brocot sequence](#rosetta/stern-brocot-sequence) - https://ghul.dev/rosetta/stern-brocot-sequence
- [Tree traversal](#rosetta/tree-traversal) - https://ghul.dev/rosetta/tree-traversal
- [Van der Corput sequence](#rosetta/van-der-corput-sequence) - https://ghul.dev/rosetta/van-der-corput-sequence
- [Van Eck sequence](#rosetta/van-eck-sequence) - https://ghul.dev/rosetta/van-eck-sequence
- [Achilles numbers](#rosetta/achilles-numbers) - https://ghul.dev/rosetta/achilles-numbers
- [Ackermann function](#rosetta/ackermann-function) - https://ghul.dev/rosetta/ackermann-function
- [Additive primes](#rosetta/additive-primes) - https://ghul.dev/rosetta/additive-primes
- [Almost prime](#rosetta/almost-prime) - https://ghul.dev/rosetta/almost-prime
- [Amicable pairs](#rosetta/amicable-pairs) - https://ghul.dev/rosetta/amicable-pairs
- [Anti-primes](#rosetta/anti-primes) - https://ghul.dev/rosetta/anti-primes
- [Descending primes](#rosetta/descending-primes) - https://ghul.dev/rosetta/descending-primes
- [Gapful numbers](#rosetta/gapful-numbers) - https://ghul.dev/rosetta/gapful-numbers
- [Gray code](#rosetta/gray-code) - https://ghul.dev/rosetta/gray-code
- [Greatest common divisor](#rosetta/greatest-common-divisor) - https://ghul.dev/rosetta/greatest-common-divisor
- [Haversine formula](#rosetta/haversine-formula) - https://ghul.dev/rosetta/haversine-formula
- [Iterated digits squaring](#rosetta/iterated-digits-squaring) - https://ghul.dev/rosetta/iterated-digits-squaring
- [Juggler sequence](#rosetta/juggler-sequence) - https://ghul.dev/rosetta/juggler-sequence
- [Kaprekar numbers](#rosetta/kaprekar-numbers) - https://ghul.dev/rosetta/kaprekar-numbers
- [Ludic numbers](#rosetta/ludic-numbers) - https://ghul.dev/rosetta/ludic-numbers
- [Map range](#rosetta/map-range) - https://ghul.dev/rosetta/map-range
- [Negative base numbers](#rosetta/negative-base-numbers) - https://ghul.dev/rosetta/negative-base-numbers
- [Numbers with equal rises and falls](#rosetta/numbers-with-equal-rises-and-falls) - https://ghul.dev/rosetta/numbers-with-equal-rises-and-falls
- [Ormiston pairs](#rosetta/ormiston-pairs) - https://ghul.dev/rosetta/ormiston-pairs
- [Pernicious numbers](#rosetta/pernicious-numbers) - https://ghul.dev/rosetta/pernicious-numbers
- [Population count](#rosetta/population-count) - https://ghul.dev/rosetta/population-count
- [Radical of an integer](#rosetta/radical-of-an-integer) - https://ghul.dev/rosetta/radical-of-an-integer
- [Roman numerals/Encode](#rosetta/roman-numerals-encode) - https://ghul.dev/rosetta/roman-numerals-encode
- [Semiprime](#rosetta/semiprime) - https://ghul.dev/rosetta/semiprime
- [Sieve of Eratosthenes](#rosetta/sieve-of-eratosthenes) - https://ghul.dev/rosetta/sieve-of-eratosthenes
- [Sphenic numbers](#rosetta/sphenic-numbers) - https://ghul.dev/rosetta/sphenic-numbers
- [Taxicab numbers](#rosetta/taxicab-numbers) - https://ghul.dev/rosetta/taxicab-numbers
- [Truncatable primes](#rosetta/truncatable-primes) - https://ghul.dev/rosetta/truncatable-primes
- [Undulating numbers](#rosetta/undulating-numbers) - https://ghul.dev/rosetta/undulating-numbers
- [Zeckendorf number representation](#rosetta/zeckendorf-number-representation) - https://ghul.dev/rosetta/zeckendorf-number-representation
- [ABC problem](#rosetta/abc-problem) - https://ghul.dev/rosetta/abc-problem
- [Align columns](#rosetta/align-columns) - https://ghul.dev/rosetta/align-columns
- [Camel case and snake case](#rosetta/camel-case-and-snake-case) - https://ghul.dev/rosetta/camel-case-and-snake-case
- [Entropy](#rosetta/entropy) - https://ghul.dev/rosetta/entropy
- [Jaro similarity](#rosetta/jaro-similarity) - https://ghul.dev/rosetta/jaro-similarity
- [Levenshtein distance](#rosetta/levenshtein-distance) - https://ghul.dev/rosetta/levenshtein-distance
- [Palindrome detection](#rosetta/palindrome-detection) - https://ghul.dev/rosetta/palindrome-detection
- [Pangram checker](#rosetta/pangram-checker) - https://ghul.dev/rosetta/pangram-checker
- [Run-length encoding](#rosetta/run-length-encoding) - https://ghul.dev/rosetta/run-length-encoding
- [Damm algorithm](#rosetta/damm-algorithm) - https://ghul.dev/rosetta/damm-algorithm
- [Dinesman's multiple-dwelling problem](#rosetta/dinesmans-multiple-dwelling-problem) - https://ghul.dev/rosetta/dinesmans-multiple-dwelling-problem
- [Forward difference](#rosetta/forward-difference) - https://ghul.dev/rosetta/forward-difference
- [Huffman coding](#rosetta/huffman-coding) - https://ghul.dev/rosetta/huffman-coding
- [Josephus problem](#rosetta/josephus-problem) - https://ghul.dev/rosetta/josephus-problem
- [Non-continuous subsequences](#rosetta/non-continuous-subsequences) - https://ghul.dev/rosetta/non-continuous-subsequences
- [Power set](#rosetta/power-set) - https://ghul.dev/rosetta/power-set
- [Smith–Waterman algorithm](#rosetta/smith-waterman-algorithm) - https://ghul.dev/rosetta/smith-waterman-algorithm
- [Sorting algorithms/Quicksort](#rosetta/sorting-algorithms-quicksort) - https://ghul.dev/rosetta/sorting-algorithms-quicksort
- [Topswops](#rosetta/topswops) - https://ghul.dev/rosetta/topswops
- [Water collected between towers](#rosetta/water-collected-between-towers) - https://ghul.dev/rosetta/water-collected-between-towers

---

<a id="index"></a>


#  ghūl programming language

<img class="ghul-logo" src="/ghul-logo-draft.png" alt="ghūl programming language logo" />

ghūl (pronounced 'ghoul') is a statically typed, general-purpose programming language that compiles to .NET 10. It produces ordinary .NET assemblies and NuGet packages, and ghūl code can call any .NET library. The [ghūl compiler](https://github.com/degory/ghul) is written in ghūl - about 120,000 lines of it - and compiles itself.

The language is under active development: whatever the compiler accepts is currently the definitive language reference.

## examples

> **editable examples**
>
> Every example on this site is a complete program you can change and run in place: click the pencil, edit, and run. Output and any compiler errors appear in the panel beneath.
>
> Edits live only in the page - to keep something, paste it into the [ghūl scratchpad](https://github.com/degory/ghul-scratchpad)'s `main.ghul`: a one-file project that opens in a GitHub Codespace with the compiler ready, or that you can clone on your own machine.

**fibonacci: streams + `|>`**

```ghul
use IO.Std.write_line
use Ghul.Pipes

// lazily generates an infinite sequence of
// fibonacci numbers. the state is a (prev, current)
// tuple; each step yields prev and builds the next state:
let fibonacci_sequence = stream(
    (0, 1),
    ((prev, current)) =>
        prev || (current, prev + current)
)

// lazily generates an infinite sequence of
// factorials. the state is an (n, factorial of n) tuple:
let factorial_sequence = stream(
    (0, 1),
    ((n, current)) =>
        current || (n + 1, current * (n + 1))
)

let first_10_fib = fibonacci_sequence |> take(10)
let first_10_fact = factorial_sequence |> take(10)

let first_10_even =
    fibonacci_sequence
        |> filter(x => x % 2 == 0)
        |> take(10)

write_line(
    "first 10 fibonacci numbers: {first_10_fib}"
)
write_line(
    "first 10 factorial numbers: {first_10_fact}"
)
write_line(
    "first 10 even fibonacci numbers: {first_10_even}"
)

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
    )
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
use IO.Std.write_line

// a trait for rendering an expression as a string
trait ▼ Renderable is
    ◆▼ render() -> string
si

// an abstract expression: body-less eval and render
// make the class abstract, so only the subclasses below
// can be constructed
class ◆▼ Expr: Renderable is
    ◆▼ eval() -> int
    ◆▲▼ render() -> string
si

class NUM(value: int): Expr is
    ▲ eval() -> int => value
    ▲ render() -> string => "{value}"
si

class ADD(left: Expr, right: Expr): Expr is
    ▲ eval() -> int => left.eval() + right.eval()
    ▲ render() -> string => "({left.render()} + {right.render()})"
si

class MUL(left: Expr, right: Expr): Expr is
    ▲ eval() -> int => left.eval() * right.eval()
    ▲ render() -> string => "({left.render()} * {right.render()})"
si

// (2 * (3 + 4)) = 14
let expression = MUL(NUM(2), ADD(NUM(3), NUM(4)))

write_line("{expression.render()} = {expression.eval()}")

// any of the classes above satisfies Renderable, so a
// value held at the trait renders whatever it really is
let renderables: Renderable[] = [NUM(7), expression]

for r in renderables do
    write_line(r.render())
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
use IO.Std.write_line

// an expression is one of three variants
union Expr is
    NUM(value: int)
    ADD(left: Expr, right: Expr)
    MUL(left: Expr, right: Expr)
si

use Expr.NUM
use Expr.ADD
use Expr.MUL

// evaluate an expression, recursing into the children
eval(e: Expr) -> int =>
    case ► e
    when n: NUM then n.value
    when a: ADD then eval(a.left) + eval(a.right)
    when m: MUL then eval(m.left) * eval(m.right)
    esac

// render an expression, recursing into the children
render(e: Expr) -> string =>
    case ► e
    when n: NUM then "{n.value}"
    when a: ADD then "({render(a.left)} + {render(a.right)})"
    when m: MUL then "({render(m.left)} * {render(m.right)})"
    esac

// (2 * (3 + 4)) = 14
let expression = MUL(NUM(2), ADD(NUM(3), NUM(4)))

write_line("{render(expression)} = {eval(expression)}")
```

output:

```
(2 * (3 + 4)) = 14
```

**fibonacci: generators + pipes**

```ghul
use IO.Std.write_line
use Ghul.Pipes

// a generator: a function returning Pipe[T] that yields.
// each yield produces the next value and pauses until the
// caller asks for another, so this sequence is infinite
// but only ever computed as far as it is consumed
fibonacci() -> Pipe[int] is
    let prev mut = 0
    let current mut = 1
    do
        yield prev
        // the right hand side is evaluated before either
        // variable is assigned, so no temporary is needed
        (prev, current) = (current, prev + current)
    od
si

factorial() -> Pipe[int] is
    let n mut = 0
    let current mut = 1
    do
        yield current
        (n, current) = (n + 1, current * (n + 1))
    od
si

// a generator is a Pipe, so the pipe operations compose
// onto it directly
write_line("first 10 fibonacci numbers: {fibonacci() |> take(10)}")
write_line("first 10 factorial numbers: {factorial() |> take(10)}")

let first_10_even =
    fibonacci()
        |> filter(x => x % 2 == 0)
        |> take(10)

write_line("first 10 even fibonacci numbers: {first_10_even}")

// take(10) bounds the infinite generators so the loop ends
let indexed =
    fibonacci()
        |> zip(factorial())
        |> take(10)
        |> index()

for (i, (fib, fact)) in indexed do
    write_line("fibonacci {i} is {fib}")
    write_line("factorial {i} is {fact}")
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
use IO.Std.write_line

use Collections.MAP

// operations on values of some type T
trait ▼ Operation[T] is
    ◆▼ execute(left: T, right: T) -> T
si

// a calculator over any T, given named operations on T
class CALCULATOR[T] is
    _operations: MAP[string, Operation[T]]

    init(operations: Collections.Iterable[(name: string, operation: Operation[T])]) is
        _operations = MAP[string, Operation[T]]()
        for (name, operation) in operations do
            _operations.add(name, operation)
        od
    si

    calculate(name: string, left: T, right: T) -> T =>
        _operations[name].execute(left, right)
si

class INT_ADD(): Operation[int] is
    ▲ execute(left: int, right: int) -> int => left + right
si

class INT_MULTIPLY(): Operation[int] is
    ▲ execute(left: int, right: int) -> int => left * right
si

class STRING_APPEND(): Operation[string] is
    ▲ execute(left: string, right: string) -> string => "{left}{right}"
si

// the same generic calculator, instantiated at two types
let ints = CALCULATOR([("+", INT_ADD()), ("*", INT_MULTIPLY())])

write_line("3 + 4 = {ints.calculate("+", 3, 4)}")
write_line("3 * 4 = {ints.calculate("*", 3, 4)}")

let strings = CALCULATOR([("+", STRING_APPEND())])

write_line("ghūl + lang = {strings.calculate("+", "ghūl", "lang")}")
```

output:

```
3 + 4 = 7
3 * 4 = 12
ghūl + lang = ghūllang
```

**optionals: `T?` + narrowing**

```ghul
use IO.Std.write_line

// T? marks a value that can be absent. a non-optional T
// never holds null, and the compiler keeps the two apart
find_user(id: int) -> string? =>
    if id == 1 then
        "alice"
    elif id == 2 then
        "bob"
    else
        null
    fi

greet(id: int) is
    let name = find_user(id)

    // name is string? here; testing it narrows it to
    // string inside the branch, so no unwrap is needed
    if ► name? then
        write_line("hello, {name}")
    else
        write_line("user {id} not found")
    fi
si

greet(1)
greet(2)
greet(3)

// if let tests and reads the value in one step
if let name = find_user(1) then
    write_line("found: {name}")
fi

// ?? falls back when the value is absent
let display = find_user(42) ?? "guest"
write_line("signed in as {display}")
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
IO.Std.write_line("hello, world")
```

output:

```
hello, world
```

A file with no namespace runs its top-level statements as the program's entry point, so a program needs no other ceremony until it grows enough to want some.

To write ghūl on your own machine, see [getting started](https://ghul.dev/getting-started): a ghūl repository pins the compiler as a local .NET tool, so the compiler arrives with the code. The [tour](https://ghul.dev/expression-oriented-programming) walks through the language a topic at a time.

## features

- **statically typed** - every expression has a compile-time type, and a type mismatch is a compile error.

- **type inference** - inside function bodies, types are almost always inferred. A written type is a choice - widening a variable, testing a value - not a requirement; signatures are always explicit.

- **type narrowing** - a value's type follows control flow. `isa` checks, null checks, union variant tests, and `if let` narrow whatever was tested - a local, a field, or a whole member-access path - within the code the check covers.

- **pattern matching** - refutable patterns match by type and by value, with exhaustiveness checking. `case` arms over closed domains - a union, an enum, `bool`, a closed class hierarchy - are checked for coverage; open domains need `else`.

- **expression-oriented** - `if`, `case`, loops, and blocks are expressions: each yields a value, so a computation can be written as one expression rather than a sequence of assignments.

- **functional and object-oriented** - first-class functions with closures and non-mutating pipe operations sit alongside classes, structs, traits, and inheritance. Neither style is second-class.

- **lazy sequences and asynchrony** - generator functions `yield` sequences on demand, and asynchronous functions `await` .NET tasks in the conventional way.

- **.NET integration** - ghūl produces and consumes NuGet packages and inter-operates with other .NET languages, so the whole .NET ecosystem is available from day one.

Alongside the expected staples: generics with declaration-site variance, optional types, properties and indexers, `try`/`catch`/`finally` over .NET exceptions - all covered in the [tour](https://ghul.dev/expression-oriented-programming) and the reference pages.


---

<a id="getting-started"></a>

# getting started

There are three ways to start writing ghūl: in the browser, in a GitHub Codespace, or on your own machine.

## in the browser

The [ghūl playground](https://playground.ghul.dev) compiles and runs ghūl in your browser, with live errors, completion and hover as you type. There is nothing to install. It is what runs the editable examples on this site, and its own menu offers complete programs to start from.

## in a Codespace

The [ghūl scratchpad](https://github.com/degory/ghul-scratchpad) is a minimal one-file project: open it in a GitHub Codespace and it arrives with the .NET SDK, the compiler and the language extension ready to go. Paste any example from this site into `main.ghul` and `dotnet run`. This needs a GitHub account and nothing else.

The [examples repository](https://github.com/degory/ghul-examples) works the same way, with fuller, runnable examples organised by topic.

Both repositories are configured as [dev containers](https://containers.dev), so the same ready-made environment also opens in VS Code with the Dev Containers extension, or in any other tool that supports them.

## on your own machine

To work locally you need the [.NET 10 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/10.0) and an editor, and some ghūl code to start from - clone the scratchpad or the examples repository above, or start a project of your own from the [repository template](https://github.com/degory/ghul-repository-template). The compiler is pinned in each repository as a local .NET tool, so it arrives with the code: `dotnet tool restore` fetches it.

[Visual Studio Code](https://code.visualstudio.com) with the [ghūl language extension](https://marketplace.visualstudio.com/items?itemName=degory.ghul) gives you errors and warnings as you type, completion, hover, go to definition, rename and formatting. Any editor that can install VS Code extensions gets the same support; other editors can drive the underlying language server directly - see [other editors](https://ghul.dev/tooling.html#other-editors) on the tooling page.

## it's all ordinary .NET

A ghūl project is a normal .NET SDK project. In each repository above you'll find a `.ghulproj` - an MSBuild project file with the usual things in it - and the normal `dotnet` commands work as you'd expect:

```bash
dotnet build
dotnet run
dotnet test
dotnet pack
```

A ghūl project can reference NuGet packages, produce libraries or executables, and be packed and published exactly like a C# project.

To set up a project from scratch, or for more on the template, see [creating a project](https://ghul.dev/tooling.html#creating-a-project) on the tooling page.


---

<a id="expression-oriented-programming"></a>

# expression oriented programming

ghūl supports expression-oriented programming: most control-flow constructs produce a value, so they can be assigned to a local variable, returned, or passed as an argument. With expression bodies on functions and methods, a computation can read as one value-producing expression rather than a sequence of assignments.

The constructs are covered in full elsewhere: [if](https://ghul.dev/expressions#conditional) and [case](https://ghul.dev/expressions#case-expression) as expressions on the expressions page, and the [if](https://ghul.dev/control-flow#if-statement) and [case](https://ghul.dev/control-flow#case-statement) statement forms under control flow. This page shows them working together.

## if as an expression

An `if` yields the value of the chosen branch. Each branch is itself an expression, and the branches agree on a type:

```ghul
…
sign(n: int) -> string =>
    if n < 0 then "negative"
    elif n == 0 then "zero"
    else "positive"
    fi

write_line(sign(-4))
write_line(sign(0))
write_line(sign(7))
```

output:

```
negative
zero
positive
```

## case as an expression

A `case` yields the value of the matched arm. As an expression it needs an `else` arm, so every value is covered:

```ghul
…
day_kind(day: int) -> string =>
    // days run Monday (0) to Sunday (6)
    case day
    when 5, 6 then "weekend"
    else "weekday"
    esac

write_line(day_kind(5))
write_line(day_kind(3))
write_line(day_kind(6))
```

output:

```
weekend
weekday
weekend
```

## loops as expressions

Every loop form yields too, at type `T?`: a `break` with a value produces it, and falling off the end - a false condition, an exhausted iterator - produces the absent value. A search over a sequence is then one expression, and a valued break can carry its result out of nested loops to the outermost one that consumes it:

```ghul
…
// a valued break delivers to the nearest enclosing loop
// that consumes a value, so it can cross the inner,
// statement-form loop on its way out
let rows = [[1, 2, 3], [4, 5, 6]]

let first_even: int? =
    for row in rows do
        for cell in row do
            if cell % 2 == 0 then break cell fi
        od
    od

write_line("{first_even ?? -1}")
```

output:

```
2
```

See [loops as expressions](https://ghul.dev/control-flow.html#loops-as-expressions) for the full rules.

## blocks

A parenthesised block `(statement; ...; value)` runs a sequence of statements and yields a value: its tail expression, or any `return` that targets the block. It gives an expression room for intermediate local variables, loops, and early exits:

```ghul
…
// a block as a let initializer, with room for intermediate locals:
let midpoint = (
    let lo = 10
    let hi = 20
    lo + (hi - lo) / 2
)
write_line("midpoint = {midpoint}")

// a block folding a loop, with a return that yields from the block:
let first_even = (
    for x in [1, 3, 4, 7] do
        if x % 2 == 0 then
            return x
        fi
    od
    -1
)
write_line("first_even = {first_even}")

// a block passed straight as a function argument:
write_line(
    (
        let doubled = midpoint * 2
        "doubled = {doubled}"
    )
)
```

output:

```
midpoint = 15
first_even = 4
doubled = 30
```

A `return` inside the block yields from the block, not from the enclosing function.

## let in

A `let ... in ...` expression introduces one or more local variables scoped to a single trailing expression. It is lighter than a block when a value needs only a local or two:

```ghul
…
hypotenuse_squared(a: int, b: int) -> int =>
    let a2 = a * a, b2 = b * b in a2 + b2

write_line("h2 = {hypotenuse_squared(3, 4)}")
```

output:

```
h2 = 25
```

## every arm is a statement block

Whether a construct is being used as a statement or as an expression changes what happens to the value it produces. It does not change what is written inside it. A loop body, each arm of an `if` / `elif` / `else`, and each arm of a `case` are statement blocks in both uses: they hold a statement list, so an arm can define local variables and run several statements before arriving at its value.

The value an arm produces is its last statement's, on the same rule as a parenthesised block:

```ghul
…
// each arm is a statement block, so it can hold locals and several
// statements; its last statement is the arm's value
grade(mark: int) -> string is
    if mark >= 90 then
        let band = "top band"

        band
    elif mark >= 50 then
        let band = "middle band"

        band
    else
        "low band"
    fi
si

// the same construct used as a statement: the arms are blocks there too
announce(mark: int) is
    if mark >= 50 then
        let verdict = grade(mark)

        write_line("pass: {verdict}")
    else
        write_line("fail")
    fi
si

// a loop body is a statement block whose last value goes nowhere:
// a loop yields through break, not through its body's last statement
total(marks: int[]) -> int is
    let running mut = 0

    for mark in marks do
        running = running + mark
    od

    running
si

write_line(grade(95))
announce(60)
write_line("{total([10, 20, 30])}")
```

output:

```
top band
pass: middle band
60
```

Where the value then goes is what the two uses differ on. An `if` used as an expression takes the value of the arm it chose; the same `if` used as a statement discards it. A loop body is the case where it always goes nowhere, since a loop yields through `break` rather than through its body's last statement.

A terminating `;` on the last statement changes nothing here, or anywhere else: it separates two statements written on one line, and that is all it does.

## block bodies return their tail

A function or method body takes its last statement's value the way an arm does. Where that value's type is assignable to the declared return type, it is the return value on the fall-through path, checked exactly as an explicit `return` would be:

```ghul
…
// the last statement is not terminated, so it is the return value
area(width: int, height: int) -> int is
    let doubled = width * 2
    let trimmed = height - 1

    doubled * trimmed
si

write_line("{area(3, 5)}")
```

output:

```
24
```

A tail of some other non-void type is an error at the tail rather than a silent discard. To evaluate a statement for its effect and throw its value away, write `let _ = doubled * trimmed`.

Because the tail is an ordinary statement position, an `if` or a `case` sitting there is the return value too, and no branch needs its own `return`:

```ghul
…
// an if in tail position is the return value, so no branch needs its own return
classify(n: int) -> string is
    if n < 0 then
        "negative"
    elif n == 0 then
        "zero"
    else
        "positive"
    fi
si

// so is a case
sign_word(n: int) -> string is
    case n
    when 0 then "none"
    when 1 then "one"
    else "many"
    esac
si

write_line("{classify(-4)} {classify(0)} {sign_word(1)}")
```

output:

```
negative zero one
```

Only a statement that produces a value can be a tail. An expression statement, an `if`, a `case` and a parenthesised block all do. A `let`, an assignment, an `assert` and a loop do not, so a body whose last statement is one of those has no value on the fall-through path and returns [the default for its return type](https://ghul.dev/control-flow.html#default-return) instead. A loop is not an exception to [loops as expressions](#loops-as-expressions): it yields to a context that consumes a value, and a function tail is not one, so a `break` with a value there is rejected outright.

Whole bodies can have no tail to take either. A void body discards whatever is left standing at its end, so a method ending in a bare `if` or loop is unaffected. In a generator, falling off the end means the end of the stream rather than a value, and a bare `return` ends it early. A `try` block is not an expression, so a body ending in one is not a tail either.

## expression bodies

A function, method, property, or anonymous function can replace its block body with `=>` and a single expression. That expression can be an `if`, a `case`, or a parenthesised block:

```ghul
…
// expression-bodied free function:
square(n: int) -> int => n * n

class COUNTER is
    _count: int

    init() is si

    // an expression body can be a ( ... ) block:
    bump() -> int => (
        _count = _count + 1
        _count
    )
si

write_line("square(6) = {square(6)}")

let c = COUNTER()
write_line("bump = {c.bump()}")
write_line("bump = {c.bump()}")

// expression-bodied anonymous function:
let twice = (n: int) => n * 2
write_line("twice(21) = {twice(21)}")
```

output:

```
square(6) = 36
bump = 1
bump = 2
twice(21) = 42
```

## composing them

These forms nest, so a block can hold a `case` and an `if`:

```ghul
…
grade(score: int) -> string is
    // a block as a let initializer, composing a case and an if:
    let label = (
        let band =
            case score / 10
            when 10, 9 then "A"
            when 8 then "B"
            when 7 then "C"
            else "F"
            esac

        if band == "F" then "fail" else "pass ({band})" fi
    )

    return label
si

write_line(grade(95))
write_line(grade(82))
write_line(grade(60))
```

output:

```
pass (A)
pass (B)
fail
```


---

<a id="functional-programming"></a>

# functional programming

> **editable examples**
>
> Every example on this page can be edited and run here: click the pencil to open it in an editor, change it, and run it in your browser. Errors, hovers and completions come from the ghūl compiler as you type.
>
> The [ghul-examples repository](https://github.com/degory/ghul-examples/tree/main/examples/functional) has fuller functional-programming examples to build and run locally, in a GitHub Codespace or a dev container.

ghūl supports a functional style of programming: functions are first-class
values, the common data types are read-only by default, unions and pattern
matching model data by cases, and pipes transform sequences without mutating
them.

## first-class functions

Functions are values. A function literal constructs one, and the result can
be called, assigned to a variable, passed to another function, or stored in
a data structure, like any other value:

```ghul
…
let f = i => i * 2
write_line("f(123): {f(123)}")

// assigned to another variable
let g = f
write_line("g(456): {g(456)}")

// passed to another function
let apply_twice = (f, i) => f(f(i))
write_line("apply_twice(f, 7): {apply_twice(f, 7)}")
```

output:

```
f(123): 246
g(456): 912
apply_twice(f, 7): 28
```

## closures

A function literal captures the variables of its enclosing scope. An
immutable `let` is captured by value - a snapshot taken when the literal is
constructed - and a `let mut` is captured by reference, so the function and
the enclosing scope share one live variable that either side can read or
reassign:

```ghul
…
// an immutable let is captured by value
let base = 10
let add_base = n => n + base
write_line("add_base(5): {add_base(5)}")

// a mut variable is captured by reference: the function and
// the enclosing scope share it
let count mut = 0
let next = () => ( count = count + 1; count )

write_line("next(): {next()}")
write_line("next(): {next()}")
write_line("count: {count}")
```

output:

```
add_base(5): 15
next(): 1
next(): 2
count: 2
```

## filter, map, reduce

ghūl pipes provide filter, map and reduce as well as other ways to
work with sequences of values. Each is a global function in
`Ghul.Pipes` taking the sequence as its first argument, so the
[thread-first operator](https://ghul.dev/expressions#thread-first-calls) `|>` feeds one
into the next:

```ghul
…
// map
let doubled = [1, 2, 3, 4, 5] |> map(x => x * 2)
write_line("doubled: {doubled}")

// filter
let evens = [1, 2, 3, 4, 5] |> filter(x => x % 2 == 0)
write_line("evens: {evens}")

// reduce
let sum = [1, 2, 3, 4, 5] |> reduce(0, (acc, x) => acc + x)
write_line("sum: {sum}")
```

output:

```
doubled: 2, 4, 6, 8, 10
evens: 2, 4
sum: 15
```

## recursion

Methods, global functions and anonymous functions can all call themselves
recursively. A named function calls itself by name; an anonymous function
has no name, so the `rec` keyword refers to
the function itself:

```ghul
…
// factorial
let factorial = n rec =>
    if n == 0 then 1 else n * rec(n - 1) fi
write_line("factorial(5): {factorial(5)}")

// fibonacci
let fibonacci = n rec =>
    if n <= 1 then n else rec(n - 1) + rec(n - 2) fi
write_line("fibonacci(10): {fibonacci(10)}")
```

output:

```
factorial(5): 120
fibonacci(10): 55
```

An anonymous function cannot refer to a variable that is not yet defined, so
there is no direct way to write two anonymous functions that call each
other. Write mutually recursive functions as named functions, which can
refer to each other whatever order they are defined in:

```ghul
is_even(n: int) -> bool =>
    if n == 0 then true else is_odd(n - 1) fi

is_odd(n: int) -> bool =>
    if n == 0 then false else is_even(n - 1) fi
```

## read-only by default

While ghūl supports imperative code, it also aims to make pure functions and
predictable shared data low friction: the types and traits below expose no
way to change a value after it is constructed. The guarantee has two limits.
It is shallow: a read-only structure can still hold references to objects
that are themselves mutable. And it binds only ghūl code: code written in
another .NET language is not required to honour it. Within those limits,
data shared through these types cannot be changed by the code you pass it
to.

### lists and maps are read-only views

The standard traits `Collections.List[T]` and `Collections.Map[K, V]` expose
no mutating members. The mutable `LIST` and `MAP` implement them, so a
function that accepts `List[T]` can read the list it is given but cannot
change it.

### arrays are read-only

The ghūl array type `T[]` has no assign indexer: elements can be read but not
replaced. An array literal constructs a plain array, so the same applies to it.

```ghul
…
let numbers = [1, 2, 3, 4, 5]

let element = numbers[3] // elements can be read

numbers[3] = 6
```

diagnostics:

- error: indexer is read-only in int[]

### tuples are immutable

Tuple elements have no assign accessors, and tuples are value types, so a
tuple passed to other code is a copy: nothing can change a tuple you hold.

```ghul
…
let tuple = (1, 2, 3, 4, 5)

let element = tuple.`3 // elements can be read

tuple.`3 = 6
```

diagnostics:

- error: 3: int is not publicly assignable

### unions are read-only

A union value is fixed at construction: variant fields cannot be assigned,
and nothing can change which variant a value holds. Methods can be added to
a union with [`partial` and `impl`
blocks](https://ghul.dev/definitions.html#partial-and-impl-blocks), but each must be pure: a
union method that assigns a field of any object is reported.

### properties are not publicly assignable by default

A property is readable from anywhere but assignable only within its defining
type, unless it is declared `public`:

```ghul
…
struct THING(name: string)
…
let thing = THING("a thing")

thing.name = "change it"
```

diagnostics:

- error: THING.name: string is not publicly assignable

The members a primary constructor generates are ordinary properties, so the
same applies to them: they are set at construction and cannot be publicly
assigned afterwards unless the parameter carries the `public` modifier.

### pipe operations build new sequences

Pipe operations do not mutate their source: `map`, `filter` and the rest
produce a new sequence and leave the input as it was:

```ghul
…
let list = [1, 2, 3, 4, 5]

let doubled = list |> map(x => x * 2)
write_line("doubled: {doubled}")

// the original list is unchanged:
write_line("list: {list |> join(", ")}")
```

output:

```
doubled: 2, 4, 6, 8, 10
list: 1, 2, 3, 4, 5
```

## pure functions

A function or method can carry a postfix `pure` modifier, declaring that it
assigns no field, property, or array element of any object. Most function
bodies are proven pure with no modifier needed; the declaration covers the
rest, and every override of a pure member must itself be pure. A function
*type* can be pure too, so a signature can require that only pure functions
are passed to it:

```ghul
…
// pure: square assigns no field, property, or array element
square(x: int) -> int pure => x * x

// a pure function type: this slot accepts only pure functions
apply(f: (int) -> int pure, x: int) -> int => f(x)

write_line("apply(square, 5): {apply(square, 5)}")
write_line("apply(anonymous, 5): {apply(x => x + 1, 5)}")
```

output:

```
apply(square, 5): 25
apply(anonymous, 5): 6
```

A class or struct can opt in to the same discipline for the whole type:
declared `pure` on its header, every member must be proven or declared not
to assign any field, property, or array element after construction. The
details, including what purity means to [type
narrowing](https://ghul.dev/type-narrowing.html), are under
[methods](https://ghul.dev/definitions.html#methods).

Expression bodies and value-producing `if`, `case`, and parenthesised blocks
help in writing pure functions; see
[expression-oriented programming](https://ghul.dev/expression-oriented-programming).

## higher-order functions

A higher-order function takes another function as an argument, or returns
one. Global functions and methods can do this generically:

### higher-order generic global functions

```ghul
apply[T](f: T -> T, x: T) -> T =>
    f(x)

apply_if[T](f: T -> T, x: T, predicate: T -> bool) -> T =>
    if predicate(x) then f(x) else x fi
```

### higher-order generic methods

```ghul
class HIGHER_ORDER_FUNCTIONS[T] is
    apply(f: T -> T, x: T) -> T static =>
        f(x)

    apply_if(
        f: T -> T, x: T, predicate: T -> bool
    ) -> T static =>
        if predicate(x) then f(x) else x fi
si
```

### higher-order anonymous functions

```ghul
…
let times_2 = x => x * 2
write_line("apply(times_2, 5): {apply(times_2, 5)}")

let square = x => x * x
write_line("apply(square, 5): {apply(square, 5)}")

// higher order function consumes another function:
let apply_twice = (f: int -> int, x) => f(f(x))
write_line(
    "apply_twice(times_2, 5): {apply_twice(times_2, 5)}"
)

// higher order function returns another function:
let create_apply_twice = (f: int -> int) => x => f(f(x))
let apply_twice_times_2 = create_apply_twice(times_2)

write_line(
    "apply_twice_times_2(5): {apply_twice_times_2(5)}"
)
```

output:

```
apply(times_2, 5): 10
apply(square, 5): 25
apply_twice(times_2, 5): 20
apply_twice_times_2(5): 20
```

Anonymous functions take a single concrete type from context; there is no generic equivalent to the two preceding forms. For polymorphic behaviour, declare a generic global function or method.

## function composition

There is no built-in composition operator, but
[operators are ordinary functions](https://ghul.dev/definitions.html#operators), so a
generic `>>` takes two lines to define:

```ghul
…
>>[A, B, C](f: A -> B, g: B -> C) -> A -> C =>
    x => g(f(x))

let times_2 = x => x * 2
let add_1 = x => x + 1

let times_2_then_add_1 = times_2 >> add_1
write_line("times_2_then_add_1(5): {times_2_then_add_1(5)}")

let pipeline = times_2 >> add_1 >> x => "[{x}]"
write_line("pipeline(5): {pipeline(5)}")
```

output:

```
times_2_then_add_1(5): 11
pipeline(5): [11]
```

## currying

A curried function takes its arguments one at a time: each call takes one
argument and returns a function that takes the next. In ghūl that is an
anonymous function that returns another:

```ghul
…
let curried_add = x => y => x + y

write_line("curried_add(5)(3): {curried_add(5)(3)}")

let add_5 = curried_add(5)
write_line("add_5(3): {add_5(3)}")

let add_10 = curried_add(10)
write_line("add_10(3): {add_10(3)}")
```

output:

```
curried_add(5)(3): 8
add_5(3): 8
add_10(3): 13
```

## partial application

Partial application fixes some of a function's arguments and leaves the rest
open. No special syntax is needed: an anonymous function supplies the fixed
arguments:

```ghul
…
let add = (x, y) => x + y

let add_5 = y => add(5, y)
write_line("add_5(3): {add_5(3)}")

let add_10 = y => add(10, y)
write_line("add_10(3): {add_10(3)}")
```

output:

```
add_5(3): 8
add_10(3): 13
```

## union types and pattern matching

A union holds one of several variants, and the `if let` and `case` patterns
take one apart; they are how functional ghūl code models data. A `case` over
a union is checked for exhaustiveness, so covering every variant needs no
`else` arm:

```ghul
…
area(s: Shape) -> double =>
    // case over a union is checked for exhaustiveness: every variant
    // is covered here, so no else arm is needed
    case ► s
    when c: CIRCLE then 3.14159d * c.radius * c.radius
    when q: SQUARE then q.side * q.side
    esac

write_line("{area(CIRCLE(2.0d))}")
write_line("{area(SQUARE(3.0d))}")
```

output:

```
12.56636
9
```

The full construct - guards, destructuring, nesting - has its own page:
[unions and pattern matching](https://ghul.dev/unions-and-pattern-matching.html).

## optional types

An optional type `T?` holds a value that may be absent - the role `Option`
and `Maybe` types play in other languages, built into the type system. `??`
supplies a fallback value, `?.` reads a member only when the receiver is
present, and `if let` tests and unwraps in one step:

```ghul
…
find_first[T](xs: T[], predicate: T -> bool) -> T? is
    for x in xs do
        if predicate(x) then
            return x
        fi
    od

    return null
si

let first_even = find_first([1, 3, 4, 7, 8], n => n % 2 == 0)    // T = int, a value type
let first_long = find_first(["a", "bb", "ccc"], s => s.length > 2) // T = string, a reference type

write_line("first even: {first_even ?? -1}")
write_line("first long: {first_long ?? "none"}")
```

output:

```
first even: 4
first long: ccc
```

Optional types have [their own page](https://ghul.dev/optional-types.html).

## lazy sequences

Lazy infinite and finite sequences are expressed with the
`Ghul.Pipes.STREAM[T, S]` union and the `stream(initial, advance)`
factory. State type `S` and output type `T` are independent, so the
state of a stream is hidden from its consumers; `stream()` returns a
plain `Pipe[T]`.

```ghul
union STREAM[T, S] is
    DONE
    YIELD(value: T, state: S)
si

stream[T, S](
    initial: S,
    advance: S -> STREAM[T, S]
) -> Pipe[T]
```

`advance` is a step function: it receives the current state and returns
either `DONE` (the sequence is over) or `YIELD(value, next_state)`, the
yielded element and the state to feed back in on the next step. The `||`
infix constructs `YIELD(value, next_state)`, so a step body usually reads
`value || next_state`.

```ghul
…
use Ghul.Pipes
use STREAM.DONE
use STREAM.YIELD
…
// counting down. State and output are both int
// the sequence ends when the state reaches zero.
let counting = (n: int) =>
    stream(
        n,
        i =>
            if i == 0 then
                DONE()
            else
                i || (i - 1)
            fi
    )

// fibonacci. State is the named tuple
// (prev, current); output is int. The state and
// output types differ.
let fibonacci = stream(
    (prev = 1, current = 1),
    ((prev, current)) =>
        current || (
            prev = current,
            current = prev + current
        )
)

// factorial. State is (n, prev); output is int.
let factorial = stream(
    (n = 1, prev = 1),
    ((n, prev)) =>
        let next_n = n + 1, next = prev * next_n in
        next || (n = next_n, prev = next)
)

// chars of a string: state is an int cursor,
// output is char. The input string is captured by
// the anonymous function; the integer state is hidden inside
// the resulting Pipe[char].
let chars_of = (s: string) =>
    let xs = s.to_char_array() in
    stream(
        0,
        i =>
            if i == xs.count then
                DONE()
            else
                xs[i] || (i + 1)
            fi
    )

write_line(
    "counting down from 5: {counting(5)}"
)
write_line(
    "first 10 fibonacci numbers: {fibonacci |> take(10)}"
)
write_line(
    "first 10 factorial numbers: {factorial |> take(10)}"
)
write_line("chars of hello: {chars_of("hello")}")

let indexed =
    fibonacci |> zip(factorial) |> take(10) |> index()

for (i, (fib, fact)) in indexed do
    write_line("fibonacci {i} is {fib}")
    write_line("factorial {i} is {fact}")
od
```

output:

```
counting down from 5: 5, 4, 3, 2, 1
first 10 fibonacci numbers: 1, 2, 3, 5, 8, 13, 21, 34, 55, 89
first 10 factorial numbers: 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800
chars of hello: h, e, l, l, o
fibonacci 0 is 1
factorial 0 is 2
fibonacci 1 is 2
factorial 1 is 6
fibonacci 2 is 3
factorial 2 is 24
fibonacci 3 is 5
factorial 3 is 120
fibonacci 4 is 8
factorial 4 is 720
fibonacci 5 is 13
factorial 5 is 5040
fibonacci 6 is 21
factorial 6 is 40320
fibonacci 7 is 34
factorial 7 is 362880
fibonacci 8 is 55
factorial 8 is 3628800
fibonacci 9 is 89
factorial 9 is 39916800
```

Type arguments to `stream` are inferred from the initial-state value
and the anonymous function's yield expression.

The factory returns `Pipe[T]`, so combinators like `take`, `filter`,
`map`, `zip`, and `index` chain straight onto it. The state type does not
appear in that result, so consumers never see how a stream is stepped.

[Generators](https://ghul.dev/async-and-generators.html) are the other way to a lazy
sequence: a function containing `yield` produces its elements on demand,
and its result is a `Pipe[T]` too.


---

<a id="object-oriented-programming"></a>

# object oriented programming

> **editable examples**
>
> Every example on this page can be edited and run here: click the pencil to open it in an editor, change it, and run it in your browser. Errors, hovers and completions come from the ghūl compiler as you type.
>
> The [ghul-examples repository](https://github.com/degory/ghul-examples/tree/main/examples/object-oriented) has fuller object-oriented examples to build and run locally, in a GitHub Codespace or a dev container.

ghūl is a class-based object-oriented language. Classes and structs hold state and behaviour, traits describe shared behaviour, and a value can be used at the type of any ancestor class or trait it satisfies. This page ties those pieces together; [definitions](https://ghul.dev/definitions.html#types) has the syntax for each in isolation.

## classes and objects

A [class](https://ghul.dev/definitions.html#classes) defines a reference type: fields and properties for its state, methods for its behaviour, and one or more `init` constructors. An object is an instance of a class, created by calling the class like a function, as in `POINT(3, 4)`. `self` refers to the current instance inside a method. A class with no declared superclass extends `object`, and objects compare by reference identity unless a class overrides equality.

## encapsulation

There are no `public` or `private` keywords. A leading underscore on a name marks it non-public, and the compiler enforces that for methods and properties: `_balance` is reachable only within its own type and subclasses, while `balance` is public to read. A property is public to read but assignable only within its defining type, so state stays behind the methods that maintain it.

## inheritance

A class extends at most one superclass, named after a colon in the header, and inherits its members. A constructor runs the superclass constructor with `super.init(...)`, and a method replaces an inherited one by declaring it again. A call to that method dispatches on the object's runtime type, so a method inherited from the superclass reaches the override:

```ghul
use IO.Std.write_line

class ◆▼ Animal is
    _name: string
    init(name: string) is _name = name; si

    name: string => _name
    ◆▼ speak() -> string                     // body-less: Animal is implicitly abstract
    describe() -> string => "{_name} says {speak()}"
si

class DOG: Animal is
    init(name: string) is super.init(name); si
    ▲ speak() -> string => "woof"
si

class CAT: Animal is
    init(name: string) is super.init(name); si
    ▲ speak() -> string => "meow"
si

let animals: Animal[] = [DOG("Rex"), CAT("Tom")]

for a in animals do
    write_line(a.describe()) // describe calls the overriding speak
od
```

output:

```
Rex says woof
Tom says meow
```

Calling `describe` through the `Animal[]` is polymorphism: the static type is `Animal`, the behaviour is each subclass's overriding `speak`.

## abstract and closed classes

`speak` above has no body. A class with a body-less instance method is implicitly abstract: it names a method the class can't perform on its own, so constructing the class directly is rejected and only subclasses that supply the method can exist. Marking a class `abstract` has the same effect without a body-less method.

By default a class is closed to subclassing outside its own assembly; the postfix `open` modifier opts in to cross-assembly subclassing. Closing the hierarchy lets the compiler narrow on the `else` edge of an `isa` test, and an `abstract` root can narrow to a single remaining subclass (see [type narrowing](https://ghul.dev/type-narrowing.html)).

## traits

A [trait](https://ghul.dev/definitions.html#traits) is ghūl's interface: a set of members a type promises to provide. A class, struct, or union implements a trait by naming it in the header, and the value can then be used at the trait's type wherever the trait is expected. A class extends one superclass but implements any number of traits. A type can also implement a trait from a separate [`impl … for` block](https://ghul.dev/definitions.html#partial-and-impl-blocks) instead of naming it in the header, which is how a union gains trait methods.

A trait member can provide a default body, which an implementing type inherits and overrides only to change, reaching the original with `super`. Traits combine with generics: a generic trait like `Operation[T]` gives a whole family of implementations one shared shape.

## narrowing

Discovering an object's concrete type at runtime uses `isa` or `if let`, which test the type and narrow the value to it inside the matching branch, and a `case` over a closed hierarchy is checked for exhaustiveness. The [type narrowing](https://ghul.dev/type-narrowing.html) page covers it in full.

## a worked example

```ghul
use IO.Std.write_line
use Ghul.Pipes

let int_calculator = CALCULATOR(
    [
        ("+", INTEGER_ADDITION()),
        ("-", INTEGER_SUBTRACTION()),
        ("*", INTEGER_MULTIPLICATION()),
        ("/", INTEGER_DIVISION())
    ]
)

write_line(
    "1 + 2 = {int_calculator.calculate("+", 1, 2)}"
)
write_line(
    "1 - 2 = {int_calculator.calculate("-", 1, 2)}"
)
write_line(
    "1 * 2 = {int_calculator.calculate("*", 1, 2)}"
)
write_line(
    "1 / 2 = {int_calculator.calculate("/", 1, 2)}"
)

let from_memory =
    int_calculator.calculate_from_memory("-", 3)
write_line("1 + 2 - 3 = {from_memory}")

let string_calculator = CALCULATOR(
    [
        ("+", STRING_CONCATENATION()),
        ("-", STRING_SUBTRACTION())
    ]
)

let concatenated =
    string_calculator.calculate("+", "hello", "world")
write_line("hello + world = {concatenated}")

let subtracted =
    string_calculator.calculate(
        "-", "helloworld", "world"
    )
write_line("helloworld - world = {subtracted}")

string_calculator.clear_memory()

write_line("memory is cleared")

trait ▼ Operation[T] is
    ◆▼ execute(left: T, right: T) -> T
si

class CALCULATOR[T] is
    _operations: Collections.MAP[string, Operation[T]]

    memory: T

    init(
        operations: Collections.Iterable[
            (name: string, operation: Operation[T])
        ]
    ) is
        _operations =
            Collections.MAP(
                operations
                    |> map(
                        on =>
                            let (name, operation) = on in
                            Collections.KeyValuePair(
                                name, operation
                            )
                    )
            )
    si

    calculate(
        operation_name: string, left: T, right: T
    ) -> T =>
        if _operations.contains_key(operation_name) then
            let operation = _operations[operation_name]
            memory = operation.execute(left, right)

            memory
        else
            throw System.InvalidOperationException(
                "invalid operation {operation_name}"
            )
        fi


    calculate_from_memory(
        operation_name: string, right: T
    ) -> T =>
        if _operations.contains_key(operation_name) then
            let operation = _operations[operation_name]
            memory = operation.execute(memory, right)

            memory
        else
            throw System.InvalidOperationException(
                "invalid operation {operation_name}"
            )
        fi

    clear_memory() is
        memory = _
    si
si

class INTEGER_ADDITION(): Operation[int] is
    ▲ execute(left: int, right: int) -> int => left + right
si

class INTEGER_SUBTRACTION(): Operation[int] is
    ▲ execute(left: int, right: int) -> int => left - right
si

class INTEGER_MULTIPLICATION(): Operation[int] is
    ▲ execute(left: int, right: int) -> int => left * right
si

class INTEGER_DIVISION(): Operation[int] is
    ▲ execute(left: int, right: int) -> int =>
        if right == 0 then
            throw System.InvalidOperationException(
                "division by zero"
            )
        else
            left / right
        fi
si

class STRING_CONCATENATION(): Operation[string] is
    ▲ execute(left: string, right: string) -> string =>
        "{left}{right}"
si

class STRING_SUBTRACTION(): Operation[string] is
    ▲ execute(left: string, right: string) -> string =>
        left.replace(right, "")
si
```

output:

```
1 + 2 = 3
1 - 2 = -1
1 * 2 = 2
1 / 2 = 0
1 + 2 - 3 = -3
hello + world = helloworld
helloworld - world = hello
memory is cleared
```


---

<a id="unions-and-pattern-matching"></a>

# unions and pattern matching

> **editable examples**
>
> Every example on this page can be edited and run here: click the pencil to open it in an editor, change it, and run it in your browser. Errors, hovers and completions come from the ghūl compiler as you type.
>
> The ghul-examples repository has fuller [unions](https://github.com/degory/ghul-examples/tree/main/examples/unions) and [pattern-matching](https://github.com/degory/ghul-examples/tree/main/examples/pattern-matching) examples to build and run locally, in a GitHub Codespace or a dev container.

A union holds a value of one of several variants, each with its own set of fields: one type that represents several kinds of data. Pattern matching is how that data comes back out - test which variant a value holds, and read its fields at the narrowed type. The [definitions page](https://ghul.dev/definitions.html#unions) covers the full declaration surface - unit variants, the `default` variant, primary-constructor headers, and traits; this page is about using them, starting with `if let`, which does the test and the read in one step.

```ghul
union Shape is
    CIRCLE(radius: double)
    SQUARE(side: double)
si

union Option[T] is
    SOME(value: T)
    NONE
si

union Result[T, E] is
    OK(value: T)
    ERROR(error: E)
si
```

## matching with if let

`if let` is how the data comes out of a union: a `let` definition in an `if` or `elif` condition tests which variant the value holds, defines a local variable for it, and narrows that variable to the variant. The branch runs only when the test matches, and the variable is in scope inside it, so there is no separate step between checking the variant and reading its fields:

```ghul
union Shape is
    CIRCLE(radius: double)
    SQUARE(side: double)
si
…
area(s: Shape) -> double is
    if let c: CIRCLE = ► s then
        return 3.14159d * c.radius * c.radius
    elif let q: SQUARE = ► s then
        return q.side * q.side
    fi

    return 0.0d
si
```

A chain of `elif let` arms covers a union one variant at a time. Once there are more than a couple of variants, `case` says the same thing in one construct.

## matching with case

A `case` expression matches one scrutinee against several `when` arms, which reads better than a chain of `if let`/`elif let` once there are more than a couple of variants to cover. Over a closed domain - a union's variants, `bool`, an enum, or a class hierarchy closed to the assembly - the compiler checks the arms for exhaustiveness, so `area` needs no fallback return for a variant the `when` arms forgot:

```ghul
…
area(s: Shape) -> double =>
    // case over a union is checked for exhaustiveness: every variant
    // is covered here, so no else arm is needed
    case ► s
    when c: CIRCLE then 3.14159d * c.radius * c.radius
    when q: SQUARE then q.side * q.side
    esac

write_line("{area(CIRCLE(2.0d))}")
write_line("{area(SQUARE(3.0d))}")
```

output:

```
12.56636
9
```

`when` arms accept the same patterns as `if let`: a type test that binds and narrows (`c: CIRCLE`), destructuring with literal leaves and `~`-marked values that match rather than bind, and a trailing `/\` guard that falls through to the next arm on failure.

Equality labels compare by value, the way `=~` compares: over a string scrutinee or any type defining the operator, matching is by content, and `when null` matches absence.

So `case` is the exhaustive counterpart to `if let` rather than a different matching mechanism. See [the case statement](https://ghul.dev/control-flow.html#case-statement) for the full picture.

## option-shaped unions

A union with a single field-carrying variant, or with one variant marked `default`, has only one thing to test, so neither construct is needed: the `?` and `!` operators test whether the value is there and unwrap it directly:

```ghul
…
if ► an_option? then
    let value = an_option!
    write_line("the option holds {value}")
fi
```

output:

```
the option holds 42
```

```ghul
use IO.Std.write_line

union Option[T] is
    SOME(value: T)
    NONE
si

union List[T] is
    NIL
    CONS(head: T, tail: List[T])
si

union Tree[T] is
    LEAF(value: T)
    NODE(left: Tree[T], right: Tree[T])
si

use Option.SOME
use Option.NONE
use List.NIL
use List.CONS
use Tree.LEAF
use Tree.NODE

test_option()
test_list()
test_tree()

test_option() is
    let some_int = SOME(42)
    let none_int = NONE()

    let stringify_option = o rec =>
        if isa SOME( ► o) then
            "{o.value}"
        else
            "none"
        fi

    write_line(stringify_option(some_int))
    write_line(stringify_option(none_int))
si

test_list() is
    let list = CONS(1, CONS(2, CONS(3, NIL())))

    let stringify_list = l rec =>
        if isa CONS( ► l) then
            let (head, tail) = l in
            "{head}, {rec(tail)}"
        else
            "nil"
        fi

    write_line(stringify_list(list))
si

test_tree() is
    let tree = NODE(
        NODE(
            LEAF(1),
            LEAF(2)
        ),
        NODE(
            LEAF(3),
            LEAF(4)
        )
    )

    let stringify_tree = t rec =>
        if isa NODE( ► t) then
            let (left, right) = t in
            "({rec(left)}, {rec(right)})"
        else
            "{t.value}"
        fi

    write_line(stringify_tree(tree))
si
```

output:

```
42
none
1, 2, 3, nil
((1, 2), (3, 4))
```

`Option` here is a union built from scratch to show how the shape works, but everyday code rarely needs to: ghūl's own optional types (`T?`) give you this for free, over reference types, value types, and unconstrained generic types alike - see [optional types](https://ghul.dev/optional-types) for the full picture, including how a user-defined union like this one fits alongside `T?`.

## testing a variant with isa

`if let` defines a new local variable for the value it matches. `isa Variant(value)` is the test on its own: it checks the variant and narrows in the then-branch, with no new name introduced:

```ghul
…
if isa Option.SOME( ► an_option) then
    let value = an_option.value
    write_line("the option holds {value}")
fi
```

output:

```
the option holds 42
```

Because `isa` narrows the value it tests rather than a fresh local variable, it reaches values that an `if let` name does not: a member path such as `shape.outline`, or `self`. See [type narrowing](https://ghul.dev/type-narrowing.html) for the full picture.


---

<a id="generics"></a>

# generics

> **editable examples**
>
> Every example on this page can be edited and run here: click the pencil to open it in an editor, change it, and run it in your browser. Errors, hovers and completions come from the ghūl compiler as you type.
>
> The [ghul-examples repository](https://github.com/degory/ghul-examples/tree/main/examples/generics) has fuller generics examples to build and run locally, in a GitHub Codespace or a dev container.

ghūl supports generic type arguments on
- classes
- structs
- traits
- methods
- unions
- global functions

Type arguments declare a named type, which can be used anywhere within its scope in type expressions.

For example in the following global function, `T` is a type argument, and it can be used within the function's definition and body.
When a particular specialization of `print_something[T](T)` is called, `T` will have whatever actual type argument was supplied

```ghul
…
print_something[T](t: T) => write_line("something is {t}")
```

```ghul
…
print_something[int](1234)
print_something[string]("hello")
```

output:

```
something is 1234
something is hello
```

```ghul
struct HOLD_SOMETHING[T](value: T)
```

```ghul
…
let holds_int = HOLD_SOMETHING(1234)
let holds_string = HOLD_SOMETHING("hello")
```

```ghul
union Option[T] is
    SOME(value: T)
    NONE
si
…
let some_int = Option.SOME(1234)
```

Generic argument types can be inferred from context for generic constructor invocations as well as generic function and method calls

```ghul
…
print_something(1234)
print_something("hello")
```

output:

```
something is 1234
something is hello
```

## type-parameter constraints

A type parameter can have one or more constraints, listed inside its declaration. Constraints both narrow the operations the generic body can perform on values of that type and restrict the actual types that callers can supply. The compiler enforces all constraints, both for ghūl types that declare them and for types imported from .NET assemblies.

### type bound

A type bound `[T: SomeType]` requires the type argument to derive from `SomeType`. Within the generic body, the members of `SomeType` become available on values of type `T`.

```ghul
…
trait ▼ Greetable is
    ◆▼ name: string
si

// T must derive from Greetable, so .name is available on T
greet[T: Greetable](x: T) is
    write_line("hello, {x.name}")
si

class CAT( ▲ name: string): Greetable
…
greet(CAT("whiskers"))
```

output:

```
hello, whiskers
```

A value whose static type is a bounded type parameter also narrows and destructures through the bound, so `isa`, `if let`, and destructuring reach the bound's subtypes and variants directly, with no manual widen to the bound first:

```ghul
use IO.Std.write_line

class ▼ Animal abstract is
    ◆▼ name() -> string
si

class CAT: Animal is
    init() is si
    ▲ name() -> string => "cat"
    purr() -> string => "purr"
si

// T is bounded by Animal, so a T value narrows through Animal with isa
describe[T: Animal](x: T) -> string =>
    if isa CAT( ► x) then x.purr()
    else x.name()
    fi

write_line(describe(CAT()))
```

output:

```
purr
```

Several bounds can be joined with `/\`. The value then behaves as every one of them - a member of any bound is reachable - and the actual type argument has to satisfy each. The comma spelling declares separate type parameters and is not a way to write two bounds:

```ghul
…
trait ▼ Named is
    ◆▼ name: string
si

trait ▼ Sized is
    ◆▼ size: int
si

class CRATE: Named, Sized is
    ▲ name: string
    ▲ size: int

    init(name: string, size: int) is
        self.name = name
        self.size = size
    si
si

// several bounds joined with '/\'
label[T: Named /\ Sized](x: T) -> string =>
    "{x.name} holds {x.size}"

write_line(label(CRATE("bolts", 500)))
```

output:

```
bolts holds 500
```

### members of the bound itself

The *static* members of a bound are reachable through the type parameter itself, written `T.member(...)`. This is how .NET's generic-math interfaces are used, and an operator declared as one of their static virtual members resolves as an ordinary operator once it has been imported by name with `use`:

```ghul
…
// '+' resolves through the bound once it has been imported
total[T: INumber[T]](a: T, b: T) -> T => a + b

write_line("{total(2, 3)} {total(1.5, 2.5)}")
```

output:

```
5 4
```

Without that `use` the operator is not in scope, so nothing changes for code that doesn't ask for it - and importing one does not displace the built-in operators either. Each operator imports from the interface that declares it, so the addition operator comes from `IAdditionOperators` and the unsigned right shift from `IShiftOperators`. Comparison and equality cannot be imported this way - a type says how it orders and compares by defining `<>` and `=~`.

### kind constraint

A kind constraint requires the type argument to be a particular kind of type. Four keywords are recognised:

- `class`: a reference type
- `struct`: a value type
- `optional`: an optional (nullable) type
- `init`: a type exposing an accessible parameterless constructor

```ghul
class CELL[T: struct] is
    value: T
    init(value: T) is self.value = value si
si
```

Kinds combine with each other and with type bounds, space-separated: `[T: Named /\ Sized class init]`.

### constructor constraint

The `init` constraint requires the type argument to expose an accessible parameterless constructor:

```ghul
…
// T: init requires the caller to pass a type with a parameterless constructor
echo[T: init](x: T) -> T => x

class WIDGET() is
    describe() -> string => "a widget"
si

let w = echo(WIDGET())   // OK: WIDGET has init()

write_line(w.describe())
```

output:

```
a widget
```

## variance

Type variance is declared on a *trait*'s type parameters (the CLR permits variance only on interfaces, which is what a ghūl trait compiles to). A `class` or `struct` may not declare variant type parameters.

- `[T: out]`: covariant. `Producer[CAT]` is assignable to `Producer[ANIMAL]` when `CAT` derives from `ANIMAL`. Only legal when `T` appears in *output* positions (return types).
- `[T: in]`: contravariant. `Consumer[ANIMAL]` is assignable to `Consumer[CAT]`. Only legal when `T` appears in *input* positions (parameter types).

```ghul
…
// T: out marks Box[T] as covariant in T - a Box[CAT] is also a Box[Animal]
trait ▼ Box[T: out] is
    ◆▼ contents() -> T
si
…
let cats: Box[CAT] = CAT_BOX()
let animals: Box[Animal] = cats   // covariance

write_line(animals.contents().speak())
```

output:

```
meow
```

Variance is also automatic in two places: a function type is contravariant in its parameter types and covariant in its return type; an array of a reference type is covariant.


---

<a id="optionals-and-narrowing"></a>

# optional types and narrowing

> **editable examples**
>
> Every example on this page can be edited and run here: click the pencil to open it in an editor, change it, and run it in your browser. Errors, hovers and completions come from the ghūl compiler as you type.

A type followed by `?` is an *optional* type: a value of `T?` can be present or absent, and a plain `T` always holds a value. The compiler rejects a `T?` where a `T` is needed, so absence is handled where it can arise, not discovered as a crash somewhere later.

```ghul
…
find_first[T](xs: T[], predicate: T -> bool) -> T? is
    for x in xs do
        if predicate(x) then
            return x
        fi
    od

    return null
si

let first_even = find_first([1, 3, 4, 7, 8], n => n % 2 == 0)    // T = int, a value type
let first_long = find_first(["a", "bb", "ccc"], s => s.length > 2) // T = string, a reference type

write_line("first even: {first_even ?? -1}")
write_line("first long: {first_long ?? "none"}")
```

output:

```
first even: 4
first long: ccc
```

`find_first` returns the first element the predicate accepts, or absent when there is none; `??` supplies a value for the absent case. `?.` reads a member only when the receiver is present, and `!` asserts presence, throwing when the value is absent. For everything else a plain test is enough, because a test narrows.

## a test is enough

`if x?` narrows `x` to its non-optional form inside the branch, so the value reads directly, with no unwrap and no cast:

```ghul
…
let name: string? = lookup()

if ► name? then
    // name is narrowed to non-optional string
    // here, no ! needed
    write_line("hello, {name}")
fi
```

output:

```
hello, world
```

The same applies to types. An `isa` test narrows a value to the tested class or union variant, and over a closed set of possibilities the `else` branch narrows to what remains:

```ghul
…
union Result[T, E] is
    OK(value: T)
    ERR(error: E)
si
…
let r: Result[int, string] = some_call()

if isa Result.OK( ► r) then
    write_line("ok: {r.value}")
else
    // r is narrowed to Result.ERR here
    write_line("err: {r.error}")
fi
```

output:

```
ok: 42
```

Narrowing follows the control flow, not just the branch structure. A guard that returns leaves the code after it narrowed:

```ghul
…
classify(a: Animal) is
    if !isa CAT( ► a) then
        write_line("not a cat")
        return
    fi

    // every non-CAT has returned, so a is
    // narrowed to CAT from here on
    write_line(a.purr())
si

classify(CAT("whiskers"))
classify(DOG())
```

output:

```
whiskers purrs
not a cat
```

And it applies to fields and properties as well as local variables:

```ghul
…
describe(order: ORDER) is
    if ► order.customer? then
        // a presence test narrows the path itself:
        // within this branch order.customer is the
        // non-optional string, so .length is
        // reachable directly
        write_line("customer name has {order.customer.length} chars")
    fi
si

describe(ORDER("alice"))
```

output:

```
customer name has 5 chars
```

> **narrowing inlays**
>
> Open ghūl in an editor with the [ghūl language extension](https://ghul.dev/tooling.html) and small triangle hints mark where narrowing changes: `►` where a value narrows, `◄` where it widens back. The same sigils appear in the code examples on this site.

## the narrowing is checked

A narrowed value can change before it is used: a reassignment, or a call to a function that writes the member the narrowing depends on. The compiler tracks the calls in between and reports a use it cannot prove safe, naming the call; testing the value again, or copying it into a local variable, resolves it. So a narrowing is never a guess that the value is probably still there - it either holds, or the compiler says why not.

[Type narrowing](https://ghul.dev/type-narrowing) covers the machinery: what invalidates a narrowing, what the `pure` modifier declares, and what a `stable` property promises. [Optional types](https://ghul.dev/optional-types) covers the operators, the warnings, and the three run-time representations behind `T?`.


---

<a id="async-and-generators"></a>

# async and generators

> **editable examples**
>
> Every example on this page can be edited and run here: click the pencil to open it in an editor, change it, and run it in your browser. Errors, hovers and completions come from the ghūl compiler as you type.
>
> The ghul-examples repository has fuller [async-await](https://github.com/degory/ghul-examples/tree/main/examples/async-await) and [generators](https://github.com/degory/ghul-examples/tree/main/examples/generators) examples to build and run locally, in a GitHub Codespace or a dev container.

Two kinds of ghūl function suspend and resume instead of running straight through: an asynchronous function waits for tasks without blocking, and a generator produces a sequence lazily, one element per request. Both are declared by their return type alone - `Tasks.TASK[T]` for asynchronous functions, `Pipe[T]` for generators - and the body reads top to bottom either way.

## asynchronous code

A function is asynchronous when its declared return type is `Tasks.TASK[T]` (or `Tasks.TASK`, for one that produces no value).

Inside such a function, `await e` evaluates to the result of the task `e` once it completes. `let x = await e;` assigns the result to a local and the rest of the function continues:

```ghul
…
compute() -> Tasks.TASK[int] is
    let a = await double_async(10)   // a = 20
    let b = await double_async(a)    // b = 40
    let c = await add_async(a, b)    // c = 60

    return c
si

write_line("{compute().result}")
```

output:

```
60
```

`await e;` as a bare statement is the value-less form: it waits for `e` to complete and discards any result. Use it when you only care that the work has finished:

```ghul
…
run_side_effects() -> Tasks.TASK is
    await side_effect("first")
    await side_effect("second")

    return
si

run_side_effects().wait()
```

output:

```
side effect: first
side effect: second
```

`await` can also appear inside the body of a `for` or `while` loop: the loop iterates, awaiting and resuming once per iteration. A `return` from inside an awaiting loop body propagates out through the loop as usual:

```ghul
…
sum_of_squares(xs: Collections.List[int]) -> Tasks.TASK[int] is
    let total mut = 0

    for x in xs do
        let y = await fetch_async(x)
        total = total + y
    od

    return total
si

let result = sum_of_squares([1, 2, 3, 4]).result

write_line("sum_of_squares = {result}")
```

output:

```
sum_of_squares = 30
```

A `try` / `catch` / `finally` around awaiting code works as expected, including a `return` from inside the `try`. What is not yet supported is an `await` inside a `catch` or `finally` handler itself. A faulted task can also be handled at the call site: reading `.result` on a returned task throws the fault as a `System.AggregateException`.

## generators

A function is a generator when its declared return type is `Pipe[T]` (`Ghul.Pipes.Pipe[T]`) and its body contains `yield E;`. Each `yield` produces the next value in the sequence; execution suspends until the caller asks for another value, then resumes from the statement after the `yield`:

```ghul
…
squares(limit: int) -> Ghul.Pipes.Pipe[int] is
    let i mut = 1
    while i <= limit do
        yield i * i
        i = i + 1
    od
si

for s in squares(4) do
    write_line(s)
od
```

output:

```
1
4
9
16
```

A generator *is* a [pipe](https://ghul.dev/runtime-library.html#stages), so it can be looped over directly and composed with `map` / `filter` / `take` and the other pipe operators:

```ghul
…
// fibs() is an infinite generator; take(8) bounds it
for f in fibs() |> take(8) do
    write_line(f)
od
```

output:

```
0
1
1
2
3
5
8
13
```

`return;` ends the sequence early; falling off the end of the body has the same effect.

As with `await`, a `yield` inside a `catch` or `finally` handler is not yet supported, and a function cannot be both a generator and asynchronous.


---

<a id="dotnet-integration"></a>

# .NET integration

ghūl is hosted on and targets .NET 10 and can consume most types in .NET assemblies built with C#.

## projects

The ghūl compiler is driven by MSBuild and uses the .NET SDK targets for most of the build process. Provided you reference the ghūl runtime library package, things should work as you'd expect for any other .NET SDK project. You can add package references, build assemblies and pack NuGet packages etc. all using the normal `dotnet` command line tools.

## name mangling
When consuming C# code the ghūl compiler transforms symbol names to better match ghūl conventions:

- Class, struct and trait (=interface) names are left unchanged
- .NET's generic arity suffix is removed, so `KeyValuePair<K, V>` is `Collections.KeyValuePair[K, V]`
- Enum names and enum member names are transformed to `MACRO_CASE`
- Method, property and field names are transformed to `snake_case`
- A name that collides with a ghūl keyword is left unchanged too. The backtick is how you write such a name where the keyword reading would otherwise win, as in ``` `class ```; it is not part of the name, and after a `.` none is needed

## namespace and type name re-mapping
Some commonly used namespace and type names are re-mapped in line with ghūl conventions

### namespaces
- `System.Collections.Generic` is mapped to `Collections`
- `System.IO` is mapped to `IO`

### framework and collection types

| Original Type                                        | Mapped Type                         |
|------------------------------------------------------|-------------------------------------|
| `System.IDisposable`                                 | `Ghul.Disposable`                   |
| `System.Console`                                     | `IO.Std`                            |
| `System.Collections.IEnumerable`                     | `Collections.NonGenericIterable`    |
| `System.Collections.Generic.IReadOnlyCollection`     | `Collections.Bag`                   |
| `System.Collections.Generic.ICollection`             | `Collections.MutableBag`            |
| `System.Collections.IEnumerator`                     | `Collections.MoveNext`              |
| `System.Collections.Generic.IEnumerable`             | `Collections.Iterable`              |
| `System.Collections.Generic.IEnumerator`             | `Collections.Iterator`              |
| `System.Collections.Generic.IReadOnlyList`           | `Collections.List`                  |
| `System.Collections.Generic.IList`                   | `Collections.MutableList`           |
| `System.Collections.Generic.List`                    | `Collections.LIST`                  |
| `System.Collections.Generic.IReadOnlyDictionary`     | `Collections.Map`                   |
| `System.Collections.Generic.IDictionary`             | `Collections.MutableMap`            |
| `System.Collections.Generic.Dictionary`              | `Collections.MAP`                   |
| `System.Collections.Generic.HashSet`                 | `Collections.SET`                   |
| `System.Collections.Generic.Stack`                   | `Collections.STACK`                 |
| `System.Threading.Tasks.Task`                        | `Tasks.TASK`                        |
| `System.Threading.Tasks.Task<T>`                     | `Tasks.TASK[T]`                     |

### primitive types

| Original Type     | Mapped Type          |
|-------------------|----------------------|
| `System.Void`     | `Ghul.void`          |
| `System.Boolean`  | `Ghul.bool`          |
| `System.Char`     | `Ghul.char`          |
| `System.Byte`     | `Ghul.ubyte`         |
| `System.SByte`    | `Ghul.byte`          |
| `System.UInt16`   | `Ghul.ushort`        |
| `System.Int16`    | `Ghul.short`         |
| `System.UInt32`   | `Ghul.uint`          |
| `System.Int32`    | `Ghul.int`           |
| `System.UInt64`   | `Ghul.ulong`         |
| `System.Int64`    | `Ghul.long`          |
| `System.UIntPtr`  | `Ghul.uword`         |
| `System.IntPtr`   | `Ghul.word`          |
| `System.Single`   | `Ghul.single`        |
| `System.Double`   | `Ghul.double`        |
| `System.Decimal`  | `Ghul.decimal`       |
| `System.Object`   | `Ghul.object`        |
| `System.String`   | `Ghul.string`        |

## making your own types work with .NET

The mappings above are about reaching into .NET. This section is the other direction: what a ghūl type has to provide before .NET libraries treat it as a first-class value rather than as an opaque object. In each case the language already has the operator or member; the point is which one .NET is looking for.

### equality

.NET consults a type's equality when it goes looking for a value: a dictionary key, a set member, `contains` on a list. A type defines that with `=~`, which is emitted as .NET's `Equals`. But defining `=~` alone is not enough, because a hash-based collection consults the hash first and never reaches the comparison. Define `get_hash_code` alongside it, and the two together produce the `Object.Equals` override that .NET actually uses:

```ghul
…
class WITH_HASH(x: int) is
    =~(other: WITH_HASH) -> bool => x == other.x

    ▲ get_hash_code() -> int => x.get_hash_code()
si

// only =~, so .NET keeps comparing by identity:
class NO_HASH(x: int) is
    =~(other: NO_HASH) -> bool => x == other.x
si

let with_hash = SET[WITH_HASH]()
with_hash.add(WITH_HASH(1))
write_line("with get_hash_code: {with_hash.contains(WITH_HASH(1))}")

let no_hash = SET[NO_HASH]()
no_hash.add(NO_HASH(1))
write_line("without get_hash_code: {no_hash.contains(NO_HASH(1))}")
```

diagnostics:

- warning: [equality-without-hash] NO_HASH defines =~ but no get_hash_code, so .NET comparisons will not use the operator

output:

```
with get_hash_code: True
without get_hash_code: False
```

`System.HashCode.combine` is the usual way to build the hash from the same members `=~` reads.

The hash is not generated for you, because an operator is free to ignore members it does not care about, and a member-wise hash would then disagree with it. A type that defines neither is consistent as it stands, comparing and hashing by identity, so a type that defines only `=~` is reported as `equality-without-hash` and left alone rather than half-converted.

A value type hides this for a while: .NET's default equality for a struct is member-wise, so a struct that skips `get_hash_code` often behaves correctly by coincidence and then diverges the moment its `=~` stops agreeing with a member-wise comparison. The warning fires either way, and is worth heeding either way.

### ordering

Sorting, `Ghul.Comparable[T]`, and the relational operators all come from `<>`, a three-way ordering returning a negative, zero, or positive `int`. Defining it gives a type `<`, `<=`, `>` and `>=` and makes it sortable by .NET at the same time:

```ghul
…
class VERSION(major: int, minor: int): Ghul.Comparable[VERSION] is
    ▲ <>(other: VERSION) -> int =>
        if major != other.major then major - other.major else minor - other.minor fi

    ▲ to_string() -> string => "{major}.{minor}"
si

let versions = LIST[VERSION]()
versions.add(VERSION(2, 1))
versions.add(VERSION(1, 9))
versions.sort()

write_line("sorted: {versions |> map(v => v.to_string()) |> join(", ")}")
write_line("1.0 < 1.1: {VERSION(1, 0) < VERSION(1, 1)}")
```

output:

```
sorted: 1.9, 2.1
1.0 < 1.1: True
```

### conversions

A .NET user-defined conversion operator (`op_Implicit` / `op_Explicit`) declared on either the source or the target type is reachable through `cast`:

```ghul
…
// System.Half declares an explicit conversion from single, and an implicit one back
conversions() is
    let h = cast System.Half(1.5)
    let f = cast single(h)

    write_line("{h} {f}")
si
…
```

output:

```
1.5 1.5
```

`cast T(v)` calls the operator and lets it throw on failure. `cast T?(v)` never throws: a failed conversion becomes the absent value, and any other exception still propagates.

### disposal

A type holding something that has to be released implements `Ghul.Disposable`, which is .NET's `IDisposable`, by defining `dispose`. `let use` then releases it at the end of the enclosing block, however the block is left:

```ghul
…
class SCOPE(name: string): Ghul.Disposable is
    ▲ dispose() is
        write_line("closing {name}")
    si
si

let use s = SCOPE("file")

write_line("inside the scope")
```

output:

```
inside the scope
closing file
```

### iteration

A type implementing `Collections.Iterable[T]` is a .NET `IEnumerable<T>`, so it works with `for`, with the pipe combinators, and with any .NET API taking a sequence. The requirement is an `iterator` property, and a [generator](https://ghul.dev/async-and-generators.html#generators) is usually the shortest way to supply one:

```ghul
…
class COUNTDOWN(from: int): Iterable[int] is
    ▲ iterator: Iterator[int] => _counting().iterator

    _counting() -> Pipe[int] is
        let i mut = from
        while i > 0 do
            yield i
            i = i - 1
        od
    si
si

for i in COUNTDOWN(3) do
    write_line("tick {i}")
od
```

output:

```
tick 3
tick 2
tick 1
```

### a gotcha when reflecting over your types

An auto-property's backing field is named `$` followed by the property name, and reflection sees it alongside the property itself. A reflection-based serializer told to include fields will therefore emit everything twice. With `System.Text.Json`, leave `include_fields` alone unless the type genuinely has fields to serialize.

## ASP.NET Core

ASP.NET Core minimal APIs work from ghūl. Extension methods aren't exposed as members, so the fluent builder calls go through the `|>` thread-first operator, which passes the left-hand side as the called method's first argument:

```ghul
…
entry(args: string[]) is
    let builder = WebApplication.create_builder(args)

    let app = builder.build()

    // '|>' threads app in as map_get's first argument:
    app |> map_get("/hello", () => Results.ok("hello, world"))

    app.run(null)
si
```

`app |> map_get(...)` calls the `MapGet` extension on `app`; the route handler is an anonymous function returning an `IResult`.

Controller-style APIs rely on attributes, which apply to classes and methods: `[ApiController]`, `[Route(...)]`, `[HttpGet(...)]` and so on. ghūl doesn't yet place attributes on method parameters, so parameter-binding attributes like `[FromBody]` aren't expressible; minimal APIs bind by position and need none of them.

## Entity Framework Core

Entity Framework Core works from ghūl. A context extends `DbContext` and exposes each table as a `DbSet`; EF Core's conventions expect PascalCase names, so `@IL.name` maps the ghūl members onto them:

```ghul
…
// @IL.name maps these onto the PascalCase names EF Core's conventions expect.
@IL.name("Product")
class PRODUCT is
    @IL.name("Id")
    id: int public

    @IL.name("Name")
    name: string public

    init() is si
si

class STORE_CONTEXT: DbContext is
    @IL.name("Products")
    products: DbSet[PRODUCT]

    init(options: DbContextOptions) is
        super.init(options)
    si
si

add_product(context: STORE_CONTEXT, product: PRODUCT) -> Tasks.TASK is
    context.products.add(product)

    await context.save_changes_async(System.Threading.CancellationToken.none)

    return
si
…
```

The `Products` set and the entity's `Id` and `Name` are the names EF Core's model builder and SQL generation look for. Reads and writes call the async methods directly, with `await` - `save_changes_async` here.

## mocking with NSubstitute

The .NET base libraries include no mocking framework; [NSubstitute](https://nsubstitute.github.io/) is the lowest-friction third-party option from ghūl, and the compiler's own test suite uses it. `Substitute.for` builds a stand-in for a trait, and the `Returns` extension stubs a call through `|>`:

```ghul
…
trait Clock is
    ◆ now() -> System.DateTime
si

test_uses_a_stubbed_clock() static is
    // Substitute.for takes the constructor arguments as an object[]; a
    // trait has none, so pass an empty array.
    let clock = Substitute.`for[Clock]([])

    // stub a return value for a call:
    clock.now() |> returns(System.DateTime(2020, 1, 1, 9, 0, 0), null)

    IO.Std.write_line("stubbed hour is {clock.now().hour}")
si
…
```

`for` is a reserved word, so the example escapes it with a backtick. Its argument is the substitute's constructor arguments as an `object[]`; a trait has none, so the argument is an empty array. Where a full framework isn't warranted, a hand-written trait implementation is the zero-dependency alternative.


---

<a id="runtime-library"></a>

# runtime library

`Ghul.Runtime` ships alongside the compiler and supplies `Pipe[T]` and other
everyday building blocks used throughout this site. The reference below
covers `Ghul.Pipes`, the sequence-processing library behind
[filter, map, reduce](https://ghul.dev/functional-programming#filter-map-reduce) and the
[thread-first operator](https://ghul.dev/expressions#thread-first-calls).

A pipe combinator chain is written with the thread-first operator `|>` over
free functions, which pass the sequence in as the first argument:

```ghul
…
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

let sum_of_even_squares = numbers
    |> filter(x => x % 2 == 0)
    |> map(x => x * x)
    |> reduce(0, (total, x) => total + x)

write_line("sum of even squares: {sum_of_even_squares}")
```

output:

```
sum of even squares: 220
```

## how a pipe runs

The combinators come in two kinds. A **stage** returns a new `Pipe[T]`, which is
what lets stages chain: `map` returns a pipe that maps, `filter` returns a pipe
that filters. A **terminal** returns something else - a value, a list, a count -
so it is where a pipe ends.

Elements travel through a pipe one at a time, and the terminal is what pulls
them through. It asks the pipe it was called on for an element, that pipe asks
the one it was built from, and so on back to the iterable at the start; the
element then makes its way down the pipe, each stage working on it before
passing it on to the next stage. No stage buffers the whole sequence - typical
stages hold only one element at a time - so a `map` over a million elements
doesn't construct a million-element list.

Pipes are lazy: until something - a terminal - asks a pipe for elements, no
stage runs. An inert pipe can be held or passed around until it's needed. And if
the consumer stops pulling elements from the pipe, the pipe will stop pulling
elements from its source iterator. If and when the consumer starts up again, the
pipe will begin producing elements again, pulling them through its chain of
stages from the source.

```ghul
…
let numbers = [1, 2, 3, 4, 5, 6]

// nothing has asked this pipe for elements yet, so peek's
// action has not run
let stages = numbers
    |> peek(x => write_line("  pulled {x}"))
    |> filter(x => x % 2 == 0)
    |> map(x => x * 10)

write_line("pipe built - nothing has run yet")

// collect_list is a terminal, so it asks for the elements
let result = stages |> collect_list()

write_line("result: {result |> join(", ")}")
```

output:

```
pipe built - nothing has run yet
  pulled 1
  pulled 2
  pulled 3
  pulled 4
  pulled 5
  pulled 6
result: 20, 40, 60
```

Because pipes are lazy, they can consume a source with an infinite number of
elements. The consumer can stop pulling, and discard the pipe. When the
pipe is disposed, that disposal flows back up the pipe to the source iterator,
which is then also disposed.

One way to bound consumption is to use a stage like `take(...)`, which stops
pulling after a given number of elements have passed through it.

This combines neatly with infinite generators - a
[generator](https://ghul.dev/async-and-generators.html#generators) can yield indefinitely,
leaving it to the pipe downstream to decide when to stop consuming.

`reverse` and the `sort` family are the exceptions, listed separately below:
they need to see the whole sequence of elements before they can start producing
results, and so they buffer the whole source as soon as they are called.

## reading the signatures

The `pure` on a function type - `predicate: (T) -> bool pure` - asks that the
function you pass only reads, and writes nothing to the heap. Most anonymous
functions satisfy it without any thought; see [type narrowing](https://ghul.dev/type-narrowing.html#calls-purity-and-stable)
for what the compiler does with the guarantee.

`Ghul.MAYBE[T]` is an [optional type](https://ghul.dev/optional-types.html#unconstrained-generic-types): it holds a `T` or
holds nothing. Combinators that might not find anything say so in their return type, and `??`,
`!` and `if let` read the value out.

## making a pipe

### pipe

Turns any `Iterable[T]` - an array, a `LIST[T]`, a `MAP[T]`'s values,
anything with an `.iterator` - into a `Pipe[T]`. A chain rarely needs it: the
free functions all take an `Iterable[T]`, so a chain can start from the source
itself.

```ghul
◆ pipe[T](source: Iterable[T]) -> Pipe[T] pure
```

## stages

A stage returns a new pipe, so stages chain onto one another.

### filter

```ghul
◆ filter[T](
    source: Iterable[T],
    predicate: (T) -> bool pure
) -> Pipe[T] pure
```

### map

```ghul
◆ map[T,U](
    source: Iterable[T],
    mapper: (T) -> U pure
) -> Pipe[U] pure
```

### flat_map

Maps each element to an iterable and runs the results together into one sequence.

```ghul
◆ flat_map[T,U](
    source: Iterable[T],
    mapper: (T) -> Iterable[U] pure
) -> Pipe[U] pure
```

### skip

```ghul
◆ skip[T](source: Iterable[T], count: int) -> Pipe[T] pure
```

### take

```ghul
◆ take[T](source: Iterable[T], count: int) -> Pipe[T] pure
```

### skip_while

```ghul
◆ skip_while[T](
    source: Iterable[T],
    predicate: (T) -> bool pure
) -> Pipe[T] pure
```

### take_while

```ghul
◆ take_while[T](
    source: Iterable[T],
    predicate: (T) -> bool pure
) -> Pipe[T] pure
```

The four set operations that follow all discard duplicates. This is what they do to the same pair of sources:

```ghul
…
let left = [1, 2, 2, 3, 4]
let right = [3, 4, 5]

// all four remove duplicates, keeping the first occurrence
// of each element
write_line("distinct:       {left |> distinct()}")
write_line("union_with:     {left |> union_with(right)}")
write_line("intersect_with: {left |> intersect_with(right)}")
write_line("except:         {left |> except(right)}")
```

output:

```
distinct:       1, 2, 3, 4
union_with:     1, 2, 3, 4, 5
intersect_with: 3, 4
except:         1, 2
```

### distinct

Removes duplicates, keeping the first occurrence of each element. `distinct`, `union_with`, `intersect_with` and `except` all do this, so each produces a sequence with no repeats, in the order first seen. Elements are compared with `=~` and `get_hash_code`, so a type used with these needs [both](https://ghul.dev/dotnet-integration.html#equality).

```ghul
◆ distinct[T](source: Iterable[T]) -> Pipe[T] pure
```

### union_with

Every element of both sources with duplicates removed, taking the left source's elements first.

```ghul
◆ union_with[T](
    source: Iterable[T],
    right: Iterable[T]
) -> Pipe[T] pure
```

### intersect_with

Elements the left and right sources have in common, in the order the left source has them.

```ghul
◆ intersect_with[T](
    source: Iterable[T],
    right: Iterable[T]
) -> Pipe[T] pure
```

### except

Elements of the left source that the right source doesn't have.

```ghul
◆ except[T](
    source: Iterable[T],
    right: Iterable[T]
) -> Pipe[T] pure
```

### peek

Calls `action` on each element and passes it through unchanged.

```ghul
◆ peek[T](source: Iterable[T], action: T -> void) -> Pipe[T] pure
```

`chunk` and `windows` both produce groups of elements, and differ in how the groups are cut:

```ghul
…
let numbers = [1, 2, 3, 4, 5, 6, 7]

// chunk: the first three elements, then the next three, and so
// on. the last group is short when the source doesn't divide
// evenly
for group in numbers |> chunk(3) do
    write_line("chunk:  {group |> join(", ")}")
od

// windows: every run of three neighbouring elements, so each
// group shares two elements with the one before it. a group is
// always three long
for window in numbers |> windows(3) do
    write_line("window: {window |> join(", ")}")
od
```

output:

```
chunk:  1, 2, 3
chunk:  4, 5, 6
chunk:  7
window: 1, 2, 3
window: 2, 3, 4
window: 3, 4, 5
window: 4, 5, 6
window: 5, 6, 7
```

### chunk

The first `size` elements, then the next `size`, and so on, each element appearing in one group only. The last group is short when the source doesn't divide evenly. Compare `windows`, below.

```ghul
◆ chunk[T](source: Iterable[T], size: int) -> Pipe[LIST[T]] pure
```

### windows

Every run of `size` neighbouring elements: the first `size`, then the same run moved along by one, and so on. Each window therefore shares all but one of its elements with the window before it. A window is always `size` long, so a source with fewer than `size` elements produces none.

```ghul
◆ windows[T](
    source: Iterable[T],
    size: int
) -> Pipe[LIST[T]] pure
```

### cat

Concatenation: every element of the left source, then every element of the right.

```ghul
◆ cat[T](source: Iterable[T], right: Iterable[T]) -> Pipe[T] pure
```

### index

Pairs each element with its index. `INDEXED_VALUE[T]` has `index` and `value`, and destructures positionally, so `for (i, x) in xs |> index() do` reads the pair apart. The second form starts the index at a given number rather than at 0.

```ghul
◆ index[T](source: Iterable[T]) -> Pipe[INDEXED_VALUE[T]] pure

◆ index[T](
    source: Iterable[T],
    index: int
) -> Pipe[INDEXED_VALUE[T]] pure
```

### zip

Pairs elements of the source with elements of `other`, stopping when either side runs out. The second form combines each pair with a mapper instead of yielding a tuple.

```ghul
◆ zip[T,U](
    source: Iterable[T],
    other: Iterable[U]
) -> Pipe[(T,U)] pure

◆ zip[T,U,TOut](
    source: Iterable[T],
    other: Iterable[U],
    mapper: (T,U) -> TOut pure
) -> Pipe[TOut] pure
```

## stages that buffer

These return a pipe, like any other stage, but they cannot work out their first
element without having seen the last one. So they buffer the whole source the
moment they are called, rather than passing elements along one at a time.

### reverse

Yields the source's elements last to first.

```ghul
◆ reverse[T](source: Iterable[T]) -> Pipe[T] pure
```

### sort

Yields the source's elements in order. The first form uses the element type's own ordering: sorting without a comparer needs an element type that defines `<>`, or is comparable on the .NET side. The other two forms take an `IComparer[T]` or a comparison function returning negative, zero or positive.

```ghul
◆ sort[T](source: Iterable[T]) -> Pipe[T] pure

◆ sort[T](
    source: Iterable[T],
    comparer: Collections.IComparer[T]
) -> Pipe[T] pure

◆ sort[T](
    source: Iterable[T],
    compare: (T, T) -> int pure
) -> Pipe[T] pure
```

### sort_descending

```ghul
◆ sort_descending[T](source: Iterable[T]) -> Pipe[T] pure
```

### sort_by

```ghul
◆ sort_by[T,K: Ghul.Comparable[K]](
    source: Iterable[T],
    key_selector: (T) -> K pure
) -> Pipe[T] pure
```

### sort_by_descending

```ghul
◆ sort_by_descending[T,K: Ghul.Comparable[K]](
    source: Iterable[T],
    key_selector: (T) -> K pure
) -> Pipe[T] pure
```

## terminals

A terminal returns something other than a pipe, so it is where a pipe ends. They
fall into three loose groups:
finding a single element, collecting the elements into a container, and folding
or consuming the sequence as a whole.

The searching combinators come in pairs. `find`-style ones take a predicate or
a mapper and scan; `first`-style ones look only at the leading element. Each has a
variant returning `MAYBE[T]` and one that throws instead:

```ghul
…
let words = ["alpha", "beta", "gamma"]

// find scans for the first element matching a predicate
// first takes no predicate and yields the leading element
write_line("find:      {words |> find(w => w.length == 4) ?? "none"}")
write_line("first:     {words |> first() ?? "none"}")

// only yields the single element, and throws if the source
// holds none or more than one
write_line("only:      {["solo"] |> only()}")

// a mapper that gives a result only for words longer than four
// characters
shout(w: string) -> MAYBE[string] pure =>
    if w.length > 4 then MAYBE[string](w.to_upper()) else MAYBE[string]() fi

// find_map keeps mapping until one answers; first_map maps the
// first element and gives up when that one declines
write_line("find_map:  {words |> find_map(shout) ?? "none"}")
write_line("first_map: {words |> first_map(shout) ?? "none"}")

// beta is the only word the mapper declines, so leading with it
// is what separates the two
let beta_first = ["beta", "alpha", "gamma"]

write_line("find_map:  {beta_first |> find_map(shout) ?? "none"}")
write_line("first_map: {beta_first |> first_map(shout) ?? "none"}")
```

output:

```
find:      beta
first:     alpha
only:      solo
find_map:  ALPHA
first_map: ALPHA
find_map:  ALPHA
first_map: none
```

### find

The first element matching the predicate, absent if none does. `first` is the same question with no predicate.

```ghul
◆ find[T](
    source: Iterable[T],
    predicate: (T) -> bool pure
) -> Ghul.MAYBE[T] pure
```

### find_map

Calls `mapper` on each element in turn and returns the first present result. `first_map` differs: it calls the mapper on the *first* element only, and gives up if that one declines.

```ghul
◆ find_map[T,U](
    source: Iterable[T],
    mapper: (T) -> Ghul.MAYBE[U] pure
) -> Ghul.MAYBE[U] pure
```

### find_or_throw

As `find`, throwing instead of returning absent when nothing matches.

```ghul
◆ find_or_throw[T](
    source: Iterable[T],
    predicate: T -> bool pure
) -> T pure
```

### find_map_or_throw

As `find_map`, throwing instead of returning absent when nothing maps.

```ghul
◆ find_map_or_throw[T,U](
    source: Iterable[T],
    mapper: (T) -> Ghul.MAYBE[U] pure
) -> U pure
```

### first

The leading element, absent when the source is empty.

```ghul
◆ first[T](source: Iterable[T]) -> Ghul.MAYBE[T] pure
```

### first_map

Calls `mapper` on the leading element only. Compare `find_map`, above, which keeps going.

```ghul
◆ first_map[T,U](
    source: Iterable[T],
    mapper: (T) -> Ghul.MAYBE[U] pure
) -> Ghul.MAYBE[U] pure
```

### first_or_throw

As `first`, throwing instead of returning absent when the source is empty.

```ghul
◆ first_or_throw[T](source: Iterable[T]) -> T pure
```

### first_map_or_throw

As `first_map`, throwing instead of returning absent.

```ghul
◆ first_map_or_throw[T,U](
    source: Iterable[T],
    mapper: (T) -> Ghul.MAYBE[U] pure
) -> U pure
```

### only

The single element the source holds, throwing when it holds none or more than one.

```ghul
◆ only[T](source: Iterable[T]) -> T pure
```

### any

```ghul
◆ any[T](
    source: Iterable[T],
    predicate: (T) -> bool pure
) -> bool pure
```

### all

```ghul
◆ all[T](
    source: Iterable[T],
    predicate: (T) -> bool pure
) -> bool pure
```

### count

```ghul
◆ count[T](source: Iterable[T]) -> int pure
```

### min

The smallest element, absent when the source is empty.

```ghul
◆ min[T: Ghul.Comparable[T]](
    values: Iterable[T]
) -> Ghul.MAYBE[T] pure
```

### max

```ghul
◆ max[T: Ghul.Comparable[T]](
    values: Iterable[T]
) -> Ghul.MAYBE[T] pure
```

### min_by

```ghul
◆ min_by[T,K: Ghul.Comparable[K]](
    source: Iterable[T],
    key_selector: (T) -> K pure
) -> Ghul.MAYBE[T] pure
```

### max_by

```ghul
◆ max_by[T,K: Ghul.Comparable[K]](
    source: Iterable[T],
    key_selector: (T) -> K pure
) -> Ghul.MAYBE[T] pure
```

The collecting combinators differ in what they hand back:

```ghul
…
let numbers = [3, 1, 4, 1, 5, 9, 2, 6]

// collect gives back the read-only List[T] trait, collect_list
// the mutable LIST[T], and collect_set drops duplicates
write_line("collect:      {numbers |> collect() |> join(", ")}")
write_line("collect_list: {numbers |> collect_list() |> join(", ")}")
write_line("collect_set:  {numbers |> collect_set() |> join(", ")}")

// partition splits on a predicate: the matching elements first
let (even, odd) = numbers |> partition(x => x % 2 == 0)

write_line("partition:    even {even |> join(", ")}, odd {odd |> join(", ")}")

// group_by keys each element, collecting the elements per key
let by_size = numbers |> group_by(x => if x < 5 then "small" else "large" fi)

write_line("group_by:     small {by_size["small"] |> join(", ")}")
write_line("group_by:     large {by_size["large"] |> join(", ")}")
```

output:

```
collect:      3, 1, 4, 1, 5, 9, 2, 6
collect_list: 3, 1, 4, 1, 5, 9, 2, 6
collect_set:  3, 1, 4, 5, 9, 2, 6
partition:    even 4, 2, 6, odd 3, 1, 1, 5, 9
group_by:     small 3, 1, 4, 1, 2
group_by:     large 5, 9, 6
```

### collect

Collects into the read-only `Collections.List[T]`. `collect_list` gives back the mutable `LIST[T]` instead, and the others collect into an array, a set, or a map.

```ghul
◆ collect[T](source: Iterable[T]) -> Collections.List[T] pure
```

### collect_array

```ghul
◆ collect_array[T](source: Iterable[T]) -> T[] pure
```

### collect_list

```ghul
◆ collect_list[T](source: Iterable[T]) -> LIST[T] pure
```

### collect_set

```ghul
◆ collect_set[T](source: Iterable[T]) -> SET[T] pure
```

### collect_map

```ghul
◆ collect_map[T,K,V](
    source: Iterable[T],
    key_selector: (T) -> K pure,
    value_selector: (T) -> V pure
) -> MAP[K,V] pure
```

### partition

Splits the source in two on a predicate. The elements matching the predicate come first, then the elements not matching.

```ghul
◆ partition[T](
    source: Iterable[T],
    predicate: (T) -> bool pure
) -> (LIST[T], LIST[T]) pure
```

### group_by

Collects the elements into a map, keyed by what `key_selector` returns for each.

```ghul
◆ group_by[T,K](
    source: Iterable[T],
    key_selector: (T) -> K pure
) -> MAP[K, LIST[T]] pure
```

### reduce

Folds the source into a single value, starting at `seed` and calling `accumulator` with the running value and each element in turn. The second form passes the final running value through a mapper before returning it.

```ghul
◆ reduce[T,TRunning](
    source: Iterable[T],
    seed: TRunning,
    accumulator: (TRunning,T) -> TRunning pure
) -> TRunning pure

◆ reduce[T,TRunning,TOut](
    source: Iterable[T],
    seed: TRunning,
    accumulator: (TRunning,T) -> TRunning pure,
    mapper: (TRunning) -> TOut pure
) -> TOut pure
```

### each

Calls `action` on every element. It returns nothing and, alone among these, is not `pure` - it exists for its side effects.

```ghul
◆ each[T](source: Iterable[T], action: T -> void) -> void
```

### append_to

Appends each element to a `StringBuilder`, separated by `separator`, or by `", "` when that is left off. `join` is the same thing answering a fresh string.

```ghul
◆ append_to[T](
    source: Iterable[T],
    into: System.Text.StringBuilder,
    separator: string
) -> System.Text.StringBuilder

◆ append_to[T](
    source: Iterable[T],
    into: System.Text.StringBuilder
) -> System.Text.StringBuilder
```

### join

Renders the elements into one string, separated by `separator`, or by `", "` when left off.

```ghul
◆ join[T](source: Iterable[T], separator: string) -> string pure

◆ join[T](source: Iterable[T]) -> string pure
```


---

<a id="tooling"></a>

# tooling

The ghūl compiler is a .NET tool, and ghūl projects are ordinary .NET SDK projects. This means most of the tooling you already use for .NET applies directly, with a language extension on top for editing.

## the compiler

The compiler is published as the [`ghul.compiler`](https://www.nuget.org/packages/ghul.compiler) .NET tool. Once installed it is invoked as `dotnet ghul-compiler`.

You don't usually run the compiler by hand. ghūl projects are built with MSBuild through a `.ghulproj` project file, and the `ghul.runtime` package supplies the MSBuild targets that drive the compiler for you. See [creating a project](#creating-a-project) below for setting one up.

The compiler is normally installed as a *local* .NET tool, pinned per project in `.config/dotnet-tools.json`, so everyone building the project uses the same compiler version. `dotnet tool restore` restores it.

## building and running

Because a ghūl project is a normal .NET SDK project, the standard `dotnet` commands all work:

```bash
dotnet build   # compile the project
dotnet run     # build and run an executable project
dotnet pack    # produce a NuGet package
dotnet test    # run a test project
```

A ghūl project can reference NuGet packages, produce libraries or executables, and be packed and published exactly like a C# project.

## diagnostics

Every warning has a slug, shown in its message. A slug can be silenced with `@suppress("<slug>")` on a declaration, a whole file, or the project, or re-levelled on the compiler command line: `--warn-as-hint <slug,…>` downgrades matching warnings to editor-only hints that never appear in a batch build, and `--warn-as-info <slug,…>` downgrades them to informational diagnostics that still show in a build. Suppression wins over a demotion.

## the Visual Studio Code extension

The [ghūl language extension](https://marketplace.visualstudio.com/items?itemName=degory.ghul) provides rich language support while you edit:

- errors and warnings reported as you type
- code completion
- hover information
- go to definition and find references
- rename
- signature help
- source code formatting

Behind the scenes the extension runs the ghūl compiler in its analysis mode: the compiler stays resident, maintains an up-to-date analysis of your project, and updates it as you edit, reporting diagnostics back into the editor.

On large projects the extension updates this analysis in two stages: a quick partial pass over the file you are editing, followed by a full pass once you pause. This is usually invisible, though it does mean a diagnostic can occasionally appear or disappear a moment after an edit.

## other editors

The extension's language support lives in a standalone [Language Server Protocol](https://microsoft.github.io/language-server-protocol/) server with no dependency on the VS Code API. It speaks stdio by default, so any editor with an LSP client can drive it - it has been tested with [Micro](https://micro-editor.github.io/), for example.

Install it from npm:

```sh
npm install -g @ghul/language-server
```

The command it installs is `ghul-language-server`, so point your editor's LSP client at that. The same package is attached as a `.tgz` to every [ghul-vsce release](https://github.com/degory/ghul-vsce/releases) if you would rather not install from npm.

## dev containers

The ghūl repository template and the examples repo both ship a `.devcontainer` configured to use a standard .NET 10 dev container image - for example [`mcr.microsoft.com/devcontainers/dotnet:10.0`](https://hub.docker.com/r/microsoft/devcontainers-dotnet). Open the project in VS Code with the Dev Containers extension, or in a GitHub Codespace, and `dotnet tool restore` will install the compiler from the local tool manifest. Any image with the .NET 10 SDK and `dotnet` on the PATH will work.

## creating a project

### from a project template

The [`ghul.templates`](https://www.nuget.org/packages/ghul.templates) package adds ghūl project templates to the .NET SDK:

```bash
dotnet new install ghul.templates
```

Once installed, `dotnet new` can scaffold a ghūl project pre-configured with a `.ghulproj`, the compiler pinned as a local tool, and a starting source file.

### from the repository template

If you create a new GitHub repo from the [ghūl repository template](https://github.com/degory/ghul-repository-template), the compiler comes pre-configured as a local .NET tool in your project folder - run `dotnet tool restore` to restore it.

### from scratch

The compiler expects to be driven by MSBuild using a `.ghulproj` project file. See the [ghūl test](https://github.com/degory/ghul-test) project for a real-world example.

`Directory.Build.props`
```xml
<Project>
  <PropertyGroup>
    <Version>0.1.0-alpha.1</Version>
  </PropertyGroup>

  <ItemGroup>
    <!--
      ghul.runtime provides MSBuild targets required to drive the 
      ghul compiler
     -->
    <PackageReference Include="ghul.runtime" Version="0.0.0-latest.ghul.runtime" />
  </ItemGroup>
</Project>
```

`example.ghulproj`
```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>

    <GhulCompiler>dotnet ghul-compiler</GhulCompiler>
  </PropertyGroup>

  <ItemGroup>
    <GhulSources Include="src/**/*.ghul" />
  </ItemGroup>
</Project>
```

By convention ghūl source files have the extension `.ghul`, and the `ghul.runtime` provided MSBuild targets will include `**/*.ghul` when building.

To pin the compiler as a local tool in the project folder, so everyone building the project gets the same compiler:

```sh
dotnet new tool-manifest
dotnet tool install --local ghul.compiler --version 0.0.0-latest.ghul.compiler
```

The compiler can also be installed globally instead, from the [ghūl compiler .NET tool package](https://www.nuget.org/packages/ghul.compiler/):

```sh
dotnet tool install --global ghul.compiler
```

### runtime dependencies for ghūl applications

Applications written in ghūl require the [.NET 10 runtime](https://dotnet.microsoft.com/download/dotnet/10.0).


---

<a id="language-basics"></a>

# language basics

## syntax

ghūl syntax is inspired by a number of non-brace languages, including ALGOL 68 and Pascal

### identifiers and keywords

Identifiers in ghūl follow the convention of `snake_case` for variables, functions, methods, and properties, `PascalCase` for namespaces, traits, abstract classes, unions, and enums, and `MACRO_CASE` for concrete classes, structs, variants, and enum members. ghūl keywords are lowercase.

ghūl relies on keywords for block structure where other languages use braces or indentation. Keywords are context specific and generally come in pairs where the closing keyword is the reverse or mirror image of the opening keyword. In the examples below `is` introduces a method or class body and its block is closed by the reverse keyword `si`

```ghul
…
let my_variable = 42

print_something(thing: string) is
    write_line("The thing is: {thing}")
si

print_something("a hello")

class PERSON is
    name: string
    age: int
si
```

output:

```
The thing is: a hello
```

### expressions and statements
Expressions in ghūl are constructs that return a value, while statements perform actions. All expressions can be used where statements are allowed, and most statements can be used as expressions. In a function or method body a trailing `;` on the last statement marks its value as discarded, so a body without one returns that statement's value - see [expression oriented programming](https://ghul.dev/expression-oriented-programming.html) for the forms working together.

```ghul
…
// variable declaration statement
let x = 10

// expression used as part of a declaration statement
let y = x * 2

// 'if' is a statement, 'x > 5' is an expression
if x > 5 then
    write_line("x is greater than 5")
fi

// 'if' can also be used as an expression
let z = if x > 5 then x else y fi
```

output:

```
x is greater than 5
```

### function declarations
Functions in ghūl are declared with an optional return type, a name, a list of parameters in parentheses, and a body enclosed in `is` and `si` keywords

```ghul
…
greet(name: string) -> void is
    write_line("Hello, {name}!")
si
```

Functions can also have an expression body using `=>` instead of `is` / `si`:
```ghul
square(x: int) -> int => x * x
```

### control flow
ghūl supports various [control flow constructs](https://ghul.dev/control-flow.html) like `if`, `else`, `while`, `for`, and `case` expressions.

```ghul
…
if x > 0 then
    write_line("Positive")
elif x < 0 then
    write_line("Negative")
else
    write_line("Zero")
fi

for item in my_list do
    process(item)
od
```

output:

```
Positive
```

### types

ghūl is statically typed, with some support for [type inference](https://ghul.dev/type-inference.html). Types can be explicitly specified using a colon `:` plus a type expression

```ghul
let x: int = 42
let y = "Hello"
```
[User types](https://ghul.dev/definitions.html#types) are defined using `class`, `struct`, `trait`, `enum`, and `union` keywords.

## built-in data types

ghūl's built-in data types are primitive types, arrays, tuples, and optionals.

### primitive types

ghūl provides the following primitive data types:

* integer types: `byte`, `ubyte`, `short`, `ushort`, `int`, `uint`, `long`, `ulong`, `word`, `uword`
* floating-point types: `single`, `double`
* fixed-point type: `decimal`
* boolean type: `bool`
* character type: `char`
* void type: `void`

```ghul
let my_int: int = 42
let my_float: double = 3.14d
let my_decimal: decimal = 19.99m
let my_bool: bool = true
let my_char: char = 'A'
```
These types are used to represent basic values in ghūl programs.

### arrays

ghūl supports arrays, which are fixed-size, **read-only** collections of elements of the same type. Array types are denoted using square brackets [] after the element type.

```ghul
let numbers: int[] = [1, 2, 3]
```

Arrays can be constructed with an [array literal](https://ghul.dev/expressions.html#array)
```ghul
let primes = [2, 3, 5, 7, 11]
```

Array elements can be read with indexer syntax
```ghul
…
let p = primes[i]
```

### tuples
Tuples in ghūl are lightweight, immutable data structures that can hold a fixed number of elements of different types. Tuple types use parentheses `(` `)`, with elements separated by commas. Tuple literals are similarly constructed with `(` `)` and comma delimited elements. Tuples compare by structural equality: two tuples are equal when their corresponding elements are.

```ghul
let point: (int, int) = (10, 20)
let person: (string, int) = ("Alice", 30)
```

Tuple elements can be accessed using the dot `.` notation followed by the element name:

```ghul
…
let x = point.`0
let y = point.`1
let name = person.`0
let age = person.`1
```

Tuple elements can be given more descriptive names, either in the type or in the tuple literal:
```ghul
let point: (x: int, y: int) = (10, 20)
let person = (name = "Alice", age = 30)
let x = point.x
let y = point.y
let name = person.name
let age = person.age
```

ghūl also supports tuple destructuring:
```ghul
…
let (a, b) = point
let (name, age) = person
```

Destructuring also has a by-name form, `(local = field, ...)`, that pulls each element from a named field rather than by position; the positional and by-name forms are covered with [pattern matching](https://ghul.dev/control-flow.html#if-let).

### optional types

A type followed by `?` is an **optional** type: a value of `T?` can be present or absent. The same type written without the `?` is non-optional, and a non-optional value is always there.

```ghul
let ► name: string? = "Alice" // present
let nickname: string? = null // absent
```

The postfix `?` operator tests whether an optional has a value. A plain `if x?` narrows `x` to its non-optional form inside the branch, so the value reads directly:

```ghul
…
if ► name? then
    write_line("name is {name}") // name is non-optional here
fi
```

output:

```
name is Alice
```

A non-optional type never holds the absent case, so a `T?` is not assignable to a `T`. The compiler rejects it rather than warning:

```ghul
…
// rejected: a string? is not assignable to a string
let title: string = maybe
```

diagnostics:

- error: string? is not assignable to string
- warning: [non-optional] string expected but maybe may not hold a value

To pass a `T?` where a `T` is wanted, make the value present first: narrow it with `if x?` or `if let` (see [control flow](https://ghul.dev/control-flow.html#if-let)), assert it with `x!` (which throws when absent), or supply a fallback with `x ?? other`. Optional types work for reference and value types alike - and beyond those two, for generic code that doesn't know which one it has, and for user-defined types that never mention `T?` at all. The [optional types](https://ghul.dev/optional-types) page covers all of that, along with the `??` and `?.` operators and the warnings that keep optional handling honest.

### type conversions

ghūl does not perform implicit type conversion (coercion) between scalar types; all scalar type conversions must be explicitly cast. However, ghūl supports polymorphic behavior by allowing upcasting, where instances of derived classes or interfaces can be automatically coerced to compatible ancestor types in the class/interface hierarchy.

```ghul
// OK: both addends are type double
let d = 1.0d + 1.0d

// compile time error: addends are mixed types
// (double vs int)
let e = 1.0d + 1

// OK with explicit cast
let e = 1.0d + cast double(1)

// OK: "hello" is a string, and string derives
// from object
let o: object = "hello"
```

## variables

ghūl has three kinds of variables: locals declared within the body of a function or method, function or method arguments and variables captured by a function literal.

### locals

Local variables are declared with `let` followed by the variable name, an optional explicit type, and an initializer:

```ghul
let i = 1234
let j: int = 0
let k: int = 5678
```

### arguments

Arguments will be covered in detail with functions and methods, but the basic form is the argument name followed by its type.

```ghul
some_function(argument: type)
```

### captured variables
Variables captured by a function literal will be covered with [function literals](https://ghul.dev/expressions.html#capturing-and-closure). They are not explicitly declared but inferred from each function literal's body.

### scope

The scope of all variable definitions is from the point of declaration to the end of the innermost block that contains the declaration. Blocks will be covered later, but generally a block is a control flow statement or a function or method body.

### type inference and explicit types
ghūl infers the type of a local variable from its initializer. An explicit type can be given alongside; it's a compile time error if the initializer is not assignment compatible with it.

## literals
Literal expressions represent fixed values of a specific type.

```ghul
let integer_literal = 42
let floating_point_literal = 3.14
let string_literal = "Hello, world!"
let boolean_literal_true = true
let boolean_literal_false = false
```

## operators and expressions
### arithmetic operators
```ghul
let add = 1 + 2
let sub = 3 - 1
let mul = 3 * 3
let div = 12 / 3
let mod = 13 % 4
```

### comparison and logical operators
```ghul
let gt = 3 > 1 // true
let gte = 4 >= 4 // true
let lt = 3 < 1 // false
let lte = 4 <= 4 // true
let eq = 1 == 2 // false
let neq = 1 != 2 // true
```

```ghul
let list = [1, 2, 3]

let index = 4
let search_value = 3

// false
let and_then =
    index < list.count /\ list[index] == search_value

// true
let or_else =
    index >= list.count \/ list[index] != search_value
```

### bitwise and shift operators

The integer types have the usual bitwise operators - `&`, `|`, `^` - and the shift operators `<<` and `>>`. A shift count is an `int`, and the result keeps the left operand's type. The count is taken modulo the operand's width, following .NET: shifting an `int` by 32 is the same as shifting it by 0. `>>>` is the unsigned right shift: it shifts zeros into the leftmost bits where `>>` keeps the sign:

```ghul
…
bitwise(a: int, b: int) is
    write_line("{a & b} {a | b} {a ^ b}")

    // shift counts are int, and '>>>' shifts zeros in
    write_line("{1 << 4} {256 >> 3} {-16 >>> 2}")
si

bitwise(240, 60)
```

output:

```
48 252 204
16 32 1073741820
```

There is no bitwise complement operator.

## assignment

variables and properties can be updated via assignment statements

```ghul
…
let i mut = 0
let j = 10
let s mut = "Hello"

i = i + j
s = "{s} World!"

thing.property = i + j

write_line("i = {i}, s = {s}, thing.property = {thing.property}")
```

output:

```
i = 10, s = Hello World!, thing.property = 20
```


---

<a id="syntax"></a>

# syntax in ghūl

## projects and files

A ghūl project is composed of a set of ghūl source files. Source files should have a `.ghul` file extension, and must be UTF-8 text.

Each source file can contain zero, one or more global definitions. Definitions can be in any order and in any file. Source files can have any name, provided they have a `.ghul` extension, and can be in any folder under the project root (subject to any source file glob pattern given in the `.ghulproj`)

A file with no `namespace` can mix definitions with statements at the top level, so a whole program can read as a script with no explicit `entry` function. These are called [top-level statements](#top-level-statements).

## tokens and trees

Source files are translated into various kinds of tokens. Some tokens are a fixed sequence of characters (like the keyword `while`). Others are composed of characters according to various rules (identifiers, strings, numbers etc.)

With a couple of exceptions, ghūl tokens are similar to most common programming languages. The exceptions are:

### operators

Operators are any contiguous string of operator characters. This is only significant in the rare case where running together the characters that comprise two different operators might not have the result you expect

### escaped identifiers

A leading backtick escapes a keyword or operator so it can be used as an ordinary identifier: `` `while`` is the identifier `while`, and `` `+`` is the identifier `+`. The backtick is not part of the escaped name, so escaping a name that is not a keyword, like `` `count``, means the same as plain `count`. A backtick is only meaningful immediately before an identifier, operator, or opening bracket; anywhere else it is a dangling-backtick error.


## block structure

ghūl is a [block structured programming language](https://en.wikipedia.org/wiki/Block_(programming)). Source code in ghūl is composed of blocks, typically many of them, with blocks nested inside other blocks.

Blocks are delimited by keywords. The keywords that begin and end a block are specific to each different kind of block. This way of delimited blocks is descended from the ALGOL family of languages, most specifically from [ALGOL 68](https://en.wikipedia.org/wiki/ALGOL_68). It has the advantage of making the block structure clearer, both to someone reading the code and to the compiler.

```ghul
…
if x > y then
    write_line("x > y")
else
    write_line("x <= y")
fi
```

output:

```
x <= y
```

In this example `then`, `else` and `fi` all delimit blocks. The blocks they delimit contain statement lists, and they do so whether the `if` is used as a statement or as an expression - see [every arm is a statement block](https://ghul.dev/expression-oriented-programming.html#every-arm-is-a-statement-block).

## semicolons

A semicolon separates two statements or definitions written on one line. At the end of a line it is not needed: wherever the grammar could accept one, a line break stands in for it.

That is almost the whole of what a `;` does. Nothing reads it for meaning - a body's tail value is judged by its type, not by whether the statement carrying it was terminated - so the style throughout this site leaves it off. The one exception is a `;` between two string literals: adjacent string literals join into a single literal across a line break, so where a statement ends on a string and the next begins with one, the `;` is what keeps them apart, and `redundant-semicolon` never reports it.

A few line-start tokens keep a wrapped expression unambiguous. A line opening with `.`, `|` or `|>` carries the expression above it on, which is how member chains and pipes wrap. A line opening with `(`, `[`, an operator or `rec` starts something new, so a wrapped operator expression puts the operator at the end of the line rather than the start of the next.

Two warnings police the choice, and both are off unless asked for: `--warn missing-semicolon` reports every inferred boundary, for a project that writes its terminators out, and `--warn redundant-semicolon` reports a written one a line break would infer anyway.

## definitions and statements

Blocks in ghūl can contain definitions, statements, or a mix of both. Which is permitted in a given block depends on the type of block.

## file structure

At its top level a ghūl source file contains [definitions](https://ghul.dev/definitions.html) and `use` directives; a file with no `namespace` can also contain statements. There is no required ordering and no file header.

```ghul
use IO.Std.write_line

greet(name: string) is
    write_line("hello, {name}")
si

greet("world")
```

output:

```
hello, world
```

The definitions in a file can be global functions, properties, classes, structs, traits, unions and enums, or `namespace` blocks that group definitions under a name. A definition is visible to the rest of the project regardless of which file it appears in, so how source is split across files is purely a matter of organisation.

A file that declares any `namespace` must place all of its definitions inside namespaces. A file with no namespace at all has its definitions placed in a private namespace of their own, which is convenient for small programs and tests. Namespaces, `use` and symbol visibility are covered in full under [definitions](https://ghul.dev/definitions.html#namespaces).

## top-level statements

A file with no `namespace` can also have statements at its top level. They run in source order as the program's entry point, so a short program needs no `entry` function:

```ghul
use IO.Std.write_line

// in a file with no namespace, statements at the top level run in
// order as the program's entry point
write_line("first")
write_line("second")

// definitions in the same file are still visible, wherever they sit
greet(name: string) is
    write_line("hello, {name}")
si

greet("ghūl")
```

output:

```
first
second
hello, ghūl
```

Definitions in the same file are still hoisted, so a top-level statement can use a function or type declared anywhere in the file. Top-level statements and a `namespace` cannot appear in the same file.

Otherwise, execution of a program begins at a function named `entry`.


---

<a id="definitions"></a>

# definitions

## variables

In ghūl local variables are defined with the `let` keyword. A variable defined with a bare `let` cannot be reassigned: an initializer is required, and the compiler reports an error if the variable is assigned again. The type is inferred from the initializer:

```ghul
let x = 10
```

A bare `let` fixes the variable, not the value: after `let xs = LIST[int]();`, `xs` always refers to the same list, but the list itself can still be mutated. Whether the value can change is a property of its type: a tuple or an array cannot be modified, a `LIST` can.

An explicit type can be given alongside the initializer. The initializer must be assignment compatible with the type:

```ghul
let x: int = 42
```

The explicit type can be wider than the initializer expression:

```ghul
let o: object = "a string"
```

A trailing `mut` makes the variable reassignable: `let total mut = 0;` defines `total` with initial value 0, and `total` can be assigned again later. A `mut` variable can also be defined with no initializer, as in `let result: int mut;`. It then starts at the default value of its type: zero, `false`, or `null`.

Either form can take its value from `_`, the default-value expression: `let x = _;` initializes `x` to the default value of whatever type the context expects, and `_[T]` names the type explicitly.

Multiple variables can be defined in the same `let` statement, with each variable either taking its type from its initializer or given an explicit one:

```ghul
let
    an_inferred_int = 123,
    an_explicit_int: int = 456,
    a_string = "hello"
```

The name `_` is a discard placeholder. It can stand in for any variable name, but the value that would be assigned to it is discarded. `_` is accepted in `let` definitions, tuple destructuring, anonymous function parameters, and `for` loop variables:

```ghul
…
let _ = side_effect()
let (_, _, third) = (1, 2, 3)
let only_first = (x: int, _: int) => x
for _ in 1..10 do
    counter = counter + 1
od
```

Variables can only be defined within functions, methods or property bodies. Variable names should be in `snake_case`.

## functions

In ghūl functions consist of a name and a parenthesized formal arguments list, followed by an optional return type after `->` (omitting it makes the function `void`), and then either a return expression or a function body:

```ghul
sum_two_ints(i: int, j: int) -> int => i + j

sum_three_ints(i: int, j: int, k: int) -> int is
    return i + j + k
si
```

`=>` introduces a single-expression body, while the `is` and `si` keywords are used to delimit block bodies.

To return a value from a block body, you can write it as the last statement with no terminating `;`, instead of writing `return`. Any statement that produces a value works: an expression, an `if`, a `case`, a parenthesised block. With the `;`, the value is discarded, like the value of any other expression statement. See [block bodies return their tail](https://ghul.dev/expression-oriented-programming.html#block-bodies-return-their-tail) for the rule in full.

```ghul
…
class RECTANGLE(width: int, height: int) is
    // a method body ends the same way a function body does
    area() -> int is
        width * height
    si

    // a terminated last statement is discarded, so this one returns explicitly
    describe() -> string is
        let label = "{width}x{height}"

        return "{label} = {area()}"
    si
si
…
```

output:

```
3x4 = 12
```

Functions can only be defined at global scope. Functions can be generic, which will be covered later. Function names should be in `snake_case`.

## arguments

Arguments consist of a name followed by a type. The type is mandatory as the compiler cannot infer types here.

```ghul
do_something(what: string, why: string, to: int)
```

A formal argument can also be a tuple-destructure pattern, written in its own parentheses. It is still one argument, with the written tuple type; when the function is called, the value is unpacked into the names the pattern gives. Named functions, anonymous functions, asynchronous functions and generators all accept them, and the type can be any type that destructures positionally:

```ghul
…
// one parameter at the tuple type, unpacked into a and b
add_pair((a: int, b: int): (int, int)) -> int => a + b

write_line(add_pair((3, 4)))

// anonymous functions take the same form, element types
// inferred from the sequence
let pairs = [(1, 2), (3, 4)]
let total = pairs |> map(((a, b)) => a + b) |> reduce(0, (acc, x) => acc + x)

write_line("{total}")
```

output:

```
7
10
```

## types

### classes

Classes consist of a name optionally followed by a superclass name and the types of any traits implemented, and then the class body. The class body is delimited by keywords `is` and `si`:
```ghul
class THING is
    // class body
si
```

A class defines a new reference type, instances of which are assignment compatible with its superclass type and any traits it implements.

Instances of classes are created via a constructor expression, which consists of a type expression followed by a parenthesis delimited list of actual constructor arguments. For a class, the type expression is the class name, qualified with any namespaces if needed:
```ghul
…
let a_thing = THING()
```

A class can also declare its constructor parameters directly in the header. Each parameter becomes a parameter of the synthesised constructor, and an auto-generated same-named field or property holds the supplied value:
```ghul
class POINT(x: int, y: int) is
si
```

The two forms are equivalent. The primary form is the shorter shape when every field is initialized from a constructor argument; the classic form is the better fit when the body owns extra fields or properties beyond what the constructor takes. See [constructors](#constructors) for the rest of the primary-constructor surface area.

Two postfix modifiers control the class hierarchy. Without `open`, a class can be subclassed only within the assembly that declares it; `open` allows subclassing from other assemblies. `abstract` means the class itself cannot be constructed: only its subclasses can. A class is also implicitly abstract when it declares an instance method with no body, because that method is a contract for subclasses to satisfy.

Because the compiler knows every subclass of a closed class, an `isa` test can narrow in the else branch too: ruling out the tested subclass leaves the others, and when an `abstract` root has exactly two subclasses, ruling out one leaves the other. See [type narrowing](https://ghul.dev/type-narrowing.html).

Classes can only be defined at global scope. Classes can be generic, which will be covered later. Concrete class names should be in `MACRO_CASE`. Abstract class names should be in `PascalCase`.

### structs

Structs consist of a name, then the types of any traits implemented, and then the struct body again enclosed in `is` / `si`. A struct can also use the primary-constructor header form:
```ghul
struct POINT(x: double, y: double) is
si
```

Structs are constructed the same way as classes, with a constructor expression:
```ghul
…
let origin = POINT(0.0D, 0.0D)

// or up, or down, or even left, depending on
// your co-ordinate system!
let right = POINT(1.0D, 0.0D)
```

A struct defines a new value type. Assigning a struct copies all of its fields, so the copy and the original are independent afterwards:
```ghul
…
struct COUNTER is
    _n: int field

    init(n: int) is _n = n; si

    bump() is _n = _n + 1; si

    value: int => _n
si

let original = COUNTER(0)
let copy mut = original

copy.bump()

write_line("original {original.value}, copy {copy.value}")
```

output:

```
original 0, copy 1
```

`==` is not defined for structs. To give a struct an equality operator, define `=~`, described under [defining operators](#operators) and, for the .NET side, under [making your own types work with .NET](https://ghul.dev/dotnet-integration.html#equality).

Structs can only be defined at global scope. Structs can be generic, which will be covered later. Struct names should be in `MACRO_CASE`.

### traits

A trait consists of a name, the types of any parent traits that must also be implemented, and then the trait body:

```ghul
trait Printable is
    ◆ print()
si
```

Traits are similar to interfaces in other languages. Trait methods and properties without a default implementation must be implemented by any class, struct, or union that declares the trait:
```ghul
…
class BOOK(title: string, author: string): Printable is
    ▲ print() is
        write_line("Title: {title}, Author: {author}")
    si
si
```

A trait method or property can provide a default body. Implementing classes inherit the default and only need to override it to change the behaviour:

```ghul
…
trait ▼ Logged is
    ▼ log(message: string) is
        // the default body writes the message with a [log] prefix
        write_line("[log] {message}")
    si
si

class PLAIN(): Logged is
    // no override - uses the trait default
si

class LOUD(): Logged is
    // override the default, while still calling through to it with super
    ▲ log(message: string) is
        super.log(message.to_upper())
    si
si

PLAIN().log("hello")
LOUD().log("hello")
```

output:

```
[log] hello
[log] HELLO
```

A class override can call the trait's default with `super.method()`.

Traits can only be defined at global scope. Trait methods and properties can be abstract or have a default implementation. Trait names should be in `PascalCase`.

Like a class, a trait is closed to other assemblies unless it has the postfix `open` modifier. A closed trait can be implemented and derived from only within the assembly that declares it; `open` opts in to cross-assembly extension. Inside the declaring assembly nothing changes.

### unions

A union consists of a name and then a union body, which contains one or more variants. Each variant has a name, and then an optional list of fields:
```ghul
union Tree is
    NODE(left: Tree, right: Tree)
    LEAF(value: int)
si
```
Unions are a reference type. A reference of union type can point to only one variant at a time. To discover which variant a union currently holds, test it with `isa Variant(value)`:

```ghul
…
let tree: Tree = Tree.NODE(Tree.LEAF(123), Tree.LEAF(456))
let leaf = Tree.LEAF(123)

if isa Tree.NODE( ► tree) then
    write_line("have tree node")
elif isa Tree.LEAF( ► tree) then
    write_line("have tree leaf")
fi
```

output:

```
have tree node
```

`isa Variant(value)` does two things at once: it tests the variant, and within the then-branch it narrows the value to that variant, so the variant's own fields are accessible directly:

```ghul
if isa Tree.NODE(tree) then
    write_line(
        "left {tree.left}, right {tree.right}"
    )
elif isa Tree.LEAF(tree) then
    write_line("leaf value {tree.value}")
fi
```

Unions support structural equality through the `=~` operator. Two union references compare equal when they hold the same variant with member-wise equal fields:

```ghul
…
let leaf1 = Tree.LEAF(123)
let leaf2 = Tree.LEAF(123)
let leaf3 = Tree.LEAF(456)

assert leaf1 =~ leaf2
assert !(leaf1 =~ leaf3)
```

A variant with no fields is a *unit variant*. It is referenced by name, without parentheses, and all uses of a unit variant share one value. When exactly one variant of a union has fields, the union behaves as an option type: `u?` tests whether `u` holds that variant, and `u!` unwraps its value. A union where several variants have fields can mark one of them `default` to get the same behaviour:

```ghul
…
let c = Color.RED                   // unit variant, referenced without parentheses
write_line("red: {c =~ Color.RED}") // true

let r = lookup()
write_line("present: {r?}")         // true - r holds the default OK variant
write_line("value: {r!}")           // 42 - unwraps the OK payload
```

output:

```
red: True
present: True
value: 42
```

A union can declare a primary-constructor header for state shared across every variant. Each variant splices the shared parameters into its field list with `..`, and a variant with no extra fields drops the list entirely. A union can also implement traits after its header, with each trait member satisfied by a default or by a property the union supplies:

```ghul
…
let t = Token.IDENTIFIER("count", "identifier")
write_line(t.name)    // identifier - shared primary-header field
write_line(t.label()) // [identifier] - inherited trait default
```

output:

```
identifier
[identifier]
```

Unions can only be defined at global scope. Union names should be in `PascalCase` and variant names should be in `MACRO_CASE`.

### enums

An enum consists of a name and then an enum body, which contains one or more elements. Each element has a name and an optional constant integer value.

```ghul
enum Suits is
    SPADES,
    HEARTS,
    DIAMONDS,
    CLUBS
si
```

Enums can only be defined at global scope. An enum type name should be in `PascalCase`, and its members in `MACRO_CASE`.

Enum values compare for equality and order: `=~` and `==` compare by the underlying integer, and `<`, `<=`, `>` and `>=` order by it. `=~` on an optional enum is not supported; narrow the value first. An individual member can be imported by name - `use Some.Namespace.Suit.HEARTS;` - as well as reached through the type.

### partial and impl blocks

A `partial` block adds members to a class, struct, or union declared elsewhere in the same assembly, even in another file. The added members are ordinary members of the target, exactly as if they were written in the type's own body: public or private according to their names, virtual as usual, and with access to the type's private members. For a union, whose body holds only variants, a `partial` block is the only way to give the type methods:

```ghul
…
union Shape is
    CIRCLE(radius: int)
    SQUARE(side: int)
si

partial Shape is
    describe() -> string =>
        case ► self
        when c: CIRCLE then "circle r={c.radius}"
        when s: SQUARE then "square s={s.side}"
        esac
si

let s: Shape = Shape.SQUARE(4)
write_line(s.describe())
```

output:

```
square s=4
```

An `impl Trait for Type` block additionally makes the target implement a trait, so a type can satisfy a trait without naming it in its header. The trait's type arguments are written on the target after `for`, and inside the body `self` has the concrete target type, so a union's variants can be matched directly:

```ghul
…
union List is
    NIL
    CONS(head: int, tail: List)
si

impl Printer for List is
    ▲ print() -> string =>
        if let (head, tail): CONS = ► self then "{head} {tail.print()}"
        else "nil"
        fi
si

let xs: Printer = List.CONS(1, List.CONS(2, List.NIL))
write_line(xs.print())
```

output:

```
1 2 nil
```

The target can be a qualified name, including a single union variant (`impl Printer for List.NIL`). The interface must be a trait, and the target a type declared in the same assembly; an imported type cannot be reopened.

Every method or property accessor that a `partial` or `impl` block adds to a union must be pure. Either the compiler must be able to prove from the body that the member does not write to the heap, or the member must be declared `pure`; one that writes and is not declared is reported with an `impure-union-method` warning.

## properties

A property consists of the property name followed by the property's type and, optionally, bodies for getter and setter methods.

```ghul
class COUNTER is
    count: int
si

class SIZED is
    _size: int

    size: int => _size,
        = new_size is
            assert new_size > 0

            _size = new_size
        si
si
```

Public properties with no getter or setter are automatically backed by a hidden field. Private properties with no getter or setter are implemented as a plain field.

A property can take a postfix `stable` modifier. It addresses a problem specific to narrowing through a property: every read of the property calls the getter, so a narrowing like `if p.value? then ... p.value ...` is only sound if the second read agrees with the first. The compiler proves that from the getter's body where it can. Where it cannot - a getter that fills a cache, for example - declaring the property `stable` states the promise instead. The promise is narrow: two reads with nothing between them agree on whether the value is present, and on its runtime type. It does not say the value never changes - other code can still write to what the getter reads, and a call between two reads is judged the same way as for any other narrowing fact:

```ghul
…
// a memoising getter stores, so it is not provably
// stable - declare it with postfix stable instead
summary: string? stable is
    if ► _summary? then
        return _summary
    fi
    ► _summary = "nothing to report"
    return _summary
si

init() is si

describe() is
    if ► summary? then
        write_line(summary)
    fi
si
…
```

output:

```
nothing to report
```

`stable` is a contract like `pure`: every override must itself be stable, declared or proven from its body.

Properties can be defined globally and within classes, structs and traits. Property names should be in `snake_case`.

## methods

Methods are syntactically the same as functions, except they are defined within classes, structs or traits.

```ghul
class SCALER is
    _scale: double

    scale(value: double) -> double => value * _scale
si
```

A method or function can take a postfix `pure` modifier. It declares that the function does not write to the heap: it assigns no field, property, or array element of any object. The compiler proves this from the body for most functions without needing the modifier. The declaration matters to [type narrowing](https://ghul.dev/type-narrowing.html#calls-purity-and-stable): a call can invalidate a narrowing, because the callee might assign the member the narrowing depends on, but a call to a pure function cannot, so narrowings survive it. The modifier exists for bodies the compiler cannot prove; it is trusted as declared, and every override of a pure member must itself be pure:

```ghul
…
// a pure method only reads: callers keep narrowing facts across a call to it
doubled() -> int pure => _count * 2
…
```

output:

```
42
```

A `pure` declaration is trusted, not checked, and that is deliberate: a function can write to the heap and still reasonably declare itself `pure` when its writes are not observable to callers - filling a cache, or interning a value. The compiler does not track what a declared-pure function writes. If a write does turn out to be observable, narrowings are unsound across calls to the function: code can rely on a value being present, or having a type, that the write no longer supports, and no error or warning reports it. A property getter that fills a cache is not this case - its write is to the state its own answer comes from - so declare it `stable`, described under [properties](#properties), rather than `pure`.

`pure` can also be written on a class, struct, or trait header. Every instance member of the type must then be pure: either the compiler must be able to prove from the member's own body that it assigns no field, property, or array element of any object - its own included - or the member must be declared `pure`. A member that writes and is not declared pure is reported as an error. Writes that are part of a type's normal operation are exempt: constructors assign fields, and static members can keep their own state.

A pure type also cannot expose a write to its callers. Declaring a property `public` would make its assign accessor callable from outside, so it is rejected; a getter that writes through an assign accessor is rejected too, because a caller sees a getter as a read. A member declared with no body in a pure type is implicitly `pure`, so a pure trait holds every implementing type to the same rule.

`pure` on a union is an error. Union members are held to purity through their `partial` and `impl` blocks regardless:

```ghul
…
// every instance member of a pure type must read and never
// write; a bodiless member holds implementors to the same rule
trait ▼ NAMED pure is
    ◆▼ name: string
    ◆▼ label() -> string
si

class USER: NAMED is
    ▲ name: string

    init(name: string) is
        self.name = name
    si

    ▲ label() -> string => "<{name}>"
si

write_line(USER("ada").label())
```

output:

```
<ada>
```

As with functions, methods should be named in `snake_case`.

## operators

An operator is a function or method whose name is an operator symbol rather than a word; there is no `operator` keyword. As an instance method the receiver is the left operand, so a binary operator takes a single parameter for the right operand:

```ghul
…
class VECTOR is
    x: int
    y: int

    init(x: int, y: int) is
        self.x = x
        self.y = y
    si

    // a binary operator as an instance method takes one parameter, the right operand:
    +(other: VECTOR) -> VECTOR => VECTOR(x + other.x, y + other.y)
si

let sum = VECTOR(1, 2) + VECTOR(3, 4)
write_line("({sum.x}, {sum.y})")
```

output:

```
(4, 6)
```

Written as a global function or a `static` member instead, an operator takes both operands as parameters: `+(a: VECTOR, b: VECTOR) -> VECTOR`. A prefix operator is always a one-parameter function, defined globally or in the operand's type.

Every operator has a precedence taken from its first character, so an operator starting with `*` binds tighter than one starting with `+`, with no declaration needed. The `@precedence` pragma places an operator in a specific band when the default doesn't suit it.

The comparison operators come from two backing operators. Define `<>`, a three-way ordering that returns a negative, zero, or positive `int`, and `<`, `<=`, `>`, and `>=` follow from it; define `=~`, an equality returning `bool`, and `!~` follows as its negation:

```ghul
…
// three-way ordering returning int; '<', '<=', '>', '>=' all derive from it:
<>(other: BOX) -> int => value - other.value
…
```

Operators can be defined globally, or as members of classes, structs and traits. An operator name is any run of symbol characters, such as `+`, `**`, `##`, or `∩`.

## constructors

In ghūl methods named `init` are constructors. When an object is constructed using a constructor expression, the corresponding `init` method overload will be called based on the actual argument types:

```ghul
class COUNTER is
    count: int

    init() is
        count = 0
    si

    init(initial_count: int) is
        count = initial_count
    si
si
…
// calls the parameterless overload of init()
let c = COUNTER()

// calls init(initial_count: int)
let d = COUNTER(50)
```

Constructors can be defined in classes and structs.

A member whose type is not optional has to be assigned before the constructor finishes. The compiler tracks which members each constructor definitely assigns, and reports a `field-definite-assignment` warning on a constructor that can finish with one or more of them unassigned, naming each one: the object it produces would hold null in a member whose type does not allow it:

```ghul
…
class LABEL is
    text: string
    size: int

    init(size: int) is
        self.size = size    // text is never assigned
    si
si
```

diagnostics:

- warning: [field-definite-assignment] text is not assigned on every path out of this constructor [text declared here: definitions-49.ghul: 4,5..4,9]

An assignment counts if it happens on every path through the constructor: either the constructor assigns the member itself, or it calls a method on `self` that does, and that call itself happens on every path. A method call that might not happen, or that a subclass could override, does not count, and neither does an assignment to another object's members. Optional members are allowed to be absent, and value-type members cannot hold null, so neither is checked. Suppress with `@suppress("field-definite-assignment")` on the constructor or the file, or project-wide.

### primary constructors

When the constructor only assigns its arguments to same-named fields, the class or struct header can declare those parameters directly. The compiler synthesises the matching `init` and a same-named field or property for each parameter:

```ghul
…
class PERSON(name: string, age: int) is
    describe() is
        write_line("{name} is {age} years old")
    si
si

PERSON("alice", 30).describe()
```

output:

```
alice is 30 years old
```

A trailing modifier on a primary parameter overrides the default visibility:

- `x: int public` - public read and write.
- `x: int protected` - readable from the declaring class and its subclasses.
- `x: int field` - plain field rather than the default auto-property.
- `_x: int` - private field, named `_x`.
- `x: int init` - no field is generated; `x` is in scope only inside `init`.

An explicit field or property declaration whose name matches a primary parameter, either exactly or as `_x` matching parameter `x`, replaces the auto-generated member; the constructor assigns the parameter's value to it. Declaring `_x;` for a parameter `x` is also how to give the underlying storage a different name without a modifier suffix:

```ghul
…
class POINT(x: int, y: int) is
    // capture the primary parameters as renamed private fields
    _x
    _y

    show() is
        write_line("({_x}, {_y})")
    si
si

class BOX(width: int public, height: int field, _depth: int) is
    // width is a public read-write property
    // height is a plain field
    // _depth is a private field
si

POINT(10, 20).show()
```

output:

```
(10, 20)
```

A class with a primary header can also include a `super(...)` body declaration that forwards expressions to its superclass `init`, and secondary `init(.., extras)` overloads. The `..` expands to the primary parameters, and a secondary constructor calls the primary `init` before running its own body:

```ghul
…
class DOG(name: string, breed: string): ANIMAL is
    // forward name to the superclass; the local DOG keeps breed as a field
    super(name)

    init(.., trick: string) is
        // .. expands to (name, breed); the primary init has already run
        write_line("{name} the {breed} can {trick}")
    si
si

DOG("rex", "labrador", "sit")
```

output:

```
rex the labrador can sit
```

A primary-constructor class or struct also gets a synthesised `deconstruct` built from its public-readable parameters, so `let (x, y) = POINT(3, 4)` destructures without writing one out.

A class or struct with a primary header and no body declarations can end with a terminating `;` instead of `is ... si`:

```ghul
// a primary header with no body declarations:
class POINT(x: int, y: int)

// is equivalent to an explicit empty 'is' / 'si' body:
class VECTOR(dx: int, dy: int) is
si
```

The classic form is the better fit when the body owns extra fields or properties beyond what the primary parameters cover.

## namespaces

Namespaces are introduced with the `namespace` keyword followed by the namespace name and then the namespace body.

```ghul
namespace Example is
    ...
si
```

Namespaces can be nested inside other namespaces:
```ghul
namespace Outer is
    namespace Inner is
        do_something() is
            IO.Std.write_line("did something")
        si
    si
si
…
Outer.Inner.do_something()
…
```

output:

```
did something
```

A dotted namespace name is shorthand for nesting namespaces:

```ghul
namespace Outer.Inner is
    do_something() is
        IO.Std.write_line("did something")
    si
si
…
Outer.Inner.do_something()
…
```

output:

```
did something
```

### namespace aggregation

A namespace definition is an instance of that namespace. Namespace instances are aggregated across all source files to form a single namespace scope. This means that all definitions within a namespace instance are visible unqualified within all other instances of that namespace in all source files:

`source-file-1.ghul`:
```ghul
namespace Example is
    // this definition of Test is visible unqualified
    // throughout the Example namespace:
    trait Test is
        ◆ run()
    si
si
…
```

`source-file-2.ghul`:
```ghul
…
// class TEST can implement the Test trait without having
// to qualify the name Test:
class TEST: Test is
    ▲ run() is si
si
…
```

### definitions outside any namespace

If a source file contains no namespaces, then all definitions in the file are placed in a compiler generated namespace that is private to that source file, and the file can have [top-level statements](https://ghul.dev/syntax.html#top-level-statements) that run as the program's entry point. This is useful for examples and tests:

```ghul
// the compiler places this in an auto-generated
// namespace private to this source file
IO.Std.write_line("Hello, world!")
```

output:

```
Hello, world!
```
For definitions to be visible from other files, they must be placed in an explicitly declared namespace.

### namespace usage consistency

If a source file contains any explicitly declared namespaces, then all definitions in that file must be within a namespace. Bare definitions outside of namespaces are not allowed in files with namespace declarations:

```ghul
…
namespace Example is
    entry() is
        IO.Std.write_line("hello from a namespace")
    si
si
…
greet() is
    IO.Std.write_line("not in a namespace")
si
```

diagnostics:

- error: cannot mix global definitions and namespaces in the same file

## importing symbols with `use`
Symbols can be brought into the current namespace instance's scope using the use keyword. Imported symbols can then be used without qualification:

```ghul
use Example.TEST

...

let t = TEST()
```

`use` applied to a namespace imports all symbols from that namespace:
```ghul
use Example // imports Example.TEST and Example.Test

...

let t: Test
```

Note that `use` only applies within the current `namespace` definition. It does not import a symbol into all instances of the current namespace:

```ghul
…
namespace UseExample is
    use Example

    class ANOTHER_TEST: Test is
        ▲ run() is si
    si
si

namespace UseExample is
    // Test still needs qualification here
    class YET_ANOTHER_TEST: Example.Test is
        ▲ run() is si
    si
si
…
```

## visibility of symbols

In ghūl, the visibility of symbols outside their defining scope is managed by a naming convention which is partially enforced by the compiler. The compiler also warns when a declaration's name doesn't match the convention for its kind - `non-snake-case-name`, `non-pascal-case-name`, or `non-upper-snake-case-name` - each suppressible per declaration, per file, or project-wide. A class with only `static` members is a utility container that is never constructed, and accepts either `PascalCase` or `MACRO_CASE`.

### global symbols

Classes, structs, traits, unions, global functions and global properties are accessible from any namespace. Prefixing their names with `_` makes them private to the assembly they are declared in: within the assembly they stay reachable from any namespace, but another assembly cannot see them, and a reference from one is a compile error:
```ghul
class PUBLIC is
si

public_function() -> int => 0

public_property: int

class _PRIVATE is
si

_private_function() -> int => 0

_private_property: int
```

### methods

Methods are public unless their name starts with `_`, which makes the method private: it is visible only within its declaring class, and the compiler enforces that:
```ghul
class THING is
    do_something_public() is
    si

    _do_something_private() is
    si
si
```

### properties
Properties are public to read but private to assign - a property is assignable only within its defining type. A property whose name starts with `_` is private to read as well:
```ghul
…
struct VALUE is
    public_property: int

    _private_property: string

    init(value: int) is
        public_property = value
        _private_property = "value is {value}"
    si
si
…
let v = VALUE(1234)

// OK: public_property is publicly readable
write_line(v.public_property)

write_line(v._private_property)

v.public_property = 5678
```

diagnostics:

- error: _private_property: string is not accessible here
- error: VALUE.public_property: int is not publicly assignable

### protected access

The rules above describe the default, `--underscore-access private`. Compiling with `--underscore-access protected` instead widens an underscore member's reach to the declaring class and its subclasses within the same assembly, for a codebase that relies on subclasses reading `_` members. Underscore types, global functions and global variables are unaffected - they are private to their assembly under either setting.


---

<a id="expressions"></a>

# expressions

Expressions in ghūl are constructs that evaluate to a value. They can be used to perform calculations, make comparisons, and combine values in various ways.

## literals

### integers

Integer literals consist of an optional radix (base), followed by a sequence of digits with optional underscores for readability, followed by a dot and a decimal fraction and/or exponent (for floating point numbers) and finally a type suffix.

```ghul
let i = 12_345_678 // int
let hex = 0x1234_ABCD // int
let long = 1_000_000_000_000_000L // long

let hex_unsigned_long = 0x1234_5678__9ABC_DEF0_UL // ulong

let b = 99b // byte
```

### char
```ghul
let c = 'c'
let u_macron = 'ū'
```

### floating point
```ghul
let s = 123.456 // single
let t = 123.456E5 // single

let d = 123.456D // double
let e = 123_456_789_000.0D // double
```

### string
```ghul
let hello_world = "Hello World!"
let unicode = "ghūl programming language"
```

### array
Array literals are constructed from a comma separated list of element values enclosed in `[` and `]`. The array element type is inferred as the most specific type compatible with all elements (which may be `object` if no more specific ancestor type exists). The resulting array type is `E[]` where `E` is the inferred element type. 

```ghul
let animals = ["frog", "bat", "elephant"] // string[]
let things = ["frog", 1234, 12.5] // object[]
let lists = [[1, 2], [3, 4], [5, 6], [7, 7]] // int[][]
```

### tuple

Tuple literals are constructed from a comma separated list of elements enclosed in `(` and `)`. Each element can be a bare value or a named value, and each element can optionally specify a type. Where explicit types are omitted, element types will be inferred.

```ghul
let path_with_id = (path = "/tmp/my-file.txt", id = 1234)

let path = path_with_id.path
let id = path_with_id.id
```

If tuple elements are not explicitly named, they are assigned names consisting of a back-tick followed by an index

```ghul
let things = ("thing", 12.34)

let name = things.`0
let weight = things.`1
```

### function

Function literals are constructed from an parenthesized argument list, a return type, and a return expression or a function body. If there is only one argument, no parentheses are needed.

#### expression body function literal

```ghul
let simple_add = (x: int, y: int) -> int => x + y
```

#### block body function literal

```ghul
let complex_add = (x: int, y: int) -> int is
    let result = x + y
    return result
si
```

#### type inference

Return type can usually be omitted provided it can be inferred from the type of the expression body or any values returned from the block body

```ghul
let simple_add = (x: int, y: int) => x + y

let complex_add = (x: int, y: int) is
    let result = x + y
    return result
si
```

Argument types usually can be inferred if the function literal is being passed into a function.

```ghul
…
let list = [1, 2, 3, 4, 5]

list |> filter(element => element < 3)
```

#### capturing and closure

A function literal can refer to identifiers from its surrounding lexical scope; those references form its closure:

```ghul
…
// Define a list to hold the closures:
let closure_list = LIST()

// Iterate over an integer range:
for i in 1::10 do
    // Create a closure capturing i's current value
    let closure = () => i

    // Add the closure to the list:
    closure_list.add(closure)
od

// Each closure captured the value of i at the
// time of its creation:
for closure in closure_list do
    write_line("Closure captured value: {closure()}")
od
```

output:

```
Closure captured value: 1
Closure captured value: 2
Closure captured value: 3
Closure captured value: 4
Closure captured value: 5
Closure captured value: 6
Closure captured value: 7
Closure captured value: 8
Closure captured value: 9
Closure captured value: 10
```

An immutable `let` is captured by value, a snapshot taken when the function literal is constructed. A `let mut` is captured by reference instead, so the function literal and the surrounding scope share one live variable that either can read or reassign:

```ghul
…
let counter mut = 0

let bump = (n: int) is
    counter = counter + n
si

let peek = () -> int => counter

bump(10)
bump(5)

write_line("counter = {counter}, peek() = {peek()}")
```

output:

```
counter = 15, peek() = 15
```

## arithmetic

Arithmetic expressions allow you to perform mathematical calculations using operators such as `+`, `-`, `*`, `/`, and `%`.

```ghul
let sum = 10 + 5           // Addition
let difference = 10 - 5    // Subtraction
let product = 10 * 5       // Multiplication
let quotient = 10 / 5      // Division
let remainder = 10 % 3     // Modulo (remainder)
```

## comparison

Comparison expressions allow you to compare values using operators such as `==`, `!=`, `<`, `>`, `<=`, and `>=`.

```ghul
let equal = 5 == 5 // Equality
let not_equal = 5 != 10 // Inequality
let less_than = 5 < 10 // Less than
let greater_than = 10 > 5 // Greater than
let less_than_or_equal = 5 <= 5 // Less or equal
let greater_than_or_equal = 10 >= 10 // Greater or equal
```

## short circuit logical

Logical expressions allow you to combine or negate boolean values using the `/\` (logical AND), `\/` (logical OR), and `!` (logical NOT) operators.

```ghul
let logical_and = true /\ false    // Logical AND
let logical_or = true \/ false     // Logical OR
let logical_not = !true            // Logical NOT
```

Evaluation stops as soon as the result is known

## conditional

Conditional expressions allow you to evaluate different expressions based on a condition using the `if`-`then`-`else` construct.

```ghul
…
let max = if a > b then a else b fi
```

## case expression

A `case` expression yields the value of the matched arm. It needs an `else` arm so that every value is covered; the arm values and the `else` agree on a type:

```ghul
…
let n = 2

let size =
    case n
    when 0 then "none"
    when 1, 2, 3 then "small"
    else "large"
    esac

write_line("size = {size}")
```

output:

```
size = small
```

## function call

Function call expressions allow you to invoke functions and methods by providing the necessary arguments.

```ghul
…
let result = sum(10, 5)
```

## thread-first calls

The `|>` operator threads its left side into the call on its right as that call's first argument, so `x |> f(a)` means `f(x, a)`. Chaining is left-to-right, which turns a nest of calls inside-out into a readable pipeline:

```ghul
use IO.Std.write_line

class BOX(value: int)

twice(x: int) -> int => x * 2
describe(b: BOX) -> string => "box of {b.value}"

// '|>' threads its left side in as the first argument of the call on
// its right, so a chain reads left-to-right instead of nesting
// inside-out. This line means write_line(describe(BOX(twice(21)))).
21 |> twice() |> BOX() |> describe() |> write_line()
```

output:

```
box of 42
```

The right side must be call-shaped: a free function, a constructor, or a method call on a receiver. The left side always becomes the first argument; the call is otherwise resolved exactly as if it had been written without the `|>`. `|>` performs an ordinary call: it is how the pipe combinators are chained.

## property access

Property access expressions allow you to access the properties of an object using the dot notation.

```ghul
let length = "Hello".length
```

## indexer

Indexer expressions allow you to access elements of an array or collection using square brackets.

```ghul
let first_element = [1, 2, 3][0]
```

## constructor

Constructor expressions allow you to create new instances of classes or structs by invoking their constructors.

```ghul
…
let point = POINT(10, 20)
```

## type cast

A type cast converts a value from one type to another explicitly, using the `cast` keyword. Scalar conversions, casts between unrelated reference types, and .NET user-defined conversion operators all go through it:

```ghul
let integer_value = cast int(3.14)
```

The target type can be left out when the surrounding expression already determines it. `cast(v)` converts `v` to whatever type the position it sits in calls for - a typed `let` initializer, an assignment, a `return` or `=>` body, a call argument's formal, an operator's other operand, an index:

```ghul
…
average(count: int, total: single) -> single =>
    total / cast(count)   // cast(v) takes its type from the formal

write_line("{average(4, 10.0)}")
```

output:

```
2.5
```

`cast(v)` is rejected where the position supplies no type at all, or where more than one overload or operator would accept it.

A cast written with an optional target yields rather than throwing: `cast T?(x)` is the absent value when `x` is not a `T`, which is the form [`if let`](https://ghul.dev/control-flow.html#if-let) builds on. Without the `?` the cast is checked: a failed one raises `System.InvalidCastException` at the point of the cast, and a `cast-may-throw` warning says so at the site.

## default value (`_`)

The `_` expression evaluates to the default value of a type: `null` for reference types, the zero value for numeric and other value types.

`_[T]` pins the type explicitly. A bare `_` takes its type from the surrounding context: a typed `let`, an assignment, or a return:

```ghul
let a = _[int]   // 0
let b: string? = _   // null
…
zero[T]() -> T => _
```

`let a = _` initialises a local to its type's default value, where the type is inferred from how the local is later used.

## let in

A `let ... in ...` expression introduces one or more local variables that are in scope only within the trailing expression.

```ghul
…
let area = let r = 5 in r * r

write_line("area = {area}")
```

output:

```
area = 25
```

## block

A parenthesised block is a sequence of statements in `(` and `)` that produces a value. The value is the block's tail expression, or any `return E` whose target is the block. A block gives an expression room for intermediate local variables, loops, and early exits:

```ghul
…
let area = (
    let width = 4
    let height = 5
    width * height
)

write_line("area = {area}")
```

output:

```
area = 20
```

A `return E` inside a block yields from the block, not from the enclosing function.

These are the main types of expressions in ghūl. They can be combined and nested to form more complex expressions and statements:


```ghul
let x = 10
let y = 5
let sum = x + y
let product = x * y
let is_greater = x > y

if is_greater then
    IO.Std.write_line("x is greater than y")
else
    IO.Std.write_line("x is not greater than y")
fi

let numbers = [1, 2, 3, 4, 5]
let first_number = numbers[0]

IO.Std.write_line(
    "The first number is: {first_number}"
)
```

output:

```
x is greater than y
The first number is: 1
```


---

<a id="control-flow"></a>

# control flow in ghūl

> **editable examples**
>
> Every example on this page can be edited and run here: click the pencil to open it in an editor, change it, and run it in your browser. Errors, hovers and completions come from the ghūl compiler as you type.
>
> The [ghul-examples repository](https://github.com/degory/ghul-examples/tree/main/examples/control-flow) has fuller control-flow examples to build and run locally, in a GitHub Codespace or a dev container.

## block scope

In ghūl, most control flow statements incorporate one or more blocks. A block is a list of one or more statements that forms a scope for local variable definitions. The scope of a variable is the region of code where that variable is visible and can be accessed.
Blocks are delimited by keywords that are specific to their control flow statement. For example, if-then statements use `then` and `else`, `elif` or `fi` to delimit their blocks, while loops use `do` and `od`, and so on.
Variables defined within a block are only accessible within that block and any nested blocks. Once execution exits the block, those variables go out of scope and cannot be accessed anymore.

## assert statement

In ghūl the `assert` statement is used to ensure an expected condition holds and to throw an exception if it does not. An assert statement starts with `assert`, followed by an expression that must evaluate to a bool, followed by `else`, and then a value to throw. If the value to throw is a string, it will be wrapped in an `AssertionFailedException`. Otherwise it must be of a throwable type.

```ghul
…
assert true else "all bets are off" // does not throw

let list = [1, 2, 3, 4, 5]

assert 3 < list.count
    else System.ArgumentOutOfRangeException("list")

write_line("ok: {list.count} elements")
```

output:

```
ok: 5 elements
```

`assert` is also an expression. `assert cond else "msg" in expr` guards a value and chains like `let x in expr`: a failing assert throws, a passing one yields the trailing expression. Any narrowing the condition establishes flows into that expression, so a value checked present reads directly there:

```ghul
…
length_of(key: string?) -> int =>
    assert ► key? else "key is null" in
    key.length

write_line(length_of("hello"))
```

output:

```
5
```

## if statement

If statements allow the execution of different code blocks based on specific conditions. An `if` is also an expression that yields the value of its chosen branch; see [if as an expression](https://ghul.dev/expressions#conditional).

### if-then-fi

This is the simplest form of a conditional statement. It checks a condition and executes the subsequent block of code if the condition is true.

```ghul
if condition then
    // code to execute if condition is true
fi
```

```ghul
…
let list = [1, 2, 3, 4]

if list.count > 0 then
    write_line("list has {list.count} elements")
fi
```

output:

```
list has 4 elements
```

### if-then-else-fi

This form allows for an alternative block of code to be executed if the condition is false.

```ghul
if condition then
    // code to execute if condition is true
else
    // code to execute if condition is false
fi
```

```ghul
…
if list.count > 0 then
    write_line("list is not empty")
else
    write_line("list is empty")
fi
```

output:

```
list is not empty
```

### if-then-elif-fi

This form is used for multiple conditions. If the initial condition is false, the `elif` conditions are checked in order. The corresponding block for the first true condition is executed.

```ghul
if first_condition then
    // code for first condition
elif second_condition then
    // code for second condition
// ... (more elif conditions if needed) ...
else
    // code if all conditions are false
fi
```

```ghul
…
let list = [1, 2, 3, 4]

if list.count == 0 then
    write_line("list is empty")
fi

if list.count > 0 then
    write_line("list is not empty")
else
    write_line("list is empty")
fi

if list.count > 10 then
    write_line("list has lots of elements")
elif list.count > 5 then
    write_line("list has some elements")
elif list.count > 0 then
    write_line("list has a few elements")
else
    write_line("list is empty")
fi
```

output:

```
list is not empty
list has a few elements
```

### type narrowing

An `if` condition that proves something stronger about a value - an `isa` test on a class or union variant, a `?` presence test on an optional - narrows the value to the stronger type inside the branch, and a guard that leaves the block narrows the code after it. [Type narrowing](https://ghul.dev/type-narrowing.html) covers this in full: locals, parameters, fields and properties, narrowing on assignment, and what happens to a narrowing across calls.

### if let

`cast T?(x)` views `x` as type `T`, and yields the absent value (rather than throwing) when `x` is not a `T`. A cast followed by a presence test is therefore a safe, explicit type test. Written without the `?`, the cast is checked instead: a value that is not a `T` raises `System.InvalidCastException` there, and a `cast-may-throw` warning says so at the site. See [type cast](https://ghul.dev/expressions.html#type-cast) for the rest of the cast surface.

```ghul
…
let c = cast CAT?(a)

if ► c? then
    write_line(c.purr())
fi
```

output:

```
whiskers purrs
```

`if let` folds that into the `if` itself: it puts a `let` definition in the condition of an `if` or `elif`. The then-branch runs only when the value is present, with the variable in scope (and narrowed) just within that branch:

```ghul
…
if let c: CAT = ► a then
    // c has type CAT here; it is not in scope in
    // the else branch, or after the fi
    write_line(c.purr())
else
    write_line("not a cat")
fi
```

output:

```
whiskers purrs
```

A type on the variable (`c: CAT`) makes it a type test. `elif let` chains these, so a sequence of type tests reads as one construct:

```ghul
…
if let c: CAT = ► a then
    write_line(c.purr())
elif let d: DOG = ► a then
    write_line(d.bark())
else
    write_line("some other animal")
fi
```

output:

```
rover barks
```

With no type given for the local variable, `if let` tests that the value is present. This is the natural way to consume an [optional type](https://ghul.dev/optional-types): the local variable has the non-optional type within the then-branch, so there is no need for an explicit `!`.

```ghul
…
if let line = reader.read_line() then
    // reader.read_line() yields string?
    // line is string here
    write_line("read: {line}")
else
    write_line("end of input")
fi
```

output:

```
read: the only line
```

An `if let` can also destructure, exactly like a plain `let`, including `_` to discard a field that is not needed:

```ghul
…
if let (name, _) = lookup(id) then
    write_line("found {name}")
fi
```

output:

```
found ada
```

Destructuring comes in two forms. The positional form above, `(a, b)`, matches elements by position. The by-name form, `(local = field, ...)`, pulls each element from the named field instead: the left of each `=` is the local variable being introduced, the right names the member it is read from, so `(x = x, y = y) = point` introduces `x` and `y` from the fields of the same name, and `(new_x = x, new_y = y) = point` renames them. Each group of parentheses is either entirely positional or entirely by-name, and nested groups choose independently.

A trailing `/\` guard gates the branch on a further condition, evaluated with the new variable already in scope:

```ghul
…
if let c: CAT = find() /\ c.is_friendly then
    write_line("friendly cat: {c.name}")
fi
```

output:

```
friendly cat: Tom
```

Several comma-separated clauses can appear in one `if let`; every clause's test and any guard must pass, and later clauses see the variables the earlier ones introduced, as in `if let outer = holder, inner = outer.value then`. A destructure leaf can also be a literal - an integer, string, character, boolean, `null`, or a qualified enum member - which adds an equality test at that position rather than introducing a variable, so `if let (1, name) = pair then` matches only when the first element is 1. Literal leaves are allowed only in refutable positions like `if let` and `case`.

A leaf can instead match against a value that already exists: prefixing a name with `~` tests the source position for equality with that value rather than declaring a new variable. The marked value is read where the pattern is, so it can be anything equality can compare - a parameter, a local variable, a field:

```ghul
…
let rows = [("apples", 3), ("pears", 1), ("plums", 0)]
let wanted = "pears"

for row in rows do
    // ~wanted matches where the first element equals the
    // value wanted already holds; count binds as usual
    if let (~wanted, count) = row then
        write_line("found {count} {wanted}")
    fi
od
```

output:

```
found 1 pears
```

As with literal leaves, the comparison is the one `=~` would make, so strings match by content. A leading `~` is rejected where a leaf can only bind - a formal argument or an anonymous function's parameter list.

When the tested value is a member path and the local should take the path's last name, the `name =` can be dropped: `if let order.customer` introduces `customer` holding `order.customer` and enters the branch when it is present, and `if let zoo.pet: CAT` does the same with a type test. A trailing `?` on the presence form (`if let order.customer?`) is accepted but not required.

```ghul
…
if let order.customer then
    write_line(customer.name)
fi
```

output:

```
mimi
```

### scope
Each branch of an if statement constitutes a separate scope

```ghul
…
let a = 5

if a > 0 then
    // new scope - neither y nor z are in scope here
    let x = 10
    write_line("x is {x}")
elif a < 0 then
    // new scope - neither x nor z are in scope here
    let y = 20
    write_line("y is {y}")
else
    // new scope - neither x nor y are in scope here
    let z = 30
    write_line("z is {z}")
fi
```

output:

```
x is 10
```

## while statement

### while-do-od
The while loop in ghūl executes a block of code repeatedly as long as a specified condition remains true. The condition is evaluated before each iteration of the loop's body.

```ghul
while condition do
    // code to execute while the condition is true
od
```

```ghul
…
let counter mut = 0
while counter < 5 do
    write_line(counter)
    counter = counter + 1
od
```

output:

```
0
1
2
3
4
```

This loop prints numbers from 0 to 4. It terminates when counter becomes 5, as the condition counter < 5 then evaluates to false.

### break and continue in while loops
The `break` statement immediately exits the loop, while `continue` skips the remaining code in the current iteration and proceeds to the next iteration immediately before the condition is reevaluated.

```ghul
…
let counter mut = 0
while counter < 10 do
    if counter == 5 then
        break
    fi
    write_line(counter)
    counter = counter + 1
od
```

output:

```
0
1
2
3
4
```

This loop exits when counter reaches 5 without proceeding to execute `write_line(counter)`


```ghul
…
let counter mut = 0
while counter < 5 do
    counter = counter + 1
    if counter == 3 then
        continue
    fi
    write_line(counter)
od
```

output:

```
1
2
4
5
```

This loop skips the call to `write_line` when counter is 3.

`break` and `continue` behave the same way in `for` and `do` loops, so they are not shown again below.

### while let

`while let` is the loop form of `if let`: the loop runs while the refutable pattern matches, with the bound names fresh on each iteration. It takes the same shapes as `if let` - bare presence, type ascription, destructure, `/\` guards, and comma-separated clauses:

```ghul
…
while let n = c.next() do
    write_line(n)
od
```

output:

```
3
2
1
```

A `while` condition also narrows its body the same way an `if` condition narrows its then-branch, so `while isa CAT(a) do a.purr() od` reaches a `CAT`-only member without an inner cast.

## for statement

### for-in-do-od
The for loop in ghūl steps through an iterable object executing the loop body once for every value the iterator produces. An iterable object is something that implements either `Collections.Iterable[T]` or `Collections.Iterator[T]`, and the loop variable's type is inferred to be `T`.

```ghul
for variable in iterable do
    // variable is set to each element of iterator in turn
od
```

The variable is defined by the for loop and its scope is the for loop body from the `do` up to the `od`


```ghul
…
// i not in scope here
// i defined here
for i in [1, 2, 3, 4, 5] do
    // i in scope here:
    write_line(i)
od
```

output:

```
1
2
3
4
5
```

### range operators

The `..` and `::` operators construct integer ranges that can be iterated over by for statements. `..` constructs ranges that are inclusive of its left operand and exclusive of its right operand:

```ghul
…
for i in 0..5 do
    // i will take values 0, 1, 2, 3, 4 in sequence
    write_line(i)
od
```

output:

```
0
1
2
3
4
```

`::` constructs a range that is inclusive of its left and right operands:

```ghul
…
for i in 1::5 do
    // i will take values 1, 2, 3, 4, 5 in sequence
    write_line(i)
od
```

output:

```
1
2
3
4
5
```

These operators are not for loop specific and can be used in any expression context

```ghul
…
let zero_to_four = 0..5
let five_to_nine = 5..10

let zero_to_nine = zero_to_four |> cat(five_to_nine)

while zero_to_nine.move_next() do
    write_line(zero_to_nine.current)
od
```

output:

```
0
1
2
3
4
5
6
7
8
9
```

### scope

The loop variable is in scope within the loop body but not within the expression that provides the iterable object. `continue` in a `for` loop proceeds to the next iteration immediately before attempting to read the next element from the iterator.


## do statement

### do-od

The do / od loop in ghūl is used to create an indefinite loop which will continue to execute until explicitly broken with a break statement.

```ghul
do
    // code to execute indefinitely
    // break statement to exit loop
od
```

```ghul
…
let counter mut = 0
do
    write_line(counter)
    counter = counter + 1
    if counter == 5 then
        break
    fi
od
```

output:

```
0
1
2
3
4
```

This loop will run indefinitely until counter reaches 5, at which point the break statement terminates the loop.


## loops as expressions

Every loop form is also an expression of optional type `T?`: a `break` with a value exits the loop producing that value, and falling off the end - a false condition, an exhausted iterator - produces the absent value. The loop's type is the least upper bound of its valued breaks, wrapped in `?`; a bare `break` and `break null` yield absence exactly as falling off the end does:

```ghul
…
// every loop form is an expression of optional type T?:
// a valued break yields, falling off the end yields absence
let hit: int? = for x in [4, 9, 2, 7] do
    if x > 5 then break x fi
od

let miss: int? = for x in [1, 3] do
    if x > 50 then break x fi
od

write_line("{hit ?? -1} {miss ?? -1}")
```

output:

```
9 -1
```

When the context already expects an optional - a typed `let`, a call argument, a return - the loop's element type comes from it.

A valued break delivers to the nearest enclosing loop *that consumes a value*, so it can carry a result out of several nested loops at once: the inner loop below is an ordinary statement, and the break crosses it on the way out:

```ghul
…
// a valued break delivers to the nearest enclosing loop
// that consumes a value, so it can cross the inner,
// statement-form loop on its way out
let rows = [[1, 2, 3], [4, 5, 6]]

let first_even: int? =
    for row in rows do
        for cell in row do
            if cell % 2 == 0 then break cell fi
        od
    od

write_line("{first_even ?? -1}")
```

output:

```
2
```

A valued break with no consuming loop anywhere around it is a compile error, the same as returning a value from a void function.

## case statement

`case` branches on a scrutinee value. Each `when` arm is introduced by `then`, an optional `else` catches the rest, and the construct closes with `esac`. There is no fall-through, and a `when` can list several values matched by equality:

```ghul
…
classify(value: int) -> string is
    case value
    when -1 then
        return "minus one"

    when 0 then
        let result = "zero"
        return result

    when 1 then
        return "one"

    when 2 then
        return "two"

    when 3 then
        return "three"

    when 4 then
        return "four"

    when 5 then
        let result = "five"
        return result

    when 6, 7, 8, 9 then
        return "more than five and less than ten"

    when 13 then
        return "unlucky"

    else
        return "less than -1 or more than nine"
    esac
si

write_line(classify(0))
write_line(classify(3))
write_line(classify(7))
write_line(classify(13))
write_line(classify(-5))
```

output:

```
zero
three
more than five and less than ten
unlucky
less than -1 or more than nine
```

Equality labels match by value, the way `=~` compares: a string scrutinee matches its labels by content rather than by identity, as does any type that defines the operator:

```ghul
…
// labels match by content, the way '=~' compares
write_line(respond("help"))
write_line(respond("run"))
```

output:

```
commands: help, quit
unknown command
```

A `when null` label matches absence - for reference types, value types, and unconstrained generics alike.

`case` is also an expression: each arm's last expression is the arm's value, and the `case` evaluates to whichever arm matched:

```ghul
…
let label = case status
when 200 then "ok"
when 500, 501, 502 then "server error"
else "other"
esac

write_line(label)
```

output:

```
server error
```

### pattern arms

A `when` arm can take a pattern instead of an equality list, mirroring [`if let`](#if-let): `when v: T then` type-tests and introduces the variable, `when (a, b) then` destructures, and `when _: T then` type-tests without introducing one. A bare identifier stays an equality test - `when v then` compares against the value of `v` in scope and introduces no new local. A pattern arm can take a trailing `/\` guard; the names the pattern introduces are in scope in the guard and the arm body, and a failing guard falls through to the next arm as though the pattern hadn't matched:

```ghul
…
    case ► a
    when c: CAT then c.meow()
    when d: DOG then d.bark()
    esac

write_line(describe(CAT()))
```

output:

```
meow
```

Narrowing works like `if let`'s: an arm's type test narrows the scrutinee within its body, and so does a test made by the arm's own guard. Arm narrowing is local - nothing an arm proves reaches a sibling arm or the code after the `case`.

### exhaustiveness

A `case` over a closed domain - a union's variants, `bool`, an enum, or a class hierarchy closed to the assembly - is checked for exhaustiveness. A missing case warns (`non-exhaustive-case`), an arm that matches nothing the earlier arms left warns (`redundant-case-arm`), and an `else` that can never run warns (`dead-case-else`). An expression-position `case` over an open domain needs an `else`, unless the expected type has a default value to fall back on.

### scope

Each arm of the case statement, delimited by either a `when` clause or `else`, forms a separate scope for local variable definitions.


## throw statement

The `throw` statement raises an exception. Control leaves the current block immediately and passes to the nearest enclosing `catch` that handles the exception's type. If there is no such `catch`, the exception propagates out through the calling functions, and out of the program if it is never caught.

```ghul
withdraw(balance: int, amount: int) -> int is
    if amount > balance then
        throw System.InvalidOperationException(
            "insufficient funds"
        )
    fi

    return balance - amount
si
```

The thrown value must be an exception: `System.Exception`, or a type derived from it.

### exception types

An exception is any class that derives from `System.Exception`, or from a more specific exception type:

```ghul
class INSUFFICIENT_FUNDS_EXCEPTION(message: string): System.Exception is
    super(message)
si
```

```ghul
…
try
    withdraw(account, 100)
catch e: INSUFFICIENT_FUNDS_EXCEPTION
    write_line("declined: {e.message}")
yrt
```

output:

```
declined: only 50 available
```


## try statement

### try-catch-finally-yrt

The try-catch-finally-yrt block in ghūl consists of four parts:

* try block: the block where code that might throw an exception is placed.
* exception to catch: exceptions that are assignment compatible with this class will be caught and control will enter the catch block
* catch block: this code block catches and handles exceptions. It takes an exception variable and a type.
* finally block: this code block is executed after the try and catch blocks, regardless of whether an exception was thrown or not. It is typically used for clean-up code.

```ghul
try
    // Code that might throw an exception
catch e: SomeExceptionType
    // Exception handling code
finally
    // Clean-up code, always executed
yrt
```

If different types of exception should be caught, then there can be multiple exception clauses and catch blocks

```ghul
let reader mut: StreamReader

try
    reader = StreamReader("file.txt")
    let content = reader.read_to_end()

    write_line(content)

catch e: FileNotFoundException
    // Handle the case where the file is not found
    write_line("Error: file not found: {e.message}")
catch e: IOException
    // Handle errors during file reading
    write_line("Error: reading file: {e.message}")
finally
    // Close the file and clean up resources
    if reader? then
        reader.close()
    fi

    write_line("File processing completed, file closed.")
yrt
```

### try-catch-yrt

The finally clause can be omitted if no clean-up is required

```ghul
try
    // Code that might throw an exception
catch e: SomeExceptionType
    // Exception handling code
yrt
```

```ghul
try
    let content = File.read_all_text("file.txt")
    write_line(content)

    write_line("File processing completed.")
catch e: FileNotFoundException
    // Handle the case where the file is not found
    write_line("Error: file not found: {e.message}")
catch e: IOException
    // Handle errors during file reading
    write_line("Error: reading file: {e.message}")
yrt
```

### try-finally-yrt

The catch clause can be omitted if no exceptions need to be caught but clean-up is still required

```ghul
try
    // Code that might throw an exception
finally
    // Clean-up code, always executed
yrt
```

```ghul
let reader mut: StreamReader

try
    reader = StreamReader("file.txt")

    let content = reader.read_to_end()
    write_line(content)

    write_line("File processing completed.")

finally
    if reader? then
        reader.close()
    fi

    // Any exceptions will be thrown to the calling code
yrt
```

### finally and return

A `finally` block runs whenever control leaves the `try` block, including when the `try` block, or a `catch` block, executes a `return`. The `finally` block runs first, then control returns to the caller:

```ghul
read_file(path: string) -> string is
    let reader = StreamReader(path)

    try
        return reader.read_to_end()
    finally
        reader.close() // runs before the function returns
    yrt
si
```

## return statement

### return without value

In functions of void return type, a bare `return` statement with no value returns control flow directly to the caller  

```ghul
tries: int
…
try_something(limit: int) is
    if tries > limit then
        return // give up
    fi

    tries = tries + 1

    // do stuff
si
```

### return value

In functions of non-void return type, `return` statements must return a value of a type that's assignment compatible with the function's return type

```ghul
…
fib(n: int) -> int is
    if n < 0 then
        return 0
    elif n == 1 then
        return 1
    else
        return fib(n - 1) + fib(n - 2)
    fi
si

for i in 0::10 do
    write_line("fib({i}) = {fib(i)}")
od
```

output:

```
fib(0) = 0
fib(1) = 1
fib(2) = 1
fib(3) = 2
fib(4) = 3
fib(5) = 5
fib(6) = 8
fib(7) = 13
fib(8) = 21
fib(9) = 34
fib(10) = 55
```

### default return

If execution reaches the end of a non-void function without encountering a return statement, and the body has no [tail](https://ghul.dev/expression-oriented-programming.html#block-bodies-return-their-tail) to take a value from, then the default value of the function's return type is returned to the caller.

```ghul
…
default_return() -> int is
    // do nothing, return 0
si
let i = default_return()
assert i == 0
write_line("default return value is {i}")
```

diagnostics:

- warning: [definite-return] function may not return a value on all paths

output:

```
default return value is 0
```

## asynchronous code and generators

`await` suspends a function until a task completes, and `yield` suspends a generator until the next element is asked for. Both are covered on [async and generators](https://ghul.dev/async-and-generators.html).


---

<a id="optional-types"></a>

# optional types

A type followed by `?` is an *optional* type: a value of `T?` can be present or absent, and the same type without the `?` is non-optional. The [language basics](https://ghul.dev/language-basics.html#optional-types) page introduces the presence test `?` and the assignability rule.

```ghul
…
find_first[T](xs: T[], predicate: T -> bool) -> T? is
    for x in xs do
        if predicate(x) then
            return x
        fi
    od

    return null
si

let first_even = find_first([1, 3, 4, 7, 8], n => n % 2 == 0)    // T = int, a value type
let first_long = find_first(["a", "bb", "ccc"], s => s.length > 2) // T = string, a reference type

write_line("first even: {first_even ?? -1}")
write_line("first long: {first_long ?? "none"}")
```

output:

```
first even: 4
first long: ccc
```

`find_first` returns the first element the predicate accepts, or absent when there is none; `??` supplies a value for the absent case.

Optionals work with reference types, value types, and generic types alike; the [representation](#representation) section below shows each.

## the operators

The `??` operator supplies a fallback: `a ?? b` is `a` when it is present, otherwise `b`, and `b` is evaluated only when needed. It is right-associative, so `a ?? b ?? c` tries each in turn, and the result stays optional until a non-optional value closes the chain:

```ghul
…
let name = lookup()
let greeting = "hello, {name ?? "stranger"}"
write_line(greeting)
```

output:

```
hello, stranger
```

The `?.` operator reads a member only when the receiver is present: `a?.b` is `b` when `a` is present; otherwise the result is absent. The result is always optional, and `?.` chains, so a whole access path folds down to one optional. Method calls compose the same way: `a?.foo(args)` calls `foo` on a present receiver; otherwise the result is absent, with the argument expressions included in the short-circuit, so they are not evaluated when `a` is absent.

The postfix `!` asserts presence and reads the value out; applied to an absent optional it throws. Inside a branch where flow analysis has proven presence, the compiler reports a redundancy warning instead.

```ghul
…
let p = find()
let name = p?.name // string? - absent when p is absent
write_line("name: {name ?? "unknown"}")
```

output:

```
name: unknown
```

## the warnings

Reading a member through an optional not known to be present is reported with a `null-deref` warning; `x?.y`, `x.has_value`, `x!`, and `if let` are the warning-free routes. Applying `!`, `?`, or `?.` to a value already known to be present warns that the operator is redundant, and `!` on a value that was never optional is an error. Each warning has a slug you can silence with `@suppress("<slug>")` per declaration, per file, or across the project.

## optional-shaped types

A named type of your own can support `?` and `!` without being a `T?`. It keeps its own name and doesn't interconvert with `T?` - what it opts in to is the operators, not the spelling. There are two routes.

A union where exactly one variant has fields, or with one variant marked `default`, is option-shaped: `?` tests whether the union holds that variant, and `!` unwraps its payload (or the whole variant, if it has more than one field). This is what to reach for when a value has more shape than present-or-absent - success-with-a-value versus failure-with-a-reason, for instance - since a `case` over the union matches every outcome exhaustively. The [unions and pattern matching](https://ghul.dev/unions-and-pattern-matching.html) page builds an `Option[T]` from scratch; the same rule covers the two-variant shape most languages call `Result` - `OK` marked `default`, `ERROR` holding the failure:

```ghul
…
union Result[T, E] is
    OK(value: T) default
    ERROR(error: E)
si

divide(a: int, b: int) -> Result[int, string] =>
    if b == 0 then
        Result.ERROR("division by zero")
    else
        Result.OK(a / b)
    fi

let good = divide(10, 2)
let bad = divide(10, 0)

if ► good? then
    write_line("10 / 2 = {good!}")
fi

if ! ► bad? then
    write_line("10 / 0 failed")
fi
```

output:

```
10 / 2 = 5
10 / 0 failed
```

And a type that exposes `has_value: bool` and `value: T` properties is treated as optional-shaped structurally, with no declaration required: `?` consults `has_value`, and on a struct `!` reads out `value`:

```ghul
…
// no declared relationship to T? or Ghul.Maybe[T] - ghūl looks for
// has_value and value structurally
struct PERCENTAGE is
    has_value: bool
    value: double

    init() is
        has_value = false
        value = _
    si

    init(v: double) is
        has_value = true
        value = v
    si
si

let full = PERCENTAGE(87.5d)
let empty = PERCENTAGE()

if full? then
    write_line("full: {full!}%")
fi

if !empty? then
    write_line("empty has no reading")
fi
```

output:

```
full: 87.5%
empty has no reading
```

## representation

How a `T?` value is stored depends on `T`. ghūl backs it with whichever of three representations fits, and picks silently; all three behave alike, and the choice matters only when interoperating with other .NET languages or reading the IL the compiler produces.

### reference types

The common case: `T?` over a class or other reference type is a plain nullable reference, and absence is `null`.

```ghul
let ► name: string? = "Alice" // present
let nickname: string? = null // absent
```
```ghul
…
if ► name? then
    write_line("name is {name}") // name is non-optional here
fi
```

output:

```
name is Alice
```

### value types

`T?` over a value type - a scalar such as `int`, or a struct - is backed by .NET's `Nullable<T>` at the IL level. That is nothing you need to work with directly: write `T?`, the same way you would for a reference type. A ghūl `int?` already is a `Nullable<int>` as far as the runtime is concerned, so it passes to and from non-ghūl .NET code as it is, and there is no reason to name `System.Nullable[T]` in ghūl source:

```ghul
let ► here: int? = 42   // present
let gone: int? = null // absent
```

### unconstrained generic types

A generic function or type can use `T?` even though `T` can stand for a reference type or a value type:

```ghul
…
class SLOT[T] is
    _stored: T?

    init() is si

    put(value: T) is ► _stored = value; si

    take() -> T? is
        let result = _stored
        _stored = null
        return result
    si
si

let s = SLOT[int]()
s.put(42)
write_line("{s.take() ?? -1}")
write_line("{s.take() ?? -1}")
```

output:

```
42
-1
```

Behind the scenes an unconstrained `T?` lowers to `Ghul.MAYBE[T]`, a struct that can hold present or absent for any `T`. Like the other two representations it is an implementation detail: there is no reason to name `MAYBE[T]` in your own code. `MAYBE[T]` exposes `has_value: bool` and `value: T` properties, so it is [optional-shaped](https://ghul.dev/optional-types#optional-shaped-types) by construction. See [generics](https://ghul.dev/generics) for how the type parameters themselves work.

### they interconvert

Because all three are the same feature, they behave alike: `??` chains across them, `if x?` and `if let` narrow them the same way, and a non-optional `T` widens to any of them without ceremony. Which one backs a given `T?` is an implementation detail you don't need to track.

```ghul
…
if ► maybe? then
    let narrowed: string = maybe // narrowed to string here
    write_line(narrowed)
fi

let forced: string = ► maybe!            // asserts present, throws if absent
let safe: string = maybe ?? "fallback" // falls back when absent
```

output:

```
found
```


---

<a id="type-narrowing"></a>

# type narrowing

> **editable examples**
>
> Every example on this page can be edited and run here: click the pencil to open it in an editor, change it, and run it in your browser. Errors, hovers and completions come from the ghūl compiler as you type.
>
> The [ghul-examples repository](https://github.com/degory/ghul-examples/tree/main/examples/type-inference) has fuller examples that include narrowing, to build and run locally, in a GitHub Codespace or a dev container.

When a check proves a value has a more specific type, ghūl narrows the value for the code the check covers: inside the branch, the value has the narrower type, with no cast and no unwrap needed. Union variant tests, `isa` class checks, presence tests on optionals, and `if let` all narrow, and narrowing follows the control flow, [covered below](#flow-sensitive-narrowing).

> **narrowing inlays**
>
> Open ghūl in an editor with the [ghūl language extension](https://ghul.dev/tooling.html) and small triangle hints mark where type narrowing changes: `►` where a variable is narrowed to a more specific type, `◄` where a narrowing ends and the variable widens back to its declared type, and `◄►` where an assignment does both at once. Hovering a hint shows the types and the reason; on an `if` it shows the narrowing for both the taken and the not-taken branch. The same sigils appear in the code examples on this site.

## narrowing in a condition

An `isa` test in an `if` condition narrows the variable to the tested type inside the then-branch. This holds for a union variant or a class:

```ghul
…
union Maybe[T] is
    YES(value: T)
    NO
si
…
let m: Maybe[int] = Maybe.YES(42)

if isa Maybe.YES( ► m) then
    // m is narrowed to Maybe.YES inside the branch,
    // so m.value is in scope
    write_line("got value {m.value}")
fi

let a: Animal = CAT("whiskers")
if isa CAT( ► a) then
    // a is narrowed to CAT inside the branch
    write_line(a.purr())
fi
```

output:

```
got value 42
whiskers purrs
```

An [optional type](https://ghul.dev/optional-types) narrows the same way. A `?` test in the predicate narrows the optional to its non-optional form in the then-branch, so the value can be used directly:

```ghul
…
let name: string? = lookup()

if ► name? then
    // name is narrowed to non-optional string
    // here, no ! needed
    write_line("hello, {name}")
fi
```

output:

```
hello, world
```

For a two-variant union, the `else` branch is narrowed to the complementary variant:

```ghul
…
union Result[T, E] is
    OK(value: T)
    ERR(error: E)
si
…
let r: Result[int, string] = some_call()

if isa Result.OK( ► r) then
    write_line("ok: {r.value}")
else
    // r is narrowed to Result.ERR here
    write_line("err: {r.error}")
fi
```

output:

```
ok: 42
```

The `else` narrowing extends to a class hierarchy declared in the current assembly without `open`: the compiler knows every subclass, so ruling out the tested one narrows the `else` branch to the others, and when an `abstract` root has exactly two subclasses, ruling out one leaves the other. The [object oriented programming](https://ghul.dev/object-oriented-programming) page covers open, closed, and abstract classes.

A `while` condition narrows its body the same way an `if` condition narrows its then-branch, so `while isa CAT(a) do a.purr() od` reaches a `CAT`-only member without an inner cast.

## flow-sensitive narrowing

Narrowing follows the control flow, not just the branch structure. A common shape is a guard: when the test fails, the guard leaves the block with `return`, `throw`, `break` or `continue`, so the code after the guard runs only when the test passed, and the value is narrowed there:

```ghul
…
classify(a: Animal) is
    if !isa CAT( ► a) then
        write_line("not a cat")
        return
    fi

    // every non-CAT has returned, so a is
    // narrowed to CAT from here on
    write_line(a.purr())
si

classify(CAT("whiskers"))
classify(DOG())
```

output:

```
whiskers purrs
not a cat
```

## locals and parameters

Narrowing applies to local variables, including a function's own parameters.

```ghul
…
greet(a: Animal) is
    if isa CAT( ► a) then
        // a is a parameter of greet, narrowed to CAT
        // in this branch
        write_line(a.purr())
    fi
si

greet(CAT())
```

output:

```
purr
```

## fields and properties

Narrowing also applies to a member-access path like `x.field` or `x.property`. A presence test (`?`) narrows the path: after `if x.field? then`, uses of `x.field` inside the branch are non-optional.

```ghul
…
describe(order: ORDER) is
    if ► order.customer? then
        // a presence test narrows the path itself:
        // within this branch order.customer is the
        // non-optional string, so .length is
        // reachable directly
        write_line("customer name has {order.customer.length} chars")
    fi
si

describe(ORDER("alice"))
```

output:

```
customer name has 5 chars
```

An `isa` check or variant test narrows a path the same way:

```ghul
…
class CARRIER(occupant: Animal)
describe(carrier: CARRIER) is
    if isa CAT( ► carrier.occupant) then
        // carrier.occupant is a CAT within this branch,
        // so its purr() is reachable directly
        write_line(carrier.occupant.purr())
    fi
si

describe(CARRIER(CAT()))
```

output:

```
purr
```

## narrowing on assignment

Reassigning a local narrows it: when the new value's static type is more specific than the declared type, the local narrows to that type from the assignment on, so a following call resolves on the assigned type without an `isa`:

```ghul
…
► pet = CAT()
// assigning a CAT narrows pet to CAT, so purr() is in reach
write_line(pet.purr())
```

output:

```
purr
```

If the local is already narrowed, assigning a value of a different type cancels that narrowing and introduces one for the new type, so the following call resolves on the assigned type:

```ghul
…
if isa CAT( ► pet) then
    write_line(pet.purr())

    ◄► pet = DOG()
    // reassigning cancels the CAT narrowing and
    // introduces a DOG one: pet is DOG here
    write_line(pet.name())
fi
```

output:

```
purr
dog
```

## how long a narrowing lasts

Narrowing is optimistic: the compiler narrows whenever a test proves something, and checks afterwards whether the narrowing still holds where it is used. It has to check, because values change, and their types change with them: a value that was present can be reassigned to null.

A narrowing lasts at most to the end of the code block associated with the test - the then or else arm of the `if`, or the loop body. It can end earlier, because the value can change before the block ends: by an explicit reassignment, or because a call to a function or method changes it, directly or indirectly.

The compiler tracks the calls that might do that, conservatively: it builds a call graph and works out which fields each call might write. When you use a narrowed value in a way that depends on the narrowing - you read a member through it, or pass it where only the non-optional or narrower type is accepted - and the compiler cannot prove the value is still what the test saw, it reports the use as potentially unsafe, naming the call it could not prove and pointing back at the test:

```ghul
…
describe(carrier: CARRIER, other: Animal) is
    if isa CAT( ► carrier.occupant) then
        ◄ carrier.swap(other)
        // swap() can change occupant, and the use below leans on
        // the narrow - so it is reported here, naming the call
        write_line(carrier.occupant.purr())
    fi
si

describe(CARRIER(CAT()), CAT())
```

diagnostics:

- error: cannot rely on the narrowing of 'carrier.occupant' here: the call to 'swap()' can change it [this call can change carrier.occupant: type-inference-22.ghul: 22,9..22,28] [help: test 'carrier.occupant' again, or copy it into a local variable before the call]

When the compiler can prove that the calls in between could not have changed the value, there is nothing to report:

```ghul
…
describe(carrier: CARRIER) is
    if isa CAT( ► carrier.occupant) then
        carrier.handle()
        // handle() writes only 'handled', so the compiler can
        // see it leaves the narrow on occupant alone
        write_line(carrier.occupant.purr())
    fi
si

describe(CARRIER(CAT()))
```

output:

```
purr
```

Where it cannot, there are two ways out. Test the value again: `?`, `!`, `?.`, `isa`, and `if let` all check at run time and re-establish what they test, whatever calls came before. Or copy the value into a local variable:

```ghul
…
describe(carrier: CARRIER, other: Animal) is
    // a local holds one value, which no other function can
    // reach - its narrowing survives any call
    let cat = carrier.occupant

    if isa CAT( ► cat) then
        carrier.swap(other)
        write_line(cat.purr())
    fi
si

describe(CARRIER(CAT()), CAT())
```

output:

```
purr
```

Narrowings of local variables are more stable than narrowings of fields and properties, because there are fewer ways a local variable can change: explicit reassignment, capture by a closure, or being passed by reference to another function. A local variable that is not `mut` cannot change at all, so its narrowing always lasts to the end of the block. That is why `if let` is the best way to get a narrowing that lasts: it copies the value into a fresh immutable local variable in one step, and works for any expression - the result of a call, not only a variable or path. See [if let](https://ghul.dev/control-flow.html#if-let) for the full construct.

## calls, purity, and stable

Whether a call can invalidate a narrowing depends on what the call can write. The compiler works this out from function bodies: a function that writes nothing that existed before the call cannot invalidate any narrowing, and most functions are proven that way with no annotation. Where the proof falls short, the postfix [`pure` modifier](https://ghul.dev/definitions.html#methods) declares it instead, trusted as declared and required of every override. Some imported .NET collection mutators, such as `LIST.add` and `STACK.push`, are known to write only their own receiver's internal state, so they invalidate only a narrowing that reads through that state.

A narrowing through a property has one more dependency: the property is read once at the test and again at each use, and every read calls the getter. The narrowing is only sound if the getter's later answers agree with the answer the test saw. The compiler proves that from the getter's body where it can. Where it cannot - a getter that fills a cache on first read, for example - the test does not narrow at all, and a use that relies on the narrowing is an error naming the getter. Declaring the property [`stable`](https://ghul.dev/definitions.html#properties) restores the narrowing: it promises that two reads with nothing between them agree on whether the value is present, and on its runtime type.


---

<a id="type-inference"></a>

# type inference

> **editable examples**
>
> Every example on this page can be edited and run here: click the pencil to open it in an editor, change it, and run it in your browser. Errors, hovers and completions come from the ghūl compiler as you type.
>
> The [ghul-examples repository](https://github.com/degory/ghul-examples/tree/main/examples/type-inference) has fuller type-inference examples to build and run locally, in a GitHub Codespace or a dev container.

Inside a function body, you rarely need to write a type. Local variables, loop variables, destructured variables, anonymous function parameters and generic type arguments are all inferred - from initializers, from the context an expression sits in, and from how a value is used later in the same body. You get the checking of static types without typing most of them: in the compiler's own source, over 90% of local variables carry no type annotation, and most of the annotations that remain are deliberate - declaring a variable at a wider type than its initializer, or as reassignable before it has a value - rather than places inference needed help.

The types that do get written are the ones worth writing. A function's parameter and return types are always explicit, and so are fields, properties and global variables: those are the contracts a reader wants written down. Keeping them explicit is also what keeps inference **function-local** - types inferred within one function are not visible outside it, and a type error always points into the body being edited rather than into another function entirely.

Mechanically it is bidirectional, constraint-based inference: types flow up from expressions and down from the contexts that use them, and the compiler re-walks each function body until the unknowns settle. The [implementation page](https://ghul.dev/implementation#type-inference) describes how.

Within a function, types are inferred for:

- local variables
- loop variables
- destructured variables
- anonymous function parameters
- anonymous function return types
- generic type arguments on calls to constructors, methods, static methods and global functions

In each case the inferred type is concrete. The compiler does not introduce new type parameters during inference, so an anonymous function literal takes a single concrete function type from its context - it cannot itself be generic. For polymorphic behaviour, declare a generic global function or method and pass it where the function value is needed.

ghūl also performs [type narrowing](https://ghul.dev/type-narrowing.html) - within parts of a function a value can be observed at a more specific type than the one it was declared with. Inference and narrowing work together: the inferred type is the ceiling, and the control flow sharpens it region by region.

The examples below leave inferred types unannotated; hover over any variable to see the type the compiler worked out for it.

## what stays explicit

A function's signature is written out explicitly; inference works within the body.

```ghul
// the signature is explicit: the parameter type
// and the return type are written out
totals(
    values: Collections.Iterable[int]
) -> (sum: int, count: int) is
    let sum mut = 0
    let count mut = 0

    for v in values do
        sum = sum + v
        count = count + 1
    od

    return (sum, count)
si
…
```

Inference does not read types out of a body into the function's signature, and does not flow from one function into another: each body is checked on its own, against the explicit signatures of everything it calls.

Fields and properties belong to a type rather than to a function body, so their types are written out too - for private members as well as public ones.

```ghul
class COUNTER is
    count: int // a property - its type is declared

    init() is
        count = 0
    si

    tick() is
        // a local - its type is inferred from the
        // initializer
        let step = 1
        count = count + step
    si
si
…
```

## what gets inferred

### let statements and expressions

When no explicit type is given for a variable in a let statement or expression, its type is inferred from the initializer, provided one is present.

```ghul
let a_string = "12345"
let an_int = 12345
let an_int_array = [1, 2, 3, 4, 5]
```

### destructuring variables

A destructuring `let` declares several variables at once from a tuple. Each variable takes its type from the corresponding element of the right-hand side, and the pattern can nest.

```ghul
let person = ("alice", 30)
let (name, age) = person

let ((first, second), third) = (("a", "b"), "c")
```

### for loop variables

A `for` loop variable takes its type from the element type of the iterable being looped over. Destructuring composes with this: when the element type is a tuple, its element types flow into the destructured names.

```ghul
…
for i in 1::10 do
    write_line("{i}")
od

let pairs = [("a", 1), ("b", 2)]

for (name, count) in pairs do
    write_line("{name}: {count}")
od
```

output:

```
1
2
3
4
5
6
7
8
9
10
a: 1
b: 2
```

### list literal element types

The element type of a list literal is inferred from the types of the elements: the compiler finds a type compatible with all of them.

```ghul
class ▼ BASE()

class DERIVED(): BASE
…
let array_of_base = [BASE(), DERIVED()]
let array_of_object = [BASE(), DERIVED(), object()]
let array_of_int = [1, 2, 3, 4, 5]
```

If a list contains tuple literals, the compiler finds a compatible common type for each tuple element across all elements of the list.

```ghul
let int_string = [(123, "hello"), (456, "goodbye")]

let int_object = [(123, 456), (798, "wibble")]
```

### if expression result types

The result type of an if expression is inferred from the types of all the branch results: the compiler finds a type compatible with all of them.

```ghul
class ▼ BASE()

class DERIVED(): BASE

let derived =
    if true then
        DERIVED()
    else
        DERIVED()
    fi

let base =
    if true then
        DERIVED()
    else
        BASE()
    fi
```

### generic class, struct and variant constructors

When constructing a generic class, struct or variant, the generic type arguments are inferred from the constructor method arguments where possible.

```ghul
class THING[T](value: T)
…
let int_thing = THING(1234)
let string_thing = THING("hello")
```

Inference from the constructor arguments works when every type argument appears among those arguments and the constructor overload is unambiguous. A type argument left unpinned - by a no-argument constructor, say - can still be resolved from later use of the value (see [inference from later use sites](#inference-from-later-use-sites)).

### generic function and method calls

When calling a generic global function, a generic method, or a static method on a generic class or struct, the compiler infers the generic type arguments from the types of the actual arguments passed.

```ghul
class ▼ BASE()

class DERIVED(): BASE

do_something[T](a: T, b: T) -> T => a
let base = do_something(BASE(), DERIVED())
let derived = do_something(DERIVED(), DERIVED())
let obj = do_something(object(), DERIVED())
```

### anonymous function return types

The return type of an anonymous function literal is inferred from the type of its expression body, or from the types of return expressions in its block body.

```ghul
let returns_int = (i: int) => i * 2
let returns_string = (s: string) => "{s}{s}"
```

### anonymous function argument types

When an anonymous function literal is passed as an argument and an unambiguous overload match can be made without knowing the exact function type, the compiler infers the argument types from the matching overload.

```ghul
…
[1, 2, 2, 4, 5] |> filter(i => i > 3)
```

Here `self` is already known to be `Pipe[int]`, so `Pipe[int].filter(predicate: int -> bool) -> Pipe[int]` is the only overload that could match. The `predicate` argument must therefore be `int -> bool`, and the type of `i` must be `int`.

## inference from later use sites

The sections above infer a type from a declaration's initializer or from a call argument. Because inference spans the whole function body, the compiler can also work the other way: when a declaration gives no type on its own, a later use of the variable in the same body can supply one.

```ghul
…
// m is BOX[?] here; the type argument is not
// yet known
let m = BOX()

// the set call takes an int, so m is BOX[int]
m.set(42)

let x = m.get()
```

The same applies to anonymous functions whose argument types are not explicit: if a later call supplies a concrete type, that flows back to the function literal.

```ghul
…
let f = x => x + 1
write_line("{f(42)}")
```

output:

```
43
```

### recursive anonymous functions

In a recursive anonymous function, the argument type can be inferred from how the function is called, including from its own recursive calls.

```ghul
…
let factorial = n rec =>
    if n == 0 then 1 else n * rec(n - 1) fi
write_line("{factorial(5)}")
```

output:

```
120
```

### operations on a not-yet-inferred value

When an anonymous function's parameter has no annotation, every operation the body performs on it - a member access, a method call, an index, an iteration, a destructuring - is recorded as a constraint on the parameter's type. Whatever type is eventually inferred for the parameter must satisfy all of them.

```ghul
…
let length_of = x => x.length
write_line("{length_of("hello")}")
```

output:

```
5
```

The call passes a `string`, and `string` has a `length` member, so `x` resolves to `string`. When a call site leaves room for more than one type, a candidate that does not support every recorded operation is discarded.

### generic argument inference from sibling actuals

When a generic function or method is called with two arguments that share only a common ancestor, the generic argument is inferred from their nearest shared type rather than failing the overload match.

```ghul
class ▼ Animal abstract is
    speak() -> string => "animal"
si

class CAT(): Animal

class DOG(): Animal

merge[T](a: T, b: T) -> T => a
…
let a = merge(CAT(), DOG())
```


---

<a id="grammar"></a>

# grammar

This page gives the full grammar of ghūl, derived from the compiler's parser.

The grammar is written in [W3C EBNF](https://www.w3.org/TR/xml/#sec-notation), the
notation used by the XML and XPath specifications:

| Notation      | Meaning                                  |
|---------------|------------------------------------------|
| `A ::= ...`   | defines the symbol `A`                   |
| `A B`         | `A` followed by `B`                      |
| `A \| B`      | `A` or `B`                               |
| `A?`          | zero or one `A`                          |
| `A*`          | zero or more `A`                         |
| `A+`          | one or more `A`                          |
| `( ... )`     | grouping                                 |
| `"is"`        | a literal terminal                       |
| `[a-z]`       | a character in the given set             |
| `[^"]`        | any character *not* in the set           |
| `A - B`       | an `A` that is not also a `B`            |

`CamelCase` symbols are grammar productions; `Identifier`, `IntegerLiteral` and the
other symbols defined under [lexical grammar](#lexical-grammar) are tokens produced
by the tokenizer.

A few constructs are resolved by the parser using context that a context-free
grammar cannot express (operator precedence, and a small number of genuinely
context-sensitive forms). These are called out in prose where they arise, and the
operator precedence table is given [at the end](#operator-precedence).

## lexical grammar

The tokenizer turns source text into a stream of tokens. Whitespace (spaces, tabs,
carriage returns and newlines) separates tokens but is otherwise insignificant:
ghūl is **not** indentation-sensitive. Whitespace and comments are discarded before
parsing.

### comments

```ebnf
LineComment  ::= "//" [^#xA]*
BlockComment ::= "/*" ( [^*] | "*" [^/] )* "*/"
```

Block comments do **not** nest: the first `*/` ends the comment.

### identifiers

```ebnf
Identifier        ::= PlainIdentifier | EscapedIdentifier
PlainIdentifier   ::= Letter ( Letter | Digit )*
EscapedIdentifier ::= "`" ( Letter | Digit | "_" )+
                    | "`" OperatorChar+
Letter            ::= [a-zA-Z_]
Digit             ::= [0-9]

QualifiedIdentifier ::= Identifier ( "." Identifier )*
```

A `PlainIdentifier` may not be one of the [reserved words](#reserved-words). To use
a reserved word (or an operator symbol) as an ordinary identifier, prefix it with
a backtick: `` `field ``, `` `+ ``.

### reserved words

The following words are keywords and cannot be used as plain identifiers:

```
abstract  assert    await     break     case      cast      catch
class     continue  default   do        elif      else      enum
esac      false     fi        field     finally   for       if
in        innate    is        isa       lav       let       mut
namespace new       null      od        operator  private   protected
ptr       public    rec       ref       return    self      si
static    struct    super     then      throw     trait     true
try       typeof    union     use       val       when      while
yield     yrt
```

A few words are *contextual*: they look like identifiers to the tokenizer but the parser recognises them in specific positions: `optional` as a type-parameter kind constraint, `out` as a type-parameter variance modifier, `open` as a class extensibility modifier.

### numeric literals

```ebnf
IntegerLiteral ::= DecimalInteger | HexInteger
DecimalInteger ::= Digit ( Digit | "_" )* IntegerSuffix?
HexInteger     ::= ( "0x" | "0X" ) HexDigit ( HexDigit | "_" )* IntegerSuffix?
HexDigit       ::= [0-9a-fA-F]
IntegerSuffix  ::= ( "s" | "S" | "u" | "U" )? [bBcCsSiIlLwW]?

FloatLiteral   ::= Digit ( Digit | "_" )* "." ( Digit | "_" )* Exponent? FloatSuffix?
Exponent       ::= ( "e" | "E" ) "-"? ( Digit | "_" )+
FloatSuffix    ::= "s" | "S" | "d" | "D"
```

Underscores within a number are for readability and are ignored. A float literal
must contain a `.`; the type suffix selects `single` (`s`/`S`) or `double`
(`d`/`D`), and an integer suffix selects the integer type and signedness.

### character and string literals

```ebnf
CharLiteral   ::= "'" ( EscapeSequence | [^'] ) "'"
StringLiteral ::= '"' StringElement* '"'
StringElement ::= EscapeSequence | [^"#xA\]

EscapeSequence ::= "\" ( "t" | "n" | "r" | "\" | OctalDigit+ | [^#xA] )
OctalDigit     ::= [0-7]
```

A string literal may not span a newline. Two string literals separated only by
whitespace or comments are concatenated into a single literal; the whitespace
can include line breaks, which is how a long string is split across lines. A
`;` between them ends the chain, so a statement that ends on a string literal
needs a `;` where the next statement begins with one.

Inside a string literal, `{` begins an [interpolation](#interpolated-strings) and
`}` ends it; a literal brace is written <code v-pre>{{</code> or <code v-pre>}}</code>.

### interpolated strings

A string literal containing `{ ... }` is tokenized as a sequence of fragments
rather than a single `StringLiteral`. The parser assembles these as an
[interpolated string expression](#primary-expressions):

```ebnf
InterpolatedString ::= EnterString
                       Interpolation
                       ( ContinueString Interpolation )*
                       ExitString
Interpolation      ::= Expression ( "," Expression )? ( ":" FormatString )?
```

`EnterString`, `ContinueString`, `ExitString` and `FormatString` are the fragments
of literal text surrounding and following each interpolated expression. The
optional `,` introduces an alignment and the optional `:` a format specifier.

### operators

```ebnf
Operator     ::= OperatorChar+
OperatorChar ::= [-!$%^&*+=|:@~#\<>.?/] | UnicodeSymbol
```

`UnicodeSymbol` is any character above U+007E that .NET classifies as a symbol
(this admits operators such as `×`, `÷`, `∩`, `∪`, `∧`, `∨`, `≈`, `≡`).

Operators are tokenized greedily: the longest run of operator characters forms one
operator, with one exception: a `.` immediately after a leading `!` or `?` ends
the operator, so that `x!.foo` and `x?.foo` parse as a member access on an
unwrap/has-value, not as the operators `!.` or `?.`.

A handful of operator spellings are recognised as dedicated tokens rather than
general operators: `=`, `:`, `.`, `->`, `=>`, `?` and `@`.

## compilation unit

A source file is a sequence of definitions:

```ebnf
CompilationUnit ::= Definition*

Definition ::= Namespace
             | Use
             | Class
             | Trait
             | Struct
             | Union
             | Enum
             | Partial
             | Impl
             | Member
             | PragmaDefinition
```

A `Member` (function, property or indexer) appearing directly in a compilation unit
or namespace is a global function, global variable or global indexer.

## definitions

### namespace and use

```ebnf
Namespace ::= "namespace" QualifiedIdentifier "is" Definition* "si"

Use ::= "use" QualifiedIdentifier ";"
      | "use" Identifier "=" QualifiedIdentifier ";"
```

The second form of `Use` introduces an alias for a namespace or symbol.

### class, trait and struct

```ebnf
Class  ::= "class"  Identifier TypeParameters? PrimaryParameters? Ancestors? Modifiers
           ClassyBody

Trait  ::= "trait"  Identifier TypeParameters? Ancestors? Modifiers
           "is" Definition* "si"

Struct ::= "struct" Identifier TypeParameters? PrimaryParameters? Ancestors? Modifiers
           ClassyBody

ClassyBody ::= "is" ClassBodyDefinition* "si"
             | ";"           /* requires PrimaryParameters; equivalent to an empty `is` ... `si` body */

TypeParameters ::= "[" TypeParameter ( "," TypeParameter )* "]"
TypeParameter  ::= Identifier ( ":" TypeParameterConstraints )? Variance?
TypeParameterConstraints
               ::= TypeExpression KindConstraint? "new"?    /* type bound */
                 | KindConstraint "new"?                    /* kind only */
                 | "new"                                    /* ctor only */
KindConstraint ::= "class" | "struct" | "optional"
Variance       ::= "out" | "in"

Ancestors ::= ":" TypeList

PrimaryParameters     ::= "(" PrimaryParameter ( "," PrimaryParameter )* ")"
PrimaryParameter      ::= Identifier ":" TypeExpression PrimaryParamModifier?
PrimaryParamModifier  ::= "public" | "field" | "init"

ClassBodyDefinition ::= Definition | SuperCallDeclaration
SuperCallDeclaration ::= "super" "(" ExpressionList? ")" ";"
```

`Ancestors` lists the base class and/or implemented traits.

A type parameter has zero or more constraints: a *type bound* (which the actual type argument must derive from), a *kind constraint* (`class` / `struct` / `optional`), a *constructor constraint* (`new`), and on a trait a *variance* modifier (`out` for covariant, `in` for contravariant) - in that order. Only a single type bound per parameter is currently supported. Variance is only legal on a trait's type parameters.

`PrimaryParameters` declare a class or struct's primary constructor inline. Each parameter becomes a parameter of the synthesised `init` and an auto-generated field or property of the same name and declared type. A trailing modifier on a parameter overrides the default visibility - `public` for a public read-write property, `field` for a plain field, `init` to suppress field generation. A parameter named `_x` produces a private field; a body field or property declaration matching the parameter (under the same `_x`/`x` rule) overrides auto-generation.

A `SuperCallDeclaration` is a class-body shorthand for calling the superclass `init` with the given expressions. Each expression resolves with the primary parameters in scope. Primary parameters consumed by `super(...)` are excluded from auto-generation. A secondary `init(.., extras)` overload uses `..` to splice the primary parameters into its argument list; an implicit chain to the primary `init` runs before the secondary's body.

### union

```ebnf
Union   ::= "union" Identifier TypeParameters? Modifiers "is" Variant+ "si"
Variant ::= Identifier ( "(" VariableList ")" )? "default"? ";"
```

Each `Variant` optionally has fields, written as a parenthesised list of
`name: Type` variables. A trailing `default` marks one variant as the union's
*default*: the one the `?` test and `!` unwrap operators target on a union
value.

### partial and impl

```ebnf
Partial ::= "partial" TypeExpression "is" ClassBodyDefinition* "si"
Impl    ::= "impl" TypeExpression "for" TypeExpression "is" ClassBodyDefinition* "si"
```

A `Partial` block adds members to a class, struct, or union already declared in the same assembly. An `Impl` block additionally makes its target satisfy a trait; the trait's type arguments are written on the target after `for` (`impl Printer for List[T]`), and inside the body `self` has the target's type. Either target can be a qualified name, including a single union variant. See [partial and impl blocks](https://ghul.dev/definitions.html#partial-and-impl-blocks).

### enum

```ebnf
Enum       ::= "enum" Identifier Modifiers "is"
               EnumMember ( "," EnumMember )* "si"
EnumMember ::= Identifier ( "=" Expression )?
```

### members: functions, properties and indexers

A `Member` is a function, a property or an indexer. They share a leading name and
modifiers; the parser distinguishes them by what follows the name.

```ebnf
Member ::= Function | Property | Indexer
```

#### function

```ebnf
Function     ::= FunctionName TypeParameters?
                 "(" VariableList? ")" ReturnType? Modifiers ( Body | ";" )
FunctionName ::= Identifier | Operator
ReturnType   ::= "->" TypeExpression

Body ::= "is" StatementList "si"
       | "=>" Expression
       | "innate" QualifiedIdentifier
```

A function may be named by an `Operator`, which defines that operator. A function
with no body (just `;`) is abstract. A `=>` or `innate` body is terminated by `;`;
a block body (`is` … `si`) is not.

#### property

```ebnf
Property          ::= Identifier ( ":" TypeExpression )? Modifiers
                      PropertyAccessors? ";"?
PropertyAccessors ::= PropertyGetter ( "," PropertySetter )?
                    | PropertySetter ( "," PropertyGetter )?
PropertyGetter    ::= Body
PropertySetter    ::= "=" Identifier Body
```

A property with no accessors and the `field` modifier declares a field. A
`PropertySetter` names the value parameter after `=`. As with functions, a `=>` or
`innate` accessor body is terminated by `;` and a block body is not.

#### indexer

```ebnf
Indexer ::= Identifier? "[" Variable "]" ( ":" TypeExpression )? Modifiers
            PropertyAccessors? ";"?
```

### modifiers

```ebnf
Modifiers      ::= AccessModifier? StorageClass? TypeModifier* "pure"?
AccessModifier ::= "public" | "protected" | "private"
StorageClass   ::= "static" | "field"
TypeModifier   ::= "abstract" | "open"
```

`abstract` and `open` are postfix modifiers on a class (`abstract` bars direct construction, `open` allows cross-assembly subclassing). `pure` is a postfix modifier asserting store-freedom - only reads, never writes to the heap - accepted on a function or method, on a function type, and on a class, struct or trait header (requiring every instance member to be pure). `stable` is a postfix modifier on a property asserting that two adjacent reads agree on presence and runtime type.

### pragmas

```ebnf
PragmaDefinition ::= Pragma Definition
Pragma           ::= "@" QualifiedIdentifier ( "(" ExpressionList? ")" )?
```

A `Pragma` annotates the definition (or [statement](#statements)) that follows it.

## type expressions

```ebnf
TypeExpression ::= PrimaryType TypeSuffix*

PrimaryType ::= QualifiedIdentifier
              | QualifiedIdentifier "[" TypeList "]"   /* generic type */
              | QualifiedIdentifier "[" "]"            /* array type */
              | Identifier ":" TypeExpression          /* named tuple element */
              | "(" TypeList ")"                       /* tuple, or grouping */
              | "(" TypeList? ")" "->" TypeExpression  /* function type */

TypeSuffix ::= "[]"                  /* array */
             | "ref"                 /* by-reference */
             | "ptr"                 /* pointer */
             | "?"                   /* nullable */
             | "->" TypeExpression   /* function type */
             | "." Identifier        /* member type */

TypeList ::= TypeExpression ( "," TypeExpression )*
```

`( T )` is just `T` in parentheses; parentheses group, e.g. to disambiguate
`(a -> b) -> c` from `a -> b -> c`. A parenthesised list of two or more types is a
tuple type. Empty parentheses are meaningful only as `( ) -> T`, a function type
taking no arguments. A `name: Type` element gives a tuple element a name.

## variables

```ebnf
Variable     ::= VariableLeft ( ":" TypeExpression )? "mut"? ( "=" Expression )?
VariableLeft ::= Identifier
               | "(" VariableLeft ( "," VariableLeft )* ")"
VariableList ::= Variable ( "," Variable )*
```

The parenthesised form of `VariableLeft` destructures a tuple. A bare `let` local
variable is immutable unless followed by `mut`.

## statements

A statement list is a sequence of statements. A `;` separates statements; it is
required after a statement whose syntax would otherwise run on into the next, and
optional elsewhere.

In a **function or method body** the `;` on the last statement is significant rather
than optional: without one, a value-producing last statement is the body's tail and
its value is the return value on the fall-through path; with one the value is
discarded. At any other block close - `fi`, `esac`, `od`, the `)` of a block
expression - the trailing `;` stays optional and does not affect the value the
block produces.

```ebnf
StatementList ::= ( Statement ";"? )*

Statement ::= Let
            | Return
            | Throw
            | Assert
            | Yield
            | If
            | Case
            | Try
            | Loop
            | For
            | Break
            | Continue
            | PragmaStatement
            | Labelled
            | Assignment
            | ExpressionStatement
```

### local variable definitions, return, throw, assert, yield

```ebnf
Let    ::= "let" "use"? VariableList ( "in" Expression )?
Return ::= "return" Expression?
Throw  ::= "throw" Expression?
Assert ::= "assert" Expression ( "else" Expression )? ( "in" Expression )?
Yield  ::= "yield" Expression
```

`let use` defines a local variable holding a disposable, whose `dispose` is called
when the variable goes out of scope.

The `let … in …` form is a [let-in expression](#primary-expressions) used as a
statement. The `assert … in …` tail behaves the same way: a passing assert yields
the trailing expression, a failing one throws.

`yield` is permitted only inside a [generator function](https://ghul.dev/async-and-generators.html#generators),
one whose return type is `Ghul.Pipes.Pipe[T]`.

### if

```ebnf
If          ::= "if"   IfCondition "then" StatementList
                ( "elif" IfCondition "then" StatementList )*
                ( "else"             StatementList )?
                "fi"
IfCondition ::= Expression
              | "let" Variable        /* if-let local variable */
```

The `if let` form defines a local variable whose initializer must be present; a
type ascription on it (`if let c: T = e`) tests that the value is a `T`.

### case

```ebnf
Case ::= "case" Expression
         ( "when" ( ExpressionList | Variable ) "then" StatementList )*
         ( "else" StatementList )?
         "esac"
```

Each `when` takes either a comma-separated list of value-equality expressions or
a pattern, matching the same type-test, destructure, and literal-leaf forms
as [`if let`](https://ghul.dev/control-flow.html#if-let). `case` is also an
[expression](#primary-expressions): each arm's last expression is the arm's value.

### try

```ebnf
Try ::= "try" StatementList
        ( "catch" Variable StatementList )*
        ( "finally" StatementList )?
        "yrt"
```

### loops

```ebnf
Loop ::= ( "while" Expression )? "do" StatementList "od"
For  ::= "for" Variable "in" Expression "do" StatementList "od"
```

A `do … od` with no `while` is an unconditional loop.

### break, continue and labels

```ebnf
Break    ::= "break" Identifier?
Continue ::= "continue" Identifier?
Labelled ::= Identifier ":" Statement
```

A `Labelled` statement may be targeted by `break` or `continue` with the matching
label.

### assignment and expression statements

```ebnf
Assignment          ::= Expression "=" Expression
ExpressionStatement ::= Expression

PragmaStatement     ::= Pragma Statement
```

## expressions

An expression is a sequence of operands joined by binary operators. The parser
resolves operator nesting by [precedence](#operator-precedence); the grammar below
gives the flat structure.

```ebnf
Expression ::= UnaryExpression ( Operator UnaryExpression )*
```

`||` is the *yield infix* used to produce a value from a generator step; it has the
lowest precedence and does not chain.

### unary expressions

```ebnf
UnaryExpression ::= Operator UnaryExpression      /* prefix operator */
                  | "await"  UnaryExpression      /* await expression */
                  | PostfixExpression
```

An `await E` expression is permitted only inside an
[asynchronous function](https://ghul.dev/async-and-generators.html#asynchronous-code), one whose
return type is `Tasks.TASK[T]` (or `Tasks.TASK`), and evaluates to the result
of the awaited task once it completes. Used as the right-hand side of `let`, as
a bare statement (`await E;`), or in any operand position.

### postfix expressions

```ebnf
PostfixExpression ::= PrimaryExpression PostfixSuffix*

PostfixSuffix ::= "(" ExpressionList? ")"     /* call */
                | "[" ExpressionList "]"      /* index expression, or generic application */
                | "`[" TypeList "]"           /* explicit generic application */
                | "." Identifier              /* member access */
                | "?"                         /* has-value test */
                | "!"                         /* unwrap */
                | "ref"                       /* by-reference */
                | "|"                         /* pipe */
                | "|>" PostfixExpression      /* thread-first call */
```

A `[ ... ]` suffix is either an index expression (an access through an
[indexer](#indexer)) or a generic type application, depending on whether its
contents resolve as expressions or as types; `` `[ ... ] `` forces the
generic-application reading.

The `|>` thread-first suffix routes its left side into the call on its right as
that call's first argument, so `x |> f(a)` is `f(x, a)`. Its right side must be
call-shaped, and chaining is left-associative, so `x |> f(a) |> g(b)` is
`g(f(x, a), b)`. See [thread-first calls](https://ghul.dev/expressions.html#thread-first-calls).

### function literals

A primary expression (or a parenthesised argument list) followed by `->`, `=>`,
`is` or `rec` is a function literal:

```ebnf
FunctionLiteral   ::= FunctionArguments ( "->" TypeExpression )? "rec"? Body
FunctionArguments ::= "(" VariableList? ")"
                    | Identifier
```

`rec` marks the literal as recursive, so it may refer to itself.

### primary expressions

```ebnf
PrimaryExpression ::= Identifier
                    | Literal
                    | "(" ExpressionList? ")"                /* tuple or grouping */
                    | "[" ExpressionList "]" ( ":" TypeExpression )?  /* list literal */
                    | "cast" TypeExpression "(" Expression ")"
                    | "isa" TypeExpression "(" Expression ")"
                    | "typeof" TypeExpression
                    | "default" ( "[" TypeExpression "]" )?
                    | "self"
                    | "super"
                    | "rec"
                    | If                                     /* if-expression */
                    | Case                                   /* case-expression */
                    | "(" StatementList ")"                  /* block expression */
                    | "val" StatementList "lav"              /* block expression, historical spelling */
                    | "let" "use"? VariableList "in" Expression   /* let-in */
                    | "assert" Expression ( "else" Expression )? "in" Expression  /* assert-in */

Literal ::= IntegerLiteral
          | FloatLiteral
          | StringLiteral
          | CharLiteral
          | InterpolatedString
          | "true" | "false"
          | "null"

ExpressionList ::= Expression ( "," Expression )*
```

A list literal `[ a, b, ... ]` builds a `List`; it requires at least one element
(use `LIST[T]()` for an empty list).

Within an `ExpressionList` that forms call arguments or a tuple, an element of the
form `Identifier ":" TypeExpression? ( "=" Expression )?` is an inline local
variable definition rather than a plain identifier; this is the only place that
form is accepted.

## operator precedence

ghūl has no fixed list of binary operators: any [operator token](#operators) may be
used infix. Precedence is assigned by a table of built-in operators plus a
first-character heuristic for everything else, so the grammar's flat
`Expression ::= UnaryExpression ( Operator UnaryExpression )*` is disambiguated by
the following levels, **tightest first**:

| Precedence       | Operators                                   |
|------------------|---------------------------------------------|
| *(prefix unary, member access, call, index - tightest)* | |
| user&#8209;8     | *(user-defined)*                            |
| multiplication   | `*` `×` `✕` `/` `%` `÷`                      |
| user&#8209;7     | *(user-defined)*                            |
| addition         | `+`  `-`                                    |
| user&#8209;6     | *(user-defined)*                            |
| bitwise          | `&` `\|` `¦` `^` `∩` `∪`                     |
| user&#8209;5     | *(user-defined, default)*                   |
| shift            | `<<`  `>>`  `>>>`                            |
| user&#8209;4     | *(user-defined)*                            |
| range            | `..`  `::`                                  |
| user&#8209;3     | *(user-defined)*                            |
| relational       | `==` `!=` `=~` `!~` `<` `>` `>=` `<=` `≈` `≡` |
| user&#8209;2     | *(user-defined)*                            |
| boolean          | `/\`  `\/`  `∧`  `∨`                         |
| user&#8209;1     | *(user-defined)*                            |
| yield infix      | `\|\|`                                      |

All binary operators are left-associative. Prefix unary operators, member access,
calls and indexing bind more tightly than any binary operator.

A user-defined operator (any operator not in the table above) is assigned a
precedence from its **first character**, modelled on OCaml and F#: operators
starting with `*` `/` `%` bind as multiplication, `+` `-` as addition, and so on;
an operator with no recognised first character defaults to user&#8209;5. The
`@precedence("op", "level")` pragma overrides the precedence of a named operator.
Both arguments must be string literals (a numeric `level` is not accepted),
and `level` names a precedence level: `user-1` … `user-8`, or one of the built-in
level names `boolean`, `relational`, `range`, `shift`, `bitwise`, `addition` and
`multiplication`.


---

<a id="known-issues"></a>

# known issues

There are numerous known issues, particularly in [the compiler](https://github.com/degory/ghul/issues) and in the [Visual Studio Code language extension](https://github.com/degory/ghul-vsce/issues). If you encounter a problem not already recorded in a GitHub issue, please raise a new issue. If an existing issue is blocking you, please add a comment on the issue, and I'll investigate, or feel free to raise a PR.

Areas where you might particularly notice problems include:

## spurious errors reported by the language extension

There are several scenarios where you might receive spurious errors from the language extension when working in Visual Studio Code.

### opening files unrelated to the project
If you have a ghūl project open, and you open additional ghūl source files that are not related to that project, the language extension may incorrectly assume those files are part of the project. This can result in misleading errors. This issue is particularly prevalent in unit test projects, where the tests folder is nested within the project folder, causing the test source files to appear in the VSCode project explorer view. The workaround is to close the unrelated files and reload the project in Visual Studio with `<ctrl>` + `P` then select `Developer: Reload Window`. Then open a new separate VSCode window on the project folder containing the other source files you want to edit.

### opening individual files without a project
Similarly, opening individual ghūl source files in Visual Studio Code without opening the project root folder as a workspace can result in misleading error messages. The workaround is to close these files and then reopen VSCode, ensuring you open the project folder rather than individual files.

### cascade of follow-on errors after an initial serious error
Occasionally one error in your ghūl source code can trigger a whole series of subsequent errors. This could be due to the parser failing to resynchronize with valid code following a syntax error, or, more rarely, an unrecoverable internal error in the compiler due to corrupted compiler state. The extension will recover from these issues if you address the error causing the cascade, but identifying the root cause is not always straightforward. Using `<ctrl>` + `Z` / `Undo` can help revert to a state before the problem arose. Alternatively, the first error in the error cascade in the file you're editing is often the culprit. If you cannot isolate the cause, feel free to raise an issue, preferably with example code that reproduces it.

### errors appear whilst editing and subsequently disappear
This is a result of how the language extension and compiler operate. As you edit, the language extension buffers your changes, waiting for a pause in typing. Once you stop, the extension sends the latest version of the edited source files to the compiler, which compiles them and sends updated diagnostics back to the extension. To minimize latency for functions like code completion, the first recompilation after an edit is partial: the edited files are fully compiled, but the rest of the project is only compiled up to the global definitions. The bodies of functions, methods, and properties in unedited files are not compiled during this phase. The extension then waits longer, and if no further edits occur, it requests a full compilation of the entire project. This strategy boosts responsiveness for large projects, but can lead to spurious errors between the partial and full compilations, especially if further edits are made before the full compilation. The workaround is to wait a few seconds for the full compilation to complete.

### valid errors not cleared after edits to correct them
Very occasionally, if you have an error in your code and you make an edit that corrects it, you may find the error doesn't disappear. This can be caused by the state machine in the extension failing to queue a compile or by the extension's copy of the diagnostic state getting out of step with the compiler. Recent changes to the compiler and language extension have greatly reduced incidences of this problem but not completely eliminated it. The workaround for the first scenario is to make another change to the source to force a recompile (adding and immediately removing a space character for example). The workaround for the second scenario is to reload your project with `<ctrl>` + `P` then `Developer: Reload Window`.

## limitations of generics

ghūl supports generics on classes, structs, traits, methods, unions and global functions, with type-parameter constraints (type bounds joined with `/\`, kinds including `init`) and declared variance on traits. A few limitations remain.

### variance is declared only on traits

The CLR permits variance only on interfaces, so `out` / `in` modifiers can be declared only on a trait's type parameters. Declaring variance on a class or struct is rejected at parse time.

Type variance for built-in types is fixed and is not user-declarable. Function types are contravariant in their parameters and covariant in their return; arrays of reference types are covariant; everything else (including `List[T]`, `Map[K, V]`, `Iterable[T]`) is invariant.


---

<a id="rosetta/index"></a>


# Rosetta Code

ghūl solutions to [Rosetta Code](https://rosettacode.org) tasks. Each can be edited and run here:
click the pencil, change it, and run it in your browser.

### starting out

Short programs, and the shapes every language has to have.

- [100 doors](https://ghul.dev/rosetta/100-doors)
- [Averages/Arithmetic mean](https://ghul.dev/rosetta/arithmetic-mean)
- [Binary digits](https://ghul.dev/rosetta/binary-digits)
- [Factorial](https://ghul.dev/rosetta/factorial)
- [FizzBuzz](https://ghul.dev/rosetta/fizzbuzz)
- [Hello world/Text](https://ghul.dev/rosetta/hello-world-text)
- [Quine](https://ghul.dev/rosetta/quine)
- [Reverse a string](https://ghul.dev/rosetta/reverse-a-string)
- [Towers of Hanoi](https://ghul.dev/rosetta/towers-of-hanoi)

### functions and closures

Functions as values: passed, returned, captured, and calling themselves.

- [Accumulator factory](https://ghul.dev/rosetta/accumulator-factory)
- [Anonymous recursion](https://ghul.dev/rosetta/anonymous-recursion)
- [Apply a callback to an array](https://ghul.dev/rosetta/apply-a-callback-to-an-array)
- [Catamorphism](https://ghul.dev/rosetta/catamorphism)
- [Church numerals](https://ghul.dev/rosetta/church-numerals)
- [Closures/Value capture](https://ghul.dev/rosetta/closures-value-capture)
- [Cumulative standard deviation](https://ghul.dev/rosetta/cumulative-standard-deviation)
- [First-class functions](https://ghul.dev/rosetta/first-class-functions)
- [Jensen's Device](https://ghul.dev/rosetta/jensens-device)
- [Man or boy test](https://ghul.dev/rosetta/man-or-boy-test)
- [Mutual recursion](https://ghul.dev/rosetta/mutual-recursion)
- [Nested function](https://ghul.dev/rosetta/nested-function)
- [Variadic function](https://ghul.dev/rosetta/variadic-function)
- [Y combinator](https://ghul.dev/rosetta/y-combinator)

### types and pattern matching

Unions, traits, generics and operators: modelling data and taking it apart again.

- [Abstract type](https://ghul.dev/rosetta/abstract-type)
- [Algebraic data types](https://ghul.dev/rosetta/algebraic-data-types)
- [Arithmetic evaluation](https://ghul.dev/rosetta/arithmetic-evaluation)
- [Flatten a list](https://ghul.dev/rosetta/flatten-a-list)
- [Generic swap](https://ghul.dev/rosetta/generic-swap)
- [Multiple distinct objects](https://ghul.dev/rosetta/multiple-distinct-objects)
- [Null object](https://ghul.dev/rosetta/null-object)
- [Quaternion](https://ghul.dev/rosetta/quaternion)
- [Queue/Definition](https://ghul.dev/rosetta/queue-definition)
- [S-expressions](https://ghul.dev/rosetta/s-expressions)
- [Ternary logic](https://ghul.dev/rosetta/ternary-logic)

### generators and laziness

Sequences produced a value at a time, and consumers that stop when they have enough.

- [Amb](https://ghul.dev/rosetta/amb)
- [Balanced brackets](https://ghul.dev/rosetta/balanced-brackets)
- [Calkin-Wilf sequence](https://ghul.dev/rosetta/calkin-wilf-sequence)
- [EKG sequence convergence](https://ghul.dev/rosetta/ekg-sequence-convergence)
- [Fibonacci sequence](https://ghul.dev/rosetta/fibonacci-sequence)
- [Fusc sequence](https://ghul.dev/rosetta/fusc-sequence)
- [Hailstone sequence](https://ghul.dev/rosetta/hailstone-sequence)
- [Intersecting number wheels](https://ghul.dev/rosetta/intersecting-number-wheels)
- [Kolakoski sequence](https://ghul.dev/rosetta/kolakoski-sequence)
- [Look-and-say sequence](https://ghul.dev/rosetta/look-and-say-sequence)
- [Ordered partitions](https://ghul.dev/rosetta/ordered-partitions)
- [Same fringe](https://ghul.dev/rosetta/same-fringe)
- [Stern-Brocot sequence](https://ghul.dev/rosetta/stern-brocot-sequence)
- [Tree traversal](https://ghul.dev/rosetta/tree-traversal)
- [Van der Corput sequence](https://ghul.dev/rosetta/van-der-corput-sequence)
- [Van Eck sequence](https://ghul.dev/rosetta/van-eck-sequence)

### numbers

Arithmetic, primes, and sequences with something to prove.

- [Achilles numbers](https://ghul.dev/rosetta/achilles-numbers)
- [Ackermann function](https://ghul.dev/rosetta/ackermann-function)
- [Additive primes](https://ghul.dev/rosetta/additive-primes)
- [Almost prime](https://ghul.dev/rosetta/almost-prime)
- [Amicable pairs](https://ghul.dev/rosetta/amicable-pairs)
- [Anti-primes](https://ghul.dev/rosetta/anti-primes)
- [Descending primes](https://ghul.dev/rosetta/descending-primes)
- [Gapful numbers](https://ghul.dev/rosetta/gapful-numbers)
- [Gray code](https://ghul.dev/rosetta/gray-code)
- [Greatest common divisor](https://ghul.dev/rosetta/greatest-common-divisor)
- [Haversine formula](https://ghul.dev/rosetta/haversine-formula)
- [Iterated digits squaring](https://ghul.dev/rosetta/iterated-digits-squaring)
- [Juggler sequence](https://ghul.dev/rosetta/juggler-sequence)
- [Kaprekar numbers](https://ghul.dev/rosetta/kaprekar-numbers)
- [Ludic numbers](https://ghul.dev/rosetta/ludic-numbers)
- [Map range](https://ghul.dev/rosetta/map-range)
- [Negative base numbers](https://ghul.dev/rosetta/negative-base-numbers)
- [Numbers with equal rises and falls](https://ghul.dev/rosetta/numbers-with-equal-rises-and-falls)
- [Ormiston pairs](https://ghul.dev/rosetta/ormiston-pairs)
- [Pernicious numbers](https://ghul.dev/rosetta/pernicious-numbers)
- [Population count](https://ghul.dev/rosetta/population-count)
- [Radical of an integer](https://ghul.dev/rosetta/radical-of-an-integer)
- [Roman numerals/Encode](https://ghul.dev/rosetta/roman-numerals-encode)
- [Semiprime](https://ghul.dev/rosetta/semiprime)
- [Sieve of Eratosthenes](https://ghul.dev/rosetta/sieve-of-eratosthenes)
- [Sphenic numbers](https://ghul.dev/rosetta/sphenic-numbers)
- [Taxicab numbers](https://ghul.dev/rosetta/taxicab-numbers)
- [Truncatable primes](https://ghul.dev/rosetta/truncatable-primes)
- [Undulating numbers](https://ghul.dev/rosetta/undulating-numbers)
- [Zeckendorf number representation](https://ghul.dev/rosetta/zeckendorf-number-representation)

### text

Reading, rewriting and comparing strings.

- [ABC problem](https://ghul.dev/rosetta/abc-problem)
- [Align columns](https://ghul.dev/rosetta/align-columns)
- [Camel case and snake case](https://ghul.dev/rosetta/camel-case-and-snake-case)
- [Entropy](https://ghul.dev/rosetta/entropy)
- [Jaro similarity](https://ghul.dev/rosetta/jaro-similarity)
- [Levenshtein distance](https://ghul.dev/rosetta/levenshtein-distance)
- [Palindrome detection](https://ghul.dev/rosetta/palindrome-detection)
- [Pangram checker](https://ghul.dev/rosetta/pangram-checker)
- [Run-length encoding](https://ghul.dev/rosetta/run-length-encoding)

### collections and algorithms

Sorting, searching, and working over whole collections.

- [Damm algorithm](https://ghul.dev/rosetta/damm-algorithm)
- [Dinesman's multiple-dwelling problem](https://ghul.dev/rosetta/dinesmans-multiple-dwelling-problem)
- [Forward difference](https://ghul.dev/rosetta/forward-difference)
- [Huffman coding](https://ghul.dev/rosetta/huffman-coding)
- [Josephus problem](https://ghul.dev/rosetta/josephus-problem)
- [Non-continuous subsequences](https://ghul.dev/rosetta/non-continuous-subsequences)
- [Power set](https://ghul.dev/rosetta/power-set)
- [Smith–Waterman algorithm](https://ghul.dev/rosetta/smith-waterman-algorithm)
- [Sorting algorithms/Quicksort](https://ghul.dev/rosetta/sorting-algorithms-quicksort)
- [Topswops](https://ghul.dev/rosetta/topswops)
- [Water collected between towers](https://ghul.dev/rosetta/water-collected-between-towers)


---

<a id="implementation"></a>

# implementation

The ghūl compiler is itself written in ghūl. It is published as the
[`ghul.compiler`](https://www.nuget.org/packages/ghul.compiler) .NET
tool, with source in the [`degory/ghul`](https://github.com/degory/ghul)
repository.

## overall shape

A ghūl build moves through three broad stages:

1. **Read the source.** Source text is split into tokens, and the tokens
   are parsed into a syntax tree describing the program.
2. **Make sense of the source.** A series of passes walks the syntax tree,
   working out what every name refers to, what type every expression has,
   and reporting any errors.
3. **Emit the assembly.** A final pass walks the syntax tree and writes a
   `.dll` or `.exe` to disk, encoding .NET metadata and
   method bodies directly.

When the compiler runs as the back end of the VS Code extension it follows
the same first two stages but stops short of emitting IL, and runs many
passes incrementally as the user edits.

## source layout

The compiler's source is organised around the stages above. Each top-level
folder under `src/` in the compiler repository covers one
concern:

| Folder            | Role                                                           |
|-------------------|----------------------------------------------------------------|
| `lexical/`    | Turns source text into a stream of tokens.                  |
| `syntax/trees/` | The syntax-tree node classes themselves.                  |
| `syntax/parsers/` | Recursive-descent parsers that build the syntax tree from tokens. |
| `syntax/process/` | Passes that walk the syntax tree: name resolution, type checking, IL generation, plus the editor-facing passes for completion and signature help. |
| `semantic/`   | The symbol table, scopes, types and supporting machinery used by the passes. |
| `ir/`         | A small set of nodes that model individual IL instructions, used while emitting code. |
| `compiler/`   | The `COMPILER` orchestrator that registers the passes and runs them over each source file. |
| `driver/`     | A thin command-line front-end that parses arguments and decides whether to run a build or the language service. |
| `analysis/`   | The language-service request handlers used in analysis mode. |
| `ioc/`        | A small inversion-of-control container. Mostly used by the parsers so they can refer to one another without circular constructor wiring. |
| `source/`     | Source-location bookkeeping. Every syntax-tree node has a `LOCATION`, so diagnostics, hovers and go-to-definition can point at the right span of text. |
| `logging/`    | Diagnostic reporting and per-pass timers. All compiler messages flow through `Logger` so that the IDE can intercept them. |

The boundaries are deliberately ordinary: anyone who has worked on a
classical compiler will recognise most of them. The interesting parts are
inside `syntax/process/` and `semantic/`.

## from source to tokens

The tokenizer in `lexical/` reads source text a character at a time
and produces a sequence of `TOKEN` values. Whitespace and comments are
discarded; tokens know their kind (identifier, keyword, operator, string
literal, …), their text and their source location.

The parser in `syntax/parsers/` is a hand-written recursive-descent
parser. Each grammar production has its own parser class implementing a
small `Parser[T]` trait. The grammar is mutually recursive (an expression
parser needs a statement parser which itself needs the expression
parser), so the parser classes are too. The IoC container breaks the
resulting cyclic constructor dependency by resolving each parser's
references lazily.

The output of the parser is a tree of `Node` subclasses defined in
`syntax/trees/`. The nodes fall into four broad groups:

- **Definitions** - namespaces, classes, traits, structs, variants,
  functions, methods, fields, properties.
- **Statements** - `if`, `for`, `while`, `try`, and so on.
- **Expressions** - literals, calls, operators, anonymous functions, tuple constructors.
- **Type expressions** - types as they appear written in source, before
  the semantic layer turns them into the type objects described below.

Every node knows the source location it came from, and the tree is the
single shared data structure that the rest of the compiler walks.

## passes over the syntax tree

The bulk of the compiler is a series of *passes* over the syntax tree.
Each pass is a class whose name describes what it does; most are
subclasses of the `Visitor` hierarchy in `syntax/process/`. The
`COMPILER` class registers them in order, and each pass runs over every
source file before the next pass starts. This means later passes can rely
on the work the earlier passes have already done.

The order matters. For example, the pass that works out the type of an
expression depends on the pass that has already resolved what every name
refers to, which in turn depends on the pass that has put every
declaration into the symbol table.

The full pass list, in the order `COMPILER` runs them:

| Pass                                  | What it does |
|---------------------------------------|--------------|
| `conditional-compilation`      | Nullifies any definition or statement disabled by its `@IF.flag()` pragma. |
| `collect-modifier-keyword-locations` | Records the source location of every contextually-lexed modifier keyword before a later rewrite consumes it, for the editor's semantic-token colouring. |
| `rewrite-syntax-trees`         | Light syntax-tree rewrites that simplify later passes: expanding dotted namespace names into nested form, synthesising accessor methods for properties, indexers and union variants, and spilling operand-position subexpressions sitting to the left of an `await` so their values survive the suspend. |
| `collect-suppress-pragmas`     | Registers a suppression region for each `@suppress("slug")` pragma, covering the definition or statement it wraps. |
| `declare-symbols`              | Registers the type-level skeleton in the symbol table: namespaces, types, variants and their generic type parameters - everything a type expression can name. |
| `resolve-uses`                 | First round of `use` resolution: binds imports of namespaces and types, so short type names work in subsequent passes. |
| `declare-members`              | Declares every type's members - methods, fields, properties, parameters - plus global functions and variables, and classifies each function body as plain, generator or asynchronous. |
| `resolve-member-uses`          | Second round of `use` resolution: binds imports of members - static methods, global functions, enum members - and reports any `use` still unresolved. |
| `check-name-conventions`       | Warns where a declaration's name does not follow the naming convention for its kind. |
| `resolve-type-expressions`     | Turns type annotations in declarations, signatures, and in expression-position uses like `cast`, `isa`, `typeof` and `_` into the semantic `Type` objects later passes use. |
| `resolve-ancestors`            | Attaches base classes, trait parents and default ancestors to classes, traits, structs, unions and enums, and validates the inheritance constraints. |
| `resolve-explicit-types`       | Registers each variable's, property's and parameter's declared type on its symbol, so the declared type is available to constrain inference later. |
| `check-type-argument-bounds`   | Checks each type argument written in a type-expression position against its type parameter's declared bound. |
| `resolve-overrides`            | Pulls inherited symbols down into each container type's scope; for every method whose signature matches an ancestor's virtual or abstract method, records the override link and checks the override is consistent. Reports duplicate top-level functions. |
| `definition-virtuality`        | Editor-only: reports each declaration's place in the dispatch hierarchy as an inlay hint. |
| `register-source-intrinsics`   | Registers an intrinsic handler for each built-in operator the compilation itself declares in source, so the runtime library can be built. |
| `record-type-argument-uses`    | For every closure body, records which of the enclosing scope's generic type parameters the body references, so the closure frame can plumb them through at runtime. |
| `mark-boxed-locals`            | Marks `let mut` locals (and parameters) that are both captured by an anonymous function and reassigned, so the IL pass wraps them in a `Ghul.BOX[T]` cell shared between the enclosing scope and every capturer. |
| `compile-expressions`          | The largest pass. Walks every expression in every function body, working out its type, resolving operator and method overloads, running type inference, applying flow-sensitive narrowing, and producing IR values that describe what the IL should look like. |
| `infer-effects`                | Re-walks every body with resolved types, solves which members each function can read and write, and judges every use of a flow-narrowed value against the calls recorded across its narrowing. |
| `generate-il`                  | Walks the syntax tree one last time and writes the assembly, encoding the IR values produced by `compile-expressions`. |

Whether each pass actually runs depends on the build flags. A plain syntax
check stops after the early passes; a full build runs all of them.
Analysis mode runs everything except `generate-il`, so the IDE
sees every diagnostic a batch build would report.

A short overview of each:

### `conditional-compilation`

ghūl's conditional compilation is a pragma annotation: a `@IF.flag()`
applied to a single definition or statement gates that item on whether
`flag` was passed at compile time. There is no else/endif form; a
disabled item is omitted. This pass walks the syntax tree and
nullifies each disabled item - definitions are replaced by an empty
definition list, statements by `null` - so subsequent passes can skip
them.

### `collect-modifier-keyword-locations`

Records the source location of every contextually-lexed modifier keyword -
currently `init` and `open`. A later rewrite consumes some of these
tokens, so the locations are captured up front for the editor's
semantic-token colouring, which lights them as keywords. Hard keywords
like `abstract` need no help; only the contextually-lexed modifiers do.

### `rewrite-syntax-trees`

A handful of syntax-tree rewrites that are easier to do up front than to
handle everywhere afterwards. The notable ones are:

- **expand namespaces** - expands dotted namespace names like
  `namespace Foo.Bar is …` into explicitly nested form
  `namespace Foo is namespace Bar is … si si`.
- **add accessors** - synthesises the getter and setter methods that a
  property declaration stands for, and (despite the historical name) the
  equivalent accessors for indexers and for union variants (the per-variant
  `=~`, `get_hash_code`, `value` and `has_value` members).
- **spill awaits** - at each composite expression containing an `await`,
  wraps every earlier-evaluated sub-expression in a `SPILL` node. The
  async state machine described below suspends with an internal `leave`
  instruction, and the CLR requires its evaluation stack to be empty at
  the suspend point; anything spilled is stashed into a field on the
  state-machine frame so it survives the suspend. The rule is purely
  structural - if a later-evaluated child contains an `await`, every
  earlier child is wrapped - so no type information is needed yet.

### `collect-suppress-pragmas`

Finds every `@suppress("slug", …)` pragma and registers a
suppression region for each slug, covering the definition or statement
the pragma wraps. The diagnostics store consults the regions whenever a
coded warning is about to be reported, so every warning honours
`@suppress` without each pass handling it separately.

### `declare-symbols`

Walks the definitions in the syntax tree and creates symbol-table entries
for the type-level skeleton: each namespace, class, trait, struct, union,
variant and enum, and each type's generic type parameters - everything a
type expression can name. Each declaration goes into the appropriate
scope so that later passes can look it up. Members are deliberately left
to `declare-members`, which runs after the first round of `use`
resolution.

### `resolve-uses`

Processes the `use` declarations that appear in each `namespace` block.
`use` resolution runs in two rounds, and this first one binds imports of
namespaces and types - the only symbols that exist yet - attaching each
result to the namespace's scope, so short type names are findable by the
namespace-scope lookups that subsequent passes perform.

Identifier resolution inside expressions and function bodies - looking up
a local, a parameter, a field, or a member access - is deferred to
`compile-expressions`, where types are available to resolve
overloads.

### `declare-members`

Declares every type's members - methods, fields, properties and their
parameters - along with global functions and variables. It runs after the
first round of `use` resolution so that a `partial` or `impl` block's
target name can be reached through a `use` import, wherever the block
sits relative to its target.

While declaring each function the pass scans its body for `yield` and
`await` expressions and classifies the function accordingly: plain,
generator (returns `Ghul.Pipes.Pipe[T]` and contains `yield`), or
asynchronous (contains `await`). The classification is what later tells
the IL pass to emit a generator or async state machine for the function
instead of a straight method body.

### `resolve-member-uses`

The second round of `use` resolution: binds imports of members - static
methods, global functions, enum members - now that `declare-members`
has created them, and reports any `use` that still resolves to nothing.

### `check-name-conventions`

Reports a warning for each declaration whose name does not follow the
naming convention for its kind: `snake_case` for variables, functions and
properties, `PascalCase` for traits, abstract classes, unions and enums,
`UPPER_SNAKE_CASE` for concrete classes, structs, variants and enum
members. It runs after `declare-members` so it can read each
class's computed abstractness - explicit or implied by a body-less
method - rather than just the written modifier.

### `resolve-type-expressions`

The shape of a type as written in source (`List[Pair[int, string]]`,
`(int, string) -> bool`, and so on) is parsed into syntax-tree nodes
under `type_expressions/`. This pass turns the type expressions
that appear in declarations and signatures - return types, parameter
types, field and property types, generic-parameter bounds, ancestor type
references - and in expression-position uses like `cast`, `isa`, `typeof`
and `_` into the `Type` objects (described under [types](#types)
below) that the rest of the compiler manipulates. Type arguments that the
compiler has to *infer* at a call site are produced later, in
`compile-expressions`, when argument types are known.

### `resolve-ancestors`

Attaches each container type to the types it inherits from: a class to its
declared base class and traits, a trait to its parent traits, a struct to
the traits it implements, a union variant to its enclosing union (with
the union's generic arguments threaded through). Where no ancestor is
declared, the pass injects the default one - `Object` for classes, traits
and unions, `VALUE_TYPE` for structs, `ENUM_TYPE` for enums.

It also validates the inheritance constraints: at most one class ancestor,
class before any traits, traits and structs can only inherit traits, no
ancestor can be `void`.

The inheritance graph is then available for later passes to walk. Member
symbols are not yet pulled down into the derived type's scope; that
happens in `resolve-overrides`.

### `resolve-explicit-types`

For every variable, property, parameter or function return whose type is
written out, attaches the resolved `Type` to the corresponding symbol.
By the time `compile-expressions` runs, every explicitly-typed
symbol already knows its declared type, and that declared type becomes
one of the constraints that bidirectional inference uses for the
unannotated parts of the same expression. The pass also performs a few
annotation-only checks (field and property types can't be reference
types; variable types can't be `void`).

Note that this pass does *not* check that an initializer's type matches
the declared type. It cannot - `compile-expressions` has not yet
typed any expression. The assignability check happens there, against the
declared type this pass attached.

### `check-type-argument-bounds`

Checks each type argument written in a type-expression position - a
field, parameter, return, local or nested annotation - against its type
parameter's declared bound (`[T: SomeBase]`). The bound is only attached
to the parameter symbol during `resolve-explicit-types`, after
every type expression has resolved, which is why this check is a
separate pass rather than part of type-expression resolution. Call and
construction positions are checked later, in `compile-expressions`,
where inferred type arguments become known.

### `resolve-overrides`

Two jobs. First, for every container type, the pass walks its ancestors
and pulls their inherited symbols down into the container's own scope, so
that later lookups against a derived class find the members it inherits.

Second, for every method whose signature matches a virtual or abstract
method on an ancestor, the pass records the override link and checks the
override is consistent: covariant return type, matching IL name, no
override of a non-virtual member, and so on. ghūl has no `override`
keyword - whether a method overrides its ancestor is determined by
signature match, not by source annotation - so this pass is where the
override relationship is established. It also reports a handful of
related conditions: ineffective override of a trait default, a static
method accidentally hiding an instance method, a method whose signature
narrows an ancestor's argument types just enough to miss the override.

Once every source file has been visited, the pass reports any pair of
top-level functions whose signatures cannot be told apart.

### `definition-virtuality`

An editor-only pass. For each declared method and property it reports,
as an inlay hint, what the compiler now knows about the declaration's
place in the dispatch hierarchy: whether it overrides, is overridden, or
dispatches statically. ghūl writes none of this in source - there is no
`virtual`, `override`, `sealed` or `final` keyword - so the hints save a
reader reconstructing the answer from the rest of the program.

### `register-source-intrinsics`

The built-in operators are declared as ordinary ghūl source in the
runtime library and marked as intrinsics; compiling any other project,
the compiler reads them from the runtime assembly's metadata. This pass
covers the one project that cannot do that - the runtime library itself -
by registering an intrinsic handler for each such declaration found in
the source being compiled.

### `record-type-argument-uses`

For every closure (anonymous function) body, this pass records which of
the enclosing function's or type's generic type parameters the body
references. The closure compiler later uses that list to plumb those type
parameters through the closure frame at runtime, so the closure can be
invoked with the right instantiation.

### `mark-boxed-locals`

A `let mut` local that is both captured by an anonymous function and
reassigned has to be shared between the enclosing scope and every
capturer; if it stayed in a normal local slot, the two would see
independent copies. This pass walks the syntax tree and marks each such
local (and parameter that meets the same conditions) so the IL pass
wraps it in a `Ghul.BOX[T]` cell - one heap-allocated holder that every
party reads and writes through.

That is the whole job of the pass. Generator and async functions are
also state-machine-compiled so their locals survive `yield` or `await`,
but that lowering is done by `generate-il` (with help from
information attached by `declare-members` and the `spill-awaits`
rewrite), not here.

### `compile-expressions`

The most substantial pass. It walks every expression in every function
body and:

- works out the type of every expression and sub-expression;
- resolves operator and method overloads;
- runs type inference for unannotated locals, anonymous function
  parameters and return types, list literal element types, generic type
  arguments at call sites, and generic constructors;
- applies flow-sensitive type narrowing through `isa` checks, `if let`,
  null tests, variant tests, and divergent guards (where an early `return`
  / `throw` / `break` / `continue` leaves the code below the guard narrowed
  to the stronger type), recording each call that could store to the heap
  against the facts live across it - whether a later use of a narrowed
  value is still safe is judged in `infer-effects` below;
- produces *IR values* that describe, for each expression, the sequence
  of IL operations it stands for.

Inference inside this pass is bidirectional: information flows up from
inner expressions, and back down from contexts that constrain what an
expression's type can be. A function's signature is always explicit, so
inference is confined to function bodies and never changes anything
visible from outside the function.

### `infer-effects`

Runs after `compile-expressions`, re-walking every function body
with the types that pass resolved. For each function it records what the
body reads and writes - which members, and whether it stores to the heap
at all - and then solves those facts across the whole program's call
graph, overrides and invoked function values included, so that for any
call the compiler can answer which members it might write.

The answers feed the *reliance judge*. Narrowing treats calls
optimistically: a call drops no facts, but each call that could store is
recorded against the facts live across it, and every later use that
relies on a fact is judged here, against what the recorded calls can
actually write. A use the solve cannot prove safe is reported at the use
site. The same pass verifies `pure` declarations whose bodies the
earlier walk could not settle on its own.

### `generate-il`

The final pass writes the IR values produced by `compile-expressions`
out as a .NET assembly, using `System.Reflection.Metadata` to encode
the metadata tables, the method bodies and a portable PDB, and writing the
`.dll` or `.exe` itself. Nothing outside the compiler is
involved, so a build needs no platform-specific tool beyond the .NET
runtime the compiler is already running on.

Names, signatures and attribute blobs are all encoded from the resolved
symbols and types, so nothing about the emitted assembly depends on how
the compiler would display those things to a reader.

Some metadata tables are stored as runs: a type points at the first of its
members, and the run ends where the next type's begins. Those runs are not
validated when an assembly loads, so a type written with more members than
it was counted for still loads, with the surplus attached to the following
type. The emitter therefore numbers every row in one pass and writes the
rows in a second, both replaying a single recorded sequence rather than
each working the order out for itself.

Emission is deterministic: the module version id is a hash of the content
rather than a fresh value, and nothing records the time of the build. Two
builds of the same source produce the same bytes, which is what lets the
bootstrap compare assemblies directly.

## the main data structures

A handful of data structures are visible across most of the passes.

### the syntax tree

The output of the parser and the working medium of every subsequent pass.
Each `Node` subclass models one piece of syntax (a class definition, an
`if` statement, a method call) and knows the source location it came
from. As later passes work, they attach additional information to the
nodes: an identifier use gets a reference to the symbol it refers to, an
expression gets its inferred type, and the IL pass attaches IR values
that record how to emit it.

### symbols

A `SYMBOL` is the compiler's record of one thing declared in the program:
a type, a function, a method, a field, a local variable, a parameter, a
generic type argument, and so on. There is one subclass per flavour
(`CLASS`, `INSTANCE_METHOD`, `VARIABLE` and the rest), and they all live
under `semantic/symbols/`.

The `SYMBOL_TABLE` is a central registry; the `NAMESPACES` object tracks
namespace membership. Together they answer the question "what does this
name refer to?".

### scopes

A scope is the answer to "what names are visible here?". Scopes nest:
the innermost is typically a block scope, inside a method scope, inside a
class scope, inside a namespace scope. Name resolution walks outwards
through the chain of scopes until it finds a match.

The base `Scope` and its specialisations (`BLOCK_SCOPE`,
`NAMESPACE_SCOPE`) live under `semantic/scope/`.

### types

A `Type` represents a ghūl type in the form the compiler uses internally.
The hierarchy under `semantic/types/` is fairly small:

- `NAMED` - a reference to a named type (class, trait, struct, variant,
  primitive).
- `GENERIC` - a generic type applied to type arguments, such as
  `List[int]`.
- `FUNCTION` - a function type, used for first-class functions, anonymous
  functions, and methods; `PURE_FUNCTION` is its store-free refinement.
- `TUPLE` - a tuple type, with optional element names.
- `ARRAY` - a fixed array type.
- `NULLABLE`, `MAYBE`, `NONE`, `NULL` - the machinery behind optional
  types: the wrappers that carry `T?` over a value type or a type
  parameter, and the types of the absent value.
- `ONE_OF`, `INTERSECTION` - a value known to be one of several types, or
  several types at once, produced by inference and flow narrowing.
- `INFERRED_VARIABLE_TYPE` and `INFERRED_RETURN_TYPE` - placeholders used
  during inference, replaced by concrete types as constraints accumulate.
- `ERROR` - stands in for the type of an expression the compiler could
  not work out, so that later passes can continue without cascading every
  diagnostic.

`Type` objects answer most of the questions the compiler has about
expressions: is this assignable to that, what is the common type of these
branches, what overload best matches these argument types.

### IR values

`IR.Value` subclasses model individual operations to be emitted as IL.
Most map one-for-one to a single IL instruction; a few (`tuple`, `isa`,
generic boxing helpers) expand into a small sequence.
`compile-expressions` builds an IR value tree for each expression;
`generate-il` walks those trees and encodes their instructions into
the method body being built.

### diagnostics

Errors, warnings and informational messages all flow through `Logger` in
`logging/`, which attaches a `Source.LOCATION` to each message and
stores them in `DIAGNOSTICS_STORE`. In analysis mode, the response to
each edit or compile request carries the store's contents back to the
IDE.

## type inference

Type inference runs inside `compile-expressions` and stays within
function bodies; every declared signature is explicit, so inference never
changes anything visible from outside a function. The [type inference](https://ghul.dev/type-inference)
page covers what is and isn't inferred; this section is the mechanism.

It is bidirectional. Bottom-up, an expression's type is computed from its
sub-expressions. Top-down, the context the expression sits in - a typed
`let`, an assignment, a `return`, a call argument, an `if` or `case`
branch - pushes an expected type back down into it. Where several types
meet, such as the branches of an `if` or the elements of a list literal,
`LEAST_UPPER_BOUND_MAP` finds the most specific type compatible with all
of them.

An unknown type - a local whose type isn't settled yet, an anonymous
function parameter, a not-yet-bound generic argument - is held by an
`INFERRED_VARIABLE_TYPE` placeholder. As the body is walked, each use of
the variable attaches a *constraint* to the placeholder: a member access
records that the type must have that member, a call records an argument
and return shape, a `for` loop records that it must be iterable, an
index records an indexer. These are the `MEMBER_CONSTRAINT`,
`CALL_CONSTRAINT`, `ITERABLE_CONSTRAINT`, `INDEX_CONSTRAINT` and
`DESTRUCTURE_CONSTRAINT` types under `semantic/`. When the
placeholder is resolved, the accumulated constraints filter the candidate
types, rejecting any that don't support how the variable is used.

One walk of a body cannot always see enough: a `let`-bound anonymous
function is used after it is defined, and a constructor's type arguments
can be fixed by a later call. So `compile-expressions` re-walks
each function body. Constraints attached during a walk persist into the
next and only ever narrow, so each pass either tightens the unknowns or
leaves them unchanged; the walk repeats until it settles - no new errors
and no expression left consuming an unresolved type. Anything still
unknown at that point is reported where it could not be inferred.

Inference is interleaved with flow-sensitive narrowing. Alongside each
variable's inferred type, the pass tracks what the control flow has
proved about it - that an `isa` test succeeded, that an optional was
checked for presence, that a guard returned on the other case - and
joins those facts where branches merge. Narrowing changes the type a
variable is seen at within a region without changing its declared type.

## analysis mode

The same compiler executable runs the IDE's language service. When the
ghūl VS Code extension starts, it launches `ghul-compiler` with
the `--analyse` flag, then talks to it over the process's standard
input and output streams.

Communication is newline-delimited JSON. Each request is a single JSON
object on one line, discriminated by a `command` field -
`edit`, `compile`, `hover`, `definition`,
`complete` and so on - and each response is a single object
discriminated by a `kind` field. JSON escapes any newline inside
a string, so reading a line is a complete framing operation on either
end. At startup the analyser answers a `listen` request with the
capabilities it supports, and a client sends a newer request only after
seeing the matching capability, so either side can be upgraded first.

The interesting work happens around two requests:

- **`edit`** - sent on every keystroke (after a short debounce).
  Re-parses the file the user is editing and re-runs the early passes
  over it, keeping the rest of the project's syntax trees untouched.
  This is fast enough to keep up with typing, and it is what produces the
  squiggles and hovers that appear as the user types. A client can send
  `edit_delta` instead, carrying just the changed span of the file
  rather than its whole text.
- **`compile`** - sent during a longer pause in typing. Runs the
  full pass sequence over the whole project so that any consequences of
  the edit ripple through the rest of the analysis.

This two-stage pattern keeps the typical-case latency low without
sacrificing correctness once the user pauses. Hover information,
go-to-definition, completions and signature help all come from the state
these passes maintain: the symbol table, the scopes, the per-node type
annotations and the symbol-use map.

A query that arrives while a compile is running is answered during it:
the compile pauses at the next per-file boundary of its walk, answers
what is queued, and resumes. An edit that arrives while a compile is
running cuts the compile short instead - the rest of the walk would
compute diagnostics the edit has already made stale.

### incremental analysis

An `edit` does not rebuild the project from scratch. The analyser
retains the whole compiled state between requests - syntax trees, symbol
table, scopes, types - and how much of it an edit invalidates depends on
what the edit changed:

- **An edit that preserves every declared signature** - the common case,
  typing inside a function body - is spliced into the retained syntax
  tree: the new bodies replace the old ones, and only those bodies are
  re-checked. Every symbol, type and override link survives untouched,
  which is what makes the per-keystroke path fast; on the compiler's own
  source it is around two orders of magnitude faster than re-running the
  early passes over the file.
- **An edit that changes a declaration** - a signature, a type, a new or
  removed member - invalidates more: the file's declarations are
  re-declared and re-resolved, and the consequences for the rest of the
  project are picked up by the next whole-project `compile`.

The splice relies on a language rule doing structural work: a function's
signature is always explicit and inference never escapes a body, so a
body-only edit provably cannot change anything another file can see.
Where any guard on the incremental path fails, the analyser falls back
to the full rebuild - slower, never wrong.

### batch requests and lifetime

Two convenience requests, `hover_map` and
`semantic_tokens`, dump every recorded hover or every recorded
symbol use for a file in one batch. They are mainly used by the example
pipeline on this website, which feeds each example through the analyser
and uses the results to drive hover popups and semantic-token colouring
in the rendered output.

The compiler runs as a long-lived process. A `WATCHDOG` component watches
for sustained handler failures or excessive heap growth and asks the IDE
to recycle the process when either threshold is crossed; the extension
schedules recycles during idle periods so the user rarely notices. The
analyser also exits of its own accord after half an hour without a
request: a warm analyser retains the whole symbol table, so an editor
window left open overnight would otherwise hold hundreds of megabytes to
answer nothing, and the cold rebuild the next request pays is the
cheaper side of that trade. Even with the recycles, the long-lived shape
is much cheaper than starting a fresh compiler for every request.

## bootstrap and self-hosting

The ghūl compiler is *self-hosting*: it is written in ghūl and is
compiled by an earlier version of itself. Every CI build re-bootstraps
the compiler by compiling the source under the published version and
then comparing the assemblies two further passes produce; the compiler
that the publish produced should compile itself byte-for-byte
identically. A divergence between the two is treated as a build failure.

The historical story of how the first version of the compiler came to
exist, back when no ghūl compiler existed to compile it, is on the
[history](https://ghul.dev/history) page.


---

<a id="history"></a>

# history

## background
The ghūl [compiler](https://github.com/degory/ghul) is a [self-hosting compiler](https://en.wikipedia.org/wiki/Self-hosting_(compilers)), capable of compiling itself from its own source code. 

[Bootstrapping](https://en.wikipedia.org/wiki/Bootstrapping_(compilers)) a new compiler for a new language is a classic chicken-and-egg problem: you need a compiler to compile your new compiler, but that compiler doesn’t exist yet.

The solution is to write the initial compiler in a language that does exist; then, once that compiler is sufficiently reliable, its source code must be translated into the new language, giving a compiler that can compile the new language, including its own source code. It's best to keep the initial compiler simple, for example by handling only a subset of the new language and producing unoptimized code. The smaller and simpler the initial compiler is, the less work is involved in translating it into the new language, making bootstrapping easier.

## tombstones
When discussing bootstrapping, it's common to use [tombstone](https://en.wikipedia.org/wiki/Tombstone_diagram) diagrams. In a T shaped tombstone diagram, the T represents a particular version of a compiler. Within the T, three languages are named: the source language, the target language, and the implementation language. The target language is typically some kind of IL or machine language, but for a transpiler, the target language is source code.

For example, a compiler C that reads source in language S, translates it to language T, and is implemented in language I, would be depicted like this:

![Example tombstone showing compiler for language S, targeting language T, written in language I](https://ghul.dev/bootstrap-tombstone-example.drawio.svg)

## the L compiler
ghūl grew out of another language I designed, years before, named L, and I used L in the early stages of the ghūl compiler development. The initial ghūl compiler could in principle have been written in any pre-existing language with a compiler; I chose L because I knew I could easily make changes to the L language and compiler if needed to support the ghūl bootstrap.

(Plus, why spend ages designing a programming language and building a compiler for it, if you're not going to use it to build _another_ compiler for a _another_ programming language you've invented? 😂)

Like the ghūl compiler, the L compiler is self-hosting. It was originally written in C++ and I bootstrapped it manually by hand translating the C++ source into equivalent L. This tedious process was made easier by carefully sticking to an L-compatible subset of C++ when writing the initial C++ version of the L compiler.

![bootstrapping the L compiler](https://ghul.dev/bootstrap-L-compiler-bootstrap-from-C++.drawio.svg)

## L to L transpiler
The first version of the ghūl compiler wasn't really a compiler and it didn't understand ghūl. It was actually a simple L source code to L source code transpiler, written in L.

![The L to L transpiling 'ghul compiler'](https://ghul.dev/bootstrap-L-to-L-transpiler.drawio.svg)

This transpiler was in part a strategic piece of scaffolding, intended to support the bootstrap process. I wanted to automate the process of transforming the compiler source code from L to ghūl and so avoid the tedious hand-translation I'd had to do previously when bootstrapping the L compiler. Some parts of the L to L transpiler do survive in the real ghūl compiler (the lexical analyzer and the parser), but the rest was discarded once the initial bootstrap was complete

I added a compiler driver to the L to L transpiler, so it could call the existing L compiler, passing in the L code it generated. The result was a compiler that consumed L source code and generated x64 machine code, but which also generated transpiled L source code as an intermediate step.

![L compiler and the L to L transpiling 'ghul compiler'](https://ghul.dev/bootstrap-L-to-L-transpiler-with-L-compiler.drawio.svg)

This simple 'ghūl compiler' still understood no ghūl, performed no semantic analysis, and generated L source code as its 'object code'. It relied completely on the L compiler for semantic error detection and reporting and for x64 code generation.

## L to ghūl and ghūl to L transpilers
I enhanced the L to L transpiler so it could transpile L to ghūl and ghūl to L. The transpiler was still written in L and still relied on the L compiler as a backend to generate the x64 executable from transpiled the L code.

![Transpilers handling both L and ghul](https://ghul.dev/bootstrap-ghūl-and-L-transpilers.drawio.svg)

## first ghūl bootstrap

Then I passed the L source code of the ghūl to L transpiler through the L to ghūl transpiler, generating output in ghūl. This yielded a ghūl to L transpiler written in ghūl:

![Bootstrapping the ghūl to L transpiler](https://ghul.dev/bootstrap-ghūl-self-hosting-transpiler.drawio.svg)

**This step is the first bootstrap**, and it's why I started with a transpiler: the source code of the ghūl to L transpiler, which was originally L, has now been mechanically transformed into ghūl. This new transpiler is written in ghūl, and it can transpile itself into L: it has become self-hosting, albeit still dependent on the L compiler to generate machine code from L.

## .NET backend
Gradually, I integrated more semantic analysis into the ghūl compiler: representations of classes, traits, methods, functions, variables, etc., along with corresponding error checking and reporting.

With the compiler now capable of constructing a detailed representation of input programs, I began implementing a .NET IL generation backend. I did this in stages, adding support for expressions and local variable definitions first, then working through the other more advanced language constructs.

I initially used scaffolding to test generated IL snippets, because the compiler wasn't capable of generating completely self-contained IL programs. As I implemented .NET IL for the various ghūl language features, and the compiler became increasingly more capable, I guarded against regressions by building [integration tests](https://github.com/degory/ghul/tree/main/integration-tests) as I went. The regression test runner started out as a collection of bash scripts, but as the compiler stabilized, I [rewrote it in ghūl](https://github.com/degory/ghul-test). The initial regression suite included tests asserting correct IL generation for all the different ghūl language constructs as I implemented them. As soon as the compiler could generate code for complete programs, I added further integration tests exercising generated code execution.

I continued to maintain the transpilation to L source code backend alongside the .NET IL backend throughout this process, until the .NET IL backend was sufficiently complete and stable to self-host the compiler on .NET.

This phase was complicated by L's LLVM backend and by its standard library, with features like generic collections and file handling, which interfaced with glibc and were not source compatible with similar facilities in .NET. I needed to be able to use these facilities in the compiler source, and have the built compiler run on both glibc and .NET. I solved this by cloning a small subset of the .NET standard library in ghūl, and then porting references to the L standard library in the ghūl compiler to use this .NET library subset, thus enabling the compiler to be built on and target both L and .NET.

## full self-hosting on .NET
Finally, with the compiler reliably self-hosting on .NET, I removed the L transpilation backend and the .NET library subset, and the compiler was successfully bootstrapped onto .NET.

You can see this process in the Git history in the [ghūl compiler repo](https://github.com/degory/ghul), going all the way back to the initial commit.


---

<a id="resources"></a>

# resources

## compiler, runtime, and tools

Official source repositories are [hosted on GitHub.com](https://github.com/degory)

Official release packages are [hosted on NuGet.org](https://www.nuget.org/packages?q=degory+ghul). Copies of the release versions and beta versions are available on GitHub under Packages for each repository, and as workflow assets on successful PR builds.

The Visual Studio Code language extension is available on the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=degory.ghul).


### compiler
The ghūl compiler
- **Repository:** [ghul](https://github.com/degory/ghul)
- **Package:** [ghul.compiler](https://www.nuget.org/packages/ghul.compiler) (Packaged as a [.NET tool](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-tool-install))

### runtime
The ghūl runtime library.
- **Repository:** [ghul-runtime](https://github.com/degory/ghul-runtime)
- **Package:** [ghul.runtime](https://www.nuget.org/packages/ghul.runtime)

### test
Integration test runner for the ghūl compiler. (A build time dependency of the compiler itself. Not required for other ghūl projects)
- **Repository:** [ghul-test](https://github.com/degory/ghul-test) 
- **Package:** [ghul.test](https://www.nuget.org/packages/ghul.test)

### Visual Studio Code Extension
Provides ghūl language support within VSCode.
- **Repository:** [ghul-vsce](https://github.com/degory/ghul-vsce)
- **Package:** [degory.ghul](https://marketplace.visualstudio.com/items?itemName=degory.ghul)

### templates
.NET New Templates
- **Repository:** [ghul-templates](https://github.com/degory/ghul-templates)
- **Package** [ghul.templates](https://www.nuget.org/packages/ghul.templates) (install with `dotnet new install ghul.templates`)

## contributing

### issues
If you encounter any problems, please feel free to open an issue on GitHub. If it's not clear which repo to open the issue in, open it in the [compiler repo](https://github.com/degory/ghul) and I can move it if needed.

### PRs
If you want to fix a bug or make an improvement, particularly if it's something small, go ahead and raise a PR. If it's something complex, please raise an issue first. Note that the CI/CD pipelines are not generally set up to handle PRs from forks, so unless you want to hack my workflow YAML, I might need to pull your feature branch and create a PR on your behalf before I can merge your changes.


---

<a id="rosetta/100-doors"></a>


# 100 doors

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/100_doors

```ghul
use IO.Std.write_line
use Ghul.Pipes

let doors = (1::100) |> map(_ => false) |> collect_list()

for pass in 1::100 do
    let door mut = pass

    while door <= 100 do
        doors[door - 1] = !doors[door - 1]
        door = door + pass
    od
od

let open_doors = (1::100) |> filter(door => doors[door - 1])

write_line("open doors: {$open_doors}")
```

output:

```
open doors: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
```


---

<a id="rosetta/arithmetic-mean"></a>


# Averages/Arithmetic mean

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Averages/Arithmetic_mean

```ghul
use IO.Std.write_line
use Collections
use Ghul.Pipes

mean(values: List[double]) -> double =>
    values |> reduce(0.0D, (total, value) => total + value) /
    cast(values.count)

write_line("mean: {mean([1.0D, 2.0D, 3.0D, 4.0D, 5.0D]):F1}")
```

output:

```
mean: 3.0
```


---

<a id="rosetta/binary-digits"></a>


# Binary digits

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Binary_digits

```ghul
use IO.Std.write_line

binary(value: int) -> string =>
    if value < 2 then "{value}" else "{binary(value / 2)}{value % 2}" fi

for value in [5, 50, 9000] do
    write_line(binary(value))
od
```

output:

```
101
110010
10001100101000
```


---

<a id="rosetta/factorial"></a>


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


---

<a id="rosetta/fizzbuzz"></a>


# FizzBuzz

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/FizzBuzz

```ghul
use IO.Std.write_line

for i in 1::100 do
    write_line(
        if i % 15 == 0 then
            "FizzBuzz"
        elif i % 3 == 0 then
            "Fizz"
        elif i % 5 == 0 then
            "Buzz"
        else
            "{i}"
        fi
    )
od
```

output:

```
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
16
17
Fizz
19
Buzz
Fizz
22
23
Fizz
Buzz
26
Fizz
28
29
FizzBuzz
31
32
Fizz
34
Buzz
Fizz
37
38
Fizz
Buzz
41
Fizz
43
44
FizzBuzz
46
47
Fizz
49
Buzz
Fizz
52
53
Fizz
Buzz
56
Fizz
58
59
FizzBuzz
61
62
Fizz
64
Buzz
Fizz
67
68
Fizz
Buzz
71
Fizz
73
74
FizzBuzz
76
77
Fizz
79
Buzz
Fizz
82
83
Fizz
Buzz
86
Fizz
88
89
FizzBuzz
91
92
Fizz
94
Buzz
Fizz
97
98
Fizz
Buzz
```


---

<a id="rosetta/hello-world-text"></a>


# Hello world/Text

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Hello_world/Text

```ghul
IO.Std.write_line("Hello world!")
```

output:

```
Hello world!
```


---

<a id="rosetta/quine"></a>


# Quine

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Quine

```ghul
use IO.Std.write_line; let quote = string(cast char(34), 1); let marker = string(cast char(77), 1); let source = "use IO.Std.write_line; let quote = string(cast char(34), 1); let marker = string(cast char(77), 1); let source = M; write_line(source.replace(marker, string.concat([quote, source, quote])))"; write_line(source.replace(marker, string.concat([quote, source, quote])))
```

output:

```
use IO.Std.write_line; let quote = string(cast char(34), 1); let marker = string(cast char(77), 1); let source = "use IO.Std.write_line; let quote = string(cast char(34), 1); let marker = string(cast char(77), 1); let source = M; write_line(source.replace(marker, string.concat([quote, source, quote])))"; write_line(source.replace(marker, string.concat([quote, source, quote])))
```


---

<a id="rosetta/reverse-a-string"></a>


# Reverse a string

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Reverse_a_string

```ghul
use IO.Std.write_line
use Ghul.Pipes

reverse(text: string) -> string =>
    text |> reduce("", (reversed, character) => "{character}{reversed}")

write_line(reverse("asdf"))
write_line(reverse("Hello, World!"))
```

output:

```
fdsa
!dlroW ,olleH
```


---

<a id="rosetta/towers-of-hanoi"></a>


# Towers of Hanoi

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Towers_of_Hanoi

```ghul
use IO.Std.write_line

move(disks: int, source: int, target: int, spare: int) -> void =>
    if disks > 0 then
        move(disks - 1, source, spare, target)
        write_line("move a disk from pole {source} to pole {target}")
        move(disks - 1, spare, target, source)
    fi

move(3, 1, 3, 2)
```

output:

```
move a disk from pole 1 to pole 3
move a disk from pole 1 to pole 2
move a disk from pole 3 to pole 2
move a disk from pole 1 to pole 3
move a disk from pole 2 to pole 1
move a disk from pole 2 to pole 3
move a disk from pole 1 to pole 3
```


---

<a id="rosetta/accumulator-factory"></a>


# Accumulator factory

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Accumulator_factory

```ghul
use IO.Std.write_line

union Number is
    WHOLE(value: int)
    FRACTIONAL(value: double)
si

use Number.WHOLE
use Number.FRACTIONAL

widen(n: Number) -> double =>
    case ► n
    when (value): WHOLE then cast(value)
    when (value): FRACTIONAL then value
    esac

add(left: Number, right: Number) -> Number =>
    if let whole_left: WHOLE = ► left, whole_right: WHOLE = ► right then
        WHOLE(whole_left.value + whole_right.value)
    else
        FRACTIONAL(widen(left) + widen(right))
    fi

show(n: Number) -> string =>
    case ► n
    when (value): WHOLE then "{value}"
    when (value): FRACTIONAL then "{value}"
    esac

accumulator(initial: Number) -> Number -> Number is
    let sum mut = initial

    return value => (
        sum = add(sum, value)
        sum
    )
si

let x = accumulator(WHOLE(1))

x(WHOLE(5))

accumulator(WHOLE(3))

write_line(show(x(FRACTIONAL(2.3D))))

let y = accumulator(WHOLE(10))

y(WHOLE(5))

write_line(show(y(WHOLE(5))))
```

output:

```
8.3
20
```


---

<a id="rosetta/anonymous-recursion"></a>


# Anonymous recursion

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Anonymous_recursion

```ghul
use IO.Std.write_line

let fibonacci = n =>
    assert n >= 0 else "fibonacci is not defined for a negative argument" in
    (i rec => if i < 2 then i else rec(i - 1) + rec(i - 2) fi)(n)

for n in 0::10 do
    write_line("fibonacci({n}) = {fibonacci(n)}")
od
```

output:

```
fibonacci(0) = 0
fibonacci(1) = 1
fibonacci(2) = 1
fibonacci(3) = 2
fibonacci(4) = 3
fibonacci(5) = 5
fibonacci(6) = 8
fibonacci(7) = 13
fibonacci(8) = 21
fibonacci(9) = 34
fibonacci(10) = 55
```


---

<a id="rosetta/apply-a-callback-to-an-array"></a>


# Apply a callback to an array

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Apply_a_callback_to_an_array

## Using map

```ghul
use IO.Std.write_line
use Ghul.Pipes

write_line("{$([1, 2, 3, 4, 5] |> map(value => value * value))}")
```

output:

```
[1, 4, 9, 16, 25]
```

## Writing apply

```ghul
use IO.Std.write_line
use Collections.List
use Collections.LIST

apply[T, U](values: T[], callback: T -> U pure) -> List[U] is
    let applied = LIST[U]()

    for value in values do
        applied.add(callback(value))
    od

    return applied
si

shout(word: string) -> string => "{word.to_upper()}!"

write_line("{$([1, 2, 3, 4, 5] |> apply(value => value * value))}")
write_line("{$(["frog", "newt", "toad"] |> apply(shout))}")
```

output:

```
[1, 4, 9, 16, 25]
[FROG!, NEWT!, TOAD!]
```


---

<a id="rosetta/catamorphism"></a>


# Catamorphism

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Catamorphism

## Using reduce

```ghul
use IO.Std.write_line
use Ghul.Pipes

let numbers = [1, 2, 3, 4, 5]

let largest =
    (left: int, right: int) => if left > right then left else right fi

let sum = numbers |> reduce(0, (total, value) => total + value)
let product = numbers |> reduce(1, (total, value) => total * value)

write_line("sum:     {sum}")
write_line("product: {product}")
write_line("largest: {numbers |> reduce(numbers[0], largest)}")
```

output:

```
sum:     15
product: 120
largest: 5
```

## Writing fold

```ghul
use IO.Std.write_line
use Collections.Iterable
use Collections.List

fold_left[T, A](values: Iterable[T], seed: A, combine: (A, T) -> A) -> A is
    let running mut = seed

    for value in values do
        running = combine(running, value)
    od

    return running
si

fold_right[T, A](values: List[T], seed: A, combine: (T, A) -> A) -> A is
    let running mut = seed

    for i in 0..values.count do
        running = combine(values[values.count - 1 - i], running)
    od

    return running
si

let numbers = [1, 2, 3, 4, 5]

let bracket_left = (running: string, value: int) => "({running} {value})"
let bracket_right = (value: int, running: string) => "({value} {running})"

let left_sum = fold_left(numbers, 0, (total, value) => total + value)
let right_sum = fold_right(numbers, 0, (value, total) => value + total)

write_line("left  sum:  {left_sum}")
write_line("right sum:  {right_sum}")
write_line("left  tree: {fold_left(numbers, "nil", bracket_left)}")
write_line("right tree: {fold_right(numbers, "nil", bracket_right)}")
```

output:

```
left  sum:  15
right sum:  15
left  tree: (((((nil 1) 2) 3) 4) 5)
right tree: (1 (2 (3 (4 (5 nil)))))
```


---

<a id="rosetta/church-numerals"></a>


# Church numerals

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Church_numerals

```ghul
use IO.Std.write_line

use Church[T] = ((T) -> T) -> (T) -> T

zero[T](f: (T) -> T) -> (T) -> T => x => x

successor[T](n: Church[T]) -> Church[T] => f => x => f(n(f)(x))

add[T](a: Church[T], b: Church[T]) -> Church[T] =>
    f => x => a(f)(b(f)(x))

multiply[T](a: Church[T], b: Church[T]) -> Church[T] => f => a(b(f))

exponentiate[T](a: Church[T], b: Church[(T) -> T]) -> Church[T] => b(a)

to_church[T](n: int) -> Church[T] =>
    if n == 0 then zero[T] else successor(to_church[T](n - 1)) fi

to_int(n: Church[int]) -> int => n(x => x + 1)(0)

let three = successor(successor(successor(zero[int])))
let four = successor(three)

write_line("three is {to_int(three)}")
write_line("four is {to_int(four)}")
write_line("three plus four is {to_int(add(three, four))}")
write_line("three times four is {to_int(multiply(three, four))}")
let three_as_exponent = to_church[(int) -> int](3)
let four_as_exponent = to_church[(int) -> int](4)

write_line(
    "four to the power three is "
    "{to_int(exponentiate(four, three_as_exponent))}")

write_line(
    "three to the power four is "
    "{to_int(exponentiate(three, four_as_exponent))}")
```

output:

```
three is 3
four is 4
three plus four is 7
three times four is 12
four to the power three is 64
three to the power four is 81
```


---

<a id="rosetta/closures-value-capture"></a>


# Closures/Value capture

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Closures/Value_capture

```ghul
use IO.Std.write_line
use Collections.LIST

let squares = LIST[() -> int]()

for i in 0..10 do
    squares.add(() => i * i)
od

write_line("{squares[3]()}")
```

output:

```
9
```


---

<a id="rosetta/cumulative-standard-deviation"></a>


# Cumulative standard deviation

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Cumulative_standard_deviation

```ghul
use IO.Std.write_line
use System.Math.sqrt

let standard_deviation =
    let count mut = 0 in
    let total mut = 0.0D in
    let squares mut = 0.0D in

    (sample: double) -> double => (
        count = count + 1
        total = total + sample
        squares = squares + sample * sample

        let mean = total / cast double(count)

        sqrt(squares / cast double(count) - mean * mean)
    )

for sample in [2.0D, 4.0D, 4.0D, 4.0D, 5.0D, 5.0D, 7.0D, 9.0D] do
    write_line("after {sample}: {standard_deviation(sample)}")
od
```

output:

```
after 2: 0
after 4: 1
after 4: 0.9428090415820626
after 4: 0.8660254037844386
after 5: 0.9797958971132716
after 5: 1
after 7: 1.3997084244475297
after 9: 2
```


---

<a id="rosetta/first-class-functions"></a>


# First-class functions

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/First-class_functions

```ghul
use IO.Std.write_line
use Ghul.Pipes
use Collections.LIST
use System.Math

>>[A, B, C](f: A -> B, g: B -> C) -> A -> C =>
    x => g(f(x))

let cube = x => x * x * x
let cube_root = x => Math.cbrt(x)

let functions = LIST()
functions.add(Math.sin)
functions.add(Math.cos)
functions.add(cube)

let inverses = LIST()
inverses.add(Math.asin)
inverses.add(Math.acos)
inverses.add(cube_root)

for (function, inverse) in functions |> zip(inverses) do
    let round_trip = function >> inverse

    write_line("{round_trip(0.5D):F6}")
od
```

output:

```
0.500000
0.500000
0.500000
```


---

<a id="rosetta/jensens-device"></a>


# Jensen's Device

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Jensen's_Device

```ghul
use IO.Std.write_line

let i mut = 0

let sum = (low: int, high: int, term: () -> double) -> double => (
    let total mut = 0.0D

    i = low

    while i <= high do
        total = total + term()

        i = i + 1
    od

    total
)

write_line("{sum(1, 100, () => 1.0D / cast double(i))}")
```

output:

```
5.187377517639621
```


---

<a id="rosetta/man-or-boy-test"></a>


# Man or boy test

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Man_or_boy_test

```ghul
use IO.Std.write_line

a(
    k: int,
    x1: () -> int,
    x2: () -> int,
    x3: () -> int,
    x4: () -> int,
    x5: () -> int
) -> int is
    let counter mut = k

    let b = () rec => (
        counter = counter - 1

        a(counter, rec, x1, x2, x3, x4)
    )

    return if counter <= 0 then x4() + x5() else b() fi
si

for k in 0::10 do
    let result = a(k, () => 1, () => -1, () => -1, () => 1, () => 0)

    write_line("k = {k,2}: {result}")
od
```

output:

```
k =  0: 1
k =  1: 0
k =  2: -2
k =  3: 0
k =  4: 1
k =  5: 0
k =  6: 1
k =  7: -1
k =  8: -10
k =  9: -30
k = 10: -67
```


---

<a id="rosetta/mutual-recursion"></a>


# Mutual recursion

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Mutual_recursion

```ghul
use IO.Std.write_line
use Ghul.Pipes

female(n: int) -> int => if n == 0 then 1 else n - male(female(n - 1)) fi

male(n: int) -> int => if n == 0 then 0 else n - female(male(n - 1)) fi

show(name: string, function: (int) -> int pure) =>
    write_line("{name} {(0..20) |> map(function) |> join(" ")}")

show("F:", female)
show("M:", male)
```

output:

```
F: 1 1 2 2 3 3 4 5 5 6 6 7 8 8 9 9 10 11 11 12
M: 0 0 1 2 2 3 4 4 5 6 6 7 7 8 9 9 10 11 11 12
```


---

<a id="rosetta/nested-function"></a>


# Nested function

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Nested_function

```ghul
use IO.Std.write_line
use Collections.LIST
use Ghul.Pipes

make_list(separator: string) -> string is
    let counter mut = 0

    let make_item = (item: string) => (
        counter = counter + 1
        "{counter}{separator}{item}"
    )

    let items = LIST[string]()

    for item in ["first", "second", "third"] do
        items.add(make_item(item))
    od

    return items |> join("\n")
si

write_line(make_list(". "))
```

output:

```
1. first
2. second
3. third
```


---

<a id="rosetta/variadic-function"></a>


# Variadic function

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Variadic_function

```ghul
use IO.Std.write_line
use Collections.LIST
use Ghul.Pipes

print_all[T](values: T[]) is
    for value in values do
        write_line("{value}")
    od
si

class ▼ Animal(name: string) abstract is
    ◆▼ speak() -> string

    ▲ to_string() -> string => "{name} says {speak()}"
si

class CAT(name: string): Animal is
    super(name)

    ▲ speak() -> string => "meow"
si

class DOG(name: string): Animal is
    super(name)

    ▲ speak() -> string => "woof"
si

herd(animals: Animal[]) is
    for animal in animals do
        write_line("{animal}")
    od
si

print_all(["one", 2, 3.5])

herd([CAT("felix"), DOG("rex")])

let animals = LIST[Animal]()
animals.add(CAT("tom"))
animals.add(DOG("spot"))

herd(animals |> collect_array())
```

output:

```
one
2
3.5
felix says meow
rex says woof
tom says meow
spot says woof
```


---

<a id="rosetta/y-combinator"></a>


# Y combinator

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Y_combinator

## The y combinator

```ghul
use IO.Std.write_line

class SELF_APPLY[A, B](_f: (SELF_APPLY[A, B]) -> (A -> B)) is
    apply(r: SELF_APPLY[A, B]) -> (A -> B) => _f(r)
si

y[A, B](f: (A -> B) -> (A -> B)) -> (A -> B) =>
    let wrap =
        SELF_APPLY[A, B](
            (r: SELF_APPLY[A, B]) => (a: A) => f(r.apply(r))(a))
    in wrap.apply(wrap)

let factorial =
    y(recurse => n =>
        if n <= 1 then 1L else cast(n) * recurse(n - 1) fi)

let fibonacci =
    y(recurse => n =>
        if n < 2 then n else recurse(n - 1) + recurse(n - 2) fi)

let countdown =
    y(recurse => n =>
        if n <= 0 then "liftoff" else "{n}, {recurse(n - 1)}" fi)

let gcd =
    y(recurse => ((a, b): (int, int)) =>
        if b == 0 then a else recurse((b, a % b)) fi)

for n in 0::10 do
    write_line(
        "factorial({n}) = {factorial(n)}, "
        "fibonacci({n}) = {fibonacci(n)}")
od

write_line("countdown(5) = {countdown(5)}")
write_line("gcd(1071, 462) = {gcd((1071, 462))}")
```

output:

```
factorial(0) = 1, fibonacci(0) = 0
factorial(1) = 1, fibonacci(1) = 1
factorial(2) = 2, fibonacci(2) = 1
factorial(3) = 6, fibonacci(3) = 2
factorial(4) = 24, fibonacci(4) = 3
factorial(5) = 120, fibonacci(5) = 5
factorial(6) = 720, fibonacci(6) = 8
factorial(7) = 5040, fibonacci(7) = 13
factorial(8) = 40320, fibonacci(8) = 21
factorial(9) = 362880, fibonacci(9) = 34
factorial(10) = 3628800, fibonacci(10) = 55
countdown(5) = 5, 4, 3, 2, 1, liftoff
gcd(1071, 462) = 21
```

## Using rec

```ghul
use IO.Std.write_line

let factorial = n rec => if n <= 1 then 1L else cast(n) * rec(n - 1) fi

let fibonacci = n rec => if n < 2 then n else rec(n - 1) + rec(n - 2) fi

let countdown =
    n rec => if n <= 0 then "liftoff" else "{n}, {rec(n - 1)}" fi

let gcd =
    ((a, b): (int, int)) rec =>
        if b == 0 then a else rec((b, a % b)) fi

for n in 0::10 do
    write_line(
        "factorial({n}) = {factorial(n)}, "
        "fibonacci({n}) = {fibonacci(n)}")
od

write_line("countdown(5) = {countdown(5)}")
write_line("gcd(1071, 462) = {gcd((1071, 462))}")
```

output:

```
factorial(0) = 1, fibonacci(0) = 0
factorial(1) = 1, fibonacci(1) = 1
factorial(2) = 2, fibonacci(2) = 1
factorial(3) = 6, fibonacci(3) = 2
factorial(4) = 24, fibonacci(4) = 3
factorial(5) = 120, fibonacci(5) = 5
factorial(6) = 720, fibonacci(6) = 8
factorial(7) = 5040, fibonacci(7) = 13
factorial(8) = 40320, fibonacci(8) = 21
factorial(9) = 362880, fibonacci(9) = 34
factorial(10) = 3628800, fibonacci(10) = 55
countdown(5) = 5, 4, 3, 2, 1, liftoff
gcd(1071, 462) = 21
```


---

<a id="rosetta/abstract-type"></a>


# Abstract type

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Abstract_type

```ghul
use IO.Std.write_line
use Ghul.Pipes

trait ▼ Shape is
    ◆▼ area() -> double
    ◆▼ name() -> string
si

trait ▼ Described is
    ▼ describe() -> string => "a shape"
si

class ▼ Polygon: Shape, Described abstract is
    _sides: int

    init(sides: int) is
        _sides = sides
    si

    ◆▲▼ area() -> double

    ▲ name() -> string => "{_sides}-sided polygon"

    ▲▼ describe() -> string => "{name()}, area {area():F2}"
si

class SQUARE: Polygon is
    _side: double

    init(side: double) is
        super.init(4)

        _side = side
    si

    ▲ area() -> double => _side * _side
si

class TRIANGLE: Polygon is
    _base: double
    _height: double

    init(base: double, height: double) is
        super.init(3)

        _base = base
        _height = height
    si

    ▲ area() -> double => _base * _height / 2.0D

    ▲ describe() -> string => "{super.describe()}, and it is a triangle"
si

let shapes: Shape[] = [SQUARE(3.0D), TRIANGLE(4.0D, 5.0D)]

shapes |> each(shape => write_line(shape.name()))

let described: Described[] = [SQUARE(2.0D), TRIANGLE(6.0D, 1.0D)]

described |> each(shape => write_line(shape.describe()))
```

output:

```
4-sided polygon
3-sided polygon
4-sided polygon, area 4.00
3-sided polygon, area 3.00, and it is a triangle
```


---

<a id="rosetta/algebraic-data-types"></a>


# Algebraic data types

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Algebraic_data_types

```ghul
use IO.Std.write_line

enum Color is RED, BLACK, si

use Color.RED
use Color.BLACK

union Tree is
    EMPTY
    NODE(color: Color, left: Tree, value: int, right: Tree)
si

use Tree.EMPTY
use Tree.NODE

balance(c: Color, l: Tree, v: int, r: Tree) -> Tree =>
    case (c, l, v, r)
    when (~BLACK, (~RED, (~RED, a, x, b): NODE, y, m): NODE, z, d) then
        NODE(RED, NODE(BLACK, a, x, b), y, NODE(BLACK, m, z, d))
    when (~BLACK, (~RED, a, x, (~RED, b, y, m): NODE): NODE, z, d) then
        NODE(RED, NODE(BLACK, a, x, b), y, NODE(BLACK, m, z, d))
    when (~BLACK, a, x, (~RED, (~RED, b, y, m): NODE, z, d): NODE) then
        NODE(RED, NODE(BLACK, a, x, b), y, NODE(BLACK, m, z, d))
    when (~BLACK, a, x, (~RED, b, y, (~RED, m, z, d): NODE): NODE) then
        NODE(RED, NODE(BLACK, a, x, b), y, NODE(BLACK, m, z, d))
    else
        NODE(c, l, v, r)
    esac

_insert(tree: Tree, element: int) -> Tree =>
    case ► tree
    when _: EMPTY then
        NODE(RED, EMPTY, element, EMPTY)
    when (c, l, v, r): NODE then
        if element < v then
            balance(c, _insert(l, element), v, r)
        elif element > v then
            balance(c, l, v, _insert(r, element))
        else
            tree
        fi
    esac

insert(tree: Tree, element: int) -> Tree =>
    case _insert(tree, element)
    when (c, l, v, r): NODE then NODE(BLACK, l, v, r)
    else EMPTY
    esac

in_order(tree: Tree) -> string =>
    case ► tree
    when _: EMPTY then ""
    when (c, l, v, r): NODE then "{in_order(l)}{v} {in_order(r)}"
    esac

black_height(tree: Tree) -> int =>
    case ► tree
    when _: EMPTY then
        1
    when (c, l, v, r): NODE then
        let left = black_height(l)
        let right = black_height(r)

        if left < 0 \/ right < 0 \/ left != right then
            -1
        elif c == RED /\ (is_red(l) \/ is_red(r)) then
            -1
        else
            left + if c == BLACK then 1 else 0 fi
        fi
    esac

is_red(tree: Tree) -> bool =>
    case ► tree
    when _: EMPTY then false
    when (c, l, v, r): NODE then c == RED
    esac

let tree: Tree mut = EMPTY

for element in [11, 2, 14, 1, 7, 15, 5, 8, 4] do
    tree = insert(tree, element)
od

write_line("in order: {in_order(tree)}")
write_line("black height: {black_height(tree)}")
```

output:

```
in order: 1 2 4 5 7 8 11 14 15 
black height: 4
```


---

<a id="rosetta/arithmetic-evaluation"></a>


# Arithmetic evaluation

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Arithmetic_evaluation

```ghul
use IO.Std.write_line
use Ghul.Pipes

union Expression is
    NUMBER(value: int)
    ADD(left: Expression, right: Expression)
    SUBTRACT(left: Expression, right: Expression)
    MULTIPLY(left: Expression, right: Expression)
    DIVIDE(left: Expression, right: Expression)
si

use Expression.NUMBER
use Expression.ADD
use Expression.SUBTRACT
use Expression.MULTIPLY
use Expression.DIVIDE

struct PARSED(expression: Expression, next: int)

skip_spaces(text: string, at: int) -> int =>
    if at < text.length /\ text[at] == ' ' then
        skip_spaces(text, at + 1)
    else
        at
    fi

parse_term(text: string, at: int) -> PARSED? is
    let start = skip_spaces(text, at)

    if start == text.length then
        return null
    fi

    if text[start] == '(' then
        if let (expression, next) = parse_expression(text, start + 1) then
            let close = skip_spaces(text, next)

            if close < text.length /\ text[close] == ')' then
                return PARSED(expression, close + 1)
            fi
        fi

        return null
    fi

    let end mut = start

    while end < text.length /\ char.is_digit(text[end]) do
        end = end + 1
    od

    if end == start then
        return null
    fi

    let digits = text[start..end]

    return PARSED(NUMBER(int.parse(digits)), end)
si

operator_at(text: string, position: int, operators: string) -> int? =>
    let here = skip_spaces(text, position) in
    if here < text.length /\ operators.contains(text[here]) then
        here
    else
        null
    fi

build(operator: char, left: Expression, right: Expression) -> Expression =>
    case operator
    when '+' then ADD(left, right)
    when '-' then SUBTRACT(left, right)
    when '*' then MULTIPLY(left, right)
    when '/' then DIVIDE(left, right)
    else throw System.Exception("not an operator: {operator}")
    esac

parse_run(
    text: string,
    at: int,
    operators: string,
    operand: (string, int) -> PARSED?
) -> PARSED? is
    if let (left, next) = operand(text, at) then
        let expression mut = left
        let position mut = next

        while let here = operator_at(text, position, operators) do
            if let (right, after) = operand(text, here + 1) then
                expression = build(text[here], expression, right)
                position = after
            else
                return null
            fi
        od

        return PARSED(expression, position)
    fi

    return null
si

parse_factor(text: string, at: int) -> PARSED? =>
    parse_run(text, at, "*/", parse_term)

parse_expression(text: string, at: int) -> PARSED? =>
    parse_run(text, at, "+-", parse_factor)

parse(text: string) -> Expression? is
    if let (expression, next) = parse_expression(text, 0) /\
        skip_spaces(text, next) == text.length
    then
        return expression
    fi

    return null
si

evaluate(expression: Expression) -> int =>
    case ► expression
    when (value): NUMBER then value
    when (left, right): ADD then evaluate(left) + evaluate(right)
    when (left, right): SUBTRACT then evaluate(left) - evaluate(right)
    when (left, right): MULTIPLY then evaluate(left) * evaluate(right)
    when (left, right): DIVIDE then evaluate(left) / evaluate(right)
    esac

show(expression: Expression) -> string =>
    case ► expression
    when (value): NUMBER then "{value}"
    when (left, right): ADD then "(+ {show(left)} {show(right)})"
    when (left, right): SUBTRACT then "(- {show(left)} {show(right)})"
    when (left, right): MULTIPLY then "(* {show(left)} {show(right)})"
    when (left, right): DIVIDE then "(/ {show(left)} {show(right)})"
    esac

for source in [
    "(1+3)*7",
    "1+3*7",
    "2*(3+4)-10/5",
    "((11+3)*(5-2))/7",
    "1+*2",
    "(1+3",
    "1 2"
] do
    if let tree = parse(source) then
        write_line("{source} => {show(tree)} => {evaluate(tree)}")
    else
        write_line("{source} => cannot be parsed")
    fi
od
```

output:

```
(1+3)*7 => (* (+ 1 3) 7) => 28
1+3*7 => (+ 1 (* 3 7)) => 22
2*(3+4)-10/5 => (- (* 2 (+ 3 4)) (/ 10 5)) => 12
((11+3)*(5-2))/7 => (/ (* (+ 11 3) (- 5 2)) 7) => 6
1+*2 => cannot be parsed
(1+3 => cannot be parsed
1 2 => cannot be parsed
```


---

<a id="rosetta/flatten-a-list"></a>


# Flatten a list

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Flatten_a_list

```ghul
use IO.Std.write_line
use Ghul.Pipes

union Nested is
    ATOM(value: int)
    LIST(items: Nested[])
si

use Nested.ATOM
use Nested.LIST

atom(value: int) -> Nested => ATOM(value)

list(items: Nested[]) -> Nested => LIST(items)

flatten(node: Nested) -> Pipe[int] is
    case ► node
    when (value): ATOM then
        yield value
    when (items): LIST then
        for item in items do
            yield in flatten(item)
        od
    esac
si

show(node: Nested) -> string =>
    case ► node
    when (value): ATOM then "{value}"
    when (items): LIST then "[{items |> map(show) |> join(", ")}]"
    esac

let input =
    list([
        list([atom(1)]),
        atom(2),
        list([list([atom(3), atom(4)]), atom(5)]),
        list([list([list([])])]),
        list([list([list([atom(6)])])]),
        atom(7),
        atom(8),
        list([])
    ])

write_line(show(input))
write_line("[{flatten(input) |> join(", ")}]")
```

output:

```
[[1], 2, [[3, 4], 5], [[[]]], [[[6]]], 7, 8, []]
[1, 2, 3, 4, 5, 6, 7, 8]
```


---

<a id="rosetta/generic-swap"></a>


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

write_line("tuples:  {p} {q}")
```

output:

```
ints:    2 1
strings: second first
tuples:  (2, two) (1, one)
```


---

<a id="rosetta/multiple-distinct-objects"></a>


# Multiple distinct objects

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Multiple_distinct_objects

```ghul
use IO.Std.write_line
use Ghul.Pipes

class BOX(value: int public)

let n = 5

let distinct = (0..n) |> map(_ => BOX(0)) |> collect_list()

distinct[0].value = 42

write_line(
    "distinct: {distinct |> map(box => "{box.value}") |> join(" ")}")

let shared = BOX(0)
let same = (0..n) |> map(_ => shared) |> collect_list()

same[0].value = 42

write_line(
    "shared:   {same |> map(box => "{box.value}") |> join(" ")}")
```

output:

```
distinct: 42 0 0 0 0
shared:   42 42 42 42 42
```


---

<a id="rosetta/null-object"></a>


# Null object

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Null_object

```ghul
use IO.Std.write_line

is_null(text: string?) -> bool => !text?

is_null(number: int?) -> bool => !number?

describe(text: string?) -> string =>
    if let value = text then "\"{value}\"" else "null" fi

describe(number: int?) -> string =>
    if let value = number then "{value}" else "null" fi

let ► text: string? = "hello"
let nothing: string? = null
let ► number: int? = 42
let no_number: int? = null

write_line("text is null:      {is_null(text)}")
write_line("nothing is null:   {is_null(nothing)}")
write_line("number is null:    {is_null(number)}")
write_line("no_number is null: {is_null(no_number)}")
write_line("")
write_line("text:      {describe(text)}")
write_line("nothing:   {describe(nothing)}")
write_line("number:    {describe(number)}")
write_line("no_number: {describe(no_number)}")
write_line("")
write_line("nothing, with a fallback: {nothing ?? "none"}")
```

output:

```
text is null:      False
nothing is null:   True
number is null:    False
no_number is null: True

text:      "hello"
nothing:   null
number:    42
no_number: null

nothing, with a fallback: none
```


---

<a id="rosetta/quaternion"></a>


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
write_line("q1 * q2 =~ q2 * q1: {q1 * q2 =~ q2 * q1}")
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


---

<a id="rosetta/queue-definition"></a>


# Queue/Definition

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Queue/Definition

```ghul
use IO.Std.write_line
use Collections.LIST
use System.InvalidOperationException

class QUEUE[T] is
    _items: LIST[T]

    init() is
        _items = LIST[T]()
    si

    is_empty: bool => _items.count == 0

    push(value: T) is
        _items.add(value)
    si

    pop() -> T is
        assert !is_empty else
            InvalidOperationException("the queue is empty")

        let value = _items[0]

        _items.remove_at(0)

        return value
    si
si

let queue = QUEUE[string]()

write_line("empty: {queue.is_empty}")

queue.push("first")
queue.push("second")
queue.push("third")

write_line("empty: {queue.is_empty}")

while !queue.is_empty do
    write_line("pop:   {queue.pop()}")
od

write_line("empty: {queue.is_empty}")

try
    queue.pop()
catch e: InvalidOperationException
    write_line("pop:   {e.message}")
yrt
```

output:

```
empty: True
empty: False
pop:   first
pop:   second
pop:   third
empty: True
pop:   the queue is empty
```


---

<a id="rosetta/s-expressions"></a>


# S-expressions

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/S-expressions

```ghul
use IO.Std.write_line
use Ghul.Pipes

union SExpr is
    LIST(items: SExpr[])
    SYMBOL(name: string)
    STRING(text: string)
    INTEGER(value: int)
    REAL(value: double)
si

use SExpr.LIST
use SExpr.SYMBOL
use SExpr.STRING
use SExpr.INTEGER
use SExpr.REAL

delimits(character: char) -> bool =>
    character == '(' \/ character == ')' \/
    character == '"' \/ character <= ' '

skip_space(text: string, at: int) -> int is
    let i mut = at

    while i < text.length /\ text[i] <= ' ' do
        i = i + 1
    od

    return i
si

atom(token: string) -> SExpr is
    let whole mut = 0

    if int.try_parse(token, whole ref) then
        return INTEGER(whole)
    fi

    let real mut = 0.0D

    if double.try_parse(token, real ref) then
        return REAL(real)
    fi

    return SYMBOL(token)
si

read(text: string, at: int) -> (value: SExpr, next: int) is
    let start = skip_space(text, at)

    if text[start] == '(' then
        let items = Collections.LIST[SExpr]()
        let i mut = skip_space(text, start + 1)

        while text[i] != ')' do
            let (value, next) = read(text, i)

            items.add(value)

            i = skip_space(text, next)
        od

        return (value = LIST(items.to_array()), next = i + 1)
    fi

    if text[start] == '"' then
        let close mut = start + 1

        while text[close] != '"' do
            close = close + 1
        od

        return (value = STRING(text[start + 1..close]), next = close + 1)
    fi

    let end mut = start

    while end < text.length /\ !delimits(text[end]) do
        end = end + 1
    od

    return (value = atom(text[start..end]), next = end)
si

render(node: SExpr) -> string =>
    case ► node
    when (items): LIST then "({items |> map(render) |> join(" ")})"
    when (name): SYMBOL then name
    when (text): STRING then "\"{text}\""
    when (value): INTEGER then "{value}"
    when (value): REAL then "{value}"
    esac

let source =
    "((data \"quoted data\" 123 4.5)\n"
    " (data (!@# (4.5) \"(more\" \"data)\")))"

let (parsed, _) = read(source, 0)

write_line(source)
write_line("")
write_line(render(parsed))
```

output:

```
((data "quoted data" 123 4.5)
 (data (!@# (4.5) "(more" "data)")))

((data "quoted data" 123 4.5) (data (!@# (4.5) "(more" "data)")))
```


---

<a id="rosetta/ternary-logic"></a>


# Ternary logic

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Ternary_logic

```ghul
use IO.Std.write_line
use Ghul.Pipes

union Trit is
    TRUE
    MAYBE
    FALSE
si

use Trit.TRUE
use Trit.MAYBE
use Trit.FALSE

rank(trit: Trit) -> int =>
    case ► trit
    when _: FALSE then 0
    when _: MAYBE then 1
    when _: TRUE then 2
    esac

of_rank(rank_value: int) -> Trit =>
    case rank_value
    when 0 then FALSE
    when 1 then MAYBE
    else TRUE
    esac

!(trit: Trit) -> Trit => of_rank(2 - rank(trit))

/\(left: Trit, right: Trit) -> Trit =>
    if rank(left) < rank(right) then left else right fi

\/(left: Trit, right: Trit) -> Trit =>
    if rank(left) > rank(right) then left else right fi

implies(left: Trit, right: Trit) -> Trit => !left \/ right

equivalent(left: Trit, right: Trit) -> Trit =>
    implies(left, right) /\ implies(right, left)

show(trit: Trit) -> string =>
    case ► trit
    when _: TRUE then "true"
    when _: MAYBE then "maybe"
    when _: FALSE then "false"
    esac

trits: Trit[] => [TRUE, MAYBE, FALSE]

table(name: string, operator: (Trit, Trit) -> Trit) is
    write_line("")
    let heading = trits |> map(trit => "{show(trit),6}") |> join("")

    write_line("{name,-8}|{heading}")
    write_line("--------+------------------")

    for left in trits do
        let row =
            trits
            |> map(right => "{show(operator(left, right)),6}")
            |> join("")

        write_line("{show(left),-8}|{row}")
    od
si

write_line("not")

for left in trits do
    write_line("{show(left),-8}|{show(!left),6}")
od

table("and", (left, right) => left /\ right)
table("or", (left, right) => left \/ right)
table("implies", implies)
table("equiv", equivalent)
```

output:

```
not
true    | false
maybe   | maybe
false   |  true

and     |  true maybe false
--------+------------------
true    |  true maybe false
maybe   | maybe maybe false
false   | false false false

or      |  true maybe false
--------+------------------
true    |  true  true  true
maybe   |  true maybe maybe
false   |  true maybe false

implies |  true maybe false
--------+------------------
true    |  true maybe false
maybe   |  true maybe maybe
false   |  true  true  true

equiv   |  true maybe false
--------+------------------
true    |  true maybe false
maybe   | maybe maybe maybe
false   | false maybe  true
```


---

<a id="rosetta/amb"></a>


# Amb

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Amb

```ghul
use IO.Std.write_line
use Collections.Iterable
use Collections.List
use Collections.LIST
use Ghul.Pipes

amb[T](
    sets: List[Iterable[T]],
    accepts: (T, T) -> bool pure
) -> Pipe[LIST[T]] is
    if sets.count == 0 then
        yield LIST[T]()
    else
        for choice in sets[0] do
            for rest in amb(sets |> skip(1) |> collect(), accepts) do
                if rest.count == 0 \/ accepts(choice, rest[0]) then
                    let sequence = LIST[T]()

                    sequence.add(choice)
                    sequence.add_range(rest)

                    yield sequence
                fi
            od
        od
    fi
si

let sets: List[Iterable[string]] = [
    ["the", "that", "a"],
    ["frog", "elephant", "thing"],
    ["walked", "treaded", "grows"],
    ["slowly", "quickly"]
]

let joins =
    (left: string, right: string) => left[left.length - 1] == right[0]

for sentence in amb(sets, joins) do
    write_line(sentence |> join(" "))
od
```

output:

```
that thing grows slowly
```


---

<a id="rosetta/balanced-brackets"></a>


# Balanced brackets

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Balanced_brackets

```ghul
use IO.Std.write_line
use Ghul.Pipes

balanced(brackets: string) -> bool => (
    let level mut = 0

    let matched = for bracket in brackets do
        if bracket == ']' /\ level == 0 then break false fi
        level = level + (if bracket == '[' then 1 else -1 fi)
    od

    matched ?? (level == 0)
)

arrangements(opens: int, closes: int) -> Pipe[string] is
    if opens == 0 /\ closes == 0 then
        yield ""
    else
        if opens > 0 then
            yield in arrangements(opens - 1, closes)
                |> map(rest => "[{rest}")
        fi
        if closes > 0 then
            yield in arrangements(opens, closes - 1)
                |> map(rest => "]{rest}")
        fi
    fi
si

for pairs in 0::3 do
    for brackets in arrangements(pairs, pairs) do
        let verdict = if balanced(brackets) then "OK" else "NOT OK" fi
        write_line("{brackets,6}  {verdict}")
    od
od
```

output:

```
        OK
    []  OK
    ][  NOT OK
  [[]]  OK
  [][]  OK
  []][  NOT OK
  ][[]  NOT OK
  ][][  NOT OK
  ]][[  NOT OK
[[[]]]  OK
[[][]]  OK
[[]][]  OK
[[]]][  NOT OK
[][[]]  OK
[][][]  OK
[][]][  NOT OK
[]][[]  NOT OK
[]][][  NOT OK
[]]][[  NOT OK
][[[]]  NOT OK
][[][]  NOT OK
][[]][  NOT OK
][][[]  NOT OK
][][][  NOT OK
][]][[  NOT OK
]][[[]  NOT OK
]][[][  NOT OK
]][][[  NOT OK
]]][[[  NOT OK
```


---

<a id="rosetta/calkin-wilf-sequence"></a>


# Calkin-Wilf sequence

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Calkin-Wilf_sequence

```ghul
use IO.Std.write_line
use Collections.LIST
use Ghul.Pipes

next_term(numerator: int, denominator: int) -> (int, int) =>
    (denominator,
     denominator * (2 * (numerator / denominator) + 1) - numerator)

let current mut = (1, 1)
let terms = LIST[string]()

for _ in 1::20 do
    terms.add("{current.`0}/{current.`1}")
    current = next_term(current.`0, current.`1)
od

write_line(terms |> join(" "))

continued_fraction(numerator: int, denominator: int) -> LIST[int] is
    let left mut = numerator
    let right mut = denominator
    let terms = LIST[int]()

    while right > 0 do
        terms.add(left / right)
        let remainder = left % right
        left = right
        right = remainder
    od

    if terms.count % 2 == 0 then
        terms[terms.count - 1] = terms[terms.count - 1] - 1
        terms.add(1)
    fi

    terms
si

let fraction = continued_fraction(83116, 51639)

let bits mut = ""
let one mut = true

for step in 0::(fraction.count - 1) do
    let run = fraction[fraction.count - 1 - step]

    for _ in 1::run do
        bits = "{bits}{if one then "1" else "0" fi}"
    od
    one = !one
od

write_line("83116/51639 is term {System.Convert.to_int64(bits, 2)}")
```

output:

```
1/1 1/2 2/1 1/3 3/2 2/3 3/1 1/4 4/3 3/5 5/2 2/5 5/3 3/4 4/1 1/5 5/4 4/7 7/3 3/8
83116/51639 is term 123456789
```


---

<a id="rosetta/ekg-sequence-convergence"></a>


# EKG sequence convergence

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/EKG_sequence_convergence

```ghul
use IO.Std.write_line
use Collections.LIST
use Collections.SET
use Ghul.Pipes

shares_factor(left_value: int, right_value: int) -> bool => (
    let left mut = left_value
    let right mut = right_value

    while right > 0 do
        let remainder = left % right
        left = right
        right = remainder
    od

    left > 1
)

ekg(start: int, count: int) -> LIST[int] is
    let terms = LIST[int]([1, start])
    let used = SET[int]([1, start])

    while terms.count < count do
        let candidate mut = 2

        while used.contains(candidate) \/
                !shares_factor(candidate, terms[terms.count - 1]) do
            candidate = candidate + 1
        od

        terms.add(candidate)
        used.add(candidate)
    od

    terms
si

let two = ekg(2, 80)
let five = ekg(5, 80)

write_line("EKG(2): {two |> take(10) |> join(" ")}")
write_line("EKG(5): {five |> take(10) |> join(" ")}")

let last_difference mut = 0

for index in 0::(two.count - 1) do
    if two[index] != five[index] then
        last_difference = index + 1
    fi
od

write_line(
    "EKG(2) and EKG(5) converge at term {last_difference + 1}")
```

output:

```
EKG(2): 1 2 4 6 3 9 12 8 10 5
EKG(5): 1 5 10 2 4 6 3 9 12 8
EKG(2) and EKG(5) converge at term 45
```


---

<a id="rosetta/fibonacci-sequence"></a>


# Fibonacci sequence

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Fibonacci_sequence

## Functional

```ghul
use IO.Std.write_line
use Ghul.Pipes

let fibonacci_sequence = stream(
    (0, 1),
    ((previous, current)) =>
        previous || (current, previous + current)
)

let fib = n => fibonacci_sequence |> skip(n) |> first()

fibonacci_sequence
    |> take(10)
    |> index()
    |> each(((position, value)) =>
        write_line("fib({position}) = {value}"))

write_line("fib(30) = {fib(30)}")
```

output:

```
fib(0) = 0
fib(1) = 1
fib(2) = 1
fib(3) = 2
fib(4) = 3
fib(5) = 5
fib(6) = 8
fib(7) = 13
fib(8) = 21
fib(9) = 34
fib(30) = 832040
```

## Imperative

```ghul
use IO.Std.write_line
use Ghul.Pipes

fibonacci() -> Pipe[int] is
    let previous mut = 0
    let current mut = 1
    do
        yield previous

        (previous, current) = (current, previous + current)
    od
si

let fib = n => fibonacci() |> skip(n) |> first()

for (position, value) in fibonacci() |> take(10) |> index() do
    write_line("fib({position}) = {value}")
od

write_line("fib(30) = {fib(30)}")
```

output:

```
fib(0) = 0
fib(1) = 1
fib(2) = 1
fib(3) = 2
fib(4) = 3
fib(5) = 5
fib(6) = 8
fib(7) = 13
fib(8) = 21
fib(9) = 34
fib(30) = 832040
```


---

<a id="rosetta/fusc-sequence"></a>


# Fusc sequence

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Fusc_sequence

```ghul
use IO.Std.write_line
use Collections.LIST
use Ghul.Pipes

let limit = 1000000

let fusc = LIST[int]([0, 1])

while fusc.count <= limit do
    let n = fusc.count

    if n % 2 == 0 then
        fusc.add(fusc[n / 2])
    else
        fusc.add(fusc[n / 2] + fusc[n / 2 + 1])
    fi
od

write_line(fusc |> take(61) |> join(", "))

let longest mut = 0

for index in 0::limit do
    let digits = fusc[index].to_string().length

    if digits > longest then
        longest = digits
        write_line("fusc[{index:N0}] = {fusc[index]:N0}")
    fi
od
```

output:

```
0, 1, 1, 2, 1, 3, 2, 3, 1, 4, 3, 5, 2, 5, 3, 4, 1, 5, 4, 7, 3, 8, 5, 7, 2, 7, 5, 8, 3, 7, 4, 5, 1, 6, 5, 9, 4, 11, 7, 10, 3, 11, 8, 13, 5, 12, 7, 9, 2, 9, 7, 12, 5, 13, 8, 11, 3, 10, 7, 11, 4
fusc[0] = 0
fusc[37] = 11
fusc[1,173] = 108
fusc[35,499] = 1,076
fusc[699,051] = 10,946
```


---

<a id="rosetta/hailstone-sequence"></a>


# Hailstone sequence

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Hailstone_sequence

```ghul
use IO.Std.write_line
use Collections.LIST
use Ghul.Pipes

hailstone(n: int) -> Pipe[int] is
    let current mut = n

    while true do
        yield current

        if current == 1 then
            return
        fi

        current =
            if current % 2 == 0 then current / 2 else 3 * current + 1 fi
    od
si

let sequence = hailstone(27) |> collect_list()
write_line("length of hailstone(27): {sequence.count}")
let first = sequence[0..4] |> join(", ")
let last = sequence[4..<<0] |> join(", ")

write_line("first four: {first}")
write_line("last four: {last}")

let longest mut = 0
let longest_length mut = 0

for n in 1..100_000 do
    let length = hailstone(n) |> count()

    if length > longest_length then
        longest = n
        longest_length = length
    fi
od

write_line("longest under 100,000: {longest} (length {longest_length})")
```

output:

```
length of hailstone(27): 112
first four: 27, 82, 41, 124
last four: 8, 4, 2, 1
longest under 100,000: 77031 (length 351)
```


---

<a id="rosetta/intersecting-number-wheels"></a>


# Intersecting number wheels

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Intersecting_number_wheels

```ghul
use IO.Std.write_line
use Collections
use Ghul.Pipes

union Value is
    NUMBER(digit: int)
    WHEEL(name: char)
si

use Value.NUMBER
use Value.WHEEL

class WHEEL_SET is
    _values: MAP[char, Value[]]
    _position: MAP[char, int]

    init(wheels: (name: char, values: Value[])[]) is
        _values = MAP()
        _position = MAP()

        for (name, values) in wheels do
            _values[name] = values
            _position[name] = 0
        od
    si

    next(name: char) -> int is
        let values = _values[name]
        let at = _position[name]

        _position[name] = (at + 1) % values.count

        case values[at]
        when number: NUMBER then
            return number.digit
        when wheel: WHEEL then
            return next(wheel.name)
        esac
    si
si

describe(value: Value) -> string =>
    case ► value
    when number: NUMBER then "{number.digit}"
    when wheel: WHEEL then "{wheel.name}"
    esac

show(wheels: (name: char, values: Value[])[]) is
    let wheel_set = WHEEL_SET(wheels)

    for (name, values) in wheels do
        write_line("{name}: {values |> map(describe) |> join(" ")}")
    od

    let generated = LIST()

    for _ in 1::20 do
        generated.add("{wheel_set.next(wheels[0].name)}")
    od

    write_line("  {generated |> join(" ")}")
si

let simple: (name: char, values: Value[])[] =
    [(name = 'A', values = [NUMBER(1), NUMBER(2), NUMBER(3)])]

let two_wheels: (name: char, values: Value[])[] = [
    (name = 'A', values = [NUMBER(1), WHEEL('B'), NUMBER(2)]),
    (name = 'B', values = [NUMBER(3), NUMBER(4)])
]

let shared: (name: char, values: Value[])[] = [
    (name = 'A', values = [NUMBER(1), WHEEL('D'), WHEEL('D')]),
    (name = 'D', values = [NUMBER(6), NUMBER(7), NUMBER(8)])
]

let multiply_connected: (name: char, values: Value[])[] = [
    (name = 'A', values = [NUMBER(1), WHEEL('B'), WHEEL('C')]),
    (name = 'B', values = [NUMBER(3), NUMBER(4)]),
    (name = 'C', values = [NUMBER(5), WHEEL('B')])
]

for group in [simple, two_wheels, shared, multiply_connected] do
    show(group)
od
```

output:

```
A: 1 2 3
  1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2
A: 1 B 2
B: 3 4
  1 3 2 1 4 2 1 3 2 1 4 2 1 3 2 1 4 2 1 3
A: 1 D D
D: 6 7 8
  1 6 7 1 8 6 1 7 8 1 6 7 1 8 6 1 7 8 1 6
A: 1 B C
B: 3 4
C: 5 B
  1 3 5 1 4 3 1 4 5 1 3 4 1 3 5 1 4 3 1 4
```


---

<a id="rosetta/kolakoski-sequence"></a>


# Kolakoski sequence

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Kolakoski_sequence

```ghul
use IO.Std.write_line
use Collections.LIST
use Collections.List
use Ghul.Pipes

cycler(values: int[]) -> () -> int is
    let at mut = 0

    return () => (
        let value = values[at]
        at = (at + 1) % values.count
        value
    )
si

kolakoski(values: int[], length: int) -> List[int] is
    let next = cycler(values)
    let sequence = LIST[int]()
    let at_run mut = 0

    while sequence.count < length do
        let value = next()

        sequence.add(value)

        for _ in 1..sequence[at_run] do
            sequence.add(value)
        od

        at_run = at_run + 1
    od

    return sequence[0..length]
si

run_lengths(sequence: List[int]) -> List[int] is
    let runs = LIST[int]()
    let run mut = 0

    for i in 0..sequence.count do
        run = run + 1

        let last = i + 1 == sequence.count

        if last \/ sequence[i + 1] != sequence[i] then
            runs.add(run)
            run = 0
        fi
    od

    return runs
si

self_describing(sequence: List[int]) -> bool => (
    let runs = run_lengths(sequence)
    (0..runs.count - 1) |> all(i => runs[i] == sequence[i])
)

report(values: int[], length: int) is
    let sequence = kolakoski(values, length)

    write_line("from ({values |> join(", ")}), first {length}:")
    write_line("  {sequence |> join(", ")}")
    write_line("  self-describing: {self_describing(sequence)}")
si

report([1, 2], 20)
report([2, 1], 20)
report([1, 3, 1, 2], 30)
report([1, 3, 2, 1], 30)
```

output:

```
from (1, 2), first 20:
  1, 2, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 1, 2, 1, 1, 2, 2, 1
  self-describing: True
from (2, 1), first 20:
  2, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2
  self-describing: True
from (1, 3, 1, 2), first 30:
  1, 3, 3, 3, 1, 1, 1, 2, 2, 2, 1, 3, 1, 2, 2, 1, 1, 3, 3, 1, 2, 2, 2, 1, 3, 3, 1, 1, 2, 1
  self-describing: True
from (1, 3, 2, 1), first 30:
  1, 3, 3, 3, 2, 2, 2, 1, 1, 1, 1, 1, 3, 3, 2, 2, 1, 1, 3, 2, 1, 1, 1, 1, 3, 3, 3, 2, 2, 1
  self-describing: False
```


---

<a id="rosetta/look-and-say-sequence"></a>


# Look-and-say sequence

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Look-and-say_sequence

```ghul
use IO.Std.write_line
use Ghul.Pipes

look_and_say(seed: string) -> Pipe[string] is
    let current mut = seed

    do
        yield current

        let said = System.Text.StringBuilder()
        let i mut = 0

        while i < current.length do
            let digit = current[i]
            let run mut = 0

            while i < current.length /\ current[i] == digit do
                run = run + 1
                i = i + 1
            od

            said.append(run)
            said.append(digit)
        od

        current = said.to_string()
    od
si

look_and_say("1") |> take(10) |> each(term => write_line(term))
```

output:

```
1
11
21
1211
111221
312211
13112221
1113213211
31131211131221
13211311123113112211
```


---

<a id="rosetta/ordered-partitions"></a>


# Ordered partitions

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Ordered_partitions

```ghul
use IO.Std.write_line
use Collections.LIST
use Collections.List
use Ghul.Pipes

combinations(items: List[int], k: int) -> Pipe[List[int]] is
    if k == 0 then
        yield LIST[int]()
    elif items.count >= k then
        let rest = items[1..<0]

        for tail in combinations(rest, k - 1) do
            let whole = LIST[int]()

            whole.add(items[0])

            for value in tail do
                whole.add(value)
            od

            yield whole
        od

        yield in combinations(rest, k)
    fi
si

partitions(items: List[int], sizes: List[int]) -> Pipe[List[List[int]]] is
    if sizes.count == 0 then
        yield LIST[List[int]]()
    else
        for block in combinations(items, sizes[0]) do
            let remaining = items |> except(block) |> collect_list()

            for tail in partitions(remaining, sizes[1..<0]) do
                let whole = LIST[List[int]]()

                whole.add(block)

                for rest in tail do
                    whole.add(rest)
                od

                yield whole
            od
        od
    fi
si

braces(block: List[int]) -> string =>
    "{{" "{block |> join(", ")}" "}}"

show(sizes: int[]) is
    let total = sizes |> reduce(0, (running, size) => running + size)
    let items = (1::total) |> collect_list()

    write_line("partitions({sizes |> join(", ")}):")

    partitions(items, sizes |> collect_list())
        |> each(partition =>
            write_line("  ({partition |> map(braces) |> join(", ")})"))
si

show([2, 0, 2])
```

output:

```
partitions(2, 0, 2):
  ({1, 2}, {}, {3, 4})
  ({1, 3}, {}, {2, 4})
  ({1, 4}, {}, {2, 3})
  ({2, 3}, {}, {1, 4})
  ({2, 4}, {}, {1, 3})
  ({3, 4}, {}, {1, 2})
```


---

<a id="rosetta/same-fringe"></a>


# Same fringe

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Same_fringe

```ghul
use IO.Std.write_line
use Ghul.Pipes

union Tree is
    LEAF(value: int)
    NODE(left: Tree, right: Tree)
si

use Tree.LEAF
use Tree.NODE

fringe(tree: Tree) -> Pipe[int] is
    if isa LEAF( ► tree) then
        yield tree.value
    elif isa NODE( ► tree) then
        yield in fringe(tree.left)
        yield in fringe(tree.right)
    fi
si

compare(first: Tree, second: Tree) -> (same: bool, leaves: int) is
    let left = fringe(first).iterator
    let right = fringe(second).iterator

    let leaves mut = 0

    do
        let more_left = left.move_next()
        let more_right = right.move_next()

        if more_left != more_right then
            return (false, leaves)
        fi

        if !more_left then
            return (true, leaves)
        fi

        leaves = leaves + 1

        if left.current != right.current then
            return (false, leaves)
        fi
    od
si

show(tree: Tree) -> string =>
    case ► tree
    when (value): LEAF then "{value}"
    when (left, right): NODE then "({show(left)} {show(right)})"
    esac

let leaning_left = NODE(NODE(LEAF(1), LEAF(2)), LEAF(3))
let leaning_right = NODE(LEAF(1), NODE(LEAF(2), LEAF(3)))
let differs_last = NODE(LEAF(1), NODE(LEAF(2), LEAF(4)))
let differs_first = NODE(NODE(LEAF(9), LEAF(2)), LEAF(3))
let shorter = NODE(LEAF(1), LEAF(2))

for (first, second) in [
    (leaning_left, leaning_right),
    (leaning_left, differs_last),
    (leaning_left, differs_first),
    (leaning_left, shorter)
] do
    let (same, leaves) = compare(first, second)

    let verdict = if same then "same fringe" else "different" fi
    let counted = if leaves == 1 then "leaf" else "leaves" fi

    write_line(
        "{show(first)} and {show(second)}: {verdict}, "
        "{leaves} {counted} compared")
od
```

output:

```
((1 2) 3) and (1 (2 3)): same fringe, 3 leaves compared
((1 2) 3) and (1 (2 4)): different, 3 leaves compared
((1 2) 3) and ((9 2) 3): different, 1 leaf compared
((1 2) 3) and (1 2): different, 2 leaves compared
```


---

<a id="rosetta/stern-brocot-sequence"></a>


# Stern-Brocot sequence

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Stern-Brocot_sequence

```ghul
use IO.Std.write_line
use Collections.LIST
use Ghul.Pipes

let sequence = LIST[int]([1, 1])
let considered mut = 1

while sequence.count < 1200 do
    sequence.add(sequence[considered] + sequence[considered - 1])
    sequence.add(sequence[considered])
    considered = considered + 1
od

write_line("first 15 members:")
write_line(sequence |> take(15) |> join(", "))

write_line("first appearances:")

for value in 1::10 do
    write_line("{value} appears at index {sequence.index_of(value) + 1}")
od

write_line(
    "100 appears at index {sequence.index_of(100) + 1}")

gcd(left: int, right: int) -> int => (
    let a mut = left
    let b mut = right

    while b > 0 do
        let remainder = a % b
        a = b
        b = remainder
    od

    a
)

let all_coprime = for index in 0..999 do
    if gcd(sequence[index], sequence[index + 1]) != 1 then
        break false
    fi
od

write_line(
    "consecutive members up to the 1000th are all coprime: "
    "{if all_coprime ?? true then "true" else "false" fi}")
```

output:

```
first 15 members:
1, 1, 2, 1, 3, 2, 3, 1, 4, 3, 5, 2, 5, 3, 4
first appearances:
1 appears at index 1
2 appears at index 3
3 appears at index 5
4 appears at index 9
5 appears at index 11
6 appears at index 33
7 appears at index 19
8 appears at index 21
9 appears at index 35
10 appears at index 39
100 appears at index 1179
consecutive members up to the 1000th are all coprime: true
```


---

<a id="rosetta/tree-traversal"></a>


# Tree traversal

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Tree_traversal

```ghul
use IO.Std.write_line
use Collections.Queue
use Ghul.Pipes

union Tree[T] is
    EMPTY
    NODE(value: T, left: Tree[T], right: Tree[T])
si

use Tree.EMPTY
use Tree.NODE

preorder[T](tree: Tree[T]) -> Pipe[T] is
    if let (value, left, right): NODE = ► tree then
        yield value

        yield in preorder(left)
        yield in preorder(right)
    fi
si

inorder[T](tree: Tree[T]) -> Pipe[T] is
    if let (value, left, right): NODE = ► tree then
        yield in inorder(left)

        yield value

        yield in inorder(right)
    fi
si

postorder[T](tree: Tree[T]) -> Pipe[T] is
    if let (value, left, right): NODE = ► tree then
        yield in postorder(left)
        yield in postorder(right)

        yield value
    fi
si

levelorder[T](tree: Tree[T]) -> Pipe[T] is
    let pending = Queue[Tree[T]]()

    pending.enqueue(tree)

    while pending.count > 0 do
        let node = pending.dequeue()

        if let (value, left, right): NODE = ► node then
            yield value

            pending.enqueue(left)
            pending.enqueue(right)
        fi
    od
si

leaf[T](value: T) -> Tree[T] => NODE(value, EMPTY, EMPTY)

show[T](label: string, values: Pipe[T]) =>
    write_line("{label,-12} {values |> join(" ")}")

let tree =
    NODE(1,
        NODE(2, NODE(4, leaf(7), EMPTY), leaf(5)),
        NODE(3, NODE(6, leaf(8), leaf(9)), EMPTY))

show("preorder:", preorder(tree))
show("inorder:", inorder(tree))
show("postorder:", postorder(tree))
show("level-order:", levelorder(tree))
```

output:

```
preorder:    1 2 4 7 5 3 6 8 9
inorder:     7 4 2 5 1 8 6 9 3
postorder:   7 4 5 2 8 9 6 3 1
level-order: 1 2 3 4 5 6 7 8 9
```


---

<a id="rosetta/van-der-corput-sequence"></a>


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


---

<a id="rosetta/van-eck-sequence"></a>


# Van Eck sequence

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Van_Eck_sequence

```ghul
use IO.Std.write_line
use Collections.MAP
use Ghul.Pipes

van_eck() -> Pipe[int] is
    let last_seen = MAP[int, int]()

    let term mut = 0
    let position mut = 0

    do
        yield term

        let previous mut = 0
        let next =
            if last_seen.try_get_value(term, previous ref) then
                position - previous
            else
                0
            fi

        last_seen[term] = position

        term = next
        position = position + 1
    od
si

write_line("first ten:      {van_eck() |> take(10) |> join(" ")}")
write_line(
    "terms 991-1000: {van_eck() |> skip(990) |> take(10) |> join(" ")}")
```

output:

```
first ten:      0 0 1 0 2 0 2 2 1 6
terms 991-1000: 4 7 30 25 67 225 488 0 10 136
```


---

<a id="rosetta/achilles-numbers"></a>


# Achilles numbers

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Achilles_numbers

```ghul
…
use IO.Std.write_line
use Collections.LIST
use Collections.List
use Collections.Iterable
use Ghul.Pipes

factorize(n: int) -> List[(prime: int, exponent: int)] is
    let factors = LIST[(prime: int, exponent: int)]()
    let remaining mut = n
    let prime mut = 2

    while prime * prime <= remaining do
        let exponent mut = 0

        while remaining % prime == 0 do
            remaining = remaining / prime
            exponent = exponent + 1
        od

        if exponent > 0 then
            factors.add((prime, exponent))
        fi

        prime = prime + 1
    od

    if remaining > 1 then
        factors.add((remaining, 1))
    fi

    return factors
si

gcd(a: int, b: int) -> int =>
    if b == 0 then a else gcd(b, a % b) fi

power(base: int, exponent: int) -> int =>
    if exponent == 0 then 1 else base * power(base, exponent - 1) fi

is_achilles(n: int) -> bool =>
    let factors = factorize(n) in
        factors.count > 0 /\
        (factors |> all(factor => factor.exponent >= 2)) /\
        (factors |> map(factor => factor.exponent) |> reduce(0, gcd)) == 1

totient(n: int) -> int =>
    factorize(n)
    |> reduce(1, (total, factor) =>
        total *
        power(factor.prime, factor.exponent - 1) *
        (factor.prime - 1))

achilles_numbers() -> Pipe[int] is
    let n mut = 1

    do
        if is_achilles(n) then
            yield n
        fi

        n = n + 1
    od
si

show(heading: string, numbers: Iterable[int]) is
    write_line(heading)

    for row in numbers |> chunk(10) do
        write_line(row |> map(n => "{n,7}") |> join(""))
    od

    write_line("")
si

show("first 50 Achilles numbers:", achilles_numbers() |> take(50))

show(
    "first 20 strong Achilles numbers:",
    achilles_numbers() |> filter(n => is_achilles(totient(n))) |> take(20)
)

for digits in 2::5 do
    let total =
        (power(10, digits - 1)..power(10, digits))
        |> filter(is_achilles)
        |> count()

    write_line("Achilles numbers with {digits} digits: {total}")
od
```

diagnostics:

- warning: [impure-function-argument] argument must be a pure function
- warning: [impure-function-argument] argument must be a pure function

output:

```
first 50 Achilles numbers:
     72    108    200    288    392    432    500    648    675    800
    864    968    972   1125   1152   1323   1352   1372   1568   1800
   1944   2000   2312   2592   2700   2888   3087   3200   3267   3456
   3528   3872   3888   4000   4232   4500   4563   4608   5000   5292
   5324   5400   5408   5488   6075   6125   6272   6728   6912   7200

first 20 strong Achilles numbers:
    500    864   1944   2000   2592   3456   5000  10125  10368  12348
  12500  16875  19652  19773  30375  31104  32000  33275  37044  40500

Achilles numbers with 2 digits: 1
Achilles numbers with 3 digits: 12
Achilles numbers with 4 digits: 47
Achilles numbers with 5 digits: 192
```


---

<a id="rosetta/ackermann-function"></a>


# Ackermann function

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Ackermann_function

```ghul
use IO.Std.write_line
use Ghul.Pipes

ackermann(m: int, n: int) -> int =>
    if m == 0 then
        n + 1
    elif n == 0 then
        ackermann(m - 1, 1)
    else
        ackermann(m - 1, ackermann(m, n - 1))
    fi

for m in 0::3 do
    let row = (0::5) |> map(n => "{ackermann(m, n)}") |> join(" ")

    write_line("A({m}, n) = {row}")
od
```

output:

```
A(0, n) = 1 2 3 4 5 6
A(1, n) = 2 3 4 5 6 7
A(2, n) = 3 5 7 9 11 13
A(3, n) = 5 13 29 61 125 253
```


---

<a id="rosetta/additive-primes"></a>


# Additive primes

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Additive_primes

```ghul
use IO.Std.write_line
use Ghul.Pipes

is_prime(n: int) -> bool =>
    n > 1 /\
    ((2..n)
        |> take_while(divisor => divisor * divisor <= n)
        |> all(divisor => n % divisor != 0))

digit_sum(n: int) -> int =>
    if n == 0 then 0 else n % 10 + digit_sum(n / 10) fi

let additive =
    (2..500)
    |> filter(n => is_prime(n) /\ is_prime(digit_sum(n)))
    |> collect_list()

for row in additive |> chunk(10) do
    write_line(row |> map(n => "{n,4}") |> join(""))
od

write_line("")
write_line("{additive.count} additive primes below 500")
```

output:

```
   2   3   5   7  11  23  29  41  43  47
  61  67  83  89 101 113 131 137 139 151
 157 173 179 191 193 197 199 223 227 229
 241 263 269 281 283 311 313 317 331 337
 353 359 373 379 397 401 409 421 443 449
 461 463 467 487

54 additive primes below 500
```


---

<a id="rosetta/almost-prime"></a>


# Almost prime

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Almost_prime

```ghul
use IO.Std.write_line
use Ghul.Pipes

smallest_factor(n: int) -> int =>
    (2::n) |> find_or_throw(divisor => n % divisor == 0)

prime_factor_count(n: int) -> int =>
    if n == 1 then 0 else 1 + prime_factor_count(n / smallest_factor(n)) fi

almost_primes(k: int) -> Pipe[int] is
    let n mut = 2

    do
        if prime_factor_count(n) == k then
            yield n
        fi

        n = n + 1
    od
si

for k in 1::5 do
    let first_ten = almost_primes(k) |> take(10) |> map(n => "{n,5}")

    write_line("k = {k}:{first_ten |> join("")}")
od
```

output:

```
k = 1:    2    3    5    7   11   13   17   19   23   29
k = 2:    4    6    9   10   14   15   21   22   25   26
k = 3:    8   12   18   20   27   28   30   42   44   45
k = 4:   16   24   36   40   54   56   60   81   84   88
k = 5:   32   48   72   80  108  112  120  162  168  176
```


---

<a id="rosetta/amicable-pairs"></a>


# Amicable pairs

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Amicable_pairs

```ghul
use IO.Std.write_line
use Ghul.Pipes

let limit = 20000

sum_of_proper_divisors(n: int) -> int =>
    (1::(n / 2))
        |> filter(divisor => n % divisor == 0)
        |> reduce(0, (total, divisor) => total + divisor)

(1::limit)
    |> map(n => (n, partner = sum_of_proper_divisors(n)))
    |> filter(((n, partner)) =>
        partner > n /\ sum_of_proper_divisors(partner) == n)
    |> each(((n, partner)) => write_line("{n} and {partner}"))
```

output:

```
220 and 284
1184 and 1210
2620 and 2924
5020 and 5564
6232 and 6368
10744 and 10856
12285 and 14595
17296 and 18416
```


---

<a id="rosetta/anti-primes"></a>


# Anti-primes

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Anti-primes

```ghul
use IO.Std.write_line
use Ghul.Pipes

divisor_count(n: int) -> int =>
    (1::n) |> filter(divisor => n % divisor == 0) |> count()

anti_primes() -> Pipe[int] is
    let most mut = 0
    let n mut = 1

    do
        let divisors = divisor_count(n)

        if divisors > most then
            most = divisors

            yield n
        fi

        n = n + 1
    od
si

write_line(anti_primes() |> take(20) |> join(" "))
```

output:

```
1 2 4 6 12 24 36 48 60 120 180 240 360 720 840 1260 1680 2520 5040 7560
```


---

<a id="rosetta/descending-primes"></a>


# Descending primes

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Descending_primes

```ghul
use IO.Std.write_line
use Collections
use Ghul.Pipes

is_prime(n: int) -> bool =>
    if n < 2 then false
    elif n % 2 == 0 then n == 2
    else
        let divisor mut = 3

        while divisor * divisor <= n /\ n % divisor != 0 do
            divisor = divisor + 2
        od

        divisor * divisor > n
    fi

descending(so_far: int, next_digit: int, found: LIST[int]) is
    if so_far > 0 /\ is_prime(so_far) then
        found.add(so_far)
    fi

    for digit in 0::next_digit do
        descending(so_far * 10 + digit, digit - 1, found)
    od
si

let found = LIST()

descending(0, 9, found)

let primes = found |> collect_list()

primes.sort()

for row in 0::(primes.count - 1) / 6 do
    write_line(
        (0::5)
        |> filter(column => row * 6 + column < primes.count)
        |> map(column => "{primes[row * 6 + column],12}")
        |> join("")
    )
od

write_line("{primes.count} primes with strictly descending digits")
```

output:

```
           2           3           5           7          31          41
          43          53          61          71          73          83
          97         421         431         521         541         631
         641         643         653         743         751         761
         821         853         863         941         953         971
         983        5431        6421        6521        7321        7541
        7621        7643        8431        8521        8543        8641
        8731        8741        8753        8761        9421        9431
        9521        9631        9643        9721        9743        9851
        9871       75431       76421       76541       76543       86531
       87421       87541       87631       87641       87643       94321
       96431       97651       98321       98543       98621       98641
       98731      764321      865321      876431      975421      986543
      987541      987631     8764321     8765321     9754321     9875321
    97654321    98764321    98765431
87 primes with strictly descending digits
```


---

<a id="rosetta/gapful-numbers"></a>


# Gapful numbers

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Gapful_numbers

```ghul
use IO.Std.write_line
use Collections.LIST
use Ghul.Pipes

gapful_from(start: int, wanted: int) -> LIST[int] is
    let found = LIST[int]()
    let candidate mut = start

    while found.count < wanted do
        let digits = candidate.to_string()
        let first_last = int.parse(
            "{digits[0]}{digits[digits.length - 1]}")

        if candidate % first_last == 0 then
            found.add(candidate)
        fi

        candidate = candidate + 1
    od

    found
si

write_line("first 30 gapful numbers:")
write_line(gapful_from(100, 30) |> join(", "))

write_line("first 15 gapful numbers >= 1,000,000:")
write_line(gapful_from(1000000, 15) |> join(", "))

write_line("first 10 gapful numbers >= 1,000,000,000:")
write_line(gapful_from(1000000000, 10) |> join(", "))
```

output:

```
first 30 gapful numbers:
100, 105, 108, 110, 120, 121, 130, 132, 135, 140, 143, 150, 154, 160, 165, 170, 176, 180, 187, 190, 192, 195, 198, 200, 220, 225, 231, 240, 242, 253
first 15 gapful numbers >= 1,000,000:
1000000, 1000005, 1000008, 1000010, 1000016, 1000020, 1000021, 1000030, 1000032, 1000034, 1000035, 1000040, 1000050, 1000060, 1000065
first 10 gapful numbers >= 1,000,000,000:
1000000000, 1000000001, 1000000005, 1000000008, 1000000010, 1000000016, 1000000020, 1000000027, 1000000030, 1000000032
```


---

<a id="rosetta/gray-code"></a>


# Gray code

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Gray_code

```ghul
use IO.Std.write_line

bits(n: int) -> string => System.Convert.to_string(n, 2).pad_left(5, '0')

encode(n: int) -> int => n ^ (n >>> 1)

decode(gray: int) -> int => (
    let n mut = gray

    for shift in 1..5 do
        n = n ^ (gray >>> shift)
    od

    n
)

write_line("binary  gray   decoded")

for n in 0::31 do
    let gray = encode(n)

    write_line("{bits(n)}   {bits(gray)}   {decode(gray)}")
od
```

output:

```
binary  gray   decoded
00000   00000   0
00001   00001   1
00010   00011   2
00011   00010   3
00100   00110   4
00101   00111   5
00110   00101   6
00111   00100   7
01000   01100   8
01001   01101   9
01010   01111   10
01011   01110   11
01100   01010   12
01101   01011   13
01110   01001   14
01111   01000   15
10000   11000   16
10001   11001   17
10010   11011   18
10011   11010   19
10100   11110   20
10101   11111   21
10110   11101   22
10111   11100   23
11000   10100   24
11001   10101   25
11010   10111   26
11011   10110   27
11100   10010   28
11101   10011   29
11110   10001   30
11111   10000   31
```


---

<a id="rosetta/greatest-common-divisor"></a>


# Greatest common divisor

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Greatest_common_divisor

```ghul
use IO.Std.write_line

gcd(a: int, b: int) -> int => if b == 0 then a else gcd(b, a % b) fi

write_line("gcd(48, 18) = {gcd(48, 18)}")
write_line("gcd(1071, 462) = {gcd(1071, 462)}")
write_line("gcd(0, 13) = {gcd(0, 13)}")
write_line("gcd(13, 0) = {gcd(13, 0)}")
```

output:

```
gcd(48, 18) = 6
gcd(1071, 462) = 21
gcd(0, 13) = 13
gcd(13, 0) = 13
```


---

<a id="rosetta/haversine-formula"></a>


# Haversine formula

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Haversine_formula

```ghul
use IO.Std.write_line
use System.Math.sin
use System.Math.cos
use System.Math.asin
use System.Math.sqrt
use System.Math.pi

let earth_radius_km = 6372.8D

radians(degrees: double) -> double => degrees * pi / 180.0D

haversine(theta: double) -> double => sin(theta / 2.0D) * sin(theta / 2.0D)

great_circle_distance(
    (latitude_1, longitude_1): (double, double),
    (latitude_2, longitude_2): (double, double),
    radius: double
) -> double =>
        let chord =
            haversine(radians(latitude_2 - latitude_1)) +
            cos(radians(latitude_1)) * cos(radians(latitude_2)) *
            haversine(radians(longitude_2 - longitude_1))
        in
            2.0D * radius * asin(sqrt(chord))

let nashville = (36.12D, -86.67D)
let los_angeles = (33.94D, -118.40D)

let distance =
    great_circle_distance(nashville, los_angeles, earth_radius_km)

write_line("BNA to LAX: {distance:F6} km")
```

output:

```
BNA to LAX: 2887.259951 km
```


---

<a id="rosetta/iterated-digits-squaring"></a>


# Iterated digits squaring

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Iterated_digits_squaring

```ghul
use IO.Std.write_line
use Collections.LIST

digit_square_sum(value: int) -> int => (
    let rest mut = value
    let total mut = 0

    while rest > 0 do
        let digit = rest % 10
        total = total + digit * digit
        rest = rest / 10
    od

    total
)

reaches_89(value: int) -> bool => (
    let current mut = value

    while current != 1 /\ current != 89 do
        current = digit_square_sum(current)
    od

    current == 89
)

let limit = 100000000
let max_after_one_step = 648

let memo = LIST[bool]([false])

for value in 1::max_after_one_step do
    memo.add(reaches_89(value))
od

let chains mut = 0

for value in 1..limit do
    if memo[digit_square_sum(value)] then
        chains = chains + 1
    fi
od

write_line("{chains:N0} chains starting below {limit:N0} reach 89")
```

output:

```
85,744,333 chains starting below 100,000,000 reach 89
```


---

<a id="rosetta/juggler-sequence"></a>


# Juggler sequence

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Juggler_sequence

```ghul
use IO.Std.write_line
use System.Math.sqrt

step(value: long) -> long =>
    if (value % 2L) == 0L then
        cast long(sqrt(cast double(value)))
    else
        cast long(cast double(value) * sqrt(cast double(value)))
    fi

stats(start: long) -> (int, long, int) => (
    let current mut = start
    let terms mut = 0
    let highest mut = start
    let at mut = 0

    while current != 1L do
        current = step(current)
        terms = terms + 1

        if current > highest then
            highest = current
            at = terms
        fi
    od

    (terms, highest, at)
)

write_line("  n   l                h  i")

for n in 20::39 do
    let (terms, highest, at) = stats(cast long(n))
    write_line("{n,3}  {terms,3}  {highest,17:N0}  {at}")
od
```

output:

```
  n   l                h  i
 20    3                 20  0
 21    9                140  4
 22    3                 22  0
 23    9                110  1
 24    3                 24  0
 25   11             52,214  3
 26    6                 36  3
 27    6                140  1
 28    6                 36  3
 29    9                156  1
 30    6                 36  3
 31    6                172  1
 32    6                 36  3
 33    8              2,598  2
 34    6                 36  3
 35    8              2,978  2
 36    3                 36  0
 37   17  24,906,114,455,136  8
 38    3                 38  0
 39   14            233,046  3
```


---

<a id="rosetta/kaprekar-numbers"></a>


# Kaprekar numbers

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Kaprekar_numbers

```ghul
use IO.Std.write_line
use Ghul.Pipes

kaprekar(n: int) -> bool => (
    let square mut = cast long(n) * cast long(n)
    let power mut = 10L

    let matched = while power <= square do
        let right = square % power

        if right > 0L /\ square / power + right == cast long(n) then
            break true
        fi

        power = power * 10L
    od

    matched ?? false
)

let below_ten_thousand = (1::9999)
    |> filter(n => n == 1 \/ kaprekar(n))
    |> collect_list()

write_line("Kaprekar numbers below 10000:")
write_line(below_ten_thousand |> join(", "))

let below_million = (1..1000000)
    |> filter(n => n == 1 \/ kaprekar(n))
    |> count()

write_line("{below_million} Kaprekar numbers below 1000000")
```

output:

```
Kaprekar numbers below 10000:
1, 9, 45, 55, 99, 297, 703, 999, 2223, 2728, 4879, 4950, 5050, 5292, 7272, 7777, 9999
54 Kaprekar numbers below 1000000
```


---

<a id="rosetta/ludic-numbers"></a>


# Ludic numbers

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Ludic_numbers

```ghul
use IO.Std.write_line
use Collections.LIST
use Collections.SET
use Ghul.Pipes

let remaining mut = (2..25000) |> collect_list()
let ludic = LIST[int]()

while ludic.count < 2005 do
    let next_ludic = remaining[0]
    ludic.add(next_ludic)
    remaining.remove_at(0)

    let position mut = 0
    let kept = LIST[int]()

    for candidate in remaining do
        position = position + 1

        if position % next_ludic != 0 then
            kept.add(candidate)
        fi
    od

    remaining = kept
od

write_line(
    "first 25: {ludic |> take(25) |> join(" ")}")

let up_to_1000 = ludic |> filter(n => n <= 1000) |> count()

write_line("{up_to_1000} ludic numbers <= 1000")
write_line(
    "2000th..2005th: {ludic |> skip(1999) |> take(6) |> join(" ")}")

let set = SET[int](ludic)
let triplets = ludic
    |> filter(x => x + 6 < 1000 /\
            set.contains(x + 2) /\
            set.contains(x + 6))
    |> map(x => "({x}, {x + 2}, {x + 6})")
    |> join("  ")

write_line("triplets: {triplets}")
```

output:

```
first 25: 2 3 5 7 11 13 17 23 25 29 37 41 43 47 53 61 67 71 77 83 89 91 97 107 115
141 ludic numbers <= 1000
2000th..2005th: 21481 21487 21493 21503 21511 21523
triplets: (5, 7, 11)  (11, 13, 17)  (23, 25, 29)  (41, 43, 47)  (173, 175, 179)  (221, 223, 227)  (233, 235, 239)  (431, 433, 437)  (851, 853, 857)
```


---

<a id="rosetta/map-range"></a>


# Map range

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Map_range

```ghul
use IO.Std.write_line
use Ghul.Pipes

map_range(
    (a1, a2): (double, double),
    (b1, b2): (double, double),
    s: double
) -> double =>
    b1 + (s - a1) * (b2 - b1) / (a2 - a1)

(0::10)
    |> map(s =>
        (s, mapped = map_range((0.0D, 10.0D), (-1.0D, 0.0D), cast(s))))
    |> each(((s, mapped)) => write_line("{s} maps to {mapped:F1}"))
```

output:

```
0 maps to -1.0
1 maps to -0.9
2 maps to -0.8
3 maps to -0.7
4 maps to -0.6
5 maps to -0.5
6 maps to -0.4
7 maps to -0.3
8 maps to -0.2
9 maps to -0.1
10 maps to 0.0
```


---

<a id="rosetta/negative-base-numbers"></a>


# Negative base numbers

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Negative_base_numbers

```ghul
use IO.Std.write_line
use Ghul.Pipes

let digit_set = "0123456789abcdefghijklmnopqrstuvwxyz"

encode(n: int, base: int) -> string => (
    let rest mut = n
    let digits mut = ""

    while rest != 0 do
        let remainder mut = rest % base

        rest = rest / base

        if remainder < 0 then
            remainder = remainder - base
            rest = rest + 1
        fi

        digits = "{digit_set[remainder]}{digits}"
    od

    if digits.length == 0 then "0" else digits fi
)

decode(encoded: string, base: int) -> int =>
    encoded
    |> reduce(0, (value, digit) =>
        value * base + digit_set.index_of(digit))

for (n, base) in [(10, -2), (146, -3), (15, -10)] do
    let encoded = encode(n, base)

    write_line(
        "{n} in base {base} is {encoded}, "
        "and back again is {decode(encoded, base)}")
od
```

output:

```
10 in base -2 is 11110, and back again is 10
146 in base -3 is 21102, and back again is 146
15 in base -10 is 195, and back again is 15
```


---

<a id="rosetta/numbers-with-equal-rises-and-falls"></a>


# Numbers with equal rises and falls

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Numbers_with_equal_rises_and_falls

```ghul
use IO.Std.write_line
use Ghul.Pipes

balanced(n: int) -> bool => (
    let rest mut = n
    let balance mut = 0

    while rest >= 10 do
        let lower = rest % 10
        let upper = rest / 10 % 10

        if upper < lower then
            balance = balance + 1
        elif upper > lower then
            balance = balance - 1
        fi

        rest = rest / 10
    od

    balance == 0
)

sequence() -> Pipe[int] => stream(1, n => n || n + 1) |> filter(balanced)

write_line("the first 200 numbers with equal rises and falls:")

let first_200 = sequence() |> take(200) |> collect_list()

for row in 0::19 do
    write_line(
        (0::9)
        |> map(column => "{first_200[row * 10 + column],5}")
        |> join(""))
od

let ten_millionth = sequence() |> skip(10000000 - 1) |> first()

write_line("the 10000000th is {ten_millionth}")
```

output:

```
the first 200 numbers with equal rises and falls:
    1    2    3    4    5    6    7    8    9   11
   22   33   44   55   66   77   88   99  101  102
  103  104  105  106  107  108  109  111  120  121
  130  131  132  140  141  142  143  150  151  152
  153  154  160  161  162  163  164  165  170  171
  172  173  174  175  176  180  181  182  183  184
  185  186  187  190  191  192  193  194  195  196
  197  198  201  202  203  204  205  206  207  208
  209  212  213  214  215  216  217  218  219  222
  230  231  232  240  241  242  243  250  251  252
  253  254  260  261  262  263  264  265  270  271
  272  273  274  275  276  280  281  282  283  284
  285  286  287  290  291  292  293  294  295  296
  297  298  301  302  303  304  305  306  307  308
  309  312  313  314  315  316  317  318  319  323
  324  325  326  327  328  329  333  340  341  342
  343  350  351  352  353  354  360  361  362  363
  364  365  370  371  372  373  374  375  376  380
  381  382  383  384  385  386  387  390  391  392
  393  394  395  396  397  398  401  402  403  404
the 10000000th is 41909002
```


---

<a id="rosetta/ormiston-pairs"></a>


# Ormiston pairs

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Ormiston_pairs

```ghul
use IO.Std.write_line
use Collections.LIST
use Ghul.Pipes

let limit = 10000000

let composite = LIST[bool]()

(0::limit) |> each(_ => composite.add(false))

let root mut = 2

while root * root <= limit do
    if !composite[root] then
        let multiple mut = root * root

        while multiple <= limit do
            composite[multiple] = true
            multiple = multiple + root
        od
    fi

    root = root + 1
od

digit_signature(value: int) -> string => (
    let counts = LIST[int]()

    for _ in 0..10 do
        counts.add(0)
    od

    let rest mut = value

    while rest > 0 do
        let digit = rest % 10
        counts[digit] = counts[digit] + 1
        rest = rest / 10
    od

    let signature mut = ""

    for count in counts do
        signature = "{signature}{count}"
    od

    signature
)

let pairs = LIST[string]()
let up_to_million mut = 0
let up_to_ten_million mut = 0
let previous mut = 0
let previous_signature mut = ""

for candidate in 2..(limit + 1) do
    if !composite[candidate] then
        let signature = digit_signature(candidate)

        if previous_signature =~ signature then
            if pairs.count < 30 then
                pairs.add("({previous}, {candidate})")
            fi

            if candidate <= 1000000 then
                up_to_million = up_to_million + 1
            fi

            up_to_ten_million = up_to_ten_million + 1
        fi

        previous = candidate
        previous_signature = signature
    fi
od

write_line("first 30 Ormiston pairs:")

for pair in pairs do
    write_line(pair)
od

write_line("{up_to_million} pairs up to 1000000")
write_line("{up_to_ten_million} pairs up to 10000000")
```

output:

```
first 30 Ormiston pairs:
(1913, 1931)
(18379, 18397)
(19013, 19031)
(25013, 25031)
(34613, 34631)
(35617, 35671)
(35879, 35897)
(36979, 36997)
(37379, 37397)
(37813, 37831)
(40013, 40031)
(40213, 40231)
(40639, 40693)
(45613, 45631)
(48091, 48109)
(49279, 49297)
(51613, 51631)
(55313, 55331)
(56179, 56197)
(56713, 56731)
(58613, 58631)
(63079, 63097)
(63179, 63197)
(64091, 64109)
(65479, 65497)
(66413, 66431)
(74779, 74797)
(75913, 75931)
(76213, 76231)
(76579, 76597)
382 pairs up to 1000000
3722 pairs up to 10000000
```


---

<a id="rosetta/pernicious-numbers"></a>


# Pernicious numbers

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Pernicious_numbers

```ghul
use IO.Std.write_line
use Ghul.Pipes

prime(value: int) -> bool => (
    let divisor mut = 2

    let factor_found = while divisor * divisor <= value do
        if value % divisor == 0 then
            break true
        fi

        divisor = divisor + 1
    od

    value >= 2 /\ !(factor_found ?? false)
)

population_count(value: int) -> int =>
    System.Convert.to_string(value, 2)
        |> filter(bit => bit == '1')
        |> count()

pernicious(value: int) -> bool => prime(population_count(value))

write_line("first 25:")

write_line(
    (1..200) |> filter(pernicious) |> take(25) |> join(", "))

write_line("between 888888877 and 888888888:")

write_line(
    (888888877::888888888) |> filter(pernicious) |> join(", "))
```

output:

```
first 25:
3, 5, 6, 7, 9, 10, 11, 12, 13, 14, 17, 18, 19, 20, 21, 22, 24, 25, 26, 28, 31, 33, 34, 35, 36
between 888888877 and 888888888:
888888877, 888888878, 888888880, 888888883, 888888885, 888888886
```


---

<a id="rosetta/population-count"></a>


# Population count

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Population_count

```ghul
use IO.Std.write_line
use Ghul.Pipes

popcount(n: long) -> int => (
    let bits mut = n
    let count mut = 0

    while bits != 0L do
        count = count + cast int(bits & 1L)
        bits = bits >>> 1
    od

    count
)

let powers_of_three = stream(1L, power => power || power * 3L)

let counts =
    powers_of_three |> take(30) |> map(popcount) |> join(", ")

write_line("population counts of the first thirty powers of 3: {counts}")

let naturals = stream(0L, n => n || n + 1L)

let evil =
    naturals |> filter(n => popcount(n) % 2 == 0) |> take(30) |> join(", ")

write_line("the first thirty evil numbers: {evil}")

let odious =
    naturals |> filter(n => popcount(n) % 2 == 1) |> take(30) |> join(", ")

write_line("the first thirty odious numbers: {odious}")
```

output:

```
population counts of the first thirty powers of 3: 1, 2, 2, 4, 3, 6, 6, 5, 6, 8, 9, 13, 10, 11, 14, 15, 11, 14, 14, 17, 17, 20, 19, 22, 16, 18, 24, 30, 25, 25
the first thirty evil numbers: 0, 3, 5, 6, 9, 10, 12, 15, 17, 18, 20, 23, 24, 27, 29, 30, 33, 34, 36, 39, 40, 43, 45, 46, 48, 51, 53, 54, 57, 58
the first thirty odious numbers: 1, 2, 4, 7, 8, 11, 13, 14, 16, 19, 21, 22, 25, 26, 28, 31, 32, 35, 37, 38, 41, 42, 44, 47, 49, 50, 52, 55, 56, 59
```


---

<a id="rosetta/radical-of-an-integer"></a>


# Radical of an integer

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Radical_of_an_integer

```ghul
use IO.Std.write_line
use Collections.LIST
use Ghul.Pipes

let limit = 1000000

let radical = LIST[int]()
let factor_counts = LIST[int]()
let composite = LIST[bool]()

for _ in 0::limit do
    radical.add(1)
    factor_counts.add(0)
    composite.add(false)
od

for prime in 2..(limit + 1) do
    if !composite[prime] then
        let multiple mut = prime

        while multiple <= limit do
            radical[multiple] = radical[multiple] * prime
            factor_counts[multiple] = factor_counts[multiple] + 1
            composite[multiple] = true
            multiple = multiple + prime
        od
    fi
od

write_line("radicals of the first 50 positive integers:")

for row in 0..5 do
    write_line(
        (row * 10 + 1..row * 10 + 11)
            |> map(n => "{radical[n],3}")
            |> join(" "))
od

for n in [99999, 499999, 999999] do
    write_line("radical[{n}] = {radical[n]}")
od

let distribution = LIST[int]()

for _ in 0..8 do
    distribution.add(0)
od

for n in 1..(limit + 1) do
    let count = factor_counts[n]
    distribution[count] = distribution[count] + 1
od

write_line("first 1000000 integers by distinct prime factors:")

for count in 0..8 do
    if distribution[count] > 0 then
        write_line("{count}: {distribution[count]:N0}")
    fi
od

prime(n: int, factors: LIST[int], radicals: LIST[int]) -> bool =>
    n >= 2 /\ factors[n] == 1 /\ radicals[n] == n

let primes = (2..(limit + 1))
    |> filter(n => prime(n, factor_counts, radical))
    |> collect_list()

let powers mut = 0

for base in primes do
    let power mut = cast long(base) * cast long(base)

    while power <= cast long(limit) do
        powers = powers + 1
        power = power * cast long(base)
    od
od

write_line(
    "{primes.count:N0} primes plus {powers} prime powers "
    "= {primes.count + powers:N0}, matching the one-factor "
    "count {distribution[1]:N0}")
```

output:

```
radicals of the first 50 positive integers:
  1   2   3   2   5   6   7   2   3  10
 11   6  13  14  15   2  17   6  19  10
 21  22  23   6   5  26   3  14  29  30
 31   2  33  34  35   6  37  38  39  10
 41  42  43  22  15  46  47   6   7  10
radical[99999] = 33333
radical[499999] = 3937
radical[999999] = 111111
first 1000000 integers by distinct prime factors:
0: 1
1: 78,734
2: 288,726
3: 379,720
4: 208,034
5: 42,492
6: 2,285
7: 8
78,498 primes plus 236 prime powers = 78,734, matching the one-factor count 78,734
```


---

<a id="rosetta/roman-numerals-encode"></a>


# Roman numerals/Encode

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Roman_numerals/Encode

```ghul
use IO.Std.write_line
use Ghul.Pipes

roman(n: int) -> string is
    let values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
    let symbols = [
        "M", "CM", "D", "CD", "C", "XC",
        "L", "XL", "X", "IX", "V", "IV", "I"
    ]

    let numeral = System.Text.StringBuilder()
    let remaining mut = n

    for i in 0..values.count do
        while remaining >= values[i] do
            numeral.append(symbols[i])

            remaining = remaining - values[i]
        od
    od

    return numeral.to_string()
si

for n in [1990, 2008, 1666, 4, 9, 3999] do
    write_line("{n,4} = {roman(n)}")
od
```

output:

```
1990 = MCMXC
2008 = MMVIII
1666 = MDCLXVI
   4 = IV
   9 = IX
3999 = MMMCMXCIX
```


---

<a id="rosetta/semiprime"></a>


# Semiprime

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Semiprime

```ghul
use IO.Std.write_line
use Ghul.Pipes

is_semiprime(n: int) -> bool => (
    let rest mut = n
    let count mut = 0
    let divisor mut = 2

    while divisor * divisor <= rest /\ count < 3 do
        while rest % divisor == 0 do
            rest = rest / divisor
            count = count + 1
        od

        divisor = divisor + 1
    od

    if rest > 1 then
        count = count + 1
    fi

    count == 2
)

let up_to_100 = (2::100) |> filter(is_semiprime) |> join(", ")

write_line("semiprimes up to 100: {up_to_100}")

for n in [1679, 1234, 5, 9, 2093] do
    write_line(
        "{n} is {if is_semiprime(n) then "" else "not " fi}semiprime")
od
```

output:

```
semiprimes up to 100: 4, 6, 9, 10, 14, 15, 21, 22, 25, 26, 33, 34, 35, 38, 39, 46, 49, 51, 55, 57, 58, 62, 65, 69, 74, 77, 82, 85, 86, 87, 91, 93, 94, 95
1679 is semiprime
1234 is semiprime
5 is not semiprime
9 is semiprime
2093 is not semiprime
```


---

<a id="rosetta/sieve-of-eratosthenes"></a>


# Sieve of Eratosthenes

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Sieve_of_Eratosthenes

```ghul
use IO.Std.write_line
use Collections
use Ghul.Pipes

sieve(limit: int) -> List[int] is
    let composite = LIST()

    (0::limit) |> each(_ => composite.add(false))

    let prime mut = 2

    while prime * prime <= limit do
        if !composite[prime] then
            let multiple mut = prime * prime

            while multiple <= limit do
                composite[multiple] = true
                multiple = multiple + prime
            od
        fi

        prime = prime + 1
    od

    return
        (2::limit)
            |> filter(i => !composite[i])
            |> collect()
si

for prime in sieve(100) do
    write_line("{prime}")
od
```

output:

```
2
3
5
7
11
13
17
19
23
29
31
37
41
43
47
53
59
61
67
71
73
79
83
89
97
```


---

<a id="rosetta/sphenic-numbers"></a>


# Sphenic numbers

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Sphenic_numbers

```ghul
use IO.Std.write_line
use Collections
use Ghul.Pipes

let search_limit = 1000000

smallest_prime_factors(limit: int) -> List[int] is
    let factor = LIST()

    (0..limit) |> each(_ => factor.add(0))

    let prime mut = 2

    while prime * prime < limit do
        if factor[prime] == 0 then
            let multiple mut = prime * prime

            while multiple < limit do
                if factor[multiple] == 0 then
                    factor[multiple] = prime
                fi

                multiple = multiple + prime
            od
        fi

        prime = prime + 1
    od

    let n mut = 2

    while n < limit do
        if factor[n] == 0 then
            factor[n] = n
        fi

        n = n + 1
    od

    return factor
si

is_sphenic(n: int, factor: List[int]) -> bool => (
    let rest mut = n
    let previous mut = 0
    let total mut = 0
    let distinct mut = 0

    while rest > 1 do
        let prime = factor[rest]

        total = total + 1

        if prime != previous then
            distinct = distinct + 1
            previous = prime
        fi

        rest = rest / prime
    od

    total == 3 /\ distinct == 3
)

prime_factors(n: int, factor: List[int]) -> List[string] => (
    let rest mut = n
    let factors = LIST[string]()

    while rest > 1 do
        let prime = factor[rest]
        factors.add("{prime}")
        rest = rest / prime
    od

    factors
)

let factor = smallest_prime_factors(search_limit)

let sphenics =
    (2..search_limit)
    |> filter(n => is_sphenic(n, factor))
    |> collect_list()

let below_1000 = sphenics |> filter(n => n < 1000) |> join(", ")

write_line("sphenic numbers below 1000: {below_1000}")

let triplets = LIST()

let i mut = 0

while i + 2 < sphenics.count do
    if sphenics[i + 1] == sphenics[i] + 1 /\
        sphenics[i + 2] == sphenics[i] + 2
    then
        triplets.add(sphenics[i])
    fi

    i = i + 1
od

write_line("sphenic triplets below 10000:")

for first in triplets do
    if first + 2 < 10000 then
        write_line("({first}, {first + 1}, {first + 2})")
    fi
od

write_line("sphenic numbers below {search_limit}: {sphenics.count}")
write_line("sphenic triplets below {search_limit}: {triplets.count}")

let sphenic_200000th = sphenics[200000 - 1]

write_line(
    "the 200000th sphenic number is {sphenic_200000th} = {
        prime_factors(sphenic_200000th, factor) |> join(" x ")
    }"
)

let triplet_5000th = triplets[5000 - 1]

write_line(
    "the 5000th sphenic triplet is "
    "({triplet_5000th}, {triplet_5000th + 1}, {triplet_5000th + 2})")
```

output:

```
sphenic numbers below 1000: 30, 42, 66, 70, 78, 102, 105, 110, 114, 130, 138, 154, 165, 170, 174, 182, 186, 190, 195, 222, 230, 231, 238, 246, 255, 258, 266, 273, 282, 285, 286, 290, 310, 318, 322, 345, 354, 357, 366, 370, 374, 385, 399, 402, 406, 410, 418, 426, 429, 430, 434, 435, 438, 442, 455, 465, 470, 474, 483, 494, 498, 506, 518, 530, 534, 555, 561, 574, 582, 590, 595, 598, 602, 606, 609, 610, 615, 618, 627, 638, 642, 645, 646, 651, 654, 658, 663, 665, 670, 678, 682, 705, 710, 715, 730, 741, 742, 754, 759, 762, 777, 782, 786, 790, 795, 805, 806, 814, 822, 826, 830, 834, 854, 861, 874, 885, 890, 894, 897, 902, 903, 906, 915, 935, 938, 942, 946, 957, 962, 969, 970, 978, 986, 987, 994
sphenic triplets below 10000:
(1309, 1310, 1311)
(1885, 1886, 1887)
(2013, 2014, 2015)
(2665, 2666, 2667)
(3729, 3730, 3731)
(5133, 5134, 5135)
(6061, 6062, 6063)
(6213, 6214, 6215)
(6305, 6306, 6307)
(6477, 6478, 6479)
(6853, 6854, 6855)
(6985, 6986, 6987)
(7257, 7258, 7259)
(7953, 7954, 7955)
(8393, 8394, 8395)
(8533, 8534, 8535)
(8785, 8786, 8787)
(9213, 9214, 9215)
(9453, 9454, 9455)
(9821, 9822, 9823)
(9877, 9878, 9879)
sphenic numbers below 1000000: 206964
sphenic triplets below 1000000: 5457
the 200000th sphenic number is 966467 = 17 x 139 x 409
the 5000th sphenic triplet is (918005, 918006, 918007)
```


---

<a id="rosetta/taxicab-numbers"></a>


# Taxicab numbers

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Taxicab_numbers

```ghul
use IO.Std.write_line
use Collections
use Ghul.Pipes

let pair_bound = 1200

let sums = LIST[long]()

for a in 1..pair_bound do
    let a_cubed = cast long(a) * cast long(a) * cast long(a)

    for b in (a + 1)..pair_bound do
        let b_cubed = cast long(b) * cast long(b) * cast long(b)

        sums.add(a_cubed + b_cubed)
    od
od

sums.sort()

let taxis = LIST[long]()

let i mut = 0

while i < sums.count - 1 do
    if sums[i] == sums[i + 1] then
        let value = sums[i]

        taxis.add(value)

        while i < sums.count /\ sums[i] == value do
            i = i + 1
        od
    else
        i = i + 1
    fi
od

cube_root(value: long) -> long => (
    let cube_root_of = System.Math.cbrt(cast(value))
    let root = cast long(System.Math.floor(cube_root_of + 0.5D))

    if root * root * root == value then root else 0L fi
)

expressions(taxi: long) -> string => (
    let parts = LIST[string]()
    let a mut = 1L

    while a * a * a * 2L < taxi do
        let b = cube_root(taxi - a * a * a)

        if b > 0L then
            parts.add("{a}^3 + {b}^3")
        fi

        a = a + 1L
    od

    parts |> join(" = ")
)

show(rank: int, taxis: List[long]) is
    let taxi = taxis[rank - 1]

    write_line("{rank}: {taxi} = {expressions(taxi)}")
si

write_line("the lowest 25 taxicab numbers:")

for rank in 1::25 do
    show(rank, taxis)
od

write_line("the 2000th taxicab number, and half a dozen more:")

for rank in 2000::2006 do
    show(rank, taxis)
od
```

output:

```
the lowest 25 taxicab numbers:
1: 1729 = 1^3 + 12^3 = 9^3 + 10^3
2: 4104 = 2^3 + 16^3 = 9^3 + 15^3
3: 13832 = 2^3 + 24^3 = 18^3 + 20^3
4: 20683 = 10^3 + 27^3 = 19^3 + 24^3
5: 32832 = 4^3 + 32^3 = 18^3 + 30^3
6: 39312 = 2^3 + 34^3 = 15^3 + 33^3
7: 40033 = 9^3 + 34^3 = 16^3 + 33^3
8: 46683 = 3^3 + 36^3 = 27^3 + 30^3
9: 64232 = 17^3 + 39^3 = 26^3 + 36^3
10: 65728 = 12^3 + 40^3 = 31^3 + 33^3
11: 110656 = 4^3 + 48^3 = 36^3 + 40^3
12: 110808 = 6^3 + 48^3 = 27^3 + 45^3
13: 134379 = 12^3 + 51^3 = 38^3 + 43^3
14: 149389 = 8^3 + 53^3 = 29^3 + 50^3
15: 165464 = 20^3 + 54^3 = 38^3 + 48^3
16: 171288 = 17^3 + 55^3 = 24^3 + 54^3
17: 195841 = 9^3 + 58^3 = 22^3 + 57^3
18: 216027 = 3^3 + 60^3 = 22^3 + 59^3
19: 216125 = 5^3 + 60^3 = 45^3 + 50^3
20: 262656 = 8^3 + 64^3 = 36^3 + 60^3
21: 314496 = 4^3 + 68^3 = 30^3 + 66^3
22: 320264 = 18^3 + 68^3 = 32^3 + 66^3
23: 327763 = 30^3 + 67^3 = 51^3 + 58^3
24: 373464 = 6^3 + 72^3 = 54^3 + 60^3
25: 402597 = 42^3 + 69^3 = 56^3 + 61^3
the 2000th taxicab number, and half a dozen more:
2000: 1671816384 = 428^3 + 1168^3 = 940^3 + 944^3
2001: 1672470592 = 29^3 + 1187^3 = 632^3 + 1124^3
2002: 1673170856 = 458^3 + 1164^3 = 828^3 + 1034^3
2003: 1675045225 = 522^3 + 1153^3 = 744^3 + 1081^3
2004: 1675958167 = 492^3 + 1159^3 = 711^3 + 1096^3
2005: 1676926719 = 63^3 + 1188^3 = 714^3 + 1095^3
2006: 1677646971 = 99^3 + 1188^3 = 891^3 + 990^3
```


---

<a id="rosetta/truncatable-primes"></a>


# Truncatable primes

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Truncatable_primes

```ghul
use IO.Std.write_line
use Collections.LIST
use Ghul.Pipes

let limit = 1000000

let composite = LIST[bool]()

for _ in 0::limit do
    composite.add(false)
od

let root mut = 2

while root * root <= limit do
    if !composite[root] then
        let multiple mut = root * root

        while multiple <= limit do
            composite[multiple] = true
            multiple = multiple + root
        od
    fi

    root = root + 1
od

prime(text: string) -> bool => (
    let value = int.parse(text)

    value >= 2 /\ !composite[value]
)

left_truncatable(text: string) -> bool => (
    let valid = for start in 0..text.length do
        if !prime(text[start..<0]) then
            break false
        fi
    od

    valid ?? true
)

right_truncatable(text: string) -> bool => (
    let valid = for end in 1::text.length do
        if !prime(text[0..end]) then
            break false
        fi
    od

    valid ?? true
)

let primes = (2..(limit + 1))
    |> filter(n => !composite[n])
    |> collect_list()

let largest_left mut = 0
let largest_right mut = 0

for candidate in primes do
    let text = "{candidate}"

    if !text.contains('0') then
        if left_truncatable(text) then
            largest_left = candidate
        fi

        if right_truncatable(text) then
            largest_right = candidate
        fi
    fi
od

write_line("largest left-truncatable prime below 1000000: {largest_left}")
write_line(
    "largest right-truncatable prime below 1000000: "
    "{largest_right}")
```

output:

```
largest left-truncatable prime below 1000000: 998443
largest right-truncatable prime below 1000000: 739399
```


---

<a id="rosetta/undulating-numbers"></a>


# Undulating numbers

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Undulating_numbers

```ghul
use IO.Std.write_line
use Collections.LIST
use Ghul.Pipes

undulating_value(first: int, second: int, length: int) -> long => (
    let value mut = 0L

    for position in 0..length do
        let digit = if position % 2 == 0 then first else second fi
        value = value * 10L + cast long(digit)
    od

    value
)

let limit = 9007199254740992L

let values = LIST[long]()

for length in 3..17 do
    for first in 1..10 do
        for second in 0..10 do
            if second != first then
                let value = undulating_value(first, second, length)

                if value < limit then
                    values.add(value)
                fi
            fi
        od
    od
od

let three_digit = values |> filter(v => v < 1000L) |> collect_list()
let four_digit = values
    |> filter(v => v >= 1000L /\ v < 10000L)
    |> collect_list()

write_line("three digit:")

for row in 0..9 do
    write_line(
        three_digit
            |> skip(row * 9)
            |> take(9)
            |> map(v => "{v}")
            |> join(" "))
od

write_line("four digit:")

for row in 0..9 do
    write_line(
        four_digit
            |> skip(row * 9)
            |> take(9)
            |> map(v => "{v}")
            |> join(" "))
od

prime(value: long) -> bool => (
    let divisor mut = 2L

    let factor_found = while divisor * divisor <= value do
        if value % divisor == 0L then
            break true
        fi

        divisor = divisor + 1L
    od

    value >= 2L /\ !(factor_found ?? false)
)

write_line("three digit primes:")

write_line(
    three_digit |> filter(prime) |> map(v => "{v}") |> join(" "))

write_line("600th: {values[599]}")

write_line(
    "{values.count} undulating numbers below 2^53, "
    "the largest is {values[values.count - 1]}")
```

output:

```
three digit:
101 121 131 141 151 161 171 181 191
202 212 232 242 252 262 272 282 292
303 313 323 343 353 363 373 383 393
404 414 424 434 454 464 474 484 494
505 515 525 535 545 565 575 585 595
606 616 626 636 646 656 676 686 696
707 717 727 737 747 757 767 787 797
808 818 828 838 848 858 868 878 898
909 919 929 939 949 959 969 979 989
four digit:
1010 1212 1313 1414 1515 1616 1717 1818 1919
2020 2121 2323 2424 2525 2626 2727 2828 2929
3030 3131 3232 3434 3535 3636 3737 3838 3939
4040 4141 4242 4343 4545 4646 4747 4848 4949
5050 5151 5252 5353 5454 5656 5757 5858 5959
6060 6161 6262 6363 6464 6565 6767 6868 6969
7070 7171 7272 7373 7474 7575 7676 7878 7979
8080 8181 8282 8383 8484 8585 8686 8787 8989
9090 9191 9292 9393 9494 9595 9696 9797 9898
three digit primes:
101 131 151 181 191 313 353 373 383 727 757 787 797 919 929
600th: 4646464646
1125 undulating numbers below 2^53, the largest is 8989898989898989
```


---

<a id="rosetta/zeckendorf-number-representation"></a>


# Zeckendorf number representation

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Zeckendorf_number_representation

```ghul
use IO.Std.write_line
use Ghul.Pipes

fibonacci_up_to(limit: int) -> Pipe[int] is
    let smaller mut = 1
    let larger mut = 2

    do
        yield smaller

        if larger > limit then
            break
        fi

        let next = smaller + larger

        smaller = larger
        larger = next
    od
si

zeckendorf(n: int) -> string is
    let digits = System.Text.StringBuilder()
    let remaining mut = n

    for value in fibonacci_up_to(n) |> reverse() do
        if value <= remaining then
            digits.append('1')

            remaining = remaining - value
        elif digits.length > 0 then
            digits.append('0')
        fi
    od

    return if digits.length == 0 then "0" else digits.to_string() fi
si

for n in 0::20 do
    write_line("{n,2}: {zeckendorf(n)}")
od
```

output:

```
 0: 0
 1: 1
 2: 10
 3: 100
 4: 101
 5: 1000
 6: 1001
 7: 1010
 8: 10000
 9: 10001
10: 10010
11: 10100
12: 10101
13: 100000
14: 100001
15: 100010
16: 100100
17: 100101
18: 101000
19: 101001
20: 101010
```


---

<a id="rosetta/abc-problem"></a>


# ABC problem

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/ABC_problem

```ghul
use IO.Std.write_line
use Collections.List
use Ghul.Pipes

without(blocks: List[string], at: int) -> List[string] =>
    blocks
    |> index()
    |> filter(block => block.index != at)
    |> map(block => block.value)
    |> collect()

can_spell(word: string, blocks: List[string]) -> bool =>
    word.length == 0 \/
    (blocks
        |> index()
        |> filter(block => block.value.contains(word[0]))
        |> any(block =>
            can_spell(word.substring(1), blocks |> without(block.index))))

let blocks = [
    "BO", "XK", "DQ", "CP", "NA", "GT", "RE", "TG", "QD", "FS",
    "JW", "HU", "VI", "AN", "OB", "ER", "FS", "LY", "PC", "ZM"
]

let can_make_word = (word: string) => can_spell(word.to_upper(), blocks)

for word in ["A", "BARK", "BOOK", "TREAT", "COMMON", "SQUAD", "CONFUSE"] do
    write_line("can_make_word(\"{word}\") = {can_make_word(word)}")
od
```

output:

```
can_make_word("A") = True
can_make_word("BARK") = True
can_make_word("BOOK") = False
can_make_word("TREAT") = True
can_make_word("COMMON") = False
can_make_word("SQUAD") = True
can_make_word("CONFUSE") = True
```


---

<a id="rosetta/align-columns"></a>


# Align columns

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Align_columns

```ghul
use IO.Std.write_line
use Ghul.Pipes

union Alignment is
    LEFT
    RIGHT
    CENTRE
si

pad(word: string, width: int, alignment: Alignment) -> string =>
    case ► alignment
    when _: Alignment.LEFT then word.pad_right(width)
    when _: Alignment.RIGHT then word.pad_left(width)
    when _: Alignment.CENTRE then
        word
        .pad_left(word.length + (width - word.length) / 2)
        .pad_right(width)
    esac

line(row: string[], widths: int[], alignment: Alignment) -> string =>
    (row
     |> index()
     |> map(((column, word)) => pad(word, widths[column], alignment))
     |> join(" ")).trim_end()

let text = [
    "Given$a$text$file$of$many$lines,$where$fields$within$a$line$",
    "are$delineated$by$a$single$'dollar'$character,$write$a$program",
    "that$aligns$each$column$of$fields$by$ensuring$that$words$in$each$",
    "column$are$separated$by$at$least$one$space.",
    "Further,$allow$for$each$word$in$a$column$to$be$either$left$",
    "justified,$right$justified,$or$center$justified$within$its$column."
]

let rows =
    text
    |> map(line => line.trim_end('$').split(['$']))
    |> collect_array()

let columns =
    rows
    |> reduce(0, (widest, row) =>
        if row.count > widest then row.count else widest fi)

let widths =
    (0..columns)
    |> map(column =>
        rows
        |> filter(row => column < row.count)
        |> reduce(0, (widest, row) =>
            if row[column].length > widest then
                row[column].length
            else
                widest
            fi))
    |> collect_array()

for alignment in [Alignment.LEFT, Alignment.RIGHT, Alignment.CENTRE] do
    rows |> each(row => write_line(line(row, widths, alignment)))

    write_line("")
od
```

output:

```
Given      a          text       file   of     many      lines,     where    fields  within  a      line
are        delineated by         a      single 'dollar'  character, write    a       program
that       aligns     each       column of     fields    by         ensuring that    words   in     each
column     are        separated  by     at     least     one        space.
Further,   allow      for        each   word   in        a          column   to      be      either left
justified, right      justified, or     center justified within     its      column.

     Given          a       text   file     of      many     lines,    where  fields  within      a line
       are delineated         by      a single  'dollar' character,    write       a program
      that     aligns       each column     of    fields         by ensuring    that   words     in each
    column        are  separated     by     at     least        one   space.
  Further,      allow        for   each   word        in          a   column      to      be either left
justified,      right justified,     or center justified     within      its column.

  Given        a         text     file    of     many      lines,    where   fields  within    a    line
   are     delineated     by       a    single 'dollar'  character,  write      a    program
   that      aligns      each    column   of    fields       by     ensuring  that    words    in   each
  column      are     separated    by     at     least      one      space.
 Further,    allow       for      each   word     in         a       column    to      be    either left
justified,   right    justified,   or   center justified   within     its    column.
```


---

<a id="rosetta/camel-case-and-snake-case"></a>


# Camel case and snake case

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Camel_case_and_snake_case

```ghul
use IO.Std.write_line
use Collections.LIST
use Ghul.Pipes
use System.Text.StringBuilder

class NAME(words: Collections.List[string] private) is
    to_camel_case() -> string =>
        _words
            |> index()
            |> map(
                ((index, word)) =>
                    if index == 0 then
                        lower_first(word)
                    else
                        upper_first(word)
                    fi)
            |> join("")

    to_snake_case() -> string =>
        _words
            |> map(word => word.to_lower())
            |> join("_")
si

parse(text: string) -> NAME is
    let words = LIST[string]()
    let word = StringBuilder()

    for character in text.trim() do
        if character == '_' \/ character == '-' \/ character == ' ' then
            if word.length > 0 then
                words.add(word.to_string())
                word.clear()
            fi
        elif char.is_upper(character) /\ word.length > 0 then
            words.add(word.to_string())
            word.clear()
            word.append(character)
        else
            word.append(character)
        fi
    od

    if word.length > 0 then
        words.add(word.to_string())
    fi

    return NAME(words)
si

lower_first(word: string) -> string =>
    "{char.to_lower(word[0])}{word[1..<0]}"

upper_first(word: string) -> string =>
    "{char.to_upper(word[0])}{word[1..<0]}"

quoted(text: string) -> string => "\"{text}\""

let tests = [
    "snakeCase",
    "snake_case",
    "variable_10_case",
    "variable10Case",
    "ɛrgo rE tHis",
    "hurry-up-joe!",
    "c://my-docs/happy_ghūl-Day/12.doc",
    "  spaces  "
]

let column = 37

write_line(
    "{"input".pad_right(column)} "
    "{"snake case".pad_right(column)} camel case")

for test in tests do
    let name = parse(test)

    write_line(
        "{quoted(test).pad_right(column)} "
        "{quoted(name.to_snake_case()).pad_right(column)} "
        "{quoted(name.to_camel_case())}")
od
```

output:

```
input                                 snake case                            camel case
"snakeCase"                           "snake_case"                          "snakeCase"
"snake_case"                          "snake_case"                          "snakeCase"
"variable_10_case"                    "variable_10_case"                    "variable10Case"
"variable10Case"                      "variable10_case"                     "variable10Case"
"ɛrgo rE tHis"                        "ɛrgo_r_e_t_his"                      "ɛrgoRETHis"
"hurry-up-joe!"                       "hurry_up_joe!"                       "hurryUpJoe!"
"c://my-docs/happy_ghūl-Day/12.doc"   "c://my_docs/happy_ghūl_day/12.doc"   "c://myDocs/happyGhūlDay/12.doc"
"  spaces  "                          "spaces"                              "spaces"
```


---

<a id="rosetta/entropy"></a>


# Entropy

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Entropy

```ghul
use IO.Std.write_line
use Collections.MAP
use Ghul.Pipes
use System.Math

entropy(text: string) -> double is
    let counts = MAP[char, int]()

    for character in text do
        let seen mut = 0

        counts.try_get_value(character, seen ref)

        counts[character] = seen + 1
    od

    let total = cast double(text.length)

    return counts.values
        |> map(count => cast double(count) / total)
        |> reduce(0.0D, (bits, probability) =>
            bits - probability * Math.log2(probability))
si

let text = "1223334444"

write_line("{text}: {entropy(text)} bits/symbol")
```

output:

```
1223334444: 1.8464393446710154 bits/symbol
```


---

<a id="rosetta/jaro-similarity"></a>


# Jaro similarity

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Jaro_similarity

```ghul
use IO.Std.write_line
use Collections.LIST
use Collections.SET
use Ghul.Pipes
use System.Math

jaro(left: string, right: string) -> double is
    if left.length == 0 \/ right.length == 0 then
        return if left.length == right.length then 1.0D else 0.0D fi
    fi

    let window = Math.max(left.length, right.length) / 2 - 1
    let taken = SET[int]()
    let matched_left = LIST[char]()

    for i in 0..left.length do
        let first = Math.max(0, i - window)
        let last = Math.min(i + window + 1, right.length)

        for j in first..last do
            if !taken.contains(j) /\ left[i] == right[j] then
                taken.add(j)
                matched_left.add(left[i])
                break
            fi
        od
    od

    let match_count = matched_left.count

    if match_count == 0 then
        return 0.0D
    fi

    let matched_right =
        (0..right.length)
        |> filter(j => taken.contains(j))
        |> map(j => right[j])
        |> collect_list()

    let transposed =
        (0..match_count)
        |> filter(i => matched_left[i] != matched_right[i])
        |> count()

    let matches = cast double(match_count)
    let half_transpositions = cast double(transposed) / 2.0D

    return (matches / cast double(left.length) +
          matches / cast double(right.length) +
          (matches - half_transpositions) / matches) / 3.0D
si

[("MARTHA", "MARHTA"),
 ("DIXON", "DICKSONX"),
 ("JELLYFISH", "SMELLYFISH")]
    |> each(((left, right)) =>
        write_line("{left} / {right}: {jaro(left, right):F6}"))
```

output:

```
MARTHA / MARHTA: 0.944444
DIXON / DICKSONX: 0.766667
JELLYFISH / SMELLYFISH: 0.896296
```


---

<a id="rosetta/levenshtein-distance"></a>


# Levenshtein distance

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Levenshtein_distance

```ghul
use IO.Std.write_line
use Collections.LIST
use System.Math.min

levenshtein(source: string, target: string) -> int is
    let previous mut = LIST()

    for j in 0::target.length do
        previous.add(j)
    od

    for i in 1::source.length do
        let current = LIST()

        current.add(i)

        for j in 1::target.length do
            let same = source[i - 1] == target[j - 1]
            let substitution = previous[j - 1] + if same then 0 else 1 fi

            let insertion = previous[j] + 1
            let deletion = current[j - 1] + 1

            current.add(min(substitution, min(insertion, deletion)))
        od

        previous = current
    od

    return previous[target.length]
si

write_line("{levenshtein("kitten", "sitting")}")
write_line("{levenshtein("rosettacode", "raisethysword")}")
```

output:

```
3
8
```


---

<a id="rosetta/palindrome-detection"></a>


# Palindrome detection

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Palindrome_detection

```ghul
use IO.Std.write_line
use Ghul.Collections
use Ghul.Pipes

reverse(text: string) -> string =>
    text |> reduce("", (reversed, character) => "{character}{reversed}")

is_palindrome(text: string) -> bool => text =~ reverse(text)

is_inexact_palindrome(text: string) -> bool =>
    text
        |> filter(char.is_letter)
        |> map(char.to_lower)
        |> reduce("", (letters, character) => "{letters}{character}")
        |> is_palindrome()

test(
    maybe_palindrome: string,
    palindrome_check: string -> bool
) -> string =>
    if palindrome_check(maybe_palindrome) then
        "\"{maybe_palindrome}\" is a palindrome"
    else
        "\"{maybe_palindrome}\" is not a palindrome"
    fi

write_line(test("racecar", is_palindrome))
write_line(test("hello", is_palindrome))
write_line(test("rotor", is_palindrome))

write_line(test("A man, a plan, a canal: Panama", is_inexact_palindrome))
write_line(test("race car", is_inexact_palindrome))
write_line(test("hello world", is_inexact_palindrome))
```

output:

```
"racecar" is a palindrome
"hello" is not a palindrome
"rotor" is a palindrome
"A man, a plan, a canal: Panama" is a palindrome
"race car" is a palindrome
"hello world" is not a palindrome
```


---

<a id="rosetta/pangram-checker"></a>


# Pangram checker

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Pangram_checker

```ghul
use IO.Std.write_line
use Ghul.Pipes

is_pangram(sentence: string) -> bool =>
    sentence
        |> map(char.to_lower)
        |> filter(char.is_letter)
        |> distinct()
        |> count() == 26

write_line("{is_pangram("The quick brown fox jumps over the lazy dog")}")
write_line("{is_pangram("Hello, World!")}")
```

output:

```
True
False
```


---

<a id="rosetta/run-length-encoding"></a>


# Run-length encoding

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Run-length_encoding

```ghul
use IO.Std.write_line
use Ghul.Pipes

encode(text: string) -> string is
    let runs = System.Text.StringBuilder()
    let at mut = 0

    while at < text.length do
        let start = at

        while at < text.length /\ text[at] == text[start] do
            at = at + 1
        od

        runs.append(at - start)
        runs.append(text[start])
    od

    return runs.to_string()
si

decode(encoded: string) -> string is
    let text = System.Text.StringBuilder()
    let at mut = 0

    while at < encoded.length do
        let start = at

        while char.is_digit(encoded[at]) do
            at = at + 1
        od

        let count = int.parse(encoded.substring(start, at - start))

        text.append(encoded[at], count)

        at = at + 1
    od

    return text.to_string()
si

let input =
    "WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWW"
    "WWWWWWWWWWWWBWWWWWWWWWWWWWW"
let encoded = encode(input)

write_line("input:   {input}")
write_line("encoded: {encoded}")
write_line("decoded: {decode(encoded)}")
write_line("round trip restores the input: {decode(encoded) =~ input}")
```

output:

```
input:   WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWBWWWWWWWWWWWWWW
encoded: 12W1B12W3B24W1B14W
decoded: WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWBWWWWWWWWWWWWWW
round trip restores the input: True
```


---

<a id="rosetta/damm-algorithm"></a>


# Damm algorithm

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Damm_algorithm

```ghul
use IO.Std.write_line

let table = [
    "0317598642",
    "7092154863",
    "4206871359",
    "1750983426",
    "6123045978",
    "3674209581",
    "5869720134",
    "8945362017",
    "9438617205",
    "2581436790"
]

digit_value(digit: char) -> int => cast int(digit) - cast int('0')

valid(number: string) -> bool => (
    let interim mut = 0

    for digit in number do
        let row = table[interim]
        interim = digit_value(row[digit_value(digit)])
    od

    interim == 0
)

for sample in ["5724", "5727", "5857"] do
    let verdict = if valid(sample) then "valid" else "invalid" fi
    write_line("{sample} checksum {verdict}")
od
```

output:

```
5724 checksum valid
5727 checksum invalid
5857 checksum invalid
```


---

<a id="rosetta/dinesmans-multiple-dwelling-problem"></a>


# Dinesman's multiple-dwelling problem

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Dinesman's_multiple-dwelling_problem

```ghul
use IO.Std.write_line
use Collections.LIST
use Collections.List
use Ghul.Pipes

permutations(items: List[int]) -> Pipe[List[int]] is
    if items.count == 0 then
        yield LIST[int]()
    else
        for i in 0..items.count do
            let rest = LIST[int](items)

            rest.remove_at(i)

            for tail in permutations(rest) do
                let whole = LIST[int]()

                whole.add(items[i])

                for value in tail do
                    whole.add(value)
                od

                yield whole
            od
        od
    fi
si

adjacent(left: int, right: int) -> bool =>
    if left > right then left - right else right - left fi == 1

let floors = LIST[int]([1, 2, 3, 4, 5])

permutations(floors)
    |> map(order =>
        (baker = order[0], cooper = order[1], fletcher = order[2],
         miller = order[3], smith = order[4]))
    |> filter(floors => floors.baker != 5)
    |> filter(floors => floors.cooper != 1)
    |> filter(floors => floors.fletcher != 1 /\ floors.fletcher != 5)
    |> filter(floors => floors.miller > floors.cooper)
    |> filter(floors => !adjacent(floors.smith, floors.fletcher))
    |> filter(floors => !adjacent(floors.fletcher, floors.cooper))
    |> each(floors => (
        write_line("Baker lives on floor {floors.baker}")
        write_line("Cooper lives on floor {floors.cooper}")
        write_line("Fletcher lives on floor {floors.fletcher}")
        write_line("Miller lives on floor {floors.miller}")
        write_line("Smith lives on floor {floors.smith}")
    ))
```

output:

```
Baker lives on floor 3
Cooper lives on floor 2
Fletcher lives on floor 4
Miller lives on floor 5
Smith lives on floor 1
```


---

<a id="rosetta/forward-difference"></a>


# Forward difference

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Forward_difference

```ghul
use IO.Std.write_line
use Collections
use Ghul.Pipes

differences(xs: List[int]) -> List[int] =>
    zip(xs[1..<0], xs[0..<1])
    |> map(((next, current)) => next - current)
    |> collect_list()

forward(order: int, xs: List[int]) -> List[int] =>
    if order == 0 then xs
    else forward(order - 1, differences(xs))
    fi

let xs: List[int] = [90, 47, 58, 29, 22, 32, 55, 5, 55, 73]

for order in 0..xs.count do
    write_line("order {order}: {forward(order, xs) |> join(", ")}")
od
```

output:

```
order 0: 90, 47, 58, 29, 22, 32, 55, 5, 55, 73
order 1: -43, 11, -29, -7, 10, 23, -50, 50, 18
order 2: 54, -40, 22, 17, 13, -73, 100, -32
order 3: -94, 62, -5, -4, -86, 173, -132
order 4: 156, -67, 1, -82, 259, -305
order 5: -223, 68, -83, 341, -564
order 6: 291, -151, 424, -905
order 7: -442, 575, -1329
order 8: 1017, -1904
order 9: -2921
```


---

<a id="rosetta/huffman-coding"></a>


# Huffman coding

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Huffman_coding

```ghul
use IO.Std.write_line
use Collections.LIST
use Collections.List
use Collections.MAP
use Ghul.Pipes

union Huffman(weight: int) is
    LEAF(symbol: char, ..)
    NODE(left: Huffman, right: Huffman, ..)
si

use Huffman.LEAF
use Huffman.NODE

take_lightest(pending: LIST[Huffman]) -> Huffman is
    let at mut = 0

    for i in 1..pending.count do
        if pending[i].weight < pending[at].weight then
            at = i
        fi
    od

    let lightest = pending[at]

    pending.remove_at(at)

    return lightest
si

build_tree(leaves: List[Huffman]) -> Huffman is
    let pending = LIST[Huffman](leaves)

    while pending.count > 1 do
        let first = take_lightest(pending)
        let second = take_lightest(pending)

        pending.add(NODE(first, second, first.weight + second.weight))
    od

    return pending[0]
si

codes(node: Huffman, prefix: string)
    -> Pipe[(symbol: char, weight: int, code: string)]
is
    if let leaf: LEAF = ► node then
        let code = if prefix.length == 0 then "0" else prefix fi

        yield (symbol = leaf.symbol, weight = leaf.weight, code = code)
    elif let branch: NODE = ► node then
        yield in codes(branch.left, "{prefix}0")
        yield in codes(branch.right, "{prefix}1")
    fi
si

let text = "this is an example for huffman encoding"

let weights = MAP[char, int]()

for character in text do
    let seen mut = 0

    weights.try_get_value(character, seen ref)

    weights[character] = seen + 1
od

let leaves = LIST[Huffman]()

for symbol in weights.keys |> sort() do
    leaves.add(LEAF(symbol, weights[symbol]))
od

let table =
    codes(build_tree(leaves), "")
    |> sort((left, right) =>
        if left.weight != right.weight then
            right.weight - left.weight
        else
            cast int(left.symbol) - cast int(right.symbol)
        fi)
    |> collect_list()

write_line("symbol  weight  code")

for entry in table do
    let symbol = "'{entry.symbol}'"

    write_line("{symbol,-6}  {entry.weight,6}  {entry.code}")
od
```

output:

```
symbol  weight  code
' '          6  101
'n'          4  000
'a'          3  1001
'e'          3  1100
'f'          3  1101
'i'          3  1110
'h'          2  11111
'm'          2  0010
'o'          2  0011
's'          2  0100
'c'          1  01010
'd'          1  01011
'g'          1  01100
'l'          1  01101
'p'          1  01110
'r'          1  01111
't'          1  10000
'u'          1  10001
'x'          1  11110
```


---

<a id="rosetta/josephus-problem"></a>


# Josephus problem

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Josephus_problem

## Who survives

```ghul
use IO.Std.write_line

survivor(n: int, k: int) -> int =>
    if n == 1 then 0 else (survivor(n - 1, k) + k) % n fi

write_line(
    "41 prisoners, every 3rd killed: prisoner {survivor(41, 3)} survives")

write_line(
    "5 prisoners, every 2nd killed:  prisoner {survivor(5, 2)} survives")
```

output:

```
41 prisoners, every 3rd killed: prisoner 30 survives
5 prisoners, every 2nd killed:  prisoner 2 survives
```

## The killing sequence

```ghul
use IO.Std.write_line
use Ghul.Pipes

killings(n: int, k: int) -> Pipe[int] is
    let standing = (0..n) |> collect_list()
    let at mut = 0

    while standing.count > 1 do
        at = (at + k - 1) % standing.count

        yield standing[at]

        standing.remove_at(at)
    od
si

show(n: int, k: int) is
    let killed = killings(n, k) |> collect_list()

    write_line("n = {n}, k = {k}: killed {killed |> join(", ")}")
si

show(5, 2)
show(7, 3)
```

output:

```
n = 5, k = 2: killed 1, 3, 0, 4
n = 7, k = 3: killed 2, 5, 1, 6, 4, 0
```


---

<a id="rosetta/non-continuous-subsequences"></a>


# Non-continuous subsequences

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Non-continuous_subsequences

```ghul
use IO.Std.write_line
use Collections.LIST
use Ghul.Pipes

let elements = [1, 2, 3, 4]

selected(mask: int) -> LIST[int] =>
    (0..elements.count)
        |> filter(index => (mask & (1 << index)) != 0)
        |> map(index => elements[index])
        |> collect_list()

continuous(chosen: LIST[int]) -> bool =>
    chosen[chosen.count - 1] - chosen[0] + 1 == chosen.count

(1..(1 << elements.count))
    |> map(selected)
    |> filter(chosen => chosen.count > 1 /\ !continuous(chosen))
    |> map(chosen => chosen |> join(", "))
    |> each(line => write_line(line))
```

output:

```
1, 3
1, 4
2, 4
1, 2, 4
1, 3, 4
```


---

<a id="rosetta/power-set"></a>


# Power set

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Power_set

```ghul
use IO.Std.write_line
use Collections.Iterable
use Collections.List
use Collections.LIST
use Ghul.Pipes

power_set[T](values: List[T]) -> LIST[LIST[T]] is
    if values.count == 0 then
        let empty: LIST[LIST[T]] = _()

        empty.add(LIST[T]())

        return empty
    fi

    let first = values[0]
    let result: LIST[LIST[T]] = _()

    for subset in power_set(values |> skip(1) |> collect()) do
        let with_first: LIST[T] = _()

        with_first.add(first)
        with_first.add_range(subset)

        result.add(subset)
        result.add(with_first)
    od

    return result
si

braced[T](values: Iterable[T]) -> string => "{{{values |> join(", ")}}}"

show[T](sets: LIST[LIST[T]]) -> string =>
    braced(sets |> map(subset => braced(subset)))

write_line(show(power_set(LIST[int]())))
write_line(show(power_set([1, 2, 3] |> collect())))
write_line(show(power_set(["a", "b"] |> collect())))
```

output:

```
{{}}
{{}, {1}, {2}, {1, 2}, {3}, {1, 3}, {2, 3}, {1, 2, 3}}
{{}, {a}, {b}, {a, b}}
```


---

<a id="rosetta/smith-waterman-algorithm"></a>


# Smith–Waterman algorithm

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Smith–Waterman_algorithm

```ghul
use IO.Std.write_line
use Collections.LIST
use Ghul.Pipes

score(first: char, second: char) -> int =>
    if first == second then 2 else -1 fi

gap() -> int => -2

highest(values: int[]) -> int =>
    values
    |> reduce(0, (best, value) => if value > best then value else best fi)

matrix(first: string, second: string) -> LIST[LIST[int]] is
    let scores = LIST[LIST[int]]()

    for i in 0::first.length do
        let row = LIST[int]()

        for j in 0::second.length do
            row.add(0)
        od

        scores.add(row)
    od

    for i in 1::first.length do
        for j in 1::second.length do
            scores[i][j] =
                highest([
                    0,
                    scores[i - 1][j - 1] +
                        score(first[i - 1], second[j - 1]),
                    scores[i - 1][j] + gap(),
                    scores[i][j - 1] + gap()
                ])
        od
    od

    return scores
si

best_cell(scores: LIST[LIST[int]]) -> (row: int, column: int) is
    let row mut = 0
    let column mut = 0

    for i in 0..scores.count do
        for j in 0..scores[i].count do
            if scores[i][j] > scores[row][column] then
                row = i
                column = j
            fi
        od
    od

    return (row = row, column = column)
si

trace(
    first: string,
    second: string,
    scores: LIST[LIST[int]]
) -> (a_aligned: string, b_aligned: string, path: string) is
    let (row, column) = best_cell(scores)

    let i mut = row
    let j mut = column

    let top = LIST[char]()
    let bottom = LIST[char]()
    let cells = LIST[string]()

    while i > 0 /\ j > 0 /\ scores[i][j] > 0 do
        cells.add("({i},{j})")

        let diagonal =
            scores[i - 1][j - 1] + score(first[i - 1], second[j - 1])

        if scores[i][j] == diagonal then
            top.add(first[i - 1])
            bottom.add(second[j - 1])

            i = i - 1
            j = j - 1
        elif scores[i][j] == scores[i - 1][j] + gap() then
            top.add(first[i - 1])
            bottom.add('-')

            i = i - 1
        else
            top.add('-')
            bottom.add(second[j - 1])

            j = j - 1
        fi
    od

    top.reverse()
    bottom.reverse()
    cells.reverse()

    return (
        a_aligned = string(top.to_array()),
        b_aligned = string(bottom.to_array()),
        path = cells |> join(" ")
    )
si

show(first: string, second: string) is
    let scores = matrix(first, second)
    let (row, column) = best_cell(scores)
    let (a_aligned, b_aligned, path) = trace(first, second, scores)

    write_line("sequences: {first} and {second}")
    write_line("highest score: {scores[row][column]}")
    write_line("aligned: {a_aligned}")
    write_line("         {b_aligned}")
    write_line("path: {path}")
    write_line("")
    let heading =
        second |> map(character => "{character}".pad_left(3)) |> join("")

    write_line("       {heading}")

    for i in 0::first.length do
        let label = if i == 0 then " " else "{first[i - 1]}" fi

        let row =
            scores[i] |> map(value => "{value}".pad_left(3)) |> join("")

        write_line("  {label} {row}")
    od
si

show("ACACACTA", "AGCACACA")
```

output:

```
sequences: ACACACTA and AGCACACA
highest score: 10
aligned: ACACA
         ACACA
path: (1,4) (2,5) (3,6) (4,7) (5,8)

         A  G  C  A  C  A  C  A
      0  0  0  0  0  0  0  0  0
  A   0  2  0  0  2  0  2  0  2
  C   0  0  1  2  0  4  2  4  2
  A   0  2  0  0  4  2  6  4  6
  C   0  0  1  2  2  6  4  8  6
  A   0  2  0  0  4  4  8  6 10
  C   0  0  1  2  2  6  6 10  8
  T   0  0  0  0  1  4  5  8  9
  A   0  2  0  0  2  2  6  6 10
```


---

<a id="rosetta/sorting-algorithms-quicksort"></a>


# Sorting algorithms/Quicksort

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Sorting_algorithms/Quicksort

```ghul
use IO.Std.write_line
use Collections.List
use Ghul.Pipes

quicksort[T: Ghul.Comparable[T]](values: List[T]) -> List[T] =>
    if values.count <= 1 then
        values
    else
        let pivot = values[0]
        let rest = values[1..<0]

        let below = rest |> filter(value => value < pivot) |> collect()
        let above = rest |> filter(value => value >= pivot) |> collect()

        quicksort(below)
            |> cat([pivot])
            |> cat(quicksort(above))
            |> collect()
    fi

write_line("{$quicksort([6, 2, 9, 2, 5, 1, 8, 3] |> collect())}")
write_line("{$quicksort(["pear", "apple", "fig", "date"] |> collect())}")
```

output:

```
[1, 2, 2, 3, 5, 6, 8, 9]
[apple, date, fig, pear]
```


---

<a id="rosetta/topswops"></a>


# Topswops

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Topswops

```ghul
use IO.Std.write_line
use Collections

swaps(deck: int[]) -> int => (
    let cards = LIST()

    for card in deck do
        cards.add(card)
    od

    let count mut = 0

    while cards[0] != 1 do
        let top_card = cards[0]
        let last = top_card - 1

        for i in 0::(top_card - 1) / 2 do
            let held = cards[i]

            cards[i] = cards[last - i]
            cards[last - i] = held
        od

        count = count + 1
    od

    count
)

topswops(n: int) -> int => (
    let deck = LIST()

    for card in 1::n do
        deck.add(card)
    od

    let best mut = 0

    let search = (position: int) -> void rec is
        if position == n then
            let rounds = swaps(deck.to_array())

            if rounds > best then
                best = rounds
            fi
        else
            for i in position::(n - 1) do
                let held = deck[position]

                deck[position] = deck[i]
                deck[i] = held

                rec(position + 1)

                let put_back = deck[position]

                deck[position] = deck[i]
                deck[i] = put_back
            od
        fi
    si

    search(0)

    best
)

for n in 1::10 do
    write_line("{n}: {topswops(n)}")
od
```

output:

```
1: 0
2: 1
3: 2
4: 4
5: 7
6: 10
7: 16
8: 22
9: 30
10: 38
```


---

<a id="rosetta/water-collected-between-towers"></a>


# Water collected between towers

The same solution is posted on Rosetta Code: https://rosettacode.org/wiki/Water_collected_between_towers

```ghul
use IO.Std.write_line
use Collections.Iterable
use Ghul.Pipes
use System.Math

running_maxima(heights: Iterable[int]) -> Pipe[int] is
    let highest mut = 0

    for height in heights do
        highest = Math.max(highest, height)

        yield highest
    od
si

water(heights: int[]) -> int => (
    let left = running_maxima(heights) |> collect_list()
    let right =
        running_maxima(heights |> reverse()) |> collect_list()
    let last = heights.count - 1

    (0..heights.count)
    |> map(i => Math.min(left[i], right[last - i]) - heights[i])
    |> reduce(0, (total, depth) => total + depth)
)

let series: int[][] =
    [[1, 5, 3, 7, 2],
     [5, 3, 7, 2, 6, 4, 5, 9, 1, 2],
     [2, 6, 3, 5, 2, 8, 1, 4, 2, 2, 5, 3, 5, 7, 4, 1],
     [5, 5, 5, 5],
     [5, 6, 7, 8],
     [8, 7, 7, 6],
     [6, 7, 10, 7, 6]]

series |> each((towers: int[]) =>
    write_line("{towers |> join(", ")} -> {water(towers)}"))
```

output:

```
1, 5, 3, 7, 2 -> 2
5, 3, 7, 2, 6, 4, 5, 9, 1, 2 -> 14
2, 6, 3, 5, 2, 8, 1, 4, 2, 2, 5, 3, 5, 7, 4, 1 -> 35
5, 5, 5, 5 -> 0
5, 6, 7, 8 -> 0
8, 7, 7, 6 -> 0
6, 7, 10, 7, 6 -> 0
```
