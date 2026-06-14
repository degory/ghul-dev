# expressions

Expressions in ghūl are constructs that evaluate to a value. They can be used to perform calculations, make comparisons, and combine values in various ways.

## literals

### integers

Integer literals consist of an optional radix (base), followed by a sequence of digits with optional underscores for readability, followed by a dot and a decimal fraction and/or exponent (for floating point numbers) and finally a type suffix.

<GhulExample name="expressions-1" />

### char
<GhulExample name="expressions-2" />

### floating point
<GhulExample name="expressions-3" />

### string
<GhulExample name="expressions-4" />

### array
Array literals are constructed from a comma separated list of element values enclosed in `[` and `]`. The array element type is inferred as the most specific type compatible with all elements (which may be `object` if no more specific ancestor type exists). The resulting array type is `E[]` where `E` is the inferred element type. 

<GhulExample name="expressions-5" />

### tuple

Tuple literals are constructed from a comma separated list of elements enclosed in `(` and `)`. Each element can be a bare value or a named value, and each element can optionally specify a type. Where explicit types are omitted, element types will be inferred.

<GhulExample name="expressions-6" />

If tuple elements are not explicitly named, they are assigned names consisting of a back-tick followed by an index

<GhulExample name="expressions-7" />

### function

Function literals are constructed from an parenthesized argument list, a return type, and a return expression or a function body. If there is only one argument, no parentheses are needed.

#### expression body function literal

<GhulExample name="expressions-8" />

#### block body function literal

<GhulExample name="expressions-9" />

#### type inference

Return type can usually be omitted provided it can be inferred from the type of the expression body or any values returned from the block body

<GhulExample name="expressions-10" />

Argument types usually can be inferred if the function literal is being passed into a function.

<GhulExample name="expressions-11" />

#### capturing and closure

A function literal can refer to identifiers from its surrounding lexical scope; those references form its closure:

<GhulExample name="expressions-13" />

A `let mut` is shared with the surrounding scope:

<GhulExample name="expressions-26" />

## arithmetic

Arithmetic expressions allow you to perform mathematical calculations using operators such as `+`, `-`, `*`, `/`, and `%`.

<GhulExample name="expressions-15" />

## comparison

Comparison expressions allow you to compare values using operators such as `==`, `!=`, `<`, `>`, `<=`, and `>=`.

<GhulExample name="expressions-16" />

## short circuit logical

Logical expressions allow you to combine or negate boolean values using the `/\` (logical AND), `\/` (logical OR), and `!` (logical NOT) operators.

<GhulExample name="expressions-17" />

Evaluation stops as soon as the result is known

## conditional

Conditional expressions allow you to evaluate different expressions based on a condition using the `if`-`then`-`else` construct.

<GhulExample name="expressions-18" />

## case expression

A `case` expression yields the value of the matched arm. It needs an `else` arm so that every value is covered; the arm values and the `else` agree on a type:

<GhulExample name="expressions-29" />

## function call

Function call expressions allow you to invoke functions and methods by providing the necessary arguments.

<GhulExample name="expressions-19" />

## property access

Property access expressions allow you to access the properties of an object using the dot notation.

<GhulExample name="expressions-20" />

## indexer

Indexer expressions allow you to access elements of an array or collection using square brackets.

<GhulExample name="expressions-21" />

## constructor

Constructor expressions allow you to create new instances of classes or structs by invoking their constructors.

<GhulExample name="expressions-22" />

## type cast

Type cast expressions allow you to explicitly convert a value from one type to another using the `cast` keyword.

<GhulExample name="expressions-23" />

## default value

A `default` expression evaluates to the default value of a type: `null` for reference types, the zero value for numeric and other value types.

`default[T]` pins the type explicitly. A bare `default` takes its type from the surrounding context: a typed `let`, an assignment, or a return:

<GhulExample name="expressions-24" />

`let a = default` initialises a local to its type's default value, where the type is inferred from how the local is later used.

## let in

A `let ... in ...` expression introduces one or more local variables that are in scope only within the trailing expression.

<GhulExample name="expressions-27" />

## block

A `val ... lav` block is a sequence of statements that produces a value. The value is the block's tail expression, or any `return E` whose target is the block. A block gives an expression room for intermediate local variables, loops, and early exits:

<GhulExample name="expressions-28" />

A `return E` inside a `val ... lav` block yields from the block, not from the enclosing function.

These are the main types of expressions in ghūl. They can be combined and nested to form more complex expressions and statements:


<GhulExample name="expressions-25" />
