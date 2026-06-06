# generics

::: tip runnable examples
The [ghul-examples repository](https://github.com/degory/ghul-examples/tree/main/examples/generics) has fuller, runnable generics examples. Open it in a GitHub Codespace or a dev container to build and run them.
:::

ghūl supports generic type arguments on
- classes
- structs
- traits
- methods
- unions
- global functions

Type arguments declare a named type, which can be used anywhere within its scope in type expressions.

For example in the following global function, `T` is a type argument, and it can be used within the function's definition and body.
When a particular specialization of `print_something[T](T)` is called, `T` will have whatever actual type argument was supplied

<GhulExample name="generics-1" />

<GhulExample name="generics-2" />

<GhulExample name="generics-3" />

<GhulExample name="generics-4" />

<GhulExample name="generics-5" />

Generic argument types can be inferred from context for generic constructor invocations as well as generic function and method calls

<GhulExample name="generics-6" />

## type-parameter constraints

A type parameter can have one or more constraints, listed inside its declaration. Constraints both narrow the operations the generic body can perform on values of that type and restrict the actual types that callers can supply. The compiler enforces all constraints, both for ghūl types that declare them and for types imported from .NET assemblies.

### type bound

A type bound `[T: SomeType]` requires the type argument to derive from `SomeType`. Within the generic body, the members of `SomeType` become available on values of type `T`.

<GhulExample name="generics-7" />

Only a single type bound per parameter is currently supported; `[T: A /\ B]` is rejected with a clear diagnostic.

### kind constraint

A kind constraint requires the type argument to be a particular kind of type. Three keywords are recognised:

- `class`: a reference type
- `struct`: a value type
- `optional`: an optional (nullable) type

```ghul
class CELL[T: struct] is
    value: T;
    init(value: T) is self.value = value; si
si
```

A kind constraint may combine with a type bound and/or a constructor constraint, in that order: `[T: A class new]`.

### constructor constraint

The `new` constraint requires the type argument to expose an accessible parameterless constructor.

<GhulExample name="generics-9" />

## variance

Type variance is declared on a *trait*'s type parameters (the CLR permits variance only on interfaces, which is what a ghūl trait compiles to). A `class` or `struct` may not declare variant type parameters.

- `[T: out]`: covariant. `Producer[CAT]` is assignable to `Producer[ANIMAL]` when `CAT` derives from `ANIMAL`. Only legal when `T` appears in *output* positions (return types).
- `[T: in]`: contravariant. `Consumer[ANIMAL]` is assignable to `Consumer[CAT]`. Only legal when `T` appears in *input* positions (parameter types).

<GhulExample name="generics-8" />

Variance is also automatic in two places: a function type is contravariant in its parameter types and covariant in its return type; an array of a reference type is covariant.
