# language basics

## syntax

ghūl syntax is inspired by a number of non-brace languages, including ALGOL 68 and Pascal

### identifiers and keywords

Identifiers in ghūl follow the convention of `snake_case` for variables, functions, and properties, `PascalCase` for namespaces and traits, and `MACRO_CASE` for concrete types like classes, structs, and enums. ghūl keywords are lowercase.

ghūl relies on keywords for block structure where other languages use braces or indentation. Keywords are context specific and generally come in pairs where the closing keyword is the reverse or mirror image of the opening keyword. In the examples below `is` introduces a method or class body and its block is closed by the reverse keyword `si`

<GhulExample name="language-basics-1" />

### expressions and statements
Expressions in ghūl are constructs that return a value, while statements perform actions. All expressions can be used where statements are allowed, but only if statements can be used as expressions.

<GhulExample name="language-basics-2" />

### function declarations
Functions in ghūl are declared with an optional return type, a name, a list of parameters in parentheses, and a body enclosed in `is` and `si` keywords

<GhulExample name="language-basics-3" />

Functions can also have an expression body using `=>` instead of `is` / `si`:
<GhulExample name="language-basics-4" />

### control flow
ghūl supports various [control flow constructs](/control-flow.html) like `if`, `else`, `while`, `for`, and `case` expressions.

<GhulExample name="language-basics-5" />

### types

ghūl is statically typed, with some support for [type inference](/type-inference.html). Types can be explicitly specified using a colon `:` plus a type expression

<GhulExample name="language-basics-6" />
[User types](/definitions.html#types) are defined using `class`, `struct`, `trait`, `enum`, and `union` keywords.

## built-in data types

ghūl's built-in data types are primitive types, arrays, tuples, and optionals.

### primitive types

ghūl provides the following primitive data types:

* integer types: `byte`, `ubyte`, `short`, `ushort`, `int`, `uint`, `long`, `ulong`, `word`, `uword`
* floating-point types: `single`, `double`
* boolean type: `bool`
* character type: `char`
* void type: `void`

<GhulExample name="language-basics-7" />
These types are used to represent basic values in ghūl programs.

### arrays

ghūl supports arrays, which are fixed-size, **immutable** collections of elements of the same type. Array types are denoted using square brackets [] after the element type.

<GhulExample name="language-basics-8" />

Arrays can be constructed with an [array literal]()
<GhulExample name="language-basics-9" />

Array elements can be read with indexer syntax
<GhulExample name="language-basics-10" />

### tuples
Tuples in ghūl are lightweight, immutable data structures that can hold a fixed number of elements of different types. Tuple types use parentheses `(` `)`, with elements separated by commas. Tuple literals are similarly constructed with `(` `)` and comma delimited elements

<GhulExample name="language-basics-11" />

Tuple elements can be accessed using the dot `.` notation followed by the element name:

<GhulExample name="language-basics-12" />

Tuple elements can be given more descriptive names, either in the type or in the tuple literal:
<GhulExample name="language-basics-13" />

ghūl also supports tuple destructuring:
<GhulExample name="language-basics-14" />

### optional types

A type followed by `?` is an **optional** type: a value of that type may be present, or it may be absent. The same type written without the `?` is non-optional — a value is always expected to be there.

<GhulExample name="language-basics-15" />

The postfix `?` operator tests whether an optional has a value. The postfix `!` operator reads the value out:

<GhulExample name="language-basics-16" />

Most of the time you don't need `!` directly — `if let` tests an optional and reads its value into a local variable in one step (see [control flow](/control-flow.html#if-let)).

Optional types work for both reference types and value types. An optional value type is backed by `OPTION[T]` — the .NET `Nullable[T]` — so a present value is constructed explicitly:

<GhulExample name="language-basics-17" />

A non-optional type does not expect to be absent. Putting `null`, or an optional the compiler cannot see has a value, where a non-optional type is expected produces a warning:

<GhulExample name="language-basics-18" />

The warning clears once the value is known to be present — inside an `if name?` check, inside an `if let`, or with an explicit `!`:

<GhulExample name="language-basics-19" />

These are the basic data types available in ghūl. The language also supports more advanced types such as classes, structs, traits, enums, and unions, which will be covered in later sections of the documentation.

### type conversions

ghūl does not perform implicit type conversion (coercion) between scalar types; all scalar type conversions must be explicitly cast. However, ghūl supports polymorphic behavior by allowing upcasting, where instances of derived classes or interfaces can be automatically coerced to compatible ancestor types in the class/interface hierarchy.

<GhulExample name="language-basics-20" />

## variables

ghūl has three kinds of variables: locals declared within the body of a function or method, function or method arguments and variables captured by a function literal.

### locals

Local variables are declared with `let` followed by the variable name, plus a type and/or an initializer.

<GhulExample name="language-basics-21" />

Local variables with no explicit initializer are initialized to the default value for their type (zero, false, or null)

### arguments

Arguments will be covered in detail with functions and methods, but the basic form is the argument name followed by its type.

<GhulExample name="language-basics-22" />

### captured variables
Variables captured by a function literal will be covered with [function literals](/expressions.html#capturing-and-closure). They are not explicitly declared but inferred from each function literal's body.

### scope

The scope of all variable definitions is from the point of declaration to the end of the innermost block that contains the declaration. Blocks will be covered later, but generally a block is a control flow statement or a function or method body.

### type inference and explicit types
ghūl can infer the type of local variables from their initializer if present. It's a compile time error if a variable doesn't have either an explicit type or an initializer, or if an initializer is not assignment compatible with any explicit type.

## literals
Literal expressions represent fixed values of a specific type.

<GhulExample name="language-basics-23" />

## operators and expressions
### arithmetic operators
<GhulExample name="language-basics-24" />

### comparison and logical operators
<GhulExample name="language-basics-25" />

<GhulExample name="language-basics-26" />

## assignment

variables and properties can be updated via assignment statements

<GhulExample name="language-basics-27" />
