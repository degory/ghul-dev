# type inference

::: tip runnable examples
The [ghul-examples repository](https://github.com/degory/ghul-examples/tree/main/examples/type-inference) has fuller, runnable type-inference examples — open it in a GitHub Codespace or a dev container to build and run them.
:::

ghūl infers types pervasively inside a method or function body — most local variables, loop variables, destructured variables and anonymous function parameters can be left unannotated, and the compiler works their types out from how they are initialized and used.

Type inference is **function-local**: types inferred within one function are not visible outside it. Outside function bodies all types are explicit, including the signatures of methods and global functions, whose parameter and return types are always written out.

Within a function, types are inferred for:

- local variables
- loop variables
- destructured variables
- anonymous function parameters
- anonymous function return types
- generic type arguments on calls to constructors, methods, static methods and global functions

ghūl also performs **type narrowing** - within parts of a function a symbol may be observed at a more specific type than the one it was declared with. Narrowing applies only to local variables: function parameters, `let` variables, loop variables, destructured variables and anonymous function parameters. It does not apply to fields or properties.

The examples below leave inferred types unannotated — hover over any variable to see the type the compiler worked out for it.

## what stays explicit

A function's signature is written out explicitly; inference works within the body.

<GhulExample name="type-inference-1" />

Inference does not read types out of a body into the function's signature, and does not carry from one function into another: each body is checked on its own, against the explicit signatures of everything it calls.

Fields and properties belong to a type rather than to a function body, so their types are written out too - for private members as well as public ones.

<GhulExample name="type-inference-2" />

## type narrowing

When a check proves a stronger fact about a value's type, ghūl narrows that value to the narrower type for the code the fact covers. Narrowing applies to local variables, including a function's own parameters.

<GhulExample name="type-inference-3" />

A field or property is **not** narrowed - an `isa` check or variant test written directly against one narrows nothing.

<GhulExample name="type-inference-4" />

To narrow a property, copy it into a local variable and narrow that.

<GhulExample name="type-inference-5" />

`if let` does the same in one step: it introduces a fresh local variable from the property expression, and that local narrows.

<GhulExample name="type-inference-6" />

Narrowing covers union variant tags, `isa` class checks, null checks (`x?`) and `if let`, and it is flow-sensitive - an early-return guard narrows the code that follows it. See [type narrowing and `if let`](/control-flow.html#type-narrowing) in the control flow chapter for the full picture.

## what gets inferred

### let statements and expressions

When no explicit type is given for a variable in a let statement or expression, its type is inferred from the initializer, provided one is present.

<GhulExample name="type-inference-7" />

### destructuring variables

A destructuring `let` declares several variables at once from a tuple. Each variable takes its type from the corresponding element of the right-hand side, and the pattern can nest.

<GhulExample name="type-inference-8" />

### for loop variables

A `for` loop variable takes its type from the element type of the iterable being looped over. Destructuring composes with this: when the element type is a tuple, its element types flow into the destructured names.

<GhulExample name="type-inference-9" />

### list literal element types

The element type of a list literal is inferred from the types of the elements: the compiler finds a type compatible with all of them.

<GhulExample name="type-inference-10" />

If a list contains tuple literals, the compiler finds a compatible common type for each tuple element across all elements of the list.

<GhulExample name="type-inference-11" />

### if expression result types

The result type of an if expression is inferred from the types of all the branch results: the compiler finds a type compatible with all of them.

<GhulExample name="type-inference-12" />

### generic class, struct and variant constructors

When constructing a generic class, struct or variant, the generic type arguments are inferred from the constructor method arguments where possible.

<GhulExample name="type-inference-13" />

Inference from the constructor arguments works when every type argument appears among those arguments and the constructor overload is unambiguous. A type argument left unpinned - by a no-argument constructor, say - can still be resolved from later use of the value (see [inference from later use sites](#inference-from-later-use-sites)).

### generic function and method calls

When calling a generic global function, a generic method, or a static method on a generic class or struct, the compiler infers the generic type arguments from the types of the actual arguments passed.

<GhulExample name="type-inference-14" />

### anonymous function return types

The return type of an anonymous function literal is inferred from the type of its expression body, or from the types of return expressions in its block body.

<GhulExample name="type-inference-15" />

### anonymous function argument types

When an anonymous function literal is passed as an argument and an unambiguous overload match can be made without knowing the exact function type, the compiler infers the argument types from the matching overload.

<GhulExample name="type-inference-16" />

Here `self` is already known to be `Pipe[int]`, so `Pipe[int].filter(predicate: int -> bool) -> Pipe[int]` is the only overload that could match. The `predicate` argument must therefore be `int -> bool`, and the type of `i` must be `int`.

## inference from later use sites

The sections above infer a type from a declaration's initializer or from a call argument. Because inference spans the whole function body, the compiler can also work the other way: when a declaration gives no type on its own, a later use of the variable in the same body can supply one.

<GhulExample name="type-inference-17" />

The same applies to anonymous functions whose argument types are not explicit: if a later call supplies a concrete type, that flows back to the function literal.

<GhulExample name="type-inference-18" />

### recursive anonymous functions

In a recursive anonymous function, the argument type can be inferred from how the function is called, including from its own recursive calls.

<GhulExample name="type-inference-19" />

### operations on a not-yet-inferred value

When an anonymous function's parameter has no annotation, every operation the body performs on it - a member access, a method call, an index, an iteration, a destructuring - is recorded as a constraint on the parameter's type. Whatever type is eventually inferred for the parameter must satisfy all of them.

<GhulExample name="type-inference-20" />

The call passes a `string`, and `string` has a `length` member, so `x` resolves to `string`. When a call site leaves room for more than one type, a candidate that does not support every recorded operation is discarded.

### generic argument inference from sibling actuals

When a generic function or method is called with two arguments that share only a common ancestor, the generic argument is inferred from their nearest shared type rather than failing the overload match.

<GhulExample name="type-inference-21" />