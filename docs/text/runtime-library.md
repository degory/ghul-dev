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

## Ghul.Pipes

Most combinators below exist in both forms; the free function comes first
and the equivalent method beneath it as the alternative.

### pipe

Lifts any `Iterable[T]` - an array, a `LIST[T]`, a `MAP[T]`'s values,
anything with an `.iterator` - into a `Pipe[T]`. This is what the `|`
operator calls to wrap its left operand.

```ghul
pipe[T](source: Iterable[T]) -> Pipe[T] pure;
```

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

### distinct

```ghul
distinct[T](source: Iterable[T]) -> Pipe[T] pure;
```

or, as a method:

```ghul
distinct() -> Pipe[T] pure;
```

### peek

```ghul
peek[T](source: Iterable[T], action: T -> void) -> Pipe[T] pure;
```

or, as a method:

```ghul
peek(action: T -> void) -> Pipe[T] pure;
```

### chunk

```ghul
chunk[T](source: Iterable[T], size: int) -> Pipe[LIST[T]] pure;
```

or, as a method:

```ghul
chunk(size: int) -> Pipe[LIST[T]] pure;
```

### windows

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

```ghul
cat[T](source: Iterable[T], right: Iterable[T]) -> Pipe[T] pure;
```

or, as a method:

```ghul
cat(right: Iterable[T]) -> Pipe[T] pure;
```

### union_with

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

### index

```ghul
index[T](source: Iterable[T]) -> Pipe[INDEXED_VALUE[T]] pure;
```

or, as a method:

```ghul
index() -> Pipe[INDEXED_VALUE[T]] pure;
```

### zip

```ghul
zip[T,U](
    source: Iterable[T],
    other: Iterable[U]
) -> Pipe[(T,U)] pure;
```

or, as a method:

```ghul
zip[U](other: Iterable[U]) -> Pipe[(T,U)] pure;
```

### reduce

```ghul
reduce[T,TRunning](
    source: Iterable[T],
    seed: TRunning,
    accumulator: (TRunning,T) -> TRunning pure
) -> TRunning pure;
```

or, as a method:

```ghul
reduce[TRunning](
    seed: TRunning,
    accumulator: (TRunning,T) -> TRunning pure
) -> TRunning pure;
```

### collect

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

### count

```ghul
count[T](source: Iterable[T]) -> int pure;
```

or, as a method:

```ghul
count() -> int pure;
```

### find

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

```ghul
first[T](source: Iterable[T]) -> Ghul.MAYBE[T] pure;
```

or, as a method:

```ghul
first() -> Ghul.MAYBE[T] pure;
```

### first_map

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

```ghul
first_or_throw[T](source: Iterable[T]) -> T pure;
```

or, as a method:

```ghul
first_or_throw() -> T pure;
```

### first_map_or_throw

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

### each

```ghul
each[T](source: Iterable[T], action: T -> void) -> void;
```

or, as a method:

```ghul
each(action: T -> void) -> void;
```

### reverse

```ghul
reverse[T](source: Iterable[T]) -> Pipe[T] pure;
```

or, as a method:

```ghul
reverse() -> Pipe[T] pure;
```

### sort

```ghul
sort[T](source: Iterable[T]) -> Pipe[T] pure;
```

or, as a method:

```ghul
sort() -> Pipe[T] pure;
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

### append_to

```ghul
append_to[T](
    source: Iterable[T],
    into: System.Text.StringBuilder
) -> System.Text.StringBuilder;
```

or, as a method:

```ghul
append_to(
    into: System.Text.StringBuilder
) -> System.Text.StringBuilder;
```

### join

```ghul
join[T](source: Iterable[T], separator: string) -> string pure;
```

or, as a method:

```ghul
join(separator: string) -> string pure;
```

### min

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
