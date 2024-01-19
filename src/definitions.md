# ghūl definitions

## variables

In ghūl variables are introduced with the `let` keyword:

```ghul
let x = 10;
```

The compiler will infer the type from the initializer, if there is one. If there is no initializer then a type must be given

```ghul
let x: int;
```

If both an initializer and a type are present, then the initializer must be assignment compatible with the type

```ghul
let o: object = "a string";
```

Multiple variables can be defined in the same `let` statement, including a mix of types and with or without initializers

```
let initialize_now = 123, initialize_later: int, why_are_we_doing_this = "I don't know";
```

Variables may only be defined within functions, methods or property bodies

Variables names should be in `snake_case`

## functions

In ghūl functions consist of a name and a parenthesised formal arguments list, followed by a return type, and then either a return expression or a function body:

```ghul
sum_two_ints(i: int, j: int) -> int => i + j;

sum_three_ints(i: int, j: int, k: int) -> int is
    return i + j + k;
si
```
Functions can only be defined at global scope

Functions can be generic, which will be covered later

Function names should be in `snake_case`

## arguments

Arguments consist of a name followed by a type. The type is mandatory as the compiler cannot infer types here.

```ghul
do_something(what: string, why: string, to: int);
```

## classes

Classes consist of a name optionally followed by a superclass name and the types of any traits implemented, and then the class body.

```ghul
class THING is

si
```

A class defines a new reference type, instances of which are assignment compatible with its superclass type and any traits it implements.

Classes can only be defined at global scope

Concrete class names should be in `MACRO_CASE`. Abstract class names should be in `PascalCase`.

## structs

Structs consist of a name, then the types of any traits implemented, and then the struct body.

```ghul
struct POINT is
    x: double;
    y: double;
si
```

A struct defines a new value type.

Struct names should be in `MACRO_CASE`.

## traits

A trait consists of a name, the types of any parent traits that must also be implemented, and then the trait body.

```ghul
trait Countable is
    count() -> int;
si
```

Trait methods nor properties must have empty bodies

Traits can only be defined at global scope

Trait names should be in `PascalCase`;

## properties

A property consists of the property name followed by the property's type and, optionally, bodies for getter and setter methods.

```ghul
class COUNTER is
    count: int;
si

class Sized is
    _size: int;

    size: int => size,
        = new_size is
            assert new_size > 0;

            _size = new_size;
        si
si

```

Public properties with no getter or setter are automatically backed by a hidden field. Private properties with no getter or setter are implemented as just a field.

Property names should be in `snake_case`.

Properties can only be definied within classes, structs and traits.

## methods

Methods are syntactcally the same as functions, except they are defined within classes, structs or traits.

```ghul
class SCALER is
    _scale: double;

    scale(value: double) => value * scale;
si

```
As with functions, methods should be named in `snake_case`

## constructors

In ghūl methods named `init` are constructors. When an object is constructed using `new` the corresponding `init` method will be called

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

...

let c = new COUNTER(); // calls the parameterless overload of init()
let d = new COUNTER(50); // calls init(initial_count: int)
```

Constructors can only be defined in classes and structs

## namespaces

Namespaces are introduced with the `namespace` keyword followed by the namespace name and then the namespace body.

```ghul
namespace Example is
    ...
si
```

Namespaces may be nested inside other namespaces
```ghul
namespace Outer is
    namespace Inner is
        do_something() is
            stuff();
        si
    si
si

...

Outer.Inner.do_something();
```

A dotted namespace name is shorthand for nesting namespaces

```ghul
namespace Outer.Inner is
    do_something() is
        stuff();
    si
si

...

Outer.Inner.do_something();
```