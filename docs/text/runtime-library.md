# runtime library

`Ghul.Runtime` ships alongside the compiler and supplies `Pipe[T]` and other
everyday building blocks used throughout this site. The reference below
covers `Ghul.Pipes`, the sequence-processing library behind
[filter, map, reduce](https://ghul.dev/functional-programming#filter-map-reduce) and the
[thread-first operator](https://ghul.dev/expressions#thread-first-calls).

Each entry is a real, compiled declaration checked against the current
`ghul.runtime` package - hover over a name for its full signature, exactly as
an editor would show it.

A pipe combinator chain can be written with the thread-first operator `|>`
over free functions, or fluently with `.` over `Pipe[T]` methods after
wrapping a source with [`|`](https://ghul.dev/functional-programming) or `pipe()`. Both forms
call the same underlying code:

```ghul
…
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let sum_of_even_squares = numbers
    |> filter(x => x % 2 == 0)
    |> map(x => x * x)
    |> reduce(0, (total, x) => total + x);

write_line("sum of even squares: {sum_of_even_squares}");
```

output:

```
sum of even squares: 220
```

or, fluently:

```ghul
…
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let sum_of_even_squares = numbers
    | .filter(x => x % 2 == 0)
    | .map(x => x * x)
    | .reduce(0, (total, x) => total + x);

write_line("sum of even squares: {sum_of_even_squares}");
```

output:

```
sum of even squares: 220
```

## how a pipe runs

The combinators come in two kinds. A **stage** returns a new `Pipe[T]`, which is
what lets stages chain: `map` returns a pipe that maps, `filter` returns a pipe
that filters. A **terminal** returns something else - a value, a list, a count -
so it is where a pipe ends.

Elements travel through a pipe one at a time, and the terminal is what pulls
them through. It asks the pipe it was called on for an element, that pipe asks
the one it was built from, and so on back to the iterable at the start; the
element then makes its way down the pipe, each stage working on it before
passing it on to the next stage. No stage buffers the whole sequence - typical
stages hold only one element at a time - so a `map` over a million elements
doesn't construct a million-element list.

Pipes are lazy: until something - a terminal - asks a pipe for elements, no
stage runs. An inert pipe can be held or passed around until it's needed. And if
the consumer stops pulling elements from the pipe, the pipe will stop pulling
elements from its source iterator. If and when the consumer starts up again, the
pipe will begin producing elements again, pulling them through its chain of
stages from the source.

```ghul
…
let numbers = [1, 2, 3, 4, 5, 6];

// nothing has asked this pipe for elements yet, so peek's
// action has not run
let stages = numbers
    |> peek(x => write_line("  pulled {x}"))
    |> filter(x => x % 2 == 0)
    |> map(x => x * 10);

write_line("pipe built - nothing has run yet");

// collect_list is a terminal, so it asks for the elements
let result = stages |> collect_list();

write_line("result: {result |> join(", ")}");
```

output:

```
pipe built - nothing has run yet
  pulled 1
  pulled 2
  pulled 3
  pulled 4
  pulled 5
  pulled 6
result: 20, 40, 60
```

Because pipes are lazy, they can consume a source with an infinite number of
elements. The consumer can stop pulling, and discard the pipe. When the
pipe is disposed, that disposal flows back up the pipe to the source iterator,
which is then also disposed.

One way to bound consumption is to use a stage like `take(...)`, which stops
pulling after a given number of elements have passed through it.

This combines neatly with infinite generators - a
[generator](https://ghul.dev/async-and-generators.html#generators) can yield indefinitely,
leaving it to the pipe downstream to decide when to stop consuming.

`reverse` and the `sort` family are the exceptions, listed separately below:
they need to see the whole sequence of elements before they can start producing
results, and so they buffer the whole source as soon as they are called.

## reading the signatures

The `pure` on a function type - `predicate: (T) -> bool pure` - asks that the
function you pass only reads, and writes nothing to the heap. Most anonymous
functions satisfy it without any thought; see [type narrowing](https://ghul.dev/type-narrowing.html#purity)
for what the compiler does with the guarantee.

`Ghul.MAYBE[T]` is an [optional type](https://ghul.dev/optional-types.html): it holds a `T` or
holds nothing. Combinators that might not find anything say so in their return type, and `??`,
`!` and `if let` read the value out.

## making a pipe

### pipe

Turns any `Iterable[T]` - an array, a `LIST[T]`, a `MAP[T]`'s values,
anything with an `.iterator` - into a `Pipe[T]`. This is what the `|`
operator calls to wrap its left operand.

```ghul
pipe[T](source: Iterable[T]) -> Pipe[T] pure;
```

## stages

A stage returns a new pipe, so stages chain onto one another.

### filter

```ghul
filter[T](
    source: Iterable[T],
    predicate: (T) -> bool pure
) -> Pipe[T] pure;
```

or, as a method:

```ghul
filter(predicate: (T) -> bool pure) -> Pipe[T] pure;
```

### map

```ghul
map[T,U](
    source: Iterable[T],
    mapper: (T) -> U pure
) -> Pipe[U] pure;
```

or, as a method:

```ghul
map[U](mapper: (T) -> U pure) -> Pipe[U] pure;
```

### flat_map

Maps each element to an iterable and runs the results together into one sequence.

```ghul
flat_map[T,U](
    source: Iterable[T],
    mapper: (T) -> Iterable[U] pure
) -> Pipe[U] pure;
```

or, as a method:

```ghul
flat_map[U](mapper: (T) -> Iterable[U] pure) -> Pipe[U] pure;
```

### skip

```ghul
skip[T](source: Iterable[T], count: int) -> Pipe[T] pure;
```

or, as a method:

```ghul
skip(count: int) -> Pipe[T] pure;
```

### take

```ghul
take[T](source: Iterable[T], count: int) -> Pipe[T] pure;
```

or, as a method:

```ghul
take(count: int) -> Pipe[T] pure;
```

### skip_while

```ghul
skip_while[T](
    source: Iterable[T],
    predicate: (T) -> bool pure
) -> Pipe[T] pure;
```

or, as a method:

```ghul
skip_while(predicate: (T) -> bool pure) -> Pipe[T] pure;
```

### take_while

```ghul
take_while[T](
    source: Iterable[T],
    predicate: (T) -> bool pure
) -> Pipe[T] pure;
```

or, as a method:

```ghul
take_while(predicate: (T) -> bool pure) -> Pipe[T] pure;
```

The four set operations that follow all discard duplicates. This is what they do to the same pair of sources:

```ghul
…
let left = [1, 2, 2, 3, 4];
let right = [3, 4, 5];

// all four remove duplicates, keeping the first occurrence
// of each element
write_line("distinct:       {left |> distinct()}");
write_line("union_with:     {left |> union_with(right)}");
write_line("intersect_with: {left |> intersect_with(right)}");
write_line("except:         {left |> except(right)}");
```

output:

```
distinct:       1, 2, 3, 4
union_with:     1, 2, 3, 4, 5
intersect_with: 3, 4
except:         1, 2
```

### distinct

Removes duplicates, keeping the first occurrence of each element. `distinct`, `union_with`, `intersect_with` and `except` all do this, so each produces a sequence with no repeats, in the order first seen. Elements are compared with `=~` and `get_hash_code`, so a type used with these needs [both](https://ghul.dev/dotnet-integration.html#equality).

```ghul
distinct[T](source: Iterable[T]) -> Pipe[T] pure;
```

or, as a method:

```ghul
distinct() -> Pipe[T] pure;
```

### union_with

Every element of both sources with duplicates removed, taking the left source's elements first.

```ghul
union_with[T](
    source: Iterable[T],
    right: Iterable[T]
) -> Pipe[T] pure;
```

or, as a method:

```ghul
union_with(right: Iterable[T]) -> Pipe[T] pure;
```

### intersect_with

Elements the left and right sources have in common, in the order the left source has them.

```ghul
intersect_with[T](
    source: Iterable[T],
    right: Iterable[T]
) -> Pipe[T] pure;
```

or, as a method:

```ghul
intersect_with(right: Iterable[T]) -> Pipe[T] pure;
```

### except

Elements of the left source that the right source doesn't have.

```ghul
except[T](
    source: Iterable[T],
    right: Iterable[T]
) -> Pipe[T] pure;
```

or, as a method:

```ghul
except(right: Iterable[T]) -> Pipe[T] pure;
```

### peek

Calls `action` on each element and passes it through unchanged.

```ghul
peek[T](source: Iterable[T], action: T -> void) -> Pipe[T] pure;
```

or, as a method:

```ghul
peek(action: T -> void) -> Pipe[T] pure;
```

`chunk` and `windows` both produce groups of elements, and differ in how the groups are cut:

```ghul
…
let numbers = [1, 2, 3, 4, 5, 6, 7];

// chunk: the first three elements, then the next three, and so
// on. the last group is short when the source doesn't divide
// evenly
for group in numbers |> chunk(3) do
    write_line("chunk:  {group |> join(", ")}");
od

// windows: every run of three neighbouring elements, so each
// group shares two elements with the one before it. a group is
// always three long
for window in numbers |> windows(3) do
    write_line("window: {window |> join(", ")}");
od
```

output:

```
chunk:  1, 2, 3
chunk:  4, 5, 6
chunk:  7
window: 1, 2, 3
window: 2, 3, 4
window: 3, 4, 5
window: 4, 5, 6
window: 5, 6, 7
```

### chunk

The first `size` elements, then the next `size`, and so on, each element appearing in one group only. The last group is short when the source doesn't divide evenly. Compare `windows`, below.

```ghul
chunk[T](source: Iterable[T], size: int) -> Pipe[LIST[T]] pure;
```

or, as a method:

```ghul
chunk(size: int) -> Pipe[LIST[T]] pure;
```

### windows

Every run of `size` neighbouring elements: the first `size`, then the same run moved along by one, and so on. Each window therefore shares all but one of its elements with the window before it. A window is always `size` long, so a source with fewer than `size` elements produces none.

```ghul
windows[T](
    source: Iterable[T],
    size: int
) -> Pipe[LIST[T]] pure;
```

or, as a method:

```ghul
windows(size: int) -> Pipe[LIST[T]] pure;
```

### cat

Concatenation: every element of the left source, then every element of the right.

```ghul
cat[T](source: Iterable[T], right: Iterable[T]) -> Pipe[T] pure;
```

or, as a method:

```ghul
cat(right: Iterable[T]) -> Pipe[T] pure;
```

### index

Pairs each element with its index. `INDEXED_VALUE[T]` has `index` and `value`, and destructures positionally, so `for (i, x) in xs | .index() do` reads the pair apart. The second form starts the index at a given number rather than at 0.

```ghul
index[T](source: Iterable[T]) -> Pipe[INDEXED_VALUE[T]] pure;

index[T](
    source: Iterable[T],
    index: int
) -> Pipe[INDEXED_VALUE[T]] pure;
```

or, as a method:

```ghul
index() -> Pipe[INDEXED_VALUE[T]] pure;

index(index: int) -> Pipe[INDEXED_VALUE[T]] pure;
```

### zip

Pairs elements of the source with elements of `other`, stopping when either side runs out. The second form combines each pair with a mapper instead of yielding a tuple.

```ghul
zip[T,U](
    source: Iterable[T],
    other: Iterable[U]
) -> Pipe[(T,U)] pure;

zip[T,U,TOut](
    source: Iterable[T],
    other: Iterable[U],
    mapper: (T,U) -> TOut pure
) -> Pipe[TOut] pure;
```

or, as a method:

```ghul
zip[U](other: Iterable[U]) -> Pipe[(T,U)] pure;

zip[U,TOut](
    other: Iterable[U],
    mapper: (T,U) -> TOut pure
) -> Pipe[TOut] pure;
```

## stages that buffer

These return a pipe, like any other stage, but they cannot work out their first
element without having seen the last one. So they buffer the whole source the
moment they are called, rather than passing elements along one at a time.

### reverse

Yields the source's elements last to first.

```ghul
reverse[T](source: Iterable[T]) -> Pipe[T] pure;
```

or, as a method:

```ghul
reverse() -> Pipe[T] pure;
```

### sort

Yields the source's elements in order. The first form uses the element type's own ordering; the other two take an `IComparer[T]` or a comparison function returning negative, zero or positive.

```ghul
sort[T](source: Iterable[T]) -> Pipe[T] pure;

sort[T](
    source: Iterable[T],
    comparer: Collections.IComparer[T]
) -> Pipe[T] pure;

sort[T](
    source: Iterable[T],
    compare: (T, T) -> int pure
) -> Pipe[T] pure;
```

or, as a method:

```ghul
sort() -> Pipe[T] pure;

sort(comparer: Collections.IComparer[T]) -> Pipe[T] pure;

sort(compare: (T, T) -> int pure) -> Pipe[T] pure;
```

### sort_descending

```ghul
sort_descending[T](source: Iterable[T]) -> Pipe[T] pure;
```

or, as a method:

```ghul
sort_descending() -> Pipe[T] pure;
```

### sort_by

```ghul
sort_by[T,K: Ghul.Comparable[K]](
    source: Iterable[T],
    key_selector: (T) -> K pure
) -> Pipe[T] pure;
```

or, as a method:

```ghul
sort_by[K: Ghul.Comparable[K]](
    key_selector: (T) -> K pure
) -> Pipe[T] pure;
```

### sort_by_descending

```ghul
sort_by_descending[T,K: Ghul.Comparable[K]](
    source: Iterable[T],
    key_selector: (T) -> K pure
) -> Pipe[T] pure;
```

or, as a method:

```ghul
sort_by_descending[K: Ghul.Comparable[K]](
    key_selector: (T) -> K pure
) -> Pipe[T] pure;
```

## terminals

A terminal returns something other than a pipe, so it is where a pipe ends. They
fall into three loose groups:
finding a single element, collecting the elements into a container, and folding
or consuming the sequence as a whole.

The searching combinators come in pairs. `find`-style ones take a predicate or
a mapper and scan; `first`-style ones look only at the leading element. Each has a
variant returning `MAYBE[T]` and one that throws instead:

```ghul
…
let words = ["alpha", "beta", "gamma"];

// find scans for the first element matching a predicate;
// first takes no predicate and yields the leading element
write_line("find:      {words |> find(w => w.length == 4) ?? "none"}");
write_line("first:     {words |> first() ?? "none"}");

// only yields the single element, and throws if the source
// holds none or more than one
write_line("only:      {["solo"] |> only()}");

// a mapper that gives a result only for words longer than four
// characters
shout(w: string) -> MAYBE[string] pure =>
    if w.length > 4 then MAYBE[string](w.to_upper()) else MAYBE[string]() fi;

// find_map keeps mapping until one answers; first_map maps the
// first element and gives up when that one declines
write_line("find_map:  {words |> find_map(shout) ?? "none"}");
write_line("first_map: {words |> first_map(shout) ?? "none"}");

// beta is the only word the mapper declines, so leading with it
// is what separates the two
let beta_first = ["beta", "alpha", "gamma"];

write_line("find_map:  {beta_first |> find_map(shout) ?? "none"}");
write_line("first_map: {beta_first |> first_map(shout) ?? "none"}");
```

output:

```
find:      beta
first:     alpha
only:      solo
find_map:  ALPHA
first_map: ALPHA
find_map:  ALPHA
first_map: none
```

### find

The first element matching the predicate, absent if none does. `first` is the same question with no predicate.

```ghul
find[T](
    source: Iterable[T],
    predicate: (T) -> bool pure
) -> Ghul.MAYBE[T] pure;
```

or, as a method:

```ghul
find(predicate: (T) -> bool pure) -> Ghul.MAYBE[T] pure;
```

### find_map

Calls `mapper` on each element in turn and returns the first present result. `first_map` differs: it calls the mapper on the *first* element only, and gives up if that one declines.

```ghul
find_map[T,U](
    source: Iterable[T],
    mapper: (T) -> Ghul.MAYBE[U] pure
) -> Ghul.MAYBE[U] pure;
```

or, as a method:

```ghul
find_map[U](
    mapper: (T) -> Ghul.MAYBE[U] pure
) -> Ghul.MAYBE[U] pure;
```

### find_or_throw

As `find`, throwing instead of returning absent when nothing matches.

```ghul
find_or_throw[T](
    source: Iterable[T],
    predicate: T -> bool pure
) -> T pure;
```

or, as a method:

```ghul
find_or_throw(predicate: T -> bool pure) -> T pure;
```

### find_map_or_throw

As `find_map`, throwing instead of returning absent when nothing maps.

```ghul
find_map_or_throw[T,U](
    source: Iterable[T],
    mapper: (T) -> Ghul.MAYBE[U] pure
) -> U pure;
```

or, as a method:

```ghul
find_map_or_throw[U](
    mapper: (T) -> Ghul.MAYBE[U] pure
) -> U pure;
```

### first

The leading element, absent when the source is empty.

```ghul
first[T](source: Iterable[T]) -> Ghul.MAYBE[T] pure;
```

or, as a method:

```ghul
first() -> Ghul.MAYBE[T] pure;
```

### first_map

Calls `mapper` on the leading element only. Compare `find_map`, above, which keeps going.

```ghul
first_map[T,U](
    source: Iterable[T],
    mapper: (T) -> Ghul.MAYBE[U] pure
) -> Ghul.MAYBE[U] pure;
```

or, as a method:

```ghul
first_map[U](
    mapper: (T) -> Ghul.MAYBE[U] pure
) -> Ghul.MAYBE[U] pure;
```

### first_or_throw

As `first`, throwing instead of returning absent when the source is empty.

```ghul
first_or_throw[T](source: Iterable[T]) -> T pure;
```

or, as a method:

```ghul
first_or_throw() -> T pure;
```

### first_map_or_throw

As `first_map`, throwing instead of returning absent.

```ghul
first_map_or_throw[T,U](
    source: Iterable[T],
    mapper: (T) -> Ghul.MAYBE[U] pure
) -> U pure;
```

or, as a method:

```ghul
first_map_or_throw[U](
    mapper: (T) -> Ghul.MAYBE[U] pure
) -> U pure;
```

### only

The single element the source holds, throwing when it holds none or more than one.

```ghul
only[T](source: Iterable[T]) -> T pure;
```

or, as a method:

```ghul
only() -> T pure;
```

### any

```ghul
any[T](
    source: Iterable[T],
    predicate: (T) -> bool pure
) -> bool pure;
```

or, as a method:

```ghul
any(predicate: (T) -> bool pure) -> bool pure;
```

### all

```ghul
all[T](
    source: Iterable[T],
    predicate: (T) -> bool pure
) -> bool pure;
```

or, as a method:

```ghul
all(predicate: (T) -> bool pure) -> bool pure;
```

### count

```ghul
count[T](source: Iterable[T]) -> int pure;
```

or, as a method:

```ghul
count() -> int pure;
```

### min

The smallest element, absent when the source is empty. `min` and `max` have no method form.

```ghul
min[T: Ghul.Comparable[T]](
    values: Iterable[T]
) -> Ghul.MAYBE[T] pure;
```

### max

```ghul
max[T: Ghul.Comparable[T]](
    values: Iterable[T]
) -> Ghul.MAYBE[T] pure;
```

### min_by

```ghul
min_by[T,K: Ghul.Comparable[K]](
    source: Iterable[T],
    key_selector: (T) -> K pure
) -> Ghul.MAYBE[T] pure;
```

or, as a method:

```ghul
min_by[K: Ghul.Comparable[K]](
    key_selector: (T) -> K pure
) -> Ghul.MAYBE[T] pure;
```

### max_by

```ghul
max_by[T,K: Ghul.Comparable[K]](
    source: Iterable[T],
    key_selector: (T) -> K pure
) -> Ghul.MAYBE[T] pure;
```

or, as a method:

```ghul
max_by[K: Ghul.Comparable[K]](
    key_selector: (T) -> K pure
) -> Ghul.MAYBE[T] pure;
```

The collecting combinators differ in what they hand back:

```ghul
…
let numbers = [3, 1, 4, 1, 5, 9, 2, 6];

// collect gives back the read-only List[T] trait, collect_list
// the mutable LIST[T], and collect_set drops duplicates
write_line("collect:      {numbers |> collect() |> join(", ")}");
write_line("collect_list: {numbers |> collect_list() |> join(", ")}");
write_line("collect_set:  {numbers |> collect_set() |> join(", ")}");

// partition splits on a predicate: the matching elements first
let (even, odd) = numbers |> partition(x => x % 2 == 0);

write_line("partition:    even {even |> join(", ")}, odd {odd |> join(", ")}");

// group_by keys each element, collecting the elements per key
let by_size = numbers |> group_by(x => if x < 5 then "small" else "large" fi);

write_line("group_by:     small {by_size["small"] |> join(", ")}");
write_line("group_by:     large {by_size["large"] |> join(", ")}");
```

output:

```
collect:      3, 1, 4, 1, 5, 9, 2, 6
collect_list: 3, 1, 4, 1, 5, 9, 2, 6
collect_set:  3, 1, 4, 5, 9, 2, 6
partition:    even 4, 2, 6, odd 3, 1, 1, 5, 9
group_by:     small 3, 1, 4, 1, 2
group_by:     large 5, 9, 6
```

### collect

Collects into the read-only `Collections.List[T]`. `collect_list` gives back the mutable `LIST[T]` instead, and the others collect into an array, a set, or a map.

```ghul
collect[T](source: Iterable[T]) -> Collections.List[T] pure;
```

or, as a method:

```ghul
collect() -> Collections.List[T] pure;
```

### collect_array

```ghul
collect_array[T](source: Iterable[T]) -> T[] pure;
```

or, as a method:

```ghul
collect_array() -> T[] pure;
```

### collect_list

```ghul
collect_list[T](source: Iterable[T]) -> LIST[T] pure;
```

or, as a method:

```ghul
collect_list() -> LIST[T] pure;
```

### collect_set

```ghul
collect_set[T](source: Iterable[T]) -> SET[T] pure;
```

or, as a method:

```ghul
collect_set() -> SET[T] pure;
```

### collect_map

```ghul
collect_map[T,K,V](
    source: Iterable[T],
    key_selector: (T) -> K pure,
    value_selector: (T) -> V pure
) -> MAP[K,V] pure;
```

or, as a method:

```ghul
collect_map[K,V](
    key_selector: (T) -> K pure,
    value_selector: (T) -> V pure
) -> MAP[K,V] pure;
```

### partition

Splits the source in two on a predicate. The elements matching the predicate come first, then the elements not matching.

```ghul
partition[T](
    source: Iterable[T],
    predicate: (T) -> bool pure
) -> (LIST[T], LIST[T]) pure;
```

or, as a method:

```ghul
partition(
    predicate: (T) -> bool pure
) -> (LIST[T], LIST[T]) pure;
```

### group_by

Collects the elements into a map, keyed by what `key_selector` returns for each.

```ghul
group_by[T,K](
    source: Iterable[T],
    key_selector: (T) -> K pure
) -> MAP[K, LIST[T]] pure;
```

or, as a method:

```ghul
group_by[K](
    key_selector: (T) -> K pure
) -> MAP[K, LIST[T]] pure;
```

### reduce

Folds the source into a single value, starting at `seed` and calling `accumulator` with the running value and each element in turn. The second form passes the final running value through a mapper before returning it.

```ghul
reduce[T,TRunning](
    source: Iterable[T],
    seed: TRunning,
    accumulator: (TRunning,T) -> TRunning pure
) -> TRunning pure;

reduce[T,TRunning,TOut](
    source: Iterable[T],
    seed: TRunning,
    accumulator: (TRunning,T) -> TRunning pure,
    mapper: (TRunning) -> TOut pure
) -> TOut pure;
```

or, as a method:

```ghul
reduce[TRunning](
    seed: TRunning,
    accumulator: (TRunning,T) -> TRunning pure
) -> TRunning pure;

reduce[TRunning,TOut](
    seed: TRunning,
    accumulator: (TRunning,T) -> TRunning pure,
    mapper: (TRunning) -> TOut pure
) -> TOut pure;
```

### each

Calls `action` on every element. It returns nothing and, alone among these, is not `pure` - it exists for its side effects.

```ghul
each[T](source: Iterable[T], action: T -> void) -> void;
```

or, as a method:

```ghul
each(action: T -> void) -> void;
```

### append_to

Appends each element to a `StringBuilder`, separated by `separator`, or by `", "` when that is left off. `join` is the same thing answering a fresh string.

```ghul
append_to[T](
    source: Iterable[T],
    into: System.Text.StringBuilder,
    separator: string
) -> System.Text.StringBuilder;

append_to[T](
    source: Iterable[T],
    into: System.Text.StringBuilder
) -> System.Text.StringBuilder;
```

or, as a method:

```ghul
append_to(
    into: System.Text.StringBuilder,
    separator: string
) -> System.Text.StringBuilder;

append_to(
    into: System.Text.StringBuilder
) -> System.Text.StringBuilder;
```

### join

Renders the elements into one string, separated by `separator`, or by `", "` when left off.

```ghul
join[T](source: Iterable[T], separator: string) -> string pure;

join[T](source: Iterable[T]) -> string pure;
```

or, as a method:

```ghul
join(separator: string) -> string pure;

join() -> string pure;
```
