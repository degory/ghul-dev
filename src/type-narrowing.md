# type narrowing

::: tip editable examples
Every example on this page can be edited and run here: click the pencil to open it in an editor, change it, and run it in your browser. Errors, hovers and completions come from the ghūl compiler as you type.

The [ghul-examples repository](https://github.com/degory/ghul-examples/tree/main/examples/type-inference) has fuller examples that include narrowing, to build and run locally, in a GitHub Codespace or a dev container.
:::

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

A narrow on a local variable lasts until the variable is reassigned: a local holds one value, which no other function can reach, so no call can make it stale.

A narrow on a member-access path is held to more. A direct store ends it - assigning the field the fact describes through any receiver, storing through any field or property when the last hop is a property getter, or reassigning the path's root. Any other call that might write to the heap is recorded against the fact rather than dropping it, and what gets checked is each later use of the value - and only a use that leans on the narrow. Passing the value where its declared type already fits leans on nothing; reading a member only the narrower view exposes does. When every recorded call is proven harmless the use passes silently, and when one cannot be proven, the report says so at the use site and names the call:

<GhulExample name="type-inference-22" />

The ways out are the ones the message suggests. Test the value again: `?`, `!`, `?.`, `isa`, and `if let` all check at run time, re-establish what they test, and are never questioned whatever calls came before. Or copy the value into a local variable before the call, whose narrowing no other function can touch:

<GhulExample name="type-inference-23" />

Where proof succeeds there is nothing to report. This call only writes a field the narrow doesn't read through, so the compiler sees it leaves the narrow alone:

<GhulExample name="type-inference-5" />

`if let` copies the value into a fresh local in one step, and works for any expression - the result of a call, not only a variable or path. The local narrows and stays narrowed within the branch. See [if let](/control-flow.html#if-let) for the full construct.

<GhulExample name="type-inference-6" />

## narrowing on assignment

Reassigning a local narrows it: when the new value's static type is more specific than the declared type, the local narrows to that type from the assignment on, so a following call resolves on the assigned type without an `isa`:

<GhulExample name="control-flow-57" />

If the local is already narrowed, assigning a value of a different type cancels that narrowing and introduces one for the new type, so the following call resolves on the assigned type:

<GhulExample name="control-flow-56" />

## calls, purity, and stable

What makes a call harmless is what it can write. The compiler infers this from bodies: a function proven store-free writes nothing already on the heap, and a call to one leaves every narrowing alone. Most functions are proven outright; where proof falls short, a postfix [`pure` modifier](/definitions.html#methods) declares store-freedom instead, trusted as stated and required of every override. A handful of imported .NET collection mutators (`LIST.add` and friends) are known to store only in their own receiver, so they count as harmless unless the narrow reads through them.

A narrow read through a property also leans on the getter answering the same way twice. When the compiler can't prove that of a getter - a memoiser stores into its cache on first read, say - uses leaning on the narrow draw a warning naming the getter. Declaring the property [`stable`](/definitions.html#properties) presents the narrow anyway: it asserts two adjacent reads agree on presence and runtime type.
