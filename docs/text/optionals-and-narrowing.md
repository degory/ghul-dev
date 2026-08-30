# optional types and narrowing

> **editable examples**
>
> Every example on this page can be edited and run here: click the pencil to open it in an editor, change it, and run it in your browser. Errors, hovers and completions come from the ghūl compiler as you type.

A type followed by `?` is an *optional* type: a value of `T?` can be present or absent, and a plain `T` always holds a value. The compiler rejects a `T?` where a `T` is needed, so absence is handled where it can arise, not discovered as a crash somewhere later.

```ghul
…
find_first[T](xs: T[], predicate: T -> bool) -> T? is
    for x in xs do
        if predicate(x) then
            return x
        fi
    od

    return null
si

let first_even = find_first([1, 3, 4, 7, 8], n => n % 2 == 0)    // T = int, a value type
let first_long = find_first(["a", "bb", "ccc"], s => s.length > 2) // T = string, a reference type

write_line("first even: {first_even ?? -1}")
write_line("first long: {first_long ?? "none"}")
```

output:

```
first even: 4
first long: ccc
```

`find_first` returns the first element the predicate accepts, or absent when there is none; `??` supplies a value for the absent case. `?.` reads a member only when the receiver is present, and `!` asserts presence, throwing when the value is absent. For everything else a plain test is enough, because a test narrows.

## a test is enough

`if x?` narrows `x` to its non-optional form inside the branch, so the value reads directly, with no unwrap and no cast:

```ghul
…
let name: string? = lookup()

if ► name? then
    // name is narrowed to non-optional string
    // here, no ! needed
    write_line("hello, {name}")
fi
```

output:

```
hello, world
```

The same applies to types. An `isa` test narrows a value to the tested class or union variant, and over a closed set of possibilities the `else` branch narrows to what remains:

```ghul
…
union Result[T, E] is
    OK(value: T)
    ERR(error: E)
si
…
let r: Result[int, string] = some_call()

if isa Result.OK( ► r) then
    write_line("ok: {r.value}")
else
    // r is narrowed to Result.ERR here
    write_line("err: {r.error}")
fi
```

output:

```
ok: 42
```

Narrowing follows the control flow, not just the branch structure. A guard that returns leaves the code after it narrowed:

```ghul
…
classify(a: Animal) is
    if !isa CAT( ► a) then
        write_line("not a cat")
        return
    fi

    // every non-CAT has returned, so a is
    // narrowed to CAT from here on
    write_line(a.purr())
si

classify(CAT("whiskers"))
classify(DOG())
```

output:

```
whiskers purrs
not a cat
```

And it applies to fields and properties as well as local variables:

```ghul
…
describe(order: ORDER) is
    if ► order.customer? then
        // a presence test narrows the path itself:
        // within this branch order.customer is the
        // non-optional string, so .length is
        // reachable directly
        write_line("customer name has {order.customer.length} chars")
    fi
si

describe(ORDER("alice"))
```

output:

```
customer name has 5 chars
```

> **narrowing inlays**
>
> Open ghūl in an editor with the [ghūl language extension](https://ghul.dev/tooling.html) and small triangle hints mark where narrowing changes: `►` where a value narrows, `◄` where it widens back. The same sigils appear in the code examples on this site.

## the narrowing is checked

A narrowed value can change before it is used: a reassignment, or a call to a function that writes the member the narrowing depends on. The compiler tracks the calls in between and reports a use it cannot prove safe, naming the call; testing the value again, or copying it into a local variable, resolves it. So a narrowing is never a guess that the value is probably still there - it either holds, or the compiler says why not.

[Type narrowing](https://ghul.dev/type-narrowing) covers the machinery: what invalidates a narrowing, what the `pure` modifier declares, and what a `stable` property promises. [Optional types](https://ghul.dev/optional-types) covers the operators, the warnings, and the three run-time representations behind `T?`.
