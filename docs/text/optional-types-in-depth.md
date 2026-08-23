# optional types in depth

> **editable examples**
>
> Every example on this page can be edited and run here: click the pencil to open it in an editor, change it, and run it in your browser. Errors, hovers and completions come from the ghūl compiler as you type.

The [optional types](https://ghul.dev/optional-types) page covers using `T?`: the operators, the warnings, and optional-shaped types of your own. This page covers how a `T?` is represented at run time - which matters only when interoperating with other .NET languages, or when reading the IL the compiler produces. ghūl backs `T?` with whichever of three representations fits `T`, and picks it silently; all three behave alike.

## reference types

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

## value types

`T?` over a value type - a scalar such as `int`, or a struct - is backed by .NET's `Nullable<T>` at the IL level. That is nothing you need to work with directly: write `T?`, the same way you would for a reference type. A ghūl `int?` already is a `Nullable<int>` as far as the runtime is concerned, so it passes to and from non-ghūl .NET code as it is, and there is no reason to name `System.Nullable[T]` in ghūl source:

```ghul
let ► here: int? = 42;   // present
let gone: int? = null; // absent
```

## unconstrained generic types

A generic function or type can use `T?` even though `T` can stand for a reference type or a value type:

```ghul
…
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

Behind the scenes an unconstrained `T?` lowers to `Ghul.MAYBE[T]`, a struct that can hold present or absent for any `T`. Like the other two representations it is an implementation detail: there is no reason to name `MAYBE[T]` in your own code. `MAYBE[T]` exposes `has_value: bool` and `value: T` properties, so it is [optional-shaped](https://ghul.dev/optional-types#optional-shaped-types) by construction. See [generics](https://ghul.dev/generics) for how the type parameters themselves work.

## they interconvert

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
