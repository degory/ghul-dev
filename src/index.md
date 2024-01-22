<!-- ---
{
  "home": true,
  "heroImage": "https://v1.vuepress.vuejs.org/hero.png",
  "tagline": "ghūl programming language docs",
  "actionText": "Quick Start →",
  "actionLink": "/guide/",
  "features": [
    {
      "title": "Feature 1 Title",
      "details": "Feature 1 Description"
    },
    {
      "title": "Feature 2 Title",
      "details": "Feature 2 Description"
    },
    {
      "title": "Feature 3 Title",
      "details": "Feature 3 Description"
    }
  ],
  "footer": null
} -->

#  overview

(Note: this site is very much a **work-in-progress**. The [ghūl compiler](https://github.com/degory/ghul) is currently the definitive ghūl language reference)

## about the ghūl programming language

ghūl is mainly an opportunity for [me](https://github.com/degory) to experiment with programming language design. Apart from a slightly quirky syntax, ghūl is a fairly conventional programming language. Although it is a hobby project maintained by a single person, its goal is to be sufficiently expressive for general-purpose development. The [ghūl compiler](https://github.com/degory/ghul) itself is written in ghūl.

## features

- **type safety**: ghūl enforces type safety at compile-time.

- **functional programming elements**: ghūl supports function literals, including anonymous functions, lambdas, and closures.

- **OOP**: ghūl supports classes, objects, inheritance, polymorphism, and other Object-Oriented Programming concepts.

- **error handling**: the language includes try/catch/finally for error handling.

- **generics**: ghūl types, methods, and functions can have generic type parameters.

- **.NET integration**: ghūl targets .NET, producing and consuming NuGet packages and supporting inter-operation with other .NET languages.

## examples

### hello world!

```ghul
entry() =>
    IO.Std.write_line("hello world"); 
```

### functional

```ghul
use IO.Std.write_line;

entry() is
    let add = (x: single, y: single) => x + y;
    let subtract = (x: single, y: single) => x - y;
    let multiply = (x: single, y: single) => x * y;
    let divide = (x: single, y: single) => x / y;

    let calc = (x: single, y: single, operation: (single, single) -> single) => operation(x, y);

    let a = 10.0;
    let b = 5.0;

    write_line("Addition: " + calc(a, b, add));
    write_line("Subtraction: " + calc(a, b, subtract));
    write_line("Multiplication: " + calc(a, b, multiply));
    write_line("Division: " + calc(a, b, divide));
si
```

### OOP
```ghul
use IO.Std.write_line;

class Calculator is
    init() is
    si

    add(x: single, y: single) -> single is
        return x + y;
    si

    subtract(x: single, y: single) -> single is
        return x - y;
    si

    multiply(x: single, y: single) -> single is
        return x * y;
    si

    divide(x: single, y: single) -> single is
        if y != 0.0 then
            return x / y;
        else
            throw new System.DivideByZeroException("Error: Division by zero");
        fi
    si
si

entry() is
    let calc = new Calculator();

    let a = 10.0;
    let b = 5.0;

    write_line("Addition: " + calc.add(a, b));
    write_line("Subtraction: " + calc.subtract(a, b));
    write_line("Multiplication: " + calc.multiply(a, b));
    write_line("Division: " + calc.divide(a, b));
si
```

### literals

```ghul
use IO.Std.write_line;

entry() is
    assert "string literal".get_type() == typeof string;
    write_line("string literal");

    assert 'c'.get_type() == typeof char;
    write_line("char literal: " + 'c');

    assert 123 .get_type() == typeof int;
    write_line("integer literal: " + 123);

    assert 123_456.789e6D .get_type() == typeof double;
    write_line("double literal: " + 123_456.789e6D);

    assert ("three", "string", "tuple").get_type() == typeof (string,string,string);
    write_line("tuple literal: " + ("three", "string", "tuple"));

    assert ["a", "four", "element", "list"].get_type() == typeof string[];
    write_line("list literal: " + ["a", "four", "element", "list"]|);
si
```

### control flow
```ghul
use IO.Std.write_line;

entry() is
    // ghul has basic flow control statements

    // assert tests a condition, and throws an exception if the condition does not hold:
    assert 1 == 1;
    assert 3 > 2;

    // the optional assert else clause supplies a message to include in any thrown exception:
    assert true else "who knows what to believe?";

    // or a specific object to throw:
    assert 1 < "hello".length else new System.IndexOutOfRangeException();
    
    if true then
        assert true;
        write_line("");
    fi    

    if false \/ true then
        write_line("false or-else true");
    else
        assert false;
    fi
    
    let i = 0;
    while i < 10 do
        assert i < 10;
        i = i + 1;
    od

    assert i == 10;

    let count = 0;

    for i in 0..10 do
        assert i >= 0 /\ i < 10;

        count = count + 1;
    od

    assert count == 10;

    // 0..10 is not for loop specific syntax, '..' is just an operator that constructs
    // an iterable integer range:

    let range = 0..100;

    assert range.from == 0;
    assert range.to == 100;

    assert range | .count() == 100;

    // for can iterate over anything that implements Iterable[T], Iterator[T], or move_next() and current:
    for ci in "hello" | .index() do
        write_line("char {0} of 'hello' is {1}", [ci.index, ci.value]);
    od    
    
    try
        assert "wombat" =~ "elephant";
    catch ex: System.Exception
        assert ex.get_type() == typeof Ghul.AssertFailedException;

        write_line("caught: " + ex);
    yrt

    // try finally for ensuring clean-up code is run:

    let is_resource_in_use = false;
    try
        is_resource_in_use = true;
        write_line("resource acquired");
        throw new System.Exception("oops: exception with resource held");
    catch ex: System.Exception
        write_line("caught: " + ex);
    finally
        is_resource_in_use = false;
        write_line("resource released");
    yrt

    assert !is_resource_in_use;
    
    IO.Std.write_line("done");
si
```

### generics
```ghul
use IO.Std.write_line;
use Collections;

count_things[E](things: Iterable[E]) -> int is
    let count = 0;

    for thing in things do
        count = count + 1;
    od

    return count;
si

trait Sack[T] is
    add(thing: T);
    count() -> int;
si

class SACK[T]: Sack[T] is
    _things: MutableList[T];

    init() is
        _things = new LIST[T]();
    si

    add(thing: T) is
        _things.add(thing);
    si

    count() -> int is
        return _things.count;
    si
si

demonstrate_sack[T](sack: Sack[T], things: Iterable[T]) is
    for thing in things do
        sack.add(thing);
    od

    write_line("sack has " + sack.count() + " things");
si

entry() is
    let int_things = [1, 2, 3, 4, 5];
    let string_things = ["one", "two", "three", "four", "five"];

    write_line("int_things has " + count_things(int_things) + " things");
    write_line("string_things has " + count_things(string_things) + " things");

    demonstrate_sack(new SACK[int](), int_things);
    demonstrate_sack(new SACK[string](), string_things);
si
```


### closures
```ghul
use IO.Std.write_line;
use Collections.LIST;

entry() is
    // f is an anonymous function:
    let f = (i: int) => i * 2;

    // its type is int -> int
    assert f.get_type() == typeof int -> int;

    // it returns its integer argument times two:
    assert f(123) == 123 * 2;

    for i in 1::10 do
        write_line("f({0}) = {1}", [i, f(i)]: object);
    od

    // list_of_gs is a list of 2-tuples, each one having an integer and a function element:
    let list_of_gs = new LIST[(i: int, g: () -> int)]();

    for i in 1::10 do
        // create a function that captures a value - in this case the loop variable i
        let g = () => i;

        // g is a parameterless function that returns an int:
        assert g.get_type() == typeof () -> int;

        // when we call g, it returns the value of i when g was created:
        assert g() == i;

        // store that function in our list for use later:
        list_of_gs.add((i, g));

        // the last value in the list is the tuple we just added:
        assert list_of_gs[list_of_gs.count-1] == (i, g);
    od

    for ig in list_of_gs do
        // each saved g still returns the same value of i that
        // it captured when it was created:
        assert ig.i == ig.g();

        write_line("g that captured i when it was {0} is a {1} that returns {2}", [ig.i, ig.g, ig.g()]);
    od
si
```

### pipes
```ghul
// make a type available in this scope without qualification
use Collections.Iterable;

// and a static method:
use IO.Std.write_line;

entry() is
    // ghūl has anonymous functions:
    let f = (i: int) -> string => "i is " + i;
    write_line("f(123) = " + f(123));
    
    // anonymous functions infer their return type, if it is not explicit:
    let g = (j: int) => "j is " + j;
    write_line("g(456) = " + g(456));

    // anonymous functions can have a block body:
    let h = (k: int) is
        let result = "k is ";
        result = result + k;
        return result;  
    si;

    write_line("h(789) = " + h(789));

    // anonymous functions can capture values from outer lexical scopes -
    // in this case the anonymous functions f, g and h are captured:
    let closure = (i: int, j: int, k: int) => f(i) + ", " + g(j) + ", " + h(k);
    write_line("captured values: " + closure(111, 222, 333));

    // anonymous functions can be nested, and their frames live on after they return:
    let outer = () is
        let message = "hello";

        let middle = () is
            let inner = () => message;

            return inner;                        
        si;

        return middle;
    si;
    
    let hello_inner_from_outer = outer()()();
    write_line("call inner() returned by outer(): " + hello_inner_from_outer);           

    // '[' and ']' construct an immutable list (Collections.List[T], where T is inferred from the element type):
    let list = [1, 2, 3, 4, 5, 6];
    write_line("list: " + list |);

    // '..' constructs an iterable integer range, inclusive of the first element and exclusive of the last:
    let exclusive_range = 0..10;
    write_line("exclusive int range: " + exclusive_range |);

    // '::' constructs an iterable integer range, inclusive of the first and last elements:
    let inclusive_range = 1::10;
    write_line("inclusive int range: " + inclusive_range |);

    // the '|' postfix operator converts a Collections.Iterable[T] into a Pipes.Pipe`1[T]
    // Pipe`1[T] provides a number of ways to manipulate a sequence of elements

    // filter passes only those elements that meet a supplied filter condition.Collections
    let even = (1::8) | .filter(i => is_even(i));
    write_line("even numbers: " + even);

    // you generally don't need explicit argument types for anonymous functions when they're
    // passed as arguments, as their types can be inferred from context:
    let odd = [1, 2, 3, 4, 5, 6, 7, 8] | .filter(i => is_odd(i));
    write_line("odd numbers: " + odd);

    // map transforms elements according to a supplied function:
    let times_3 = [1, 2, 3, 4, 5, 6, 7, 8] | .map(i => i * 3);
    write_line("times 3: " + times_3);

    // if you hover the mouse over the call to map, you'll see the full inferred method signature:
    let strings = (1..9) | .map(i => "'" + i + "'");
    write_line("map to strings: " + strings);

    let strings_with_lengths =
            ["one", "two", "three", "four", "horse", "weevil", "six"] |
            .map(s => (s, s.length));

    write_line("strings with lengths: " + strings_with_lengths);

    // pipes are iterable, so you can loop over them with 'for':
    for iv in [1, 2, 3] | .map(i => i * 3).index() do
        write_line("result #" + (iv.index + 1) + " is " + iv.value);
    od

    // strings are iterable:
    let upper = "hello world" | .map(c => char.to_upper(c));
    write_line("upper cased: " + upper | .to_string(""));

    // reduce accumulates a running value according to a supplied function:
    let sum = [1, 2, 3, 4, 5, 6, 7, 8] | .reduce(0, (r, e) => r + e);
    write_line("sum is: " + sum);

    // you can chain multiple calls in a fluent style:
    let count_greater_than_3 = 
        [1, 2, 3, 4, 5, 6, 7, 8] |
            .filter(i => i > 3)
            .count();

    write_line("count of elements > 3 is: " + count_greater_than_3);

    let sum_double_odd = 
        [1, 2, 3, 4, 5, 6, 7, 8] | 
            .filter(i => is_odd(i))
            .map(i => i * 2)
            .reduce(0, (r, e) => r + e);

    write_line("sum of doubled odd numbers is: " + sum_double_odd);

    let first_3 = [1, 2, 3, 4, 5, 6, 7, 8] | .take(3);
    write_line("take first 3: " + first_3);

    let skip_3 = [1, 2, 3, 4, 5, 6, 7, 8] | .skip(3);
    write_line("skip first 3: " + skip_3);

    let three_from_middle = 
        [1, 2, 3, 4, 5, 6, 7, 8] | 
            .skip(3)
            .take(3);

    write_line("take 3 from the middle: " + three_from_middle);

    let sum_three_from_middle = 
        [1, 2, 3, 4, 5, 6, 7, 8] | 
            .skip(3)
            .take(3)
            .reduce(0, (r, e) => r + e);

    write_line("sum of 3 from the middle: " + sum_three_from_middle);

    // zip combines two sequences into a single sequence of pairs/2-tuples
    let zip = 
        [1, 2, 3, 4, 5, 6, 7, 8] | 
            .zip([8, 7, 6, 5, 4, 3, 2, 1]);

    write_line("zip of two sequences is: " + zip);

    // or into a sequence where each element is derived by passing the
    // left + right elements to a supplied function:
    let zip_map =
        [1, 2, 3, 4, 5, 6, 7, 8] | 
            .zip([8, 7, 6, 5, 4, 3, 2, 1], (l, r) => l + r);

    write_line("sum of zipped is: " + zip_map); 

    // cat concatenates two pipes into a single sequence
    let cat =
        [1, 2, 3, 4, 5, 6, 7, 8] |
            .cat([8, 7, 6, 5, 4, 3, 2, 1]);

    write_line("concatenated is: " + cat);

    // .index() tags each element with its 0-based index in the sequence:
    let indexed = ["cat", "dog", "fish", "zebra", "ameoba"] | .index();

    write_line("indexed: " + indexed);
si

is_odd(i: int) -> bool => i ∩ 1 != 0;
is_even(i: int) -> bool => i ∩ 1 == 0;
```
