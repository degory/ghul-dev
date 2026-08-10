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

A narrow on a path is less durable than one on a local variable. A local holds its value, which no other call can change, so its narrowing lasts until the variable is reassigned. A path reads a fresh value each time, so its narrowing lasts only while nothing can change what it reads: a call to a method or property that can write to the heap drops it, as does an assignment that can change the path. Copying the path into a local keeps the narrower type across a call that would otherwise drop it.

```ghul
…
describe(carrier: CARRIER) is
    // handle() can write to the heap, so it would drop
    // a narrow on carrier.occupant - copy the value into
    // a local, whose type no other call can change
    let occupant = carrier.occupant;

    if isa CAT( ► occupant) then
        carrier.handle();
        // occupant is still a CAT after the call
        write_line(occupant.purr());
    fi
si

describe(CARRIER(CAT()));
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

## purity

ghūl decides which calls are safe by inferring purity. A method or property that only reads, never writing to the heap, is pure, and a call to a pure one preserves a path narrow - so a plain accessor that reads a field leaves it in place. The inference is automatic; a function the compiler can't prove pure can assert it with a postfix [`pure` modifier](https://ghul.dev/definitions.html#methods).
