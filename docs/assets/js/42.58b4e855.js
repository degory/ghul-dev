(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{325:function(e,t,a){"use strict";a.r(t);var s=a(14),n=Object(s.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"syntax-in-ghul"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#syntax-in-ghul"}},[e._v("#")]),e._v(" syntax in ghūl")]),e._v(" "),t("h2",{attrs:{id:"projects-and-files"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#projects-and-files"}},[e._v("#")]),e._v(" projects and files")]),e._v(" "),t("p",[e._v("A ghūl project is composed of a set of ghūl source files. Source files should have a "),t("code",[e._v(".ghul")]),e._v(" file extension, and must be UTF-8 text.")]),e._v(" "),t("p",[e._v("Each source file can contain zero, one or more global definitions. Definitions can be in any order and in any file. Source files can have any name, provided they have a "),t("code",[e._v(".ghul")]),e._v(" extension, and can be in any folder under the project root (subject to any source file glob pattern given in the "),t("code",[e._v(".ghulproj")]),e._v(")")]),e._v(" "),t("h2",{attrs:{id:"tokens-and-trees"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#tokens-and-trees"}},[e._v("#")]),e._v(" tokens and trees")]),e._v(" "),t("p",[e._v("Source files are translated into various kinds of tokens. Some tokens are a fixed sequence of characters (like the keyword "),t("code",[e._v("while")]),e._v("). Others are composed of characters according to various rules (identifiers, strings, numbers etc.)")]),e._v(" "),t("p",[e._v("With a couple of exceptions, ghūl tokens are similar to most common programming languages. The exceptions are:")]),e._v(" "),t("h3",{attrs:{id:"operators"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#operators"}},[e._v("#")]),e._v(" operators")]),e._v(" "),t("p",[e._v("Operators are any contiguous string of operator characters. This is only significant in the rare case where running together the characters that comprise two different operators might not have the result you expect")]),e._v(" "),t("h3",{attrs:{id:"escaped-identifiers"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#escaped-identifiers"}},[e._v("#")]),e._v(" escaped identifiers")]),e._v(" "),t("p",[e._v("When it appears at the beginning of an identifier, the backtick character "),t("code",[e._v("`")]),e._v(" acts as an escape. So where "),t("code",[e._v("while")]),e._v(" is a ghūl keyword, "),t("code",[e._v("`while")]),e._v(" is an identifier which starts with a backtick")]),e._v(" "),t("h2",{attrs:{id:"block-structure"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#block-structure"}},[e._v("#")]),e._v(" block structure")]),e._v(" "),t("p",[e._v("ghūl is a "),t("a",{attrs:{href:"https://en.wikipedia.org/wiki/Block_(programming)",target:"_blank",rel:"noopener noreferrer"}},[e._v("block structured programming language"),t("OutboundLink")],1),e._v(". Source code in ghūl is composed of blocks, typically many of them, with blocks nested inside other blocks.")]),e._v(" "),t("p",[e._v("Blocks are delimited by keywords. The keywords that begin and end a block are specific to each different kind of block. This way of delimited blocks is descended from the ALGOL family of languages, most specifically from "),t("a",{attrs:{href:"https://en.wikipedia.org/wiki/ALGOL_68",target:"_blank",rel:"noopener noreferrer"}},[e._v("ALGOL 68"),t("OutboundLink")],1),e._v(". It has the advantage of making the block structure clearer, both to someone reading the code and to the compiler.")]),e._v(" "),t("div",{staticClass:"language-ghul extra-class"},[t("pre",{staticClass:"language-ghul"},[t("code",{staticClass:"language-ghul"},[t("span",{staticClass:"token control"},[e._v("if")]),e._v(" "),t("span",{staticClass:"token variable"},[e._v("x")]),e._v(" "),t("span",{staticClass:"token operator"},[e._v(">")]),e._v(" "),t("span",{staticClass:"token variable"},[e._v("y")]),e._v(" "),t("span",{staticClass:"token control"},[e._v("then")]),e._v("\n   "),t("span",{staticClass:"token function"},[e._v("write_line")]),t("span",{staticClass:"token punctuation"},[e._v("(")]),t("span",{staticClass:"token string"},[e._v('"x > y"')]),t("span",{staticClass:"token punctuation"},[e._v(")")]),e._v("\n"),t("span",{staticClass:"token control"},[e._v("else")]),e._v("\n   "),t("span",{staticClass:"token function"},[e._v("write_line")]),t("span",{staticClass:"token punctuation"},[e._v("(")]),e._v('"'),t("span",{staticClass:"token variable"},[e._v("x")]),e._v(" "),t("span",{staticClass:"token operator"},[e._v("<=")]),e._v(" "),t("span",{staticClass:"token variable"},[e._v("y")]),t("span",{staticClass:"token punctuation"},[e._v(")")]),e._v("\n"),t("span",{staticClass:"token control"},[e._v("fi")]),e._v("\n")])])]),t("p",[e._v("In this example "),t("code",[e._v("then")]),e._v(", "),t("code",[e._v("else")]),e._v(" and "),t("code",[e._v("fi")]),e._v(" all delimit blocks. The blocks they delimit contain statement lists.")]),e._v(" "),t("h2",{attrs:{id:"semicolons"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#semicolons"}},[e._v("#")]),e._v(" semicolons")]),e._v(" "),t("p",[e._v("Semicolons are required: to separate statements and definitions.")]),e._v(" "),t("p",[e._v("While the compiler "),t("em",[e._v("could")]),e._v(" still unambiguously parse correct programs without requiring semicolons anywhere, having them at the end expression statements makes it clearer to the parser if the expression is incomplete or not well formed.")]),e._v(" "),t("h2",{attrs:{id:"definitions-and-statements"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#definitions-and-statements"}},[e._v("#")]),e._v(" definitions and statements")]),e._v(" "),t("p",[e._v("Blocks in ghūl can contain definitions, statements, or a mix of both. Which is permitted in a given block depends on the type of block.")]),e._v(" "),t("h2",{attrs:{id:"file-structure"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#file-structure"}},[e._v("#")]),e._v(" file structure")])])}),[],!1,null,null,null);t.default=n.exports}}]);