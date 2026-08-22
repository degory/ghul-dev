# language basics

## syntax

ghūl syntax is inspired by a number of non-brace languages, including ALGOL 68 and Pascal

### identifiers and keywords

Identifiers in ghūl follow the convention of `snake_case` for variables, functions, methods, and properties, `PascalCase` for namespaces, traits, abstract classes, unions, and enums, and `MACRO_CASE` for concrete classes, structs, variants, and enum members. ghūl keywords are lowercase.

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
* fixed-point type: `decimal`
* boolean type: `bool`
* character type: `char`
* void type: `void`

<GhulExample name="language-basics-7" />
These types are used to represent basic values in ghūl programs.

### arrays

ghūl supports arrays, which are fixed-size, **read-only** collections of elements of the same type. Array types are denoted using square brackets [] after the element type.

<GhulExample name="language-basics-8" />

Arrays can be constructed with an [array literal](/expressions.html#array)
<GhulExample name="language-basics-9" />

Array elements can be read with indexer syntax
<GhulExample name="language-basics-10" />

### tuples
Tuples in ghūl are lightweight, immutable data structures that can hold a fixed number of elements of different types. Tuple types use parentheses `(` `)`, with elements separated by commas. Tuple literals are similarly constructed with `(` `)` and comma delimited elements. Tuples compare by structural equality: two tuples are equal when their corresponding elements are.

<GhulExample name="language-basics-11" />

Tuple elements can be accessed using the dot `.` notation followed by the element name:

<GhulExample name="language-basics-12" />

Tuple elements can be given more descriptive names, either in the type or in the tuple literal:
<GhulExample name="language-basics-13" />

ghūl also supports tuple destructuring:
<GhulExample name="language-basics-14" />

Destructuring also has a by-name form, `(local = field, ...)`, that pulls each element from a named field rather than by position; the positional and by-name forms are covered with [pattern matching](/control-flow.html#if-let).

### optional types

A type followed by `?` is an **optional** type: a value of `T?` can be present or absent. The same type written without the `?` is non-optional, and a non-optional value is always there.

<GhulExample name="language-basics-15" />

The postfix `?` operator tests whether an optional has a value. A plain `if x?` narrows `x` to its non-optional form inside the branch, so the value reads directly:

<GhulExample name="language-basics-16" />

A non-optional type never holds the absent case, so a `T?` is not assignable to a `T`. The compiler rejects it rather than warning:

<GhulExample name="language-basics-18" />

To pass a `T?` where a `T` is wanted, make the value present first: narrow it with `if x?` or `if let` (see [control flow](/control-flow.html#if-let)), assert it with `x!` (which throws when absent), or supply a fallback with `x ?? other`. Optional types work for reference and value types alike - and beyond those two, for generic code that doesn't know which one it has, and for user-defined types that never mention `T?` at all. The [optional types](/optional-types) page covers all of that, along with the `??` and `?.` operators and the warnings that keep optional handling honest.

### type conversions

ghūl does not perform implicit type conversion (coercion) between scalar types; all scalar type conversions must be explicitly cast. However, ghūl supports polymorphic behavior by allowing upcasting, where instances of derived classes or interfaces can be automatically coerced to compatible ancestor types in the class/interface hierarchy.

<GhulExample name="language-basics-20" />

## variables

ghūl has three kinds of variables: locals declared within the body of a function or method, function or method arguments and variables captured by a function literal.

### locals

Local variables are declared with `let` followed by the variable name, an optional explicit type, and an initializer:

<GhulExample name="language-basics-21" />

### arguments

Arguments will be covered in detail with functions and methods, but the basic form is the argument name followed by its type.

<GhulExample name="language-basics-22" />

### captured variables
Variables captured by a function literal will be covered with [function literals](/expressions.html#capturing-and-closure). They are not explicitly declared but inferred from each function literal's body.

### scope

The scope of all variable definitions is from the point of declaration to the end of the innermost block that contains the declaration. Blocks will be covered later, but generally a block is a control flow statement or a function or method body.

### type inference and explicit types
ghūl infers the type of a local variable from its initializer. An explicit type can be given alongside; it's a compile time error if the initializer is not assignment compatible with it.

## literals
Literal expressions represent fixed values of a specific type.

<GhulExample name="language-basics-23" />

## operators and expressions
### arithmetic operators
<GhulExample name="language-basics-24" />

### comparison and logical operators
<GhulExample name="language-basics-25" />

<GhulExample name="language-basics-26" />

### bitwise and shift operators

The integer types carry the usual bitwise operators - `&`, `|`, `^` - and the shift operators `<<` and `>>`. A shift count is an `int`; the result keeps the left operand's type, so a shift wider than the operand's width shifts it out entirely. `>>>` is the unsigned right shift: it shifts zeros into the leftmost bits where `>>` keeps the sign:

<GhulExample name="language-basics-30" />

There is no bitwise complement operator.

## assignment

variables and properties can be updated via assignment statements

<GhulExample name="language-basics-27" />
