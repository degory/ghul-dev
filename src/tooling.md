# tooling

The ghūl compiler is a .NET tool, and ghūl projects are ordinary .NET SDK projects. This means most of the tooling you already use for .NET applies directly, with a language extension on top for editing.

## the compiler

The compiler is published as the [`ghul.compiler`{:text}](https://www.nuget.org/packages/ghul.compiler) .NET tool. Once installed it is invoked as `dotnet ghul-compiler`{:sh}.

You don't usually run the compiler by hand. ghūl projects are built with MSBuild through a `.ghulproj`{:text} project file, and the `ghul.runtime`{:text} package supplies the MSBuild targets that drive the compiler for you. See [getting started](/getting-started.html) for installing the compiler and setting up a project.

The compiler is normally installed as a *local* .NET tool, pinned per project in `.config/dotnet-tools.json`{:text}, so everyone building the project uses the same compiler version. `dotnet tool restore`{:sh} restores it.

## building and running

Because a ghūl project is a normal .NET SDK project, the standard `dotnet`{:text} commands all work:

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

## dev containers

The ghūl repository template and the examples repo both ship a `.devcontainer` configured to use a standard .NET 10 dev container image - for example [`mcr.microsoft.com/devcontainers/dotnet:10.0`](https://hub.docker.com/r/microsoft/devcontainers-dotnet). Open the project in VS Code with the Dev Containers extension, or in a GitHub Codespace, and `dotnet tool restore`{:sh} will install the compiler from the local tool manifest. Any image with the .NET 10 SDK and `dotnet`{:text} on the PATH will work.

## project templates

The [`ghul.templates`{:text}](https://www.nuget.org/packages/ghul.templates) package adds ghūl project templates to the .NET SDK:

```bash
dotnet new install ghul.templates
```

Once installed, `dotnet new`{:sh} can scaffold a ghūl project pre-configured with a `.ghulproj`{:text}, the compiler pinned as a local tool, and a starting source file. See [getting started](/getting-started.html) for the other ways to get a project off the ground.
