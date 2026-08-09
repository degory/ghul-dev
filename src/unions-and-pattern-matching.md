# unions and pattern matching

::: tip runnable examples
The ghul-examples repository has fuller, runnable [unions](https://github.com/degory/ghul-examples/tree/main/examples/unions) and [pattern-matching](https://github.com/degory/ghul-examples/tree/main/examples/pattern-matching) examples. Open it in a GitHub Codespace or a dev container to build and run them. Any example on this page can also be pasted into the [ghūl playground](https://github.com/degory/ghul-playground)'s `main.ghul`{:text} and run with `dotnet run`{:sh}.
:::

A union holds a value of one of several variants, each with its own set of fields: one type that represents several kinds of data. Pattern matching is how that data comes back out - test which variant a value holds, and read its fields at the narrowed type. The [definitions page](/definitions.html#unions) covers the full declaration surface - unit variants, the `default` variant, primary-constructor headers, and traits; this page is about using them.

<GhulExample name="functional-programming-14" />

## testing and narrowing a variant

Accessing the data held by a union's variant requires first checking which variant the union currently holds. An `isa Variant(value)` test checks the variant and, in the then-branch, narrows the value to it so the variant's fields are reachable:

<GhulExample name="functional-programming-15" />

## option-shaped unions

Unions shaped like `Option` types - a single field-carrying variant, or one variant marked `default` - support the `?` and `!` operators, for testing whether they hold a value and for unwrapping it:

<GhulExample name="functional-programming-16" />

<GhulExample name="functional-programming-17" />

`Option` here is a union built from scratch to show how the shape works, but everyday code rarely needs to: ghūl's own optional types (`T?`) give you this for free, over reference types, value types, and unconstrained generic types alike - see [optional types](/optional-types) for the full picture, including how a user-defined union like this one fits alongside the built-in representations.

## matching with if let

Discovering which variant a union holds, and branching on the result, is done with `if let`: a `let` definition in an `if` / `elif` condition, where the branch runs only on a match, with the variable narrowed and in scope:

<GhulExample name="functional-programming-18" />

`isa` variant tests and `else`-branch narrowing cover the same ground; see [type narrowing](/type-narrowing.html) for the full picture.

## matching with case

A `case` expression matches one scrutinee against several `when` arms, which reads better than a chain of `if let`/`elif let` once there are more than a couple of variants to cover. Over a closed domain - a union's variants, `bool`, an enum, or a class hierarchy closed to the assembly - the compiler checks the arms for exhaustiveness, so `area` needs no fallback return for a variant the `when` arms forgot:

<GhulExample name="functional-programming-23" />

`when` arms accept the same patterns as `if let` - a type test that binds and narrows (`c: CIRCLE`), destructuring, and literal leaves - so `case` is the exhaustive counterpart to `if let` rather than a different matching mechanism. See [the case statement](/control-flow.html#case-statement) for the full picture.
