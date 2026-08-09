# .NET integration

ghūl is hosted on and targets .NET 10 and can consume most types in .NET assemblies built with C#.

## projects

The ghūl compiler is driven by MSBuild and uses the .NET SDK targets for most of the build process. Provided you reference the ghūl runtime library package, things should work as you'd expect for any other .NET SDK project. You can add package references, build assemblies and pack NuGet packages etc. all using the normal `dotnet` command line tools.

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

```ghul
…
class WITH_HASH(x: int) is
    =~(other: WITH_HASH) -> bool => x == other.x;

    get_hash_code() -> int => x.get_hash_code();
si

// only =~, so .NET keeps comparing by identity:
class NO_HASH(x: int) is
    =~(other: NO_HASH) -> bool => x == other.x;
si

let with_hash = SET[WITH_HASH]();
with_hash.add(WITH_HASH(1));
write_line("with get_hash_code: {with_hash.contains(WITH_HASH(1))}");

let no_hash = SET[NO_HASH]();
no_hash.add(NO_HASH(1));
write_line("without get_hash_code: {no_hash.contains(NO_HASH(1))}");
```

diagnostics:

- warning: [equality-without-hash] NO_HASH defines =~ but no get_hash_code, so .NET comparisons will not use the operator

output:

```
with get_hash_code: True
without get_hash_code: False
```

`System.HashCode.combine` is the usual way to build the hash from the same members `=~` reads.

The hash is not generated for you, because an operator is free to ignore members it does not care about, and a member-wise hash would then disagree with it. A type that defines neither is consistent as it stands, comparing and hashing by identity, so a type that defines only `=~` is reported as `equality-without-hash` and left alone rather than half-converted.

A value type hides this for a while: .NET's default equality for a struct is member-wise, so a struct that skips `get_hash_code` often behaves correctly by coincidence and then diverges the moment its `=~` stops agreeing with a member-wise comparison. The warning fires either way, and is worth heeding either way.

### ordering

Sorting, `Ghul.Comparable[T]`, and the relational operators all come from `<>`, a three-way ordering returning a negative, zero, or positive `int`. Defining it gives a type `<`, `<=`, `>` and `>=` and makes it sortable by .NET at the same time:

```ghul
…
class VERSION(major: int, minor: int): Ghul.Comparable[VERSION] is
    <>(other: VERSION) -> int =>
        if major != other.major then major - other.major else minor - other.minor fi;

    to_string() -> string => "{major}.{minor}";
si

let versions = LIST[VERSION]();
versions.add(VERSION(2, 1));
versions.add(VERSION(1, 9));
versions.sort();

write_line("sorted: {versions | .map(v => v.to_string()) | .join(", ")}");
write_line("1.0 < 1.1: {VERSION(1, 0) < VERSION(1, 1)}");
```

output:

```
sorted: 1.9, 2.1
1.0 < 1.1: True
```

### disposal

A type holding something that has to be released implements `Ghul.Disposable`, which is .NET's `IDisposable`, by defining `dispose`. `let use` then releases it at the end of the enclosing block, however the block is left:

```ghul
…
class SCOPE(name: string): Ghul.Disposable is
    dispose() is
        write_line("closing {name}");
    si
si

let use s = SCOPE("file");

write_line("inside the scope");
```

output:

```
inside the scope
closing file
```

### iteration

A type implementing `Collections.Iterable[T]` is a .NET `IEnumerable<T>`, so it works with `for`, with the pipe combinators, and with any .NET API taking a sequence. The requirement is an `iterator` property, and a [generator](https://ghul.dev/control-flow.html#generators) is usually the shortest way to supply one:

```ghul
…
class COUNTDOWN(from: int): Iterable[int] is
    iterator: Iterator[int] => _counting().iterator;

    _counting() -> Pipe[int] is
        let i mut = from;
        while i > 0 do
            yield i;
            i = i - 1;
        od
    si
si

for i in COUNTDOWN(3) do
    write_line("tick {i}");
od
```

output:

```
tick 3
tick 2
tick 1
```

### a gotcha when reflecting over your types

An auto-property's backing field is named `$` followed by the property name, and reflection sees it alongside the property itself. A reflection-based serializer told to include fields will therefore emit everything twice. With `System.Text.Json`, leave `include_fields` alone unless the type genuinely has fields to serialize.

## ASP.NET Core

ASP.NET Core minimal APIs work from ghūl. Extension methods aren't exposed as members, so the fluent builder calls go through the `|>` thread-first operator, which passes the left-hand side as the called method's first argument:

```ghul
…
entry(args: string[]) is
    let builder = WebApplication.create_builder(args);

    let app = builder.build();

    // '|>' threads app in as map_get's first argument:
    app |> map_get("/hello", () => Results.ok("hello, world"));

    app.run(null);
si
```

`app |> map_get(...)` calls the `MapGet` extension on `app`; the route handler is an anonymous function returning an `IResult`.

Controller-style APIs rely on attributes, which apply to classes and methods: `[ApiController]`, `[Route(...)]`, `[HttpGet(...)]` and so on. ghūl doesn't yet place attributes on method parameters, so parameter-binding attributes like `[FromBody]` aren't expressible; minimal APIs bind by position and need none of them.

## Entity Framework Core

Entity Framework Core works from ghūl. A context extends `DbContext` and exposes each table as a `DbSet`; EF Core's conventions expect PascalCase names, so `@IL.name` maps the ghūl members onto them:

```ghul
…
// @IL.name maps these onto the PascalCase names EF Core's conventions expect.
@IL.name("Product")
class PRODUCT is
    @IL.name("Id")
    id: int public;

    @IL.name("Name")
    name: string public;

    init() is si
si

class STORE_CONTEXT: DbContext is
    @IL.name("Products")
    products: DbSet[PRODUCT];

    init(options: DbContextOptions) is
        super.init(options);
    si
si

add_product(context: STORE_CONTEXT, product: PRODUCT) -> Tasks.TASK is
    context.products.add(product);

    await context.save_changes_async(System.Threading.CancellationToken.none);

    return;
si
…
```

The `Products` set and the entity's `Id` and `Name` are the names EF Core's model builder and SQL generation look for. Reads and writes call the async methods directly, with `await` - `save_changes_async` here.

## mocking with NSubstitute

The .NET base libraries include no mocking framework; [NSubstitute](https://nsubstitute.github.io/) is the lowest-friction third-party option from ghūl, and the compiler's own test suite uses it. `Substitute.for` builds a stand-in for a trait, and the `Returns` extension stubs a call through `|>`:

```ghul
…
trait Clock is
    now() -> System.DateTime;
si

test_uses_a_stubbed_clock() static is
    // Substitute.for takes the constructor arguments as an object[]; a
    // trait has none, so pass an empty array.
    let clock = Substitute.`for[Clock]([]);

    // stub a return value for a call:
    clock.now() |> returns(System.DateTime(2020, 1, 1, 9, 0, 0), null);

    IO.Std.write_line("stubbed hour is {clock.now().hour}");
si
…
```

`for` is a reserved word, so the example escapes it with a backtick. Its argument is the substitute's constructor arguments as an `object[]`; a trait has none, so the argument is an empty array. Where a full framework isn't warranted, a hand-written trait implementation is the zero-dependency alternative.
