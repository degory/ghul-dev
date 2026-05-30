# implementation

The ghūl compiler is itself written in ghūl. It is published as the
[`ghul.compiler`{:text}](https://www.nuget.org/packages/ghul.compiler) .NET
tool, with source in the [`degory/ghul`](https://github.com/degory/ghul)
repository.

## overall shape

A ghūl build moves through three broad stages:

1. **Read the source.** Source text is split into tokens, and the tokens
   are parsed into a syntax tree describing the program.
2. **Make sense of the source.** A series of passes walks the syntax tree,
   working out what every name refers to, what type every expression has,
   and reporting any errors.
3. **Emit IL.** A final pass walks the syntax tree and produces .NET
   intermediate language, which is assembled into a `.dll`{:text} or
   `.exe`{:text} on disk.

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
| `syntax/trees/`{:text} | The syntax-tree node classes themselves.                  |
| `syntax/parsers/`{:text} | Recursive-descent parsers that build the syntax tree from tokens. |
| `syntax/process/`{:text} | Passes that walk the syntax tree: name resolution, type checking, IL generation, plus the editor-facing passes for completion and signature help. |
| `semantic/`{:text}   | The symbol table, scopes, types and supporting machinery used by the passes. |
| `ir/`{:text}         | A small set of nodes that model individual IL instructions, used while emitting code. |
| `compiler/`{:text}   | The `COMPILER` orchestrator that registers the passes and runs them over each source file. |
| `driver/`{:text}     | A thin command-line front-end that parses arguments and decides whether to run a build or the language service. |
| `analysis/`{:text}   | The language-service request handlers used in analysis mode. |
| `ioc/`{:text}        | A small inversion-of-control container. Mostly used by the parsers so they can refer to one another without circular constructor wiring. |
| `source/`{:text}     | Source-location bookkeeping. Every syntax-tree node has a `LOCATION`, so diagnostics, hovers and go-to-definition can point at the right span of text. |
| `logging/`{:text}    | Diagnostic reporting and per-pass timers. All compiler messages flow through `Logger` so that the IDE can intercept them. |

The boundaries are deliberately ordinary: anyone who has worked on a
classical compiler will recognise most of them. The interesting parts are
inside `syntax/process/`{:text} and `semantic/`{:text}.

## from source to tokens

The tokenizer in `lexical/`{:text} reads source text a character at a time
and produces a sequence of `TOKEN` values. Whitespace and comments are
discarded; tokens know their kind (identifier, keyword, operator, string
literal, …), their text and their source location.

The parser in `syntax/parsers/`{:text} is a hand-written recursive-descent
parser. Each grammar production has its own parser class implementing a
small `Parser[T]` trait. The grammar is mutually recursive (an expression
parser needs a statement parser which itself needs the expression
parser), so the parser classes are too. The IoC container breaks the
resulting cyclic constructor dependency by resolving each parser's
references lazily.

The output of the parser is a tree of `Node` subclasses defined in
`syntax/trees/`{:text}. The nodes fall into four broad groups:

- **Definitions** - namespaces, classes, traits, structs, variants,
  functions, methods, fields, properties.
- **Statements** - `if`, `for`, `while`, `try`, and so on.
- **Expressions** - literals, calls, operators, anonymous functions, tuple constructors.
- **Type expressions** - types as they appear written in source, before
  the semantic layer turns them into the type objects described below.

Every node knows the source location it came from, and the tree is the
single shared data structure that the rest of the compiler walks.

## passes over the syntax tree

The bulk of the compiler is a series of *passes* over the syntax tree.
Each pass is a class whose name describes what it does; most are
subclasses of the `Visitor` hierarchy in `syntax/process/`{:text}. The
`COMPILER` class registers them in order, and each pass runs over every
source file before the next pass starts. This means later passes can rely
on the work the earlier passes have already done.

The order matters. For example, the pass that works out the type of an
expression depends on the pass that has already resolved what every name
refers to, which in turn depends on the pass that has put every
declaration into the symbol table.

The full pass list, in the order `COMPILER` runs them:

| Pass                                  | What it does |
|---------------------------------------|--------------|
| `conditional-compilation`{:text}      | Nullifies any definition or statement disabled by its `@IF.flag()` pragma. |
| `rewrite-syntax-trees`{:text}         | Light syntax-tree rewrites that simplify later passes: expanding dotted namespace names into nested form, synthesising accessor methods for properties, indexers and union variants, and spilling operand-position subexpressions sitting to the left of an `await` so their values survive the suspend. |
| `declare-symbols`{:text}              | Walks the syntax tree and registers every declaration (type, function, field, parameter, local) in the symbol table, attached to the appropriate scope. |
| `resolve-uses`{:text}                 | Resolves the `use` declarations in each namespace block against the namespaces or members they name, so short names work in subsequent passes. |
| `resolve-type-expressions`{:text}     | Turns type annotations in declarations, signatures, and in expression-position uses like `cast`, `isa`, `typeof` and `default` into the semantic `Type` objects later passes use. |
| `resolve-ancestors`{:text}            | Attaches base classes, trait parents and default ancestors to classes, traits, structs, unions and enums, and validates the inheritance constraints. |
| `resolve-explicit-types`{:text}       | Registers each variable's, property's and parameter's declared type on its symbol, so the declared type is available to constrain inference later. |
| `resolve-overrides`{:text}            | Pulls inherited symbols down into each container type's scope; for every method whose signature matches an ancestor's virtual or abstract method, records the override link and checks the override is consistent. Reports duplicate top-level functions. |
| `record-type-argument-uses`{:text}    | For every closure body, records which of the enclosing scope's generic type parameters the body references, so the closure frame can plumb them through at runtime. |
| `mark-boxed-locals`{:text}            | Marks `let mut` locals (and parameters) that are both captured by an anonymous function and reassigned, so the IL pass wraps them in a `Ghul.BOX[T]` cell shared between the enclosing scope and every capturer. |
| `compile-expressions`{:text}          | The largest pass. Walks every expression in every function body, working out its type, resolving operator and method overloads, running type inference, applying flow-sensitive narrowing, and producing IR values that describe what the IL should look like. |
| `warn-implicit-mutable-let`{:text}    | Emits warnings for `let` variables that are mutated but were not declared `mut`, when the corresponding compiler flag is set. |
| `generate-il`{:text}                  | Walks the syntax tree one last time and emits .NET IL, using the IR values produced by `compile-expressions`{:text}. |

Whether each pass actually runs depends on the build flags. A plain syntax
check stops after the early passes; a full build runs all of them.
Analysis mode runs everything up to `compile-expressions`{:text} but does
not emit IL.

A short overview of each:

### `conditional-compilation`{:text}

ghūl's conditional compilation is a pragma annotation: a `@IF.flag()`
applied to a single definition or statement gates that item on whether
`flag` was passed at compile time. There is no else/endif form; a
disabled item is omitted. This pass walks the syntax tree and
nullifies each disabled item - definitions are replaced by an empty
definition list, statements by `null` - so subsequent passes can skip
them.

### `rewrite-syntax-trees`{:text}

A handful of syntax-tree rewrites that are easier to do up front than to
handle everywhere afterwards. The notable ones are:

- **expand namespaces** - expands dotted namespace names like
  `namespace Foo.Bar is …` into explicitly nested form
  `namespace Foo is namespace Bar is … si si`.
- **add accessors** - synthesises the getter and setter methods that a
  property declaration stands for, and (despite the historical name) the
  equivalent accessors for indexers and for union variants (the per-variant
  `=~`, `get_hash_code`, `value` and `has_value` members).
- **spill awaits** - at each composite expression containing an `await`,
  wraps every earlier-evaluated sub-expression in a `SPILL` node. The
  async state machine described below suspends with an internal `leave`
  instruction, and the CLR requires its evaluation stack to be empty at
  the suspend point; anything spilled is stashed into a field on the
  state-machine frame so it survives the suspend. The rule is purely
  structural - if a later-evaluated child contains an `await`, every
  earlier child is wrapped - so no type information is needed yet.

### `declare-symbols`{:text}

Walks the definitions in the syntax tree and creates symbol-table entries
for them: types for each class, trait, struct, union, variant and enum;
functions and methods; fields, properties, parameters and local variables.
Each declaration goes into the appropriate scope so that later passes can
look it up.

This pass also scans every function body for `yield` and `await`
expressions and classifies the function accordingly: plain, generator
(returns `Iterable[T]` and contains `yield`), or asynchronous (contains
`await`). The classification is what later tells the IL pass to emit a
generator or async state machine for the function instead of a straight
method body.

### `resolve-uses`{:text}

Processes the `use` declarations that appear in each `namespace` block,
resolving each one to the namespace, static function group or non-instance
member it names, and attaching the result to the namespace's scope. After
this pass, short names introduced by `use` are findable by the
namespace-scope lookups that subsequent passes perform.

This is the entire job of the pass. Identifier resolution inside
expressions and function bodies - looking up a local, a parameter, a
field, or a member access - is deferred to `compile-expressions`{:text},
where types are available to resolve overloads.

### `resolve-type-expressions`{:text}

The shape of a type as written in source (`List[Pair[int, string]]`,
`(int, string) -> bool`, and so on) is parsed into syntax-tree nodes
under `type_expressions/`{:text}. This pass turns the type expressions
that appear in declarations and signatures - return types, parameter
types, field and property types, generic-parameter bounds, ancestor type
references - and in expression-position uses like `cast`, `isa`, `typeof`
and `default` into the `Type` objects (described under [types](#types)
below) that the rest of the compiler manipulates. Type arguments that the
compiler has to *infer* at a call site are produced later, in
`compile-expressions`{:text}, when argument types are known.

### `resolve-ancestors`{:text}

Attaches each container type to the types it inherits from: a class to its
declared base class and traits, a trait to its parent traits, a struct to
the traits it implements, a union variant to its enclosing union (with
the union's generic arguments threaded through). Where no ancestor is
declared, the pass injects the default one - `Object` for classes, traits
and unions, `VALUE_TYPE` for structs, `ENUM_TYPE` for enums.

It also validates the inheritance constraints: at most one class ancestor,
class before any traits, traits and structs can only inherit traits, no
ancestor can be `void`.

The inheritance graph is then available for later passes to walk. Member
symbols are not yet pulled down into the derived type's scope; that
happens in `resolve-overrides`{:text}.

### `resolve-explicit-types`{:text}

For every variable, property, parameter or function return whose type is
written out, attaches the resolved `Type` to the corresponding symbol.
By the time `compile-expressions`{:text} runs, every explicitly-typed
symbol already knows its declared type, and that declared type becomes
one of the constraints that bidirectional inference uses for the
unannotated parts of the same expression. The pass also performs a few
annotation-only checks (field and property types can't be reference
types; variable types can't be `void`).

Note that this pass does *not* check that an initializer's type matches
the declared type. It cannot - `compile-expressions`{:text} has not yet
typed any expression. The assignability check happens there, against the
declared type this pass attached.

### `resolve-overrides`{:text}

Two jobs. First, for every container type, the pass walks its ancestors
and pulls their inherited symbols down into the container's own scope, so
that later lookups against a derived class find the members it inherits.

Second, for every method whose signature matches a virtual or abstract
method on an ancestor, the pass records the override link and checks the
override is consistent: covariant return type, matching IL name, no
override of a non-virtual member, and so on. ghūl has no `override`
keyword - whether a method overrides its ancestor is determined by
signature match, not by source annotation - so this pass is where the
override relationship is established. It also reports a handful of
related conditions: ineffective override of a trait default, a static
method accidentally hiding an instance method, a method whose signature
narrows an ancestor's argument types just enough to miss the override.

Once every source file has been visited, the pass reports any pair of
top-level functions whose signatures cannot be told apart.

### `record-type-argument-uses`{:text}

For every closure (anonymous function) body, this pass records which of
the enclosing function's or type's generic type parameters the body
references. The closure compiler later uses that list to plumb those type
parameters through the closure frame at runtime, so the closure can be
invoked with the right instantiation.

### `mark-boxed-locals`{:text}

A `let mut` local that is both captured by an anonymous function and
reassigned has to be shared between the enclosing scope and every
capturer; if it stayed in a normal local slot, the two would see
independent copies. This pass walks the syntax tree and marks each such
local (and parameter that meets the same conditions) so the IL pass
wraps it in a `Ghul.BOX[T]` cell - one heap-allocated holder that every
party reads and writes through.

That is the whole job of the pass. Generator and async functions are
also state-machine-compiled so their locals survive `yield` or `await`,
but that lowering is done by `generate-il`{:text} (with help from
information attached by `declare-symbols`{:text} and the `spill-awaits`
rewrite), not here.

### `compile-expressions`{:text}

The most substantial pass. It walks every expression in every function
body and:

- works out the type of every expression and sub-expression;
- resolves operator and method overloads;
- runs type inference for unannotated locals, anonymous function
  parameters and return types, list literal element types, generic type
  arguments at call sites, and generic constructors;
- applies flow-sensitive type narrowing through `isa` checks, `if let`,
  null tests, variant tests, and divergent guards (where an early `return`
  / `throw` / `break` / `continue` leaves the code below the guard narrowed
  to the stronger type);
- produces *IR values* that describe, for each expression, the sequence
  of IL operations it stands for.

Inference inside this pass is bidirectional: information flows up from
inner expressions, and back down from contexts that constrain what an
expression's type can be. A function's signature is always explicit, so
inference is confined to function bodies and never changes anything
visible from outside the function.

### `warn-implicit-mutable-let`{:text}

A `let` that is assigned to after its initializer counts as a mutable
variable but does not say so on its declaration. When the corresponding
warning is enabled, this pass walks the syntax tree and reports each
local variable or parameter whose `is_reassigned` flag was set by the
assignment handling in `compile-expressions`{:text}. Captured variables
and explicit `let mut` declarations are skipped.

### `generate-il`{:text}

The final pass writes the IR values produced by `compile-expressions`{:text}
out as .NET IL. The compiler does not link to a managed-code generator;
it writes textual IL to a file and then invokes the `ilasm`{:text} tool
from the .NET SDK to assemble it into a `.dll`{:text} or `.exe`{:text}.

## the main data structures

A handful of data structures are visible across most of the passes.

### the syntax tree

The output of the parser and the working medium of every subsequent pass.
Each `Node` subclass models one piece of syntax (a class definition, an
`if` statement, a method call) and knows the source location it came
from. As later passes work, they attach additional information to the
nodes: an identifier use gets a reference to the symbol it refers to, an
expression gets its inferred type, and the IL pass attaches IR values
that record how to emit it.

### symbols

A `SYMBOL` is the compiler's record of one thing declared in the program:
a type, a function, a method, a field, a local variable, a parameter, a
generic type argument, and so on. There is one subclass per flavour
(`CLASS`, `INSTANCE_METHOD`, `VARIABLE` and the rest), and they all live
under `semantic/symbols/`{:text}.

The `SYMBOL_TABLE` is a central registry; the `NAMESPACES` object tracks
namespace membership. Together they answer the question "what does this
name refer to?".

### scopes

A scope is the answer to "what names are visible here?". Scopes nest:
the innermost is typically a block scope, inside a method scope, inside a
class scope, inside a namespace scope. Name resolution walks outwards
through the chain of scopes until it finds a match.

The base `Scope` and its specialisations (`BLOCK_SCOPE`,
`NAMESPACE_SCOPE`) live under `semantic/scope/`{:text}.

### types

A `Type` represents a ghūl type in the form the compiler uses internally.
The hierarchy under `semantic/types/`{:text} is fairly small:

- `NAMED` - a reference to a named type (class, trait, struct, variant,
  primitive).
- `GENERIC` - a generic type applied to type arguments, such as
  `List[int]`.
- `FUNCTION` - a function type, used for first-class functions, anonymous
  functions, and methods.
- `TUPLE` - a tuple type, with optional element names.
- `ARRAY` - a fixed array type.
- `OPTION`, `ONE_OF`, `NONE`, `NULL` - optional and union variations.
- `INFERRED_VARIABLE_TYPE` and friends - placeholders used during
  inference, replaced by concrete types as constraints accumulate.
- `ERROR` - stands in for the type of an expression the compiler could
  not work out, so that later passes can continue without cascading every
  diagnostic.

`Type` objects answer most of the questions the compiler has about
expressions: is this assignable to that, what is the common type of these
branches, what overload best matches these argument types.

### IR values

`IR.Value` subclasses model individual operations to be emitted as IL.
Most map one-for-one to a single IL instruction; a few (`tuple`, `isa`,
generic boxing helpers) expand into a small sequence.
`compile-expressions`{:text} builds an IR value tree for each expression;
`generate-il`{:text} walks those trees and prints IL.

### diagnostics

Errors, warnings and informational messages all flow through `Logger` in
`logging/`{:text}, which attaches a `Source.LOCATION` to each message and
stores them in `DIAGNOSTICS_STORE`. The IDE retrieves diagnostics by
reading the store after a compile.

## analysis mode

The same compiler executable runs the IDE's language service. When the
ghūl VS Code extension starts, it launches `ghul-compiler`{:text} with
the `--analyse`{:text} flag, then talks to it over the process's standard
input and output streams.

Communication uses a small text protocol. The IDE sends a request as a
keyword like `#EDIT#`{:text}, `#COMPILE#`{:text}, `#HOVER#`{:text},
`#DEFINITION#`{:text}, `#COMPLETE#`{:text} or `#HOVERMAP#`{:text},
followed by any arguments it needs on subsequent lines. The compiler
replies with a header line, optional result lines, and ends each response
with a form-feed character so the IDE knows the reply is complete. The
protocol was chosen to be simple enough to implement without a JSON
parser; the format is stable and the editor is expected to ignore lines
it does not recognise.

The interesting work happens around two requests:

- **`#EDIT#`{:text}** - sent on every keystroke (after a short debounce).
  Re-parses the file the user is editing and re-runs the early passes
  over it, keeping the rest of the project's syntax trees untouched.
  This is fast enough to keep up with typing, and it is what produces the
  squiggles and hovers that appear as the user types.
- **`#COMPILE#`{:text}** - sent during a longer pause in typing. Runs the
  full pass sequence over the whole project so that any consequences of
  the edit ripple through the rest of the analysis.

This two-stage pattern keeps the typical-case latency low without
sacrificing correctness once the user pauses. Hover information,
go-to-definition, completions and signature help all come from the state
these passes maintain: the symbol table, the scopes, the per-node type
annotations and the symbol-use map.

Two convenience requests, `#HOVERMAP#`{:text} and
`#SEMANTICTOKENS#`{:text}, dump every recorded hover or every recorded
symbol use in one batch. They are mainly used by the example pipeline on
this website, which feeds each example through the analyser and uses the
results to drive hover popups and semantic-token colouring in the
rendered output.

The compiler runs as a long-lived process. A `WATCHDOG` component watches
for sustained error bursts or excessive heap growth and asks the IDE to
recycle the process when either threshold is crossed; recycles happen
fairly often, but the extension schedules them during idle periods so the
user rarely notices. Even with the recycles, the long-lived shape is
much cheaper than starting a fresh compiler for every request.

## bootstrap and self-hosting

The ghūl compiler is *self-hosting*: it is written in ghūl and is
compiled by an earlier version of itself. Every CI build re-bootstraps
the compiler by compiling the source under the published version and
then comparing the IL produced by two further passes; the compiler that
the publish produced should compile itself byte-for-byte identically. A
divergence between the two is treated as a build failure.

The historical story of how the first version of the compiler came to
exist, back when no ghūl compiler existed to compile it, is on the
[history](/history) page.
