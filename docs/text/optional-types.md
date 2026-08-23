# optional types

A type followed by `?` is an *optional* type: a value of `T?` can be present or absent, and the same type without the `?` is non-optional. The [language basics](https://ghul.dev/language-basics.html#optional-types) page introduces the presence test `?` and the assignability rule; the operators work the same whatever `T` is. ghūl backs `T?` with whichever of three representations fits `T`, and picks it silently; all three behave alike.

```ghul
…
// one feature, T?, however T turns out to be represented
find_first[T](xs: T[], predicate: T -> bool) -> T? is
    for x in xs do
        if predicate(x) then
            return x;
        fi
    od

    return null;
si

let first_even = find_first([1, 3, 4, 7, 8], n => n % 2 == 0);    // T = int, a value type
let first_long = find_first(["a", "bb", "ccc"], s => s.length > 2); // T = string, a reference type

write_line("first even: {first_even ?? -1}");
write_line("first long: {first_long ?? "none"}");
```

output:

```
first even: 4
first long: ccc
```

`find_first` doesn't know or care whether `T` is `int` or `string`; the same `T?`, the same `??` fallback, work either way.

## `T?`: one feature, three representations

### reference types

The common case: `T?` over a class or other reference type is a plain nullable reference, and absence is `null`.

```ghul
let ► name: string? = "Alice"; // present
let nickname: string? = null; // absent
```
```ghul
…
if ► name? then
    write_line("name is {name}"); // name is non-optional here
fi
```

output:

```
name is Alice
```

### value types

`T?` over a value type - `int?`, or a struct - is backed by .NET's `Nullable<T>` at the IL level. That is nothing you need to work with directly: write `T?`, the same way you would for a reference type. A ghūl `int?` already is a `Nullable<int>` as far as the runtime is concerned, so it passes to and from non-ghūl .NET code as it is, and there is no reason to name `System.Nullable[T]` in ghūl source:

```ghul
let ► here: int? = 42;   // present
let gone: int? = null; // absent
```

### unconstrained generic types

A generic function or type can use `T?` before anything is known about whether `T` will turn out to be a reference or a value type:

```ghul
…
// a generic type can hold a T? field before T is known
class SLOT[T] is
    _stored: T?;

    init() is si

    put(value: T) is ► _stored = value; si

    take() -> T? is
        let result = _stored;
        _stored = null;
        return result;
    si
si

let s = SLOT[int]();
s.put(42);
write_line("{s.take() ?? -1}");
write_line("{s.take() ?? -1}");
```

output:

```
42
-1
```

Behind the scenes an unconstrained `T?` lowers to `Ghul.MAYBE[T]`, a struct that can hold present or absent for any `T`. Like the other two representations it is an implementation detail: there is no reason to name `MAYBE[T]` in your own code. See [generics](https://ghul.dev/generics) for how the type parameters themselves work.

### they interconvert

Because all three are the same feature, they behave alike: `??` chains across them, `if x?` and `if let` narrow them the same way, and a non-optional `T` widens to any of them without ceremony. Which one backs a given `T?` is an implementation detail you don't need to track.

```ghul
…
if ► maybe? then
    let narrowed: string = maybe; // narrowed to string here
    write_line(narrowed);
fi

let forced: string = ► maybe!;            // asserts present, throws if absent
let safe: string = maybe ?? "fallback"; // falls back when absent
```

output:

```
found
```

## the operators

The `??` operator supplies a fallback: `a ?? b` is `a` when it is present, otherwise `b`, and `b` is evaluated only when needed. It is right-associative, so `a ?? b ?? c` tries each in turn, and the result stays optional until a non-optional value closes the chain:

```ghul
…
let name = lookup();
let greeting = "hello, {name ?? "stranger"}";
write_line(greeting);
```

output:

```
hello, stranger
```

The `?.` operator reads a member only when the receiver is present: `a?.b` is `b` when `a` is present; otherwise the result is absent. The result is always optional, and `?.` chains, so a whole access path folds down to one optional. Method calls compose the same way: `a?.foo(args)` calls `foo` on a present receiver; otherwise the result is absent, with the argument expressions included in the short-circuit, so they are not evaluated when `a` is absent.

The postfix `!` asserts presence and reads the value out; applied to an absent optional it throws. Inside a branch where flow analysis has proven presence, the compiler reports a redundancy warning instead.

```ghul
…
let p = find();
let name = p?.name; // string? - absent when p is absent
write_line("name: {name ?? "unknown"}");
```

output:

```
name: unknown
```

## the warnings

Reading a member through an optional not known to be present is reported with a `null-deref` warning; `x?.y`, `x.has_value`, `x!`, and `if let` are the warning-free routes. Applying `!`, `?`, or `?.` to a value already known to be present warns that the operator is redundant, and `!` on a value that was never optional is an error. Each warning has a slug you can silence with `@suppress("<slug>")` per declaration, per file, or across the project.

## which one to use

- Holding optional data in your own code: write `T?`. Don't think about which of the three representations you're getting - that's the point of the unification.
- Writing a generic function or type that needs to hold "maybe a `T`" for an unconstrained `T`: `T?` works there too, and nothing more is needed.
- Modelling something with more shape than "present or absent" - success-with-a-value versus failure-with-a-reason, for instance - use a union with a `default` variant: the same `?` and `!`, plus exhaustive `case` matching over every outcome; see [optional-shaped types](#optional-shaped-types) below.

## optional-shaped types

A named type of your own can support `?` and `!` without being a `T?`. It keeps its own name and doesn't interconvert with `T?` - what it opts in to is the operators, not the spelling. There are two routes.

A union where exactly one variant has fields, or with one variant marked `default`, is option-shaped: `?` tests whether the union holds that variant, and `!` unwraps its payload (or the whole variant, if it has more than one field). The [unions and pattern matching](https://ghul.dev/unions-and-pattern-matching.html) page builds an `Option[T]` from scratch; the same rule covers the two-variant shape most languages call `Result` - `OK` marked `default`, `ERROR` holding the failure:

```ghul
…
union Result[T, E] is
    OK(value: T) default;
    ERROR(error: E);
si

divide(a: int, b: int) -> Result[int, string] =>
    if b == 0 then
        Result.ERROR("division by zero")
    else
        Result.OK(a / b)
    fi;

let good = divide(10, 2);
let bad = divide(10, 0);

if ► good? then
    write_line("10 / 2 = {good!}");
fi

if ! ► bad? then
    write_line("10 / 0 failed");
fi
```

output:

```
10 / 2 = 5
10 / 0 failed
```

And a type that exposes `has_value: bool` and `value: T` properties is treated as optional-shaped structurally, with no declaration required: `?` consults `has_value`, and on a struct `!` reads out `value`. `Ghul.MAYBE[T]` satisfies this by construction; so does a type you write yourself:

```ghul
…
// no declared relationship to T? or Ghul.Maybe[T] - ghūl looks for
// has_value and value structurally
struct PERCENTAGE is
    has_value: bool;
    value: double;

    init() is
        has_value = false;
        value = _;
    si

    init(v: double) is
        has_value = true;
        value = v;
    si
si

let full = PERCENTAGE(87.5d);
let empty = PERCENTAGE();

if full? then
    write_line("full: {full!}%");
fi

if !empty? then
    write_line("empty has no reading");
fi
```

output:

```
full: 87.5%
empty has no reading
```
