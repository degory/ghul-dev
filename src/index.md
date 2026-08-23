
#  ghūl programming language

<img class="ghul-logo" src="/ghul-logo-draft.png" alt="ghūl programming language logo" />

> - The ghūl language, compiler, tools, and this website are all very much a **work-in-progress**.
> - Whatever the [ghūl compiler](https://github.com/degory/ghul) accepts is currently the definitive ghūl language reference.
> - ghūl is pronounced 'ghoul'.

## why ghūl?

Why not 🤔

ghūl is mainly an opportunity for [me](https://github.com/degory) to experiment with programming language design. Apart from a slightly quirky syntax, ghūl is a fairly conventional programming language. Although ghūl is a hobby project maintained by a single person, its goal is to be sufficiently expressive for general-purpose development: the [ghūl compiler](https://github.com/degory/ghul) itself is written in ghūl.

## examples

::: tip editable examples
Every example on this site is editable: click the pencil to open it in an editor, change it, and run it in your browser. Output and any compiler errors appear in the panel beneath.

Nothing you edit is saved. To keep something, paste it into the [ghūl scratchpad](https://github.com/degory/ghul-scratchpad)'s `main.ghul`{:text}: a one-file project that opens in a GitHub Codespace with the compiler ready, or that you can clone on your own machine. For a project of your own, start from the [repository template](https://github.com/degory/ghul-repository-template).
:::

### hello world!

<GhulExample name="hello-world" />

<GhulExampleSwitcher
  names="functional,expression-oop,expression-functional,fibonacci-generators,generic-calculator,optionals-narrowing"
  labels="fibonacci: streams + `|>`,expression trees: classes + traits,expression trees: union + pattern matching,fibonacci: generators + pipes,calculator: generics,optionals: `T?` + narrowing"
/>

## features

- **functional programming**: first-class anonymous functions with closures, higher order functions, and non-mutating pipe operations over lists. Arrays, tuples, and list literals are immutable.

- **expression-oriented**: `if`, `if let`, `case`, loops, and block forms are expressions.

- **pattern matching**: `if let` and `case`/`when` arms with type tests, destructuring with literal leaves, and value lists. `case` arms over a union, enum, `bool`, or closed class hierarchy are checked for exhaustiveness; open-domain scrutinees need `else`.

- **OOP**: classes, structs, traits, inheritance, polymorphism, properties, and indexers.

- **type inference**: local variables, loop variables, destructured variables, anonymous function parameter and return types, and generic type arguments at call sites are inferred from initializers and use sites. Inference is bidirectional and iterative within a function body.

- **type narrowing**: union variant tests, `isa` checks, null checks, and `if let` narrow a local variable's type within the code the check covers.

- **generics**: types, methods, and functions can have generic type parameters. Traits can be declared covariant or contravariant with `[T: out]` / `[T: in]`; variance on imported .NET generics is read from metadata.

- **generators**: functions returning `Pipe[T]` can use `yield` to produce a sequence of values lazily.

- **async/await**: functions returning `Tasks.TASK[T]` can use `await` to wait on a task and resume with its result.

- **.NET integration**: ghūl targets .NET, producing and consuming NuGet packages and inter-operating with other .NET languages.

- **error handling**: `try`/`catch`/`finally` over .NET exceptions.

- **type safety**: ghūl enforces type safety at compile-time.
