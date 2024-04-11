# definitions

## variables

In ghūl variables are introduced with the `let` keyword:

```ghul
let x = 10;
```

The compiler will infer the type from the initializer, if there is one. If there is no initializer, then a type must be explicitly specified.

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

Variables may only be defined within functions, methods or property bodies. Variables names should be in `snake_case`

## functions

In ghūl functions consist of a name and a parenthesized formal arguments list, followed by a return type, and then either a return expression or a function body:

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

## classes

Classes consist of a name optionally followed by a superclass name and the types of any traits implemented, and then the class body. The class body is delimited by keywords `is` and `si`:
```ghul
class THING is
    // class body
si
```

A class defines a new reference type, instances of which are assignment compatible with its superclass type and any traits it implements.

Instances of classes are created via a constructor expression, which consists of a type expression followed by a parenthesis delimited list of actual constructor arguments. For a class, the type expression is simply the class name, qualified with any namespaces if needed:
```ghul
class THING is
    init() is si // constructor
si

let a_thing = THING();
```

Classes can only be defined at global scope. Classes can be generic, which will be covered later. Concrete class names should be in `MACRO_CASE`. Abstract class names should be in `PascalCase`.

## structs

Structs consist of a name, then the types of any traits implemented, and then the struct body again enclosed in `is` / `si`:
```ghul
struct POINT is
    x: double;
    y: double;

    init(x: double, y: double) is
        self.x = x;
        self.y = y;
    si
si
```

Structs are constructed the same way as classes, with a constructor expression:
```ghul
let origin = POINT(0.0D, 0.0D);
let right = POINT(1.0D, 0.0D); // or up, or down, or even left, depending on your co-ordinate system!
```

A struct defines a new value type, which means any values that the struct encapsulates are collected together as a new kind of value: copying the struct involves copying all the encapsulated values and the built in equality operator `==` performs a memberwise equality check:
```
let zero_zero = POINT(0.0D, 0.0D);

assert origin == zero_zero;
assert origin != right;
```

Structs can only be defined at global scope. Structs can be generic, which will be covered later. Struct names should be in `MACRO_CASE`.

## traits

A trait consists of a name, the types of any parent traits that must also be implemented, and then the trait body:

```ghul
trait Printable is
    print();
si
```

Traits are similar to interfaces in other languages. The methods and properties of the trait must be implemented by any class that inherits from the trait:
```ghul
class BOOK: Printable is
    title: string;
    author: string;

    init(title: string, author: string) is
        self.title = title;
        self.author = author;
    si

    print() is
        write_line("Title: {title}, Author: {author}");
    si
si
```

Traits can only be defined at global scope. Trait methods and properties must be made abstract by giving them empty bodies (see issue [#285](https://github.com/degory/ghul/issues/285)). Trait names should be in `PascalCase`;

## unions

A union consists of a name and then a union body, which contains one or more variants. Each variant has a name, and then an optional list of fields:
```ghul
union Tree is
    NODE(left: Tree, right: Tree);
    LEAF(value: int);
si
```
Unions are a reference type. A reference of union type can point to only one variant at a time. The active variant can be determined by checking the union's tag properties. These are auto named by convention based on the variant names.

```
let tree = Tree.NODE(Tree.LEAF(123), Tree.LEAF(456));
let leaf = Tree.LEAF(123);

if tree.is_node then
    write_line("have tree node");
elif tree.is_leaf then
    write_line("have tree leaf");
fi
```

The active variant can be accessed by name, which returns either the variant instance (if it holds multiple fields), or just the field value if it holds a single field. Unit variants (those with no fields) cannot be accessed as they have no value.

```
if tree.is_node then
    write_line("have a tree with left {tree.node.left} and right {tree.node.right}");
elif tree.is_leaf then
    write_line("have a leaf with value {tree.leaf}"); // note we don't need tree.leaf.value here
fi
```

Union names should be in `PascalCase` and variant names should be in `MACRO_CASE`

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

Public properties with no getter or setter are automatically backed by a hidden field. Private properties with no getter or setter are implemented as a plain field.

Properties can be defined within globally and within classes, structs and traits. Property names should be in `snake_case`.

## methods

Methods are syntactically the same as functions, except they are defined within classes, structs or traits.

```ghul
class SCALER is
    _scale: double;

    scale(value: double) => value * scale;
si

```
As with functions, methods should be named in `snake_case`

## constructors

In ghūl methods named `init` are constructors. When an object is constructed using a constructor expression, the corresponding `init` method overload will be called based on the actual argument types

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

let c = COUNTER(); // calls the parameterless overload of init()
let d = COUNTER(50); // calls init(initial_count: int)
```

Constructors can be defined in classes and structs

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

### namespace aggregation

A namespace definition is an instance of that namespace. Namespace instances are aggregated across all source files to form a single namespace scope. This means that all definitions within a namespace instance are visible unqualified within all other instances of that namespace in all source files:

`source-file-1.ghul`:
```ghul
namespace Example is
    // this definition of Test is visible unqualified
    // throughout the Example namespace:
    trait Test is
        ...
    si
si
```

`source-file-2.ghul`:
```ghul
namespace Example is
    // class TEST can implement the Test trait without having
    // to quality the name Test:
    class TEST: Test is
        ...
    si
si
```

### definitions outside any namespace

If a source file contains no namespaces, then all definitions in the file are placed in a compiler generated namespace that is private to that source file. This is useful for examples and tests:

```ghul
// the compiler places this in an auto-generated namespace private to this source file
entry() is
    IO.Std.write_line("Hello, world!");
si
```
For definitions to be visible from other files, they must be placed in an explicitly declared namespace.

### namespace usage consistency

If a source file contains any explicitly declared namespaces, then all definitions in that file must be within a namespace. Bare definitions outside of namespaces are not allowed in files with namespace declarations:

```ghul
namespace Example is
    entry() is
        IO.Std.write_line("Hello, world!");
    si
si

...

// only additional namespaces are allowed here
// bare definitions are an error
```

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
namespace UseExample is
    use Example;

    class ANOTHER_TEST: Test is
        ...
    si
si

namespace UseExample is
    // TEST and Test still need qualification here
    class YET_ANOTHER_TEST: Example.Test is
        ...
    si
si
```

## visibility of symbols

In ghūl, the visibility of symbols outside their defining scope is managed by a naming convention which is partially enforced by the compiler

### global symbols

Classes, structs, traits, unions, global functions and global properties are accessible from any namespace. Prefixing their names with `_` indicates they are intended to be private, but this is not enforced by the compiler:
```ghul
class PUBLIC is
    ...
si

public_function() -> int => ...
public_property: int ...

class _PRIVATE is
    ...
si

_private_function() -> int => ...
_private_property: int ...
```

### methods

Methods are public by default. To make a method protected, prefix its name with an underscore `_`:
```ghul
class THING is
    do_something_public() is
        ...
    si

    _do_something_protected() is
        ...
    si
si
```
Protected access to methods _is_ enforced by the compiler


### properties
Properties are public read, protected write, unless they start with `_`, in which case they are protected read and write:
```
struct VALUE is
    public_property: int;

    _protected_property: string;

    init(value: int) is
        public_property = value;
        _protected_property = "value is {value}";
    si 
si

...

let v = VALUE(1234);
write_line(v.public_property); // OK it's public
write_line(v._protected_property); // compile time error: it's protected
v.public_property = 5678; // compile time error: not publicly assignable
```

### planned changes
Protected access will become private in a future release: derived types should not rely on reading or writing members with `_` prefixed names

