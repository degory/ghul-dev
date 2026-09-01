# known issues

There are numerous known issues in [the compiler](https://github.com/degory/ghul/issues), and issues in the [Visual Studio Code language extension](https://github.com/degory/ghul-vsce) are recorded there too. If you encounter a problem not already recorded in a GitHub issue, please raise a new issue. If an existing issue is blocking you, please add a comment on the issue, and I'll investigate, or feel free to raise a PR.

Areas where you might particularly notice problems include:

## spurious errors reported by the language extension

There are several scenarios where you might receive spurious errors from the language extension when working in Visual Studio Code.

### source files under the project folder that are not part of the project
The language extension decides which project a source file belongs to by the folder it is in, rather than by the project's own list of sources. A ghūl source file that sits under the project folder but is not one of the project's sources is compiled as though it were part of the project, which can produce misleading errors. This is most noticeable in unit test projects, where the tests folder is nested within the project folder. If the nested folder has a project file of its own, add it to your VS Code workspace as a second folder: the extension runs a compiler per project folder, and the innermost folder claims the file. Source files outside the project folder are not affected, and neither are files opened without a project folder: the extension ignores both.

### cascade of follow-on errors after an initial serious error
Occasionally one error in your ghūl source code can trigger a whole series of subsequent errors. This could be due to the parser failing to resynchronize with valid code following a syntax error, or, more rarely, an unrecoverable internal error in the compiler due to corrupted compiler state. The extension will recover from these issues if you address the error causing the cascade, but identifying the root cause is not always straightforward. Using `<ctrl>` + `Z` / `Undo` can help revert to a state before the problem arose. Alternatively, the first error in the error cascade in the file you're editing is often the culprit. If you cannot isolate the cause, feel free to raise an issue, preferably with example code that reproduces it.

### errors appear whilst editing and subsequently disappear
This is a result of how the language extension and compiler work together. As you edit, the extension buffers your changes and waits for a pause in typing, then sends the edited file to the compiler and shows the diagnostics that come back. That first recompilation is incremental: when your edit leaves the file's declarations alone, only the bodies you changed are recompiled, and when it adds or replaces a declaration, the compiler splices that declaration into the symbol table it already holds. Either way the bodies of functions, methods and properties in files you have not edited are not recompiled, so an error that depends on code elsewhere in the project is not found yet. After a longer pause with no further edits, the extension asks for a full compilation, which finds it. So an error can appear at the full compilation and go away again at your next keystroke, or the other way round. The workaround is to stop typing for a few seconds and let the full compilation land.

## limitations of generics

ghūl supports generics on classes, structs, traits, methods, unions and global functions, with type-parameter constraints (type bounds joined with `/\`, kinds including `init`) and declared variance on traits. A few limitations remain.

### variance is declared only on traits

The CLR permits variance only on interfaces, so `out` / `in` modifiers can be declared only on a trait's type parameters. Declaring variance on a class or struct is rejected at parse time.

Type variance for built-in and imported types is fixed and is not user-declarable: it is read from the .NET type each name maps to. Function types are contravariant in their parameters and covariant in their return, and arrays of reference types are covariant. Of the collection traits, the read-only ones are covariant, so a `List[string]` can be read as a `List[object]` and an `Iterable[string]` as an `Iterable[object]`; the mutable ones, and `Map[K, V]`, are invariant.
