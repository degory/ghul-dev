# tooling

The ghūl compiler is a .NET tool, and ghūl projects are ordinary .NET SDK projects. This means most of the tooling you already use for .NET applies directly, with a language extension on top for editing.

## the compiler

The compiler is published as the [`ghul.compiler`{:text}](https://www.nuget.org/packages/ghul.compiler) .NET tool. Once installed it is invoked as `dotnet ghul-compiler`{:sh}.

You don't usually run the compiler by hand. ghūl projects are built with MSBuild through a `.ghulproj`{:text} project file, and the `ghul.runtime`{:text} package supplies the MSBuild targets that drive the compiler for you. See [creating a project](#creating-a-project) below for setting one up.

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

## running a script

The [`ghul.cli`{:text}](https://www.nuget.org/packages/ghul.cli) tool runs a
single `.ghul`{:text} file with no project file. It installs its own copy of
the compiler the first time it needs one, and caches each compiled script, so
a script that has not changed starts without compiling again:

```sh
dotnet tool install -g ghul.cli
ghul greet.ghul world
```

Everything after the script's name is passed to it as its command-line
arguments. On Linux a script can start with a `#!`{:text} line naming `ghul`
and then run like any other executable:

```ghul
#!/usr/bin/env ghul

IO.Std.write_line("hello, {if args.count > 0 then args[0] else "world" fi}")
```

```sh
chmod +x greet.ghul
./greet.ghul world
```

`ghul compile <script>`{:sh} compiles a script without running it and prints
the path of the result, and `ghul -`{:sh} reads the script from standard
input.

## the REPL

`ghul repl`{:sh} starts an interactive session. Each line you type is
compiled and run as soon as it is complete, and what it defines stays
available to every later line. A line that leaves something open, such as a
block with no closing keyword, waits for more with a `|`{:text} prompt. A
submission that ends on a value shows the value:

```plaintext
> let total mut = 0
> total = total + 5
> total
5
```

An `if`, `case`, loop or definition written over several lines doesn't end
the submission when it closes. The `|`{:text} prompt stays, and the next line
joins the same submission. A one-line statement typed there ends the
submission straight away and shows its value, as `names` does here:

```plaintext
> let names mut = LIST[string]()
> names.add("first")
> for name in ["second", "third"] do
|     names.add(name)
| od
| names
[first, second, third]
```

To end the submission on the construct itself, type a blank line or a line
holding only `.`{:text}. A blank line shows no value, since a construct over
several lines is usually there for what it does. A `.`{:text} line shows the
value the construct ends on:

```plaintext
> if names.count > 2 then
|     "several"
| else
|     "few"
| fi
| .
several
```

When the session reads from a pipe or a file rather than a terminal, a
construct over several lines ends the submission as soon as it closes, and a
`.`{:text} line ends one too.

The compiler's default imports (`use default`) are in force in every
submission, and a `use` you type stays in force for the rest of the session.
`ghul repl --no-default-use`{:sh} leaves the default imports out. Defining a
name again replaces it for later submissions and can read the value it
replaces, so `let x = x + 1` works.

At a terminal the line can be edited as it is typed: the arrow keys move
along it and bring back earlier lines, and Tab completes the name being
typed from everything the session has defined. `:complete TEXT`{:text} lists
what could follow some text, `:hover TEXT`{:text} shows what the end of it
names, `:reset`{:text} starts a fresh session and `:quit`{:text} leaves.

Each line starts indented four spaces further in after a line that opens a
block, and a line starting with a closing word such as `fi`{:text} or
`else`{:text} steps back out as the word is typed. Backspace in a line's
indent removes a whole step.

What you type is coloured as you type it, in the same colours as the
examples on this site: the dark set on a dark background and the light set
on a light one. The session asks the terminal for its background colour
and uses the dark colours when it can't find out.
`ghul repl --theme dark`{:sh}, `--theme light`{:sh} or `--theme none`{:sh}
chooses for it, and setting `NO_COLOR` turns colour off.

Messages call the third submission `cell-3`{:text}. In code it is `cell3`,
which is how a later submission reaches something the third one defined, as
in `cell3.x`. Each submission is compiled as a small library of its own, so a
name that begins with `_` stays private to the submission that defines it.

The session keeps one compiler running for as long as it lasts, which is what
makes each submission answer in tens of milliseconds.
`ghul repl --no-server`{:sh} starts the compiler for each submission instead,
which takes about a second each.

## notebooks

The [`ghul.jupyter`{:text}](https://www.nuget.org/packages/ghul.jupyter) tool
is a [Jupyter](https://jupyter.org) kernel for ghūl: each notebook cell is a
submission to the same kind of session the REPL runs. Install it and register
it with Jupyter:

```sh
dotnet tool install -g ghul.jupyter
ghul-jupyter install
```

To use it in VS Code, install the Jupyter extension, then reload the window
(**Developer: Reload Window**), since the Jupyter extension only looks for
kernels when it starts. Open or create a `.ipynb`{:text} file, choose
**Jupyter Kernel...** from the kernel picker, and pick **ghūl**. The ghūl
extension highlights the cells. A cell keeps the language it was created
with, so cells made before the ghūl kernel was chosen stay in their earlier
language until you change it from the language indicator at the cell's
bottom right.

The kernel compiles cells with the compiler `ghul.cli`{:text} installs, or
the `ghul-compiler`{:text} on the path. Installing `ghul.cli`{:text} and
running any script once is the simplest way to have one.

## diagnostics

Every warning has a slug, shown in its message. A slug can be silenced with `@suppress("<slug>")` on a declaration, a whole file, or the project, or re-levelled on the compiler command line: `--warn-as-hint <slug,…>` downgrades matching warnings to editor-only hints that never appear in a batch build, and `--warn-as-info <slug,…>` downgrades them to informational diagnostics that still show in a build. Suppression wins over a demotion.

## the Visual Studio Code extension

The [ghūl language extension](https://marketplace.visualstudio.com/items?itemName=degory.ghul) provides rich language support while you edit:

- errors and warnings reported as you type
- code completion
- hover information
- go to definition and find references
- rename
- signature help
- source code formatting

Behind the scenes the extension runs the ghūl compiler in its analysis mode. When a project is opened the extension restores its NuGet packages and builds it, then starts the compiler, which reads every source file and builds its analysis of the project; even for a small project this takes a few seconds. The compiler then stays resident and updates that analysis incrementally as you edit, reporting diagnostics back into the editor, so hover and completion typically answer in a few milliseconds regardless of project size.

On large projects the extension updates this analysis in two stages: a quick partial pass over the file you are editing, followed by a full pass once you pause. This is usually invisible, though it does mean a diagnostic can occasionally appear or disappear a moment after an edit.

## other editors

The extension's language support lives in a standalone [Language Server Protocol](https://microsoft.github.io/language-server-protocol/) server with no dependency on the VS Code API. It speaks stdio by default, so any editor with an LSP client can drive it - it has been tested with [Micro](https://micro-editor.github.io/), for example.

Install it from npm:

```sh
npm install -g @ghul/language-server
```

The command it installs is `ghul-language-server`{:text}, so point your editor's LSP client at that. The same package is attached as a `.tgz`{:text} to every [ghul-vsce release](https://github.com/degory/ghul-vsce/releases) if you would rather not install from npm.

## dev containers

The ghūl repository template and the examples repo both ship a `.devcontainer` configured to use a standard .NET 10 dev container image - for example [`mcr.microsoft.com/devcontainers/dotnet:10.0`](https://hub.docker.com/r/microsoft/devcontainers-dotnet). Open the project in VS Code with the Dev Containers extension, or in a GitHub Codespace, and `dotnet tool restore`{:sh} will install the compiler from the local tool manifest. Any image with the .NET 10 SDK and `dotnet`{:text} on the PATH will work.

## creating a project

### from a project template

The [`ghul.templates`{:text}](https://www.nuget.org/packages/ghul.templates) package adds ghūl project templates to the .NET SDK:

```bash
dotnet new install ghul.templates
```

Once installed, `dotnet new`{:sh} can scaffold a ghūl project pre-configured with a `.ghulproj`{:text}, the compiler pinned as a local tool, and a starting source file.

### from the repository template

If you create a new GitHub repo from the [ghūl repository template](https://github.com/degory/ghul-repository-template), the compiler comes pre-configured as a local .NET tool in your project folder - run `dotnet tool restore`{:sh} to restore it.

### from scratch

The compiler expects to be driven by MSBuild using a `.ghulproj`{:text} project file. See the [ghūl test](https://github.com/degory/ghul-test) project for a real-world example.

`Directory.Build.props`{:text}
```xml
<Project>
  <PropertyGroup>
    <Version>0.1.0-alpha.1</Version>
  </PropertyGroup>

  <ItemGroup>
    <!--
      ghul.runtime provides MSBuild targets required to drive the 
      ghul compiler
     -->
    <PackageReference Include="ghul.runtime" Version="0.0.0-latest.ghul.runtime" />
  </ItemGroup>
</Project>
```

`example.ghulproj`{:text}
```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>

    <GhulCompiler>dotnet ghul-compiler</GhulCompiler>
  </PropertyGroup>

  <ItemGroup>
    <GhulSources Include="src/**/*.ghul" />
  </ItemGroup>
</Project>
```

By convention ghūl source files have the extension `.ghul`{:text}, and the `ghul.runtime`{:text} provided MSBuild targets will include `**/*.ghul`{:text} when building.

To pin the compiler as a local tool in the project folder, so everyone building the project gets the same compiler:

```sh
dotnet new tool-manifest
dotnet tool install --local ghul.compiler --version 0.0.0-latest.ghul.compiler
```

The compiler can also be installed globally instead, from the [ghūl compiler .NET tool package](https://www.nuget.org/packages/ghul.compiler/):

```sh
dotnet tool install --global ghul.compiler
```

### runtime dependencies for ghūl applications

Applications written in ghūl require the [.NET 10 runtime](https://dotnet.microsoft.com/download/dotnet/10.0).
