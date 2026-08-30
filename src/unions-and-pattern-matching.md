# unions and pattern matching

::: tip editable examples
Every example on this page can be edited and run here: click the pencil to open it in an editor, change it, and run it in your browser. Errors, hovers and completions come from the ghūl compiler as you type.

The ghul-examples repository has fuller [unions](https://github.com/degory/ghul-examples/tree/main/examples/unions) and [pattern-matching](https://github.com/degory/ghul-examples/tree/main/examples/pattern-matching) examples to build and run locally, in a GitHub Codespace or a dev container.
:::

A union holds a value of one of several variants, each with its own set of fields: one type that represents several kinds of data. Pattern matching is how that data comes back out - test which variant a value holds, and read its fields at the narrowed type. The [definitions page](/definitions.html#unions) covers the full declaration surface - unit variants, the `default` variant, primary-constructor headers, and traits; this page is about using them, starting with `if let`, which does the test and the read in one step.

<GhulExample name="functional-programming-14" />

## matching with if let

`if let` is how the data comes out of a union: a `let` definition in an `if` or `elif` condition tests which variant the value holds, defines a local variable for it, and narrows that variable to the variant. The branch runs only when the test matches, and the variable is in scope inside it, so there is no separate step between checking the variant and reading its fields:

<GhulExample name="functional-programming-18" />

A chain of `elif let` arms covers a union one variant at a time. Once there are more than a couple of variants, `case` says the same thing in one construct.

## matching with case

A `case` expression matches one scrutinee against several `when` arms, which reads better than a chain of `if let`/`elif let` once there are more than a couple of variants to cover. Over a closed domain - a union's variants, `bool`, an enum, or a class hierarchy closed to the assembly - the compiler checks the arms for exhaustiveness, so `area` needs no fallback return for a variant the `when` arms forgot:

<GhulExample name="functional-programming-23" />

`when` arms accept the same patterns as `if let`: a type test that binds and narrows (`c: CIRCLE`), destructuring with literal leaves and `~`-marked values that match rather than bind, and a trailing `/\` guard that falls through to the next arm on failure.

Equality labels compare by value, the way `=~` compares: over a string scrutinee or any type defining the operator, matching is by content, and `when null` matches absence.

So `case` is the exhaustive counterpart to `if let` rather than a different matching mechanism. See [the case statement](/control-flow.html#case-statement) for the full picture.

## option-shaped unions

A union with a single field-carrying variant, or with one variant marked `default`, has only one thing to test, so neither construct is needed: the `?` and `!` operators test whether the value is there and unwrap it directly:

<GhulExample name="functional-programming-16" />

<GhulExample name="functional-programming-17" />

`Option` here is a union built from scratch to show how the shape works, but everyday code rarely needs to: ghūl's own optional types (`T?`) give you this for free, over reference types, value types, and unconstrained generic types alike - see [optional types](/optional-types) for the full picture, including how a user-defined union like this one fits alongside `T?`.

## testing a variant with isa

`if let` defines a new local variable for the value it matches. `isa Variant(value)` is the test on its own: it checks the variant and narrows in the then-branch, with no new name introduced:

<GhulExample name="functional-programming-15" />

Because `isa` narrows the value it tests rather than a fresh local variable, it reaches values that an `if let` name does not: a member path such as `shape.outline`, or `self`. See [type narrowing](/type-narrowing.html) for the full picture.
