
#  ghūl programming language

<img class="ghul-logo" src="/ghul-logo-draft.png" alt="ghūl programming language logo" />

ghūl (pronounced 'ghoul') is a statically typed, general-purpose programming language that compiles to .NET 10. It produces ordinary .NET assemblies and NuGet packages, and ghūl code can call any .NET library. The [ghūl compiler](https://github.com/degory/ghul) is written in ghūl - about 120,000 lines of it - and compiles itself.

## examples

::: tip editable examples
Every example on this site is a complete program you can change and run in place: click the pencil, edit, and run. Output and any compiler errors appear in the panel beneath.

Nothing you edit is saved. To keep something, paste it into the [ghūl scratchpad](https://github.com/degory/ghul-scratchpad)'s `main.ghul`{:text}: a one-file project that opens in a GitHub Codespace with the compiler ready, or that you can clone on your own machine.
:::

<GhulExampleSwitcher
  names="functional,expression-oop,expression-functional,fibonacci-generators,generic-calculator,optionals-narrowing"
  labels="fibonacci: streams + `|>`,expression trees: classes + traits,expression trees: union + pattern matching,fibonacci: generators + pipes,calculator: generics,optionals: `T?` + narrowing"
/>

So is this one:

<GhulExample name="hello-world" />

A file with no namespace runs its top-level statements as the program's entry point, so a program needs no other ceremony until it grows enough to want some.

To write ghūl on your own machine, see [getting started](/getting-started): a ghūl repository pins the compiler as a local .NET tool, so the compiler arrives with the code. The [tour](/expression-oriented-programming) walks through the language a topic at a time.

## features

- **expression-oriented**: `if`, `if let`, `case`, loops, and block forms are expressions, and a block body's unterminated last value-producing statement is its value.

- **pattern matching**: `if let` and `case`/`when` arms with type tests, destructuring with literal leaves, and value lists. `case` arms over a union, enum, `bool`, or closed class hierarchy are checked for exhaustiveness; open-domain scrutinees need `else`.

- **type narrowing**: union variant tests, `isa` checks, null checks, and `if let` narrow a local variable's type within the code the check covers.

- **type inference**: local variables, loop variables, destructured variables, anonymous function parameter and return types, and generic type arguments at call sites are inferred from initializers and use sites, bidirectionally, within a function body.

- **functional programming**: first-class anonymous functions with closures, higher order functions, and non-mutating pipe operations over lists. Arrays, tuples, and list literals are immutable.

- **generators**: functions returning `Pipe[T]` can use `yield` to produce a sequence of values lazily.

- **.NET integration**: ghūl produces and consumes NuGet packages and inter-operates with other .NET languages, so the whole .NET ecosystem is available from day one.

And the things a general-purpose language is expected to have: classes, structs, traits, and inheritance; generics with declaration-site variance; optional types; async/await; `try`/`catch`/`finally` over .NET exceptions - all covered in the [tour](/expression-oriented-programming) and the reference pages.

## why ghūl?

Why not 🤔

ghūl is mainly an opportunity for [me](https://github.com/degory) to experiment with programming language design. Apart from a slightly quirky syntax, ghūl is a fairly conventional programming language. Its goal is to be expressive enough for general-purpose development, and the self-hosting compiler - the largest ghūl program there is - is the working test of that goal.

It is maintained by one person, so expectations should be set accordingly: the language, compiler, tools, and this website are all a **work-in-progress**, whatever the [ghūl compiler](https://github.com/degory/ghul) accepts is currently the definitive language reference, and bug reports and questions are answered as time allows. If you build something with ghūl, however small, I'd be delighted to hear about it.
