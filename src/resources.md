# resources

## compiler, runtime, and tools

Official source repositories are [hosted on GitHub.com](https://github.com/degory)

Official release packages are [hosted on NuGet.org](https://www.nuget.org/packages?q=degory+ghul). Copies of the release versions and beta versions are available on GitHub under Packages for each repository, and as workflow assets on successful PR builds.

The Visual Studio Code language extension is available on the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=degory.ghul).


### compiler
The ghūl compiler
- **Repository:** [ghul](https://github.com/degory/ghul)
- **Package:** [ghul.compiler](https://www.nuget.org/packages/ghul.compiler) (Packaged as a [.NET tool](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-tool-install))

### runtime
The ghūl runtime library.
- **Repository:** [ghul-runtime](https://github.com/degory/ghul-runtime)
- **Package:** [ghul.runtime](https://www.nuget.org/packages/ghul.runtime)

### pipes
The ghūl pipes library, providing the `|` (pipe) operator and operations like `filter`, `map`, `reduce`.
- **Repository:** [ghul-pipes](https://github.com/degory/ghul-pipes)
- **Package:** [ghul.pipes](https://www.nuget.org/packages/ghul.pipes)

### targets
MSBuild project targets for compiling ghūl projects.
- **Repository:** [ghul-targets](https://github.com/degory/ghul-targets)
- **Package:** [ghul.targets](https://www.nuget.org/packages/ghul.targets)

### test
Integration test runner for the ghūl compiler. (A build time dependency of the compiler itself. Not required for other ghūl projects)
- **Repository:** [ghul-test](https://github.com/degory/ghul-test) 
- **Package:** [ghul.test](https://www.nuget.org/packages/ghul.test)

### Visual Studio Code Extension
Provides ghūl language support within VSCode.
- **Repository:** [ghul-vsce](https://github.com/degory/ghul-vsce)
- **Package:** [degory.ghul](https://marketplace.visualstudio.com/items?itemName=degory.ghul)

### templates
.NET New Templates
- **Repository:** [ghul-templates](https://github.com/degory/ghul-templates)
- **Package** [ghul.templates](https://www.nuget.org/packages/ghul.templates) (install with `dotnet new install ghul.templates`)

## contributing

### issues
If you encounter any problems, please feel free to open an issue on GitHub. If it's not clear which repo to open the issue in, open it in the [compiler repo](https://github.com/degory/ghul) and I can move it if needed.

### PRs
If you want to fix a bug or make an improvement, particularly if it's something small, go ahead and raise a PR. If it's something complex, please raise an issue first. Note that the CI/CD pipelines are not generally set up to handle PRs from forks, so unless you want to hack my workflow YAML, I might need to pull your feature branch and create a PR on your behalf before I can merge your changes.
