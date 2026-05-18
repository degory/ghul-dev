
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

::: tip the examples are live
Every example on this site is compiled and run with a pinned ghūl compiler. Hover any identifier to see its type; open the panel beneath an example for its captured output or compiler diagnostics.
:::

### hello world!

<GhulExample name="hello-world" />

### functional

<GhulExample name="functional" />

### OOP

<GhulExample name="object-oriented" />

### examples project
See the [ghūl examples repository](https://github.com/degory/ghul-examples) for projects with these examples and others that can be viewed, edited and run from Visual Studio Code or a GitHub Codespace.
