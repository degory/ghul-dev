# type narrowing

> **editable examples**
>
> Every example on this page can be edited and run here: click the pencil to open it in an editor, change it, and run it in your browser. Errors, hovers and completions come from the ghūl compiler as you type.
>
> The [ghul-examples repository](https://github.com/degory/ghul-examples/tree/main/examples/type-inference) has fuller examples that include narrowing, to build and run locally, in a GitHub Codespace or a dev container.

When a check guarantees a value has a more specific type, ghūl narrows that value to it for the code the check covers: inside the branch the value reads at the narrower type, with no cast and no unwrap. Union variant tests, `isa` class checks, presence tests on optionals, and `if let` all narrow, and the narrowing is flow-sensitive - it follows the control flow rather than being confined to a branch body.

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

The `else` narrowing extends to a class hierarchy declared in the current assembly without `open`: ruling out one subclass on the `else` edge narrows to the rest, and when the root is `abstract` the chain can collapse to a single remaining subclass.

A `while` condition narrows its body the same way an `if` condition narrows its then-branch, so `while isa CAT(a) do a.purr() od` reaches a `CAT`-only member without an inner cast.

## flow-sensitive narrowing

Narrowing follows the control flow rather than being confined to a branch body. If a guard rejects the narrower type and then leaves the enclosing block, by `return`, `throw`, `break` or `continue`, the code after the guard is narrowed:

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

## member-access paths

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

## how long a narrow lasts

A narrow on a local variable lasts until the variable is reassigned: a local holds one value, which no other function can reach, so no call can make it stale.

A narrow on a member-access path is harder to keep, because the path reads a fresh value every time it is mentioned. A direct store ends it outright: assigning the field the fact describes through any receiver, storing through any field or property when the last hop is a property getter, or reassigning the path's root.

Any other call that might write to the heap is recorded against the narrow rather than ending it. What gets checked is each later use of the value, and only a use that depends on the narrow. Passing the value where its declared type already fits depends on nothing; reading a member only the narrower view exposes does. When every recorded call is proven harmless the use passes silently. When one cannot be proven, the compiler reports it at the use site, names the call that could have changed the value, and points back at the test that narrowed it:

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

There are two ways out. Test the value again: `?`, `!`, `?.`, `isa`, and `if let` all check at run time and re-establish what they test, whatever calls came before. Or copy the value into a local variable before the call, where no other function can reach it:

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

Where proof succeeds there is nothing to report. This call only writes a field the narrow doesn't read through, so the compiler sees it leaves the narrow alone:

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

`if let` copies the value into a fresh local in one step, and works for any expression - the result of a call, not only a variable or path. The local narrows and stays narrowed within the branch. See [if let](https://ghul.dev/control-flow.html#if-let) for the full construct.

```ghul
…
describe(carrier: CARRIER) is
    if let cat: CAT = carrier.occupant then
        write_line(cat.purr());
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

## calls, purity, and stable

What makes a call harmless is what it can write. The compiler infers this from bodies: a function proven store-free writes nothing already on the heap, and a call to one leaves every narrowing alone. Most functions are proven outright; where proof falls short, a postfix [`pure` modifier](https://ghul.dev/definitions.html#methods) declares store-freedom instead, trusted as stated and required of every override. Some imported .NET collection mutators, such as `LIST.add` and `STACK.push`, are trusted to store only in their own receiver, so they count as harmless unless the narrow reads through them.

A narrow read through a property also depends on the getter answering the same way twice. When the compiler can't prove that of a getter - a memoiser stores into its cache on first read, say - any use that depends on the narrow draws a warning naming the getter. Declaring the property [`stable`](https://ghul.dev/definitions.html#properties) keeps the narrow: it asserts that two adjacent reads agree on presence and runtime type.
