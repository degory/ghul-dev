# syntax in ghūl

## projects and files

A ghūl project is composed of a set of ghūl source files. Source files should have a `.ghul` file extension, and must be UTF-8 text.

Each source file can contain zero, one or more global definitions. Definitions can be in any order and in any file. Source files can have any name, provided they have a `.ghul` extension, and can be in any folder under the project root (subject to any source file glob pattern given in the `.ghulproj`)

## tokens and trees

Source files are translated into various kinds of tokens. Some tokens are a fixed sequence of characters (like the keyword `while`). Others are composed of characters according to various rules (identifiers, strings, numbers etc.)

With a couple of exceptions, ghūl tokens are similar to most common programming languages. The exceptions are:

### operators

Operators are any contiguous string of operator characters. This is only significant in the rare case where running together the characters that comprise two different operators might not have the result you expect

### escaped identifiers

When it appears at the beginning of an identifier, the backtick character `` ` `` acts as an escape. So where `while` is a ghūl keyword, `` `while`` is an identifier which starts with a backtick


## block structure

ghūl is a [block structured programming language](https://en.wikipedia.org/wiki/Block_(programming)). Source code in ghūl is composed of blocks, typically many of them, with blocks nested inside other blocks.

Blocks are delimited by keywords. The keywords that begin and end a block are specific to each different kind of block. This way of delimited blocks is descended from the ALGOL family of languages, most specifically from [ALGOL 68](https://en.wikipedia.org/wiki/ALGOL_68). It has the advantage of making the block structure clearer, both to someone reading the code and to the compiler.

```ghul
if x > y then
   write_line("x > y")
else
   write_line("x <= y)
fi
```

In this example `then`, `else` and `fi` all delimit blocks. The blocks they delimit contain statement lists. 

## semicolons

Semicolons are required: to separate statements and definitions. 

While the compiler _could_ still unambiguously parse correct programs without requiring semicolons anywhere, having them at the end expression statements makes it clearer to the parser if the expression is incomplete or not well formed.

## definitions and statements

Blocks in ghūl can contain definitions, statements, or a mix of both. Which is permitted in a given block depends on the type of block.

## file structure


