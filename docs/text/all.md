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
- [language basics](#language-basics) - https://ghul.dev/language-basics
- [optional types](#optional-types) - https://ghul.dev/optional-types
- [unions and pattern matching](#unions-and-pattern-matching) - https://ghul.dev/unions-and-pattern-matching
- [type narrowing](#type-narrowing) - https://ghul.dev/type-narrowing
- [expression oriented programming](#expression-oriented-programming) - https://ghul.dev/expression-oriented-programming
- [functional programming](#functional-programming) - https://ghul.dev/functional-programming
- [object oriented programming](#object-oriented-programming) - https://ghul.dev/object-oriented-programming
- [generics](#generics) - https://ghul.dev/generics
- [type inference](#type-inference) - https://ghul.dev/type-inference
- [async and generators](#async-and-generators) - https://ghul.dev/async-and-generators
- [.NET integration](#dotnet-integration) - https://ghul.dev/dotnet-integration
- [runtime library](#runtime-library) - https://ghul.dev/runtime-library
- [tooling](#tooling) - https://ghul.dev/tooling
- [syntax](#syntax) - https://ghul.dev/syntax
- [definitions](#definitions) - https://ghul.dev/definitions
- [expressions](#expressions) - https://ghul.dev/expressions
- [control flow](#control-flow) - https://ghul.dev/control-flow
- [narrowing in depth](#narrowing-in-depth) - https://ghul.dev/narrowing-in-depth
- [grammar](#grammar) - https://ghul.dev/grammar
- [known issues](#known-issues) - https://ghul.dev/known-issues
- [implementation](#implementation) - https://ghul.dev/implementation
- [history](#history) - https://ghul.dev/history
- [resources](#resources) - https://ghul.dev/resources

---

<a id="index"></a>


#  ghūl programming language

<img class="ghul-logo" src="/ghul-logo-draft.png" alt="ghūl programming language logo" />

> - The ghūl language, compiler, tools, and this website are all very much a **work-in-progress**.
> - Whatever the [ghūl compiler](https://github.com/degory/ghul) accepts is currently the definitive ghūl language reference.
> - ghūl is pronounced 'ghoul'.

## why ghūl?

Why not 🤔

ghūl is mainly an opportunity for [me](https://github.com/degory) to experiment with programming language design. Apart from a slightly quirky syntax, ghūl is a fairly conventional programming language. Although ghūl is a hobby project maintained by a single person, its goal is to be sufficiently expressive for general-purpose development: the [ghūl compiler](https://github.com/degory/ghul) itself is written in ghūl.

## examples

> **editable examples**
>
> Every example on this site is editable: click the pencil to open it in an editor, change it, and run it in your browser. Output and any compiler errors appear in the panel beneath.
>
> Nothing you edit is saved. To keep something, paste it into the [ghūl scratchpad](https://github.com/degory/ghul-scratchpad)'s `main.ghul`: a one-file project that opens in a GitHub Codespace with the compiler ready, or that you can clone on your own machine. For a project of your own, start from the [repository template](https://github.com/degory/ghul-repository-template).

### hello world!

```ghul
IO.Std.write_line("hello, world");
```

output:

```
hello, world
```

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


---

<a id="getting-started"></a>

# getting started

Three things get you writing ghūl: an editor, the .NET SDK, and some ghūl code to start from. The compiler is not on the list - a ghūl repository pins it as a local .NET tool, so it arrives with the code.

## prerequisites

Two things to have in place before the code: an editor, and the .NET SDK.

### an editor

[Visual Studio Code](https://code.visualstudio.com) with the [ghūl language extension](https://marketplace.visualstudio.com/items?itemName=degory.ghul) gives you errors and warnings as you type, completion, hover, go to definition, rename and formatting.

The extension is an ordinary Visual Studio Code extension, so any editor that can install VS Code extensions gets ghūl support out of the box. Other editors can drive the underlying language server directly - see [other editors](https://ghul.dev/tooling.html#other-editors) on the tooling page.

### the .NET SDK

ghūl is hosted on .NET: the compiler runs on the [.NET 10 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/10.0), and the assemblies it produces target .NET 10.

You can skip installing anything locally: the repositories below ship a dev container, so opening one in a GitHub Codespace, or in VS Code with the Dev Containers extension, gives you the SDK, the compiler and the language extension ready to go.

## some ghūl code

- Every example on this site can be edited and run directly in your browser.
- The [ghūl scratchpad](https://github.com/degory/ghul-scratchpad) is a minimal one-file project: open it in a Codespace or clone it, paste any example from this site into `main.ghul`, and `dotnet run`.
- The [examples repository](https://github.com/degory/ghul-examples) has fuller, runnable examples organised by topic.

Both repositories pin the ghūl compiler as a local .NET tool, so there is nothing separate to install: `dotnet tool restore` fetches it, and the dev containers run that for you.

## it's all ordinary .NET

A ghūl project is a normal .NET SDK project. In either repository you'll find a `.ghulproj` - an MSBuild project file with the usual things in it - and the normal `dotnet` commands work as you'd expect:

```bash
dotnet build
dotnet run
dotnet test
dotnet pack
```

A ghūl project can reference NuGet packages, produce libraries or executables, and be packed and published exactly like a C# project.

To start a project of your own - from a template, from the repository template, or from scratch - see [creating a project](https://ghul.dev/tooling.html#creating-a-project) on the tooling page.


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
let my_variable = 42;

print_something(thing: string) is
    write_line("The thing is: {thing}");
si

print_something("a hello");

class PERSON is
    name: string;
    age: int;
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
let x = 10;

// expression used as part of a declaration statement
let y = x * 2;

// 'if' is a statement, 'x > 5' is an expression
if x > 5 then
    write_line("x is greater than 5");
fi

// 'if' can also be used as an expression
let z = if x > 5 then x else y fi;
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
    write_line("Hello, {name}!");
si
```

Functions can also have an expression body using `=>` instead of `is` / `si`:
```ghul
square(x: int) -> int => x * x;
```

### control flow
ghūl supports various [control flow constructs](https://ghul.dev/control-flow.html) like `if`, `else`, `while`, `for`, and `case` expressions.

```ghul
…
if x > 0 then
    write_line("Positive");
elif x < 0 then
    write_line("Negative");
else
    write_line("Zero");
fi

for item in my_list do
    process(item);
od
```

output:

```
Positive
```

### types

ghūl is statically typed, with some support for [type inference](https://ghul.dev/type-inference.html). Types can be explicitly specified using a colon `:` plus a type expression

```ghul
let x: int = 42;
let y = "Hello";
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
let my_int: int = 42;
let my_float: double = 3.14d;
let my_decimal: decimal = 19.99m;
let my_bool: bool = true;
let my_char: char = 'A';
```
These types are used to represent basic values in ghūl programs.

### arrays

ghūl supports arrays, which are fixed-size, **read-only** collections of elements of the same type. Array types are denoted using square brackets [] after the element type.

```ghul
let numbers: int[] = [1, 2, 3];
```

Arrays can be constructed with an [array literal](https://ghul.dev/expressions.html#array)
```ghul
let primes = [2, 3, 5, 7, 11];
```

Array elements can be read with indexer syntax
```ghul
…
let p = primes[i];
```

### tuples
Tuples in ghūl are lightweight, immutable data structures that can hold a fixed number of elements of different types. Tuple types use parentheses `(` `)`, with elements separated by commas. Tuple literals are similarly constructed with `(` `)` and comma delimited elements. Tuples compare by structural equality: two tuples are equal when their corresponding elements are.

```ghul
let point: (int, int) = (10, 20);
let person: (string, int) = ("Alice", 30);
```

Tuple elements can be accessed using the dot `.` notation followed by the element name:

```ghul
…
let x = point.`0;
let y = point.`1;
let name = person.`0;
let age = person.`1;
```

Tuple elements can be given more descriptive names, either in the type or in the tuple literal:
```ghul
let point: (x: int, y: int) = (10, 20);
let person = (name = "Alice", age = 30);
let x = point.x;
let y = point.y;
let name = person.name;
let age = person.age;
```

ghūl also supports tuple destructuring:
```ghul
…
let (a, b) = point;
let (name, age) = person;
```

Destructuring also has a by-name form, `(local = field, ...)`, that pulls each element from a named field rather than by position; the positional and by-name forms are covered with [pattern matching](https://ghul.dev/control-flow.html#if-let).

### optional types

A type followed by `?` is an **optional** type: a value of `T?` can be present or absent. The same type written without the `?` is non-optional, and a non-optional value is always there.

```ghul
let ► name: string? = "Alice"; // present
let nickname: string? = null; // absent
```

The postfix `?` operator tests whether an optional has a value. A plain `if x?` narrows `x` to its non-optional form inside the branch, so the value reads directly:

```ghul
…
if ► name? then
    write_line("name is {name}"); // name is non-optional here
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
let title: string = maybe;
```

diagnostics:

- error: string? is not assignable to string
- warning: [non-optional] string expected but maybe may not hold a value

To pass a `T?` where a `T` is wanted, make the value present first: narrow it with `if x?` or `if let` (see [control flow](https://ghul.dev/control-flow.html#if-let)), assert it with `x!` (which throws when absent), or supply a fallback with `x ?? other`. Optional types work for reference and value types alike - and beyond those two, for generic code that doesn't know which one it has, and for user-defined types that never mention `T?` at all. The [optional types](https://ghul.dev/optional-types) page covers all of that, along with the `??` and `?.` operators and the warnings that keep optional handling honest.

### type conversions

ghūl does not perform implicit type conversion (coercion) between scalar types; all scalar type conversions must be explicitly cast. However, ghūl supports polymorphic behavior by allowing upcasting, where instances of derived classes or interfaces can be automatically coerced to compatible ancestor types in the class/interface hierarchy.

```ghul
// OK: both addends are type double
let d = 1.0d + 1.0d;

// compile time error: addends are mixed types
// (double vs int)
let e = 1.0d + 1;

// OK with explicit cast
let e = 1.0d + cast double(1);

// OK: "hello" is a string, and string derives
// from object
let o: object = "hello";
```

## variables

ghūl has three kinds of variables: locals declared within the body of a function or method, function or method arguments and variables captured by a function literal.

### locals

Local variables are declared with `let` followed by the variable name, an optional explicit type, and an initializer:

```ghul
let i = 1234;
let j: int = 0;
let k: int = 5678;
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
let integer_literal = 42;
let floating_point_literal = 3.14;
let string_literal = "Hello, world!";
let boolean_literal_true = true;
let boolean_literal_false = false;
```

## operators and expressions
### arithmetic operators
```ghul
let add = 1 + 2;
let sub = 3 - 1;
let mul = 3 * 3;
let div = 12 / 3;
let mod = 13 % 4;
```

### comparison and logical operators
```ghul
let gt = 3 > 1; // true
let gte = 4 >= 4; // true
let lt = 3 < 1; // false
let lte = 4 <= 4; // true
let eq = 1 == 2; // false
let neq = 1 != 2; // true
```

```ghul
let list = [1, 2, 3];

let index = 4;
let search_value = 3;

// false
let and_then =
    index < list.count /\ list[index] == search_value;

// true
let or_else =
    index >= list.count \/ list[index] != search_value;
```

### bitwise and shift operators

The integer types have the usual bitwise operators - `&`, `|`, `^` - and the shift operators `<<` and `>>`. A shift count is an `int`, and the result keeps the left operand's type. The count is taken modulo the operand's width, following .NET: shifting an `int` by 32 is the same as shifting it by 0. `>>>` is the unsigned right shift: it shifts zeros into the leftmost bits where `>>` keeps the sign:

```ghul
…
bitwise(a: int, b: int) is
    write_line("{a & b} {a | b} {a ^ b}");

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
let i mut = 0;
let j = 10;
let s mut = "Hello";

i = i + j;
s = "{s} World!";

thing.property = i + j;

write_line("i = {i}, s = {s}, thing.property = {thing.property}");
```

output:

```
i = 10, s = Hello World!, thing.property = 20
```


---

<a id="optional-types"></a>

# optional types

A type followed by `?` is an *optional* type: a value of `T?` can be present or absent, and the same type without the `?` is non-optional. The [language basics](https://ghul.dev/language-basics.html#optional-types) page introduces the presence test `?` and the assignability rule; the operators work the same whatever `T` is. ghūl backs `T?` with whichever of three representations fits `T`, and picks it silently; all three behave alike.

```ghul
…
// one feature, T?, however T turns out to be represented
find_first[T](xs: T[], predicate: T -> bool) -> T? is
    for x in xs do
        if predicate(x) then
            return x;
        fi
    od

    return null;
si

let first_even = find_first([1, 3, 4, 7, 8], n => n % 2 == 0);    // T = int, a value type
let first_long = find_first(["a", "bb", "ccc"], s => s.length > 2); // T = string, a reference type

write_line("first even: {first_even ?? -1}");
write_line("first long: {first_long ?? "none"}");
```

output:

```
first even: 4
first long: ccc
```

`find_first` doesn't know or care whether `T` is `int` or `string`; the same `T?`, the same `??` fallback, work either way.

## `T?`: one feature, three representations

### reference types

The common case: `T?` over a class or other reference type is a plain nullable reference, and absence is `null`.

```ghul
let ► name: string? = "Alice"; // present
let nickname: string? = null; // absent
```
```ghul
…
if ► name? then
    write_line("name is {name}"); // name is non-optional here
fi
```

output:

```
name is Alice
```

### value types

`T?` over a value type - `int?`, or a struct - is backed by .NET's `Nullable<T>` at the IL level. That is nothing you need to work with directly: write `T?`, the same way you would for a reference type. A ghūl `int?` already is a `Nullable<int>` as far as the runtime is concerned, so it passes to and from non-ghūl .NET code as it is, and there is no reason to name `System.Nullable[T]` in ghūl source:

```ghul
let ► here: int? = 42;   // present
let gone: int? = null; // absent
```

### unconstrained generic types

A generic function or type can use `T?` before anything is known about whether `T` will turn out to be a reference or a value type:

```ghul
…
// a generic type can hold a T? field before T is known
class SLOT[T] is
    _stored: T?;

    init() is si

    put(value: T) is ► _stored = value; si

    take() -> T? is
        let result = _stored;
        _stored = null;
        return result;
    si
si

let s = SLOT[int]();
s.put(42);
write_line("{s.take() ?? -1}");
write_line("{s.take() ?? -1}");
```

output:

```
42
-1
```

Behind the scenes an unconstrained `T?` lowers to `Ghul.MAYBE[T]`, a struct that can hold present or absent for any `T`. Like the other two representations it is an implementation detail: there is no reason to name `MAYBE[T]` in your own code. See [generics](https://ghul.dev/generics) for how the type parameters themselves work.

### they interconvert

Because all three are the same feature, they behave alike: `??` chains across them, `if x?` and `if let` narrow them the same way, and a non-optional `T` widens to any of them without ceremony. Which one backs a given `T?` is an implementation detail you don't need to track.

```ghul
…
if ► maybe? then
    let narrowed: string = maybe; // narrowed to string here
    write_line(narrowed);
fi

let forced: string = ► maybe!;            // asserts present, throws if absent
let safe: string = maybe ?? "fallback"; // falls back when absent
```

output:

```
found
```

## the operators

The `??` operator supplies a fallback: `a ?? b` is `a` when it is present, otherwise `b`, and `b` is evaluated only when needed. It is right-associative, so `a ?? b ?? c` tries each in turn, and the result stays optional until a non-optional value closes the chain:

```ghul
…
let name = lookup();
let greeting = "hello, {name ?? "stranger"}";
write_line(greeting);
```

output:

```
hello, stranger
```

The `?.` operator reads a member only when the receiver is present: `a?.b` is `b` when `a` is present; otherwise the result is absent. The result is always optional, and `?.` chains, so a whole access path folds down to one optional. Method calls compose the same way: `a?.foo(args)` calls `foo` on a present receiver; otherwise the result is absent, with the argument expressions included in the short-circuit, so they are not evaluated when `a` is absent.

The postfix `!` asserts presence and reads the value out; applied to an absent optional it throws. Inside a branch where flow analysis has proven presence, the compiler reports a redundancy warning instead.

```ghul
…
let p = find();
let name = p?.name; // string? - absent when p is absent
write_line("name: {name ?? "unknown"}");
```

output:

```
name: unknown
```

## the warnings

Reading a member through an optional not known to be present is reported with a `null-deref` warning; `x?.y`, `x.has_value`, `x!`, and `if let` are the warning-free routes. Applying `!`, `?`, or `?.` to a value already known to be present warns that the operator is redundant, and `!` on a value that was never optional is an error. Each warning has a slug you can silence with `@suppress("<slug>")` per declaration, per file, or across the project.

## which one to use

- Holding optional data in your own code: write `T?`. Don't think about which of the three representations you're getting - that's the point of the unification.
- Writing a generic function or type that needs to hold "maybe a `T`" for an unconstrained `T`: `T?` works there too, and nothing more is needed.
- Modelling something with more shape than "present or absent" - success-with-a-value versus failure-with-a-reason, for instance - use a union with a `default` variant: the same `?` and `!`, plus exhaustive `case` matching over every outcome; see [optional-shaped types](#optional-shaped-types) below.

## optional-shaped types

A named type of your own can support `?` and `!` without being a `T?`. It keeps its own name and doesn't interconvert with `T?` - what it opts in to is the operators, not the spelling. There are two routes.

A union where exactly one variant has fields, or with one variant marked `default`, is option-shaped: `?` tests whether the union holds that variant, and `!` unwraps its payload (or the whole variant, if it has more than one field). The [unions and pattern matching](https://ghul.dev/unions-and-pattern-matching.html) page builds an `Option[T]` from scratch; the same rule covers the two-variant shape most languages call `Result` - `OK` marked `default`, `ERROR` holding the failure:

```ghul
…
union Result[T, E] is
    OK(value: T) default;
    ERROR(error: E);
si

divide(a: int, b: int) -> Result[int, string] =>
    if b == 0 then
        Result.ERROR("division by zero")
    else
        Result.OK(a / b)
    fi;

let good = divide(10, 2);
let bad = divide(10, 0);

if ► good? then
    write_line("10 / 2 = {good!}");
fi

if ! ► bad? then
    write_line("10 / 0 failed");
fi
```

output:

```
10 / 2 = 5
10 / 0 failed
```

And a type that exposes `has_value: bool` and `value: T` properties is treated as optional-shaped structurally, with no declaration required: `?` consults `has_value`, and on a struct `!` reads out `value`. `Ghul.MAYBE[T]` satisfies this by construction; so does a type you write yourself:

```ghul
…
// no declared relationship to T? or Ghul.Maybe[T] - ghūl looks for
// has_value and value structurally
struct PERCENTAGE is
    has_value: bool;
    value: double;

    init() is
        has_value = false;
        value = _;
    si

    init(v: double) is
        has_value = true;
        value = v;
    si
si

let full = PERCENTAGE(87.5d);
let empty = PERCENTAGE();

if full? then
    write_line("full: {full!}%");
fi

if !empty? then
    write_line("empty has no reading");
fi
```

output:

```
full: 87.5%
empty has no reading
```


---

<a id="unions-and-pattern-matching"></a>

# unions and pattern matching

> **editable examples**
>
> Every example on this page can be edited and run here: click the pencil to open it in an editor, change it, and run it in your browser. Errors, hovers and completions come from the ghūl compiler as you type.
>
> The ghul-examples repository has fuller [unions](https://github.com/degory/ghul-examples/tree/main/examples/unions) and [pattern-matching](https://github.com/degory/ghul-examples/tree/main/examples/pattern-matching) examples to build and run locally, in a GitHub Codespace or a dev container.

A union holds a value of one of several variants, each with its own set of fields: one type that represents several kinds of data. Pattern matching is how that data comes back out - test which variant a value holds, and read its fields at the narrowed type. The [definitions page](https://ghul.dev/definitions.html#unions) covers the full declaration surface - unit variants, the `default` variant, primary-constructor headers, and traits; this page is about using them.

```ghul
union Shape is
    CIRCLE(radius: double);
    SQUARE(side: double);
si

union Option[T] is
    SOME(value: T);
    NONE;
si

union Result[T, E] is
    OK(value: T);
    ERROR(error: E);
si
```

## testing and narrowing a variant

Accessing the data held by a union's variant requires first checking which variant the union currently holds. An `isa Variant(value)` test checks the variant and, in the then-branch, narrows the value to it so the variant's fields are reachable:

```ghul
…
if isa Option.SOME( ► an_option) then
    let value = an_option.value;
    write_line("the option holds {value}");
fi
```

output:

```
the option holds 42
```

## option-shaped unions

Unions shaped like `Option` types - a single field-carrying variant, or one variant marked `default` - support the `?` and `!` operators, for testing whether they hold a value and for unwrapping it:

```ghul
…
if ► an_option? then
    let value = an_option!;
    write_line("the option holds {value}");
fi
```

output:

```
the option holds 42
```

```ghul
use IO.Std.write_line;

union Option[T] is
    SOME(value: T);
    NONE;
si

union List[T] is
    NIL;
    CONS(head: T, tail: List[T]);
si

union Tree[T] is
    LEAF(value: T);
    NODE(left: Tree[T], right: Tree[T]);
si

use Option.SOME;
use Option.NONE;
use List.NIL;
use List.CONS;
use Tree.LEAF;
use Tree.NODE;

test_option();
test_list();
test_tree();

test_option() is
    let some_int = SOME(42);
    let none_int = NONE();

    let stringify_option = o rec =>
        if isa SOME( ► o) then
            "{o.value}"
        else
            "none"
        fi;

    write_line(stringify_option(some_int));
    write_line(stringify_option(none_int));
si

test_list() is
    let list = CONS(1, CONS(2, CONS(3, NIL())));

    let stringify_list = l rec =>
        if isa CONS( ► l) then
            let (head, tail) = l in
            "{head}, {rec(tail)}"
        else
            "nil"
        fi;

    write_line(stringify_list(list));
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
    );

    let stringify_tree = t rec =>
        if isa NODE( ► t) then
            let (left, right) = t in
            "({rec(left)}, {rec(right)})"
        else
            "{t.value}"
        fi;

    write_line(stringify_tree(tree));
si
```

output:

```
42
none
1, 2, 3, nil
((1, 2), (3, 4))
```

`Option` here is a union built from scratch to show how the shape works, but everyday code rarely needs to: ghūl's own optional types (`T?`) give you this for free, over reference types, value types, and unconstrained generic types alike - see [optional types](https://ghul.dev/optional-types) for the full picture, including how a user-defined union like this one fits alongside the built-in representations.

## matching with if let

Discovering which variant a union holds, and branching on the result, is done with `if let`: a `let` definition in an `if` / `elif` condition, where the branch runs only on a match, with the variable narrowed and in scope:

```ghul
union Shape is
    CIRCLE(radius: double);
    SQUARE(side: double);
si
…
area(s: Shape) -> double is
    if let c: CIRCLE = ► s then
        return 3.14159d * c.radius * c.radius;
    elif let q: SQUARE = ► s then
        return q.side * q.side;
    fi

    return 0.0d;
si
```

`isa` variant tests and `else`-branch narrowing cover the same ground; see [type narrowing](https://ghul.dev/type-narrowing.html) for the full picture.

## matching with case

A `case` expression matches one scrutinee against several `when` arms, which reads better than a chain of `if let`/`elif let` once there are more than a couple of variants to cover. Over a closed domain - a union's variants, `bool`, an enum, or a class hierarchy closed to the assembly - the compiler checks the arms for exhaustiveness, so `area` needs no fallback return for a variant the `when` arms forgot:

```ghul
…
area(s: Shape) -> double =>
    // case over a union is checked for exhaustiveness: every variant
    // is covered here, so no else arm is needed
    case s
    when c: CIRCLE then 3.14159d * c.radius * c.radius
    when q: SQUARE then q.side * q.side
    esac;

write_line("{area(CIRCLE(2.0d))}");
write_line("{area(SQUARE(3.0d))}");
```

output:

```
12.56636
9
```

`when` arms accept the same patterns as `if let`: a type test that binds and narrows (`c: CIRCLE`), destructuring with literal leaves and `~`-marked values that match rather than bind, and a trailing `/\` guard that falls through to the next arm on failure.

Equality labels compare by value, the way `=~` compares: over a string scrutinee or any type defining the operator, matching is by content, and `when null` matches absence.

So `case` is the exhaustive counterpart to `if let` rather than a different matching mechanism. See [the case statement](https://ghul.dev/control-flow.html#case-statement) for the full picture.


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
    YES(value: T);
    NO;
si
…
let m: Maybe[int] = Maybe.YES(42);

if isa Maybe.YES( ► m) then
    // m is narrowed to Maybe.YES inside the branch,
    // so m.value is in scope
    write_line("got value {m.value}");
fi

let a: Animal = CAT("whiskers");
if isa CAT( ► a) then
    // a is narrowed to CAT inside the branch
    write_line(a.purr());
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
let name: string? = lookup();

if ► name? then
    // name is narrowed to non-optional string
    // here, no ! needed
    write_line("hello, {name}");
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
    OK(value: T);
    ERR(error: E);
si
…
let r: Result[int, string] = some_call();

if isa Result.OK( ► r) then
    write_line("ok: {r.value}");
else
    // r is narrowed to Result.ERR here
    write_line("err: {r.error}");
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
        write_line("not a cat");
        return;
    fi

    // every non-CAT has returned, so a is
    // narrowed to CAT from here on
    write_line(a.purr());
si

classify(CAT("whiskers"));
classify(DOG());
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
        write_line(a.purr());
    fi
si

greet(CAT());
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
        write_line("customer name has {order.customer.length} chars");
    fi
si

describe(ORDER("alice"));
```

output:

```
customer name has 5 chars
```

An `isa` check or variant test narrows a path the same way:

```ghul
…
class CARRIER(occupant: Animal);
describe(carrier: CARRIER) is
    if isa CAT( ► carrier.occupant) then
        // carrier.occupant is a CAT within this branch,
        // so its purr() is reachable directly
        write_line(carrier.occupant.purr());
    fi
si

describe(CARRIER(CAT()));
```

output:

```
purr
```

## narrowing on assignment

Reassigning a local narrows it: when the new value's static type is more specific than the declared type, the local narrows to that type from the assignment on, so a following call resolves on the assigned type without an `isa`:

```ghul
…
► pet = CAT();
// assigning a CAT narrows pet to CAT, so purr() is in reach
write_line(pet.purr());
```

output:

```
purr
```

If the local is already narrowed, assigning a value of a different type cancels that narrowing and introduces one for the new type, so the following call resolves on the assigned type:

```ghul
…
if isa CAT( ► pet) then
    write_line(pet.purr());

    ◄► pet = DOG();
    // reassigning cancels the CAT narrowing and
    // introduces a DOG one: pet is DOG here
    write_line(pet.name());
fi
```

output:

```
purr
dog
```

## when a narrowing ends

A narrowing lasts at most to the end of the code block associated with the test - the then or else arm of the `if`, or the loop body. It can end earlier, because the value can change before the block ends: an explicit reassignment ends it, and so can a call, because the callee might assign the field the narrowing depends on. When the compiler cannot prove a call left the value alone, it reports the use that depends on the narrowing.

Two idioms always work, whatever calls came before. Test the value again: `?`, `!`, `?.`, `isa`, and `if let` all check at run time and re-establish what they test. Or copy the value into an immutable local variable: a local that is not `mut` cannot change, so its narrowing always lasts to the end of the block. `if let` does the copy and the test in one step, and works for any expression - the result of a call, not only a variable or path - which is why it is the best way to get a narrowing that lasts:

```ghul
…
describe(carrier: CARRIER) is
    if let cat: CAT = carrier.occupant then
        write_line(cat.purr());
    fi
si

describe(CARRIER(CAT()));
```

output:

```
purr
```

The full model - how the compiler decides whether a call invalidated a narrowing, the `pure` modifier, and `stable` properties - is in [narrowing in depth](https://ghul.dev/narrowing-in-depth).


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
    fi;

write_line(sign(-4));
write_line(sign(0));
write_line(sign(7));
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
    esac;

write_line(day_kind(5));
write_line(day_kind(3));
write_line(day_kind(6));
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
let rows = [[1, 2, 3], [4, 5, 6]];

let first_even: int? =
    for row in rows do
        for cell in row do
            if cell % 2 == 0 then break cell fi
        od
    od;

write_line("{first_even ?? -1}")
```

output:

```
2
```

See [loops as expressions](https://ghul.dev/control-flow.html#loops-as-expressions) for the full rules.

## val blocks

A `val ... lav` block runs a sequence of statements and yields a value: its tail expression, or any `return` that targets the block. It gives an expression room for intermediate local variables, loops, and early exits:

```ghul
…
// a val block as a let initializer, with room for intermediate locals:
let midpoint = val
    let lo = 10;
    let hi = 20;
    lo + (hi - lo) / 2
lav;
write_line("midpoint = {midpoint}");

// a val block folding a loop, with a return that yields from the block:
let first_even = val
    for x in [1, 3, 4, 7] do
        if x % 2 == 0 then
            return x;
        fi
    od
    -1
lav;
write_line("first_even = {first_even}");

// a val block passed straight as a function argument:
write_line(
    val
        let doubled = midpoint * 2;
        "doubled = {doubled}"
    lav
);
```

output:

```
midpoint = 15
first_even = 4
doubled = 30
```

A `return` inside the block yields from the block, not from the enclosing function.

## let in

A `let ... in ...` expression introduces one or more local variables scoped to a single trailing expression. It is lighter than a `val ... lav` block when a value needs only a local or two:

```ghul
…
hypotenuse_squared(a: int, b: int) -> int =>
    let a2 = a * a, b2 = b * b in a2 + b2;

write_line("h2 = {hypotenuse_squared(3, 4)}");
```

output:

```
h2 = 25
```

## every arm is a statement block

Whether a construct is being used as a statement or as an expression changes what happens to the value it produces. It does not change what is written inside it. A loop body, each arm of an `if` / `elif` / `else`, and each arm of a `case` are statement blocks in both uses: they hold a statement list, so an arm can define local variables and run several statements before arriving at its value.

The value an arm produces is its last statement's, on the same rule as a `val ... lav` block:

```ghul
…
// each arm is a statement block, so it can hold locals and several
// statements; its last statement is the arm's value
grade(mark: int) -> string is
    if mark >= 90 then
        let band = "top";

        "{band} band"
    elif mark >= 50 then
        let band = "middle";

        "{band} band"
    else
        "low band"
    fi
si

// the same construct used as a statement: the arms are blocks there too
announce(mark: int) is
    if mark >= 50 then
        let verdict = grade(mark);

        write_line("pass: {verdict}")
    else
        write_line("fail")
    fi
si

// a loop body is a statement block whose last value goes nowhere:
// a loop yields through break, not through its body's last statement
total(marks: int[]) -> int is
    let running mut = 0;

    for mark in marks do
        running = running + mark
    od;

    running
si

write_line(grade(95));
announce(60);
write_line("{total([10, 20, 30])}")
```

output:

```
top band
pass: middle band
60
```

Where the value then goes is what the two uses differ on. An `if` used as an expression takes the value of the arm it chose; the same `if` used as a statement discards it. A loop body is the case where it always goes nowhere, since a loop yields through `break` rather than through its body's last statement.

Inside these blocks a terminating `;` on the last statement is optional, and writing one does not discard the value: the arm still produces it, because a closing `else`, `fi`, `esac` or `lav` ends the statement list either way. The one place the semicolon decides the reading is a function or method body, covered next.

## block bodies return their tail

A function or method body takes its last statement's value the way an arm does, with one difference: here the terminating `;` is not inert. Where the last statement produces a value and carries no `;`, that value is the return value on the fall-through path, checked against the declared return type exactly as an explicit `return` would be:

```ghul
…
// the last statement is not terminated, so it is the return value
area(width: int, height: int) -> int is
    let doubled = width * 2;
    let trimmed = height - 1;

    doubled * trimmed
si

write_line("{area(3, 5)}")
```

output:

```
24
```

Written `doubled * trimmed;` the statement is evaluated and its value discarded, which leaves the function with no value on that path.

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

Only a statement that produces a value can be a tail. An expression statement, an `if`, a `case` and a `val ... lav` block all do. A `let`, an assignment, an `assert` and a loop do not, so a body whose last statement is one of those has no value on the fall-through path and returns [the default for its return type](https://ghul.dev/control-flow.html#default-return) instead. A loop is not an exception to [loops as expressions](#loops-as-expressions): it yields to a context that consumes a value, and a function tail is not one, so a `break` with a value there is rejected outright.

Whole bodies can have no tail to take either. A void body discards a trailing statement whether or not it ends in a semicolon, so a method ending in a bare `if` or loop is unaffected. In a generator, falling off the end means the end of the stream rather than a value. A `try` block is not an expression, so a body ending in one is not a tail either.

A guard `if` with no `else` is rejected in tail position in a function that returns a value, because the branch it does not take produces nothing. Terminate it with `;` to keep it as a plain statement.

## expression bodies

A function, method, property, or anonymous function can replace its block body with `=>` and a single expression. That expression can be an `if`, a `case`, or a `val ... lav` block:

```ghul
…
// expression-bodied free function:
square(n: int) -> int => n * n;

class COUNTER is
    _count: int;

    init() is si

    // an expression body can be a val ... lav block:
    bump() -> int => val
        _count = _count + 1;
        _count
    lav;
si

write_line("square(6) = {square(6)}");

let c = COUNTER();
write_line("bump = {c.bump()}");
write_line("bump = {c.bump()}");

// expression-bodied anonymous function:
let twice = (n: int) => n * 2;
write_line("twice(21) = {twice(21)}");
```

output:

```
square(6) = 36
bump = 1
bump = 2
twice(21) = 42
```

## composing them

These forms nest, so a `val` block can hold a `case` and an `if`:

```ghul
…
grade(score: int) -> string is
    // a val block as a let initializer, composing a case and an if:
    let label = val
        let band =
            case score / 10
            when 10, 9 then "A"
            when 8 then "B"
            when 7 then "C"
            else "F"
            esac;

        if band == "F" then "fail" else "pass ({band})" fi
    lav;

    return label;
si

write_line(grade(95));
write_line(grade(82));
write_line(grade(60));
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
let f = i => i * 2;
write_line("f(123): {f(123)}");

// assigned to another variable
let g = f;
write_line("g(456): {g(456)}");

// passed to another function
let apply_twice = (f: int -> int, i) => f(f(i));
write_line("apply_twice(f, 7): {apply_twice(f, 7)}");
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
let base = 10;
let add_base = (n: int) => n + base;
write_line("add_base(5): {add_base(5)}");

// a mut variable is captured by reference: the function and
// the enclosing scope share it
let count mut = 0;
let next = () => val count = count + 1; count lav;

write_line("next(): {next()}");
write_line("next(): {next()}");
write_line("count: {count}");
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
let doubled = [1, 2, 3, 4, 5] |> map(x => x * 2);
write_line("doubled: {doubled}");

// filter
let evens = [1, 2, 3, 4, 5] |> filter(x => x % 2 == 0);
write_line("evens: {evens}");

// reduce
let sum = [1, 2, 3, 4, 5] |> reduce(0, (acc, x) => acc + x);
write_line("sum: {sum}");
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
    if n == 0 then 1 else n * rec(n - 1) fi;
write_line("factorial(5): {factorial(5)}");

// fibonacci
let fibonacci = n rec =>
    if n <= 1 then n else rec(n - 1) + rec(n - 2) fi;
write_line("fibonacci(10): {fibonacci(10)}");
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
    if n == 0 then true else is_odd(n - 1) fi;

is_odd(n: int) -> bool =>
    if n == 0 then false else is_even(n - 1) fi;
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
let numbers = [1, 2, 3, 4, 5];

let element = numbers[3]; // elements can be read

numbers[3] = 6;
```

diagnostics:

- error: indexer is read-only in int[]

### tuples are immutable

Tuple elements have no assign accessors, and tuples are value types, so a
tuple passed to other code is a copy: nothing can change a tuple you hold.

```ghul
…
let tuple = (1, 2, 3, 4, 5);

let element = tuple.`3; // elements can be read

tuple.`3 = 6;
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
struct THING(name: string);
…
let thing = THING("a thing");

thing.name = "change it";
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
let list = [1, 2, 3, 4, 5];

let doubled = list |> map(x => x * 2);
write_line("doubled: {doubled}");

// the original list is unchanged:
write_line("list: {list |> join(", ")}");
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
square(x: int) -> int pure => x * x;

// a pure function type: this slot accepts only pure functions
apply(f: (int) -> int pure, x: int) -> int => f(x);

write_line("apply(square, 5): {apply(square, 5)}");
write_line("apply(anonymous, 5): {apply(x => x + 1, 5)}");
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

Expression bodies and value-producing `if`, `case`, and `val ... lav` blocks
help in writing pure functions; see
[expression-oriented programming](https://ghul.dev/expression-oriented-programming).

## higher-order functions

A higher-order function takes another function as an argument, or returns
one. Global functions and methods can do this generically:

### higher-order generic global functions

```ghul
apply[T](f: T -> T, x: T) -> T =>
    f(x);

apply_if[T](f: T -> T, x: T, predicate: T -> bool) -> T =>
    if predicate(x) then f(x) else x fi;
```

### higher-order generic methods

```ghul
class HIGHER_ORDER_FUNCTIONS[T] is
    apply(f: T -> T, x: T) -> T static =>
        f(x);

    apply_if(
        f: T -> T, x: T, predicate: T -> bool
    ) -> T static =>
        if predicate(x) then f(x) else x fi;
si
```

### higher-order anonymous functions

```ghul
…
let times_2 = x => x * 2;
write_line("apply(times_2, 5): {apply(times_2, 5)}");

let square = x => x * x;
write_line("apply(square, 5): {apply(square, 5)}");

// higher order function consumes another function:
let apply_twice = (f: int -> int, x) => f(f(x));
write_line(
    "apply_twice(times_2, 5): {apply_twice(times_2, 5)}"
);

// higher order function returns another function:
let create_apply_twice = (f: int -> int) => x => f(f(x));
let apply_twice_times_2 = create_apply_twice(times_2);

write_line(
    "apply_twice_times_2(5): {apply_twice_times_2(5)}"
);
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
    x => g(f(x));

let times_2 = x => x * 2;
let add_1 = x => x + 1;

let times_2_then_add_1 = times_2 >> add_1;
write_line("times_2_then_add_1(5): {times_2_then_add_1(5)}");

let pipeline = times_2 >> add_1 >> x => "[{x}]";
write_line("pipeline(5): {pipeline(5)}");
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
let curried_add = x => y => x + y;

write_line("curried_add(5)(3): {curried_add(5)(3)}");

let add_5 = curried_add(5);
write_line("add_5(3): {add_5(3)}");

let add_10 = curried_add(10);
write_line("add_10(3): {add_10(3)}");
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
let add = (x, y) => x + y;

let add_5 = y => add(5, y);
write_line("add_5(3): {add_5(3)}");

let add_10 = y => add(10, y);
write_line("add_10(3): {add_10(3)}");
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
    case s
    when c: CIRCLE then 3.14159d * c.radius * c.radius
    when q: SQUARE then q.side * q.side
    esac;

write_line("{area(CIRCLE(2.0d))}");
write_line("{area(SQUARE(3.0d))}");
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
// one feature, T?, however T turns out to be represented
find_first[T](xs: T[], predicate: T -> bool) -> T? is
    for x in xs do
        if predicate(x) then
            return x;
        fi
    od

    return null;
si

let first_even = find_first([1, 3, 4, 7, 8], n => n % 2 == 0);    // T = int, a value type
let first_long = find_first(["a", "bb", "ccc"], s => s.length > 2); // T = string, a reference type

write_line("first even: {first_even ?? -1}");
write_line("first long: {first_long ?? "none"}");
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
    DONE;
    YIELD(value: T, state: S);
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
use Ghul.Pipes;
use STREAM.DONE;
use STREAM.YIELD;
…
// counting down. State and output are both int;
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
    );

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
);

// factorial. State is (n, prev); output is int.
let factorial = stream(
    (n = 1, prev = 1),
    ((n, prev)) =>
        let next_n = n + 1, next = prev * next_n in
        next || (n = next_n, prev = next)
);

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
    );

write_line(
    "counting down from 5: {counting(5)}"
);
write_line(
    "first 10 fibonacci numbers: {fibonacci |> take(10)}"
);
write_line(
    "first 10 factorial numbers: {factorial |> take(10)}"
);
write_line("chars of hello: {chars_of("hello")}");

let indexed =
    fibonacci |> zip(factorial) |> take(10) |> index();

for (i, (fib, fact)) in indexed do
    write_line("fibonacci {i} is {fib}");
    write_line("factorial {i} is {fact}");
od;
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
use IO.Std.write_line;

class Animal is
    _name: string;
    init(name: string) is _name = name; si

    name: string => _name;
    speak() -> string;                     // body-less: Animal is implicitly abstract
    describe() -> string => "{_name} says {speak()}";
si

class DOG: Animal is
    init(name: string) is super.init(name); si
    speak() -> string => "woof";
si

class CAT: Animal is
    init(name: string) is super.init(name); si
    speak() -> string => "meow";
si

let animals: Animal[] = [DOG("Rex"), CAT("Tom")];

for a in animals do
    write_line(a.describe()); // describe calls the overriding speak
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
use IO.Std.write_line;

let int_calculator = CALCULATOR(
    [
        ("+", INTEGER_ADDITION()),
        ("-", INTEGER_SUBTRACTION()),
        ("*", INTEGER_MULTIPLICATION()),
        ("/", INTEGER_DIVISION())
    ]
);

write_line(
    "1 + 2 = {int_calculator.calculate("+", 1, 2)}"
);
write_line(
    "1 - 2 = {int_calculator.calculate("-", 1, 2)}"
);
write_line(
    "1 * 2 = {int_calculator.calculate("*", 1, 2)}"
);
write_line(
    "1 / 2 = {int_calculator.calculate("/", 1, 2)}"
);

let from_memory =
    int_calculator.calculate_from_memory("-", 3);
write_line("1 + 2 - 3 = {from_memory}");

let string_calculator = CALCULATOR(
    [
        ("+", STRING_CONCATENATION()),
        ("-", STRING_SUBTRACTION())
    ]
);

let concatenated =
    string_calculator.calculate("+", "hello", "world");
write_line("hello + world = {concatenated}");

let subtracted =
    string_calculator.calculate(
        "-", "helloworld", "world"
    );
write_line("helloworld - world = {subtracted}");

string_calculator.clear_memory();

write_line("memory is cleared");

trait Operation[T] is
    execute(left: T, right: T) -> T;
si

class CALCULATOR[T] is
    _operations: Collections.MAP[string, Operation[T]];

    memory: T;

    init(
        operations: Collections.Iterable[
            (name: string, operation: Operation[T])
        ]
    ) is
        _operations =
            Collections.MAP(
                operations
                    | .map(
                        on =>
                            let (name, operation) = on in
                            Collections.KeyValuePair(
                                name, operation
                            )
                    )
            );
    si

    calculate(
        operation_name: string, left: T, right: T
    ) -> T =>
        if _operations.contains_key(operation_name) then
            let operation = _operations[operation_name];
            memory = operation.execute(left, right);

            memory
        else
            throw System.InvalidOperationException(
                "invalid operation {operation_name}"
            )
        fi;


    calculate_from_memory(
        operation_name: string, right: T
    ) -> T =>
        if _operations.contains_key(operation_name) then
            let operation = _operations[operation_name];
            memory = operation.execute(memory, right);

            memory
        else
            throw System.InvalidOperationException(
                "invalid operation {operation_name}"
            )
        fi;

    clear_memory() is
        memory = _;
    si
si

class INTEGER_ADDITION(): Operation[int] is
    execute(left: int, right: int) -> int => left + right;
si

class INTEGER_SUBTRACTION(): Operation[int] is
    execute(left: int, right: int) -> int => left - right;
si

class INTEGER_MULTIPLICATION(): Operation[int] is
    execute(left: int, right: int) -> int => left * right;
si

class INTEGER_DIVISION(): Operation[int] is
    execute(left: int, right: int) -> int =>
        if right == 0 then
            throw System.InvalidOperationException(
                "division by zero"
            );
        else
            left / right
        fi;
si

class STRING_CONCATENATION(): Operation[string] is
    execute(left: string, right: string) -> string =>
        "{left}{right}";
si

class STRING_SUBTRACTION(): Operation[string] is
    execute(left: string, right: string) -> string =>
        left.replace(right, "");
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
print_something[T](t: T) => write_line("something is {t}");
```

```ghul
…
print_something[int](1234);
print_something[string]("hello");
```

output:

```
something is 1234
something is hello
```

```ghul
struct HOLD_SOMETHING[T](value: T);
```

```ghul
…
let holds_int = HOLD_SOMETHING(1234);
let holds_string = HOLD_SOMETHING("hello");
```

```ghul
union Option[T] is
    SOME(value: T);
    NONE;
si
…
let some_int = Option.SOME(1234);
```

Generic argument types can be inferred from context for generic constructor invocations as well as generic function and method calls

```ghul
…
print_something(1234);
print_something("hello");
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
trait Greetable is
    name: string;
si

// T must derive from Greetable, so .name is available on T
greet[T: Greetable](x: T) is
    write_line("hello, {x.name}");
si

class CAT(name: string): Greetable;
…
greet(CAT("whiskers"));
```

output:

```
hello, whiskers
```

A value whose static type is a bounded type parameter also narrows and destructures through the bound, so `isa`, `if let`, and destructuring reach the bound's subtypes and variants directly, with no manual widen to the bound first:

```ghul
use IO.Std.write_line;

class Animal abstract is
    name() -> string;
si

class CAT: Animal is
    init() is si
    name() -> string => "cat";
    purr() -> string => "purr";
si

// T is bounded by Animal, so a T value narrows through Animal with isa
describe[T: Animal](x: T) -> string =>
    if isa CAT( ► x) then x.purr()
    else x.name()
    fi;

write_line(describe(CAT()));
```

output:

```
purr
```

Several bounds can be joined with `/\`. The value then behaves as every one of them - a member of any bound is reachable - and the actual type argument has to satisfy each. The comma spelling declares separate type parameters and is not a way to write two bounds:

```ghul
…
trait ▼ Named is
    ◆▼ name: string;
si

trait ▼ Sized is
    ◆▼ size: int;
si

class CRATE: Named, Sized is
    ▲ name: string;
    ▲ size: int;

    init(name: string, size: int) is
        self.name = name;
        self.size = size;
    si
si

// several bounds joined with '/\'
label[T: Named /\ Sized](x: T) -> string =>
    "{x.name} holds {x.size}";

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
total[T: INumber[T]](a: T, b: T) -> T => a + b;

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
    value: T;
    init(value: T) is self.value = value; si
si
```

Kinds combine with each other and with type bounds, space-separated: `[T: Named /\ Sized class init]`.

### constructor constraint

The `init` constraint requires the type argument to expose an accessible parameterless constructor:

```ghul
…
// T: init requires the caller to pass a type with a parameterless constructor
echo[T: init](x: T) -> T => x;

class WIDGET() is
    describe() -> string => "a widget";
si

let w = echo(WIDGET());   // OK: WIDGET has init()

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
trait Box[T: out] is
    contents() -> T;
si
…
let cats: Box[CAT] = CAT_BOX();
let animals: Box[Animal] = cats;   // covariance

write_line(animals.contents().speak());
```

output:

```
meow
```

Variance is also automatic in two places: a function type is contravariant in its parameter types and covariant in its return type; an array of a reference type is covariant.


---

<a id="type-inference"></a>

# type inference

> **editable examples**
>
> Every example on this page can be edited and run here: click the pencil to open it in an editor, change it, and run it in your browser. Errors, hovers and completions come from the ghūl compiler as you type.
>
> The [ghul-examples repository](https://github.com/degory/ghul-examples/tree/main/examples/type-inference) has fuller type-inference examples to build and run locally, in a GitHub Codespace or a dev container.

ghūl infers types pervasively inside a method or function body: most local variables, loop variables, destructured variables and anonymous function parameters can be left unannotated, and the compiler works their types out from how they are initialized and used.

Mechanically it is bidirectional, constraint-based inference: types flow up from expressions and down from the contexts that use them, and the compiler re-walks each function body until the unknowns settle. The [implementation page](https://ghul.dev/implementation#type-inference) describes how.

Type inference is **function-local**: types inferred within one function are not visible outside it. Outside function bodies all types are explicit, including the signatures of methods and global functions, whose parameter and return types are always written out.

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
    let sum mut = 0;
    let count mut = 0;

    for v in values do
        sum = sum + v;
        count = count + 1;
    od

    return (sum, count);
si
…
```

Inference does not read types out of a body into the function's signature, and does not flow from one function into another: each body is checked on its own, against the explicit signatures of everything it calls.

Fields and properties belong to a type rather than to a function body, so their types are written out too - for private members as well as public ones.

```ghul
class COUNTER is
    count: int; // a property - its type is declared

    init() is
        count = 0;
    si

    tick() is
        // a local - its type is inferred from the
        // initializer
        let step = 1;
        count = count + step;
    si
si
…
```

## what gets inferred

### let statements and expressions

When no explicit type is given for a variable in a let statement or expression, its type is inferred from the initializer, provided one is present.

```ghul
let a_string = "12345";
let an_int = 12345;
let an_int_array = [1, 2, 3, 4, 5];
```

### destructuring variables

A destructuring `let` declares several variables at once from a tuple. Each variable takes its type from the corresponding element of the right-hand side, and the pattern can nest.

```ghul
let person = ("alice", 30);
let (name, age) = person;

let ((first, second), third) = (("a", "b"), "c");
```

### for loop variables

A `for` loop variable takes its type from the element type of the iterable being looped over. Destructuring composes with this: when the element type is a tuple, its element types flow into the destructured names.

```ghul
…
for i in 1::10 do
    write_line("{i}");
od

let pairs = [("a", 1), ("b", 2)];

for (name, count) in pairs do
    write_line("{name}: {count}");
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
class BASE();

class DERIVED(): BASE;
…
let array_of_base = [BASE(), DERIVED()];
let array_of_object = [BASE(), DERIVED(), object()];
let array_of_int = [1, 2, 3, 4, 5];
```

If a list contains tuple literals, the compiler finds a compatible common type for each tuple element across all elements of the list.

```ghul
let int_string = [(123, "hello"), (456, "goodbye")];

let int_object = [(123, 456), (798, "wibble")];
```

### if expression result types

The result type of an if expression is inferred from the types of all the branch results: the compiler finds a type compatible with all of them.

```ghul
class BASE();

class DERIVED(): BASE;

let derived =
    if true then
        DERIVED()
    else
        DERIVED()
    fi;

let base =
    if true then
        DERIVED()
    else
        BASE()
    fi;
```

### generic class, struct and variant constructors

When constructing a generic class, struct or variant, the generic type arguments are inferred from the constructor method arguments where possible.

```ghul
class THING[T](value: T);
…
let int_thing = THING(1234);
let string_thing = THING("hello");
```

Inference from the constructor arguments works when every type argument appears among those arguments and the constructor overload is unambiguous. A type argument left unpinned - by a no-argument constructor, say - can still be resolved from later use of the value (see [inference from later use sites](#inference-from-later-use-sites)).

### generic function and method calls

When calling a generic global function, a generic method, or a static method on a generic class or struct, the compiler infers the generic type arguments from the types of the actual arguments passed.

```ghul
class BASE();

class DERIVED(): BASE;

do_something[T](a: T, b: T) -> T => a;
let base = do_something(BASE(), DERIVED());
let derived = do_something(DERIVED(), DERIVED());
let obj = do_something(object(), DERIVED());
```

### anonymous function return types

The return type of an anonymous function literal is inferred from the type of its expression body, or from the types of return expressions in its block body.

```ghul
let returns_int = (i: int) => i * 2;
let returns_string = (s: string) => "{s}{s}";
```

### anonymous function argument types

When an anonymous function literal is passed as an argument and an unambiguous overload match can be made without knowing the exact function type, the compiler infers the argument types from the matching overload.

```ghul
…
[1, 2, 2, 4, 5] |> filter(i => i > 3);
```

Here `self` is already known to be `Pipe[int]`, so `Pipe[int].filter(predicate: int -> bool) -> Pipe[int]` is the only overload that could match. The `predicate` argument must therefore be `int -> bool`, and the type of `i` must be `int`.

## inference from later use sites

The sections above infer a type from a declaration's initializer or from a call argument. Because inference spans the whole function body, the compiler can also work the other way: when a declaration gives no type on its own, a later use of the variable in the same body can supply one.

```ghul
…
// m is BOX[?] here; the type argument is not
// yet known
let m = BOX();

// the set call takes an int, so m is BOX[int]
m.set(42);

let x = m.get();
```

The same applies to anonymous functions whose argument types are not explicit: if a later call supplies a concrete type, that flows back to the function literal.

```ghul
…
let f = x => x + 1;
write_line("{f(42)}");
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
    if n == 0 then 1 else n * rec(n - 1) fi;
write_line("{factorial(5)}");
```

output:

```
120
```

### operations on a not-yet-inferred value

When an anonymous function's parameter has no annotation, every operation the body performs on it - a member access, a method call, an index, an iteration, a destructuring - is recorded as a constraint on the parameter's type. Whatever type is eventually inferred for the parameter must satisfy all of them.

```ghul
…
let length_of = x => x.length;
write_line("{length_of("hello")}");
```

output:

```
5
```

The call passes a `string`, and `string` has a `length` member, so `x` resolves to `string`. When a call site leaves room for more than one type, a candidate that does not support every recorded operation is discarded.

### generic argument inference from sibling actuals

When a generic function or method is called with two arguments that share only a common ancestor, the generic argument is inferred from their nearest shared type rather than failing the overload match.

```ghul
class Animal abstract is
    speak() -> string => "animal";
si

class CAT(): Animal;

class DOG(): Animal;

merge[T](a: T, b: T) -> T => a;
…
let a = merge(CAT(), DOG());
```


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
    let a = await double_async(10);   // a = 20
    let b = await double_async(a);    // b = 40
    let c = await add_async(a, b);    // c = 60

    return c;
si

write_line("{compute().result}");
```

output:

```
60
```

`await e;` as a bare statement is the value-less form: it waits for `e` to complete and discards any result. Use it when you only care that the work has finished:

```ghul
…
run_side_effects() -> Tasks.TASK is
    await side_effect("first");
    await side_effect("second");

    return;
si

run_side_effects().wait();
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
    let total mut = 0;

    for x in xs do
        let y = await fetch_async(x);
        total = total + y;
    od

    return total;
si

let result = sum_of_squares([1, 2, 3, 4]).result;

write_line("sum_of_squares = {result}");
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
    let i mut = 1;
    while i <= limit do
        yield i * i;
        i = i + 1;
    od
si

for s in squares(4) do
    write_line(s);
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
    write_line(f);
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
- Any generic type argument count suffix is left as-is (for example ``KeyValuePair`2``)
- Enum names and enum member names are transformed to `MACRO_CASE`
- Method, property and field names are transformed to `snake_case`
- Names that conflict with ghūl keywords are prefixed with `` ` ``

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
    =~(other: WITH_HASH) -> bool => x == other.x;

    get_hash_code() -> int => x.get_hash_code();
si

// only =~, so .NET keeps comparing by identity:
class NO_HASH(x: int) is
    =~(other: NO_HASH) -> bool => x == other.x;
si

let with_hash = SET[WITH_HASH]();
with_hash.add(WITH_HASH(1));
write_line("with get_hash_code: {with_hash.contains(WITH_HASH(1))}");

let no_hash = SET[NO_HASH]();
no_hash.add(NO_HASH(1));
write_line("without get_hash_code: {no_hash.contains(NO_HASH(1))}");
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
    <>(other: VERSION) -> int =>
        if major != other.major then major - other.major else minor - other.minor fi;

    to_string() -> string => "{major}.{minor}";
si

let versions = LIST[VERSION]();
versions.add(VERSION(2, 1));
versions.add(VERSION(1, 9));
versions.sort();

write_line("sorted: {versions |> map(v => v.to_string()) |> join(", ")}");
write_line("1.0 < 1.1: {VERSION(1, 0) < VERSION(1, 1)}");
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
    let h = cast System.Half(1.5);
    let f = cast single(h);

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
    dispose() is
        write_line("closing {name}");
    si
si

let use s = SCOPE("file");

write_line("inside the scope");
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
    iterator: Iterator[int] => _counting().iterator;

    _counting() -> Pipe[int] is
        let i mut = from;
        while i > 0 do
            yield i;
            i = i - 1;
        od
    si
si

for i in COUNTDOWN(3) do
    write_line("tick {i}");
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
    let builder = WebApplication.create_builder(args);

    let app = builder.build();

    // '|>' threads app in as map_get's first argument:
    app |> map_get("/hello", () => Results.ok("hello, world"));

    app.run(null);
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
    id: int public;

    @IL.name("Name")
    name: string public;

    init() is si
si

class STORE_CONTEXT: DbContext is
    @IL.name("Products")
    products: DbSet[PRODUCT];

    init(options: DbContextOptions) is
        super.init(options);
    si
si

add_product(context: STORE_CONTEXT, product: PRODUCT) -> Tasks.TASK is
    context.products.add(product);

    await context.save_changes_async(System.Threading.CancellationToken.none);

    return;
si
…
```

The `Products` set and the entity's `Id` and `Name` are the names EF Core's model builder and SQL generation look for. Reads and writes call the async methods directly, with `await` - `save_changes_async` here.

## mocking with NSubstitute

The .NET base libraries include no mocking framework; [NSubstitute](https://nsubstitute.github.io/) is the lowest-friction third-party option from ghūl, and the compiler's own test suite uses it. `Substitute.for` builds a stand-in for a trait, and the `Returns` extension stubs a call through `|>`:

```ghul
…
trait Clock is
    now() -> System.DateTime;
si

test_uses_a_stubbed_clock() static is
    // Substitute.for takes the constructor arguments as an object[]; a
    // trait has none, so pass an empty array.
    let clock = Substitute.`for[Clock]([]);

    // stub a return value for a call:
    clock.now() |> returns(System.DateTime(2020, 1, 1, 9, 0, 0), null);

    IO.Std.write_line("stubbed hour is {clock.now().hour}");
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

Each entry is a real, compiled declaration checked against the current
`ghul.runtime` package - hover over a name for its full signature, exactly as
an editor would show it.

A pipe combinator chain can be written with the thread-first operator `|>`
over free functions, or fluently with `.` over `Pipe[T]` methods after
wrapping a source with [`|`](https://ghul.dev/functional-programming) or `pipe()`. Both forms
call the same underlying code:

```ghul
…
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let sum_of_even_squares = numbers
    |> filter(x => x % 2 == 0)
    |> map(x => x * x)
    |> reduce(0, (total, x) => total + x);

write_line("sum of even squares: {sum_of_even_squares}");
```

output:

```
sum of even squares: 220
```

or, fluently:

```ghul
…
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let sum_of_even_squares = numbers
    | .filter(x => x % 2 == 0)
    | .map(x => x * x)
    | .reduce(0, (total, x) => total + x);

write_line("sum of even squares: {sum_of_even_squares}");
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
let numbers = [1, 2, 3, 4, 5, 6];

// nothing has asked this pipe for elements yet, so peek's
// action has not run
let stages = numbers
    |> peek(x => write_line("  pulled {x}"))
    |> filter(x => x % 2 == 0)
    |> map(x => x * 10);

write_line("pipe built - nothing has run yet");

// collect_list is a terminal, so it asks for the elements
let result = stages |> collect_list();

write_line("result: {result |> join(", ")}");
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
functions satisfy it without any thought; see [narrowing in depth](https://ghul.dev/narrowing-in-depth.html#calls-purity-and-stable)
for what the compiler does with the guarantee.

`Ghul.MAYBE[T]` is an [optional type](https://ghul.dev/optional-types.html): it holds a `T` or
holds nothing. Combinators that might not find anything say so in their return type, and `??`,
`!` and `if let` read the value out.

## making a pipe

### pipe

Turns any `Iterable[T]` - an array, a `LIST[T]`, a `MAP[T]`'s values,
anything with an `.iterator` - into a `Pipe[T]`. This is what the `|`
operator calls to wrap its left operand.

```ghul
pipe[T](source: Iterable[T]) -> Pipe[T] pure;
```

## stages

A stage returns a new pipe, so stages chain onto one another.

### filter

```ghul
filter[T](
    source: Iterable[T],
    predicate: (T) -> bool pure
) -> Pipe[T] pure;
```

or, as a method:

```ghul
filter(predicate: (T) -> bool pure) -> Pipe[T] pure;
```

### map

```ghul
map[T,U](
    source: Iterable[T],
    mapper: (T) -> U pure
) -> Pipe[U] pure;
```

or, as a method:

```ghul
map[U](mapper: (T) -> U pure) -> Pipe[U] pure;
```

### flat_map

Maps each element to an iterable and runs the results together into one sequence.

```ghul
flat_map[T,U](
    source: Iterable[T],
    mapper: (T) -> Iterable[U] pure
) -> Pipe[U] pure;
```

or, as a method:

```ghul
flat_map[U](mapper: (T) -> Iterable[U] pure) -> Pipe[U] pure;
```

### skip

```ghul
skip[T](source: Iterable[T], count: int) -> Pipe[T] pure;
```

or, as a method:

```ghul
skip(count: int) -> Pipe[T] pure;
```

### take

```ghul
take[T](source: Iterable[T], count: int) -> Pipe[T] pure;
```

or, as a method:

```ghul
take(count: int) -> Pipe[T] pure;
```

### skip_while

```ghul
skip_while[T](
    source: Iterable[T],
    predicate: (T) -> bool pure
) -> Pipe[T] pure;
```

or, as a method:

```ghul
skip_while(predicate: (T) -> bool pure) -> Pipe[T] pure;
```

### take_while

```ghul
take_while[T](
    source: Iterable[T],
    predicate: (T) -> bool pure
) -> Pipe[T] pure;
```

or, as a method:

```ghul
take_while(predicate: (T) -> bool pure) -> Pipe[T] pure;
```

The four set operations that follow all discard duplicates. This is what they do to the same pair of sources:

```ghul
…
let left = [1, 2, 2, 3, 4];
let right = [3, 4, 5];

// all four remove duplicates, keeping the first occurrence
// of each element
write_line("distinct:       {left |> distinct()}");
write_line("union_with:     {left |> union_with(right)}");
write_line("intersect_with: {left |> intersect_with(right)}");
write_line("except:         {left |> except(right)}");
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
distinct[T](source: Iterable[T]) -> Pipe[T] pure;
```

or, as a method:

```ghul
distinct() -> Pipe[T] pure;
```

### union_with

Every element of both sources with duplicates removed, taking the left source's elements first.

```ghul
union_with[T](
    source: Iterable[T],
    right: Iterable[T]
) -> Pipe[T] pure;
```

or, as a method:

```ghul
union_with(right: Iterable[T]) -> Pipe[T] pure;
```

### intersect_with

Elements the left and right sources have in common, in the order the left source has them.

```ghul
intersect_with[T](
    source: Iterable[T],
    right: Iterable[T]
) -> Pipe[T] pure;
```

or, as a method:

```ghul
intersect_with(right: Iterable[T]) -> Pipe[T] pure;
```

### except

Elements of the left source that the right source doesn't have.

```ghul
except[T](
    source: Iterable[T],
    right: Iterable[T]
) -> Pipe[T] pure;
```

or, as a method:

```ghul
except(right: Iterable[T]) -> Pipe[T] pure;
```

### peek

Calls `action` on each element and passes it through unchanged.

```ghul
peek[T](source: Iterable[T], action: T -> void) -> Pipe[T] pure;
```

or, as a method:

```ghul
peek(action: T -> void) -> Pipe[T] pure;
```

`chunk` and `windows` both produce groups of elements, and differ in how the groups are cut:

```ghul
…
let numbers = [1, 2, 3, 4, 5, 6, 7];

// chunk: the first three elements, then the next three, and so
// on. the last group is short when the source doesn't divide
// evenly
for group in numbers |> chunk(3) do
    write_line("chunk:  {group |> join(", ")}");
od

// windows: every run of three neighbouring elements, so each
// group shares two elements with the one before it. a group is
// always three long
for window in numbers |> windows(3) do
    write_line("window: {window |> join(", ")}");
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
chunk[T](source: Iterable[T], size: int) -> Pipe[LIST[T]] pure;
```

or, as a method:

```ghul
chunk(size: int) -> Pipe[LIST[T]] pure;
```

### windows

Every run of `size` neighbouring elements: the first `size`, then the same run moved along by one, and so on. Each window therefore shares all but one of its elements with the window before it. A window is always `size` long, so a source with fewer than `size` elements produces none.

```ghul
windows[T](
    source: Iterable[T],
    size: int
) -> Pipe[LIST[T]] pure;
```

or, as a method:

```ghul
windows(size: int) -> Pipe[LIST[T]] pure;
```

### cat

Concatenation: every element of the left source, then every element of the right.

```ghul
cat[T](source: Iterable[T], right: Iterable[T]) -> Pipe[T] pure;
```

or, as a method:

```ghul
cat(right: Iterable[T]) -> Pipe[T] pure;
```

### index

Pairs each element with its index. `INDEXED_VALUE[T]` has `index` and `value`, and destructures positionally, so `for (i, x) in xs | .index() do` reads the pair apart. The second form starts the index at a given number rather than at 0.

```ghul
index[T](source: Iterable[T]) -> Pipe[INDEXED_VALUE[T]] pure;

index[T](
    source: Iterable[T],
    index: int
) -> Pipe[INDEXED_VALUE[T]] pure;
```

or, as a method:

```ghul
index() -> Pipe[INDEXED_VALUE[T]] pure;

index(index: int) -> Pipe[INDEXED_VALUE[T]] pure;
```

### zip

Pairs elements of the source with elements of `other`, stopping when either side runs out. The second form combines each pair with a mapper instead of yielding a tuple.

```ghul
zip[T,U](
    source: Iterable[T],
    other: Iterable[U]
) -> Pipe[(T,U)] pure;

zip[T,U,TOut](
    source: Iterable[T],
    other: Iterable[U],
    mapper: (T,U) -> TOut pure
) -> Pipe[TOut] pure;
```

or, as a method:

```ghul
zip[U](other: Iterable[U]) -> Pipe[(T,U)] pure;

zip[U,TOut](
    other: Iterable[U],
    mapper: (T,U) -> TOut pure
) -> Pipe[TOut] pure;
```

## stages that buffer

These return a pipe, like any other stage, but they cannot work out their first
element without having seen the last one. So they buffer the whole source the
moment they are called, rather than passing elements along one at a time.

### reverse

Yields the source's elements last to first.

```ghul
reverse[T](source: Iterable[T]) -> Pipe[T] pure;
```

or, as a method:

```ghul
reverse() -> Pipe[T] pure;
```

### sort

Yields the source's elements in order. The first form uses the element type's own ordering: sorting without a comparer needs an element type that defines `<>`, or is comparable on the .NET side. The other two forms take an `IComparer[T]` or a comparison function returning negative, zero or positive.

```ghul
sort[T](source: Iterable[T]) -> Pipe[T] pure;

sort[T](
    source: Iterable[T],
    comparer: Collections.IComparer[T]
) -> Pipe[T] pure;

sort[T](
    source: Iterable[T],
    compare: (T, T) -> int pure
) -> Pipe[T] pure;
```

or, as a method:

```ghul
sort() -> Pipe[T] pure;

sort(comparer: Collections.IComparer[T]) -> Pipe[T] pure;

sort(compare: (T, T) -> int pure) -> Pipe[T] pure;
```

### sort_descending

```ghul
sort_descending[T](source: Iterable[T]) -> Pipe[T] pure;
```

or, as a method:

```ghul
sort_descending() -> Pipe[T] pure;
```

### sort_by

```ghul
sort_by[T,K: Ghul.Comparable[K]](
    source: Iterable[T],
    key_selector: (T) -> K pure
) -> Pipe[T] pure;
```

or, as a method:

```ghul
sort_by[K: Ghul.Comparable[K]](
    key_selector: (T) -> K pure
) -> Pipe[T] pure;
```

### sort_by_descending

```ghul
sort_by_descending[T,K: Ghul.Comparable[K]](
    source: Iterable[T],
    key_selector: (T) -> K pure
) -> Pipe[T] pure;
```

or, as a method:

```ghul
sort_by_descending[K: Ghul.Comparable[K]](
    key_selector: (T) -> K pure
) -> Pipe[T] pure;
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
let words = ["alpha", "beta", "gamma"];

// find scans for the first element matching a predicate;
// first takes no predicate and yields the leading element
write_line("find:      {words |> find(w => w.length == 4) ?? "none"}");
write_line("first:     {words |> first() ?? "none"}");

// only yields the single element, and throws if the source
// holds none or more than one
write_line("only:      {["solo"] |> only()}");

// a mapper that gives a result only for words longer than four
// characters
shout(w: string) -> MAYBE[string] pure =>
    if w.length > 4 then MAYBE[string](w.to_upper()) else MAYBE[string]() fi;

// find_map keeps mapping until one answers; first_map maps the
// first element and gives up when that one declines
write_line("find_map:  {words |> find_map(shout) ?? "none"}");
write_line("first_map: {words |> first_map(shout) ?? "none"}");

// beta is the only word the mapper declines, so leading with it
// is what separates the two
let beta_first = ["beta", "alpha", "gamma"];

write_line("find_map:  {beta_first |> find_map(shout) ?? "none"}");
write_line("first_map: {beta_first |> first_map(shout) ?? "none"}");
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
find[T](
    source: Iterable[T],
    predicate: (T) -> bool pure
) -> Ghul.MAYBE[T] pure;
```

or, as a method:

```ghul
find(predicate: (T) -> bool pure) -> Ghul.MAYBE[T] pure;
```

### find_map

Calls `mapper` on each element in turn and returns the first present result. `first_map` differs: it calls the mapper on the *first* element only, and gives up if that one declines.

```ghul
find_map[T,U](
    source: Iterable[T],
    mapper: (T) -> Ghul.MAYBE[U] pure
) -> Ghul.MAYBE[U] pure;
```

or, as a method:

```ghul
find_map[U](
    mapper: (T) -> Ghul.MAYBE[U] pure
) -> Ghul.MAYBE[U] pure;
```

### find_or_throw

As `find`, throwing instead of returning absent when nothing matches.

```ghul
find_or_throw[T](
    source: Iterable[T],
    predicate: T -> bool pure
) -> T pure;
```

or, as a method:

```ghul
find_or_throw(predicate: T -> bool pure) -> T pure;
```

### find_map_or_throw

As `find_map`, throwing instead of returning absent when nothing maps.

```ghul
find_map_or_throw[T,U](
    source: Iterable[T],
    mapper: (T) -> Ghul.MAYBE[U] pure
) -> U pure;
```

or, as a method:

```ghul
find_map_or_throw[U](
    mapper: (T) -> Ghul.MAYBE[U] pure
) -> U pure;
```

### first

The leading element, absent when the source is empty.

```ghul
first[T](source: Iterable[T]) -> Ghul.MAYBE[T] pure;
```

or, as a method:

```ghul
first() -> Ghul.MAYBE[T] pure;
```

### first_map

Calls `mapper` on the leading element only. Compare `find_map`, above, which keeps going.

```ghul
first_map[T,U](
    source: Iterable[T],
    mapper: (T) -> Ghul.MAYBE[U] pure
) -> Ghul.MAYBE[U] pure;
```

or, as a method:

```ghul
first_map[U](
    mapper: (T) -> Ghul.MAYBE[U] pure
) -> Ghul.MAYBE[U] pure;
```

### first_or_throw

As `first`, throwing instead of returning absent when the source is empty.

```ghul
first_or_throw[T](source: Iterable[T]) -> T pure;
```

or, as a method:

```ghul
first_or_throw() -> T pure;
```

### first_map_or_throw

As `first_map`, throwing instead of returning absent.

```ghul
first_map_or_throw[T,U](
    source: Iterable[T],
    mapper: (T) -> Ghul.MAYBE[U] pure
) -> U pure;
```

or, as a method:

```ghul
first_map_or_throw[U](
    mapper: (T) -> Ghul.MAYBE[U] pure
) -> U pure;
```

### only

The single element the source holds, throwing when it holds none or more than one.

```ghul
only[T](source: Iterable[T]) -> T pure;
```

or, as a method:

```ghul
only() -> T pure;
```

### any

```ghul
any[T](
    source: Iterable[T],
    predicate: (T) -> bool pure
) -> bool pure;
```

or, as a method:

```ghul
any(predicate: (T) -> bool pure) -> bool pure;
```

### all

```ghul
all[T](
    source: Iterable[T],
    predicate: (T) -> bool pure
) -> bool pure;
```

or, as a method:

```ghul
all(predicate: (T) -> bool pure) -> bool pure;
```

### count

```ghul
count[T](source: Iterable[T]) -> int pure;
```

or, as a method:

```ghul
count() -> int pure;
```

### min

The smallest element, absent when the source is empty. `min` and `max` have no method form.

```ghul
min[T: Ghul.Comparable[T]](
    values: Iterable[T]
) -> Ghul.MAYBE[T] pure;
```

### max

```ghul
max[T: Ghul.Comparable[T]](
    values: Iterable[T]
) -> Ghul.MAYBE[T] pure;
```

### min_by

```ghul
min_by[T,K: Ghul.Comparable[K]](
    source: Iterable[T],
    key_selector: (T) -> K pure
) -> Ghul.MAYBE[T] pure;
```

or, as a method:

```ghul
min_by[K: Ghul.Comparable[K]](
    key_selector: (T) -> K pure
) -> Ghul.MAYBE[T] pure;
```

### max_by

```ghul
max_by[T,K: Ghul.Comparable[K]](
    source: Iterable[T],
    key_selector: (T) -> K pure
) -> Ghul.MAYBE[T] pure;
```

or, as a method:

```ghul
max_by[K: Ghul.Comparable[K]](
    key_selector: (T) -> K pure
) -> Ghul.MAYBE[T] pure;
```

The collecting combinators differ in what they hand back:

```ghul
…
let numbers = [3, 1, 4, 1, 5, 9, 2, 6];

// collect gives back the read-only List[T] trait, collect_list
// the mutable LIST[T], and collect_set drops duplicates
write_line("collect:      {numbers |> collect() |> join(", ")}");
write_line("collect_list: {numbers |> collect_list() |> join(", ")}");
write_line("collect_set:  {numbers |> collect_set() |> join(", ")}");

// partition splits on a predicate: the matching elements first
let (even, odd) = numbers |> partition(x => x % 2 == 0);

write_line("partition:    even {even |> join(", ")}, odd {odd |> join(", ")}");

// group_by keys each element, collecting the elements per key
let by_size = numbers |> group_by(x => if x < 5 then "small" else "large" fi);

write_line("group_by:     small {by_size["small"] |> join(", ")}");
write_line("group_by:     large {by_size["large"] |> join(", ")}");
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
collect[T](source: Iterable[T]) -> Collections.List[T] pure;
```

or, as a method:

```ghul
collect() -> Collections.List[T] pure;
```

### collect_array

```ghul
collect_array[T](source: Iterable[T]) -> T[] pure;
```

or, as a method:

```ghul
collect_array() -> T[] pure;
```

### collect_list

```ghul
collect_list[T](source: Iterable[T]) -> LIST[T] pure;
```

or, as a method:

```ghul
collect_list() -> LIST[T] pure;
```

### collect_set

```ghul
collect_set[T](source: Iterable[T]) -> SET[T] pure;
```

or, as a method:

```ghul
collect_set() -> SET[T] pure;
```

### collect_map

```ghul
collect_map[T,K,V](
    source: Iterable[T],
    key_selector: (T) -> K pure,
    value_selector: (T) -> V pure
) -> MAP[K,V] pure;
```

or, as a method:

```ghul
collect_map[K,V](
    key_selector: (T) -> K pure,
    value_selector: (T) -> V pure
) -> MAP[K,V] pure;
```

### partition

Splits the source in two on a predicate. The elements matching the predicate come first, then the elements not matching.

```ghul
partition[T](
    source: Iterable[T],
    predicate: (T) -> bool pure
) -> (LIST[T], LIST[T]) pure;
```

or, as a method:

```ghul
partition(
    predicate: (T) -> bool pure
) -> (LIST[T], LIST[T]) pure;
```

### group_by

Collects the elements into a map, keyed by what `key_selector` returns for each.

```ghul
group_by[T,K](
    source: Iterable[T],
    key_selector: (T) -> K pure
) -> MAP[K, LIST[T]] pure;
```

or, as a method:

```ghul
group_by[K](
    key_selector: (T) -> K pure
) -> MAP[K, LIST[T]] pure;
```

### reduce

Folds the source into a single value, starting at `seed` and calling `accumulator` with the running value and each element in turn. The second form passes the final running value through a mapper before returning it.

```ghul
reduce[T,TRunning](
    source: Iterable[T],
    seed: TRunning,
    accumulator: (TRunning,T) -> TRunning pure
) -> TRunning pure;

reduce[T,TRunning,TOut](
    source: Iterable[T],
    seed: TRunning,
    accumulator: (TRunning,T) -> TRunning pure,
    mapper: (TRunning) -> TOut pure
) -> TOut pure;
```

or, as a method:

```ghul
reduce[TRunning](
    seed: TRunning,
    accumulator: (TRunning,T) -> TRunning pure
) -> TRunning pure;

reduce[TRunning,TOut](
    seed: TRunning,
    accumulator: (TRunning,T) -> TRunning pure,
    mapper: (TRunning) -> TOut pure
) -> TOut pure;
```

### each

Calls `action` on every element. It returns nothing and, alone among these, is not `pure` - it exists for its side effects.

```ghul
each[T](source: Iterable[T], action: T -> void) -> void;
```

or, as a method:

```ghul
each(action: T -> void) -> void;
```

### append_to

Appends each element to a `StringBuilder`, separated by `separator`, or by `", "` when that is left off. `join` is the same thing answering a fresh string.

```ghul
append_to[T](
    source: Iterable[T],
    into: System.Text.StringBuilder,
    separator: string
) -> System.Text.StringBuilder;

append_to[T](
    source: Iterable[T],
    into: System.Text.StringBuilder
) -> System.Text.StringBuilder;
```

or, as a method:

```ghul
append_to(
    into: System.Text.StringBuilder,
    separator: string
) -> System.Text.StringBuilder;

append_to(
    into: System.Text.StringBuilder
) -> System.Text.StringBuilder;
```

### join

Renders the elements into one string, separated by `separator`, or by `", "` when left off.

```ghul
join[T](source: Iterable[T], separator: string) -> string pure;

join[T](source: Iterable[T]) -> string pure;
```

or, as a method:

```ghul
join(separator: string) -> string pure;

join() -> string pure;
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

Semicolons are required: to separate statements and definitions. 

While the compiler _could_ still unambiguously parse correct programs without requiring semicolons anywhere, having them at the end expression statements makes it clearer to the parser if the expression is incomplete or not well formed.

## definitions and statements

Blocks in ghūl can contain definitions, statements, or a mix of both. Which is permitted in a given block depends on the type of block.

## file structure

At its top level a ghūl source file contains [definitions](https://ghul.dev/definitions.html) and `use` directives; a file with no `namespace` can also contain statements. There is no required ordering and no file header.

```ghul
use IO.Std.write_line;

greet(name: string) is
    write_line("hello, {name}");
si

greet("world");
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
use IO.Std.write_line;

// in a file with no namespace, statements at the top level run in
// order as the program's entry point
write_line("first");
write_line("second");

// definitions in the same file are still visible, wherever they sit
greet(name: string) is
    write_line("hello, {name}");
si

greet("ghūl");
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
let x = 10;
```

A bare `let` fixes the variable, not the value: after `let xs = LIST[int]();`, `xs` always refers to the same list, but the list itself can still be mutated. Whether the value can change is a property of its type: a tuple or an array cannot be modified, a `LIST` can.

An explicit type can be given alongside the initializer. The initializer must be assignment compatible with the type:

```ghul
let x: int = 42;
```

The explicit type can be wider than the initializer expression:

```ghul
let o: object = "a string";
```

A trailing `mut` makes the variable reassignable: `let total mut = 0;` defines `total` with initial value 0, and `total` can be assigned again later. A `mut` variable can also be defined with no initializer, as in `let result: int mut;`. It then starts at the default value of its type: zero, `false`, or `null`.

Either form can take its value from `_`, the default-value expression: `let x = _;` initializes `x` to the default value of whatever type the context expects, and `_[T]` names the type explicitly.

Multiple variables can be defined in the same `let` statement, with each variable either taking its type from its initializer or given an explicit one:

```ghul
let
    an_inferred_int = 123,
    an_explicit_int: int = 456,
    a_string = "hello";
```

The name `_` is a discard placeholder. It can stand in for any variable name, but the value that would be assigned to it is discarded. `_` is accepted in `let` definitions, tuple destructuring, anonymous function parameters, and `for` loop variables:

```ghul
…
let _ = side_effect();
let (_, _, third) = (1, 2, 3);
let only_first = (x: int, _: int) => x;
for _ in 1..10 do
    counter = counter + 1;
od
```

Variables can only be defined within functions, methods or property bodies. Variable names should be in `snake_case`.

## functions

In ghūl functions consist of a name and a parenthesized formal arguments list, followed by an optional return type after `->` (omitting it makes the function `void`), and then either a return expression or a function body:

```ghul
sum_two_ints(i: int, j: int) -> int => i + j;

sum_three_ints(i: int, j: int, k: int) -> int is
    return i + j + k;
si
```

`=>` introduces a single-expression body, while the `is` and `si` keywords are used to delimit block bodies.

To return a value from a block body, you can write it as the last statement with no terminating `;`, instead of writing `return`. Any statement that produces a value works: an expression, an `if`, a `case`, a `val ... lav` block. With the `;`, the value is discarded, like the value of any other expression statement. See [block bodies return their tail](https://ghul.dev/expression-oriented-programming.html#block-bodies-return-their-tail) for the rule in full.

```ghul
…
class RECTANGLE(width: int, height: int) is
    // a method body ends the same way a function body does
    area() -> int is
        width * height
    si

    // a terminated last statement is discarded, so this one returns explicitly
    describe() -> string is
        let label = "{width}x{height}";

        return "{label} = {area()}";
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
do_something(what: string, why: string, to: int);
```

A formal argument can also be a tuple-destructure pattern, written in its own parentheses. It is still one argument, with the written tuple type; when the function is called, the value is unpacked into the names the pattern gives. Named functions, anonymous functions, asynchronous functions and generators all accept them, and the type can be any type that destructures positionally:

```ghul
…
// one parameter at the tuple type, unpacked into a and b
add_pair((a: int, b: int): (int, int)) -> int => a + b;

write_line(add_pair((3, 4)));

// anonymous functions take the same form, element types
// inferred from the sequence
let pairs = [(1, 2), (3, 4)];
let total = pairs | .map(((a, b)) => a + b) | .reduce(0, (acc, x) => acc + x);

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
let a_thing = THING();
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
let origin = POINT(0.0D, 0.0D);

// or up, or down, or even left, depending on
// your co-ordinate system!
let right = POINT(1.0D, 0.0D);
```

A struct defines a new value type. Assigning a struct copies all of its fields, so the copy and the original are independent afterwards:
```ghul
…
struct COUNTER is
    _n: int field;

    init(n: int) is _n = n; si

    bump() is _n = _n + 1; si

    value: int => _n;
si

let original = COUNTER(0);
let copy mut = original;

copy.bump();

write_line("original {original.value}, copy {copy.value}");
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
    print();
si
```

Traits are similar to interfaces in other languages. Trait methods and properties without a default implementation must be implemented by any class, struct, or union that declares the trait:
```ghul
…
class BOOK(title: string, author: string): Printable is
    print() is
        write_line("Title: {title}, Author: {author}");
    si
si
```

A trait method or property can provide a default body. Implementing classes inherit the default and only need to override it to change the behaviour:

```ghul
…
trait Logged is
    log(message: string) is
        // the default body writes the message with a [log] prefix
        write_line("[log] {message}");
    si
si

class PLAIN(): Logged is
    // no override - uses the trait default
si

class LOUD(): Logged is
    // override the default, while still calling through to it with super
    log(message: string) is
        super.log(message.to_upper());
    si
si

PLAIN().log("hello");
LOUD().log("hello");
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
    NODE(left: Tree, right: Tree);
    LEAF(value: int);
si
```
Unions are a reference type. A reference of union type can point to only one variant at a time. To discover which variant a union currently holds, test it with `isa Variant(value)`:

```ghul
…
let tree: Tree = Tree.NODE(Tree.LEAF(123), Tree.LEAF(456));
let leaf = Tree.LEAF(123);

if isa Tree.NODE( ► tree) then
    write_line("have tree node");
elif isa Tree.LEAF( ► tree) then
    write_line("have tree leaf");
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
    );
elif isa Tree.LEAF(tree) then
    write_line("leaf value {tree.value}");
fi
```

Unions support structural equality through the `=~` operator. Two union references compare equal when they hold the same variant with member-wise equal fields:

```ghul
…
let leaf1 = Tree.LEAF(123);
let leaf2 = Tree.LEAF(123);
let leaf3 = Tree.LEAF(456);

assert leaf1 =~ leaf2;
assert !(leaf1 =~ leaf3);
```

A variant with no fields is a *unit variant*. It is referenced by name, without parentheses, and all uses of a unit variant share one value. When exactly one variant of a union has fields, the union behaves as an option type: `u?` tests whether `u` holds that variant, and `u!` unwraps its value. A union where several variants have fields can mark one of them `default` to get the same behaviour:

```ghul
…
let c = Color.RED;                   // unit variant, referenced without parentheses
write_line("red: {c =~ Color.RED}"); // true

let r = lookup();
write_line("present: {r?}");         // true - r holds the default OK variant
write_line("value: {r!}");           // 42 - unwraps the OK payload
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
let t = Token.IDENTIFIER("count", "identifier");
write_line(t.name);    // identifier - shared primary-header field
write_line(t.label()); // [identifier] - inherited trait default
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
    CIRCLE(radius: int);
    SQUARE(side: int);
si

partial Shape is
    describe() -> string =>
        case self
        when c: CIRCLE then "circle r={c.radius}"
        when s: SQUARE then "square s={s.side}"
        esac;
si

let s: Shape = Shape.SQUARE(4);
write_line(s.describe());
```

output:

```
square s=4
```

An `impl Trait for Type` block additionally makes the target implement a trait, so a type can satisfy a trait without naming it in its header. The trait's type arguments are written on the target after `for`, and inside the body `self` has the concrete target type, so a union's variants can be matched directly:

```ghul
…
union List is
    NIL;
    CONS(head: int, tail: List);
si

impl Printer for List is
    print() -> string =>
        if let (head, tail): CONS = ► self then "{head} {tail.print()}"
        else "nil"
        fi;
si

let xs: Printer = List.CONS(1, List.CONS(2, List.NIL));
write_line(xs.print());
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
    count: int;
si

class SIZED is
    _size: int;

    size: int => _size,
        = new_size is
            assert new_size > 0;

            _size = new_size;
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
        return _summary;
    fi
    ► _summary = "nothing to report";
    return _summary;
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
    _scale: double;

    scale(value: double) -> double => value * _scale;
si
```

A method or function can take a postfix `pure` modifier. It declares that the function does not write to the heap: it assigns no field, property, or array element of any object. The compiler proves this from the body for most functions without needing the modifier. The declaration matters to [type narrowing](https://ghul.dev/narrowing-in-depth.html): a call can invalidate a narrowing, because the callee might assign the member the narrowing depends on, but a call to a pure function cannot, so narrowings survive it. The modifier exists for bodies the compiler cannot prove; it is trusted as declared, and every override of a pure member must itself be pure:

```ghul
…
// a pure method only reads: callers keep narrowing facts across a call to it
doubled() -> int pure => _count * 2;
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
    ◆▼ name: string;
    ◆▼ label() -> string;
si

class USER: NAMED is
    ▲ name: string;

    init(name: string) is
        self.name = name
    si

    ▲ label() -> string => "<{name}>";
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
    x: int;
    y: int;

    init(x: int, y: int) is
        self.x = x;
        self.y = y;
    si

    // a binary operator as an instance method takes one parameter, the right operand:
    +(other: VECTOR) -> VECTOR => VECTOR(x + other.x, y + other.y);
si

let sum = VECTOR(1, 2) + VECTOR(3, 4);
write_line("({sum.x}, {sum.y})");
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
<>(other: BOX) -> int => value - other.value;
…
```

Operators can be defined globally, or as members of classes, structs and traits. An operator name is any run of symbol characters, such as `+`, `**`, `##`, or `∩`.

## constructors

In ghūl methods named `init` are constructors. When an object is constructed using a constructor expression, the corresponding `init` method overload will be called based on the actual argument types:

```ghul
class COUNTER is
    count: int;

    init() is
        count = 0;
    si

    init(initial_count: int) is
        count = initial_count;
    si
si
…
// calls the parameterless overload of init()
let c = COUNTER();

// calls init(initial_count: int)
let d = COUNTER(50);
```

Constructors can be defined in classes and structs.

A member whose type is not optional has to be assigned before the constructor finishes. The compiler tracks which members each constructor definitely assigns, and reports a `field-definite-assignment` warning on a constructor that can finish with one or more of them unassigned, naming each one: the object it produces would hold null in a member whose type does not allow it:

```ghul
…
class LABEL is
    text: string;
    size: int;

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
        write_line("{name} is {age} years old");
    si
si

PERSON("alice", 30).describe();
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
    _x;
    _y;

    show() is
        write_line("({_x}, {_y})");
    si
si

class BOX(width: int public, height: int field, _depth: int) is
    // width is a public read-write property
    // height is a plain field
    // _depth is a private field
si

POINT(10, 20).show();
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
    super(name);

    init(.., trick: string) is
        // .. expands to (name, breed); the primary init has already run
        write_line("{name} the {breed} can {trick}");
    si
si

DOG("rex", "labrador", "sit");
```

output:

```
rex the labrador can sit
```

A primary-constructor class or struct also gets a synthesised `deconstruct` built from its public-readable parameters, so `let (x, y) = POINT(3, 4)` destructures without writing one out.

A class or struct with a primary header and no body declarations can end with a terminating `;` instead of `is ... si`:

```ghul
// a primary header with no body declarations:
class POINT(x: int, y: int);

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
            IO.Std.write_line("did something");
        si
    si
si
…
Outer.Inner.do_something();
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
        IO.Std.write_line("did something");
    si
si
…
Outer.Inner.do_something();
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
        run();
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
    run() is si
si
…
```

### definitions outside any namespace

If a source file contains no namespaces, then all definitions in the file are placed in a compiler generated namespace that is private to that source file, and the file can have [top-level statements](https://ghul.dev/syntax.html#top-level-statements) that run as the program's entry point. This is useful for examples and tests:

```ghul
// the compiler places this in an auto-generated
// namespace private to this source file
IO.Std.write_line("Hello, world!");
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
        IO.Std.write_line("hello from a namespace");
    si
si
…
greet() is
    IO.Std.write_line("not in a namespace");
si
```

diagnostics:

- error: cannot mix global definitions and namespaces in the same file

## importing symbols with `use`
Symbols can be brought into the current namespace instance's scope using the use keyword. Imported symbols can then be used without qualification:

```ghul
use Example.TEST;

...

let t = TEST();
```

`use` applied to a namespace imports all symbols from that namespace:
```ghul
use Example; // imports Example.TEST and Example.Test

...

let t: Test;
```

Note that `use` only applies within the current `namespace` definition. It does not import a symbol into all instances of the current namespace:

```ghul
…
namespace UseExample is
    use Example;

    class ANOTHER_TEST: Test is
        run() is si
    si
si

namespace UseExample is
    // Test still needs qualification here
    class YET_ANOTHER_TEST: Example.Test is
        run() is si
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

public_function() -> int => 0;

public_property: int;

class _PRIVATE is
si

_private_function() -> int => 0;

_private_property: int;
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
    public_property: int;

    _private_property: string;

    init(value: int) is
        public_property = value;
        _private_property = "value is {value}";
    si
si
…
let v = VALUE(1234);

// OK: public_property is publicly readable
write_line(v.public_property);

write_line(v._private_property);

v.public_property = 5678;
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
let i = 12_345_678; // int
let hex = 0x1234_ABCD; // int
let long = 1_000_000_000_000_000L; // long

let hex_unsigned_long = 0x1234_5678__9ABC_DEF0_UL; // ulong

let b = 99b; // byte
```

### char
```ghul
let c = 'c';
let u_macron = 'ū'
```

### floating point
```ghul
let s = 123.456; // single
let t = 123.456E5; // single

let d = 123.456D; // double
let e = 123_456_789_000.0D // double
```

### string
```ghul
let hello_world = "Hello World!";
let unicode = "ghūl programming language"
```

### array
Array literals are constructed from a comma separated list of element values enclosed in `[` and `]`. The array element type is inferred as the most specific type compatible with all elements (which may be `object` if no more specific ancestor type exists). The resulting array type is `E[]` where `E` is the inferred element type. 

```ghul
let animals = ["frog", "bat", "elephant"]; // string[]
let things = ["frog", 1234, 12.5]; // object[]
let lists = [[1, 2], [3, 4], [5, 6], [7, 7]]; // int[][]
```

### tuple

Tuple literals are constructed from a comma separated list of elements enclosed in `(` and `)`. Each element can be a bare value or a named value, and each element can optionally specify a type. Where explicit types are omitted, element types will be inferred.

```ghul
let path_with_id = (path = "/tmp/my-file.txt", id = 1234);

let path = path_with_id.path;
let id = path_with_id.id;
```

If tuple elements are not explicitly named, they are assigned names consisting of a back-tick followed by an index

```ghul
let things = ("thing", 12.34);

let name = things.`0;
let weight = things.`1;
```

### function

Function literals are constructed from an parenthesized argument list, a return type, and a return expression or a function body. If there is only one argument, no parentheses are needed.

#### expression body function literal

```ghul
let simple_add = (x: int, y: int) -> int => x + y;
```

#### block body function literal

```ghul
let complex_add = (x: int, y: int) -> int is
    let result = x + y;
    return result;
si;
```

#### type inference

Return type can usually be omitted provided it can be inferred from the type of the expression body or any values returned from the block body

```ghul
let simple_add = (x: int, y: int) => x + y;

let complex_add = (x: int, y: int) is
    let result = x + y;
    return result;
si;
```

Argument types usually can be inferred if the function literal is being passed into a function.

```ghul
…
let list = [1, 2, 3, 4, 5];

list |> filter(element => element < 3);
```

#### capturing and closure

A function literal can refer to identifiers from its surrounding lexical scope; those references form its closure:

```ghul
…
// Define a list to hold the closures:
let closure_list = LIST();

// Iterate over an integer range:
for i in 1::10 do
    // Create a closure capturing i's current value
    let closure = () => i;

    // Add the closure to the list:
    closure_list.add(closure);
od

// Each closure captured the value of i at the
// time of its creation:
for closure in closure_list do
    write_line("Closure captured value: {closure()}");
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
let counter mut = 0;

let bump = (n: int) is
    counter = counter + n;
si;

let peek = () -> int => counter;

bump(10);
bump(5);

write_line("counter = {counter}, peek() = {peek()}");
```

output:

```
counter = 15, peek() = 15
```

## arithmetic

Arithmetic expressions allow you to perform mathematical calculations using operators such as `+`, `-`, `*`, `/`, and `%`.

```ghul
let sum = 10 + 5;           // Addition
let difference = 10 - 5;    // Subtraction
let product = 10 * 5;       // Multiplication
let quotient = 10 / 5;      // Division
let remainder = 10 % 3;     // Modulo (remainder)
```

## comparison

Comparison expressions allow you to compare values using operators such as `==`, `!=`, `<`, `>`, `<=`, and `>=`.

```ghul
let equal = 5 == 5; // Equality
let not_equal = 5 != 10; // Inequality
let less_than = 5 < 10; // Less than
let greater_than = 10 > 5; // Greater than
let less_than_or_equal = 5 <= 5; // Less or equal
let greater_than_or_equal = 10 >= 10; // Greater or equal
```

## short circuit logical

Logical expressions allow you to combine or negate boolean values using the `/\` (logical AND), `\/` (logical OR), and `!` (logical NOT) operators.

```ghul
let logical_and = true /\ false;    // Logical AND
let logical_or = true \/ false;     // Logical OR
let logical_not = !true;            // Logical NOT
```

Evaluation stops as soon as the result is known

## conditional

Conditional expressions allow you to evaluate different expressions based on a condition using the `if`-`then`-`else` construct.

```ghul
…
let max = if a > b then a else b fi;
```

## case expression

A `case` expression yields the value of the matched arm. It needs an `else` arm so that every value is covered; the arm values and the `else` agree on a type:

```ghul
…
let n = 2;

let size =
    case n
    when 0 then "none"
    when 1, 2, 3 then "small"
    else "large"
    esac;

write_line("size = {size}");
```

output:

```
size = small
```

## function call

Function call expressions allow you to invoke functions and methods by providing the necessary arguments.

```ghul
…
let result = sum(10, 5);
```

## thread-first calls

The `|>` operator threads its left side into the call on its right as that call's first argument, so `x |> f(a)` means `f(x, a)`. Chaining is left-to-right, which turns a nest of calls inside-out into a readable pipeline:

```ghul
use IO.Std.write_line;

class BOX(value: int);

twice(x: int) -> int => x * 2;
describe(b: BOX) -> string => "box of {b.value}";

// '|>' threads its left side in as the first argument of the call on
// its right, so a chain reads left-to-right instead of nesting
// inside-out. This line means write_line(describe(BOX(twice(21)))).
21 |> twice() |> BOX() |> describe() |> write_line();
```

output:

```
box of 42
```

The right side must be call-shaped: a free function, a constructor, or a method call on a receiver. The left side always becomes the first argument; the call is otherwise resolved exactly as if it had been written without the `|>`. This is separate from the `|` [pipe](https://ghul.dev/functional-programming.html) operator, which wraps a sequence for lazy `map` and `filter`; `|>` performs an ordinary call.

## property access

Property access expressions allow you to access the properties of an object using the dot notation.

```ghul
let length = "Hello".length;
```

## indexer

Indexer expressions allow you to access elements of an array or collection using square brackets.

```ghul
let first_element = [1, 2, 3][0];
```

## constructor

Constructor expressions allow you to create new instances of classes or structs by invoking their constructors.

```ghul
…
let point = POINT(10, 20);
```

## type cast

A type cast converts a value from one type to another explicitly, using the `cast` keyword. Scalar conversions, casts between unrelated reference types, and .NET user-defined conversion operators all go through it:

```ghul
let integer_value = cast int(3.14);
```

The target type can be left out when the surrounding expression already determines it. `cast(v)` converts `v` to whatever type the position it sits in calls for - a typed `let` initializer, an assignment, a `return` or `=>` body, a call argument's formal, an operator's other operand, an index:

```ghul
…
average(count: int, total: single) -> single =>
    total / cast(count);   // cast(v) takes its type from the formal

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
let a = _[int];   // 0
let b: string? = _;   // null
…
zero[T]() -> T => _;
```

`let a = _` initialises a local to its type's default value, where the type is inferred from how the local is later used.

## let in

A `let ... in ...` expression introduces one or more local variables that are in scope only within the trailing expression.

```ghul
…
let area = let r = 5 in r * r;

write_line("area = {area}");
```

output:

```
area = 25
```

## block

A `val ... lav` block is a sequence of statements that produces a value. The value is the block's tail expression, or any `return E` whose target is the block. A block gives an expression room for intermediate local variables, loops, and early exits:

```ghul
…
let area = val
    let width = 4;
    let height = 5;
    width * height
lav;

write_line("area = {area}");
```

output:

```
area = 20
```

A `return E` inside a `val ... lav` block yields from the block, not from the enclosing function.

These are the main types of expressions in ghūl. They can be combined and nested to form more complex expressions and statements:


```ghul
let x = 10;
let y = 5;
let sum = x + y;
let product = x * y;
let is_greater = x > y;

if is_greater then
    IO.Std.write_line("x is greater than y");
else
    IO.Std.write_line("x is not greater than y");
fi

let numbers = [1, 2, 3, 4, 5];
let first_number = numbers[0];

IO.Std.write_line(
    "The first number is: {first_number}"
);
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
assert true else "all bets are off"; // does not throw

let list = [1, 2, 3, 4, 5];

assert 3 < list.count
    else System.ArgumentOutOfRangeException("list");

write_line("ok: {list.count} elements");
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
    key.length;

write_line(length_of("hello"));
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
let list = [1, 2, 3, 4];

if list.count > 0 then
    write_line("list has {list.count} elements");
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
    write_line("list is not empty");
else
    write_line("list is empty");
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
let list = [1, 2, 3, 4];

if list.count == 0 then
    write_line("list is empty");
fi

if list.count > 0 then
    write_line("list is not empty");
else
    write_line("list is empty");
fi

if list.count > 10 then
    write_line("list has lots of elements");
elif list.count > 5 then
    write_line("list has some elements");
elif list.count > 0 then
    write_line("list has a few elements");
else
    write_line("list is empty");
fi
```

output:

```
list is not empty
list has a few elements
```

### type narrowing

An `if` condition that proves something stronger about a value - an `isa` test on a class or union variant, a `?` presence test on an optional - narrows the value to the stronger type inside the branch, and a guard that leaves the block narrows the code after it. [Type narrowing](https://ghul.dev/type-narrowing.html) covers this in full: locals, parameters, fields and properties, and narrowing on assignment; [narrowing in depth](https://ghul.dev/narrowing-in-depth.html) covers what happens to a narrowing across calls.

### if let

`cast T?(x)` views `x` as type `T`, and yields the absent value (rather than throwing) when `x` is not a `T`. A cast followed by a presence test is therefore a safe, explicit type test. Written without the `?`, the cast is checked instead: a value that is not a `T` raises `System.InvalidCastException` there, and a `cast-may-throw` warning says so at the site. See [type cast](https://ghul.dev/expressions.html#type-cast) for the rest of the cast surface.

```ghul
…
let c = cast CAT?(a);

if ► c? then
    write_line(c.purr());
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
    write_line(c.purr());
else
    write_line("not a cat");
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
    write_line(c.purr());
elif let d: DOG = ► a then
    write_line(d.bark());
else
    write_line("some other animal");
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
    // reader.read_line() yields string?;
    // line is string here
    write_line("read: {line}");
else
    write_line("end of input");
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
    write_line("found {name}");
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
    write_line("friendly cat: {c.name}");
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
let rows = [("apples", 3), ("pears", 1), ("plums", 0)];
let wanted = "pears";

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
    write_line(customer.name);
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
let a = 5;

if a > 0 then
    // new scope - neither y nor z are in scope here
    let x = 10;
    write_line("x is {x}");
elif a < 0 then
    // new scope - neither x nor z are in scope here
    let y = 20;
    write_line("y is {y}");
else
    // new scope - neither x nor y are in scope here
    let z = 30;
    write_line("z is {z}");
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
let counter mut = 0;
while counter < 5 do
    write_line(counter);
    counter = counter + 1;
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
let counter mut = 0;
while counter < 10 do
    if counter == 5 then
        break;
    fi
    write_line(counter);
    counter = counter + 1;
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
let counter mut = 0;
while counter < 5 do
    counter = counter + 1;
    if counter == 3 then
        continue;
    fi
    write_line(counter);
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
    write_line(n);
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
    write_line(i);
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
    write_line(i);
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
    write_line(i);
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
let zero_to_four = 0..5;
let five_to_nine = 5..10;

let zero_to_nine = zero_to_four |> cat(five_to_nine);

while zero_to_nine.move_next() do
    write_line(zero_to_nine.current);
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
let counter mut = 0;
do
    write_line(counter);
    counter = counter + 1;
    if counter == 5 then
        break;
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
od;

let miss: int? = for x in [1, 3] do
    if x > 50 then break x fi
od;

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
let rows = [[1, 2, 3], [4, 5, 6]];

let first_even: int? =
    for row in rows do
        for cell in row do
            if cell % 2 == 0 then break cell fi
        od
    od;

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
        return "minus one";

    when 0 then
        let result = "zero";
        return result;

    when 1 then
        return "one";

    when 2 then
        return "two";

    when 3 then
        return "three";

    when 4 then
        return "four";

    when 5 then
        let result = "five";
        return result;

    when 6, 7, 8, 9 then
        return "more than five and less than ten";

    when 13 then
        return "unlucky";

    else
        return "less than -1 or more than nine";
    esac
si

write_line(classify(0));
write_line(classify(3));
write_line(classify(7));
write_line(classify(13));
write_line(classify(-5));
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
write_line(respond("help"));
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
esac;

write_line(label);
```

output:

```
server error
```

### pattern arms

A `when` arm can take a pattern instead of an equality list, mirroring [`if let`](#if-let): `when v: T then` type-tests and introduces the variable, `when (a, b) then` destructures, and `when _: T then` type-tests without introducing one. A bare identifier stays an equality test - `when v then` compares against the value of `v` in scope and introduces no new local. A pattern arm can take a trailing `/\` guard; the names the pattern introduces are in scope in the guard and the arm body, and a failing guard falls through to the next arm as though the pattern hadn't matched:

```ghul
…
    case a
    when c: CAT then c.meow()
    when d: DOG then d.bark()
    esac;

write_line(describe(CAT()));
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
        );
    fi

    return balance - amount;
si
```

The thrown value must be an exception: `System.Exception`, or a type derived from it.

### exception types

An exception is any class that derives from `System.Exception`, or from a more specific exception type:

```ghul
class INSUFFICIENT_FUNDS_EXCEPTION(message: string): System.Exception is
    super(message);
si
```

```ghul
…
try
    withdraw(account, 100);
catch e: INSUFFICIENT_FUNDS_EXCEPTION
    write_line("declined: {e.message}");
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
let reader mut: StreamReader;

try
    reader = StreamReader("file.txt");
    let content = reader.read_to_end();

    write_line(content);

catch e: FileNotFoundException
    // Handle the case where the file is not found
    write_line("Error: file not found: {e.message}");
catch e: IOException
    // Handle errors during file reading
    write_line("Error: reading file: {e.message}");
finally
    // Close the file and clean up resources
    if reader? then
        reader.close();
    fi

    write_line("File processing completed, file closed.");
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
    let content = File.read_all_text("file.txt");
    write_line(content);

    write_line("File processing completed.");
catch e: FileNotFoundException
    // Handle the case where the file is not found
    write_line("Error: file not found: {e.message}");
catch e: IOException
    // Handle errors during file reading
    write_line("Error: reading file: {e.message}");
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
let reader mut: StreamReader;

try
    reader = StreamReader("file.txt");

    let content = reader.read_to_end();
    write_line(content);

    write_line("File processing completed.");

finally
    if reader? then
        reader.close();
    fi

    // Any exceptions will be thrown to the calling code
yrt
```

### finally and return

A `finally` block runs whenever control leaves the `try` block, including when the `try` block, or a `catch` block, executes a `return`. The `finally` block runs first, then control returns to the caller:

```ghul
read_file(path: string) -> string is
    let reader = StreamReader(path);

    try
        return reader.read_to_end();
    finally
        reader.close(); // runs before the function returns
    yrt
si
```

## return statement

### return without value

In functions of void return type, a bare `return` statement with no value returns control flow directly to the caller  

```ghul
tries: int;
…
try_something(limit: int) is
    if tries > limit then
        return; // give up
    fi

    tries = tries + 1;

    // do stuff
si
```

### return value

In functions of non-void return type, `return` statements must return a value of a type that's assignment compatible with the function's return type

```ghul
…
fib(n: int) -> int is
    if n < 0 then
        return 0;
    elif n == 1 then
        return 1;
    else
        return fib(n - 1) + fib(n - 2);
    fi
si

for i in 0::10 do
    write_line("fib({i}) = {fib(i)}");
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
let i = default_return();
assert i == 0;
write_line("default return value is {i}");
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

<a id="narrowing-in-depth"></a>

# narrowing in depth

> **editable examples**
>
> Every example on this page can be edited and run here: click the pencil to open it in an editor, change it, and run it in your browser. Errors, hovers and completions come from the ghūl compiler as you type.
>
> The [ghul-examples repository](https://github.com/degory/ghul-examples/tree/main/examples/type-inference) has fuller examples that include narrowing, to build and run locally, in a GitHub Codespace or a dev container.

The [type narrowing](https://ghul.dev/type-narrowing) page covers where narrowing happens: conditions, guards, locals, fields and properties, and assignment. This page covers how long a narrowing lasts - how the compiler decides whether a call invalidated one, what the `pure` modifier declares, and what a `stable` property promises.

## how long a narrowing lasts

Narrowing is optimistic: the compiler narrows whenever a test proves something, and checks afterwards whether the narrowing still holds where it is used. It has to check, because values change, and their types change with them: a value that was present can be reassigned to null.

A narrowing lasts at most to the end of the code block associated with the test - the then or else arm of the `if`, or the loop body. It can end earlier, because the value can change before the block ends: by an explicit reassignment, or because a call to a function or method changes it, directly or indirectly.

The compiler tracks the calls that might do that, conservatively: it builds a call graph and works out which fields each call might write. When you use a narrowed value in a way that depends on the narrowing - you read a member through it, or pass it where only the non-optional or narrower type is accepted - and the compiler cannot prove the value is still what the test saw, it reports the use as potentially unsafe, naming the call it could not prove and pointing back at the test:

```ghul
…
describe(carrier: CARRIER, other: Animal) is
    if isa CAT( ► carrier.occupant) then
        ◄ carrier.swap(other);
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
        carrier.handle();
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
    let cat = carrier.occupant;

    if isa CAT( ► cat) then
        carrier.swap(other);
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
whitespace are concatenated into a single literal.

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
discarded. At any other closing keyword - `fi`, `esac`, `od`, `lav` - the trailing
`;` stays optional and does not affect the value the block produces.

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
                    | "val" StatementList "lav"              /* block expression */
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
| `rewrite-syntax-trees`         | Light syntax-tree rewrites that simplify later passes: expanding dotted namespace names into nested form, synthesising accessor methods for properties, indexers and union variants, and spilling operand-position subexpressions sitting to the left of an `await` so their values survive the suspend. |
| `declare-symbols`              | Walks the syntax tree and registers every declaration (type, function, field, parameter, local) in the symbol table, attached to the appropriate scope. |
| `resolve-uses`                 | Resolves the `use` declarations in each namespace block against the namespaces or members they name, so short names work in subsequent passes. |
| `resolve-type-expressions`     | Turns type annotations in declarations, signatures, and in expression-position uses like `cast`, `isa`, `typeof` and `_` into the semantic `Type` objects later passes use. |
| `resolve-ancestors`            | Attaches base classes, trait parents and default ancestors to classes, traits, structs, unions and enums, and validates the inheritance constraints. |
| `resolve-explicit-types`       | Registers each variable's, property's and parameter's declared type on its symbol, so the declared type is available to constrain inference later. |
| `resolve-overrides`            | Pulls inherited symbols down into each container type's scope; for every method whose signature matches an ancestor's virtual or abstract method, records the override link and checks the override is consistent. Reports duplicate top-level functions. |
| `record-type-argument-uses`    | For every closure body, records which of the enclosing scope's generic type parameters the body references, so the closure frame can plumb them through at runtime. |
| `mark-boxed-locals`            | Marks `let mut` locals (and parameters) that are both captured by an anonymous function and reassigned, so the IL pass wraps them in a `Ghul.BOX[T]` cell shared between the enclosing scope and every capturer. |
| `compile-expressions`          | The largest pass. Walks every expression in every function body, working out its type, resolving operator and method overloads, running type inference, applying flow-sensitive narrowing, and producing IR values that describe what the IL should look like. |
| `warn-implicit-mutable-let`    | Emits warnings for `let` variables that are mutated but were not declared `mut`, when the corresponding compiler flag is set. |
| `generate-il`                  | Walks the syntax tree one last time and writes the assembly, encoding the IR values produced by `compile-expressions`. |

Whether each pass actually runs depends on the build flags. A plain syntax
check stops after the early passes; a full build runs all of them.
Analysis mode runs everything up to `compile-expressions` but does
not emit IL.

A short overview of each:

### `conditional-compilation`

ghūl's conditional compilation is a pragma annotation: a `@IF.flag()`
applied to a single definition or statement gates that item on whether
`flag` was passed at compile time. There is no else/endif form; a
disabled item is omitted. This pass walks the syntax tree and
nullifies each disabled item - definitions are replaced by an empty
definition list, statements by `null` - so subsequent passes can skip
them.

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

### `declare-symbols`

Walks the definitions in the syntax tree and creates symbol-table entries
for them: types for each class, trait, struct, union, variant and enum;
functions and methods; fields, properties, parameters and local variables.
Each declaration goes into the appropriate scope so that later passes can
look it up.

This pass also scans every function body for `yield` and `await`
expressions and classifies the function accordingly: plain, generator
(returns `Iterable[T]` and contains `yield`), or asynchronous (contains
`await`). The classification is what later tells the IL pass to emit a
generator or async state machine for the function instead of a straight
method body.

### `resolve-uses`

Processes the `use` declarations that appear in each `namespace` block,
resolving each one to the namespace, static function group or non-instance
member it names, and attaching the result to the namespace's scope. After
this pass, short names introduced by `use` are findable by the
namespace-scope lookups that subsequent passes perform.

This is the entire job of the pass. Identifier resolution inside
expressions and function bodies - looking up a local, a parameter, a
field, or a member access - is deferred to `compile-expressions`,
where types are available to resolve overloads.

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
information attached by `declare-symbols` and the `spill-awaits`
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
  to the stronger type);
- produces *IR values* that describe, for each expression, the sequence
  of IL operations it stands for.

Inference inside this pass is bidirectional: information flows up from
inner expressions, and back down from contexts that constrain what an
expression's type can be. A function's signature is always explicit, so
inference is confined to function bodies and never changes anything
visible from outside the function.

### `warn-implicit-mutable-let`

A `let` that is assigned to after its initializer counts as a mutable
variable but does not say so on its declaration. When the corresponding
warning is enabled, this pass walks the syntax tree and reports each
local variable or parameter whose `is_reassigned` flag was set by the
assignment handling in `compile-expressions`. Captured variables
and explicit `let mut` declarations are skipped.

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
  functions, and methods.
- `TUPLE` - a tuple type, with optional element names.
- `ARRAY` - a fixed array type.
- `OPTION`, `ONE_OF`, `NONE`, `NULL` - optional and union variations.
- `INFERRED_VARIABLE_TYPE` and friends - placeholders used during
  inference, replaced by concrete types as constraints accumulate.
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
stores them in `DIAGNOSTICS_STORE`. The IDE retrieves diagnostics by
reading the store after a compile.

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

Communication uses a small text protocol. The IDE sends a request as a
keyword like `#EDIT#`, `#COMPILE#`, `#HOVER#`,
`#DEFINITION#`, `#COMPLETE#` or `#HOVERMAP#`,
followed by any arguments it needs on subsequent lines. The compiler
replies with a header line, optional result lines, and ends each response
with a form-feed character so the IDE knows the reply is complete. The
protocol was chosen to be simple enough to implement without a JSON
parser; the format is stable and the editor is expected to ignore lines
it does not recognise.

The interesting work happens around two requests:

- **`#EDIT#`** - sent on every keystroke (after a short debounce).
  Re-parses the file the user is editing and re-runs the early passes
  over it, keeping the rest of the project's syntax trees untouched.
  This is fast enough to keep up with typing, and it is what produces the
  squiggles and hovers that appear as the user types.
- **`#COMPILE#`** - sent during a longer pause in typing. Runs the
  full pass sequence over the whole project so that any consequences of
  the edit ripple through the rest of the analysis.

This two-stage pattern keeps the typical-case latency low without
sacrificing correctness once the user pauses. Hover information,
go-to-definition, completions and signature help all come from the state
these passes maintain: the symbol table, the scopes, the per-node type
annotations and the symbol-use map.

Two convenience requests, `#HOVERMAP#` and
`#SEMANTICTOKENS#`, dump every recorded hover or every recorded
symbol use in one batch. They are mainly used by the example pipeline on
this website, which feeds each example through the analyser and uses the
results to drive hover popups and semantic-token colouring in the
rendered output.

The compiler runs as a long-lived process. A `WATCHDOG` component watches
for sustained error bursts or excessive heap growth and asks the IDE to
recycle the process when either threshold is crossed; recycles happen
fairly often, but the extension schedules them during idle periods so the
user rarely notices. Even with the recycles, the long-lived shape is
much cheaper than starting a fresh compiler for every request.

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
