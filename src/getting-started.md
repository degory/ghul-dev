# getting started

## prerequisites

The ghūl programming language compiler requires the [.NET 8.0 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)

## target

The compiler produces standard .NET assemblies and packages targeting .NET 8.0

## getting the ghūl compiler

There are a few different ways to get the compiler

### use a ghūl .NET project template

If you initialize your project using one of the [ghūl .NET project templates](https://www.nuget.org/packages/ghul.templates/), the template will add the compiler to your project folder as a local .NET tool - just run `dotnet tool restore` to restore it. 

### clone the ghūl GitHub repository template

If you create a new GitHub repo from the [ghūl repository template](https://github.com/degory/ghul-repository-template), then the compiler will be pre-configured as a local .NET tool in your project folder - run `dotnet tool restore` to restore it.

### use the ghūl development container image

The compiler is pre-installed globally in the [ghūl development container](https://github.com/users/degory/packages/container/package/ghul%2Fdevcontainer)

### install the compiler as a local or global .NET tool

You can manually install the compiler from the [ghūl compiler .NET tool package](https://www.nuget.org/packages/ghul.compiler/)

## using the compiler

### project file

The compiler expects to be driven by MSBuild using a `.ghulproj` project file.
See the [ghūl targets](https://www.nuget.org/packages/ghul/) package for
a minimal example, or use one of the project templates to get started.

### source files

You'll need some ghūl source files. By convention ghūl source files have the extension `.ghul`, and the standard MSBuild targets will include `**/*.ghul` when building.

### building and running

Once you have a project file and some ghūl source files, you can use the normal
.NET SDK commands to build, pack, and run your project:

```bash
dotnet build
```

```bash
dotnet pack
```

```bash
dotnet run
```

### runtime dependencies for ghūl applications

Applications written in ghūl require the [.NET 8.0](https://dotnet.microsoft.com/download/dotnet/8.0) runtime

## development environment

### Visual Studio Code

[Visual Studio Code](https://code.visualstudio.com) will give you rich language support via the [ghūl VSCode language extension](https://marketplace.visualstudio.com/items?itemName=degory.ghul).

### Other editors

The [ghūl language extension implementation](https://github.com/degory/ghul-vsce) is currently tightly coupled to the Visual Studio Code extension API. However under the hood it is using the [Language Server Protocol](https://microsoft.github.io/language-server-protocol/) as so could be extended to support other clients. Feel free to submit a PR. 