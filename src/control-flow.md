# control flow in ghūl

## assert statement

In ghūl the `assert` statement is used to ensure an expected condition holds and to throw an exception if it does not. An assert statement starts with `assert`, followed by an expression that must evaluate to a bool, followed by `else`, and then a value to throw. If the value to throw is a string, it will be wrapped in an `AssertionFailedException`. Otherwise it must be of a throwable type.


```ghul
assert true else "all bets are off"; // should not throw
assert false else "expect AssertionFailedException";

let list = [1, 2, 3, 4, 5];

assert 3 < list.count else new ArgumentOutOfRangeException("list");
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
This loop exits when counter reaches 5.


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
This loop skips the write_line statement when counter is 3.

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

## try statement

### try-catch-finally-yrt

The try-catch-finally-yrt block in ghūl consists of four parts:

* try: The block where code that might throw an exception is placed.
* catch: This block catches and handles exceptions. It takes an exception variable and a type.
* finally: This block is executed after the try and catch blocks, regardless of whether an exception was thrown or not. It is typically used for clean-up code.
* yrt: Marks the end of the try-catch-finally block.

```ghul
try
    // Code that might throw an exception
catch e: SomeExceptionType
    // Exception handling code
finally
    // Clean-up code, always executed
yrt
```

```ghul
let reader: StreamReader;

try
    reader = new StreamReader("file.txt");
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
    reader = new StreamReader("file.txt");

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

