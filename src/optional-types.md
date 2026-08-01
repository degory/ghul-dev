# optional types

A type followed by `?` is an *optional* type: a value of `T?` can be present or absent, and the same type without the `?` is non-optional. The [language basics](/language-basics.html#optional-types) page introduces the core operators - `?`, `!`, `if let`, `??`, `?.` - and they read the same regardless of what `T` is. That uniformity isn't an accident: ghūl backs `T?` with whichever of three different representations fits `T`, and picks silently.

There's a second axis to this, independent of `T?` itself: any type - not just the built-in optional forms - can opt in to the same `?`/`!` treatment, either structurally (by shape) or nominally (by declaring which variant means "absent"). This page covers both axes: the three backings behind `T?`, and the two ways a type can be optional-shaped without ever spelling `T?`.

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

`MAYBE[T]` implements `Ghul.Maybe[T]`, a trait with just `has_value` and `value` - which is also exactly the shape the next section is about. See [generics](/generics) for how the type parameters themselves work.

### they interconvert

Because all three are the same feature, they behave alike: `??` chains across them, `if x?` and `if let` narrow them the same way, and a non-optional `T` widens to any of them without ceremony. Which one is in play for a given `T?` is an implementation detail you don't need to track.

<GhulExample name="language-basics-19" />
<GhulExample name="language-basics-28" />
<GhulExample name="language-basics-29" />

## beyond `T?`: types that are optional-shaped

The two representations above are all spelled `T?`. The two below are ordinary named types that support `?` and `!` anyway, without ever being a `T?` - a different, complementary mechanism, not a fourth backing for the same feature. They don't interconvert with `T?`; they just answer the same two operators.

### structural: `has_value` and `value`

A type that exposes `has_value: bool` and `value: T` properties is treated as optional-shaped automatically, with no declaration required. `Ghul.MAYBE[T]` above satisfies this by construction, but so does any type you write yourself:

<GhulExample name="optional-types-3" />

### nominal: option-shaped unions

A union with a single field-carrying variant, or with one variant marked `default`, supports `?` and `!` too: `?` tests whether the union holds that variant, and `!` unwraps its payload (or the whole variant, if it has more than one field). The [functional programming](/functional-programming.html#union-types) page builds an `Option[T]` union from scratch to show the mechanics; this is what makes it behave like an option once built, not a special case for a built-in type:

<GhulExample name="functional-programming-16" />

The same rule extends past a single-variant "does it have a value" union to a two-variant "did it succeed" one - `OK` marked `default`, `ERROR` holding the failure - the shape most languages call `Result`:

<GhulExample name="optional-types-4" />

## which one to reach for

- Reaching for optional data in your own code: write `T?`. Don't think about which of the three backings you're getting - that's the point of the unification.
- Writing a generic function or type that needs to hold "maybe a `T`" for an unconstrained `T`: `T?` still works, backed by `MAYBE[T]`; if you need to construct or return one directly - a `MAYBE[T]` field on a struct, say - you can name `Ghul.MAYBE[T]` explicitly.
- Adding presence/absence to a type you're already designing: give it `has_value` and `value` and it just works, no interface to declare.
- Modelling something with more shape than "present or absent" - success-with-a-value versus failure-with-a-reason, for instance - reach for a union with a `default` variant instead. It gets the same `?`/`!` operators, plus exhaustive `case` matching over every outcome.
