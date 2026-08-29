
#  ghūl programming language

<img class="ghul-logo" src="/ghul-logo-draft.png" alt="ghūl programming language logo" />

ghūl (pronounced 'ghoul') is a statically typed, general-purpose programming language that compiles to .NET 10. It produces ordinary .NET assemblies and NuGet packages, and ghūl code can call any .NET library. The [ghūl compiler](https://github.com/degory/ghul) is written in ghūl - about 120,000 lines of it - and compiles itself.

The language is under active development: whatever the compiler accepts is currently the definitive language reference.

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

- **statically typed** - every expression has a compile-time type, and a type mismatch is a compile error.

- **type inference** - inside function bodies, types are almost always inferred. A written type is a choice - widening a variable, testing a value - not a requirement; signatures are always explicit.

- **type narrowing** - a value's type follows control flow. `isa` checks, null checks, union variant tests, and `if let` narrow whatever was tested - a local, a field, or a whole member-access path - within the code the check covers.

- **pattern matching** - refutable patterns match by type and by value, with exhaustiveness checking. `case` arms over closed domains - a union, an enum, `bool`, a closed class hierarchy - are checked for coverage; open domains need `else`.

- **expression-oriented** - `if`, `case`, loops, and blocks are expressions: each yields a value, so a computation can be written as one expression rather than a sequence of assignments.

- **functional and object-oriented** - first-class functions with closures and non-mutating pipe operations sit alongside classes, structs, traits, and inheritance. Neither style is second-class.

- **lazy sequences and asynchrony** - generator functions `yield` sequences on demand, and `async`/`await` works over .NET tasks in the conventional way.

- **.NET integration** - ghūl produces and consumes NuGet packages and inter-operates with other .NET languages, so the whole .NET ecosystem is available from day one.

Alongside the expected staples: generics with declaration-site variance, optional types, properties and indexers, `try`/`catch`/`finally` over .NET exceptions - all covered in the [tour](/expression-oriented-programming) and the reference pages.
