# bootstrap

As ghūl is a [self-hosting compiler](https://github.com/degory/ghul), it can compile itself from its own source code. Getting to this point required bootstrapping the compiler. Bootstrapping it now is routine: it's done by the CI/CD pipeline on every PR merge and release. However, the initial bootstrap was much more complex.

The original basis for the compiler was written many years ago in C++, and it compiled a language quite different from ghūl - a language I called L. To bootstrap the L compiler, I manually translated its C++ source code into L. This was made easier (if no less tedious) by carefully sticking to an L-compatible subset of C++ when writing the L compiler.

A few years later, when I decided to design the ghūl programming language, I needed a new compiler. I wrote this first version of the ghūl compiler in L. Initially, this compiler was a simple source-level L to L transpiler, performing no semantic analysis, and relying on the L compiler for semantic error detection and reporting.

I then enhanced this L to L transpiler to support both ghūl and L syntax. I processed the L source code of the transpiler through this modified version, generating output in ghūl, yielding a rudimentary self-hosting ghūl compiler. However, this early version still depended on the L compiler for semantic analysis, error checking, and code generation.

Gradually, I integrated more semantic analysis into the ghūl compiler. This addition included representations of classes, traits, methods, functions, variables, etc., along with corresponding error checking and reporting.

With the compiler now capable of constructing a detailed representation of input programs, I added a .NET IL generation backend. I maintained the L source code backend alongside the .NET IL backend until the .NET IL backend was sufficiently complete and stable to self-host the compiler on .NET. This phase was awkward due to L's LLVM backend and its standard library, with features like generic collections and file handling, which interfaced with glibc and were not source compatible with similar facilities in .NET. I solved this by building a small subset of the .NET standard library in L, and then porting references to the L standard library in the ghūl compiler to use this .NET library subset, thus enabling the compiler to be built on and target both L and .NET.

Finally, with the compiler reliably self-hosting on .NET, I removed the L transpilation backend and the .NET library subset, and the compiler was successfully bootstrapped onto .NET.

You can see this process in the Git history in the ghūl compiler repo, going all the way back to the initial commit.


