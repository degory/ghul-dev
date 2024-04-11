# generics

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

```ghul
print_something[T](t: T) => write_line("something is {t}")
```

```ghul
print_something[int](1234);
print_something[string]("hello");
```

```ghul
struct HOLD_SOMETHING[T] is
    value: T;

    init(value: T) is
        self.value = value;
    si
si
```

```ghul
let holds_int = HOLD_SOMETHING[int](1234);
let holds_string = HOLD_SOMETHING[string]("hello");
```

```ghul
union Option[T] is
    SOME(value: T);
    NONE;
si

let some_int = Option.SOME[int](1234);
```

Generic argument types are largely opaque: the operations permitted on values of generic argument types are limited to:
- storing in a variable
- passing as a method or function argument
- returning from a method or function
- method calls supported by `object`


Generic argument types must be explicitly specified when constructing objects but can be inferred from context for generic function and method calls

```ghul
print_something(1234); // T inferred as int
print_something("hello"); // T inferred as string
```

