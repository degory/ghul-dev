# definitions

## variables

In ghūl variables are introduced with the `let` keyword:

<GhulExample name="definitions-1" />

The compiler will infer the type from the initializer, if there is one. If there is no initializer, then a type must be explicitly specified.

<GhulExample name="definitions-2" />

If both an initializer and a type are present, then the initializer must be assignment compatible with the type

<GhulExample name="definitions-3" />

Multiple variables can be defined in the same `let` statement, including a mix of types and with or without initializers

<GhulExample name="definitions-4" />

The name `_` is a discard placeholder. It can stand in for any variable name, but the value that would be assigned to it is discarded. `_` is accepted in `let` definitions, tuple destructuring, lambda parameters, and `for` loop variables:

<GhulExample name="definitions-5" />

Variables may only be defined within functions, methods or property bodies. Variables names should be in `snake_case`

## functions

In ghūl functions consist of a name and a parenthesized formal arguments list, followed by a return type, and then either a return expression or a function body:

<GhulExample name="definitions-6" />

`=>` introduces a single-expression body, while the `is` and `si` keywords are used to delimit block bodies. 

Functions can only be defined at global scope. Functions can be generic, which will be covered later. Function names should be in `snake_case`

## arguments

Arguments consist of a name followed by a type. The type is mandatory as the compiler cannot infer types here.

<GhulExample name="definitions-7" />

## types

### classes

Classes consist of a name optionally followed by a superclass name and the types of any traits implemented, and then the class body. The class body is delimited by keywords `is` and `si`:
<GhulExample name="definitions-8" />

A class defines a new reference type, instances of which are assignment compatible with its superclass type and any traits it implements.

Instances of classes are created via a constructor expression, which consists of a type expression followed by a parenthesis delimited list of actual constructor arguments. For a class, the type expression is simply the class name, qualified with any namespaces if needed:
<GhulExample name="definitions-9" />

Classes can only be defined at global scope. Classes can be generic, which will be covered later. Concrete class names should be in `MACRO_CASE`. Abstract class names should be in `PascalCase`.

### structs

Structs consist of a name, then the types of any traits implemented, and then the struct body again enclosed in `is` / `si`:
<GhulExample name="definitions-10" />

Structs are constructed the same way as classes, with a constructor expression:
<GhulExample name="definitions-11" />

A struct defines a new value type, which means any values that the struct encapsulates are collected together as a new kind of value: copying the struct involves copying all the encapsulated values and the built in equality operator `==` performs a memberwise equality check:
<GhulExample name="definitions-12" />

Structs can only be defined at global scope. Structs can be generic, which will be covered later. Struct names should be in `MACRO_CASE`.

### traits

A trait consists of a name, the types of any parent traits that must also be implemented, and then the trait body:

<GhulExample name="definitions-13" />

Traits are similar to interfaces in other languages. Trait methods and properties without a default implementation must be implemented by any class that inherits from the trait:
<GhulExample name="definitions-14" />

A trait method or property can provide a default body. Implementing classes inherit the default and only need to override it to change the behaviour:

<GhulExample name="definitions-15" />

A class override can call the trait's default with `super.method()`.

Traits can only be defined at global scope. Trait methods and properties can be abstract or have a default implementation. Trait names should be in `PascalCase`.

### unions

A union consists of a name and then a union body, which contains one or more variants. Each variant has a name, and then an optional list of fields:
<GhulExample name="definitions-16" />
Unions are a reference type. A reference of union type can point to only one variant at a time. To discover which variant a union currently holds, test it with `isa Variant(value)`:

<GhulExample name="definitions-17" />

`isa Variant(value)` does two things at once: it tests the variant, and within the then-branch it narrows the value to that variant, so the variant's own fields are accessible directly:

<GhulExample name="definitions-18" />

Unions support structural equality through the `=~` operator. Two union references compare equal when they hold the same variant with member-wise equal fields:

<GhulExample name="definitions-19" />

Unions can only be defined at global scope. Union names should be in `PascalCase` and variant names should be in `MACRO_CASE`

### enums

An enum consists of a name and then an enum body, which contains one or more elements. Each element has a name and an optional constant integer value

<GhulExample name="definitions-20" />

Enums can only be defined at global scope. Enums and their members should be named in `MACRO_CASE`

## properties

A property consists of the property name followed by the property's type and, optionally, bodies for getter and setter methods.

<GhulExample name="definitions-21" />

Public properties with no getter or setter are automatically backed by a hidden field. Private properties with no getter or setter are implemented as a plain field.

Properties can be defined within globally and within classes, structs and traits. Property names should be in `snake_case`.

## methods

Methods are syntactically the same as functions, except they are defined within classes, structs or traits.

<GhulExample name="definitions-22" />

As with functions, methods should be named in `snake_case`

## constructors

In ghūl methods named `init` are constructors. When an object is constructed using a constructor expression, the corresponding `init` method overload will be called based on the actual argument types

<GhulExample name="definitions-23" />

Constructors can be defined in classes and structs

## namespaces

Namespaces are introduced with the `namespace` keyword followed by the namespace name and then the namespace body.

<GhulExample name="definitions-24" />

Namespaces may be nested inside other namespaces
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

If a source file contains no namespaces, then all definitions in the file are placed in a compiler generated namespace that is private to that source file. This is useful for examples and tests:

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

In ghūl, the visibility of symbols outside their defining scope is managed by a naming convention which is partially enforced by the compiler

### global symbols

Classes, structs, traits, unions, global functions and global properties are accessible from any namespace. Prefixing their names with `_` indicates they are intended to be private, but this is not enforced by the compiler:
<GhulExample name="definitions-34" />

### methods

Methods are public by default. To make a method protected, prefix its name with an underscore `_`:
<GhulExample name="definitions-35" />
Protected access to methods _is_ enforced by the compiler


### properties
Properties are public read, protected write, unless they start with `_`, in which case they are protected read and write:
<GhulExample name="definitions-36" />

### planned changes
Protected access will become private in a future release: derived types should not rely on reading or writing members with `_` prefixed names
