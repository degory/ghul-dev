# generics

> **editable examples**
>
> Every example on this page can be edited and run here: click the pencil to open it in an editor, change it, and run it in your browser. Errors, hovers and completions come from the ghūl compiler as you type.
>
> The [ghul-examples repository](https://github.com/degory/ghul-examples/tree/main/examples/generics) has fuller generics examples to build and run locally, in a GitHub Codespace or a dev container.

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

```ghul
…
print_something[T](t: T) => write_line("something is {t}");
```

```ghul
…
print_something[int](1234);
print_something[string]("hello");
```

output:

```
something is 1234
something is hello
```

```ghul
struct HOLD_SOMETHING[T](value: T);
```

```ghul
…
let holds_int = HOLD_SOMETHING(1234);
let holds_string = HOLD_SOMETHING("hello");
```

```ghul
union Option[T] is
    SOME(value: T);
    NONE;
si
…
let some_int = Option.SOME(1234);
```

Generic argument types can be inferred from context for generic constructor invocations as well as generic function and method calls

```ghul
…
print_something(1234);
print_something("hello");
```

output:

```
something is 1234
something is hello
```

## type-parameter constraints

A type parameter can have one or more constraints, listed inside its declaration. Constraints both narrow the operations the generic body can perform on values of that type and restrict the actual types that callers can supply. The compiler enforces all constraints, both for ghūl types that declare them and for types imported from .NET assemblies.

### type bound

A type bound `[T: SomeType]` requires the type argument to derive from `SomeType`. Within the generic body, the members of `SomeType` become available on values of type `T`.

```ghul
…
trait ▼ Greetable is
    ◆▼ name: string;
si

// T must derive from Greetable, so .name is available on T
greet[T: Greetable](x: T) is
    write_line("hello, {x.name}");
si

class CAT( ▲ name: string): Greetable;
…
greet(CAT("whiskers"));
```

output:

```
hello, whiskers
```

A value whose static type is a bounded type parameter also narrows and destructures through the bound, so `isa`, `if let`, and destructuring reach the bound's subtypes and variants directly, with no manual widen to the bound first:

```ghul
use IO.Std.write_line;

class ▼ Animal abstract is
    ◆▼ name() -> string;
si

class CAT: Animal is
    init() is si
    ▲ name() -> string => "cat";
    purr() -> string => "purr";
si

// T is bounded by Animal, so a T value narrows through Animal with isa
describe[T: Animal](x: T) -> string =>
    if isa CAT( ► x) then x.purr()
    else x.name()
    fi;

write_line(describe(CAT()));
```

output:

```
purr
```

Several bounds can be joined with `/\`. The value then behaves as every one of them - a member of any bound is reachable - and the actual type argument has to satisfy each. The comma spelling declares separate type parameters and is not a way to write two bounds:

```ghul
…
trait ▼ Named is
    ◆▼ name: string;
si

trait ▼ Sized is
    ◆▼ size: int;
si

class CRATE: Named, Sized is
    ▲ name: string;
    ▲ size: int;

    init(name: string, size: int) is
        self.name = name;
        self.size = size;
    si
si

// several bounds joined with '/\'
label[T: Named /\ Sized](x: T) -> string =>
    "{x.name} holds {x.size}";

write_line(label(CRATE("bolts", 500)))
```

output:

```
bolts holds 500
```

### members of the bound itself

The *static* members of a bound are reachable through the type parameter itself, written `T.member(...)`. This is how .NET's generic-math interfaces are used, and an operator declared as one of their static virtual members resolves as an ordinary operator once it has been imported by name with `use`:

```ghul
…
// '+' resolves through the bound once it has been imported
total[T: INumber[T]](a: T, b: T) -> T => a + b;

write_line("{total(2, 3)} {total(1.5, 2.5)}")
```

output:

```
5 4
```

Without that `use` the operator is not in scope, so nothing changes for code that doesn't ask for it - and importing one does not displace the built-in operators either. Each operator imports from the interface that declares it, so the addition operator comes from `IAdditionOperators` and the unsigned right shift from `IShiftOperators`. Comparison and equality cannot be imported this way - a type says how it orders and compares by defining `<>` and `=~`.

### kind constraint

A kind constraint requires the type argument to be a particular kind of type. Four keywords are recognised:

- `class`: a reference type
- `struct`: a value type
- `optional`: an optional (nullable) type
- `init`: a type exposing an accessible parameterless constructor

```ghul
class CELL[T: struct] is
    value: T;
    init(value: T) is self.value = value; si
si
```

Kinds combine with each other and with type bounds, space-separated: `[T: Named /\ Sized class init]`.

### constructor constraint

The `init` constraint requires the type argument to expose an accessible parameterless constructor:

```ghul
…
// T: init requires the caller to pass a type with a parameterless constructor
echo[T: init](x: T) -> T => x;

class WIDGET() is
    describe() -> string => "a widget";
si

let w = echo(WIDGET());   // OK: WIDGET has init()

write_line(w.describe())
```

output:

```
a widget
```

## variance

Type variance is declared on a *trait*'s type parameters (the CLR permits variance only on interfaces, which is what a ghūl trait compiles to). A `class` or `struct` may not declare variant type parameters.

- `[T: out]`: covariant. `Producer[CAT]` is assignable to `Producer[ANIMAL]` when `CAT` derives from `ANIMAL`. Only legal when `T` appears in *output* positions (return types).
- `[T: in]`: contravariant. `Consumer[ANIMAL]` is assignable to `Consumer[CAT]`. Only legal when `T` appears in *input* positions (parameter types).

```ghul
…
// T: out marks Box[T] as covariant in T - a Box[CAT] is also a Box[Animal]
trait ▼ Box[T: out] is
    ◆▼ contents() -> T;
si
…
let cats: Box[CAT] = CAT_BOX();
let animals: Box[Animal] = cats;   // covariance

write_line(animals.contents().speak());
```

output:

```
meow
```

Variance is also automatic in two places: a function type is contravariant in its parameter types and covariant in its return type; an array of a reference type is covariant.
