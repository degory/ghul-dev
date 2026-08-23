# definitions

## variables

In ghūl local variables are introduced with the `let` keyword. A bare `let` is immutable: it takes an initializer, and reassigning the variable afterwards is rejected. The compiler infers the type from the initializer:

<GhulExample name="definitions-1" />

An explicit type can be given alongside the initializer. The initializer must be assignment compatible with the type:

<GhulExample name="definitions-2" />

The explicit type can be wider than the initializer expression:

<GhulExample name="definitions-3" />

A trailing `mut` makes the variable reassignable, and then the initializer can be dropped for a deferred-init local that starts at its type's default value: `let total mut = 0` reassigns later, and `let result: int mut;` defaults to 0. Either form can also take its value from `_`, which initializes to the default of the type the context expects - `let x = _`, or `_[T]` to pin the type.

Multiple variables can be defined in the same `let` statement, with each variable either taking its type from its initializer or given an explicit one:

<GhulExample name="definitions-4" />

The name `_` is a discard placeholder. It can stand in for any variable name, but the value that would be assigned to it is discarded. `_` is accepted in `let` definitions, tuple destructuring, anonymous function parameters, and `for` loop variables:

<GhulExample name="definitions-5" />

Variables can only be defined within functions, methods or property bodies. Variable names should be in `snake_case`

## functions

In ghūl functions consist of a name and a parenthesized formal arguments list, followed by an optional return type after `->` (omitting it makes the function `void`), and then either a return expression or a function body:

<GhulExample name="definitions-6" />

`=>` introduces a single-expression body, while the `is` and `si` keywords are used to delimit block bodies.

Where a block body ends in a statement that produces a value - an expression, an `if`, a `case`, a `val ... lav` block - and it is written without a terminating `;`, that value is the function's return value on the fall-through path. Terminate it and the value is discarded instead, as any other statement's is. See [block bodies return their tail](/expression-oriented-programming.html#block-bodies-return-their-tail) for the rule in full.

<GhulExample name="definitions-53" />

Functions can only be defined at global scope. Functions can be generic, which will be covered later. Function names should be in `snake_case`

## arguments

Arguments consist of a name followed by a type. The type is mandatory as the compiler cannot infer types here.

<GhulExample name="definitions-7" />

A formal argument can also be a tuple-destructure pattern in its own parentheses: still one parameter, at the written tuple type, unpacked into its names on entry. Named functions, anonymous functions, asynchronous functions and generators all take them; the aggregate type can be any positionally-destructurable type:

<GhulExample name="definitions-51" />

## types

### classes

Classes consist of a name optionally followed by a superclass name and the types of any traits implemented, and then the class body. The class body is delimited by keywords `is` and `si`:
<GhulExample name="definitions-8" />

A class defines a new reference type, instances of which are assignment compatible with its superclass type and any traits it implements.

Instances of classes are created via a constructor expression, which consists of a type expression followed by a parenthesis delimited list of actual constructor arguments. For a class, the type expression is the class name, qualified with any namespaces if needed:
<GhulExample name="definitions-9" />

A class can also declare its constructor parameters directly in the header. Each parameter becomes a parameter of the synthesised constructor, and an auto-generated same-named field or property holds the supplied value:
<GhulExample name="definitions-8a" />

The two forms are equivalent. The primary form is the shorter shape when every field is initialized from a constructor argument; the classic form is the better fit when the body owns extra fields or properties beyond what the constructor takes. See [constructors](#constructors) for the rest of the primary-constructor surface area.

Two postfix modifiers shape the hierarchy. Without `open`, a class can be subclassed only within the assembly that declares it; `open` opts in to cross-assembly subclassing. `abstract` bars direct construction, so only subclasses exist at runtime, and a class is implicitly abstract when it declares a body-less instance method, since that method is a contract for subclasses to satisfy. The closure feeds [type narrowing](/type-narrowing.html): on the `else` edge of an `isa` test the compiler can rule the tested subclass out, and an `abstract` root can leave a single remaining subclass.

Classes can only be defined at global scope. Classes can be generic, which will be covered later. Concrete class names should be in `MACRO_CASE`. Abstract class names should be in `PascalCase`.

### structs

Structs consist of a name, then the types of any traits implemented, and then the struct body again enclosed in `is` / `si`. A struct can also use the primary-constructor header form:
<GhulExample name="definitions-10" />

Structs are constructed the same way as classes, with a constructor expression:
<GhulExample name="definitions-11" />

A struct defines a new value type, which means any values that the struct encapsulates are collected together as a new kind of value: assigning a struct copies all the encapsulated values, so the copy and the original then go their separate ways:
<GhulExample name="definitions-12" />

A struct has no equality of its own, so `==` does not apply to one; giving a struct an equality means defining `=~`, described under [defining operators](#operators) and, for the .NET side of it, under [making your own types work with .NET](/dotnet-integration.html#equality).

Structs can only be defined at global scope. Structs can be generic, which will be covered later. Struct names should be in `MACRO_CASE`.

### traits

A trait consists of a name, the types of any parent traits that must also be implemented, and then the trait body:

<GhulExample name="definitions-13" />

Traits are similar to interfaces in other languages. Trait methods and properties without a default implementation must be implemented by any class, struct, or union that declares the trait:
<GhulExample name="definitions-14" />

A trait method or property can provide a default body. Implementing classes inherit the default and only need to override it to change the behaviour:

<GhulExample name="definitions-15" />

A class override can call the trait's default with `super.method()`.

Traits can only be defined at global scope. Trait methods and properties can be abstract or have a default implementation. Trait names should be in `PascalCase`.

Like a class, a trait is closed to other assemblies unless it has the postfix `open` modifier. A closed trait can be implemented and derived from only within the assembly that declares it; `open` opts in to cross-assembly extension. Inside the declaring assembly nothing changes.

### unions

A union consists of a name and then a union body, which contains one or more variants. Each variant has a name, and then an optional list of fields:
<GhulExample name="definitions-16" />
Unions are a reference type. A reference of union type can point to only one variant at a time. To discover which variant a union currently holds, test it with `isa Variant(value)`:

<GhulExample name="definitions-17" />

`isa Variant(value)` does two things at once: it tests the variant, and within the then-branch it narrows the value to that variant, so the variant's own fields are accessible directly:

<GhulExample name="definitions-18" />

Unions support structural equality through the `=~` operator. Two union references compare equal when they hold the same variant with member-wise equal fields:

<GhulExample name="definitions-19" />

A variant with no fields is a *unit variant*: it is referenced by name without parentheses, and interned to one shared value per generic instantiation. A union with a single field-carrying variant, or one variant marked `default`, is option-shaped, so `u?` tests whether that variant is present and `u!` unwraps its value:

<GhulExample name="definitions-41" />

A union can declare a primary-constructor header for state shared across every variant. Each variant splices the shared parameters into its field list with `..`, and a variant with no extra fields drops the list entirely. A union can also implement traits after its header, with each trait member satisfied by a default or by a property the union supplies:

<GhulExample name="definitions-42" />

Unions can only be defined at global scope. Union names should be in `PascalCase` and variant names should be in `MACRO_CASE`

### enums

An enum consists of a name and then an enum body, which contains one or more elements. Each element has a name and an optional constant integer value

<GhulExample name="definitions-20" />

Enums can only be defined at global scope. An enum type name should be in `PascalCase`, and its members in `MACRO_CASE`

Enum values compare for equality and order: `=~` and `==` compare by the underlying integer, and `<`, `<=`, `>` and `>=` order by it. `=~` on an optional enum is not supported; narrow the value first. An individual member can be imported by name - `use Some.Namespace.Suit.HEARTS;` - as well as reached through the type.

### partial and impl blocks

Members can be added to a class, struct, or union already declared in the same assembly from a separate block, even in another file. The added members are ordinary members of the target, with the same private access and virtual dispatch as members written in its own body. A `partial` block names the type and adds to it; for a union, whose body holds only variants, it is the only way to give the type methods:

<GhulExample name="definitions-43" />

An `impl Trait for Type` block additionally makes the target implement a trait, so a type can satisfy a trait without naming it in its header. The trait's type arguments are written on the target after `for`, and inside the body `self` has the concrete target type, so a union's variants can be matched directly:

<GhulExample name="definitions-44" />

The target can be a qualified name, including a single union variant (`impl Printer for List.NIL`). The interface must be a trait, and the target a type declared in the same assembly; an imported type cannot be reopened.

Every method or property accessor supplied to a union through a `partial` or `impl` block must be pure - proven store-free from its body, or declared so. One that stores draws an `impure-union-method` warning.

## properties

A property consists of the property name followed by the property's type and, optionally, bodies for getter and setter methods.

<GhulExample name="definitions-21" />

Public properties with no getter or setter are automatically backed by a hidden field. Private properties with no getter or setter are implemented as a plain field.

A property can take a postfix `stable` modifier: an assertion that two adjacent reads agree on presence and runtime type. [Type narrowing](/type-narrowing.html) depends on that when it narrows through a property getter, so a getter whose consistency the compiler cannot prove from its body - a memoiser filling its cache, say - has to declare it before code can narrow through the property:

<GhulExample name="definitions-48" />

`stable` is a contract like `pure`: every override must itself be stable, declared or proven from its body.

Properties can be defined globally and within classes, structs and traits. Property names should be in `snake_case`.

## methods

Methods are syntactically the same as functions, except they are defined within classes, structs or traits.

<GhulExample name="definitions-22" />

A method or function can take a postfix `pure` modifier, which asserts that it only reads and never writes to the heap. The compiler proves this for most functions directly from their bodies, and a call whose callee is proven - or declared - store-free leaves every [type narrowing](/type-narrowing.html) fact alone. The modifier is the escape hatch for a body the proof cannot see through; it is trusted as stated, and every override of a pure member must itself be pure:

<GhulExample name="definitions-45" />

`pure` can also be written on a class, struct, or trait header. Every instance member of a pure type must then be proven store-free or declared pure, and one that stores draws an error naming it. The writes that have to exist are exempt: constructors assign fields by definition, and static members keep their own state.

What a pure type does not allow is publishing a write. A public property's assign accessor is rejected, and so is a getter that stores through one, since from the outside that reads as a read. A bodiless member has an implicit `pure` declaration, so a trait declared pure holds everyone implementing it to the same rule.

`pure` on a union is an error. Union members are held to purity through their `partial` and `impl` blocks regardless:

<GhulExample name="definitions-52" />

As with functions, methods should be named in `snake_case`

## operators

An operator is a function or method whose name is an operator symbol rather than a word; there is no `operator` keyword. As an instance method the receiver is the left operand, so a binary operator takes a single parameter for the right operand:

<GhulExample name="definitions-46" />

Written as a global function or a `static` member instead, an operator takes both operands as parameters: `+(a: VECTOR, b: VECTOR) -> VECTOR`. A prefix operator is always a one-parameter function, defined globally or in the operand's type.

Every operator has a precedence taken from its first character, so an operator starting with `*` binds tighter than one starting with `+`, with no declaration needed. The `@precedence` pragma places an operator in a specific band when the default doesn't suit it.

The comparison operators come from two backing operators. Define `<>`, a three-way ordering that returns a negative, zero, or positive `int`, and `<`, `<=`, `>`, and `>=` follow from it; define `=~`, an equality returning `bool`, and `!~` follows as its negation:

<GhulExample name="definitions-47" />

Operators can be defined globally, or as members of classes, structs and traits. An operator name is any run of symbol characters, such as `+`, `**`, `##`, or `∩`.

## constructors

In ghūl methods named `init` are constructors. When an object is constructed using a constructor expression, the corresponding `init` method overload will be called based on the actual argument types:

<GhulExample name="definitions-23" />

Constructors can be defined in classes and structs.

A member whose type says it always holds a value has to be given one. A constructor that leaves such members unassigned on some path out draws one `field-definite-assignment` warning naming every member it missed, since the object it produces holds a value its type rules out:

<GhulExample name="definitions-49" />

A constructor counts what it assigns directly, and what the methods it calls on `self` assign in turn - though not a call reached on only one branch, or one a subclass could override. Members of optional and of value type are not checked: neither has an absence its type rules out. Suppress with `@suppress("field-definite-assignment")` per constructor or file, or project-wide.

### primary constructors

When the constructor only assigns its arguments to same-named fields, the class or struct header can declare those parameters directly. The compiler synthesises the matching `init` and a same-named field or property for each parameter:

<GhulExample name="definitions-37" />

A trailing modifier on a primary parameter overrides the default visibility:

- `x: int public` - public read and write.
- `x: int protected` - readable from the declaring class and its subclasses.
- `x: int field` - plain field rather than the default auto-property.
- `_x: int` - private field, named `_x`.
- `x: int init` - no field is generated; `x` is in scope only inside `init`.

A body field or property declaration with a name matching the parameter (under the same `_x`/`x` rule) overrides auto-generation and receives the auto-init copy. This is also how to rename the underlying storage without using the modifier suffix:

<GhulExample name="definitions-38" />

A class with a primary header can also include a `super(...)` body declaration that forwards expressions to its superclass `init`, and secondary `init(.., extras)` overloads. The `..` splice expands to the primary parameters; an implicit chain to the primary `init` runs before the secondary's body:

<GhulExample name="definitions-39" />

A primary-constructor class or struct also gets a synthesised `deconstruct` built from its public-readable parameters, so `let (x, y) = POINT(3, 4)` destructures without writing one out.

A class or struct with a primary header and no body declarations can end with a terminating `;` instead of `is ... si`:

<GhulExample name="definitions-40" />

The classic form is the better fit when the body owns extra fields or properties beyond what the primary parameters cover.

## namespaces

Namespaces are introduced with the `namespace` keyword followed by the namespace name and then the namespace body.

<GhulExample name="definitions-24" />

Namespaces can be nested inside other namespaces
<GhulExample name="definitions-25" />

A dotted namespace name is shorthand for nesting namespaces

<GhulExample name="definitions-26" />

### namespace aggregation

A namespace definition is an instance of that namespace. Namespace instances are aggregated across all source files to form a single namespace scope. This means that all definitions within a namespace instance are visible unqualified within all other instances of that namespace in all source files:

`source-file-1.ghul`{:text}:
<GhulExample name="definitions-27" />

`source-file-2.ghul`{:text}:
<GhulExample name="definitions-28" />

### definitions outside any namespace

If a source file contains no namespaces, then all definitions in the file are placed in a compiler generated namespace that is private to that source file, and the file can have [top-level statements](/syntax.html#top-level-statements) that run as the program's entry point. This is useful for examples and tests:

<GhulExample name="definitions-29" />
For definitions to be visible from other files, they must be placed in an explicitly declared namespace.

### namespace usage consistency

If a source file contains any explicitly declared namespaces, then all definitions in that file must be within a namespace. Bare definitions outside of namespaces are not allowed in files with namespace declarations:

<GhulExample name="definitions-30" />

## importing symbols with `use`
Symbols can be brought into the current namespace instance's scope using the use keyword. Imported symbols can then be used without qualification:

<GhulExample name="definitions-31" />

`use` applied to a namespace imports all symbols from that namespace:
<GhulExample name="definitions-32" />

Note that `use` only applies within the current `namespace` definition. It does not import a symbol into all instances of the current namespace:

<GhulExample name="definitions-33" />

## visibility of symbols

In ghūl, the visibility of symbols outside their defining scope is managed by a naming convention which is partially enforced by the compiler. The compiler also warns when a declaration's name doesn't match the convention for its kind - `non-snake-case-name`, `non-pascal-case-name`, or `non-upper-snake-case-name` - each suppressible per declaration, per file, or project-wide. A class with only `static` members is a utility container that is never constructed, and accepts either `PascalCase` or `MACRO_CASE`.

### global symbols

Classes, structs, traits, unions, global functions and global properties are accessible from any namespace. Prefixing their names with `_` makes them private to the assembly they are declared in: within the assembly they stay reachable from any namespace, but another assembly cannot see them, and a reference from one is a compile error:
<GhulExample name="definitions-34" />

### methods

Methods are public unless their name starts with `_`, which makes the method private: it is visible only within its declaring class, and the compiler enforces that:
<GhulExample name="definitions-35" />

### properties
Properties are public to read but private to assign - a property is assignable only within its defining type. A property whose name starts with `_` is private to read as well:
<GhulExample name="definitions-36" />

### protected access

The rules above describe the default, `--underscore-access private`{:sh}. Compiling with `--underscore-access protected`{:sh} instead widens an underscore member's reach to the declaring class and its subclasses within the same assembly, for a codebase that relies on subclasses reading `_` members. Underscore types, global functions and global variables are unaffected - they are private to their assembly under either setting.
