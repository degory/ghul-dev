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

## val blocks

A `val ... lav` block runs a sequence of statements and yields a value: its tail expression, or any `return` that targets the block. It gives an expression room for intermediate local variables, loops, and early exits:

<GhulExample name="expression-oriented-programming-3" />

A `return` inside the block yields from the block, not from the enclosing function.

## let in

A `let ... in ...` expression introduces one or more local variables scoped to a single trailing expression. It is lighter than a `val ... lav` block when a value needs only a local or two:

<GhulExample name="expression-oriented-programming-6" />

## block bodies return their tail

A block body follows the same rule as a `val ... lav` block: where its last statement is one that produces a value, and it is written without a terminating `;`, that value is the block's. In a function or method it is the return value on the fall-through path, checked against the declared return type exactly as an explicit `return` would be:

<GhulExample name="expression-oriented-programming-7" />

The semicolon is what separates the two readings. Written `doubled * trimmed;` the statement is evaluated and its value discarded, which leaves the function with no value on that path.

Because the tail is an ordinary statement position, an `if` or a `case` sitting there is the return value too, and no branch needs its own `return`:

<GhulExample name="expression-oriented-programming-8" />

Only a statement that produces a value can be a tail. An expression statement, an `if`, a `case` and a `val ... lav` block all do. A `let`, an assignment, an `assert` and a loop do not, so a body whose last statement is one of those has no value on the fall-through path and returns [the default for its return type](/control-flow.html#default-return) instead. A loop is not an exception to [loops as expressions](#loops-as-expressions): it yields to a context that consumes a value, and a function tail is not one, so a `break` with a value there is rejected outright.

Whole bodies can have no tail to take either. A void body discards a trailing statement whether or not it ends in a semicolon, so a method ending in a bare `if` or loop is unaffected. In a generator, falling off the end means the end of the stream rather than a value. A `try` block is not an expression, so a body ending in one is not a tail either.

A guard `if` with no `else` is rejected in tail position in a function that returns a value, because the branch it does not take produces nothing. Terminate it with `;` to keep it as a plain statement.

## expression bodies

A function, method, property, or anonymous function can replace its block body with `=>` and a single expression. That expression can be an `if`, a `case`, or a `val ... lav` block:

<GhulExample name="expression-oriented-programming-4" />

## composing them

These forms nest, so a `val` block can hold a `case` and an `if`:

<GhulExample name="expression-oriented-programming-5" />
