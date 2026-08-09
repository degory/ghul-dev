# unions and pattern matching

> **runnable examples**
>
> The ghul-examples repository has fuller, runnable [unions](https://github.com/degory/ghul-examples/tree/main/examples/unions) and [pattern-matching](https://github.com/degory/ghul-examples/tree/main/examples/pattern-matching) examples. Open it in a GitHub Codespace or a dev container to build and run them. Any example on this page can also be pasted into the [ghūl scratchpad](https://github.com/degory/ghul-scratchpad)'s `main.ghul` and run with `dotnet run`.

A union holds a value of one of several variants, each with its own set of fields: one type that represents several kinds of data. Pattern matching is how that data comes back out - test which variant a value holds, and read its fields at the narrowed type. The [definitions page](https://ghul.dev/definitions.html#unions) covers the full declaration surface - unit variants, the `default` variant, primary-constructor headers, and traits; this page is about using them.

```ghul
union Shape is
    CIRCLE(radius: double);
    SQUARE(side: double);
si

union Option[T] is
    SOME(value: T);
    NONE;
si

union Result[T, E] is
    OK(value: T);
    ERROR(error: E);
si
```

## testing and narrowing a variant

Accessing the data held by a union's variant requires first checking which variant the union currently holds. An `isa Variant(value)` test checks the variant and, in the then-branch, narrows the value to it so the variant's fields are reachable:

```ghul
…
if isa Option.SOME( ► an_option) then
    let value = an_option.value;
    write_line("the option holds {value}");
fi
```

output:

```
the option holds 42
```

## option-shaped unions

Unions shaped like `Option` types - a single field-carrying variant, or one variant marked `default` - support the `?` and `!` operators, for testing whether they hold a value and for unwrapping it:

```ghul
…
if ► an_option? then
    let value = an_option!;
    write_line("the option holds {value}");
fi
```

output:

```
the option holds 42
```

```ghul
use IO.Std.write_line;

union Option[T] is
    SOME(value: T);
    NONE;
si

union List[T] is
    NIL;
    CONS(head: T, tail: List[T]);
si

union Tree[T] is
    LEAF(value: T);
    NODE(left: Tree[T], right: Tree[T]);
si

use Option.SOME;
use Option.NONE;
use List.NIL;
use List.CONS;
use Tree.LEAF;
use Tree.NODE;

test_option();
test_list();
test_tree();

test_option() is
    let some_int = SOME(42);
    let none_int = NONE();

    let stringify_option = o rec =>
        if isa SOME( ► o) then
            "{o.value}"
        else
            "none"
        fi;

    write_line(stringify_option(some_int));
    write_line(stringify_option(none_int));
si

test_list() is
    let list = CONS(1, CONS(2, CONS(3, NIL())));

    let stringify_list = l rec =>
        if isa CONS( ► l) then
            let (head, tail) = l in
            "{head}, {rec(tail)}"
        else
            "nil"
        fi;

    write_line(stringify_list(list));
si

test_tree() is
    let tree = NODE(
        NODE(
            LEAF(1),
            LEAF(2)
        ),
        NODE(
            LEAF(3),
            LEAF(4)
        )
    );

    let stringify_tree = t rec =>
        if isa NODE( ► t) then
            let (left, right) = t in
            "({rec(left)}, {rec(right)})"
        else
            "{t.value}"
        fi;

    write_line(stringify_tree(tree));
si
```

output:

```
42
none
1, 2, 3, nil
((1, 2), (3, 4))
```

`Option` here is a union built from scratch to show how the shape works, but everyday code rarely needs to: ghūl's own optional types (`T?`) give you this for free, over reference types, value types, and unconstrained generic types alike - see [optional types](https://ghul.dev/optional-types) for the full picture, including how a user-defined union like this one fits alongside the built-in representations.

## matching with if let

Discovering which variant a union holds, and branching on the result, is done with `if let`: a `let` definition in an `if` / `elif` condition, where the branch runs only on a match, with the variable narrowed and in scope:

```ghul
union Shape is
    CIRCLE(radius: double);
    SQUARE(side: double);
si
…
area(s: Shape) -> double is
    if let c: CIRCLE = ► s then
        return 3.14159d * c.radius * c.radius;
    elif let q: SQUARE = ► s then
        return q.side * q.side;
    fi

    return 0.0d;
si
```

`isa` variant tests and `else`-branch narrowing cover the same ground; see [type narrowing](https://ghul.dev/type-narrowing.html) for the full picture.

## matching with case

A `case` expression matches one scrutinee against several `when` arms, which reads better than a chain of `if let`/`elif let` once there are more than a couple of variants to cover. Over a closed domain - a union's variants, `bool`, an enum, or a class hierarchy closed to the assembly - the compiler checks the arms for exhaustiveness, so `area` needs no fallback return for a variant the `when` arms forgot:

```ghul
…
area(s: Shape) -> double =>
    // case over a union is checked for exhaustiveness: every variant
    // is covered here, so no else arm is needed
    case s
    when c: CIRCLE then 3.14159d * c.radius * c.radius
    when q: SQUARE then q.side * q.side
    esac;

write_line("{area(CIRCLE(2.0d))}");
write_line("{area(SQUARE(3.0d))}");
```

output:

```
12.56636
9
```

`when` arms accept the same patterns as `if let` - a type test that binds and narrows (`c: CIRCLE`), destructuring, and literal leaves - so `case` is the exhaustive counterpart to `if let` rather than a different matching mechanism. See [the case statement](https://ghul.dev/control-flow.html#case-statement) for the full picture.
