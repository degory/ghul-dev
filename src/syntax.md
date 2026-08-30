# syntax in ghūl

## projects and files

A ghūl project is composed of a set of ghūl source files. Source files should have a `.ghul`{:text} file extension, and must be UTF-8 text.

Each source file can contain zero, one or more global definitions. Definitions can be in any order and in any file. Source files can have any name, provided they have a `.ghul`{:text} extension, and can be in any folder under the project root (subject to any source file glob pattern given in the `.ghulproj`{:text})

A file with no `namespace` can mix definitions with statements at the top level, so a whole program can read as a script with no explicit `entry` function. These are called [top-level statements](#top-level-statements).

## tokens and trees

Source files are translated into various kinds of tokens. Some tokens are a fixed sequence of characters (like the keyword `while`). Others are composed of characters according to various rules (identifiers, strings, numbers etc.)

With a couple of exceptions, ghūl tokens are similar to most common programming languages. The exceptions are:

### operators

Operators are any contiguous string of operator characters. This is only significant in the rare case where running together the characters that comprise two different operators might not have the result you expect

### escaped identifiers

A leading backtick escapes a keyword or operator so it can be used as an ordinary identifier: `` `while`` is the identifier `while`, and `` `+`` is the identifier `+`. The backtick is not part of the escaped name, so escaping a name that is not a keyword, like `` `count``, means the same as plain `count`. A backtick is only meaningful immediately before an identifier, operator, or opening bracket; anywhere else it is a dangling-backtick error.


## block structure

ghūl is a [block structured programming language](https://en.wikipedia.org/wiki/Block_(programming)). Source code in ghūl is composed of blocks, typically many of them, with blocks nested inside other blocks.

Blocks are delimited by keywords. The keywords that begin and end a block are specific to each different kind of block. This way of delimited blocks is descended from the ALGOL family of languages, most specifically from [ALGOL 68](https://en.wikipedia.org/wiki/ALGOL_68). It has the advantage of making the block structure clearer, both to someone reading the code and to the compiler.

<GhulExample name="syntax-1" />

In this example `then`, `else` and `fi` all delimit blocks. The blocks they delimit contain statement lists, and they do so whether the `if` is used as a statement or as an expression - see [every arm is a statement block](/expression-oriented-programming.html#every-arm-is-a-statement-block).

## semicolons

A semicolon separates two statements or definitions written on one line. At the end of a line it is not needed: wherever the grammar could accept one, a line break stands in for it.

That is almost the whole of what a `;` does. Nothing reads it for meaning - a body's tail value is judged by its type, not by whether the statement carrying it was terminated - so the style throughout this site leaves it off. The one exception is a `;` between two string literals: adjacent string literals join into a single literal across a line break, so where a statement ends on a string and the next begins with one, the `;` is what keeps them apart, and `redundant-semicolon` never reports it.

A few line-start tokens keep a wrapped expression unambiguous. A line opening with `.`, `|` or `|>` carries the expression above it on, which is how member chains and pipes wrap. A line opening with `(`, `[`, an operator or `rec` starts something new, so a wrapped operator expression puts the operator at the end of the line rather than the start of the next.

Two warnings police the choice, and both are off unless asked for: `--warn missing-semicolon` reports every inferred boundary, for a project that writes its terminators out, and `--warn redundant-semicolon` reports a written one a line break would infer anyway.

## definitions and statements

Blocks in ghūl can contain definitions, statements, or a mix of both. Which is permitted in a given block depends on the type of block.

## file structure

At its top level a ghūl source file contains [definitions](/definitions.html) and `use` directives; a file with no `namespace` can also contain statements. There is no required ordering and no file header.

<GhulExample name="syntax-2" />

The definitions in a file can be global functions, properties, classes, structs, traits, unions and enums, or `namespace` blocks that group definitions under a name. A definition is visible to the rest of the project regardless of which file it appears in, so how source is split across files is purely a matter of organisation.

A file that declares any `namespace` must place all of its definitions inside namespaces. A file with no namespace at all has its definitions placed in a private namespace of their own, which is convenient for small programs and tests. Namespaces, `use` and symbol visibility are covered in full under [definitions](/definitions.html#namespaces).

## top-level statements

A file with no `namespace` can also have statements at its top level. They run in source order as the program's entry point, so a short program needs no `entry` function:

<GhulExample name="top-level-statements-1" />

Definitions in the same file are still hoisted, so a top-level statement can use a function or type declared anywhere in the file. Top-level statements and a `namespace` cannot appear in the same file.

Otherwise, execution of a program begins at a function named `entry`.

