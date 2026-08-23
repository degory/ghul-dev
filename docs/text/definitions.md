# definitions

## variables

In ghūl local variables are introduced with the `let` keyword. A bare `let` is immutable: it takes an initializer, and reassigning the variable afterwards is rejected. The compiler infers the type from the initializer:

```ghul
let x = 10;
```

An explicit type can be given alongside the initializer. The initializer must be assignment compatible with the type:

```ghul
let x: int = 42;
```

The explicit type can be wider than the initializer expression:

```ghul
let o: object = "a string";
```

A trailing `mut` makes the variable reassignable, and then the initializer can be dropped for a deferred-init local that starts at its type's default value: `let total mut = 0` reassigns later, and `let result: int mut;` defaults to 0. Either form can also take its value from `_`, which initializes to the default of the type the context expects - `let x = _`, or `_[T]` to pin the type.

Multiple variables can be defined in the same `let` statement, with each variable either taking its type from its initializer or given an explicit one:

```ghul
let
    an_inferred_int = 123,
    an_explicit_int: int = 456,
    a_string = "hello";
```

The name `_` is a discard placeholder. It can stand in for any variable name, but the value that would be assigned to it is discarded. `_` is accepted in `let` definitions, tuple destructuring, anonymous function parameters, and `for` loop variables:

```ghul
…
let _ = side_effect();
let (_, _, third) = (1, 2, 3);
let only_first = (x: int, _: int) => x;
for _ in 1..10 do
    counter = counter + 1;
od
```

Variables can only be defined within functions, methods or property bodies. Variable names should be in `snake_case`

## functions

In ghūl functions consist of a name and a parenthesized formal arguments list, followed by an optional return type after `->` (omitting it makes the function `void`), and then either a return expression or a function body:

```ghul
sum_two_ints(i: int, j: int) -> int => i + j;

sum_three_ints(i: int, j: int, k: int) -> int is
    return i + j + k;
si
```

`=>` introduces a single-expression body, while the `is` and `si` keywords are used to delimit block bodies. 

Functions can only be defined at global scope. Functions can be generic, which will be covered later. Function names should be in `snake_case`

## arguments

Arguments consist of a name followed by a type. The type is mandatory as the compiler cannot infer types here.

```ghul
do_something(what: string, why: string, to: int);
```

A formal argument can also be a tuple-destructure pattern in its own parentheses: still one parameter, at the written tuple type, unpacked into its names on entry. Named functions, anonymous functions, asynchronous functions and generators all take them; the aggregate type can be any positionally-destructurable type:

```ghul
…
// one parameter at the tuple type, unpacked into a and b
add_pair((a: int, b: int): (int, int)) -> int => a + b;

write_line(add_pair((3, 4)));

// anonymous functions take the same form, element types
// inferred from the sequence
let pairs = [(1, 2), (3, 4)];
let total = pairs | .map(((a, b)) => a + b) | .reduce(0, (acc, x) => acc + x);

write_line("{total}")
```

output:

```
7
10
```

## types

### classes

Classes consist of a name optionally followed by a superclass name and the types of any traits implemented, and then the class body. The class body is delimited by keywords `is` and `si`:
```ghul
class THING is
    // class body
si
```

A class defines a new reference type, instances of which are assignment compatible with its superclass type and any traits it implements.

Instances of classes are created via a constructor expression, which consists of a type expression followed by a parenthesis delimited list of actual constructor arguments. For a class, the type expression is the class name, qualified with any namespaces if needed:
```ghul
…
let a_thing = THING();
```

A class can also declare its constructor parameters directly in the header. Each parameter becomes a parameter of the synthesised constructor, and an auto-generated same-named field or property holds the supplied value:
```ghul
class POINT(x: int, y: int) is
si
```

The two forms are equivalent. The primary form is the shorter shape when every field is initialized from a constructor argument; the classic form is the better fit when the body owns extra fields or properties beyond what the constructor takes. See [constructors](#constructors) for the rest of the primary-constructor surface area.

Two postfix modifiers shape the hierarchy. Without `open`, a class can be subclassed only within the assembly that declares it; `open` opts in to cross-assembly subclassing. `abstract` bars direct construction, so only subclasses exist at runtime, and a class is implicitly abstract when it declares a body-less instance method, since that method is a contract for subclasses to satisfy. The closure feeds [type narrowing](https://ghul.dev/type-narrowing.html): on the `else` edge of an `isa` test the compiler can rule the tested subclass out, and an `abstract` root can leave a single remaining subclass.

Classes can only be defined at global scope. Classes can be generic, which will be covered later. Concrete class names should be in `MACRO_CASE`. Abstract class names should be in `PascalCase`.

### structs

Structs consist of a name, then the types of any traits implemented, and then the struct body again enclosed in `is` / `si`. A struct can also use the primary-constructor header form:
```ghul
struct POINT(x: double, y: double) is
si
```

Structs are constructed the same way as classes, with a constructor expression:
```ghul
…
let origin = POINT(0.0D, 0.0D);

// or up, or down, or even left, depending on
// your co-ordinate system!
let right = POINT(1.0D, 0.0D);
```

A struct defines a new value type, which means any values that the struct encapsulates are collected together as a new kind of value: assigning a struct copies all the encapsulated values, so the copy and the original then go their separate ways:
```ghul
…
struct COUNTER is
    _n: int field;

    init(n: int) is _n = n; si

    bump() is _n = _n + 1; si

    value: int => _n;
si

let original = COUNTER(0);
let copy mut = original;

copy.bump();

write_line("original {original.value}, copy {copy.value}");
```

output:

```
original 0, copy 1
```

A struct has no equality of its own, so `==` does not apply to one; giving a struct an equality means defining `=~`, described under [defining operators](#operators) and, for the .NET side of it, under [making your own types work with .NET](https://ghul.dev/dotnet-integration.html#equality).

Structs can only be defined at global scope. Structs can be generic, which will be covered later. Struct names should be in `MACRO_CASE`.

### traits

A trait consists of a name, the types of any parent traits that must also be implemented, and then the trait body:

```ghul
trait Printable is
    print();
si
```

Traits are similar to interfaces in other languages. Trait methods and properties without a default implementation must be implemented by any class, struct, or union that declares the trait:
```ghul
…
class BOOK(title: string, author: string): Printable is
    print() is
        write_line("Title: {title}, Author: {author}");
    si
si
```

A trait method or property can provide a default body. Implementing classes inherit the default and only need to override it to change the behaviour:

```ghul
…
trait Logged is
    log(message: string) is
        // the default body writes the message with a [log] prefix
        write_line("[log] {message}");
    si
si

class PLAIN(): Logged is
    // no override - uses the trait default
si

class LOUD(): Logged is
    // override the default, while still calling through to it with super
    log(message: string) is
        super.log(message.to_upper());
    si
si

PLAIN().log("hello");
LOUD().log("hello");
```

output:

```
[log] hello
[log] HELLO
```

A class override can call the trait's default with `super.method()`.

Traits can only be defined at global scope. Trait methods and properties can be abstract or have a default implementation. Trait names should be in `PascalCase`.

Like a class, a trait is closed to other assemblies unless it has the postfix `open` modifier. A closed trait can be implemented and derived from only within the assembly that declares it; `open` opts in to cross-assembly extension. Inside the declaring assembly nothing changes.

### unions

A union consists of a name and then a union body, which contains one or more variants. Each variant has a name, and then an optional list of fields:
```ghul
union Tree is
    NODE(left: Tree, right: Tree);
    LEAF(value: int);
si
```
Unions are a reference type. A reference of union type can point to only one variant at a time. To discover which variant a union currently holds, test it with `isa Variant(value)`:

```ghul
…
let tree: Tree = Tree.NODE(Tree.LEAF(123), Tree.LEAF(456));
let leaf = Tree.LEAF(123);

if isa Tree.NODE( ► tree) then
    write_line("have tree node");
elif isa Tree.LEAF( ► tree) then
    write_line("have tree leaf");
fi
```

output:

```
have tree node
```

`isa Variant(value)` does two things at once: it tests the variant, and within the then-branch it narrows the value to that variant, so the variant's own fields are accessible directly:

```ghul
if isa Tree.NODE(tree) then
    write_line(
        "left {tree.left}, right {tree.right}"
    );
elif isa Tree.LEAF(tree) then
    write_line("leaf value {tree.value}");
fi
```

Unions support structural equality through the `=~` operator. Two union references compare equal when they hold the same variant with member-wise equal fields:

```ghul
…
let leaf1 = Tree.LEAF(123);
let leaf2 = Tree.LEAF(123);
let leaf3 = Tree.LEAF(456);

assert leaf1 =~ leaf2;
assert !(leaf1 =~ leaf3);
```

A variant with no fields is a *unit variant*: it is referenced by name without parentheses, and interned to one shared value per generic instantiation. A union with a single field-carrying variant, or one variant marked `default`, is option-shaped, so `u?` tests whether that variant is present and `u!` unwraps its value:

```ghul
…
let c = Color.RED;                   // unit variant, referenced without parentheses
write_line("red: {c =~ Color.RED}"); // true

let r = lookup();
write_line("present: {r?}");         // true - r holds the default OK variant
write_line("value: {r!}");           // 42 - unwraps the OK payload
```

output:

```
red: True
present: True
value: 42
```

A union can declare a primary-constructor header for state shared across every variant. Each variant splices the shared parameters into its field list with `..`, and a variant with no extra fields drops the list entirely. A union can also implement traits after its header, with each trait member satisfied by a default or by a property the union supplies:

```ghul
…
let t = Token.IDENTIFIER("count", "identifier");
write_line(t.name);    // identifier - shared primary-header field
write_line(t.label()); // [identifier] - inherited trait default
```

output:

```
identifier
[identifier]
```

Unions can only be defined at global scope. Union names should be in `PascalCase` and variant names should be in `MACRO_CASE`

### enums

An enum consists of a name and then an enum body, which contains one or more elements. Each element has a name and an optional constant integer value

```ghul
enum Suits is
    SPADES,
    HEARTS,
    DIAMONDS,
    CLUBS
si
```

Enums can only be defined at global scope. An enum type name should be in `PascalCase`, and its members in `MACRO_CASE`

Enum values compare for equality and order: `=~` and `==` compare by the underlying integer, and `<`, `<=`, `>` and `>=` order by it. `=~` on an optional enum is not supported; narrow the value first. An individual member can be imported by name - `use Some.Namespace.Suit.HEARTS;` - as well as reached through the type.

### partial and impl blocks

Members can be added to a class, struct, or union already declared in the same assembly from a separate block, even in another file. The added members are ordinary members of the target, with the same private access and virtual dispatch as members written in its own body. A `partial` block names the type and adds to it; for a union, whose body holds only variants, it is the only way to give the type methods:

```ghul
…
union Shape is
    CIRCLE(radius: int);
    SQUARE(side: int);
si

partial Shape is
    describe() -> string =>
        case self
        when c: CIRCLE then "circle r={c.radius}"
        when s: SQUARE then "square s={s.side}"
        esac;
si

let s: Shape = Shape.SQUARE(4);
write_line(s.describe());
```

output:

```
square s=4
```

An `impl Trait for Type` block additionally makes the target implement a trait, so a type can satisfy a trait without naming it in its header. The trait's type arguments are written on the target after `for`, and inside the body `self` has the concrete target type, so a union's variants can be matched directly:

```ghul
…
union List is
    NIL;
    CONS(head: int, tail: List);
si

impl Printer for List is
    print() -> string =>
        if let (head, tail): CONS = ► self then "{head} {tail.print()}"
        else "nil"
        fi;
si

let xs: Printer = List.CONS(1, List.CONS(2, List.NIL));
write_line(xs.print());
```

output:

```
1 2 nil
```

The target can be a qualified name, including a single union variant (`impl Printer for List.NIL`). The interface must be a trait, and the target a type declared in the same assembly; an imported type cannot be reopened.

Every method or property accessor supplied to a union through a `partial` or `impl` block must be pure - proven store-free from its body, or declared so. One that stores draws an `impure-union-method` warning.

## properties

A property consists of the property name followed by the property's type and, optionally, bodies for getter and setter methods.

```ghul
class COUNTER is
    count: int;
si

class SIZED is
    _size: int;

    size: int => _size,
        = new_size is
            assert new_size > 0;

            _size = new_size;
        si
si
```

Public properties with no getter or setter are automatically backed by a hidden field. Private properties with no getter or setter are implemented as a plain field.

A property can take a postfix `stable` modifier: an assertion that two adjacent reads agree on presence and runtime type. [Type narrowing](https://ghul.dev/type-narrowing.html) depends on that when it narrows through a property getter, so a getter whose consistency the compiler cannot prove from its body - a memoiser filling its cache, say - has to declare it before code can narrow through the property:

```ghul
…
// a memoising getter stores, so it is not provably
// stable - declare it with postfix stable instead
summary: string? stable is
    if ► _summary? then
        return _summary;
    fi
    ► _summary = "nothing to report";
    return _summary;
si

init() is si

describe() is
    if ► summary? then
        write_line(summary)
    fi
si
…
```

output:

```
nothing to report
```

`stable` is a contract like `pure`: every override must itself be stable, declared or proven from its body.

Properties can be defined globally and within classes, structs and traits. Property names should be in `snake_case`.

## methods

Methods are syntactically the same as functions, except they are defined within classes, structs or traits.

```ghul
class SCALER is
    _scale: double;

    scale(value: double) -> double => value * _scale;
si
```

A method or function can take a postfix `pure` modifier, which asserts that it only reads and never writes to the heap. The compiler proves this for most functions directly from their bodies, and a call whose callee is proven - or declared - store-free leaves every [type narrowing](https://ghul.dev/type-narrowing.html) fact alone. The modifier is the escape hatch for a body the proof cannot see through; it is trusted as stated, and every override of a pure member must itself be pure:

```ghul
…
// a pure method only reads: callers keep narrowing facts across a call to it
doubled() -> int pure => _count * 2;
…
```

output:

```
42
```

`pure` can also be written on a class, struct, or trait header. Every instance member of a pure type must then be proven store-free or declared pure, and one that stores draws an error naming it. The writes that have to exist are exempt: constructors assign fields by definition, and static members keep their own state.

What a pure type does not allow is publishing a write. A public property's assign accessor is rejected, and so is a getter that stores through one, since from the outside that reads as a read. A bodiless member has an implicit `pure` declaration, so a trait declared pure holds everyone implementing it to the same rule.

`pure` on a union is an error. Union members are held to purity through their `partial` and `impl` blocks regardless:

```ghul
…
// every instance member of a pure type must read and never
// write; a bodiless member holds implementors to the same rule
trait ▼ NAMED pure is
    ◆▼ name: string;
    ◆▼ label() -> string;
si

class USER: NAMED is
    ▲ name: string;

    init(name: string) is
        self.name = name
    si

    ▲ label() -> string => "<{name}>";
si

write_line(USER("ada").label())
```

output:

```
<ada>
```

As with functions, methods should be named in `snake_case`

## operators

An operator is a function or method whose name is an operator symbol rather than a word; there is no `operator` keyword. As an instance method the receiver is the left operand, so a binary operator takes a single parameter for the right operand:

```ghul
…
class VECTOR is
    x: int;
    y: int;

    init(x: int, y: int) is
        self.x = x;
        self.y = y;
    si

    // a binary operator as an instance method takes one parameter, the right operand:
    +(other: VECTOR) -> VECTOR => VECTOR(x + other.x, y + other.y);
si

let sum = VECTOR(1, 2) + VECTOR(3, 4);
write_line("({sum.x}, {sum.y})");
```

output:

```
(4, 6)
```

Written as a global function or a `static` member instead, an operator takes both operands as parameters: `+(a: VECTOR, b: VECTOR) -> VECTOR`. A prefix operator is always a one-parameter function, defined globally or in the operand's type.

Every operator has a precedence taken from its first character, so an operator starting with `*` binds tighter than one starting with `+`, with no declaration needed. The `@precedence` pragma places an operator in a specific band when the default doesn't suit it.

The comparison operators come from two backing operators. Define `<>`, a three-way ordering that returns a negative, zero, or positive `int`, and `<`, `<=`, `>`, and `>=` follow from it; define `=~`, an equality returning `bool`, and `!~` follows as its negation:

```ghul
…
// three-way ordering returning int; '<', '<=', '>', '>=' all derive from it:
<>(other: BOX) -> int => value - other.value;
…
```

Operators can be defined globally, or as members of classes, structs and traits. An operator name is any run of symbol characters, such as `+`, `**`, `##`, or `∩`.

## constructors

In ghūl methods named `init` are constructors. When an object is constructed using a constructor expression, the corresponding `init` method overload will be called based on the actual argument types:

```ghul
class COUNTER is
    count: int;

    init() is
        count = 0;
    si

    init(initial_count: int) is
        count = initial_count;
    si
si
…
// calls the parameterless overload of init()
let c = COUNTER();

// calls init(initial_count: int)
let d = COUNTER(50);
```

Constructors can be defined in classes and structs.

A member whose type says it always holds a value has to be given one. A constructor that leaves such members unassigned on some path out draws one `field-definite-assignment` warning naming every member it missed, since the object it produces holds a value its type rules out:

```ghul
…
class LABEL is
    text: string;
    size: int;

    init(size: int) is
        self.size = size    // text is never assigned
    si
si
```

diagnostics:

- warning: [field-definite-assignment] text is not assigned on every path out of this constructor [text declared here: definitions-49.ghul: 4,5..4,9]

A constructor counts what it assigns directly, and what the methods it calls on `self` assign in turn - though not a call reached on only one branch, or one a subclass could override. Members of optional and of value type are not checked: neither has an absence its type rules out. Suppress with `@suppress("field-definite-assignment")` per constructor or file, or project-wide.

### primary constructors

When the constructor only assigns its arguments to same-named fields, the class or struct header can declare those parameters directly. The compiler synthesises the matching `init` and a same-named field or property for each parameter:

```ghul
…
class PERSON(name: string, age: int) is
    describe() is
        write_line("{name} is {age} years old");
    si
si

PERSON("alice", 30).describe();
```

output:

```
alice is 30 years old
```

A trailing modifier on a primary parameter overrides the default visibility:

- `x: int public` - public read and write.
- `x: int protected` - readable from the declaring class and its subclasses.
- `x: int field` - plain field rather than the default auto-property.
- `_x: int` - private field, named `_x`.
- `x: int init` - no field is generated; `x` is in scope only inside `init`.

A body field or property declaration with a name matching the parameter (under the same `_x`/`x` rule) overrides auto-generation and receives the auto-init copy. This is also how to rename the underlying storage without using the modifier suffix:

```ghul
…
class POINT(x: int, y: int) is
    // capture the primary parameters as renamed private fields
    _x;
    _y;

    show() is
        write_line("({_x}, {_y})");
    si
si

class BOX(width: int public, height: int field, _depth: int) is
    // width is a public read-write property
    // height is a plain field
    // _depth is a private field
si

POINT(10, 20).show();
```

output:

```
(10, 20)
```

A class with a primary header can also include a `super(...)` body declaration that forwards expressions to its superclass `init`, and secondary `init(.., extras)` overloads. The `..` splice expands to the primary parameters; an implicit chain to the primary `init` runs before the secondary's body:

```ghul
…
class DOG(name: string, breed: string): ANIMAL is
    // forward name to the superclass; the local DOG keeps breed as a field
    super(name);

    init(.., trick: string) is
        // .. expands to (name, breed); the primary init has already run
        write_line("{name} the {breed} can {trick}");
    si
si

DOG("rex", "labrador", "sit");
```

output:

```
rex the labrador can sit
```

A primary-constructor class or struct also gets a synthesised `deconstruct` built from its public-readable parameters, so `let (x, y) = POINT(3, 4)` destructures without writing one out.

A class or struct with a primary header and no body declarations can end with a terminating `;` instead of `is ... si`:

```ghul
// a primary header with no body declarations:
class POINT(x: int, y: int);

// is equivalent to an explicit empty 'is' / 'si' body:
class VECTOR(dx: int, dy: int) is
si
```

The classic form is the better fit when the body owns extra fields or properties beyond what the primary parameters cover.

## namespaces

Namespaces are introduced with the `namespace` keyword followed by the namespace name and then the namespace body.

```ghul
namespace Example is
    ...
si
```

Namespaces can be nested inside other namespaces
```ghul
namespace Outer is
    namespace Inner is
        do_something() is
            IO.Std.write_line("did something");
        si
    si
si
…
Outer.Inner.do_something();
…
```

output:

```
did something
```

A dotted namespace name is shorthand for nesting namespaces

```ghul
namespace Outer.Inner is
    do_something() is
        IO.Std.write_line("did something");
    si
si
…
Outer.Inner.do_something();
…
```

output:

```
did something
```

### namespace aggregation

A namespace definition is an instance of that namespace. Namespace instances are aggregated across all source files to form a single namespace scope. This means that all definitions within a namespace instance are visible unqualified within all other instances of that namespace in all source files:

`source-file-1.ghul`:
```ghul
namespace Example is
    // this definition of Test is visible unqualified
    // throughout the Example namespace:
    trait Test is
        run();
    si
si
…
```

`source-file-2.ghul`:
```ghul
…
// class TEST can implement the Test trait without having
// to qualify the name Test:
class TEST: Test is
    run() is si
si
…
```

### definitions outside any namespace

If a source file contains no namespaces, then all definitions in the file are placed in a compiler generated namespace that is private to that source file, and the file can have [top-level statements](https://ghul.dev/syntax.html#top-level-statements) that run as the program's entry point. This is useful for examples and tests:

```ghul
// the compiler places this in an auto-generated
// namespace private to this source file
IO.Std.write_line("Hello, world!");
```

output:

```
Hello, world!
```
For definitions to be visible from other files, they must be placed in an explicitly declared namespace.

### namespace usage consistency

If a source file contains any explicitly declared namespaces, then all definitions in that file must be within a namespace. Bare definitions outside of namespaces are not allowed in files with namespace declarations:

```ghul
…
namespace Example is
    entry() is
        IO.Std.write_line("hello from a namespace");
    si
si
…
greet() is
    IO.Std.write_line("not in a namespace");
si
```

diagnostics:

- error: cannot mix global definitions and namespaces in the same file

## importing symbols with `use`
Symbols can be brought into the current namespace instance's scope using the use keyword. Imported symbols can then be used without qualification:

```ghul
use Example.TEST;

...

let t = TEST();
```

`use` applied to a namespace imports all symbols from that namespace:
```ghul
use Example; // imports Example.TEST and Example.Test

...

let t: Test;
```

Note that `use` only applies within the current `namespace` definition. It does not import a symbol into all instances of the current namespace:

```ghul
…
namespace UseExample is
    use Example;

    class ANOTHER_TEST: Test is
        run() is si
    si
si

namespace UseExample is
    // Test still needs qualification here
    class YET_ANOTHER_TEST: Example.Test is
        run() is si
    si
si
…
```

## visibility of symbols

In ghūl, the visibility of symbols outside their defining scope is managed by a naming convention which is partially enforced by the compiler. The compiler also warns when a declaration's name doesn't match the convention for its kind - `non-snake-case-name`, `non-pascal-case-name`, or `non-upper-snake-case-name` - each suppressible per declaration, per file, or project-wide. A class with only `static` members is a utility container that is never constructed, and accepts either `PascalCase` or `MACRO_CASE`.

### global symbols

Classes, structs, traits, unions, global functions and global properties are accessible from any namespace. Prefixing their names with `_` makes them private to the assembly they are declared in: within the assembly they stay reachable from any namespace, but another assembly cannot see them, and a reference from one is a compile error:
```ghul
class PUBLIC is
si

public_function() -> int => 0;

public_property: int;

class _PRIVATE is
si

_private_function() -> int => 0;

_private_property: int;
```

### methods

Methods are public unless their name starts with `_`, which makes the method private: it is visible only within its declaring class, and the compiler enforces that:
```ghul
class THING is
    do_something_public() is
    si

    _do_something_private() is
    si
si
```

### properties
Properties are public to read but private to assign - a property is assignable only within its defining type. A property whose name starts with `_` is private to read as well:
```ghul
…
struct VALUE is
    public_property: int;

    _private_property: string;

    init(value: int) is
        public_property = value;
        _private_property = "value is {value}";
    si
si
…
let v = VALUE(1234);

// OK: public_property is publicly readable
write_line(v.public_property);

write_line(v._private_property);

v.public_property = 5678;
```

diagnostics:

- error: _private_property: string is not accessible here
- error: VALUE.public_property: int is not publicly assignable

### protected access

The rules above describe the default, `--underscore-access private`. Compiling with `--underscore-access protected` instead widens an underscore member's reach to the declaring class and its subclasses within the same assembly, for a codebase that relies on subclasses reading `_` members. Underscore types, global functions and global variables are unaffected - they are private to their assembly under either setting.
