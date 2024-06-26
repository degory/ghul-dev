# control flow in ghūl

## block scope

In ghūl, most control flow statements incorporate one or more blocks. A block is a list of one or more statements that forms a scope for local variable definitions. The scope of a variable is the region of code where that variable is visible and can be accessed.
Blocks are delimited by keywords that are specific to their control flow statement. For example, if-then statements use `then` and `else`, `elif` or `fi` to delimit their blocks, while loops use `do` and `od`, and so on.
Variables defined within a block are only accessible within that block and any nested blocks. Once execution exits the block, those variables go out of scope and cannot be accessed anymore.

## assert statement

In ghūl the `assert` statement is used to ensure an expected condition holds and to throw an exception if it does not. An assert statement starts with `assert`, followed by an expression that must evaluate to a bool, followed by `else`, and then a value to throw. If the value to throw is a string, it will be wrapped in an `AssertionFailedException`. Otherwise it must be of a throwable type.


```ghul
assert true else "all bets are off"; // should not throw
assert false else "expect AssertionFailedException";

let list = [1, 2, 3, 4, 5];

assert 3 < list.count else ArgumentOutOfRangeException("list");
```

## if statement

If statements allow the execution of different code blocks based on specific conditions. 

### if-then-fi

This is the simplest form of a conditional statement. It checks a condition and executes the subsequent block of code if the condition is true.

```ghul
if condition then
    // code to execute if condition is true
fi
```

```ghul
let list = [1, 2, 3, 4];

if list.count == 0 then
    write_line("list is empty");
fi
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
if list.count > 0 then
    write_line("list is not empty");
else
    write_line("list is empty");
fi
```

### if-then-elif-fi

This form is used for multiple conditions. If the initial condition is false, the `elif` conditions are checked in order. The corresponding block for the first true condition is executed.

```ghul
if first-condition then
    // code for first condition]
elif second-condition then
    // code for second condition]
... (more elif conditions if needed) ...
else
    // code if all conditions are false
fi
```

```ghul
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

### scope
Each branch of an if statement constitutes a separate scope

```ghul
let a = 5;

if a > 0 then
    // new scope - neither y nor z are in scope here
    let x = 10
elif a < 0 then
    // new scope - neither x nor z are in scope here
    let y = 20
else
    // new scope - neither x nor y are in scope here
    let z = 30;
fi
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
let counter = 0;
while counter < 5 do
    write_line(counter);
    counter = counter + 1;
od
```

This loop prints numbers from 0 to 4. It terminates when counter becomes 5, as the condition counter < 5 then evaluates to false.

### break and continue in while loops
The `break` statement immediately exits the loop, while `continue` skips the remaining code in the current iteration and proceeds to the next iteration immediately before the condition is reevaluated.

```ghul
let counter = 0;
while counter < 10 do
    if counter == 5 then
        break;
    fi
    write_line(counter);
    counter = counter + 1;
od
```
This loop exits when counter reaches 5 without proceeding to execute `write_line(counter)``


```ghul
let counter = 0;
while counter < 5 do
    counter = counter + 1;
    if counter == 3 then
        continue;
    fi
    write_line(counter);
od
```

This loop skips the call to `write_line` when counter is 3.

### scope

The block statement body of the while statement, delimited by `do` and `od` forms a scope for local variable definitions.

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
// i not in scope here
for i in [1, 2, 3, 4, 5] do // i defined here, with type `int`
    // i in scope here:
    write_line(i);
od
```
### range operators

The `..` and `::` operators construct integer ranges that can be iterated over by for statements. `..` constructs ranges that are inclusive of its left operand and exclusive of its right operand:

```ghul
for i in 0..5 do
    // i will take values 0, 1, 2, 3, 4 in sequence
    write_line(i);
od
```
`::` constructs a range that is inclusive of its left and right operands:

```ghul
for i in 1::5 do
    // i will take values 1, 2, 3, 4, 5 in sequence
    write_line(i);
od
```

These operators are not for loop specific and can be used in any expression context

```ghul
let zero_to_four = 0..5;
let five_to_nine = 5..10;

let zero_to_nine = zero_to_four | .cat(five_to_nine);

while zero_to_nine.has_next() do
    write_line(range.next())
od
```

### break and continue in for loops

The `break` statement immediately exits the loop, while `continue` skips the remaining code in the current iteration and proceeds to the next iteration immediately before attempting to read the next element from the iterator

```ghul
for counter in 0..10 do
    if counter == 5 then
        break;
    fi
    write_line(counter);
od
```
This loop exits when counter reaches 5, without proceeding to execute `write_line(5)`


```ghul
for counter in 0..5 do
    counter = counter + 1;
    if counter == 3 then
        continue;
    fi
    write_line(counter);
od
```
This loop skips the call to `write_line` when counter is 3.

### scope

The block statement body of the for statement, delimited by `do` and `od` forms a scope for local variable definitions. The loop variable is in scope within this block scope but not within the expression that provides the iterable object.


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
let counter = 0;
do
    write_line(counter);
    counter = counter + 1;
    if counter == 5 then
        break;
    fi
od
```
This loop will run indefinitely until counter reaches 5, at which point the break statement terminates the loop.

### break and continue in do-od loops

The break and continue statements work similarly in do / od loops as they do in while loops.

```ghul
let counter = 0;
do
    counter = counter + 1;
    if counter == 3 then
        continue;
    fi
    write_line(counter);
    if counter == 5 then
        break;
    fi
od
```
This loop skips the write_line statement when counter is 3 and breaks out of the loop when counter reaches 5.

### scope

The block statement body of the do statement, delimited by `do` and `od` forms a scope for local variable definitions.


## case statement

```ghul
case value
when -1:
    return "minus one";

when 0:
    let result = "zero";
    return result;

when 1:
    return "one";

when 2:
    return "two";

when 3:
    return "three";

when 4:
    return "four";

when 5:
    let result = "five";
    return result;

when 6, 7, 8, 9:
    return "more than five and less than ten";

when 13:
    return "unlucky";

default
    return "less than -1 or more than nine";
esac
```

### scope

Each arm of the case statement, delimited by either a `when` clause or `default` forms a separate scope for local variable definitions.


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
let reader: StreamReader;

try
    reader = StreamReader("file.txt");
    let content = reader.read_to_end();

    write_line(content);

catch e: FileNotFoundException
    // Handle the case where the file is not found
    write_line("Error: file not found: " + e.message);
catch e: IOException
    // Handle errors during file reading
    write_line("Error: reading file: " + e.message);
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
    write_line("Error: file not found: " + e.message);
catch e: IOException
    // Handle errors during file reading
    write_line("Error: reading file: " + e.message);
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
let reader: StreamReader;

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

## return statement

### return without value

In functions of void return type, a bare `return` statement with no value returns control flow directly to the caller  

```
let tries = 0;

...

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
fib(n: int) -> int is
    if n < 0 then
        return 0;
    elif n == 1 then
        return 1;
    else
        return fib(n - 1) + fib(n - 2);
    fi
si
```

### default return

If execution reaches the end of a non-void function without encountering a return statement, then the default value of the function's return type is returned to the caller.

```ghul
default_return() -> int is
    // do nothing, return 0
si

...

let i = default_return();
assert i == 0;
```
