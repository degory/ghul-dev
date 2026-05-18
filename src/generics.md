# generics

::: tip runnable examples
The [ghul-examples repository](https://github.com/degory/ghul-examples/tree/main/examples/generics) has fuller, runnable generics examples — open it in a GitHub Codespace or a dev container to build and run them.
:::

ghūl supports generic type arguments on
- classes
- structs
- traits
- methods
- unions
- global functions

Type arguments declare a named type, which can be used anywhere within its scope in type expressions. 

For example in the following global function, `T` is a type argument, and it can be used within the function's definition and body.
When a particular specialization of `print_something[T](T)` is called, `T` will have whatever actual type argument was supplied

<GhulExample name="generics-1" />

<GhulExample name="generics-2" />

<GhulExample name="generics-3" />

<GhulExample name="generics-4" />

<GhulExample name="generics-5" />

Generic argument types are largely opaque: the operations permitted on values of generic argument types are limited to:
- storing in a variable
- passing as a method or function argument
- returning from a method or function
- method calls supported by `object`


Generic argument types can be inferred from context for generic constructor invocations as well as generic function and method calls

<GhulExample name="generics-6" />

