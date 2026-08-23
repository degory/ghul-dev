# narrowing in depth

::: tip editable examples
Every example on this page can be edited and run here: click the pencil to open it in an editor, change it, and run it in your browser. Errors, hovers and completions come from the ghūl compiler as you type.

The [ghul-examples repository](https://github.com/degory/ghul-examples/tree/main/examples/type-inference) has fuller examples that include narrowing, to build and run locally, in a GitHub Codespace or a dev container.
:::

The [type narrowing](/type-narrowing) page covers where narrowing happens: conditions, guards, locals, fields and properties, and assignment. This page covers how long a narrowing lasts - how the compiler decides whether a call invalidated one, what the `pure` modifier declares, and what a `stable` property promises.

## how long a narrowing lasts

Narrowing is optimistic: the compiler narrows whenever a test proves something, and checks afterwards whether the narrowing still holds where it is used. It has to check, because values change, and their types change with them: a value that was present can be reassigned to null.

A narrowing lasts at most to the end of the code block associated with the test - the then or else arm of the `if`, or the loop body. It can end earlier, because the value can change before the block ends: by an explicit reassignment, or because a call to a function or method changes it, directly or indirectly.

The compiler tracks the calls that might do that, conservatively: it builds a call graph and works out which fields each call might write. When you use a narrowed value in a way that depends on the narrowing - you read a member through it, or pass it where only the non-optional or narrower type is accepted - and the compiler cannot prove the value is still what the test saw, it reports the use as potentially unsafe, naming the call it could not prove and pointing back at the test:

<GhulExample name="type-inference-22" />

When the compiler can prove that the calls in between could not have changed the value, there is nothing to report:

<GhulExample name="type-inference-5" />

Where it cannot, there are two ways out. Test the value again: `?`, `!`, `?.`, `isa`, and `if let` all check at run time and re-establish what they test, whatever calls came before. Or copy the value into a local variable:

<GhulExample name="type-inference-23" />

Narrowings of local variables are more stable than narrowings of fields and properties, because there are fewer ways a local variable can change: explicit reassignment, capture by a closure, or being passed by reference to another function. A local variable that is not `mut` cannot change at all, so its narrowing always lasts to the end of the block. That is why `if let` is the best way to get a narrowing that lasts: it copies the value into a fresh immutable local variable in one step, and works for any expression - the result of a call, not only a variable or path. See [if let](/control-flow.html#if-let) for the full construct.

## calls, purity, and stable

Whether a call can invalidate a narrowing depends on what the call can write. The compiler works this out from function bodies: a function that writes nothing that existed before the call cannot invalidate any narrowing, and most functions are proven that way with no annotation. Where the proof falls short, the postfix [`pure` modifier](/definitions.html#methods) declares it instead, trusted as declared and required of every override. Some imported .NET collection mutators, such as `LIST.add` and `STACK.push`, are known to write only their own receiver's internal state, so they invalidate only a narrowing that reads through that state.

A narrowing through a property has one more dependency: the property is read once at the test and again at each use, and every read calls the getter. The narrowing is only sound if the getter's later answers agree with the answer the test saw. The compiler proves that from the getter's body where it can. Where it cannot - a getter that fills a cache on first read, for example - the test does not narrow at all, and a use that relies on the narrowing is an error naming the getter. Declaring the property [`stable`](/definitions.html#properties) restores the narrowing: it promises that two reads with nothing between them agree on whether the value is present, and on its runtime type.
