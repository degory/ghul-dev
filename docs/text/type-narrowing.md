# type narrowing

> **editable examples**
>
> Every example on this page can be edited and run here: click the pencil to open it in an editor, change it, and run it in your browser. Errors, hovers and completions come from the ghūl compiler as you type.
>
> The [ghul-examples repository](https://github.com/degory/ghul-examples/tree/main/examples/type-inference) has fuller examples that include narrowing, to build and run locally, in a GitHub Codespace or a dev container.

When a check proves a value has a more specific type, ghūl narrows the value for the code the check covers: inside the branch, the value has the narrower type, with no cast and no unwrap needed. Union variant tests, `isa` class checks, presence tests on optionals, and `if let` all narrow, and narrowing follows the control flow, [covered below](#flow-sensitive-narrowing).

> **narrowing inlays**
>
> Open ghūl in an editor with the [ghūl language extension](https://ghul.dev/tooling.html) and small triangle hints mark where type narrowing changes: `►` where a variable is narrowed to a more specific type, `◄` where a narrowing ends and the variable widens back to its declared type, and `◄►` where an assignment does both at once. Hovering a hint shows the types and the reason; on an `if` it shows the narrowing for both the taken and the not-taken branch. The same sigils appear in the code examples on this site.

## narrowing in a condition

An `isa` test in an `if` condition narrows the variable to the tested type inside the then-branch. This holds for a union variant or a class:

```ghul
…
union Maybe[T] is
    YES(value: T);
    NO;
si
…
let m: Maybe[int] = Maybe.YES(42);

if isa Maybe.YES( ► m) then
    // m is narrowed to Maybe.YES inside the branch,
    // so m.value is in scope
    write_line("got value {m.value}");
fi

let a: Animal = CAT("whiskers");
if isa CAT( ► a) then
    // a is narrowed to CAT inside the branch
    write_line(a.purr());
fi
```

output:

```
got value 42
whiskers purrs
```

An [optional type](https://ghul.dev/optional-types) narrows the same way. A `?` test in the predicate narrows the optional to its non-optional form in the then-branch, so the value can be used directly:

```ghul
…
let name: string? = lookup();

if ► name? then
    // name is narrowed to non-optional string
    // here, no ! needed
    write_line("hello, {name}");
fi
```

output:

```
hello, world
```

For a two-variant union, the `else` branch is narrowed to the complementary variant:

```ghul
…
union Result[T, E] is
    OK(value: T);
    ERR(error: E);
si
…
let r: Result[int, string] = some_call();

if isa Result.OK( ► r) then
    write_line("ok: {r.value}");
else
    // r is narrowed to Result.ERR here
    write_line("err: {r.error}");
fi
```

output:

```
ok: 42
```

The `else` narrowing extends to a class hierarchy declared in the current assembly without `open`: the compiler knows every subclass, so ruling out the tested one narrows the `else` branch to the others, and when an `abstract` root has exactly two subclasses, ruling out one leaves the other. The [object oriented programming](https://ghul.dev/object-oriented-programming) page covers open, closed, and abstract classes.

A `while` condition narrows its body the same way an `if` condition narrows its then-branch, so `while isa CAT(a) do a.purr() od` reaches a `CAT`-only member without an inner cast.

## flow-sensitive narrowing

Narrowing follows the control flow, not just the branch structure. A common shape is a guard: when the test fails, the guard leaves the block with `return`, `throw`, `break` or `continue`, so the code after the guard runs only when the test passed, and the value is narrowed there:

```ghul
…
classify(a: Animal) is
    if !isa CAT( ► a) then
        write_line("not a cat");
        return;
    fi

    // every non-CAT has returned, so a is
    // narrowed to CAT from here on
    write_line(a.purr());
si

classify(CAT("whiskers"));
classify(DOG());
```

output:

```
whiskers purrs
not a cat
```

## locals and parameters

Narrowing applies to local variables, including a function's own parameters.

```ghul
…
greet(a: Animal) is
    if isa CAT( ► a) then
        // a is a parameter of greet, narrowed to CAT
        // in this branch
        write_line(a.purr());
    fi
si

greet(CAT());
```

output:

```
purr
```

## fields and properties

Narrowing also applies to a member-access path like `x.field` or `x.property`. A presence test (`?`) narrows the path: after `if x.field? then`, uses of `x.field` inside the branch are non-optional.

```ghul
…
describe(order: ORDER) is
    if ► order.customer? then
        // a presence test narrows the path itself:
        // within this branch order.customer is the
        // non-optional string, so .length is
        // reachable directly
        write_line("customer name has {order.customer.length} chars");
    fi
si

describe(ORDER("alice"));
```

output:

```
customer name has 5 chars
```

An `isa` check or variant test narrows a path the same way:

```ghul
…
class CARRIER(occupant: Animal);
describe(carrier: CARRIER) is
    if isa CAT( ► carrier.occupant) then
        // carrier.occupant is a CAT within this branch,
        // so its purr() is reachable directly
        write_line(carrier.occupant.purr());
    fi
si

describe(CARRIER(CAT()));
```

output:

```
purr
```

## narrowing on assignment

Reassigning a local narrows it: when the new value's static type is more specific than the declared type, the local narrows to that type from the assignment on, so a following call resolves on the assigned type without an `isa`:

```ghul
…
► pet = CAT();
// assigning a CAT narrows pet to CAT, so purr() is in reach
write_line(pet.purr());
```

output:

```
purr
```

If the local is already narrowed, assigning a value of a different type cancels that narrowing and introduces one for the new type, so the following call resolves on the assigned type:

```ghul
…
if isa CAT( ► pet) then
    write_line(pet.purr());

    ◄► pet = DOG();
    // reassigning cancels the CAT narrowing and
    // introduces a DOG one: pet is DOG here
    write_line(pet.name());
fi
```

output:

```
purr
dog
```

## how long a narrowing lasts

Narrowing is optimistic: the compiler narrows whenever a test proves something, and checks afterwards whether the narrowing still holds where it is used. It has to check, because values change, and their types change with them: a value that was present can be reassigned to null.

A narrowing lasts at most to the end of the code block associated with the test - the then or else arm of the `if`, or the loop body. It can end earlier, because the value can change before the block ends: by an explicit reassignment, or because a call to a function or method changes it, directly or indirectly.

The compiler tracks the calls that might do that, conservatively: it builds a call graph and works out which fields each call might write. When you use a narrowed value in a way that depends on the narrowing - you read a member through it, or pass it where only the non-optional or narrower type is accepted - and the compiler cannot prove the value is still what the test saw, it reports the use as potentially unsafe, naming the call it could not prove and pointing back at the test:

```ghul
…
describe(carrier: CARRIER, other: Animal) is
    if isa CAT( ► carrier.occupant) then
        ◄ carrier.swap(other);
        // swap() can change occupant, and the use below leans on
        // the narrow - so it is reported here, naming the call
        write_line(carrier.occupant.purr())
    fi
si

describe(CARRIER(CAT()), CAT())
```

diagnostics:

- error: cannot rely on the narrowing of 'carrier.occupant' here: the call to 'swap()' can change it [this call can change carrier.occupant: type-inference-22.ghul: 22,9..22,28] [help: test 'carrier.occupant' again, or copy it into a local variable before the call]

When the compiler can prove that the calls in between could not have changed the value, there is nothing to report:

```ghul
…
describe(carrier: CARRIER) is
    if isa CAT( ► carrier.occupant) then
        carrier.handle();
        // handle() writes only 'handled', so the compiler can
        // see it leaves the narrow on occupant alone
        write_line(carrier.occupant.purr())
    fi
si

describe(CARRIER(CAT()))
```

output:

```
purr
```

Where it cannot, there are two ways out. Test the value again: `?`, `!`, `?.`, `isa`, and `if let` all check at run time and re-establish what they test, whatever calls came before. Or copy the value into a local variable:

```ghul
…
describe(carrier: CARRIER, other: Animal) is
    // a local holds one value, which no other function can
    // reach - its narrowing survives any call
    let cat = carrier.occupant;

    if isa CAT( ► cat) then
        carrier.swap(other);
        write_line(cat.purr())
    fi
si

describe(CARRIER(CAT()), CAT())
```

output:

```
purr
```

Narrowings of local variables are more stable than narrowings of fields and properties, because there are fewer ways a local variable can change: explicit reassignment, capture by a closure, or being passed by reference to another function. A local variable that is not `mut` cannot change at all, so its narrowing always lasts to the end of the block. That is why `if let` is the best way to get a narrowing that lasts: it copies the value into a fresh immutable local variable in one step, and works for any expression - the result of a call, not only a variable or path. See [if let](https://ghul.dev/control-flow.html#if-let) for the full construct.

## calls, purity, and stable

Whether a call can invalidate a narrowing depends on what the call can write. The compiler works this out from function bodies: a function that writes nothing that existed before the call cannot invalidate any narrowing, and most functions are proven that way with no annotation. Where the proof falls short, the postfix [`pure` modifier](https://ghul.dev/definitions.html#methods) declares it instead, trusted as declared and required of every override. Some imported .NET collection mutators, such as `LIST.add` and `STACK.push`, are known to write only their own receiver's internal state, so they invalidate only a narrowing that reads through that state.

A narrowing through a property has one more dependency: the property is read once at the test and again at each use, and every read calls the getter. The narrowing is only sound if the getter's later answers agree with the answer the test saw. The compiler proves that from the getter's body where it can. Where it cannot - a getter that fills a cache on first read, for example - the test does not narrow at all, and a use that relies on the narrowing is an error naming the getter. Declaring the property [`stable`](https://ghul.dev/definitions.html#properties) restores the narrowing: it promises that two reads with nothing between them agree on whether the value is present, and on its runtime type.
