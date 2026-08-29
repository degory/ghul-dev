# getting started

Three things get you writing ghūl: an editor, the .NET SDK, and some ghūl code to start from. The compiler is not on the list - a ghūl repository pins it as a local .NET tool, so it arrives with the code.

## prerequisites

Two things to have in place before the code: an editor, and the .NET SDK.

### an editor

[Visual Studio Code](https://code.visualstudio.com) with the [ghūl language extension](https://marketplace.visualstudio.com/items?itemName=degory.ghul) gives you errors and warnings as you type, completion, hover, go to definition, rename and formatting.

The extension is an ordinary Visual Studio Code extension, so any editor that can install VS Code extensions gets ghūl support out of the box. Other editors can drive the underlying language server directly - see [other editors](/tooling.html#other-editors) on the tooling page.

### the .NET SDK

ghūl is hosted on .NET: the compiler runs on the [.NET 10 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/10.0), and the assemblies it produces target .NET 10.

You can skip installing anything locally: the repositories below ship a dev container, so opening one in a GitHub Codespace, or in VS Code with the Dev Containers extension, gives you the SDK, the compiler and the language extension ready to go.

## some ghūl code

- The [ghūl playground](https://playground.ghul.dev) compiles and runs ghūl in your browser, with live errors, completion and hover as you type - and every example on this site opens in it.
- The [ghūl scratchpad](https://github.com/degory/ghul-scratchpad) is a minimal one-file project: open it in a Codespace or clone it, paste any example from this site into `main.ghul`{:text}, and `dotnet run`{:sh}.
- The [examples repository](https://github.com/degory/ghul-examples) has fuller, runnable examples organised by topic.

Both repositories pin the ghūl compiler as a local .NET tool, so there is nothing separate to install: `dotnet tool restore`{:sh} fetches it, and the dev containers run that for you.

## it's all ordinary .NET

A ghūl project is a normal .NET SDK project. In either repository you'll find a `.ghulproj`{:text} - an MSBuild project file with the usual things in it - and the normal `dotnet`{:text} commands work as you'd expect:

```bash
dotnet build
dotnet run
dotnet test
dotnet pack
```

A ghūl project can reference NuGet packages, produce libraries or executables, and be packed and published exactly like a C# project.

To start a project of your own - from a template, from the repository template, or from scratch - see [creating a project](/tooling.html#creating-a-project) on the tooling page.
