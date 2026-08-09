# type narrowing

When a check guarantees a value has a more specific type, ghūl narrows that value to it for the code the check covers: inside the branch the value reads at the narrower type, with no cast and no unwrap. Union variant tests, `isa` class checks, presence tests on optionals, and `if let` all narrow, and the narrowing is flow-sensitive - it follows the control flow rather than being confined to a branch body.

::: tip narrowing inlays
Open ghūl in an editor with the [ghūl language extension](/tooling.html) and small triangle hints mark where type narrowing changes: `►` where a variable is narrowed to a more specific type, `◄` where a narrowing ends and the variable widens back to its declared type, and `◄►` where an assignment does both at once. Hovering a hint shows the types and the reason; on an `if` it shows the narrowing for both the taken and the not-taken branch. The same sigils appear in the code examples on this site.
:::

## narrowing in a condition

An `isa` test in an `if` condition narrows the variable to the tested type inside the then-branch. This holds for a union variant or a class:

<GhulExample name="control-flow-8" />

An [optional type](/optional-types) narrows the same way. A `?` test in the predicate narrows the optional to its non-optional form in the then-branch, so the value can be used directly:

<GhulExample name="control-flow-9" />

For a two-variant union, the `else` branch is narrowed to the complementary variant:

<GhulExample name="control-flow-10" />

The `else` narrowing extends to a class hierarchy declared in the current assembly without `open`: ruling out one subclass on the `else` edge narrows to the rest, and when the root is `abstract` the chain can collapse to a single remaining subclass.

A `while` condition narrows its body the same way an `if` condition narrows its then-branch, so `while isa CAT(a) do a.purr() od` reaches a `CAT`-only member without an inner cast.

## flow-sensitive narrowing

Narrowing follows the control flow rather than being confined to a branch body. If a guard rejects the narrower type and then leaves the enclosing block, by `return`, `throw`, `break` or `continue`, the code after the guard is narrowed:

<GhulExample name="control-flow-11" />

## locals and parameters

Narrowing applies to local variables, including a function's own parameters.

<GhulExample name="type-inference-3" />

## member-access paths

Narrowing also applies to a member-access path like `x.field` or `x.property`. A presence test (`?`) narrows the path: after `if x.field? then`, uses of `x.field` inside the branch are non-optional.

<GhulExample name="type-inference-4a" />

An `isa` check or variant test narrows a path the same way:

<GhulExample name="type-inference-4" />

## how long a narrow lasts

A narrow on a path is less durable than one on a local variable. A local holds its value, which no other call can change, so its narrowing lasts until the variable is reassigned. A path reads a fresh value each time, so its narrowing lasts only while nothing can change what it reads: a call to a method or property that can write to the heap drops it, as does an assignment that can change the path. Copying the path into a local keeps the narrower type across a call that would otherwise drop it.

<GhulExample name="type-inference-5" />

`if let` copies the value into a fresh local in one step, and works for any expression - the result of a call, not only a variable or path. The local narrows and stays narrowed within the branch. See [if let](/control-flow.html#if-let) for the full construct.

<GhulExample name="type-inference-6" />

## narrowing on assignment

Reassigning a local narrows it: when the new value's static type is more specific than the declared type, the local narrows to that type from the assignment on, so a following call resolves on the assigned type without an `isa`:

<GhulExample name="control-flow-57" />

If the local is already narrowed, assigning a value of a different type cancels that narrowing and introduces one for the new type, so the following call resolves on the assigned type:

<GhulExample name="control-flow-56" />

## purity

ghūl decides which calls are safe by inferring purity. A method or property that only reads, never writing to the heap, is pure, and a call to a pure one preserves a path narrow - so a plain accessor that reads a field leaves it in place. The inference is automatic; a function the compiler can't prove pure can assert it with a postfix [`pure` modifier](/definitions.html#methods).
