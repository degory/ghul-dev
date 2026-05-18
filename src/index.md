
#  ghūl programming language

![ghūl programming language logo](/ghul-logo-draft.png)

> - The ghūl language, compiler, tools, and this website are all very much a **work-in-progress**.
> - Whatever the [ghūl compiler](https://github.com/degory/ghul) accepts is currently the definitive ghūl language reference.
> - ghūl is pronounced 'ghoul'.

## why ghūl?

Why not 🤔

ghūl is mainly an opportunity for [me](https://github.com/degory) to experiment with programming language design. Apart from a slightly quirky syntax, ghūl is a fairly conventional programming language. Although ghūl is a hobby project maintained by a single person, its goal is to be sufficiently expressive for general-purpose development: the [ghūl compiler](https://github.com/degory/ghul) itself is written in ghūl.

## features

- **type safety**: ghūl enforces type safety at compile-time.

- **functional programming elements**: ghūl supports anonymous functions with closures.

- **OOP**: ghūl supports classes, objects, inheritance, polymorphism, and other Object-Oriented Programming concepts.

- **error handling**: the language includes try/catch/finally for error handling.

- **generics**: ghūl types, methods, and functions can have generic type parameters.

- **.NET integration**: ghūl targets .NET, producing and consuming NuGet packages and supporting inter-operation with other .NET languages.

## examples

::: tip interactive examples
Hover any identifier in a code example to see its type. An example's output and any compiler diagnostics appear in a panel beneath it.
:::

### hello world!

<GhulExample name="hello-world" />

### functional

<GhulExample name="functional" />

### OOP

<GhulExample name="object-oriented" />
