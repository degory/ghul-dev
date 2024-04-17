(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{319:function(t,a,s){"use strict";s.r(a);var n=s(14),i=Object(n.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"ghul-programming-language"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ghul-programming-language"}},[t._v("#")]),t._v(" ghūl programming language")]),t._v(" "),a("p",[a("img",{attrs:{src:"ghul-logo-draft.png",alt:"ghūl programming language logo"}})]),t._v(" "),a("p",[t._v("(Note: this site is very much a "),a("strong",[t._v("work-in-progress")]),t._v(". The "),a("a",{attrs:{href:"https://github.com/degory/ghul",target:"_blank",rel:"noopener noreferrer"}},[t._v("ghūl compiler"),a("OutboundLink")],1),t._v(" source code is currently the definitive ghūl language reference)")]),t._v(" "),a("h2",{attrs:{id:"why-ghul"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#why-ghul"}},[t._v("#")]),t._v(" why ghūl?")]),t._v(" "),a("p",[t._v("Why not 🤔")]),t._v(" "),a("p",[t._v("ghūl is mainly an opportunity for "),a("a",{attrs:{href:"https://github.com/degory",target:"_blank",rel:"noopener noreferrer"}},[t._v("me"),a("OutboundLink")],1),t._v(" to experiment with programming language design. Apart from a slightly quirky syntax, ghūl is a fairly conventional programming language. Although ghūl is a hobby project maintained by a single person, its goal is to be sufficiently expressive for general-purpose development: the "),a("a",{attrs:{href:"https://github.com/degory/ghul",target:"_blank",rel:"noopener noreferrer"}},[t._v("ghūl compiler"),a("OutboundLink")],1),t._v(" itself is written in ghūl.")]),t._v(" "),a("h2",{attrs:{id:"features"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#features"}},[t._v("#")]),t._v(" features")]),t._v(" "),a("ul",[a("li",[a("p",[a("strong",[t._v("type safety")]),t._v(": ghūl enforces type safety at compile-time.")])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("functional programming elements")]),t._v(": ghūl supports anonymous functions with closures.")])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("OOP")]),t._v(": ghūl supports classes, objects, inheritance, polymorphism, and other Object-Oriented Programming concepts.")])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("error handling")]),t._v(": the language includes try/catch/finally for error handling.")])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("generics")]),t._v(": ghūl types, methods, and functions can have generic type parameters.")])]),t._v(" "),a("li",[a("p",[a("strong",[t._v(".NET integration")]),t._v(": ghūl targets .NET, producing and consuming NuGet packages and supporting inter-operation with other .NET languages.")])])]),t._v(" "),a("h2",{attrs:{id:"examples"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#examples"}},[t._v("#")]),t._v(" examples")]),t._v(" "),a("h3",{attrs:{id:"hello-world"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#hello-world"}},[t._v("#")]),t._v(" hello world!")]),t._v(" "),a("div",{staticClass:"language-ghul extra-class"},[a("pre",{staticClass:"language-ghul"},[a("code",{staticClass:"language-ghul"},[a("span",{staticClass:"token function"},[t._v("entry")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token punctuation"},[t._v(")")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("=>")]),t._v("\n    "),a("span",{staticClass:"token class-name"},[t._v("IO")]),a("span",{staticClass:"token operator"},[t._v(".")]),a("span",{staticClass:"token class-name"},[t._v("Std")]),a("span",{staticClass:"token operator"},[t._v(".")]),a("span",{staticClass:"token function"},[t._v("write_line")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token string"},[t._v('"hello world"')]),a("span",{staticClass:"token punctuation"},[t._v(")")]),a("span",{staticClass:"token punctuation"},[t._v(";")]),t._v(" \n")])])]),a("h3",{attrs:{id:"functional"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#functional"}},[t._v("#")]),t._v(" functional")]),t._v(" "),a("div",{staticClass:"language-ghul extra-class"},[a("pre",{staticClass:"language-ghul"},[a("code",{staticClass:"language-ghul"},[a("span",{staticClass:"token keyword"},[t._v("use")]),t._v(" "),a("span",{staticClass:"token class-name"},[t._v("IO")]),a("span",{staticClass:"token operator"},[t._v(".")]),a("span",{staticClass:"token class-name"},[t._v("Std")]),a("span",{staticClass:"token operator"},[t._v(".")]),a("span",{staticClass:"token variable"},[t._v("write_line")]),a("span",{staticClass:"token punctuation"},[t._v(";")]),t._v("\n\n"),a("span",{staticClass:"token function"},[t._v("entry")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token punctuation"},[t._v(")")]),t._v(" "),a("span",{staticClass:"token keyword"},[t._v("is")]),t._v("\n    "),a("span",{staticClass:"token comment"},[t._v("// lazily generates an infinite sequence of fibonacci numbers:")]),t._v("\n    "),a("span",{staticClass:"token keyword"},[t._v("let")]),t._v(" "),a("span",{staticClass:"token variable"},[t._v("fibonacci_sequence")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("=")]),t._v(" "),a("span",{staticClass:"token class-name"},[t._v("GENERATE")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),t._v("\n        "),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token number"},[t._v("0")]),a("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" "),a("span",{staticClass:"token number"},[t._v("1")]),a("span",{staticClass:"token punctuation"},[t._v(")")]),a("span",{staticClass:"token punctuation"},[t._v(",")]),t._v("\n        "),a("span",{staticClass:"token variable"},[t._v("state")]),t._v(": "),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token class-name"},[t._v("int")]),a("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" "),a("span",{staticClass:"token class-name"},[t._v("int")]),a("span",{staticClass:"token punctuation"},[t._v(")")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("=>")]),t._v("\n            "),a("span",{staticClass:"token keyword"},[t._v("let")]),t._v(" \n                "),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token variable"},[t._v("prev")]),a("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" "),a("span",{staticClass:"token variable"},[t._v("current")]),a("span",{staticClass:"token punctuation"},[t._v(")")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("=")]),t._v(" "),a("span",{staticClass:"token variable"},[t._v("state")]),a("span",{staticClass:"token punctuation"},[t._v(",")]),t._v("\n                "),a("span",{staticClass:"token variable"},[t._v("next")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("=")]),t._v(" "),a("span",{staticClass:"token variable"},[t._v("prev")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("+")]),t._v(" "),a("span",{staticClass:"token variable"},[t._v("current")]),t._v("\n            "),a("span",{staticClass:"token control"},[t._v("in")]),t._v("\n                "),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token variable"},[t._v("current")]),a("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" "),a("span",{staticClass:"token variable"},[t._v("next")]),a("span",{staticClass:"token punctuation"},[t._v(")")]),a("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" "),a("span",{staticClass:"token variable"},[t._v("next")]),a("span",{staticClass:"token punctuation"},[t._v(")")]),t._v("\n    "),a("span",{staticClass:"token punctuation"},[t._v(")")]),a("span",{staticClass:"token punctuation"},[t._v(";")]),t._v("\n\n    "),a("span",{staticClass:"token comment"},[t._v("// lazily generates an infinite sequence of factorials:")]),t._v("\n    "),a("span",{staticClass:"token keyword"},[t._v("let")]),t._v(" "),a("span",{staticClass:"token variable"},[t._v("factorial_sequence")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("=")]),t._v(" "),a("span",{staticClass:"token class-name"},[t._v("GENERATE")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),t._v("\n        "),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token number"},[t._v("1")]),a("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" "),a("span",{staticClass:"token number"},[t._v("1")]),a("span",{staticClass:"token punctuation"},[t._v(")")]),a("span",{staticClass:"token punctuation"},[t._v(",")]),t._v("\n        "),a("span",{staticClass:"token variable"},[t._v("state")]),t._v(": "),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token class-name"},[t._v("int")]),a("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" "),a("span",{staticClass:"token class-name"},[t._v("int")]),a("span",{staticClass:"token punctuation"},[t._v(")")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("=>")]),t._v("\n            "),a("span",{staticClass:"token keyword"},[t._v("let")]),t._v("\n                "),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token variable"},[t._v("p")]),a("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" "),a("span",{staticClass:"token variable"},[t._v("prev")]),a("span",{staticClass:"token punctuation"},[t._v(")")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("=")]),t._v(" "),a("span",{staticClass:"token variable"},[t._v("state")]),a("span",{staticClass:"token punctuation"},[t._v(",")]),t._v("\n                "),a("span",{staticClass:"token variable"},[t._v("n")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("=")]),t._v(" "),a("span",{staticClass:"token variable"},[t._v("p")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("+")]),t._v(" "),a("span",{staticClass:"token number"},[t._v("1")]),a("span",{staticClass:"token punctuation"},[t._v(",")]),t._v("\n                "),a("span",{staticClass:"token variable"},[t._v("next")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("=")]),t._v(" "),a("span",{staticClass:"token variable"},[t._v("prev")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("*")]),t._v(" "),a("span",{staticClass:"token variable"},[t._v("n")]),t._v("\n            "),a("span",{staticClass:"token control"},[t._v("in")]),t._v("\n                "),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token variable"},[t._v("n")]),a("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" "),a("span",{staticClass:"token variable"},[t._v("next")]),a("span",{staticClass:"token punctuation"},[t._v(")")]),a("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" "),a("span",{staticClass:"token variable"},[t._v("next")]),a("span",{staticClass:"token punctuation"},[t._v(")")]),t._v("            \n    "),a("span",{staticClass:"token punctuation"},[t._v(")")]),a("span",{staticClass:"token punctuation"},[t._v(";")]),t._v("\n\n    "),a("span",{staticClass:"token function"},[t._v("write_line")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token string"},[t._v('"first 10 fibonacci numbers: '),a("span",{staticClass:"token interpolation"},[a("span",{staticClass:"token interpolation-punctuation punctuation"},[t._v("{")]),a("span",{staticClass:"token variable"},[t._v("fibonacci_sequence")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("|")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v(".")]),a("span",{staticClass:"token function"},[t._v("take")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token number"},[t._v("10")]),a("span",{staticClass:"token punctuation"},[t._v(")")]),a("span",{staticClass:"token interpolation-punctuation punctuation"},[t._v("}")])]),t._v('"')]),a("span",{staticClass:"token punctuation"},[t._v(")")]),a("span",{staticClass:"token punctuation"},[t._v(";")]),t._v("\n    "),a("span",{staticClass:"token function"},[t._v("write_line")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token string"},[t._v('"first 10 factorial numbers: '),a("span",{staticClass:"token interpolation"},[a("span",{staticClass:"token interpolation-punctuation punctuation"},[t._v("{")]),a("span",{staticClass:"token variable"},[t._v("factorial_sequence")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("|")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v(".")]),a("span",{staticClass:"token function"},[t._v("take")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token number"},[t._v("10")]),a("span",{staticClass:"token punctuation"},[t._v(")")]),a("span",{staticClass:"token interpolation-punctuation punctuation"},[t._v("}")])]),t._v('"')]),a("span",{staticClass:"token punctuation"},[t._v(")")]),a("span",{staticClass:"token punctuation"},[t._v(";")]),t._v("\n    "),a("span",{staticClass:"token function"},[t._v("write_line")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token string"},[t._v('"first 10 even fibonacci numbers: '),a("span",{staticClass:"token interpolation"},[a("span",{staticClass:"token interpolation-punctuation punctuation"},[t._v("{")]),a("span",{staticClass:"token variable"},[t._v("fibonacci_sequence")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("|")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v(".")]),a("span",{staticClass:"token function"},[t._v("filter")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token variable"},[t._v("x")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("=>")]),t._v(" "),a("span",{staticClass:"token variable"},[t._v("x")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("%")]),t._v(" "),a("span",{staticClass:"token number"},[t._v("2")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("==")]),t._v(" "),a("span",{staticClass:"token number"},[t._v("0")]),a("span",{staticClass:"token punctuation"},[t._v(")")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v(".")]),a("span",{staticClass:"token function"},[t._v("take")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token number"},[t._v("10")]),a("span",{staticClass:"token punctuation"},[t._v(")")]),a("span",{staticClass:"token interpolation-punctuation punctuation"},[t._v("}")])]),t._v('"')]),a("span",{staticClass:"token punctuation"},[t._v(")")]),a("span",{staticClass:"token punctuation"},[t._v(";")]),t._v("\n\n    "),a("span",{staticClass:"token control"},[t._v("for")]),t._v(" "),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token variable"},[t._v("i")]),a("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" "),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token variable"},[t._v("fib")]),a("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" "),a("span",{staticClass:"token variable"},[t._v("fact")]),a("span",{staticClass:"token punctuation"},[t._v(")")]),a("span",{staticClass:"token punctuation"},[t._v(")")]),t._v(" "),a("span",{staticClass:"token control"},[t._v("in")]),t._v(" "),a("span",{staticClass:"token variable"},[t._v("fibonacci_sequence")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("|")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v(".")]),a("span",{staticClass:"token function"},[t._v("zip")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token variable"},[t._v("factorial_sequence")]),a("span",{staticClass:"token punctuation"},[t._v(")")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v(".")]),a("span",{staticClass:"token function"},[t._v("take")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token number"},[t._v("10")]),a("span",{staticClass:"token punctuation"},[t._v(")")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v(".")]),a("span",{staticClass:"token function"},[t._v("index")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token punctuation"},[t._v(")")]),t._v(" "),a("span",{staticClass:"token control"},[t._v("do")]),t._v("\n        "),a("span",{staticClass:"token function"},[t._v("write_line")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token string"},[t._v('"fibonacci '),a("span",{staticClass:"token interpolation"},[a("span",{staticClass:"token interpolation-punctuation punctuation"},[t._v("{")]),a("span",{staticClass:"token variable"},[t._v("i")]),a("span",{staticClass:"token interpolation-punctuation punctuation"},[t._v("}")])]),t._v(" is "),a("span",{staticClass:"token interpolation"},[a("span",{staticClass:"token interpolation-punctuation punctuation"},[t._v("{")]),a("span",{staticClass:"token variable"},[t._v("fib")]),a("span",{staticClass:"token interpolation-punctuation punctuation"},[t._v("}")])]),t._v('"')]),a("span",{staticClass:"token punctuation"},[t._v(")")]),a("span",{staticClass:"token punctuation"},[t._v(";")]),t._v("\n        "),a("span",{staticClass:"token function"},[t._v("write_line")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token string"},[t._v('"factorial '),a("span",{staticClass:"token interpolation"},[a("span",{staticClass:"token interpolation-punctuation punctuation"},[t._v("{")]),a("span",{staticClass:"token variable"},[t._v("i")]),a("span",{staticClass:"token interpolation-punctuation punctuation"},[t._v("}")])]),t._v(" is "),a("span",{staticClass:"token interpolation"},[a("span",{staticClass:"token interpolation-punctuation punctuation"},[t._v("{")]),a("span",{staticClass:"token variable"},[t._v("fact")]),a("span",{staticClass:"token interpolation-punctuation punctuation"},[t._v("}")])]),t._v('"')]),a("span",{staticClass:"token punctuation"},[t._v(")")]),a("span",{staticClass:"token punctuation"},[t._v(";")]),t._v("\n    "),a("span",{staticClass:"token control"},[t._v("od")]),a("span",{staticClass:"token punctuation"},[t._v(";")]),t._v("\n"),a("span",{staticClass:"token keyword"},[t._v("si")]),t._v("\n")])])]),a("h3",{attrs:{id:"oop"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#oop"}},[t._v("#")]),t._v(" OOP")]),t._v(" "),a("div",{staticClass:"language-ghul extra-class"},[a("pre",{staticClass:"language-ghul"},[a("code",{staticClass:"language-ghul"},[a("span",{staticClass:"token keyword"},[t._v("use")]),t._v(" "),a("span",{staticClass:"token class-name"},[t._v("IO")]),a("span",{staticClass:"token operator"},[t._v(".")]),a("span",{staticClass:"token class-name"},[t._v("Std")]),a("span",{staticClass:"token operator"},[t._v(".")]),a("span",{staticClass:"token variable"},[t._v("write_line")]),a("span",{staticClass:"token punctuation"},[t._v(";")]),t._v("\n\n"),a("span",{staticClass:"token keyword"},[t._v("class")]),t._v(" "),a("span",{staticClass:"token class-name"},[t._v("CALCULATOR")]),t._v(" "),a("span",{staticClass:"token keyword"},[t._v("is")]),t._v("\n    "),a("span",{staticClass:"token function"},[t._v("init")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token punctuation"},[t._v(")")]),t._v(" "),a("span",{staticClass:"token keyword"},[t._v("is")]),t._v("\n    "),a("span",{staticClass:"token keyword"},[t._v("si")]),t._v("\n\n    "),a("span",{staticClass:"token function"},[t._v("add")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token variable"},[t._v("x")]),t._v(": "),a("span",{staticClass:"token class-name"},[t._v("single")]),a("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" "),a("span",{staticClass:"token variable"},[t._v("y")]),t._v(": "),a("span",{staticClass:"token class-name"},[t._v("single")]),a("span",{staticClass:"token punctuation"},[t._v(")")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("->")]),t._v(" "),a("span",{staticClass:"token class-name"},[t._v("single")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("=>")]),t._v("\n        "),a("span",{staticClass:"token variable"},[t._v("x")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("+")]),t._v(" "),a("span",{staticClass:"token variable"},[t._v("y")]),a("span",{staticClass:"token punctuation"},[t._v(";")]),t._v("\n\n    "),a("span",{staticClass:"token function"},[t._v("subtract")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token variable"},[t._v("x")]),t._v(": "),a("span",{staticClass:"token class-name"},[t._v("single")]),a("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" "),a("span",{staticClass:"token variable"},[t._v("y")]),t._v(": "),a("span",{staticClass:"token class-name"},[t._v("single")]),a("span",{staticClass:"token punctuation"},[t._v(")")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("->")]),t._v(" "),a("span",{staticClass:"token class-name"},[t._v("single")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("=>")]),t._v("\n        "),a("span",{staticClass:"token variable"},[t._v("x")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("-")]),t._v(" "),a("span",{staticClass:"token variable"},[t._v("y")]),a("span",{staticClass:"token punctuation"},[t._v(";")]),t._v("\n\n    "),a("span",{staticClass:"token function"},[t._v("multiply")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token variable"},[t._v("x")]),t._v(": "),a("span",{staticClass:"token class-name"},[t._v("single")]),a("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" "),a("span",{staticClass:"token variable"},[t._v("y")]),t._v(": "),a("span",{staticClass:"token class-name"},[t._v("single")]),a("span",{staticClass:"token punctuation"},[t._v(")")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("->")]),t._v(" "),a("span",{staticClass:"token class-name"},[t._v("single")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("=>")]),t._v("\n        "),a("span",{staticClass:"token variable"},[t._v("x")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("*")]),t._v(" "),a("span",{staticClass:"token variable"},[t._v("y")]),a("span",{staticClass:"token punctuation"},[t._v(";")]),t._v("\n\n    "),a("span",{staticClass:"token function"},[t._v("divide")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token variable"},[t._v("x")]),t._v(": "),a("span",{staticClass:"token class-name"},[t._v("single")]),a("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" "),a("span",{staticClass:"token variable"},[t._v("y")]),t._v(": "),a("span",{staticClass:"token class-name"},[t._v("single")]),a("span",{staticClass:"token punctuation"},[t._v(")")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("->")]),t._v(" "),a("span",{staticClass:"token class-name"},[t._v("single")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("=>")]),t._v("\n        "),a("span",{staticClass:"token control"},[t._v("if")]),t._v(" "),a("span",{staticClass:"token variable"},[t._v("y")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("!=")]),t._v(" "),a("span",{staticClass:"token number"},[t._v("0.0")]),t._v(" "),a("span",{staticClass:"token control"},[t._v("then")]),t._v("\n            "),a("span",{staticClass:"token variable"},[t._v("x")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("/")]),t._v(" "),a("span",{staticClass:"token variable"},[t._v("y")]),a("span",{staticClass:"token punctuation"},[t._v(";")]),t._v("\n        "),a("span",{staticClass:"token control"},[t._v("else")]),t._v("\n            "),a("span",{staticClass:"token control"},[t._v("throw")]),t._v(" "),a("span",{staticClass:"token class-name"},[t._v("System")]),a("span",{staticClass:"token operator"},[t._v(".")]),a("span",{staticClass:"token class-name"},[t._v("DivideByZeroException")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token string"},[t._v('"oops: division by zero"')]),a("span",{staticClass:"token punctuation"},[t._v(")")]),a("span",{staticClass:"token punctuation"},[t._v(";")]),t._v("\n        "),a("span",{staticClass:"token control"},[t._v("fi")]),a("span",{staticClass:"token punctuation"},[t._v(";")]),t._v("\n"),a("span",{staticClass:"token keyword"},[t._v("si")]),t._v("\n\n"),a("span",{staticClass:"token function"},[t._v("entry")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token punctuation"},[t._v(")")]),t._v(" "),a("span",{staticClass:"token keyword"},[t._v("is")]),t._v("\n    "),a("span",{staticClass:"token keyword"},[t._v("let")]),t._v(" "),a("span",{staticClass:"token variable"},[t._v("calc")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("=")]),t._v(" "),a("span",{staticClass:"token class-name"},[t._v("CALCULATOR")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token punctuation"},[t._v(")")]),a("span",{staticClass:"token punctuation"},[t._v(";")]),t._v("\n\n    "),a("span",{staticClass:"token keyword"},[t._v("let")]),t._v(" "),a("span",{staticClass:"token variable"},[t._v("a")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("=")]),t._v(" "),a("span",{staticClass:"token number"},[t._v("10.0")]),a("span",{staticClass:"token punctuation"},[t._v(";")]),t._v("\n    "),a("span",{staticClass:"token keyword"},[t._v("let")]),t._v(" "),a("span",{staticClass:"token variable"},[t._v("b")]),t._v(" "),a("span",{staticClass:"token operator"},[t._v("=")]),t._v(" "),a("span",{staticClass:"token number"},[t._v("5.0")]),a("span",{staticClass:"token punctuation"},[t._v(";")]),t._v("\n\n    "),a("span",{staticClass:"token function"},[t._v("write_line")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token string"},[t._v('"Addition: '),a("span",{staticClass:"token interpolation"},[a("span",{staticClass:"token interpolation-punctuation punctuation"},[t._v("{")]),a("span",{staticClass:"token variable"},[t._v("calc")]),a("span",{staticClass:"token operator"},[t._v(".")]),a("span",{staticClass:"token function"},[t._v("add")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token variable"},[t._v("a")]),a("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" "),a("span",{staticClass:"token variable"},[t._v("b")]),a("span",{staticClass:"token punctuation"},[t._v(")")]),a("span",{staticClass:"token interpolation-punctuation punctuation"},[t._v("}")])]),t._v('"')]),a("span",{staticClass:"token punctuation"},[t._v(")")]),a("span",{staticClass:"token punctuation"},[t._v(";")]),t._v("\n    "),a("span",{staticClass:"token function"},[t._v("write_line")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token string"},[t._v('"Subtraction: '),a("span",{staticClass:"token interpolation"},[a("span",{staticClass:"token interpolation-punctuation punctuation"},[t._v("{")]),a("span",{staticClass:"token variable"},[t._v("calc")]),a("span",{staticClass:"token operator"},[t._v(".")]),a("span",{staticClass:"token function"},[t._v("subtract")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token variable"},[t._v("a")]),a("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" "),a("span",{staticClass:"token variable"},[t._v("b")]),a("span",{staticClass:"token punctuation"},[t._v(")")]),a("span",{staticClass:"token interpolation-punctuation punctuation"},[t._v("}")])]),t._v('"')]),a("span",{staticClass:"token punctuation"},[t._v(")")]),a("span",{staticClass:"token punctuation"},[t._v(";")]),t._v("\n    "),a("span",{staticClass:"token function"},[t._v("write_line")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token string"},[t._v('"Multiplication: '),a("span",{staticClass:"token interpolation"},[a("span",{staticClass:"token interpolation-punctuation punctuation"},[t._v("{")]),a("span",{staticClass:"token variable"},[t._v("calc")]),a("span",{staticClass:"token operator"},[t._v(".")]),a("span",{staticClass:"token function"},[t._v("multiply")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token variable"},[t._v("a")]),a("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" "),a("span",{staticClass:"token variable"},[t._v("b")]),a("span",{staticClass:"token punctuation"},[t._v(")")]),a("span",{staticClass:"token interpolation-punctuation punctuation"},[t._v("}")])]),t._v('"')]),a("span",{staticClass:"token punctuation"},[t._v(")")]),a("span",{staticClass:"token punctuation"},[t._v(";")]),t._v("\n    "),a("span",{staticClass:"token function"},[t._v("write_line")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token string"},[t._v('"Division: '),a("span",{staticClass:"token interpolation"},[a("span",{staticClass:"token interpolation-punctuation punctuation"},[t._v("{")]),a("span",{staticClass:"token variable"},[t._v("calc")]),a("span",{staticClass:"token operator"},[t._v(".")]),a("span",{staticClass:"token function"},[t._v("divide")]),a("span",{staticClass:"token punctuation"},[t._v("(")]),a("span",{staticClass:"token variable"},[t._v("a")]),a("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" "),a("span",{staticClass:"token variable"},[t._v("b")]),a("span",{staticClass:"token punctuation"},[t._v(")")]),a("span",{staticClass:"token interpolation-punctuation punctuation"},[t._v("}")])]),t._v('"')]),a("span",{staticClass:"token punctuation"},[t._v(")")]),a("span",{staticClass:"token punctuation"},[t._v(";")]),t._v("\n"),a("span",{staticClass:"token keyword"},[t._v("si")]),t._v("\n")])])]),a("h3",{attrs:{id:"examples-project"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#examples-project"}},[t._v("#")]),t._v(" examples project")]),t._v(" "),a("p",[t._v("See the "),a("a",{attrs:{href:"https://github.com/degory/ghul-examples",target:"_blank",rel:"noopener noreferrer"}},[t._v("ghūl examples repository"),a("OutboundLink")],1),t._v(" for projects with these examples and others that can be viewed, edited and run from Visual Studio Code or a GitHub Codespace.")])])}),[],!1,null,null,null);a.default=i.exports}}]);