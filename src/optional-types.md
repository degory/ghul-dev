# optional types

A type followed by `?` is an *optional* type: a value of `T?` can be present or absent, and the same type without the `?` is non-optional. The [language basics](/language-basics.html#optional-types) page introduces the presence test `?` and the assignability rule; the operators read the same regardless of what `T` is. That uniformity isn't an accident: ghūl backs `T?` with whichever of three different representations fits `T`, and picks silently.

This page covers the three backings behind `T?`, the full operator set - `?`, `!`, `??`, `?.` - and the warnings around them. At the end: the two ways a named type of your own can be optional-shaped without ever spelling `T?`.

<GhulExample name="optional-types-1" />

`find_first` doesn't know or care whether `T` is `int` or `string`; the same `T?`, the same `??` fallback, work either way.

## `T?`: one feature, three backings

### reference types

The common case: `T?` over a class or other reference type is a plain nullable reference, and absence is `null`.

<GhulExample name="language-basics-15" />
<GhulExample name="language-basics-16" />

### value types

`T?` over a value type - `int?`, or a struct - is backed by .NET's `Nullable<T>` at the IL level. You can name `System.Nullable[T]` directly too, since it's an ordinary .NET generic type - but the compiler treats it as just another struct, not as `T?`: it gets none of the automatic widening from `T` or the `??`/`?.` sugar (it does still get `?`/`!`, since `Nullable<T>` happens to expose `HasValue`/`Value`, which is the structural case covered later on this page). For the actual optional-type behaviour, write `T?`, the same way you would for a reference type:

<GhulExample name="language-basics-17" />

### unconstrained generic types

A generic function or type can be written over `T?` before anything is known about whether `T` will turn out to be a reference or a value type. This is where `Ghul.MAYBE[T]` comes in - a struct that can hold "present" or "absent" for *any* `T`, and is what an unconstrained `T?` lowers to. It's also a type you can name and construct directly:

<GhulExample name="optional-types-2" />

`MAYBE[T]` implements `Ghul.Maybe[T]`, a trait with just `has_value` and `value` - the same shape a type of your own can expose, covered at the end of this page. See [generics](/generics) for how the type parameters themselves work.

### they interconvert

Because all three are the same feature, they behave alike: `??` chains across them, `if x?` and `if let` narrow them the same way, and a non-optional `T` widens to any of them without ceremony. Which one backs a given `T?` is an implementation detail you don't need to track.

<GhulExample name="language-basics-19" />

## the operators

The `??` operator supplies a fallback: `a ?? b` is `a` when it is present, otherwise `b`, and `b` is evaluated only when needed. It is right-associative, so `a ?? b ?? c` tries each in turn, and the result stays optional until a non-optional value closes the chain:

<GhulExample name="language-basics-28" />

The `?.` operator reads a member only when the receiver is present: `a?.b` is `b` when `a` is present, otherwise the absent case. The result is always optional, and `?.` chains, so a whole access path folds down to one optional. Method calls compose the same way: `a?.foo(args)` calls `foo` on a present receiver and yields the absent case otherwise, with the argument expressions included in the short-circuit, so they are not evaluated when `a` is absent.

<GhulExample name="language-basics-29" />

## the warnings

Reading a member through an optional not known to be present draws a `null-deref` warning; `x?.y`, `x.has_value`, `x!`, and `if let` are the warning-free routes. Applying `!`, `?`, or `?.` to a value already known to be present warns that the operator is redundant, and `!` on a value that was never optional is an error. Each warning has a slug you can silence with `@suppress("<slug>")` per declaration, per file, or across the project.

## which one to use

- Holding optional data in your own code: write `T?`. Don't think about which of the three backings you're getting - that's the point of the unification.
- Writing a generic function or type that needs to hold "maybe a `T`" for an unconstrained `T`: `T?` still works, backed by `MAYBE[T]`; if you need to construct or return one directly - a `MAYBE[T]` field on a struct, say - you can name `Ghul.MAYBE[T]` explicitly.
- Modelling something with more shape than "present or absent" - success-with-a-value versus failure-with-a-reason, for instance - use a union with a `default` variant: the same `?` and `!`, plus exhaustive `case` matching over every outcome. That, and the other way a named type can be optional-shaped, is next.

## optional-shaped types

A named type of your own can support `?` and `!` without being a `T?`. It keeps its own name and doesn't interconvert with `T?` - what it opts in to is the operators, not the spelling. There are two routes.

A union with a single field-carrying variant, or with one variant marked `default`, is option-shaped: `?` tests whether the union holds that variant, and `!` unwraps its payload (or the whole variant, if it has more than one field). The [unions and pattern matching](/unions-and-pattern-matching.html) page builds an `Option[T]` from scratch; the same rule covers the two-variant shape most languages call `Result` - `OK` marked `default`, `ERROR` holding the failure:

<GhulExample name="optional-types-4" />

And a type that exposes `has_value: bool` and `value: T` properties is treated as optional-shaped structurally, with no declaration required: `?` consults `has_value`, and on a struct `!` reads out `value`. `Ghul.MAYBE[T]` satisfies this by construction; so does a type you write yourself:

<GhulExample name="optional-types-3" />
