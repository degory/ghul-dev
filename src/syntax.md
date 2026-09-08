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

Write a semicolon between two statements or definitions on the same line. At the end of a line, leave it off: the line break ends the statement, and so does the end of the file. The compiler reports a semicolon at the end of a line as a `redundant-semicolon` warning.

Write one at the end of a line in one case: where the statement ends on a string literal and the next line begins with one. Adjacent string literals join into a single literal, across a line break as well as within a line, so the semicolon is what keeps the two apart.

A line break ends a statement only where the statement is complete, so break a long expression after an operator or an open bracket, and start a wrapped member chain or pipe on `.` or `|>`. The full rules are under [statement terminators](/grammar.html#statement-terminators) in the grammar.

`--inlay terminator` marks each inferred statement boundary as an editor inlay hint.

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

