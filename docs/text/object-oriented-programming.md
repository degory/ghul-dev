# object oriented programming

> **editable examples**
>
> Every example on this page can be edited and run here: click the pencil to open it in an editor, change it, and run it in your browser. Errors, hovers and completions come from the ghūl compiler as you type.
>
> The [ghul-examples repository](https://github.com/degory/ghul-examples/tree/main/examples/object-oriented) has fuller object-oriented examples to build and run locally, in a GitHub Codespace or a dev container.

ghūl is a class-based object-oriented language. Classes and structs hold state and behaviour, traits describe shared behaviour, and a value can be used at the type of any ancestor class or trait it satisfies. This page ties those pieces together; [definitions](https://ghul.dev/definitions.html#types) has the syntax for each in isolation.

## classes and objects

A [class](https://ghul.dev/definitions.html#classes) defines a reference type: fields and properties for its state, methods for its behaviour, and one or more `init` constructors. An object is an instance of a class, created by calling the class like a function, as in `POINT(3, 4)`. `self` refers to the current instance inside a method. A class with no declared superclass extends `object`, and objects compare by reference identity unless a class overrides equality.

## encapsulation

There are no `public` or `private` keywords. A leading underscore on a name marks it non-public, and the compiler enforces that for methods and properties: `_balance` is reachable only within its own type and subclasses, while `balance` is public to read. A property is public to read but assignable only within its defining type, so state stays behind the methods that maintain it.

## inheritance

A class extends at most one superclass, named after a colon in the header, and inherits its members. A constructor runs the superclass constructor with `super.init(...)`, and a method replaces an inherited one by declaring it again. A call to that method dispatches on the object's runtime type, so a method inherited from the superclass reaches the override:

```ghul
use IO.Std.write_line;

class ◆▼ Animal is
    _name: string;
    init(name: string) is _name = name; si

    name: string => _name;
    ◆▼ speak() -> string;                     // body-less: Animal is implicitly abstract
    describe() -> string => "{_name} says {speak()}";
si

class DOG: Animal is
    init(name: string) is super.init(name); si
    ▲ speak() -> string => "woof";
si

class CAT: Animal is
    init(name: string) is super.init(name); si
    ▲ speak() -> string => "meow";
si

let animals: Animal[] = [DOG("Rex"), CAT("Tom")];

for a in animals do
    write_line(a.describe()); // describe calls the overriding speak
od
```

output:

```
Rex says woof
Tom says meow
```

Calling `describe` through the `Animal[]` is polymorphism: the static type is `Animal`, the behaviour is each subclass's overriding `speak`.

## abstract and closed classes

`speak` above has no body. A class with a body-less instance method is implicitly abstract: it names a method the class can't perform on its own, so constructing the class directly is rejected and only subclasses that supply the method can exist. Marking a class `abstract` has the same effect without a body-less method.

By default a class is closed to subclassing outside its own assembly; the postfix `open` modifier opts in to cross-assembly subclassing. Closing the hierarchy lets the compiler narrow on the `else` edge of an `isa` test, and an `abstract` root can narrow to a single remaining subclass (see [type narrowing](https://ghul.dev/type-narrowing.html)).

## traits

A [trait](https://ghul.dev/definitions.html#traits) is ghūl's interface: a set of members a type promises to provide. A class, struct, or union implements a trait by naming it in the header, and the value can then be used at the trait's type wherever the trait is expected. A class extends one superclass but implements any number of traits. A type can also implement a trait from a separate [`impl … for` block](https://ghul.dev/definitions.html#partial-and-impl-blocks) instead of naming it in the header, which is how a union gains trait methods.

A trait member can provide a default body, which an implementing type inherits and overrides only to change, reaching the original with `super`. Traits combine with generics: a generic trait like `Operation[T]` gives a whole family of implementations one shared shape.

## narrowing

Discovering an object's concrete type at runtime uses `isa` or `if let`, which test the type and narrow the value to it inside the matching branch, and a `case` over a closed hierarchy is checked for exhaustiveness. The [type narrowing](https://ghul.dev/type-narrowing.html) page covers it in full.

## a worked example

```ghul
use IO.Std.write_line;

let int_calculator = CALCULATOR(
    [
        ("+", INTEGER_ADDITION()),
        ("-", INTEGER_SUBTRACTION()),
        ("*", INTEGER_MULTIPLICATION()),
        ("/", INTEGER_DIVISION())
    ]
);

write_line(
    "1 + 2 = {int_calculator.calculate("+", 1, 2)}"
);
write_line(
    "1 - 2 = {int_calculator.calculate("-", 1, 2)}"
);
write_line(
    "1 * 2 = {int_calculator.calculate("*", 1, 2)}"
);
write_line(
    "1 / 2 = {int_calculator.calculate("/", 1, 2)}"
);

let from_memory =
    int_calculator.calculate_from_memory("-", 3);
write_line("1 + 2 - 3 = {from_memory}");

let string_calculator = CALCULATOR(
    [
        ("+", STRING_CONCATENATION()),
        ("-", STRING_SUBTRACTION())
    ]
);

let concatenated =
    string_calculator.calculate("+", "hello", "world");
write_line("hello + world = {concatenated}");

let subtracted =
    string_calculator.calculate(
        "-", "helloworld", "world"
    );
write_line("helloworld - world = {subtracted}");

string_calculator.clear_memory();

write_line("memory is cleared");

trait ▼ Operation[T] is
    ◆▼ execute(left: T, right: T) -> T;
si

class CALCULATOR[T] is
    _operations: Collections.MAP[string, Operation[T]];

    memory: T;

    init(
        operations: Collections.Iterable[
            (name: string, operation: Operation[T])
        ]
    ) is
        _operations =
            Collections.MAP(
                operations
                    | .map(
                        on =>
                            let (name, operation) = on in
                            Collections.KeyValuePair(
                                name, operation
                            )
                    )
            );
    si

    calculate(
        operation_name: string, left: T, right: T
    ) -> T =>
        if _operations.contains_key(operation_name) then
            let operation = _operations[operation_name];
            memory = operation.execute(left, right);

            memory
        else
            throw System.InvalidOperationException(
                "invalid operation {operation_name}"
            )
        fi;


    calculate_from_memory(
        operation_name: string, right: T
    ) -> T =>
        if _operations.contains_key(operation_name) then
            let operation = _operations[operation_name];
            memory = operation.execute(memory, right);

            memory
        else
            throw System.InvalidOperationException(
                "invalid operation {operation_name}"
            )
        fi;

    clear_memory() is
        memory = _;
    si
si

class INTEGER_ADDITION(): Operation[int] is
    ▲ execute(left: int, right: int) -> int => left + right;
si

class INTEGER_SUBTRACTION(): Operation[int] is
    ▲ execute(left: int, right: int) -> int => left - right;
si

class INTEGER_MULTIPLICATION(): Operation[int] is
    ▲ execute(left: int, right: int) -> int => left * right;
si

class INTEGER_DIVISION(): Operation[int] is
    ▲ execute(left: int, right: int) -> int =>
        if right == 0 then
            throw System.InvalidOperationException(
                "division by zero"
            );
        else
            left / right
        fi;
si

class STRING_CONCATENATION(): Operation[string] is
    ▲ execute(left: string, right: string) -> string =>
        "{left}{right}";
si

class STRING_SUBTRACTION(): Operation[string] is
    ▲ execute(left: string, right: string) -> string =>
        left.replace(right, "");
si
```

output:

```
1 + 2 = 3
1 - 2 = -1
1 * 2 = 2
1 / 2 = 0
1 + 2 - 3 = -3
hello + world = helloworld
helloworld - world = hello
memory is cleared
```
