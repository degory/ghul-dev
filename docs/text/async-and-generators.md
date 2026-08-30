# async and generators

> **editable examples**
>
> Every example on this page can be edited and run here: click the pencil to open it in an editor, change it, and run it in your browser. Errors, hovers and completions come from the ghūl compiler as you type.
>
> The ghul-examples repository has fuller [async-await](https://github.com/degory/ghul-examples/tree/main/examples/async-await) and [generators](https://github.com/degory/ghul-examples/tree/main/examples/generators) examples to build and run locally, in a GitHub Codespace or a dev container.

Two kinds of ghūl function suspend and resume instead of running straight through: an asynchronous function waits for tasks without blocking, and a generator produces a sequence lazily, one element per request. Both are declared by their return type alone - `Tasks.TASK[T]` for asynchronous functions, `Pipe[T]` for generators - and the body reads top to bottom either way.

## asynchronous code

A function is asynchronous when its declared return type is `Tasks.TASK[T]` (or `Tasks.TASK`, for one that produces no value).

Inside such a function, `await e` evaluates to the result of the task `e` once it completes. `let x = await e;` assigns the result to a local and the rest of the function continues:

```ghul
…
compute() -> Tasks.TASK[int] is
    let a = await double_async(10)   // a = 20
    let b = await double_async(a)    // b = 40
    let c = await add_async(a, b)    // c = 60

    return c
si

write_line("{compute().result}")
```

output:

```
60
```

`await e;` as a bare statement is the value-less form: it waits for `e` to complete and discards any result. Use it when you only care that the work has finished:

```ghul
…
run_side_effects() -> Tasks.TASK is
    await side_effect("first")
    await side_effect("second")

    return
si

run_side_effects().wait()
```

output:

```
side effect: first
side effect: second
```

`await` can also appear inside the body of a `for` or `while` loop: the loop iterates, awaiting and resuming once per iteration. A `return` from inside an awaiting loop body propagates out through the loop as usual:

```ghul
…
sum_of_squares(xs: Collections.List[int]) -> Tasks.TASK[int] is
    let total mut = 0

    for x in xs do
        let y = await fetch_async(x)
        total = total + y
    od

    return total
si

let result = sum_of_squares([1, 2, 3, 4]).result

write_line("sum_of_squares = {result}")
```

output:

```
sum_of_squares = 30
```

A `try` / `catch` / `finally` around awaiting code works as expected, including a `return` from inside the `try`. What is not yet supported is an `await` inside a `catch` or `finally` handler itself. A faulted task can also be handled at the call site: reading `.result` on a returned task throws the fault as a `System.AggregateException`.

## generators

A function is a generator when its declared return type is `Pipe[T]` (`Ghul.Pipes.Pipe[T]`) and its body contains `yield E;`. Each `yield` produces the next value in the sequence; execution suspends until the caller asks for another value, then resumes from the statement after the `yield`:

```ghul
…
squares(limit: int) -> Ghul.Pipes.Pipe[int] is
    let i mut = 1
    while i <= limit do
        yield i * i
        i = i + 1
    od
si

for s in squares(4) do
    write_line(s)
od
```

output:

```
1
4
9
16
```

A generator *is* a [pipe](https://ghul.dev/runtime-library.html#stages), so it can be looped over directly and composed with `map` / `filter` / `take` and the other pipe operators:

```ghul
…
// fibs() is an infinite generator; take(8) bounds it
for f in fibs() |> take(8) do
    write_line(f)
od
```

output:

```
0
1
1
2
3
5
8
13
```

`return;` ends the sequence early; falling off the end of the body has the same effect.

As with `await`, a `yield` inside a `catch` or `finally` handler is not yet supported, and a function cannot be both a generator and asynchronous.
