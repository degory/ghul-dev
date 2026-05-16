# type inference

ghūl infers types pervasively. Inside a method or function body, most local variables, loop variables, destructured variables and anonymous function parameters can be left unannotated - the compiler works their types out from how they are initialized and used.

Type inference is **function-local**: types inferred within one function are not visible outside it. Outside function bodies all types are explicit, including the signatures of methods and global functions, whose parameter and return types are always written out.

Within a function, types are inferred for:

- local variables
- loop variables
- destructured variables
- anonymous function parameters
- anonymous function return types
- generic type arguments on calls to constructors, methods, static methods and global functions

ghūl also performs **type narrowing** - within parts of a function a symbol may be observed at a more specific type than the one it was declared with. Narrowing applies only to local variables: function parameters, `let` variables, loop variables, destructured variables and anonymous function parameters. It does not apply to fields or properties.

## inference is function-local

A function's signature is written out explicitly; inference works within the body.

```ghul
// the signature is explicit: the parameter type and the return type are written out
totals(values: Collections.Iterable[int]) -> (sum: int, count: int) is
    let sum = 0;        // inferred: int
    let count = 0;      // inferred: int

    for v in values do  // inferred: v is int
        sum = sum + v;
        count = count + 1;
    od

    return (sum, count);
si
```

Inference does not read types out of a body into that function's signature, and does not carry from one function into another: each body is checked on its own, against the explicit signatures of everything it calls.

## inference applies to local symbols

Because inference is function-local, it only works out the types of symbols local to a function body. A field or property belongs to a type rather than to a function body, so its type is always written out explicitly - for private members as well as public ones.

```ghul
class COUNTER is
    count: int;          // a property - its type is declared

    init() is
        count = 0;
    si

    tick() is
        let step = 1;    // a local - its type is inferred from the initializer
        count = count + step;
    si
si
```

## type narrowing

When a check proves a stronger fact about a value's type, ghūl narrows that value to the narrower type for the code the fact covers. Narrowing applies to local variables, including a function's own parameters.

```ghul
greet(a: Animal) is
    if isa Cat(a) then
        // a is a parameter of greet, narrowed to Cat in this branch
        write_line(a.purr());
    fi
si
```

A field or property is **not** narrowed - an `isa` check or variant test written directly against one narrows nothing.

```ghul
class CARRIER is
    occupant: Animal;

    init(occupant: Animal) is
        self.occupant = occupant;
    si
si

...

describe(carrier: CARRIER) is
    if isa Cat(carrier.occupant) then
        // carrier.occupant is a property access, not a local variable - it is
        // not narrowed, so carrier.occupant.purr() would not compile here
        write_line("the carrier holds a cat");
    fi
si
```

To narrow a property, copy it into a local variable and narrow that.

```ghul
describe(carrier: CARRIER) is
    let occupant = carrier.occupant;  // copy the property into a local variable

    if isa Cat(occupant) then
        // occupant is a local variable, narrowed to Cat in this branch
        write_line(occupant.purr());
    fi
si
```

`if let` does the same in one step: it introduces a fresh local variable from the property expression, and that local narrows.

```ghul
describe(carrier: CARRIER) is
    if let cat: Cat = carrier.occupant then
        write_line(cat.purr());
    fi
si
```

Narrowing covers union variant tags, `isa` class checks, null checks (`x?`) and `if let`, and it is flow-sensitive - an early-return guard narrows the code that follows it. See [type narrowing and `if let`](/control-flow.html#type-narrowing) in the control flow chapter for the full picture.

## what gets inferred

### let statements and expressions

When no explicit type is given for a variable in a let statement or expression, its type is inferred from the initializer, provided one is present.

```ghul
let a_string = "12345";
let an_int = 12345;
let an_int_array = [1, 2, 3, 4, 5];
```

### destructuring variables

A destructuring `let` declares several variables at once from a tuple. Each variable takes its type from the corresponding element of the right-hand side, and the pattern can nest.

```ghul
let person = ("alice", 30);
let (name, age) = person; // name is string, age is int

let ((first, second), third) = (("a", "b"), "c");
```

### for loop variables

A `for` loop variable takes its type from the element type of the iterable being looped over. Destructuring composes with this: when the element type is a tuple, its element types flow into the destructured names.

```ghul
for i in 1::10 do // i is int
    write_line("{i}");
od

let pairs = [("a", 1), ("b", 2)];

for (name, count) in pairs do // name is string, count is int
    write_line("{name}: {count}");
od
```

### list literal element types

The element type of a list literal is inferred from the types of the elements: the compiler finds a type compatible with all of them.

```ghul
class Base is
    init() is si
si

class DERIVED: Base is
    init() is super.init() si
si

...

let array_of_base = [Base(), DERIVED()];
let array_of_object = [Base(), DERIVED(), object()];
let array_of_int = [1, 2, 3, 4, 5];
```

If a list contains tuple literals, the compiler finds a compatible common type for each tuple element across all elements of the list.

```ghul
let int_string = [(123, "hello"), (456, "goodbye")];

let int_object = [(123, 456), (798, "wibble")];
```

### if expression result types

The result type of an if expression is inferred from the types of all the branch results: the compiler finds a type compatible with all of them.

```ghul
let derived =
    if true then
        DERIVED()
    else
        DERIVED()
    fi;

let base =
    if true then
        DERIVED()
    else
        Base()
    fi;
```

### generic class, struct and variant constructors

When constructing a generic class, struct or variant, the generic type arguments are inferred from the constructor method arguments where possible.

```ghul
class THING[T] is
    value: T;

    init(value: T) is
        self.value = value;
    si
si

...

let int_thing = THING(1234);
let string_thing = THING("hello");
```

Inference from the constructor arguments works when every type argument appears among those arguments and the constructor overload is unambiguous. A type argument left unpinned - by a no-argument constructor, say - can still be resolved from later use of the value (see [inference from later use sites](#inference-from-later-use-sites)).

### generic function and method calls

When calling a generic global function, a generic method, or a static method on a generic class or struct, the compiler infers the generic type arguments from the types of the actual arguments passed.

```ghul
do_something[T](a: T, b: T) -> T;

...

let base = do_something(Base(), DERIVED());
let derived = do_something(DERIVED(), DERIVED());
let obj = do_something(object(), DERIVED());
```

### anonymous function return types

The return type of an anonymous function literal is inferred from the type of its expression body, or from the types of return expressions in its block body.

```ghul
let returns_int = (i: int) => i * 2;
let returns_string = (s: string) => "{s}{s}";
```

### anonymous function argument types

When an anonymous function literal is passed as an argument and an unambiguous overload match can be made without knowing the exact function type, the compiler infers the argument types from the matching overload.

```ghul
[1, 2, 2, 4, 5] | .filter(i => i > 3);
```

Here `self` is already known to be `Pipe[int]`, so `Pipe[int].filter(predicate: int -> bool) -> Pipe[int]` is the only overload that could match. The `predicate` argument must therefore be `int -> bool`, and the type of `i` must be `int`.

## inference from later use sites

The sections above infer a type from a declaration's initializer or from a call argument. Because inference spans the whole function body, the compiler can also work the other way: when a declaration gives no type on its own, a later use of the variable in the same body can supply one.

```ghul
let m = Box();   // m is Box[?] here - the type argument is not yet known
m.set(42);       // the set call carries an int, so m is Box[int]
let x = m.get(); // x reads as int
```

The same applies to anonymous functions whose argument types are not explicit: if a later call supplies a concrete type, that flows back to the function literal.

```ghul
let f = x => x + 1;
write_line("{f(42)}");        // f's argument is inferred as int
```

### recursive anonymous functions

In a recursive anonymous function, the argument type can be inferred from how the function is called, including from its own recursive calls.

```ghul
let factorial = n rec => if n == 0 then 1 else n * rec(n - 1) fi;
write_line("{factorial(5)}");
```

### operations on a not-yet-inferred value

When an anonymous function's parameter has no annotation, every operation the body performs on it - a member access, a method call, an index, an iteration, a destructuring - is recorded as a constraint on the parameter's type. Whatever type is eventually inferred for the parameter must satisfy all of them.

```ghul
let length_of = x => x.length;
write_line("{length_of("hello")}"); // x resolves to string
```

The call passes a `string`, and `string` has a `length` member, so `x` resolves to `string`. When a call site leaves room for more than one type, a candidate that does not support every recorded operation is discarded.

### generic argument inference from sibling actuals

When a generic function or method is called with two arguments that share only a common ancestor, the generic argument is inferred from their nearest shared type rather than failing the overload match.

```ghul
class Animal is
    init() is si
    speak() -> string => "animal";
si

class Cat: Animal is
    init() is si
si

class Dog: Animal is
    init() is si
si

merge[T](a: T, b: T) -> T => a;

...

let a = merge(Cat(), Dog()); // T is inferred as Animal
```