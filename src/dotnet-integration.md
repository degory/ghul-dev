# .NET integration

ghūl is hosted on and targets .NET 10 and can consume most types in .NET assemblies built with C#.

## projects

The ghūl compiler is driven by MSBuild and uses the .NET SDK targets for most of the build process. Provided you reference the ghūl runtime library package, things should work as you'd expect for any other .NET SDK project. You can add package references, build assemblies and pack NuGet packages etc. all using the normal `dotnet`{:text} command line tools.

## name mangling
When consuming C# code the ghūl compiler transforms symbol names to better match ghūl conventions:

- Class, struct and trait (=interface) names are left unchanged
- Any generic type argument count suffix is left as-is (for example ``KeyValuePair`2``)
- Enum names and enum member names are transformed to `MACRO_CASE`
- Method, property and field names are transformed to `snake_case`
- Names that conflict with ghūl keywords are prefixed with `` ` ``

## namespace and type name re-mapping
Some commonly used namespace and type names are re-mapped in line with ghūl conventions

### namespaces
- `System.Collections.Generic` is mapped to `Collections`
- `System.IO` is mapped to `IO`

### framework and collection types

| Original Type                                        | Mapped Type                         |
|------------------------------------------------------|-------------------------------------|
| `System.IDisposable`                                 | `Ghul.Disposable`                   |
| `System.Console`                                     | `IO.Std`                            |
| `System.Collections.IEnumerable`                     | `Collections.NonGenericIterable`    |
| `System.Collections.Generic.IReadOnlyCollection`     | `Collections.Bag`                   |
| `System.Collections.Generic.ICollection`             | `Collections.MutableBag`            |
| `System.Collections.IEnumerator`                     | `Collections.MoveNext`              |
| `System.Collections.Generic.IEnumerable`             | `Collections.Iterable`              |
| `System.Collections.Generic.IEnumerator`             | `Collections.Iterator`              |
| `System.Collections.Generic.IReadOnlyList`           | `Collections.List`                  |
| `System.Collections.Generic.IList`                   | `Collections.MutableList`           |
| `System.Collections.Generic.List`                    | `Collections.LIST`                  |
| `System.Collections.Generic.IReadOnlyDictionary`     | `Collections.Map`                   |
| `System.Collections.Generic.IDictionary`             | `Collections.MutableMap`            |
| `System.Collections.Generic.Dictionary`              | `Collections.MAP`                   |
| `System.Collections.Generic.HashSet`                 | `Collections.SET`                   |
| `System.Collections.Generic.Stack`                   | `Collections.STACK`                 |
| `System.Threading.Tasks.Task`                        | `Tasks.TASK`                        |
| `System.Threading.Tasks.Task<T>`                     | `Tasks.TASK[T]`                     |

### primitive types

| Original Type     | Mapped Type          |
|-------------------|----------------------|
| `System.Void`     | `Ghul.void`          |
| `System.Boolean`  | `Ghul.bool`          |
| `System.Char`     | `Ghul.char`          |
| `System.Byte`     | `Ghul.ubyte`         |
| `System.SByte`    | `Ghul.byte`          |
| `System.UInt16`   | `Ghul.ushort`        |
| `System.Int16`    | `Ghul.short`         |
| `System.UInt32`   | `Ghul.uint`          |
| `System.Int32`    | `Ghul.int`           |
| `System.UInt64`   | `Ghul.ulong`         |
| `System.Int64`    | `Ghul.long`          |
| `System.UIntPtr`  | `Ghul.uword`         |
| `System.IntPtr`   | `Ghul.word`          |
| `System.Single`   | `Ghul.single`        |
| `System.Double`   | `Ghul.double`        |
| `System.Decimal`  | `Ghul.decimal`       |
| `System.Object`   | `Ghul.object`        |
| `System.String`   | `Ghul.string`        |

## making your own types work with .NET

The mappings above are about reaching into .NET. This section is the other direction: what a ghūl type has to provide before .NET libraries treat it as a first-class value rather than as an opaque object. In each case the language already has the operator or member; the point is which one .NET is looking for.

### equality

.NET consults a type's equality when it goes looking for a value: a dictionary key, a set member, `contains` on a list. A type defines that with `=~`, which is emitted as .NET's `Equals`. But defining `=~` alone is not enough, because a hash-based collection consults the hash first and never reaches the comparison. Define `get_hash_code` alongside it, and the two together produce the `Object.Equals` override that .NET actually uses:

<GhulExample name="dotnet-integration-4" />

`System.HashCode.combine` is the usual way to build the hash from the same members `=~` reads.

The hash is not generated for you, because an operator is free to ignore members it does not care about, and a member-wise hash would then disagree with it. A type that defines neither is consistent as it stands, comparing and hashing by identity, so a type that defines only `=~` is reported as `equality-without-hash` and left alone rather than half-converted.

A value type hides this for a while: .NET's default equality for a struct is member-wise, so a struct that skips `get_hash_code` often behaves correctly by coincidence and then diverges the moment its `=~` stops agreeing with a member-wise comparison. The warning fires either way, and is worth heeding either way.

### ordering

Sorting, `Ghul.Comparable[T]`, and the relational operators all come from `<>`, a three-way ordering returning a negative, zero, or positive `int`. Defining it gives a type `<`, `<=`, `>` and `>=` and makes it sortable by .NET at the same time:

<GhulExample name="dotnet-integration-5" />

### disposal

A type holding something that has to be released implements `Ghul.Disposable`, which is .NET's `IDisposable`, by defining `dispose`. `let use` then releases it at the end of the enclosing block, however the block is left:

<GhulExample name="dotnet-integration-6" />

### iteration

A type implementing `Collections.Iterable[T]` is a .NET `IEnumerable<T>`, so it works with `for`, with the pipe combinators, and with any .NET API taking a sequence. The requirement is an `iterator` property, and a [generator](/async-and-generators.html#generators) is usually the shortest way to supply one:

<GhulExample name="dotnet-integration-7" />

### a gotcha when reflecting over your types

An auto-property's backing field is named `$` followed by the property name, and reflection sees it alongside the property itself. A reflection-based serializer told to include fields will therefore emit everything twice. With `System.Text.Json`, leave `include_fields` alone unless the type genuinely has fields to serialize.

## ASP.NET Core

ASP.NET Core minimal APIs work from ghūl. Extension methods aren't exposed as members, so the fluent builder calls go through the `|>` thread-first operator, which passes the left-hand side as the called method's first argument:

<GhulExample name="dotnet-integration-1" />

`app |> map_get(...)` calls the `MapGet` extension on `app`; the route handler is an anonymous function returning an `IResult`.

Controller-style APIs rely on attributes, which apply to classes and methods: `[ApiController]`, `[Route(...)]`, `[HttpGet(...)]` and so on. ghūl doesn't yet place attributes on method parameters, so parameter-binding attributes like `[FromBody]` aren't expressible; minimal APIs bind by position and need none of them.

## Entity Framework Core

Entity Framework Core works from ghūl. A context extends `DbContext` and exposes each table as a `DbSet`; EF Core's conventions expect PascalCase names, so `@IL.name` maps the ghūl members onto them:

<GhulExample name="dotnet-integration-2" />

The `Products` set and the entity's `Id` and `Name` are the names EF Core's model builder and SQL generation look for. Reads and writes call the async methods directly, with `await` - `save_changes_async` here.

## mocking with NSubstitute

The .NET base libraries include no mocking framework; [NSubstitute](https://nsubstitute.github.io/) is the lowest-friction third-party option from ghūl, and the compiler's own test suite uses it. `Substitute.for` builds a stand-in for a trait, and the `Returns` extension stubs a call through `|>`:

<GhulExample name="dotnet-integration-3" />

`for` is a reserved word, so the example escapes it with a backtick. Its argument is the substitute's constructor arguments as an `object[]`; a trait has none, so the argument is an empty array. Where a full framework isn't warranted, a hand-written trait implementation is the zero-dependency alternative.

