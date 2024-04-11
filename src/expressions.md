# expressions

Expressions in ghūl are constructs that evaluate to a value. They can be used to perform calculations, make comparisons, and combine values in various ways.

## literals

Literal expressions represent fixed values of a specific type.

```ghul
let integer_literal = 42;
let floating_point_literal = 3.14;
let string_literal = "Hello, world!";
let boolean_literal_true = true;
let boolean_literal_false = false;
```

## arithmetic

Arithmetic expressions allow you to perform mathematical calculations using operators such as `+`, `-`, `*`, `/`, and `%`.

```ghul
let sum = 10 + 5;           // Addition
let difference = 10 - 5;    // Subtraction
let product = 10 * 5;       // Multiplication
let quotient = 10 / 5;      // Division
let remainder = 10 % 3;     // Modulo (remainder)
```

## comparison

Comparison expressions allow you to compare values using operators such as `==`, `!=`, `<`, `>`, `<=`, and `>=`.

```ghul
let equal = 5 == 5;              // Equality
let not_equal = 5 != 10;         // Inequality
let less_than = 5 < 10;          // Less than
let greater_than = 10 > 5;       // Greater than
let less_than_or_equal = 5 <= 5; // Less than or equal to
let greater_than_or_equal = 10 >= 10; // Greater than or equal to
```

## short circuit logical

Logical expressions allow you to combine or negate boolean values using the `&&` (logical AND), `||` (logical OR), and `!` (logical NOT) operators.

```ghul
let logical_and = true /\ false;    // Logical AND
let logical_or = true \/ false;     // Logical OR
let logical_not = !true;            // Logical NOT
```

Evaluation stops as soon as the result is known

## conditional

Conditional expressions allow you to evaluate different expressions based on a condition using the `if`-`then`-`else` construct.

```ghul
let max = if a > b then a else b fi;
```

## function call

Function call expressions allow you to invoke functions and methods by providing the necessary arguments.

```ghul
let result = sum(10, 5);
```

## property access

Property access expressions allow you to access the properties of an object using the dot notation.

```ghul
let length = "Hello".length;
```

## indexer

Indexer expressions allow you to access elements of an array or collection using square brackets.

```ghul
let first_element = [1, 2, 3][0];
```

## constructor

Constructor expressions allow you to create new instances of classes or structs by invoking their constructors.

```ghul
let point = POINT(10, 20);
```

## type cast

Type cast expressions allow you to explicitly convert a value from one type to another using the `cast` keyword.

```ghul
let integer_value = cast int(3.14);
```

These are the main types of expressions in ghūl. They can be combined and nested to form more complex expressions and statements:


```ghul
entry() is
    let x = 10;
    let y = 5;
    let sum = x + y;
    let product = x * y;
    let is_greater = x > y;

    if is_greater then
        IO.Std.write_line("x is greater than y");
    else
        IO.Std.write_line("x is not greater than y");
    fi

    let numbers = [1, 2, 3, 4, 5];
    let first_number = numbers[0];

    IO.Std.write_line("The first number is: {first_number}");
si
```
