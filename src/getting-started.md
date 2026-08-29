# getting started

There are three ways to start writing ghūl: in the browser, in a GitHub Codespace, or on your own machine.

## in the browser

The [ghūl playground](https://playground.ghul.dev) compiles and runs ghūl in your browser, with live errors, completion and hover as you type. There is nothing to install. It is what runs the editable examples on this site, and its own menu offers complete programs to start from.

## in a Codespace

The [ghūl scratchpad](https://github.com/degory/ghul-scratchpad) is a minimal one-file project: open it in a GitHub Codespace and it arrives with the .NET SDK, the compiler and the language extension ready to go. Paste any example from this site into `main.ghul`{:text} and `dotnet run`{:sh}. This needs a GitHub account and nothing else.

The [examples repository](https://github.com/degory/ghul-examples) works the same way, with fuller, runnable examples organised by topic.

Both repositories are configured as [dev containers](https://containers.dev), so the same ready-made environment also opens in VS Code with the Dev Containers extension, or in any other tool that supports them.

## on your own machine

To work locally you need the [.NET 10 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/10.0) and an editor, and some ghūl code to start from - clone the scratchpad or the examples repository above, or start a project of your own from the [repository template](https://github.com/degory/ghul-repository-template). The compiler is pinned in each repository as a local .NET tool, so it arrives with the code: `dotnet tool restore`{:sh} fetches it.

[Visual Studio Code](https://code.visualstudio.com) with the [ghūl language extension](https://marketplace.visualstudio.com/items?itemName=degory.ghul) gives you errors and warnings as you type, completion, hover, go to definition, rename and formatting. Any editor that can install VS Code extensions gets the same support; other editors can drive the underlying language server directly - see [other editors](/tooling.html#other-editors) on the tooling page.

## it's all ordinary .NET

A ghūl project is a normal .NET SDK project. In each repository above you'll find a `.ghulproj`{:text} - an MSBuild project file with the usual things in it - and the normal `dotnet`{:text} commands work as you'd expect:

```bash
dotnet build
dotnet run
dotnet test
dotnet pack
```

A ghūl project can reference NuGet packages, produce libraries or executables, and be packed and published exactly like a C# project.

To set up a project from scratch, or for more on the template, see [creating a project](/tooling.html#creating-a-project) on the tooling page.
