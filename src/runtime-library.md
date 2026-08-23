# runtime library

`Ghul.Runtime` ships alongside the compiler and supplies `Pipe[T]` and other
everyday building blocks used throughout this site. The reference below
covers `Ghul.Pipes`, the sequence-processing library behind
[filter, map, reduce](/functional-programming#filter-map-reduce) and the
[thread-first operator](/expressions#thread-first-calls).

Each entry is a real, compiled declaration checked against the current
`ghul.runtime` package - hover over a name for its full signature, exactly as
an editor would show it.

A pipe combinator chain can be written with the thread-first operator `|>`
over free functions, or fluently with `.` over `Pipe[T]` methods after
wrapping a source with [`|`](/functional-programming) or `pipe()`. Both forms
call the same underlying code:

<GhulExample name="pipes-intro-thread-first" />

or, fluently:

<GhulExample name="pipes-intro-fluent" />

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

<GhulExample name="pipes-lazy-chain" />

Because pipes are lazy, they can consume a source with an infinite number of
elements. The consumer can stop pulling, and discard the pipe. When the
pipe is disposed, that disposal flows back up the pipe to the source iterator,
which is then also disposed.

One way to bound consumption is to use a stage like `take(...)`, which stops
pulling after a given number of elements have passed through it.

This combines neatly with infinite generators - a
[generator](/async-and-generators.html#generators) can yield indefinitely,
leaving it to the pipe downstream to decide when to stop consuming.

`reverse` and the `sort` family are the exceptions, listed separately below:
they need to see the whole sequence of elements before they can start producing
results, and so they buffer the whole source as soon as they are called.

## reading the signatures

The `pure` on a function type - `predicate: (T) -> bool pure` - asks that the
function you pass only reads, and writes nothing to the heap. Most anonymous
functions satisfy it without any thought; see [narrowing in depth](/narrowing-in-depth.html#calls-purity-and-stable)
for what the compiler does with the guarantee.

`Ghul.MAYBE[T]` is an [optional type](/optional-types.html): it holds a `T` or
holds nothing. Combinators that might not find anything say so in their return type, and `??`,
`!` and `if let` read the value out.

## making a pipe

### pipe

Turns any `Iterable[T]` - an array, a `LIST[T]`, a `MAP[T]`'s values,
anything with an `.iterator` - into a `Pipe[T]`. This is what the `|`
operator calls to wrap its left operand.

<GhulExample name="pipes-ref-pipe-function" signature />

## stages

A stage returns a new pipe, so stages chain onto one another.

### filter

<GhulExample name="pipes-ref-filter-function" signature />

or, as a method:

<GhulExample name="pipes-ref-filter-method" signature />

### map

<GhulExample name="pipes-ref-map-function" signature />

or, as a method:

<GhulExample name="pipes-ref-map-method" signature />

### flat_map

Maps each element to an iterable and runs the results together into one sequence.

<GhulExample name="pipes-ref-flat_map-function" signature />

or, as a method:

<GhulExample name="pipes-ref-flat_map-method" signature />

### skip

<GhulExample name="pipes-ref-skip-function" signature />

or, as a method:

<GhulExample name="pipes-ref-skip-method" signature />

### take

<GhulExample name="pipes-ref-take-function" signature />

or, as a method:

<GhulExample name="pipes-ref-take-method" signature />

### skip_while

<GhulExample name="pipes-ref-skip_while-function" signature />

or, as a method:

<GhulExample name="pipes-ref-skip_while-method" signature />

### take_while

<GhulExample name="pipes-ref-take_while-function" signature />

or, as a method:

<GhulExample name="pipes-ref-take_while-method" signature />

The four set operations that follow all discard duplicates. This is what they do to the same pair of sources:

<GhulExample name="pipes-set-operations" />

### distinct

Removes duplicates, keeping the first occurrence of each element. `distinct`, `union_with`, `intersect_with` and `except` all do this, so each produces a sequence with no repeats, in the order first seen. Elements are compared with `=~` and `get_hash_code`, so a type used with these needs [both](/dotnet-integration.html#equality).

<GhulExample name="pipes-ref-distinct-function" signature />

or, as a method:

<GhulExample name="pipes-ref-distinct-method" signature />

### union_with

Every element of both sources with duplicates removed, taking the left source's elements first.

<GhulExample name="pipes-ref-union_with-function" signature />

or, as a method:

<GhulExample name="pipes-ref-union_with-method" signature />

### intersect_with

Elements the left and right sources have in common, in the order the left source has them.

<GhulExample name="pipes-ref-intersect_with-function" signature />

or, as a method:

<GhulExample name="pipes-ref-intersect_with-method" signature />

### except

Elements of the left source that the right source doesn't have.

<GhulExample name="pipes-ref-except-function" signature />

or, as a method:

<GhulExample name="pipes-ref-except-method" signature />

### peek

Calls `action` on each element and passes it through unchanged.

<GhulExample name="pipes-ref-peek-function" signature />

or, as a method:

<GhulExample name="pipes-ref-peek-method" signature />

`chunk` and `windows` both produce groups of elements, and differ in how the groups are cut:

<GhulExample name="pipes-chunk-windows" />

### chunk

The first `size` elements, then the next `size`, and so on, each element appearing in one group only. The last group is short when the source doesn't divide evenly. Compare `windows`, below.

<GhulExample name="pipes-ref-chunk-function" signature />

or, as a method:

<GhulExample name="pipes-ref-chunk-method" signature />

### windows

Every run of `size` neighbouring elements: the first `size`, then the same run moved along by one, and so on. Each window therefore shares all but one of its elements with the window before it. A window is always `size` long, so a source with fewer than `size` elements produces none.

<GhulExample name="pipes-ref-windows-function" signature />

or, as a method:

<GhulExample name="pipes-ref-windows-method" signature />

### cat

Concatenation: every element of the left source, then every element of the right.

<GhulExample name="pipes-ref-cat-function" signature />

or, as a method:

<GhulExample name="pipes-ref-cat-method" signature />

### index

Pairs each element with its index. `INDEXED_VALUE[T]` has `index` and `value`, and destructures positionally, so `for (i, x) in xs | .index() do` reads the pair apart. The second form starts the index at a given number rather than at 0.

<GhulExample name="pipes-ref-index-function" signature />

or, as a method:

<GhulExample name="pipes-ref-index-method" signature />

### zip

Pairs elements of the source with elements of `other`, stopping when either side runs out. The second form combines each pair with a mapper instead of yielding a tuple.

<GhulExample name="pipes-ref-zip-function" signature />

or, as a method:

<GhulExample name="pipes-ref-zip-method" signature />

## stages that buffer

These return a pipe, like any other stage, but they cannot work out their first
element without having seen the last one. So they buffer the whole source the
moment they are called, rather than passing elements along one at a time.

### reverse

Yields the source's elements last to first.

<GhulExample name="pipes-ref-reverse-function" signature />

or, as a method:

<GhulExample name="pipes-ref-reverse-method" signature />

### sort

Yields the source's elements in order. The first form uses the element type's own ordering: sorting without a comparer needs an element type that defines `<>`, or is comparable on the .NET side. The other two forms take an `IComparer[T]` or a comparison function returning negative, zero or positive.

<GhulExample name="pipes-ref-sort-function" signature />

or, as a method:

<GhulExample name="pipes-ref-sort-method" signature />

### sort_descending

<GhulExample name="pipes-ref-sort_descending-function" signature />

or, as a method:

<GhulExample name="pipes-ref-sort_descending-method" signature />

### sort_by

<GhulExample name="pipes-ref-sort_by-function" signature />

or, as a method:

<GhulExample name="pipes-ref-sort_by-method" signature />

### sort_by_descending

<GhulExample name="pipes-ref-sort_by_descending-function" signature />

or, as a method:

<GhulExample name="pipes-ref-sort_by_descending-method" signature />

## terminals

A terminal returns something other than a pipe, so it is where a pipe ends. They
fall into three loose groups:
finding a single element, collecting the elements into a container, and folding
or consuming the sequence as a whole.

The searching combinators come in pairs. `find`-style ones take a predicate or
a mapper and scan; `first`-style ones look only at the leading element. Each has a
variant returning `MAYBE[T]` and one that throws instead:

<GhulExample name="pipes-searching" />

### find

The first element matching the predicate, absent if none does. `first` is the same question with no predicate.

<GhulExample name="pipes-ref-find-function" signature />

or, as a method:

<GhulExample name="pipes-ref-find-method" signature />

### find_map

Calls `mapper` on each element in turn and returns the first present result. `first_map` differs: it calls the mapper on the *first* element only, and gives up if that one declines.

<GhulExample name="pipes-ref-find_map-function" signature />

or, as a method:

<GhulExample name="pipes-ref-find_map-method" signature />

### find_or_throw

As `find`, throwing instead of returning absent when nothing matches.

<GhulExample name="pipes-ref-find_or_throw-function" signature />

or, as a method:

<GhulExample name="pipes-ref-find_or_throw-method" signature />

### find_map_or_throw

As `find_map`, throwing instead of returning absent when nothing maps.

<GhulExample name="pipes-ref-find_map_or_throw-function" signature />

or, as a method:

<GhulExample name="pipes-ref-find_map_or_throw-method" signature />

### first

The leading element, absent when the source is empty.

<GhulExample name="pipes-ref-first-function" signature />

or, as a method:

<GhulExample name="pipes-ref-first-method" signature />

### first_map

Calls `mapper` on the leading element only. Compare `find_map`, above, which keeps going.

<GhulExample name="pipes-ref-first_map-function" signature />

or, as a method:

<GhulExample name="pipes-ref-first_map-method" signature />

### first_or_throw

As `first`, throwing instead of returning absent when the source is empty.

<GhulExample name="pipes-ref-first_or_throw-function" signature />

or, as a method:

<GhulExample name="pipes-ref-first_or_throw-method" signature />

### first_map_or_throw

As `first_map`, throwing instead of returning absent.

<GhulExample name="pipes-ref-first_map_or_throw-function" signature />

or, as a method:

<GhulExample name="pipes-ref-first_map_or_throw-method" signature />

### only

The single element the source holds, throwing when it holds none or more than one.

<GhulExample name="pipes-ref-only-function" signature />

or, as a method:

<GhulExample name="pipes-ref-only-method" signature />

### any

<GhulExample name="pipes-ref-any-function" signature />

or, as a method:

<GhulExample name="pipes-ref-any-method" signature />

### all

<GhulExample name="pipes-ref-all-function" signature />

or, as a method:

<GhulExample name="pipes-ref-all-method" signature />

### count

<GhulExample name="pipes-ref-count-function" signature />

or, as a method:

<GhulExample name="pipes-ref-count-method" signature />

### min

The smallest element, absent when the source is empty. `min` and `max` have no method form.

<GhulExample name="pipes-ref-min-function" signature />

### max

<GhulExample name="pipes-ref-max-function" signature />

### min_by

<GhulExample name="pipes-ref-min_by-function" signature />

or, as a method:

<GhulExample name="pipes-ref-min_by-method" signature />

### max_by

<GhulExample name="pipes-ref-max_by-function" signature />

or, as a method:

<GhulExample name="pipes-ref-max_by-method" signature />

The collecting combinators differ in what they hand back:

<GhulExample name="pipes-collecting" />

### collect

Collects into the read-only `Collections.List[T]`. `collect_list` gives back the mutable `LIST[T]` instead, and the others collect into an array, a set, or a map.

<GhulExample name="pipes-ref-collect-function" signature />

or, as a method:

<GhulExample name="pipes-ref-collect-method" signature />

### collect_array

<GhulExample name="pipes-ref-collect_array-function" signature />

or, as a method:

<GhulExample name="pipes-ref-collect_array-method" signature />

### collect_list

<GhulExample name="pipes-ref-collect_list-function" signature />

or, as a method:

<GhulExample name="pipes-ref-collect_list-method" signature />

### collect_set

<GhulExample name="pipes-ref-collect_set-function" signature />

or, as a method:

<GhulExample name="pipes-ref-collect_set-method" signature />

### collect_map

<GhulExample name="pipes-ref-collect_map-function" signature />

or, as a method:

<GhulExample name="pipes-ref-collect_map-method" signature />

### partition

Splits the source in two on a predicate. The elements matching the predicate come first, then the elements not matching.

<GhulExample name="pipes-ref-partition-function" signature />

or, as a method:

<GhulExample name="pipes-ref-partition-method" signature />

### group_by

Collects the elements into a map, keyed by what `key_selector` returns for each.

<GhulExample name="pipes-ref-group_by-function" signature />

or, as a method:

<GhulExample name="pipes-ref-group_by-method" signature />

### reduce

Folds the source into a single value, starting at `seed` and calling `accumulator` with the running value and each element in turn. The second form passes the final running value through a mapper before returning it.

<GhulExample name="pipes-ref-reduce-function" signature />

or, as a method:

<GhulExample name="pipes-ref-reduce-method" signature />

### each

Calls `action` on every element. It returns nothing and, alone among these, is not `pure` - it exists for its side effects.

<GhulExample name="pipes-ref-each-function" signature />

or, as a method:

<GhulExample name="pipes-ref-each-method" signature />

### append_to

Appends each element to a `StringBuilder`, separated by `separator`, or by `", "` when that is left off. `join` is the same thing answering a fresh string.

<GhulExample name="pipes-ref-append_to-function" signature />

or, as a method:

<GhulExample name="pipes-ref-append_to-method" signature />

### join

Renders the elements into one string, separated by `separator`, or by `", "` when left off.

<GhulExample name="pipes-ref-join-function" signature />

or, as a method:

<GhulExample name="pipes-ref-join-method" signature />
