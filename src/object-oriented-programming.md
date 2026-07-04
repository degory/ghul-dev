# object oriented programming

::: tip runnable examples
The [ghul-examples repository](https://github.com/degory/ghul-examples/tree/main/examples/object-oriented) has fuller, runnable object-oriented examples. Open it in a GitHub Codespace or a dev container to build and run them.
:::

ghūl is a class-based object-oriented language. Classes and structs hold state and behaviour, traits describe shared behaviour, and a value can be used at the type of any ancestor class or trait it satisfies. This page ties those pieces together; [definitions](/definitions.html#types) has the syntax for each in isolation.

## classes and objects

A [class](/definitions.html#classes) defines a reference type: fields and properties for its state, methods for its behaviour, and one or more `init` constructors. An object is an instance of a class, created by calling the class like a function, as in `POINT(3, 4)`. `self` refers to the current instance inside a method. A class with no declared superclass extends `object`, and objects compare by reference identity unless a class overrides equality.

## encapsulation

There are no `public` or `private` keywords. A leading underscore on a name marks it non-public, and the compiler enforces that for methods and properties: `_balance` is reachable only within its own type and subclasses, while `balance` is public to read. A property is public to read but assignable only within its defining type, so state stays behind the methods that maintain it.

## inheritance

A class extends at most one superclass, named after a colon in the header, and inherits its members. A constructor runs the superclass constructor with `super.init(...)`, and a method replaces an inherited one by declaring it again. A call to that method dispatches on the object's runtime type, so a method inherited from the superclass reaches the override:

<GhulExample name="object-oriented-programming-2" />

Calling `describe` through the `Animal[]` is polymorphism: the static type is `Animal`, the behaviour is each subclass's overriding `speak`.

## abstract and closed classes

`speak` above has no body. A class with a body-less instance method is implicitly abstract: it names a method the class can't perform on its own, so constructing the class directly is rejected and only subclasses that supply the method can exist. Marking a class `abstract` has the same effect without a body-less method.

By default a class is closed to subclassing outside its own assembly; the postfix `open` modifier opts in to cross-assembly subclassing. Closing the hierarchy lets the compiler narrow on the `else` edge of an `isa` test, and an `abstract` root can narrow to a single remaining subclass (see [type narrowing](/control-flow.html#type-narrowing)).

## traits

A [trait](/definitions.html#traits) is ghūl's interface: a set of members a type promises to provide. A class, struct, or union implements a trait by naming it in the header, and the value can then be used at the trait's type wherever the trait is expected. A class extends one superclass but implements any number of traits.

A trait member can provide a default body, which an implementing type inherits and overrides only to change, reaching the original with `super`. Traits combine with generics: a generic trait like `Operation[T]` gives a whole family of implementations one shared shape.

## narrowing

Discovering an object's concrete type at runtime uses `isa` or `if let`, which test the type and narrow the value to it inside the matching branch, and a `case` over a closed hierarchy is checked for exhaustiveness. The [control flow](/control-flow.html#type-narrowing) chapter covers narrowing in full.

## a worked example

<GhulExample name="object-oriented-programming-1" />
