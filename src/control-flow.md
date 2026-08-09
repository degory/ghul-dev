# control flow in ghūl

::: tip runnable examples
The [ghul-examples repository](https://github.com/degory/ghul-examples/tree/main/examples/control-flow) has fuller, runnable control-flow examples. Open it in a GitHub Codespace or a dev container to build and run them. Any example on this page can also be pasted into the [ghūl playground](https://github.com/degory/ghul-playground)'s `main.ghul`{:text} and run with `dotnet run`{:sh}.
:::

## block scope

In ghūl, most control flow statements incorporate one or more blocks. A block is a list of one or more statements that forms a scope for local variable definitions. The scope of a variable is the region of code where that variable is visible and can be accessed.
Blocks are delimited by keywords that are specific to their control flow statement. For example, if-then statements use `then` and `else`, `elif` or `fi` to delimit their blocks, while loops use `do` and `od`, and so on.
Variables defined within a block are only accessible within that block and any nested blocks. Once execution exits the block, those variables go out of scope and cannot be accessed anymore.

## assert statement

In ghūl the `assert` statement is used to ensure an expected condition holds and to throw an exception if it does not. An assert statement starts with `assert`, followed by an expression that must evaluate to a bool, followed by `else`, and then a value to throw. If the value to throw is a string, it will be wrapped in an `AssertionFailedException`. Otherwise it must be of a throwable type.

<GhulExample name="control-flow-1" />

`assert` is also an expression. `assert cond else "msg" in expr` guards a value and chains like `let x in expr`: a failing assert throws, a passing one yields the trailing expression. Any narrowing the condition establishes flows into that expression, so a value checked present reads directly there:

<GhulExample name="control-flow-51" />

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

An `if` condition that proves something stronger about a value - an `isa` test on a class or union variant, a `?` presence test on an optional - narrows the value to the stronger type inside the branch, and a guard that leaves the block narrows the code after it. [Type narrowing](/type-narrowing.html) covers this in full: locals, parameters, member-access paths, how long each narrow lasts, and the purity inference behind it.

### if let

`cast T?(x)` views `x` as type `T`, and yields null (rather than throwing) when `x` is not a `T`. A cast followed by a presence test is therefore a safe, explicit type test:

<GhulExample name="control-flow-12" />

`if let` folds that into the `if` itself: it puts a `let` definition in the condition of an `if` or `elif`. The then-branch runs only when the value is present, with the variable in scope (and narrowed) just within that branch:

<GhulExample name="control-flow-13" />

A type on the variable (`c: CAT`) makes it a type test. `elif let` chains these, so a sequence of type tests reads as one construct:

<GhulExample name="control-flow-14" />

With no type given for the local variable, `if let` tests that the value is present. This is the natural way to consume an [optional type](/language-basics.html#optional-types): the local variable has the non-optional type within the then-branch, so there is no need for an explicit `!`.

<GhulExample name="control-flow-15" />

An `if let` can also destructure, exactly like a plain `let`, including `_` to discard a field that is not needed:

<GhulExample name="control-flow-16" />

A trailing `/\` guard gates the branch on a further condition, evaluated with the new variable already in scope:

<GhulExample name="control-flow-55" />

Several comma-separated clauses can appear in one `if let`; every clause's test and any guard must pass, and later clauses see the variables the earlier ones introduced, as in `if let outer = holder, inner = outer.value then`. A destructure leaf can also be a literal - an integer, string, character, boolean, `null`, or a qualified enum member - which adds an equality test at that position rather than introducing a variable, so `if let (1, name) = pair then` matches only when the first element is 1. Literal leaves are allowed only in refutable positions like `if let` and `case`.

When the tested value is a member path and the local should take the path's last name, the `name =` can be dropped: `if let order.customer` introduces `customer` holding `order.customer` and enters the branch when it is present, and `if let zoo.pet: CAT` does the same with a type test. A trailing `?` on the presence form (`if let order.customer?`) is accepted but not required.

<GhulExample name="control-flow-58" />

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

`break` and `continue` behave the same way in `for` and `do` loops, so they are not shown again below.

### while let

`while let` is the loop form of `if let`: the loop runs while the refutable pattern matches, with the bound names fresh on each iteration. It takes the same shapes as `if let` - bare presence, type ascription, destructure, `/\` guards, and comma-separated clauses:

<GhulExample name="control-flow-52" />

A `while` condition also narrows its body the same way an `if` condition narrows its then-branch, so `while isa CAT(a) do a.purr() od` reaches a `CAT`-only member without an inner cast.

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

### scope

The loop variable is in scope within the loop body but not within the expression that provides the iterable object. `continue` in a `for` loop proceeds to the next iteration immediately before attempting to read the next element from the iterator.


## do statement

### do-od

The do / od loop in ghūl is used to create an indefinite loop which will continue to execute until explicitly broken with a break statement.

<GhulExample name="control-flow-29" />

<GhulExample name="control-flow-30" />

This loop will run indefinitely until counter reaches 5, at which point the break statement terminates the loop.


## case statement

`case` branches on a scrutinee value. Each `when` arm is introduced by `then`, an optional `else` catches the rest, and the construct closes with `esac`. There is no fall-through, and a `when` can list several values matched by equality:

<GhulExample name="control-flow-32" />

`case` is also an expression: each arm's last expression is the arm's value, and the `case` evaluates to whichever arm matched:

<GhulExample name="control-flow-53" />

### pattern arms

A `when` arm can take a pattern instead of an equality list, mirroring [`if let`](#if-let): `when v: T then` type-tests and introduces the variable, `when (a, b) then` destructures, and `when _: T then` type-tests without introducing one. A bare identifier stays an equality test - `when v then` compares against the value of `v` in scope and introduces no new local:

<GhulExample name="control-flow-54" />

### exhaustiveness

A `case` over a closed domain - a union's variants, `bool`, an enum, or a class hierarchy closed to the assembly - is checked for exhaustiveness. A missing case warns (`non-exhaustive-case`), an arm that matches nothing the earlier arms left warns (`redundant-case-arm`), and an `else` that can never run warns (`dead-case-else`). An expression-position `case` over an open domain needs an `else`, unless the expected type has a default value to fall back on.

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

## asynchronous code and generators

`await` suspends a function until a task completes, and `yield` suspends a generator until the next element is asked for. Both are covered on [async and generators](/async-and-generators.html).
