# functional programming

::: tip runnable examples
The [ghul-examples repository](https://github.com/degory/ghul-examples/tree/main/examples/functional) has fuller, runnable functional-programming examples — open it in a GitHub Codespace or a dev container to build and run them.
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

Mutual recursion for anonymous functions is slightly awkward, but possible
by passing one function into the other as an argument:

<GhulExample name="functional-programming-4" />

### mutual recursion in named functions
Mututal recursion with named functions, doesn't require any workarounds

<GhulExample name="functional-programming-5" />
## immutable data structures and pure functions
While ghūl supports imperitive code it also aims to support
writing pure functions with appropriate constructs and defaults

### lists are immutable by default
The standard trait for lists `Collections.List[T]` is immutable (it maps to .NET's ``System.Collections.Generic.IReadOnlyList`1[T]``)

### maps are immutable by default
The standard trait for maps `Collections.Map[T]` is immutable (it maps to .NET's ``System.Collections.Generic.IReadOnlyDictionary`2[K,V]``)

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
Expression bodied functions and some support for
expression oriented programming help in writing
pure functions

<GhulExample name="functional-programming-10" />

## higher order functions

### higher order generically typed global functions

<GhulExample name="functional-programming-11" />

### higher order generically typed methods:
<GhulExample name="functional-programming-12" />

### higher order anonymous functions:

<GhulExample name="functional-programming-13" />

## union types

Unions are under development [(see GitHub issue #1132)](https://github.com/degory/ghul/issues/1132)

Unions hold a value of one of several different types (variants). Each variant can have its own set of fields. This is useful for creating types that can represent multiple kinds of data in a single structure.

<GhulExample name="functional-programming-14" />

Accessing the data held by a union's variant requires first checking which variant the union currently holds. Unions provide properties for this for each of their variants:

<GhulExample name="functional-programming-15" />

Unions shaped like `Option` types (exactly one non-unit variant) support the `?` and `!` operators for testing if they hold a value and for unwrapping that value, respectively:

<GhulExample name="functional-programming-16" />

<GhulExample name="functional-programming-17" />

## pattern matching

ghūl has no dedicated `match` construct. Discovering which variant a union holds, and branching on the result is done with `if let` — a `let` definition in an `if` / `elif` condition, where the branch runs only on a match, with the variable narrowed and in scope:

<GhulExample name="functional-programming-18" />

Union variant tags (`s.is_circle`) and `else`-branch narrowing cover the same ground; see [type narrowing and `if let`](/control-flow.html#type-narrowing) in the control flow chapter for the full picture.

## currying
<GhulExample name="functional-programming-19" />

## partial application
<GhulExample name="functional-programming-20" />

## lazy sequences

Lazy infinite and finite sequences are expressed with the
`Ghul.Pipes.STREAM[T, S]` union and the `stream(initial, advance)`
factory. State type `S` and output type `T` are independent, so the
state of a stream is hidden from its consumers — `stream()` returns a
plain `Pipe[T]`.

<GhulExample name="functional-programming-21" />

`advance` is a pure step function: it receives the current state and
returns either `DONE` (sequence is over) or `YIELD(value, next_state)`
— the yielded element and the state to feed back in on the next step.
The `||` infix is parser sugar for `YIELD(value, next_state)`, so a
step body usually reads `value || next_state`.

<GhulExample name="functional-programming-22" />

Type arguments to `stream` are inferred from the initial-state value
and the lambda's yield expression. Multi-component state reads more
clearly as a named tuple (`(n = 1, prev = 1)` with `s.n` and `s.prev`
field access) than as a positional tuple needing destructuring. The
no-argument `DONE[T, S]()` constructor in terminating sequences keeps
its explicit type arguments — the surrounding `if/else` widens to
`object` before the outer lambda return type can constrain it.

The factory returns `Pipe[T]` directly so combinators like `.take`,
`.filter`, `.map`, `.zip`, and `.index` chain straight onto a stream
value. State shape never appears in the type a consumer sees of a
`stream(...)`-produced pipe.
