# functional programming

::: tip editable examples
Every example on this page can be edited and run here: click the pencil to open it in an editor, change it, and run it in your browser. Errors, hovers and completions come from the ghūl compiler as you type.

The [ghul-examples repository](https://github.com/degory/ghul-examples/tree/main/examples/functional) has fuller functional-programming examples to build and run locally, in a GitHub Codespace or a dev container.
:::

ghūl has some support for basic functional programming

## first class functions

ghūl has first class functions. There is a function literal syntax that
constructs functions, which can then be called, but also assigned to
variables, passed to other functions, stored in data structures, or
pretty much anything else you can do with any other ghūl value

<GhulExample name="functional-programming-1" />

## filter, map, reduce

ghūl pipes provide filter, map and reduce as well as other ways to
work with sequences of values

<GhulExample name="functional-programming-2" />

## recursion

ghūl methods, global functions and anonymous functions
can all call themselves or each other recursively

### self recursion in anonymous functions

<GhulExample name="functional-programming-3" />

### mutual recursion in anonymous functions

Mutual recursion for anonymous functions is slightly awkward because of the forward reference. One way is to declare one as a mutable variable, define the other, then assign to it: the `let mut` is captured by reference, so the first function sees the second once it is assigned:

<GhulExample name="functional-programming-4" />

### mutual recursion in named functions
Mutual recursion with named functions doesn't require any workarounds

<GhulExample name="functional-programming-5" />
## immutable data structures and pure functions
While ghūl supports imperative code it also aims to support
writing pure functions with appropriate constructs and defaults

### lists are immutable by default
The standard trait for lists `Collections.List[T]` is immutable

### maps are immutable by default
The standard trait for maps `Collections.Map[K, V]` is immutable

### arrays are immutable
The ghūl array type `T[]` does not expose an assign indexer

### array literals are immutable
The values constructed by array literals are immutable

<GhulExample name="functional-programming-6" />

### tuples are immutable
Values of ghūl tuple types `(T1, T2, T3, ...)` are immutable (the elements `` `0 ``, `` `1 ``, `` `2 ``, ... do not have assign accessors)

### tuple literals are immutable
The values constructed by tuple literals are immutable

<GhulExample name="functional-programming-7" />

### properties are not publicly assignable by default
When defining properties in classes and structs, they are not
publicly assignable by default

<GhulExample name="functional-programming-8" />

### pipes support non mutating operations over lists

pipes make it easy to iterate over lists and generators producing
transformed output without mutating the source data

<GhulExample name="functional-programming-9" />

### expression oriented programming

Expression bodies and value-producing `if`, `case`, and `val ... lav` blocks help in writing pure functions; see [expression oriented programming](/expression-oriented-programming).

## higher order functions

### higher order generically typed global functions

<GhulExample name="functional-programming-11" />

### higher order generically typed methods:
<GhulExample name="functional-programming-12" />

### higher order anonymous functions:

<GhulExample name="functional-programming-13" />

Anonymous functions take a single concrete type from context; there is no generic equivalent to the two preceding forms. For polymorphic behaviour, declare a generic global function or method.

## union types and pattern matching

Unions - one type holding one of several variants - and the `if let` and `case` patterns that take them apart are the functional idiom's data backbone. They have their own page: [unions and pattern matching](/unions-and-pattern-matching.html).

## currying
<GhulExample name="functional-programming-19" />

## partial application
<GhulExample name="functional-programming-20" />

## lazy sequences

Lazy infinite and finite sequences are expressed with the
`Ghul.Pipes.STREAM[T, S]` union and the `stream(initial, advance)`
factory. State type `S` and output type `T` are independent, so the
state of a stream is hidden from its consumers; `stream()` returns a
plain `Pipe[T]`.

<GhulExample name="functional-programming-21" />

`advance` is a pure step function: it receives the current state and
returns either `DONE` (sequence is over) or `YIELD(value, next_state)`,
the yielded element and the state to feed back in on the next step.
The `||` infix is parser sugar for `YIELD(value, next_state)`, so a
step body usually reads `value || next_state`.

<GhulExample name="functional-programming-22" />

Type arguments to `stream` are inferred from the initial-state value
and the anonymous function's yield expression. Multi-component state reads more
clearly as a named tuple (`(n = 1, prev = 1)` with `s.n` and `s.prev`
field access) than as a positional tuple needing destructuring. The
no-argument `DONE[T, S]()` constructor in terminating sequences keeps
its explicit type arguments because the surrounding `if/else` widens to
`object` before the outer anonymous function's return type can constrain it.

The factory returns `Pipe[T]` directly so combinators like `.take`,
`.filter`, `.map`, `.zip`, and `.index` chain straight onto a stream
value. State shape never appears in the type a consumer sees of a
`stream(...)`-produced pipe.
