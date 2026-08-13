# Example tests

Every example under `examples/` is compiled and run here, and what it prints is
compared against a snapshot. The examples are the language documentation, so an
example that no longer compiles, or that prints something other than what the
page shows beside it, is a documentation bug.

One directory per example. The source is a symlink to the example itself, so
editing an example is editing what runs - there is no copy to fall out of step:

```
example-tests/control-flow-8/
├── test.ghul      -> ../../examples/control-flow-8/control-flow-8.ghul
├── ghulflags      compiler flags: --dotnet, plus --library where the example
│                  declares no entry point
└── run.expected   what the program prints
```

An example documenting a compile error carries `fail.expected` (the build is
meant to fail) and `err.expected` (the diagnostic, which is the thing the page
is illustrating). One documenting a warning carries `warn.expected` and, if it
still runs, `run.expected` as well.

## Running them

```sh
dotnet tool restore
dotnet ghul-test --runtime-dll "$HOME/.nuget/packages/ghul.runtime/<version>/lib/net10.0/ghul-runtime.dll" example-tests
dotnet ghul-test example-tests/control-flow-8      # one example
```

`--runtime-dll` names the runtime this repository pins, in
`example-tool/Directory.Packages.props`. Without it ghul-test uses the copy
inside the ghul.test package instead, which is a different version and is not
the one the examples are documented against. CI resolves the path from the pin
rather than spelling it out.

## Adding an example

Create the case, then let a failing run write the snapshot:

```sh
mkdir example-tests/<name>
ln -s ../../examples/<name>/<name>.ghul example-tests/<name>/test.ghul
echo --dotnet > example-tests/<name>/ghulflags
dotnet ghul-test example-tests/<name>          # fails; leaves run.out
mv example-tests/<name>/run.out example-tests/<name>/run.expected
```

Read the snapshot before committing it. It records what the compiler does
today, which is only worth having if that is also what the example is meant to
demonstrate.

An example whose output varies between runs - a clock, a random number, a hash,
an unordered collection - cannot be snapshotted. Make the example deterministic
rather than adding a `disabled` file, unless what it is demonstrating is the
variation itself.

## What is not covered

The three `dotnet-integration-*` examples build against ASP.NET through a
`.ghulproj` and are never run, so they are left out. `snippets/` is illustrative
and is not compiled at all.
