# expression oriented programming

ghūl is expression-oriented: most control-flow constructs produce a value, so they can be assigned to a local variable, returned, or passed as an argument. With expression bodies on functions and methods, a computation can read as one value-producing expression rather than a sequence of assignments.

The constructs are covered in full elsewhere: [if](/expressions#conditional) and [case](/expressions#case-expression) as expressions on the expressions page, and the [if](/control-flow#if-statement) and [case](/control-flow#case-statement) statement forms under control flow. This page shows them working together.

## if as an expression

An `if` yields the value of the chosen branch. Each branch is itself an expression, and the branches agree on a type:

<GhulExample name="expression-oriented-programming-1" />

## case as an expression

A `case` yields the value of the matched arm. As an expression it needs an `else` arm, so every value is covered:

<GhulExample name="expression-oriented-programming-2" />

## val blocks

A `val ... lav` block runs a sequence of statements and yields a value: its tail expression, or any `return` that targets the block. It gives an expression room for intermediate local variables, loops, and early exits:

<GhulExample name="expression-oriented-programming-3" />

A `return` inside the block yields from the block, not from the enclosing function.

## let in

A `let ... in ...` expression introduces one or more local variables scoped to a single trailing expression. It is lighter than a `val ... lav` block when a value needs only a local or two:

<GhulExample name="expression-oriented-programming-6" />

## expression bodies

A function, method, property, or anonymous function can replace its block body with `=>` and a single expression. That expression can be an `if`, a `case`, or a `val ... lav` block:

<GhulExample name="expression-oriented-programming-4" />

## composing them

These forms nest, so one expression body can hold a `case`, an `if`, and a `val` block:

<GhulExample name="expression-oriented-programming-5" />
