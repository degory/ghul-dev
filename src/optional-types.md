# optional types

A type followed by `?` is an *optional* type: a value of `T?` can be present or absent, and the same type without the `?` is non-optional. The [language basics](/language-basics.html#optional-types) page introduces the presence test `?` and the assignability rule.

<GhulExample name="optional-types-1" />

`find_first` returns the first element the predicate accepts, or absent when there is none; `??` supplies a value for the absent case.

An optional over a reference type:

<GhulExample name="language-basics-15" />

over a value type:

<GhulExample name="language-basics-17" />

and over an unconstrained generic type parameter:

<GhulExample name="optional-types-2" />

::: tip representation
How a `T?` value is stored depends on `T`. The details are in [optional types in depth](/optional-types-in-depth); they matter mainly when interoperating with other .NET languages.
:::

## the operators

The `??` operator supplies a fallback: `a ?? b` is `a` when it is present, otherwise `b`, and `b` is evaluated only when needed. It is right-associative, so `a ?? b ?? c` tries each in turn, and the result stays optional until a non-optional value closes the chain:

<GhulExample name="language-basics-28" />

The `?.` operator reads a member only when the receiver is present: `a?.b` is `b` when `a` is present; otherwise the result is absent. The result is always optional, and `?.` chains, so a whole access path folds down to one optional. Method calls compose the same way: `a?.foo(args)` calls `foo` on a present receiver; otherwise the result is absent, with the argument expressions included in the short-circuit, so they are not evaluated when `a` is absent.

The postfix `!` asserts presence and reads the value out; applied to an absent optional it throws. Inside a branch where flow analysis has proven presence, the compiler reports a redundancy warning instead.

<GhulExample name="language-basics-29" />

## the warnings

Reading a member through an optional not known to be present is reported with a `null-deref` warning; `x?.y`, `x.has_value`, `x!`, and `if let` are the warning-free routes. Applying `!`, `?`, or `?.` to a value already known to be present warns that the operator is redundant, and `!` on a value that was never optional is an error. Each warning has a slug you can silence with `@suppress("<slug>")` per declaration, per file, or across the project.

## which one to use

- Holding optional data in your own code, generic or not: write `T?`.
- Modelling something with more shape than "present or absent" - success-with-a-value versus failure-with-a-reason, for instance - use a union with a `default` variant: the same `?` and `!`, plus exhaustive `case` matching over every outcome; see [optional-shaped types](#optional-shaped-types) below.

## optional-shaped types

A named type of your own can support `?` and `!` without being a `T?`. It keeps its own name and doesn't interconvert with `T?` - what it opts in to is the operators, not the spelling. There are two routes.

A union where exactly one variant has fields, or with one variant marked `default`, is option-shaped: `?` tests whether the union holds that variant, and `!` unwraps its payload (or the whole variant, if it has more than one field). The [unions and pattern matching](/unions-and-pattern-matching.html) page builds an `Option[T]` from scratch; the same rule covers the two-variant shape most languages call `Result` - `OK` marked `default`, `ERROR` holding the failure:

<GhulExample name="optional-types-4" />

And a type that exposes `has_value: bool` and `value: T` properties is treated as optional-shaped structurally, with no declaration required: `?` consults `has_value`, and on a struct `!` reads out `value`:

<GhulExample name="optional-types-3" />
