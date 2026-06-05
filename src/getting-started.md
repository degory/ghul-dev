# getting started

> **Examples**: if you just want to see some ghūl code examples and maybe experiment with writing some ghūl, then start with the **[ghūl examples repository](https://github.com/degory/ghul-examples)**. The examples project is ready to open in a devcontainer, or a GitHub Codespace.

## prerequisites

The ghūl programming language compiler requires the [.NET 10 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/10.0). The SDK includes the .NET 10 runtime that the compiler tool itself runs on, and will fetch reference packs for any target framework you build against on demand.

## target

The compiler produces standard .NET assemblies and packages targeting .NET 10 by default. Earlier target frameworks work too — set `<TargetFramework>net8.0</TargetFramework>`{:text} (or similar) in your `.ghulproj`{:text} and pin `ghul.runtime`{:text} to a net8.0-compatible release (e.g. `3.0.19`{:text}), since the 4.x line is net10.0-only.

## getting the ghūl compiler

There are a few different ways to get the compiler

### use a ghūl .NET project template

If you initialize your project using one of the [ghūl .NET project templates](https://www.nuget.org/packages/ghul.templates/), the template will add the compiler to your project folder as a local .NET tool - just run `dotnet tool restore`{:sh} to restore it. 

### clone the ghūl GitHub repository template

If you create a new GitHub repo from the [ghūl repository template](https://github.com/degory/ghul-repository-template), then the compiler will be pre-configured as a local .NET tool in your project folder - run `dotnet tool restore`{:sh} to restore it.

### use a dev container

The [examples repository](https://github.com/degory/ghul-examples) and the [ghūl repository template](https://github.com/degory/ghul-repository-template) both ship a `.devcontainer` configured to use a standard .NET 10 dev container image — for example [`mcr.microsoft.com/devcontainers/dotnet:10.0`](https://hub.docker.com/r/microsoft/devcontainers-dotnet). Open the project in VS Code with the Dev Containers extension, or in a GitHub Codespace, and run `dotnet tool restore`{:sh} to install the compiler from the local tool manifest.

### install the compiler as a local or global .NET tool

You can manually install the compiler from the [ghūl compiler .NET tool package](https://www.nuget.org/packages/ghul.compiler/)

## using the compiler

### project file

The compiler expects to be driven by MSBuild using a `.ghulproj`{:text} project file.
See the [ghūl test](https://github.com/degory/ghul-test) project for
a real-world example, or use one of the project templates to get started.

`Directory.build.props`{:text}
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
    <PackageReference Include="ghul.runtime" Version="1.3.3" />
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

### source files

You'll need some ghūl source files. By convention ghūl source files have the extension `.ghul`{:text}, and the `ghul.runtime`{:text} provided MSBuild targets will include `**/*.ghul`{:text} when building.

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

Applications written in ghūl require the .NET runtime matching whatever target framework you built for — the [.NET 10 runtime](https://dotnet.microsoft.com/download/dotnet/10.0) by default, or e.g. the [.NET 8 runtime](https://dotnet.microsoft.com/download/dotnet/8.0) if you targeted `net8.0`{:text}.

## development environment

### Visual Studio Code

[Visual Studio Code](https://code.visualstudio.com) will give you rich language support via the [ghūl VSCode language extension](https://marketplace.visualstudio.com/items?itemName=degory.ghul).

### other editors

The [ghūl language extension implementation](https://github.com/degory/ghul-vsce) is currently tightly coupled to the Visual Studio Code extension API. However under the hood it is using the [Language Server Protocol](https://microsoft.github.io/language-server-protocol/) so could be extended to support other clients. Feel free to submit a PR. 