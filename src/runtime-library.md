# runtime library

`Ghul.Runtime` ships alongside the compiler and supplies `Pipe[T]` and other
everyday building blocks used throughout this site. The reference below
covers `Ghul.Pipes`, the sequence-processing library behind
[filter, map, reduce](/functional-programming#filter-map-reduce) and the
[thread-first operator](/functional-programming).

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

## Ghul.Pipes

Most combinators below exist in both forms; the free function comes first
and the equivalent method beneath it as the alternative.

### pipe

Lifts any `Iterable[T]` - an array, a `LIST[T]`, a `MAP[T]`'s values,
anything with an `.iterator` - into a `Pipe[T]`. This is what the `|`
operator calls to wrap its left operand.

<GhulExample name="pipes-ref-pipe-function" signature />

### filter

<GhulExample name="pipes-ref-filter-function" signature />

or, as a method:

<GhulExample name="pipes-ref-filter-method" signature />

### map

<GhulExample name="pipes-ref-map-function" signature />

or, as a method:

<GhulExample name="pipes-ref-map-method" signature />

### flat_map

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

### distinct

<GhulExample name="pipes-ref-distinct-function" signature />

or, as a method:

<GhulExample name="pipes-ref-distinct-method" signature />

### peek

<GhulExample name="pipes-ref-peek-function" signature />

or, as a method:

<GhulExample name="pipes-ref-peek-method" signature />

### chunk

<GhulExample name="pipes-ref-chunk-function" signature />

or, as a method:

<GhulExample name="pipes-ref-chunk-method" signature />

### windows

<GhulExample name="pipes-ref-windows-function" signature />

or, as a method:

<GhulExample name="pipes-ref-windows-method" signature />

### cat

<GhulExample name="pipes-ref-cat-function" signature />

or, as a method:

<GhulExample name="pipes-ref-cat-method" signature />

### union_with

<GhulExample name="pipes-ref-union_with-function" signature />

or, as a method:

<GhulExample name="pipes-ref-union_with-method" signature />

### intersect_with

<GhulExample name="pipes-ref-intersect_with-function" signature />

or, as a method:

<GhulExample name="pipes-ref-intersect_with-method" signature />

### except

<GhulExample name="pipes-ref-except-function" signature />

or, as a method:

<GhulExample name="pipes-ref-except-method" signature />

### index

<GhulExample name="pipes-ref-index-function" signature />

or, as a method:

<GhulExample name="pipes-ref-index-method" signature />

### zip

<GhulExample name="pipes-ref-zip-function" signature />

or, as a method:

<GhulExample name="pipes-ref-zip-method" signature />

### reduce

<GhulExample name="pipes-ref-reduce-function" signature />

or, as a method:

<GhulExample name="pipes-ref-reduce-method" signature />

### collect

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

<GhulExample name="pipes-ref-partition-function" signature />

or, as a method:

<GhulExample name="pipes-ref-partition-method" signature />

### group_by

<GhulExample name="pipes-ref-group_by-function" signature />

or, as a method:

<GhulExample name="pipes-ref-group_by-method" signature />

### min_by

<GhulExample name="pipes-ref-min_by-function" signature />

or, as a method:

<GhulExample name="pipes-ref-min_by-method" signature />

### max_by

<GhulExample name="pipes-ref-max_by-function" signature />

or, as a method:

<GhulExample name="pipes-ref-max_by-method" signature />

### count

<GhulExample name="pipes-ref-count-function" signature />

or, as a method:

<GhulExample name="pipes-ref-count-method" signature />

### find

<GhulExample name="pipes-ref-find-function" signature />

or, as a method:

<GhulExample name="pipes-ref-find-method" signature />

### find_map

<GhulExample name="pipes-ref-find_map-function" signature />

or, as a method:

<GhulExample name="pipes-ref-find_map-method" signature />

### find_or_throw

<GhulExample name="pipes-ref-find_or_throw-function" signature />

or, as a method:

<GhulExample name="pipes-ref-find_or_throw-method" signature />

### find_map_or_throw

<GhulExample name="pipes-ref-find_map_or_throw-function" signature />

or, as a method:

<GhulExample name="pipes-ref-find_map_or_throw-method" signature />

### first

<GhulExample name="pipes-ref-first-function" signature />

or, as a method:

<GhulExample name="pipes-ref-first-method" signature />

### first_map

<GhulExample name="pipes-ref-first_map-function" signature />

or, as a method:

<GhulExample name="pipes-ref-first_map-method" signature />

### first_or_throw

<GhulExample name="pipes-ref-first_or_throw-function" signature />

or, as a method:

<GhulExample name="pipes-ref-first_or_throw-method" signature />

### first_map_or_throw

<GhulExample name="pipes-ref-first_map_or_throw-function" signature />

or, as a method:

<GhulExample name="pipes-ref-first_map_or_throw-method" signature />

### only

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

### for_each

<GhulExample name="pipes-ref-for_each-function" signature />

or, as a method:

<GhulExample name="pipes-ref-for_each-method" signature />

### reverse

<GhulExample name="pipes-ref-reverse-function" signature />

or, as a method:

<GhulExample name="pipes-ref-reverse-method" signature />

### sort

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

### append_to

<GhulExample name="pipes-ref-append_to-function" signature />

or, as a method:

<GhulExample name="pipes-ref-append_to-method" signature />

### join

<GhulExample name="pipes-ref-join-function" signature />

or, as a method:

<GhulExample name="pipes-ref-join-method" signature />

### min

<GhulExample name="pipes-ref-min-function" signature />

### max

<GhulExample name="pipes-ref-max-function" signature />

