# bootstrap

As ghūl is a [self hosting compiler](https://github.com/degory/ghul), it can compile itself. To get to this point required bootstrapping the compiler. Although bootstrapping it is now straightforward, and it's routinely bootstrapped by the CI/CD pipeline on every PR merge and release, the initial bootstrap was much more complex.

The original basis for the compiler was written many years ago in C++, and it compiled a language quite different to ghūl - a language I called L. I bootstrapped this L compiler by manually translating the compiler source code from C++ into L. This was made easier (if not less tedious) by carefully sticking to an L compatible subset of C++ when writing the L compiler.

Then a few years later when I decided to design the ghūl programming lanuage, I needed a new compiler. I wrote this first iteration of the ghūl compiler in L. The early versions of this compiler a simple source level L to L transpiler. These early versions did no semantic analysis at all, relying on the L compiler to catch and report all semantic errors.

I then extended this L to L transpiler to accept and generate both ghūl and L syntax. Next I ran the L source for the transpiler through itself in ghūl output mode, to produce a new version written in ghūl. This got me a simple self hosting ghūl compiler, although it was very primitive, still doing no semantic analysis.

Then I gradually added semantic analysis to the compiler, giving it representations of classes, traits, methods, functions, variables, and the like, and all the type and other semantic checks that go with that.

Once the compiler was building a sufficiently detailed representation of input programs, I added a .NET IL generation back end, retaining the L source code backend alongside it until the .NET IL backend was stable enough to host the compiler.

Finally, once the compiler was self-hosting on .NET, I was able to remove the L transpilation backend, and the compiler was bootstrapped onto .NET.

You can see this process in the Git history in the ghūl compiler repo, going all the way back to the initial commit.