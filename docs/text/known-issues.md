# known issues

There are numerous known issues, particularly in [the compiler](https://github.com/degory/ghul/issues) and in the [Visual Studio Code language extension](https://github.com/degory/ghul-vsce/issues). If you encounter a problem not already recorded in a GitHub issue, please raise a new issue. If an existing issue is blocking you, please add a comment on the issue, and I'll investigate, or feel free to raise a PR.

Areas where you might particularly notice problems include:

## spurious errors reported by the language extension

There are several scenarios where you might receive spurious errors from the language extension when working in Visual Studio Code.

### opening files unrelated to the project
If you have a ghūl project open, and you open additional ghūl source files that are not related to that project, the language extension may incorrectly assume those files are part of the project. This can result in misleading errors. This issue is particularly prevalent in unit test projects, where the tests folder is nested within the project folder, causing the test source files to appear in the VSCode project explorer view. The workaround is to close the unrelated files and reload the project in Visual Studio with `<ctrl>` + `P` then select `Developer: Reload Window`. Then open a new separate VSCode window on the project folder containing the other source files you want to edit.

### opening individual files without a project
Similarly, opening individual ghūl source files in Visual Studio Code without opening the project root folder as a workspace can result in misleading error messages. The workaround is to close these files and then reopen VSCode, ensuring you open the project folder rather than individual files.

### cascade of follow-on errors after an initial serious error
Occasionally one error in your ghūl source code can trigger a whole series of subsequent errors. This could be due to the parser failing to resynchronize with valid code following a syntax error, or, more rarely, an unrecoverable internal error in the compiler due to corrupted compiler state. The extension will recover from these issues if you address the error causing the cascade, but identifying the root cause is not always straightforward. Using `<ctrl>` + `Z` / `Undo` can help revert to a state before the problem arose. Alternatively, the first error in the error cascade in the file you're editing is often the culprit. If you cannot isolate the cause, feel free to raise an issue, preferably with example code that reproduces it.

### errors appear whilst editing and subsequently disappear
This is a result of how the language extension and compiler operate. As you edit, the language extension buffers your changes, waiting for a pause in typing. Once you stop, the extension sends the latest version of the edited source files to the compiler, which compiles them and sends updated diagnostics back to the extension. To minimize latency for functions like code completion, the first recompilation after an edit is partial: the edited files are fully compiled, but the rest of the project is only compiled up to the global definitions. The bodies of functions, methods, and properties in unedited files are not compiled during this phase. The extension then waits longer, and if no further edits occur, it requests a full compilation of the entire project. This strategy boosts responsiveness for large projects, but can lead to spurious errors between the partial and full compilations, especially if further edits are made before the full compilation. The workaround is to wait a few seconds for the full compilation to complete.

### valid errors not cleared after edits to correct them
Very occasionally, if you have an error in your code and you make an edit that corrects it, you may find the error doesn't disappear. This can be caused by the state machine in the extension failing to queue a compile or by the extension's copy of the diagnostic state getting out of step with the compiler. Recent changes to the compiler and language extension have greatly reduced incidences of this problem but not completely eliminated it. The workaround for the first scenario is to make another change to the source to force a recompile (adding and immediately removing a space character for example). The workaround for the second scenario is to reload your project with `<ctrl>` + `P` then `Developer: Reload Window`.

## limitations of generics

ghūl supports generics on classes, structs, traits, methods, unions and global functions, with type-parameter constraints (type bound, kind, `new`) and declared variance on traits. A few limitations remain.

### only a single type bound per parameter

The parser accepts `[T: A]` (a single type bound) and `[T: A class new]` (a bound combined with kind and constructor constraints). Multiple type bounds (`[T: A /\ B]`) are not yet supported and are rejected with a clear diagnostic.

### variance is declared only on traits

The CLR permits variance only on interfaces, so `out` / `in` modifiers can be declared only on a trait's type parameters. Declaring variance on a class or struct is rejected at parse time.

Type variance for built-in types is fixed and is not user-declarable. Function types are contravariant in their parameters and covariant in their return; arrays of reference types are covariant; everything else (including `List[T]`, `Map[K, V]`, `Iterable[T]`) is invariant.
