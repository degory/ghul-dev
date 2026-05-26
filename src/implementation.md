# implementation

This page describes how the ghūl compiler is put together. It is meant for
readers who are curious about what happens between source text and a running
.NET assembly, but who are not necessarily familiar with the internals of any
particular compiler.

The compiler is itself written in ghūl and is published as the
[`ghul.compiler`{:text}](https://www.nuget.org/packages/ghul.compiler) .NET
tool. The source lives in the [`degory/ghul`](https://github.com/degory/ghul)
repository.

## overall shape

A ghūl build moves through three broad stages:

1. **Read the source.** Source text is split into tokens, and the tokens are
   parsed into a tree of objects describing the program — an *abstract syntax
   tree*, or AST.
2. **Make sense of the source.** A series of passes walks the AST, working
   out what every name refers to, what type every expression has, and
   reporting any errors.
3. **Emit IL.** A final pass walks the AST and produces .NET intermediate
   language, which is assembled into a `.dll`{:text} or `.exe`{:text} on disk.

When the compiler runs as the back end of the VS Code extension it follows
the same first two stages but stops short of emitting IL, and runs many
passes incrementally as the user edits.

## source layout

The compiler's source is organised around the stages above. Each top-level
folder under `src/`{:text} in the compiler repository covers one
concern:

| Folder            | Role                                                           |
|-------------------|----------------------------------------------------------------|
| `lexical/`{:text}    | Turns source text into a stream of tokens.                  |
| `syntax/trees/`{:text} | The AST node classes themselves.                          |
| `syntax/parsers/`{:text} | Recursive-descent parsers that build the AST from tokens. |
| `syntax/process/`{:text} | Passes that walk the AST — name resolution, type checking, IL generation, plus the editor-facing passes for completion and signature help. |
| `semantic/`{:text}   | The symbol table, scopes, types and supporting machinery used by the passes. |
| `ir/`{:text}         | A small set of nodes that model individual IL instructions, used while emitting code. |
| `compiler/`{:text}   | The `COMPILER`{:text} orchestrator that registers the passes and runs them over each source file. |
| `driver/`{:text}     | A thin command-line front-end that parses arguments and decides whether to run a build or the language service. |
| `analysis/`{:text}   | The language-service request handlers used in analysis mode. |
| `ioc/`{:text}        | A small inversion-of-control container. Mostly used by the parsers so they can refer to one another without circular constructor wiring. |
| `source/`{:text}     | Source-location bookkeeping. Every AST node carries a `LOCATION`{:text}, so diagnostics, hovers and go-to-definition can point at the right span of text. |
| `logging/`{:text}    | Diagnostic reporting and per-pass timers. All compiler messages flow through `Logger`{:text} so that the IDE can intercept them. |

The boundaries are deliberately ordinary — anyone who has worked on a
classical compiler will recognise most of them. The interesting parts are
inside `syntax/process/`{:text} and `semantic/`{:text}.

## from source to tokens

The tokenizer in `lexical/`{:text} reads source text a character at a time
and produces a sequence of `TOKEN`{:text} values. Whitespace and comments
are discarded; tokens know their kind (identifier, keyword, operator, string
literal, …), their text and their source location. The tokenizer also
handles a couple of features that are usually thought of as lexical: line
continuation rules and the `#if`{:text} / `#else`{:text} preprocessor
directives.

The parser in `syntax/parsers/`{:text} is a hand-written recursive-descent
parser. Each grammar production has its own parser class implementing a
small `Parser[T]`{:text} trait. Because the parsers refer to one another
freely — an expression parser needs a statement parser, which in turn needs
the expression parser — they are wired up through the IoC container so
their references can be resolved lazily rather than via constructor
arguments.

The output of the parser is an AST: a tree of `Node`{:text} subclasses
defined in `syntax/trees/`{:text}. The nodes fall into four broad groups:

- **Definitions** — namespaces, classes, traits, structs, variants, functions,
  methods, fields, properties.
- **Statements** — `if`{:text}, `for`{:text}, `while`{:text}, `try`{:text}, and so on.
- **Expressions** — literals, calls, operators, lambdas, tuple constructors.
- **Type expressions** — types as they appear written in source, before
  the semantic layer turns them into the type objects described below.

Every node carries the source location it came from, and the tree is the
single shared data structure that the rest of the compiler walks.

## passes over the AST

The bulk of the compiler is a series of *passes* over the AST. Each pass is
a class whose name describes what it does; most are subclasses of the
`Visitor`{:text} hierarchy in `syntax/process/`{:text}. The
`COMPILER`{:text} class registers them in order, and each pass runs over
every source file before the next pass starts. This means later passes can
rely on the work the earlier passes have already done.

The order matters. For example, the pass that works out the type of an
expression depends on the pass that has already resolved what every name
refers to, which in turn depends on the pass that has put every declaration
into the symbol table.

The full pass list, in the order `COMPILER`{:text} runs them:

| Pass                                  | What it does |
|---------------------------------------|--------------|
| `conditional-compilation`{:text}      | Removes any code disabled by `#if`{:text} directives. |
| `rewrite-syntax-trees`{:text}         | Light AST rewrites that simplify later passes — expanding nested namespaces into a flat list, generating accessor methods for properties, and spilling operand-position subexpressions sitting to the left of an `await`{:text} so their values survive the suspend. |
| `declare-symbols`{:text}              | Walks the AST and registers every declaration (type, function, field, parameter, local) in the symbol table, attached to the appropriate scope. |
| `resolve-uses`{:text}                 | Resolves identifier references to the declarations they name, using the scopes the previous pass set up. |
| `resolve-type-expressions`{:text}     | Turns type annotations as written in source into the semantic `Type`{:text} objects used by the rest of the compiler. |
| `resolve-ancestors`{:text}            | Attaches base classes and trait parents to the classes and traits that name them. |
| `resolve-explicit-types`{:text}       | Checks variables whose type is written out against the type of their initializer. |
| `resolve-overrides`{:text}            | Verifies that methods marked `override`{:text} match an inherited signature, and that overrides do not conflict. |
| `record-type-argument-uses`{:text}    | Notes which generic types are instantiated with which type arguments, so the IL pass can later produce the right open-generic references. |
| `mark-boxed-locals`{:text}            | Marks variables that have to live on the heap rather than in a local slot — typically because they are captured by a closure or by a generator's state machine. |
| `compile-expressions`{:text}          | The largest pass. Walks every expression in every function body, working out its type, resolving operator and method overloads, running type inference, narrowing, and producing IR values that describe what the IL should look like. |
| `warn-implicit-mutable-let`{:text}    | Emits warnings for `let`{:text} variables that are mutated but were not declared `mut`{:text}, when the corresponding compiler flag is set. |
| `generate-il`{:text}                  | Walks the AST one last time and emits .NET IL, using the IR values produced by `compile-expressions`{:text}. |

Whether each pass actually runs depends on the build flags. A plain syntax
check stops after the early passes; a full build runs all of them. Analysis
mode runs everything up to `compile-expressions`{:text} but does not emit
IL.

A short overview of each:

### `conditional-compilation`{:text}

ghūl has a `#if`{:text} / `#else`{:text} / `#end`{:text} preprocessor for
conditional compilation. This pass walks the AST and removes the branches
that the current build flags exclude, so subsequent passes do not have to
think about disabled code.

### `rewrite-syntax-trees`{:text}

A handful of AST rewrites that are easier to do up front than to handle
everywhere afterwards. The notable ones are:

- **expand namespaces** — flattens nested namespaces like
  `namespace Foo.Bar is …`{:text} into the equivalent nested form
  `namespace Foo is namespace Bar is … si si`{:text}.
- **add accessors for properties** — synthesises the underlying getter
  and setter methods that a property declaration stands for.
- **spill awaits** — at each composite expression containing an
  `await`{:text}, wraps every earlier-evaluated sub-expression in a
  `SPILL`{:text} node. The async state machine described below
  suspends with an internal `leave`{:text} instruction, and the CLR
  requires its evaluation stack to be empty at the suspend point —
  anything spilled is stashed into a field on the state-machine
  frame so it survives the suspend.

### `declare-symbols`{:text}

Walks definitions in the AST and creates the symbol-table entries for
them: types for each class, trait, struct and variant; functions and
methods; fields, properties, parameters and local variables. Each
declaration goes into the appropriate scope so that later passes can
look it up.

This pass also scans every function body for `yield`{:text} and
`await`{:text} expressions and classifies the function accordingly —
plain, generator (returns `Iterable[T]`{:text} and contains
`yield`{:text}), or asynchronous (contains `await`{:text}). The
classification is what later tells the IL pass to emit a generator or
async state machine for the function instead of a straight method body.

### `resolve-uses`{:text}

For every identifier used in the program, finds the declaration it refers
to. Lexical scoping rules and namespace `use`{:text} statements are
honoured here. Failed resolution becomes an `unknown symbol`{:text}
diagnostic.

### `resolve-type-expressions`{:text}

The shape of a type as written in source — `List[Pair[int, string]]`{:text},
`(int, string) -> bool`{:text}, and so on — is parsed into AST nodes
under `type_expressions/`{:text}. This pass turns those into the
`Type`{:text} objects (described under [types](#types) below) that the
rest of the compiler manipulates.

### `resolve-ancestors`{:text}

Once class and trait names can be resolved to types, this pass attaches a
class to its base class and the traits it implements, and a trait to its
parent traits. The inheritance graph is then available for later passes
to walk.

### `resolve-explicit-types`{:text}

For every variable whose type is written out, checks that the
initializer's type is assignable to it. The check itself is mostly
delegated to the type system; the pass exists to make the checks happen
at a well-defined point.

### `resolve-overrides`{:text}

For every method marked `override`{:text}, checks that an ancestor
defines a matching virtual or abstract method, and that the override is
consistent with it. Reports duplicate global functions where two top-level
functions cannot be told apart by their signatures.

### `record-type-argument-uses`{:text}

Collects the set of concrete generic-argument combinations the program
actually uses, so that the IL pass can emit the right references. The
ghūl IL emitter prefers open-generic references (`!0`{:text} for the
first class-level type parameter, `!!0`{:text} for the first method-level
one) rather than substituting the concrete type into the signature itself;
this pass collects the information that lets it do so.

### `mark-boxed-locals`{:text}

Some variables cannot live in a local slot. The clearest case is a local
captured by a lambda: the lambda outlives the call that created it, so the
local has to move onto the heap. Generator and asynchronous functions are
a similar case — both compile to state-machine classes whose locals
become fields, so that the function's state survives a `yield`{:text} or
`await`{:text}. This pass walks the AST and marks each affected variable
so the IL pass emits the right shape of code for it.

### `compile-expressions`{:text}

The most substantial pass. It walks every expression in every function
body and:

- works out the type of every expression and sub-expression;
- resolves operator and method overloads;
- runs type inference for unannotated locals, lambda parameters, list
  literal element types, generic type arguments at call sites, and
  generic constructors;
- applies type narrowing through `isa`{:text} checks, `if let`{:text},
  null tests and variant tests;
- produces *IR values* that describe, for each expression, the sequence
  of IL operations it stands for.

Inference inside this pass is bidirectional: information flows up from
inner expressions, and back down from contexts that constrain what an
expression's type can be. A function's signature is always explicit, so
inference is confined to function bodies and never changes anything
visible from outside the function.

### `warn-implicit-mutable-let`{:text}

A `let`{:text} that is assigned to after its initializer counts as a
mutable variable but does not say so on its declaration. When the
corresponding warning is enabled, this pass walks the AST and reports
each one. It is structurally independent of `compile-expressions`{:text}
but runs after it because it needs the assignment information that pass
has already collected.

### `generate-il`{:text}

The final pass writes the IR values produced by `compile-expressions`{:text}
out as .NET IL. The compiler does not link to a managed-code generator;
it writes textual IL to a file and then invokes the `ilasm`{:text} tool
from the .NET SDK to assemble it into a `.dll`{:text} or `.exe`{:text}.

## the main data structures

A handful of data structures are visible across most of the passes.

### the AST

The output of the parser and the working medium of every subsequent pass.
Each `Node`{:text} subclass models one piece of syntax — a class
definition, an `if`{:text} statement, a method call — and carries the
source location it came from. As later passes work, they attach
additional information to the nodes: an identifier use gets a reference
to the symbol it refers to, an expression gets its inferred type, and
the IL pass attaches IR values that record how to emit it.

### symbols

A `SYMBOL`{:text} is the compiler's record of one thing declared in the
program: a type, a function, a method, a field, a local variable, a
parameter, a generic type argument, and so on. There is one subclass per
flavour — `CLASS`{:text}, `INSTANCE_METHOD`{:text},
`VARIABLE`{:text} and the rest — and they all live under
`semantic/symbols/`{:text}.

The `SYMBOL_TABLE`{:text} is a central registry; the `NAMESPACES`{:text}
object tracks namespace membership. Together they answer the question
"what does this name refer to?".

### scopes

A scope is the answer to "what names are visible here?". Scopes nest:
the innermost is typically a block scope, inside a method scope, inside
a class scope, inside a namespace scope. Name resolution walks outwards
through the chain of scopes until it finds a match.

The base `Scope`{:text} and its specialisations
(`BLOCK_SCOPE`{:text}, `NAMESPACE_SCOPE`{:text}) live under
`semantic/scope/`{:text}.

### types

A `Type`{:text} represents a ghūl type in the form the compiler uses
internally. The hierarchy under `semantic/types/`{:text} is fairly small:

- `NAMED`{:text} — a reference to a named type (class, trait, struct,
  variant, primitive).
- `GENERIC`{:text} — a generic type applied to type arguments, such as
  `List[int]`{:text}.
- `FUNCTION`{:text} — a function type, used for first-class functions,
  lambdas, and methods.
- `TUPLE`{:text} — a tuple type, with optional element names.
- `ARRAY`{:text} — a fixed array type.
- `OPTION`{:text}, `ONE_OF`{:text}, `NONE`{:text}, `NULL`{:text} —
  optional and union variations.
- `INFERRED_VARIABLE_TYPE`{:text} and friends — placeholders used during
  inference, replaced by concrete types as constraints accumulate.
- `ERROR`{:text} — stands in for the type of an expression the compiler
  could not work out, so that later passes can continue without
  cascading every diagnostic.

`Type`{:text} objects answer most of the questions the compiler has
about expressions: is this assignable to that, what is the common type
of these branches, what overload best matches these argument types.

### IR values

`IR.Value`{:text} subclasses model individual operations to be emitted
as IL. Most map one-for-one to a single IL instruction; a few
(`tuple`{:text}, `isa`{:text}, generic boxing helpers) expand into a
small sequence. `compile-expressions`{:text} builds an IR value tree for
each expression; `generate-il`{:text} walks those trees and prints IL.

### diagnostics

Errors, warnings and informational messages all flow through
`Logger`{:text} in `logging/`{:text}, which attaches a
`Source.LOCATION`{:text} to each message and stores them in
`DIAGNOSTICS_STORE`{:text}. The IDE retrieves diagnostics by reading the
store after a compile.

## analysis mode

The same compiler executable runs the IDE's language service. When the
ghūl VS Code extension starts, it launches `ghul-compiler`{:text} with the
`--analyse`{:text} flag, then talks to it over the process's standard
input and output streams.

Communication uses a small text protocol. The IDE sends a request as a
keyword like `#EDIT#`{:text}, `#COMPILE#`{:text}, `#HOVER#`{:text},
`#DEFINITION#`{:text}, `#COMPLETE#`{:text} or `#HOVERMAP#`{:text},
followed by any arguments it needs on subsequent lines. The compiler
replies with a header line, optional result lines, and ends each
response with a form-feed character so the IDE knows the reply is
complete. The protocol was chosen to be simple enough to implement
without a JSON parser; the format is stable and the editor is expected
to ignore lines it does not recognise.

The interesting work happens around two requests:

- **`#EDIT#`{:text}** — sent on every keystroke (after a short debounce).
  Re-parses the file the user is editing and re-runs the early passes
  over it, keeping the rest of the project's AST untouched. This is fast
  enough to keep up with typing, and it is what produces the squiggles
  and hovers that appear as the user types.
- **`#COMPILE#`{:text}** — sent during a longer pause in typing. Runs
  the full pass sequence over the whole project so that any consequences
  of the edit ripple through the rest of the analysis.

This two-stage pattern keeps the typical-case latency low without
sacrificing correctness once the user pauses. Hover information,
go-to-definition, completions and signature help all come from the
state these passes maintain — the symbol table, the scopes, the per-AST-
node type annotations and the symbol-use map.

Two convenience requests, `#HOVERMAP#`{:text} and
`#SEMANTICTOKENS#`{:text}, dump every recorded hover or every recorded
symbol use in one batch. They are mainly used by the example pipeline on
this website, which feeds each example through the analyser and uses
the results to drive hover popups and semantic-token colouring in the
rendered output.

The compiler runs as a long-lived process, so a `WATCHDOG`{:text}
component watches for sustained error bursts or excessive heap growth
and asks the IDE to recycle the process if either threshold is crossed.
In practice this is rare; most analysis sessions live as long as the
VS Code window does.

## bootstrap and self-hosting

The ghūl compiler is *self-hosting*: it is written in ghūl and is
compiled by an earlier version of itself. Every CI build re-bootstraps
the compiler by compiling the source under the published version and
then comparing the IL produced by two further passes — the compiler that
the publish produced should compile itself byte-for-byte identically.
A divergence between the two is treated as a build failure.

The historical story of how the first version of the compiler came to
exist — back when no ghūl compiler existed to compile it — is on the
[history](/history) page.
