# tooling

The ghūl compiler is a .NET tool, and ghūl projects are ordinary .NET SDK projects. This means most of the tooling you already use for .NET applies directly, with a language extension on top for editing.

## the compiler

The compiler is published as the [`ghul.compiler`](https://www.nuget.org/packages/ghul.compiler) .NET tool. Once installed it is invoked as `dotnet ghul-compiler`.

You don't usually run the compiler by hand. ghūl projects are built with MSBuild through a `.ghulproj` project file, and the `ghul.runtime` package supplies the MSBuild targets that drive the compiler for you. See [getting started](/getting-started.html) for installing the compiler and setting up a project.

The compiler is normally installed as a *local* .NET tool, pinned per project in `.config/dotnet-tools.json`, so everyone building the project uses the same compiler version. `dotnet tool restore` restores it.

## building and running

Because a ghūl project is a normal .NET SDK project, the standard `dotnet` commands all work:

```bash
dotnet build   # compile the project
dotnet run     # build and run an executable project
dotnet pack    # produce a NuGet package
dotnet test    # run a test project
```

A ghūl project can reference NuGet packages, produce libraries or executables, and be packed and published exactly like a C# project.

## the Visual Studio Code extension

The [ghūl language extension](https://marketplace.visualstudio.com/items?itemName=degory.ghul) provides rich language support while you edit:

- errors and warnings reported as you type
- code completion
- hover information
- go to definition and find references
- rename
- signature help
- source code formatting

Behind the scenes the extension runs the ghūl compiler in its analysis mode: the compiler stays resident, maintains an up-to-date analysis of your project, and updates it as you edit, reporting diagnostics back into the editor.

On large projects the extension updates this analysis in two stages — a quick partial pass over the file you are editing, followed by a full pass once you pause. This is usually invisible, though it does mean a diagnostic can occasionally appear or disappear a moment after an edit.

## the development container

A [development container image](https://github.com/users/degory/packages/container/package/ghul%2Fdevcontainer) is published with the compiler, the .NET SDK, and the supporting tools pre-installed. Opening a project in this container — locally with the VS Code Dev Containers extension, or in a GitHub Codespace — gives you a ready-to-build ghūl environment with nothing to install.

The [ghūl repository template](https://github.com/degory/ghul-repository-template) is also set up to open in this container.

## project templates

The [`ghul.templates`](https://www.nuget.org/packages/ghul.templates) package adds ghūl project templates to the .NET SDK:

```bash
dotnet new install ghul.templates
```

Once installed, `dotnet new` can scaffold a ghūl project pre-configured with a `.ghulproj`, the compiler pinned as a local tool, and a starting source file. See [getting started](/getting-started.html) for the other ways to get a project off the ground.
