# optional types and narrowing

::: tip editable examples
Every example on this page can be edited and run here: click the pencil to open it in an editor, change it, and run it in your browser. Errors, hovers and completions come from the ghūl compiler as you type.
:::

A type followed by `?` is an *optional* type: a value of `T?` can be present or absent, and a plain `T` always holds a value. The compiler rejects a `T?` where a `T` is needed, so absence is handled where it can arise, not discovered as a crash somewhere later.

<GhulExample name="optional-types-1" />

`find_first` returns the first element the predicate accepts, or absent when there is none; `??` supplies a value for the absent case. `?.` reads a member only when the receiver is present, and `!` asserts presence, throwing when the value is absent. For everything else a plain test is enough, because a test narrows.

## a test is enough

`if x?` narrows `x` to its non-optional form inside the branch, so the value reads directly, with no unwrap and no cast:

<GhulExample name="control-flow-9" />

The same applies to types. An `isa` test narrows a value to the tested class or union variant, and over a closed set of possibilities the `else` branch narrows to what remains:

<GhulExample name="control-flow-10" />

Narrowing follows the control flow, not just the branch structure. A guard that returns leaves the code after it narrowed:

<GhulExample name="control-flow-11" />

And it applies to fields and properties as well as local variables:

<GhulExample name="type-inference-4a" />

::: tip narrowing inlays
Open ghūl in an editor with the [ghūl language extension](/tooling.html) and small triangle hints mark where narrowing changes: `►` where a value narrows, `◄` where it widens back. The same sigils appear in the code examples on this site.
:::

## the narrowing is checked

A narrowed value can change before it is used: a reassignment, or a call to a function that writes the member the narrowing depends on. The compiler tracks the calls in between and reports a use it cannot prove safe, naming the call; testing the value again, or copying it into a local variable, resolves it. So a narrowing is never a guess that the value is probably still there - it either holds, or the compiler says why not.

[Type narrowing](/type-narrowing) covers the machinery: what invalidates a narrowing, what the `pure` modifier declares, and what a `stable` property promises. [Optional types](/optional-types) covers the operators, the warnings, and the three run-time representations behind `T?`.
