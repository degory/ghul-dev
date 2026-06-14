# control flow in ghūl

::: tip runnable examples
The [ghul-examples repository](https://github.com/degory/ghul-examples/tree/main/examples/control-flow) has fuller, runnable control-flow examples. Open it in a GitHub Codespace or a dev container to build and run them.
:::

## block scope

In ghūl, most control flow statements incorporate one or more blocks. A block is a list of one or more statements that forms a scope for local variable definitions. The scope of a variable is the region of code where that variable is visible and can be accessed.
Blocks are delimited by keywords that are specific to their control flow statement. For example, if-then statements use `then` and `else`, `elif` or `fi` to delimit their blocks, while loops use `do` and `od`, and so on.
Variables defined within a block are only accessible within that block and any nested blocks. Once execution exits the block, those variables go out of scope and cannot be accessed anymore.

## assert statement

In ghūl the `assert` statement is used to ensure an expected condition holds and to throw an exception if it does not. An assert statement starts with `assert`, followed by an expression that must evaluate to a bool, followed by `else`, and then a value to throw. If the value to throw is a string, it will be wrapped in an `AssertionFailedException`. Otherwise it must be of a throwable type.

<GhulExample name="control-flow-1" />

## if statement

If statements allow the execution of different code blocks based on specific conditions. An `if` is also an expression that yields the value of its chosen branch; see [if as an expression](/expressions#conditional).

### if-then-fi

This is the simplest form of a conditional statement. It checks a condition and executes the subsequent block of code if the condition is true.

<GhulExample name="control-flow-2" />

<GhulExample name="control-flow-3" />

### if-then-else-fi

This form allows for an alternative block of code to be executed if the condition is false.

<GhulExample name="control-flow-4" />

<GhulExample name="control-flow-5" />

### if-then-elif-fi

This form is used for multiple conditions. If the initial condition is false, the `elif` conditions are checked in order. The corresponding block for the first true condition is executed.

<GhulExample name="control-flow-6" />

<GhulExample name="control-flow-7" />

### type narrowing

When an `if` predicate proves a stronger fact about a variable's type, the then-branch sees that variable at the narrower type. The most common case is an `isa` test, for a union variant or for a class:

<GhulExample name="control-flow-8" />

An [optional type](/language-basics.html#optional-types) narrows the same way. A `?` test in the predicate narrows the optional to its non-optional form in the then-branch, so the value can be used directly:

<GhulExample name="control-flow-9" />

For a two-variant union, the `else` branch is narrowed to the complementary variant:

<GhulExample name="control-flow-10" />

Narrowing is flow-sensitive: it follows the control flow rather than being confined to a branch body. If a guard rejects the narrower type and then leaves the enclosing block, by `return`, `throw`, `break` or `continue`, the code after the guard is narrowed:

<GhulExample name="control-flow-11" />

### if let

`cast T(x)` views `x` as type `T`, and yields null (rather than throwing) when `x` is not a `T`. A cast followed by a presence test is therefore a safe, explicit type test:

<GhulExample name="control-flow-12" />

`if let` folds that into the `if` itself: it puts a `let` definition in the condition of an `if` or `elif`. The then-branch runs only when the value is present, with the variable in scope (and narrowed) just within that branch:

<GhulExample name="control-flow-13" />

A type on the variable (`c: Cat`) makes it a type test. `elif let` chains these, so a sequence of type tests reads as one construct:

<GhulExample name="control-flow-14" />

With no type given for the local variable, `if let` simply tests that the value is present. This is the natural way to consume an [optional type](/language-basics.html#optional-types): the local variable has the non-optional type within the then-branch, so there is no need for an explicit `!`.

<GhulExample name="control-flow-15" />

An `if let` can also destructure, exactly like a plain `let`, including `_` to discard a field that is not needed:

<GhulExample name="control-flow-16" />

### scope
Each branch of an if statement constitutes a separate scope

<GhulExample name="control-flow-17" />

## while statement

### while-do-od
The while loop in ghūl executes a block of code repeatedly as long as a specified condition remains true. The condition is evaluated before each iteration of the loop's body.

<GhulExample name="control-flow-18" />

<GhulExample name="control-flow-19" />

This loop prints numbers from 0 to 4. It terminates when counter becomes 5, as the condition counter < 5 then evaluates to false.

### break and continue in while loops
The `break` statement immediately exits the loop, while `continue` skips the remaining code in the current iteration and proceeds to the next iteration immediately before the condition is reevaluated.

<GhulExample name="control-flow-20" />

This loop exits when counter reaches 5 without proceeding to execute `write_line(counter)`


<GhulExample name="control-flow-21" />

This loop skips the call to `write_line` when counter is 3.

### scope

The block statement body of the while statement, delimited by `do` and `od` forms a scope for local variable definitions.

## for statement

### for-in-do-od
The for loop in ghūl steps through an iterable object executing the loop body once for every value the iterator produces. An iterable object is something that implements either `Collections.Iterable[T]` or `Collections.Iterator[T]`, and the loop variable's type is inferred to be `T`.

<GhulExample name="control-flow-22" />

The variable is defined by the for loop and its scope is the for loop body from the `do` up to the `od`


<GhulExample name="control-flow-23" />

### range operators

The `..` and `::` operators construct integer ranges that can be iterated over by for statements. `..` constructs ranges that are inclusive of its left operand and exclusive of its right operand:

<GhulExample name="control-flow-24" />

`::` constructs a range that is inclusive of its left and right operands:

<GhulExample name="control-flow-25" />

These operators are not for loop specific and can be used in any expression context

<GhulExample name="control-flow-26" />

### break and continue in for loops

The `break` statement immediately exits the loop, while `continue` skips the remaining code in the current iteration and proceeds to the next iteration immediately before attempting to read the next element from the iterator

<GhulExample name="control-flow-27" />

This loop exits when counter reaches 5, without proceeding to execute `write_line(5)`


<GhulExample name="control-flow-28" />

This loop skips the call to `write_line` when counter is 3.

### scope

The block statement body of the for statement, delimited by `do` and `od` forms a scope for local variable definitions. The loop variable is in scope within this block scope but not within the expression that provides the iterable object.


## do statement

### do-od

The do / od loop in ghūl is used to create an indefinite loop which will continue to execute until explicitly broken with a break statement.

<GhulExample name="control-flow-29" />

<GhulExample name="control-flow-30" />

This loop will run indefinitely until counter reaches 5, at which point the break statement terminates the loop.

### break and continue in do-od loops

The break and continue statements work similarly in do / od loops as they do in while loops.

<GhulExample name="control-flow-31" />

This loop skips the write_line statement when counter is 3 and breaks out of the loop when counter reaches 5.

### scope

The block statement body of the do statement, delimited by `do` and `od` forms a scope for local variable definitions.


## case statement

A `case` is also an expression that yields the value of the matched arm; see [case as an expression](/expressions#case-expression).

<GhulExample name="control-flow-32" />

### scope

Each arm of the case statement, delimited by either a `when` clause or `else`, forms a separate scope for local variable definitions.


## throw statement

The `throw` statement raises an exception. Control leaves the current block immediately and passes to the nearest enclosing `catch` that handles the exception's type. If there is no such `catch`, the exception propagates out through the calling functions, and out of the program if it is never caught.

<GhulExample name="control-flow-33" />

The thrown value must be an exception: `System.Exception`, or a type derived from it.

### exception types

An exception is any class that derives from `System.Exception`, or from a more specific exception type:

<GhulExample name="control-flow-34" />

<GhulExample name="control-flow-35" />


## try statement

### try-catch-finally-yrt

The try-catch-finally-yrt block in ghūl consists of four parts:

* try block: the block where code that might throw an exception is placed.
* exception to catch: exceptions that are assignment compatible with this class will be caught and control will enter the catch block
* catch block: this code block catches and handles exceptions. It takes an exception variable and a type.
* finally block: this code block is executed after the try and catch blocks, regardless of whether an exception was thrown or not. It is typically used for clean-up code.

<GhulExample name="control-flow-36" />

If different types of exception should be caught, then there can be multiple exception clauses and catch blocks

<GhulExample name="control-flow-37" />

### try-catch-yrt

The finally clause can be omitted if no clean-up is required

<GhulExample name="control-flow-38" />

<GhulExample name="control-flow-39" />

### try-finally-yrt

The catch clause can be omitted if no exceptions need to be caught but clean-up is still required

<GhulExample name="control-flow-40" />

<GhulExample name="control-flow-41" />

### finally and return

A `finally` block runs whenever control leaves the `try` block, including when the `try` block, or a `catch` block, executes a `return`. The `finally` block runs first, then control returns to the caller:

<GhulExample name="control-flow-42" />

## return statement

### return without value

In functions of void return type, a bare `return` statement with no value returns control flow directly to the caller  

<GhulExample name="control-flow-43" />

### return value

In functions of non-void return type, `return` statements must return a value of a type that's assignment compatible with the function's return type

<GhulExample name="control-flow-44" />

### default return

If execution reaches the end of a non-void function without encountering a return statement, then the default value of the function's return type is returned to the caller.

<GhulExample name="control-flow-45" />

## asynchronous code

A function is asynchronous when its declared return type is `Tasks.TASK[T]` (or `Tasks.TASK`, for one that produces no value).

Inside such a function, `await e` evaluates to the result of the task `e` once it completes. `let x = await e;` assigns the result to a local and the rest of the function continues:

<GhulExample name="control-flow-46" />

`await e;` as a bare statement is the value-less form: it waits for `e` to complete and discards any result. Use it when you only care that the work has finished:

<GhulExample name="control-flow-47" />

`await` may also appear inside the body of a `for` or `while` loop: the loop iterates, awaiting and resuming once per iteration. A `return` from inside an awaiting loop body propagates out through the loop as usual:

<GhulExample name="control-flow-48" />

### limitations

A `try` / `catch` block may not surround code that contains an `await`. To handle a faulted task, wrap the call at the *call site* instead: reading `.result` on a returned task surfaces a faulted task as a `System.AggregateException`.

## generators

A function is a generator when its declared return type is `Pipe[T]` (`Ghul.Pipes.Pipe[T]`) and its body contains `yield E;`. Each `yield` produces the next value in the sequence; execution suspends until the caller asks for another value, then resumes from the statement after the `yield`:

<GhulExample name="control-flow-49" />

A generator *is* a [pipe](/functional-programming.html#lazy-sequences), so it can be looped over directly and composed with `map` / `filter` / `take` and the other pipe operators:

<GhulExample name="control-flow-50" />

`return;` ends the sequence early; falling off the end of the body has the same effect.
