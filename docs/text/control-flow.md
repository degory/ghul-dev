# control flow in ghūl

> **editable examples**
>
> Every example on this page can be edited and run here: click the pencil to open it in an editor, change it, and run it in your browser. Errors, hovers and completions come from the ghūl compiler as you type.
>
> The [ghul-examples repository](https://github.com/degory/ghul-examples/tree/main/examples/control-flow) has fuller control-flow examples to build and run locally, in a GitHub Codespace or a dev container.

## block scope

In ghūl, most control flow statements incorporate one or more blocks. A block is a list of one or more statements that forms a scope for local variable definitions. The scope of a variable is the region of code where that variable is visible and can be accessed.
Blocks are delimited by keywords that are specific to their control flow statement. For example, if-then statements use `then` and `else`, `elif` or `fi` to delimit their blocks, while loops use `do` and `od`, and so on.
Variables defined within a block are only accessible within that block and any nested blocks. Once execution exits the block, those variables go out of scope and cannot be accessed anymore.

## assert statement

In ghūl the `assert` statement is used to ensure an expected condition holds and to throw an exception if it does not. An assert statement starts with `assert`, followed by an expression that must evaluate to a bool, followed by `else`, and then a value to throw. If the value to throw is a string, it will be wrapped in an `AssertionFailedException`. Otherwise it must be of a throwable type.

```ghul
…
assert true else "all bets are off"; // does not throw

let list = [1, 2, 3, 4, 5];

assert 3 < list.count
    else System.ArgumentOutOfRangeException("list");

write_line("ok: {list.count} elements");
```

output:

```
ok: 5 elements
```

`assert` is also an expression. `assert cond else "msg" in expr` guards a value and chains like `let x in expr`: a failing assert throws, a passing one yields the trailing expression. Any narrowing the condition establishes flows into that expression, so a value checked present reads directly there:

```ghul
…
length_of(key: string?) -> int =>
    assert ► key? else "key is null" in
    key.length;

write_line(length_of("hello"));
```

output:

```
5
```

## if statement

If statements allow the execution of different code blocks based on specific conditions. An `if` is also an expression that yields the value of its chosen branch; see [if as an expression](https://ghul.dev/expressions#conditional).

### if-then-fi

This is the simplest form of a conditional statement. It checks a condition and executes the subsequent block of code if the condition is true.

```ghul
if condition then
    // code to execute if condition is true
fi
```

```ghul
…
let list = [1, 2, 3, 4];

if list.count > 0 then
    write_line("list has {list.count} elements");
fi
```

output:

```
list has 4 elements
```

### if-then-else-fi

This form allows for an alternative block of code to be executed if the condition is false.

```ghul
if condition then
    // code to execute if condition is true
else
    // code to execute if condition is false
fi
```

```ghul
…
if list.count > 0 then
    write_line("list is not empty");
else
    write_line("list is empty");
fi
```

output:

```
list is not empty
```

### if-then-elif-fi

This form is used for multiple conditions. If the initial condition is false, the `elif` conditions are checked in order. The corresponding block for the first true condition is executed.

```ghul
if first_condition then
    // code for first condition
elif second_condition then
    // code for second condition
// ... (more elif conditions if needed) ...
else
    // code if all conditions are false
fi
```

```ghul
…
let list = [1, 2, 3, 4];

if list.count == 0 then
    write_line("list is empty");
fi

if list.count > 0 then
    write_line("list is not empty");
else
    write_line("list is empty");
fi

if list.count > 10 then
    write_line("list has lots of elements");
elif list.count > 5 then
    write_line("list has some elements");
elif list.count > 0 then
    write_line("list has a few elements");
else
    write_line("list is empty");
fi
```

output:

```
list is not empty
list has a few elements
```

### type narrowing

An `if` condition that proves something stronger about a value - an `isa` test on a class or union variant, a `?` presence test on an optional - narrows the value to the stronger type inside the branch, and a guard that leaves the block narrows the code after it. [Type narrowing](https://ghul.dev/type-narrowing.html) covers this in full: locals, parameters, member-access paths, how long each narrow lasts, and the purity inference behind it.

### if let

`cast T?(x)` views `x` as type `T`, and yields null (rather than throwing) when `x` is not a `T`. A cast followed by a presence test is therefore a safe, explicit type test:

```ghul
…
let c = cast CAT?(a);

if ► c? then
    write_line(c.purr());
fi
```

output:

```
whiskers purrs
```

`if let` folds that into the `if` itself: it puts a `let` definition in the condition of an `if` or `elif`. The then-branch runs only when the value is present, with the variable in scope (and narrowed) just within that branch:

```ghul
…
if let c: CAT = ► a then
    // c has type CAT here; it is not in scope in
    // the else branch, or after the fi
    write_line(c.purr());
else
    write_line("not a cat");
fi
```

output:

```
whiskers purrs
```

A type on the variable (`c: CAT`) makes it a type test. `elif let` chains these, so a sequence of type tests reads as one construct:

```ghul
…
if let c: CAT = ► a then
    write_line(c.purr());
elif let d: DOG = ► a then
    write_line(d.bark());
else
    write_line("some other animal");
fi
```

output:

```
rover barks
```

With no type given for the local variable, `if let` tests that the value is present. This is the natural way to consume an [optional type](https://ghul.dev/language-basics.html#optional-types): the local variable has the non-optional type within the then-branch, so there is no need for an explicit `!`.

```ghul
…
if let line = reader.read_line() then
    // reader.read_line() yields string?;
    // line is string here
    write_line("read: {line}");
else
    write_line("end of input");
fi
```

output:

```
read: the only line
```

An `if let` can also destructure, exactly like a plain `let`, including `_` to discard a field that is not needed:

```ghul
…
if let (name, _) = lookup(id) then
    write_line("found {name}");
fi
```

output:

```
found ada
```

A trailing `/\` guard gates the branch on a further condition, evaluated with the new variable already in scope:

```ghul
…
if let c: CAT = find() /\ c.is_friendly then
    write_line("friendly cat: {c.name}");
fi
```

output:

```
friendly cat: Tom
```

Several comma-separated clauses can appear in one `if let`; every clause's test and any guard must pass, and later clauses see the variables the earlier ones introduced, as in `if let outer = holder, inner = outer.value then`. A destructure leaf can also be a literal - an integer, string, character, boolean, `null`, or a qualified enum member - which adds an equality test at that position rather than introducing a variable, so `if let (1, name) = pair then` matches only when the first element is 1. Literal leaves are allowed only in refutable positions like `if let` and `case`.

When the tested value is a member path and the local should take the path's last name, the `name =` can be dropped: `if let order.customer` introduces `customer` holding `order.customer` and enters the branch when it is present, and `if let zoo.pet: CAT` does the same with a type test. A trailing `?` on the presence form (`if let order.customer?`) is accepted but not required.

```ghul
…
if let order.customer then
    write_line(customer.name);
fi
```

output:

```
mimi
```

### scope
Each branch of an if statement constitutes a separate scope

```ghul
…
let a = 5;

if a > 0 then
    // new scope - neither y nor z are in scope here
    let x = 10;
    write_line("x is {x}");
elif a < 0 then
    // new scope - neither x nor z are in scope here
    let y = 20;
    write_line("y is {y}");
else
    // new scope - neither x nor y are in scope here
    let z = 30;
    write_line("z is {z}");
fi
```

output:

```
x is 10
```

## while statement

### while-do-od
The while loop in ghūl executes a block of code repeatedly as long as a specified condition remains true. The condition is evaluated before each iteration of the loop's body.

```ghul
while condition do
    // code to execute while the condition is true
od
```

```ghul
…
let counter mut = 0;
while counter < 5 do
    write_line(counter);
    counter = counter + 1;
od
```

output:

```
0
1
2
3
4
```

This loop prints numbers from 0 to 4. It terminates when counter becomes 5, as the condition counter < 5 then evaluates to false.

### break and continue in while loops
The `break` statement immediately exits the loop, while `continue` skips the remaining code in the current iteration and proceeds to the next iteration immediately before the condition is reevaluated.

```ghul
…
let counter mut = 0;
while counter < 10 do
    if counter == 5 then
        break;
    fi
    write_line(counter);
    counter = counter + 1;
od
```

output:

```
0
1
2
3
4
```

This loop exits when counter reaches 5 without proceeding to execute `write_line(counter)`


```ghul
…
let counter mut = 0;
while counter < 5 do
    counter = counter + 1;
    if counter == 3 then
        continue;
    fi
    write_line(counter);
od
```

output:

```
1
2
4
5
```

This loop skips the call to `write_line` when counter is 3.

`break` and `continue` behave the same way in `for` and `do` loops, so they are not shown again below.

### while let

`while let` is the loop form of `if let`: the loop runs while the refutable pattern matches, with the bound names fresh on each iteration. It takes the same shapes as `if let` - bare presence, type ascription, destructure, `/\` guards, and comma-separated clauses:

```ghul
…
while let n = c.next() do
    write_line(n);
od
```

output:

```
3
2
1
```

A `while` condition also narrows its body the same way an `if` condition narrows its then-branch, so `while isa CAT(a) do a.purr() od` reaches a `CAT`-only member without an inner cast.

## for statement

### for-in-do-od
The for loop in ghūl steps through an iterable object executing the loop body once for every value the iterator produces. An iterable object is something that implements either `Collections.Iterable[T]` or `Collections.Iterator[T]`, and the loop variable's type is inferred to be `T`.

```ghul
for variable in iterable do
    // variable is set to each element of iterator in turn
od
```

The variable is defined by the for loop and its scope is the for loop body from the `do` up to the `od`


```ghul
…
// i not in scope here
// i defined here
for i in [1, 2, 3, 4, 5] do
    // i in scope here:
    write_line(i);
od
```

output:

```
1
2
3
4
5
```

### range operators

The `..` and `::` operators construct integer ranges that can be iterated over by for statements. `..` constructs ranges that are inclusive of its left operand and exclusive of its right operand:

```ghul
…
for i in 0..5 do
    // i will take values 0, 1, 2, 3, 4 in sequence
    write_line(i);
od
```

output:

```
0
1
2
3
4
```

`::` constructs a range that is inclusive of its left and right operands:

```ghul
…
for i in 1::5 do
    // i will take values 1, 2, 3, 4, 5 in sequence
    write_line(i);
od
```

output:

```
1
2
3
4
5
```

These operators are not for loop specific and can be used in any expression context

```ghul
…
let zero_to_four = 0..5;
let five_to_nine = 5..10;

let zero_to_nine = zero_to_four | .cat(five_to_nine);

while zero_to_nine.move_next() do
    write_line(zero_to_nine.current);
od
```

output:

```
0
1
2
3
4
5
6
7
8
9
```

### scope

The loop variable is in scope within the loop body but not within the expression that provides the iterable object. `continue` in a `for` loop proceeds to the next iteration immediately before attempting to read the next element from the iterator.


## do statement

### do-od

The do / od loop in ghūl is used to create an indefinite loop which will continue to execute until explicitly broken with a break statement.

```ghul
do
    // code to execute indefinitely
    // break statement to exit loop
od
```

```ghul
…
let counter mut = 0;
do
    write_line(counter);
    counter = counter + 1;
    if counter == 5 then
        break;
    fi
od
```

output:

```
0
1
2
3
4
```

This loop will run indefinitely until counter reaches 5, at which point the break statement terminates the loop.


## case statement

`case` branches on a scrutinee value. Each `when` arm is introduced by `then`, an optional `else` catches the rest, and the construct closes with `esac`. There is no fall-through, and a `when` can list several values matched by equality:

```ghul
…
case value
when -1 then
    return "minus one";

when 0 then
    let result = "zero";
    return result;

when 1 then
    return "one";

when 2 then
    return "two";

when 3 then
    return "three";

when 4 then
    return "four";

when 5 then
    let result = "five";
    return result;

when 6, 7, 8, 9 then
    return "more than five and less than ten";

when 13 then
    return "unlucky";

else
    return "less than -1 or more than nine";
esac
si

write_line(classify(0));
write_line(classify(3));
write_line(classify(7));
write_line(classify(13));
write_line(classify(-5));
```

output:

```
zero
three
more than five and less than ten
unlucky
less than -1 or more than nine
```

`case` is also an expression: each arm's last expression is the arm's value, and the `case` evaluates to whichever arm matched:

```ghul
…
let label = case status
when 200 then "ok"
when 500, 501, 502 then "server error"
else "other"
esac;

write_line(label);
```

output:

```
server error
```

### pattern arms

A `when` arm can take a pattern instead of an equality list, mirroring [`if let`](#if-let): `when v: T then` type-tests and introduces the variable, `when (a, b) then` destructures, and `when _: T then` type-tests without introducing one. A bare identifier stays an equality test - `when v then` compares against the value of `v` in scope and introduces no new local:

```ghul
…
    case a
    when c: CAT then c.meow()
    when d: DOG then d.bark()
    esac;

write_line(describe(CAT()));
```

output:

```
meow
```

### exhaustiveness

A `case` over a closed domain - a union's variants, `bool`, an enum, or a class hierarchy closed to the assembly - is checked for exhaustiveness. A missing case warns (`non-exhaustive-case`), an arm that matches nothing the earlier arms left warns (`redundant-case-arm`), and an `else` that can never run warns (`dead-case-else`). An expression-position `case` over an open domain needs an `else`, unless the expected type has a default value to fall back on.

### scope

Each arm of the case statement, delimited by either a `when` clause or `else`, forms a separate scope for local variable definitions.


## throw statement

The `throw` statement raises an exception. Control leaves the current block immediately and passes to the nearest enclosing `catch` that handles the exception's type. If there is no such `catch`, the exception propagates out through the calling functions, and out of the program if it is never caught.

```ghul
withdraw(balance: int, amount: int) -> int is
    if amount > balance then
        throw System.InvalidOperationException(
            "insufficient funds"
        );
    fi

    return balance - amount;
si
```

The thrown value must be an exception: `System.Exception`, or a type derived from it.

### exception types

An exception is any class that derives from `System.Exception`, or from a more specific exception type:

```ghul
class INSUFFICIENT_FUNDS_EXCEPTION(message: string): System.Exception is
    super(message);
si
```

```ghul
…
try
    withdraw(account, 100);
catch e: INSUFFICIENT_FUNDS_EXCEPTION
    write_line("declined: {e.message}");
yrt
```

output:

```
declined: only 50 available
```


## try statement

### try-catch-finally-yrt

The try-catch-finally-yrt block in ghūl consists of four parts:

* try block: the block where code that might throw an exception is placed.
* exception to catch: exceptions that are assignment compatible with this class will be caught and control will enter the catch block
* catch block: this code block catches and handles exceptions. It takes an exception variable and a type.
* finally block: this code block is executed after the try and catch blocks, regardless of whether an exception was thrown or not. It is typically used for clean-up code.

```ghul
try
    // Code that might throw an exception
catch e: SomeExceptionType
    // Exception handling code
finally
    // Clean-up code, always executed
yrt
```

If different types of exception should be caught, then there can be multiple exception clauses and catch blocks

```ghul
let reader mut: StreamReader;

try
    reader = StreamReader("file.txt");
    let content = reader.read_to_end();

    write_line(content);

catch e: FileNotFoundException
    // Handle the case where the file is not found
    write_line("Error: file not found: {e.message}");
catch e: IOException
    // Handle errors during file reading
    write_line("Error: reading file: {e.message}");
finally
    // Close the file and clean up resources
    if reader? then
        reader.close();
    fi

    write_line("File processing completed, file closed.");
yrt
```

### try-catch-yrt

The finally clause can be omitted if no clean-up is required

```ghul
try
    // Code that might throw an exception
catch e: SomeExceptionType
    // Exception handling code
yrt
```

```ghul
try
    let content = File.read_all_text("file.txt");
    write_line(content);

    write_line("File processing completed.");
catch e: FileNotFoundException
    // Handle the case where the file is not found
    write_line("Error: file not found: {e.message}");
catch e: IOException
    // Handle errors during file reading
    write_line("Error: reading file: {e.message}");
yrt
```

### try-finally-yrt

The catch clause can be omitted if no exceptions need to be caught but clean-up is still required

```ghul
try
    // Code that might throw an exception
finally
    // Clean-up code, always executed
yrt
```

```ghul
let reader mut: StreamReader;

try
    reader = StreamReader("file.txt");

    let content = reader.read_to_end();
    write_line(content);

    write_line("File processing completed.");

finally
    if reader? then
        reader.close();
    fi

    // Any exceptions will be thrown to the calling code
yrt
```

### finally and return

A `finally` block runs whenever control leaves the `try` block, including when the `try` block, or a `catch` block, executes a `return`. The `finally` block runs first, then control returns to the caller:

```ghul
read_file(path: string) -> string is
    let reader = StreamReader(path);

    try
        return reader.read_to_end();
    finally
        reader.close(); // runs before the function returns
    yrt
si
```

## return statement

### return without value

In functions of void return type, a bare `return` statement with no value returns control flow directly to the caller  

```ghul
tries: int;
…
try_something(limit: int) is
    if tries > limit then
        return; // give up
    fi

    tries = tries + 1;

    // do stuff
si
```

### return value

In functions of non-void return type, `return` statements must return a value of a type that's assignment compatible with the function's return type

```ghul
…
fib(n: int) -> int is
    if n < 0 then
        return 0;
    elif n == 1 then
        return 1;
    else
        return fib(n - 1) + fib(n - 2);
    fi
si

for i in 0::10 do
    write_line("fib({i}) = {fib(i)}");
od
```

output:

```
fib(0) = 0
fib(1) = 1
fib(2) = 1
fib(3) = 2
fib(4) = 3
fib(5) = 5
fib(6) = 8
fib(7) = 13
fib(8) = 21
fib(9) = 34
fib(10) = 55
```

### default return

If execution reaches the end of a non-void function without encountering a return statement, then the default value of the function's return type is returned to the caller.

```ghul
…
default_return() -> int is
    // do nothing, return 0
si
let i = default_return();
assert i == 0;
write_line("default return value is {i}");
```

diagnostics:

- warning: [definite-return] function may not return a value on all paths

output:

```
default return value is 0
```

## asynchronous code and generators

`await` suspends a function until a task completes, and `yield` suspends a generator until the next element is asked for. Both are covered on [async and generators](https://ghul.dev/async-and-generators.html).
