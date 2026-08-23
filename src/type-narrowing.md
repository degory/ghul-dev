# type narrowing

::: tip editable examples
Every example on this page can be edited and run here: click the pencil to open it in an editor, change it, and run it in your browser. Errors, hovers and completions come from the ghūl compiler as you type.

The [ghul-examples repository](https://github.com/degory/ghul-examples/tree/main/examples/type-inference) has fuller examples that include narrowing, to build and run locally, in a GitHub Codespace or a dev container.
:::

When a check proves a value has a more specific type, ghūl narrows the value for the code the check covers: inside the branch, the value has the narrower type, with no cast and no unwrap needed. Union variant tests, `isa` class checks, presence tests on optionals, and `if let` all narrow, and narrowing follows the control flow, [covered below](#flow-sensitive-narrowing).

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

The `else` narrowing extends to a class hierarchy declared in the current assembly without `open`: the compiler knows every subclass, so ruling out the tested one narrows the `else` branch to the others, and when an `abstract` root has exactly two subclasses, ruling out one leaves the other.

A `while` condition narrows its body the same way an `if` condition narrows its then-branch, so `while isa CAT(a) do a.purr() od` reaches a `CAT`-only member without an inner cast.

## flow-sensitive narrowing

Narrowing follows the control flow, not just the branch structure. A common shape is a guard: when the test fails, the guard leaves the block with `return`, `throw`, `break` or `continue`, so the code after the guard runs only when the test passed, and the value is narrowed there:

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

A narrow on a member-access path can end sooner, because each mention of the path reads the value again, and code that runs between the test and the use can change what it reads. An assignment can invalidate the narrow directly. For a narrow on a field, assigning that field through any receiver invalidates it: the written receiver could be the same object. For a narrow read through a property, any assignment to any field, property or element invalidates it, because the getter could read whatever was assigned. Reassigning the path's root invalidates either.

Calls are the other way a narrow can stop holding: a call between the test and the use might change the value the narrow describes. The compiler does not assume the worst of every call. It checks each use of the narrowed value that actually relies on the narrow - passing it where only the non-optional or narrower type is accepted, or reading a member only that type has - and tries to prove that no call in between could have changed the value. A use the declared type already satisfies relies on nothing, and is never checked. Where the proof succeeds, the use is allowed. Where it fails, the compiler reports the use, because it could be unsafe at run time: passing the value where only the narrower type is accepted is an error, and reading a member through it is a `null-deref` warning, the same warning as reading through any un-narrowed optional. Either way the message names the call it could not prove and points back at the test that narrowed the value:

<GhulExample name="type-inference-22" />

There are two ways out. Test the value again: `?`, `!`, `?.`, `isa`, and `if let` all check at run time and re-establish what they test, whatever calls came before. Or copy the value into a local variable before the call, where no other function can reach it:

<GhulExample name="type-inference-23" />

Where the compiler can prove that a call does not invalidate the narrow, there is nothing to report. This call writes only a field the narrow does not read, so the narrow still holds:

<GhulExample name="type-inference-5" />

`if let` copies the value into a fresh local in one step, and works for any expression - the result of a call, not only a variable or path. The local narrows and stays narrowed within the branch. See [if let](/control-flow.html#if-let) for the full construct.

<GhulExample name="type-inference-6" />

## narrowing on assignment

Reassigning a local narrows it: when the new value's static type is more specific than the declared type, the local narrows to that type from the assignment on, so a following call resolves on the assigned type without an `isa`:

<GhulExample name="control-flow-57" />

If the local is already narrowed, assigning a value of a different type cancels that narrowing and introduces one for the new type, so the following call resolves on the assigned type:

<GhulExample name="control-flow-56" />

## calls, purity, and stable

Whether a call can invalidate a narrow depends on what the call can write. The compiler works this out from function bodies: a function that writes nothing that existed before the call cannot invalidate any narrow, and most functions are proven that way with no annotation. Where the proof falls short, the postfix [`pure` modifier](/definitions.html#methods) declares it instead, trusted as declared and required of every override. Some imported .NET collection mutators, such as `LIST.add` and `STACK.push`, are known to write only their own receiver's internal state, so they invalidate only a narrow that reads through that state.

A narrow read through a property has one more dependency: the property is read once at the test and again at each use, and every read calls the getter. The narrow is only sound if the getter's later answers agree with the answer the test saw. The compiler proves that from the getter's body where it can. Where it cannot - a getter that fills a cache on first read, for example - the test does not narrow at all, and a use that relies on the narrow is an error naming the getter. Declaring the property [`stable`](/definitions.html#properties) restores the narrow: it promises that two reads with nothing between them agree on whether the value is present, and on its runtime type.
