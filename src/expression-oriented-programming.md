# expression oriented programming

ghūl supports expression-oriented programming: most control-flow constructs produce a value, so they can be assigned to a local variable, returned, or passed as an argument. With expression bodies on functions and methods, a computation can read as one value-producing expression rather than a sequence of assignments.

The constructs are covered in full elsewhere: [if](/expressions#conditional) and [case](/expressions#case-expression) as expressions on the expressions page, and the [if](/control-flow#if-statement) and [case](/control-flow#case-statement) statement forms under control flow. This page shows them working together.

## if as an expression

An `if` yields the value of the chosen branch. Each branch is itself an expression, and the branches agree on a type:

<GhulExample name="expression-oriented-programming-1" />

## case as an expression

A `case` yields the value of the matched arm. As an expression it needs an `else` arm, so every value is covered:

<GhulExample name="expression-oriented-programming-2" />

## loops as expressions

Every loop form yields too, at type `T?`: a `break` with a value produces it, and falling off the end - a false condition, an exhausted iterator - produces the absent value. A search over a sequence is then one expression, and a valued break can carry its result out of nested loops to the outermost one that consumes it:

<GhulExample name="control-flow-61" />

See [loops as expressions](/control-flow.html#loops-as-expressions) for the full rules.

## blocks

A parenthesised block `(statement; ...; value)` runs a sequence of statements and yields a value: its tail expression, or any `return` that targets the block. It gives an expression room for intermediate local variables, loops, and early exits:

<GhulExample name="expression-oriented-programming-3" />

A `return` inside the block yields from the block, not from the enclosing function.

## let in

A `let ... in ...` expression introduces one or more local variables scoped to a single trailing expression. It is lighter than a block when a value needs only a local or two:

<GhulExample name="expression-oriented-programming-6" />

## every arm is a statement block

Whether a construct is being used as a statement or as an expression changes what happens to the value it produces. It does not change what is written inside it. A loop body, each arm of an `if` / `elif` / `else`, and each arm of a `case` are statement blocks in both uses: they hold a statement list, so an arm can define local variables and run several statements before arriving at its value.

The value an arm produces is its last statement's, on the same rule as a parenthesised block:

<GhulExample name="expression-oriented-programming-9" />

Where the value then goes is what the two uses differ on. An `if` used as an expression takes the value of the arm it chose; the same `if` used as a statement discards it. A loop body is the case where it always goes nowhere, since a loop yields through `break` rather than through its body's last statement.

A terminating `;` on the last statement changes nothing here, or anywhere else: it separates two statements written on one line, and that is all it does.

## block bodies return their tail

A function or method body takes its last statement's value the way an arm does. Where that value's type is assignable to the declared return type, it is the return value on the fall-through path, checked exactly as an explicit `return` would be:

<GhulExample name="expression-oriented-programming-7" />

A tail of some other non-void type is an error at the tail rather than a silent discard. To evaluate a statement for its effect and throw its value away, write `let _ = doubled * trimmed`.

Because the tail is an ordinary statement position, an `if` or a `case` sitting there is the return value too, and no branch needs its own `return`:

<GhulExample name="expression-oriented-programming-8" />

Only a statement that produces a value can be a tail. An expression statement, an `if`, a `case` and a parenthesised block all do. A `let`, an assignment, an `assert` and a loop do not, so a body whose last statement is one of those has no value on the fall-through path and returns [the default for its return type](/control-flow.html#default-return) instead. A loop is not an exception to [loops as expressions](#loops-as-expressions): it yields to a context that consumes a value, and a function tail is not one, so a `break` with a value there is rejected outright.

Whole bodies can have no tail to take either. A void body discards whatever is left standing at its end, so a method ending in a bare `if` or loop is unaffected. In a generator, falling off the end means the end of the stream rather than a value, and a bare `return` ends it early. A `try` block is not an expression, so a body ending in one is not a tail either.

## expression bodies

A function, method, property, or anonymous function can replace its block body with `=>` and a single expression. That expression can be an `if`, a `case`, or a parenthesised block:

<GhulExample name="expression-oriented-programming-4" />

## composing them

These forms nest, so a block can hold a `case` and an `if`:

<GhulExample name="expression-oriented-programming-5" />
