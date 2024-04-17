# type inference

## let statements and expressions

When no explicit type is given for a variable in a let statement or expression, the variable type is inferred from the initializer, provided one is present

```ghul
let a_string = "12345";
let an_int = 12345;
let an_int_array = [1, 2, 3, 4, 5];
```

## list literal element type

The element type of list literals is inferred from the types of the elements. The compiler will try to find a type that is compatible with all the elements.

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

If a list contains tuple literals, the compiler will attempt to find compatible common types for each tuple element across all the elements in the list

```ghul
let int_string = [(123, "hello"), (456, "goodbye")];

let int_object = [(123, 456), (798, "wibble")];

```

## if expression branch result type

The result type of an if expression is inferred from the types of all the branch results. The compiler will try to find a type that is compatible with all the results

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

## generic class, struct and variant constructors

When constructing a generic class, struct or variant, the actual generic type arguments will be inferred from the constructor method arguments if possible

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

This type of inference is only possible if all type arguments are referenced in the constructor actual arguments and if the constructor overload to call is unambiguous

## generic function or method calls

When calling a generic global function, a generic method, or a static method on a generic class or struct, the compiler will try to infer the generic type arguments from the types of the actual argument passed to the function or method

```ghul
do_something[T](a: T, b: T) -> T;

...

let base = do_something(Base(), DERIVED());
let derived = do_something(DERIVED(), DERIVED());
let obj = do_something(object(), DERIVED());
```

## anonymous function return type

When constructing an anonymous function literal, the compiler will attempt to infer the return type from either the type of the expression body or from the type of return expressions in the block body

let returns_int = (i: int) => i * 2;
let returns_string = (s: string) = "{s}{s}";


## anonymous function argument types

When anonymous function literals are passed as arguments to a function or method and an unambiguous overload match can be made without knowing the exact function type, the compiler can figure out the argument types based on the matching overload.

```ghul
[1, 2, 2, 4, 5] | .filter(i => i > 3);
```
In this example, `self` is already known to be `Pipe[int]`, so `Pipe[int].filter(predicate: int -> bool) -> Pipe[int]` is the only overload that could match. Hence the `predicate` argument must be `int -> bool` and the type of `i` must be `int`
