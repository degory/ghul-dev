# grammar

This page gives the full grammar of ghūl, derived from the compiler's parser.

The grammar is written in [W3C EBNF](https://www.w3.org/TR/xml/#sec-notation) — the
notation used by the XML and XPath specifications:

| Notation      | Meaning                                  |
|---------------|------------------------------------------|
| `A ::= ...`   | defines the symbol `A`                   |
| `A B`         | `A` followed by `B`                      |
| `A \| B`      | `A` or `B`                               |
| `A?`          | zero or one `A`                          |
| `A*`          | zero or more `A`                         |
| `A+`          | one or more `A`                          |
| `( ... )`     | grouping                                 |
| `"is"`        | a literal terminal                       |
| `[a-z]`       | a character in the given set             |
| `[^"]`        | any character *not* in the set           |
| `A - B`       | an `A` that is not also a `B`            |

`CamelCase` symbols are grammar productions; `Identifier`, `IntegerLiteral` and the
other symbols defined under [lexical grammar](#lexical-grammar) are tokens produced
by the tokenizer.

A few constructs are resolved by the parser using context that a context-free
grammar cannot express (operator precedence, and a small number of genuinely
context-sensitive forms). These are called out in prose where they arise, and the
operator precedence table is given [at the end](#operator-precedence).

## lexical grammar

The tokenizer turns source text into a stream of tokens. Whitespace — spaces, tabs,
carriage returns and newlines — separates tokens but is otherwise insignificant:
ghūl is **not** indentation-sensitive. Whitespace and comments are discarded before
parsing.

### comments

```ebnf
LineComment  ::= "//" [^#xA]*
BlockComment ::= "/*" ( [^*] | "*" [^/] )* "*/"
```

Block comments do **not** nest: the first `*/` ends the comment.

### identifiers

```ebnf
Identifier        ::= PlainIdentifier | EscapedIdentifier
PlainIdentifier   ::= Letter ( Letter | Digit )*
EscapedIdentifier ::= "`" ( Letter | Digit | "_" )+
                    | "`" OperatorChar+
Letter            ::= [a-zA-Z_]
Digit             ::= [0-9]

QualifiedIdentifier ::= Identifier ( "." Identifier )*
```

A `PlainIdentifier` may not be one of the [reserved words](#reserved-words). To use
a reserved word — or an operator symbol — as an ordinary identifier, prefix it with
a backtick: `` `field ``, `` `+ ``.

### reserved words

The following words are keywords and cannot be used as plain identifiers:

```
assert    await     break     case      cast      catch     class
continue  default   do        elif      else      enum      esac
false     fi        field     finally   for       if        in
innate    is        isa       let       mut       namespace new
null      od        private   protected ptr       public    rec
ref       return    self      si        static    struct    super
then      throw     trait     true      try       typeof    union
use       when      while     yrt
```

A few words are *contextual* — they look like identifiers to the tokenizer but the parser recognises them in specific positions: `optional` as a type-parameter kind constraint, `out` as a type-parameter variance modifier.

### numeric literals

```ebnf
IntegerLiteral ::= DecimalInteger | HexInteger
DecimalInteger ::= Digit ( Digit | "_" )* IntegerSuffix?
HexInteger     ::= ( "0x" | "0X" ) HexDigit ( HexDigit | "_" )* IntegerSuffix?
HexDigit       ::= [0-9a-fA-F]
IntegerSuffix  ::= ( "s" | "S" | "u" | "U" )? [bBcCsSiIlLwW]?

FloatLiteral   ::= Digit ( Digit | "_" )* "." ( Digit | "_" )* Exponent? FloatSuffix?
Exponent       ::= ( "e" | "E" ) "-"? ( Digit | "_" )+
FloatSuffix    ::= "s" | "S" | "d" | "D"
```

Underscores within a number are for readability and are ignored. A float literal
must contain a `.`; the type suffix selects `single` (`s`/`S`) or `double`
(`d`/`D`), and an integer suffix selects the integer type and signedness.

### character and string literals

```ebnf
CharLiteral   ::= "'" ( EscapeSequence | [^'] ) "'"
StringLiteral ::= '"' StringElement* '"'
StringElement ::= EscapeSequence | [^"#xA\]

EscapeSequence ::= "\" ( "t" | "n" | "r" | "\" | OctalDigit+ | [^#xA] )
OctalDigit     ::= [0-7]
```

A string literal may not span a newline. Two string literals separated only by
whitespace are concatenated into a single literal.

Inside a string literal, `{` begins an [interpolation](#interpolated-strings) and
`}` ends it; a literal brace is written <code v-pre>{{</code> or <code v-pre>}}</code>.

### interpolated strings

A string literal containing `{ ... }` is tokenized as a sequence of fragments
rather than a single `StringLiteral`. The parser assembles these as an
[interpolated string expression](#primary-expressions):

```ebnf
InterpolatedString ::= EnterString
                       Interpolation
                       ( ContinueString Interpolation )*
                       ExitString
Interpolation      ::= Expression ( "," Expression )? ( ":" FormatString )?
```

`EnterString`, `ContinueString`, `ExitString` and `FormatString` are the fragments
of literal text surrounding and following each interpolated expression. The
optional `,` introduces an alignment and the optional `:` a format specifier.

### operators

```ebnf
Operator     ::= OperatorChar+
OperatorChar ::= [-!$%^&*+=|:@~#\<>.?/] | UnicodeSymbol
```

`UnicodeSymbol` is any character above U+007E that .NET classifies as a symbol
(this admits operators such as `×`, `÷`, `∩`, `∪`, `∧`, `∨`, `≈`, `≡`).

Operators are tokenized greedily — the longest run of operator characters forms one
operator — with one exception: a `.` immediately after a leading `!` or `?` ends
the operator, so that `x!.foo` and `x?.foo` parse as a member access on an
unwrap/has-value, not as the operators `!.` or `?.`.

A handful of operator spellings are recognised as dedicated tokens rather than
general operators: `=`, `:`, `.`, `->`, `=>`, `?` and `@`.

## compilation unit

A source file is a sequence of definitions:

```ebnf
CompilationUnit ::= Definition*

Definition ::= Namespace
             | Use
             | Class
             | Trait
             | Struct
             | Union
             | Enum
             | Member
             | PragmaDefinition
```

A `Member` (function, property or indexer) appearing directly in a compilation unit
or namespace is a global function, global variable or global indexer.

## definitions

### namespace and use

```ebnf
Namespace ::= "namespace" QualifiedIdentifier "is" Definition* "si"

Use ::= "use" QualifiedIdentifier ";"
      | "use" Identifier "=" QualifiedIdentifier ";"
```

The second form of `Use` introduces an alias for a namespace or symbol.

### class, trait and struct

```ebnf
Class  ::= "class"  Identifier TypeParameters? Ancestors? Modifiers
           "is" Definition* "si"

Trait  ::= "trait"  Identifier TypeParameters? Ancestors? Modifiers
           "is" Definition* "si"

Struct ::= "struct" Identifier TypeParameters? Ancestors? Modifiers
           "is" Definition* "si"

TypeParameters ::= "[" TypeParameter ( "," TypeParameter )* "]"
TypeParameter  ::= Identifier ( ":" TypeParameterConstraints )? Variance?
TypeParameterConstraints
               ::= TypeExpression KindConstraint? "new"?    /* type bound */
                 | KindConstraint "new"?                    /* kind only */
                 | "new"                                    /* ctor only */
KindConstraint ::= "class" | "struct" | "optional"
Variance       ::= "out" | "in"

Ancestors ::= ":" TypeList
```

`Ancestors` lists the base class and/or implemented traits.

A type parameter may carry a *type bound* (which the actual type argument must derive from), a *kind constraint* (`class` / `struct` / `optional`), a *constructor constraint* (`new`), and on a trait a *variance* modifier (`out` for covariant, `in` for contravariant) — in that order. Only a single type bound per parameter is currently supported. Variance is only legal on a trait's type parameters.

### union

```ebnf
Union   ::= "union" Identifier TypeParameters? Modifiers "is" Variant+ "si"
Variant ::= Identifier ( "(" VariableList ")" )? "default"? ";"
```

Each `Variant` optionally carries fields, written as a parenthesised list of
`name: Type` variables. A trailing `default` marks one variant as the union's
*default* — the one the `?` test and `!` unwrap operators target on a union
value.

### enum

```ebnf
Enum       ::= "enum" Identifier Modifiers "is"
               EnumMember ( "," EnumMember )* "si"
EnumMember ::= Identifier ( "=" Expression )?
```

### members: functions, properties and indexers

A `Member` is a function, a property or an indexer. They share a leading name and
modifiers; the parser distinguishes them by what follows the name.

```ebnf
Member ::= Function | Property | Indexer
```

#### function

```ebnf
Function     ::= FunctionName TypeParameters?
                 "(" VariableList? ")" ReturnType? Modifiers ( Body | ";" )
FunctionName ::= Identifier | Operator
ReturnType   ::= "->" TypeExpression

Body ::= "is" StatementList "si"
       | "=>" Expression
       | "innate" QualifiedIdentifier
```

A function may be named by an `Operator`, which defines that operator. A function
with no body (just `;`) is abstract. A `=>` or `innate` body is terminated by `;`;
a block body (`is` … `si`) is not.

#### property

```ebnf
Property          ::= Identifier ( ":" TypeExpression )? Modifiers
                      PropertyAccessors? ";"?
PropertyAccessors ::= PropertyGetter ( "," PropertySetter )?
                    | PropertySetter ( "," PropertyGetter )?
PropertyGetter    ::= Body
PropertySetter    ::= "=" Identifier Body
```

A property with no accessors and the `field` modifier declares a field. A
`PropertySetter` names the value parameter after `=`. As with functions, a `=>` or
`innate` accessor body is terminated by `;` and a block body is not.

#### indexer

```ebnf
Indexer ::= Identifier? "[" Variable "]" ( ":" TypeExpression )? Modifiers
            PropertyAccessors? ";"?
```

### modifiers

```ebnf
Modifiers      ::= AccessModifier? StorageClass?
AccessModifier ::= "public" | "protected" | "private"
StorageClass   ::= "static" | "field"
```

### pragmas

```ebnf
PragmaDefinition ::= Pragma Definition
Pragma           ::= "@" QualifiedIdentifier ( "(" ExpressionList? ")" )?
```

A `Pragma` annotates the definition (or [statement](#statements)) that follows it.

## type expressions

```ebnf
TypeExpression ::= PrimaryType TypeSuffix*

PrimaryType ::= QualifiedIdentifier
              | QualifiedIdentifier "[" TypeList "]"   /* generic type */
              | QualifiedIdentifier "[" "]"            /* array type */
              | Identifier ":" TypeExpression          /* named tuple element */
              | "(" TypeList ")"                       /* tuple, or grouping */
              | "(" TypeList? ")" "->" TypeExpression  /* function type */

TypeSuffix ::= "[]"                  /* array */
             | "ref"                 /* by-reference */
             | "ptr"                 /* pointer */
             | "?"                   /* nullable */
             | "->" TypeExpression   /* function type */
             | "." Identifier        /* member type */

TypeList ::= TypeExpression ( "," TypeExpression )*
```

`( T )` is just `T` in parentheses — parentheses group, e.g. to disambiguate
`(a -> b) -> c` from `a -> b -> c`. A parenthesised list of two or more types is a
tuple type. Empty parentheses are meaningful only as `( ) -> T`, a function type
taking no arguments. A `name: Type` element gives a tuple element a name.

## variables

```ebnf
Variable     ::= VariableLeft ( ":" TypeExpression )? "mut"? ( "=" Expression )?
VariableLeft ::= Identifier
               | "(" VariableLeft ( "," VariableLeft )* ")"
VariableList ::= Variable ( "," Variable )*
```

The parenthesised form of `VariableLeft` destructures a tuple. A bare `let` local
variable is immutable unless followed by `mut`.

## statements

A statement list is a sequence of statements. A `;` separates statements; it is
required after a statement whose syntax would otherwise run on into the next, and
optional elsewhere.

```ebnf
StatementList ::= ( Statement ";"? )*

Statement ::= Let
            | Return
            | Throw
            | Assert
            | Yield
            | If
            | Case
            | Try
            | Loop
            | For
            | Break
            | Continue
            | PragmaStatement
            | Labelled
            | Assignment
            | ExpressionStatement
```

### local variable definitions, return, throw, assert, yield

```ebnf
Let    ::= "let" "use"? VariableList ( "in" Expression )?
Return ::= "return" Expression?
Throw  ::= "throw" Expression?
Assert ::= "assert" Expression ( "else" Expression )?
Yield  ::= "yield" Expression
```

`let use` defines a local variable holding a disposable, whose `dispose` is called
when the variable goes out of scope.

The `let … in …` form is a [let-in expression](#primary-expressions) used as a
statement.

`yield` is permitted only inside a [generator function](/control-flow.html#generators)
— one whose return type is `Collections.Iterable[T]` or `Collections.Iterator[T]`.

### if

```ebnf
If          ::= "if"   IfCondition "then" StatementList
                ( "elif" IfCondition "then" StatementList )*
                ( "else"             StatementList )?
                "fi"
IfCondition ::= Expression
              | "let" Variable        /* if-let local variable */
```

The `if let` form defines a local variable whose initializer must be present; a
type ascription on it (`if let c: T = e`) tests that the value is a `T`.

### case

```ebnf
Case ::= "case" Expression
         ( "when" ExpressionList ":" StatementList )*
         ( "default" StatementList )?
         "esac"
```

### try

```ebnf
Try ::= "try" StatementList
        ( "catch" Variable StatementList )*
        ( "finally" StatementList )?
        "yrt"
```

### loops

```ebnf
Loop ::= ( "while" Expression )? "do" StatementList "od"
For  ::= "for" Variable "in" Expression "do" StatementList "od"
```

A `do … od` with no `while` is an unconditional loop.

### break, continue and labels

```ebnf
Break    ::= "break" Identifier?
Continue ::= "continue" Identifier?
Labelled ::= Identifier ":" Statement
```

A `Labelled` statement may be targeted by `break` or `continue` with the matching
label.

### assignment and expression statements

```ebnf
Assignment          ::= Expression "=" Expression
ExpressionStatement ::= Expression

PragmaStatement     ::= Pragma Statement
```

## expressions

An expression is a sequence of operands joined by binary operators. The parser
resolves operator nesting by [precedence](#operator-precedence); the grammar below
gives the flat structure.

```ebnf
Expression ::= UnaryExpression ( Operator UnaryExpression )*
```

`||` is the *yield infix* used to produce a value from a generator step; it has the
lowest precedence and does not chain.

### unary expressions

```ebnf
UnaryExpression ::= Operator UnaryExpression      /* prefix operator */
                  | "await"  UnaryExpression      /* await expression */
                  | PostfixExpression
```

An `await E` expression is permitted only inside an
[asynchronous function](/control-flow.html#asynchronous-code) — one whose
return type is `Tasks.TASK[T]` (or `Tasks.TASK`) — and evaluates to the result
of the awaited task once it completes. Used as the right-hand side of `let`, as
a bare statement (`await E;`), or in any operand position.

### postfix expressions

```ebnf
PostfixExpression ::= PrimaryExpression PostfixSuffix*

PostfixSuffix ::= "(" ExpressionList? ")"     /* call */
                | "[" ExpressionList "]"      /* index expression, or generic application */
                | "`[" TypeList "]"           /* explicit generic application */
                | "." Identifier              /* member access */
                | "?"                         /* has-value test */
                | "!"                         /* unwrap */
                | "ref"                       /* by-reference */
                | "|"                         /* pipe */
```

A `[ ... ]` suffix is either an index expression — an access through an
[indexer](#indexer) — or a generic type application, depending on whether its
contents resolve as expressions or as types; `` `[ ... ] `` forces the
generic-application reading.

### function literals

A primary expression — or a parenthesised argument list — followed by `->`, `=>`,
`is` or `rec` is a function literal:

```ebnf
FunctionLiteral   ::= FunctionArguments ( "->" TypeExpression )? "rec"? Body
FunctionArguments ::= "(" VariableList? ")"
                    | Identifier
```

`rec` marks the literal as recursive, so it may refer to itself.

### primary expressions

```ebnf
PrimaryExpression ::= Identifier
                    | Literal
                    | "(" ExpressionList? ")"                /* tuple or grouping */
                    | "[" ExpressionList "]" ( ":" TypeExpression )?  /* list literal */
                    | "cast" TypeExpression "(" Expression ")"
                    | "isa" TypeExpression "(" Expression ")"
                    | "typeof" TypeExpression
                    | "default" ( "[" TypeExpression "]" )?
                    | "self"
                    | "super"
                    | "rec"
                    | If                                     /* if-expression */
                    | "let" "use"? VariableList "in" Expression   /* let-in */

Literal ::= IntegerLiteral
          | FloatLiteral
          | StringLiteral
          | CharLiteral
          | InterpolatedString
          | "true" | "false"
          | "null"

ExpressionList ::= Expression ( "," Expression )*
```

A list literal `[ a, b, ... ]` builds a `List`; it requires at least one element
(use `LIST[T]()` for an empty list).

Within an `ExpressionList` that forms call arguments or a tuple, an element of the
form `Identifier ":" TypeExpression? ( "=" Expression )?` is an inline local
variable definition rather than a plain identifier — this is the only place that
form is accepted.

## operator precedence

ghūl has no fixed list of binary operators: any [operator token](#operators) may be
used infix. Precedence is assigned by a table of built-in operators plus a
first-character heuristic for everything else, so the grammar's flat
`Expression ::= UnaryExpression ( Operator UnaryExpression )*` is disambiguated by
the following levels, **tightest first**:

| Precedence       | Operators                                   |
|------------------|---------------------------------------------|
| *(prefix unary, member access, call, index — tightest)* | |
| user&#8209;8     | *(user-defined)*                            |
| multiplication   | `*` `×` `✕` `/` `%` `÷`                      |
| user&#8209;7     | *(user-defined)*                            |
| addition         | `+`  `-`                                    |
| user&#8209;6     | *(user-defined)*                            |
| bitwise          | `&` `\|` `¦` `^` `∩` `∪`                     |
| user&#8209;5     | *(user-defined — default)*                  |
| shift            | `<<`  `>>`                                  |
| user&#8209;4     | *(user-defined)*                            |
| range            | `..`  `::`                                  |
| user&#8209;3     | *(user-defined)*                            |
| relational       | `==` `!=` `=~` `!~` `<` `>` `>=` `<=` `≈` `≡` |
| user&#8209;2     | *(user-defined)*                            |
| boolean          | `/\`  `\/`  `∧`  `∨`                         |
| user&#8209;1     | *(user-defined)*                            |
| yield infix      | `\|\|`                                      |

All binary operators are left-associative. Prefix unary operators, member access,
calls and indexing bind more tightly than any binary operator.

A user-defined operator — any operator not in the table above — is assigned a
precedence from its **first character**, modelled on OCaml and F#: operators
starting with `*` `/` `%` bind as multiplication, `+` `-` as addition, and so on;
an operator with no recognised first character defaults to user&#8209;5. The
`@precedence("op", "level")` pragma overrides the precedence of a named operator.
Both arguments must be string literals — a numeric `level` is not accepted —
and `level` names a precedence level: `user-1` … `user-8`, or one of the built-in
level names `boolean`, `relational`, `range`, `shift`, `bitwise`, `addition` and
`multiplication`.
