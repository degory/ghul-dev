# functional programming

::: tip editable examples
Every example on this page can be edited and run here: click the pencil to open it in an editor, change it, and run it in your browser. Errors, hovers and completions come from the ghūl compiler as you type.

The [ghul-examples repository](https://github.com/ghul-lang/ghul-examples/tree/main/examples/functional) has fuller functional-programming examples to build and run locally, in a GitHub Codespace or a dev container.
:::

ghūl supports a functional style of programming: functions are first-class
values, the common data types are read-only by default, unions and pattern
matching model data by cases, and pipes transform sequences without mutating
them.

## first-class functions

Functions are values. A function literal constructs one, and the result can
be called, assigned to a variable, passed to another function, or stored in
a data structure, like any other value:

<GhulExample name="functional-programming-1" />

## closures

A function literal captures the variables of its enclosing scope. An
immutable `let` is captured by value - a snapshot taken when the literal is
constructed - and a `let mut` is captured by reference, so the function and
the enclosing scope share one live variable that either side can read or
reassign:

<GhulExample name="functional-programming-25" />

## filter, map, reduce

ghūl pipes provide filter, map and reduce as well as other ways to
work with sequences of values. Each is a global function in
`Ghul.Pipes` taking the sequence as its first argument, so the
[thread-first operator](/expressions#thread-first-calls) `|>` feeds one
into the next:

<GhulExample name="functional-programming-2" />

## list comprehensions

A list comprehension builds an array from one or more sequences. It is written in square brackets: the element first, then a `for` clause for each source, with `if` clauses to keep only some of the elements:

<GhulExample name="functional-programming-33" />

A `for` clause reads its source the same way a `for` loop does, so any sequence a loop can iterate over works, and the loop variable can destructure the element: `for (key, value) in counts`. Each clause can use the variables of the clauses before it, and the element can use all of them. An `if` clause narrows what it tests, so `[name.length for name in names if name?]` reads `name` as a `string` in the element.

The result is an array. Its element type is the type of the element expression, or the element type of the array the context expects. Because the closing bracket ends the comprehension, it works on either side of `|>`.

The loops a comprehension runs belong to the comprehension. A `break` or `continue` inside one cannot leave it, and a comprehension cannot contain a `yield`, an `await` or a `try`. A function literal inside a comprehension is a function body of its own, so these rules do not apply inside it.

A comprehension builds its whole array before anything reads the result, so each source has to end. A pipe reads its source one element at a time, so an unbounded sequence, or a search that stops at the first match, is written as a pipe. The compiler reports an `unbounded-comprehension-source` warning when a comprehension's source is one of the runtime's sequences that never ends, such as `from(1)`:

<GhulExample name="functional-programming-34" />

## recursion

Methods, global functions and anonymous functions can all call themselves
recursively. A named function calls itself by name; an anonymous function
has no name, so the `rec` keyword refers to
the function itself:

<GhulExample name="functional-programming-3" />

An anonymous function cannot refer to a variable that is not yet defined, so
there is no direct way to write two anonymous functions that call each
other. Write mutually recursive functions as global functions or methods,
which can refer to each other whatever order they are defined in:

<GhulExample name="functional-programming-5" />

## read-only by default

The types and traits below expose no way to change a value after it is
constructed. The guarantee has two limits.
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

<GhulExample name="functional-programming-6" />

### tuples are immutable

Tuple elements have no assign accessors, and tuples are value types. A
tuple passed to other code is a copy, so other code can't change a tuple you hold.

<GhulExample name="functional-programming-7" />

### unions are read-only

A union value is fixed at construction: variant fields cannot be assigned,
and the variant a value holds can't be changed. Methods can be added to
a union with [`partial` and `impl`
blocks](/definitions.html#partial-and-impl-blocks), but each must be pure: a
union method that assigns a field of any object is reported.

### properties are not publicly assignable by default

A property is readable from anywhere but assignable only within its defining
type, unless it is declared `public`:

<GhulExample name="functional-programming-8" />

The members a primary constructor generates are ordinary properties, so the
same applies to them: they are set at construction and cannot be publicly
assigned afterwards unless the parameter has the `public` modifier.

### pipe operations build new sequences

Pipe operations do not mutate their source: `map`, `filter` and the rest
produce a new sequence and leave the input as it was:

<GhulExample name="functional-programming-9" />

## pure functions

A function or method can be declared with a postfix `pure` modifier, which
says that it assigns no field, property, or array element of any object. Most function
bodies are proven pure with no modifier needed; the declaration covers the
rest, and every override of a pure member must itself be pure. A function
*type* can be pure too, so a signature can require that only pure functions
are passed to it:

<GhulExample name="functional-programming-27" />

A class or struct can opt in to the same discipline for the whole type:
when its header is declared `pure`, every member must be proven or declared not
to assign any field, property, or array element after construction. The
details, including what purity means to [type
narrowing](/type-narrowing.html), are under
[methods](/definitions.html#methods).

Expression bodies and value-producing `if`, `case`, and parenthesised blocks
help in writing pure functions; see
[expression-oriented programming](/expression-oriented-programming).

## higher-order functions

A higher-order function takes another function as an argument, or returns
one. Global functions and methods can do this generically:

### higher-order generic global functions

<GhulExample name="functional-programming-11" />

### higher-order generic methods

<GhulExample name="functional-programming-12" />

### higher-order anonymous functions

<GhulExample name="functional-programming-13" />

Anonymous functions take a single concrete type from context; there is no generic equivalent to the two preceding forms. For polymorphic behaviour, declare a generic global function or method.

## function composition

The runtime supplies composition in both reading orders, as `Ghul.>>` and
`Ghul.<<`. They are library globals rather than operators the language itself
owns, so a file that composes functions brings them into scope with `use Ghul`.
`f >> g` applies `f` and then `g`, matching the thread-first operator's
direction; `f << g` applies `g` and then `f`, the mathematical reading:

<GhulExample name="functional-programming-26" />

## function combinators

The runtime also supplies the common function combinators in namespace
`Ghul`, next to `>>` and `<<`. `curry` turns a two-argument function into
one that takes its arguments one at a time, and `uncurry` turns it back.
`apply` calls a function with the rest of its own arguments. `memoize`
returns a function that computes its result once for each distinct set of
arguments and answers repeated calls from a cache, and `retry` returns one
that calls the function again, up to a given number of attempts, when it
throws:

<GhulExample name="functional-programming-31" />

## argument packs

A type parameter written with a trailing `..`, as in `[T..]`, is an
argument pack: it stands for however many arguments a call supplies,
collected into a tuple. A formal typed `T.. -> U` takes a function of that
many parameters, and a formal typed `T..` takes the call's remaining
arguments. Together they let one function accept a function of any arity
and the arguments to call it with:

<GhulExample name="functional-programming-32" />

A pack holds at most seven arguments, the size of the largest tuple.
Declare the spread formal `v: T..` last, since it takes every argument
after it. A caller that already holds the tuple can pass it in place of
the separate arguments. The runtime's `apply`, `memoize` and `retry` are
written this way, and so are the pipe stages that take a function.

## currying

A curried function takes its arguments one at a time: each call takes one
argument and returns a function that takes the next. In ghūl that is an
anonymous function that returns another:

<GhulExample name="functional-programming-19" />

## partial application

Partial application fixes some of a function's arguments and leaves the rest
open. Write it as an anonymous function that supplies the fixed arguments:

<GhulExample name="functional-programming-20" />

## union types and pattern matching

A union holds one of several variants, and the `if let` and `case` patterns
take one apart; they are how functional ghūl code models data. A `case` over
a union is checked for exhaustiveness, so covering every variant means it
doesn't need an `else` arm:

<GhulExample name="functional-programming-23" />

The full construct - guards, destructuring, nesting - has its own page:
[unions and pattern matching](/unions-and-pattern-matching.html).

## optional types

An optional type `T?` holds a value that may be absent - the role `Option`
and `Maybe` types play in other languages, built into the type system. `??`
supplies a fallback value, `?.` reads a member only when the receiver is
present, and `if let` tests and unwraps in one step:

<GhulExample name="optional-types-1" />

Optional types have [their own page](/optional-types.html).

## the propagating thread-first operator

`~>` is the thread-first operator `|>` for a value that might be absent. If
the value on its left is present, it is passed to the call on its right,
unwrapped. If it is absent, the call is skipped, its arguments are not
evaluated, and the result is absent. The result is always optional, so a
chain of `~>` stages usually ends with `??`:

<GhulExample name="functional-programming-28" />

`|>` and `~>` mix freely in one chain: a `|>` stage runs whatever it is
given, and a `~>` stage runs only when there is something to run on.

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

<GhulExample name="functional-programming-22" />

Type arguments to `stream` are inferred from the initial-state value
and the anonymous function's yield expression.

The factory returns `Pipe[T]`, so combinators like `take`, `filter`,
`map`, `zip`, and `index` chain straight onto it. The state type does not
appear in that result, so consumers never see how a stream is stepped.

Two simpler seeds start a pipe with no source to draw from. `from(start)`
counts upwards from `start` without end, and `from(start, step)` counts
in steps of `step`. `repeat(value)` yields the same value without end, and
`repeat(value, count)` yields it `count` times. An unbounded seed needs a
stage that stops pulling, such as `take`:

<GhulExample name="functional-programming-29" />

A pipe normally recomputes its elements each time it is read. `memo` reads
its source once, keeps what it read, and replays it on every later read:

<GhulExample name="functional-programming-30" />

[Generators](/async-and-generators.html) are the other way to a lazy
sequence: a function containing `yield` produces its elements on demand,
and its result is a `Pipe[T]` too.
